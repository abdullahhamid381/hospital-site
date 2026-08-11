import { cache } from "react";
import { pool, ensureAboutSectionsTable } from "@/lib/db";
import { DEFAULT_ABOUT_SECTIONS, type AboutSection, type AboutSectionType } from "@/lib/data/about-sections";

type AboutSectionRow = {
  id: number;
  type: AboutSectionType;
  title: string;
  sort_order: number;
  is_visible: boolean;
  show_on_home: boolean;
  content: AboutSection["content"];
  created_at: string;
  updated_at: string;
};

function mapRow(r: AboutSectionRow): AboutSection {
  return {
    id: r.id,
    type: r.type,
    title: r.title,
    sortOrder: r.sort_order,
    isVisible: r.is_visible,
    showOnHome: r.show_on_home,
    content: r.content,
    createdAt: r.created_at,
    updatedAt: r.updated_at,
  };
}

export const getAboutSections = cache(async (): Promise<AboutSection[]> => {
  await ensureAboutSectionsTable();
  const { rows } = await pool.query<AboutSectionRow>("SELECT * FROM about_sections ORDER BY sort_order ASC, id ASC");
  if (rows.length === 0) return DEFAULT_ABOUT_SECTIONS;
  return rows.map(mapRow);
});
