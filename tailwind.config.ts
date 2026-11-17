import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        navy: {
          50: "#EEF3F9",
          100: "#DCE5F2",
          200: "#BACEE4",
          300: "#8FAED2",
          400: "#5D87B8",
          500: "#36649C",
          600: "#224C82",
          700: "#183C6C",
          800: "#102D53", // Primary Navy
          900: "#0A1D36",
          950: "#061120",
        },
        brandBlue: {
          DEFAULT: "#2563EB",
          50: "#EFF6FF",
          100: "#DBEAFE",
          500: "#2563EB",
          600: "#1D4ED8",
          700: "#1E40AF",
        },
        gold: {
          50: "#FCF9EE",
          100: "#F8F1D5",
          200: "#F1E0A7",
          300: "#E7CA74",
          400: "#DFB755",
          500: "#D6A84D", // Gold Accent
          600: "#B8862F",
          700: "#926323",
          800: "#754C20",
        },
        surface: "#F5F7FB",
        brandText: "#172033",
        brandSuccess: "#16A34A",
      },
      fontFamily: {
        sans: ["var(--font-poppins)", "Inter", "sans-serif"],
        bangla: ["var(--font-hind-siliguri)", "sans-serif"],
      },
      boxShadow: {
        soft: "0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
        card: "0 4px 20px -2px rgba(16, 45, 83, 0.08)",
        floating: "0 10px 30px -5px rgba(16, 45, 83, 0.15)",
      },
    },
  },
  plugins: [],
};
export default config;
