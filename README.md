# zoho-rbac (Config-Driven RBAC Demo)

This is a simple demo full-stack application demonstrating a config-driven Role-Based Access Control (RBAC) system with table-level and field-level permissions. The backend is written in Golang. The frontend is a minimal static HTML file.

## What is included
- backend/
  - main.go
  - users.go
  - permissions.go
- frontend/
  - index.html
- permissions.json
- README.md

## Features
- Simple username/password login (demo tokens: username is used as token).
- Admin + Regular users (roles: admin, manager, viewer).
- Table-level and field-level permissions defined in `permissions.json`.
- UI shows only tables and fields users are allowed to view.
- Backend enforces permissions for view and edit actions (permissions are not hardcoded).
- Admin can GET `/admin/permissions` to view current permissions.

## Sample credentials
- admin / adminpass  (role: admin)
- alice / managerpass (role: manager)
- bob / viewerpass   (role: viewer)

## How to run (Linux / macOS / WSL)
1. Install Go (1.18+).
2. From repository root:
   - go run ./backend
3. Open a browser at http://localhost:8080/frontend/index.html or http://localhost:8080/

Note: The server serves `./frontend` statically. If you put files in `frontend/`, navigate to `http://localhost:8080/index.html`.

## Endpoints
- POST /login
  - body: { "username": "...", "password": "..." }
  - response: { "token": "...", "role": "..." }
- GET /tables
  - returns tables the authenticated user can view
- GET /data?table=Employees
  - returns rows with fields filtered by field-level view permission
- PUT /data/edit?table=Employees&id=1
  - update a record (field-level edit permissions are enforced)
- GET /admin/permissions
  - admin-only: returns the permissions.json content

## Permissions model
See `permissions.json`. The model allows per-role, per-table configuration and field-level view/edit flags. Wildcard `"*"` is supported for tables and fields.

## Create a ZIP of the project locally
From the parent directory containing `zoho-rbac/` run:

- Unix (macOS / Linux):
  - zip -r zoho-rbac.zip zoho-rbac

- Windows PowerShell:
  - Compress-Archive -Path .\zoho-rbac\* -DestinationPath .\zoho-rbac.zip

## Notes
- This demo uses a very simple token scheme (token == username) and in-memory store. For production, use secure password hashing, proper session management or JWTs, persistent database, and HTTPS.
- The admin UI for editing permissions is not implemented here — the backend reads `permissions.json`. To change permissions dynamically, you can extend `/admin/permissions` to accept POST/PUT and persist changes to `permissions.json`.
