/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'primary-dark': '#3C4048',
        'primary-dark-80': 'rgba(60, 64, 72, 0.8)',
        'secondary-dark': '#B2B2B2',
        'primary-light': '#F5F5F5',
      },
    },
  },
  plugins: [],
};
