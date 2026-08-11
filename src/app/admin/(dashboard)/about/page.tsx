"use client";

import { useEffect, useState, useTransition } from "react";
import type { ReactNode } from "react";
import { Plus, Trash2, Pencil, Check, X, ChevronUp, ChevronDown, Eye, EyeOff, Home } from "lucide-react";
import { ICON_NAMES, Icon } from "@/lib/icon-map";
import { ImageField } from "@/components/admin/image-field";
import { cn } from "@/lib/utils";
import {
  ABOUT_SECTION_TYPES,
  defaultContentForType,
  type AboutSection,
  type AboutSectionType,
  type AboutSectionContent,
  type HeroContent,
  type IntroContent,
  type StatsContent,
  type CardsContent,
  type RichTextContent,
  type CTAContent,
} from "@/lib/data/about-sections";

const inputClass =
  "w-full rounded-lg border border-border bg-bg px-3 py-2 text-sm text-text outline-none focus:border-primary";

const TYPE_LABEL: Record<AboutSectionType, string> = {
  hero: "Hero",
  intro: "Intro / About Block",
  stats: "Stats",
  cards: "Icon Cards Grid",
  richtext: "Rich Text",
  cta: "Call To Action",
};

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="flex flex-col gap-1.5 text-xs font-medium text-text-muted">
      {label}
      {children}
    </label>
  );
}

