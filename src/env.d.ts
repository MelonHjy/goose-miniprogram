/// <reference types="vite/client" />
/// <reference types="@types/wechat-miniprogram" />
/// <reference types="@dcloudio/types" />
/// <reference types="uni-ui-components-types" />

declare module '*.vue' {
  import { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module 'vk-uview-ui' {
  import UviewUi from 'vk-uview-ui'
  export default UviewUi
}
