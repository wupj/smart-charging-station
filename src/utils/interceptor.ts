const whiteList: string[] = []

export const hasPermission = (url: string = '') => {
  // token是登录成功后在本地存储登录标识，存储一个能够判断用户登录的唯一标识就行，根据自己存储的数据类型来判断
  const token = uni.getStorageSync('token')
  return whiteList.includes(url) || token
}

uni.addInterceptor('navigateTo', {
  // 页面跳转前进行拦截, invoke根据返回值进行判断是否继续执行跳转
  invoke(e) {
    if (!hasPermission(e.url)) {
      uni.reLaunch({
        url: '/pages/login/login'
      })
      return false
    }
    return true
  },
  success(e) {}
})

uni.addInterceptor('switchTab', {
  // tabbar 页面跳转前进行拦截
  invoke(e) {
    if (!hasPermission(e.url)) {
      uni.reLaunch({
        url: '/pages/login/login'
      })
      return false
    }
    return true
  },
  success(e) {}
})
