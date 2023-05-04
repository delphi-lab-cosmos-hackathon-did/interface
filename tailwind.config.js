/** @type {import('tailwindcss').Config} */
module.exports = {
  corePlugins: {
    preflight: false,
  },
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './src/**/*.{js,ts,jsx,tsx}'],
  important: ['#__next', `[role='presentation']`],
  theme: {
    extend: {},
  },
  plugins: [require('@tailwindcss/line-clamp')],
}
