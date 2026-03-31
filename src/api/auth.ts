import request from './request'

// 登录参数接口
export interface LoginParams {
  phone: string
  password: string
}

// 微信登录参数接口
export interface WeixinLoginParams {
  code: string
  encryptedData?: string
  iv?: string
}

// 登录响应接口
export interface LoginResponse {
  token: string
  userInfo: {
    id: string
    phone: string
    name: string
    avatar?: string
  }
}

// 获取用户信息
export interface UserInfo {
  id: string
  phone: string
  name: string
  avatar?: string
}

/**
 * 用户登录
 * @param params 登录参数
 * @returns 登录响应
 */
export const login = (params: LoginParams): Promise<LoginResponse> => {
  return request({
    url: '/api/auth/login',
    method: 'POST',
    data: params
  })
}

/**
 * 微信一键登录
 * @param params 微信登录参数
 * @returns 登录响应
 */
export const weixinLogin = (
  params: WeixinLoginParams
): Promise<LoginResponse> => {
  return request({
    url: '/api/auth/weixin-login',
    method: 'POST',
    data: params
  })
}

/**
 * 获取用户信息
 * @returns 用户信息
 */
export const getUserInfo = (): Promise<UserInfo> => {
  return request({
    url: '/api/user/info',
    method: 'GET'
  })
}

/**
 * 退出登录
 */
export const logout = (): Promise<void> => {
  return request({
    url: '/api/auth/logout',
    method: 'POST'
  })
}

/**
 * 验证手机号格式
 * @param phone 手机号
 * @returns 是否有效
 */
export const validatePhone = (phone: string): boolean => {
  return /^1[3-9]\d{9}$/.test(phone)
}

/**
 * 获取当前登录状态
 * @returns 是否已登录
 */
export const isLoggedIn = (): boolean => {
  return !!uni.getStorageSync('token')
}
