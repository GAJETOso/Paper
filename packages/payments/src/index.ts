/**
 * Payment adapters behind one interface: Stripe (global cards), Paystack
 * (NGN/GHS), Flutterwave (pan-African). Each adapter creates a hosted
 * checkout/payment link — the platform never touches raw card data (PCI SAQ-A).
 */

export interface PaymentRequest {
  amountMinor: number; // cents/kobo
  currency: string;
  reference: string; // our Payment.reference
  customerEmail: string;
  description: string;
  successUrl: string;
  cancelUrl: string;
}

export interface PaymentLink {
  provider: "stripe" | "paystack" | "flutterwave";
  url: string;
  reference: string;
}

export interface PaymentProvider {
  createLink(req: PaymentRequest): Promise<PaymentLink>;
}

export const stripeProvider: PaymentProvider = {
  async createLink(req) {
    const key = required("STRIPE_SECRET_KEY");
    const body = new URLSearchParams({
      mode: "payment",
      "line_items[0][price_data][currency]": req.currency.toLowerCase(),
      "line_items[0][price_data][unit_amount]": String(req.amountMinor),
      "line_items[0][price_data][product_data][name]": req.description,
      "line_items[0][quantity]": "1",
      client_reference_id: req.reference,
      customer_email: req.customerEmail,
      success_url: req.successUrl,
      cancel_url: req.cancelUrl,
    });
    const res = await fetch("https://api.stripe.com/v1/checkout/sessions", {
      method: "POST",
      headers: {
        authorization: `Bearer ${key}`,
        "content-type": "application/x-www-form-urlencoded",
      },
      body,
    });
    if (!res.ok) throw new Error(`Stripe error ${res.status}: ${await res.text()}`);
    const session = (await res.json()) as { url: string };
    return { provider: "stripe", url: session.url, reference: req.reference };
  },
};

export const paystackProvider: PaymentProvider = {
  async createLink(req) {
    const key = required("PAYSTACK_SECRET_KEY");
    const res = await fetch("https://api.paystack.co/transaction/initialize", {
      method: "POST",
      headers: { authorization: `Bearer ${key}`, "content-type": "application/json" },
      body: JSON.stringify({
        email: req.customerEmail,
        amount: req.amountMinor,
        currency: req.currency,
        reference: req.reference,
        callback_url: req.successUrl,
      }),
    });
    if (!res.ok) throw new Error(`Paystack error ${res.status}: ${await res.text()}`);
    const data = (await res.json()) as { data: { authorization_url: string } };
    return { provider: "paystack", url: data.data.authorization_url, reference: req.reference };
  },
};

export const flutterwaveProvider: PaymentProvider = {
  async createLink(req) {
    const key = required("FLUTTERWAVE_SECRET_KEY");
    const res = await fetch("https://api.flutterwave.com/v3/payments", {
      method: "POST",
      headers: { authorization: `Bearer ${key}`, "content-type": "application/json" },
      body: JSON.stringify({
        tx_ref: req.reference,
        amount: req.amountMinor / 100,
        currency: req.currency,
        redirect_url: req.successUrl,
        customer: { email: req.customerEmail },
        customizations: { title: "Sylvara Paper Group", description: req.description },
      }),
    });
    if (!res.ok) throw new Error(`Flutterwave error ${res.status}: ${await res.text()}`);
    const data = (await res.json()) as { data: { link: string } };
    return { provider: "flutterwave", url: data.data.link, reference: req.reference };
  },
};

/** Picks the best provider for a currency; extend with routing rules as needed. */
export function providerFor(currency: string): PaymentProvider {
  if (currency === "NGN" || currency === "GHS") return paystackProvider;
  if (["KES", "UGX", "TZS", "XOF", "ZAR"].includes(currency)) return flutterwaveProvider;
  return stripeProvider;
}

function required(name: string): string {
  const v = process.env[name];
  if (!v) throw new Error(`${name} is not configured`);
  return v;
}
