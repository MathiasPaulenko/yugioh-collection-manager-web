# Getting Started

## Prerequisites

- Python 3.10+
- Node.js 16+
- PostgreSQL 13+

## Setup

### 1. Clone the repository

```bash
git clone <repo-url>
cd yugioh-collection-manager-web
```

### 2. Database

Create a PostgreSQL database named `yugioh`:

```bash
createdb yugioh
```

Load the schema (structure only, no data):

```bash
psql -U postgres -d yugioh -f db/schema.sql
```

Or run Django migrations instead (creates tables + tracks migrations):

```bash
cd backend
python manage.py makemigrations
python manage.py migrate
```

### 3. Backend

```bash
cd backend
python -m venv venv
source venv/bin/activate    # Linux/Mac
# or: .\venv\Scripts\activate    # Windows

pip install -r requirements.txt
```

Create a `.env` file in `backend/`:

```env
SECRET_KEY=your-secret-key
DB_NAME=yugioh
DB_USER=postgres
DB_PASSWORD=your-password
DB_HOST=localhost
DB_PORT=5432
```

Run the backend:

```bash
python manage.py runserver
```

Backend will be available at `http://127.0.0.1:8000/`.

Swagger docs at `http://127.0.0.1:8000/swagger/`.

### 4. Frontend

```bash
cd frontend
npm install
npm start
```

Frontend will be available at `http://localhost:3000/`.

### 5. Quick start (both)

Using the Makefile:

```bash
make setup    # Install all dependencies
make migrate  # Run database migrations
make dev      # Start both backend and frontend
```

Or using the shell script:

```bash
./dev.sh
```

## Environment Variables

### Backend (`backend/.env`)

| Variable | Default | Description |
|---|---|---|
| `SECRET_KEY` | `django-insecure-fallback-key` | Django secret key |
| `DEBUG` | `True` | Debug mode |
| `DB_ENGINE` | `django.db.backends.postgresql_psycopg2` | Database engine |
| `DB_NAME` | `yugioh` | Database name |
| `DB_USER` | `postgres` | Database user |
| `DB_PASSWORD` | (empty) | Database password |
| `DB_HOST` | `localhost` | Database host |
| `DB_PORT` | `5432` | Database port |

### Frontend

No environment variables needed. API base URL is hardcoded in `frontend/src/helpers/constants.js`:

```js
export const BASE_URL = 'http://127.0.0.1:8000/';
```

## Makefile Commands

| Command | Description |
|---|---|
| `make setup` | Install backend + frontend dependencies |
| `make dev` | Start both backend (:8000) and frontend (:3000) |
| `make migrate` | Run `makemigrations` + `migrate` |
| `make build` | Production build of frontend |
| `make clean` | Remove venv, node_modules, build, __pycache__ |
