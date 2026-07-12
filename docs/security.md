# Security Architecture

## Identity & access

- Short-lived JWTs (15 min, HS256) + rotating refresh tokens hashed at rest
- RBAC with role ranking (`packages/auth`); portal routes verify role scope
- TOTP 2FA (RFC 6238, ±1 step drift) for admin/staff accounts
- Full audit trail (`AuditLog`) on privileged actions

## Application

- Input validation on every endpoint; Prisma parameterized queries (no raw SQL)
- Security headers: HSTS (2y, preload), X-Frame-Options DENY, nosniff,
  Referrer-Policy, Permissions-Policy (next.config.mjs)
- Rate limiting: chat API 20/min/IP, ingress 50 rps, sliding-window limiter
  in `packages/utils` (Redis-backed in production)
- Webhooks: WhatsApp HMAC-SHA256 constant-time verification; Telegram secret token
- Payments: hosted checkout links only (PCI SAQ-A) — card data never touches us

## Supply chain & CI

- CodeQL SAST (security-extended), gitleaks secret scanning, dependency
  review failing on high severity, weekly scheduled scans, Dependabot
- Non-root containers, dropped capabilities, seccomp RuntimeDefault

## Data protection & compliance

- TLS 1.2+ everywhere; encrypted storage (RDS/Cloud SQL encryption at rest)
- GDPR & NDPR: consent checkbox on forms, analytics load only after cookie
  consent, right-to-erasure via support
- Backups encrypted in S3 with 35-day retention (`docs/backup-recovery.md`)

## Reporting

Vulnerabilities → SECURITY.md (private reporting, 2-day acknowledgement).
