const jsSrc = './src/scripts/**/*.js*'

module.exports = reactCheck => ({
  cmds: {
    'build-js': reactCheck ? 'rollup -c --environment REACT:True' : 'rollup -c',
    'watch-js': `chokidar "${jsSrc}" -c "npm run build-js"`,
    'prod-js': reactCheck
      ? 'rollup -c --environment PROD:True,REACT:True'
      : 'rollup -c --environment PROD:True',
    'lint-js': `eslint --fix "${jsSrc}"`,
    'fmt-js': `prettier --write "${jsSrc}"`
  },
  devDeps: [
    'core-js',
    '@babel/core',
    '@babel/preset-env',
    '@babel/plugin-external-helpers',
    'rollup',
    'rollup-plugin-babel',
    'rollup-plugin-commonjs',
    'rollup-plugin-node-resolve',
    'rollup-plugin-replace',
    'rollup-plugin-terser'
  ],
  dotFiles: ['rollup.config.js'],
  githubDeps: ['eslint-config-singh', 'eslint-config-singh-react'].map(
    x => `https://github.com/gxjit/${x}/tarball/master`
  )
})
