"use client";

import { useEffect, useState, useTransition } from "react";
import { Plus, Trash2, RotateCcw } from "lucide-react";
import { ICON_NAMES, Icon } from "@/lib/icon-map";
import { ABOUT_DEFAULT, type AboutContent, type AboutFeature } from "@/lib/data/about";
import { unsplash } from "@/lib/unsplash";
import { cn } from "@/lib/utils";

const inputClass =
  "w-full rounded-lg border border-border bg-bg px-3 py-2 text-sm text-text outline-none focus:border-primary";

type FormState = AboutContent;

export default function AboutAdminPage() {
  const [form, setForm] = useState<FormState>(ABOUT_DEFAULT);
  const [isDefault, setIsDefault] = useState(true);
  const [loading, startLoad] = useTransition();
  const [saving, setSaving] = useState(false);
  const [resetting, setResetting] = useState(false);
  const [message, setMessage] = useState<{ type: "error" | "success"; text: string } | null>(null);

  function load() {
    startLoad(async () => {
      const res = await fetch("/api/admin/about");
      const data = await res.json();
      const { isDefault: def, updatedAt: _updatedAt, ...content } = data;
      setForm(content);
      setIsDefault(Boolean(def));
    });
  }

  useEffect(load, []);

  function updateField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((s) => ({ ...s, [key]: value }));
  }

  function updateFeature(index: number, patch: Partial<AboutFeature>) {
    setForm((s) => ({
      ...s,
      features: s.features.map((f, i) => (i === index ? { ...f, ...patch } : f)),
    }));
  }

  function addFeature() {
    if (form.features.length >= 8) return;
    setForm((s) => ({ ...s, features: [...s.features, { icon: "Sparkles", title: "" }] }));
  }

  function removeFeature(index: number) {
    setForm((s) => ({ ...s, features: s.features.filter((_, i) => i !== index) }));
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setMessage(null);

    if (form.features.some((f) => !f.title.trim())) {
      setMessage({ type: "error", text: "Every feature needs a title." });
      return;
    }

    setSaving(true);
    const res = await fetch("/api/admin/about", {
      method: isDefault ? "POST" : "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setSaving(false);

    if (!res.ok) {
      const data = await res.json().catch(() => null);
      setMessage({ type: "error", text: data?.error ?? "Could not save changes." });
      return;
    }
    setIsDefault(false);
    setMessage({ type: "success", text: "Saved. Changes are live on the homepage and About page." });
  }

  async function handleReset() {
    if (!window.confirm("Reset About content to the site defaults? This deletes your current customizations.")) return;
    setResetting(true);
    const res = await fetch("/api/admin/about", { method: "DELETE" });
    setResetting(false);
    if (res.ok) {
      setForm(ABOUT_DEFAULT);
      setIsDefault(true);
      setMessage({ type: "success", text: "Reset to defaults." });
    }
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-text">About Section</h1>
          <p className="mt-1 text-sm text-text-muted">
            Powers the About section on the homepage and the full /about page hero.
          </p>
        </div>
        <button
          type="button"
          onClick={handleReset}
          disabled={resetting || isDefault}
          className="flex items-center gap-1.5 rounded-full border border-border px-4 py-1.5 text-sm font-medium text-text-muted transition-colors hover:border-primary hover:text-primary disabled:opacity-40"
        >
          <RotateCcw className="h-3.5 w-3.5" /> {resetting ? "Resetting…" : "Reset to Defaults"}
        </button>
      </div>

      {loading && <p className="mt-4 text-sm text-text-muted">Loading…</p>}

      <form onSubmit={handleSave} className="mt-6 flex flex-col gap-8">
        <section className="rounded-2xl border border-border bg-card p-6">
          <h2 className="font-display text-base font-bold text-text">About Page Hero</h2>
          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
            <label className="flex flex-col gap-1.5 text-xs font-medium text-text-muted">
              Eyebrow
              <input
                className={inputClass}
                value={form.heroEyebrow}
                onChange={(e) => updateField("heroEyebrow", e.target.value)}
                required
              />
            </label>
            <label className="flex flex-col gap-1.5 text-xs font-medium text-text-muted">
              Title
              <input
                className={inputClass}
                value={form.heroTitle}
                onChange={(e) => updateField("heroTitle", e.target.value)}
                required
              />
            </label>
          </div>
          <label className="mt-4 flex flex-col gap-1.5 text-xs font-medium text-text-muted">
            Description
            <textarea
              className={cn(inputClass, "min-h-20")}
              value={form.heroDescription}
              onChange={(e) => updateField("heroDescription", e.target.value)}
              required
            />
          </label>
        </section>

        <section className="rounded-2xl border border-border bg-card p-6">
          <h2 className="font-display text-base font-bold text-text">Homepage About Section</h2>

          <div className="mt-4 grid grid-cols-1 gap-6 lg:grid-cols-[240px_1fr]">
            <div>
              <label className="flex flex-col gap-1.5 text-xs font-medium text-text-muted">
                Unsplash Photo ID
                <input
                  className={inputClass}
                  value={form.imageId}
                  onChange={(e) => updateField("imageId", e.target.value)}
                  placeholder="photo-XXXXXXXXXXXXX-XXXXXXXXXXXX"
                  required
                />
              </label>
              <p className="mt-1.5 text-xs text-text-muted">
                The path segment from an unsplash.com photo URL, e.g. <code>photo-1519494026892-80bbd2d6fd0d</code>.
              </p>
              <div className="relative mt-3 aspect-4/5 w-full overflow-hidden rounded-xl border border-border">
                {form.imageId && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={unsplash(form.imageId, 400)} alt="" className="h-full w-full object-cover" />
                )}
              </div>
            </div>

            <div>
              <label className="flex flex-col gap-1.5 text-xs font-medium text-text-muted">
                Badge
                <input
                  className={inputClass}
                  value={form.badge}
                  onChange={(e) => updateField("badge", e.target.value)}
                  required
                />
              </label>
              <label className="mt-4 flex flex-col gap-1.5 text-xs font-medium text-text-muted">
                Heading
                <input
                  className={inputClass}
                  value={form.heading}
                  onChange={(e) => updateField("heading", e.target.value)}
                  required
                />
              </label>
              <label className="mt-4 flex flex-col gap-1.5 text-xs font-medium text-text-muted">
                Paragraph 1
                <textarea
                  className={cn(inputClass, "min-h-24")}
                  value={form.paragraph1}
                  onChange={(e) => updateField("paragraph1", e.target.value)}
                  required
                />
              </label>
              <label className="mt-4 flex flex-col gap-1.5 text-xs font-medium text-text-muted">
                Paragraph 2
                <textarea
                  className={cn(inputClass, "min-h-20")}
                  value={form.paragraph2}
                  onChange={(e) => updateField("paragraph2", e.target.value)}
                  required
                />
              </label>
            </div>
          </div>

          <div className="mt-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-semibold uppercase tracking-wide text-text-muted">Feature Cards</h3>
              <button
                type="button"
                onClick={addFeature}
                disabled={form.features.length >= 8}
                className="flex items-center gap-1 text-xs font-semibold text-primary disabled:opacity-40"
              >
                <Plus className="h-3.5 w-3.5" /> Add Feature
              </button>
            </div>
            <div className="mt-3 flex flex-col gap-2">
              {form.features.map((f, i) => (
                <div key={i} className="flex items-center gap-2 rounded-lg border border-border p-2.5">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary-light text-primary">
                    <Icon name={f.icon} className="h-4 w-4" />
                  </div>
                  <select
                    className={cn(inputClass, "w-40 shrink-0")}
                    value={f.icon}
                    onChange={(e) => updateFeature(i, { icon: e.target.value })}
                  >
                    {ICON_NAMES.map((name) => (
                      <option key={name} value={name}>
                        {name}
                      </option>
                    ))}
                  </select>
                  <input
                    className={inputClass}
                    value={f.title}
                    onChange={(e) => updateFeature(i, { title: e.target.value })}
                    placeholder="Feature title"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => removeFeature(i)}
                    disabled={form.features.length <= 1}
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border text-text-muted transition-colors hover:border-primary hover:text-primary disabled:opacity-40"
                    aria-label="Remove feature"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {message && (
          <p className={cn("text-sm", message.type === "error" ? "text-primary" : "text-emerald-600")}>{message.text}</p>
        )}

        <div>
          <button
            type="submit"
            disabled={saving}
            className="rounded-full bg-primary px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-primary-deep disabled:opacity-60"
          >
            {saving ? "Saving…" : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}
