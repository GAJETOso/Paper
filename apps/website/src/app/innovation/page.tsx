import { PageHero } from "@/components/PageHero";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { Cta } from "@/components/Cta";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Innovation, Research Center & Technology",
  description:
    "Sylvara's Singapore R&D hub and mill-embedded labs: paper bottles, PFAS-free barriers, molded fiber, honeycomb structures, AI process control, and IoT-monitored machines.",
  path: "/innovation",
});

const labs = [
  {
    t: "Barrier Science Lab",
    d: "Aqueous dispersion coatings that replace PE and PFAS — repulpable, compostable, food-safe.",
    tag: "34 patents",
  },
  {
    t: "Molded Fiber Studio",
    d: "Rapid tooling for paper bottles, protective packaging, and product geometries that used to require plastic.",
    tag: "5-day prototypes",
  },
  {
    t: "Fiber Futures Group",
    d: "Agricultural residues, bamboo, and recycled blends — qualifying tomorrow's furnish today.",
    tag: "12 pilot furnishes",
  },
  {
    t: "AI Process Control",
    d: "Machine-learning optimization across 31 paper machines: −6% energy, +2.1% first-pass yield.",
    tag: "Live at 28 mills",
  },
  {
    t: "IoT & Predictive Maintenance",
    d: "48,000 sensors stream to our digital twin; bearing failures predicted 3 weeks ahead.",
    tag: "99.1% uptime",
  },
  {
    t: "Circular Design Lab",
    d: "Every new product certified repulpable before launch; customers co-design in 3D.",
    tag: "100% repulpable",
  },
];

export default function InnovationPage() {
  return (
    <>
      <PageHero
        eyebrow="Innovation & research"
        title="Where paper does what plastic can't"
        lead="€180M annual R&D across a global research center in Singapore and labs embedded in every region."
        crumbs={[{ label: "Innovation" }]}
      />
      <section className="container-site py-20">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {labs.map((l, i) => (
            <Reveal key={l.t} delay={(i % 3) * 90}>
              <div className="card card-hover flex h-full flex-col">
                <span className="self-start rounded-full bg-forest-100 px-3 py-1 text-xs font-semibold text-forest-700 dark:bg-forest-900 dark:text-forest-300">
                  {l.tag}
                </span>
                <h2 className="mt-4 text-lg font-semibold">{l.t}</h2>
                <p className="prose-muted mt-2 text-sm">{l.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
      <section className="border-t border-paper-200 bg-paper-50 py-20 dark:border-ink-800 dark:bg-ink-950">
        <div className="container-site">
          <SectionHeading
            eyebrow="Open innovation"
            title="Partner with our research center"
            lead="Universities, startups, and customers run joint programs on our pilot machines. Bring us a plastic package — we'll return it in paper."
          />
        </div>
      </section>
      <Cta
        title="Have a material challenge?"
        lead="Our research center takes on 40 customer development projects a year."
      />
    </>
  );
}
