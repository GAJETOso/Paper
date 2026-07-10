/** Cross-cutting domain types shared by apps, bots, and services. */

export type Locale =
  "en" | "fr" | "de" | "es" | "pt" | "ar" | "zh" | "fi" | "sv" | "yo" | "ha" | "sw" | "hi" | "ja";

export type Currency = "USD" | "EUR" | "GBP" | "NGN" | "BRL" | "INR" | "AED" | "SGD" | "CNY";

export interface Money {
  amount: string; // decimal string to avoid float drift
  currency: Currency;
}

export interface Paginated<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
}

export interface LeadInput {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  topic?: string;
  category?: string;
  message: string;
  source: "website" | "whatsapp" | "telegram" | "event" | "api";
}

export interface QuotationRequest {
  items: { sku: string; quantity: number }[];
  currency?: Currency;
  destinationCountry?: string;
  incoterms?: string;
  contact: Pick<LeadInput, "name" | "email" | "phone" | "company">;
}

export interface OrderSummary {
  number: string;
  status:
    "PENDING" | "CONFIRMED" | "IN_PRODUCTION" | "READY" | "SHIPPED" | "DELIVERED" | "CANCELLED";
  total: Money;
  eta?: string;
  trackingUrl?: string;
}

export interface SustainabilitySnapshot {
  renewableEnergyPct: number;
  recycledFiberPct: number;
  waterReturnedCleanPct: number;
  wasteDiversionPct: number;
  co2ReductionVs2019Pct: number;
  treesPlantedTotal: number;
  asOf: string;
}

/** Standard error envelope for all REST services. */
export interface ApiError {
  error: { code: string; message: string; details?: unknown };
}
