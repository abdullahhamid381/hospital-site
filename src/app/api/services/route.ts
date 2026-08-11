import { NextResponse } from "next/server";
import { getServices } from "@/lib/services";

export const dynamic = "force-dynamic";

export async function GET() {
  const services = (await getServices()).filter((s) => s.isVisible);
  return NextResponse.json({
    services: services.map((s) => ({ slug: s.slug, name: s.name })),
  });
}
