/**
 * CRM service — lead intake and pipeline.
 *
 * POST /api/v1/leads   — create a lead (called by website /api/contact and bots)
 * GET  /api/v1/leads   — list (newest first; in-memory store until DB wiring)
 * GET  /health
 *
 * When SALESFORCE/HUBSPOT/ZOHO credentials are configured, created leads are
 * mirrored to the external CRM asynchronously.
 */
import { createServer } from "node:http";
import { randomUUID } from "node:crypto";
import type { LeadInput } from "@sylvara/shared";

const PORT = Number(process.env.PORT ?? 4400);

interface Lead extends LeadInput {
  id: string;
  status: "NEW";
  createdAt: string;
}

const leads: Lead[] = []; // replace with @sylvara/database in production wiring

async function mirrorToExternalCrm(lead: Lead): Promise<void> {
  const hubspotToken = process.env.HUBSPOT_ACCESS_TOKEN;
  if (!hubspotToken) return;
  try {
    await fetch("https://api.hubapi.com/crm/v3/objects/contacts", {
      method: "POST",
      headers: { authorization: `Bearer ${hubspotToken}`, "content-type": "application/json" },
      body: JSON.stringify({
        properties: {
          email: lead.email,
          firstname: lead.name,
          company: lead.company ?? "",
          message: lead.message,
          hs_lead_status: "NEW",
        },
      }),
    });
  } catch (err) {
    console.error("[crm] HubSpot mirror failed", err);
  }
}

const server = createServer(async (req, res) => {
  res.setHeader("content-type", "application/json");

  if (req.method === "GET" && req.url === "/health") {
    res.writeHead(200).end(JSON.stringify({ status: "ok", service: "crm", leads: leads.length }));
    return;
  }

  if (req.method === "POST" && req.url === "/api/v1/leads") {
    const chunks: Buffer[] = [];
    for await (const c of req) chunks.push(c as Buffer);
    try {
      const input = JSON.parse(Buffer.concat(chunks).toString()) as LeadInput;
      if (!input.name || !input.email || !input.message) throw new Error("invalid");
      const lead: Lead = {
        ...input,
        id: randomUUID(),
        status: "NEW",
        createdAt: new Date().toISOString(),
      };
      leads.unshift(lead);
      void mirrorToExternalCrm(lead);
      res.writeHead(201).end(JSON.stringify({ ok: true, id: lead.id }));
    } catch {
      res
        .writeHead(422)
        .end(
          JSON.stringify({
            error: { code: "invalid_input", message: "name, email, message required" },
          }),
        );
    }
    return;
  }

  if (req.method === "GET" && req.url?.startsWith("/api/v1/leads")) {
    res
      .writeHead(200)
      .end(
        JSON.stringify({ items: leads.slice(0, 100), total: leads.length, page: 1, pageSize: 100 }),
      );
    return;
  }

  res.writeHead(404).end(JSON.stringify({ error: { code: "not_found", message: "Not found" } }));
});

server.listen(PORT, () => console.info(`[crm] listening on :${PORT}`));
