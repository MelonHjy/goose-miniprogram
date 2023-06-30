import { request, uploadFile as uploadFileRequest } from '@/utils/request'
import sha256 from '@/utils/sha256'
import debounceAsync from '@/utils/debounceAsync'

// 获取微信登录 FlagId
export const getWeixinFlagId = async (params: { code: string }) => {
  return request.get('/user/wechat/authCode', { params }) as Promise<any>
}

// 微信登录
export const loginByWeixin = async (params: { encryptedData: string, iv: string, flagId: string, inviterId?: string }) => {
  return request.post('/user/login', params) as Promise<any>
}
// 获取微信登录的授权码 pc-wx
export const getPcWeixinFlagId = async (params: { code: string, flagId: string}) => {
  return request.get('/client/pc-wx/login/wechat/authCode', { params }) as Promise<any>
}

// 微信授权登录 pc-wximage.png
export const loginByPcWeixin = async (params: { encryptedData: string, iv: string, flagId: string, inviterId?: string }) => {
  return request.post('/client/pc-wx/login/wechat/login', params) as Promise<any>
}

// 短信登录
export const loginByCode = async (params: { account: string, password: string, domain?: 'pc' | 'applets', inviterId?: string }) => {
  return request.post('/client/login/code/login', { ...params, domain: params.domain || 'applets' }) as Promise<any>
}

// 账号登录
export const loginByAccount = async (params: { account: string, password: string, domain?: 'pc' | 'applets' }) => {
  return request.post('/client/login/password/login', { ...params, password: sha256(params.password), domain: params.domain || 'applets' }) as Promise<any>
}

// 找回密码-验证码校验
export const passwordFlagId = async (params:{phone:string, smsCode:string}) => {
  return request.post('/client/user/retrievePasswordVerify', params) as Promise<any>
}

// 找回密码-重新设置密码
export const forgetPassword = async (params: {flagId:string, password: string}) => {
  return request.post('/client/user/retrievePassword', { flagId: params.flagId, password: sha256(params.password) }) as Promise<any>
}

// 退出登录
export const loginOut = async () => {
  return request.get('/client/login/logout') as Promise<boolean>
}

// 是否需要进行授权同步 0 直接登录 1 需要授权 2 不需要授权
export const isDigitalIdentityNeedAuthSync = async () => {
  return request.get('/digitalIdentity/auditUserStatus') as Promise<'0' | '1' | '2'>
}

// 查询需要授权的信息
export const getDigitalIdentityAuthInfo = async () => {
  return request.get('/digitalIdentity/queryAuditInfo') as Promise<{ chainUserInfo: Record<string, any>, chainRoleList: Record<string, any>[], chainEnterpriseList: Record<string, any>[] }>
}

// 授权操作
export const digitalIdentityAuth = async (params: { auditUserInfo?: boolean, auditChainRoleDIDs?: string[], auditChainEnterpriseDIDs?: string[] }) => {
  return request.post('/digitalIdentity/audit', params) as Promise<string[]>
}

// 刷新Token
export const flushToken = async () => {
  return request.get('/client/login/flushToken') as Promise<any>
}

// 文件上传
export const uploadFile = async (params: { filePath: string }) => {
  return uploadFileRequest(params) as Promise<{ url: string, fileName: string }>
}

// 协议查询，1=隐私协议 2=用户服务协议 3=联盟宣言 4=联盟简介 5=关于百会链 6=联盟章程 7=联盟工作机制 8=申请表 9=申请表链接
export const getProtocol = async (params:{type: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9}) => {
  return request.get('/protocol/query', { params }) as Promise<any>
}

// 发送验证码
export const sendCode = async (params: { phone: string, template: 'login' | 'register' | 'reset-pwd' | 'retrieve-pwd' | 'old-bind-mobile' | 'new-bind-mobile' | 'bind-email', check?: any }) => {
  return request.get('/message/sms/send', { params }) as Promise<boolean>
}

// 获取我的信息
export const getMyInfo = debounceAsync(async () => {
  return request.get('/client/user/queryMyselfInfo') as Promise<any>
}, 200)

// 更新我的信息
export const updateMyInfo = async (params:any) => {
  return request.post('/client/user/updateMyselfInfo', params) as Promise<any>
}

// 更新我的账号
export const updateMyAccount = (params: {account: string}) => {
  return request.post('/client/user/setAccount', params) as Promise<any>
}

// 设置手机号
export const setMyPhone = (params: { phone: string, smsCode: string }) => {
  return request.post('/client/user/setPhone', params) as Promise<any>
}

// 校验手机号
export const checkMyOldPhone = (params: { phone: string, smsCode: string }) => {
  return request.post('/client/user/modifyPhoneVerify', params) as Promise<any>
}

// 更新手机号
export const updateMyPhone = (params: { phone: string, smsCode: string }) => {
  return request.post('/client/user/modifyPhone', params) as Promise<any>
}

// 设置我的微信
export const bindMyOpenId = (params: {code: string}) => {
  return request.post('/client/user/wx/bind-openId', params) as Promise<any>
}

// 解绑我的微信
export const unbindMyOpenId = () => {
  return request.get('/client/user/wx/untie-openId') as Promise<any>
}

// 首次设置密码
export const updateMyFirstPassword = async (params: { password: string }) => {
  return request.post('/client/user/setPassword', { password: sha256(params.password) }) as Promise<any>
}

// 修改自己的密码
export const updateMyPassword = async (params: { oldPassword:string, newPassword: string }) => {
  return request.post('/client/user/modifyPassword', { oldPassword: sha256(params.oldPassword), newPassword: sha256(params.newPassword) }) as Promise<any>
}

// 数据字典
// 账号类型：account_type
// 组织认证角色：company_role
// 审批状态：approval_state
// 字典表 pay_method支付方式 ,  字典表 contract_state合同状态
export const getDictoryList = async (params: {dictCode: string}) => {
  return request.get('/dict/item-list', { params }) as Promise<any>
}

/** 根据级别查询行政区域列表 */
export const getRegionList = (params: { subdistrict: number }) => {
  return request.get('/region/list', { params }) as Promise<any>
}

// 合同签名微信二维码
export const getMark = async (params: any) => {
  return request.get('/client/wechat/createQrCode', { params }) as Promise<any>
}

// 查询当前组织认证的角色信息
export const getCompanyRoleList = async () => {
  return request.get('/client/company/getCompanyRoleList') as Promise<any>
}

// 合同签名
export const getSignaturePage = async (params: any) => {
  return request.post('/protocol/signature', params) as Promise<any>
}

// 首页切换模式
export const switchMode = async (params: any) => {
  return request.get('/client/login/switchMode', { params }) as Promise<any>
}

// 综合搜索
export const comprehensiveSearch = async (params: any) => {
  return request.post('/client/comprehensiveSearch/query', params) as Promise<any>
}

// 根据链id获取实体id
export const getIdByMainDID = async (params: any) => {
  return request.get('/digitalIdentity/getBusinessId', { params }) as Promise<any>
}

// 获取客服电话
export const getMessageContact = async () => {
  return request.get('/message/contact', { }) as Promise<any>
}

// 查询登录用户的指数
export const getUserIntegral = (params?: any) => {
  return request.get('/client/integral/index/user', { params }) as Promise<any>
}

// 查询登录用户的指数
export const getPlatformIntegral = () => {
  return request.get('/client/integral/index', {}) as Promise<any>
}

// 获取游戏规则
export const getRules = async () => {
  return request.get('/common/rules') as Promise<any>
}
