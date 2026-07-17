import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { JsonLd } from "@/components/JsonLd";
import { pageMetadata, SITE_URL } from "@/lib/seo";
import { categories, getProduct } from "@/data/products";

export function generateStaticParams() {
  return categories.flatMap((c) => c.products.map((p) => ({ category: c.slug, product: p.slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string; product: string }>;
}) {
  const { category, product } = await params;
  const hit = getProduct(category, product);
  if (!hit) return {};
  return pageMetadata({
    title: `${hit.product.name} — Manufacturer & Wholesale Supplier`,
    description: hit.product.blurb,
    path: `/products/${category}/${product}`,
  });
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ category: string; product: string }>;
}) {
  const { category, product } = await params;
  const hit = getProduct(category, product);
  if (!hit) notFound();
  const { category: c, product: p } = hit;

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: p.name,
    description: p.blurb,
    category: c.name,
    brand: { "@type": "Brand", name: "Sylvara" },
    manufacturer: { "@type": "Organization", name: "Sylvara Paper Group" },
    url: `${SITE_URL}/products/${c.slug}/${p.slug}`,
    offers: {
      "@type": "AggregateOffer",
      availability: "https://schema.org/InStock",
      priceCurrency: "USD",
      priceSpecification: {
        "@type": "PriceSpecification",
        price: "0",
        description: "Quotation-based B2B pricing",
      },
    },
  };

  return (
    <>
      <JsonLd data={productJsonLd} />
      <PageHero
        eyebrow={`${c.icon} ${c.name}`}
        title={p.name}
        lead={p.blurb}
        crumbs={[
          { label: "Products", href: "/products" },
          { label: c.name, href: `/products/${c.slug}` },
          { label: p.name },
        ]}
      />
      <section className="container-site grid gap-8 py-20 lg:grid-cols-3">
        <Reveal className="lg:col-span-2">
          <div className="space-y-6">
            <div className="card">
              <h2 className="font-semibold">Specifications</h2>
              <ul className="prose-muted mt-3 list-inside list-disc space-y-1.5 text-sm">
                {p.specs.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </div>
            <div className="card">
              <h2 className="font-semibold">Applications</h2>
              <div className="mt-3 flex flex-wrap gap-2">
                {p.applications.map((a) => (
                  <span
                    key={a}
                    className="rounded-full bg-paper-100 px-3 py-1 text-sm text-ink-700 dark:bg-ink-800 dark:text-ink-300"
                  >
                    {a}
                  </span>
                ))}
              </div>
            </div>
            <div className="card !border-forest-200 !bg-forest-50 dark:!border-forest-900 dark:!bg-forest-950">
              <h2 className="flex items-center gap-2 font-semibold text-forest-800 dark:text-forest-200">
                <span aria-hidden>🌱</span> Sustainability
              </h2>
              <p className="mt-2 text-sm text-forest-800/90 dark:text-forest-200/90">{p.eco}</p>
            </div>
          </div>
        </Reveal>
        <Reveal delay={120}>
          <aside className="card sticky top-24">
            <h2 className="font-semibold">Get a quotation</h2>
            <p className="prose-muted mt-2 text-sm">
              Standard quotes issued within one business hour. Custom specifications welcome.
            </p>
            <div className="mt-5 flex flex-col gap-2.5">
              <Link
                href={`/contact?product=${encodeURIComponent(p.name)}`}
                className="btn-primary w-full"
              >
                Request quote online
              </Link>
              <a
                href={`https://wa.me/15550107272?text=${encodeURIComponent(`Hello Sylvara, I'd like a quotation for: ${p.name}`)}`}
                className="btn-secondary w-full"
              >
                💬 Quote via WhatsApp
              </a>
              <a href="https://t.me/SylvaraBot" className="btn-secondary w-full">
                ✈️ Quote via Telegram
              </a>
            </div>
            <p className="mt-4 text-xs text-ink-500">
              Bulk, distributor, and government program pricing available.
            </p>
          </aside>
        </Reveal>
      </section>

      <section className="container-site pb-20">
        <h2 className="text-xl font-semibold">Related products</h2>
        <ul className="mt-4 flex flex-wrap gap-2">
          {c.products
            .filter((rp) => rp.slug !== p.slug)
            .slice(0, 8)
            .map((rp) => (
              <li key={rp.slug}>
                <Link
                  href={`/products/${c.slug}/${rp.slug}`}
                  className="inline-block rounded-full border border-paper-200 px-3.5 py-1.5 text-sm transition-all hover:border-forest-400 hover:bg-forest-50 dark:border-ink-800 dark:hover:bg-forest-950"
                >
                  {rp.name}
                </Link>
              </li>
            ))}
        </ul>
      </section>
    </>
  );
}
