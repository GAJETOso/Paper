/** ESG dashboard metrics, targets, and initiative data. */

export const esgHeadline = [
  {
    label: "Net zero target",
    value: 2040,
    format: "year" as const,
    detail: "Scopes 1–3, SBTi-validated pathway",
  },
  {
    label: "Emissions cut since 2019",
    value: 47,
    suffix: "%",
    detail: "Scope 1 & 2, market-based",
  },
  {
    label: "Renewable energy share",
    value: 83,
    suffix: "%",
    detail: "Biomass, hydro, wind, solar PPA",
  },
  { label: "Water returned clean", value: 92, suffix: "%", detail: "Closed-loop process water" },
  {
    label: "Recycled fiber input",
    value: 61,
    suffix: "%",
    detail: "8.9M tonnes recovered paper / yr",
  },
  {
    label: "Waste diverted from landfill",
    value: 96,
    suffix: "%",
    detail: "Ash → cement; sludge → energy",
  },
  {
    label: "Trees planted",
    value: 212_000_000,
    format: "big" as const,
    detail: "Live counter, verified plantings since 2010",
  },
  {
    label: "Plastic displaced",
    value: 340_000,
    suffix: " t/yr",
    format: "big" as const,
    detail: "Via eco product line",
  },
];

export const netZeroPath = [
  { year: 2019, emissions: 100 },
  { year: 2022, emissions: 71 },
  { year: 2025, emissions: 55 },
  { year: 2028, emissions: 42 },
  { year: 2031, emissions: 30 },
  { year: 2034, emissions: 19 },
  { year: 2037, emissions: 9 },
  { year: 2040, emissions: 0 },
];

export const pillars = [
  {
    title: "Climate Strategy",
    icon: "🌍",
    points: [
      "Net Zero by 2040 across all three scopes, validated by the Science Based Targets initiative",
      "83% renewable energy today; 100% by 2032 via biomass CHP, hydro, and wind PPAs",
      "Fossil-free lime kilns and electrified drying pilots at three mills",
      "Internal carbon price of €95/tCO₂e applied to every investment decision",
    ],
  },
  {
    title: "Circular Economy",
    icon: "♻️",
    points: [
      "61% recycled fiber input — 8.9M tonnes of recovered paper repulped annually",
      "42 city-scale collection partnerships feeding regional recycling loops",
      "Design-for-recycling standard: every product certified repulpable before launch",
      "Zero process waste to landfill at 31 of 42 mills; 96% diversion group-wide",
    ],
  },
  {
    title: "Responsible Forestry",
    icon: "🌲",
    points: [
      "1.9M hectares owned or managed forest — 100% FSC/PEFC certified",
      "212M+ trees planted since 2010; 30M/year current run rate from 14 nurseries",
      "Zero deforestation and zero sourcing from ancient or endangered forests",
      "Biodiversity: 12% of managed land set aside for conservation corridors",
    ],
  },
  {
    title: "Water Stewardship",
    icon: "💧",
    points: [
      "92% of process water cleaned and returned; 38% reduction in intake per tonne since 2015",
      "Tertiary treatment at all mills discharging to sensitive watersheds",
      "Ocean protection: PFAS-free barriers and fully repulpable cup rollout",
    ],
  },
  {
    title: "People & Communities",
    icon: "🤝",
    points: [
      "Zero-harm safety program: TRIR down 64% since 2018",
      "Sylvara Foundation reaches 3.2M people across education, sanitation, and empowerment",
      "Living-wage certified across all operations and tier-1 suppliers",
    ],
  },
  {
    title: "Transparent Governance",
    icon: "📊",
    points: [
      "Annual sustainability report assured to ISAE 3000; CSRD-aligned disclosure",
      "Supplier sustainability scorecards for 100% of strategic suppliers",
      "EcoVadis Platinum (top 1%), CDP Climate A-, MSCI ESG AAA",
    ],
  },
];

export const reports = [
  { title: "Annual Sustainability Report 2025", type: "PDF", size: "18.4 MB", href: "/downloads" },
  { title: "Climate Transition Plan 2026–2040", type: "PDF", size: "6.2 MB", href: "/downloads" },
  { title: "CSRD / ESRS Disclosure 2025", type: "PDF", size: "11.7 MB", href: "/downloads" },
  {
    title: "Supplier Sustainability Scorecard Methodology",
    type: "PDF",
    size: "2.1 MB",
    href: "/downloads",
  },
  {
    title: "Forest Stewardship & Biodiversity Report",
    type: "PDF",
    size: "9.8 MB",
    href: "/downloads",
  },
  {
    title: "Carbon Credit & Offset Registry Statement",
    type: "PDF",
    size: "1.4 MB",
    href: "/downloads",
  },
];

export const foundationPrograms = [
  {
    title: "School Notebook Donations",
    icon: "📓",
    impact: "11.4M notebooks donated",
    desc: "Every 100 education products sold funds one donated exercise book, delivered with ministries of education in 23 countries.",
  },
  {
    title: "Tree Planting & Restoration",
    icon: "🌳",
    impact: "212M trees since 2010",
    desc: "Community nurseries, agroforestry training, and degraded-land restoration with 30M trees planted per year.",
  },
  {
    title: "Community Sanitation",
    icon: "🚿",
    impact: "840 facilities built",
    desc: "School and market sanitation blocks with hygiene product supply and maintenance training.",
  },
  {
    title: "Scholarships & Educational Sponsorship",
    icon: "🎓",
    impact: "18,200 scholars",
    desc: "Full-ride secondary and university scholarships focused on forestry science, engineering, and environmental studies.",
  },
  {
    title: "Women's Empowerment",
    icon: "💪",
    impact: "42,000 entrepreneurs trained",
    desc: "Micro-distribution franchises turning local women into Sylvara product distributors with credit and training.",
  },
  {
    title: "Youth Entrepreneurship",
    icon: "🚀",
    impact: "6,800 startups incubated",
    desc: "Circular-economy business incubators attached to our recycling hubs.",
  },
  {
    title: "Library & Reading Campaigns",
    icon: "📚",
    impact: "1,150 libraries stocked",
    desc: "Community libraries built and stocked, paired with national reading-hour campaigns.",
  },
  {
    title: "Paper Recycling Awareness",
    icon: "♻️",
    impact: "9.6M students reached",
    desc: "School recycling clubs with collection infrastructure and per-kilo rewards for schools.",
  },
  {
    title: "Healthcare Outreach",
    icon: "🏥",
    impact: "310 clinics supplied",
    desc: "Hygiene product donations and mobile clinic sponsorship in underserved regions.",
  },
  {
    title: "Disaster Relief",
    icon: "🆘",
    impact: "72-hour response pledge",
    desc: "Pre-positioned relief packaging and hygiene kits with humanitarian logistics partners.",
  },
  {
    title: "Clean Communities",
    icon: "🧹",
    impact: "580 cities engaged",
    desc: "Neighborhood cleanup franchises with sorted-waste buy-back centers.",
  },
  {
    title: "Rural Development",
    icon: "🏘️",
    impact: "290 villages electrified",
    desc: "Mini-grid electrification around mill communities powered by biomass surplus.",
  },
];
