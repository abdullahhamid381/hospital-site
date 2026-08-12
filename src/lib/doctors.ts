import { cache } from "react";
import { pool, ensureDoctorsTable } from "@/lib/db";
import { DEFAULT_DOCTORS, type Doctor } from "@/lib/data/doctors";

type DoctorRow = {
  id: number;
  slug: string;
  name: string;
  specialization: string;
  department: string;
  experience: string;
  qualifications: string[];
  languages: string[];
  available_days: string;
  available_timings: string;
  bio: string;
  expertise: string[];
  image: string;
  sort_order: number;
  is_visible: boolean;
  created_at: string;
  updated_at: string;
};

function mapRow(r: DoctorRow): Doctor {
  return {
    id: r.id,
    slug: r.slug,
    name: r.name,
    specialization: r.specialization,
    department: r.department,
    experience: r.experience,
    qualifications: r.qualifications,
    languages: r.languages,
    availableDays: r.available_days,
    availableTimings: r.available_timings,
    bio: r.bio,
    expertise: r.expertise,
    image: r.image,
    sortOrder: r.sort_order,
    isVisible: r.is_visible,
    createdAt: r.created_at,
    updatedAt: r.updated_at,
  };
}

export const getDoctors = cache(async (): Promise<Doctor[]> => {
  await ensureDoctorsTable();
  const { rows } = await pool.query<DoctorRow>("SELECT * FROM doctors ORDER BY sort_order ASC, id ASC");
  if (rows.length === 0) return DEFAULT_DOCTORS;
  return rows.map(mapRow);
});

export async function getDoctorBySlug(slug: string): Promise<Doctor | undefined> {
  const doctors = await getDoctors();
  return doctors.find((d) => d.slug === slug);
}
