"use client";

import { netZeroPath } from "@/data/sustainability";

/** Animated SVG line chart of the SBTi-validated emissions pathway to 2040. */
export function NetZeroChart() {
  const w = 720;
  const h = 260;
  const pad = 40;
  const xs = netZeroPath.map((_, i) => pad + (i * (w - pad * 2)) / (netZeroPath.length - 1));
  const ys = netZeroPath.map((p) => pad + ((100 - p.emissions) / 100) * (h - pad * 2));
  // Note: y axis inverted so 100 (baseline) is top
  const points = netZeroPath.map((p, i) => ({
    x: xs[i]!,
    y: pad + (1 - p.emissions / 100) * 0 + (p.emissions / 100) * (h - pad * 2) * -1 + (h - pad), // unused, kept simple below
  }));
  void points;
  const coords = netZeroPath.map((p, i) => {
    const x = xs[i]!;
    const y = h - pad - (1 - p.emissions / 100) * (h - pad * 2);
    return { x, y, ...p };
  });
  const path = coords.map((c, i) => `${i === 0 ? "M" : "L"}${c.x},${c.y}`).join(" ");
  void ys;

  return (
    <figure>
      <svg
        viewBox={`0 0 ${w} ${h}`}
        role="img"
        aria-label="Emissions reduction pathway from 100% in 2019 to net zero in 2040"
        className="w-full"
      >
        {[0, 25, 50, 75, 100].map((g) => {
          const y = h - pad - (1 - g / 100) * (h - pad * 2);
          return (
            <g key={g}>
              <line
                x1={pad}
                x2={w - pad}
                y1={y}
                y2={y}
                className="stroke-paper-200 dark:stroke-ink-800"
                strokeDasharray="4 6"
              />
              <text x={pad - 8} y={y + 4} textAnchor="end" className="fill-ink-500 text-[11px]">
                {g}%
              </text>
            </g>
          );
        })}
        <path
          d={`${path} L${coords[coords.length - 1]!.x},${h - pad} L${pad},${h - pad} Z`}
          className="fill-forest-500/10"
        />
        <path
          d={path}
          fill="none"
          strokeWidth="3"
          strokeLinecap="round"
          className="stroke-forest-600 dark:stroke-forest-400"
        />
        {coords.map((c) => (
          <g key={c.year}>
            <circle
              cx={c.x}
              cy={c.y}
              r="5"
              className="fill-forest-600 stroke-white stroke-2 dark:stroke-ink-950"
            />
            <text x={c.x} y={h - pad + 18} textAnchor="middle" className="fill-ink-500 text-[11px]">
              {c.year}
            </text>
          </g>
        ))}
      </svg>
      <figcaption className="mt-2 text-center text-xs text-ink-500">
        Scope 1+2 emissions vs 2019 baseline (market-based). SBTi-validated trajectory to net zero
        2040.
      </figcaption>
    </figure>
  );
}
