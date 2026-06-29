import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';

import fdRoutes from './routes/fd.js';
import contactRoutes from './routes/contact.js';

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 4000;
const isProd = process.env.NODE_ENV === 'production';

// Render (and most PaaS) sit behind a proxy — needed for correct client IPs
// (rate limiting) and secure cookies.
app.set('trust proxy', 1);

app.use(
  helmet({
    // API is consumed cross-origin by the static frontend
    crossOriginResourcePolicy: { policy: 'cross-origin' },
  })
);
app.use(compression());

// Allow one or more comma-separated origins from env; default to local dev.
const allowedOrigins = (process.env.CORS_ORIGIN || 'http://localhost:5173')
  .split(',')
  .map((o) => o.trim());
app.use(
  cors({
    origin(origin, cb) {
      // allow same-origin / curl (no origin) and any whitelisted origin
      if (!origin || allowedOrigins.includes(origin)) return cb(null, true);
      return cb(new Error('Not allowed by CORS'));
    },
  })
);

app.use(express.json({ limit: '100kb' }));
app.use(morgan(isProd ? 'combined' : 'dev'));

// Rate limit write endpoints to prevent spam
const writeLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 30,
  standardHeaders: true,
  legacyHeaders: false,
});

app.get('/api/health', (req, res) => res.json({ status: 'ok', ts: Date.now() }));

app.use('/api', fdRoutes);
app.use('/api', writeLimiter, contactRoutes);

// 404
app.use((req, res) => res.status(404).json({ error: 'Not found' }));

// Error handler
app.use((err, req, res, next) => {
  if (err?.message === 'Not allowed by CORS') {
    return res.status(403).json({ error: 'Origin not allowed' });
  }
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`🚀 Hindustan FinServe API running on port ${PORT} (${isProd ? 'production' : 'development'})`);
});
