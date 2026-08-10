import { Container, SectionHeading } from "@/components/ui/primitives";
import { Reveal, StaggerGroup } from "@/components/ui/reveal";
import { PackageCard } from "@/components/cards/misc-cards";
import { PACKAGES } from "@/lib/data/packages";

export function PackagesSection({ limit = 4 }: { limit?: number }) {
  return (
    <section className="py-24 md:py-32">
      <Container>
        <Reveal>
          <SectionHeading eyebrow="Health Packages" title="Preventive Care, Packaged Simply" align="center" className="mx-auto" />
        </Reveal>

        <StaggerGroup className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PACKAGES.slice(0, limit).map((p) => (
            <Reveal key={p.slug}>
              <PackageCard pkg={p} />
            </Reveal>
          ))}
        </StaggerGroup>
      </Container>
    </section>
  );
}
