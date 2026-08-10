import { NextRequest, NextResponse } from "next/server";
import { pool, type ImpactCategoryKey } from "@/lib/db";

const CATEGORY_KEYS: ImpactCategoryKey[] = ["opd", "diagnostics", "emergency", "ipd", "surgical"];

function isValidDate(value: string) {
  return /^\d{4}-\d{2}-\d{2}$/.test(value) && !Number.isNaN(new Date(value).getTime());
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const now = new Date();

  let from = searchParams.get("from") ?? "";
  let to = searchParams.get("to") ?? "";

  if (!isValidDate(to)) {
    to = now.toISOString().slice(0, 10);
  }
  if (!isValidDate(from)) {
    const d = new Date(now);
    d.setFullYear(d.getFullYear() - 1);
    from = d.toISOString().slice(0, 10);
  }
  if (from > to) {
    [from, to] = [to, from];
  }

  const { rows } = await pool.query<{ category: ImpactCategoryKey; total: string }>(
    `SELECT category, COALESCE(SUM(count), 0) AS total
     FROM impact_records
     WHERE record_date BETWEEN $1 AND $2
     GROUP BY category`,
    [from, to]
  );

  const totals = Object.fromEntries(CATEGORY_KEYS.map((k) => [k, 0])) as Record<ImpactCategoryKey, number>;
  for (const row of rows) {
    totals[row.category] = Number(row.total);
  }

  return NextResponse.json({
    from,
    to,
    totals,
    total: CATEGORY_KEYS.reduce((sum, k) => sum + totals[k], 0),
  });
}
