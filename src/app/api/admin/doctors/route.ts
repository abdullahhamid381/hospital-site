import { NextRequest, NextResponse } from "next/server";
import { pool, ensureDoctorsTable } from "@/lib/db";
import { getAuthorizedAdmin } from "@/lib/admin";
import { DEFAULT_DOCTORS } from "@/lib/data/doctors";

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

async function seedDefaultsIfEmpty() {
  const { rows } = await pool.query<{ n: number }>("SELECT COUNT(*)::int AS n FROM doctors");
  if (rows[0]?.n > 0) return;

  for (const d of DEFAULT_DOCTORS) {
    await pool.query(
      `INSERT INTO doctors (slug, name, specialization, department, experience, qualifications, languages, available_days, available_timings, bio, expertise, image, sort_order, is_visible)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14)`,
      [
        d.slug, d.name, d.specialization, d.department, d.experience,
        JSON.stringify(d.qualifications), JSON.stringify(d.languages),
        d.availableDays, d.availableTimings, d.bio, JSON.stringify(d.expertise),
        d.image, d.sortOrder, d.isVisible,
      ]
    );
  }
}

export async function GET() {
  const admin = await getAuthorizedAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await ensureDoctorsTable();
  await seedDefaultsIfEmpty();

  const { rows } = await pool.query<DoctorRow>("SELECT * FROM doctors ORDER BY sort_order ASC, id ASC");
  return NextResponse.json({ doctors: rows.map(rowToJson) });
}

export async function POST(req: NextRequest) {
  const admin = await getAuthorizedAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await ensureDoctorsTable();

  const body = await req.json().catch(() => null);
  if (!body) return NextResponse.json({ error: "Invalid request body" }, { status: 400 });

  const { slug, name, specialization, department, experience, availableDays, availableTimings, bio, image } = body;

  if (!isNonEmptyString(slug) || !SLUG_RE.test(slug)) {
    return NextResponse.json({ error: "Slug must be lowercase letters, numbers, and hyphens only" }, { status: 400 });
  }
  if (!isNonEmptyString(name)) return NextResponse.json({ error: "Name is required" }, { status: 400 });
  if (!isNonEmptyString(specialization)) return NextResponse.json({ error: "Specialization is required" }, { status: 400 });
  if (!isNonEmptyString(department)) return NextResponse.json({ error: "Department is required" }, { status: 400 });
  if (!isNonEmptyString(experience)) return NextResponse.json({ error: "Experience is required" }, { status: 400 });
  if (!isNonEmptyString(availableDays)) return NextResponse.json({ error: "Available days is required" }, { status: 400 });
  if (!isNonEmptyString(availableTimings)) return NextResponse.json({ error: "Available timings is required" }, { status: 400 });
  if (!isNonEmptyString(bio)) return NextResponse.json({ error: "Bio is required" }, { status: 400 });
  if (!isNonEmptyString(image)) return NextResponse.json({ error: "Photo is required" }, { status: 400 });
  if (!isValidStringList(body.qualifications)) {
    return NextResponse.json({ error: "Qualifications must be a non-empty list" }, { status: 400 });
  }
  if (!isValidStringList(body.languages)) {
    return NextResponse.json({ error: "Languages must be a non-empty list" }, { status: 400 });
  }
  if (!isValidStringList(body.expertise)) {
    return NextResponse.json({ error: "Expertise must be a non-empty list" }, { status: 400 });
  }

  try {
    const { rows } = await pool.query<DoctorRow>(
      `INSERT INTO doctors (slug, name, specialization, department, experience, qualifications, languages, available_days, available_timings, bio, expertise, image, sort_order, is_visible)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12, COALESCE((SELECT MAX(sort_order) + 1 FROM doctors), 0), $13)
       RETURNING *`,
      [
        slug, name, specialization, department, experience,
        JSON.stringify(body.qualifications), JSON.stringify(body.languages),
        availableDays, availableTimings, bio, JSON.stringify(body.expertise),
        image, body.isVisible === undefined ? true : Boolean(body.isVisible),
      ]
    );
    return NextResponse.json(rowToJson(rows[0]), { status: 201 });
  } catch (err) {
    const pgErr = err as { code?: string };
    if (pgErr.code === "23505") {
      return NextResponse.json({ error: "A doctor with this slug already exists" }, { status: 409 });
    }
    throw err;
  }
}
