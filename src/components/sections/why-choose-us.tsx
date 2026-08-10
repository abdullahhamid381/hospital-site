import { Container, SectionHeading } from "@/components/ui/primitives";
import { Reveal, StaggerGroup } from "@/components/ui/reveal";
import { Icon } from "@/lib/icon-map";
import { WHY_CHOOSE_US } from "@/lib/data/misc";

export function WhyChooseUs() {
  return (
    <section className="bg-bg-secondary py-24 md:py-32">
      <Container>
        <Reveal>
          <SectionHeading eyebrow="Why Choose Us" title="Care You Can Rely On" align="center" className="mx-auto" />
        </Reveal>

        <StaggerGroup className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {WHY_CHOOSE_US.map((item) => (
            <Reveal key={item.title} className="group rounded-2xl border border-border bg-card p-7 transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/40 hover:shadow-[var(--shadow-elevated)]">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-light text-primary transition-transform duration-300 group-hover:scale-110">
                <Icon name={item.icon} className="h-6 w-6" />
              </div>
              <h3 className="mt-5 font-display text-base font-bold text-text">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-text-muted">{item.detail}</p>
              <div className="mt-5 h-0.5 w-8 bg-primary transition-all duration-300 group-hover:w-14" />
            </Reveal>
          ))}
        </StaggerGroup>
      </Container>
    </section>
  );
}
