import type { Config } from "tailwindcss";

export default {
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
        primary: "var(--primary)",
        secondary: "var(--secondary)",
        darkGold: "var(--darkGold)"
      },
      fontFamily: {
        optim: "var(--font-optim)",
        epilogue: "var(--font-epilogue)",
        manrope: "var(--font-manrope)"
      }
    },
  },
  plugins: [],
} satisfies Config;
