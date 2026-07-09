import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { pageMetadata } from "@/lib/seo";
import { company } from "@/data/company";
import Link from "next/link";

export const metadata = pageMetadata({
  title: "Customer Support & Live Chat",
  description:
    "Get help from Sylvara: AI assistant, live chat, WhatsApp, Telegram, phone, email, order tracking, complaints, and the knowledge base.",
  path: "/support",
});

const channels = [
  {
    icon: "🤖",
    t: "AI assistant",
    d: "Instant answers on products, orders, and specs — 24/7 in 14 languages.",
    href: "/faqs",
    cta: "Ask now",
  },
  {
    icon: "💬",
    t: "WhatsApp Business",
    d: "Catalog, quotations, PDF invoices, order tracking, human handover.",
    href: `https://wa.me/${company.whatsapp.replace(/\D/g, "")}`,
    cta: "Open WhatsApp",
  },
  {
    icon: "✈️",
    t: "Telegram",
    d: "@SylvaraBot — orders, documents, live delivery notifications.",
    href: `https://t.me/${company.telegram}`,
    cta: "Open Telegram",
  },
  {
    icon: "📞",
    t: "Phone",
    d: `${company.phone} — Mon–Fri 08:00–20:00 EET, regional lines on contact page.`,
    href: "/contact",
    cta: "All numbers",
  },
  {
    icon: "✉️",
    t: "Email",
    d: "support@sylvara.com — first response within 4 business hours.",
    href: "mailto:support@sylvara.com",
    cta: "Email us",
  },
  {
    icon: "📦",
    t: "Order tracking",
    d: "Track any shipment with your order number via portal, WhatsApp, or Telegram.",
    href: "/contact",
    cta: "Track order",
  },
];

export default function SupportPage() {
  return (
    <>
      <PageHero
        eyebrow="Customer support"
        title="Help, the way you prefer it"
        lead="Six channels, one promise: a real resolution, fast. Complaints are acknowledged in 4 hours and resolved in 5 business days."
        crumbs={[{ label: "Support" }]}
      />
      <section className="container-site py-20">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {channels.map((c, i) => (
            <Reveal key={c.t} delay={(i % 3) * 80}>
              <div className="card card-hover flex h-full flex-col">
                <span className="text-3xl" aria-hidden>
                  {c.icon}
                </span>
                <h2 className="mt-3 font-semibold">{c.t}</h2>
                <p className="prose-muted mt-2 flex-1 text-sm">{c.d}</p>
                <a
                  href={c.href}
                  className="mt-4 text-sm font-medium text-forest-600 hover:underline dark:text-forest-400"
                >
                  {c.cta} →
                </a>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-12">
          <div className="card !border-forest-200 !bg-forest-50 text-center dark:!border-forest-900 dark:!bg-forest-950">
            <h2 className="font-semibold text-forest-800 dark:text-forest-200">Knowledge base</h2>
            <p className="prose-muted mx-auto mt-2 max-w-xl text-sm">
              Technical datasheets, storage guidelines, printing recommendations, and
              troubleshooting guides for every product family.
            </p>
            <Link href="/faqs" className="btn-primary mt-5">
              Browse FAQs & guides
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
