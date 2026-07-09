# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).
Release notes are generated automatically by the release workflow.

## [Unreleased]

## [1.0.0] - 2026-07-09

### Added

- Monorepo scaffolding: pnpm workspaces, Turborepo, TypeScript strict mode
- `apps/website`: premium corporate website (Next.js App Router) — home, about,
  leadership, operations, industries, full product catalog (13 categories,
  200+ products), value chain, sustainability & ESG dashboard, foundation,
  innovation, media, investor relations, careers, downloads, FAQs, partners,
  contact, interactive calculators (GSM, box dimensions, carbon savings,
  packaging recommendation), AI search, dark/light mode, mega menu
- SEO/AEO/GEO: structured data (Organization, Product, FAQ), Open Graph,
  sitemap, robots, canonical URLs, answer-engine-optimized content
- `packages/database`: Prisma schema covering commerce, manufacturing,
  sustainability, CRM, and portal domains; seed data
- `packages/*`: design system tokens, UI primitives, shared types, auth,
  AI client, analytics, notifications, payments, utils
- `apps/whatsapp-bot`: WhatsApp Business Cloud API bot (catalog, quotations,
  order tracking, human handover)
- `apps/telegram-bot`: Telegram bot (catalog, quotes, tracking, broadcasts)
- `apps/chatbot`: AI assistant service (Anthropic-powered) with product context
- `services/*`: CRM, inventory, ERP integration, sustainability metrics,
  reporting, and search microservice scaffolds with OpenAPI specs
- CI/CD: GitHub Actions for lint, typecheck, test, build, CodeQL, dependency
  review, Docker build, and semantic releases
- Infrastructure: Dockerfiles, docker-compose (dev/prod), Kubernetes manifests
  (deployment, service, ingress, HPA, PVC), Terraform for AWS/Azure/GCP
- Documentation: architecture, installation, deployment, API, database, bots,
  ERP integration, AI, testing, security, monitoring, backup & recovery,
  troubleshooting, FAQ, user manual, admin guide
