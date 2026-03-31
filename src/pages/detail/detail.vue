<template>
  <view class="detail-container">
    <!-- Header -->
    <view class="header">
      <view class="header-left" @click="goBack">
        <view class="back-button">
          <uni-icons type="left" size="20" color="#2c3e50"></uni-icons>
        </view>
      </view>
      <text class="header-title">详情</text>
      <text class="header-distance">59KM</text>
    </view>

    <!-- Station Info -->
    <view class="station-info">
      <text class="station-name">美华智充水口充电站</text>
      <image
        class="station-image"
        src="https://picsum.photos/seed/charging-station/800/400.jpg"
        mode="aspectFill"
      />

      <view class="info-section">
        <view class="info-item">
          <text class="info-label">地址</text>
          <text class="info-value">东莞市大良镇水口村银朗南路402号</text>
        </view>

        <view class="info-item">
          <text class="info-label">费用</text>
          <text class="info-value">直流1.05-1.45元/度</text>
        </view>

        <view class="info-item">
          <text class="info-label">状态</text>
          <text class="info-value status-normal">正常营业</text>
        </view>

        <view class="tags">
          <text class="tag available">有空闲</text>
          <text class="tag">24小时</text>
          <text class="tag">对外开放</text>
          <text class="tag">可充大巴</text>
        </view>
      </view>

      <view class="action-section">
        <view class="pile-count">
          <text class="count-number">14</text>
          <text class="count-label">充电桩</text>
        </view>
        <view class="action-icons">
          <view class="action-icon" @click="makeCall">
            <uni-icons type="phone" size="20" color="#3498db"></uni-icons>
          </view>
          <view class="action-icon" @click="toggleFavorite">
            <uni-icons
              :type="isFavorite ? 'star-filled' : 'star'"
              size="20"
              :color="isFavorite ? '#f39c12' : '#95a5a6'"
            ></uni-icons>
          </view>
          <view class="action-icon" @click="openNavigation">
            <uni-icons type="location" size="20" color="#3498db"></uni-icons>
          </view>
        </view>
      </view>
    </view>

    <!-- Tabs -->
    <view class="tabs">
      <view
        class="tab-item"
        :class="{ active: activeTab === 'piles' }"
        @click="switchTab('piles')"
      >
        <text>充电桩</text>
      </view>
      <view
        class="tab-item"
        :class="{ active: activeTab === 'pricing' }"
        @click="switchTab('pricing')"
      >
        <text>收费标准</text>
      </view>
      <view
        class="tab-item"
        :class="{ active: activeTab === 'photos' }"
        @click="switchTab('photos')"
      >
        <text>实景图</text>
      </view>
    </view>

    <!-- Tab Content -->
    <view class="tab-content">
      <!-- 充电桩 Tab -->
      <view v-if="activeTab === 'piles'" class="piles-grid">
        <view class="pile-row">
          <view class="pile-card">
            <view class="pile-status">
              <text class="status-percentage">99%</text>
              <text class="status-text">待拔枪</text>
            </view>
            <image
              class="pile-image"
              src="https://picsum.photos/seed/charging-pile-1/200/200.jpg"
              mode="aspectFit"
            />
            <text class="pile-name">1号桩-左枪 可达120kW</text>
          </view>

          <view class="pile-card available">
            <view class="pile-status">
              <text class="status-text">空闲</text>
            </view>
            <image
              class="pile-image"
              src="https://picsum.photos/seed/charging-pile-2/200/200.jpg"
              mode="aspectFit"
            />
            <text class="pile-name">1号桩-右枪 可达120kW</text>
          </view>
        </view>

        <view class="pile-row">
          <view class="pile-card in-use">
            <view class="pile-status">
              <text class="status-percentage">46%</text>
              <text class="status-text">使用中</text>
            </view>
            <image
              class="pile-image"
              src="https://picsum.photos/seed/charging-pile-3/200/200.jpg"
              mode="aspectFit"
            />
            <text class="pile-name">2号桩-左枪 可达120kW</text>
          </view>

          <view class="pile-card suspended">
            <view class="pile-status">
              <text class="status-text">暂停服务</text>
            </view>
            <image
              class="pile-image"
              src="https://picsum.photos/seed/charging-pile-4/200/200.jpg"
              mode="aspectFit"
            />
            <text class="pile-name">2号桩-右枪 可达120kW</text>
          </view>
        </view>
      </view>

      <!-- 收费标准 Tab -->
      <view v-if="activeTab === 'pricing'" class="pricing-content">
        <text class="pricing-title">收费标准</text>
        <view class="pricing-item">
          <text class="pricing-type">直流快充</text>
          <text class="pricing-price">1.05-1.45元/度</text>
        </view>
        <view class="pricing-item">
          <text class="pricing-type">交流慢充</text>
          <text class="pricing-price">0.85-1.25元/度</text>
        </view>
      </view>

      <!-- 实景图 Tab -->
      <view v-if="activeTab === 'photos'" class="photos-content">
        <text class="photos-title">实景图</text>
        <image
          class="photo-item"
          src="https://picsum.photos/seed/station-scene-1/400/300.jpg"
          mode="aspectFill"
        />
        <image
          class="photo-item"
          src="https://picsum.photos/seed/station-scene-2/400/300.jpg"
          mode="aspectFill"
        />
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
  import { ref } from 'vue'

  const activeTab = ref('piles')
  const isFavorite = ref(false)

  const goBack = () => {
    uni.navigateBack()
  }

  const switchTab = (tab: string) => {
    activeTab.value = tab
  }

  const makeCall = () => {
    uni.makePhoneCall({
      phoneNumber: '10086'
    })
  }

  const toggleFavorite = () => {
    isFavorite.value = !isFavorite.value
    uni.showToast({
      title: isFavorite.value ? '已收藏' : '取消收藏',
      icon: 'success'
    })
  }

  const openNavigation = () => {
    uni.openLocation({
      latitude: 22.815,
      longitude: 113.257,
      name: '美华智充水口充电站',
      address: '东莞市大良镇水口村银朗南路402号'
    })
  }
