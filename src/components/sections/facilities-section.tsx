import { Container, SectionHeading } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/reveal";
import { FacilityCard } from "@/components/cards/misc-cards";
import { Button } from "@/components/ui/button";
import { FACILITIES } from "@/lib/data/facilities";
import { ArrowRight } from "lucide-react";

export function FacilitiesSection({ limit = 6 }: { limit?: number }) {
  return (
    <section className="py-24 md:py-32">
      <Container>
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <Reveal>
            <SectionHeading eyebrow="Facilities" title="Premium Facilities for Every Need" />
          </Reveal>
          <Reveal delay={0.1}>
            <Button href="/facilities" variant="outline" icon={<ArrowRight className="h-4 w-4" />}>
              All Facilities
            </Button>
          </Reveal>
        </div>
      </Container>

      <div className="mt-14 flex gap-5 overflow-x-auto px-6 pb-4 md:hidden [&::-webkit-scrollbar]:hidden">
        {FACILITIES.slice(0, limit).map((f) => (
          <FacilityCard key={f.slug} facility={f} />
        ))}
      </div>

      <Container className="mt-14 hidden md:block">
        <div className="grid grid-cols-3 gap-6">
          {FACILITIES.slice(0, limit).map((f) => (
            <Reveal key={f.slug}>
              <FacilityCard facility={f} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
