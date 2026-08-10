import type { Metadata } from "next";
import { Clock, FileText, CreditCard, Users2 } from "lucide-react";
import { PageHero } from "@/components/sections/page-hero";
import { Container } from "@/components/ui/primitives";
import { Reveal, StaggerGroup } from "@/components/ui/reveal";
import { FAQSection } from "@/components/sections/faq-section";
import { SITE } from "@/lib/data/site";

export const metadata: Metadata = {
  title: "Patient Information",
  description: "Everything you need to know before your visit — visiting hours, admission process, and billing.",
};

const INFO = [
  { icon: Clock, title: "Visiting Hours", detail: "General wards: 4:00 PM – 7:00 PM daily. ICU/CCU visiting is limited — please confirm with nursing staff." },
  { icon: FileText, title: "Admission Process", detail: "Bring a valid ID and any referral documents. Our front desk will guide you through registration and room assignment." },
  { icon: CreditCard, title: "Billing & Payments", detail: "We accept cash, card, and select insurance providers. Ask our billing desk about payment plans for extended stays." },
  { icon: Users2, title: "For Attendants", detail: "One attendant is permitted per patient in general wards. Private rooms include a dedicated attendant area." },
];

export default function PatientInformationPage() {
  return (
    <>
      <PageHero eyebrow="Patient Information" title="Preparing for Your Visit" description={SITE.hours} />
      <section className="py-24 md:py-32">
        <Container>
          <StaggerGroup className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {INFO.map((item) => (
              <Reveal key={item.title} className="rounded-2xl border border-border bg-card p-7">
                <item.icon className="h-7 w-7 text-primary" />
                <h2 className="mt-4 font-display text-lg font-bold text-text">{item.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-text-muted">{item.detail}</p>
              </Reveal>
            ))}
          </StaggerGroup>
        </Container>
      </section>
      <FAQSection />
    </>
  );
}
