import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-family)'],
      },
      colors: {
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
