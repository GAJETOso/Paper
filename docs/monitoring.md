# Monitoring & Observability

## Stack

| Concern           | Tool                                       | Integration point                                                               |
| ----------------- | ------------------------------------------ | ------------------------------------------------------------------------------- |
| Metrics           | Prometheus (+ Grafana dashboards)          | `PROMETHEUS_METRICS_PORT`; scrape `/metrics` (roadmap: prom-client in services) |
| Traces            | OpenTelemetry → OTLP                       | `OTEL_EXPORTER_OTLP_ENDPOINT`                                                   |
| Errors            | Sentry                                     | `SENTRY_DSN` in website + services                                              |
| Uptime            | `/health` + `/api/health` on every process | K8s probes, deploy smoke test                                                   |
| Sessions          | Microsoft Clarity heatmaps/recordings      | consent-gated loader in `packages/analytics`                                    |
| Product analytics | GA4, Meta/LinkedIn/TikTok pixels           | consent-gated                                                                   |

## Golden signals & alerts

- Availability: probe failures > 2 in 5 min → page
- Latency: p95 > 500 ms on website routes (k6 threshold mirrors this)
- Errors: 5xx rate > 1% over 10 min
- Saturation: HPA at max replicas for > 15 min

## Business dashboards

Sales (orders, quote→order conversion, channel mix), Manufacturing (machine
status from `MachineTelemetry`), Sustainability (live snapshot API),
Customer (chat volume, handover rate, CSAT). Grafana JSON models ship in v2.
