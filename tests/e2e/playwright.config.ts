import { existsSync } from "node:fs";
import { defineConfig, devices } from "@playwright/test";

/**
 * E2E suite for the flagship website. CI builds the site first, then this
 * config starts `next start` and runs the specs against it.
 */

// Some sandboxes pre-install a Chromium build that doesn't match the browser
// revision this Playwright version expects to download. Use it only when
// present and only outside CI (which installs the matching browser itself).
const sandboxChromium = "/opt/pw-browsers/chromium";
const launchOptions =
  !process.env.CI && existsSync(sandboxChromium) ? { executablePath: sandboxChromium } : {};

export default defineConfig({
  testDir: ".",
  timeout: 30_000,
  fullyParallel: true,
  retries: process.env.CI ? 2 : 0,
  reporter: process.env.CI ? [["html"], ["github"]] : "list",
  use: {
    baseURL: "http://localhost:3000",
    trace: "on-first-retry",
  },
  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"], launchOptions } },
    { name: "mobile", use: { ...devices["Pixel 7"], launchOptions } },
  ],
  webServer: {
    command: "pnpm --filter @sylvara/website start",
    url: "http://localhost:3000/api/health",
    reuseExistingServer: !process.env.CI,
    timeout: 60_000,
  },
});
