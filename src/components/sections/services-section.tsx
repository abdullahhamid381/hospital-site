import { Container, SectionHeading } from "@/components/ui/primitives";
import { Reveal, StaggerGroup } from "@/components/ui/reveal";
import { ServiceCard } from "@/components/cards/service-card";
import { Button } from "@/components/ui/button";
import { getServices } from "@/lib/services";
import { ArrowRight } from "lucide-react";

export async function ServicesSection({ limit = 8 }: { limit?: number }) {
  const services = (await getServices()).filter((s) => s.isVisible);

  return (
    <section className="py-24 md:py-32">
      <Container>
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <Reveal>
            <SectionHeading eyebrow="Our Services" title="Comprehensive Medical Services" />
          </Reveal>
          <Reveal delay={0.1}>
            <Button href="/services" variant="outline" icon={<ArrowRight className="h-4 w-4" />}>
              View All Services
            </Button>
          </Reveal>
        </div>

        <StaggerGroup className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.slice(0, limit).map((s) => (
            <Reveal key={s.slug}>
              <ServiceCard service={s} />
            </Reveal>
          ))}
        </StaggerGroup>
      </Container>
    </section>
  );
}
