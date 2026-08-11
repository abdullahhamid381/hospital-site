export type AboutSectionType = "hero" | "intro" | "stats" | "cards" | "richtext" | "cta";

export const ABOUT_SECTION_TYPES: AboutSectionType[] = ["hero", "intro", "stats", "cards", "richtext", "cta"];

export type AboutFeature = { icon: string; title: string };
export type AboutStatItem = { value: number; suffix: string; label: string };
export type AboutCardItem = { icon: string; title: string; detail: string };

export type HeroContent = { eyebrow: string; title: string; description: string };
export type IntroContent = {
  badge: string;
  heading: string;
  paragraph1: string;
  paragraph2: string;
  imageId: string;
  features: AboutFeature[];
  ctaLabel: string;
  ctaHref: string;
};
export type StatsContent = { items: AboutStatItem[] };
export type CardsContent = { eyebrow: string; heading: string; items: AboutCardItem[] };
export type RichTextContent = { eyebrow: string; heading: string; body: string };
export type CTAContent = {
  heading: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel: string;
  secondaryHref: string;
};

export type AboutSectionContent =
  | HeroContent
  | IntroContent
  | StatsContent
  | CardsContent
  | RichTextContent
  | CTAContent;

export type AboutSection = {
  id: number;
  type: AboutSectionType;
  title: string;
  sortOrder: number;
  isVisible: boolean;
  showOnHome: boolean;
  content: AboutSectionContent;
  createdAt: string | null;
  updatedAt: string | null;
};

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function isFiniteNumber(value: unknown): value is number {
  return typeof value === "number" && Number.isFinite(value);
}

export function isValidHeroContent(value: unknown): value is HeroContent {
  if (!value || typeof value !== "object") return false;
  const v = value as Partial<HeroContent>;
  return isNonEmptyString(v.eyebrow) && isNonEmptyString(v.title) && isNonEmptyString(v.description);
}

export function isValidIntroContent(value: unknown): value is IntroContent {
  if (!value || typeof value !== "object") return false;
  const v = value as Partial<IntroContent>;
  if (
    !isNonEmptyString(v.badge) ||
    !isNonEmptyString(v.heading) ||
    !isNonEmptyString(v.paragraph1) ||
    !isNonEmptyString(v.paragraph2) ||
    !isNonEmptyString(v.imageId) ||
    !isNonEmptyString(v.ctaLabel) ||
    !isNonEmptyString(v.ctaHref)
  ) {
    return false;
  }
  if (!Array.isArray(v.features) || v.features.length === 0 || v.features.length > 8) return false;
  return v.features.every((f) => f && isNonEmptyString(f.icon) && isNonEmptyString(f.title));
}

export function isValidStatsContent(value: unknown): value is StatsContent {
  if (!value || typeof value !== "object") return false;
  const v = value as Partial<StatsContent>;
  if (!Array.isArray(v.items) || v.items.length === 0 || v.items.length > 10) return false;
  return v.items.every((i) => i && isFiniteNumber(i.value) && typeof i.suffix === "string" && isNonEmptyString(i.label));
}

export function isValidCardsContent(value: unknown): value is CardsContent {
  if (!value || typeof value !== "object") return false;
  const v = value as Partial<CardsContent>;
  if (!isNonEmptyString(v.eyebrow) || !isNonEmptyString(v.heading)) return false;
  if (!Array.isArray(v.items) || v.items.length === 0 || v.items.length > 12) return false;
  return v.items.every((i) => i && isNonEmptyString(i.icon) && isNonEmptyString(i.title) && isNonEmptyString(i.detail));
}

export function isValidRichTextContent(value: unknown): value is RichTextContent {
  if (!value || typeof value !== "object") return false;
  const v = value as Partial<RichTextContent>;
  return isNonEmptyString(v.eyebrow) && isNonEmptyString(v.heading) && isNonEmptyString(v.body);
}

export function isValidCTAContent(value: unknown): value is CTAContent {
  if (!value || typeof value !== "object") return false;
  const v = value as Partial<CTAContent>;
  return (
    isNonEmptyString(v.heading) &&
    isNonEmptyString(v.primaryLabel) &&
    isNonEmptyString(v.primaryHref) &&
    isNonEmptyString(v.secondaryLabel) &&
    isNonEmptyString(v.secondaryHref)
  );
}

export function isValidSectionContent(type: AboutSectionType, content: unknown): boolean {
  switch (type) {
    case "hero":
      return isValidHeroContent(content);
    case "intro":
      return isValidIntroContent(content);
    case "stats":
      return isValidStatsContent(content);
    case "cards":
      return isValidCardsContent(content);
    case "richtext":
      return isValidRichTextContent(content);
    case "cta":
      return isValidCTAContent(content);
  }
}

