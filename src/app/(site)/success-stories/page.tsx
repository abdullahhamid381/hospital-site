import type { Metadata } from "next";
import { PageHero } from "@/components/sections/page-hero";
import { SuccessStories } from "@/components/sections/success-stories";
import { FinalCTA } from "@/components/sections/final-cta";

export const metadata: Metadata = {
  title: "Success Stories",
  description: "Real patient outcomes made possible by timely, expert medical care.",
};

export default function SuccessStoriesPage() {
  return (
    <>
      <PageHero eyebrow="Success Stories" title="Real Outcomes, Real Patients" />
      <SuccessStories />
      <FinalCTA />
    </>
  );
}
