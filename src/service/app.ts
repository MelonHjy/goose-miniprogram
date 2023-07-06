import { request } from "@/utils/request";

// 获取微信登录 FlagId
export const getWeixinFlagId = async (params: { code: string }) => {
  return request.get("/user/wechat/authCode", { params }) as Promise<any>;
};

// 微信登录
export const loginByWeixin = async (params: {
  encryptedData: string;
  iv: string;
  flagId: string;
  inviterId?: string;
}) => {
  return request.post("/user/login", params) as Promise<any>;
};

// 退出登录
export const loginOut = async () => {
  return request.get("/client/login/logout") as Promise<boolean>;
};

// 刷新Token
export const flushToken = async () => {
  return request.get("/client/login/flushToken") as Promise<any>;
};

// 获取游戏规则
export const getRules = async () => {
  return request.get("/common/rules") as Promise<any>;
};

// 创建线下房间
export const createOfflineRoom = async (params: { type: "offline" }) => {
  return request.post("/room/create", params) as Promise<any>;
};
