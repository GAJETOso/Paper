import type { Metadata } from "next";
import { company } from "@/data/company";

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://sylvara.com";

/** Builds consistent per-page metadata: canonical, Open Graph, Twitter cards. */
export function pageMetadata(opts: {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
}): Metadata {
  const url = `${SITE_URL}${opts.path}`;
  return {
    title: opts.title,
    description: opts.description,
    keywords: opts.keywords,
    alternates: { canonical: url },
    openGraph: {
      title: opts.title,
      description: opts.description,
      url,
      siteName: company.name,
      type: "website",
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: opts.title,
      description: opts.description,
    },
  };
}

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: company.name,
  legalName: company.legalName,
  url: SITE_URL,
  foundingDate: String(company.founded),
  slogan: company.tagline,
  description: company.description,
  email: company.email,
  telephone: company.phone,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Helsinki",
    addressCountry: "FI",
  },
  sameAs: [
    "https://www.linkedin.com/company/sylvara",
    "https://twitter.com/sylvarapaper",
    "https://www.youtube.com/@sylvarapaper",
  ],
  numberOfEmployees: { "@type": "QuantitativeValue", value: 68000 },
};
