# Hindustan FinServe — Animated Redesign

A modern, animated marketing site for Hindustan FinServe (Fixed Deposit distribution),
built with an **Express + Postgres** backend and a **React + Vite** frontend using
**GSAP**, **ScrollTrigger** and **Lenis** smooth scrolling.

## Highlights

- **Lenis + GSAP ScrollTrigger** smooth-scroll engine
- **Pinned horizontal side-scroll** product gallery (cards roll left→right)
- **Sticky stacked cards** that scale/blur as you scroll
- **Reveal-on-scroll** sections, animated hero with rotating headline + count-up calculator
- **Live FD rate comparison** served from Postgres
- **Contact / callback** form and newsletter signup persisted to Postgres

## Project structure

```
backend/   Express API + Postgres (FD products, leads, calculator)
frontend/  React + Vite + GSAP + Lenis UI
```

## Prerequisites

- Node 18+
- PostgreSQL running locally (defaults assume port 5433)

## 1. Backend setup

```bash
cd backend
cp .env.example .env        # adjust PG* and PORT as needed
npm install
createdb hindustan_finserve # or: psql -c "CREATE DATABASE hindustan_finserve;"
npm run db:setup            # migrate + seed FD products
npm run dev                 # http://localhost:4000
```

### API

| Method | Route                | Description                         |
| ------ | -------------------- | ----------------------------------- |
| GET    | `/api/health`        | Health check                        |
| GET    | `/api/fd-products`   | List FD products (`?featured=true`) |
| GET    | `/api/calculate`     | Maturity calc (query params)        |
| POST   | `/api/contact`       | Save a callback lead                |
| POST   | `/api/subscribe`     | Newsletter signup                   |

## 2. Frontend setup

```bash
cd frontend
npm install
npm run dev                 # http://localhost:5173
```

Vite proxies `/api` → `http://localhost:4000`, so run the backend alongside it.

## Build for production

```bash
cd frontend && npm run build   # outputs frontend/dist
```

Serve `frontend/dist` from any static host and point it at the deployed API.

## Notes

The visual design and animation patterns are original work inspired by modern fintech
UX conventions. All copy, brand assets and imagery are specific to Hindustan FinServe.
