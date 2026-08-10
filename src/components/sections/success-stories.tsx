import Image from "next/image";
import { Container, SectionHeading } from "@/components/ui/primitives";
import { Reveal, StaggerGroup } from "@/components/ui/reveal";
import { unsplash } from "@/lib/unsplash";
import { SUCCESS_STORIES } from "@/lib/data/misc";

export function SuccessStories() {
  return (
    <section className="bg-bg-secondary py-24 md:py-32">
      <Container>
        <Reveal>
          <SectionHeading eyebrow="Success Stories" title="Real Outcomes, Real Patients" />
        </Reveal>

        <StaggerGroup className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {SUCCESS_STORIES.map((s) => (
            <Reveal key={s.title} className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[var(--shadow-elevated)] sm:flex-row">
              <div className="relative h-48 shrink-0 overflow-hidden sm:h-auto sm:w-40">
                <Image src={unsplash(s.image, 400)} alt={s.title} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <span className="text-xs font-semibold uppercase tracking-wide text-primary">{s.category}</span>
                <h3 className="mt-2 font-display text-base font-bold text-text">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-text-muted">{s.summary}</p>
              </div>
            </Reveal>
          ))}
        </StaggerGroup>
      </Container>
    </section>
  );
}
