/**
 * Telegram bot via long polling (getUpdates). Switch to webhooks in
 * production by setting TELEGRAM_WEBHOOK_URL; polling keeps local dev
 * dependency-free.
 */
import { ask } from "@sylvara/ai";
import { handleCommand } from "./commands.ts";

const TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const API = `https://api.telegram.org/bot${TOKEN}`;

interface TgUpdate {
  update_id: number;
  message?: { chat: { id: number }; text?: string };
}

async function api<T>(method: string, params: Record<string, unknown>): Promise<T> {
  const res = await fetch(`${API}/${method}`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(params),
  });
  if (!res.ok) throw new Error(`Telegram ${method} failed: ${res.status} ${await res.text()}`);
  const data = (await res.json()) as { ok: boolean; result: T };
  return data.result;
}

async function reply(chatId: number, text: string): Promise<void> {
  await api("sendMessage", { chat_id: chatId, text, parse_mode: "Markdown" });
}

async function handle(update: TgUpdate): Promise<void> {
  const text = update.message?.text;
  const chatId = update.message?.chat.id;
  if (!text || !chatId) return;

  const commandReply = handleCommand(text);
  if (commandReply) {
    await reply(chatId, commandReply);
    return;
  }

  try {
    const answer = await ask([{ role: "user", content: text }]);
    await reply(chatId, answer);
  } catch {
    await reply(chatId, "Send /start for the menu, or /agent to reach our team.");
  }
}

async function main(): Promise<void> {
  if (!TOKEN) {
    console.error("[tg] TELEGRAM_BOT_TOKEN is not set — exiting.");
    process.exit(1);
  }
  console.info("[tg] Sylvara Telegram bot polling…");
  let offset = 0;
  for (;;) {
    try {
      const updates = await api<TgUpdate[]>("getUpdates", { offset, timeout: 30 });
      for (const u of updates) {
        offset = u.update_id + 1;
        await handle(u).catch((e) => console.error("[tg] handler error", e));
      }
    } catch (err) {
      console.error("[tg] polling error; retrying in 5s", err);
      await new Promise((r) => setTimeout(r, 5000));
    }
  }
}

main();
