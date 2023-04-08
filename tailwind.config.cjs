/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'default-dark': '#1c1f1c',
        'default-semi-dark': '#363A36',
        'default-light': '#CCFFDE',
        'default-dark-color': '#6BD395',
        'default-light-color': '#7ED19E',
      },
    },
  },
  plugins: [],
};
