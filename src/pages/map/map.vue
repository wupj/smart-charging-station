<template>
  <view class="map-container">
    <!-- Map Header -->
    <view class="map-header">
      <view class="search-box">
        <uni-icons type="search" size="18" color="#95a5a6"></uni-icons>
        <input
          class="search-input"
          placeholder="搜索充电站"
          v-model="searchKeyword"
          @input="handleSearch"
        />
      </view>
      <view class="filter-btn" @click="showFilter">
        <uni-icons type="tune-filled" size="20" color="#3498db"></uni-icons>
      </view>
    </view>

    <!-- Map Container -->
    <view class="map-content">
      <map
        id="chargingMap"
        class="map"
        :latitude="latitude"
        :longitude="longitude"
        :scale="scale"
        :markers="markers"
        :show-location="true"
        @markertap="onMarkerTap"
        @regionchange="onRegionChange"
      >
        <!-- Current Location Marker -->
        <cover-view class="current-location">
          <cover-view class="location-dot"></cover-view>
        </cover-view>
      </map>
    </view>

    <!-- Station List -->
    <view class="station-list" v-if="showStationList">
      <view class="list-header">
        <text class="list-title">附近充电站</text>
        <text class="list-count">{{ filteredStations.length }}个</text>
      </view>
      <scroll-view scroll-y class="station-scroll">
        <view
          class="station-item"
          v-for="station in filteredStations"
          :key="station.id"
          @click="selectStation(station)"
        >
          <view class="station-info">
            <view class="station-name">{{ station.name }}</view>
            <view class="station-address">{{ station.address }}</view>
            <view class="station-details">
              <text class="distance">{{ station.distance }}km</text>
              <text class="available"
                >{{ station.availablePiles }}/{{ station.totalPiles }}可用</text
              >
            </view>
          </view>
          <view class="station-price">{{ station.price }}</view>
        </view>
      </scroll-view>
    </view>

    <!-- Filter Panel -->
    <view class="filter-panel" v-if="showFilterPanel">
      <view class="filter-header">
        <text class="filter-title">筛选</text>
        <uni-icons
          type="close"
          size="20"
          color="#7f8c8d"
          @click="hideFilter"
        ></uni-icons>
      </view>
      <view class="filter-options">
        <view class="filter-group">
          <text class="group-title">充电类型</text>
          <view class="option-list">
            <view
              class="option-item"
              :class="{ active: selectedFilters.includes('fast') }"
              @click="toggleFilter('fast')"
            >
              <text>快充</text>
            </view>
            <view
              class="option-item"
              :class="{ active: selectedFilters.includes('slow') }"
              @click="toggleFilter('slow')"
            >
              <text>慢充</text>
            </view>
          </view>
        </view>
        <view class="filter-group">
          <text class="group-title">营业状态</text>
          <view class="option-list">
            <view
              class="option-item"
              :class="{ active: selectedFilters.includes('24h') }"
              @click="toggleFilter('24h')"
            >
              <text>24小时</text>
            </view>
            <view
              class="option-item"
              :class="{ active: selectedFilters.includes('available') }"
              @click="toggleFilter('available')"
            >
              <text>有空位</text>
            </view>
          </view>
        </view>
      </view>
      <view class="filter-actions">
        <button class="reset-btn" @click="resetFilters">重置</button>
        <button class="confirm-btn" @click="applyFilters">确定</button>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
  import { ref, computed, onMounted } from 'vue'

  const latitude = ref(22.547)
  const longitude = ref(114.085)
  const scale = ref(14)
  const searchKeyword = ref('')
  const showStationList = ref(true)
  const showFilterPanel = ref(false)
  const selectedFilters = ref<string[]>([])

  const stations = ref([
    {
      id: 1,
      name: '深圳充电站',
      address: '深圳市福田区深南大道1000号',
      latitude: 22.547,
      longitude: 114.085,
      distance: 0.5,
      availablePiles: 8,
      totalPiles: 12,
      price: '1.20元/度',
      hasFast: true,
      hasSlow: true,
      is24h: true,
      isOpen: true
    },
    {
      id: 2,
      name: '南山充电站',
      address: '深圳市南山区科技园南区',
      latitude: 22.537,
      longitude: 113.975,
      distance: 2.3,
      availablePiles: 3,
      totalPiles: 8,
      price: '1.15元/度',
      hasFast: false,
      hasSlow: true,
      is24h: false,
      isOpen: true
    },
    {
      id: 3,
      name: '宝安充电站',
      address: '深圳市宝安区宝安大道200号',
      latitude: 22.557,
      longitude: 113.895,
      distance: 3.8,
      availablePiles: 0,
      totalPiles: 6,
      price: '1.25元/度',
      hasFast: true,
      hasSlow: false,
      is24h: true,
      isOpen: false
    }
  ])

  const markers = computed(() => {
    return stations.value.map(station => ({
      id: station.id,
      latitude: station.latitude,
      longitude: station.longitude,
      iconPath:
        station.availablePiles > 0
          ? '/static/marker-available.png'
          : '/static/marker-unavailable.png',
      width: 30,
      height: 30,
      callout: {
        content: station.name,
        display: 'ALWAYS',
        textAlign: 'center',
        fontSize: 12,
        borderRadius: 4,
        bgColor: '#ffffff',
        padding: 4
      }
    }))
  })

  const filteredStations = computed(() => {
    let result = stations.value

    // Apply search filter
    if (searchKeyword.value) {
      result = result.filter(
        station =>
          station.name.includes(searchKeyword.value) ||
          station.address.includes(searchKeyword.value)
      )
    }

    // Apply selected filters
    if (selectedFilters.value.length > 0) {
      result = result.filter(station => {
        if (selectedFilters.value.includes('fast') && !station.hasFast)
          return false
        if (selectedFilters.value.includes('slow') && !station.hasSlow)
          return false
        if (selectedFilters.value.includes('24h') && !station.is24h)
          return false
        if (
          selectedFilters.value.includes('available') &&
          station.availablePiles === 0
        )
          return false
        return true
      })
    }

    return result.sort((a, b) => a.distance - b.distance)
  })

  const handleSearch = () => {
    // Search logic is handled by computed property
  }

  const showFilter = () => {
    showFilterPanel.value = true
  }

  const hideFilter = () => {
    showFilterPanel.value = false
  }

  const toggleFilter = (filter: string) => {
    const index = selectedFilters.value.indexOf(filter)
    if (index > -1) {
      selectedFilters.value.splice(index, 1)
    } else {
      selectedFilters.value.push(filter)
    }
  }

  const resetFilters = () => {
    selectedFilters.value = []
  }

  const applyFilters = () => {
    showFilterPanel.value = false
  }

  const onMarkerTap = (e: any) => {
    const stationId = e.detail.markerId
    const station = stations.value.find(s => s.id === stationId)
    if (station) {
      selectStation(station)
    }
  }

  const onRegionChange = (e: any) => {
    if (e.type === 'end') {
      // Update stations based on new map region
      latitude.value = e.detail.centerLocation.latitude
      longitude.value = e.detail.centerLocation.longitude
    }
  }

  const selectStation = (station: any) => {
    uni.navigateTo({
      url: `/pages/detail/detail?id=${station.id}`
    })
  }

  onMounted(() => {
    // Get current location
    uni.getLocation({
      type: 'gcj02',
      success: res => {
        latitude.value = res.latitude
        longitude.value = res.longitude
      },
      fail: () => {
        uni.showToast({
          title: '获取位置失败',
          icon: 'error'
        })
      }
    })
  })
