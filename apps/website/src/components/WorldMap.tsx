"use client";

import { useState } from "react";
import { regions, type Region } from "@/data/company";

/**
 * Interactive world map: stylized dot-grid continents (pure SVG, zero assets)
 * with pulsing markers for each operating region and a hover/focus detail card.
 */
export function WorldMap() {
  const [active, setActive] = useState<Region | null>(null);

  return (
    <div className="relative">
      <svg
        viewBox="0 0 1000 500"
        role="img"
        aria-label="Map of Sylvara operating regions across six continents"
        className="w-full"
      >
        {/* Abstract continent silhouettes */}
        <g fill="currentColor" className="text-paper-300 dark:text-ink-800" opacity="0.6">
          <ellipse cx="230" cy="160" rx="120" ry="75" />
          <ellipse cx="320" cy="330" rx="60" ry="90" />
          <ellipse cx="520" cy="130" rx="90" ry="55" />
          <ellipse cx="520" cy="270" rx="75" ry="95" />
          <ellipse cx="700" cy="180" rx="130" ry="85" />
          <ellipse cx="830" cy="370" rx="55" ry="40" />
        </g>
        {regions.map((r) => (
          <g key={r.name}>
            <circle cx={r.x} cy={r.y} r="22" className="fill-forest-500/15">
              <animate attributeName="r" values="14;26;14" dur="3s" repeatCount="indefinite" />
            </circle>
            <circle
              cx={r.x}
              cy={r.y}
              r="8"
              tabIndex={0}
              role="button"
              aria-label={`${r.name}: ${r.mills} mills, headquartered in ${r.hq}`}
              className="cursor-pointer fill-forest-600 stroke-white stroke-2 outline-none transition-all hover:r-10 focus:r-10 dark:stroke-ink-950"
              onMouseEnter={() => setActive(r)}
              onFocus={() => setActive(r)}
              onMouseLeave={() => setActive(null)}
              onBlur={() => setActive(null)}
            />
          </g>
        ))}
      </svg>

      <div
        aria-live="polite"
        className={`glass pointer-events-none absolute bottom-4 left-1/2 w-[min(92%,26rem)] -translate-x-1/2 rounded-2xl p-5 transition-all duration-300 ${
          active ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
        }`}
      >
        {active && (
          <>
            <p className="font-semibold">{active.name}</p>
            <p className="mt-1 text-sm text-ink-600 dark:text-ink-400">
              HQ {active.hq} · {active.mills} mills · {active.capacityMt}M t/yr
            </p>
            <p className="mt-1 text-sm text-forest-700 dark:text-forest-300">{active.focus}</p>
          </>
        )}
      </div>
    </div>
  );
}
