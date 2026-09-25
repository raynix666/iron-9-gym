import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        iron: {
          black: "#0b0b0d",
          panel: "#16171a",
          red: "#e10600",
          silver: "#c5c7cc",
        },
      },
      fontFamily: {
        display: ["Bebas Neue", "Impact", "sans-serif"],
        body: ["Inter", "sans-serif"],
        arabic: ["Cairo", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
