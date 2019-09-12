module.exports = (reactCheck, pkgName, ignorePatterns) => ({
  extraCmds: {
    serve: 'live-server --port=8080 --host=10.1.1.9 --no-browser',
    'cp-markup': 'cp "./src/markup/*.htm*" "./build/"',
    'cp-vendor': 'cp "./src/vendor/*.*" "./build/vendor/"',
    'export-build': `cp -r "./build/**" "../${pkgName}-export/."`
  },
  babelConf: {
    presets: reactCheck
      ? [['@babel/preset-env', { modules: false }], '@babel/preset-react']
      : [['@babel/preset-env', { modules: false }]],
    ignore: ignorePatterns
  },
  eslintConf: {
    extends: [
      `${
        reactCheck ? 'eslint-config-singh-react' : 'eslint-config-singh'
      }/with-prettier`
    ]
  },
  prettierConf: {
    singleQuote: true,
    jsxSingleQuote: true,
    semi: false,
    endOfLine: 'lf'
  },
  browserslistConf: {
    production: [
      'defaults',
      'last 2 versions and not dead',
      '> 0.2% and not dead'
    ],
    development: [
      'last 2 chrome versions',
      'last 2 firefox versions',
      'last 2 safari versions',
      'current node'
    ]
  }
})
