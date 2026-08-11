import type { MetadataRoute } from "next";
import { getServices } from "@/lib/services";
import { getStaffMembers } from "@/lib/staff";
import { DEPARTMENTS } from "@/lib/data/departments";
import { DOCTORS } from "@/lib/data/doctors";
import { FACILITIES } from "@/lib/data/facilities";
import { PACKAGES } from "@/lib/data/packages";
import { BLOG_POSTS } from "@/lib/data/blog";

const BASE_URL = "https://www.ammhospital.pk";

export const revalidate = 3600;

const STATIC_ROUTES = [
  "", "about", "mission-vision", "services", "departments", "doctors", "staff", "appointment",
  "emergency-care", "facilities", "health-packages", "patient-information", "insurance",
  "testimonials", "success-stories", "blog", "faq", "contact", "careers", "gallery",
  "privacy-policy", "terms-conditions", "accessibility",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const services = (await getServices()).filter((s) => s.isVisible);
  const staff = (await getStaffMembers()).filter((s) => s.isVisible);

  const staticEntries = STATIC_ROUTES.map((route) => ({
    url: `${BASE_URL}/${route}`,
    lastModified: new Date(),
  }));

  const dynamicEntries = [
    ...services.map((s) => `${BASE_URL}/services/${s.slug}`),
    ...staff.map((s) => `${BASE_URL}/staff/${s.slug}`),
    ...DEPARTMENTS.map((d) => `${BASE_URL}/departments/${d.slug}`),
    ...DOCTORS.map((d) => `${BASE_URL}/doctors/${d.slug}`),
    ...FACILITIES.map((f) => `${BASE_URL}/facilities/${f.slug}`),
    ...PACKAGES.map((p) => `${BASE_URL}/health-packages/${p.slug}`),
    ...BLOG_POSTS.map((b) => `${BASE_URL}/blog/${b.slug}`),
  ].map((url) => ({ url, lastModified: new Date() }));

  return [...staticEntries, ...dynamicEntries];
}
