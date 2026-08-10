import type { Metadata } from "next";
import { PageHero } from "@/components/sections/page-hero";
import { Emergency } from "@/components/sections/emergency";
import { FAQSection } from "@/components/sections/faq-section";
import { FinalCTA } from "@/components/sections/final-cta";

export const metadata: Metadata = {
  title: "Emergency Care",
  description: "24/7 emergency care with a rapid-response trauma team, ready around the clock.",
};

export default function EmergencyCarePage() {
  return (
    <>
      <PageHero
        eyebrow="Emergency"
        title="Emergency Care, Every Hour of Every Day"
        description="Our emergency department is staffed and equipped for rapid response, from stabilization to critical intervention."
      />
      <Emergency />
      <FAQSection />
      <FinalCTA />
    </>
  );
}
