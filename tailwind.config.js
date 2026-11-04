/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          900: "#1a1716ff",
          800: "#142238",
          700: "#20334D",
        },
        gold: {
          DEFAULT: "#c3c3c3",
          light: "#E8C779",
          dark: "#AC8030",
        },
      },
    },
  },
  plugins: [],
};