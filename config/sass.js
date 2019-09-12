const sassSrc = './src/styles/**/*.s*ss'
const sassDest = './build/assets/styles/'

module.exports = {
  cmds: {
    'build-sass': `sass --style=compressed --no-source-map "${sassSrc}" "${sassDest}"`,
    'watch-sass': `chokidar "${sassSrc}" "npm run sass"`,
    'prod-sass': `npm run build-sass && postcss --env "production" --replace "${sassDest}*.css"`,
    'fmt-sass': `prettier --write "${sassSrc}"`
  },
  devDeps: [
    '@fullhuman/postcss-purgecss',
    'autoprefixer',
    'cssnano',
    'postcss-cli',
    'sass'
  ],
  dotFiles: ['postcss.config.js']
}
