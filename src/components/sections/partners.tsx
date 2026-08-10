import { Container, SectionHeading } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/reveal";
import { PARTNERS } from "@/lib/data/misc";

export function Partners() {
  return (
    <section className="py-20">
      <Container>
        <Reveal>
          <SectionHeading eyebrow="Partners" title="Trusted Healthcare Partners" align="center" className="mx-auto" />
        </Reveal>
      </Container>
      <div className="mt-12 overflow-hidden">
        <div className="flex w-max animate-marquee gap-16">
          {[...PARTNERS, ...PARTNERS].map((p, i) => (
            <span
              key={i}
              className="shrink-0 text-lg font-display font-bold text-text-muted/50 grayscale transition-colors hover:text-primary hover:grayscale-0"
            >
              {p}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
