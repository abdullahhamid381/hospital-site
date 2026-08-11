import { NextRequest, NextResponse } from "next/server";
import { pool, ensureServicesTable } from "@/lib/db";
import { getAuthorizedAdmin } from "@/lib/admin";

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

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const admin = await getAuthorizedAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await ensureServicesTable();

  const { id } = await params;
  const serviceId = Number(id);
  if (!Number.isInteger(serviceId)) return NextResponse.json({ error: "Invalid id" }, { status: 400 });

  const body = await req.json().catch(() => null);
  if (!body) return NextResponse.json({ error: "Invalid request body" }, { status: 400 });

  const updates: string[] = [];
  const values: unknown[] = [];

  const stringFields: Record<string, string> = {
    name: "name",
    icon: "icon",
    short: "short",
    description: "description",
    image: "image",
  };

  for (const [field, column] of Object.entries(stringFields)) {
    if (body[field] !== undefined) {
      if (!isNonEmptyString(body[field])) {
        return NextResponse.json({ error: `Field "${field}" cannot be empty` }, { status: 400 });
      }
      values.push(body[field]);
      updates.push(`${column} = $${values.length}`);
    }
  }

  if (body.slug !== undefined) {
    if (!isNonEmptyString(body.slug) || !SLUG_RE.test(body.slug)) {
      return NextResponse.json({ error: "Slug must be lowercase letters, numbers, and hyphens only" }, { status: 400 });
    }
    values.push(body.slug);
    updates.push(`slug = $${values.length}`);
  }

  if (body.benefits !== undefined) {
    if (!isValidBenefits(body.benefits)) {
      return NextResponse.json({ error: "Benefits must be a non-empty array (max 8) of text" }, { status: 400 });
    }
    values.push(JSON.stringify(body.benefits));
    updates.push(`benefits = $${values.length}`);
  }

  if (body.process !== undefined) {
    if (!isValidProcess(body.process)) {
      return NextResponse.json({ error: "Process must be a non-empty array (max 8) of { title, detail }" }, { status: 400 });
    }
    values.push(JSON.stringify(body.process));
    updates.push(`process = $${values.length}`);
  }

  if (body.isVisible !== undefined) {
    values.push(Boolean(body.isVisible));
    updates.push(`is_visible = $${values.length}`);
  }

  if (updates.length === 0) {
    return NextResponse.json({ error: "No fields to update" }, { status: 400 });
  }
  updates.push("updated_at = now()");
  values.push(serviceId);

  try {
    const { rows } = await pool.query<ServiceRow>(
      `UPDATE services SET ${updates.join(", ")} WHERE id = $${values.length} RETURNING *`,
      values
    );
    if (rows.length === 0) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(rowToJson(rows[0]));
  } catch (err) {
    const pgErr = err as { code?: string };
    if (pgErr.code === "23505") {
      return NextResponse.json({ error: "A service with this slug already exists" }, { status: 409 });
    }
    throw err;
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const admin = await getAuthorizedAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await ensureServicesTable();

  const { id } = await params;
  const serviceId = Number(id);
  if (!Number.isInteger(serviceId)) return NextResponse.json({ error: "Invalid id" }, { status: 400 });

  const { rowCount } = await pool.query("DELETE FROM services WHERE id = $1", [serviceId]);
  if (rowCount === 0) return NextResponse.json({ error: "Not found" }, { status: 404 });

  return NextResponse.json({ ok: true });
}
