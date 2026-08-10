import { Container, SectionHeading } from "@/components/ui/primitives";
import { Reveal, StaggerGroup } from "@/components/ui/reveal";
import { Icon } from "@/lib/icon-map";
import { TECHNOLOGY } from "@/lib/data/misc";

export function Technology() {
  return (
    <section className="bg-bg-secondary py-24 md:py-32">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Technology"
            title="Technology That Advances Patient Care"
            align="center"
            className="mx-auto"
          />
        </Reveal>

        <StaggerGroup className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {TECHNOLOGY.map((item) => (
            <Reveal key={item.title} className="rounded-2xl border border-border bg-card p-7">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-black text-primary dark:bg-white/10">
                <Icon name={item.icon} className="h-6 w-6" />
              </div>
              <h3 className="mt-5 font-display text-base font-bold text-text">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-text-muted">{item.detail}</p>
            </Reveal>
          ))}
        </StaggerGroup>
      </Container>
    </section>
  );
}
