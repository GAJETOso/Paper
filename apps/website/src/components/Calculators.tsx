"use client";

import { useMemo, useState } from "react";
import { categories } from "@/data/products";

/* ── GSM / sheet weight calculator ─────────────────────────────────── */

const formats: Record<string, [number, number]> = {
  A5: [148, 210],
  A4: [210, 297],
  A3: [297, 420],
  Letter: [216, 279],
  Legal: [216, 356],
};

function GsmCalculator() {
  const [gsm, setGsm] = useState(80);
  const [format, setFormat] = useState("A4");
  const [sheets, setSheets] = useState(500);

  const [wMm, hMm] = formats[format] ?? [210, 297];
  const sheetG = (wMm / 1000) * (hMm / 1000) * gsm;
  const totalKg = (sheetG * sheets) / 1000;

  return (
    <div className="card h-full">
      <h3 className="font-semibold">📐 Paper GSM & weight calculator</h3>
      <p className="prose-muted mt-1 text-sm">Estimate ream and shipment weight for any format.</p>
      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        <label className="text-sm">
          <span className="text-ink-500">GSM</span>
          <input
            type="number"
            min={28}
            max={450}
            value={gsm}
            onChange={(e) => setGsm(+e.target.value)}
            className="mt-1 w-full rounded-lg border border-paper-200 bg-transparent px-3 py-2 dark:border-ink-700"
          />
        </label>
        <label className="text-sm">
          <span className="text-ink-500">Format</span>
          <select
            value={format}
            onChange={(e) => setFormat(e.target.value)}
            className="mt-1 w-full rounded-lg border border-paper-200 bg-transparent px-3 py-2 dark:border-ink-700 dark:bg-ink-900"
          >
            {Object.keys(formats).map((f) => (
              <option key={f}>{f}</option>
            ))}
          </select>
        </label>
        <label className="text-sm">
          <span className="text-ink-500">Sheets</span>
          <input
            type="number"
            min={1}
            value={sheets}
            onChange={(e) => setSheets(+e.target.value)}
            className="mt-1 w-full rounded-lg border border-paper-200 bg-transparent px-3 py-2 dark:border-ink-700"
          />
        </label>
      </div>
      <p className="mt-4 rounded-xl bg-forest-50 p-4 text-sm dark:bg-forest-950" aria-live="polite">
        One sheet: <strong>{sheetG.toFixed(2)} g</strong> · {sheets.toLocaleString()} sheets:{" "}
        <strong>{totalKg.toFixed(2)} kg</strong>
      </p>
    </div>
  );
}

/* ── Box dimension calculator ──────────────────────────────────────── */

function BoxCalculator() {
  const [l, setL] = useState(400);
  const [w, setW] = useState(300);
  const [h, setH] = useState(250);
  const [qty, setQty] = useState(1000);

  // FEFCO 0201 blank estimate: (2L + 2W + glue flap) × (W + H)
  const blankM2 = ((2 * l + 2 * w + 40) / 1000) * ((w + h) / 1000);
  const boardGsm = 586; // typical BC double-wall combined grammage
  const boxKg = (blankM2 * boardGsm) / 1000;
  const volumeL = (l * w * h) / 1_000_000;

  const dim = (v: number, set: (n: number) => void, label: string) => (
    <label className="text-sm">
      <span className="text-ink-500">{label} (mm)</span>
      <input
        type="number"
        min={50}
        max={2000}
        value={v}
        onChange={(e) => set(+e.target.value)}
        className="mt-1 w-full rounded-lg border border-paper-200 bg-transparent px-3 py-2 dark:border-ink-700"
      />
    </label>
  );

  return (
    <div className="card h-full">
      <h3 className="font-semibold">📦 Box dimension calculator</h3>
      <p className="prose-muted mt-1 text-sm">FEFCO 0201 material estimate for your carton run.</p>
      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {dim(l, setL, "Length")}
        {dim(w, setW, "Width")}
        {dim(h, setH, "Height")}
        <label className="text-sm">
          <span className="text-ink-500">Quantity</span>
          <input
            type="number"
            min={1}
            value={qty}
            onChange={(e) => setQty(+e.target.value)}
            className="mt-1 w-full rounded-lg border border-paper-200 bg-transparent px-3 py-2 dark:border-ink-700"
          />
        </label>
      </div>
      <p className="mt-4 rounded-xl bg-forest-50 p-4 text-sm dark:bg-forest-950" aria-live="polite">
        Internal volume: <strong>{volumeL.toFixed(1)} L</strong> · Board per box:{" "}
        <strong>{blankM2.toFixed(2)} m²</strong> (~{boxKg.toFixed(2)} kg) · Run total:{" "}
        <strong>{((boxKg * qty) / 1000).toFixed(2)} t</strong>
      </p>
    </div>
  );
}

/* ── Carbon savings calculator ─────────────────────────────────────── */

