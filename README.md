<div align="center">

# 🌲 Sylvara Paper Group — Enterprise Platform

**From Forest to Future.**

The digital ecosystem of a global paper manufacturing enterprise — corporate
website, complete product catalog, sustainability & ESG platform, customer /
supplier / distributor / investor portals, WhatsApp & Telegram automation,
AI-powered customer experience, and manufacturing integrations.

[![CI](https://img.shields.io/badge/CI-GitHub_Actions-2088FF?logo=githubactions&logoColor=white)](./.github/workflows/ci.yml)
[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](./LICENSE)
[![Node](https://img.shields.io/badge/Node-%E2%89%A520-339933?logo=nodedotjs&logoColor=white)](./.nvmrc)
[![pnpm](https://img.shields.io/badge/pnpm-workspaces-F69220?logo=pnpm&logoColor=white)](./pnpm-workspace.yaml)
[![Conventional Commits](https://img.shields.io/badge/Conventional_Commits-1.0.0-FE5196?logo=conventionalcommits&logoColor=white)](https://conventionalcommits.org)

</div>

---

## What is this?

A production-grade **monorepo** for a Fortune-500-class paper manufacturer
competing with International Paper, Mondi, Smurfit Westrock, Stora Enso, UPM,
and Sappi. It covers the **complete paper value chain** — forest management →
pulp → paper → converting → packaging → distribution → recycling → circular
economy — with an enterprise engineering setup: CI/CD, Docker, Kubernetes,
Terraform, observability, and comprehensive documentation.

## Repository structure

```
paper-company-platform/
├── apps/
│   ├── website/             # Flagship corporate website (Next.js App Router)
│   ├── admin/               # Admin CMS (products, orders, content, bots, SEO)
│   ├── customer-portal/     # B2B/B2C customer self-service
│   ├── supplier-portal/     # Supplier onboarding, RFQs, scorecards
│   ├── distributor-portal/  # Distributor pricing, territories, ordering
│   ├── investor-portal/     # Filings, KPIs, reports
│   ├── whatsapp-bot/        # WhatsApp Business Cloud API automation
│   ├── telegram-bot/        # Telegram bot (catalog, quotes, tracking)
│   └── chatbot/             # AI assistant service (Anthropic-powered)
├── packages/
│   ├── ui/                  # Shared React UI primitives
│   ├── design-system/       # Design tokens (color, type, spacing, motion)
│   ├── api/                 # API client + route contracts
│   ├── database/            # Prisma schema, migrations, seeds (PostgreSQL)
│   ├── auth/                # JWT + refresh rotation, RBAC, TOTP 2FA
│   ├── shared/              # Cross-cutting TypeScript types
│   ├── analytics/           # GA4, Clarity, Meta/LinkedIn/TikTok pixels
│   ├── notifications/       # Email, push, WhatsApp, Telegram fan-out
│   ├── payments/            # Stripe, Paystack, Flutterwave adapters
│   ├── ai/                  # LLM client (Claude), product-finder, RAG hooks
│   └── utils/               # Shared utilities
├── services/
│   ├── crm/                 # Leads, accounts, pipeline (+ Salesforce/HubSpot sync)
│   ├── inventory/           # Stock, warehouses, movements
│   ├── erp/                 # SAP / Oracle / Dynamics integration layer
│   ├── sustainability/      # ESG metrics ingestion + live dashboard API
│   ├── reporting/           # Investor-grade reporting engine
│   └── search/              # AI search / product finder (Meilisearch)
├── infrastructure/
│   ├── kubernetes/          # Deployments, services, ingress, HPA, PVC
│   └── terraform/           # AWS / Azure / GCP modules
├── docker/                  # Dockerfiles + docker-compose (dev & prod)
├── docs/                    # Architecture, API, deployment, runbooks…
├── tests/                   # E2E (Playwright), load, security suites
├── scripts/                 # Setup, seeding, backup automation
└── .github/                 # CI/CD workflows, issue & PR templates
```

## Quick start

```bash
# Prerequisites: Node ≥ 20, pnpm ≥ 9 (via corepack), Docker (optional)
corepack enable
pnpm install
cp .env.example .env

# Start the local database + services
docker compose -f docker/docker-compose.yml up -d postgres redis

# Generate the Prisma client, migrate, and seed
pnpm db:generate && pnpm db:migrate && pnpm db:seed

# Run everything (or a single app)
pnpm dev
pnpm --filter @sylvara/website dev
```

The website runs at **http://localhost:3000**.

## The flagship website

- **Premium design** — glassmorphism, soft gradients, micro-interactions,
  smooth scrolling, dark & light mode, animated statistics
- **Complete catalog** — 13 product categories, 200+ products: printing papers,
  packaging papers, corrugated, retail bags, food packaging, hygiene/tissue,
  education, office, publishing, industrial, agriculture, eco, custom
- **Value chain** — interactive 23-stage journey from forest to recycled fiber
- **Sustainability** — live ESG dashboard: net-zero trajectory, tree-planting
  counter, water & energy metrics, recycling rates, certifications (FSC, PEFC, ISO)
- **Foundation** — CSR initiatives, scholarships, community programs
- **Tools** — GSM calculator, box dimension calculator, carbon savings
  calculator, packaging recommendation engine, AI product finder
- **SEO/AEO/GEO** — JSON-LD structured data (Organization, Product, FAQ),
  Open Graph, sitemap/robots, answer-engine-optimized copy, location pages

## Engineering highlights

| Area          | Implementation                                                       |
| ------------- | -------------------------------------------------------------------- |
| Architecture  | Clean Architecture + DDD-aligned monorepo (Turborepo)               |
| Language      | TypeScript strict mode everywhere                                    |
| Database      | PostgreSQL + Prisma (see `docs/database.md` for the ERD)             |
| Auth          | JWT + rotating refresh tokens, RBAC, TOTP 2FA, audit logs            |
| APIs          | REST + GraphQL, OpenAPI 3.1 spec, Postman collection                 |
| CI/CD         | GitHub Actions: lint → typecheck → test → build → scan → deploy      |
| Security      | CodeQL, secret scanning, dependency review, CSP, rate limiting       |
| Observability | OpenTelemetry, Prometheus, Grafana, Sentry, health checks            |
| Deployment    | Docker, Kubernetes (HPA, ingress), Terraform (AWS/Azure/GCP)         |
| Quality       | ESLint, Prettier, Husky, lint-staged, Commitlint, EditorConfig       |
| Testing       | Vitest (unit), Playwright (E2E), k6 (load), accessibility checks     |

## Documentation

Everything lives in [`docs/`](./docs):
[Architecture](./docs/architecture.md) ·
[Installation](./docs/installation.md) ·
[Deployment](./docs/deployment.md) ·
[API](./docs/api.md) ·
[Database](./docs/database.md) ·
[WhatsApp](./docs/whatsapp-integration.md) ·
[Telegram](./docs/telegram-integration.md) ·
[AI](./docs/ai.md) ·
[ERP](./docs/erp-integration.md) ·
[Security](./docs/security.md) ·
[Monitoring](./docs/monitoring.md) ·
[Backup & recovery](./docs/backup-recovery.md) ·
[Testing](./docs/testing.md) ·
[Troubleshooting](./docs/troubleshooting.md) ·
[FAQ](./docs/faq.md)

## License

**Apache 2.0** — chosen because it is business-friendly (like MIT) **and**
includes an explicit patent grant, which matters for a manufacturing company
whose platform touches patented industrial processes. It permits proprietary
derivatives (essential for white-labeling to distributors) while protecting
contributors. See [`docs/licensing.md`](./docs/licensing.md) for a comparison
with MIT, GPLv3, BSD, and commercial/dual-license options and how to switch.

## Contributing · Security · Support

See [CONTRIBUTING.md](./CONTRIBUTING.md), [SECURITY.md](./SECURITY.md), and
[SUPPORT.md](./SUPPORT.md). Please follow the
[Code of Conduct](./CODE_OF_CONDUCT.md).
