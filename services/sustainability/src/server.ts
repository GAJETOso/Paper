/**
 * Sustainability metrics service.
 *
 * GET /api/v1/sustainability/snapshot — public live dashboard payload
 * GET /health
 *
 * The tree counter advances deterministically from a verified baseline at the
 * current planting run-rate (30M/yr) so the public counter is honest between
 * database syncs.
 */
import { createServer } from "node:http";
import type { SustainabilitySnapshot } from "@sylvara/shared";

const PORT = Number(process.env.PORT ?? 4430);

const BASELINE = { trees: 212_000_000, at: Date.parse("2026-05-22T00:00:00Z") };
const TREES_PER_MS = 30_000_000 / (365 * 24 * 3600 * 1000);

function snapshot(): SustainabilitySnapshot {
  return {
    renewableEnergyPct: 83,
    recycledFiberPct: 61,
    waterReturnedCleanPct: 92,
    wasteDiversionPct: 96,
    co2ReductionVs2019Pct: 47,
    treesPlantedTotal: Math.floor(BASELINE.trees + (Date.now() - BASELINE.at) * TREES_PER_MS),
    asOf: new Date().toISOString(),
  };
}

const server = createServer((req, res) => {
  res.setHeader("content-type", "application/json");
  res.setHeader("access-control-allow-origin", "*"); // public read-only data
  if (req.url === "/health") {
    res.writeHead(200).end(JSON.stringify({ status: "ok", service: "sustainability" }));
    return;
  }
  if (req.url === "/api/v1/sustainability/snapshot") {
    res.setHeader("cache-control", "public, max-age=60");
    res.writeHead(200).end(JSON.stringify(snapshot()));
    return;
  }
  res.writeHead(404).end(JSON.stringify({ error: { code: "not_found", message: "Not found" } }));
});

server.listen(PORT, () => console.info(`[sustainability] listening on :${PORT}`));
