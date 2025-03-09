import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    fontSize: {
      xs: ["0.8125rem", { lineHeight: "1.5rem" }],
      sm: ["0.875rem", { lineHeight: "1.5rem" }],
      base: ["1rem", { lineHeight: "1.75rem" }],
      lg: ["1.125rem", { lineHeight: "1.75rem" }],
      xl: ["1.25rem", { lineHeight: "2rem" }],
      "2xl": ["1.5rem", { lineHeight: "2rem" }],
      "3xl": ["1.875rem", { lineHeight: "2.25rem" }],
      "4xl": ["2rem", { lineHeight: "2.5rem" }],
      "5xl": ["3rem", { lineHeight: "3.5rem" }],
      "6xl": ["3.75rem", { lineHeight: "1" }],
      "7xl": ["4.5rem", { lineHeight: "1" }],
      "8xl": ["6rem", { lineHeight: "1" }],
      "9xl": ["8rem", { lineHeight: "1" }],
      '11px': '11px', // 添加 11px 字体大小
      '14px': '14px', // 添加 14px 字体大小
    },
    extend: {
      animation: {
        shake: "shake 0.5s ease-in-out both",
      },
      colors: {
        myred: {
          100: '#FDB1BD',
          200: '#FD9DAC',
          300: '#FD8497',
          400: '#FD657D',
          500: '#FD3E5D',
          600: '#FD0E35',
          700: '#CA0B2A',
          800: '#A20922',
          900: '#82071B',
          1000: '#680616',
        },
        mygray: {
          100: "#E1E1E1",
          200: "#CFCFD1",
          300: "#B4B4B6",
          400: "#898A8D",
          500: "#46494E",
          600: "#242528",
          700: "#17181A",
          800: "#0E0F11",
          900: "#090A0B",
          1000: "#000000",
        }
      },
    },
  },
  plugins: [],
};
export default config;
