/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx}", "./components/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50:  "#eef7ff",
          100: "#d9edff",
          200: "#b6ddff",
          300: "#84c7ff",
          400: "#4aa9ff",
          500: "#1b87ff",
          600: "#0a6ae6",
          700: "#0b55b8",
          800: "#0f4a92",
          900: "#103f76"
        }
      }
    },
  },
  plugins: [],
}
