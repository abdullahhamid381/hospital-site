"use client";

import { useEffect, useState, useTransition } from "react";
import type { ReactNode } from "react";
import { Plus, Trash2, Pencil, Check, X, ChevronUp, ChevronDown, Eye, EyeOff } from "lucide-react";
import { ImageField } from "@/components/admin/image-field";
import { resolveImageSrc } from "@/lib/image-src";
import { cn } from "@/lib/utils";
import type { Doctor } from "@/lib/data/doctors";

const inputClass =
  "w-full rounded-lg border border-border bg-bg px-3 py-2 text-sm text-text outline-none focus:border-primary";

function slugify(value: string) {
  return value.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="flex flex-col gap-1.5 text-xs font-medium text-text-muted">
      {label}
      {children}
    </label>
  );
}

function StringListEditor({
  items,
  onChange,
  addLabel = "Add",
  max = 12,
}: {
  items: string[];
  onChange: (items: string[]) => void;
  addLabel?: string;
  max?: number;
}) {
  return (
    <div className="flex flex-col gap-2">
      {items.map((item, i) => (
        <div key={i} className="flex items-center gap-2">
          <input
            className={cn(inputClass, "flex-1")}
            value={item}
            onChange={(e) => onChange(items.map((it, idx) => (idx === i ? e.target.value : it)))}
          />
          <button
            type="button"
            onClick={() => onChange(items.filter((_, idx) => idx !== i))}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border text-text-muted transition-colors hover:border-primary hover:text-primary"
            aria-label="Remove item"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() => items.length < max && onChange([...items, ""])}
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
  specialization: string;
  department: string;
  experience: string;
  qualifications: string[];
  languages: string[];
  availableDays: string;
  availableTimings: string;
  bio: string;
  expertise: string[];
  image: string;
};

const EMPTY_FORM: FormState = {
  slug: "",
  name: "",
  specialization: "",
  department: "",
  experience: "",
  qualifications: [""],
  languages: [""],
  availableDays: "",
  availableTimings: "",
  bio: "",
  expertise: [""],
  image: "photo-1622902046580-2b47f47f5471",
};

function toForm(d: Doctor): FormState {
  return {
    slug: d.slug,
    name: d.name,
    specialization: d.specialization,
    department: d.department,
    experience: d.experience,
    qualifications: d.qualifications,
    languages: d.languages,
    availableDays: d.availableDays,
    availableTimings: d.availableTimings,
    bio: d.bio,
    expertise: d.expertise,
    image: d.image,
  };
}

function DoctorForm({ form, onChange, slugEditable }: { form: FormState; onChange: (f: FormState) => void; slugEditable: boolean }) {
  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[220px_1fr]">
        <ImageField label="Photo" value={form.image} onChange={(image) => onChange({ ...form, image })} aspectClassName="aspect-4/5" />
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
            <Field label="Slug (URL: /doctors/...)">
              <input className={inputClass} value={form.slug} onChange={(e) => onChange({ ...form, slug: slugify(e.target.value) })} required />
            </Field>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Specialization">
              <input className={inputClass} value={form.specialization} onChange={(e) => onChange({ ...form, specialization: e.target.value })} required />
            </Field>
            <Field label="Department">
              <input className={inputClass} value={form.department} onChange={(e) => onChange({ ...form, department: e.target.value })} required />
            </Field>
          </div>
          <Field label="Experience">
            <input
              className={inputClass}
              value={form.experience}
              onChange={(e) => onChange({ ...form, experience: e.target.value })}
              placeholder="e.g. 12+ Years Experience"
              required
            />
          </Field>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Available Days">
              <input className={inputClass} value={form.availableDays} onChange={(e) => onChange({ ...form, availableDays: e.target.value })} placeholder="Mon, Wed, Fri" required />
            </Field>
            <Field label="Available Timings">
              <input className={inputClass} value={form.availableTimings} onChange={(e) => onChange({ ...form, availableTimings: e.target.value })} placeholder="10:00 AM – 4:00 PM" required />
            </Field>
          </div>
          <Field label="Biography">
            <textarea className={cn(inputClass, "min-h-24")} value={form.bio} onChange={(e) => onChange({ ...form, bio: e.target.value })} required />
          </Field>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-wide text-text-muted">Qualifications</h3>
          <div className="mt-2">
            <StringListEditor items={form.qualifications} onChange={(qualifications) => onChange({ ...form, qualifications })} addLabel="Add" />
          </div>
        </div>
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-wide text-text-muted">Languages</h3>
          <div className="mt-2">
            <StringListEditor items={form.languages} onChange={(languages) => onChange({ ...form, languages })} addLabel="Add" />
          </div>
        </div>
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-wide text-text-muted">Areas of Expertise</h3>
          <div className="mt-2">
            <StringListEditor items={form.expertise} onChange={(expertise) => onChange({ ...form, expertise })} addLabel="Add" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function DoctorsAdminPage() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, startLoad] = useTransition();
  const [message, setMessage] = useState<{ type: "error" | "success"; text: string } | null>(null);
  const [saving, setSaving] = useState(false);

  const [adding, setAdding] = useState(false);
  const [addForm, setAddForm] = useState<FormState>(EMPTY_FORM);

  const [editingId, setEditingId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState<FormState>(EMPTY_FORM);

  function load() {
    startLoad(async () => {
      const res = await fetch("/api/admin/doctors");
      const data = await res.json();
      setDoctors(data.doctors ?? []);
    });
  }

  useEffect(load, []);

  function startAdd() {
    setAdding(true);
    setAddForm(EMPTY_FORM);
    setMessage(null);
  }

  function requiredOk(f: FormState) {
    return (
      f.slug.trim() &&
      f.name.trim() &&
      f.specialization.trim() &&
      f.department.trim() &&
      f.experience.trim() &&
      f.availableDays.trim() &&
      f.availableTimings.trim() &&
      f.bio.trim() &&
      f.image.trim() &&
      f.qualifications.every((q) => q.trim()) &&
      f.languages.every((l) => l.trim()) &&
      f.expertise.every((e) => e.trim())
    );
  }

  async function handleAdd() {
    if (!requiredOk(addForm)) {
      setMessage({ type: "error", text: "Fill in every field, and make sure list items aren't blank." });
      return;
    }
    setSaving(true);
    const res = await fetch("/api/admin/doctors", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(addForm),
    });
    setSaving(false);
    if (!res.ok) {
      const data = await res.json().catch(() => null);
      setMessage({ type: "error", text: data?.error ?? "Could not add doctor." });
      return;
    }
    setAdding(false);
    setMessage({ type: "success", text: "Doctor added." });
    load();
  }

  function startEdit(d: Doctor) {
    setEditingId(d.id);
    setEditForm(toForm(d));
    setMessage(null);
  }

  async function handleSaveEdit(id: number) {
    if (!requiredOk(editForm)) {
      setMessage({ type: "error", text: "Fill in every field, and make sure list items aren't blank." });
      return;
    }
    setSaving(true);
    const res = await fetch(`/api/admin/doctors/${id}`, {
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
    setMessage({ type: "success", text: "Doctor updated." });
    load();
  }

  async function toggleVisible(d: Doctor) {
    await fetch(`/api/admin/doctors/${d.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isVisible: !d.isVisible }),
    });
    load();
  }

  async function handleDelete(id: number) {
    if (!window.confirm("Delete this doctor? This cannot be undone.")) return;
    const res = await fetch(`/api/admin/doctors/${id}`, { method: "DELETE" });
    if (res.ok) {
      setMessage({ type: "success", text: "Doctor deleted." });
      load();
    }
  }

  async function move(index: number, dir: -1 | 1) {
    const target = index + dir;
    if (target < 0 || target >= doctors.length) return;
    const reordered = [...doctors];
    [reordered[index], reordered[target]] = [reordered[target], reordered[index]];
    setDoctors(reordered);
    await fetch("/api/admin/doctors/reorder", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ order: reordered.map((d) => d.id) }),
    });
    load();
  }

  return (
    <div>
      <div>
        <h1 className="font-display text-2xl font-bold text-text">Doctors</h1>
        <p className="mt-1 text-sm text-text-muted">
          Powers the homepage doctors section, the /doctors listing, and every /doctors/[slug] profile page.
        </p>
      </div>

      {loading && <p className="mt-4 text-sm text-text-muted">Loading…</p>}
      {message && <p className={cn("mt-4 text-sm", message.type === "error" ? "text-primary" : "text-emerald-600")}>{message.text}</p>}

      <div className="mt-6 flex flex-col gap-4">
        {doctors.map((d, i) => {
          const isEditing = editingId === d.id;
          return (
            <section key={d.id} className="rounded-2xl border border-border bg-card p-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full border border-border">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={resolveImageSrc(d.image, 100)} alt="" className="h-full w-full object-cover" />
                  </div>
                  {!isEditing && (
                    <div>
                      <h2 className="font-display text-base font-bold text-text">{d.name}</h2>
                      <p className="text-xs text-text-muted">
                        {d.specialization} · {d.department}
                      </p>
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-1.5">
                  <button type="button" onClick={() => move(i, -1)} disabled={i === 0} className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-text-muted transition-colors hover:border-primary hover:text-primary disabled:opacity-30" aria-label="Move up">
                    <ChevronUp className="h-4 w-4" />
                  </button>
                  <button type="button" onClick={() => move(i, 1)} disabled={i === doctors.length - 1} className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-text-muted transition-colors hover:border-primary hover:text-primary disabled:opacity-30" aria-label="Move down">
                    <ChevronDown className="h-4 w-4" />
                  </button>
                  <button type="button" onClick={() => toggleVisible(d)} className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-text-muted transition-colors hover:border-primary hover:text-primary" aria-label={d.isVisible ? "Hide" : "Show"} title={d.isVisible ? "Visible" : "Hidden"}>
                    {d.isVisible ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                  </button>
                  {isEditing ? (
                    <>
                      <button type="button" onClick={() => handleSaveEdit(d.id)} disabled={saving} className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-text-muted transition-colors hover:border-primary hover:text-primary" aria-label="Save">
                        <Check className="h-4 w-4" />
                      </button>
                      <button type="button" onClick={() => setEditingId(null)} className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-text-muted transition-colors hover:border-primary hover:text-primary" aria-label="Cancel">
                        <X className="h-4 w-4" />
                      </button>
                    </>
                  ) : (
                    <button type="button" onClick={() => startEdit(d)} className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-text-muted transition-colors hover:border-primary hover:text-primary" aria-label="Edit">
                      <Pencil className="h-4 w-4" />
                    </button>
                  )}
                  <button type="button" onClick={() => handleDelete(d.id)} className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-text-muted transition-colors hover:border-primary hover:text-primary" aria-label="Delete">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {isEditing && (
                <div className="mt-5 border-t border-border pt-5">
                  <DoctorForm form={editForm} onChange={setEditForm} slugEditable={false} />
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
              <h2 className="font-display text-base font-bold text-text">New Doctor</h2>
              <button type="button" onClick={() => setAdding(false)} className="text-text-muted hover:text-primary">
                <X className="h-4 w-4" />
              </button>
            </div>
            <DoctorForm form={addForm} onChange={setAddForm} slugEditable />
            <div>
              <button
                type="button"
                onClick={handleAdd}
                disabled={saving}
                className="rounded-full bg-primary px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-primary-deep disabled:opacity-60"
              >
                {saving ? "Saving…" : "Add Doctor"}
              </button>
            </div>
          </div>
        ) : (
          <button type="button" onClick={startAdd} className="flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-sm font-medium text-text transition-colors hover:border-primary hover:text-primary">
            <Plus className="h-3.5 w-3.5" /> Add Doctor
          </button>
        )}
      </div>
    </div>
  );
}
