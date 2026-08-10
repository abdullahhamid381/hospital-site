import type { Metadata } from "next";
import { PageHero } from "@/components/sections/page-hero";
import { About } from "@/components/sections/about";
import { Stats } from "@/components/sections/stats";
import { WhyChooseUs } from "@/components/sections/why-choose-us";
import { Technology } from "@/components/sections/technology";
import { FinalCTA } from "@/components/sections/final-cta";
import { SITE } from "@/lib/data/site";
import { getAboutContent } from "@/lib/about";

export const metadata: Metadata = {
  title: "About Us",
  description: `Learn about ${SITE.name} — our mission, our specialists, and our commitment to patient-centered healthcare.`,
};

export default async function AboutPage() {
  const content = await getAboutContent();

  return (
    <>
      <PageHero eyebrow={content.heroEyebrow} title={content.heroTitle} description={content.heroDescription} />
      <About />
      <Stats />
      <WhyChooseUs />
      <Technology />
      <FinalCTA />
    </>
  );
}
