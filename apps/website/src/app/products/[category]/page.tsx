import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { Cta } from "@/components/Cta";
import { pageMetadata } from "@/lib/seo";
import { categories, getCategory } from "@/data/products";

export function generateStaticParams() {
  return categories.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const c = getCategory(category);
  if (!c) return {};
  return pageMetadata({
    title: `${c.name} — ${c.products.length} Products`,
    description: c.description,
    path: `/products/${c.slug}`,
  });
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const c = getCategory(category);
  if (!c) notFound();

  return (
    <>
      <PageHero
        eyebrow={`${c.icon} Product category`}
        title={c.name}
        lead={c.description}
        crumbs={[{ label: "Products", href: "/products" }, { label: c.name }]}
      />
      <section className="container-site py-20">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {c.products.map((p, i) => (
            <Reveal key={p.slug} delay={(i % 3) * 70}>
              <Link
                href={`/products/${c.slug}/${p.slug}`}
                className="card card-hover group flex h-full flex-col"
              >
                <h2 className="text-lg font-semibold group-hover:text-forest-700 dark:group-hover:text-forest-300">
                  {p.name}
                </h2>
                <p className="prose-muted mt-2 flex-1 text-sm">{p.blurb}</p>
                <p className="mt-4 text-sm font-medium text-forest-600 dark:text-forest-400">
                  Specifications & quote →
                </p>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
      <Cta title={`Need a custom ${c.name.toLowerCase().replace(/s$/, "")} solution?`} />
    </>
  );
}
