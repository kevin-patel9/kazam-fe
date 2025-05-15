module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: true,
  theme: {
    extend: {
      colors: {
        'brown': '#92400d',
        'white': '#ffffff'
      },
      boxShadow: {
        'full': '0 2px 1px rgba(0, 0, 0, 0.1), 0 -2px 1px rgba(0, 0, 0, 0.1), 2px 0 1px rgba(0, 0, 0, 0.1), -2px 0 1px rgba(0, 0, 0, 0.1)',
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}