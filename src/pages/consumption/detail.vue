<template>
  <view class="consumption-detail-container">
    <!-- Header -->
    <view class="header">
      <view class="header-left" @click="goBack">
        <view class="back-button">
          <uni-icons type="left" size="20" color="#2c3e50"></uni-icons>
        </view>
      </view>
      <text class="header-title">消费详情</text>
      <view class="header-right"></view>
    </view>

    <!-- Content -->
    <scroll-view scroll-y class="detail-content">
      <!-- Main Info Card -->
      <view class="main-info-card">
        <view class="info-header">
          <text class="info-title">充电信息</text>
          <text class="info-date">2023-10-25 14:30</text>
        </view>
        
        <view class="info-grid">
          <view class="info-item">
            <text class="info-label">充电站</text>
            <text class="info-value">美华智充水口充电站</text>
          </view>
          <view class="info-item">
            <text class="info-label">充电桩</text>
            <text class="info-value">1号桩-右枪</text>
          </view>
          <view class="info-item">
            <text class="info-label">车牌号</text>
            <text class="info-value">鄂A4YM56</text>
          </view>
        </view>
      </view>

      <!-- Charging Details -->
      <view class="charging-details-card">
        <text class="card-title">充电详情</text>
        
        <view class="detail-item">
          <text class="detail-label">开始时间</text>
          <text class="detail-value">14:30</text>
        </view>
        
        <view class="detail-item">
          <text class="detail-label">结束时间</text>
          <text class="detail-value">15:50</text>
        </view>
        
        <view class="detail-item">
          <text class="detail-label">充电时长</text>
          <text class="detail-value">80分钟</text>
        </view>
        
        <view class="detail-item">
          <text class="detail-label">充电电量</text>
          <text class="detail-value">5.6度</text>
        </view>
        
        <view class="detail-item">
          <text class="detail-label">服务费</text>
          <text class="detail-value">2.00元</text>
        </view>
        
        <view class="detail-item total">
          <text class="detail-label">总计</text>
          <text class="detail-value total-amount">¥99.00</text>
        </view>
      </view>

      <!-- Payment Info -->
      <view class="payment-card">
        <text class="card-title">支付信息</text>
        
        <view class="payment-item">
          <text class="payment-label">支付方式</text>
          <text class="payment-value">微信支付</text>
        </view>
        
        <view class="payment-item">
          <text class="payment-label">支付时间</text>
          <text class="payment-value">2023-10-25 15:52</text>
        </view>
        
        <view class="payment-item">
          <text class="payment-label">订单号</text>
          <text class="payment-value">20231025123456789</text>
        </view>
        
        <view class="payment-status">
          <text class="payment-label">支付状态</text>
          <text class="payment-status success">支付成功</text>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'

const recordId = ref(0)
const record = ref({
  id: 1,
  date: '2023-10-25',
  time: '14:30',
  station: '美华智充水口充电站',
  pile: '1号桩-右枪',
  licensePlate: '鄂A4YM56',
  startTime: '14:30',
  endTime: '15:50',
  duration: '80分钟',
  electricity: '5.6度',
  serviceFee: '2.00元',
  total: '99.00元',
  paymentMethod: '微信支付',
  paymentTime: '2023-10-25 15:52',
  orderNumber: '20231025123456789',
  status: 'success'
})

onLoad((options) => {
  if (options.id) {
    recordId.value = parseInt(options.id)
    // In real app, fetch record details based on ID
    loadRecordDetails(recordId.value)
  }
})

const loadRecordDetails = (id: number) => {
  // Mock data - in real app, fetch from API
  const mockRecords = [
    {
      id: 1,
      date: '2023-10-25',
      time: '14:30',
      station: '美华智充水口充电站',
      pile: '1号桩-右枪',
      licensePlate: '鄂A4YM56',
      startTime: '14:30',
      endTime: '15:50',
      duration: '80分钟',
      electricity: '5.6度',
      serviceFee: '2.00元',
      total: '99.00元',
      paymentMethod: '微信支付',
      paymentTime: '2023-10-25 15:52',
      orderNumber: '20231025123456789',
      status: 'success'
    }
  ]
  
  const found = mockRecords.find(r => r.id === id)
  if (found) {
    record.value = found
  }
}

const goBack = () => {
  uni.navigateBack()
}
</script>

<style lang="scss" scoped>
.consumption-detail-container {
  background: #f5f7fa;
  min-height: 100vh;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20rpx 32rpx;
  background: #ffffff;
  border-bottom: 1px solid #e1e8ed;
  position: sticky;
  top: 0;
  z-index: 100;
  
  .header-left {
    width: 80rpx;
    height: 80rpx;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    
    .back-button {
      width: 64rpx;
      height: 64rpx;
      background: #f8f9fa;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.3s ease;
      box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.1);
      
      &:active {
        background: #e9ecef;
        transform: scale(0.95);
      }
    }
  }
  
  .header-title {
    font-size: 32rpx;
    font-weight: 600;
    color: #2c3e50;
  }
  
  .header-right {
    width: 80rpx;
  }
}

.detail-content {
  padding: 32rpx;
  height: calc(100vh - 120rpx);
  box-sizing: border-box;
  width: 100%;
  overflow-x: hidden;
}

.main-info-card, .charging-details-card, .payment-card {
  background: #ffffff;
  border-radius: 16rpx;
  padding: 32rpx;
  margin-bottom: 32rpx;
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.08);
}

.card-title {
  font-size: 32rpx;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 24rpx;
  display: block;
}

.info-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32rpx;
  
  .info-title {
    font-size: 28rpx;
    font-weight: 600;
    color: #2c3e50;
  }
  
  .info-date {
    font-size: 26rpx;
    color: #7f8c8d;
  }
}

.info-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24rpx;
}

.info-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20rpx 0;
  border-bottom: 1px solid #f1f3f4;
  
  &:last-child {
    border-bottom: none;
  }
  
  .info-label {
    font-size: 26rpx;
    color: #7f8c8d;
  }
  
  .info-value {
    font-size: 28rpx;
    font-weight: 500;
    color: #2c3e50;
  }
}

.detail-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24rpx 0;
  border-bottom: 1px solid #f1f3f4;
  
  &:last-child {
    border-bottom: none;
  }
  
  .detail-label {
    font-size: 26rpx;
    color: #7f8c8d;
  }
  
  .detail-value {
    font-size: 28rpx;
    font-weight: 500;
    color: #2c3e50;
  }
}

.total {
  .detail-value {
    font-size: 36rpx;
    font-weight: 700;
    color: #e74c3c;
  }
}

.payment-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24rpx 0;
  border-bottom: 1px solid #f1f3f4;
  
  &:last-child {
    border-bottom: none;
  }
  
  .payment-label {
    font-size: 26rpx;
    color: #7f8c8d;
  }
  
  .payment-value {
    font-size: 28rpx;
    font-weight: 500;
    color: #2c3e50;
  }
}

.payment-status {
  .payment-value {
    color: #27ae60;
    font-weight: 600;
  }
}
</style>
