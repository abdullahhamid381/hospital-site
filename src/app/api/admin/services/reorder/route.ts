import { NextRequest, NextResponse } from "next/server";
import { pool, ensureServicesTable } from "@/lib/db";
import { getAuthorizedAdmin } from "@/lib/admin";

export async function POST(req: NextRequest) {
  const admin = await getAuthorizedAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await ensureServicesTable();

  const body = await req.json().catch(() => null);
  const order = body?.order;
  if (!Array.isArray(order) || order.length === 0 || !order.every((id) => Number.isInteger(id))) {
    return NextResponse.json({ error: "order must be a non-empty array of service ids" }, { status: 400 });
  }

  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    for (let i = 0; i < order.length; i++) {
      await client.query("UPDATE services SET sort_order = $1, updated_at = now() WHERE id = $2", [i, order[i]]);
    }
    await client.query("COMMIT");
  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release();
  }

  return NextResponse.json({ ok: true });
}
