<template>
  <view class="login-container">
    <!-- Logo 区域 -->
    <view class="logo-section">
      <view class="logo-icon">
        <text class="logo-icon-inner">⚡</text>
      </view>
      <text class="app-name">智能充电站</text>
      <text class="app-slogan">充电更便捷，生活更智能</text>
    </view>

    <!-- 登录表单 -->
    <view class="login-form">
      <!-- 手机号输入 -->
      <view class="form-item">
        <view class="input-wrapper">
          <uni-icons type="phone" size="18" color="#95a5a6"></uni-icons>
          <input
            class="input-field"
            type="number"
            v-model="formData.phone"
            placeholder="请输入手机号"
            maxlength="11"
            @input="handlePhoneInput"
          />
        </view>
      </view>

      <!-- 密码输入 -->
      <view class="form-item">
        <view class="input-wrapper">
          <uni-icons type="locked" size="18" color="#95a5a6"></uni-icons>
          <input
            class="input-field"
            :type="showPassword ? 'text' : 'password'"
            v-model="formData.password"
            placeholder="请输入密码"
            @input="handlePasswordInput"
          />
          <text class="password-toggle" @click="togglePassword">
            <uni-icons
              :type="showPassword ? 'eye-slash-filled' : 'eye-filled'"
              size="18"
              color="#95a5a6"
            ></uni-icons>
          </text>
        </view>
      </view>

      <!-- 错误提示 -->
      <view v-if="errorMessage" class="error-message">
        {{ errorMessage }}
      </view>

      <!-- 登录按钮 -->
      <button
        class="login-btn"
        :loading="isLoading"
        :disabled="isLoading"
        @click="handleLogin"
      >
        {{ isLoading ? '登录中...' : '登录' }}
      </button>
    </view>

    <!-- 微信一键登录（小程序环境显示） -->
    <!--    #ifdef MP-WEIXIN-->
    <view class="weixin-login">
      <view class="divider">
        <text class="divider-text">其他登录方式</text>
      </view>
      <button
        class="weixin-btn"
        open-type="getUserInfo"
        @getuserinfo="handleWeixinLogin"
      >
        <uni-icons type="weixin" size="20" color="#07c160"></uni-icons>
        <text class="weixin-text">微信一键登录</text>
      </button>
    </view>
    <!--    #endif-->

    <!-- 底部链接 -->
    <view class="footer-links">
      <text class="link" @click="handleForgotPassword">忘记密码？</text>
      <text class="link" @click="handleRegister">注册账号</text>
    </view>
  </view>
</template>

<script setup lang="ts">
  import { ref, onMounted } from 'vue'

  // 表单数据
  const formData = ref({
    phone: '',
    password: ''
  })

  // 状态变量
  const isLoading = ref(false)
  const errorMessage = ref('')
  const showPassword = ref(false)

  onMounted(() => {
    // 检查是否已登录
    checkLoginStatus()
  })

  // 检查登录状态
  const checkLoginStatus = () => {
    const token = uni.getStorageSync('token')
    if (token) {
      uni.reLaunch({
        url: '/pages/index/index'
      })
    }
  }

  // 手机号输入处理
  const handlePhoneInput = () => {
    // 移除所有非数字字符
    formData.value.phone = formData.value.phone.replace(/\D/g, '')
    errorMessage.value = ''
  }

  // 密码输入处理
  const handlePasswordInput = () => {
    errorMessage.value = ''
  }

  // 切换密码显示
  const togglePassword = () => {
    showPassword.value = !showPassword.value
  }

  // 表单验证
  const validateForm = (): boolean => {
    errorMessage.value = ''

    if (!formData.value.phone) {
      errorMessage.value = '请输入手机号'
      return false
    }

    if (!/^1[3-9]\d{9}$/.test(formData.value.phone)) {
      errorMessage.value = '请输入正确的手机号'
      return false
    }

    if (!formData.value.password) {
      errorMessage.value = '请输入密码'
      return false
    }

    return true
  }

  // 处理登录
  const handleLogin = async () => {
    if (!validateForm()) {
      return
    }

    isLoading.value = true

    try {
      // 模拟登录请求
      await mockLogin()

      // 保存token
      uni.setStorageSync('token', 'mock_token_' + Date.now())

      // 跳转到首页
      uni.showToast({
        title: '登录成功',
        icon: 'success',
        duration: 1500
      })

      setTimeout(() => {
        uni.reLaunch({
          url: '/pages/home/home'
        })
      }, 1500)
    } catch (error: any) {
      errorMessage.value = error.message || '登录失败，请重试'
      uni.showToast({
        title: errorMessage.value,
        icon: 'none',
        duration: 2000
      })
    } finally {
      isLoading.value = false
    }
  }

  // 模拟登录请求
  const mockLogin = (): Promise<void> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // 这里替换为实际的登录API调用
        const mockUsers = {
          '13800138000': '123456',
          '13900139000': '123456'
        }

        if (formData.value.phone && formData.value.password) {
          // 模拟验证
          if (formData.value.password === '123456') {
            resolve()
          } else {
            reject(new Error('手机号或密码错误'))
          }
        } else {
          reject(new Error('请填写完整信息'))
        }
      }, 1000)
    })
  }

  // 微信一键登录
  const handleWeixinLogin = (e: any) => {
    if (e.detail.errMsg === 'getUserInfo:ok') {
      isLoading.value = true

      // 获取微信登录code
      uni.login({
        provider: 'weixin',
        success: loginRes => {
          if (loginRes.code) {
            // 这里调用后端API获取用户信息
            console.log('微信登录code:', loginRes.code)

            // 模拟登录成功
            setTimeout(() => {
              uni.setStorageSync('token', 'weixin_token_' + Date.now())
              uni.showToast({
                title: '微信登录成功',
                icon: 'success',
                duration: 1500
              })

              setTimeout(() => {
                uni.reLaunch({
                  url: '/pages/home/home'
                })
              }, 1500)
            }, 1000)
          }
        },
        fail: err => {
          console.error('微信登录失败:', err)
          uni.showToast({
            title: '微信登录失败',
            icon: 'none'
          })
        },
        complete: () => {
          isLoading.value = false
        }
      })
    } else {
      uni.showToast({
        title: '获取用户信息失败',
        icon: 'none'
      })
    }
  }

  // 忘记密码
  const handleForgotPassword = () => {
    uni.showToast({
      title: '跳转到忘记密码页面',
      icon: 'none'
    })
  }

  // 注册账号
  const handleRegister = () => {
    uni.showToast({
      title: '跳转到注册页面',
      icon: 'none'
    })
  }
