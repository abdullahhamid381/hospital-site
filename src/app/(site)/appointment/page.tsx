import type { Metadata } from "next";
import { PageHero } from "@/components/sections/page-hero";
import { Container } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/reveal";
import { AppointmentForm } from "@/components/sections/appointment-form";
import { FAQSection } from "@/components/sections/faq-section";

export const metadata: Metadata = {
  title: "Book an Appointment",
  description: "Book an appointment with our specialists online — quick, secure, and confirmed within the hour.",
};

export default function AppointmentPage() {
  return (
    <>
      <PageHero
        eyebrow="Appointment"
        title="Your Health Can't Wait"
        description="Fill out the form below and our patient care team will confirm your appointment shortly."
      />
      <section className="py-24 md:py-32">
        <Container>
          <Reveal>
            <AppointmentForm />
          </Reveal>
        </Container>
      </section>
      <FAQSection />
    </>
  );
}
