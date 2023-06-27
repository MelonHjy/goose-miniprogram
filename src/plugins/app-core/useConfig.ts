import type { InjectionKey } from 'vue'
import { inject } from 'vue'
import type config from '@/config'

export const configKey: InjectionKey<typeof config> = Symbol('config')

export function useConfig () {
  return <typeof config>inject<typeof config>(configKey)
}

export default useConfig
