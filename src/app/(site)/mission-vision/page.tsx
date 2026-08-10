import type { Metadata } from "next";
import { Target, Eye, Heart } from "lucide-react";
import { PageHero } from "@/components/sections/page-hero";
import { Container } from "@/components/ui/primitives";
import { Reveal, StaggerGroup } from "@/components/ui/reveal";
import { FinalCTA } from "@/components/sections/final-cta";

export const metadata: Metadata = {
  title: "Our Mission & Vision",
  description: "The mission, vision, and values that guide every decision we make in patient care.",
};

const PILLARS = [
  {
    icon: Target,
    title: "Our Mission",
    detail:
      "To deliver accessible, high-quality medical care that treats every patient with dignity, combining clinical excellence with genuine compassion.",
  },
  {
    icon: Eye,
    title: "Our Vision",
    detail:
      "To be the region's most trusted healthcare institution — recognized equally for advanced medical technology and human-centered care.",
  },
  {
    icon: Heart,
    title: "Our Values",
    detail:
      "Integrity, compassion, and continuous improvement guide every clinical decision, every patient interaction, and every member of our team.",
  },
];

export default function MissionVisionPage() {
  return (
    <>
      <PageHero eyebrow="Mission & Vision" title="What Drives Everything We Do" />
      <section className="py-24 md:py-32">
        <Container>
          <StaggerGroup className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {PILLARS.map((p) => (
              <Reveal key={p.title} className="rounded-2xl border border-border bg-card p-8">
                <p.icon className="h-8 w-8 text-primary" />
                <h2 className="mt-5 font-display text-xl font-bold text-text">{p.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-text-muted">{p.detail}</p>
              </Reveal>
            ))}
          </StaggerGroup>
        </Container>
      </section>
      <FinalCTA />
    </>
  );
}
