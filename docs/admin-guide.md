# Administrator Guide

## Access & roles

Roles: ADMIN > STAFF > DISTRIBUTOR/SUPPLIER > INVESTOR > CUSTOMER.
Admin/staff accounts require TOTP 2FA. All privileged actions are written to
`AuditLog` (who/what/when/IP).

## Managing the platform

| Task                    | Where                                                                                                                 |
| ----------------------- | --------------------------------------------------------------------------------------------------------------------- |
| Products & categories   | `packages/database` (Prisma Studio: `pnpm --filter @sylvara/database studio`) + website data files for marketing copy |
| Orders & quotations     | Admin API (`apps/admin`, port 4300) — UI ships v2.0                                                                   |
| Leads                   | `services/crm` `/api/v1/leads` (STAFF token)                                                                          |
| Content (news, careers) | `Article`/`JobPosting` tables                                                                                         |
| Bot conversations       | `Conversation`/`Message` tables; `handedOver` flags need human reply                                                  |
| Users & permissions     | `User` table, role field; sessions revocable by deleting `Session` rows                                               |

## Operations

- **Deploy**: merge to `main` → release → `deploy.yml` (see docs/deployment.md)
- **Secrets rotation**: update cloud secret manager → restart deployments
- **Backups**: verify the nightly CronJob and run the quarterly restore drill
  (docs/backup-recovery.md)
- **Incident response**: check `/health` endpoints → Sentry → `kubectl logs`;
  rollback with `kubectl rollout undo`

## SEO operations

Sitemap and structured data are generated from code — after catalog changes,
a rebuild republishes everything. Verify with Google Search Console and the
Rich Results test on any product URL.
