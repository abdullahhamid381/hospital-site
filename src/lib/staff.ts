import { cache } from "react";
import { pool, ensureStaffTable } from "@/lib/db";
import { DEFAULT_STAFF, type StaffMember, type StaffCategory } from "@/lib/data/staff";

type StaffRow = {
  id: number;
  slug: string;
  name: string;
  role: string;
  category: StaffCategory;
  department: string | null;
  image: string;
  experience: string | null;
  short_bio: string;
  biography: string;
  qualifications: StaffMember["qualifications"];
  languages: string[];
  expertise: StaffMember["expertise"];
  responsibilities: StaffMember["responsibilities"];
  experience_timeline: StaffMember["experienceTimeline"];
  schedule: StaffMember["schedule"];
  publications: StaffMember["publications"];
  awards: StaffMember["awards"];
  memberships: StaffMember["memberships"];
  email: string | null;
  phone: string | null;
  office: string | null;
  appointment_enabled: boolean;
  featured: boolean;
  sort_order: number;
  is_visible: boolean;
  created_at: string;
  updated_at: string;
};

function mapRow(r: StaffRow): StaffMember {
  return {
    id: r.id,
    slug: r.slug,
    name: r.name,
    role: r.role,
    category: r.category,
    department: r.department ?? "",
    image: r.image,
    experience: r.experience ?? "",
    shortBio: r.short_bio,
    biography: r.biography,
    qualifications: r.qualifications,
    languages: r.languages,
    expertise: r.expertise,
    responsibilities: r.responsibilities,
    experienceTimeline: r.experience_timeline,
    schedule: r.schedule,
    publications: r.publications,
    awards: r.awards,
    memberships: r.memberships,
    email: r.email ?? "",
    phone: r.phone ?? "",
    office: r.office ?? "",
    appointmentEnabled: r.appointment_enabled,
    featured: r.featured,
    sortOrder: r.sort_order,
    isVisible: r.is_visible,
    createdAt: r.created_at,
    updatedAt: r.updated_at,
  };
}

export const getStaffMembers = cache(async (): Promise<StaffMember[]> => {
  await ensureStaffTable();
  const { rows } = await pool.query<StaffRow>("SELECT * FROM staff_members ORDER BY sort_order ASC, id ASC");
  if (rows.length === 0) return DEFAULT_STAFF;
  return rows.map(mapRow);
});

export async function getStaffBySlug(slug: string): Promise<StaffMember | undefined> {
  const staff = await getStaffMembers();
  return staff.find((s) => s.slug === slug);
}
