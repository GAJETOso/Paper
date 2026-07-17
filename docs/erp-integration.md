# ERP & CRM Integration

`services/erp` is the integration layer; adapters normalize SAP, Oracle, and
Microsoft Dynamics into one contract so internal services never speak
vendor dialects.

## Patterns

- **Outbound** (orders → ERP): transactional outbox on `Order` state changes,
  delivered with retries and idempotency keys
- **Inbound** (stock/pricing ← ERP): scheduled pulls + webhook subscriptions
  where the ERP supports them, upserted into `StockItem`/`ProductVariant`
- **Master data**: ERP is the system of record for SKUs and prices; the
  platform is the system of record for leads, conversations, and content

## Configured connectors

| System          | Env vars                               | Notes                                   |
| --------------- | -------------------------------------- | --------------------------------------- |
| SAP S/4HANA     | `SAP_BASE_URL`, `SAP_CLIENT_ID/SECRET` | OData v4, OAuth2 client credentials     |
| Oracle Fusion   | `ORACLE_ERP_BASE_URL`                  | REST resources                          |
| MS Dynamics 365 | `DYNAMICS_TENANT_ID`                   | Dataverse Web API                       |
| Salesforce      | `SALESFORCE_CLIENT_ID/SECRET`          | CRM sync (leads/opportunities)          |
| HubSpot         | `HUBSPOT_ACCESS_TOKEN`                 | Lead mirroring (live in `services/crm`) |
| Zoho CRM        | `ZOHO_CRM_TOKEN`                       | Lead mirroring                          |

Manufacturing execution (MES), production planning, Power BI datasets, and
IoT ingestion (OPC-UA → `MachineTelemetry`) are v2.5 roadmap items with
schema support already in place.
