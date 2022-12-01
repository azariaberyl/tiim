/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'primary-dark': '#3C4048',
        'secondary-dark': '#B2B2B2',
        'primary-light': '#F5F5F5',
      },
    },
  },
  plugins: [],
};
