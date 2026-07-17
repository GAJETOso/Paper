/**
 * reporting service — investor-grade report generation (sales, production, ESG).
 *
 * v1 exposes the health probe and versioned route namespace; domain routes
 * land per ROADMAP.md. Contract-first: see docs/api/openapi.yaml.
 */
import { createServer } from "node:http";

const PORT = Number(process.env.PORT ?? 4440);

const server = createServer((req, res) => {
  res.setHeader("content-type", "application/json");
  if (req.url === "/health") {
    res.writeHead(200).end(JSON.stringify({ status: "ok", service: "reporting" }));
    return;
  }
  res.writeHead(404).end(JSON.stringify({ error: { code: "not_found", message: "Not found" } }));
});

server.listen(PORT, () => console.info("[reporting] listening on :" + PORT));
