import type { Config } from "tailwindcss";
import { generateTailwindConfig } from "./lib/theme-config";

const themeConfig = generateTailwindConfig();

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      ...themeConfig.theme?.extend,
      fontFamily: {
        sans: ['var(--font-family)', ...themeConfig.theme?.extend?.fontFamily?.sans || []],
      },
      colors: {
        ...themeConfig.theme?.extend?.colors,
        grid: 'var(--color-grid)',
        glow: 'var(--color-glow)',
        page: 'var(--color-page)',
      },
      animation: {
        shake: "shake 0.5s ease-in-out both",
      },
    },
  },
  plugins: [],
};

export default config;
