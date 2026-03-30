<template>
  <view class="payment-success-container">
    <!-- Success Icon -->
    <view class="success-icon">
      <uni-icons type="checkmarkempty" size="80" color="#27ae60"></uni-icons>
    </view>

    <!-- Success Message -->
    <text class="success-title">支付成功</text>
    
    <!-- Service Info -->
    <text class="service-name">圈层物联・智能充电桩服务</text>
    
    <!-- Amount -->
    <text class="amount">¥99.00</text>
    
    <!-- Return Message -->
    <text class="return-message">10s后自动返回订单页面，点击立即返回...</text>
    
    <!-- Return Button -->
    <button class="return-btn" @click="returnToOrders">
      <text class="btn-text">立即返回</text>
    </button>
  </view>
</template>

<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app'

let countdown = 10

onLoad(() => {
  // Start countdown timer
  const timer = setInterval(() => {
    countdown--
    if (countdown <= 0) {
      clearInterval(timer)
      returnToOrders()
    }
  }, 1000)
})

const returnToOrders = () => {
  uni.navigateTo({
    url: '/pages/orders/orders'
  })
}
</script>

<style lang="scss" scoped>
.payment-success-container {
  background: linear-gradient(135deg, #f0f9f5 0%, #e8f4fd 100%);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 120rpx 80rpx;
  position: relative;
}

.success-icon {
  margin-bottom: 60rpx;
  animation: bounceIn 0.6s ease-out;
}

@keyframes bounceIn {
  0% {
    transform: scale(0);
    opacity: 0;
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

.success-title {
  font-size: 48rpx;
  font-weight: 600;
  color: #ffffff;
  margin-bottom: 32rpx;
  letter-spacing: 1rpx;
  animation: slideInUp 0.6s ease-out;
}

@keyframes slideInUp {
  from {
    transform: translateY(60rpx);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.service-name {
  font-size: 32rpx;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 80rpx;
  text-align: center;
  font-weight: 400;
  letter-spacing: 0.5rpx;
  animation: fadeIn 1.2s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.amount {
  font-size: 120rpx;
  font-weight: 600;
  color: #ffffff;
  margin-bottom: 80rpx;
  animation: scaleIn 0.8s ease-out 0.2s;
  position: relative;
  z-index: 2;
}

@keyframes scaleIn {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}

.return-message {
  font-size: 28rpx;
  color: rgba(255, 255, 255, 0.8);
  text-align: center;
  margin-bottom: 80rpx;
  line-height: 1.5;
  animation: fadeIn 1.8s ease-out 0.5s;
}

.return-btn {
  background: #ffffff;
  color: #27ae60;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 50rpx;
  padding: 24rpx 48rpx;
  font-size: 28rpx;
  font-weight: 500;
  transition: all 0.3s ease;
  position: relative;
  z-index: 10;
  overflow: hidden;
  
  &:active {
    transform: scale(0.96);
    background: #f8f9fa;
  }
  
  .btn-text {
    color: #27ae60;
    position: relative;
    z-index: 1;
  }
}
</style>
