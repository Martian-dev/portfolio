import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/ui/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        "primary": "#1d1e20",
        "navcolor": "#101112",
        "accent": "#282c34",
      },
      colors: {
        "fg-primary": "#ffffff",
        "fg-secondary": "#0ff0fc",
        "fg-accent": "#fff01f",
      },
    },
  },
  plugins: [],
};
export default config;
