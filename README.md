# Yu-Gi-Oh! Card Collection Manager

Web local para gestión de colección de cartas Yu-Gi-Oh!

## Estructura

- `backend/` — Django REST API (Python)
- `frontend/` — React SPA (JavaScript)
- `db/data/` — exports XLS de referencia
- `assets/` — recursos de diseño (PSD, PNG)

## Desarrollo

### Backend

```bash
cd backend
python -m venv venv
source venv/Scripts/activate  # Windows
pip install -r requirements.txt
python manage.py runserver
```

### Frontend

```bash
cd frontend
npm install
npm start
```

### Base de datos

PostgreSQL local: DB `yugioh`, puerto `5432`.
