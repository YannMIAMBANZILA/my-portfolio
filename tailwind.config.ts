import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "#E82127", // Tesla Red
        secondary: "#111111", // Dark dashboard gray
        dark: "#000000", // Pure black for OLED feel
        accent: "#38bdf8", // Electric blue for data/HUD elements
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-roboto-mono)", "monospace"], // For data/metrics
      },
    },
  },
  plugins: [],
};

export default config;
