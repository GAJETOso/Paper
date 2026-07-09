/**
 * Sylvara complete product catalog.
 *
 * Products are defined compactly (name + optional overrides); slugs, default
 * descriptions, and SEO copy are derived so category/product pages stay
 * data-driven. 13 categories spanning the entire paper value chain.
 */

export interface Product {
  name: string;
  slug: string;
  blurb: string;
  specs: string[];
  applications: string[];
  eco: string;
}

export interface ProductCategory {
  name: string;
  slug: string;
  tagline: string;
  description: string;
  icon: string;
  products: Product[];
}

const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

interface ProductSeed {
  n: string; // name
  b?: string; // custom blurb
  s?: string[]; // specs
  a?: string[]; // applications
  e?: string; // eco note
}

interface CategorySeed {
  name: string;
  tagline: string;
  description: string;
  icon: string;
  defaults: { specs: string[]; applications: string[]; eco: string };
  items: ProductSeed[];
}

const seeds: CategorySeed[] = [
  {
    name: "Printing Papers",
    tagline: "Precision-engineered papers for every press and printer.",
    description:
      "From everyday office copy paper to ultra-thin bible paper and premium coated art stock, our printing papers deliver consistent runnability, brightness, and print fidelity across offset, digital, inkjet, and laser platforms.",
    icon: "🖨️",
    defaults: {
      specs: ["60–300 GSM", "ISO brightness 90–104", "FSC / PEFC certified fiber"],
      applications: ["Commercial printing", "Offices", "Publishing", "Education"],
      eco: "Produced with 100% renewable electricity and elemental-chlorine-free (ECF) bleaching.",
    },
    items: [
      {
        n: "Copy Paper",
        b: "High-opacity multipurpose sheets engineered for jam-free performance in every copier.",
        s: ["70/75/80 GSM", "A4, A3, Letter, Legal", "500-sheet reams"],
      },
      {
        n: "Office Paper",
        b: "Everyday workhorse paper with superior bulk and smoothness for double-sided printing.",
      },
      {
        n: "Photocopy Paper",
        b: "Optimized surface bond for crisp toner adhesion at high speeds.",
      },
      { n: "A3 Paper", s: ["297 × 420 mm", "70–120 GSM"] },
      { n: "A4 Paper", s: ["210 × 297 mm", "70–120 GSM"] },
      { n: "A5 Paper", s: ["148 × 210 mm", "70–100 GSM"] },
      { n: "Legal Paper", s: ["8.5 × 14 in", "75–90 GSM"] },
      { n: "Letter Paper", s: ["8.5 × 11 in", "75–90 GSM"] },
      {
        n: "Inkjet Paper",
        b: "Micro-porous coating for sharp lines and vivid color with fast dry times.",
      },
      { n: "Laser Paper", b: "Heat-stable sheets that stay flat through the hottest fuser units." },
      {
        n: "Book Paper",
        b: "Cream and white bulk grades that make books pleasant to hold and read.",
        s: ["52–120 GSM", "Bulk 1.3–2.2 cm³/g"],
      },
      {
        n: "Magazine Paper",
        b: "Lightweight coated (LWC) grades for high-speed rotogravure and heatset offset.",
      },
      {
        n: "Bible Paper",
        b: "Ultra-thin, high-opacity paper down to 28 GSM for dictionaries and scripture.",
        s: ["28–45 GSM", "Opacity ≥ 82%"],
      },
      {
        n: "Art Paper",
        b: "Double-coated premium stock with mirror-smooth surfaces for fine reproduction.",
      },
      {
        n: "Gloss Paper",
        b: "High-gloss coated paper for brochures and imagery that demands impact.",
      },
      { n: "Matt Paper", b: "Glare-free coated finish for elegant, readable layouts." },
      {
        n: "Newsprint",
        b: "High-speed runnable grades with up to 100% recycled content.",
        e: "Made from up to 100% recovered fiber.",
      },
      { n: "Bond Paper", b: "Crisp, durable writing and letterhead paper with watermark options." },
      {
        n: "Offset Paper",
        b: "Uncoated printing paper with excellent dimensional stability on press.",
      },
      {
        n: "Carbonless Paper",
        b: "CB/CFB/CF sets for multi-part business forms without carbon inserts.",
      },
      {
        n: "Continuous Stationery",
        b: "Pin-fed fanfold forms for dot-matrix and industrial printing.",
      },
      {
        n: "Photo Paper",
        b: "Resin-coated inkjet photo media in gloss, satin, and lustre finishes.",
      },
    ],
  },
  {
    name: "Packaging Papers",
    tagline: "Strong, versatile papers that protect and present.",
    description:
      "Virgin and recycled kraft grades, food-safe barrier papers, and specialty wrapping papers for industrial, retail, and culinary applications.",
    icon: "📦",
    defaults: {
      specs: ["30–450 GSM", "Reel or sheet", "Custom widths"],
      applications: ["Industrial packaging", "Food service", "Retail", "E-commerce"],
      eco: "Recyclable and biodegradable; available in 100% recycled or FSC virgin fiber.",
    },
    items: [
      {
        n: "Kraft Paper",
        b: "High-tensile virgin kraft for bags, wrapping, and lamination.",
        s: ["35–200 GSM", "MG / MF finishes"],
      },
      { n: "Brown Paper", b: "Natural unbleached packaging paper — the sustainable classic." },
      { n: "White Kraft", b: "Bleached kraft combining strength with a premium bright surface." },
      { n: "Wrapping Paper", b: "Printable wrapping grades for retail and industrial use." },
      { n: "Gift Wrap", b: "Luxury printed and specialty-finish gift wrapping papers." },
      { n: "Food Wrap", b: "Food-contact-approved wrapping for delis, butchers, and bakeries." },
      { n: "Wax Paper", b: "Moisture-resistant waxed paper for food and industrial interleaving." },
      {
        n: "Greaseproof Paper",
        b: "Dense, grease-resistant sheets for high-fat foods — no fluorochemicals.",
        e: "PFAS-free grease barrier.",
      },
      { n: "Parchment Paper", b: "Silicone-coated baking parchment, oven-safe to 220°C." },
      { n: "Butcher Paper", b: "High wet-strength paper for fresh meat and seafood counters." },
      { n: "Bakery Paper", b: "Non-stick baking and pastry papers for professional kitchens." },
    ],
  },
  {
    name: "Corrugated Packaging",
    tagline: "Engineered protection for every supply chain.",
    description:
      "Single-wall to triple-wall corrugated solutions designed with our packaging engineers — box compression tested, right-sized, and print-ready for e-commerce, export, produce, and heavy industry.",
    icon: "🏗️",
    defaults: {
      specs: ["B, C, E, BC, EB flutes", "ECT 32–120", "Custom die-cut or FEFCO styles"],
      applications: ["Shipping", "E-commerce", "Export", "Agriculture", "Industry"],
      eco: "Average 78% recycled content; 100% recyclable and repulpable.",
    },
    items: [
      {
        n: "Corrugated Sheets",
        b: "Board sheets in every flute profile for converters and fabricators.",
      },
      { n: "Single Wall Boxes", b: "The versatile standard for loads up to 30 kg." },
      { n: "Double Wall Boxes", b: "BC-flute strength for stacking and export transit." },
      {
        n: "Triple Wall Boxes",
        b: "Pallet-load performance approaching wooden crates at a fraction of the weight.",
      },
      { n: "Shipping Cartons", b: "Regular slotted cartons in stock and custom sizes." },
      { n: "Export Cartons", b: "Humidity-resistant, ISPM-15-exempt export packaging." },
      { n: "E-commerce Boxes", b: "Right-sized mailers that cut void fill and DIM-weight costs." },
      {
        n: "Subscription Boxes",
        b: "Unboxing-experience boxes with full-color inside/outside print.",
      },
      { n: "Moving Boxes", b: "Double-thick handles and stacking strength for relocation." },
      { n: "Heavy Duty Boxes", b: "High-ECT board for industrial parts and dense loads." },
      {
        n: "Produce Cartons",
        b: "Ventilated, moisture-resistant trays and cartons for fresh produce.",
      },
      { n: "Fruit Boxes", b: "Telescopic and display-ready fruit packaging for field-to-shelf." },
      {
        n: "Seafood Boxes",
        b: "Wet-strength, leak-resistant boxes with optional PE-free barrier.",
        e: "Plastic-free barrier coating option.",
      },
      {
        n: "Industrial Cartons",
        b: "Custom-engineered transit packaging with foam-free paper fitments.",
      },
    ],
  },
  {
    name: "Retail Packaging",
    tagline: "Bags that carry your brand.",
    description:
      "From twisted-handle supermarket bags to laminated luxury boutique bags with ribbon handles — printed, embossed, foiled, and finished in-house.",
    icon: "🛍️",
    defaults: {
      specs: [
        "90–250 GSM kraft or coated board",
        "Twisted, flat, ribbon, or die-cut handles",
        "Full-color flexo/offset print",
      ],
      applications: ["Retail", "Fashion", "Hospitality", "Events", "Corporate gifting"],
      eco: "Reusable, recyclable, plastic-free; certified compostable options.",
    },
    items: [
      { n: "Shopping Bags" },
      { n: "Luxury Bags", b: "Rigid laminated bags with foil, embossing, and grosgrain handles." },
      { n: "Fashion Bags" },
      { n: "Jewelry Bags" },
      { n: "Cosmetic Bags" },
      { n: "Wine Bags", b: "Single and twin-bottle bags with reinforced bases." },
      { n: "Bakery Bags" },
      { n: "Fast Food Bags", b: "Grease-resistant SOS bags for quick service restaurants." },
      { n: "Supermarket Bags" },
      { n: "Pharmacy Bags" },
      { n: "Boutique Bags" },
      { n: "Restaurant Bags" },
      { n: "Takeaway Bags" },
      { n: "Gift Bags" },
      { n: "Event Bags" },
      { n: "Wedding Bags" },
      { n: "Birthday Bags" },
      { n: "Christmas Bags" },
      { n: "Easter Bags" },
      { n: "Corporate Gift Bags" },
      { n: "Conference Bags" },
      { n: "Promotional Bags" },
      {
        n: "Custom Branded Bags",
        b: "Fully bespoke bags from structural design to finished print, MOQ 1,000.",
      },
    ],
  },
  {
    name: "Food Packaging",
    tagline: "Food-safe. Planet-safe. Shelf-ready.",
    description:
      "Certified food-contact packaging — cups, boxes, trays, and containers with water-based barriers that replace single-use plastic across food service.",
    icon: "🍔",
    defaults: {
      specs: [
        "Food-contact certified (EU 1935/2004, FDA)",
        "PE-free barrier options",
        "Custom print",
      ],
      applications: ["QSR", "Cafés", "Catering", "Delivery", "Retail food"],
      eco: "Compostable (EN 13432) and recyclable options; PFAS-free barriers.",
    },
    items: [
      { n: "Pizza Boxes", b: "Ventilated corrugated boxes that keep crusts crisp in transit." },
      { n: "Burger Boxes" },
      { n: "Cake Boxes" },
      { n: "Pastry Boxes" },
      { n: "Donut Boxes" },
      { n: "Ice Cream Cups" },
      {
        n: "Coffee Cups",
        b: "Single and double-wall hot cups with aqueous (plastic-free) lining.",
        e: "Fully recyclable in standard paper streams.",
      },
      { n: "Tea Cups" },
      { n: "Cold Drink Cups" },
      { n: "Paper Straws", b: "3-ply straws that stay firm for 4+ hours in cold drinks." },
      { n: "Paper Plates" },
      { n: "Paper Bowls" },
      { n: "Takeaway Containers", b: "Leak-resistant kraft food pails and clamshells." },
      { n: "Food Trays" },
      { n: "Lunch Boxes" },
      { n: "Popcorn Boxes" },
      { n: "Snack Containers" },
      { n: "Disposable Food Packs" },
    ],
  },
  {
    name: "Hygiene Products",
    tagline: "Softness at scale — tissue for homes, hospitals, and industry.",
    description:
      "TAD and conventional tissue across consumer and away-from-home formats: bathroom tissue, towels, napkins, facial, and clinical grades from our dedicated tissue mills.",
    icon: "🧻",
    defaults: {
      specs: ["1–4 ply", "Virgin, recycled, or bamboo furnish", "Dermatologically tested"],
      applications: ["Households", "Hospitality", "Healthcare", "Industry", "Food service"],
      eco: "Plastic-free paper packaging; fiber from certified forests or recovered paper.",
    },
    items: [
      { n: "Toilet Paper" },
      { n: "Luxury Toilet Paper", b: "4-ply quilted, lotion-finished premium bathroom tissue." },
      {
        n: "Economy Toilet Paper",
        b: "High-value recycled-fiber rolls for cost-conscious buyers.",
      },
      { n: "Kitchen Towels" },
      { n: "Paper Towels" },
      { n: "Facial Tissues" },
      { n: "Pocket Tissues" },
      { n: "Napkins" },
      { n: "Restaurant Napkins" },
      { n: "Cocktail Napkins" },
      { n: "Medical Tissues", b: "Low-lint clinical wipes and couch rolls for care settings." },
      { n: "Hospital Tissues" },
      { n: "Wet Wipe Packaging" },
      { n: "Industrial Wipes", b: "High-absorbency, solvent-resistant wipers for workshops." },
      { n: "Hand Towels", b: "Interfold and V-fold towels for dispenser systems." },
      { n: "Jumbo Rolls" },
      { n: "Centerfeed Rolls" },
      { n: "Dispenser Rolls" },
    ],
  },
  {
    name: "Education Products",
    tagline: "Paper that powers learning.",
    description:
      "Exercise books, notebooks, art papers, and classroom stationery supplied to ministries of education, school chains, and retailers across five continents.",
    icon: "📚",
    defaults: {
      specs: ["55–100 GSM writing paper", "Sewn, stapled, or spiral binding", "Custom covers"],
      applications: ["Schools", "Universities", "NGOs", "Government programs", "Retail"],
      eco: "Program-linked: every 100 books sold funds one donated book via the Sylvara Foundation.",
    },
    items: [
      { n: "Exercise Books" },
      { n: "Notebooks" },
      { n: "Journals" },
      { n: "Sketch Books" },
      { n: "Drawing Paper" },
      { n: "Craft Paper" },
      { n: "Origami Paper" },
      { n: "Colored Paper" },
      { n: "Exam Sheets" },
      { n: "Answer Booklets" },
      { n: "Writing Pads" },
      { n: "Sticky Notes" },
      { n: "Flash Cards" },
      { n: "Educational Kits" },
      { n: "School Stationery" },
    ],
  },
  {
    name: "Office Products",
    tagline: "Professional stationery and filing, beautifully made.",
    description:
      "Corporate stationery, envelopes, filing, and archival systems — plus full brand-suite printing for enterprises.",
    icon: "🗂️",
    defaults: {
      specs: ["80–350 GSM", "Standard and custom formats", "Corporate branding available"],
      applications: ["Corporates", "Government", "Legal", "Banking", "SMEs"],
      eco: "Carbon-neutral product line; archival grades are acid-free for 100+ year permanence.",
    },
    items: [
      { n: "Envelopes", s: ["DL, C4, C5, C6", "Gummed, peel & seal", "Window options"] },
      { n: "Folders" },
      { n: "Files" },
      { n: "Archives", b: "Acid-free archival boxes and sleeves for records management." },
      { n: "Document Storage Boxes" },
      { n: "Business Cards" },
      { n: "Letterheads" },
      { n: "Corporate Stationery" },
      { n: "Memo Pads" },
      { n: "Calendars" },
      { n: "Diaries" },
    ],
  },
  {
    name: "Publishing",
    tagline: "Print runs from one thousand to one hundred million.",
    description:
      "Complete publishing paper and print services: books, textbooks, periodicals, catalogues, and marketing collateral with global logistics.",
    icon: "📰",
    defaults: {
      specs: ["Web and sheet-fed", "Full bindery in-house", "Global distribution"],
      applications: ["Publishers", "Agencies", "Brands", "Institutions"],
      eco: "Vegetable-based inks and certified paper on every run.",
    },
    items: [
      { n: "Books" },
      { n: "Textbooks" },
      { n: "Newspapers" },
      { n: "Magazines" },
      { n: "Catalogues" },
      { n: "Brochures" },
      { n: "Flyers" },
      { n: "Posters" },
      { n: "Packaging Inserts" },
      { n: "Labels" },
      { n: "Tags" },
      { n: "Manuals" },
      { n: "Directories" },
    ],
  },
  {
    name: "Industrial Paper",
    tagline: "Technical papers engineered to specification.",
    description:
      "Specialty and technical grades for filtration, electrical, construction, medical, and automotive applications — developed with customers in our research center.",
    icon: "⚙️",
    defaults: {
      specs: [
        "Custom-engineered",
        "Tight tolerance manufacturing",
        "Technical datasheets available",
      ],
      applications: ["Filtration", "Electrical", "Construction", "Medical", "Automotive"],
      eco: "Process water 92% closed-loop; ISO 14001 certified mills.",
    },
    items: [
      { n: "Filter Paper", b: "Automotive, laboratory, and beverage filtration grades." },
      {
        n: "Electrical Insulation Paper",
        b: "Presspaper and crepe grades for transformers and cables.",
      },
      { n: "Construction Paper" },
      { n: "Gypsum Liner", b: "Face and back liners for plasterboard production." },
      { n: "Decorative Laminates", b: "Décor base papers for HPL and furniture surfaces." },
      { n: "Release Paper", b: "Silicone-coated release liners for labels and composites." },
      { n: "Medical Paper", b: "Sterilization-grade papers for medical device packaging." },
      { n: "Pharmaceutical Packaging" },
      { n: "Laboratory Paper" },
      { n: "Automotive Paper" },
      { n: "Paper Tubes" },
      { n: "Paper Cores", b: "High-crush cores for film, textile, and paper winding." },
      { n: "Industrial Rolls" },
    ],
  },
  {
    name: "Agriculture",
    tagline: "Paper solutions for farm and field.",
    description:
      "Packaging and growing solutions for agriculture — from multiwall sacks to molded-fiber trays and biodegradable mulch that eliminates field plastic.",
    icon: "🌾",
    defaults: {
      specs: ["High wet-strength options", "Food-chain compliant", "UV-stable prints"],
      applications: ["Farms", "Cooperatives", "Agro-processors", "Exporters", "Nurseries"],
      eco: "Soil-biodegradable alternatives to agricultural plastic films.",
    },
    items: [
      { n: "Seed Bags" },
      { n: "Fertilizer Sacks", b: "3–4 ply multiwall sacks with moisture barriers, 25–50 kg." },
      { n: "Animal Feed Bags" },
      { n: "Produce Packaging" },
      {
        n: "Egg Trays",
        b: "Molded fiber trays from 100% recycled paper.",
        e: "100% recycled and home-compostable.",
      },
      { n: "Fruit Cartons" },
      { n: "Vegetable Cartons" },
      { n: "Plant Pots", b: "Plantable fiber pots that decompose in soil in one season." },
      { n: "Mulching Paper", b: "Biodegradable weed-suppression mulch — no plastic retrieval." },
      { n: "Nursery Products" },
    ],
  },
  {
    name: "Eco Products",
    tagline: "The plastic-replacement portfolio.",
    description:
      "Our fastest-growing line: molded fiber, honeycomb board, paper bottles, and compostable formats engineered to remove plastic from supply chains without compromise.",
    icon: "🌱",
    defaults: {
      specs: ["EN 13432 / ASTM D6400 compostable options", "Curbside recyclable", "Custom molded"],
      applications: ["FMCG", "Electronics", "Cosmetics", "Furniture", "Logistics"],
      eco: "Each product ships with a verified LCA and plastic-displacement certificate.",
    },
    items: [
      { n: "Reusable Paper Bags", b: "Washable, 50+ use kraft-cellulose hybrid carriers." },
      { n: "Biodegradable Packaging" },
      { n: "Compostable Packaging" },
      {
        n: "Plastic Alternatives",
        b: "Drop-in paper replacements for shrink, blister, and clamshell formats.",
      },
      {
        n: "Paper Bottles",
        b: "Molded fiber bottles with plant-based liners for home care and cosmetics.",
      },
      { n: "Paper Cutlery" },
      {
        n: "Paper Furniture",
        b: "Honeycomb-core desks, shelves, and displays — flat-packed, 100% recyclable.",
      },
      { n: "Honeycomb Boards", b: "Lightweight structural panels replacing wood and foam." },
      { n: "Eco Mailers", b: "Padded paper mailers replacing bubble plastic." },
      { n: "Protective Packaging", b: "Paper void-fill, edge protectors, and cushioning systems." },
      { n: "Molded Fiber Products", b: "Custom-tooled molded pulp for any product geometry." },
    ],
  },
  {
    name: "Custom Products",
    tagline: "If you can imagine it in paper, we can make it.",
    description:
      "Bespoke design-to-delivery service for events, brands, and institutions — structural design, prototyping, print, finishing, and fulfilment under one roof.",
    icon: "🎁",
    defaults: {
      specs: ["Free structural design service", "Prototypes in 5 days", "MOQ from 500"],
      applications: [
        "Weddings & events",
        "Corporate",
        "Faith communities",
        "Retail chains",
        "E-commerce",
      ],
      eco: "Custom work defaults to certified fiber and plastic-free finishes.",
    },
    items: [
      { n: "Wedding Invitations" },
      { n: "Wedding Packaging" },
      { n: "Birthday Gift Packaging" },
      { n: "Corporate Branding Kits" },
      { n: "Luxury Gift Boxes", b: "Rigid boxes with magnetic closures, foil, and silk lining." },
      { n: "Luxury Packaging" },
      { n: "Christmas Hampers" },
      { n: "Valentine Packaging" },
      { n: "Baby Shower Packaging" },
      { n: "Graduation Packaging" },
      { n: "Funeral Programs" },
      { n: "Church Stationery" },
      { n: "Mosque Stationery" },
      { n: "Event Souvenirs" },
      { n: "Customized Notebooks" },
      { n: "Customized Tissues" },
      {
        n: "Customized Toilet Paper Branding",
        b: "Printed and embossed tissue for hotels and brands.",
      },
      { n: "Customized Supermarket Bags" },
      { n: "Customized Pharmacy Bags" },
      { n: "Customized Restaurant Packaging" },
      { n: "Customized E-commerce Packaging" },
      { n: "Corporate Promotional Products" },
    ],
  },
];

