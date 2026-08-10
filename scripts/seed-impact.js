const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

const CATEGORIES = {
  opd: { yearly: 28000, fiveYear: 145000 },
  diagnostics: { yearly: 12500, fiveYear: 64000 },
  emergency: { yearly: 7200, fiveYear: 37000 },
  ipd: { yearly: 4800, fiveYear: 25000 },
  surgical: { yearly: 1500, fiveYear: 7800 },
};

function mulberry32(seed) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const rand = mulberry32(42);

async function main() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS impact_records (
      id SERIAL PRIMARY KEY,
      category TEXT NOT NULL CHECK (category IN ('opd','diagnostics','emergency','ipd','surgical')),
      record_date DATE NOT NULL,
      count INTEGER NOT NULL CHECK (count >= 0),
      created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
    );
  `);
  await pool.query(`CREATE INDEX IF NOT EXISTS impact_records_date_idx ON impact_records (record_date);`);
  await pool.query(`CREATE INDEX IF NOT EXISTS impact_records_category_idx ON impact_records (category);`);

  const { rows } = await pool.query("SELECT COUNT(*)::int AS n FROM impact_records");
  if (rows[0].n > 0) {
    console.log(`impact_records already has ${rows[0].n} rows, skipping seed.`);
    await pool.end();
    return;
  }

  const now = new Date();
  const values = [];
  for (const [category, { yearly, fiveYear }] of Object.entries(CATEGORIES)) {
    const recentMonthly = yearly / 12;
    const olderMonthly = Math.max((fiveYear - yearly) / 48, 0);
    for (let m = 0; m < 60; m++) {
      const base = m < 12 ? recentMonthly : olderMonthly;
      const jitter = 0.85 + rand() * 0.3;
      const count = Math.max(Math.round(base * jitter), 0);
      const date = new Date(now.getFullYear(), now.getMonth() - m, 15);
      values.push({ category, date: date.toISOString().slice(0, 10), count });
    }
  }

  const text = `INSERT INTO impact_records (category, record_date, count) VALUES ${values
    .map((_, i) => `($${i * 3 + 1}, $${i * 3 + 2}, $${i * 3 + 3})`)
    .join(", ")}`;
  const params = values.flatMap((v) => [v.category, v.date, v.count]);
  await pool.query(text, params);
  console.log(`Seeded ${values.length} impact records.`);
  await pool.end();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
