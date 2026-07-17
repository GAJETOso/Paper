import { NextResponse } from "next/server";

interface ContactPayload {
  name?: string;
  email?: string;
  message?: string;
  topic?: string;
  company?: string;
  phone?: string;
  category?: string;
}

/**
 * Contact/quotation intake endpoint.
 * Validates, then forwards to the CRM service when CRM_URL is configured;
 * otherwise logs (useful for local dev and static demos).
 */
export async function POST(req: Request) {
  let body: ContactPayload;
  try {
    body = (await req.json()) as ContactPayload;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { name, email, message } = body;
  if (!name?.trim() || !email?.includes("@") || !message?.trim()) {
    return NextResponse.json({ error: "name, email, and message are required" }, { status: 422 });
  }
  if (message.length > 10_000) {
    return NextResponse.json({ error: "Message too long" }, { status: 422 });
  }

  const lead = {
    ...body,
    source: "website",
    receivedAt: new Date().toISOString(),
  };

  const crmUrl = process.env.CRM_URL;
  if (crmUrl) {
    const res = await fetch(`${crmUrl}/api/v1/leads`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(lead),
    });
    if (!res.ok) {
      return NextResponse.json({ error: "Upstream CRM error" }, { status: 502 });
    }
  } else {
    console.info("[contact] lead received", { name, email, topic: body.topic });
  }

  return NextResponse.json({ ok: true });
}
