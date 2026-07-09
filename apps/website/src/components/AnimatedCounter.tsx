"use client";

import { useEffect, useRef, useState } from "react";

/** Counts up to `value` when scrolled into view. */
export function AnimatedCounter({
  value,
  suffix = "",
  decimals = 0,
  duration = 1600,
  format,
}: {
  value: number;
  suffix?: string;
  decimals?: number;
  duration?: number;
  format?: "big" | "year";
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const render = (v: number) => {
      if (format === "year") return String(Math.round(v));
      if (format === "big") {
        if (value >= 1_000_000) return `${(v / 1_000_000).toFixed(0)}M`;
        return Math.round(v).toLocaleString("en-US");
      }
      return v.toFixed(decimals);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        observer.disconnect();
        const start = performance.now();
        const from = format === "year" ? value - 30 : 0;
        const tick = (now: number) => {
          const t = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - t, 3); // ease-out cubic
          setDisplay(render(from + (value - from) * eased));
          if (t < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [value, decimals, duration, format]);

  return (
    <span ref={ref} aria-label={`${value}${suffix}`}>
      {display}
      {suffix}
    </span>
  );
}
