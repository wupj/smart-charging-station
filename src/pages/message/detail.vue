<template>
  <view class="message-detail-container">
    <!-- Header -->
    <view class="header">
      <view class="header-left" @click="goBack">
        <view class="back-button">
          <uni-icons type="left" size="20" color="#2c3e50"></uni-icons>
        </view>
      </view>
      <text class="header-title">消息详情</text>
      <view class="header-right"></view>
    </view>

    <!-- Message Content -->
    <scroll-view scroll-y class="message-content">
      <view class="message-card">
        <!-- Message Type Icon -->
        <view class="message-type">
          <uni-icons
            :type="getMessageIcon(message.type)"
            size="48"
            :color="getMessageColor(message.type)"
          ></uni-icons>
        </view>

        <!-- Message Title -->
        <text class="message-title">{{ message.title }}</text>

        <!-- Message Time -->
        <text class="message-time">{{ message.fullTime }}</text>

        <!-- Message Detail -->
        <text class="message-detail">{{ message.detail }}</text>

        <!-- Action Buttons (if applicable) -->
        <view v-if="message.actions" class="action-buttons">
          <button
            v-for="action in message.actions"
            :key="action.id"
            class="action-btn"
            @click="handleAction(action)"
          >
            {{ action.text }}
          </button>
        </view>
      </view>

      <!-- Related Messages -->
      <view v-if="relatedMessages.length > 0" class="related-section">
        <text class="related-title">相关消息</text>
        <view
          v-for="related in relatedMessages"
          :key="related.id"
          class="related-item"
          @click="goToRelatedMessage(related.id)"
        >
          <view class="related-icon">
            <uni-icons
              type="chatbubble-filled"
              size="24"
              color="#95a5a6"
            ></uni-icons>
          </view>
          <view class="related-content">
            <text class="related-title">{{ related.title }}</text>
            <text class="related-time">{{ related.time }}</text>
          </view>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script setup lang="ts">
  import { ref, computed } from 'vue'
  import { onLoad } from '@dcloudio/uni-app'

  const messageId = ref(0)

  // Mock message data
  const messages = ref([
    {
      id: 1,
      type: 'payment',
      title: '支付成功',
      subtitle: '1号桩:【支付成功】完成充电支付...',
      time: '20:11',
      fullTime: '2023年10月25日 20:11',
      unread: true,
      detail:
        '您的充电订单已成功支付。订单号：20230101123456789。充电桩：1号桩。金额：15.00元。感谢您的使用！如有疑问，请联系客服：400-888-8888。',
      actions: [
        { id: 1, text: '查看订单', type: 'view_order' },
        { id: 2, text: '联系客服', type: 'contact_service' }
      ]
    },
    {
      id: 2,
      type: 'payment',
      title: '支付成功',
      subtitle: '2号桩:【支付成功】完成充电支付...',
      time: '19:11',
      fullTime: '2023年10月25日 19:11',
      unread: false,
      detail:
        '您的充电订单已成功支付。订单号：20230101123456790。充电桩：2号桩。金额：12.50元。感谢您的使用！如有疑问，请联系客服：400-888-8888。',
      actions: [{ id: 1, text: '查看订单', type: 'view_order' }]
    },
    {
      id: 3,
      type: 'maintenance',
      title: '设备维护,暂停营业',
      subtitle: '美华智充元科创新园充电站, 2019年...',
      time: '18:11',
      fullTime: '2023年10月25日 18:11',
      unread: false,
      detail:
        '尊敬的用户，美华智充元科创新园充电站将于2023年10月26日进行设备维护，届时将暂停营业。维护期间给您带来的不便，敬请谅解。预计恢复时间：2023年10月27日08:00。如有紧急充电需求，请前往附近的其他充电站。',
      actions: [{ id: 1, text: '查看附近充电站', type: 'nearby_stations' }]
    }
  ])

  const message = computed(() => {
    return (
      messages.value.find(m => m.id === messageId.value) || messages.value[0]
    )
  })

  const relatedMessages = computed(() => {
    return messages.value
      .filter(m => m.id !== messageId.value && m.type === message.value.type)
      .slice(0, 2)
  })

  onLoad((options: any) => {
    if (options.id) {
      messageId.value = parseInt(options.id)
    }
  })

  const goBack = () => {
    uni.navigateBack()
  }

  const getMessageIcon = (type: string) => {
    const iconMap: any = {
      payment: 'checkmarkempty',
      maintenance: 'gear-filled',
      system: 'notification',
      charging: 'loop'
    }
    return iconMap[type] || 'notification'
  }

  const getMessageColor = (type: string) => {
    const colorMap: any = {
      payment: '#27ae60',
      maintenance: '#f39c12',
      system: '#3498db',
      charging: '#9b59b6'
    }
    return colorMap[type] || '#3498db'
  }

  const handleAction = (action: any) => {
    switch (action.type) {
      case 'view_order':
        uni.navigateTo({
          url: '/pages/consumption/detail?id=' + action.id
        })
        break
      case 'contact_service':
        uni.makePhoneCall({
          phoneNumber: '400-888-8888'
        })
        break
      case 'nearby_stations':
        uni.switchTab({
          url: '/pages/home/home'
        })
        break
    }
  }

  const goToRelatedMessage = (id: number) => {
    messageId.value = id
  }
</script>

<style lang="scss" scoped>
  .message-detail-container {
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

  .message-content {
    padding: 32rpx;
    height: calc(100vh - 120rpx);
    box-sizing: border-box;
    width: 100%;
  }

  .message-card {
    background: #ffffff;
    border-radius: 16rpx;
    padding: 40rpx;
    box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.08);
    box-sizing: border-box;
    width: 100%;
    overflow: hidden;

    .message-type {
      text-align: center;
      margin-bottom: 24rpx;
    }

    .message-title {
      font-size: 36rpx;
      font-weight: 600;
      color: #2c3e50;
      text-align: center;
      display: block;
      margin-bottom: 16rpx;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .message-time {
      font-size: 26rpx;
      color: #95a5a6;
      text-align: center;
      display: block;
      margin-bottom: 32rpx;
    }

    .message-detail {
      font-size: 28rpx;
      color: #2c3e50;
      line-height: 1.6;
      margin-bottom: 40rpx;
      word-wrap: break-word;
      overflow-wrap: break-word;
    }

    .action-buttons {
      display: flex;
      gap: 20rpx;
      margin-top: 20rpx;

      .action-btn {
        flex: 1;
        height: 80rpx;
        background: #3498db;
        color: #ffffff;
        font-size: 28rpx;
        border-radius: 12rpx;
        border: none;

        &:active {
          background: #2980b9;
        }
      }
    }
  }

  .related-section {
    margin-top: 32rpx;

    .related-title {
      font-size: 30rpx;
      font-weight: 600;
      color: #2c3e50;
      margin-bottom: 20rpx;
      display: block;
    }

    .related-item {
      display: flex;
      align-items: center;
      background: #ffffff;
      border-radius: 12rpx;
      padding: 24rpx;
      margin-bottom: 16rpx;
      box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.06);
      transition: all 0.3s ease;

      &:active {
        transform: scale(0.98);
        box-shadow: 0 1rpx 4rpx rgba(0, 0, 0, 0.06);
      }

      .related-icon {
        margin-right: 20rpx;
      }

      .related-content {
        flex: 1;

        .related-title {
          font-size: 28rpx;
          color: #2c3e50;
          margin-bottom: 8rpx;
          display: block;
        }

        .related-time {
          font-size: 24rpx;
          color: #95a5a6;
        }
      }
    }
  }
</style>
