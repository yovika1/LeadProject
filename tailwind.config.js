/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'cool-gradient-repeating': 'repeating-linear-gradient(45deg, #00f5d4, #00bbf9 20%, #00f5d4 40%)',
      },
    },
  },
  plugins: [],
}