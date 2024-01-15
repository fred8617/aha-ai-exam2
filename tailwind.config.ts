import type { Config } from "tailwindcss";
const config: Config = {
  important: "#__next",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: { xs: { min: "0px", max: "630px" }, "2xl": "1440px" },
      backgroundImage: {
        "tutor-gradient--light":
          "linear-gradient(270deg, #FFD25F 0.13%, #FF5C01 100%)",
      },
    },
  },
  plugins: [],
};
export default config;
