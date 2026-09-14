/**
 * Prisma 7 config. As of v7, the schema no longer carries a connection
 * `url` — Migrate/Studio read DATABASE_URL from the environment via this
 * file, while the runtime client connects through an explicit driver
 * adapter (see src/index.ts).
 */
import path from "node:path";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: path.join("prisma", "schema.prisma"),
});
