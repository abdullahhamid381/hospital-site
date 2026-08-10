import type { Metadata } from "next";
import { PageHero } from "@/components/sections/page-hero";
import { Container } from "@/components/ui/primitives";
import { Reveal, StaggerGroup } from "@/components/ui/reveal";
import { PackageCard } from "@/components/cards/misc-cards";
import { FinalCTA } from "@/components/sections/final-cta";
import { PACKAGES } from "@/lib/data/packages";

export const metadata: Metadata = {
  title: "Health Packages",
  description: "Preventive health checkup packages designed for individuals, families, and every stage of life.",
};

export default function HealthPackagesPage() {
  return (
    <>
      <PageHero
        eyebrow="Health Packages"
        title="Preventive Care, Packaged Simply"
        description="Bundled screening packages that make regular checkups easier to plan for and stick to."
      />
      <section className="py-24 md:py-32">
        <Container>
          <StaggerGroup className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {PACKAGES.map((p) => (
              <Reveal key={p.slug}>
                <PackageCard pkg={p} />
              </Reveal>
            ))}
          </StaggerGroup>
        </Container>
      </section>
      <FinalCTA />
    </>
  );
}
