/** Compact catalog served over chat; full data lives in @sylvara/database. */

export interface BotProduct {
  code: string;
  name: string;
  category: string;
  unit: string;
}

export const botCatalog: BotProduct[] = [
  { code: "P01", name: "A4 Copy Paper 80gsm (box of 5 reams)", category: "Printing", unit: "box" },
  { code: "P02", name: "A3 Copy Paper 80gsm", category: "Printing", unit: "ream" },
  { code: "P03", name: "Offset Paper 70-120gsm", category: "Printing", unit: "tonne" },
  { code: "K01", name: "Kraft Paper 35-200gsm", category: "Packaging", unit: "tonne" },
  { code: "K02", name: "Greaseproof Paper (PFAS-free)", category: "Packaging", unit: "reel" },
  {
    code: "C01",
    name: "Single Wall Boxes (custom size)",
    category: "Corrugated",
    unit: "1000 pcs",
  },
  { code: "C02", name: "E-commerce Mailer Boxes", category: "Corrugated", unit: "1000 pcs" },
  { code: "F01", name: "Coffee Cups (plastic-free lining)", category: "Food", unit: "1000 pcs" },
  { code: "F02", name: "Pizza Boxes", category: "Food", unit: "1000 pcs" },
  { code: "H01", name: "Toilet Paper (jumbo rolls)", category: "Hygiene", unit: "pallet" },
  { code: "H02", name: "Facial Tissues", category: "Hygiene", unit: "carton" },
  { code: "E01", name: "Exercise Books A5 (80 pages)", category: "Education", unit: "1000 pcs" },
  { code: "B01", name: "Shopping Bags (custom print)", category: "Retail", unit: "1000 pcs" },
  { code: "X01", name: "Eco Mailers (padded, plastic-free)", category: "Eco", unit: "1000 pcs" },
];

export function catalogText(): string {
  const byCat = new Map<string, BotProduct[]>();
  for (const p of botCatalog) {
    byCat.set(p.category, [...(byCat.get(p.category) ?? []), p]);
  }
  let out = "*Sylvara quick catalog*\n";
  for (const [cat, items] of byCat) {
    out += `\n*${cat}*\n`;
    for (const p of items) out += `  ${p.code} — ${p.name} (per ${p.unit})\n`;
  }
  out += "\nReply *QUOTE <code> <quantity>* for a quotation, e.g. `QUOTE P01 200`.";
  out += "\nFull catalog: https://sylvara.com/products";
  return out;
}
