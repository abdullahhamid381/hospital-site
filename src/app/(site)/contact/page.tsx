import type { Metadata } from "next";
import { PageHero } from "@/components/sections/page-hero";
import { ContactSection } from "@/components/sections/contact-section";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with our patient services team, or find directions to the hospital.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero eyebrow="Contact" title="We're Here to Help" description="Reach out with questions, or visit us directly — we're always happy to help." />
      <ContactSection />
    </>
  );
}
