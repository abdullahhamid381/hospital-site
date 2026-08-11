import { cache } from "react";
import { pool, ensureServicesTable } from "@/lib/db";
import { DEFAULT_SERVICES, type Service, type ServiceProcessStep } from "@/lib/data/services";

type ServiceRow = {
  id: number;
  slug: string;
  name: string;
  icon: string;
  short: string;
  description: string;
  benefits: string[];
  process: ServiceProcessStep[];
  image: string;
  sort_order: number;
  is_visible: boolean;
  created_at: string;
  updated_at: string;
};

function mapRow(r: ServiceRow): Service {
  return {
    id: r.id,
    slug: r.slug,
    name: r.name,
    icon: r.icon,
    short: r.short,
    description: r.description,
    benefits: r.benefits,
    process: r.process,
    image: r.image,
    sortOrder: r.sort_order,
    isVisible: r.is_visible,
    createdAt: r.created_at,
    updatedAt: r.updated_at,
  };
}

export const getServices = cache(async (): Promise<Service[]> => {
  await ensureServicesTable();
  const { rows } = await pool.query<ServiceRow>("SELECT * FROM services ORDER BY sort_order ASC, id ASC");
  if (rows.length === 0) return DEFAULT_SERVICES;
  return rows.map(mapRow);
});

export async function getServiceBySlug(slug: string): Promise<Service | undefined> {
  const services = await getServices();
  return services.find((s) => s.slug === slug);
}
