const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

const ABOUT_DEFAULT = {
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

async function main() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS about_content (
      id INTEGER PRIMARY KEY DEFAULT 1,
      badge TEXT NOT NULL,
      heading TEXT NOT NULL,
      paragraph1 TEXT NOT NULL,
      paragraph2 TEXT NOT NULL,
      image_id TEXT NOT NULL,
      features JSONB NOT NULL,
      hero_eyebrow TEXT NOT NULL,
      hero_title TEXT NOT NULL,
      hero_description TEXT NOT NULL,
      updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
      CONSTRAINT about_content_singleton_id CHECK (id = 1)
    );
  `);

  const { rows } = await pool.query("SELECT id FROM about_content WHERE id = 1");
  if (rows.length > 0) {
    console.log("about_content already seeded, skipping.");
    await pool.end();
    return;
  }

  const c = ABOUT_DEFAULT;
  await pool.query(
    `INSERT INTO about_content (id, badge, heading, paragraph1, paragraph2, image_id, features, hero_eyebrow, hero_title, hero_description)
     VALUES (1, $1, $2, $3, $4, $5, $6, $7, $8, $9)`,
    [c.badge, c.heading, c.paragraph1, c.paragraph2, c.imageId, JSON.stringify(c.features), c.heroEyebrow, c.heroTitle, c.heroDescription]
  );
  console.log("Seeded about_content from current site copy.");
  await pool.end();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
