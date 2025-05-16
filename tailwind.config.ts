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
        "primary": "#262427",
        "navcolor": "#101112",
        "accent": "#282c34",
      },
      colors: {
        "fg-primary": "#fcfcfa",
        "fg-secondary": "#49cae4",
        "fg-accent": "#ffca58",
      },
    },
  },
  plugins: [],
};
export default config;
