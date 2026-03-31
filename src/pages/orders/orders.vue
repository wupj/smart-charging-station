<template>
  <view class="orders-container">
    <!-- Header -->
    <view class="header">
      <view class="header-left" @click="goBack">
        <view class="back-button">
          <uni-icons type="left" size="20" color="#2c3e50"></uni-icons>
        </view>
      </view>
      <text class="header-title">我的订单</text>
      <view class="header-right"></view>
    </view>

    <!-- Tabs -->
    <view class="tabs">
      <view
        class="tab-item"
        :class="{ active: activeTab === 'charging' }"
        @click="switchTab('charging')"
      >
        <text>充电中</text>
      </view>
      <view
        class="tab-item"
        :class="{ active: activeTab === 'consumption' }"
        @click="switchTab('consumption')"
      >
        <text>消费记录</text>
      </view>
    </view>

    <!-- Tab Content -->
    <view class="tab-content">
      <!-- 充电中 Tab -->
      <view v-if="activeTab === 'charging'" class="charging-content">
        <!-- Charging Info Section -->
        <view class="charging-info">
          <view class="info-row">
            <text class="info-label">车牌号:</text>
            <text class="info-value">鄂A4YM56</text>
          </view>
          <view class="info-row">
            <text class="info-value">1号桩-右枪</text>
          </view>
        </view>

        <!-- Charging Progress -->
        <view class="charging-progress">
          <view class="progress-circle">
            <view class="progress-bar" :style="{ width: '66%' }"></view>
            <view class="progress-info">
              <text class="progress-percentage">66%</text>
              <text class="progress-label">已充电量</text>
            </view>
          </view>
        </view>

        <!-- Real-time Data -->
        <view class="realtime-data">
          <view class="data-item">
            <text class="data-label">电压 (v)</text>
            <text class="data-value">336.4</text>
          </view>
          <view class="data-item">
            <text class="data-label">电流 (A)</text>
            <text class="data-value">45.6</text>
          </view>
          <view class="data-item">
            <text class="data-label">功率 (kw)</text>
            <text class="data-value">15339.84</text>
          </view>
        </view>

        <!-- Charging Details -->
        <view class="charging-details">
          <view class="detail-item">
            <text class="detail-label">已充电量</text>
            <text class="detail-value">5.6度</text>
          </view>
          <view class="detail-item">
            <text class="detail-label">已充时长</text>
            <text class="detail-value">80分</text>
          </view>
          <view class="detail-item">
            <text class="detail-label">电费合计</text>
            <text class="detail-value">99元</text>
          </view>
        </view>

        <!-- Action Button -->
        <view class="action-section">
          <button class="end-charging-btn" @click="endCharging">
            <uni-icons
              type="close-filled"
              size="20"
              color="#ffffff"
            ></uni-icons>
            <text class="btn-text">结束充电</text>
          </button>
        </view>
      </view>

      <!-- 消费记录 Tab -->
      <view v-if="activeTab === 'consumption'" class="consumption-content">
        <view class="consumption-list">
          <view
            v-for="record in consumptionRecords"
            :key="record.id"
            class="consumption-item"
            @click="goToDetail(record.id)"
          >
            <view class="record-header">
              <text class="record-date">{{ record.date }}</text>
              <text class="record-amount">¥{{ record.amount }}</text>
            </view>
            <view class="record-details">
              <text class="record-station">{{ record.station }}</text>
              <text class="record-info">{{ record.info }}</text>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
  import { ref } from 'vue'

  const activeTab = ref('charging')

  // Mock consumption records
  const consumptionRecords = ref([
    {
      id: 1,
      date: '2023-10-25',
      amount: '99.00',
      station: '美华智充水口充电站',
      info: '1号桩-右枪 80分钟'
    },
    {
      id: 2,
      date: '2023-10-24',
      amount: '68.40',
      station: '南方电网充电站',
      info: '2号桩-左枪 65分钟'
    },
    {
      id: 3,
      date: '2023-10-23',
      amount: '45.50',
      station: '特来电充电站',
      info: '3号桩-右枪 45分钟'
    },
    {
      id: 4,
      date: '2023-10-22',
      amount: '87.20',
      station: '星星充电站',
      info: '1号桩-左枪 95分钟'
    }
  ])

  const goBack = () => {
    uni.navigateBack()
  }

  const switchTab = (tab: string) => {
    activeTab.value = tab
  }

  const goToDetail = (id: number) => {
    uni.navigateTo({
      url: '/pages/consumption/detail?id=' + id
    })
  }

  const endCharging = () => {
    uni.navigateTo({
      url: '/pages/payment/success'
    })
  }
