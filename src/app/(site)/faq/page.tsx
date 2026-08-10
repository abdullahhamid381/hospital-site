import type { Metadata } from "next";
import { PageHero } from "@/components/sections/page-hero";
import { FAQSection } from "@/components/sections/faq-section";
import { FinalCTA } from "@/components/sections/final-cta";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Answers to common questions about appointments, emergency care, insurance, and more.",
};

export default function FAQPage() {
  return (
    <>
      <PageHero eyebrow="FAQ" title="Frequently Asked Questions" />
      <FAQSection />
      <FinalCTA />
    </>
  );
}
