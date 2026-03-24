/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3B7DF8',
        'primary-hover': '#2A67D8',
        'section-alt': '#E6F0FF',
      },
    },
  },
  plugins: [],
}
