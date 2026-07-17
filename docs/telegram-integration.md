# Telegram Integration

`apps/telegram-bot` — long polling by default (zero infrastructure), webhook
mode for production scale.

## Setup

1. Create the bot with @BotFather → set `TELEGRAM_BOT_TOKEN`
2. `pnpm --filter @sylvara/telegram-bot start`
3. Production webhook option:
   `curl "https://api.telegram.org/bot$TOKEN/setWebhook?url=https://api.sylvara.com/webhooks/telegram&secret_token=$TELEGRAM_WEBHOOK_SECRET"`

## Commands

`/start` menu · `/catalog` products · `/quote <code> <qty>` quotation ·
`/track <order>` status · `/docs` certificates & datasheets · `/agent` human
handover. Non-commands go to the Claude assistant.

## Broadcasts & notifications

`packages/notifications` `sendTelegram()` powers order-status pushes and
marketing broadcasts (respecting a per-chat opt-in flag on `Conversation`).
Keep exactly **one** polling replica (`Recreate` strategy in k8s) to avoid
duplicate update consumption.
