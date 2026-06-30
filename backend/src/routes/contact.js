import { Router } from 'express';
import { z } from 'zod';
import { query } from '../db/pool.js';

const router = Router();

const leadSchema = z.object({
  name: z.string().min(2).max(120),
  email: z.string().email().max(160),
  phone: z.string().min(7).max(20),
  company: z.string().max(160).optional(),
  location: z.string().max(160).optional(),
  amount: z.coerce.number().int().positive().optional(),
  message: z.string().max(2000).optional(),
});

// POST /api/contact
router.post('/contact', async (req, res, next) => {
  try {
    const parsed = leadSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: 'Invalid input', details: parsed.error.flatten() });
    }
    const { name, email, phone, company, location, amount, message } = parsed.data;
    const { rows } = await query(
      `INSERT INTO contact_leads (name, email, phone, company, location, amount, message)
       VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING id, created_at`,
      [name, email, phone, company ?? null, location ?? null, amount ?? null, message ?? null]
    );
    res.status(201).json({ ok: true, id: rows[0].id });
  } catch (err) {
    next(err);
  }
});

const subSchema = z.object({ email: z.string().email().max(160) });

// POST /api/subscribe
router.post('/subscribe', async (req, res, next) => {
  try {
    const parsed = subSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ error: 'Invalid email' });
    await query(
      `INSERT INTO newsletter_subscribers (email) VALUES ($1)
       ON CONFLICT (email) DO NOTHING`,
      [parsed.data.email]
    );
    res.status(201).json({ ok: true });
  } catch (err) {
    next(err);
  }
});

export default router;
