/**
 * WhatsApp Business Cloud API webhook server.
 *
 * GET  /webhook — Meta verification handshake (hub.challenge echo)
 * POST /webhook — inbound messages; X-Hub-Signature-256 verified
 * GET  /health  — liveness probe
 *
 * Free-form messages fall through to the Claude-powered assistant when
 * ANTHROPIC_API_KEY is configured; command keywords are handled locally.
 */
import { createHmac, timingSafeEqual } from "node:crypto";
import { createServer } from "node:http";
import { ask } from "@sylvara/ai";
import { route } from "./router.ts";

const PORT = Number(process.env.PORT ?? 4100);
const VERIFY_TOKEN = process.env.WHATSAPP_VERIFY_TOKEN ?? "";
const APP_SECRET = process.env.WHATSAPP_APP_SECRET ?? "";
const ACCESS_TOKEN = process.env.WHATSAPP_ACCESS_TOKEN ?? "";
const PHONE_NUMBER_ID = process.env.WHATSAPP_PHONE_NUMBER_ID ?? "";

async function sendText(to: string, body: string): Promise<void> {
  if (!ACCESS_TOKEN || !PHONE_NUMBER_ID) {
    console.warn("[wa] outbound skipped (API not configured):", body.slice(0, 80));
    return;
  }
  const res = await fetch(`https://graph.facebook.com/v21.0/${PHONE_NUMBER_ID}/messages`, {
    method: "POST",
    headers: { "content-type": "application/json", authorization: `Bearer ${ACCESS_TOKEN}` },
    body: JSON.stringify({ messaging_product: "whatsapp", to, type: "text", text: { body } }),
  });
  if (!res.ok) console.error("[wa] send failed", res.status, await res.text());
}

function verifySignature(raw: Buffer, header: string | undefined): boolean {
  if (!APP_SECRET) return true; // local dev without secret
  if (!header?.startsWith("sha256=")) return false;
  const expected = createHmac("sha256", APP_SECRET).update(raw).digest("hex");
  const given = header.slice(7);
  return (
    given.length === expected.length &&
    timingSafeEqual(Buffer.from(given, "hex"), Buffer.from(expected, "hex"))
  );
}

interface WebhookPayload {
  entry?: {
    changes?: {
      value?: {
        messages?: { from: string; type: string; text?: { body: string } }[];
      };
    }[];
  }[];
}

async function handleInbound(payload: WebhookPayload): Promise<void> {
  const messages =
    payload.entry?.flatMap((e) => e.changes?.flatMap((c) => c.value?.messages ?? []) ?? []) ?? [];

  for (const msg of messages) {
    if (msg.type !== "text" || !msg.text) continue;
    const result = route(msg.text.body);

    if (result.reply) {
      await sendText(msg.from, result.reply);
      if (result.lead) {
        // Forward to CRM as a structured lead
        console.info("[wa] quotation lead", { from: msg.from, ...result.lead });
      }
      continue;
    }

    // Free-form → AI assistant
    try {
      const answer = await ask([{ role: "user", content: msg.text.body }]);
      await sendText(msg.from, answer);
    } catch {
      await sendText(
        msg.from,
        "Thanks for your message! Send *MENU* for options, or *AGENT* to reach our team directly.",
      );
    }
  }
}

const server = createServer(async (req, res) => {
  const url = new URL(req.url ?? "/", `http://localhost:${PORT}`);

  if (req.method === "GET" && url.pathname === "/health") {
    res.writeHead(200, { "content-type": "application/json" });
    res.end(JSON.stringify({ status: "ok", service: "whatsapp-bot" }));
    return;
  }

  if (req.method === "GET" && url.pathname === "/webhook") {
    const mode = url.searchParams.get("hub.mode");
    const token = url.searchParams.get("hub.verify_token");
    const challenge = url.searchParams.get("hub.challenge");
    if (mode === "subscribe" && token === VERIFY_TOKEN && challenge) {
      res.writeHead(200).end(challenge);
    } else {
      res.writeHead(403).end();
    }
    return;
  }

  if (req.method === "POST" && url.pathname === "/webhook") {
    const chunks: Buffer[] = [];
    for await (const chunk of req) chunks.push(chunk as Buffer);
    const raw = Buffer.concat(chunks);
    if (!verifySignature(raw, req.headers["x-hub-signature-256"] as string | undefined)) {
      res.writeHead(401).end();
      return;
    }
    res.writeHead(200).end(); // ack fast; process async
    try {
      await handleInbound(JSON.parse(raw.toString()) as WebhookPayload);
    } catch (err) {
      console.error("[wa] inbound processing error", err);
    }
    return;
  }

  res.writeHead(404).end();
});

server.listen(PORT, () => console.info(`[wa] WhatsApp bot listening on :${PORT}`));
