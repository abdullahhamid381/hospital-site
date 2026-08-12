import { NextRequest, NextResponse } from "next/server";
import { pool, ensureDoctorsTable } from "@/lib/db";
import { getAuthorizedAdmin } from "@/lib/admin";

type DoctorRow = {
  id: number;
  slug: string;
  name: string;
  specialization: string;
  department: string;
  experience: string;
  qualifications: string[];
  languages: string[];
  available_days: string;
  available_timings: string;
  bio: string;
  expertise: string[];
  image: string;
  sort_order: number;
  is_visible: boolean;
  created_at: string;
  updated_at: string;
};

const SLUG_RE = /^[a-z0-9]+(-[a-z0-9]+)*$/;

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function isValidStringList(value: unknown, max = 12): value is string[] {
  if (!Array.isArray(value) || value.length === 0 || value.length > max) return false;
  return value.every((v) => isNonEmptyString(v));
}

function rowToJson(r: DoctorRow) {
  return {
    id: r.id,
    slug: r.slug,
    name: r.name,
    specialization: r.specialization,
    department: r.department,
    experience: r.experience,
    qualifications: r.qualifications,
    languages: r.languages,
    availableDays: r.available_days,
    availableTimings: r.available_timings,
    bio: r.bio,
    expertise: r.expertise,
    image: r.image,
    sortOrder: r.sort_order,
    isVisible: r.is_visible,
    createdAt: r.created_at,
    updatedAt: r.updated_at,
  };
}

const SIMPLE_TEXT_FIELDS: Record<string, string> = {
  name: "name",
  specialization: "specialization",
  department: "department",
  experience: "experience",
  availableDays: "available_days",
  availableTimings: "available_timings",
  bio: "bio",
  image: "image",
};

const ARRAY_FIELDS: Record<string, string> = {
  qualifications: "qualifications",
  languages: "languages",
  expertise: "expertise",
};

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const admin = await getAuthorizedAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await ensureDoctorsTable();

  const { id } = await params;
  const doctorId = Number(id);
  if (!Number.isInteger(doctorId)) return NextResponse.json({ error: "Invalid id" }, { status: 400 });

  const body = await req.json().catch(() => null);
  if (!body) return NextResponse.json({ error: "Invalid request body" }, { status: 400 });

  const updates: string[] = [];
  const values: unknown[] = [];

  for (const [field, column] of Object.entries(SIMPLE_TEXT_FIELDS)) {
    if (body[field] === undefined) continue;
    if (!isNonEmptyString(body[field])) {
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

  for (const [field, column] of Object.entries(ARRAY_FIELDS)) {
    if (body[field] === undefined) continue;
    if (!isValidStringList(body[field])) {
      return NextResponse.json({ error: `Field "${field}" must be a non-empty list` }, { status: 400 });
    }
    values.push(JSON.stringify(body[field]));
    updates.push(`${column} = $${values.length}`);
  }

  if (body.isVisible !== undefined) {
    values.push(Boolean(body.isVisible));
    updates.push(`is_visible = $${values.length}`);
  }

  if (updates.length === 0) {
    return NextResponse.json({ error: "No fields to update" }, { status: 400 });
  }
  updates.push("updated_at = now()");
  values.push(doctorId);

  try {
    const { rows } = await pool.query<DoctorRow>(
      `UPDATE doctors SET ${updates.join(", ")} WHERE id = $${values.length} RETURNING *`,
      values
    );
    if (rows.length === 0) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(rowToJson(rows[0]));
  } catch (err) {
    const pgErr = err as { code?: string };
    if (pgErr.code === "23505") {
      return NextResponse.json({ error: "A doctor with this slug already exists" }, { status: 409 });
    }
    throw err;
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const admin = await getAuthorizedAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await ensureDoctorsTable();

  const { id } = await params;
  const doctorId = Number(id);
  if (!Number.isInteger(doctorId)) return NextResponse.json({ error: "Invalid id" }, { status: 400 });

  const { rowCount } = await pool.query("DELETE FROM doctors WHERE id = $1", [doctorId]);
  if (rowCount === 0) return NextResponse.json({ error: "Not found" }, { status: 404 });

  return NextResponse.json({ ok: true });
}
