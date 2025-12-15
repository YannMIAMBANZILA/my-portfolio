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
    // Couleurs inspirées de ton design Behance
    primary: "#6366f1", // Un violet indigo
    secondary: "#1e293b", // Un gris ardoise foncé
    dark: "#0f172a", // Le fond très sombre
  },
    },
  },
  plugins: [],
};

export default config;
