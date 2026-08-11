import { NextRequest, NextResponse } from "next/server";
import { pool, ensureAboutSectionsTable } from "@/lib/db";
import { getAuthorizedAdmin } from "@/lib/admin";
import {
  ABOUT_SECTION_TYPES,
  DEFAULT_ABOUT_SECTIONS,
  isValidSectionContent,
  type AboutSectionType,
} from "@/lib/data/about-sections";

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

async function seedDefaultsIfEmpty() {
  const { rows } = await pool.query<{ n: number }>("SELECT COUNT(*)::int AS n FROM about_sections");
  if (rows[0]?.n > 0) return;

  for (const s of DEFAULT_ABOUT_SECTIONS) {
    await pool.query(
      `INSERT INTO about_sections (type, title, sort_order, is_visible, show_on_home, content)
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [s.type, s.title, s.sortOrder, s.isVisible, s.showOnHome, JSON.stringify(s.content)]
    );
  }
}

export async function GET() {
  const admin = await getAuthorizedAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await ensureAboutSectionsTable();
  await seedDefaultsIfEmpty();

  const { rows } = await pool.query<SectionRow>("SELECT * FROM about_sections ORDER BY sort_order ASC, id ASC");
  return NextResponse.json({ sections: rows.map(rowToJson) });
}

export async function POST(req: NextRequest) {
  const admin = await getAuthorizedAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await ensureAboutSectionsTable();

  const body = await req.json().catch(() => null);
  if (!body) return NextResponse.json({ error: "Invalid request body" }, { status: 400 });

  const { type, title, content } = body;
  if (!ABOUT_SECTION_TYPES.includes(type)) {
    return NextResponse.json({ error: "Invalid section type" }, { status: 400 });
  }
  if (!isNonEmptyString(title)) {
    return NextResponse.json({ error: "Title is required" }, { status: 400 });
  }
  if (!isValidSectionContent(type, content)) {
    return NextResponse.json({ error: "Content is invalid for this section type" }, { status: 400 });
  }

  const isVisible = body.isVisible === undefined ? true : Boolean(body.isVisible);
  const showOnHome = Boolean(body.showOnHome);

  const { rows } = await pool.query<SectionRow>(
    `INSERT INTO about_sections (type, title, sort_order, is_visible, show_on_home, content)
     VALUES ($1, $2, COALESCE((SELECT MAX(sort_order) + 1 FROM about_sections), 0), $3, $4, $5)
     RETURNING *`,
    [type, title, isVisible, showOnHome, JSON.stringify(content)]
  );

  return NextResponse.json(rowToJson(rows[0]), { status: 201 });
}
