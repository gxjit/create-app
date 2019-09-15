import replace from 'rollup-plugin-replace'
import resolve from 'rollup-plugin-node-resolve'
import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import { terser } from 'rollup-plugin-terser'

const production = process.env.PROD
const react = process.env.REACT

const globals = react ? { react: 'React', 'react-dom': 'ReactDOM' } : {}

const input = 'src/scripts/App.jsx'

const output = {
  file: 'build/assets/scripts/bundle.js',
  format: 'iife',
  globals: { ...globals }
}

const globalsArray = Object.keys(output.globals) || []

const external = globalsArray

const resolveConf = resolve({
  mainFields: ['module', 'main'],
  extensions: ['.mjs', '.js', '.jsx', '.json'],
  preferBuiltins: false, // Default: true
  dedupe: globalsArray
  // jail: '.src/scripts/', // Modules outside this path will be external
})

const babelConf = babel({
  externalHelpers: false
})

const replaceConf = replace({
  'process.env.NODE_ENV': JSON.stringify('production')
})

const pluginsDev = [resolveConf, commonjs()]

const plugins = production
  ? [replaceConf, babelConf, ...pluginsDev, terser()]
  : pluginsDev

export default {
  external,
  input,
  plugins,
  output
}

// cjs jsx invalid token issue => move cjs after babel
