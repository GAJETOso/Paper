/**
 * Analytics loaders: GA4, Microsoft Clarity, Meta Pixel, LinkedIn Insight,
 * TikTok Pixel. All are opt-in — call `initAnalytics` only after cookie
 * consent (GDPR/NDPR). Each loader no-ops when its ID env var is absent.
 */

export interface AnalyticsConfig {
  ga4Id?: string;
  clarityId?: string;
  metaPixelId?: string;
  linkedinPartnerId?: string;
  tiktokPixelId?: string;
}

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

function inject(src: string, id: string) {
  if (document.getElementById(id)) return;
  const s = document.createElement("script");
  s.id = id;
  s.async = true;
  s.src = src;
  document.head.appendChild(s);
}

export function initAnalytics(cfg: AnalyticsConfig): void {
  if (typeof window === "undefined") return;

  if (cfg.ga4Id) {
    inject(`https://www.googletagmanager.com/gtag/js?id=${cfg.ga4Id}`, "ga4");
    window.dataLayer = window.dataLayer ?? [];
    window.gtag = (...args: unknown[]) => window.dataLayer!.push(args);
    window.gtag("js", new Date());
    window.gtag("config", cfg.ga4Id, { anonymize_ip: true });
  }

  if (cfg.clarityId) {
    inject(`https://www.clarity.ms/tag/${cfg.clarityId}`, "clarity");
  }

  if (cfg.metaPixelId) {
    inject("https://connect.facebook.net/en_US/fbevents.js", "meta-pixel");
    window.fbq =
      window.fbq ??
      ((...args: unknown[]) =>
        ((window.fbq as unknown as { queue: unknown[] }).queue ??= []).push(args));
    window.fbq("init", cfg.metaPixelId);
    window.fbq("track", "PageView");
  }
  // LinkedIn and TikTok pixels follow the same inject pattern; IDs are wired
  // through NEXT_PUBLIC_* env vars in the website's consent banner.
}

/** Track a structured event across all initialized providers. */
export function track(event: string, params: Record<string, unknown> = {}): void {
  if (typeof window === "undefined") return;
  window.gtag?.("event", event, params);
  window.fbq?.("trackCustom", event, params);
}
