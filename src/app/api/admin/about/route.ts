import { NextRequest, NextResponse } from "next/server";
import { pool } from "@/lib/db";
import { getAuthorizedAdmin } from "@/lib/admin";
import { ABOUT_DEFAULT, type AboutFeature } from "@/lib/data/about";

const TEXT_FIELDS = [
  "badge",
  "heading",
  "paragraph1",
  "paragraph2",
  "imageId",
  "heroEyebrow",
  "heroTitle",
  "heroDescription",
] as const;

const COLUMN_BY_FIELD: Record<(typeof TEXT_FIELDS)[number], string> = {
  badge: "badge",
  heading: "heading",
  paragraph1: "paragraph1",
  paragraph2: "paragraph2",
  imageId: "image_id",
  heroEyebrow: "hero_eyebrow",
  heroTitle: "hero_title",
  heroDescription: "hero_description",
};

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function isValidFeatures(value: unknown): value is AboutFeature[] {
  if (!Array.isArray(value) || value.length === 0 || value.length > 8) return false;
  return value.every(
    (f) => f && typeof f === "object" && isNonEmptyString((f as AboutFeature).icon) && isNonEmptyString((f as AboutFeature).title)
  );
}

function rowToJson(r: Record<string, unknown>) {
  return {
    badge: r.badge,
    heading: r.heading,
    paragraph1: r.paragraph1,
    paragraph2: r.paragraph2,
    imageId: r.image_id,
    features: r.features,
    heroEyebrow: r.hero_eyebrow,
    heroTitle: r.hero_title,
    heroDescription: r.hero_description,
    updatedAt: r.updated_at,
  };
}

export async function GET() {
  const admin = await getAuthorizedAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { rows } = await pool.query("SELECT * FROM about_content WHERE id = 1");
  if (rows.length === 0) {
    return NextResponse.json({ ...ABOUT_DEFAULT, updatedAt: null, isDefault: true });
  }
  return NextResponse.json({ ...rowToJson(rows[0]), isDefault: false });
}

export async function POST(req: NextRequest) {
  const admin = await getAuthorizedAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json().catch(() => null);
  if (!body) return NextResponse.json({ error: "Invalid request body" }, { status: 400 });

  for (const field of TEXT_FIELDS) {
    if (!isNonEmptyString(body[field])) {
      return NextResponse.json({ error: `Field "${field}" is required` }, { status: 400 });
    }
  }
  if (!isValidFeatures(body.features)) {
    return NextResponse.json({ error: "Features must be a non-empty array (max 8) of { icon, title }" }, { status: 400 });
  }

  const { rows } = await pool.query(
    `INSERT INTO about_content (id, badge, heading, paragraph1, paragraph2, image_id, features, hero_eyebrow, hero_title, hero_description)
     VALUES (1, $1, $2, $3, $4, $5, $6, $7, $8, $9)
     ON CONFLICT (id) DO UPDATE SET
       badge = EXCLUDED.badge,
       heading = EXCLUDED.heading,
       paragraph1 = EXCLUDED.paragraph1,
       paragraph2 = EXCLUDED.paragraph2,
       image_id = EXCLUDED.image_id,
       features = EXCLUDED.features,
       hero_eyebrow = EXCLUDED.hero_eyebrow,
       hero_title = EXCLUDED.hero_title,
       hero_description = EXCLUDED.hero_description,
       updated_at = now()
     RETURNING *`,
    [
      body.badge,
      body.heading,
      body.paragraph1,
      body.paragraph2,
      body.imageId,
      JSON.stringify(body.features),
      body.heroEyebrow,
      body.heroTitle,
      body.heroDescription,
    ]
  );

  return NextResponse.json({ ...rowToJson(rows[0]), isDefault: false }, { status: 201 });
}

export async function PATCH(req: NextRequest) {
  const admin = await getAuthorizedAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json().catch(() => null);
  if (!body) return NextResponse.json({ error: "Invalid request body" }, { status: 400 });

  const updates: string[] = [];
  const values: unknown[] = [];

  for (const field of TEXT_FIELDS) {
    if (body[field] !== undefined) {
      if (!isNonEmptyString(body[field])) {
        return NextResponse.json({ error: `Field "${field}" cannot be empty` }, { status: 400 });
      }
      values.push(body[field]);
      updates.push(`${COLUMN_BY_FIELD[field]} = $${values.length}`);
    }
  }
  if (body.features !== undefined) {
    if (!isValidFeatures(body.features)) {
      return NextResponse.json({ error: "Features must be a non-empty array (max 8) of { icon, title }" }, { status: 400 });
    }
    values.push(JSON.stringify(body.features));
    updates.push(`features = $${values.length}`);
  }

  if (updates.length === 0) {
    return NextResponse.json({ error: "No fields to update" }, { status: 400 });
  }
  updates.push("updated_at = now()");

  const { rows } = await pool.query(`UPDATE about_content SET ${updates.join(", ")} WHERE id = 1 RETURNING *`, values);

  if (rows.length === 0) {
    return NextResponse.json({ error: "No content exists yet — use POST to create it first" }, { status: 404 });
  }

  return NextResponse.json({ ...rowToJson(rows[0]), isDefault: false });
}

export async function DELETE() {
  const admin = await getAuthorizedAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await pool.query("DELETE FROM about_content WHERE id = 1");
  return NextResponse.json({ ok: true });
}
