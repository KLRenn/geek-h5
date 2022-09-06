const webpack = require('webpack')
const pxToViewport = require('postcss-px-to-viewport')
const path = require('path')
const CracoAliasPlugin = require('react-app-alias')

module.exports = {
  plugins: [
    {
      plugin: CracoAliasPlugin,
      option: {
        source: 'jsconfig',
        baseUrl: './src',
      },
    },
  ],
  style: {
    postcss: {
      mode: 'extends',
      loaderOptions: {
        postcssOptions: {
          ident: 'postcss',
          plugins: [
            pxToViewport({
              // 视口宽度(设计稿宽度)
              viewportWidth: 375,
            }),
          ],
        },
      },
    },
  },
}
