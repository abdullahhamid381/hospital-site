import { NextRequest, NextResponse } from "next/server";
import { pool, type ImpactCategoryKey } from "@/lib/db";
import { getAuthorizedAdmin } from "@/lib/admin";

const CATEGORY_KEYS: ImpactCategoryKey[] = ["opd", "diagnostics", "emergency", "ipd", "surgical"];

function isValidDate(value: unknown): value is string {
  return typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value) && !Number.isNaN(new Date(value).getTime());
}

export async function GET(req: NextRequest) {
  const admin = await getAuthorizedAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category");
  const from = searchParams.get("from");
  const to = searchParams.get("to");
  const limit = Math.min(Number(searchParams.get("limit")) || 50, 200);
  const offset = Math.max(Number(searchParams.get("offset")) || 0, 0);

  const conditions: string[] = [];
  const params: unknown[] = [];

  if (category && CATEGORY_KEYS.includes(category as ImpactCategoryKey)) {
    params.push(category);
    conditions.push(`category = $${params.length}`);
  }
  if (isValidDate(from)) {
    params.push(from);
    conditions.push(`record_date >= $${params.length}`);
  }
  if (isValidDate(to)) {
    params.push(to);
    conditions.push(`record_date <= $${params.length}`);
  }

  const where = conditions.length ? `WHERE ${conditions.join(" AND ")}` : "";

  const { rows: countRows } = await pool.query(`SELECT COUNT(*)::int AS n FROM impact_records ${where}`, params);
  params.push(limit, offset);
  const { rows } = await pool.query(
    `SELECT id, category, record_date, count, created_at, updated_at
     FROM impact_records ${where}
     ORDER BY record_date DESC, id DESC
     LIMIT $${params.length - 1} OFFSET $${params.length}`,
    params
  );

  return NextResponse.json({
    total: countRows[0]?.n ?? 0,
    records: rows.map((r) => ({
      id: r.id,
      category: r.category,
      recordDate: r.record_date instanceof Date ? r.record_date.toISOString().slice(0, 10) : r.record_date,
      count: r.count,
      createdAt: r.created_at,
      updatedAt: r.updated_at,
    })),
  });
}

export async function POST(req: NextRequest) {
  const admin = await getAuthorizedAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json().catch(() => null);
  const category = body?.category;
  const recordDate = body?.recordDate;
  const count = Number(body?.count);

  if (!CATEGORY_KEYS.includes(category)) {
    return NextResponse.json({ error: "Invalid category" }, { status: 400 });
  }
  if (!isValidDate(recordDate)) {
    return NextResponse.json({ error: "Invalid date" }, { status: 400 });
  }
  if (!Number.isFinite(count) || count < 0 || !Number.isInteger(count)) {
    return NextResponse.json({ error: "Count must be a non-negative integer" }, { status: 400 });
  }

  const { rows } = await pool.query(
    `INSERT INTO impact_records (category, record_date, count) VALUES ($1, $2, $3)
     RETURNING id, category, record_date, count, created_at, updated_at`,
    [category, recordDate, count]
  );
  const r = rows[0];
  return NextResponse.json(
    {
      id: r.id,
      category: r.category,
      recordDate: r.record_date instanceof Date ? r.record_date.toISOString().slice(0, 10) : r.record_date,
      count: r.count,
      createdAt: r.created_at,
      updatedAt: r.updated_at,
    },
    { status: 201 }
  );
}
