import { NextRequest, NextResponse } from "next/server";
import { pool, ensureStaffTable } from "@/lib/db";
import { getAuthorizedAdmin } from "@/lib/admin";
import {
  STAFF_CATEGORIES,
  isValidQualifications,
  isValidStringList,
  isValidTitleDetailList,
  isValidTimeline,
  isValidSchedule,
  isValidPublications,
  isValidAwards,
  isValidMemberships,
} from "@/lib/data/staff";

const CATEGORY_KEYS = STAFF_CATEGORIES.map((c) => c.key);
const SLUG_RE = /^[a-z0-9]+(-[a-z0-9]+)*$/;

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function rowToJson(r: Record<string, unknown>) {
  return {
    id: r.id,
    slug: r.slug,
    name: r.name,
    role: r.role,
    category: r.category,
    department: r.department ?? "",
    image: r.image,
    experience: r.experience ?? "",
    shortBio: r.short_bio,
    biography: r.biography,
    qualifications: r.qualifications,
    languages: r.languages,
    expertise: r.expertise,
    responsibilities: r.responsibilities,
    experienceTimeline: r.experience_timeline,
    schedule: r.schedule,
    publications: r.publications,
    awards: r.awards,
    memberships: r.memberships,
    email: r.email ?? "",
    phone: r.phone ?? "",
    office: r.office ?? "",
    appointmentEnabled: r.appointment_enabled,
    featured: r.featured,
    sortOrder: r.sort_order,
    isVisible: r.is_visible,
    createdAt: r.created_at,
    updatedAt: r.updated_at,
  };
}

const SIMPLE_TEXT_FIELDS: Record<string, string> = {
  name: "name",
  role: "role",
  department: "department",
  image: "image",
  experience: "experience",
  shortBio: "short_bio",
  biography: "biography",
  email: "email",
  phone: "phone",
  office: "office",
};

const REQUIRED_TEXT_FIELDS = new Set(["name", "role", "image", "shortBio", "biography"]);

const ARRAY_FIELDS: Record<string, { column: string; validate: (v: unknown) => boolean }> = {
  qualifications: { column: "qualifications", validate: isValidQualifications },
  languages: { column: "languages", validate: isValidStringList },
  expertise: { column: "expertise", validate: isValidTitleDetailList },
  responsibilities: { column: "responsibilities", validate: isValidTitleDetailList },
  experienceTimeline: { column: "experience_timeline", validate: isValidTimeline },
  schedule: { column: "schedule", validate: isValidSchedule },
  publications: { column: "publications", validate: isValidPublications },
  awards: { column: "awards", validate: isValidAwards },
  memberships: { column: "memberships", validate: isValidMemberships },
};

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const admin = await getAuthorizedAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await ensureStaffTable();

  const { id } = await params;
  const staffId = Number(id);
  if (!Number.isInteger(staffId)) return NextResponse.json({ error: "Invalid id" }, { status: 400 });

  const body = await req.json().catch(() => null);
  if (!body) return NextResponse.json({ error: "Invalid request body" }, { status: 400 });

  const updates: string[] = [];
  const values: unknown[] = [];

  for (const [field, column] of Object.entries(SIMPLE_TEXT_FIELDS)) {
    if (body[field] === undefined) continue;
    if (REQUIRED_TEXT_FIELDS.has(field) && !isNonEmptyString(body[field])) {
      return NextResponse.json({ error: `Field "${field}" cannot be empty` }, { status: 400 });
    }
    values.push(body[field]);
    updates.push(`${column} = $${values.length}`);
  }

  if (body.slug !== undefined) {
    if (!isNonEmptyString(body.slug) || !SLUG_RE.test(body.slug)) {
      return NextResponse.json({ error: "Slug must be lowercase letters, numbers, and hyphens only" }, { status: 400 });
    }
    values.push(body.slug);
    updates.push(`slug = $${values.length}`);
  }

  if (body.category !== undefined) {
    if (!CATEGORY_KEYS.includes(body.category)) return NextResponse.json({ error: "Invalid category" }, { status: 400 });
    values.push(body.category);
    updates.push(`category = $${values.length}`);
  }

  for (const [field, { column, validate }] of Object.entries(ARRAY_FIELDS)) {
    if (body[field] === undefined) continue;
    if (!validate(body[field])) return NextResponse.json({ error: `Invalid ${field}` }, { status: 400 });
    values.push(JSON.stringify(body[field]));
    updates.push(`${column} = $${values.length}`);
  }

  if (body.appointmentEnabled !== undefined) {
    values.push(Boolean(body.appointmentEnabled));
    updates.push(`appointment_enabled = $${values.length}`);
  }
  if (body.featured !== undefined) {
    values.push(Boolean(body.featured));
    updates.push(`featured = $${values.length}`);
  }
  if (body.isVisible !== undefined) {
    values.push(Boolean(body.isVisible));
    updates.push(`is_visible = $${values.length}`);
  }

  if (updates.length === 0) {
    return NextResponse.json({ error: "No fields to update" }, { status: 400 });
  }
  updates.push("updated_at = now()");
  values.push(staffId);

  try {
    const { rows } = await pool.query(
      `UPDATE staff_members SET ${updates.join(", ")} WHERE id = $${values.length} RETURNING *`,
      values
    );
    if (rows.length === 0) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(rowToJson(rows[0]));
  } catch (err) {
    const pgErr = err as { code?: string };
    if (pgErr.code === "23505") {
      return NextResponse.json({ error: "A staff member with this slug already exists" }, { status: 409 });
    }
    throw err;
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const admin = await getAuthorizedAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await ensureStaffTable();

  const { id } = await params;
  const staffId = Number(id);
  if (!Number.isInteger(staffId)) return NextResponse.json({ error: "Invalid id" }, { status: 400 });

  const { rowCount } = await pool.query("DELETE FROM staff_members WHERE id = $1", [staffId]);
  if (rowCount === 0) return NextResponse.json({ error: "Not found" }, { status: 404 });

  return NextResponse.json({ ok: true });
}
