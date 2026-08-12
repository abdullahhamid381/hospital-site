import { NextResponse } from "next/server";
import { getDoctors } from "@/lib/doctors";

export const dynamic = "force-dynamic";

export async function GET() {
  const doctors = (await getDoctors()).filter((d) => d.isVisible);
  return NextResponse.json({
    doctors: doctors.map((d) => ({ slug: d.slug, name: d.name, specialization: d.specialization })),
  });
}
