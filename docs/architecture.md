# Architecture

## Overview

The platform is a **Clean Architecture monorepo**: apps depend on packages,
packages depend on nothing but each other's contracts, and services own their
domains behind versioned HTTP APIs.

```
┌────────────────────────────────────────────────────────────┐
│  apps/            website · admin · portals · bots · chat  │
│                     │ (imports)                            │
│  packages/        ui · auth · ai · payments · shared · …   │
│                     │ (Prisma client)                      │
│  packages/database  PostgreSQL 16                          │
│                                                            │
│  services/        crm · inventory · erp · sustainability   │
│                   reporting · search   (HTTP, /api/v1/*)   │
└────────────────────────────────────────────────────────────┘
```

## Key decisions

| Decision                                     | Rationale                                                                                                   |
| -------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| Next.js App Router, SSG-first                | 234 pages prerendered → CDN-cacheable, 95+ Lighthouse, cheap to run                                         |
| Data-driven catalog (`src/data/products.ts`) | Marketing copy versioned in git; DB (`packages/database`) is the runtime source for commerce                |
| Zero-dependency Node services                | Bots and services run TypeScript directly on Node 22 (type stripping) — small images, no build supply chain |
| One notification/payment/AI interface each   | Providers are adapters; swapping Stripe→Paystack or adding a channel never touches callers                  |
| Contract-first APIs                          | `packages/api` + `docs/api/openapi.yaml` define routes before implementations                               |

## Domain-driven boundaries

- **Commerce**: Quotation → Order → Payment → Shipment (state machines in Prisma enums)
- **Manufacturing**: Mill → Machine → MachineTelemetry (IoT time series)
- **Sustainability**: SustainabilityMetric (verified flag for assurance), TreePlanting
- **Conversations**: Conversation/Message shared by WhatsApp, Telegram, webchat

## Request flows

**Quotation via WhatsApp**: Meta webhook → `whatsapp-bot` (HMAC verify) →
router (command) or `@sylvara/ai` (free-form) → CRM lead → sales → PDF quote
back through the Cloud API.

**Website lead**: `/api/contact` (validation) → `services/crm` → HubSpot
mirror (async) → notification fan-out.

## Scalability

Stateless apps behind an HPA (3→20 replicas); PostgreSQL with read replicas;
Redis for sessions/queues/rate limits; Meilisearch for product search; static
pages served from CDN edge. Telegram bot runs exactly one replica (long
polling); switch to webhooks for horizontal scale.
