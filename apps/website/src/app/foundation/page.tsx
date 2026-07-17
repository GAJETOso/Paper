import { PageHero } from "@/components/PageHero";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { Cta } from "@/components/Cta";
import { pageMetadata } from "@/lib/seo";
import { foundationPrograms } from "@/data/sustainability";

export const metadata = pageMetadata({
  title: "Sylvara Foundation — Education, Community & Environment",
  description:
    "The Sylvara Foundation reaches 3.2M people: school notebook donations, tree planting, sanitation, scholarships, women's empowerment, youth entrepreneurship, libraries, recycling awareness, healthcare, and disaster relief.",
  path: "/foundation",
});

export default function FoundationPage() {
  return (
    <>
      <PageHero
        eyebrow="Sylvara Foundation"
        title="Profit with purpose, at scale"
        lead="1% of group revenue funds programs where we operate — designed with communities, measured like factories, reported like financials."
        crumbs={[{ label: "Foundation" }]}
      />
      <section id="programs" className="container-site scroll-mt-24 py-20">
        <SectionHeading
          eyebrow="Programs"
          title="Twelve initiatives, one goal: thriving communities"
        />
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {foundationPrograms.map((p, i) => (
            <Reveal key={p.title} delay={(i % 3) * 80}>
              <div className="card card-hover flex h-full flex-col">
                <span className="text-3xl" aria-hidden>
                  {p.icon}
                </span>
                <h2 className="mt-3 font-semibold">{p.title}</h2>
                <p className="mt-1 text-sm font-medium text-forest-600 dark:text-forest-400">
                  {p.impact}
                </p>
                <p className="prose-muted mt-2 flex-1 text-sm">{p.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
      <Cta
        title="Partner with the Foundation"
        lead="NGOs, ministries, and community organizations: co-design a program with us."
      />
    </>
  );
}
