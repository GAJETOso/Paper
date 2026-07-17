import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { SectionHeading } from "@/components/SectionHeading";
import { WorldMap } from "@/components/WorldMap";
import { ValueChainFlow } from "@/components/ValueChainFlow";
import { Cta } from "@/components/Cta";
import { stats, industries } from "@/data/company";
import { categories, totalProducts } from "@/data/products";
import { esgHeadline } from "@/data/sustainability";
import { articles } from "@/data/news";

export default function HomePage() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="soft-gradient relative overflow-hidden">
        <div className="container-site grid min-h-[calc(100vh-4rem)] items-center gap-12 py-16 lg:grid-cols-2">
          <div>
            <Reveal>
              <p className="eyebrow">Global paper manufacturing · est. 1962</p>
            </Reveal>
            <Reveal delay={100}>
              <h1 className="h1 mt-5">
                From forest <span className="gradient-text">to future.</span>
              </h1>
            </Reveal>
            <Reveal delay={200}>
              <p className="prose-muted mt-6 max-w-xl text-lg">
                Sylvara manufactures {totalProducts}+ paper products — printing papers, packaging,
                tissue, and plastic-replacing eco innovations — across 42 mills on 6 continents, on
                a science-based path to net zero by 2040.
              </p>
            </Reveal>
            <Reveal delay={300}>
              <div className="mt-9 flex flex-wrap gap-3">
                <Link href="/products" className="btn-primary">
                  Explore products
                </Link>
                <Link href="/sustainability" className="btn-secondary">
                  Our net-zero path
                </Link>
              </div>
            </Reveal>
            <Reveal delay={400}>
              <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-ink-500">
                <span>FSC® & PEFC certified</span>
                <span>ISO 9001 · 14001 · 45001</span>
                <span>EcoVadis Platinum</span>
              </div>
            </Reveal>
          </div>

          {/* 3D-style layered paper illustration (pure CSS/SVG) */}
          <Reveal delay={250} className="relative hidden lg:block">
            <div className="relative mx-auto aspect-square max-w-md" aria-hidden>
              <div className="glass absolute left-8 top-6 h-72 w-56 rotate-[-8deg] rounded-2xl" />
              <div className="glass absolute left-20 top-16 h-72 w-56 rotate-[4deg] rounded-2xl !bg-forest-100/70 dark:!bg-forest-900/40" />
              <div className="glass absolute left-32 top-28 flex h-72 w-56 rotate-[14deg] animate-float items-center justify-center rounded-2xl !bg-white/80 text-7xl dark:!bg-ink-900/80">
                🌲
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Animated statistics band ─────────────────────────────────── */}
      <section className="border-y border-paper-200 bg-white dark:border-ink-800 dark:bg-ink-950">
        <div className="container-site grid grid-cols-2 gap-8 py-14 sm:grid-cols-3 lg:grid-cols-6">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 80} className="text-center">
              <p className="text-3xl font-semibold text-forest-700 dark:text-forest-300 sm:text-4xl">
                <AnimatedCounter value={s.value} suffix={s.suffix} decimals={s.decimals ?? 0} />
              </p>
              <p className="mt-1 text-xs text-ink-500 sm:text-sm">{s.label}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── Product categories ───────────────────────────────────────── */}
      <section className="container-site py-24">
        <SectionHeading
          eyebrow="Complete catalog"
          title="Every paper product imaginable"
          lead={`${totalProducts}+ products in 13 categories — from 28 GSM bible paper to triple-wall industrial packaging, molded-fiber bottles to luxury retail bags.`}
        />
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((c, i) => (
            <Reveal key={c.slug} delay={(i % 3) * 90}>
              <Link href={`/products/${c.slug}`} className="card card-hover group block h-full">
                <span className="text-3xl" aria-hidden>
                  {c.icon}
                </span>
                <h3 className="mt-4 text-lg font-semibold group-hover:text-forest-700 dark:group-hover:text-forest-300">
                  {c.name}
                </h3>
                <p className="prose-muted mt-2 text-sm">{c.tagline}</p>
                <p className="mt-4 text-sm font-medium text-forest-600 dark:text-forest-400">
                  {c.products.length} products →
                </p>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── Value chain ──────────────────────────────────────────────── */}
      <section className="border-y border-paper-200 bg-paper-50 py-24 dark:border-ink-800 dark:bg-ink-950">
        <div className="container-site">
          <SectionHeading
            eyebrow="The circular journey"
            title="23 stages. One closed loop."
            lead="Follow a fiber from certified forest through pulp, paper machine, converting, retail, and back through recycling — up to seven lives per fiber."
          />
          <Reveal className="mt-12">
            <ValueChainFlow />
          </Reveal>
        </div>
      </section>

      {/* ── Sustainability preview ───────────────────────────────────── */}
      <section className="container-site py-24">
        <SectionHeading
          eyebrow="Sustainability"
          title="Net zero by 2040. Verified, not promised."
          lead="Science-based targets, live metrics, and third-party assurance — because leadership means showing the numbers."
        />
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {esgHeadline.slice(0, 4).map((m, i) => (
            <Reveal key={m.label} delay={i * 90}>
              <div className="card card-hover h-full text-center">
                <p className="text-4xl font-semibold text-forest-700 dark:text-forest-300">
                  <AnimatedCounter value={m.value} suffix={m.suffix ?? ""} format={m.format} />
                </p>
                <p className="mt-2 font-medium">{m.label}</p>
                <p className="prose-muted mt-1 text-xs">{m.detail}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-10 text-center">
          <Link href="/sustainability" className="btn-secondary">
            Open the full ESG dashboard →
          </Link>
        </Reveal>
      </section>

      {/* ── Global operations map ────────────────────────────────────── */}
      <section className="border-y border-paper-200 bg-white py-24 dark:border-ink-800 dark:bg-ink-950">
        <div className="container-site">
          <SectionHeading
            eyebrow="Global operations"
            title="42 mills. 8 regions. 140+ countries served."
            lead="Hover any region to see its mills, capacity, and specialization."
          />
          <Reveal className="mx-auto mt-12 max-w-4xl">
            <WorldMap />
          </Reveal>
        </div>
      </section>

      {/* ── Industries ───────────────────────────────────────────────── */}
      <section className="container-site py-24">
        <SectionHeading eyebrow="Industries served" title="One partner for every sector" />
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {industries.map((ind, i) => (
            <Reveal key={ind.name} delay={(i % 4) * 70}>
              <div className="card card-hover h-full">
                <span className="text-2xl" aria-hidden>
                  {ind.icon}
                </span>
                <h3 className="mt-3 font-semibold">{ind.name}</h3>
                <p className="prose-muted mt-1.5 text-sm">{ind.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── Latest news ──────────────────────────────────────────────── */}
      <section className="border-t border-paper-200 bg-paper-50 py-24 dark:border-ink-800 dark:bg-ink-950">
        <div className="container-site">
          <SectionHeading eyebrow="Newsroom" title="Latest from Sylvara" />
          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {articles.slice(0, 3).map((a, i) => (
              <Reveal key={a.slug} delay={i * 90}>
                <Link href={`/media#${a.slug}`} className="card card-hover group block h-full">
                  <p className="eyebrow !text-[10px]">{a.category}</p>
                  <h3 className="mt-3 font-semibold leading-snug group-hover:text-forest-700 dark:group-hover:text-forest-300">
                    {a.title}
                  </h3>
                  <p className="prose-muted mt-2 text-sm">{a.excerpt}</p>
                  <time className="mt-4 block text-xs text-ink-500" dateTime={a.date}>
                    {new Date(a.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Cta />
    </>
  );
}
