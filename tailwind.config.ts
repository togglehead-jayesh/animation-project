import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./sections/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        champagne: "var(--champagne)",
        ivory: "var(--ivory)",
        grey: "var(--grey)",
      },
    },
  },
  plugins: [],
};
export default config;
