// API 请求封装
const baseURL = import.meta.env.VITE_API_BASE_URL || ''

// 请求拦截器
const requestInterceptor = (config: any) => {
  // 添加token
  const token = uni.getStorageSync('token')
  if (token) {
    config.header = config.header || {}
    config.header['Authorization'] = `Bearer ${token}`
  }
  return config
}

// 响应拦截器
const responseInterceptor = (response: any) => {
  const { statusCode, data } = response

  if (statusCode === 200) {
    if (data.code === 200) {
      return data
    } else {
      uni.showToast({
        title: data.message || '请求失败',
        icon: 'none'
      })
      return Promise.reject(data)
    }
  } else if (statusCode === 401) {
    // token过期，清除登录状态
    uni.removeStorageSync('token')
    uni.showToast({
      title: '登录已过期，请重新登录',
      icon: 'none'
    })
    setTimeout(() => {
      uni.reLaunch({
        url: '/pages/login/login'
      })
    }, 1500)
    return Promise.reject(new Error('登录已过期'))
  } else {
    uni.showToast({
      title: `请求失败: ${statusCode}`,
      icon: 'none'
    })
    return Promise.reject(new Error(`请求失败: ${statusCode}`))
  }
}

// 错误处理
const errorHandler = (error: any) => {
  console.error('请求错误:', error)

  if (error.statusCode === 404) {
    uni.showToast({
      title: '请求资源不存在',
      icon: 'none'
    })
  } else if (error.statusCode === 500) {
    uni.showToast({
      title: '服务器错误',
      icon: 'none'
    })
  } else if (error.statusCode === 502 || error.statusCode === 503) {
    uni.showToast({
      title: '服务不可用',
      icon: 'none'
    })
  } else {
    uni.showToast({
      title: error.message || '网络错误',
      icon: 'none'
    })
  }

  return Promise.reject(error)
}

// 封装uni.request
const request = (options: any) => {
  options = requestInterceptor(options)
  options.header = options.header || {
    'Content-Type': 'application/json'
  }

  return new Promise((resolve, reject) => {
    uni.request({
      ...options,
      success: (res: any) => {
        responseInterceptor(res)
          .then(resolve)
          .catch(reject)
      },
      fail: errorHandler
    })
  })
}

export default request
