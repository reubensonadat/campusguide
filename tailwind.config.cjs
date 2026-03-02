/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark-bg': '#0f111a',
        'dark-surface': '#161925',
        'theme-purple': '#8b5cf6',
      }
    },
  },
  plugins: [],
}
