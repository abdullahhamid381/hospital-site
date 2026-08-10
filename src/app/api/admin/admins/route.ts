import { NextRequest, NextResponse } from "next/server";
import { pool } from "@/lib/db";
import { getAuthorizedAdmin } from "@/lib/admin";

function isValidEmail(value: unknown): value is string {
  return typeof value === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function GET() {
  const admin = await getAuthorizedAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { rows } = await pool.query("SELECT email, added_at FROM admin_emails ORDER BY added_at ASC");
  return NextResponse.json({ admins: rows });
}

export async function POST(req: NextRequest) {
  const admin = await getAuthorizedAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json().catch(() => null);
  const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";

  if (!isValidEmail(email)) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  await pool.query("INSERT INTO admin_emails (email) VALUES ($1) ON CONFLICT DO NOTHING", [email]);
  return NextResponse.json({ ok: true }, { status: 201 });
}
