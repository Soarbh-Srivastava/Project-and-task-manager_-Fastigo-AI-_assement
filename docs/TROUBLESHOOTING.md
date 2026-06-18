# Troubleshooting

## Frontend calls localhost in production

Symptoms:

- Production UI requests `http://localhost:9000`

Checks:

1. Ensure Vercel project env has `VITE_API_URL`
2. Redeploy frontend (Vite embeds env at build time)
3. Confirm `frontend/src/api/axios.ts` picks env in this order:
   - `VITE_API_URL`
   - `VITE_API_BASE_URL`
   - fallback `http://localhost:9000`

## 404 on refresh in Vercel

Symptoms:

- Refreshing `/dashboard` or `/tasks` returns 404

Fix:

- Ensure `frontend/vercel.json` has SPA rewrite to `/index.html`

## CORS errors

Symptoms:

- Browser reports blocked by CORS policy

Fix:

1. Set backend `CORS_ORIGIN` to exact frontend domain(s)
2. Include protocol (`https://...`)
3. If multiple, separate with commas
4. Redeploy backend

## Unauthorized / Invalid token

Symptoms:

- `401 Unauthorized`
- `401 Invalid or expired token`

Fix:

1. Confirm `Authorization: Bearer <token>` is sent
2. Clear frontend auth storage and login again
3. Ensure backend `AUTH_SECRET` is stable across restarts

## Database environment variable errors at boot

Symptoms:

- Backend exits with missing DB env message

Fix:

- Set either `DATABASE_URL` or all required `DB_*` vars:
  - `DB_HOST`, `DB_USERNAME`, `DB_PASSWORD`, `DB_PORT`, `DB_NAME`

## Toast notifications not visible

Checks:

1. Ensure `react-toastify` is installed
2. Ensure `ToastContainer` is mounted in `frontend/src/main.tsx`
3. Confirm API requests use shared axios instance in `frontend/src/api/axios.ts`