export function defaultContentForType(type: AboutSectionType): AboutSectionContent {
  switch (type) {
    case "hero":
      return { eyebrow: "About Us", title: "New Hero Section", description: "" };
    case "intro":
      return {
        badge: "About Us",
        heading: "New Intro Section",
        paragraph1: "",
        paragraph2: "",
        imageId: "photo-1519494026892-80bbd2d6fd0d",
        features: [{ icon: "Sparkles", title: "New Feature" }],
        ctaLabel: "Learn More About Us",
        ctaHref: "/about",
      };
    case "stats":
      return { items: [{ value: 0, suffix: "+", label: "New Stat" }] };
    case "cards":
      return { eyebrow: "Section", heading: "New Cards Section", items: [{ icon: "Sparkles", title: "New Card", detail: "" }] };
    case "richtext":
      return { eyebrow: "Section", heading: "New Text Section", body: "" };
    case "cta":
      return {
        heading: "New Call to Action",
        primaryLabel: "Contact Us",
        primaryHref: "/contact",
        secondaryLabel: "View Services",
        secondaryHref: "/services",
      };
  }
}

/** In-memory fallback mirroring the site's original hardcoded About page copy, used when about_sections is empty. */
export const DEFAULT_ABOUT_SECTIONS: AboutSection[] = [
  {
    id: 1,
    type: "hero",
    title: "About Page Hero",
    sortOrder: 0,
    isVisible: true,
    showOnHome: false,
    createdAt: null,
    updatedAt: null,
    content: {
      eyebrow: "About Us",
      title: "Two Decades of Trusted Healthcare",
      description:
        "We combine experienced medical specialists with modern technology to deliver healthcare that puts patients first, every time.",
    } satisfies HeroContent,
  },
  {
    id: 2,
    type: "intro",
    title: "Homepage About Section",
    sortOrder: 1,
    isVisible: true,
    showOnHome: true,
    createdAt: null,
    updatedAt: null,
    content: {
      badge: "About Us",
      heading: "Healthcare Built Around People",
      paragraph1:
        "For over two decades, our mission has been simple: deliver medical care that treats patients as people, not cases. We combine experienced specialists with modern diagnostic and surgical technology, so every visit — routine or urgent — is met with the same standard of attentive, quality care.",
      paragraph2:
        "Our vision is to be the region's most trusted healthcare institution, known equally for clinical excellence and genuine compassion.",
      imageId: "photo-1519494026892-80bbd2d6fd0d",
      features: [
        { icon: "Users", title: "Experienced Specialists" },
        { icon: "Cpu", title: "Advanced Technology" },
        { icon: "HeartHandshake", title: "Patient-Centered Care" },
        { icon: "Clock3", title: "24/7 Support" },
      ],
      ctaLabel: "Learn More About Us",
      ctaHref: "/about",
    } satisfies IntroContent,
  },
  {
    id: 3,
    type: "stats",
    title: "Key Stats",
    sortOrder: 2,
    isVisible: true,
    showOnHome: false,
    createdAt: null,
    updatedAt: null,
    content: {
      items: [
        { value: 20, suffix: "+", label: "Years of Excellence" },
        { value: 50, suffix: "K+", label: "Patients Served" },
        { value: 100, suffix: "+", label: "Medical Professionals" },
        { value: 25, suffix: "+", label: "Specialized Departments" },
        { value: 24, suffix: "/7", label: "Emergency Services" },
      ],
    } satisfies StatsContent,
  },
  {
    id: 4,
    type: "cards",
    title: "Why Choose Us",
    sortOrder: 3,
    isVisible: true,
    showOnHome: false,
    createdAt: null,
    updatedAt: null,
    content: {
      eyebrow: "Why Choose Us",
      heading: "Care You Can Rely On",
      items: [
        { icon: "Stethoscope", title: "Expert Medical Team", detail: "Specialists across 25+ departments with decades of combined experience." },
        { icon: "ScanLine", title: "Advanced Medical Technology", detail: "Digital imaging, modern OTs, and accredited diagnostic labs." },
        { icon: "Siren", title: "24/7 Emergency Care", detail: "Trauma-trained staff and a dedicated emergency department, always open." },
        { icon: "Building2", title: "Modern Facilities", detail: "Private rooms, ICU, CCU, and patient-first spaces throughout." },
      ],
    } satisfies CardsContent,
  },
  {
    id: 5,
    type: "cards",
    title: "Technology",
    sortOrder: 4,
    isVisible: true,
    showOnHome: false,
    createdAt: null,
    updatedAt: null,
    content: {
      eyebrow: "Technology",
      heading: "Technology That Advances Patient Care",
      items: [
        { icon: "ScanLine", title: "Advanced Diagnostic Equipment", detail: "Digital X-ray, CT, and ultrasound for precise, fast diagnostics." },
        { icon: "Database", title: "Digital Patient Records", detail: "Secure electronic records accessible across every department." },
        { icon: "Cpu", title: "Modern Surgical Technology", detail: "Laparoscopic and minimally invasive surgical systems." },
        { icon: "Image", title: "Digital Imaging", detail: "High-resolution imaging with radiologist review and reporting." },
      ],
    } satisfies CardsContent,
  },
  {
    id: 6,
    type: "cta",
    title: "Final Call to Action",
    sortOrder: 5,
    isVisible: true,
    showOnHome: false,
    createdAt: null,
    updatedAt: null,
    content: {
      heading: "Your Health Deserves Exceptional Care.",
      primaryLabel: "Contact Us",
      primaryHref: "/contact",
      secondaryLabel: "View Services",
      secondaryHref: "/services",
    } satisfies CTAContent,
  },
];
