# Contributing

Thanks for your interest in contributing to the Yu-Gi-Oh! Card Collection Manager.

By participating, you agree to follow the [Code of Conduct](CODE_OF_CONDUCT.md).

## Ways to contribute

- **Bug reports** — open an issue using the bug report template. Check
  [ROADMAP.md](ROADMAP.md) first: known bugs are already tracked there.
- **Feature requests** — open an issue describing the use case before writing
  code, so we can agree on the approach.
- **Pull requests** — fixes, features, docs, and tests are all welcome.

## Development setup

See the [README](README.md#setup) for full instructions. In short:

```bash
make setup     # install backend + frontend dependencies
make migrate   # run Django migrations
make dev       # start backend (:8000) and frontend (:3000)
```

Prerequisites: Python 3.10+, Node.js 16+, PostgreSQL 13+.

## Project layout

- `backend/` — Django REST API (apps under `backend/apps/api/v1/`)
- `frontend/` — React SPA (Create React App)
- `db/` — schema and reference data
- `docs/` — architecture and database documentation

## Code style

- **Python**: follow PEP 8 and the conventions of neighboring code. Add type
  hints on public APIs.
- **JavaScript/React**: follow the existing component and naming conventions in
  `frontend/src/`. Use `async`/`await`, not raw promise chains.
- Match the code around you before introducing your own preferences.

## Database changes

- If you change a model, include the generated migrations in your PR
  (`make migrate` or `python manage.py makemigrations`).
- Never edit a migration that has already been applied — create a new one.
- Keep `db/schema.sql` in sync if the schema changes.

## Commits

Use [Conventional Commits](https://www.conventionalcommits.org/):

```text
feat: add card price history chart
fix: correct pagination on collection endpoint
refactor: extract set filtering into helper
docs: update setup instructions
chore: bump dependencies
```

Keep commits atomic — one logical change per commit.

## Pull requests

- Fill in the PR template (summary, test plan, checklist).
- Keep PRs focused. Large changes are easier to review when split up.
- Make sure the app still runs (`make dev`) and the frontend builds
  (`make build`) before submitting.
- Update documentation (`README.md`, `docs/`) if behavior or setup changes.
- Don't commit secrets, `.env` files, credentials, or personal data.

## Reporting security issues

Don't open a public issue for security vulnerabilities. See
[SECURITY.md](SECURITY.md) for how to report them privately.
