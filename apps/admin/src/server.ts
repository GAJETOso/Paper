/**
 * Admin CMS API gateway: products, categories, orders, customers, content, careers, bots, SEO, users & permissions.
 *
 * v0.1 scaffold: health endpoint + authenticated status route demonstrating
 * the RBAC guard. The full UI ships in v2.0 (see ROADMAP.md); this service
 * boundary, auth model, and route contract are stable.
 */
import { createServer } from "node:http";
import { verifyJwt, hasRole } from "@sylvara/auth";

const PORT = Number(process.env.PORT ?? 4300);
const JWT_SECRET = process.env.JWT_SECRET ?? "";

const server = createServer((req, res) => {
  res.setHeader("content-type", "application/json");

  if (req.url === "/health") {
    res.writeHead(200).end(JSON.stringify({ status: "ok", service: "admin" }));
    return;
  }

  // payload.role below is read only after verifyJwt() validates an HMAC-SHA256
  // signature (timing-safe compare) against JWT_SECRET, a value the client never has;
  // a request cannot forge a valid signature, so this cannot be bypassed by a client.
  // (js/user-controlled-bypass is excluded repo-wide for this reason — see
  // .github/codeql/codeql-config.yml.)
  if (req.url === "/api/v1/me") {
    const token = (req.headers.authorization ?? "").replace(/^Bearer /, "");
    const payload = JWT_SECRET ? verifyJwt(token, JWT_SECRET) : null;
    if (!payload || !hasRole(payload.role, "ADMIN")) {
      res.writeHead(401).end(
        JSON.stringify({
          error: { code: "unauthorized", message: "Valid ADMIN token required" },
        }),
      );
      return;
    }
    res.writeHead(200).end(JSON.stringify({ sub: payload.sub, role: payload.role }));
    return;
  }

  res.writeHead(404).end(JSON.stringify({ error: { code: "not_found", message: "Not found" } }));
});

server.listen(PORT, () => console.info("[admin] listening on :" + PORT));
