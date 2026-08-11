"use client";

import { useEffect, useState, useTransition } from "react";
import type { ReactNode } from "react";
import { Plus, Trash2, Pencil, Check, X, ChevronUp, ChevronDown, Eye, EyeOff } from "lucide-react";
import { ICON_NAMES, Icon } from "@/lib/icon-map";
import { ImageField } from "@/components/admin/image-field";
import { cn } from "@/lib/utils";
import type { Service, ServiceProcessStep } from "@/lib/data/services";

const inputClass =
  "w-full rounded-lg border border-border bg-bg px-3 py-2 text-sm text-text outline-none focus:border-primary";

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

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
  renderRow: (item: T, update: (next: T) => void) => ReactNode;
}) {
  return (
    <div className="mt-3 flex flex-col gap-2">
      {items.map((item, i) => (
        <div key={i} className="flex items-center gap-2 rounded-lg border border-border p-2.5">
          <div className="flex flex-1 flex-wrap items-center gap-2">
            {renderRow(item, (next) => onChange(items.map((it, idx) => (idx === i ? next : it))))}
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

type FormState = {
  slug: string;
  name: string;
  icon: string;
  short: string;
  description: string;
  image: string;
  benefits: string[];
  process: ServiceProcessStep[];
};

const EMPTY_FORM: FormState = {
  slug: "",
  name: "",
  icon: "Sparkles",
  short: "",
  description: "",
  image: "photo-1519494026892-80bbd2d6fd0d",
  benefits: [""],
  process: [{ title: "", detail: "" }],
};

function ServiceForm({
  form,
  onChange,
  slugEditable,
}: {
  form: FormState;
  onChange: (form: FormState) => void;
  slugEditable: boolean;
}) {
  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[220px_1fr]">
        <div>
          <ImageField label="Photo" value={form.image} onChange={(image) => onChange({ ...form, image })} aspectClassName="aspect-4/3" />
        </div>
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Field label="Name">
              <input
                className={inputClass}
                value={form.name}
                onChange={(e) => {
                  const name = e.target.value;
                  onChange({ ...form, name, slug: slugEditable ? slugify(name) : form.slug });
                }}
                required
              />
            </Field>
            <Field label="Icon">
              <div className="flex items-center gap-2">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary-light text-primary">
                  <Icon name={form.icon} className="h-4 w-4" />
                </div>
                <select className={inputClass} value={form.icon} onChange={(e) => onChange({ ...form, icon: e.target.value })}>
                  {ICON_NAMES.map((name) => (
                    <option key={name} value={name}>
                      {name}
                    </option>
                  ))}
                </select>
              </div>
            </Field>
          </div>
          <Field label="Slug (URL: /services/...)">
            <input
              className={inputClass}
              value={form.slug}
              onChange={(e) => onChange({ ...form, slug: slugify(e.target.value) })}
              required
            />
          </Field>
          <Field label="Short Summary (used on cards)">
            <textarea
              className={cn(inputClass, "min-h-16")}
              value={form.short}
              onChange={(e) => onChange({ ...form, short: e.target.value })}
              required
            />
          </Field>
          <Field label="Description (used on detail page)">
            <textarea
              className={cn(inputClass, "min-h-24")}
              value={form.description}
              onChange={(e) => onChange({ ...form, description: e.target.value })}
              required
            />
          </Field>
        </div>
      </div>

      <div>
        <h3 className="text-xs font-semibold uppercase tracking-wide text-text-muted">Key Benefits</h3>
        <ListEditor
          items={form.benefits}
          max={8}
          addLabel="Add Benefit"
          newItem=""
          onChange={(benefits) => onChange({ ...form, benefits })}
          renderRow={(b, update) => (
            <input
              className={cn(inputClass, "flex-1")}
              value={b}
              onChange={(e) => update(e.target.value)}
              placeholder="Benefit"
              required
            />
          )}
        />
      </div>

      <div>
        <h3 className="text-xs font-semibold uppercase tracking-wide text-text-muted">Treatment Process</h3>
        <ListEditor
          items={form.process}
          max={8}
          addLabel="Add Step"
          newItem={{ title: "", detail: "" }}
          onChange={(process) => onChange({ ...form, process })}
          renderRow={(step, update) => (
            <>
              <input
                className={cn(inputClass, "w-40")}
                value={step.title}
                onChange={(e) => update({ ...step, title: e.target.value })}
                placeholder="Step title"
                required
              />
              <input
                className={cn(inputClass, "flex-1 min-w-40")}
                value={step.detail}
                onChange={(e) => update({ ...step, detail: e.target.value })}
                placeholder="Step detail"
                required
              />
            </>
          )}
        />
      </div>
    </div>
  );
}

function toForm(service: Service): FormState {
  return {
    slug: service.slug,
    name: service.name,
    icon: service.icon,
    short: service.short,
    description: service.description,
    image: service.image,
    benefits: service.benefits,
    process: service.process,
  };
}

export default function ServicesAdminPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, startLoad] = useTransition();
  const [message, setMessage] = useState<{ type: "error" | "success"; text: string } | null>(null);
  const [saving, setSaving] = useState(false);

  const [adding, setAdding] = useState(false);
  const [addForm, setAddForm] = useState<FormState>(EMPTY_FORM);

  const [editingId, setEditingId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState<FormState>(EMPTY_FORM);

  function load() {
    startLoad(async () => {
      const res = await fetch("/api/admin/services");
      const data = await res.json();
      setServices(data.services ?? []);
    });
  }

  useEffect(load, []);

  function startAdd() {
    setAdding(true);
    setAddForm(EMPTY_FORM);
    setMessage(null);
  }

  function benefitsValid(list: string[]) {
    return list.length > 0 && list.every((b) => b.trim());
  }
  function processValid(list: ServiceProcessStep[]) {
    return list.length > 0 && list.every((p) => p.title.trim() && p.detail.trim());
  }

  async function handleAdd() {
    if (!addForm.slug.trim() || !addForm.name.trim() || !addForm.short.trim() || !addForm.description.trim()) {
      setMessage({ type: "error", text: "Slug, name, short summary, and description are required." });
      return;
    }
    if (!benefitsValid(addForm.benefits) || !processValid(addForm.process)) {
      setMessage({ type: "error", text: "Every benefit and process step needs text." });
      return;
    }
    setSaving(true);
    const res = await fetch("/api/admin/services", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(addForm),
    });
    setSaving(false);
    if (!res.ok) {
      const data = await res.json().catch(() => null);
      setMessage({ type: "error", text: data?.error ?? "Could not create service." });
      return;
    }
    setAdding(false);
    setMessage({ type: "success", text: "Service added." });
    load();
  }

  function startEdit(service: Service) {
    setEditingId(service.id);
    setEditForm(toForm(service));
    setMessage(null);
  }

  async function handleSaveEdit(id: number) {
    if (!benefitsValid(editForm.benefits) || !processValid(editForm.process)) {
      setMessage({ type: "error", text: "Every benefit and process step needs text." });
      return;
    }
    setSaving(true);
    const res = await fetch(`/api/admin/services/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editForm),
    });
    setSaving(false);
    if (!res.ok) {
      const data = await res.json().catch(() => null);
      setMessage({ type: "error", text: data?.error ?? "Could not save changes." });
      return;
    }
    setEditingId(null);
    setMessage({ type: "success", text: "Service updated." });
    load();
  }

  async function toggleVisible(service: Service) {
    await fetch(`/api/admin/services/${service.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isVisible: !service.isVisible }),
    });
    load();
  }

  async function handleDelete(id: number) {
    if (!window.confirm("Delete this service? This cannot be undone.")) return;
    const res = await fetch(`/api/admin/services/${id}`, { method: "DELETE" });
    if (res.ok) {
      setMessage({ type: "success", text: "Service deleted." });
      load();
    }
  }

  async function move(index: number, dir: -1 | 1) {
    const target = index + dir;
    if (target < 0 || target >= services.length) return;
    const reordered = [...services];
    [reordered[index], reordered[target]] = [reordered[target], reordered[index]];
    setServices(reordered);
    await fetch("/api/admin/services/reorder", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ order: reordered.map((s) => s.id) }),
    });
    load();
  }

  return (
    <div>
      <div>
        <h1 className="font-display text-2xl font-bold text-text">Services</h1>
        <p className="mt-1 text-sm text-text-muted">
          Powers the homepage services section, the /services listing, and every /services/[slug] detail page.
        </p>
      </div>

      {loading && <p className="mt-4 text-sm text-text-muted">Loading…</p>}
      {message && (
        <p className={cn("mt-4 text-sm", message.type === "error" ? "text-primary" : "text-emerald-600")}>{message.text}</p>
      )}

      <div className="mt-6 flex flex-col gap-4">
        {services.map((service, i) => {
          const isEditing = editingId === service.id;
          return (
            <section key={service.id} className="rounded-2xl border border-border bg-card p-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-light text-primary">
                    <Icon name={service.icon} className="h-4 w-4" />
                  </div>
                  {!isEditing && (
                    <div>
                      <h2 className="font-display text-base font-bold text-text">{service.name}</h2>
                      <p className="text-xs text-text-muted">/services/{service.slug}</p>
                    </div>
                  )}
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
                    disabled={i === services.length - 1}
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-text-muted transition-colors hover:border-primary hover:text-primary disabled:opacity-30"
                    aria-label="Move down"
                  >
                    <ChevronDown className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => toggleVisible(service)}
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-text-muted transition-colors hover:border-primary hover:text-primary"
                    aria-label={service.isVisible ? "Hide service" : "Show service"}
                    title={service.isVisible ? "Visible" : "Hidden"}
                  >
                    {service.isVisible ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                  </button>
                  {isEditing ? (
                    <>
                      <button
                        type="button"
                        onClick={() => handleSaveEdit(service.id)}
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
                      onClick={() => startEdit(service)}
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-text-muted transition-colors hover:border-primary hover:text-primary"
                      aria-label="Edit"
                    >
                      <Pencil className="h-4 w-4" />
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => handleDelete(service.id)}
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-text-muted transition-colors hover:border-primary hover:text-primary"
                    aria-label="Delete"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {isEditing && (
                <div className="mt-5 border-t border-border pt-5">
                  <ServiceForm form={editForm} onChange={setEditForm} slugEditable={false} />
                </div>
              )}
            </section>
          );
        })}
      </div>

      <div className="mt-8 rounded-2xl border border-dashed border-border p-6">
        {adding ? (
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-base font-bold text-text">New Service</h2>
              <button type="button" onClick={() => setAdding(false)} className="text-text-muted hover:text-primary">
                <X className="h-4 w-4" />
              </button>
            </div>
            <ServiceForm form={addForm} onChange={setAddForm} slugEditable />
            <div>
              <button
                type="button"
                onClick={handleAdd}
                disabled={saving}
                className="rounded-full bg-primary px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-primary-deep disabled:opacity-60"
              >
                {saving ? "Saving…" : "Add Service"}
              </button>
            </div>
          </div>
        ) : (
          <button
            type="button"
            onClick={startAdd}
            className="flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-sm font-medium text-text transition-colors hover:border-primary hover:text-primary"
          >
            <Plus className="h-3.5 w-3.5" /> Add Service
          </button>
        )}
      </div>
    </div>
  );
}
