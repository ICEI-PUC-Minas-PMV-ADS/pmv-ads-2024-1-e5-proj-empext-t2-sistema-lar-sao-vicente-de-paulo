/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      primaria: "#0080FF",
      secundaria: "#00AD2B",
      black: "#2D2D29",
      white: "#FFFFFF",
      azul2: "#005FB3",
      cinza: "#F8F8F8",
      cinza2: "#E0E0CC",
      border: "#D9D9D9",
      borderSecondary: "#F0F0F0",
      red: {
        50: "#fef2f2",
        100: "#fee2e2",
        200: "#fecaca",
        300: "#fca5a5",
        400: "#f87171",
        500: "#ef4444",
        600: "#dc2626",
        700: "#b91c1c",
        800: "#991b1b",
        900: "#7f1d1d",
        950: "#450a0a",
      },
    },
  },
  plugins: [],
};
