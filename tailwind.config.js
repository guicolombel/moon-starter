module.exports = {
  purge: [
    './_includes/**/*.html',
    './_includes/**/*.js',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      'sans' : ['NeueMontreal']
    },
    screens: {
      'tablet': '640px',
      'laptop': '1024px',
      'desktop': '1280px',
    },
    extend: {
      zIndex: {
       '-1': '-1',
      }
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
