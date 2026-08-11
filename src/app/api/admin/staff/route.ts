import { NextRequest, NextResponse } from "next/server";
import { pool, ensureStaffTable } from "@/lib/db";
import { getAuthorizedAdmin } from "@/lib/admin";
import {
  DEFAULT_STAFF,
  STAFF_CATEGORIES,
  isValidQualifications,
  isValidStringList,
  isValidTitleDetailList,
  isValidTimeline,
  isValidSchedule,
  isValidPublications,
  isValidAwards,
  isValidMemberships,
  type StaffCategory,
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

async function seedDefaultsIfEmpty() {
  const { rows } = await pool.query<{ n: number }>("SELECT COUNT(*)::int AS n FROM staff_members");
  if (rows[0]?.n > 0) return;

  for (const s of DEFAULT_STAFF) {
    await pool.query(
      `INSERT INTO staff_members (
         slug, name, role, category, department, image, experience, short_bio, biography,
         qualifications, languages, expertise, responsibilities, experience_timeline, schedule,
         publications, awards, memberships, email, phone, office, appointment_enabled, featured,
         sort_order, is_visible
       ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23,$24,$25)`,
      [
        s.slug, s.name, s.role, s.category, s.department, s.image, s.experience, s.shortBio, s.biography,
        JSON.stringify(s.qualifications), JSON.stringify(s.languages), JSON.stringify(s.expertise),
        JSON.stringify(s.responsibilities), JSON.stringify(s.experienceTimeline), JSON.stringify(s.schedule),
        JSON.stringify(s.publications), JSON.stringify(s.awards), JSON.stringify(s.memberships),
        s.email, s.phone, s.office, s.appointmentEnabled, s.featured, s.sortOrder, s.isVisible,
      ]
    );
  }
}

export async function GET() {
  const admin = await getAuthorizedAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await ensureStaffTable();
  await seedDefaultsIfEmpty();

  const { rows } = await pool.query("SELECT * FROM staff_members ORDER BY sort_order ASC, id ASC");
  return NextResponse.json({ staff: rows.map(rowToJson) });
}

export async function POST(req: NextRequest) {
  const admin = await getAuthorizedAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await ensureStaffTable();

  const body = await req.json().catch(() => null);
  if (!body) return NextResponse.json({ error: "Invalid request body" }, { status: 400 });

  const { slug, name, role, category, image, shortBio, biography } = body;

  if (!isNonEmptyString(slug) || !SLUG_RE.test(slug)) {
    return NextResponse.json({ error: "Slug must be lowercase letters, numbers, and hyphens only" }, { status: 400 });
  }
  if (!isNonEmptyString(name)) return NextResponse.json({ error: "Name is required" }, { status: 400 });
  if (!isNonEmptyString(role)) return NextResponse.json({ error: "Role is required" }, { status: 400 });
  if (!CATEGORY_KEYS.includes(category)) return NextResponse.json({ error: "Invalid category" }, { status: 400 });
  if (!isNonEmptyString(image)) return NextResponse.json({ error: "Photo is required" }, { status: 400 });
  if (!isNonEmptyString(shortBio)) return NextResponse.json({ error: "Short bio is required" }, { status: 400 });
  if (!isNonEmptyString(biography)) return NextResponse.json({ error: "Biography is required" }, { status: 400 });

  const qualifications = body.qualifications ?? [];
  const languages = body.languages ?? [];
  const expertise = body.expertise ?? [];
  const responsibilities = body.responsibilities ?? [];
  const experienceTimeline = body.experienceTimeline ?? [];
  const schedule = body.schedule ?? [];
  const publications = body.publications ?? [];
  const awards = body.awards ?? [];
  const memberships = body.memberships ?? [];

  if (!isValidQualifications(qualifications)) return NextResponse.json({ error: "Invalid qualifications" }, { status: 400 });
  if (!isValidStringList(languages)) return NextResponse.json({ error: "Invalid languages" }, { status: 400 });
  if (!isValidTitleDetailList(expertise)) return NextResponse.json({ error: "Invalid expertise" }, { status: 400 });
  if (!isValidTitleDetailList(responsibilities)) return NextResponse.json({ error: "Invalid responsibilities" }, { status: 400 });
  if (!isValidTimeline(experienceTimeline)) return NextResponse.json({ error: "Invalid experience timeline" }, { status: 400 });
  if (!isValidSchedule(schedule)) return NextResponse.json({ error: "Invalid schedule" }, { status: 400 });
  if (!isValidPublications(publications)) return NextResponse.json({ error: "Invalid publications" }, { status: 400 });
  if (!isValidAwards(awards)) return NextResponse.json({ error: "Invalid awards" }, { status: 400 });
  if (!isValidMemberships(memberships)) return NextResponse.json({ error: "Invalid memberships" }, { status: 400 });

  try {
    const { rows } = await pool.query(
      `INSERT INTO staff_members (
         slug, name, role, category, department, image, experience, short_bio, biography,
         qualifications, languages, expertise, responsibilities, experience_timeline, schedule,
         publications, awards, memberships, email, phone, office, appointment_enabled, featured,
         sort_order, is_visible
       ) VALUES (
         $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23,
         COALESCE((SELECT MAX(sort_order) + 1 FROM staff_members), 0), $24
       ) RETURNING *`,
      [
        slug, name, role, category as StaffCategory, body.department ?? "", image, body.experience ?? "",
        shortBio, biography, JSON.stringify(qualifications), JSON.stringify(languages), JSON.stringify(expertise),
        JSON.stringify(responsibilities), JSON.stringify(experienceTimeline), JSON.stringify(schedule),
        JSON.stringify(publications), JSON.stringify(awards), JSON.stringify(memberships),
        body.email ?? "", body.phone ?? "", body.office ?? "", Boolean(body.appointmentEnabled), Boolean(body.featured),
        body.isVisible === undefined ? true : Boolean(body.isVisible),
      ]
    );
    return NextResponse.json(rowToJson(rows[0]), { status: 201 });
  } catch (err) {
    const pgErr = err as { code?: string };
    if (pgErr.code === "23505") {
      return NextResponse.json({ error: "A staff member with this slug already exists" }, { status: 409 });
    }
    throw err;
  }
}
