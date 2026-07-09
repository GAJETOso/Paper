import Link from "next/link";
import { Reveal } from "@/components/Reveal";

export function Cta({
  title = "Let's build something remarkable in paper.",
  lead = "Quotations within one business hour. Free structural design consultation. Delivery to 140+ countries.",
}: {
  title?: string;
  lead?: string;
}) {
  return (
    <section className="container-site py-20">
      <Reveal>
        <div className="soft-gradient relative overflow-hidden rounded-3xl border border-paper-200 p-10 text-center sm:p-16 dark:border-ink-800">
          <h2 className="h2 mx-auto max-w-2xl">{title}</h2>
          <p className="prose-muted mx-auto mt-4 max-w-xl">{lead}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/contact" className="btn-primary">
              Request a quotation
            </Link>
            <Link href="/products" className="btn-secondary">
              Explore 200+ products
            </Link>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
