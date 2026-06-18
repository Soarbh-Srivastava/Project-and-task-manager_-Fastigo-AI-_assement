# Deployment Guide

## Frontend (Vercel)

Project settings:

- Framework: Vite
- Root directory: `frontend`
- Build command: `npm run build`
- Output directory: `dist`

Environment variables:

- `VITE_API_URL=https://<your-backend-domain>`

SPA refresh handling:

- `frontend/vercel.json` includes rewrite to `/index.html`
- This prevents 404 on hard refresh for client-side routes

## Backend (Render/Railway/other Node host)

Root directory: `backend`

Build:

```bash
npm install && npm run build
```

Start:

```bash
npm start
```

Required env:

- `DATABASE_URL` (or full `DB_*` set)
- `AUTH_SECRET`
- `PORT` (provided by platform in most cases)
- `CORS_ORIGIN` (frontend URL)
- `DB_SSL=true` for managed cloud postgres (recommended)

## CORS notes

Backend accepts a comma-separated list in `CORS_ORIGIN` (or `FRONTEND_ORIGIN`).

Example:

```text
CORS_ORIGIN=https://your-app.vercel.app,https://preview-your-app.vercel.app
```

## Smoke checks after deploy

1. `GET /health` returns `{ "status": "ok" }`
2. Frontend login works
3. Protected routes (`/teams`, `/projects`, `/tasks`) load data
4. No browser CORS errors in network tab

## Rollback strategy

- Keep previous successful deployment available in provider dashboard
- If new backend fails, rollback backend first
- If frontend points to wrong API URL, redeploy frontend with corrected `VITE_API_URL`
