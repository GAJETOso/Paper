import { test, expect } from "@playwright/test";

test.describe("Home", () => {
  test("renders hero and navigation", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/Sylvara/);
    await expect(page.getByRole("heading", { level: 1 })).toContainText(/From forest/i);
    // The desktop nav landmark is hidden (display:none, so absent from the
    // a11y tree) below the lg breakpoint in favor of a hamburger toggle.
    const viewport = page.viewportSize();
    if (viewport && viewport.width < 1024) {
      await expect(page.getByRole("button", { name: /toggle menu/i })).toBeVisible();
    } else {
      await expect(page.getByRole("navigation", { name: "Primary" })).toBeVisible();
    }
  });

  test("skip link targets main content", async ({ page }) => {
    await page.goto("/");
    const skip = page.getByRole("link", { name: /skip to main content/i });
    await expect(skip).toHaveAttribute("href", "#main");
  });
});

test.describe("Product catalog", () => {
  test("category page lists products", async ({ page }) => {
    await page.goto("/products/printing-papers");
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Printing Papers");
    await expect(page.getByRole("link", { name: /Copy Paper/ }).first()).toBeVisible();
  });

  test("product page shows specs and quote actions", async ({ page }) => {
    await page.goto("/products/printing-papers/copy-paper");
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Copy Paper");
    await expect(page.getByRole("heading", { name: "Specifications" })).toBeVisible();
    await expect(page.getByRole("link", { name: /request quote online/i })).toBeVisible();
  });

  test("unknown product 404s", async ({ page }) => {
    const res = await page.goto("/products/printing-papers/unobtainium");
    expect(res?.status()).toBe(404);
  });
});

test.describe("Sustainability", () => {
  test("dashboard shows headline metrics", async ({ page }) => {
    await page.goto("/sustainability");
    await expect(page.getByText("Net zero target")).toBeVisible();
    await expect(page.getByText("Recycled fiber input", { exact: true })).toBeVisible();
  });
});

test.describe("Tools", () => {
  test("GSM calculator computes ream weight", async ({ page }) => {
    await page.goto("/tools");
    await expect(page.getByText(/GSM & weight calculator/)).toBeVisible();
    // default: A4 80gsm × 500 sheets ≈ 2.49 kg
    await expect(page.getByText(/2\.49 kg/)).toBeVisible();
  });
});

test.describe("Contact API", () => {
  test("rejects invalid payloads", async ({ request }) => {
    const res = await request.post("/api/contact", { data: { name: "x" } });
    expect(res.status()).toBe(422);
  });

  test("accepts a valid lead", async ({ request }) => {
    const res = await request.post("/api/contact", {
      data: { name: "Test Buyer", email: "buyer@example.com", message: "Quote for A4 paper" },
    });
    expect(res.ok()).toBeTruthy();
  });
});

test.describe("SEO", () => {
  test("serves sitemap and robots", async ({ request }) => {
    expect((await request.get("/sitemap.xml")).ok()).toBeTruthy();
    expect((await request.get("/robots.txt")).ok()).toBeTruthy();
  });

  test("product page emits Product JSON-LD", async ({ page }) => {
    await page.goto("/products/food-packaging/coffee-cups");
    const jsonLd = await page.locator('script[type="application/ld+json"]').allTextContents();
    expect(jsonLd.some((s) => s.includes('"@type":"Product"'))).toBeTruthy();
  });
});
