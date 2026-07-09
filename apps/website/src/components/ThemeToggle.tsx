"use client";

import { useEffect, useState } from "react";

/** Dark/light mode toggle; persists to localStorage, respects system default. */
export function ThemeToggle() {
  const [dark, setDark] = useState<boolean | null>(null);

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  const toggle = () => {
    const next = !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("sylvara-theme", next ? "dark" : "light");
    setDark(next);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      className="flex h-10 w-10 items-center justify-center rounded-full border border-paper-200 text-lg transition-colors hover:bg-paper-100 dark:border-ink-800 dark:hover:bg-ink-900"
    >
      <span aria-hidden>{dark === null ? "◐" : dark ? "☀️" : "🌙"}</span>
    </button>
  );
}
