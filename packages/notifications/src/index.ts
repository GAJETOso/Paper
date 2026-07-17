/**
 * Notification fan-out: one `notify()` call delivers over email (SMTP relay
 * service), WhatsApp Cloud API, and Telegram Bot API depending on the
 * recipient's channels. Channels missing configuration are skipped and
 * reported in the result rather than throwing.
 */

export interface Recipient {
  email?: string;
  whatsapp?: string; // E.164 without '+'
  telegramChatId?: string;
}

export interface NotifyPayload {
  subject: string;
  text: string;
}

export interface ChannelResult {
  channel: "email" | "whatsapp" | "telegram";
  ok: boolean;
  detail?: string;
}

export async function notify(to: Recipient, payload: NotifyPayload): Promise<ChannelResult[]> {
  const jobs: Promise<ChannelResult>[] = [];
  if (to.email) jobs.push(sendEmail(to.email, payload));
  if (to.whatsapp) jobs.push(sendWhatsApp(to.whatsapp, payload.text));
  if (to.telegramChatId) jobs.push(sendTelegram(to.telegramChatId, payload.text));
  return Promise.all(jobs);
}

async function sendEmail(to: string, p: NotifyPayload): Promise<ChannelResult> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return { channel: "email", ok: false, detail: "RESEND_API_KEY not configured" };
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { "content-type": "application/json", authorization: `Bearer ${apiKey}` },
    body: JSON.stringify({
      from: process.env.EMAIL_FROM ?? "Sylvara <no-reply@sylvara.com>",
      to,
      subject: p.subject,
      text: p.text,
    }),
  });
  return { channel: "email", ok: res.ok, detail: res.ok ? undefined : `HTTP ${res.status}` };
}

export async function sendWhatsApp(to: string, text: string): Promise<ChannelResult> {
  const token = process.env.WHATSAPP_ACCESS_TOKEN;
  const phoneId = process.env.WHATSAPP_PHONE_NUMBER_ID;
  if (!token || !phoneId)
    return { channel: "whatsapp", ok: false, detail: "WhatsApp API not configured" };
  const res = await fetch(`https://graph.facebook.com/v21.0/${phoneId}/messages`, {
    method: "POST",
    headers: { "content-type": "application/json", authorization: `Bearer ${token}` },
    body: JSON.stringify({
      messaging_product: "whatsapp",
      to,
      type: "text",
      text: { body: text },
    }),
  });
  return { channel: "whatsapp", ok: res.ok, detail: res.ok ? undefined : `HTTP ${res.status}` };
}

export async function sendTelegram(chatId: string, text: string): Promise<ChannelResult> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  if (!token)
    return { channel: "telegram", ok: false, detail: "TELEGRAM_BOT_TOKEN not configured" };
  const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text, parse_mode: "Markdown" }),
  });
  return { channel: "telegram", ok: res.ok, detail: res.ok ? undefined : `HTTP ${res.status}` };
}
