import { Pool } from "pg";

declare global {
  var _pgPool: Pool | undefined;
}

export const pool =
  global._pgPool ??
  new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
  });

if (process.env.NODE_ENV !== "production") {
  global._pgPool = pool;
}

export type ImpactCategoryKey = "opd" | "diagnostics" | "emergency" | "ipd" | "surgical";

export type ImpactRecord = {
  id: number;
  category: ImpactCategoryKey;
  recordDate: string;
  count: number;
  createdAt: string;
  updatedAt: string;
};

export async function ensureSchema() {
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

  await pool.query(`
    CREATE TABLE IF NOT EXISTS admin_emails (
      email TEXT PRIMARY KEY,
      added_at TIMESTAMPTZ NOT NULL DEFAULT now()
    );
  `);

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
}
