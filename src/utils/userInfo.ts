// 用户信息类型
export interface UserInfo {
  userName: string
  loginNo: string
  token: string
  franchiseeId?: string
  menuList: []
  [key: string]: any
}

export function getToken (): Promise<string | null> {
  return new Promise((resolve) => {
    return resolve(window.localStorage.getItem('token'))
  })
}

export function setToken (token: string | null): Promise<void> {
  return new Promise((resolve) => {
    return resolve(window.localStorage.setItem('token', token ?? ''))
  })
}

export function getUserInfo (): Promise<UserInfo | null> {
  return new Promise((resolve) => {
    return resolve(JSON.parse(window.localStorage.getItem('userInfo') ?? 'null'))
  })
}

export function setUserInfo (userInfo: UserInfo | null): Promise<void> {
  return new Promise((resolve) => {
    return resolve(window.localStorage.setItem('userInfo', JSON.stringify(userInfo)))
  })
}
