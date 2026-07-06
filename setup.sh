#!/bin/bash
# Yu-Gi-Oh! Card Collection Manager - Setup (Bash)
# Usage: ./setup.sh

set -e
ROOT="$(cd "$(dirname "$0")" && pwd)"

echo -e "\033[36m=== Setting up backend ===\033[0m"
cd "$ROOT/backend"

if [ ! -d "venv" ]; then
    echo -e "\033[33mCreating virtual environment...\033[0m"
    python3 -m venv venv
fi

echo -e "\033[33mActivating virtual environment...\033[0m"
source venv/bin/activate

echo -e "\033[33mInstalling Python dependencies...\033[0m"
pip install -r requirements.txt

deactivate

echo -e "\033[35m=== Setting up frontend ===\033[0m"
cd "$ROOT/frontend"

echo -e "\033[33mInstalling Node dependencies...\033[0m"
npm install

echo -e "\033[32m=== Setup complete ===\033[0m"
echo -e "\033[32mRun ./dev.sh to start both services.\033[0m"
