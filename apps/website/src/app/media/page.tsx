import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { Cta } from "@/components/Cta";
import { pageMetadata } from "@/lib/seo";
import { articles } from "@/data/news";

export const metadata = pageMetadata({
  title: "Media — News, Press Releases & Blog",
  description:
    "Latest news from Sylvara Paper Group: press releases, investor news, innovation stories, and sustainability updates.",
  path: "/media",
});

export default function MediaPage() {
  return (
    <>
      <PageHero
        eyebrow="Newsroom"
        title="News, stories & press"
        lead="Press inquiries: press@sylvara.com · Brand assets available in Downloads."
        crumbs={[{ label: "Media" }]}
      />
      <section className="container-site py-20">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((a, i) => (
            <Reveal key={a.slug} delay={(i % 3) * 80}>
              <article id={a.slug} className="card card-hover flex h-full scroll-mt-24 flex-col">
                <p className="eyebrow !text-[10px]">{a.category}</p>
                <h2 className="mt-3 font-semibold leading-snug">{a.title}</h2>
                <p className="prose-muted mt-2 flex-1 text-sm">{a.excerpt}</p>
                <time className="mt-4 text-xs text-ink-500" dateTime={a.date}>
                  {new Date(a.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
              </article>
            </Reveal>
          ))}
        </div>
      </section>
      <Cta
        title="Journalist on deadline?"
        lead="Our press office responds within two hours on business days."
      />
    </>
  );
}
