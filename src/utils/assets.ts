import CONFIG from '@/config'

export function assets (url: string, loadOriginal = false) {
  if (!url) return ''
  if (/^(?:https?:)?\/\//.test(url)) return url
  if (/^[a-zA-Z]+:\/\//.test(url)) return url
  if (/^\s*data:([a-z]+\/[a-z0-9-+.]+(;[a-z-]+=[a-z0-9-]+)?)?(;base64)?,([a-z0-9!$&',()*+;=\-._~:@/?%\s]*?)\s*$/i.test(url)) return url

  // 将配置文件中的图片基础URL赋值给base变量
  const base = CONFIG.ASSETS_BASE_URL

  // 正则表达式，匹配以jpg、jpeg、png、gif结尾的url
  const regExp = /.*\.(jpg|jpeg|png|gif)$/i

  // 如果url匹配到了正则表达式
  if (regExp.test(url)) {
  // 如果需要加载原图
    if (loadOriginal) {
      // 生成缩略图的URL
      url.replace('/file/', '/file/narrow/')
    }
  }

  // 如果base中已经有查询参数，则直接返回base和url的拼接结果
  if (base.indexOf('?') >= 0) {
    return base + url
  }
  // 如果base中没有查询参数，则将base和url进行拼接并返回结果
  return base.replace(/\/$/, '') + '/' + url.replace(/^\//, '')
}

export default assets
