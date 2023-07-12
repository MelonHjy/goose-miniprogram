import { createSSRApp } from 'vue'
// import store from './store/index.js'
import App from './App.vue'

import './assets/global/css/tailwind.css'
import './assets/global/scss/global.scss'

export function createApp () {
  const app = createSSRApp(App)

  // TODO: error, but i don't know why
  // app.use(store)

  return {
    app
  }
}
