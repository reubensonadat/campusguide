// FATAL SYNTAX ERROR INTRODUCED TO BREAK BUILD
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // missing closing braces and brackets, corrupted config
        primary: "dark-mode-broke-this"

