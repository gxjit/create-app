module.exports = {
  author: 'Gurjit Singh',
  license: 'MIT',
  buildTools: [
    'prettier',
    'eslint',
    'concurrently',
    'chokidar-cli',
    'live-server'
  ],
  allRunners: {
    build: 'concurrently --raw "npm:build-*"',
    watch: 'concurrently --raw "npm:watch-*"',
    prod: 'concurrently --raw "npm:prod-*"'
  },
  ignoreGlobs: [
    '**/.git/**',
    '**/node_modules/**',
    '**/.npm/**',
    '**/*.min.js',
    'dist/**',
    'build/**',
    '**/vendor/**'
  ]
}
