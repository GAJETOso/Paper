import { PageHero } from "@/components/PageHero";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { Cta } from "@/components/Cta";
import { pageMetadata } from "@/lib/seo";
import { certifications } from "@/data/company";

export const metadata = pageMetadata({
  title: "Quality Assurance & Certifications",
  description:
    "FSC, PEFC, ISO 9001/14001/45001/50001, EU Ecolabel, BRCGS AA, EN 13432 compostability, EcoVadis Platinum — Sylvara's quality and certification framework.",
  path: "/quality",
});

export default function QualityPage() {
  return (
    <>
      <PageHero
        eyebrow="Quality assurance"
        title="Certified at every step"
        lead="Quality is measured in microns, verified by third parties, and guaranteed contractually. Every reel and carton is traceable to its fiber source."
        crumbs={[{ label: "Quality & Certifications" }]}
      />
      {/* Quality Policy */}
      <section className="container-site py-20">
        <Reveal>
          <div className="card mx-auto max-w-4xl !bg-forest-700 !text-white dark:!bg-forest-800">
            <p className="eyebrow !text-forest-200">Quality Policy</p>
            <p className="mt-4 text-lg leading-relaxed sm:text-xl">
              Sylvara Paper Group delivers paper, packaging, and tissue products that meet or exceed
              customer specifications and every applicable regulatory requirement — on every reel,
              every carton, every time. We achieve this through ISO 9001-certified quality
              management systems at all 42 mills, full fiber-to-shipment traceability, statistical
              process control on every machine, and the standing authority of any employee to stop
              production over a quality concern. We measure our performance publicly, correct root
              causes rather than symptoms, and hold suppliers to the same standard we hold
              ourselves.
            </p>
            <p className="mt-6 text-sm text-forest-200">
              Approved by the Group Quality Council · Reviewed annually · Effective across all
              mills, converting plants, and distribution centers group-wide
            </p>
          </div>
        </Reveal>
      </section>

      <section className="container-site pb-20">
        <SectionHeading eyebrow="Certifications" title="Independently verified, group-wide" />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {certifications.map((c, i) => (
            <Reveal key={c.name} delay={(i % 3) * 80}>
              <div className="card card-hover flex h-full items-start gap-4">
                <span
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-forest-100 text-xl dark:bg-forest-900"
                  aria-hidden
                >
                  ✅
                </span>
                <div>
                  <h2 className="font-semibold">{c.name}</h2>
                  <p className="text-sm text-forest-600 dark:text-forest-400">{c.code}</p>
                  <p className="prose-muted mt-1 text-sm">{c.scope}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
      <section className="border-t border-paper-200 bg-paper-50 py-20 dark:border-ink-800 dark:bg-ink-950">
        <div className="container-site">
          <SectionHeading eyebrow="Quality system" title="How we guarantee every tonne" />
          <div className="mt-12 grid gap-5 md:grid-cols-4">
            {[
              {
                t: "Inline measurement",
                d: "Scanning sensors check basis weight, moisture, and caliper 200×/second across the web.",
              },
              {
                t: "Lab verification",
                d: "Every reel sampled: tensile, burst, brightness, and food-safety migration testing.",
              },
              {
                t: "Traceability",
                d: "QR-coded units trace to machine, shift, fiber batch, and forest of origin.",
              },
              {
                t: "Customer guarantee",
                d: "Documented CoA with every shipment; claims resolved in 5 business days.",
              },
            ].map((x, i) => (
              <Reveal key={x.t} delay={i * 80}>
                <div className="card h-full">
                  <p className="text-2xl font-semibold text-forest-600 dark:text-forest-400">
                    {i + 1}
                  </p>
                  <h3 className="mt-2 font-semibold">{x.t}</h3>
                  <p className="prose-muted mt-1.5 text-sm">{x.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <Cta />
    </>
  );
}
