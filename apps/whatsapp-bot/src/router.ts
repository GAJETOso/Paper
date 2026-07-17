/**
 * Conversation router: pure function from inbound text → reply, so the
 * whole flow is unit-testable without the WhatsApp API.
 */
import { botCatalog, catalogText } from "./catalog.ts";

export interface RouteResult {
  reply: string;
  handover?: boolean;
  lead?: { code: string; quantity: number };
}

const HELP = `👋 Welcome to *Sylvara Paper Group* — from forest to future.

*MENU* — product categories
*CATALOG* — quick product list
*QUOTE <code> <qty>* — request a quotation
*TRACK <order no>* — order status
*AGENT* — talk to a human
*LANG* — language options

You can also just describe what you need ("500 printed pizza boxes to Lagos") and our AI assistant will help.`;

export function route(textRaw: string): RouteResult {
  const text = textRaw.trim();
  const upper = text.toUpperCase();

  if (["HI", "HELLO", "START", "MENU", "HELP"].includes(upper)) {
    return { reply: HELP };
  }

  if (upper === "CATALOG" || upper === "CATALOGUE") {
    return { reply: catalogText() };
  }

  if (upper === "AGENT" || upper === "HUMAN") {
    return {
      reply:
        "You're being connected to a Sylvara agent. Our team replies within 15 minutes during business hours (08:00–20:00 EET). 🧑‍💼",
      handover: true,
    };
  }

  if (upper === "LANG") {
    return {
      reply:
        "🌍 Available languages: English, Français, Deutsch, Español, Português, العربية, 中文, Suomi, Yorùbá, Hausa, Kiswahili, हिन्दी. Just write to me in your language and I'll follow.",
    };
  }

  const quote = upper.match(/^QUOTE\s+([A-Z]\d{2})\s+(\d{1,7})$/);
  if (quote) {
    const [, code, qtyStr] = quote;
    const product = botCatalog.find((p) => p.code === code);
    if (!product) {
      return { reply: `❌ Unknown product code *${code}*. Send *CATALOG* to see valid codes.` };
    }
    const quantity = Number(qtyStr);
    return {
      reply:
        `✅ Quotation request received:\n\n` +
        `*${product.name}*\nQuantity: ${quantity.toLocaleString()} ${product.unit}\n\n` +
        `Our sales team will send a PDF quotation here within *1 business hour*. ` +
        `To add delivery details, reply with your city and country.`,
      lead: { code: code!, quantity },
    };
  }

  const track = upper.match(/^TRACK\s+([A-Z]{2}-\d{4}-\d{6})$/);
  if (track) {
    return {
      reply:
        `🔎 Looking up order *${track[1]}*… You'll receive live status here. ` +
        `(Portal: https://sylvara.com/support)`,
    };
  }

  // Fallback → AI assistant handles free-form messages in server.ts
  return { reply: "" };
}