</script>

<style lang="scss" scoped>
  .detail-container {
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

        .back-icon {
          font-size: 32rpx;
          color: #2c3e50;
          font-weight: 600;
          line-height: 1;
        }
      }
    }

    .header-title {
      font-size: 32rpx;
      font-weight: 600;
      color: #2c3e50;
    }

    .header-distance {
      font-size: 26rpx;
      color: #7f8c8d;
    }
  }

  .station-info {
    background: #ffffff;
    margin-bottom: 20rpx;

    .station-name {
      font-size: 36rpx;
      font-weight: 600;
      color: #2c3e50;
      padding: 32rpx;
      display: block;
    }

    .station-image {
      width: 100%;
      height: 400rpx;
      display: block;
    }

    .info-section {
      padding: 32rpx;

      .info-item {
        display: flex;
        margin-bottom: 24rpx;

        .info-label {
          font-size: 28rpx;
          color: #7f8c8d;
          width: 120rpx;
        }

        .info-value {
          font-size: 28rpx;
          color: #2c3e50;
          flex: 1;

          &.status-normal {
            color: #27ae60;
          }
        }
      }

      .tags {
        display: flex;
        flex-wrap: wrap;
        gap: 16rpx;
        margin-top: 32rpx;

        .tag {
          font-size: 24rpx;
          padding: 8rpx 16rpx;
          background: #ecf0f1;
          color: #7f8c8d;
          border-radius: 20rpx;

          &.available {
            background: #d5f4e6;
            color: #27ae60;
          }
        }
      }
    }

    .action-section {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 32rpx;
      border-top: 1px solid #e1e8ed;

      .pile-count {
        display: flex;
        flex-direction: column;
        align-items: center;

        .count-number {
          font-size: 48rpx;
          font-weight: 600;
          color: #3498db;
        }

        .count-label {
          font-size: 24rpx;
          color: #7f8c8d;
        }
      }

      .action-icons {
        display: flex;
        gap: 32rpx;

        .action-icon {
          width: 80rpx;
          height: 80rpx;
          background: #f8f9fa;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;

          .icon {
            font-size: 36rpx;
          }
        }
      }
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

      &.active {
        color: #3498db;
        border-bottom-color: #3498db;
      }
    }
  }

  .tab-content {
    background: #ffffff;
    min-height: 400rpx;
  }

  .piles-grid {
    padding: 32rpx;

    .pile-row {
      display: flex;
      gap: 20rpx;
      margin-bottom: 20rpx;

      .pile-card {
        flex: 1;
        background: #ffffff;
        border: 1px solid #e1e8ed;
        border-radius: 16rpx;
        padding: 24rpx;
        text-align: center;

        &.available {
          border-color: #27ae60;
          background: #d5f4e6;
        }

        &.in-use {
          border-color: #f39c12;
          background: #fef5e7;
        }

        &.suspended {
          border-color: #e74c3c;
          background: #fdeaea;
        }

        .pile-status {
          margin-bottom: 16rpx;

          .status-percentage {
            font-size: 32rpx;
            font-weight: 600;
            color: #2c3e50;
            display: block;
          }

          .status-text {
            font-size: 24rpx;
            color: #7f8c8d;
          }
        }

        .pile-image {
          width: 120rpx;
          height: 120rpx;
          margin-bottom: 16rpx;
        }

        .pile-name {
          font-size: 24rpx;
          color: #2c3e50;
        }
      }
    }
  }

  .pricing-content {
    padding: 32rpx;

    .pricing-title {
      font-size: 32rpx;
      font-weight: 600;
      color: #2c3e50;
      margin-bottom: 32rpx;
      display: block;
    }

    .pricing-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 24rpx 0;
      border-bottom: 1px solid #e1e8ed;

      .pricing-type {
        font-size: 28rpx;
        color: #2c3e50;
      }

      .pricing-price {
        font-size: 28rpx;
        color: #e74c3c;
        font-weight: 600;
      }
    }
  }

  .photos-content {
    padding: 32rpx;

    .photos-title {
      font-size: 32rpx;
      font-weight: 600;
      color: #2c3e50;
      margin-bottom: 32rpx;
      display: block;
    }

    .photo-item {
      width: 100%;
      height: 300rpx;
      margin-bottom: 20rpx;
      border-radius: 16rpx;
    }
  }
</style>
