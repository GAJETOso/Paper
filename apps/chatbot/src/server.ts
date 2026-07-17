/**
 * AI chat service.
 *
 * POST /api/v1/chat { messages: [{role, content}] } → { reply, handover }
 * GET  /health
 *
 * Rate-limited per IP; CORS restricted to the website origin.
 */
import { createServer } from "node:http";
import { ask, type ChatMessage } from "@sylvara/ai";
import { createRateLimiter } from "@sylvara/utils";

const PORT = Number(process.env.PORT ?? 4200);
const ALLOWED_ORIGIN = process.env.APP_URL ?? "http://localhost:3000";
const limiter = createRateLimiter(20, 60_000); // 20 req/min/IP

const HANDOVER_HINTS = /complaint|refund|angry|lawyer|urgent claim|speak to (a )?human|agent/i;

const server = createServer(async (req, res) => {
  const headers: Record<string, string> = {
    "content-type": "application/json",
    "access-control-allow-origin": ALLOWED_ORIGIN,
    "access-control-allow-methods": "POST, OPTIONS",
    "access-control-allow-headers": "content-type",
  };

  if (req.method === "OPTIONS") {
    res.writeHead(204, headers).end();
    return;
  }

  if (req.method === "GET" && req.url === "/health") {
    res.writeHead(200, headers).end(JSON.stringify({ status: "ok", service: "chatbot" }));
    return;
  }

  if (req.method !== "POST" || req.url !== "/api/v1/chat") {
    res
      .writeHead(404, headers)
      .end(JSON.stringify({ error: { code: "not_found", message: "Not found" } }));
    return;
  }

  const ip =
    (req.headers["x-forwarded-for"] as string)?.split(",")[0]?.trim() ??
    req.socket.remoteAddress ??
    "unknown";
  if (!limiter(ip)) {
    res
      .writeHead(429, headers)
      .end(JSON.stringify({ error: { code: "rate_limited", message: "Too many requests" } }));
    return;
  }

  const chunks: Buffer[] = [];
  for await (const c of req) chunks.push(c as Buffer);

  let messages: ChatMessage[];
  try {
    const body = JSON.parse(Buffer.concat(chunks).toString()) as { messages?: ChatMessage[] };
    messages = (body.messages ?? []).slice(-20); // cap context
    if (
      !messages.length ||
      messages.some((m) => typeof m.content !== "string" || m.content.length > 4000)
    ) {
      throw new Error("invalid");
    }
  } catch {
    res
      .writeHead(422, headers)
      .end(JSON.stringify({ error: { code: "invalid_input", message: "messages[] required" } }));
    return;
  }

  const lastUser = [...messages].reverse().find((m) => m.role === "user")?.content ?? "";
  const handover = HANDOVER_HINTS.test(lastUser);

  try {
    const reply = await ask(messages);
    res.writeHead(200, headers).end(JSON.stringify({ reply, handover }));
  } catch (err) {
    console.error("[chatbot] AI error", err);
    res.writeHead(200, headers).end(
      JSON.stringify({
        reply:
          "I'm having trouble reaching the assistant right now. You can browse FAQs at sylvara.com/faqs or reach a human at support@sylvara.com.",
        handover: true,
      }),
    );
  }
});

server.listen(PORT, () => console.info(`[chatbot] listening on :${PORT}`));
