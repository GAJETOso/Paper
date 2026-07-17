#!/usr/bin/env bash
# PostgreSQL logical backup with S3 upload and 35-day retention.
# Schedule via cron/K8s CronJob: 0 2 * * * scripts/backup.sh
set -euo pipefail

: "${DATABASE_URL:?DATABASE_URL is required}"
STAMP=$(date -u +%Y%m%dT%H%M%SZ)
OUT="sylvara-${STAMP}.sql.gz"

pg_dump "$DATABASE_URL" | gzip > "/tmp/${OUT}"

if [ -n "${AWS_S3_BUCKET:-}" ]; then
  aws s3 cp "/tmp/${OUT}" "s3://${AWS_S3_BUCKET}/backups/${OUT}" --storage-class STANDARD_IA
  # prune backups older than 35 days
  aws s3 ls "s3://${AWS_S3_BUCKET}/backups/" | while read -r _ _ _ key; do
    ts=${key#sylvara-}; ts=${ts%.sql.gz}
    [ -n "$ts" ] || continue
    if [ "$(date -u -d "${ts:0:8} -35 days" +%s 2>/dev/null || echo 0)" -gt "$(date -u -d "${ts:0:8}" +%s 2>/dev/null || echo 1)" ]; then
      aws s3 rm "s3://${AWS_S3_BUCKET}/backups/${key}"
    fi
  done
fi

echo "Backup complete: ${OUT}"
