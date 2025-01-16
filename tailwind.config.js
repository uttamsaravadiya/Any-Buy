/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        rich:{
          100: "#E1F5FE",
          200: "#90CAF9",
          300: "#42A5F5",
          400: "#1976D2",
          500: "#0D47A1",
        }
      }
    },
  },
  plugins: [],
}

