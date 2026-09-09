/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          red: '#e5322d',
          redHover: '#c92520',
          blue: '#1976d2',
          navy: '#1b2432',
          lightBg: '#f5f5f7'
        }
      }
    },
  },
  plugins: [],
}
