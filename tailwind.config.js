// tailwind.config.js
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        pear: '#CBD83B',
        primary: {
          50: 'rgb(var(--primary-50) / <alpha-value>)',
          100: 'rgb(var(--primary-100) / <alpha-value>)',
          200: 'rgb(var(--primary-200) / <alpha-value>)',
          300: 'rgb(var(--primary-300) / <alpha-value>)',
          400: 'rgb(var(--primary-400) / <alpha-value>)',
          500: 'rgb(var(--primary-500) / <alpha-value>)',
          600: 'rgb(var(--primary-600) / <alpha-value>)',
          700: 'rgb(var(--primary-700) / <alpha-value>)',
          800: 'rgb(var(--primary-800) / <alpha-value>)',
          900: 'rgb(var(--primary-900) / <alpha-value>)',
          950: 'rgb(var(--primary-950) / <alpha-value>)',
        },
        accent: {
          50: '#fcf8f0',
          100: '#f7ebda',
          200: '#f0d3aa',
          300: '#e8b571',
          400: '#e3a750',
          500: '#c28532',
          600: '#a36a24',
          700: '#85511b',
          800: '#6b4016',
          900: '#543014',
        },
        surface: {
          50: '#fdfdfc',
          100: '#f6f6f3',
          200: '#efefe9',
          300: '#e6e6dc',
          400: '#dbdbce',
          500: '#cfcfc0',
          600: '#b4b4a3',
          700: '#999986',
          800: '#7e7e6a',
          900: '#656553',
        },
      },
      fontFamily: {
        sans: ['Avalance', '"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(0, 0, 0, 0.05)',
        'strong': '0 8px 30px -4px rgba(0, 0, 0, 0.1)',
      }
    },
  },
  plugins: [],
}