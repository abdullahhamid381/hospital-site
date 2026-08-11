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

  await ensureAboutSectionsTable();
}

let aboutSectionsReady: Promise<void> | null = null;

/**
 * ensureSchema() above is never actually called from any request path today,
 * so about_sections must create itself lazily on first use.
 */
export function ensureAboutSectionsTable(): Promise<void> {
  if (!aboutSectionsReady) {
    aboutSectionsReady = (async () => {
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
    })();
  }
  return aboutSectionsReady;
}

let servicesReady: Promise<void> | null = null;

/** Same lazy self-creation reasoning as ensureAboutSectionsTable(). */
export function ensureServicesTable(): Promise<void> {
  if (!servicesReady) {
    servicesReady = (async () => {
      await pool.query(`
        CREATE TABLE IF NOT EXISTS services (
          id SERIAL PRIMARY KEY,
          slug TEXT NOT NULL UNIQUE,
          name TEXT NOT NULL,
          icon TEXT NOT NULL,
          short TEXT NOT NULL,
          description TEXT NOT NULL,
          benefits JSONB NOT NULL,
          process JSONB NOT NULL,
          image TEXT NOT NULL,
          sort_order INTEGER NOT NULL DEFAULT 0,
          is_visible BOOLEAN NOT NULL DEFAULT true,
          created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
          updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
        );
      `);
      await pool.query(`CREATE INDEX IF NOT EXISTS services_sort_idx ON services (sort_order);`);
    })();
  }
  return servicesReady;
}

let staffReady: Promise<void> | null = null;

/** Same lazy self-creation reasoning as ensureAboutSectionsTable(). */
export function ensureStaffTable(): Promise<void> {
  if (!staffReady) {
    staffReady = (async () => {
      await pool.query(`
        CREATE TABLE IF NOT EXISTS staff_members (
          id SERIAL PRIMARY KEY,
          slug TEXT NOT NULL UNIQUE,
          name TEXT NOT NULL,
          role TEXT NOT NULL,
          category TEXT NOT NULL CHECK (category IN ('leadership','nursing','academic','general')),
          department TEXT,
          image TEXT NOT NULL,
          experience TEXT,
          short_bio TEXT NOT NULL,
          biography TEXT NOT NULL,
          qualifications JSONB NOT NULL DEFAULT '[]',
          languages JSONB NOT NULL DEFAULT '[]',
          expertise JSONB NOT NULL DEFAULT '[]',
          responsibilities JSONB NOT NULL DEFAULT '[]',
          experience_timeline JSONB NOT NULL DEFAULT '[]',
          schedule JSONB NOT NULL DEFAULT '[]',
          publications JSONB NOT NULL DEFAULT '[]',
          awards JSONB NOT NULL DEFAULT '[]',
          memberships JSONB NOT NULL DEFAULT '[]',
          email TEXT,
          phone TEXT,
          office TEXT,
          appointment_enabled BOOLEAN NOT NULL DEFAULT false,
          featured BOOLEAN NOT NULL DEFAULT false,
          sort_order INTEGER NOT NULL DEFAULT 0,
          is_visible BOOLEAN NOT NULL DEFAULT true,
          created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
          updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
        );
      `);
      await pool.query(`CREATE INDEX IF NOT EXISTS staff_members_sort_idx ON staff_members (sort_order);`);
    })();
  }
  return staffReady;
}
