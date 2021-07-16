module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        brand: {
          primary: {
            'teal': "#0ECAD4",
            'dark-blue': "#002838",
            'orange': "#FF6C29",
          }
        }
      }
    },
  },
  variants: {
    extend: {
      opacity: ['disabled'],
      cursor: ['disabled'],
    }
  },
  plugins: [],
}
