/** FAQ content — also rendered as FAQPage JSON-LD for AEO/rich results. */

export interface Faq {
  q: string;
  a: string;
  topic: "Products" | "Ordering" | "Sustainability" | "Company" | "Partners";
}

export const faqs: Faq[] = [
  {
    topic: "Products",
    q: "What paper products does Sylvara manufacture?",
    a: "Sylvara manufactures over 200 product lines across 13 categories: printing papers (copy, offset, art, newsprint), packaging papers (kraft, greaseproof, parchment), corrugated packaging, retail bags, food packaging (cups, boxes, straws), hygiene and tissue products, education products (exercise books, notebooks), office stationery, publishing services, industrial and technical papers, agricultural packaging, eco products (paper bottles, molded fiber, honeycomb board), and fully custom products.",
  },
  {
    topic: "Products",
    q: "What GSM (grammage) ranges do you produce?",
    a: "Our mills produce from 28 GSM ultra-thin bible paper up to 450 GSM board. Standard office papers run 70–120 GSM, packaging kraft 35–200 GSM, and corrugated liners 115–200 GSM. Use the GSM calculator on our Tools page to estimate sheet weight for any format.",
  },
  {
    topic: "Ordering",
    q: "What is the minimum order quantity (MOQ)?",
    a: "MOQs vary by product: stock items (copy paper, tissue, standard boxes) ship from a single carton via distributors; custom-printed packaging starts at 500–1,000 units; mill-direct reels start at one tonne. Request a quotation online, via WhatsApp, or through our distributor network for exact terms.",
  },
  {
    topic: "Ordering",
    q: "How do I get a quotation?",
    a: "Three ways: (1) use the online quotation form on any product page, (2) message our WhatsApp Business number and the quotation bot will guide you and deliver a PDF quote, or (3) contact a regional distributor. Quotes for standard products are issued within one business hour.",
  },
  {
    topic: "Ordering",
    q: "Do you ship internationally?",
    a: "Yes — we serve 140+ countries from 24 regional distribution centers, with full export documentation, Incoterms of your choice, and carbon-tracked shipments.",
  },
  {
    topic: "Sustainability",
    q: "Is Sylvara paper sustainable?",
    a: "Yes. 100% of our virgin fiber is FSC or PEFC certified with zero deforestation, 61% of total fiber input is recycled, our mills run on 83% renewable energy, and we are on an SBTi-validated path to net-zero emissions by 2040. Every product page lists its specific environmental attributes.",
  },
  {
    topic: "Sustainability",
    q: "Are your food packaging products plastic-free and compostable?",
    a: "We offer PFAS-free, plastic-free aqueous barrier options across cups, boxes, and wraps. Products marked compostable are certified to EN 13432 or ASTM D6400 by third parties — not self-declared.",
  },
  {
    topic: "Sustainability",
    q: "How many times can paper be recycled?",
    a: "Paper fibers can typically be recycled 5–7 times before they become too short, after which we recover them for biomass energy. Our design-for-recycling standard ensures every Sylvara product is repulpable in standard mills.",
  },
  {
    topic: "Company",
    q: "Where are Sylvara's mills located?",
    a: "We operate 42 mills and plants across 8 regions: Northern Europe (HQ, Finland), Central Europe, North America, South America, West Africa, MENA, South Asia, and East Asia & Pacific. See the Global Operations page for the interactive map.",
  },
  {
    topic: "Partners",
    q: "How do I become a Sylvara distributor?",
    a: "Apply through the Become a Distributor page with your company profile, territory, and product focus. Our commercial team responds within five business days; approved distributors get portal access, tiered pricing, marketing support, and training.",
  },
  {
    topic: "Partners",
    q: "How do I become a supplier?",
    a: "Register on the Supplier Portal with your certifications and capabilities. All suppliers complete our sustainability scorecard; strategic suppliers are audited against FSC/PEFC, labor, and environmental criteria.",
  },
  {
    topic: "Ordering",
    q: "Can I order custom-branded packaging?",
    a: "Yes — custom printing, structural design, and finishing are core services. Free structural design consultation, prototypes in five days, and MOQs from 500 units for bags and boxes.",
  },
];
