import { cache } from "react";
import { pool } from "@/lib/db";
import { ABOUT_DEFAULT, type AboutContent, type AboutFeature } from "@/lib/data/about";

type AboutRow = {
  badge: string;
  heading: string;
  paragraph1: string;
  paragraph2: string;
  image_id: string;
  features: AboutFeature[];
  hero_eyebrow: string;
  hero_title: string;
  hero_description: string;
};

function mapRow(r: AboutRow): AboutContent {
  return {
    badge: r.badge,
    heading: r.heading,
    paragraph1: r.paragraph1,
    paragraph2: r.paragraph2,
    imageId: r.image_id,
    features: r.features,
    heroEyebrow: r.hero_eyebrow,
    heroTitle: r.hero_title,
    heroDescription: r.hero_description,
  };
}

export const getAboutContent = cache(async (): Promise<AboutContent> => {
  const { rows } = await pool.query<AboutRow>("SELECT * FROM about_content WHERE id = 1");
  if (rows.length === 0) return ABOUT_DEFAULT;
  return mapRow(rows[0]);
});
