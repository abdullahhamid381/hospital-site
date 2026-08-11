import { NextRequest, NextResponse } from "next/server";
import { pool, ensureAboutSectionsTable } from "@/lib/db";
import { getAuthorizedAdmin } from "@/lib/admin";
import { isValidSectionContent, type AboutSectionType } from "@/lib/data/about-sections";

type SectionRow = {
  id: number;
  type: AboutSectionType;
  title: string;
  sort_order: number;
  is_visible: boolean;
  show_on_home: boolean;
  content: unknown;
  created_at: string;
  updated_at: string;
};

function rowToJson(r: SectionRow) {
  return {
    id: r.id,
    type: r.type,
    title: r.title,
    sortOrder: r.sort_order,
    isVisible: r.is_visible,
    showOnHome: r.show_on_home,
    content: r.content,
    createdAt: r.created_at,
    updatedAt: r.updated_at,
  };
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const admin = await getAuthorizedAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await ensureAboutSectionsTable();

  const { id } = await params;
  const sectionId = Number(id);
  if (!Number.isInteger(sectionId)) return NextResponse.json({ error: "Invalid id" }, { status: 400 });

  const { rows: existingRows } = await pool.query<SectionRow>("SELECT * FROM about_sections WHERE id = $1", [sectionId]);
  if (existingRows.length === 0) return NextResponse.json({ error: "Not found" }, { status: 404 });
  const existing = existingRows[0];

  const body = await req.json().catch(() => null);
  if (!body) return NextResponse.json({ error: "Invalid request body" }, { status: 400 });

  const updates: string[] = [];
  const values: unknown[] = [];

  if (body.title !== undefined) {
    if (!isNonEmptyString(body.title)) return NextResponse.json({ error: "Title cannot be empty" }, { status: 400 });
    values.push(body.title);
    updates.push(`title = $${values.length}`);
  }
  if (body.isVisible !== undefined) {
    values.push(Boolean(body.isVisible));
    updates.push(`is_visible = $${values.length}`);
  }
  if (body.showOnHome !== undefined) {
    values.push(Boolean(body.showOnHome));
    updates.push(`show_on_home = $${values.length}`);
  }
  if (body.content !== undefined) {
    if (!isValidSectionContent(existing.type, body.content)) {
      return NextResponse.json({ error: "Content is invalid for this section type" }, { status: 400 });
    }
    values.push(JSON.stringify(body.content));
    updates.push(`content = $${values.length}`);
  }

  if (updates.length === 0) {
    return NextResponse.json({ error: "No fields to update" }, { status: 400 });
  }
  updates.push("updated_at = now()");
  values.push(sectionId);

  const { rows } = await pool.query<SectionRow>(
    `UPDATE about_sections SET ${updates.join(", ")} WHERE id = $${values.length} RETURNING *`,
    values
  );

  return NextResponse.json(rowToJson(rows[0]));
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const admin = await getAuthorizedAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await ensureAboutSectionsTable();

  const { id } = await params;
  const sectionId = Number(id);
  if (!Number.isInteger(sectionId)) return NextResponse.json({ error: "Invalid id" }, { status: 400 });

  const { rowCount } = await pool.query("DELETE FROM about_sections WHERE id = $1", [sectionId]);
  if (rowCount === 0) return NextResponse.json({ error: "Not found" }, { status: 404 });

  return NextResponse.json({ ok: true });
}
