#!/usr/bin/env bash
# One-shot local environment setup.
set -euo pipefail
cd "$(dirname "$0")/.."

command -v node >/dev/null || { echo "Node.js >= 20 required"; exit 1; }
corepack enable
pnpm install
[ -f .env ] || cp .env.example .env

if command -v docker >/dev/null; then
  docker compose -f docker/docker-compose.yml up -d postgres redis
  pnpm db:generate
  pnpm db:migrate || echo "Migrations skipped (run 'pnpm db:migrate' once Postgres is up)"
  pnpm db:seed || true
else
  echo "Docker not found — start PostgreSQL manually and run: pnpm db:generate && pnpm db:migrate && pnpm db:seed"
fi

echo "✅ Setup complete. Run: pnpm dev"
