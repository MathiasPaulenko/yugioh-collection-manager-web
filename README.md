# Yu-Gi-Oh! Card Collection Manager

A local web application for managing Yu-Gi-Oh! card collections. Track your cards, browse card sets, check prices, view analytics, and more.

## Tech Stack

### Backend

- **Django** 4.x — Web framework
- **Django REST Framework** 3.13–3.14 — REST API
- **PostgreSQL** — Database (`yugioh`, port 5432)
- **drf-yasg** — Swagger/OpenAPI docs (`/swagger/`, `/redoc/`)
- **simple_history** — Model audit logging
- **django-import-export** — CSV/XLS import/export
- **django-cors-headers** — CORS for frontend communication
- **django-filter** — DRF filtering (`DjangoFilterBackend`)
- **python-dotenv** — Environment variable loading

### Frontend

- **React** 17 — UI library (CRA / react-scripts 5)
- **React Router** 6 — Client-side routing (BrowserRouter)
- **Bootstrap 5** + **React-Bootstrap 5** — Grid and component styling
- **MUI 5** — Material UI components
- **react-icons** — Icon library (FontAwesome)
- **react-lazy-load-image-component** — Image lazy loading
- **react-select** — Select dropdowns
- **Victory** — Charts and pie visualizations

### External APIs

- **YGOProDeck API** — Card data, card sets, and images (`https://db.ygoprodeck.com/api/v7/`)
- **Exchange Rate API** — USD to EUR conversion (`https://api.exchangerate-api.com/v4/latest/USD`)

## Prerequisites

- **Python** 3.10+
- **Node.js** 16+ (with npm)
- **PostgreSQL** 13+

## Project Structure

```text
yugioh-collection-manager-web/
├── backend/                 # Django REST API
│   ├── manage.py
│   ├── requirements.txt
│   ├── yugioh-backend/      # Django project (settings, urls)
│   └── apps/api/v1/
│       ├── base/            # Abstract models, pagination
│       ├── card/            # Card metadata models & endpoints
│       ├── collection/      # Collection CRUD
│       └── dashboard/       # Analytics
├── frontend/                # React SPA
│   ├── package.json
│   ├── public/
│   └── src/
│       ├── components/      # Screens and common components
│       ├── hooks/           # Custom React hooks
│       ├── helpers/         # Constants and utilities
│       └── statics/css/     # Global styles
├── db/
│   ├── data/                # XLS reference exports
│   └── schema.sql           # Database schema (structure only)
├── docs/                    # Documentation
├── dev.sh                   # Dev startup script (bash)
├── Makefile                 # Dev commands
└── ROADMAP.md               # Pending bugs and improvements
```

## Setup

### Quick Start (Both)

```bash
# 1. Install all dependencies
make setup

# 2. Set up the database (see Backend section below)

# 3. Run migrations
make migrate

# 4. Start both services
make dev
```

Or use the shell script:

```bash
./dev.sh
```

- Backend: <http://127.0.0.1:8000>
- Frontend: <http://localhost:3000>
- Swagger docs: <http://127.0.0.1:8000/swagger/>

---

### Backend Only

#### 1. Create virtual environment and install dependencies

```bash
cd backend
python -m venv venv

# Activate the virtual environment
# Windows (PowerShell):
.\venv\Scripts\Activate.ps1
# Windows (CMD):
.\venv\Scripts\activate.bat
# Linux/Mac:
source venv/bin/activate

pip install -r requirements.txt
```

#### 2. Configure environment variables

Create a `backend/.env` file:

```env
SECRET_KEY=your-django-secret-key
DB_NAME=yugioh
DB_USER=postgres
DB_PASSWORD=your-password
DB_HOST=localhost
DB_PORT=5432
```

#### 3. Set up PostgreSQL

Create the database:

```bash
createdb yugioh
```

Load the schema (structure only, no data):

```bash
psql -U postgres -d yugioh -f db/schema.sql
```

Or run Django migrations (creates tables and tracks them):

```bash
python manage.py makemigrations
python manage.py migrate
```

#### 4. Run the backend

```bash
python manage.py runserver
```

Backend will be available at <http://127.0.0.1:8000>.

Swagger UI at <http://127.0.0.1:8000/swagger/>.
ReDoc at <http://127.0.0.1:8000/redoc/>.

---

### Frontend Only

#### 1. Install dependencies

```bash
cd frontend
npm install
```

#### 2. Start the development server

```bash
npm start
```

Frontend will be available at <http://localhost:3000>.

#### 3. Production build

```bash
npm run build
```

Output is generated in `frontend/build/`.

> **Note:** The frontend expects the backend to be running at `http://127.0.0.1:8000/`. This URL is defined in `frontend/src/helpers/constants.js`. Update it if your backend runs on a different address.

---

## Makefile Commands

| Command | Description |
| --- | --- |
| `make setup` | Install backend and frontend dependencies |
| `make dev` | Start both backend (:8000) and frontend (:3000) |
| `make backend` | Start backend only |
| `make frontend` | Start frontend only |
| `make migrate` | Run `makemigrations` + `migrate` |
| `make build` | Production build of the frontend |
| `make clean` | Remove `venv`, `node_modules`, `build`, `__pycache__` |

## Environment Variables

### Backend (`backend/.env`)

| Variable | Default | Description |
| --- | --- | --- |
| `SECRET_KEY` | `django-insecure-fallback-key` | Django secret key |
| `DEBUG` | `True` | Debug mode |
| `DB_ENGINE` | `django.db.backends.postgresql_psycopg2` | Database engine |
| `DB_NAME` | `yugioh` | Database name |
| `DB_USER` | `postgres` | Database user |
| `DB_PASSWORD` | (empty) | Database password |
| `DB_HOST` | `localhost` | Database host |
| `DB_PORT` | `5432` | Database port |

### Frontend

No environment variables required. The API base URL is hardcoded in `frontend/src/helpers/constants.js`:

```js
export const BASE_URL = 'http://127.0.0.1:8000/';
```

## Documentation

- [Architecture](docs/architecture.md) — System architecture, API structure, frontend routes
- [Database](docs/database.md) — Database schema, models, tables, relationships
- [Getting Started](docs/getting-started.md) — Detailed setup guide
- [Roadmap](ROADMAP.md) — Pending bugs and improvements

## License

Apache 2.0
