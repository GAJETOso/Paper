"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { SearchDialog } from "@/components/SearchDialog";
import { categories } from "@/data/products";

interface MenuColumn {
  heading: string;
  links: { label: string; href: string }[];
}

interface MenuItem {
  label: string;
  href: string;
  columns?: MenuColumn[];
}

const menu: MenuItem[] = [
  {
    label: "Products",
    href: "/products",
    columns: [
      {
        heading: "Papers & Print",
        links: categories.slice(0, 4).map((c) => ({ label: c.name, href: `/products/${c.slug}` })),
      },
      {
        heading: "Packaging & Hygiene",
        links: categories.slice(4, 8).map((c) => ({ label: c.name, href: `/products/${c.slug}` })),
      },
      {
        heading: "Specialty & Custom",
        links: categories.slice(8, 13).map((c) => ({ label: c.name, href: `/products/${c.slug}` })),
      },
      {
        heading: "Explore",
        links: [
          { label: "All products", href: "/products" },
          { label: "Industries served", href: "/industries" },
          { label: "Calculators & tools", href: "/tools" },
          { label: "Request a quote", href: "/contact" },
        ],
      },
    ],
  },
  {
    label: "Company",
    href: "/about",
    columns: [
      {
        heading: "About",
        links: [
          { label: "Our story & history", href: "/about" },
          { label: "Mission & vision", href: "/about#mission" },
          { label: "Leadership", href: "/about#leadership" },
          { label: "Careers", href: "/careers" },
        ],
      },
      {
        heading: "Operations",
        links: [
          { label: "Global operations & mills", href: "/operations" },
          { label: "The value chain", href: "/value-chain" },
          { label: "Quality & certifications", href: "/quality" },
          { label: "Innovation & research", href: "/innovation" },
        ],
      },
      {
        heading: "Partners",
        links: [
          { label: "Become a distributor", href: "/partners#distributor" },
          { label: "Suppliers", href: "/partners#suppliers" },
          { label: "Investor relations", href: "/investors" },
          { label: "Downloads", href: "/downloads" },
        ],
      },
    ],
  },
  {
    label: "Sustainability",
    href: "/sustainability",
    columns: [
      {
        heading: "Planet",
        links: [
          { label: "ESG dashboard", href: "/sustainability" },
          { label: "Climate strategy & net zero", href: "/sustainability#climate" },
          { label: "Circular economy", href: "/sustainability#circular" },
          { label: "Recycling", href: "/value-chain#circular" },
        ],
      },
      {
        heading: "People",
        links: [
          { label: "Sylvara Foundation", href: "/foundation" },
          { label: "Community programs", href: "/foundation#programs" },
          { label: "Reports & disclosures", href: "/sustainability#reports" },
        ],
      },
    ],
  },
  { label: "Media", href: "/media" },
  { label: "Support", href: "/support" },
];

/** Sticky glassmorphism header with mega menu, AI search, and theme toggle. */
export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "glass shadow-glass" : "bg-transparent"
      }`}
      onMouseLeave={() => setOpen(null)}
    >
      <div className="container-site flex h-16 items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2.5" aria-label="Sylvara home">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-forest-600 text-lg text-white shadow-glass">
            🌲
          </span>
          <span className="text-lg font-semibold tracking-tight">
            Sylvara<span className="text-forest-600 dark:text-forest-400"> Paper</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {menu.map((item) => (
            <div key={item.label} className="relative" onMouseEnter={() => setOpen(item.label)}>
              <Link
                href={item.href}
                className="rounded-full px-4 py-2 text-sm font-medium text-ink-700 transition-colors hover:bg-paper-100 hover:text-forest-700 dark:text-ink-300 dark:hover:bg-ink-900 dark:hover:text-forest-300"
                aria-expanded={item.columns ? open === item.label : undefined}
              >
                {item.label}
                {item.columns && (
                  <span aria-hidden className="ml-1 text-[10px]">
                    ▾
                  </span>
                )}
              </Link>
            </div>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <SearchDialog />
          <ThemeToggle />
          <Link href="/contact" className="btn-primary hidden !px-5 !py-2.5 sm:inline-flex">
            Get a quote
          </Link>
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-paper-200 text-xl dark:border-ink-800 lg:hidden"
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* Mega menu panel */}
      {menu.map(
        (item) =>
          item.columns &&
          open === item.label && (
            <div
              key={item.label}
              className="glass absolute inset-x-0 top-16 hidden border-t border-paper-200/50 lg:block dark:border-ink-800/50"
            >
              <div className="container-site grid grid-cols-4 gap-8 py-8">
                {item.columns.map((col) => (
                  <div key={col.heading}>
                    <p className="eyebrow mb-3">{col.heading}</p>
                    <ul className="space-y-2">
                      {col.links.map((link) => (
                        <li key={link.href + link.label}>
                          <Link
                            href={link.href}
                            className="text-sm text-ink-700 transition-colors hover:text-forest-600 dark:text-ink-300 dark:hover:text-forest-400"
                            onClick={() => setOpen(null)}
                          >
                            {link.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          ),
      )}

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="glass max-h-[80vh] overflow-y-auto border-t border-paper-200/50 lg:hidden dark:border-ink-800/50">
          <nav className="container-site flex flex-col gap-1 py-4" aria-label="Mobile">
            {menu.map((item) => (
              <div key={item.label}>
                <Link
                  href={item.href}
                  className="block rounded-lg px-3 py-2.5 text-base font-medium"
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </Link>
                {item.columns
                  ?.flatMap((c) => c.links)
                  .map((link) => (
                    <Link
                      key={link.href + link.label}
                      href={link.href}
                      className="block rounded-lg px-6 py-1.5 text-sm text-ink-600 dark:text-ink-400"
                      onClick={() => setMobileOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ))}
              </div>
            ))}
            <Link href="/contact" className="btn-primary mt-3" onClick={() => setMobileOpen(false)}>
              Get a quote
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
