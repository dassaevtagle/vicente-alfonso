/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'primary-yellow': '#fdc43f',
        'primary-brown': '#b29168',
        'primary-gray': '#d8d9de',
      },
    },
  },
  plugins: [require('@tailwindcss/line-clamp')],
}
