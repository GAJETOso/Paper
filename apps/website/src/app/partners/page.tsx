import { PageHero } from "@/components/PageHero";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { pageMetadata } from "@/lib/seo";
import Link from "next/link";

export const metadata = pageMetadata({
  title: "Partners — Distributors & Suppliers",
  description:
    "Become a Sylvara distributor or supplier: tiered pricing, territory support, portal access, sustainability scorecards, and long-term contracts.",
  path: "/partners",
});

export default function PartnersPage() {
  return (
    <>
      <PageHero
        eyebrow="Partners"
        title="Grow with the fiber network"
        lead="1,400 distributors and 6,200 suppliers already work with Sylvara. Here's how to join them."
        crumbs={[{ label: "Partners" }]}
      />

      <section id="distributor" className="container-site scroll-mt-24 py-20">
        <div className="grid items-start gap-10 lg:grid-cols-2">
          <Reveal>
            <div>
              <SectionHeading
                eyebrow="Become a distributor"
                title="Sell the world's most trusted paper brands"
                align="left"
              />
              <ul className="prose-muted mt-6 space-y-3 text-sm">
                {[
                  "Protected territories with volume-tiered pricing",
                  "Distributor portal: live inventory, ordering, invoices, marketing assets",
                  "Co-op marketing funds and launch support",
                  "Training and certification through Sylvara Academy",
                  "WhatsApp/Telegram ordering for your own customers",
                ].map((x) => (
                  <li key={x} className="flex gap-2">
                    <span className="text-forest-500" aria-hidden>
                      ✓
                    </span>{" "}
                    {x}
                  </li>
                ))}
              </ul>
              <Link href="/contact?topic=distributor" className="btn-primary mt-8">
                Apply to distribute
              </Link>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="card">
              <h3 className="font-semibold">Application requirements</h3>
              <ol className="prose-muted mt-3 list-inside list-decimal space-y-2 text-sm">
                <li>Company registration and trade references</li>
                <li>Target territory and product categories</li>
                <li>Warehouse and logistics capabilities</li>
                <li>Sales team profile and existing customer base</li>
                <li>Response within 5 business days</li>
              </ol>
            </div>
          </Reveal>
        </div>
      </section>

      <section
        id="suppliers"
        className="scroll-mt-24 border-t border-paper-200 bg-paper-50 py-20 dark:border-ink-800 dark:bg-ink-950"
      >
        <div className="container-site grid items-start gap-10 lg:grid-cols-2">
          <Reveal>
            <div>
              <SectionHeading
                eyebrow="Suppliers"
                title="Supply a company that pays fairly and audits honestly"
                align="left"
              />
              <ul className="prose-muted mt-6 space-y-3 text-sm">
                {[
                  "Categories: fiber, chemicals, energy, logistics, machinery, services",
                  "Supplier portal: RFQs, POs, invoicing, compliance documents",
                  "30-day payment terms, living-wage supply chain commitment",
                  "Sustainability scorecard with improvement support — not just gates",
                ].map((x) => (
                  <li key={x} className="flex gap-2">
                    <span className="text-forest-500" aria-hidden>
                      ✓
                    </span>{" "}
                    {x}
                  </li>
                ))}
              </ul>
              <Link href="/contact?topic=supplier" className="btn-primary mt-8">
                Register as supplier
              </Link>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="card">
              <h3 className="font-semibold">Supplier scorecard dimensions</h3>
              <div className="mt-4 space-y-3">
                {[
                  ["Quality & delivery", 92],
                  ["Environmental performance", 88],
                  ["Labor & human rights", 95],
                  ["Innovation contribution", 74],
                  ["Cost competitiveness", 81],
                ].map(([label, v]) => (
                  <div key={label as string}>
                    <div className="flex justify-between text-sm">
                      <span>{label}</span>
                      <span className="text-ink-500">avg {v}%</span>
                    </div>
                    <div className="mt-1 h-2 rounded-full bg-paper-200 dark:bg-ink-800">
                      <div className="h-2 rounded-full bg-forest-500" style={{ width: `${v}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
