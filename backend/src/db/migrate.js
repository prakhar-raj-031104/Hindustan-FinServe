import { pool } from './pool.js';

const SQL = `
CREATE TABLE IF NOT EXISTS fd_products (
  id              SERIAL PRIMARY KEY,
  partner_name    TEXT NOT NULL,
  partner_type    TEXT NOT NULL DEFAULT 'NBFC',
  tenure_months   INTEGER NOT NULL,
  interest_rate   NUMERIC(5,2) NOT NULL,
  senior_rate     NUMERIC(5,2),
  min_amount      INTEGER NOT NULL DEFAULT 5000,
  rating          TEXT,
  is_featured     BOOLEAN NOT NULL DEFAULT false,
  highlight       TEXT,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS contact_leads (
  id           SERIAL PRIMARY KEY,
  name         TEXT NOT NULL,
  email        TEXT NOT NULL,
  phone        TEXT NOT NULL,
  amount       INTEGER,
  message      TEXT,
  source       TEXT DEFAULT 'website',
  created_at   TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id          SERIAL PRIMARY KEY,
  email       TEXT UNIQUE NOT NULL,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_fd_featured ON fd_products(is_featured);
CREATE INDEX IF NOT EXISTS idx_leads_created ON contact_leads(created_at DESC);
`;

async function migrate() {
  console.log('Running migrations...');
  await pool.query(SQL);
  console.log('✅ Migrations complete.');
  await pool.end();
}

migrate().catch((err) => {
  console.error('❌ Migration failed:', err);
  process.exit(1);
});
