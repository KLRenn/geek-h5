const webpack = require('webpack')
const pxToViewport = require('postcss-px-to-viewport')
const path = require('path')
const CracoAliasPlugin = require('react-app-alias')

module.exports = {
  // ... your existing config
  plugins: [
    {
      plugin: CracoAliasPlugin,
      option: {
        source: 'jsconfig',
        baseUrl: './src',
      },
    },
  ],
  settings: {
    'import/resolver': {
      alias: {
        map: [
          // And all your import aliases
          ['@components', './src/components'],
          ['@pages', './src/pages'],
          ['@store', './src/store'],
          ['@assets', './src/assets'],
          ['@images', './src/assets/img'],
          ['@icons', './src/components/icons'],
        ],
        extensions: ['.ts', '.js', '.jsx', '.json'],
      },
    },
  },
}
