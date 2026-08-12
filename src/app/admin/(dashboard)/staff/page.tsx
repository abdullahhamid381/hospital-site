"use client";

import { useEffect, useState, useTransition } from "react";
import type { ReactNode } from "react";
import { Plus, Trash2, Pencil, Check, X, ChevronUp, ChevronDown, Eye, EyeOff, Star } from "lucide-react";
import { ImageField } from "@/components/admin/image-field";
import { resolveImageSrc } from "@/lib/image-src";
import { cn } from "@/lib/utils";
import {
  STAFF_CATEGORIES,
  staffCategoryLabel,
  type StaffMember,
  type StaffCategory,
  type Qualification,
  type ExpertiseItem,
  type ResponsibilityItem,
  type TimelineEntry,
  type ScheduleEntry,
  type Publication,
  type Award,
  type Membership,
} from "@/lib/data/staff";

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

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="rounded-2xl border border-border bg-card p-6">
      <h3 className="font-display text-sm font-bold text-text">{title}</h3>
      <div className="mt-4">{children}</div>
    </section>
  );
}

function ListEditor<T>({
  items,
  onChange,
  newItem,
  max,
  renderRow,
  addLabel = "Add",
}: {
  items: T[];
  onChange: (items: T[]) => void;
  newItem: T;
  max: number;
  addLabel?: string;
  renderRow: (item: T, update: (next: T) => void) => ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      {items.map((item, i) => (
        <div key={i} className="flex items-center gap-2 rounded-lg border border-border p-2.5">
          <div className="flex flex-1 flex-wrap items-center gap-2">
            {renderRow(item, (next) => onChange(items.map((it, idx) => (idx === i ? next : it))))}
          </div>
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
      {items.length === 0 && <p className="text-xs text-text-muted">None added — this section won&apos;t show on the profile.</p>}
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
  role: string;
  category: StaffCategory;
  department: string;
  image: string;
  experience: string;
  shortBio: string;
  biography: string;
  qualifications: Qualification[];
  languages: string[];
  expertise: ExpertiseItem[];
  responsibilities: ResponsibilityItem[];
  experienceTimeline: TimelineEntry[];
  schedule: ScheduleEntry[];
  publications: Publication[];
  awards: Award[];
  memberships: Membership[];
  email: string;
  phone: string;
  office: string;
  appointmentEnabled: boolean;
  featured: boolean;
};

const EMPTY_FORM: FormState = {
  slug: "",
  name: "",
  role: "",
  category: "general",
  department: "",
  image: "photo-1607990281513-2c110a25bd8c",
  experience: "",
  shortBio: "",
  biography: "",
  qualifications: [],
  languages: [],
  expertise: [],
  responsibilities: [],
  experienceTimeline: [],
  schedule: [],
  publications: [],
  awards: [],
  memberships: [],
  email: "",
  phone: "",
  office: "",
  appointmentEnabled: false,
  featured: false,
};

function toForm(s: StaffMember): FormState {
  return {
    slug: s.slug,
    name: s.name,
    role: s.role,
    category: s.category,
    department: s.department,
    image: s.image,
    experience: s.experience,
    shortBio: s.shortBio,
    biography: s.biography,
    qualifications: s.qualifications,
    languages: s.languages,
    expertise: s.expertise,
    responsibilities: s.responsibilities,
    experienceTimeline: s.experienceTimeline,
    schedule: s.schedule,
    publications: s.publications,
    awards: s.awards,
    memberships: s.memberships,
    email: s.email,
    phone: s.phone,
    office: s.office,
    appointmentEnabled: s.appointmentEnabled,
    featured: s.featured,
  };
}

function StaffForm({ form, onChange, slugEditable }: { form: FormState; onChange: (f: FormState) => void; slugEditable: boolean }) {
  return (
    <div className="flex flex-col gap-4">
      <Section title="Basic Info">
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
              <Field label="Role / Designation">
                <input className={inputClass} value={form.role} onChange={(e) => onChange({ ...form, role: e.target.value })} required />
              </Field>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Category">
                <select
                  className={inputClass}
                  value={form.category}
                  onChange={(e) => onChange({ ...form, category: e.target.value as StaffCategory })}
                >
                  {STAFF_CATEGORIES.map((c) => (
                    <option key={c.key} value={c.key}>
                      {c.label}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Slug (URL: /staff/...)">
                <input className={inputClass} value={form.slug} onChange={(e) => onChange({ ...form, slug: slugify(e.target.value) })} required />
              </Field>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Department (optional)">
                <input className={inputClass} value={form.department} onChange={(e) => onChange({ ...form, department: e.target.value })} />
              </Field>
              <Field label="Experience (optional)">
                <input
                  className={inputClass}
                  value={form.experience}
                  onChange={(e) => onChange({ ...form, experience: e.target.value })}
                  placeholder="e.g. 12+ Years"
                />
              </Field>
            </div>
          </div>
        </div>
      </Section>

      <Section title="Bio">
        <div className="flex flex-col gap-4">
          <Field label="Short Bio (used on cards)">
            <textarea className={cn(inputClass, "min-h-16")} value={form.shortBio} onChange={(e) => onChange({ ...form, shortBio: e.target.value })} required />
          </Field>
          <Field label="Full Biography (blank line = new paragraph)">
            <textarea className={cn(inputClass, "min-h-32")} value={form.biography} onChange={(e) => onChange({ ...form, biography: e.target.value })} required />
          </Field>
        </div>
      </Section>

      <Section title="Qualifications & Languages">
        <div className="flex flex-col gap-5">
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wide text-text-muted">Qualifications</h4>
            <div className="mt-2">
              <ListEditor
                items={form.qualifications}
                max={12}
                addLabel="Add Qualification"
                newItem={{ degree: "", institution: "", year: "" }}
                onChange={(qualifications) => onChange({ ...form, qualifications })}
                renderRow={(q, update) => (
                  <>
                    <input className={cn(inputClass, "w-36")} value={q.degree} onChange={(e) => update({ ...q, degree: e.target.value })} placeholder="Degree" />
                    <input className={cn(inputClass, "flex-1 min-w-32")} value={q.institution} onChange={(e) => update({ ...q, institution: e.target.value })} placeholder="Institution" />
                    <input className={cn(inputClass, "w-20")} value={q.year} onChange={(e) => update({ ...q, year: e.target.value })} placeholder="Year" />
                  </>
                )}
              />
            </div>
          </div>
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wide text-text-muted">Languages</h4>
            <div className="mt-2">
              <ListEditor
                items={form.languages}
                max={10}
                addLabel="Add Language"
                newItem=""
                onChange={(languages) => onChange({ ...form, languages })}
                renderRow={(l, update) => (
                  <input className={cn(inputClass, "flex-1")} value={l} onChange={(e) => update(e.target.value)} placeholder="Language" />
                )}
              />
            </div>
          </div>
        </div>
      </Section>

      <Section title="Areas of Expertise">
        <ListEditor
          items={form.expertise}
          max={12}
          addLabel="Add Expertise"
          newItem={{ title: "", detail: "" }}
          onChange={(expertise) => onChange({ ...form, expertise })}
          renderRow={(item, update) => (
            <>
              <input className={cn(inputClass, "w-44")} value={item.title} onChange={(e) => update({ ...item, title: e.target.value })} placeholder="Title" />
              <input className={cn(inputClass, "flex-1 min-w-40")} value={item.detail} onChange={(e) => update({ ...item, detail: e.target.value })} placeholder="Detail" />
            </>
          )}
        />
      </Section>

      <Section title="Responsibilities">
        <ListEditor
          items={form.responsibilities}
          max={12}
          addLabel="Add Responsibility"
          newItem={{ title: "", detail: "" }}
          onChange={(responsibilities) => onChange({ ...form, responsibilities })}
          renderRow={(item, update) => (
            <>
              <input className={cn(inputClass, "w-44")} value={item.title} onChange={(e) => update({ ...item, title: e.target.value })} placeholder="Title" />
              <input className={cn(inputClass, "flex-1 min-w-40")} value={item.detail} onChange={(e) => update({ ...item, detail: e.target.value })} placeholder="Detail" />
            </>
          )}
        />
      </Section>

      <Section title="Professional Experience Timeline">
        <ListEditor
          items={form.experienceTimeline}
          max={12}
          addLabel="Add Entry"
          newItem={{ period: "", title: "", place: "", detail: "" }}
          onChange={(experienceTimeline) => onChange({ ...form, experienceTimeline })}
          renderRow={(item, update) => (
            <>
              <input className={cn(inputClass, "w-32")} value={item.period} onChange={(e) => update({ ...item, period: e.target.value })} placeholder="2020 — Present" />
              <input className={cn(inputClass, "w-40")} value={item.title} onChange={(e) => update({ ...item, title: e.target.value })} placeholder="Title" />
              <input className={cn(inputClass, "w-40")} value={item.place} onChange={(e) => update({ ...item, place: e.target.value })} placeholder="Place" />
              <input className={cn(inputClass, "flex-1 min-w-40")} value={item.detail} onChange={(e) => update({ ...item, detail: e.target.value })} placeholder="Detail" />
            </>
          )}
        />
      </Section>

      <Section title="Weekly Schedule">
        <ListEditor
          items={form.schedule}
          max={14}
          addLabel="Add Day"
          newItem={{ day: "", time: "", location: "" }}
          onChange={(schedule) => onChange({ ...form, schedule })}
          renderRow={(item, update) => (
            <>
              <input className={cn(inputClass, "w-40")} value={item.day} onChange={(e) => update({ ...item, day: e.target.value })} placeholder="Monday" />
              <input className={cn(inputClass, "w-40")} value={item.time} onChange={(e) => update({ ...item, time: e.target.value })} placeholder="9:00 AM – 1:00 PM" />
              <input className={cn(inputClass, "flex-1 min-w-40")} value={item.location} onChange={(e) => update({ ...item, location: e.target.value })} placeholder="Location" />
            </>
          )}
        />
      </Section>

      <Section title="Publications (optional)">
        <ListEditor
          items={form.publications}
          max={20}
          addLabel="Add Publication"
          newItem={{ title: "", journal: "", year: "", link: "" }}
          onChange={(publications) => onChange({ ...form, publications })}
          renderRow={(item, update) => (
            <>
              <input className={cn(inputClass, "flex-1 min-w-40")} value={item.title} onChange={(e) => update({ ...item, title: e.target.value })} placeholder="Title" />
              <input className={cn(inputClass, "w-40")} value={item.journal} onChange={(e) => update({ ...item, journal: e.target.value })} placeholder="Journal" />
              <input className={cn(inputClass, "w-20")} value={item.year} onChange={(e) => update({ ...item, year: e.target.value })} placeholder="Year" />
              <input className={cn(inputClass, "w-40")} value={item.link} onChange={(e) => update({ ...item, link: e.target.value })} placeholder="Link (optional)" />
            </>
          )}
        />
      </Section>

      <Section title="Awards & Achievements (optional)">
        <ListEditor
          items={form.awards}
          max={20}
          addLabel="Add Award"
          newItem={{ title: "", org: "", year: "", detail: "" }}
          onChange={(awards) => onChange({ ...form, awards })}
          renderRow={(item, update) => (
            <>
              <input className={cn(inputClass, "w-40")} value={item.title} onChange={(e) => update({ ...item, title: e.target.value })} placeholder="Award" />
              <input className={cn(inputClass, "w-40")} value={item.org} onChange={(e) => update({ ...item, org: e.target.value })} placeholder="Organization" />
              <input className={cn(inputClass, "w-20")} value={item.year} onChange={(e) => update({ ...item, year: e.target.value })} placeholder="Year" />
              <input className={cn(inputClass, "flex-1 min-w-32")} value={item.detail} onChange={(e) => update({ ...item, detail: e.target.value })} placeholder="Detail (optional)" />
            </>
          )}
        />
      </Section>

      <Section title="Professional Memberships (optional)">
        <ListEditor
          items={form.memberships}
          max={20}
          addLabel="Add Membership"
          newItem={{ title: "", org: "" }}
          onChange={(memberships) => onChange({ ...form, memberships })}
          renderRow={(item, update) => (
            <>
              <input className={cn(inputClass, "w-40")} value={item.title} onChange={(e) => update({ ...item, title: e.target.value })} placeholder="e.g. Fellow" />
              <input className={cn(inputClass, "flex-1 min-w-40")} value={item.org} onChange={(e) => update({ ...item, org: e.target.value })} placeholder="Organization" />
            </>
          )}
        />
      </Section>

      <Section title="Contact & Appointment">
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <Field label="Email (optional)">
              <input className={inputClass} value={form.email} onChange={(e) => onChange({ ...form, email: e.target.value })} />
            </Field>
            <Field label="Phone (optional)">
              <input className={inputClass} value={form.phone} onChange={(e) => onChange({ ...form, phone: e.target.value })} />
            </Field>
            <Field label="Office / Location (optional)">
              <input className={inputClass} value={form.office} onChange={(e) => onChange({ ...form, office: e.target.value })} />
            </Field>
          </div>
          <div className="flex flex-wrap gap-6">
            <label className="flex items-center gap-2 text-sm text-text">
              <input type="checkbox" checked={form.appointmentEnabled} onChange={(e) => onChange({ ...form, appointmentEnabled: e.target.checked })} />
              Show the appointment contact form on this profile
            </label>
            <label className="flex items-center gap-2 text-sm text-text">
              <input type="checkbox" checked={form.featured} onChange={(e) => onChange({ ...form, featured: e.target.checked })} />
              Feature on homepage teaser
            </label>
          </div>
        </div>
      </Section>
    </div>
  );
}

export default function StaffAdminPage() {
  const [staff, setStaff] = useState<StaffMember[]>([]);
  const [loading, startLoad] = useTransition();
  const [message, setMessage] = useState<{ type: "error" | "success"; text: string } | null>(null);
  const [saving, setSaving] = useState(false);

  const [adding, setAdding] = useState(false);
  const [addForm, setAddForm] = useState<FormState>(EMPTY_FORM);

  const [editingId, setEditingId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState<FormState>(EMPTY_FORM);

  function load() {
    startLoad(async () => {
      const res = await fetch("/api/admin/staff");
      const data = await res.json();
      setStaff(data.staff ?? []);
    });
  }

  useEffect(load, []);

  function startAdd() {
    setAdding(true);
    setAddForm(EMPTY_FORM);
    setMessage(null);
  }

  function requiredOk(f: FormState) {
    return f.slug.trim() && f.name.trim() && f.role.trim() && f.image.trim() && f.shortBio.trim() && f.biography.trim();
  }

  async function handleAdd() {
    if (!requiredOk(addForm)) {
      setMessage({ type: "error", text: "Name, role, photo, short bio, and biography are required." });
      return;
    }
    setSaving(true);
    const res = await fetch("/api/admin/staff", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(addForm),
    });
    setSaving(false);
    if (!res.ok) {
      const data = await res.json().catch(() => null);
      setMessage({ type: "error", text: data?.error ?? "Could not add staff member." });
      return;
    }
    setAdding(false);
    setMessage({ type: "success", text: "Staff member added." });
    load();
  }

  function startEdit(s: StaffMember) {
    setEditingId(s.id);
    setEditForm(toForm(s));
    setMessage(null);
  }

  async function handleSaveEdit(id: number) {
    if (!requiredOk(editForm)) {
      setMessage({ type: "error", text: "Name, role, photo, short bio, and biography are required." });
      return;
    }
    setSaving(true);
    const res = await fetch(`/api/admin/staff/${id}`, {
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
    setMessage({ type: "success", text: "Staff member updated." });
    load();
  }

  async function toggleVisible(s: StaffMember) {
    await fetch(`/api/admin/staff/${s.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isVisible: !s.isVisible }),
    });
    load();
  }

  async function handleDelete(id: number) {
    if (!window.confirm("Delete this staff member? This cannot be undone.")) return;
    const res = await fetch(`/api/admin/staff/${id}`, { method: "DELETE" });
    if (res.ok) {
      setMessage({ type: "success", text: "Staff member deleted." });
      load();
    }
  }

  async function move(index: number, dir: -1 | 1) {
    const target = index + dir;
    if (target < 0 || target >= staff.length) return;
    const reordered = [...staff];
    [reordered[index], reordered[target]] = [reordered[target], reordered[index]];
    setStaff(reordered);
    await fetch("/api/admin/staff/reorder", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ order: reordered.map((s) => s.id) }),
    });
    load();
  }

  return (
    <div>
      <div>
        <h1 className="font-display text-2xl font-bold text-text">Administration & Staff</h1>
        <p className="mt-1 text-sm text-text-muted">
          Powers the /staff directory page. Not shown on the homepage, and separate from the Doctors directory — doctors are never listed here.
        </p>
      </div>

      {loading && <p className="mt-4 text-sm text-text-muted">Loading…</p>}
      {message && <p className={cn("mt-4 text-sm", message.type === "error" ? "text-primary" : "text-emerald-600")}>{message.text}</p>}

      <div className="mt-6 flex flex-col gap-4">
        {staff.map((s, i) => {
          const isEditing = editingId === s.id;
          return (
            <section key={s.id} className="rounded-2xl border border-border bg-card p-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full border border-border">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={resolveImageSrc(s.image, 100)} alt="" className="h-full w-full object-cover" />
                  </div>
                  {!isEditing && (
                    <div>
                      <div className="flex items-center gap-2">
                        <h2 className="font-display text-base font-bold text-text">{s.name}</h2>
                        {s.featured && <Star className="h-3.5 w-3.5 fill-primary text-primary" />}
                      </div>
                      <p className="text-xs text-text-muted">
                        {s.role} · {staffCategoryLabel(s.category)}
                      </p>
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-1.5">
                  <button type="button" onClick={() => move(i, -1)} disabled={i === 0} className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-text-muted transition-colors hover:border-primary hover:text-primary disabled:opacity-30" aria-label="Move up">
                    <ChevronUp className="h-4 w-4" />
                  </button>
                  <button type="button" onClick={() => move(i, 1)} disabled={i === staff.length - 1} className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-text-muted transition-colors hover:border-primary hover:text-primary disabled:opacity-30" aria-label="Move down">
                    <ChevronDown className="h-4 w-4" />
                  </button>
                  <button type="button" onClick={() => toggleVisible(s)} className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-text-muted transition-colors hover:border-primary hover:text-primary" aria-label={s.isVisible ? "Hide" : "Show"} title={s.isVisible ? "Visible" : "Hidden"}>
                    {s.isVisible ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                  </button>
                  {isEditing ? (
                    <>
                      <button type="button" onClick={() => handleSaveEdit(s.id)} disabled={saving} className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-text-muted transition-colors hover:border-primary hover:text-primary" aria-label="Save">
                        <Check className="h-4 w-4" />
                      </button>
                      <button type="button" onClick={() => setEditingId(null)} className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-text-muted transition-colors hover:border-primary hover:text-primary" aria-label="Cancel">
                        <X className="h-4 w-4" />
                      </button>
                    </>
                  ) : (
                    <button type="button" onClick={() => startEdit(s)} className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-text-muted transition-colors hover:border-primary hover:text-primary" aria-label="Edit">
                      <Pencil className="h-4 w-4" />
                    </button>
                  )}
                  <button type="button" onClick={() => handleDelete(s.id)} className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-text-muted transition-colors hover:border-primary hover:text-primary" aria-label="Delete">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {isEditing && (
                <div className="mt-5 border-t border-border pt-5">
                  <StaffForm form={editForm} onChange={setEditForm} slugEditable={false} />
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
              <h2 className="font-display text-base font-bold text-text">New Staff Member</h2>
              <button type="button" onClick={() => setAdding(false)} className="text-text-muted hover:text-primary">
                <X className="h-4 w-4" />
              </button>
            </div>
            <StaffForm form={addForm} onChange={setAddForm} slugEditable />
            <div>
              <button
                type="button"
                onClick={handleAdd}
                disabled={saving}
                className="rounded-full bg-primary px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-primary-deep disabled:opacity-60"
              >
                {saving ? "Saving…" : "Add Staff Member"}
              </button>
            </div>
          </div>
        ) : (
          <button type="button" onClick={startAdd} className="flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-sm font-medium text-text transition-colors hover:border-primary hover:text-primary">
            <Plus className="h-3.5 w-3.5" /> Add Staff Member
          </button>
        )}
      </div>
    </div>
  );
}
