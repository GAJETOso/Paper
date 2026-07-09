/** Corporate facts, global operations, leadership, history, certifications. */

export const company = {
  name: "Sylvara Paper Group",
  legalName: "Sylvara Paper Group Plc",
  tagline: "From Forest to Future",
  founded: 1962,
  headquarters: "Helsinki, Finland",
  url: "https://sylvara.com",
  phone: "+358 9 010 7272",
  whatsapp: "+15550107272",
  telegram: "SylvaraBot",
  email: "hello@sylvara.com",
  description:
    "Sylvara Paper Group is a global leader in sustainable paper manufacturing, converting, packaging, tissue, printing papers, and specialty papers — operating 42 mills across 6 continents and serving customers in 140+ countries.",
};

export const stats = [
  { label: "Countries served", value: 140, suffix: "+" },
  { label: "Mills & plants worldwide", value: 42, suffix: "" },
  { label: "Employees", value: 68000, suffix: "+" },
  { label: "Tonnes produced annually", value: 14.6, suffix: "M", decimals: 1 },
  { label: "Trees planted since 2010", value: 212, suffix: "M+" },
  { label: "Recycled fiber share", value: 61, suffix: "%" },
];

export interface Region {
  name: string;
  hq: string;
  mills: number;
  capacityMt: number;
  focus: string;
  /** Approx map coordinates as % of a 1000×500 equirectangular canvas. */
  x: number;
  y: number;
}

export const regions: Region[] = [
  {
    name: "Northern Europe",
    hq: "Helsinki, Finland",
    mills: 9,
    capacityMt: 4.1,
    focus: "Pulp, printing papers, specialty",
    x: 545,
    y: 105,
  },
  {
    name: "Central Europe",
    hq: "Vienna, Austria",
    mills: 7,
    capacityMt: 2.8,
    focus: "Packaging papers, corrugated",
    x: 520,
    y: 150,
  },
  {
    name: "North America",
    hq: "Memphis, USA",
    mills: 8,
    capacityMt: 3.2,
    focus: "Containerboard, tissue",
    x: 235,
    y: 175,
  },
  {
    name: "South America",
    hq: "São Paulo, Brazil",
    mills: 4,
    capacityMt: 1.6,
    focus: "Eucalyptus pulp, eco products",
    x: 330,
    y: 330,
  },
  {
    name: "West Africa",
    hq: "Lagos, Nigeria",
    mills: 5,
    capacityMt: 1.1,
    focus: "Converting, education, hygiene",
    x: 495,
    y: 265,
  },
  {
    name: "Middle East & North Africa",
    hq: "Dubai, UAE",
    mills: 3,
    capacityMt: 0.7,
    focus: "Tissue converting, distribution",
    x: 600,
    y: 210,
  },
  {
    name: "South Asia",
    hq: "Mumbai, India",
    mills: 3,
    capacityMt: 0.6,
    focus: "Recycled packaging",
    x: 660,
    y: 235,
  },
  {
    name: "East Asia & Pacific",
    hq: "Singapore",
    mills: 3,
    capacityMt: 0.5,
    focus: "Food packaging, R&D",
    x: 745,
    y: 285,
  },
];

export const leadership = [
  {
    name: "Dr. Elina Korhonen",
    role: "Chief Executive Officer",
    bio: "28 years in forest products; former COO of a top-3 European pulp group. Architect of Sylvara's Net Zero 2040 strategy.",
  },
  {
    name: "Adewale Ogunbiyi",
    role: "Chief Operating Officer",
    bio: "Leads 42 mills on 6 continents. Champion of the zero-harm safety program and lights-out converting.",
  },
  {
    name: "Marta Silva",
    role: "Chief Sustainability Officer",
    bio: "Circular-economy scientist; oversees the 212M-tree restoration program and science-based targets.",
  },
  {
    name: "James Whitfield",
    role: "Chief Financial Officer",
    bio: "Former investment banker; guided three green-bond issues totalling €2.4B.",
  },
  {
    name: "Dr. Yuki Tanaka",
    role: "Chief Technology Officer",
    bio: "Directs the Singapore R&D hub — barrier coatings, molded fiber, and paper bottles.",
  },
  {
    name: "Fatima Al-Rashid",
    role: "Chief Commercial Officer",
    bio: "Built the distributor network across 140 countries and the digital ordering platform.",
  },
  {
    name: "Lars Eriksson",
    role: "President, Forestry",
    bio: "Manages 1.9M hectares of certified forest and 14 nurseries.",
  },
  {
    name: "Grace Mwangi",
    role: "Executive Director, Sylvara Foundation",
    bio: "Leads education, sanitation, and empowerment programs reaching 3.2M people.",
  },
];

