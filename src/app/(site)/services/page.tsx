import type { Metadata } from "next";
import { PageHero } from "@/components/sections/page-hero";
import { Container } from "@/components/ui/primitives";
import { Reveal, StaggerGroup } from "@/components/ui/reveal";
import { ServiceCard } from "@/components/cards/service-card";
import { FinalCTA } from "@/components/sections/final-cta";
import { getServices } from "@/lib/services";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Medical Services",
  description: "Explore comprehensive medical services across cardiology, neurology, orthopedics, pediatrics, and more.",
};

export default async function ServicesPage() {
  const services = (await getServices()).filter((s) => s.isVisible);

  return (
    <>
      <PageHero
        eyebrow="Our Services"
        title="Comprehensive Medical Services"
        description="From emergency response to specialized treatment, every service is delivered by experienced specialists using modern technology."
      />
      <section className="py-24 md:py-32">
        <Container>
          <StaggerGroup className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((s) => (
              <Reveal key={s.slug}>
                <ServiceCard service={s} />
              </Reveal>
            ))}
          </StaggerGroup>
        </Container>
      </section>
      <FinalCTA />
    </>
  );
}
