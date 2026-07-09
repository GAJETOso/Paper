import Link from "next/link";
import { company } from "@/data/company";
import { categories } from "@/data/products";

const columns = [
  {
    heading: "Products",
    links: [
      ...categories.slice(0, 6).map((c) => ({ label: c.name, href: `/products/${c.slug}` })),
      { label: "All products →", href: "/products" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About & history", href: "/about" },
      { label: "Global operations", href: "/operations" },
      { label: "Value chain", href: "/value-chain" },
      { label: "Innovation", href: "/innovation" },
      { label: "Quality & certifications", href: "/quality" },
      { label: "Careers", href: "/careers" },
      { label: "Media & news", href: "/media" },
    ],
  },
  {
    heading: "Responsibility",
    links: [
      { label: "Sustainability & ESG", href: "/sustainability" },
      { label: "Sylvara Foundation", href: "/foundation" },
      { label: "Investor relations", href: "/investors" },
      { label: "Reports & downloads", href: "/downloads" },
    ],
  },
  {
    heading: "Connect",
    links: [
      { label: "Contact & quotations", href: "/contact" },
      { label: "Customer support", href: "/support" },
      { label: "Become a distributor", href: "/partners#distributor" },
      { label: "Suppliers", href: "/partners#suppliers" },
      { label: "FAQs", href: "/faqs" },
      { label: "Tools & calculators", href: "/tools" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-paper-200 bg-paper-50 dark:border-ink-800 dark:bg-ink-950">
      <div className="container-site grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-6">
        <div className="lg:col-span-2">
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-forest-600 text-lg text-white">
              🌲
            </span>
            <span className="text-lg font-semibold">Sylvara Paper Group</span>
          </div>
          <p className="prose-muted mt-4 max-w-xs text-sm">
            {company.tagline}. Sustainable paper, packaging, and tissue for 140+ countries —
            carbon-neutral by 2040.
          </p>
          <div className="mt-5 flex flex-wrap gap-2 text-sm">
            <a
              href={`https://wa.me/${company.whatsapp.replace(/\D/g, "")}`}
              className="rounded-full border border-forest-300 px-4 py-1.5 text-forest-700 transition-colors hover:bg-forest-50 dark:border-forest-800 dark:text-forest-300 dark:hover:bg-forest-950"
            >
              💬 WhatsApp
            </a>
            <a
              href={`https://t.me/${company.telegram}`}
              className="rounded-full border border-forest-300 px-4 py-1.5 text-forest-700 transition-colors hover:bg-forest-50 dark:border-forest-800 dark:text-forest-300 dark:hover:bg-forest-950"
            >
              ✈️ Telegram
            </a>
          </div>
        </div>
        {columns.map((col) => (
          <nav key={col.heading} aria-label={col.heading}>
            <p className="eyebrow mb-4">{col.heading}</p>
            <ul className="space-y-2.5">
              {col.links.map((l) => (
                <li key={l.href + l.label}>
                  <Link
                    href={l.href}
                    className="text-sm text-ink-600 transition-colors hover:text-forest-600 dark:text-ink-400 dark:hover:text-forest-400"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
      <div className="border-t border-paper-200 dark:border-ink-800">
        <div className="container-site flex flex-col items-center justify-between gap-3 py-6 text-xs text-ink-500 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {company.legalName}. All rights reserved.
          </p>
          <p className="flex gap-4">
            <span>FSC® C012345</span>
            <span>PEFC certified</span>
            <span>ISO 9001 · 14001 · 45001</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
