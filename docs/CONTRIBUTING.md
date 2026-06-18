# Contributing

## Branch and PR flow

1. Create a branch from `main`
2. Keep changes focused and small
3. Run tests and build before opening PR
4. Open PR with clear summary and screenshots for UI updates

## Local quality checks

Backend:

```bash
cd backend
npm run build
npm test
```

Frontend:

```bash
cd frontend
npm run build
npm test
```

## Commit style

Use clear commit messages such as:

- `feat(frontend): add toast notifications for API errors`
- `fix(api): handle missing task status validation`
- `docs: add deployment and troubleshooting guides`

## Documentation updates

When changing API contracts or env vars, update:

- `docs/API.md`
- `docs/ENVIRONMENT.md`
- Root `README.md` if setup steps changed
