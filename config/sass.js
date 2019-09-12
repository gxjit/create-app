module.exports = {
  cmds: {
    'build-sass':
      'sass --style=compressed --no-source-map "./src/styles/**/*.s*ss" "./build/assets/styles/"',
    'watch-sass': 'chokidar "./src/styles/**/*.s*ss" "npm run sass"',
    'prod-sass':
      'npm run build-sass && postcss --env "production" --replace "./build/assets/styles/*.css"',
    'fmt-sass': 'prettier --write "./src/styles/**/*.*ss"'
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
