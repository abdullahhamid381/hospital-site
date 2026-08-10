import type { Metadata } from "next";
import { PageHero } from "@/components/sections/page-hero";
import { Container } from "@/components/ui/primitives";
import { Reveal, StaggerGroup } from "@/components/ui/reveal";
import { DoctorCard } from "@/components/cards/doctor-card";
import { FinalCTA } from "@/components/sections/final-cta";
import { DOCTORS } from "@/lib/data/doctors";

export const metadata: Metadata = {
  title: "Our Doctors",
  description: "Meet our complete team of consultant specialists across every department.",
};

export default function DoctorsPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Doctors"
        title="Meet Our Complete Medical Team"
        description="Every consultant on our team brings years of specialized experience and a genuine commitment to patient care."
      />
      <section className="py-24 md:py-32">
        <Container>
          <StaggerGroup className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {DOCTORS.map((d) => (
              <Reveal key={d.slug}>
                <DoctorCard doctor={d} />
              </Reveal>
            ))}
          </StaggerGroup>
        </Container>
      </section>
      <FinalCTA />
    </>
  );
}
