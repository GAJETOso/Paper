# Backup & Disaster Recovery

## Objectives

| Metric          | Target                                                    |
| --------------- | --------------------------------------------------------- |
| RPO (data loss) | ≤ 5 minutes (PITR) / ≤ 24 h (logical)                     |
| RTO (recovery)  | ≤ 1 hour for the platform, ≤ 4 hours full region failover |

## Layers

1. **Provider PITR** — RDS/Cloud SQL/Flexible Server automated backups,
   30-day retention, transaction-log replay
2. **Nightly logical dumps** — `scripts/backup.sh` (pg_dump → gzip → S3
   Standard-IA, 35-day pruning); run as a K8s CronJob at 02:00 UTC
3. **Object storage** — S3 versioning + cross-region replication for assets
4. **Infrastructure** — everything is Terraform + kustomize; clusters are
   rebuildable from `infrastructure/` in under an hour
5. **Secrets** — cloud secret manager as source of truth (not in backups)

## Restore drills

Quarterly: restore latest dump to a scratch instance, run
`pnpm db:migrate && pnpm -r test`, compare row counts. Document results in
the runbook. A backup that hasn't been restored is a hope, not a backup.

## Recovery procedures

- Bad deploy → `kubectl rollout undo` (see docs/deployment.md)
- Data corruption → PITR to the minute before the incident, replay outbox
- Region loss → Terraform apply in the secondary region, restore dump,
  repoint DNS (Route53/Traffic Manager health-check failover)
