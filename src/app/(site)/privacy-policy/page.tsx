import type { Metadata } from "next";
import { PageHero } from "@/components/sections/page-hero";
import { Container } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/reveal";
import { SITE } from "@/lib/data/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How we collect, use, and protect your personal and medical information.",
};

const SECTIONS = [
  {
    title: "Information We Collect",
    body: "We collect information you provide directly, such as your name, contact details, and medical history, when you book an appointment, register as a patient, or contact us.",
  },
  {
    title: "How We Use Your Information",
    body: "Your information is used to provide medical care, manage appointments, process billing, and communicate important updates about your treatment.",
  },
  {
    title: "How We Protect Your Information",
    body: "We follow strict access controls and data security practices to protect patient records, in line with applicable healthcare privacy standards.",
  },
  {
    title: "Sharing of Information",
    body: "We do not sell patient information. Data is shared only with treating physicians, authorized staff, and, where required, insurance providers or regulatory bodies.",
  },
  {
    title: "Your Rights",
    body: "You may request access to your medical records or ask questions about how your data is handled by contacting our patient services team.",
  },
  {
    title: "Contact Us",
    body: `For privacy-related questions, reach us at ${SITE.email} or visit our front desk.`,
  },
];

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Privacy Policy" />
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
