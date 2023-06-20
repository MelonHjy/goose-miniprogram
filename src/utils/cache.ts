// uni 缓存
export function setCache (key: string, value: any, { expire = 0, etag = '' } = {}) {
  const data = JSON.stringify({ value, expire: expire ? Date.now() + expire : 0, etag })
  uni.setStorageSync(key, data)
}

export function getCache (key: string, { etag = '' } = {}) {
  const data = uni.getStorageSync(key)
  if (!data) return null
  const { value, expire, etag: cacheEtag } = JSON.parse(data)
  if (etag && etag !== cacheEtag) return null
  if (expire && expire < Date.now()) return null
  return value
}
