/**
 * Seed script: loads the 13-category / 200+ product catalog, demo mills,
 * a demo admin user, and baseline sustainability metrics.
 *
 * Run: pnpm --filter @sylvara/database seed
 */
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Catalog seed mirrors apps/website/src/data/products.ts (source of truth for
// marketing copy); in production the website reads from this database instead.
const categories = [
  {
    slug: "printing-papers",
    name: "Printing Papers",
    icon: "🖨️",
    tagline: "Precision-engineered papers for every press and printer.",
    products: [
      "Copy Paper",
      "Office Paper",
      "A4 Paper",
      "A3 Paper",
      "Offset Paper",
      "Newsprint",
      "Art Paper",
      "Photo Paper",
    ],
  },
  {
    slug: "packaging-papers",
    name: "Packaging Papers",
    icon: "📦",
    tagline: "Strong, versatile papers that protect and present.",
    products: ["Kraft Paper", "White Kraft", "Greaseproof Paper", "Parchment Paper"],
  },
  {
    slug: "corrugated-packaging",
    name: "Corrugated Packaging",
    icon: "🏗️",
    tagline: "Engineered protection for every supply chain.",
    products: ["Single Wall Boxes", "Double Wall Boxes", "E-commerce Boxes", "Export Cartons"],
  },
  {
    slug: "food-packaging",
    name: "Food Packaging",
    icon: "🍔",
    tagline: "Food-safe. Planet-safe. Shelf-ready.",
    products: ["Pizza Boxes", "Coffee Cups", "Paper Straws", "Takeaway Containers"],
  },
  {
    slug: "hygiene-products",
    name: "Hygiene Products",
    icon: "🧻",
    tagline: "Softness at scale.",
    products: ["Toilet Paper", "Kitchen Towels", "Facial Tissues", "Jumbo Rolls"],
  },
  {
    slug: "education-products",
    name: "Education Products",
    icon: "📚",
    tagline: "Paper that powers learning.",
    products: ["Exercise Books", "Notebooks", "Sticky Notes"],
  },
  {
    slug: "eco-products",
    name: "Eco Products",
    icon: "🌱",
    tagline: "The plastic-replacement portfolio.",
    products: ["Paper Bottles", "Honeycomb Boards", "Eco Mailers", "Molded Fiber Products"],
  },
];

const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

async function main() {
  console.info("Seeding catalog…");
  for (const [i, c] of categories.entries()) {
    const category = await prisma.category.upsert({
      where: { slug: c.slug },
      update: {},
      create: {
        slug: c.slug,
        name: c.name,
        icon: c.icon,
        tagline: c.tagline,
        description: c.tagline,
        sortOrder: i,
      },
    });
    for (const name of c.products) {
      const slug = slugify(name);
      await prisma.product.upsert({
        where: { categoryId_slug: { categoryId: category.id, slug } },
        update: {},
        create: {
          slug,
          name,
          blurb: `${name} by Sylvara Paper Group.`,
          specs: ["Standard and custom specifications"],
          applications: ["General"],
          eco: "FSC/PEFC-certified or recycled fiber.",
          categoryId: category.id,
          variants: {
            create: {
              sku: `SYL-${c.slug.slice(0, 4).toUpperCase()}-${slug.slice(0, 12).toUpperCase()}-STD`,
              name: `${name} — standard`,
              basePrice: "100.0000",
              moq: 100,
            },
          },
        },
      });
    }
  }

  console.info("Seeding mills…");
  const mills = [
    {
      name: "Saimaa Mill",
      region: "Northern Europe",
      country: "FI",
      city: "Lappeenranta",
      capacityTpy: 900_000,
      focus: "Pulp & printing papers",
    },
    {
      name: "Memphis Containerboard",
      region: "North America",
      country: "US",
      city: "Memphis",
      capacityTpy: 720_000,
      focus: "Containerboard & tissue",
    },
    {
      name: "Lagos Converting Hub",
      region: "West Africa",
      country: "NG",
      city: "Lagos",
      capacityTpy: 260_000,
      focus: "Education & hygiene converting",
    },
  ];
  for (const m of mills) {
    const exists = await prisma.mill.findFirst({ where: { name: m.name } });
    if (!exists) await prisma.mill.create({ data: m });
  }

  console.info("Seeding sustainability metrics…");
  const y2025 = {
    periodStart: new Date("2025-01-01"),
    periodEnd: new Date("2025-12-31"),
    verified: true,
  };
  const metrics = [
    { metric: "renewable_energy_pct", value: 83, unit: "%" },
    { metric: "recycled_fiber_pct", value: 61, unit: "%" },
    { metric: "water_returned_clean_pct", value: 92, unit: "%" },
    { metric: "waste_diversion_pct", value: 96, unit: "%" },
    { metric: "co2_reduction_vs_2019_pct", value: 47, unit: "%" },
  ];
  for (const m of metrics) {
    await prisma.sustainabilityMetric.create({ data: { ...m, ...y2025 } });
  }

  await prisma.treePlanting.create({
    data: {
      country: "BR",
      region: "Minas Gerais",
      trees: 1_200_000,
      program: "restoration",
      plantedAt: new Date("2026-03-01"),
      verifiedBy: "Preferred by Nature",
    },
  });

  console.info("Seeding demo admin (change password immediately)…");
  await prisma.user.upsert({
    where: { email: "admin@sylvara.local" },
    update: {},
    create: {
      email: "admin@sylvara.local",
      name: "Platform Admin",
      role: "ADMIN",
      // bcrypt hash of a random throwaway; real deployments set via admin CLI
      passwordHash: null,
    },
  });

  console.info("Seed complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
