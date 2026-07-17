# Testing

## Pyramid

| Level         | Tooling                                   | Location                     | Runs                     |
| ------------- | ----------------------------------------- | ---------------------------- | ------------------------ |
| Unit          | node:test / Vitest                        | colocated `*.test.ts`        | every push (`pnpm test`) |
| Integration   | node:test against services                | services (roadmap expansion) | every push               |
| API           | Playwright `request` fixtures             | `tests/e2e/website.spec.ts`  | PRs                      |
| E2E           | Playwright (desktop + mobile)             | `tests/e2e/`                 | PRs (`e2e.yml`)          |
| Load          | k6                                        | `tests/load/k6-smoke.js`     | pre-release              |
| Security      | CodeQL, gitleaks, ZAP                     | `tests/security/README.md`   | PRs + weekly             |
| Accessibility | Playwright + manual WCAG 2.2 AA checklist | e2e specs (skip-link test)   | PRs                      |

## Current coverage

- WhatsApp router: 6 tests (commands, quote parsing, validation, handover, AI fallthrough)
- Telegram commands: 4 tests
- Website E2E: 11 scenarios (navigation, catalog, 404s, calculators, contact
  API validation, sitemap/robots, Product JSON-LD)

## Running

```bash
pnpm test                                  # unit, whole workspace
npx playwright test --config tests/e2e/playwright.config.ts
k6 run tests/load/k6-smoke.js
```

New features require tests; bug fixes require a regression test (enforced in
review via the PR template checklist).
