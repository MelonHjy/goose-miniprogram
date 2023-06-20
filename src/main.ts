import { createSSRApp } from 'vue'
import App from './App.vue'

import './assets/global/css/tailwind.css'
import './assets/global/scss/global.scss'

export function createApp () {
  const app = createSSRApp(App)

  return {
    app
  }
}
