import { NextRequest, NextResponse } from "next/server";
import { pool, ensureServicesTable } from "@/lib/db";
import { getAuthorizedAdmin } from "@/lib/admin";
import { DEFAULT_SERVICES } from "@/lib/data/services";

type ServiceRow = {
  id: number;
  slug: string;
  name: string;
  icon: string;
  short: string;
  description: string;
  benefits: string[];
  process: { title: string; detail: string }[];
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

function isValidBenefits(value: unknown): value is string[] {
  if (!Array.isArray(value) || value.length === 0 || value.length > 8) return false;
  return value.every((b) => isNonEmptyString(b));
}

function isValidProcess(value: unknown): value is { title: string; detail: string }[] {
  if (!Array.isArray(value) || value.length === 0 || value.length > 8) return false;
  return value.every((p) => p && isNonEmptyString(p.title) && isNonEmptyString(p.detail));
}

function rowToJson(r: ServiceRow) {
  return {
    id: r.id,
    slug: r.slug,
    name: r.name,
    icon: r.icon,
    short: r.short,
    description: r.description,
    benefits: r.benefits,
    process: r.process,
    image: r.image,
    sortOrder: r.sort_order,
    isVisible: r.is_visible,
    createdAt: r.created_at,
    updatedAt: r.updated_at,
  };
}

async function seedDefaultsIfEmpty() {
  const { rows } = await pool.query<{ n: number }>("SELECT COUNT(*)::int AS n FROM services");
  if (rows[0]?.n > 0) return;

  for (const s of DEFAULT_SERVICES) {
    await pool.query(
      `INSERT INTO services (slug, name, icon, short, description, benefits, process, image, sort_order, is_visible)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
      [s.slug, s.name, s.icon, s.short, s.description, JSON.stringify(s.benefits), JSON.stringify(s.process), s.image, s.sortOrder, s.isVisible]
    );
  }
}

export async function GET() {
  const admin = await getAuthorizedAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await ensureServicesTable();
  await seedDefaultsIfEmpty();

  const { rows } = await pool.query<ServiceRow>("SELECT * FROM services ORDER BY sort_order ASC, id ASC");
  return NextResponse.json({ services: rows.map(rowToJson) });
}

export async function POST(req: NextRequest) {
  const admin = await getAuthorizedAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await ensureServicesTable();

  const body = await req.json().catch(() => null);
  if (!body) return NextResponse.json({ error: "Invalid request body" }, { status: 400 });

  const { slug, name, icon, short, description, image } = body;

  if (!isNonEmptyString(slug) || !SLUG_RE.test(slug)) {
    return NextResponse.json({ error: "Slug must be lowercase letters, numbers, and hyphens only" }, { status: 400 });
  }
  if (!isNonEmptyString(name)) return NextResponse.json({ error: "Name is required" }, { status: 400 });
  if (!isNonEmptyString(icon)) return NextResponse.json({ error: "Icon is required" }, { status: 400 });
  if (!isNonEmptyString(short)) return NextResponse.json({ error: "Short summary is required" }, { status: 400 });
  if (!isNonEmptyString(description)) return NextResponse.json({ error: "Description is required" }, { status: 400 });
  if (!isNonEmptyString(image)) return NextResponse.json({ error: "Image is required" }, { status: 400 });
  if (!isValidBenefits(body.benefits)) {
    return NextResponse.json({ error: "Benefits must be a non-empty array (max 8) of text" }, { status: 400 });
  }
  if (!isValidProcess(body.process)) {
    return NextResponse.json({ error: "Process must be a non-empty array (max 8) of { title, detail }" }, { status: 400 });
  }

  const isVisible = body.isVisible === undefined ? true : Boolean(body.isVisible);

  try {
    const { rows } = await pool.query<ServiceRow>(
      `INSERT INTO services (slug, name, icon, short, description, benefits, process, image, sort_order, is_visible)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, COALESCE((SELECT MAX(sort_order) + 1 FROM services), 0), $9)
       RETURNING *`,
      [slug, name, icon, short, description, JSON.stringify(body.benefits), JSON.stringify(body.process), image, isVisible]
    );
    return NextResponse.json(rowToJson(rows[0]), { status: 201 });
  } catch (err) {
    const pgErr = err as { code?: string };
    if (pgErr.code === "23505") {
      return NextResponse.json({ error: "A service with this slug already exists" }, { status: 409 });
    }
    throw err;
  }
}
