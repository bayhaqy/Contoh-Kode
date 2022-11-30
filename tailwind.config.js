module.exports = {
  darkMode: "class",
  content: [
    "./src/firebase-auth/*.{xml,html,js}",
    "./src/firebase-auth/**/*.{xml,html,js}",
  ],
  theme: {
  },
  plugins: [
    require('tailwindcss'),
    require('@tailwindcss/line-clamp'),
    require('autoprefixer'),
  ],
}