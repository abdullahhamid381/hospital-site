import { getAboutSections } from "@/lib/about";
import { AboutIntroBlock } from "@/components/sections/about-blocks";
import type { IntroContent } from "@/lib/data/about-sections";

export async function About() {
  const sections = await getAboutSections();
  const home =
    sections.find((s) => s.type === "intro" && s.isVisible && s.showOnHome) ??
    sections.find((s) => s.type === "intro" && s.isVisible);

  if (!home) return null;
  return <AboutIntroBlock content={home.content as IntroContent} />;
}
