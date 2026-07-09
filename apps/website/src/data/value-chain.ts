/** The 23-stage circular value chain, forest to new products. */

export interface ChainStage {
  name: string;
  phase: "Forest" | "Production" | "Market" | "Circular";
  desc: string;
}

export const valueChain: ChainStage[] = [
  {
    name: "Forest Management",
    phase: "Forest",
    desc: "1.9M hectares of FSC/PEFC-certified forest managed on 60–80 year rotations with biodiversity corridors.",
  },
  {
    name: "Tree Nursery",
    phase: "Forest",
    desc: "14 nurseries raise 30M+ seedlings a year, selected for climate resilience and fiber quality.",
  },
  {
    name: "Tree Plantation",
    phase: "Forest",
    desc: "Planting exceeds harvest 3:1 — every harvested tree is replaced by at least three.",
  },
  {
    name: "Harvesting",
    phase: "Forest",
    desc: "Selective, GPS-guided harvesting; residues become biomass energy.",
  },
  {
    name: "Transport",
    phase: "Forest",
    desc: "Rail-first logistics and electric timber trucks cut inbound emissions 34%.",
  },
  {
    name: "Pulp Production",
    phase: "Production",
    desc: "Kraft and BCTMP lines; ECF bleaching; black liquor fuels the mill.",
  },
  {
    name: "Chemical Processing",
    phase: "Production",
    desc: "Closed-loop chemical recovery reclaims 98% of cooking chemicals.",
  },
  {
    name: "Mechanical Processing",
    phase: "Production",
    desc: "TMP refining for high-yield grades using renewable electricity.",
  },
  {
    name: "Paper Machine",
    phase: "Production",
    desc: "31 paper machines up to 10.2m wide running at 2,000 m/min.",
  },
  {
    name: "Drying",
    phase: "Production",
    desc: "Heat-recovery hoods reclaim 70% of drying energy.",
  },
  {
    name: "Coating",
    phase: "Production",
    desc: "Aqueous barrier and pigment coating — PFAS- and plastic-free options.",
  },
  {
    name: "Printing",
    phase: "Production",
    desc: "In-house flexo, offset, gravure, and digital print up to 8 colors.",
  },
  {
    name: "Cutting",
    phase: "Production",
    desc: "Precision sheeting, slitting, and die-cutting to ±0.1mm.",
  },
  {
    name: "Packaging",
    phase: "Production",
    desc: "Converting into boxes, bags, cups, tissue, and 200+ product lines.",
  },
  {
    name: "Warehousing",
    phase: "Market",
    desc: "24 regional distribution centers with real-time inventory API.",
  },
  {
    name: "Distribution",
    phase: "Market",
    desc: "Multimodal delivery to 140+ countries; carbon-tracked shipments.",
  },
  {
    name: "Retail",
    phase: "Market",
    desc: "Shelf-ready packaging and merchandising support for retail partners.",
  },
  {
    name: "Consumer",
    phase: "Market",
    desc: "Products designed for use, reuse, and easy recycling — clearly labeled.",
  },
  {
    name: "Collection",
    phase: "Circular",
    desc: "42 city partnerships and school programs recover used paper.",
  },
  {
    name: "Sorting",
    phase: "Circular",
    desc: "AI-assisted optical sorting achieves 99% fiber purity.",
  },
  {
    name: "Recycling",
    phase: "Circular",
    desc: "8.9M tonnes of recovered paper processed annually.",
  },
  {
    name: "Repulping",
    phase: "Circular",
    desc: "Fibers re-enter production up to 7 times before biomass energy recovery.",
  },
  {
    name: "New Products",
    phase: "Circular",
    desc: "Yesterday's box becomes tomorrow's notebook — the loop closes.",
  },
];
