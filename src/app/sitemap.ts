import type { MetadataRoute } from "next";
import { SERVICES } from "@/lib/data/services";
import { DEPARTMENTS } from "@/lib/data/departments";
import { DOCTORS } from "@/lib/data/doctors";
import { FACILITIES } from "@/lib/data/facilities";
import { PACKAGES } from "@/lib/data/packages";
import { BLOG_POSTS } from "@/lib/data/blog";

const BASE_URL = "https://www.ammhospital.pk";

const STATIC_ROUTES = [
  "", "about", "mission-vision", "services", "departments", "doctors", "appointment",
  "emergency-care", "facilities", "health-packages", "patient-information", "insurance",
  "testimonials", "success-stories", "blog", "faq", "contact", "careers", "gallery",
  "privacy-policy", "terms-conditions", "accessibility",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries = STATIC_ROUTES.map((route) => ({
    url: `${BASE_URL}/${route}`,
    lastModified: new Date(),
  }));

  const dynamicEntries = [
    ...SERVICES.map((s) => `${BASE_URL}/services/${s.slug}`),
    ...DEPARTMENTS.map((d) => `${BASE_URL}/departments/${d.slug}`),
    ...DOCTORS.map((d) => `${BASE_URL}/doctors/${d.slug}`),
    ...FACILITIES.map((f) => `${BASE_URL}/facilities/${f.slug}`),
    ...PACKAGES.map((p) => `${BASE_URL}/health-packages/${p.slug}`),
    ...BLOG_POSTS.map((b) => `${BASE_URL}/blog/${b.slug}`),
  ].map((url) => ({ url, lastModified: new Date() }));

  return [...staticEntries, ...dynamicEntries];
}
