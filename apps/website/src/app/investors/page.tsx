import { PageHero } from "@/components/PageHero";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { pageMetadata } from "@/lib/seo";
import { articles } from "@/data/news";
import Link from "next/link";

export const metadata = pageMetadata({
  title: "Investor Relations",
  description:
    "Sylvara Paper Group investor relations: financial highlights, reports, green bonds, governance, and the investor portal.",
  path: "/investors",
});

const kpis = [
  { label: "Revenue 2025", value: 11.8, suffix: "B€", decimals: 1 },
  { label: "EBITDA margin", value: 19.4, suffix: "%", decimals: 1 },
  { label: "Net debt / EBITDA", value: 1.4, suffix: "x", decimals: 1 },
  { label: "Green bonds issued", value: 2.4, suffix: "B€", decimals: 1 },
  { label: "Dividend yield", value: 3.8, suffix: "%", decimals: 1 },
  { label: "Eco line growth YoY", value: 38, suffix: "%" },
];

export default function InvestorsPage() {
  return (
    <>
      <PageHero
        eyebrow="Investor relations"
        title="Compounding fiber, cash flow, and impact"
        lead="Sylvara Paper Group Plc — long-term value from the world's most renewable industrial material."
        crumbs={[{ label: "Investor Relations" }]}
      />
      <section className="container-site py-20">
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-6">
          {kpis.map((k, i) => (
            <Reveal key={k.label} delay={i * 70} className="text-center">
              <div className="card h-full">
                <p className="text-2xl font-semibold text-forest-700 dark:text-forest-300">
                  <AnimatedCounter value={k.value} suffix={k.suffix} decimals={k.decimals ?? 0} />
                </p>
                <p className="mt-1 text-xs text-ink-500">{k.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
      <section className="border-y border-paper-200 bg-paper-50 py-20 dark:border-ink-800 dark:bg-ink-950">
        <div className="container-site grid gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="Investor news" title="Latest announcements" align="left" />
            <div className="mt-8 space-y-3">
              {articles
                .filter((a) => a.category === "Investor News")
                .map((a) => (
                  <Reveal key={a.slug}>
                    <Link href={`/media#${a.slug}`} className="card card-hover block !py-4">
                      <p className="font-medium">{a.title}</p>
                      <time className="text-xs text-ink-500" dateTime={a.date}>
                        {a.date}
                      </time>
                    </Link>
                  </Reveal>
                ))}
            </div>
          </div>
          <div>
            <SectionHeading eyebrow="Resources" title="Reports & governance" align="left" />
            <ul className="mt-8 space-y-3">
              {[
                "Annual Report 2025",
                "Q2 2026 Interim Report",
                "Green Bond Framework & Allocation Report",
                "Corporate Governance Statement",
                "Articles of Association",
                "Financial calendar & AGM materials",
              ].map((r, i) => (
                <Reveal key={r} delay={i * 50}>
                  <li>
                    <Link
                      href="/downloads"
                      className="card card-hover flex items-center gap-3 !py-4"
                    >
                      <span aria-hidden>📄</span>
                      <span className="font-medium">{r}</span>
                    </Link>
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </section>
      <section className="container-site py-16 text-center">
        <Reveal>
          <p className="prose-muted">
            Investor portal access for analysts and institutional investors:{" "}
            <a href="mailto:ir@sylvara.com" className="text-forest-600 underline">
              ir@sylvara.com
            </a>
          </p>
        </Reveal>
      </section>
    </>
  );
}
