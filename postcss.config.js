const path = require('path')
// const { uniPostcssPlugin } = require('@dcloudio/uni-cli-shared')

const isH5 = process.env.UNI_PLATFORM === 'h5'

module.exports = {
  // uniPostcssPlugin()
  plugins: [
    require('postcss-import')({
      resolve (id) {
        if (id.startsWith('~@/')) {
          return path.resolve(process.env.UNI_INPUT_DIR, id.substr(3))
        } else if (id.startsWith('@/')) {
          return path.resolve(process.env.UNI_INPUT_DIR, id.substr(2))
        } else if (id.startsWith('/') && !id.startsWith('//')) {
          return path.resolve(process.env.UNI_INPUT_DIR, id.substr(1))
        }
        return id
      }
    }),
    require('tailwindcss')({
      config: require('./tailwind.config')
    }),
    ...(isH5
      ? [
          require('postcss-px-to-viewport')({
            viewportWidth: 750,
            unitPrecision: 5,
            viewportUnit: 'vw',
            selectorBlackList: [/^uni-$/, 'uni-', '.ignore', '.hairlines'],
            exclude: /(\/|\\)(node_modules)(\/|\\)/,
            minPixelValue: 1,
            mediaQuery: false
          }),
          require('autoprefixer')()
        ]
      : [
          require('weapp-tailwindcss-webpack-plugin/postcss')(),
          require('postcss-pxtransform')({
            platform: 'weapp',
            selectorBlackList: ['uni-', '.ignore', '.hairlines'],
            exclude: /(\/|\\)(node_modules)(\/|\\)/,
            designWidth: 750
          })
        ])
  ]
}
