<template>
  <view class="home-container">
    <!-- Search Bar -->
    <view class="search-section">
      <view class="search-bar">
        <uni-icons type="search" size="18" color="#95a5a6"></uni-icons>
        <input 
          class="search-input" 
          placeholder="搜索充电站" 
          v-model="searchKeyword"
          @input="handleSearch"
        />
      </view>
    </view>

    <!-- Quick Filters -->
    <view class="filter-section">
      <scroll-view scroll-x class="filter-scroll">
        <view class="filter-item" 
              :class="{ active: activeFilter === 'all' }"
              @click="setFilter('all')">
          <text>全部</text>
        </view>
        <view class="filter-item"
              :class="{ active: activeFilter === 'available' }"
              @click="setFilter('available')">
          <text>空闲</text>
        </view>
        <view class="filter-item"
              :class="{ active: activeFilter === 'fast' }"
              @click="setFilter('fast')">
          <text>快充</text>
        </view>
        <view class="filter-item"
              :class="{ active: activeFilter === '24h' }"
              @click="setFilter('24h')">
          <text>24小时</text>
        </view>
      </scroll-view>
    </view>

    <!-- Station List -->
    <scroll-view scroll-y class="station-list">
      <view 
        v-for="station in filteredStations" 
        :key="station.id"
        class="station-card"
        @click="goToDetail(station.id)"
      >
        <image class="station-image" :src="station.image" mode="aspectFill" />
        
        <view class="station-info">
          <view class="station-header">
            <text class="station-name">{{ station.name }}</text>
            <text class="station-distance">{{ station.distance }}km</text>
          </view>
          
          <text class="station-address">{{ station.address }}</text>
          
          <view class="station-status">
            <view class="status-item">
              <text class="status-label">空闲桩</text>
              <text class="status-value available">{{ station.availablePiles }}</text>
            </view>
            <view class="status-item">
              <text class="status-label">总桩数</text>
              <text class="status-value">{{ station.totalPiles }}</text>
            </view>
            <view class="status-item">
              <text class="status-label">价格</text>
              <text class="status-value price">{{ station.price }}</text>
            </view>
          </view>
          
          <view class="station-tags">
            <text v-if="station.is24h" class="tag">24小时</text>
            <text v-if="station.hasFast" class="tag">快充</text>
            <text v-if="station.isOpen" class="tag">对外开放</text>
            <text v-if="station.availablePiles > 0" class="tag available">有空闲</text>
          </view>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const searchKeyword = ref('')
const activeFilter = ref('all')

// Mock data for charging stations
const stations = ref([
  {
    id: 1,
    name: '美华智充水口充电站',
    address: '东莞市大良镇水口村银朗南路402号',
    distance: 5.9,
    image: 'https://picsum.photos/seed/charging-station-1/400/200.jpg',
    availablePiles: 8,
    totalPiles: 14,
    price: '1.05-1.45元/度',
    is24h: true,
    hasFast: true,
    isOpen: true
  },
  {
    id: 2,
    name: '南方电网充电站',
    address: '东莞市南城区宏图路88号',
    distance: 3.2,
    image: 'https://picsum.photos/seed/charging-station-2/400/200.jpg',
    availablePiles: 3,
    totalPiles: 10,
    price: '0.95-1.35元/度',
    is24h: true,
    hasFast: true,
    isOpen: true
  },
  {
    id: 3,
    name: '特来电充电站',
    address: '东莞市东城区东城中路1号',
    distance: 8.7,
    image: 'https://picsum.photos/seed/charging-station-3/400/200.jpg',
    availablePiles: 0,
    totalPiles: 8,
    price: '1.15-1.55元/度',
    is24h: false,
    hasFast: true,
    isOpen: true
  },
  {
    id: 4,
    name: '星星充电站',
    address: '东莞市万江区万江大道168号',
    distance: 12.3,
    image: 'https://picsum.photos/seed/charging-station-4/400/200.jpg',
    availablePiles: 5,
    totalPiles: 6,
    price: '0.85-1.25元/度',
    is24h: true,
    hasFast: false,
    isOpen: false
  }
])

