# Security Test Suite

| Layer               | Tooling                                 | Where it runs                              |
| ------------------- | --------------------------------------- | ------------------------------------------ |
| SAST                | CodeQL (`security-extended` queries)    | `.github/workflows/security.yml`, every PR |
| Secret scanning     | gitleaks                                | every PR + weekly                          |
| Dependency scanning | dependency-review-action + `pnpm audit` | every PR                                   |
| DAST                | OWASP ZAP baseline scan (below)         | pre-release against staging                |
| Webhook auth        | signature tests in `apps/whatsapp-bot`  | unit tests                                 |

## ZAP baseline scan

```bash
docker run --rm -t ghcr.io/zaproxy/zaproxy:stable zap-baseline.py \
  -t https://staging.sylvara.com -r zap-report.html
```

## Manual OWASP Top 10 checklist

- [x] A01 Broken access control — RBAC guards (`packages/auth`), portal tests
- [x] A02 Cryptographic failures — HMAC-verified webhooks, HS256 JWTs, TLS-only
- [x] A03 Injection — Prisma parameterized queries; no raw SQL
- [x] A05 Security misconfiguration — security headers in next.config.mjs
- [x] A07 Identification failures — 2FA (TOTP), refresh rotation, rate limiting
- [x] A09 Logging failures — AuditLog model + structured service logs
