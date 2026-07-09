import { NextResponse } from "next/server";

/** Liveness/readiness probe used by Kubernetes and the deploy smoke test. */
export function GET() {
  return NextResponse.json({
    status: "ok",
    service: "website",
    timestamp: new Date().toISOString(),
  });
}
