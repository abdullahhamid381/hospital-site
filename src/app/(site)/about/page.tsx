import type { Metadata } from "next";
import { AboutSectionRenderer } from "@/components/sections/about-blocks";
import { SITE } from "@/lib/data/site";
import { getAboutSections } from "@/lib/about";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "About Us",
  description: `Learn about ${SITE.name} — our mission, our specialists, and our commitment to patient-centered healthcare.`,
};

export default async function AboutPage() {
  const sections = (await getAboutSections()).filter((s) => s.isVisible);

  return (
    <>
      {sections.map((section) => (
        <AboutSectionRenderer key={section.id} section={section} />
      ))}
    </>
  );
}
