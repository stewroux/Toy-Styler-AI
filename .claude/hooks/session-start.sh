#!/bin/bash
# Session start hook for Toy-Styler-AI
set -e

echo "=== Toy-Styler-AI Session Start ==="
echo "Project: React + TypeScript + Vite + Gemini API"
echo "Date: $(date)"

if [ ! -d "node_modules" ]; then
  echo "Installing dependencies..."
  npm install
else
  echo "node_modules present."
fi

if [ ! -f ".env" ]; then
  echo "WARNING: .env not found. Copy .env.example and set GEMINI_API_KEY."
else
  echo ".env found."
fi

echo "=== Session Ready ==="
