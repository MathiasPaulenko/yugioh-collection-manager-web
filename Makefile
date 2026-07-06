.PHONY: setup dev backend frontend install-backend install-frontend build clean

# === Setup ===
setup: install-backend install-frontend

install-backend:
	cd backend && python -m venv venv && \
	./venv/Scripts/activate && pip install -r requirements.txt

install-frontend:
	cd frontend && npm install

# === Dev ===
dev: backend frontend

backend:
	cd backend && \
	source venv/Scripts/activate 2>/dev/null || . venv/Scripts/activate 2>/dev/null; \
	python manage.py runserver

frontend:
	cd frontend && npm start

# === Build ===
build:
	cd frontend && npm run build

# === Database ===
migrate:
	cd backend && \
	source venv/Scripts/activate 2>/dev/null || . venv/Scripts/activate 2>/dev/null; \
	python manage.py makemigrations && python manage.py migrate

# === Clean ===
clean:
	rm -rf frontend/node_modules
	rm -rf frontend/build
	rm -rf backend/venv
	find backend -type d -name __pycache__ -exec rm -rf {} +
