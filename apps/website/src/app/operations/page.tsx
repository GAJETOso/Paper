import { PageHero } from "@/components/PageHero";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { WorldMap } from "@/components/WorldMap";
import { Cta } from "@/components/Cta";
import { pageMetadata } from "@/lib/seo";
import { regions } from "@/data/company";

export const metadata = pageMetadata({
  title: "Global Operations — Mills, Factories & Production Plants",
  description:
    "42 mills and production plants across 8 regions on 6 continents: pulp, paper machines, converting, corrugated, and tissue plants serving 140+ countries.",
  path: "/operations",
});

export default function OperationsPage() {
  return (
    <>
      <PageHero
        eyebrow="Global operations"
        title="42 mills. 14.6M tonnes. 6 continents."
        lead="Integrated pulp and paper mills, converting plants, and corrugated box factories located close to fiber, energy, and customers."
        crumbs={[{ label: "Global Operations" }]}
      />

      <section className="container-site py-20">
        <Reveal>
          <WorldMap />
        </Reveal>
      </section>

      <section className="border-t border-paper-200 bg-paper-50 py-20 dark:border-ink-800 dark:bg-ink-950">
        <div className="container-site">
          <SectionHeading eyebrow="Regions" title="Where we make it" />
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {regions.map((r, i) => (
              <Reveal key={r.name} delay={(i % 4) * 80}>
                <div className="card card-hover h-full">
                  <h3 className="font-semibold">{r.name}</h3>
                  <p className="mt-1 text-sm text-forest-600 dark:text-forest-400">HQ {r.hq}</p>
                  <dl className="prose-muted mt-3 space-y-1 text-sm">
                    <div className="flex justify-between">
                      <dt>Mills & plants</dt>
                      <dd className="font-medium text-ink-800 dark:text-ink-200">{r.mills}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt>Capacity</dt>
                      <dd className="font-medium text-ink-800 dark:text-ink-200">
                        {r.capacityMt}M t/yr
                      </dd>
                    </div>
                  </dl>
                  <p className="mt-3 text-sm">{r.focus}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="container-site py-20">
        <SectionHeading
          eyebrow="Inside a Sylvara mill"
          title="Engineering at paper speed"
          lead="Our newest machines run 10.2 meters wide at 2,000 meters per minute — a sheet of paper longer than 100 football pitches every hour."
        />
        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {[
            {
              t: "31 paper machines",
              d: "From tissue TAD machines to containerboard giants, tuned by AI process control for 6% lower energy per tonne.",
            },
            {
              t: "9 pulp lines",
              d: "Kraft and BCTMP with 98% chemical recovery; black liquor makes our largest mills energy-positive.",
            },
            {
              t: "56 converting lines",
              d: "Bag machines, box plants, cup formers, tissue winders, and molded-fiber tooling — many lights-out overnight.",
            },
          ].map((x, i) => (
            <Reveal key={x.t} delay={i * 90}>
              <div className="card card-hover h-full">
                <h3 className="text-lg font-semibold text-forest-700 dark:text-forest-300">
                  {x.t}
                </h3>
                <p className="prose-muted mt-2 text-sm">{x.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <Cta />
    </>
  );
}
