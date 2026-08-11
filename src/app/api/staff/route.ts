import { NextResponse } from "next/server";
import { getStaffMembers } from "@/lib/staff";

export const dynamic = "force-dynamic";

export async function GET() {
  const staff = (await getStaffMembers()).filter((s) => s.isVisible);
  return NextResponse.json({
    staff: staff.map((s) => ({ slug: s.slug, name: s.name, role: s.role })),
  });
}
