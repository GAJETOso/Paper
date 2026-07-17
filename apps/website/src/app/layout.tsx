import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import { organizationJsonLd, SITE_URL } from "@/lib/seo";
import { company } from "@/data/company";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${company.name} — Sustainable Paper, Packaging & Tissue Manufacturer`,
    template: `%s | ${company.name}`,
  },
  description: company.description,
  keywords: [
    "paper manufacturer",
    "sustainable packaging",
    "corrugated boxes",
    "tissue manufacturer",
    "kraft paper supplier",
    "printing paper",
    "eco packaging",
    "paper mill",
  ],
  applicationName: company.name,
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    siteName: company.name,
    locale: "en_US",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fbfaf7" },
    { media: "(prefers-color-scheme: dark)", color: "#0c120f" },
  ],
  width: "device-width",
  initialScale: 1,
};

/** Applies persisted or system theme before first paint to avoid flash. */
const themeScript = `
try {
  var t = localStorage.getItem("sylvara-theme");
  if (t === "dark" || (!t && matchMedia("(prefers-color-scheme: dark)").matches)) {
    document.documentElement.classList.add("dark");
  }
} catch (e) {}
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <JsonLd data={organizationJsonLd} />
      </head>
      <body className="font-sans">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-forest-600 focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to main content
        </a>
        <Header />
        <main id="main" className="pt-16">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
