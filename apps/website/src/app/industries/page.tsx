import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { Cta } from "@/components/Cta";
import { pageMetadata } from "@/lib/seo";
import { industries } from "@/data/company";

export const metadata = pageMetadata({
  title: "Industries Served",
  description:
    "Paper and packaging solutions for e-commerce, food & beverage, retail, healthcare, education, publishing, agriculture, hospitality, industry, construction, FMCG, and NGOs.",
  path: "/industries",
});

export default function IndustriesPage() {
  return (
    <>
      <PageHero
        eyebrow="Industries served"
        title="Twelve sectors. One fiber partner."
        lead="B2B, B2C, governments, NGOs, hospitals, hotels, publishers, and manufacturers — each with dedicated account teams and sector-specific compliance."
        crumbs={[{ label: "Industries" }]}
      />
      <section className="container-site py-20">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {industries.map((ind, i) => (
            <Reveal key={ind.name} delay={(i % 3) * 90}>
              <div className="card card-hover h-full">
                <span className="text-3xl" aria-hidden>
                  {ind.icon}
                </span>
                <h2 className="mt-4 text-lg font-semibold">{ind.name}</h2>
                <p className="prose-muted mt-2 text-sm">{ind.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
      <Cta />
    </>
  );
}
