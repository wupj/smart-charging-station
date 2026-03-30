<template>
  <view class="message-container">
    <!-- Header -->
    <view class="header">
      <text class="title">消息</text>
      <view class="badge">8</view>
    </view>

    <!-- Message List -->
    <scroll-view scroll-y class="message-list">
      <view 
        v-for="message in messages" 
        :key="message.id"
        class="message-item"
        @click="goToMessageDetail(message.id)"
      >
        <view class="message-icon">
          <uni-icons type="chatbubble-filled" size="32" color="#3498db"></uni-icons>
        </view>
        <view class="message-content">
          <view class="message-header">
            <text class="message-title">{{ message.title }}</text>
            <view class="message-time-section">
              <text class="message-time">{{ message.time }}</text>
              <uni-icons v-if="message.unread" type="smallcircle-filled" size="12" color="#e74c3c" class="unread-dot"></uni-icons>
            </view>
          </view>
          <text class="message-subtitle">{{ message.subtitle }}</text>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const messages = ref([
  {
    id: 1,
    title: '支付成功',
    subtitle: '1号桩:【支付成功】完成充电支付...',
    time: '20:11',
    unread: true,
    detail: '您的充电订单已成功支付。订单号：20230101123456789。充电桩：1号桩。金额：15.00元。感谢您的使用！'
  },
  {
    id: 2,
    title: '支付成功',
    subtitle: '2号桩:【支付成功】完成充电支付...',
    time: '19:11',
    unread: false,
    detail: '您的充电订单已成功支付。订单号：20230101123456790。充电桩：2号桩。金额：12.50元。感谢您的使用！'
  },
  {
    id: 3,
    title: '设备维护,暂停营业',
    subtitle: '美华智充元科创新园充电站, 2019年...',
    time: '18:11',
    unread: false,
    detail: '尊敬的用户，美华智充元科创新园充电站将于2023年10月26日进行设备维护，届时将暂停营业。维护期间给您带来的不便，敬请谅解。预计恢复时间：2023年10月27日08:00。'
  },
  {
    id: 4,
    title: '充电完成',
    subtitle: '3号桩:【充电完成】本次充电时长...',
    time: '17:30',
    unread: false,
    detail: '您的充电已完成。充电桩：3号桩。充电时长：2小时30分钟。充电电量：45.6kWh。费用：68.40元。请及时移车，方便其他用户使用。'
  },
  {
    id: 5,
    title: '系统通知',
    subtitle: '【优惠活动】新用户首次充电享8折...',
    time: '16:45',
    unread: false,
    detail: '新用户专享福利！首次使用美华智充充电服务，即可享受8折优惠。活动时间：2023年10月1日-10月31日。快来体验吧！'
  }
])

const goToMessageDetail = (messageId: number) => {
  uni.navigateTo({
    url: `/pages/message/detail?id=${messageId}`
  })
}
</script>

<style lang="scss" scoped>
.message-container {
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
  
  .title {
    font-size: 32rpx;
    font-weight: 600;
    color: #2c3e50;
  }
  
  .badge {
    background: #e74c3c;
    color: #ffffff;
    font-size: 22rpx;
    padding: 6rpx 12rpx;
    border-radius: 20rpx;
    min-width: 32rpx;
    text-align: center;
  }
}

.message-list {
  height: calc(100vh - 100rpx);
  padding: 20rpx;
  box-sizing: border-box;
  width: 100%;
}

.message-item {
  display: flex;
  align-items: flex-start;
  background: #ffffff;
  border-radius: 16rpx;
  margin-bottom: 20rpx;
  padding: 24rpx;
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  box-sizing: border-box;
  width: 100%;
  overflow: hidden;
  
  &:active {
    transform: scale(0.98);
    box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.08);
  }
  
  .message-icon {
    margin-right: 24rpx;
    margin-top: 4rpx;
  }
  
  .message-content {
    flex: 1;
    
    .message-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 12rpx;
      
      .message-title {
        font-size: 30rpx;
        font-weight: 600;
        color: #2c3e50;
        flex: 1;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      
      .message-time-section {
        display: flex;
        align-items: center;
        gap: 8rpx;
        
        .message-time {
          font-size: 24rpx;
          color: #95a5a6;
        }
        
        .unread-dot {
          margin-left: 4rpx;
        }
      }
    }
    
    .message-subtitle {
      font-size: 26rpx;
      color: #7f8c8d;
      line-height: 1.4;
    }
  }
}
</style>
