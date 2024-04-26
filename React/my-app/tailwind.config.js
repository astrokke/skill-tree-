/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, 
  theme: {
    extend: {
      backgroundImage: theme => ({
        'ornament-pattern': "url('./img/ornament34.svg')",
      })
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}