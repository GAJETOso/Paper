/**
 * Auth primitives: JWT signing/verification (HS256, zero-dependency via
 * node:crypto), refresh-token rotation contract, RBAC guard, and TOTP 2FA.
 */
import { createHmac, randomBytes, timingSafeEqual } from "node:crypto";

// ── JWT (HS256) ──────────────────────────────────────────────────────────────

export interface JwtPayload {
  sub: string;
  role: "ADMIN" | "STAFF" | "CUSTOMER" | "DISTRIBUTOR" | "SUPPLIER" | "INVESTOR";
  org?: string;
  iat: number;
  exp: number;
}

const b64url = (b: Buffer | string) =>
  Buffer.from(b).toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");

export function signJwt(
  payload: Omit<JwtPayload, "iat" | "exp">,
  secret: string,
  ttlSeconds = 900,
): string {
  const now = Math.floor(Date.now() / 1000);
  const full: JwtPayload = { ...payload, iat: now, exp: now + ttlSeconds };
  const header = b64url(JSON.stringify({ alg: "HS256", typ: "JWT" }));
  const body = b64url(JSON.stringify(full));
  const sig = b64url(createHmac("sha256", secret).update(`${header}.${body}`).digest());
  return `${header}.${body}.${sig}`;
}

export function verifyJwt(token: string, secret: string): JwtPayload | null {
  const parts = token.split(".");
  if (parts.length !== 3) return null;
  const [header, body, sig] = parts as [string, string, string];
  const expected = b64url(createHmac("sha256", secret).update(`${header}.${body}`).digest());
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null;
  try {
    const payload = JSON.parse(Buffer.from(body, "base64").toString()) as JwtPayload;
    if (payload.exp < Math.floor(Date.now() / 1000)) return null;
    return payload;
  } catch {
    return null;
  }
}

// ── Refresh tokens (rotate on every use; store hash server-side) ────────────

export function generateRefreshToken(): string {
  return randomBytes(48).toString("base64url");
}

// ── RBAC ─────────────────────────────────────────────────────────────────────

const roleRank: Record<JwtPayload["role"], number> = {
  ADMIN: 100,
  STAFF: 80,
  DISTRIBUTOR: 40,
  SUPPLIER: 40,
  INVESTOR: 30,
  CUSTOMER: 20,
};

/** True if `actual` meets or exceeds the privilege of `required`. */
export function hasRole(actual: JwtPayload["role"], required: JwtPayload["role"]): boolean {
  return roleRank[actual] >= roleRank[required];
}

// ── TOTP (RFC 6238) for 2FA ──────────────────────────────────────────────────

function base32Decode(input: string): Buffer {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
  let bits = 0;
  let value = 0;
  const out: number[] = [];
  for (const ch of input.replace(/=+$/, "").toUpperCase()) {
    const idx = alphabet.indexOf(ch);
    if (idx === -1) continue;
    value = (value << 5) | idx;
    bits += 5;
    if (bits >= 8) {
      out.push((value >>> (bits - 8)) & 0xff);
      bits -= 8;
    }
  }
  return Buffer.from(out);
}

export function generateTotpSecret(): string {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
  return Array.from(randomBytes(20), (b) => alphabet[b % 32]).join("");
}

export function totpCode(secret: string, timeStepSeconds = 30, at = Date.now()): string {
  const counter = Math.floor(at / 1000 / timeStepSeconds);
  const buf = Buffer.alloc(8);
  buf.writeBigUInt64BE(BigInt(counter));
  const hmac = createHmac("sha1", base32Decode(secret)).update(buf).digest();
  const offset = hmac[hmac.length - 1]! & 0x0f;
  const code = (hmac.readUInt32BE(offset) & 0x7fffffff) % 1_000_000;
  return String(code).padStart(6, "0");
}

/** Verifies with ±1 time-step tolerance for clock drift. */
export function verifyTotp(secret: string, code: string, at = Date.now()): boolean {
  return [-1, 0, 1].some((step) => totpCode(secret, 30, at + step * 30_000) === code);
}
