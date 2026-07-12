# WhatsApp Business Integration

`apps/whatsapp-bot` implements the WhatsApp Business **Cloud API** (Meta Graph
v21.0) — no on-premise stack required.

## Setup

1. Create a Meta app → add the WhatsApp product → note the **Phone Number ID**
   and **WABA ID**
2. Generate a permanent access token (System User with `whatsapp_business_messaging`)
3. Fill `.env`: `WHATSAPP_PHONE_NUMBER_ID`, `WHATSAPP_ACCESS_TOKEN`,
   `WHATSAPP_APP_SECRET`, and choose a `WHATSAPP_VERIFY_TOKEN`
4. Deploy the bot and point the webhook to `https://api.sylvara.com/webhooks/whatsapp`
   (the GET handshake echoes `hub.challenge` when the verify token matches)
5. Subscribe the webhook to `messages`

## Security

Every POST is verified against `X-Hub-Signature-256` (HMAC-SHA256 of the raw
body with the app secret, constant-time compared). Unsigned requests → 401.

## Conversation features

| Keyword                | Behavior                                                        |
| ---------------------- | --------------------------------------------------------------- |
| `MENU` / `HELP`        | Menu with all options                                           |
| `CATALOG`              | Category-grouped quick catalog with product codes               |
| `QUOTE P01 200`        | Structured quotation lead → CRM; PDF quote follows              |
| `TRACK SO-2026-000123` | Order status lookup                                             |
| `AGENT`                | Human handover (flags conversation, alerts sales)               |
| `LANG`                 | 12-language support notice                                      |
| anything else          | Claude-powered assistant (`packages/ai`) with graceful fallback |

PDF quotations, invoice delivery, payment links (via `packages/payments`) and
media sharing ride the same Cloud API `messages` endpoint with `document` /
`image` types — helpers live in `packages/notifications`.
