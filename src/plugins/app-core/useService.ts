import type { InjectionKey } from 'vue'
import { inject } from 'vue'
import type service from '@/service'

export const serviceKey: InjectionKey<typeof service> = Symbol('service')

export function useService () {
  return inject<typeof service>(serviceKey) as typeof service
}

export default useService
