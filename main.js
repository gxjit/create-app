#!/usr/bin/env node

const { spawnSync } = require('child_process')
const { writeFileSync, copyFileSync, mkdirSync, existsSync } = require('fs')
const { resolve, join } = require('path')
const { cwd, chdir } = require('process')

const checkArgs = require('./modules/checkArgs.js')
const flattenObj = require('./modules/flattenObj.js')
const getOptions = require('./modules/getOptions.js')

const dirPath = resolve(process.argv[2])

if (!existsSync(dirPath)) {
  mkdirSync(dirPath)
}

chdir(dirPath)
if (cwd() === __dirname) {
  throw new Error('Target directory cannot be the same as script directory.')
}

const args = process.argv.slice(3).map(x => x.toLowerCase())
const validArgs = checkArgs(args, ['js', 'sass', 'react'])

const spawnSyncCr = (x, y) =>
  spawnSync(x, y, { cwd: dirPath, stdio: ['inherit', 'ignore', 'inherit'] })

spawnSyncCr('pnpm', ['init', ['-y']])
const pkg = require(join(dirPath, 'package.json'))

const checkReact = validArgs.includes('react')
const base = require('./config/base.js')
const js = require('./config/js.js')(checkReact)
const sass = require('./config/sass.js')
const react = require('./config/react.js')
const extras = require('./config/extras.js')(
  checkReact,
  pkg.name,
  base.ignoreGlobs
)

const options = getOptions(validArgs, { js, react, sass })

const parseOptions = (option, absence) => options.map(x => x[option] || absence)
const flattenParse = option => parseOptions(option, []).flat()

const cmds = flattenObj(parseOptions('cmds', {}))
const devDeps = flattenParse('devDeps')
const deps = flattenParse('deps')
const dotFiles = flattenParse('dotFiles')

const nwPkg = {
  ...pkg,
  author: base.author,
  license: base.license,
  scripts: { ...cmds, ...base.allRunners, ...extras.extraCmds },
  babel: extras.babelConf,
  eslintConfig: extras.eslintConf,
  eslintIgnore: base.ignoreGlobs,
  prettier: extras.prettierConf,
  browserslist: extras.browserslistConf
}

const installDevDeps = [
  'install',
  '--save-dev',
  ...base.buildTools,
  ...devDeps,
  ...js.githubDeps
]

const installDeps = ['install', ...deps]

writeFileSync('package.json', JSON.stringify(nwPkg, null, 2), {
  encoding: 'utf8'
})
dotFiles.forEach(file =>
  copyFileSync(join(__dirname, 'config', file), join(dirPath, file))
)

spawnSyncCr('pnpm', installDevDeps)
spawnSyncCr('pnpm', installDeps)

// const pug = {
//   pug: 'pug "./src/markup/**/*.pug" -O "./src/data/data.json" -o "./build/"'
// }