function ListEditor<T>({
  items,
  onChange,
  newItem,
  max,
  renderRow,
  addLabel = "Add Item",
}: {
  items: T[];
  onChange: (items: T[]) => void;
  newItem: T;
  max: number;
  addLabel?: string;
  renderRow: (item: T, update: (patch: Partial<T>) => void) => ReactNode;
}) {
  return (
    <div className="mt-3 flex flex-col gap-2">
      {items.map((item, i) => (
        <div key={i} className="flex items-center gap-2 rounded-lg border border-border p-2.5">
          <div className="flex flex-1 flex-wrap items-center gap-2">
            {renderRow(item, (patch) => onChange(items.map((it, idx) => (idx === i ? { ...it, ...patch } : it))))}
          </div>
          <button
            type="button"
            onClick={() => onChange(items.filter((_, idx) => idx !== i))}
            disabled={items.length <= 1}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border text-text-muted transition-colors hover:border-primary hover:text-primary disabled:opacity-40"
            aria-label="Remove item"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() => items.length < max && onChange([...items, newItem])}
        disabled={items.length >= max}
        className="flex w-fit items-center gap-1 text-xs font-semibold text-primary disabled:opacity-40"
      >
        <Plus className="h-3.5 w-3.5" /> {addLabel}
      </button>
    </div>
  );
}

function SectionContentForm({
  type,
  content,
  onChange,
}: {
  type: AboutSectionType;
  content: AboutSectionContent;
  onChange: (content: AboutSectionContent) => void;
}) {
  if (type === "hero") {
    const c = content as HeroContent;
    return (
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Field label="Eyebrow">
          <input className={inputClass} value={c.eyebrow} onChange={(e) => onChange({ ...c, eyebrow: e.target.value })} required />
        </Field>
        <Field label="Title">
          <input className={inputClass} value={c.title} onChange={(e) => onChange({ ...c, title: e.target.value })} required />
        </Field>
        <div className="md:col-span-2">
          <Field label="Description">
            <textarea
              className={cn(inputClass, "min-h-20")}
              value={c.description}
              onChange={(e) => onChange({ ...c, description: e.target.value })}
              required
            />
          </Field>
        </div>
      </div>
    );
  }

  if (type === "intro") {
    const c = content as IntroContent;
    return (
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[220px_1fr]">
          <div>
            <ImageField label="Photo" value={c.imageId} onChange={(imageId) => onChange({ ...c, imageId })} aspectClassName="aspect-4/5" />
          </div>
          <div className="flex flex-col gap-4">
            <Field label="Badge">
              <input className={inputClass} value={c.badge} onChange={(e) => onChange({ ...c, badge: e.target.value })} required />
            </Field>
            <Field label="Heading">
              <input className={inputClass} value={c.heading} onChange={(e) => onChange({ ...c, heading: e.target.value })} required />
            </Field>
            <Field label="Paragraph 1">
              <textarea
                className={cn(inputClass, "min-h-24")}
                value={c.paragraph1}
                onChange={(e) => onChange({ ...c, paragraph1: e.target.value })}
                required
              />
            </Field>
            <Field label="Paragraph 2">
              <textarea
                className={cn(inputClass, "min-h-20")}
                value={c.paragraph2}
                onChange={(e) => onChange({ ...c, paragraph2: e.target.value })}
                required
              />
            </Field>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Button Label">
                <input className={inputClass} value={c.ctaLabel} onChange={(e) => onChange({ ...c, ctaLabel: e.target.value })} required />
              </Field>
              <Field label="Button Link">
                <input className={inputClass} value={c.ctaHref} onChange={(e) => onChange({ ...c, ctaHref: e.target.value })} required />
              </Field>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-wide text-text-muted">Feature Cards</h3>
          <ListEditor
            items={c.features}
            max={8}
            addLabel="Add Feature"
            newItem={{ icon: "Sparkles", title: "" }}
            onChange={(features) => onChange({ ...c, features })}
            renderRow={(f, update) => (
              <>
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary-light text-primary">
                  <Icon name={f.icon} className="h-4 w-4" />
                </div>
                <select className={cn(inputClass, "w-40 shrink-0")} value={f.icon} onChange={(e) => update({ icon: e.target.value })}>
                  {ICON_NAMES.map((name) => (
                    <option key={name} value={name}>
                      {name}
                    </option>
                  ))}
                </select>
                <input
                  className={cn(inputClass, "flex-1")}
                  value={f.title}
                  onChange={(e) => update({ title: e.target.value })}
                  placeholder="Feature title"
                  required
                />
              </>
            )}
          />
        </div>
      </div>
    );
  }

  if (type === "stats") {
    const c = content as StatsContent;
    return (
      <ListEditor
        items={c.items}
        max={10}
        addLabel="Add Stat"
        newItem={{ value: 0, suffix: "+", label: "" }}
        onChange={(items) => onChange({ items })}
        renderRow={(s, update) => (
          <>
            <input
              type="number"
              className={cn(inputClass, "w-24")}
              value={s.value}
              onChange={(e) => update({ value: Number(e.target.value) })}
              required
            />
            <input
              className={cn(inputClass, "w-20")}
              value={s.suffix}
              onChange={(e) => update({ suffix: e.target.value })}
              placeholder="Suffix"
            />
            <input
              className={cn(inputClass, "flex-1")}
              value={s.label}
              onChange={(e) => update({ label: e.target.value })}
              placeholder="Label"
              required
            />
          </>
        )}
      />
    );
  }

  if (type === "cards") {
    const c = content as CardsContent;
    return (
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Field label="Eyebrow">
            <input className={inputClass} value={c.eyebrow} onChange={(e) => onChange({ ...c, eyebrow: e.target.value })} required />
          </Field>
          <Field label="Heading">
            <input className={inputClass} value={c.heading} onChange={(e) => onChange({ ...c, heading: e.target.value })} required />
          </Field>
        </div>
        <ListEditor
          items={c.items}
          max={12}
          addLabel="Add Card"
          newItem={{ icon: "Sparkles", title: "", detail: "" }}
          onChange={(items) => onChange({ ...c, items })}
          renderRow={(item, update) => (
            <>
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary-light text-primary">
                <Icon name={item.icon} className="h-4 w-4" />
              </div>
              <select className={cn(inputClass, "w-40 shrink-0")} value={item.icon} onChange={(e) => update({ icon: e.target.value })}>
                {ICON_NAMES.map((name) => (
                  <option key={name} value={name}>
                    {name}
                  </option>
                ))}
              </select>
              <input
                className={cn(inputClass, "w-48")}
                value={item.title}
                onChange={(e) => update({ title: e.target.value })}
                placeholder="Title"
                required
              />
              <input
                className={cn(inputClass, "flex-1 min-w-40")}
                value={item.detail}
                onChange={(e) => update({ detail: e.target.value })}
                placeholder="Detail"
                required
              />
            </>
          )}
        />
      </div>
    );
  }

  if (type === "richtext") {
    const c = content as RichTextContent;
    return (
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Field label="Eyebrow">
          <input className={inputClass} value={c.eyebrow} onChange={(e) => onChange({ ...c, eyebrow: e.target.value })} required />
        </Field>
        <Field label="Heading">
          <input className={inputClass} value={c.heading} onChange={(e) => onChange({ ...c, heading: e.target.value })} required />
        </Field>
        <div className="md:col-span-2">
          <Field label="Body (blank line = new paragraph)">
            <textarea
              className={cn(inputClass, "min-h-32")}
              value={c.body}
              onChange={(e) => onChange({ ...c, body: e.target.value })}
              required
            />
          </Field>
        </div>
      </div>
    );
  }

  const c = content as CTAContent;
  return (
    <div className="flex flex-col gap-4">
      <Field label="Heading">
        <input className={inputClass} value={c.heading} onChange={(e) => onChange({ ...c, heading: e.target.value })} required />
      </Field>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Field label="Primary Button Label">
          <input className={inputClass} value={c.primaryLabel} onChange={(e) => onChange({ ...c, primaryLabel: e.target.value })} required />
        </Field>
        <Field label="Primary Button Link">
          <input className={inputClass} value={c.primaryHref} onChange={(e) => onChange({ ...c, primaryHref: e.target.value })} required />
        </Field>
        <Field label="Secondary Button Label">
          <input
            className={inputClass}
            value={c.secondaryLabel}
            onChange={(e) => onChange({ ...c, secondaryLabel: e.target.value })}
            required
          />
        </Field>
        <Field label="Secondary Button Link">
          <input className={inputClass} value={c.secondaryHref} onChange={(e) => onChange({ ...c, secondaryHref: e.target.value })} required />
        </Field>
      </div>
    </div>
  );
}

export default function AboutAdminPage() {
  const [sections, setSections] = useState<AboutSection[]>([]);
  const [loading, startLoad] = useTransition();
  const [message, setMessage] = useState<{ type: "error" | "success"; text: string } | null>(null);

  const [addingType, setAddingType] = useState<AboutSectionType | null>(null);
  const [addTitle, setAddTitle] = useState("");
  const [addContent, setAddContent] = useState<AboutSectionContent | null>(null);
  const [saving, setSaving] = useState(false);

  const [editingId, setEditingId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState<AboutSectionContent | null>(null);

  function load() {
    startLoad(async () => {
      const res = await fetch("/api/admin/about-sections");
      const data = await res.json();
      setSections(data.sections ?? []);
    });
  }

  useEffect(load, []);

  function startAdd(type: AboutSectionType) {
    setAddingType(type);
    setAddTitle("");
    setAddContent(defaultContentForType(type));
    setMessage(null);
  }

  async function handleAdd() {
    if (!addingType || !addContent || !addTitle.trim()) {
      setMessage({ type: "error", text: "Give the section a title first." });
      return;
    }
    setSaving(true);
    const res = await fetch("/api/admin/about-sections", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: addingType, title: addTitle, content: addContent }),
    });
    setSaving(false);
    if (!res.ok) {
      const data = await res.json().catch(() => null);
      setMessage({ type: "error", text: data?.error ?? "Could not create section." });
      return;
    }
    setAddingType(null);
    setAddContent(null);
    setMessage({ type: "success", text: "Section added." });
    load();
  }

  function startEdit(section: AboutSection) {
    setEditingId(section.id);
    setEditTitle(section.title);
    setEditContent(section.content);
    setMessage(null);
  }

  async function handleSaveEdit(id: number) {
    if (!editContent || !editTitle.trim()) return;
    setSaving(true);
    const res = await fetch(`/api/admin/about-sections/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: editTitle, content: editContent }),
    });
    setSaving(false);
    if (!res.ok) {
      const data = await res.json().catch(() => null);
      setMessage({ type: "error", text: data?.error ?? "Could not save changes." });
      return;
    }
    setEditingId(null);
    setEditContent(null);
    setMessage({ type: "success", text: "Section updated." });
    load();
  }

  async function toggleField(id: number, field: "isVisible" | "showOnHome", value: boolean) {
    await fetch(`/api/admin/about-sections/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ [field]: value }),
    });
    load();
  }

  async function handleDelete(id: number) {
    if (!window.confirm("Delete this section? This cannot be undone.")) return;
    const res = await fetch(`/api/admin/about-sections/${id}`, { method: "DELETE" });
    if (res.ok) {
      setMessage({ type: "success", text: "Section deleted." });
      load();
    }
  }

  async function move(index: number, dir: -1 | 1) {
    const target = index + dir;
    if (target < 0 || target >= sections.length) return;
    const reordered = [...sections];
    [reordered[index], reordered[target]] = [reordered[target], reordered[index]];
    setSections(reordered);
    await fetch("/api/admin/about-sections/reorder", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ order: reordered.map((s) => s.id) }),
    });
    load();
  }

  return (
    <div>
      <div>
        <h1 className="font-display text-2xl font-bold text-text">About Page</h1>
        <p className="mt-1 text-sm text-text-muted">
          Every section on the /about page, plus the About block on the homepage. Add, edit, reorder, hide, or delete any section.
        </p>
      </div>

      {loading && <p className="mt-4 text-sm text-text-muted">Loading…</p>}
      {message && (
        <p className={cn("mt-4 text-sm", message.type === "error" ? "text-primary" : "text-emerald-600")}>{message.text}</p>
      )}

      <div className="mt-6 flex flex-col gap-4">
        {sections.map((section, i) => {
          const isEditing = editingId === section.id;
          return (
            <section key={section.id} className="rounded-2xl border border-border bg-card p-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="rounded-full bg-primary-light px-3 py-1 text-xs font-semibold text-primary">
                    {TYPE_LABEL[section.type]}
                  </span>
                  {!isEditing && <h2 className="font-display text-base font-bold text-text">{section.title}</h2>}
                </div>
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => move(i, -1)}
                    disabled={i === 0}
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-text-muted transition-colors hover:border-primary hover:text-primary disabled:opacity-30"
                    aria-label="Move up"
                  >
                    <ChevronUp className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => move(i, 1)}
                    disabled={i === sections.length - 1}
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-text-muted transition-colors hover:border-primary hover:text-primary disabled:opacity-30"
                    aria-label="Move down"
                  >
                    <ChevronDown className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => toggleField(section.id, "isVisible", !section.isVisible)}
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-text-muted transition-colors hover:border-primary hover:text-primary"
                    aria-label={section.isVisible ? "Hide section" : "Show section"}
                    title={section.isVisible ? "Visible on /about" : "Hidden"}
                  >
                    {section.isVisible ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                  </button>
                  {section.type === "intro" && (
                    <button
                      type="button"
                      onClick={() => toggleField(section.id, "showOnHome", !section.showOnHome)}
                      className={cn(
                        "flex h-8 w-8 items-center justify-center rounded-full border transition-colors",
                        section.showOnHome
                          ? "border-primary text-primary"
                          : "border-border text-text-muted hover:border-primary hover:text-primary"
                      )}
                      aria-label={section.showOnHome ? "Remove from homepage" : "Show on homepage"}
                      title={section.showOnHome ? "Shown on homepage" : "Not shown on homepage"}
                    >
                      <Home className="h-4 w-4" />
                    </button>
                  )}
                  {isEditing ? (
                    <>
                      <button
                        type="button"
                        onClick={() => handleSaveEdit(section.id)}
                        disabled={saving}
                        className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-text-muted transition-colors hover:border-primary hover:text-primary"
                        aria-label="Save"
                      >
                        <Check className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setEditingId(null)}
                        className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-text-muted transition-colors hover:border-primary hover:text-primary"
                        aria-label="Cancel"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </>
                  ) : (
                    <button
                      type="button"
                      onClick={() => startEdit(section)}
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-text-muted transition-colors hover:border-primary hover:text-primary"
                      aria-label="Edit"
                    >
                      <Pencil className="h-4 w-4" />
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => handleDelete(section.id)}
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-text-muted transition-colors hover:border-primary hover:text-primary"
                    aria-label="Delete"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {isEditing && editContent && (
                <div className="mt-5 flex flex-col gap-4 border-t border-border pt-5">
                  <Field label="Section Label (admin only)">
                    <input className={inputClass} value={editTitle} onChange={(e) => setEditTitle(e.target.value)} required />
                  </Field>
                  <SectionContentForm type={section.type} content={editContent} onChange={setEditContent} />
                </div>
              )}
            </section>
          );
        })}
      </div>

      <div className="mt-8 rounded-2xl border border-dashed border-border p-6">
        {addingType ? (
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-base font-bold text-text">New {TYPE_LABEL[addingType]} Section</h2>
              <button type="button" onClick={() => setAddingType(null)} className="text-text-muted hover:text-primary">
                <X className="h-4 w-4" />
              </button>
            </div>
            <Field label="Section Label (admin only)">
              <input className={inputClass} value={addTitle} onChange={(e) => setAddTitle(e.target.value)} required />
            </Field>
            {addContent && <SectionContentForm type={addingType} content={addContent} onChange={setAddContent} />}
            <div>
              <button
                type="button"
                onClick={handleAdd}
                disabled={saving}
                className="rounded-full bg-primary px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-primary-deep disabled:opacity-60"
              >
                {saving ? "Saving…" : "Add Section"}
              </button>
            </div>
          </div>
        ) : (
          <div>
            <h2 className="font-display text-base font-bold text-text">Add a Section</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {ABOUT_SECTION_TYPES.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => startAdd(t)}
                  className="flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-sm font-medium text-text transition-colors hover:border-primary hover:text-primary"
                >
                  <Plus className="h-3.5 w-3.5" /> {TYPE_LABEL[t]}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
