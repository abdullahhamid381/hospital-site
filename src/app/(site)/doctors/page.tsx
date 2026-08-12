import type { Metadata } from "next";
import { PageHero } from "@/components/sections/page-hero";
import { Container } from "@/components/ui/primitives";
import { DoctorsGrid } from "@/components/sections/doctors-grid";
import { FinalCTA } from "@/components/sections/final-cta";
import { getDoctors } from "@/lib/doctors";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Our Doctors",
  description: "Meet our complete team of consultant specialists across every department.",
};

export default async function DoctorsPage() {
  const doctors = (await getDoctors()).filter((d) => d.isVisible);

  return (
    <>
      <PageHero
        eyebrow="Our Doctors"
        title="Meet Our Complete Medical Team"
        description="Every consultant on our team brings years of specialized experience and a genuine commitment to patient care."
      />
      <section className="py-24 md:py-32">
        <Container>
          <DoctorsGrid doctors={doctors} />
        </Container>
      </section>
      <FinalCTA />
    </>
  );
}
