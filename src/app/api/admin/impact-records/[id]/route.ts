import { NextRequest, NextResponse } from "next/server";
import { pool, type ImpactCategoryKey } from "@/lib/db";
import { getAuthorizedAdmin } from "@/lib/admin";

const CATEGORY_KEYS: ImpactCategoryKey[] = ["opd", "diagnostics", "emergency", "ipd", "surgical"];

function isValidDate(value: unknown): value is string {
  return typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value) && !Number.isNaN(new Date(value).getTime());
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const admin = await getAuthorizedAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const recordId = Number(id);
  if (!Number.isInteger(recordId)) return NextResponse.json({ error: "Invalid id" }, { status: 400 });

  const body = await req.json().catch(() => null);
  const updates: string[] = [];
  const values: unknown[] = [];

  if (body?.category !== undefined) {
    if (!CATEGORY_KEYS.includes(body.category)) {
      return NextResponse.json({ error: "Invalid category" }, { status: 400 });
    }
    values.push(body.category);
    updates.push(`category = $${values.length}`);
  }
  if (body?.recordDate !== undefined) {
    if (!isValidDate(body.recordDate)) {
      return NextResponse.json({ error: "Invalid date" }, { status: 400 });
    }
    values.push(body.recordDate);
    updates.push(`record_date = $${values.length}`);
  }
  if (body?.count !== undefined) {
    const count = Number(body.count);
    if (!Number.isFinite(count) || count < 0 || !Number.isInteger(count)) {
      return NextResponse.json({ error: "Count must be a non-negative integer" }, { status: 400 });
    }
    values.push(count);
    updates.push(`count = $${values.length}`);
  }

  if (updates.length === 0) {
    return NextResponse.json({ error: "No fields to update" }, { status: 400 });
  }

  updates.push(`updated_at = now()`);
  values.push(recordId);

  const { rows } = await pool.query(
    `UPDATE impact_records SET ${updates.join(", ")} WHERE id = $${values.length}
     RETURNING id, category, record_date, count, created_at, updated_at`,
    values
  );

  if (rows.length === 0) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const r = rows[0];
  return NextResponse.json({
    id: r.id,
    category: r.category,
    recordDate: r.record_date instanceof Date ? r.record_date.toISOString().slice(0, 10) : r.record_date,
    count: r.count,
    createdAt: r.created_at,
    updatedAt: r.updated_at,
  });
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const admin = await getAuthorizedAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const recordId = Number(id);
  if (!Number.isInteger(recordId)) return NextResponse.json({ error: "Invalid id" }, { status: 400 });

  const { rowCount } = await pool.query("DELETE FROM impact_records WHERE id = $1", [recordId]);
  if (rowCount === 0) return NextResponse.json({ error: "Not found" }, { status: 404 });

  return NextResponse.json({ ok: true });
}
