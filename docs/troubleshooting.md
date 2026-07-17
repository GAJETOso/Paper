# Troubleshooting

## Install & build

| Symptom                                                    | Fix                                                                                             |
| ---------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| `pnpm: command not found`                                  | `corepack enable` (Node ≥ 20 ships corepack)                                                    |
| Prisma types missing (`no exported member 'PrismaClient'`) | `pnpm db:generate`                                                                              |
| Next build fails on ESLint                                 | `pnpm --filter @sylvara/website add -D eslint eslint-config-next` (already in repo — reinstall) |
| Port already in use                                        | Each app reads `PORT`; override per process                                                     |

## Runtime

| Symptom                         | Fix                                                                                                             |
| ------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| `/api/contact` returns 502      | `CRM_URL` points at a dead CRM service; unset it to log-only mode or start `service-crm`                        |
| WhatsApp webhook 401            | `WHATSAPP_APP_SECRET` mismatch — signature verification failing (correct behavior)                              |
| WhatsApp verification fails     | `WHATSAPP_VERIFY_TOKEN` must equal the value entered in the Meta dashboard                                      |
| Telegram bot exits immediately  | `TELEGRAM_BOT_TOKEN` unset                                                                                      |
| Chat replies with fallback text | `ANTHROPIC_API_KEY` unset/invalid — designed degradation                                                        |
| Dark mode flashes light         | Ensure the inline theme script in `layout.tsx` is not stripped by a CSP without `'unsafe-inline'` for that hash |

## Kubernetes

- Pods CrashLooping → `kubectl -n sylvara logs deploy/<name>`; usually missing
  `platform-secrets`
- Ingress 503 → readiness probe failing; check `/health` locally in the pod
- HPA not scaling → metrics-server installed?

Still stuck? Open a **Question** issue with logs and environment details.
