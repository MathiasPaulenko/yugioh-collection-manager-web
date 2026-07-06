#!/bin/bash
# Yu-Gi-Oh! Card Collection Manager - Dev Startup (Bash)
# Usage: ./dev.sh

ROOT="$(cd "$(dirname "$0")" && pwd)"

echo -e "\033[36mStarting backend (Django :8000)...\033[0m"
cd "$ROOT/backend"
if [ -d "venv" ]; then
    source venv/bin/activate
fi
python manage.py runserver &
BACKEND_PID=$!

echo -e "\033[35mStarting frontend (React :3000)...\033[0m"
cd "$ROOT/frontend"
npm start &
FRONTEND_PID=$!

echo -e "\033[32mBoth services starting. Press Ctrl+C to stop.\033[0m"

trap "kill $BACKEND_PID $FRONTEND_PID 2>/dev/null; exit" INT TERM
wait
