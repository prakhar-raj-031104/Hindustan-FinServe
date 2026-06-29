import { pool } from './pool.js';

const products = [
  // partner_name, type, tenure_months, rate, senior_rate, min_amount, rating, featured, highlight
  ['Shriram Finance', 'NBFC', 12, 7.85, 8.35, 5000, 'CRISIL AA+', true, 'Most popular'],
  ['Bajaj Finance', 'NBFC', 24, 8.10, 8.35, 15000, 'CRISIL AAA', true, 'Highest rated'],
  ['Mahindra Finance', 'NBFC', 36, 8.05, 8.30, 5000, 'CRISIL AAA', true, 'Best for 3 years'],
  ['PNB Housing', 'HFC', 18, 7.65, 7.95, 10000, 'CRISIL AA', false, null],
  ['LIC Housing Finance', 'HFC', 60, 7.75, 8.00, 10000, 'CRISIL AAA', true, 'Long tenure'],
  ['Sundaram Finance', 'NBFC', 12, 7.70, 8.20, 10000, 'CRISIL AAA', false, null],
  ['ICICI Home Finance', 'HFC', 24, 7.60, 7.85, 10000, 'CRISIL AAA', false, null],
  ['Unity Small Finance Bank', 'Bank', 12, 8.60, 9.10, 1000, 'Provisional', true, 'Top rate'],
];

async function seed() {
  console.log('Seeding database...');
  await pool.query('TRUNCATE fd_products RESTART IDENTITY CASCADE;');

  for (const p of products) {
    await pool.query(
      `INSERT INTO fd_products
        (partner_name, partner_type, tenure_months, interest_rate, senior_rate, min_amount, rating, is_featured, highlight)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)`,
      p
    );
  }

  console.log(`✅ Seeded ${products.length} FD products.`);
  await pool.end();
}

seed().catch((err) => {
  console.error('❌ Seed failed:', err);
  process.exit(1);
});
