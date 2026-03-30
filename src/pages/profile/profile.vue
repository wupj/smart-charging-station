<template>
  <view class="profile-container">
    <!-- User Info Section -->
    <view class="user-info-section">
      <view class="user-avatar">
        <image class="avatar-image" src="https://picsum.photos/seed/user-avatar/120/120.jpg" mode="aspectFill" />
      </view>
      <view class="user-details">
        <text class="username">茅台当奶茶喝</text>
        <text class="phone-number">152****4675</text>
      </view>
      <view class="header-right" @click="openSettings">
        <uni-icons type="gear-filled" size="24" color="#7f8c8d"></uni-icons>
      </view>
    </view>

    <!-- Menu List -->
    <view class="menu-section">
      <view class="menu-item" @click="goToOrders">
        <view class="menu-icon">
          <uni-icons type="wallet" size="24" color="#3498db"></uni-icons>
        </view>
        <text class="menu-text">我的订单</text>
        <uni-icons type="right" size="16" color="#c0c4cc"></uni-icons>
      </view>
      
      <view class="menu-item" @click="goToVehicles">
        <view class="menu-icon">
          <uni-icons type="fire-filled" size="24" color="#3498db"></uni-icons>
        </view>
        <text class="menu-text">我的车辆</text>
        <uni-icons type="right" size="16" color="#c0c4cc"></uni-icons>
      </view>
      
      <view class="menu-item" @click="goToFavorites">
        <view class="menu-icon">
          <uni-icons type="star-filled" size="24" color="#f39c12"></uni-icons>
        </view>
        <text class="menu-text">我的收藏</text>
        <uni-icons type="right" size="16" color="#c0c4cc"></uni-icons>
      </view>
      
      <view class="menu-item" @click="contactService">
        <view class="menu-icon">
          <uni-icons type="contact-filled" size="24" color="#3498db"></uni-icons>
        </view>
        <text class="menu-text">联系客服</text>
        <uni-icons type="right" size="16" color="#c0c4cc"></uni-icons>
      </view>
      
      <view class="menu-item" @click="openAgreement">
        <view class="menu-icon">
          <uni-icons type="info-filled" size="24" color="#7f8c8d"></uni-icons>
        </view>
        <text class="menu-text">用户协议</text>
        <uni-icons type="right" size="16" color="#c0c4cc"></uni-icons>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
const openSettings = () => {
  uni.showToast({
    title: '打开设置',
    icon: 'none'
  })
}

const goToOrders = () => {
  uni.navigateTo({
    url: '/pages/orders/orders'
  })
}

const goToVehicles = () => {
  uni.navigateTo({
    url: '/pages/vehicles/vehicles'
  })
}

const goToFavorites = () => {
  uni.showToast({
    title: '跳转到收藏页面',
    icon: 'none'
  })
}

const contactService = () => {
  uni.makePhoneCall({
    phoneNumber: '400-888-8888'
  })
}

const openAgreement = () => {
  uni.showToast({
    title: '打开用户协议',
    icon: 'none'
  })
}
</script>

<style lang="scss" scoped>
.profile-container {
  background: #f5f7fa;
  min-height: 100vh;
}

.user-info-section {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #ffffff;
  padding: 40rpx 32rpx;
  margin-bottom: 20rpx;
  
  .user-avatar {
    margin-right: 24rpx;
    
    .avatar-image {
      width: 120rpx;
      height: 120rpx;
      border-radius: 60rpx;
      border: 4rpx solid #e1e8ed;
    }
  }
  
  .user-details {
    flex: 1;
    
    .username {
      font-size: 36rpx;
      font-weight: 600;
      color: #2c3e50;
      margin-bottom: 12rpx;
      display: block;
    }
    
    .phone-number {
      font-size: 28rpx;
      color: #7f8c8d;
      display: block;
    }
  }
  
  .header-right {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 60rpx;
    height: 60rpx;
    
    &:active {
      opacity: 0.7;
    }
  }
}

.menu-section {
  background: #ffffff;
  padding: 0 32rpx;
}

.menu-item {
  display: flex;
  align-items: center;
  padding: 32rpx 0;
  border-bottom: 1px solid #f1f3f4;
  transition: all 0.3s ease;
  
  &:last-child {
    border-bottom: none;
  }
  
  &:active {
    background: #f8f9fa;
  }
  
  .menu-icon {
    width: 60rpx;
    height: 60rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 24rpx;
  }
  
  .menu-text {
    flex: 1;
    font-size: 30rpx;
    color: #2c3e50;
  }
}
</style>
