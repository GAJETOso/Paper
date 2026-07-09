import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { Cta } from "@/components/Cta";
import { pageMetadata } from "@/lib/seo";
import { categories, totalProducts } from "@/data/products";

export const metadata = pageMetadata({
  title: `Products — ${totalProducts}+ Paper & Packaging Products`,
  description:
    "Browse the complete Sylvara catalog: printing papers, packaging papers, corrugated boxes, retail bags, food packaging, tissue, education, office, publishing, industrial, agriculture, eco, and custom products.",
  path: "/products",
  keywords: ["paper products catalog", "packaging supplier", "buy kraft paper", "wholesale tissue"],
});

export default function ProductsPage() {
  return (
    <>
      <PageHero
        eyebrow="Product catalog"
        title={`${totalProducts}+ products across the entire paper value chain`}
        lead="Every product is FSC/PEFC-certified or recycled, designed for recyclability, and available with custom branding. Press ⌘K anywhere to search."
        crumbs={[{ label: "Products" }]}
      />
      <section className="container-site py-20">
        <div className="space-y-16">
          {categories.map((c, i) => (
            <Reveal key={c.slug} delay={Math.min(i * 40, 200)}>
              <div id={c.slug} className="scroll-mt-24">
                <div className="flex flex-wrap items-end justify-between gap-4">
                  <div>
                    <h2 className="flex items-center gap-3 text-2xl font-semibold">
                      <span aria-hidden>{c.icon}</span> {c.name}
                    </h2>
                    <p className="prose-muted mt-1">{c.tagline}</p>
                  </div>
                  <Link
                    href={`/products/${c.slug}`}
                    className="text-sm font-medium text-forest-600 hover:underline dark:text-forest-400"
                  >
                    View category ({c.products.length}) →
                  </Link>
                </div>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {c.products.map((p) => (
                    <li key={p.slug}>
                      <Link
                        href={`/products/${c.slug}/${p.slug}`}
                        className="inline-block rounded-full border border-paper-200 px-3.5 py-1.5 text-sm text-ink-700 transition-all hover:border-forest-400 hover:bg-forest-50 hover:text-forest-700 dark:border-ink-800 dark:text-ink-300 dark:hover:bg-forest-950 dark:hover:text-forest-300"
                      >
                        {p.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
      <Cta />
    </>
  );
}
