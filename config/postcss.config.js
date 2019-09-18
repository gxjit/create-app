const autoprefixer = require('autoprefixer')

const purgecss = require('@fullhuman/postcss-purgecss')({
  content: ['./src/scripts/**/*.js*', './src/markup/*.htm*']
})

const cssnano = require('cssnano')({
  preset: [
    'default',
    {
      discardComments: {
        removeAll: true
      }
    }
  ]
})

module.exports = {
  plugins: [purgecss, autoprefixer, cssnano]
}
