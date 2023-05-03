/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        background: {
          light: "#f8f8fb",
          dark: "#141625",
        },
        primary: {
          500: "#7c5dfa",
          300: "#9277ff",
        },
        secondary: {
          500: "#252945",
          700: "#1e2139",
        },
        accent: {
          300: "#dfe3fa",
          500: "#7e88c3",
          700: "#888eb0",
          950: "#0c0e16",
        },
        error: {
          500: "#ec5757",
          300: "#ff9797",
        },
      },
    },
  },
  plugins: [],
};
