# Team Task Manager

Full-stack task management app with an Express + TypeORM backend and a Vite + React frontend.

## Structure

- `backend/` - REST API, database connection, controllers, and test coverage
- `frontend/` - React UI, shared components, and API integration

## Setup

### Backend

```bash
cd backend
npm install
npm run build
npm run start-server
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

## Docker

The repo includes a Docker setup for the full stack app:

- Postgres database
- Express + TypeORM backend
- React frontend served by Nginx

### Run with Docker Compose

```bash
docker compose up --build
```

Then open:

- Frontend: http://localhost:4173
- Backend health check: http://localhost:9000/health

### Notes

- The frontend uses the `VITE_API_URL` build arg and defaults to `http://localhost:9000`
- The backend uses `DATABASE_URL` and `DB_SSL=false` in the compose setup
- If you fork the repo, you can use the same compose file without extra configuration

## Testing

- Backend: `cd backend && npm run test:coverage`
- Frontend: `cd frontend && npm test`

## API Collection

A Postman collection is included at [backend/api/team-task-manager.postman_collection.json](backend/api/team-task-manager.postman_collection.json).

- Import it into Postman or Insomnia
- Set `baseUrl` to your backend URL
- Fill in `token`, `teamId`, `projectId`, `taskId`, and `memberId` as needed

## Architecture

The architectural design diagram is available at [public/arch.svg](public/arch.svg).

## Deployment

### Backend on Render

1. Push your code to GitHub
2. Create a new Web Service on [Render](https://render.com)
3. Connect your GitHub repository
4. Configure the service:
   - **Build Command:** `npm install && npm run build` (in backend directory)
   - **Start Command:** `npm start`
   - **Root Directory:** `backend`
5. Add environment variables:
   - `DATABASE_URL` - PostgreSQL connection string (use Render Postgres as recommended)
   - `DB_SSL` - Set to `true` for production
   - `CORS_ORIGIN` - Your frontend URL (e.g., https://your-app.vercel.app)
6. Deploy!

### Frontend on Vercel

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Configure the deployment:
   - **Framework Preset:** Vite
   - **Root Directory:** `frontend`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
4. Add environment variables:
   - `VITE_API_URL` - Your Render backend URL (e.g., https://your-app.onrender.com)
5. Deploy!

### Preventing Cold Shutdowns

Render puts free-tier services to sleep after 15 minutes of inactivity. To keep your backend awake:

1. Set up a cron job (using[cron-job.org](https://cron-job.org), or similar) to hit the health endpoint:
   ```
   GET https://project-and-task-manager-fastigo-ai.onrender.com/health
   ```
   Schedule it to run every 5 minutes.

2. Alternatively, upgrade to a paid plan on Render to avoid sleeping.

### GitHub Actions

The repo includes a GitHub Actions workflow and a Nixpacks config for Railway-style deployment of the backend service.