import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand colors from Ilala Lodge Brand Guide
        brand: {
          forest: "#222715",    // Primary dark green/black
          greenery: "#393127",  // Olive/greenish brown
          stem: "#636449",      // Muted green
          daisy: "#eaeadb",     // Cream/off-white
          gold: "#d0a44f",      // Golden accent
          script: "#2227155e",  // Script font color with opacity
        },
      },
      fontFamily: {
        // Using system fonts as fallback until custom fonts are loaded
        script: ["var(--font-script)", "cursive"],
        serif: ["var(--font-serif)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        heading: ["var(--font-heading)", "Georgia", "serif"],
      },
    },
  },
  plugins: [],
};

export default config;
