<template>
  <view class="contact-container">
    <!-- Header -->
    <view class="header">
      <view class="header-left" @click="goBack">
        <view class="back-button">
          <uni-icons type="left" size="20" color="#2c3e50"></uni-icons>
        </view>
      </view>
      <text class="header-title">联系客服</text>
      <view class="header-right"></view>
    </view>

    <!-- Content -->
    <view class="content">
      <!-- Contact List -->
      <view class="contact-list">
        <!-- Phone Contact -->
        <view class="contact-item" @click="callPhone">
          <view class="contact-icon">
            <uni-icons
              type="phone-filled"
              size="24"
              color="#3498db"
            ></uni-icons>
          </view>
          <view class="contact-info">
            <text class="contact-title">客服电话</text>
            <text class="contact-value">400-888-8888</text>
          </view>
          <view class="contact-action">
            <uni-icons type="right" size="16" color="#c0c4cc"></uni-icons>
          </view>
        </view>

        <!-- QQ Contact -->
        <view class="contact-item" @click="copyQQ">
          <view class="contact-icon">
            <uni-icons type="chat-filled" size="24" color="#3498db"></uni-icons>
          </view>
          <view class="contact-info">
            <text class="contact-title">客服QQ</text>
            <text class="contact-value">123456789</text>
          </view>
          <view class="contact-action">
            <uni-icons type="right" size="16" color="#c0c4cc"></uni-icons>
          </view>
        </view>

        <!-- WeChat Contact -->
        <view class="contact-item" @click="copyWeChat">
          <view class="contact-icon">
            <uni-icons type="weixin" size="24" color="#3498db"></uni-icons>
          </view>
          <view class="contact-info">
            <text class="contact-title">客服微信</text>
            <text class="contact-value">charging_service</text>
          </view>
          <view class="contact-action">
            <uni-icons type="right" size="16" color="#c0c4cc"></uni-icons>
          </view>
        </view>
      </view>

      <!-- Service Hours -->
      <view class="service-hours">
        <text class="hours-title">服务时间</text>
        <text class="hours-text">周一至周日 9:00-21:00</text>
        <text class="hours-note">节假日正常服务</text>
      </view>

      <!-- Notice -->
      <view class="notice-section">
        <text class="notice-title">温馨提示</text>
        <text class="notice-text"
          >如遇客服繁忙，请稍后再试或留言，我们会尽快回复您。</text
        >
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
  const goBack = () => {
    uni.navigateBack()
  }

  const callPhone = () => {
    uni.makePhoneCall({
      phoneNumber: '400-888-8888',
      fail: () => {
        uni.showToast({
          title: '拨号失败',
          icon: 'none'
        })
      }
    })
  }

  const copyQQ = () => {
    uni.setClipboardData({
      data: '123456789',
      success: () => {
        uni.showToast({
          title: 'QQ号已复制',
          icon: 'success'
        })
      }
    })
  }

  const copyWeChat = () => {
    uni.setClipboardData({
      data: 'charging_service',
      success: () => {
        uni.showToast({
          title: '微信号已复制',
          icon: 'success'
        })
      }
    })
  }
</script>

<style lang="scss" scoped>
  .contact-container {
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

  .content {
    padding: 20rpx;
  }

  .contact-list {
    background: #ffffff;
    border-radius: 16rpx;
    overflow: hidden;
    margin-bottom: 20rpx;

    .contact-item {
      display: flex;
      align-items: center;
      padding: 32rpx;
      border-bottom: 1px solid #f0f0f0;
      transition: all 0.3s ease;

      &:last-child {
        border-bottom: none;
      }

      &:active {
        background: #f8f9fa;
      }

      .contact-icon {
        width: 80rpx;
        height: 80rpx;
        background: #ecf5ff;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 24rpx;
      }

      .contact-info {
        flex: 1;

        .contact-title {
          font-size: 32rpx;
          font-weight: 500;
          color: #2c3e50;
          margin-bottom: 8rpx;
          display: block;
        }

        .contact-value {
          font-size: 28rpx;
          color: #3498db;
          font-weight: 500;
        }
      }

      .contact-action {
        width: 32rpx;
        height: 32rpx;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }

  .service-hours {
    background: #ffffff;
    border-radius: 16rpx;
    padding: 32rpx;
    margin-bottom: 20rpx;
    text-align: center;

    .hours-title {
      font-size: 32rpx;
      font-weight: 600;
      color: #2c3e50;
      margin-bottom: 16rpx;
      display: block;
    }

    .hours-text {
      font-size: 28rpx;
      color: #7f8c8d;
      margin-bottom: 8rpx;
      display: block;
    }

    .hours-note {
      font-size: 24rpx;
      color: #95a5a6;
    }
  }

  .notice-section {
    background: #fff9e6;
    border-radius: 16rpx;
    padding: 32rpx;
    border-left: 6rpx solid #f39c12;

    .notice-title {
      font-size: 28rpx;
      font-weight: 600;
      color: #e67e22;
      margin-bottom: 12rpx;
      display: block;
    }

    .notice-text {
      font-size: 26rpx;
      color: #d68910;
      line-height: 1.6;
    }
  }
</style>
