# Deployment — Render (frontend + backend) + Neon (Postgres)

This guide takes the app from local to production. Time: ~20–30 min.

---

## 1. Database — Neon

1. Create a project at <https://neon.tech> → it provisions a Postgres database.
2. In **Connection Details**, copy the **Pooled connection** string
   (the host contains `-pooler`). It looks like:
   ```
   postgresql://USER:PASSWORD@ep-xxxx-pooler.REGION.aws.neon.tech/DBNAME?sslmode=require
   ```
   Use the **pooled** URL so the free-tier connection limit isn't exhausted.
3. Load the schema + seed data once. From your machine:
   ```bash
   cd backend
   DATABASE_URL="postgresql://...-pooler...?sslmode=require" npm run db:setup
   ```
   (`db:setup` = migrate + seed. Re-running `db:seed` later will reset the FD
   product rows, so only seed when you intend to.)

---

## 2. Deploy with the Blueprint (recommended)

The repo includes [`render.yaml`](render.yaml), which defines both services.

1. Push this repo to GitHub.
2. Render → **New → Blueprint** → pick the repo. It detects `render.yaml` and
   creates **hindustan-finserve-api** (web) and **hindustan-finserve-web** (static).
3. When prompted (or afterwards in each service's **Environment** tab) set:

   **hindustan-finserve-api**
   | Key | Value |
   |-----|-------|
   | `DATABASE_URL` | your Neon **pooled** string (`?sslmode=require`) |
   | `CORS_ORIGIN` | the web service URL, e.g. `https://hindustan-finserve-web.onrender.com` |

   **hindustan-finserve-web**
   | Key | Value |
   |-----|-------|
   | `VITE_API_BASE_URL` | the API URL, e.g. `https://hindustan-finserve-api.onrender.com` |

4. Because the two URLs reference each other, do this on the first deploy:
   - Deploy once so Render assigns both URLs.
   - Fill `CORS_ORIGIN` and `VITE_API_BASE_URL` with the real URLs.
   - **Redeploy** the static site (it bakes `VITE_API_BASE_URL` in at build time)
     and the API will pick up `CORS_ORIGIN` on its next deploy.

---

## 3. Manual setup (alternative to the Blueprint)

**Backend** → New → Web Service → root dir `backend`
- Build: `npm install` · Start: `npm start` · Health check: `/api/health`
- Pre-deploy: `npm run db:migrate`
- Env: `NODE_ENV=production`, `PG_POOL_MAX=5`, `DATABASE_URL=...`, `CORS_ORIGIN=...`

**Frontend** → New → Static Site → root dir `frontend`
- Build: `npm install && npm run build` · Publish: `dist`
- Add SPA rewrite `/*` → `/index.html`
- Env: `VITE_API_BASE_URL=https://<your-api>.onrender.com`

---

## 4. Verify

```bash
curl https://<your-api>.onrender.com/api/health           # {"status":"ok",...}
curl https://<your-api>.onrender.com/api/fd-products       # seeded rows
```
Open the frontend URL → the FD Rates table should load, and the contact form
should return success (check the `contact_leads` table in Neon).

---

## Notes / gotchas

- **Render free tier sleeps** after inactivity; the first request can take ~30s
  to wake. Upgrade the API to a paid instance to avoid cold starts.
- **`VITE_API_BASE_URL` is build-time.** Changing it requires a redeploy of the
  static site, not just a restart.
- Neon free tier auto-suspends idle databases; the first query after idle has a
  brief cold start — the pooled connection + `connectionTimeoutMillis` handle it.
- To rotate to a different frontend domain later, update `CORS_ORIGIN` (supports
  a comma-separated list of origins).
