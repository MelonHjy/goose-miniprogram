import path from 'path'
import { defineConfig } from 'vite'
import Uni from '@dcloudio/vite-plugin-uni'
import AutoImport from 'unplugin-auto-import/vite'
import Eslint from 'vite-plugin-eslint'
import Stylelint from 'vite-plugin-stylelint'
import Tailwindcss from 'weapp-tailwindcss-webpack-plugin/vite'

const isH5 = process.env.UNI_PLATFORM === 'h5'

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  css: {
    postcss: require('./postcss.config.js')
  },
  plugins: [
    Uni(),
    AutoImport({
      dts: 'src/auto-imports.d.ts',
      include: [
        /\.vue$/,
        /\.vue\?vue/ // .vue
      ],
      // dirs: [
      //   'src/components',
      //   'src/pages'
      // ],
      imports: [
        'vue',
        {
          '@dcloudio/uni-app': [
            'onLaunch',
            'onShow',
            'onHide',
            'onError',
            'onUniNViewMessage',
            'onUnhandledRejection',
            'onPageNotFound',
            'onThemeChange',
            'onInit',
            'onLoad',
            'onReady',
            'onUnload',
            'onResize',
            'onPullDownRefresh',
            'onReachBottom',
            'onTabItemTap',
            'onPageScroll',
            'onNavigationBarButtonTap',
            'onBackPress',
            'onNavigationBarSearchInputChanged',
            'onNavigationBarSearchInputConfirmed',
            'onNavigationBarSearchInputClicked',
            'onAddToFavorites'
          ],
          '@/utils/userInfo': [
            'getToken',
            'setToken',
            'getUserInfo',
            'setUserInfo'
          ],
          '@/utils/composables': ['assets', 'dayjs', 'datetimeFormat', 'dateFormat', 'timeFormat']
        }
      ],
      eslintrc: {
        enabled: true,
        filepath: './.eslintrc-auto-import.json',
        globalsPropValue: true // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
      }
    }),
    Eslint({ cache: false }),
    Stylelint(),
    isH5 ? undefined : Tailwindcss()
  ],
  build: {
    minify: process.env.NODE_ENV === 'production' ? 'terser' : 'esbuild'
  }
})
