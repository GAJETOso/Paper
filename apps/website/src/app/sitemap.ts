import type { MetadataRoute } from "next";
import { categories } from "@/data/products";
import { articles } from "@/data/news";
import { SITE_URL } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = [
    "",
    "/about",
    "/operations",
    "/industries",
    "/products",
    "/value-chain",
    "/innovation",
    "/quality",
    "/sustainability",
    "/foundation",
    "/media",
    "/investors",
    "/careers",
    "/downloads",
    "/faqs",
    "/partners",
    "/contact",
    "/support",
    "/tools",
  ].map((p) => ({
    url: `${SITE_URL}${p}`,
    changeFrequency: "weekly" as const,
    priority: p === "" ? 1 : 0.8,
  }));

  const categoryPaths = categories.map((c) => ({
    url: `${SITE_URL}/products/${c.slug}`,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const productPaths = categories.flatMap((c) =>
    c.products.map((p) => ({
      url: `${SITE_URL}/products/${c.slug}/${p.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  );

  const articlePaths = articles.map((a) => ({
    url: `${SITE_URL}/media#${a.slug}`,
    changeFrequency: "yearly" as const,
    priority: 0.5,
  }));

  return [...staticPaths, ...categoryPaths, ...productPaths, ...articlePaths];
}
