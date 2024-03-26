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
      cinza2: "#E0E0CC"
    },
  },
  plugins: [],
}

