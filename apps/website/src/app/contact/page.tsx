import { Suspense } from "react";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { ContactForm } from "@/components/ContactForm";
import { pageMetadata } from "@/lib/seo";
import { company, regions } from "@/data/company";

export const metadata = pageMetadata({
  title: "Contact — Quotations, Sales & Regional Offices",
  description:
    "Contact Sylvara Paper Group: request a quotation online, via WhatsApp or Telegram, or reach any of our 8 regional offices.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Quotes in an hour. Answers in minutes."
        lead="Tell us what you need — a pallet or a program. Our regional teams reply in your language and time zone."
        crumbs={[{ label: "Contact" }]}
      />
      <section className="container-site grid gap-10 py-20 lg:grid-cols-5">
        <Reveal className="lg:col-span-3">
          <Suspense fallback={<div className="card animate-pulse">Loading form…</div>}>
            <ContactForm />
          </Suspense>
        </Reveal>
        <Reveal delay={120} className="lg:col-span-2">
          <div className="space-y-4">
            <div className="card">
              <h2 className="font-semibold">Instant channels</h2>
              <div className="mt-4 flex flex-col gap-2.5">
                <a
                  href={`https://wa.me/${company.whatsapp.replace(/\D/g, "")}`}
                  className="btn-primary w-full"
                >
                  💬 WhatsApp quotation bot
                </a>
                <a href={`https://t.me/${company.telegram}`} className="btn-secondary w-full">
                  ✈️ Telegram bot
                </a>
                <a href={`mailto:${company.email}`} className="btn-secondary w-full">
                  ✉️ {company.email}
                </a>
              </div>
            </div>
            <div className="card">
              <h2 className="font-semibold">Regional offices</h2>
              <ul className="prose-muted mt-3 space-y-2 text-sm">
                {regions.map((r) => (
                  <li key={r.name} className="flex justify-between gap-3">
                    <span>{r.name}</span>
                    <span className="text-right text-ink-500">{r.hq}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="card">
              <h2 className="font-semibold">Headquarters</h2>
              <p className="prose-muted mt-2 text-sm">
                {company.legalName}
                <br />
                Fiber House, Kanavaranta 1<br />
                00160 {company.headquarters}
                <br />
                {company.phone}
              </p>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
