const pxToViewport = require('postcss-px-to-viewport')
const CracoAlias = require('craco-alias')
module.exports = {
  plugins: [
    {
      plugin: CracoAlias,
      options: {
        source: 'jsconfig',
        baseUrl: './',
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
