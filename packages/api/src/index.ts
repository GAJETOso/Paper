/**
 * API contracts: route table + typed fetch client shared by portals and bots.
 * The OpenAPI 3.1 spec generated from these contracts lives at docs/api/openapi.yaml.
 */
import type { LeadInput, OrderSummary, Paginated, QuotationRequest } from "@sylvara/shared";

export const API_VERSION = "v1";

export const routes = {
  health: "/api/health",
  leads: `/api/${API_VERSION}/leads`,
  quotations: `/api/${API_VERSION}/quotations`,
  orders: `/api/${API_VERSION}/orders`,
  orderByNumber: (n: string) => `/api/${API_VERSION}/orders/${encodeURIComponent(n)}`,
  products: `/api/${API_VERSION}/products`,
  sustainability: `/api/${API_VERSION}/sustainability/snapshot`,
} as const;

export interface ClientOptions {
  baseUrl: string;
  token?: string;
  fetchImpl?: typeof fetch;
}

export class SylvaraApiClient {
  constructor(private readonly opts: ClientOptions) {}

  private async request<T>(path: string, init: RequestInit = {}): Promise<T> {
    const f = this.opts.fetchImpl ?? fetch;
    const res = await f(`${this.opts.baseUrl}${path}`, {
      ...init,
      headers: {
        "content-type": "application/json",
        ...(this.opts.token ? { authorization: `Bearer ${this.opts.token}` } : {}),
        ...init.headers,
      },
    });
    if (!res.ok) {
      const body = await res.text().catch(() => "");
      throw new Error(`API ${res.status} on ${path}: ${body.slice(0, 300)}`);
    }
    return res.json() as Promise<T>;
  }

  createLead(lead: LeadInput) {
    return this.request<{ ok: true; id: string }>(routes.leads, {
      method: "POST",
      body: JSON.stringify(lead),
    });
  }

  requestQuotation(q: QuotationRequest) {
    return this.request<{ ok: true; number: string }>(routes.quotations, {
      method: "POST",
      body: JSON.stringify(q),
    });
  }

  trackOrder(orderNumber: string) {
    return this.request<OrderSummary>(routes.orderByNumber(orderNumber));
  }

  listOrders(page = 1) {
    return this.request<Paginated<OrderSummary>>(`${routes.orders}?page=${page}`);
  }
}
