# Yu-Gi-Oh! Card Collection Manager

Web local para gestión de colección de cartas Yu-Gi-Oh!

## Estructura

- `backend/` — Django REST API (Python)
- `frontend/` — React SPA (JavaScript)
- `db/data/` — exports XLS de referencia
- `assets/` — recursos de diseño (PSD, PNG)

## Primera instalación

```bash
# Windows
.\setup.ps1

# Linux/Mac
./setup.sh
```

Esto crea el `venv` del backend, instala `requirements.txt`, y ejecuta `npm install` en el frontend.

## Desarrollo

```bash
# Windows
.\dev.ps1

# Linux/Mac
./dev.sh

# O con Makefile
make dev
```

Levanta backend (:8000) y frontend (:3000) en paralelo.

## Comandos (Makefile)

| Comando | Descripción |
|---------|-------------|
| `make setup` | Instala dependencias de backend y frontend |
| `make dev` | Levanta ambos servicios |
| `make backend` | Levanta solo el backend |
| `make frontend` | Levanta solo el frontend |
| `make build` | Build de producción del frontend |
| `make migrate` | Makemigrations + migrate de Django |
| `make clean` | Elimina venv, node_modules, build, __pycache__ |

## Base de datos

PostgreSQL local: DB `yugioh`, puerto `5432`.
