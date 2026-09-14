import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { FlatCompat } from "@eslint/eslintrc";

const __dirname = dirname(fileURLToPath(import.meta.url));

// Next.js 16 removed the `next lint` command entirely (it was deprecated
// since 15). eslint-config-next@15.5.20 doesn't ship a native flat-config
// export yet, so wrap it with FlatCompat per Next's own migration guidance.
const compat = new FlatCompat({ baseDirectory: __dirname });

const eslintConfig = [
  { ignores: [".next/**", "node_modules/**", "coverage/**"] },
  ...compat.extends("next/core-web-vitals"),
];

export default eslintConfig;