const buildBlurb = (name: string, category: CategorySeed) =>
  `${name} manufactured to international quality standards by Sylvara Paper Group — ${category.tagline.toLowerCase()} Available in standard and custom specifications with global delivery.`;

export const categories: ProductCategory[] = seeds.map((c) => ({
  name: c.name,
  slug: slugify(c.name),
  tagline: c.tagline,
  description: c.description,
  icon: c.icon,
  products: c.items.map((p) => ({
    name: p.n,
    slug: slugify(p.n),
    blurb: p.b ?? buildBlurb(p.n, c),
    specs: p.s ?? c.defaults.specs,
    applications: p.a ?? c.defaults.applications,
    eco: p.e ?? c.defaults.eco,
  })),
}));

export const totalProducts = categories.reduce((sum, c) => sum + c.products.length, 0);

export const getCategory = (slug: string) => categories.find((c) => c.slug === slug);

export const getProduct = (categorySlug: string, productSlug: string) => {
  const category = getCategory(categorySlug);
  const product = category?.products.find((p) => p.slug === productSlug);
  return category && product ? { category, product } : undefined;
};

/** Flat list used by search / AI product finder. */
export const allProducts = categories.flatMap((c) =>
  c.products.map((p) => ({ ...p, category: c.name, categorySlug: c.slug })),
);
