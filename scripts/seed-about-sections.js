const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

const DEFAULT_SECTIONS = [
  {
    type: "hero",
    title: "About Page Hero",
    isVisible: true,
    showOnHome: false,
    content: {
      eyebrow: "About Us",
      title: "Two Decades of Trusted Healthcare",
      description:
        "We combine experienced medical specialists with modern technology to deliver healthcare that puts patients first, every time.",
    },
  },
  {
    type: "intro",
    title: "Homepage About Section",
    isVisible: true,
    showOnHome: true,
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
    },
  },
  {
    type: "stats",
    title: "Key Stats",
    isVisible: true,
    showOnHome: false,
    content: {
      items: [
        { value: 20, suffix: "+", label: "Years of Excellence" },
        { value: 50, suffix: "K+", label: "Patients Served" },
        { value: 100, suffix: "+", label: "Medical Professionals" },
        { value: 25, suffix: "+", label: "Specialized Departments" },
        { value: 24, suffix: "/7", label: "Emergency Services" },
      ],
    },
  },
  {
    type: "cards",
    title: "Why Choose Us",
    isVisible: true,
    showOnHome: false,
    content: {
      eyebrow: "Why Choose Us",
      heading: "Care You Can Rely On",
      items: [
        { icon: "Stethoscope", title: "Expert Medical Team", detail: "Specialists across 25+ departments with decades of combined experience." },
        { icon: "ScanLine", title: "Advanced Medical Technology", detail: "Digital imaging, modern OTs, and accredited diagnostic labs." },
        { icon: "Siren", title: "24/7 Emergency Care", detail: "Trauma-trained staff and a dedicated emergency department, always open." },
        { icon: "Building2", title: "Modern Facilities", detail: "Private rooms, ICU, CCU, and patient-first spaces throughout." },
      ],
    },
  },
  {
    type: "cards",
    title: "Technology",
    isVisible: true,
    showOnHome: false,
    content: {
      eyebrow: "Technology",
      heading: "Technology That Advances Patient Care",
      items: [
        { icon: "ScanLine", title: "Advanced Diagnostic Equipment", detail: "Digital X-ray, CT, and ultrasound for precise, fast diagnostics." },
        { icon: "Database", title: "Digital Patient Records", detail: "Secure electronic records accessible across every department." },
        { icon: "Cpu", title: "Modern Surgical Technology", detail: "Laparoscopic and minimally invasive surgical systems." },
        { icon: "Image", title: "Digital Imaging", detail: "High-resolution imaging with radiologist review and reporting." },
      ],
    },
  },
  {
    type: "cta",
    title: "Final Call to Action",
    isVisible: true,
    showOnHome: false,
    content: {
      heading: "Your Health Deserves Exceptional Care.",
      primaryLabel: "Book an Appointment",
      primaryHref: "/appointment",
      secondaryLabel: "Contact Us",
      secondaryHref: "/contact",
    },
  },
];

async function main() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS about_sections (
      id SERIAL PRIMARY KEY,
      type TEXT NOT NULL CHECK (type IN ('hero','intro','stats','cards','richtext','cta')),
      title TEXT NOT NULL,
      sort_order INTEGER NOT NULL DEFAULT 0,
      is_visible BOOLEAN NOT NULL DEFAULT true,
      show_on_home BOOLEAN NOT NULL DEFAULT false,
      content JSONB NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
    );
  `);
  await pool.query(`CREATE INDEX IF NOT EXISTS about_sections_sort_idx ON about_sections (sort_order);`);

  const { rows } = await pool.query("SELECT COUNT(*)::int AS n FROM about_sections");
  if (rows[0].n > 0) {
    console.log("about_sections already seeded, skipping.");
    await pool.end();
    return;
  }

  for (let i = 0; i < DEFAULT_SECTIONS.length; i++) {
    const s = DEFAULT_SECTIONS[i];
    await pool.query(
      `INSERT INTO about_sections (type, title, sort_order, is_visible, show_on_home, content)
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [s.type, s.title, i, s.isVisible, s.showOnHome, JSON.stringify(s.content)]
    );
  }
  console.log(`Seeded about_sections with ${DEFAULT_SECTIONS.length} default sections.`);
  await pool.end();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
