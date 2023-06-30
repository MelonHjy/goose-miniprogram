// 用户信息类型
export interface UserInfo {
  userName: string
  loginNo: string
  token: string
  franchiseeId?: string
  menuList: []
  [key: string]: any
}

export async function getToken (): Promise<string | null> {
  return new Promise((resolve, reject) => {
    return uni.getStorage({
      key: 'token',
      success: (result) => resolve(result?.data),
      fail: () => resolve(null)
    })
  })
}

export async function setToken (token: string | null): Promise<void> {
  return new Promise((resolve, reject) => {
    return uni.setStorage({
      key: 'token',
      data: token,
      success: (result) => resolve(result?.data),
      fail: (error) => reject(new Error(error.errMsg || error.message))
    })
  })
}

export async function getUserInfo (): Promise<UserInfo | null> {
  return new Promise((resolve, reject) => {
    return uni.getStorage({
      key: 'userInfo',
      success: (result) => resolve(result?.data),
      fail: () => resolve(null)
    })
  })
}

export async function setUserInfo (userInfo: UserInfo | null): Promise<void> {
  return new Promise((resolve, reject) => {
    return uni.setStorage({
      key: 'userInfo',
      data: userInfo,
      success: (result) => resolve(result?.data),
      fail: (error) => reject(new Error(error.errMsg))
    })
  })
}
