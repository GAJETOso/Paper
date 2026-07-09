/** News, press releases, and blog content. */

export interface Article {
  slug: string;
  title: string;
  date: string;
  category: "Press Release" | "Blog" | "Innovation" | "Sustainability" | "Investor News";
  excerpt: string;
}

export const articles: Article[] = [
  {
    slug: "paper-bottle-commercial-launch",
    title: "Sylvara launches commercial-scale paper bottle line with two global FMCG brands",
    date: "2026-06-18",
    category: "Innovation",
    excerpt:
      "After eight years of R&D, our molded-fiber bottle with plant-based liner enters mass production in Singapore — displacing an estimated 40,000 tonnes of PET annually.",
  },
  {
    slug: "q2-2026-results",
    title: "Q2 2026 results: revenue up 11%, eco product line grows 38% year-on-year",
    date: "2026-07-01",
    category: "Investor News",
    excerpt:
      "Strong demand for plastic-replacement packaging and record tissue volumes drive another quarter of profitable growth with net debt/EBITDA at 1.4x.",
  },
  {
    slug: "212-million-trees",
    title: "212 million trees: restoration program hits new milestone",
    date: "2026-05-22",
    category: "Sustainability",
    excerpt:
      "Verified plantings across 19 countries pass 212 million, with community nurseries now supplying a third of all seedlings.",
  },
  {
    slug: "whatsapp-ordering-launch",
    title: "Order paper on WhatsApp: Sylvara launches conversational commerce in 14 languages",
    date: "2026-04-30",
    category: "Press Release",
    excerpt:
      "Customers can now browse the catalog, request quotations, receive PDF invoices, and track orders entirely within WhatsApp and Telegram.",
  },
  {
    slug: "pfas-free-barriers",
    title: "How we removed PFAS from every food-contact barrier — and what's next",
    date: "2026-03-14",
    category: "Blog",
    excerpt:
      "A deep dive into aqueous dispersion coatings, repulpability testing, and why 'compostable' claims need third-party certification.",
  },
  {
    slug: "lagos-mill-expansion",
    title: "West Africa expansion: Lagos converting hub doubles education product capacity",
    date: "2026-02-09",
    category: "Press Release",
    excerpt:
      "A €140M investment adds two exercise-book lines and 1,200 jobs, supplying national school programs across the region.",
  },
  {
    slug: "ai-mill-optimization",
    title: "AI on the paper machine: 6% energy savings from predictive optimization",
    date: "2026-01-21",
    category: "Innovation",
    excerpt:
      "Machine-learning control of steam, vacuum, and refining across 31 paper machines is cutting energy per tonne while raising first-pass quality.",
  },
  {
    slug: "circular-cities",
    title: "Circular Cities: our 42nd municipal recycling partnership goes live in Nairobi",
    date: "2025-12-04",
    category: "Sustainability",
    excerpt:
      "Kerbside collection, AI sorting, and school buy-back programs close the fiber loop for 4.5 million residents.",
  },
  {
    slug: "green-bond-2025",
    title: "€800M green bond oversubscribed 4.2x",
    date: "2025-11-12",
    category: "Investor News",
    excerpt:
      "Proceeds fund fossil-free lime kilns, water tertiary treatment, and the Brazil eucalyptus expansion — all EU-taxonomy aligned.",
  },
];
