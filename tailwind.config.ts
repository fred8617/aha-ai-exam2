import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "tutor-gradient--light":
          "linear-gradient(270deg, #FFD25F 0.13%, #FF5C01 100%)",
      },
    },
  },
  plugins: [],
};
export default config;