function CarbonCalculator() {
  const [plasticKg, setPlasticKg] = useState(1000);
  // Conservative LCA factors: virgin plastic ≈ 3.1 kgCO2e/kg incl. end-of-life;
  // Sylvara recycled-fiber alternative ≈ 0.7 kgCO2e/kg.
  const saved = plasticKg * (3.1 - 0.7);
  const trees = saved / 21; // one tree sequesters ~21 kg CO2 per year

  return (
    <div className="card h-full">
      <h3 className="font-semibold">🌍 Carbon savings calculator</h3>
      <p className="prose-muted mt-1 text-sm">
        Estimate CO₂e avoided by switching plastic packaging to Sylvara fiber alternatives.
      </p>
      <label className="mt-4 block text-sm">
        <span className="text-ink-500">Plastic packaging replaced per year (kg)</span>
        <input
          type="number"
          min={1}
          value={plasticKg}
          onChange={(e) => setPlasticKg(+e.target.value)}
          className="mt-1 w-full rounded-lg border border-paper-200 bg-transparent px-3 py-2 dark:border-ink-700"
        />
      </label>
      <p className="mt-4 rounded-xl bg-forest-50 p-4 text-sm dark:bg-forest-950" aria-live="polite">
        Estimated savings: <strong>{(saved / 1000).toFixed(2)} tCO₂e/year</strong> — equivalent to
        the annual sequestration of <strong>{Math.round(trees).toLocaleString()} trees</strong>.
      </p>
      <p className="mt-2 text-xs text-ink-500">
        Indicative figures from published LCA averages; request a product-specific verified LCA with
        your quote.
      </p>
    </div>
  );
}

/* ── Packaging recommendation engine ───────────────────────────────── */

const recommendations: Record<string, Record<string, string[]>> = {
  Food: {
    Light: [
      "Food Packaging → Takeaway Containers",
      "Food Packaging → Paper Bowls",
      "Packaging Papers → Greaseproof Paper",
    ],
    Medium: [
      "Food Packaging → Pizza Boxes",
      "Food Packaging → Cake Boxes",
      "Retail Packaging → Fast Food Bags",
    ],
    Heavy: [
      "Corrugated Packaging → Produce Cartons",
      "Corrugated Packaging → Seafood Boxes",
      "Agriculture → Fruit Cartons",
    ],
  },
  Retail: {
    Light: [
      "Retail Packaging → Shopping Bags",
      "Retail Packaging → Gift Bags",
      "Packaging Papers → Gift Wrap",
    ],
    Medium: [
      "Retail Packaging → Luxury Bags",
      "Custom Products → Luxury Gift Boxes",
      "Eco Products → Eco Mailers",
    ],
    Heavy: [
      "Corrugated Packaging → E-commerce Boxes",
      "Corrugated Packaging → Double Wall Boxes",
      "Eco Products → Protective Packaging",
    ],
  },
  Industrial: {
    Light: [
      "Packaging Papers → Kraft Paper",
      "Industrial Paper → Release Paper",
      "Eco Products → Protective Packaging",
    ],
    Medium: [
      "Corrugated Packaging → Industrial Cartons",
      "Industrial Paper → Paper Cores",
      "Eco Products → Honeycomb Boards",
    ],
    Heavy: [
      "Corrugated Packaging → Triple Wall Boxes",
      "Corrugated Packaging → Heavy Duty Boxes",
      "Eco Products → Honeycomb Boards",
    ],
  },
  Agriculture: {
    Light: [
      "Agriculture → Egg Trays",
      "Agriculture → Produce Packaging",
      "Agriculture → Plant Pots",
    ],
    Medium: [
      "Agriculture → Fruit Cartons",
      "Agriculture → Vegetable Cartons",
      "Corrugated Packaging → Produce Cartons",
    ],
    Heavy: [
      "Agriculture → Fertilizer Sacks",
      "Agriculture → Animal Feed Bags",
      "Agriculture → Seed Bags",
    ],
  },
};

function PackagingRecommender() {
  const [sector, setSector] = useState("Food");
  const [weight, setWeight] = useState("Medium");
  const picks = useMemo(() => recommendations[sector]?.[weight] ?? [], [sector, weight]);

  return (
    <div className="card h-full">
      <h3 className="font-semibold">🤖 Packaging recommendation engine</h3>
      <p className="prose-muted mt-1 text-sm">
        Tell us what you ship — we&apos;ll suggest a starting point from {categories.length}{" "}
        categories.
      </p>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <label className="text-sm">
          <span className="text-ink-500">Sector</span>
          <select
            value={sector}
            onChange={(e) => setSector(e.target.value)}
            className="mt-1 w-full rounded-lg border border-paper-200 bg-transparent px-3 py-2 dark:border-ink-700 dark:bg-ink-900"
          >
            {Object.keys(recommendations).map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </label>
        <label className="text-sm">
          <span className="text-ink-500">Product weight class</span>
          <select
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="mt-1 w-full rounded-lg border border-paper-200 bg-transparent px-3 py-2 dark:border-ink-700 dark:bg-ink-900"
          >
            {["Light", "Medium", "Heavy"].map((w) => (
              <option key={w}>{w}</option>
            ))}
          </select>
        </label>
      </div>
      <ul
        className="mt-4 space-y-2 rounded-xl bg-forest-50 p-4 text-sm dark:bg-forest-950"
        aria-live="polite"
      >
        {picks.map((p) => (
          <li key={p} className="flex gap-2">
            <span className="text-forest-500" aria-hidden>
              →
            </span>{" "}
            {p}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Calculators() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <GsmCalculator />
      <BoxCalculator />
      <CarbonCalculator />
      <PackagingRecommender />
    </div>
  );
}