const filteredStations = computed(() => {
  let result = stations.value

  // Apply search filter
  if (searchKeyword.value) {
    result = result.filter(station => 
      station.name.includes(searchKeyword.value) ||
      station.address.includes(searchKeyword.value)
    )
  }

  // Apply category filter
  switch (activeFilter.value) {
    case 'available':
      result = result.filter(station => station.availablePiles > 0)
      break
    case 'fast':
      result = result.filter(station => station.hasFast)
      break
    case '24h':
      result = result.filter(station => station.is24h)
      break
  }

  return result
})

const handleSearch = () => {
  // Search logic is handled by computed property
}

const setFilter = (filter: string) => {
  activeFilter.value = filter
}

const goToDetail = (stationId: number) => {
  uni.navigateTo({
    url: `/pages/detail/detail?id=${stationId}`
  })
}
</script>

<style lang="scss" scoped>
.home-container {
  background: #f5f7fa;
  min-height: 100vh;
}

.search-section {
  background: #ffffff;
  padding: 20rpx 32rpx;
  border-bottom: 1px solid #e1e8ed;
  
  .search-bar {
    display: flex;
    align-items: center;
    background: #f8f9fa;
    border-radius: 50rpx;
    padding: 0 32rpx;
    height: 72rpx;
    
    .search-icon {
      font-size: 32rpx;
      color: #95a5a6;
      margin-right: 16rpx;
    }
    
    .search-input {
      flex: 1;
      font-size: 28rpx;
      height: 48rpx;
      line-height: 48rpx;
    }
  }
}

.filter-section {
  background: #ffffff;
  border-bottom: 1px solid #e1e8ed;
  
  .filter-scroll {
    white-space: nowrap;
    padding: 20rpx 32rpx;
    
    .filter-item {
      display: inline-block;
      padding: 16rpx 32rpx;
      margin-right: 20rpx;
      background: #f8f9fa;
      border-radius: 50rpx;
      font-size: 26rpx;
      color: #7f8c8d;
      
      &.active {
        background: #3498db;
        color: #ffffff;
      }
    }
  }
}

.station-list {
  height: calc(100vh - 200rpx);
  padding: 20rpx;
  box-sizing: border-box;
  width: 100%;
  overflow-x: hidden;
}

.station-card {
  background: #ffffff;
  border-radius: 16rpx;
  margin-bottom: 20rpx;
  overflow: hidden;
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.08);
  
  .station-image {
    width: 100%;
    height: 200rpx;
    display: block;
  }
  
  .station-info {
    padding: 24rpx;
    
    .station-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 12rpx;
      
      .station-name {
        font-size: 32rpx;
        font-weight: 600;
        color: #2c3e50;
        flex: 1;
      }
      
      .station-distance {
        font-size: 26rpx;
        color: #7f8c8d;
      }
    }
    
    .station-address {
      font-size: 26rpx;
      color: #7f8c8d;
      margin-bottom: 20rpx;
      display: block;
    }
    
    .station-status {
      display: flex;
      justify-content: space-between;
      margin-bottom: 20rpx;
      
      .status-item {
        text-align: center;
        flex: 1;
        
        .status-label {
          font-size: 24rpx;
          color: #95a5a6;
          display: block;
          margin-bottom: 8rpx;
        }
        
        .status-value {
          font-size: 28rpx;
          font-weight: 600;
          color: #2c3e50;
          
          &.available {
            color: #27ae60;
          }
          
          &.price {
            color: #e74c3c;
            font-size: 24rpx;
          }
        }
      }
    }
    
    .station-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 12rpx;
      
      .tag {
        font-size: 22rpx;
        padding: 6rpx 12rpx;
        background: #ecf0f1;
        color: #7f8c8d;
        border-radius: 16rpx;
        
        &.available {
          background: #d5f4e6;
          color: #27ae60;
        }
      }
    }
  }
}
</style>
