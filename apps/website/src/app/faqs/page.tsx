import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { JsonLd } from "@/components/JsonLd";
import { Cta } from "@/components/Cta";
import { pageMetadata } from "@/lib/seo";
import { faqs } from "@/data/faqs";

export const metadata = pageMetadata({
  title: "FAQs — Products, Ordering, Sustainability & Partnerships",
  description:
    "Answers to the most common questions about Sylvara products, GSM ranges, MOQs, quotations, international shipping, sustainability certifications, and becoming a distributor or supplier.",
  path: "/faqs",
});

const topics = ["Products", "Ordering", "Sustainability", "Company", "Partners"] as const;

export default function FaqsPage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <JsonLd data={faqJsonLd} />
      <PageHero
        eyebrow="FAQs"
        title="Frequently asked questions"
        lead="Direct answers, optimized for humans and answer engines alike. Can't find it? Ask the AI assistant or our team."
        crumbs={[{ label: "FAQs" }]}
      />
      <section className="container-site max-w-4xl py-20">
        {topics.map((topic) => (
          <div key={topic} className="mb-12">
            <Reveal>
              <h2 className="eyebrow mb-4">{topic}</h2>
            </Reveal>
            <div className="space-y-3">
              {faqs
                .filter((f) => f.topic === topic)
                .map((f, i) => (
                  <Reveal key={f.q} delay={i * 50}>
                    <details className="card group">
                      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium marker:hidden">
                        {f.q}
                        <span
                          className="shrink-0 text-forest-600 transition-transform duration-300 group-open:rotate-45"
                          aria-hidden
                        >
                          +
                        </span>
                      </summary>
                      <p className="prose-muted mt-3 text-sm">{f.a}</p>
                    </details>
                  </Reveal>
                ))}
            </div>
          </div>
        ))}
      </section>
      <Cta title="Still have questions?" />
    </>
  );
}
