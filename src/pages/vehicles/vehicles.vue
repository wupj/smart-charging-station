<template>
  <view class="vehicles-container">
    <!-- Header -->
    <view class="header">
      <view class="header-left" @click="goBack">
        <view class="back-button">
          <uni-icons type="left" size="20" color="#2c3e50"></uni-icons>
        </view>
      </view>
      <text class="header-title">我的车辆</text>
      <view class="header-right" @click="addVehicle">
        <uni-icons type="plus-filled" size="24" color="#3498db"></uni-icons>
      </view>
    </view>

    <!-- Vehicles List -->
    <scroll-view scroll-y class="vehicles-list">
      <view v-if="vehicles.length === 0" class="empty-state">
        <view class="empty-icon">
          <uni-icons type="car-filled" size="80" color="#c0c4cc"></uni-icons>
        </view>
        <text class="empty-title">暂无车辆</text>
        <text class="empty-subtitle">点击添加您的第一辆爱车</text>
        <button class="add-vehicle-btn" @click="addVehicle">
          <uni-icons type="plus" size="20" color="#ffffff"></uni-icons>
          <text class="btn-text">添加车辆</text>
        </button>
      </view>

      <view
        v-else
        v-for="vehicle in vehicles"
        :key="vehicle.id"
        class="vehicle-item"
        @click="goToVehicleDetail(vehicle.id)"
      >
        <view class="vehicle-header">
          <view class="vehicle-info">
            <text class="vehicle-name">{{ vehicle.name }}</text>
            <text class="vehicle-model">{{ vehicle.model }}</text>
          </view>
          <view class="vehicle-status" :class="vehicle.status">
            <text class="status-text">{{ vehicle.statusText }}</text>
          </view>
        </view>

        <view class="vehicle-details">
          <view class="detail-item">
            <text class="detail-label">车牌号</text>
            <text class="detail-value">{{ vehicle.licensePlate }}</text>
          </view>
          <view class="detail-item">
            <text class="detail-label">品牌</text>
            <text class="detail-value">{{ vehicle.brand }}</text>
          </view>
          <view class="detail-item">
            <text class="detail-label">购买时间</text>
            <text class="detail-value">{{ vehicle.purchaseDate }}</text>
          </view>
          <view class="detail-item">
            <text class="detail-label">里程</text>
            <text class="detail-value">{{ vehicle.mileage }}km</text>
          </view>
        </view>

        <view class="vehicle-actions">
          <button class="action-btn edit" @click="editVehicle(vehicle.id)">
            <uni-icons type="compose" size="16" color="#ffffff"></uni-icons>
            <text class="btn-text">编辑</text>
          </button>
          <button class="action-btn delete" @click="deleteVehicle(vehicle.id)">
            <uni-icons type="trash" size="16" color="#ffffff"></uni-icons>
            <text class="btn-text">删除</text>
          </button>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import { onLoad } from '@dcloudio/uni-app'

  const vehicles = ref([
    {
      id: 1,
      name: '特斯拉 Model 3',
      model: 'Model 3',
      licensePlate: '粤B88888',
      brand: 'Tesla',
      purchaseDate: '2023-06-15',
      mileage: '15420',
      status: 'active',
      statusText: '使用中'
    },
    {
      id: 2,
      name: '比亚迪汉',
      model: '汉EV',
      licensePlate: '粤A66666',
      brand: 'BYD',
      purchaseDate: '2022-12-20',
      mileage: '28560',
      status: 'idle',
      statusText: '空闲'
    }
  ])

  onLoad(() => {
    // In real app, fetch user's vehicles from API
    console.log('Vehicles page loaded')
  })

  const goBack = () => {
    uni.navigateBack()
  }

  const addVehicle = () => {
    uni.navigateTo({
      url: '/pages/vehicles/add-vehicle'
    })
  }

  const goToVehicleDetail = (vehicleId: number) => {
    uni.navigateTo({
      url: `/pages/vehicles/detail?id=${vehicleId}`
    })
  }

  const editVehicle = (vehicleId: number) => {
    uni.showToast({
      title: '编辑车辆信息',
      icon: 'none'
    })
  }

  const deleteVehicle = (vehicleId: number) => {
    uni.showModal({
      title: '确认删除',
      content: '确定要删除这辆车吗？',
      success: () => {
        // Remove from array
        const index = vehicles.value.findIndex(v => v.id === vehicleId)
        if (index > -1) {
          vehicles.value.splice(index, 1)
        }
        uni.showToast({
          title: '删除成功',
          icon: 'success'
        })
      }
    })
  }
</script>

<style lang="scss" scoped>
  .vehicles-container {
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
      display: flex;
      align-items: center;
      justify-content: flex-end;

      &:active {
        opacity: 0.7;
      }
    }
  }

  .vehicles-list {
    height: calc(100vh - 160rpx);
    padding: 20rpx;
    box-sizing: border-box;
    width: 100%;
    overflow-x: hidden;
  }

  .empty-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;

    .empty-icon {
      margin-bottom: 40rpx;
    }

    .empty-title {
      font-size: 36rpx;
      font-weight: 600;
      color: #2c3e50;
      margin-bottom: 16rpx;
    }

    .empty-subtitle {
      font-size: 28rpx;
      color: #7f8c8d;
      margin-bottom: 40rpx;
      text-align: center;
    }

    .add-vehicle-btn {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: #ffffff;
      border: none;
      border-radius: 50rpx;
      padding: 24rpx 48rpx;
      font-size: 28rpx;
      font-weight: 500;
      box-shadow: 0 8rpx 24rpx rgba(102, 126, 234, 0.3);
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      gap: 16rpx;

      &:active {
        transform: scale(0.95);
        box-shadow: 0 12rpx 32rpx rgba(102, 126, 234, 0.4);
      }

      .btn-text {
        font-size: 28rpx;
        font-weight: 500;
        color: #ffffff;
      }
    }
  }

  .vehicle-item {
    background: rgba(255, 255, 255, 0.95);
    border-radius: 20rpx;
    padding: 32rpx;
    margin-bottom: 20rpx;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;

    &:hover {
      transform: translateY(-4rpx);
      box-shadow: 0 12rpx 32rpx rgba(0, 0, 0, 0.15);
    }

    .vehicle-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 24rpx;

      .vehicle-info {
        flex: 1;

        .vehicle-name {
          font-size: 32rpx;
          font-weight: 600;
          color: #2c3e50;
          margin-bottom: 8rpx;
          display: block;
        }

        .vehicle-model {
          font-size: 26rpx;
          color: #7f8c8d;
        }
      }

      .vehicle-status {
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

    .vehicle-details {
      flex: 1;

      .detail-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 16rpx 0;
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
    }

    .vehicle-actions {
      display: flex;
      gap: 16rpx;
      margin-top: 24rpx;

      .action-btn {
        flex: 1;
        height: 64rpx;
        border-radius: 50rpx;
        padding: 0 32rpx;
        font-size: 24rpx;
        font-weight: 500;
        transition: all 0.3s ease;
        display: flex;
        align-items: center;
        justify-content: center;

        .edit {
          background: #3498db;

          &:active {
            background: #2980b9;
          }
        }

        .delete {
          background: #e74c3c;

          &:active {
            background: #c0392b;
          }
        }

        .btn-text {
          color: #ffffff;
        }
      }
    }
  }
</style>
