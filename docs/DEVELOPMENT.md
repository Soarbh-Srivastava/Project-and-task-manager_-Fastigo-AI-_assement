# Development Guide

## Prerequisites

- Node.js 18+
- npm
- PostgreSQL (if not using Docker)
- Docker + Docker Compose (optional but easiest)

## Run with Docker (recommended)

From repository root:

```bash
docker compose up --build
```

Services:

- Frontend: `http://localhost:4173`
- Backend: `http://localhost:9000`
- Health check: `http://localhost:9000/health`

## Run backend locally

```bash
cd backend
npm install
npm run build
npm run start-server
```

For development watch mode:

```bash
npm run dev
```

## Run frontend locally

```bash
cd frontend
npm install
npm run dev
```

## Tests

Backend:

```bash
cd backend
npm test
npm run test:coverage
```

Frontend:

```bash
cd frontend
npm test
```

## Data scripts (backend)

Populate DB:

```bash
cd backend
npm run populate-db
```

Delete DB data:

```bash
cd backend
npm run delete-db
```
