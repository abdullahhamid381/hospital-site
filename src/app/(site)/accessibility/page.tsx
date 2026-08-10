import type { Metadata } from "next";
import { PageHero } from "@/components/sections/page-hero";
import { Container } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/reveal";
import { SITE } from "@/lib/data/site";

export const metadata: Metadata = {
  title: "Accessibility",
  description: "Our commitment to an accessible website and hospital experience for all patients.",
};

const SECTIONS = [
  { title: "Our Commitment", body: "We aim to make this website usable for everyone, including patients using assistive technologies such as screen readers." },
  { title: "Website Accessibility", body: "This site follows semantic HTML, keyboard navigation support, visible focus states, and respects reduced-motion preferences." },
  { title: "Hospital Accessibility", body: "Our hospital facilities include wheelchair-accessible entrances, elevators, and restrooms throughout patient areas." },
  { title: "Feedback", body: `If you encounter any accessibility barriers, please contact us at ${SITE.email} so we can address them.` },
];

export default function AccessibilityPage() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Accessibility" />
      <section className="py-24 md:py-32">
        <Container className="max-w-3xl space-y-10">
          {SECTIONS.map((s) => (
            <Reveal key={s.title}>
              <h2 className="font-display text-xl font-bold text-text">{s.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-text-muted">{s.body}</p>
            </Reveal>
          ))}
        </Container>
      </section>
    </>
  );
}