</script>

<style lang="scss" scoped>
  .map-container {
    position: relative;
    height: 100vh;
    display: flex;
    flex-direction: column;
  }

  .map-header {
    position: absolute;
    top: 44px;
    left: 20rpx;
    right: 20rpx;
    z-index: 999;
    display: flex;
    align-items: center;
    gap: 20rpx;

    .search-box {
      flex: 1;
      display: flex;
      align-items: center;
      background: #ffffff;
      border-radius: 50rpx;
      padding: 0 32rpx;
      height: 72rpx;
      box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.1);

      .search-input {
        flex: 1;
        font-size: 28rpx;
        color: #2c3e50;
        background: transparent;
        border: none;
        outline: none;
        margin-left: 16rpx;
      }
    }

    .filter-btn {
      width: 72rpx;
      height: 72rpx;
      background: #ffffff;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.1);

      &:active {
        opacity: 0.7;
      }
    }
  }

  .map-content {
    flex: 1;
    position: relative;

    .map {
      width: 100%;
      height: 100%;
    }

    .current-location {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 20rpx;
      height: 20rpx;

      .location-dot {
        width: 100%;
        height: 100%;
        background: #3498db;
        border-radius: 50%;
        border: 4rpx solid #ffffff;
        box-shadow: 0 2rpx 8rpx rgba(52, 152, 219, 0.3);
      }
    }
  }

  .station-list {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background: #ffffff;
    border-radius: 32rpx 32rpx 0 0;
    max-height: 60vh;
    box-shadow: 0 -4rpx 16rpx rgba(0, 0, 0, 0.1);

    .list-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 32rpx;

      .list-title {
        font-size: 32rpx;
        font-weight: 600;
        color: #2c3e50;
      }

      .list-count {
        font-size: 28rpx;
        color: #7f8c8d;
      }
    }

    .station-scroll {
      max-height: calc(60vh - 120rpx);

      .station-item {
        display: flex;
        align-items: center;
        padding: 24rpx 32rpx;
        border-bottom: 1px solid #f1f3f4;

        &:last-child {
          border-bottom: none;
        }

        &:active {
          background: #f8f9fa;
        }

        .station-info {
          flex: 1;

          .station-name {
            font-size: 30rpx;
            font-weight: 600;
            color: #2c3e50;
            margin-bottom: 8rpx;
          }

          .station-address {
            font-size: 26rpx;
            color: #7f8c8d;
            margin-bottom: 8rpx;
          }

          .station-details {
            display: flex;
            gap: 24rpx;

            .distance {
              font-size: 24rpx;
              color: #3498db;
            }

            .available {
              font-size: 24rpx;
              color: #27ae60;
            }
          }
        }

        .station-price {
          font-size: 28rpx;
          font-weight: 600;
          color: #e74c3c;
        }
      }
    }
  }

  .filter-panel {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background: #ffffff;
    border-radius: 32rpx 32rpx 0 0;
    padding: 32rpx;
    box-shadow: 0 -4rpx 16rpx rgba(0, 0, 0, 0.1);

    .filter-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 32rpx;

      .filter-title {
        font-size: 32rpx;
        font-weight: 600;
        color: #2c3e50;
      }
    }

    .filter-options {
      .filter-group {
        margin-bottom: 32rpx;

        .group-title {
          font-size: 28rpx;
          font-weight: 500;
          color: #2c3e50;
          margin-bottom: 16rpx;
        }

        .option-list {
          display: flex;
          gap: 16rpx;

          .option-item {
            padding: 16rpx 32rpx;
            border: 2rpx solid #e1e8ed;
            border-radius: 32rpx;
            font-size: 26rpx;
            color: #7f8c8d;

            &.active {
              background: #3498db;
              border-color: #3498db;
              color: #ffffff;
            }

            &:active {
              opacity: 0.7;
            }
          }
        }
      }
    }

    .filter-actions {
      display: flex;
      gap: 20rpx;

      .reset-btn,
      .confirm-btn {
        flex: 1;
        height: 80rpx;
        border-radius: 40rpx;
        font-size: 30rpx;
        font-weight: 500;
        display: flex;
        align-items: center;
        justify-content: center;

        &::after {
          border: none;
        }
      }

      .reset-btn {
        background: #f8f9fa;
        color: #7f8c8d;
        border: 2rpx solid #e1e8ed;
      }

      .confirm-btn {
        background: #3498db;
        color: #ffffff;
      }
    }
  }
</style>
