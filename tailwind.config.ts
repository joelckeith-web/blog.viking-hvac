import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: "#004281",
          "dark-secondary": "#002147",
          accent: "#eb1c23",
          "accent-hover": "#c41018",
          "accent-light": "rgba(235, 28, 35, 0.08)",
          text: "#333333",
          "text-secondary": "#555555",
          white: "#FFFFFF",
        },
      },
      fontFamily: {
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          '"Segoe UI"',
          "Roboto",
          '"Helvetica Neue"',
          "Arial",
          '"Noto Sans"',
          "sans-serif",
        ],
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: "none",
            color: "#333333",
            a: {
              color: "#eb1c23",
              "&:hover": {
                color: "#c41018",
              },
            },
            h1: {
              color: "#004281",
            },
            h2: {
              color: "#004281",
            },
            h3: {
              color: "#002147",
            },
            strong: {
              color: "#002147",
            },
            blockquote: {
              borderLeftColor: "#eb1c23",
            },
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;
