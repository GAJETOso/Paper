/** Shared utilities — pure functions only, zero dependencies. */

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

/** Formats a decimal-string amount in a locale-aware way. */
export function formatMoney(amount: string, currency: string, locale = "en-US"): string {
  const value = Number(amount);
  if (!Number.isFinite(value)) throw new Error(`Invalid amount: ${amount}`);
  return new Intl.NumberFormat(locale, { style: "currency", currency }).format(value);
}

/** Sequential business document numbers, e.g. docNumber("Q", 2026, 123) → "Q-2026-000123". */
export function docNumber(prefix: string, year: number, seq: number): string {
  return `${prefix}-${year}-${String(seq).padStart(6, "0")}`;
}

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
}

/** Normalizes phone numbers to E.164-ish digits for WhatsApp APIs. */
export function normalizePhone(phone: string): string {
  const digits = phone.replace(/[^\d+]/g, "");
  return digits.startsWith("+") ? digits.slice(1) : digits;
}

export function chunk<T>(arr: T[], size: number): T[][] {
  if (size < 1) throw new Error("chunk size must be >= 1");
  const out: T[][] = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

/** Simple sliding-window rate limiter (per-process; use Redis in production). */
export function createRateLimiter(maxHits: number, windowMs: number) {
  const hits = new Map<string, number[]>();
  return (key: string): boolean => {
    const now = Date.now();
    const windowStart = now - windowMs;
    const list = (hits.get(key) ?? []).filter((t) => t > windowStart);
    if (list.length >= maxHits) {
      hits.set(key, list);
      return false;
    }
    list.push(now);
    hits.set(key, list);
    return true;
  };
}
