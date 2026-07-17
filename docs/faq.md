# Developer FAQ

**Why a monorepo?** One version of truth for types (`@sylvara/shared`),
atomic cross-cutting changes, and single CI pipeline. Turborepo keeps builds
incremental.

**Why Apache 2.0 over MIT?** Explicit patent grant — relevant for a
manufacturer operating patented processes — while staying permissive for
white-label distributor deployments. Full comparison: `docs/licensing.md`.

**Why do bots avoid frameworks (Express, grammY)?** Node 22 covers HTTP,
crypto, and fetch natively. Fewer dependencies = smaller attack surface,
faster cold starts, trivially auditable webhook signature code.

**Where is the product catalog's source of truth?** Marketing copy:
`apps/website/src/data/products.ts` (git-versioned, drives 214 SSG pages).
Commerce (SKUs, prices, stock): `packages/database` — the seed script links
the two.

**How do I add a product?** Add one line to the category's `items` array in
`products.ts`; the category page, product page, sitemap, search index, and
JSON-LD generate automatically.

**How do I add a language?** Locales are enumerated in `@sylvara/shared`;
the i18n routing layer lands in v1.x (see ROADMAP.md).

**Can I deploy just the website?** Yes — `docker/Dockerfile` builds it
standalone; it degrades gracefully with no CRM/AI services configured.
