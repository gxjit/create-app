module.exports = (reactCheck, pkgName, ignorePatterns) => ({
  extraCmds: {
    serve: 'live-server --port=8080 --host=10.1.1.9 --no-browser',
    'cp-markup': 'cp ./src/markup/*.htm* ./build/',
    'cp-vendor': 'cp ./src/vendor/*.* ./build/assets/vendor/',
    'cp-data': 'cp ./src/data/*.* ./build/assets/data/',
    'export-build': `cp -r ./build/** ../${pkgName}-export/.`,
    'mkdirs-all':
      'mkdir -p ./src/vendor/ ./src/scripts/ ./src/styles/ ./src/markup/ ./build/assets/vendor/ ./build/assets/scripts/ ./build/assets/styles/'
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
    production: ['defaults and not < 0.1%', '> 0.2% and not dead'],
    development: [
      'last 2 chrome versions',
      'last 2 firefox versions',
      'last 2 safari versions',
      'current node'
    ]
  }
})

// https://github.com/gxjit/babel-preset-preact

// "plugins": [
//       [
//         "@babel/plugin-transform-react-jsx",
//         {
//           "pragma": "h",
//           "pragmaFrag": "Fragment"
//         }
//       ]
//     ],

// const pollyfills = false
// "presets": [
//   [
//     "@babel/preset-env",
//     {
//       "modules": false,
//       "useBuiltIns": "usage",
//       "corejs": 3
//     }
//   ],
// core-js regenerator-runtime
// or eslint detection of polyfills eslint-plugin-compat
