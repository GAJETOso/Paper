/**
 * AI package: thin Anthropic Messages API client (fetch-based, no SDK
 * dependency) plus the Sylvara assistant system prompt and product-finder
 * helpers used by the chatbot, WhatsApp, and Telegram bots.
 */

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export interface AskOptions {
  system?: string;
  model?: string;
  maxTokens?: number;
  apiKey?: string;
}

export const SYLVARA_ASSISTANT_SYSTEM = `You are the Sylvara Paper Group assistant.
Sylvara manufactures 200+ paper products in 13 categories (printing papers,
packaging papers, corrugated, retail bags, food packaging, hygiene/tissue,
education, office, publishing, industrial, agriculture, eco products, custom),
operates 42 mills across 8 regions, serves 140+ countries, and targets net-zero
emissions by 2040 (SBTi-validated; 61% recycled fiber; 83% renewable energy).

Rules:
- Answer buyer questions precisely; quote MOQs and lead times only as "typical"
  and route firm numbers to a quotation.
- For quotation requests, collect: product, quantity, destination country, and
  contact email — then confirm you are raising a quote.
- For complaints or anything requiring a human, say you are escalating and set
  handover=true in your metadata.
- Reply in the customer's language. Be concise and professional.`;

/** Calls the Anthropic Messages API. Throws on non-2xx responses. */
export async function ask(messages: ChatMessage[], opts: AskOptions = {}): Promise<string> {
  const apiKey = opts.apiKey ?? process.env.ANTHROPIC_API_KEY;
  if (!apiKey) throw new Error("ANTHROPIC_API_KEY is not configured");

  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: opts.model ?? process.env.AI_DEFAULT_MODEL ?? "claude-sonnet-5",
      max_tokens: opts.maxTokens ?? 1024,
      system: opts.system ?? SYLVARA_ASSISTANT_SYSTEM,
      messages,
    }),
  });

  if (!res.ok) {
    throw new Error(`Anthropic API error ${res.status}: ${await res.text()}`);
  }
  const data = (await res.json()) as { content: { type: string; text?: string }[] };
  return data.content
    .filter((b) => b.type === "text")
    .map((b) => b.text ?? "")
    .join("");
}

/** Lightweight keyword scorer for product-finder fallback when no LLM key is set. */
export function keywordFind<T extends { name: string; blurb: string }>(
  query: string,
  products: T[],
  limit = 5,
): T[] {
  const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
  return products
    .map((p) => {
      const hay = `${p.name} ${p.blurb}`.toLowerCase();
      const score = terms.reduce(
        (s, t) => s + (p.name.toLowerCase().includes(t) ? 3 : hay.includes(t) ? 1 : 0),
        0,
      );
      return { p, score };
    })
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((r) => r.p);
}
