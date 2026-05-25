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
          50: '#f0f7fa',
          100: '#daebf3',
          200: '#bbd7e8',
          300: '#8dbdd8',
          400: '#6eabc6',
          500: '#468eaa',
          600: '#3c728f',
          700: '#325d76',
          800: '#2c4d63',
          900: '#274154',
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