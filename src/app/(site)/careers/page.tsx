import type { Metadata } from "next";
import { HeartHandshake, TrendingUp, Users, ShieldCheck } from "lucide-react";
import { PageHero } from "@/components/sections/page-hero";
import { Container } from "@/components/ui/primitives";
import { Reveal, StaggerGroup } from "@/components/ui/reveal";
import { JobCard } from "@/components/cards/misc-cards";
import { CAREERS } from "@/lib/data/misc";

export const metadata: Metadata = {
  title: "Careers",
  description: "Join our team of medical professionals — explore current openings across the hospital.",
};

const CULTURE = [
  { icon: HeartHandshake, title: "Patient-First Culture", detail: "Every role exists to support better patient outcomes." },
  { icon: TrendingUp, title: "Growth Opportunities", detail: "Structured training and clear paths for advancement." },
  { icon: Users, title: "Collaborative Teams", detail: "Work alongside experienced specialists across departments." },
  { icon: ShieldCheck, title: "Comprehensive Benefits", detail: "Health coverage, paid leave, and continuing education support." },
];

export default function CareersPage() {
  return (
    <>
      <PageHero
        eyebrow="Careers"
        title="Build Your Career in Healthcare"
        description="We're always looking for compassionate, skilled professionals to join our growing team."
      />

      <section className="py-24 md:py-32">
        <Container>
          <StaggerGroup className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {CULTURE.map((c) => (
              <Reveal key={c.title} className="rounded-2xl border border-border bg-card p-7">
                <c.icon className="h-7 w-7 text-primary" />
                <h3 className="mt-4 font-display text-base font-bold text-text">{c.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-text-muted">{c.detail}</p>
              </Reveal>
            ))}
          </StaggerGroup>
        </Container>
      </section>

      <section className="bg-bg-secondary py-24 md:py-32">
        <Container>
          <Reveal>
            <h2 className="section-headline text-balance font-bold text-text">Open Positions</h2>
          </Reveal>
          <div className="mt-10 space-y-4">
            {CAREERS.map((job) => (
              <Reveal key={job.title}>
                <JobCard job={job} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
