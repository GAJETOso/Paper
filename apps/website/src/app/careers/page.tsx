import { PageHero } from "@/components/PageHero";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { Cta } from "@/components/Cta";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Careers — Join 68,000 People Making Paper Matter",
  description:
    "Careers at Sylvara: engineering, operations, R&D, sustainability, commercial, and digital roles across 42 sites on 6 continents.",
  path: "/careers",
});

const openings = [
  { role: "Paper Machine Superintendent", loc: "Memphis, USA", type: "Operations" },
  { role: "Barrier Coating Scientist", loc: "Singapore", type: "R&D" },
  { role: "Sustainability Data Analyst", loc: "Helsinki, Finland", type: "ESG" },
  { role: "Corrugated Sales Engineer", loc: "Vienna, Austria", type: "Commercial" },
  { role: "Converting Plant Manager", loc: "Lagos, Nigeria", type: "Operations" },
  { role: "Senior Full-Stack Engineer (Platform)", loc: "Remote / Helsinki", type: "Digital" },
  { role: "Forestry & Biodiversity Lead", loc: "São Paulo, Brazil", type: "Forestry" },
  { role: "Supply Chain Planner", loc: "Dubai, UAE", type: "Logistics" },
];

export default function CareersPage() {
  return (
    <>
      <PageHero
        eyebrow="Careers"
        title="Do work that regrows"
        lead="From paper machine control rooms to AI labs — build a career in the world's most renewable industry."
        crumbs={[{ label: "Careers" }]}
      />
      <section className="container-site py-20">
        <SectionHeading eyebrow="Why Sylvara" title="What we offer" />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { t: "Zero-harm safety", d: "TRIR down 64% since 2018 — safety is our first KPI." },
            { t: "Global mobility", d: "42 sites, 6 continents, structured rotation programs." },
            { t: "Learning", d: "Sylvara Academy: 40 hours paid learning per person per year." },
            { t: "Impact", d: "Your work ships in products used by a billion people." },
          ].map((b, i) => (
            <Reveal key={b.t} delay={i * 80}>
              <div className="card card-hover h-full">
                <h3 className="font-semibold">{b.t}</h3>
                <p className="prose-muted mt-2 text-sm">{b.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
      <section className="border-t border-paper-200 bg-paper-50 py-20 dark:border-ink-800 dark:bg-ink-950">
        <div className="container-site">
          <SectionHeading eyebrow="Open roles" title="Current openings" />
          <div className="mx-auto mt-12 max-w-3xl space-y-3">
            {openings.map((o, i) => (
              <Reveal key={o.role} delay={i * 50}>
                <a
                  href="mailto:careers@sylvara.com"
                  className="card card-hover flex flex-wrap items-center justify-between gap-3 !py-4"
                >
                  <span>
                    <span className="block font-medium">{o.role}</span>
                    <span className="text-sm text-ink-500">{o.loc}</span>
                  </span>
                  <span className="rounded-full bg-forest-100 px-3 py-1 text-xs font-semibold text-forest-700 dark:bg-forest-900 dark:text-forest-300">
                    {o.type}
                  </span>
                </a>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-8 text-center">
            <p className="prose-muted text-sm">
              Don&apos;t see your role? Send an open application to{" "}
              <a href="mailto:careers@sylvara.com" className="text-forest-600 underline">
                careers@sylvara.com
              </a>
            </p>
          </Reveal>
        </div>
      </section>
      <Cta
        title="Ready to grow with us?"
        lead="Applications acknowledged within 48 hours; interview loops complete in three weeks."
      />
    </>
  );
}
