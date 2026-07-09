"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { allProducts } from "@/data/products";

/**
 * AI-style instant product finder: fuzzy-matches the 200+ product catalog
 * by name, category, and application keywords. Opens with ⌘K / Ctrl+K.
 */
export function SearchDialog() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen(true);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (q.length < 2) return [];
    const terms = q.split(/\s+/);
    return allProducts
      .map((p) => {
        const haystack =
          `${p.name} ${p.category} ${p.applications.join(" ")} ${p.blurb}`.toLowerCase();
        let score = 0;
        for (const t of terms) {
          if (p.name.toLowerCase().startsWith(t)) score += 5;
          else if (p.name.toLowerCase().includes(t)) score += 3;
          else if (haystack.includes(t)) score += 1;
          else return null;
        }
        return { p, score };
      })
      .filter((r): r is { p: (typeof allProducts)[number]; score: number } => r !== null)
      .sort((a, b) => b.score - a.score)
      .slice(0, 8)
      .map((r) => r.p);
  }, [query]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Search products (Ctrl+K)"
        className="flex h-10 items-center gap-2 rounded-full border border-paper-200 px-3.5 text-sm text-ink-500 transition-colors hover:bg-paper-100 dark:border-ink-800 dark:hover:bg-ink-900"
      >
        <span aria-hidden>🔎</span>
        <span className="hidden md:inline">Search…</span>
        <kbd className="hidden rounded border border-paper-200 px-1.5 text-[10px] dark:border-ink-700 md:inline">
          ⌘K
        </kbd>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[60] flex items-start justify-center bg-ink-950/40 p-4 pt-[12vh] backdrop-blur-sm"
          onClick={() => setOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Product search"
        >
          <div
            className="glass w-full max-w-xl rounded-2xl !bg-white/90 p-2 dark:!bg-ink-900/95"
            onClick={(e) => e.stopPropagation()}
          >
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Try “compostable coffee cups” or “A4 copy paper”…"
              className="w-full rounded-xl border-0 bg-transparent px-4 py-3 text-base outline-none placeholder:text-ink-400"
              aria-label="Search query"
            />
            {results.length > 0 && (
              <ul className="max-h-80 overflow-y-auto border-t border-paper-200 py-2 dark:border-ink-800">
                {results.map((p) => (
                  <li key={`${p.categorySlug}-${p.slug}`}>
                    <Link
                      href={`/products/${p.categorySlug}/${p.slug}`}
                      onClick={() => setOpen(false)}
                      className="flex items-center justify-between gap-3 rounded-lg px-4 py-2.5 hover:bg-forest-50 dark:hover:bg-forest-950"
                    >
                      <span className="text-sm font-medium">{p.name}</span>
                      <span className="text-xs text-ink-500">{p.category}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
            {query.length >= 2 && results.length === 0 && (
              <p className="border-t border-paper-200 px-4 py-4 text-sm text-ink-500 dark:border-ink-800">
                No matches. Try a broader term, or{" "}
                <Link
                  href="/contact"
                  className="text-forest-600 underline"
                  onClick={() => setOpen(false)}
                >
                  ask our team
                </Link>{" "}
                — we make custom products too.
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
}
