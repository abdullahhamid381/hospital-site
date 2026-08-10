export type AboutFeature = { icon: string; title: string };

export type AboutContent = {
  badge: string;
  heading: string;
  paragraph1: string;
  paragraph2: string;
  imageId: string;
  features: AboutFeature[];
  heroEyebrow: string;
  heroTitle: string;
  heroDescription: string;
};

export const ABOUT_DEFAULT: AboutContent = {
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
  heroEyebrow: "About Us",
  heroTitle: "Two Decades of Trusted Healthcare",
  heroDescription:
    "We combine experienced medical specialists with modern technology to deliver healthcare that puts patients first, every time.",
};
