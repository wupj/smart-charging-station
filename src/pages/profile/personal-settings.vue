<template>
  <view class="settings-container">
    <!-- Settings List -->
    <view class="settings-section">
      <!-- Avatar -->
      <view class="setting-item" @click="changeAvatar">
        <text class="setting-label">头像</text>
        <view class="setting-value">
          <image class="avatar-small" src="https://picsum.photos/seed/user-avatar/60/60.jpg" mode="aspectFill" />
          <uni-icons type="right" size="16" color="#c0c4cc"></uni-icons>
        </view>
      </view>
      
      <!-- Member Name -->
      <view class="setting-item" @click="editMemberName">
        <text class="setting-label">会员名</text>
        <view class="setting-value">
          <text class="value-text">茅台当奶喝</text>
          <uni-icons type="right" size="16" color="#c0c4cc"></uni-icons>
        </view>
      </view>
      
      <!-- Gender -->
      <view class="setting-item">
        <text class="setting-label">性别</text>
        <view class="setting-value">
          <text class="value-text">女</text>
        </view>
      </view>
      
      <!-- Nickname -->
      <view class="setting-item" @click="editNickname">
        <text class="setting-label">昵称</text>
        <view class="setting-value">
          <text class="value-text">小猪PQ</text>
          <uni-icons type="right" size="16" color="#c0c4cc"></uni-icons>
        </view>
      </view>
      
      <!-- Personal Signature -->
      <view class="setting-item" @click="editSignature">
        <text class="setting-label">个性签名</text>
        <view class="setting-value">
          <text class="value-text placeholder">去设置</text>
          <uni-icons type="right" size="16" color="#c0c4cc"></uni-icons>
        </view>
      </view>
    </view>
    
    <!-- Logout Button -->
    <view class="logout-section">
      <button class="logout-btn" @click="logout">退出登录</button>
    </view>
  </view>
</template>

<script setup lang="ts">
const changeAvatar = () => {
  // #ifdef H5
  uni.chooseImage({
    count: 1,
    sizeType: ['compressed'],
    sourceType: ['album', 'camera'],
    success: (res) => {
      uni.showToast({
        title: '头像更换成功',
        icon: 'success'
      })
    }
  })
  // #endif
  
  // #ifdef MP-WEIXIN
  uni.getUserProfile({
    desc: '用于完善会员资料',
    success: (res) => {
      uni.showToast({
        title: '获取微信头像成功',
        icon: 'success'
      })
    },
    fail: () => {
      uni.showToast({
        title: '获取头像失败',
        icon: 'error'
      })
    }
  })
  // #endif
}

const editMemberName = () => {
  uni.showModal({
    title: '修改会员名',
    content: '会员名只能修改一次',
    editable: true,
    placeholderText: '请输入新的会员名',
    success: (res) => {
      if (res.confirm && res.content) {
        uni.showToast({
          title: '修改成功',
          icon: 'success'
        })
      }
    }
  })
}

const editNickname = () => {
  // #ifdef H5
  uni.showModal({
    title: '修改昵称',
    editable: true,
    placeholderText: '请输入昵称',
    success: (res) => {
      if (res.confirm && res.content) {
        uni.showToast({
          title: '修改成功',
          icon: 'success'
        })
      }
    }
  })
  // #endif
  
  // #ifdef MP-WEIXIN
  uni.getUserProfile({
    desc: '用于完善会员资料',
    success: (res) => {
      uni.showToast({
        title: '获取微信昵称成功',
        icon: 'success'
      })
    },
    fail: () => {
      uni.showToast({
        title: '获取昵称失败',
        icon: 'error'
      })
    }
  })
  // #endif
}

const editSignature = () => {
  uni.showModal({
    title: '设置个性签名',
    editable: true,
    placeholderText: '请输入个性签名',
    success: (res) => {
      if (res.confirm && res.content) {
        uni.showToast({
          title: '设置成功',
          icon: 'success'
        })
      }
    }
  })
}

const logout = () => {
  uni.showModal({
    title: '提示',
    content: '确定要退出登录吗？',
    success: (res) => {
      if (res.confirm) {
        // 清除用户信息
        uni.removeStorageSync('userInfo')
        uni.removeStorageSync('token')
        
        // 跳转到登录页
        uni.reLaunch({
          url: '/pages/login/login'
        })
      }
    }
  })
}
</script>

<style lang="scss" scoped>
.settings-container {
  background: #f5f7fa;
  min-height: 100vh;
  padding: 20rpx 0;
}

.settings-section {
  background: #ffffff;
  margin: 0 32rpx;
  border-radius: 16rpx;
  overflow: hidden;
}

.setting-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 32rpx;
  border-bottom: 1px solid #f1f3f4;
  transition: all 0.3s ease;
  
  &:last-child {
    border-bottom: none;
  }
  
  &:active {
    background: #f8f9fa;
  }
  
  .setting-label {
    font-size: 32rpx;
    color: #2c3e50;
    font-weight: 500;
  }
  
  .setting-value {
    display: flex;
    align-items: center;
    
    .avatar-small {
      width: 60rpx;
      height: 60rpx;
      border-radius: 30rpx;
      margin-right: 16rpx;
    }
    
    .value-text {
      font-size: 30rpx;
      color: #7f8c8d;
      margin-right: 16rpx;
      
      &.placeholder {
        color: #3498db;
      }
    }
  }
}

.logout-section {
  padding: 60rpx 32rpx 40rpx;
  
  .logout-btn {
    width: 100%;
    height: 88rpx;
    background: #3498db;
    color: #ffffff;
    border: none;
    border-radius: 44rpx;
    font-size: 32rpx;
    font-weight: 500;
    display: flex;
    align-items: center;
    justify-content: center;
    
    &:active {
      background: #2980b9;
    }
    
    &::after {
      border: none;
    }
  }
}
</style>
