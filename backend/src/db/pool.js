import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;

/**
 * In production (Render + Neon) we connect via a single DATABASE_URL with SSL.
 * Locally we fall back to discrete PG* vars (Unix socket / peer auth).
 */
const useConnectionString = Boolean(process.env.DATABASE_URL);

export const pool = new Pool(
  useConnectionString
    ? {
        connectionString: process.env.DATABASE_URL,
        // Neon requires TLS. rejectUnauthorized:false works with their managed cert chain.
        ssl: { rejectUnauthorized: false },
        max: Number(process.env.PG_POOL_MAX) || 5,
        idleTimeoutMillis: 30000,
        connectionTimeoutMillis: 10000,
      }
    : {
        host: process.env.PGHOST || 'localhost',
        port: Number(process.env.PGPORT) || 5432,
        user: process.env.PGUSER || 'postgres',
        // empty string -> undefined so peer/trust auth works locally
        password: process.env.PGPASSWORD || undefined,
        database: process.env.PGDATABASE || 'hindustan_finserve',
        max: 10,
        idleTimeoutMillis: 30000,
      }
);

pool.on('error', (err) => {
  console.error('Unexpected Postgres pool error:', err);
});

export const query = (text, params) => pool.query(text, params);
