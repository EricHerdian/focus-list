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
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "primary-color": "#2B2D42",
        "secondary-color": "#8D99AE",
        "sidebar-color": "#202232",
        "task-color": "#3D3F51",
      },
      boxShadow: {
        "inner-border": `inset 0 0 0 4px #2B2D42`,
      },
    },
  },
  plugins: [],
};
export default config;
