import type { Metadata } from "next";
import { PageHero } from "@/components/sections/page-hero";
import { Container } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/reveal";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "The terms governing use of our hospital website and services.",
};

const SECTIONS = [
  { title: "Acceptance of Terms", body: "By using this website or booking services through it, you agree to these terms and conditions." },
  { title: "Medical Disclaimer", body: "Content on this website is for informational purposes only and does not substitute professional medical advice, diagnosis, or treatment." },
  { title: "Appointments", body: "Appointment requests submitted online are confirmed by our patient care team and are subject to doctor availability." },
  { title: "Website Use", body: "You agree not to misuse this website, including attempting to access restricted areas or submitting false information." },
  { title: "Limitation of Liability", body: "We are not liable for indirect damages arising from use of this website, to the extent permitted by applicable law." },
  { title: "Changes to Terms", body: "These terms may be updated periodically. Continued use of the website constitutes acceptance of the revised terms." },
];

export default function TermsConditionsPage() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Terms & Conditions" />
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
