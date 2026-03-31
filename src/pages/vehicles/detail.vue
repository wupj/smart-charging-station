<template>
  <view class="vehicle-detail-container">
    <!-- Header -->
    <view class="header">
      <view class="header-left" @click="goBack">
        <view class="back-button">
          <uni-icons type="left" size="20" color="#2c3e50"></uni-icons>
        </view>
      </view>
      <text class="header-title">车辆详情</text>
      <view class="header-right"></view>
    </view>

    <!-- Content -->
    <scroll-view scroll-y class="detail-content">
      <!-- Vehicle Image -->
      <view class="vehicle-image-section">
        <image
          class="vehicle-image"
          src="https://picsum.photos/seed/tesla-model3/400/300.jpg"
          mode="aspectFill"
        />
      </view>

      <!-- Vehicle Info -->
      <view class="info-card">
        <text class="card-title">车辆信息</text>

        <view class="info-grid">
          <view class="info-item">
            <text class="info-label">车辆名称</text>
            <text class="info-value">{{ vehicle.name }}</text>
          </view>
          <view class="info-item">
            <text class="info-label">车辆型号</text>
            <text class="info-value">{{ vehicle.model }}</text>
          </view>
          <view class="info-item">
            <text class="info-label">车牌号</text>
            <text class="info-value">{{ vehicle.licensePlate }}</text>
          </view>
          <view class="info-item">
            <text class="info-label">品牌</text>
            <text class="info-value">{{ vehicle.brand }}</text>
          </view>
        </view>

        <view class="status-section">
          <text class="status-label">车辆状态</text>
          <view class="status-badge" :class="vehicle.status">
            <text class="status-text">{{ vehicle.statusText }}</text>
          </view>
        </view>
      </view>

      <!-- Vehicle Details -->
      <view class="details-card">
        <text class="card-title">车辆详情</text>

        <view class="detail-item">
          <text class="detail-label">购买时间</text>
          <text class="detail-value">{{ vehicle.purchaseDate }}</text>
        </view>

        <view class="detail-item">
          <text class="detail-label">当前里程</text>
          <text class="detail-value">{{ vehicle.mileage }}km</text>
        </view>

        <view class="detail-item">
          <text class="detail-label">保险到期</text>
          <text class="detail-value">{{ vehicle.insuranceExpiry }}</text>
        </view>

        <view class="detail-item">
          <text class="detail-label">年检到期</text>
          <text class="detail-value">{{ vehicle.inspectionExpiry }}</text>
        </view>

        <view class="detail-item">
          <text class="detail-label">充电功率</text>
          <text class="detail-value">{{ vehicle.chargingPower }}kW</text>
        </view>
      </view>

      <!-- Action Buttons -->
      <view class="action-section">
        <button class="action-btn primary" @click="startCharging">
          <uni-icons type="flash-filled" size="20" color="#ffffff"></uni-icons>
          <text class="btn-text">开始充电</text>
        </button>
        <button class="action-btn secondary" @click="editVehicle">
          <uni-icons type="compose" size="20" color="#ffffff"></uni-icons>
          <text class="btn-text">编辑信息</text>
        </button>
      </view>
    </scroll-view>
  </view>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import { onLoad } from '@dcloudio/uni-app'

  const vehicleId = ref(0)
  const vehicle = ref({
    id: 1,
    name: '特斯拉 Model 3',
    model: 'Model 3',
    licensePlate: '粤B88888',
    brand: 'Tesla',
    purchaseDate: '2023-06-15',
    mileage: '15420',
    status: 'active',
    statusText: '使用中',
    insuranceExpiry: '2024-06-30',
    inspectionExpiry: '2024-06-15',
    chargingPower: '11'
  })

  onLoad(options => {
    if (options.id) {
      vehicleId.value = parseInt(options.id)
      // In real app, fetch vehicle details based on ID
      loadVehicleDetails(vehicleId.value)
    }
  })

  const loadVehicleDetails = (id: number) => {
    // Mock data - in real app, fetch from API
    const mockVehicles = [
      {
        id: 1,
        name: '特斯拉 Model 3',
        model: 'Model 3',
        licensePlate: '粤B88888',
        brand: 'Tesla',
        purchaseDate: '2023-06-15',
        mileage: '15420',
        status: 'active',
        statusText: '使用中',
        insuranceExpiry: '2024-06-30',
        inspectionExpiry: '2024-06-15',
        chargingPower: '11'
      }
    ]

    const found = mockVehicles.find(v => v.id === id)
    if (found) {
      vehicle.value = found
    }
  }

  const goBack = () => {
    uni.navigateBack()
  }

  const startCharging = () => {
    uni.showToast({
      title: '开始充电',
      icon: 'success'
    })
  }

  const editVehicle = () => {
    uni.showToast({
      title: '编辑车辆信息',
      icon: 'none'
    })
  }
</script>

<style lang="scss" scoped>
  .vehicle-detail-container {
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
      height: 80rpx;
    }
  }

  .detail-content {
    padding: 32rpx;
    height: calc(100vh - 120rpx);
    box-sizing: border-box;
    width: 100%;
    overflow-x: hidden;
  }

  .vehicle-image-section {
    background: rgba(255, 255, 255, 0.95);
    padding: 32rpx;
    margin-bottom: 32rpx;
    border-radius: 20rpx;
    text-align: center;

    .vehicle-image {
      width: 100%;
      height: 300rpx;
      border-radius: 16rpx;
      overflow: hidden;
    }
  }

  .info-card,
  .details-card {
    background: rgba(255, 255, 255, 0.95);
    border-radius: 20rpx;
    padding: 32rpx;
    margin-bottom: 32rpx;
    box-shadow: 0 8rpx 24rpx rgba(0, 0, 0, 0.1);
  }

  .card-title {
    font-size: 32rpx;
    font-weight: 600;
    color: #2c3e50;
    margin-bottom: 24rpx;
    display: block;
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
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);

    &:last-child {
      border-bottom: none;
    }

    .info-label {
      font-size: 26rpx;
      color: #7f8c8d;
    }

    .info-value {
      font-size: 28rpx;
      color: #2c3e50;
      flex: 1;
    }
  }

  .status-section {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 32rpx;

    .status-label {
      font-size: 26rpx;
      color: #7f8c8d;
      margin-right: 16rpx;
    }

    .status-badge {
      padding: 8rpx 16rpx;
      border-radius: 50rpx;

      &.active {
        background: #27ae60;
      }

      &.idle {
        background: #95a5a6;
      }

      .status-text {
        font-size: 24rpx;
        color: #ffffff;
        font-weight: 500;
      }
    }
  }

  .details-card {
    margin-bottom: 32rpx;
  }

  .detail-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 24rpx 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);

    &:last-child {
      border-bottom: none;
    }

    .detail-label {
      font-size: 26rpx;
      color: #7f8c8d;
    }

    .detail-value {
      font-size: 28rpx;
      color: #2c3e50;
      flex: 1;
    }
  }

  .action-section {
    padding: 32rpx;
    display: flex;
    gap: 20rpx;
  }

  .action-btn {
    flex: 1;
    height: 88rpx;
    border-radius: 50rpx;
    padding: 0 32rpx;
    font-size: 28rpx;
    font-weight: 500;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16rpx;

    .primary {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: #ffffff;

      &:active {
        background: #5a67d8;
        transform: scale(0.95);
      }
    }

    .secondary {
      background: #6c757d;
      color: #ffffff;

      &:active {
        background: #5a67d8;
        transform: scale(0.95);
      }
    }

    .btn-text {
      font-size: 28rpx;
      font-weight: 500;
      color: #ffffff;
    }
  }
</style>
