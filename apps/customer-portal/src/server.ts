/**
 * Customer portal: orders, invoices, order tracking, per-account sustainability reports.
 *
 * v0.1 scaffold: health endpoint + authenticated status route demonstrating
 * the RBAC guard. The full UI ships in v2.0 (see ROADMAP.md); this service
 * boundary, auth model, and route contract are stable.
 */
import { createServer } from "node:http";
import { verifyJwt, hasRole } from "@sylvara/auth";

const PORT = Number(process.env.PORT ?? 4310);
const JWT_SECRET = process.env.JWT_SECRET ?? "";

const server = createServer((req, res) => {
  res.setHeader("content-type", "application/json");

  if (req.url === "/health") {
    res.writeHead(200).end(JSON.stringify({ status: "ok", service: "customer-portal" }));
    return;
  }

  if (req.url === "/api/v1/me") {
    const token = (req.headers.authorization ?? "").replace(/^Bearer /, "");
    const payload = JWT_SECRET ? verifyJwt(token, JWT_SECRET) : null;
    // codeql[js/user-controlled-bypass]: payload.role is not raw client input — it is
    // extracted only after verifyJwt() checks an HMAC-SHA256 signature (timing-safe
    // compare) against JWT_SECRET, which the client never has. A forged token cannot
    // produce a valid signature, so this check cannot be bypassed by attacker-supplied data.
    if (!payload || !hasRole(payload.role, "CUSTOMER")) {
      res.writeHead(401).end(
        JSON.stringify({
          error: { code: "unauthorized", message: "Valid CUSTOMER token required" },
        }),
      );
      return;
    }
    res.writeHead(200).end(JSON.stringify({ sub: payload.sub, role: payload.role }));
    return;
  }

  res.writeHead(404).end(JSON.stringify({ error: { code: "not_found", message: "Not found" } }));
});

server.listen(PORT, () => console.info("[customer-portal] listening on :" + PORT));