</script>

<style lang="scss" scoped>
  .login-container {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
    padding: 60rpx 40rpx;
  }

  .logo-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 100rpx;
    margin-bottom: 80rpx;
  }

  .logo-icon {
    width: 120rpx;
    height: 120rpx;
    background: #ffffff;
    border-radius: 24rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 32rpx;
    box-shadow: 0 8rpx 32rpx rgba(0, 0, 0, 0.08);
  }

  .logo-icon-inner {
    font-size: 60rpx;
  }

  .app-name {
    font-size: 42rpx;
    font-weight: 600;
    color: #2c3e50;
    margin-bottom: 12rpx;
  }

  .app-slogan {
    font-size: 26rpx;
    color: #7f8c8d;
    letter-spacing: 1rpx;
  }

  .login-form {
    flex: 1;
    width: 100%;
  }

  .form-item {
    margin-bottom: 32rpx;
  }

  .input-wrapper {
    display: flex;
    align-items: center;
    background: #ffffff;
    border-radius: 12rpx;
    padding: 0 24rpx;
    height: 88rpx;
    border: 1px solid #e1e8ed;
    transition: all 0.3s ease;

    &:focus-within {
      border-color: #3498db;
      box-shadow: 0 0 0 4rpx rgba(52, 152, 219, 0.1);
    }
  }

  .input-icon {
    font-size: 32rpx;
    margin-right: 16rpx;
    color: #95a5a6;
  }

  .input-field {
    flex: 1;
    font-size: 30rpx;
    height: 48rpx;
    line-height: 48rpx;
  }

  .password-toggle {
    font-size: 32rpx;
    padding: 8rpx;
  }

  .error-message {
    background: #fee;
    color: #e74c3c;
    font-size: 24rpx;
    padding: 16rpx 24rpx;
    border-radius: 8rpx;
    margin-bottom: 24rpx;
    border-left: 4rpx solid #e74c3c;
  }

  .login-btn {
    width: 100%;
    height: 88rpx;
    background: #3498db;
    color: #ffffff;
    font-size: 30rpx;
    font-weight: 500;
    border-radius: 12rpx;
    border: none;
    margin-top: 24rpx;
    transition: all 0.3s ease;
    box-shadow: 0 4rpx 12rpx rgba(52, 152, 219, 0.3);

    &:active {
      transform: translateY(2rpx);
      box-shadow: 0 2rpx 8rpx rgba(52, 152, 219, 0.3);
    }
  }

  .weixin-login {
    margin-top: 48rpx;
    padding-top: 40rpx;
  }

  .divider {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 32rpx;
  }

  .divider-text {
    font-size: 24rpx;
    color: #95a5a6;
    padding: 0 24rpx;
    background: #f5f7fa;
  }

  .weixin-btn {
    width: 100%;
    height: 88rpx;
    background: #ffffff;
    color: #2c3e50;
    font-size: 28rpx;
    border-radius: 12rpx;
    border: 1px solid #e1e8ed;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12rpx;
    transition: all 0.3s ease;

    &:active {
      background: #f8f9fa;
      transform: translateY(2rpx);
    }
  }

  .weixin-icon {
    font-size: 28rpx;
    color: #07c160;
  }

  .footer-links {
    display: flex;
    justify-content: space-between;
    margin-top: 48rpx;
    padding-top: 32rpx;
  }

  .link {
    font-size: 26rpx;
    color: #7f8c8d;
    transition: color 0.3s ease;

    &:active {
      color: #3498db;
    }
  }

  // 小程序环境下的样式优化
  button::after {
    border: none;
  }
</style>
