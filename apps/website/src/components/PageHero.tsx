import { Reveal } from "@/components/Reveal";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export function PageHero({
  eyebrow,
  title,
  lead,
  crumbs,
}: {
  eyebrow: string;
  title: string;
  lead?: string;
  crumbs?: { label: string; href?: string }[];
}) {
  return (
    <section className="soft-gradient border-b border-paper-200 dark:border-ink-800">
      <div className="container-site py-16 sm:py-20">
        {crumbs && (
          <Reveal>
            <Breadcrumbs items={crumbs} />
          </Reveal>
        )}
        <Reveal delay={80}>
          <p className="eyebrow mt-6">{eyebrow}</p>
        </Reveal>
        <Reveal delay={160}>
          <h1 className="h1 mt-4 max-w-4xl">{title}</h1>
        </Reveal>
        {lead && (
          <Reveal delay={240}>
            <p className="prose-muted mt-5 max-w-2xl text-lg">{lead}</p>
          </Reveal>
        )}
      </div>
    </section>
  );
}
