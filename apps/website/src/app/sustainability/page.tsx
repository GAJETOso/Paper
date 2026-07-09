import { PageHero } from "@/components/PageHero";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { NetZeroChart } from "@/components/NetZeroChart";
import { Cta } from "@/components/Cta";
import { pageMetadata } from "@/lib/seo";
import { esgHeadline, pillars, reports } from "@/data/sustainability";
import Link from "next/link";

export const metadata = pageMetadata({
  title: "Sustainability & ESG — Net Zero 2040, Circular Economy, Live Metrics",
  description:
    "Sylvara's ESG dashboard: 47% emissions cut since 2019, 83% renewable energy, 61% recycled fiber, 212M trees planted, 96% waste diversion, and an SBTi-validated net-zero 2040 pathway.",
  path: "/sustainability",
  keywords: [
    "ESG paper industry",
    "net zero paper manufacturer",
    "circular economy packaging",
    "FSC certified supplier",
  ],
});

export default function SustainabilityPage() {
  return (
    <>
      <PageHero
        eyebrow="Sustainability & ESG"
        title="The dashboard we run the company by"
        lead="Live, assured, and public. These are the same metrics our board reviews — updated from mill systems, verified annually to ISAE 3000."
        crumbs={[{ label: "Sustainability" }]}
      />

      {/* ESG headline dashboard */}
      <section className="container-site py-20">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {esgHeadline.map((m, i) => (
            <Reveal key={m.label} delay={(i % 4) * 80}>
              <div className="card card-hover h-full">
                <p className="text-3xl font-semibold text-forest-700 dark:text-forest-300 sm:text-4xl">
                  <AnimatedCounter value={m.value} suffix={m.suffix ?? ""} format={m.format} />
                </p>
                <p className="mt-2 font-medium">{m.label}</p>
                <p className="prose-muted mt-1 text-xs">{m.detail}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Net zero chart */}
      <section
        id="climate"
        className="scroll-mt-24 border-y border-paper-200 bg-white py-20 dark:border-ink-800 dark:bg-ink-950"
      >
        <div className="container-site">
          <SectionHeading
            eyebrow="Climate strategy"
            title="Net zero by 2040 — the trajectory"
            lead="47% down already. The remaining path is funded, engineered, and scheduled: fossil-free lime kilns, electrified drying, 100% renewable power by 2032."
          />
          <Reveal className="mx-auto mt-12 max-w-3xl">
            <NetZeroChart />
          </Reveal>
        </div>
      </section>

      {/* Six pillars */}
      <section id="circular" className="container-site scroll-mt-24 py-20">
        <SectionHeading eyebrow="Six pillars" title="How sustainability is organized" />
        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {pillars.map((p, i) => (
            <Reveal key={p.title} delay={(i % 3) * 90}>
              <div className="card card-hover h-full">
                <span className="text-3xl" aria-hidden>
                  {p.icon}
                </span>
                <h3 className="mt-3 text-lg font-semibold">{p.title}</h3>
                <ul className="prose-muted mt-3 space-y-2 text-sm">
                  {p.points.map((pt) => (
                    <li key={pt} className="flex gap-2">
                      <span className="mt-1 text-forest-500" aria-hidden>
                        ▪
                      </span>
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Reports */}
      <section
        id="reports"
        className="scroll-mt-24 border-t border-paper-200 bg-paper-50 py-20 dark:border-ink-800 dark:bg-ink-950"
      >
        <div className="container-site">
          <SectionHeading
            eyebrow="Reports & disclosures"
            title="Read the audited detail"
            lead="ESG reports, CSR reports, annual sustainability reports, and supplier scorecard methodology."
          />
          <div className="mx-auto mt-12 max-w-2xl space-y-3">
            {reports.map((r, i) => (
              <Reveal key={r.title} delay={i * 60}>
                <Link
                  href={r.href}
                  className="card card-hover flex items-center justify-between gap-4 !py-4"
                >
                  <span className="flex items-center gap-3">
                    <span aria-hidden>📄</span>
                    <span className="font-medium">{r.title}</span>
                  </span>
                  <span className="shrink-0 text-xs text-ink-500">
                    {r.type} · {r.size}
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Cta
        title="Want your own sustainability dashboard?"
        lead="Customers get per-order carbon, water, and recycled-content reporting through the customer portal."
      />
    </>
  );
}
