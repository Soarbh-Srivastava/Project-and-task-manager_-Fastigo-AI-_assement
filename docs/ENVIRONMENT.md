# Environment Variables

## Backend (`backend`)

### Required

You must provide either:

- `DATABASE_URL` (recommended in cloud)

or all of these DB-specific variables:

- `DB_HOST`
- `DB_USERNAME`
- `DB_PASSWORD`
- `DB_PORT`
- `DB_NAME`

If `DATABASE_URL` is missing and any DB-specific variable is missing, backend startup fails.

### Common

- `PORT` (default `9000`)
- `AUTH_SECRET` (recommended to set in production)
- `LOGGER_LEVEL` (for winston logger level)
- `NODE_ENV` (set to `production` in production)

### CORS

Backend supports either of:

- `CORS_ORIGIN`
- `FRONTEND_ORIGIN`

You can pass multiple values separated by commas.

## Frontend (`frontend`)

Vite variables are injected at build time (not runtime).

- `VITE_API_URL` (preferred)
- `VITE_API_BASE_URL` (supported fallback)

Frontend axios uses:

1. `VITE_API_URL`
2. `VITE_API_BASE_URL`
3. fallback: `http://localhost:9000`

## AI / Gemini (optional)

To enable AI task summarization the backend accepts these env vars:

- `GEMINI_API_KEY` - your API key for the Gemini/Generative API (optional)
- `GEMINI_MODEL` - model id (default: `text-bison-001`)

If `GEMINI_API_KEY` is not provided the backend will fall back to a simple local summarizer.

## Docker Compose defaults

In `docker-compose.yml`:

- Backend runs on `http://localhost:9000`
- Frontend runs on `http://localhost:4173`
- Frontend build arg `VITE_API_URL` points to backend local URL
