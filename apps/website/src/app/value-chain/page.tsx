import { PageHero } from "@/components/PageHero";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { ValueChainFlow } from "@/components/ValueChainFlow";
import { Cta } from "@/components/Cta";
import { pageMetadata } from "@/lib/seo";
import { valueChain } from "@/data/value-chain";

export const metadata = pageMetadata({
  title: "The Value Chain — Forest to Recycled Fiber in 23 Stages",
  description:
    "Follow Sylvara's complete circular value chain: forest management, nurseries, harvesting, pulp, paper machines, coating, printing, converting, distribution, retail, collection, sorting, recycling, and repulping into new products.",
  path: "/value-chain",
});

const phases = ["Forest", "Production", "Market", "Circular"] as const;

export default function ValueChainPage() {
  return (
    <>
      <PageHero
        eyebrow="The value chain"
        title="One fiber. Seven lives. Zero waste."
        lead="Complete vertical integration from seedling to recycled sheet — every stage measured, certified, and continuously improved."
        crumbs={[{ label: "Value Chain" }]}
      />

      <section className="container-site py-20">
        <Reveal>
          <ValueChainFlow />
        </Reveal>
      </section>

      {phases.map((phase, pi) => (
        <section
          key={phase}
          id={phase.toLowerCase()}
          className={`scroll-mt-24 py-20 ${pi % 2 === 0 ? "border-y border-paper-200 bg-paper-50 dark:border-ink-800 dark:bg-ink-950" : ""}`}
        >
          <div className="container-site">
            <SectionHeading
              eyebrow={`Phase ${pi + 1} of 4`}
              title={`${phase} phase`}
              align="left"
            />
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {valueChain
                .filter((s) => s.phase === phase)
                .map((s, i) => (
                  <Reveal key={s.name} delay={(i % 3) * 80}>
                    <div className="card card-hover h-full">
                      <p className="text-xs font-semibold text-forest-600 dark:text-forest-400">
                        Stage {valueChain.indexOf(s) + 1}
                      </p>
                      <h3 className="mt-1 font-semibold">{s.name}</h3>
                      <p className="prose-muted mt-2 text-sm">{s.desc}</p>
                    </div>
                  </Reveal>
                ))}
            </div>
          </div>
        </section>
      ))}

      <Cta />
    </>
  );
}
