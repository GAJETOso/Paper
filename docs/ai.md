# AI Integration

## Components

| Piece                       | Where   | Purpose                                                                                                              |
| --------------------------- | ------- | -------------------------------------------------------------------------------------------------------------------- |
| `packages/ai`               | shared  | Anthropic Messages client (fetch, no SDK), assistant system prompt, keyword fallback                                 |
| `apps/chatbot`              | service | Website live-chat API with rate limiting + handover detection                                                        |
| WhatsApp/Telegram fallbacks | bots    | Free-form messages answered by Claude                                                                                |
| ⌘K product finder           | website | Client-side fuzzy search over the 200+ product catalog (zero-latency; upgrade path: `services/search` + Meilisearch) |

## Configuration

```
ANTHROPIC_API_KEY=sk-ant-…
AI_DEFAULT_MODEL=claude-sonnet-5   # per-request override supported
```

## Behavior contract

The system prompt (see `packages/ai`) constrains the assistant to: catalog
accuracy, quotation data collection (product, quantity, destination, email),
multilingual replies, and explicit human handover on complaints. Every AI
surface has a non-AI fallback so the platform degrades gracefully without an
API key.

## AEO (Answer Engine Optimization)

Site content is structured for ChatGPT/Gemini/Claude/Perplexity/Copilot and
Google AI Overviews: FAQPage + Product + Organization JSON-LD, direct
question-answer copy in FAQs, stable canonical URLs, and a public
sustainability data API for citable live metrics.
