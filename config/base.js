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
    'prod-build': 'concurrently --raw "npm:prod-*"'
  },
  ignorePatterns: [
    '**/node_modules/**',
    '**/.npm/**',
    '**/*.min.js',
    'dist/**',
    'build/**',
    '**/vendor/**'
  ]
}