</script>

<style lang="scss" scoped>
  .orders-container {
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

  .tabs {
    display: flex;
    background: #ffffff;
    border-bottom: 1px solid #e1e8ed;

    .tab-item {
      flex: 1;
      text-align: center;
      padding: 32rpx 0;
      font-size: 28rpx;
      color: #7f8c8d;
      border-bottom: 4rpx solid transparent;
      transition: all 0.3s ease;

      &.active {
        color: #3498db;
        border-bottom-color: #3498db;
      }

      &:active {
        background: #f8f9fa;
      }
    }
  }

  .tab-content {
    background: #f5f7fa;
    min-height: calc(100vh - 200rpx);
  }

  .charging-content {
    padding: 32rpx;
  }

  .charging-info {
    background: #ffffff;
    border-radius: 16rpx;
    padding: 32rpx;
    margin-bottom: 32rpx;
    box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.08);

    .info-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16rpx;

      .info-label {
        font-size: 28rpx;
        color: #7f8c8d;
      }

      .info-value {
        font-size: 32rpx;
        font-weight: 600;
        color: #2c3e50;
      }
    }
  }

  .charging-progress {
    background: #ffffff;
    border-radius: 16rpx;
    padding: 40rpx;
    margin-bottom: 32rpx;
    box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.08);
    display: flex;
    align-items: center;
    justify-content: center;

    .progress-circle {
      width: 240rpx;
      height: 240rpx;
      border-radius: 120rpx;
      background: conic-gradient(
        from 0deg,
        #ecf0f1 0%,
        #3498db 66%,
        #ecf0f1 66%,
        #ecf0f1 100%
      );
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 8rpx 24rpx rgba(52, 152, 219, 0.15);

      &::before {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 200rpx;
        height: 200rpx;
        background: #ffffff;
        border-radius: 100rpx;
      }

      .progress-info {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        z-index: 2;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        color: #2c3e50;

        .progress-percentage {
          font-size: 56rpx;
          font-weight: 700;
          display: block;
          margin-bottom: 8rpx;
          text-shadow: 0 2rpx 4rpx rgba(0, 0, 0, 0.1);
        }

        .progress-label {
          font-size: 24rpx;
          color: #7f8c8d;
          font-weight: 500;
        }
      }
    }
  }

  .realtime-data {
    background: #ffffff;
    border-radius: 16rpx;
    padding: 32rpx;
    margin-bottom: 32rpx;
    box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.08);

    .data-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 24rpx 0;
      border-bottom: 1px solid #f1f3f4;

      &:last-child {
        border-bottom: none;
      }

      .data-label {
        font-size: 26rpx;
        color: #7f8c8d;
      }

      .data-value {
        font-size: 32rpx;
        font-weight: 600;
        color: #2c3e50;
      }
    }
  }

  .charging-details {
    background: #ffffff;
    border-radius: 16rpx;
    padding: 32rpx;
    margin-bottom: 32rpx;
    box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.08);

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
        font-size: 32rpx;
        font-weight: 600;
        color: #2c3e50;
      }
    }
  }

  .action-section {
    padding: 32rpx;
  }

  .end-charging-btn {
    width: 100%;
    height: 88rpx;
    background: #3498db;
    color: #ffffff;
    font-size: 32rpx;
    font-weight: 600;
    border-radius: 16rpx;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16rpx;
    box-shadow: 0 4rpx 12rpx rgba(52, 152, 219, 0.4);

    &:active {
      background: #2980b9;
      transform: translateY(2rpx);
    }

    .btn-text {
      font-size: 32rpx;
      font-weight: 600;
      color: #ffffff;
    }
  }

  .consumption-content {
    padding: 32rpx;
  }

  .consumption-list {
    background: #ffffff;
    border-radius: 16rpx;
    padding: 20rpx;
    box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.08);
  }

  .consumption-item {
    background: #ffffff;
    border-radius: 12rpx;
    padding: 24rpx;
    margin-bottom: 16rpx;
    border: 1px solid #f1f3f4;

    .record-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16rpx;

      .record-date {
        font-size: 26rpx;
        color: #7f8c8d;
      }

      .record-amount {
        font-size: 32rpx;
        font-weight: 600;
        color: #e74c3c;
      }
    }

    .record-details {
      .record-station {
        font-size: 28rpx;
        color: #2c3e50;
        margin-bottom: 8rpx;
        display: block;
      }

      .record-info {
        font-size: 26rpx;
        color: #7f8c8d;
        display: block;
      }
    }
  }
</style>
