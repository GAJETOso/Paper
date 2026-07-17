import type { Config } from "tailwindcss";

/**
 * Sylvara design system — Tailwind theme.
 * Tokens mirror packages/design-system/tokens.json.
 */
const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        forest: {
          50: "#f2f8f4",
          100: "#dfeee3",
          200: "#c1dcca",
          300: "#96c3a8",
          400: "#68a482",
          500: "#478764",
          600: "#356c4f",
          700: "#2b5741",
          800: "#254636",
          900: "#1f3a2d",
          950: "#0e2118",
        },
        paper: {
          50: "#fbfaf7",
          100: "#f5f2eb",
          200: "#e9e3d5",
          300: "#d9cfb8",
          400: "#c5b494",
          500: "#b39d78",
          600: "#a08760",
          700: "#856e4f",
          800: "#6d5a44",
          900: "#594a3a",
        },
        ink: {
          50: "#f6f7f8",
          100: "#eaecee",
          200: "#d9dde1",
          300: "#bcc3ca",
          400: "#9aa4ae",
          500: "#7e8994",
          600: "#66707c",
          700: "#535b66",
          800: "#474d56",
          900: "#2b2f35",
          950: "#16181c",
        },
      },
      fontFamily: {
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Inter",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
        serif: ["Georgia", "Cambria", "Times New Roman", "serif"],
      },
      animation: {
        "fade-up": "fadeUp 0.7s cubic-bezier(0.22, 1, 0.36, 1) both",
        "fade-in": "fadeIn 0.9s ease both",
        float: "float 7s ease-in-out infinite",
        "spin-slow": "spin 24s linear infinite",
        shimmer: "shimmer 2.4s linear infinite",
      },
      keyframes: {
        fadeUp: {
          from: { opacity: "0", transform: "translateY(24px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: { from: { opacity: "0" }, to: { opacity: "1" } },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-14px)" },
        },
        shimmer: {
          from: { backgroundPosition: "200% 0" },
          to: { backgroundPosition: "-200% 0" },
        },
      },
      boxShadow: {
        glass: "0 8px 32px rgba(14, 33, 24, 0.12)",
        lift: "0 24px 60px -20px rgba(14, 33, 24, 0.35)",
      },
    },
  },
  plugins: [],
};

export default config;
