/**
 * search service — Meilisearch-backed product finder with keyword fallback.
 *
 * v1 exposes the health probe and versioned route namespace; domain routes
 * land per ROADMAP.md. Contract-first: see docs/api/openapi.yaml.
 */
import { createServer } from "node:http";

const PORT = Number(process.env.PORT ?? 4450);

const server = createServer((req, res) => {
  res.setHeader("content-type", "application/json");
  if (req.url === "/health") {
    res.writeHead(200).end(JSON.stringify({ status: "ok", service: "search" }));
    return;
  }
  res.writeHead(404).end(JSON.stringify({ error: { code: "not_found", message: "Not found" } }));
});

server.listen(PORT, () => console.info("[search] listening on :" + PORT));
