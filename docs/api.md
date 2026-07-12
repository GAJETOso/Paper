# API

REST-first with versioned routes (`/api/v1/*`), OpenAPI 3.1 spec at
[`docs/api/openapi.yaml`](./api/openapi.yaml), Postman collection at
[`docs/api/postman_collection.json`](./api/postman_collection.json).
GraphQL gateway is on the roadmap (v2.0) — the typed client in
`packages/api` insulates consumers from the transport.

## Error envelope

Every non-2xx response:

```json
{ "error": { "code": "invalid_input", "message": "name, email, message required" } }
```

## Rate limiting

20 req/min/IP on public chat; 50 rps at the ingress; per-token quotas for
portal APIs.

## Endpoints (v1)

| Method | Path                              | Service        | Auth                            |
| ------ | --------------------------------- | -------------- | ------------------------------- |
| GET    | `/api/health`                     | all            | none                            |
| POST   | `/api/contact`                    | website        | none (validated + rate-limited) |
| POST   | `/api/v1/leads`                   | crm            | none (internal origin)          |
| GET    | `/api/v1/leads`                   | crm            | STAFF                           |
| POST   | `/api/v1/chat`                    | chatbot        | none (rate-limited, CORS)       |
| GET    | `/api/v1/sustainability/snapshot` | sustainability | none (public, cached 60s)       |
| GET    | `/api/v1/me`                      | portals        | JWT (role-scoped)               |

Authentication: `Authorization: Bearer <JWT>` — 15-minute HS256 access tokens
with rotating refresh tokens (`packages/auth`).
