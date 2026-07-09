import { PageHero } from "@/components/PageHero";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { Cta } from "@/components/Cta";
import { pageMetadata } from "@/lib/seo";
import { company, leadership, timeline } from "@/data/company";

export const metadata = pageMetadata({
  title: "About Us — History, Mission, Vision & Leadership",
  description:
    "Sylvara Paper Group: founded 1962 in Finland, now a global leader in sustainable paper manufacturing with 42 mills, 68,000 employees, and customers in 140+ countries.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Sylvara"
        title="Six decades of making paper matter"
        lead={company.description}
        crumbs={[{ label: "About" }]}
      />

      {/* Mission & Vision */}
      <section id="mission" className="container-site scroll-mt-24 py-20">
        <div className="grid gap-6 md:grid-cols-2">
          <Reveal>
            <div className="card h-full !bg-forest-700 !text-white dark:!bg-forest-800">
              <p className="eyebrow !text-forest-200">Our mission</p>
              <p className="mt-4 text-2xl font-medium leading-snug">
                To transform renewable fiber into products the world needs — profitably, circularly,
                and without costing the Earth a single ancient tree.
              </p>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="card h-full">
              <p className="eyebrow">Our vision</p>
              <p className="mt-4 text-2xl font-medium leading-snug">
                A world where every package, page, and tissue regenerates forests, empowers
                communities, and leaves plastic behind.
              </p>
            </div>
          </Reveal>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-3">
          {[
            { t: "Integrity", d: "We publish our numbers — audited, assured, and on time." },
            {
              t: "Stewardship",
              d: "Every decision is priced against its carbon and community impact.",
            },
            {
              t: "Craft",
              d: "From 28 GSM bible paper to 10-meter paper machines: precision is culture.",
            },
          ].map((v, i) => (
            <Reveal key={v.t} delay={i * 90}>
              <div className="card card-hover h-full text-center">
                <h3 className="font-semibold">{v.t}</h3>
                <p className="prose-muted mt-2 text-sm">{v.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* History timeline */}
      <section
        id="history"
        className="scroll-mt-24 border-y border-paper-200 bg-paper-50 py-20 dark:border-ink-800 dark:bg-ink-950"
      >
        <div className="container-site">
          <SectionHeading eyebrow="Our history" title="1962 → today" />
          <div className="relative mx-auto mt-14 max-w-3xl">
            <div
              className="absolute bottom-0 left-[7px] top-0 w-px bg-forest-300 dark:bg-forest-800"
              aria-hidden
            />
            <ol className="space-y-8">
              {timeline.map((t, i) => (
                <Reveal key={t.year} delay={Math.min(i * 60, 300)}>
                  <li className="relative pl-10">
                    <span
                      className="absolute left-0 top-1.5 h-4 w-4 rounded-full border-2 border-forest-600 bg-white dark:bg-ink-950"
                      aria-hidden
                    />
                    <p className="text-sm font-semibold text-forest-700 dark:text-forest-300">
                      {t.year}
                    </p>
                    <p className="prose-muted mt-1">{t.event}</p>
                  </li>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section id="leadership" className="container-site scroll-mt-24 py-20">
        <SectionHeading
          eyebrow="Leadership"
          title="The team behind the tonnage"
          lead="Operators, scientists, and builders — accountable to shareholders, communities, and the forests we manage."
        />
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {leadership.map((p, i) => (
            <Reveal key={p.name} delay={(i % 4) * 80}>
              <div className="card card-hover h-full">
                <div
                  className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-forest-500 to-paper-500 text-lg font-semibold text-white"
                  aria-hidden
                >
                  {p.name
                    .split(" ")
                    .map((w) => w[0])
                    .join("")
                    .slice(0, 2)}
                </div>
                <h3 className="mt-4 font-semibold">{p.name}</h3>
                <p className="text-sm text-forest-600 dark:text-forest-400">{p.role}</p>
                <p className="prose-muted mt-2 text-sm">{p.bio}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <Cta />
    </>
  );
}
