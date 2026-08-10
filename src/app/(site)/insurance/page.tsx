import type { Metadata } from "next";
import { ShieldCheck } from "lucide-react";
import { PageHero } from "@/components/sections/page-hero";
import { Container } from "@/components/ui/primitives";
import { Reveal, StaggerGroup } from "@/components/ui/reveal";
import { Partners } from "@/components/sections/partners";
import { FinalCTA } from "@/components/sections/final-cta";
import { PARTNERS } from "@/lib/data/misc";

export const metadata: Metadata = {
  title: "Insurance",
  description: "We work with a range of insurance and healthcare partners to make care more accessible.",
};

export default function InsurancePage() {
  return (
    <>
      <PageHero
        eyebrow="Insurance"
        title="Trusted Healthcare Partners"
        description="We coordinate directly with the following providers to simplify billing for insured patients."
      />
      <section className="py-24 md:py-32">
        <Container>
          <StaggerGroup className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {PARTNERS.map((p) => (
              <Reveal key={p} className="flex items-center gap-4 rounded-2xl border border-border bg-card p-6">
                <ShieldCheck className="h-6 w-6 shrink-0 text-primary" />
                <span className="font-display text-sm font-bold text-text">{p}</span>
              </Reveal>
            ))}
          </StaggerGroup>
        </Container>
      </section>
      <Partners />
      <FinalCTA />
    </>
  );
}
