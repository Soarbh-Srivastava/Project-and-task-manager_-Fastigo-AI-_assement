# API Reference

Base URL examples:

- Local: `http://localhost:9000`
- Production: your deployed backend URL

## Conventions

- Auth header for protected routes:
  - `Authorization: Bearer <token>`
- Common unauthorized responses:
  - `401 { "message": "Unauthorized" }`
  - `401 { "message": "Invalid or expired token" }`
- Validation/business errors are commonly:
  - `400 { "error": "..." }`

## Health

### `GET /health`

Returns API health status.

Response:

```json
{ "status": "ok" }
```

---

## Auth

### `POST /auth/signup`

Create a user account.

Request body:

```json
{
  "email": "user@example.com",
  "password": "password123",
  "fullName": "John Doe"
}
```

Validation notes:

- `email` must look like a valid email
- `password` min length is 8
- `fullName` is required

Success `201`:

```json
{
  "token": "<token>",
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "fullName": "John Doe",
    "avatarUrl": null,
    "role": "Member",
    "createdAt": "2026-06-18T00:00:00.000Z"
  }
}
```

Error `400` examples:

```json
{ "error": "Email is already registered" }
```

### `POST /auth/login`

Login with credentials.

Request body:

```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

Success `200`: same shape as signup response.

Error `400` example:

```json
{ "error": "Invalid email or password" }
```

---

## Teams (protected)

### `GET /teams`

List teams visible to authenticated user.

Success `200`:

```json
[
  {
    "id": "uuid",
    "name": "Engineering",
    "description": "Core team",
    "owner": { "id": "uuid", "email": "owner@example.com" },
    "members": [{ "id": "uuid", "email": "member@example.com" }],
    "projects": [{ "id": "uuid", "name": "Platform" }],
    "created_at": "2026-06-18T00:00:00.000Z"
  }
]
```

### `POST /teams`

Create a team.

Request body:

```json
{
  "name": "Engineering",
  "description": "Core team"
}
```

Success `201`: created team object.

### `POST /teams/:teamId/members`

Add a member by email.

Request body:

```json
{
  "memberEmail": "member@example.com"
}
```

Success `200`: updated team object.

Error `400` examples:

```json
{ "error": "Team not found" }
```

```json
{ "error": "Only the team owner can add members" }
```

```json
{ "error": "Member not found" }
```

---

## Projects (protected)

### `GET /projects`

List projects visible to user.

Optional query:

- `teamId=<team-uuid>`

Success `200`:

```json
[
  {
    "id": "uuid",
    "name": "Platform",
    "description": "Project details",
    "status": "Active",
    "deadline": "2026-07-01T00:00:00.000Z",
    "team": { "id": "uuid", "name": "Engineering" },
    "tasks": [],
    "created_at": "2026-06-18T00:00:00.000Z"
  }
]
```

### `POST /projects`

Create a project.

Request body:

```json
{
  "teamId": "team-uuid",
  "name": "Platform",
  "description": "Project details",
  "deadline": "2026-07-01"
}
```

Success `201`: created project object.

Error `400` examples:

```json
{ "error": "Team not found" }
```

```json
{ "error": "You do not have access to this team" }
```

---

## Tasks (protected)

Task enum values:

- `priority`: `Low`, `Medium`, `High`
- `status`: `Todo`, `In_Progress`, `Review`, `Done`

### `POST /tasks`

Create task.

Request body:

```json
{
  "projectId": "project-uuid",
  "title": "Implement login form",
  "description": "Use existing Input components",
  "priority": "High",
  "status": "Todo",
  "dueDate": "2026-07-05",
  "assigneeId": "user-uuid"
}
```

Success `201`: created task object.

Error `400` examples:

```json
{ "error": "Project not found" }
```

```json
{ "error": "Assignee not found" }
```

### `GET /tasks/:projectId`

Get tasks for a project.

Success `200`: array of task objects.

### `PATCH /tasks/:taskId/status`

Update a task status.

Request body:

```json
{
  "status": "Done"
}
```

Success `200`: updated task object.

Error `400` examples:

```json
{ "error": "Task not found" }
```

```json
{ "error": "You cannot update this task" }

---

### `POST /tasks/:taskId/summarize` (protected)

Generate a short AI summary for a task. Backend will call the configured Gemini/Generative API if `GEMINI_API_KEY` is provided; otherwise it returns a local heuristic summary.

Request body: none

Success `200`:

```json
{
  "taskId": "<task-uuid>",
  "summary": "- Implement login form\n- Add validation for email and password\n- Assign to @alice",
  "aiUsed": true
}
```

Error `400` examples:

```json
{ "error": "Task not found" }
```

```

---

## Dashboard (protected)

### `GET /dashboard/summary`

Returns dashboard summary for authenticated user.

Success `200`:

```json
{
  "totalTasks": 16,
  "byStatus": {
    "Todo": 4,
    "In_Progress": 6,
    "Review": 3,
    "Done": 3
  },
  "overdueCount": 2,
  "overdueTasks": [],
  "recentTasks": []
}
```

---

## Postman

Import collection:

- `backend/api/team-task-manager.postman_collection.json`

Set variables:

- `baseUrl`
- `token`
- `teamId`
- `projectId`
- `taskId`
- `memberId`
