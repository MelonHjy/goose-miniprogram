import APP_CONFIG from '@/config'
import service from '@/service'

// import 'vant/es/toast/style'
// import 'vant/es/dialog/style'
// export { showToast, showLoadingToast, showSuccessToast, showFailToast, showDialog } from 'vant'

// declare module 'vue' {
//   export interface Vue {
//     $APP_CONFIG: typeof APP_CONFIG
//     $service: typeof service
//   }
// }

export { assets } from './assets'
export { dayjs, datetimeFormat, dateFormat, timeFormat } from './dayjs'

export function useConfig () {
  return APP_CONFIG
}

export function useService () {
  return service
}
