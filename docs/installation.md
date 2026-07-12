# Installation

## Prerequisites

- Node.js ≥ 20 (`.nvmrc` pins 22) with corepack
- Docker (optional, for the local Postgres/Redis/Meilisearch stack)

## Quick start

```bash
git clone https://github.com/GAJETOso/Paper.git && cd Paper
./scripts/setup.sh          # installs, copies .env, boots DB, migrates, seeds
pnpm dev                    # all apps via Turborepo
```

Manual steps if you prefer:

```bash
corepack enable && pnpm install
cp .env.example .env        # fill in credentials
docker compose -f docker/docker-compose.yml up -d postgres redis
pnpm db:generate && pnpm db:migrate && pnpm db:seed
pnpm --filter @sylvara/website dev   # http://localhost:3000
```

## Per-app entry points

| App                | Command                                             | Port      |
| ------------------ | --------------------------------------------------- | --------- |
| Website            | `pnpm --filter @sylvara/website dev`                | 3000      |
| WhatsApp bot       | `pnpm --filter @sylvara/whatsapp-bot dev`           | 4100      |
| Chatbot API        | `pnpm --filter @sylvara/chatbot dev`                | 4200      |
| Telegram bot       | `pnpm --filter @sylvara/telegram-bot dev`           | (polling) |
| CRM service        | `pnpm --filter @sylvara/service-crm dev`            | 4400      |
| Sustainability API | `pnpm --filter @sylvara/service-sustainability dev` | 4430      |

## Verification

```bash
pnpm typecheck && pnpm test        # should pass with zero errors
curl localhost:3000/api/health     # {"status":"ok"}
```
