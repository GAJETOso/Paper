# Contributing to the Sylvara Platform

Thank you for helping build the world's best paper manufacturing platform.

## Getting started

```bash
git clone https://github.com/GAJETOso/Paper.git
cd Paper
corepack enable            # activates pnpm
pnpm install
cp .env.example .env       # fill in local values
pnpm dev                   # starts all apps via Turborepo
```

See [docs/installation.md](./docs/installation.md) for database setup and
per-app instructions.

## Branch strategy (GitFlow)

| Branch      | Purpose                                    |
| ----------- | ------------------------------------------ |
| `main`      | Production. Protected; release tags only.  |
| `develop`   | Integration branch for the next release.   |
| `staging`   | Pre-production verification.               |
| `feature/*` | New features, branched from `develop`.     |
| `bugfix/*`  | Non-urgent fixes, branched from `develop`. |
| `hotfix/*`  | Urgent production fixes, from `main`.      |
| `release/*` | Release stabilization branches.            |

## Commit messages — Conventional Commits

```
<type>(<scope>): <subject>
```

Allowed types: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`,
`ci`, `build`, `chore`, `revert`.

Examples:

```
feat(website): add packaging recommendation calculator
fix(whatsapp-bot): handle empty catalog pagination
docs(api): document quotation endpoints
```

Commitlint enforces this via a Husky `commit-msg` hook.

## Pull requests

1. Branch from `develop` (`feature/<short-name>`)
2. Keep PRs focused; one logical change per PR
3. Ensure `pnpm lint`, `pnpm typecheck`, and `pnpm test` pass
4. Fill in the PR template; link related issues
5. At least one approving review from a CODEOWNER is required

## Code standards

- TypeScript **strict mode**; no `any` unless justified with a comment
- Follow SOLID and Clean Architecture boundaries (`apps` → `packages` → never the reverse)
- Accessibility: WCAG 2.2 AA — semantic HTML, focus management, contrast ≥ 4.5:1
- Performance: keep Core Web Vitals budgets (LCP < 2.5s, CLS < 0.1, INP < 200ms)
- All user-facing strings must go through the i18n layer

## Testing

- Unit tests colocated as `*.test.ts(x)` (Vitest)
- E2E tests in `tests/e2e` (Playwright)
- New features require tests; bug fixes require a regression test

## Reporting issues

Use the issue templates. For security vulnerabilities, follow
[SECURITY.md](./SECURITY.md) — never open a public issue.
