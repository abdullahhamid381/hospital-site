import { NextRequest, NextResponse } from "next/server";
import { pool } from "@/lib/db";
import { getAuthorizedAdmin } from "@/lib/admin";

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ email: string }> }) {
  const admin = await getAuthorizedAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { email } = await params;
  const target = decodeURIComponent(email).toLowerCase();

  const { rows: countRows } = await pool.query("SELECT COUNT(*)::int AS n FROM admin_emails");
  if ((countRows[0]?.n ?? 0) <= 1) {
    return NextResponse.json({ error: "Cannot remove the last remaining admin" }, { status: 400 });
  }

  await pool.query("DELETE FROM admin_emails WHERE email = $1", [target]);
  return NextResponse.json({ ok: true });
}
