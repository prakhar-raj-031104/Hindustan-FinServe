import { Router } from 'express';
import { query } from '../db/pool.js';

const router = Router();

// GET /api/fd-products  -> all products, optional ?featured=true
router.get('/fd-products', async (req, res, next) => {
  try {
    const featuredOnly = req.query.featured === 'true';
    const sql = featuredOnly
      ? 'SELECT * FROM fd_products WHERE is_featured = true ORDER BY interest_rate DESC'
      : 'SELECT * FROM fd_products ORDER BY interest_rate DESC';
    const { rows } = await query(sql);
    // Rates change rarely — let the CDN/browser cache briefly for low latency.
    res.set('Cache-Control', 'public, max-age=60, stale-while-revalidate=300');
    res.json({ data: rows });
  } catch (err) {
    next(err);
  }
});

// GET /api/calculate?principal=100000&rate=8&years=3&compounding=4
router.get('/calculate', (req, res) => {
  const principal = Number(req.query.principal) || 0;
  const rate = Number(req.query.rate) || 0;
  const years = Number(req.query.years) || 0;
  const n = Number(req.query.compounding) || 4; // quarterly default

  if (principal <= 0 || rate <= 0 || years <= 0) {
    return res.status(400).json({ error: 'principal, rate and years must be positive numbers' });
  }

  const r = rate / 100;
  const maturity = principal * Math.pow(1 + r / n, n * years);
  const interest = maturity - principal;

  res.json({
    principal,
    rate,
    years,
    maturityAmount: Math.round(maturity),
    interestEarned: Math.round(interest),
  });
});

export default router;