export const timeline = [
  { year: 1962, event: "Founded as a single paper mill on the shores of Lake Saimaa, Finland." },
  { year: 1974, event: "First export contracts; kraft paper shipped to 12 countries." },
  { year: 1988, event: "Enters packaging with the acquisition of Nordkarton corrugated plants." },
  { year: 1996, event: "First FSC-certified forest holdings; sustainability charter adopted." },
  { year: 2004, event: "Expansion into North America and Brazil; eucalyptus pulp joint venture." },
  { year: 2010, event: "One-million-trees pledge launches — now 212M+ planted." },
  {
    year: 2014,
    event: "West Africa converting hub opens in Lagos; education products line launches.",
  },
  { year: 2018, event: "Sylvara Foundation established; first paper-bottle patents filed." },
  { year: 2021, event: "Science-based targets validated; €1B green bond issued." },
  { year: 2024, event: "61% recycled fiber milestone; PFAS-free barrier rollout completed." },
  {
    year: 2026,
    event: "Digital platform launch: AI-powered ordering, WhatsApp & Telegram commerce.",
  },
];

export const certifications = [
  { name: "FSC® Chain of Custody", code: "FSC-C012345", scope: "All virgin fiber" },
  { name: "PEFC Chain of Custody", code: "PEFC/02-31-99", scope: "Group-wide" },
  { name: "ISO 9001:2015", code: "Quality Management", scope: "All mills" },
  { name: "ISO 14001:2015", code: "Environmental Management", scope: "All mills" },
  { name: "ISO 45001:2018", code: "Occupational Health & Safety", scope: "All sites" },
  { name: "ISO 50001:2018", code: "Energy Management", scope: "European & NA mills" },
  { name: "EU Ecolabel", code: "FI/011/001", scope: "Printing & tissue lines" },
  { name: "BRCGS Packaging", code: "Grade AA", scope: "Food packaging plants" },
  { name: "EN 13432 / ASTM D6400", code: "Compostability", scope: "Eco product line" },
  { name: "EcoVadis Platinum", code: "Top 1%", scope: "Group ESG rating" },
];

export const industries = [
  {
    name: "E-commerce & Logistics",
    icon: "🚚",
    desc: "Right-sized mailers, void fill, and returnable packaging that cut shipping cost and waste.",
  },
  {
    name: "Food & Beverage",
    icon: "🍽️",
    desc: "Certified food-contact cups, cartons, and wraps with plastic-free barriers.",
  },
  {
    name: "Retail & Fashion",
    icon: "🛍️",
    desc: "Branded bags and boxes that turn every purchase into marketing.",
  },
  {
    name: "Healthcare & Pharma",
    icon: "🏥",
    desc: "Sterilization papers, patient hygiene, and compliant pharmaceutical cartons.",
  },
  {
    name: "Education & Government",
    icon: "🎓",
    desc: "National-scale exercise book and stationery supply programs.",
  },
  {
    name: "Publishing & Media",
    icon: "📖",
    desc: "Book, magazine, and newsprint grades with end-to-end print services.",
  },
  {
    name: "Agriculture",
    icon: "🌾",
    desc: "Multiwall sacks, molded trays, and biodegradable mulch.",
  },
  {
    name: "Hospitality",
    icon: "🏨",
    desc: "Custom-branded tissue, napkins, and in-room stationery.",
  },
  {
    name: "Industrial & Automotive",
    icon: "🏭",
    desc: "Technical papers: filtration, insulation, cores, and release liners.",
  },
  {
    name: "Construction",
    icon: "🏗️",
    desc: "Gypsum liners, laminate papers, and honeycomb structural boards.",
  },
  {
    name: "FMCG Brands",
    icon: "🧴",
    desc: "Paper bottles and molded fiber replacing plastic on shelf.",
  },
  {
    name: "NGOs & Institutions",
    icon: "🤝",
    desc: "Relief supplies, education kits, and program packaging at scale.",
  },
];
