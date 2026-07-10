/** Telegram command handlers as pure functions (unit-testable). */

const products = [
  ["P01", "A4 Copy Paper 80gsm"],
  ["K01", "Kraft Paper 35–200gsm"],
  ["C01", "Custom Corrugated Boxes"],
  ["F01", "Coffee Cups (plastic-free)"],
  ["H01", "Toilet Paper (jumbo rolls)"],
  ["E01", "Exercise Books A5"],
  ["X01", "Eco Mailers"],
] as const;

export function handleCommand(text: string): string | null {
  const [cmd, ...args] = text.trim().split(/\s+/);
  switch ((cmd ?? "").toLowerCase()) {
    case "/start":
      return [
        "🌲 *Welcome to Sylvara Paper Group*",
        "",
        "/catalog — browse products",
        "/quote — request a quotation",
        "/track — track an order",
        "/docs — certificates & datasheets",
        "/agent — talk to a human",
        "",
        "Or just tell me what you need — I speak 14 languages.",
      ].join("\n");
    case "/catalog":
      return (
        "*Quick catalog*\n" +
        products.map(([c, n]) => `\`${c}\` — ${n}`).join("\n") +
        "\n\nFull catalog: https://sylvara.com/products\nQuote: `/quote P01 200`"
      );
    case "/quote": {
      const [code, qty] = args;
      if (!code || !qty || !/^\d+$/.test(qty)) {
        return "Usage: `/quote <code> <quantity>` — e.g. `/quote P01 200`. Codes: /catalog";
      }
      const product = products.find(([c]) => c === code.toUpperCase());
      if (!product) return `Unknown code \`${code}\`. See /catalog.`;
      return (
        `✅ Quotation request registered:\n*${product[1]}* × ${Number(qty).toLocaleString()}\n\n` +
        "A PDF quotation will be sent here within 1 business hour. " +
        "Reply with destination city/country to include delivery."
      );
    }
    case "/track": {
      const [order] = args;
      if (!order) return "Usage: `/track SO-2026-000123`";
      return `🔎 Tracking *${order}* — you'll receive live status updates in this chat.`;
    }
    case "/docs":
      return [
        "*Documents*",
        "• FSC/PEFC certificates — sylvara.com/downloads",
        "• ISO 9001/14001/45001 — sylvara.com/downloads",
        "• Product datasheets — sylvara.com/products",
        "• Sustainability report — sylvara.com/sustainability",
      ].join("\n");
    case "/agent":
      return "🧑‍💼 Connecting you to a Sylvara agent — replies within 15 minutes during business hours.";
    default:
      return null; // not a command → AI assistant
  }
}
