import type { Metadata } from "next";
import { PageHero } from "@/components/sections/page-hero";
import { Container } from "@/components/ui/primitives";
import { Reveal, StaggerGroup } from "@/components/ui/reveal";
import { TestimonialCard } from "@/components/cards/misc-cards";
import { FinalCTA } from "@/components/sections/final-cta";
import { TESTIMONIALS } from "@/lib/data/misc";

export const metadata: Metadata = {
  title: "Patient Testimonials",
  description: "Read what patients say about their experience with our doctors, nurses, and care teams.",
};

export default function TestimonialsPage() {
  return (
    <>
      <PageHero eyebrow="Testimonials" title="What Our Patients Say" />
      <section className="py-24 md:py-32">
        <Container>
          <StaggerGroup className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {TESTIMONIALS.map((t) => (
              <Reveal key={t.name}>
                <TestimonialCard testimonial={t} />
              </Reveal>
            ))}
          </StaggerGroup>
        </Container>
      </section>
      <FinalCTA />
    </>
  );
}
