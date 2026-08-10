import type { Metadata } from "next";
import { PageHero } from "@/components/sections/page-hero";
import { Container } from "@/components/ui/primitives";
import { Reveal, StaggerGroup } from "@/components/ui/reveal";
import { FacilityCard } from "@/components/cards/misc-cards";
import { FinalCTA } from "@/components/sections/final-cta";
import { FACILITIES } from "@/lib/data/facilities";

export const metadata: Metadata = {
  title: "Facilities",
  description: "Explore our modern hospital facilities — from operation theatres to private patient rooms.",
};

export default function FacilitiesPage() {
  return (
    <>
      <PageHero
        eyebrow="Facilities"
        title="Premium Facilities for Every Need"
        description="Every space is designed for patient comfort and clinical precision, from the operating theatre to the waiting room."
      />
      <section className="py-24 md:py-32">
        <Container>
          <StaggerGroup className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {FACILITIES.map((f) => (
              <Reveal key={f.slug}>
                <FacilityCard facility={f} />
              </Reveal>
            ))}
          </StaggerGroup>
        </Container>
      </section>
      <FinalCTA />
    </>
  );
}
