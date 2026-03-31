<template>
  <view class="add-vehicle-container">
    <!-- Header -->
    <view class="header">
      <view class="header-left" @click="goBack">
        <view class="back-button">
          <uni-icons type="left" size="20" color="#2c3e50"></uni-icons>
        </view>
      </view>
      <text class="header-title">添加车辆</text>
      <view class="header-right"></view>
    </view>

    <!-- Content -->
    <view class="content">
      <!-- License Plate Input -->
      <view class="license-plate-section">
        <text class="section-title">请输入车牌号</text>
        <view class="plate-input-container">
          <view class="plate-inputs">
            <view
              v-for="(char, index) in plateChars"
              :key="index"
              class="plate-input-box"
              :class="{
                filled: char !== '',
                'new-energy': index === 7 && isNewEnergy
              }"
              @click="focusInput(index)"
            >
              <text v-if="char !== ''">{{ char }}</text>
              <text v-else class="placeholder">{{
                index === 0 ? '省' : ''
              }}</text>
            </view>
          </view>
          <view class="new-energy-btn" @click="toggleNewEnergy">
            <text class="new-energy-text">+ 新能源</text>
          </view>
        </view>
      </view>

      <!-- Save Button -->
      <view class="save-section">
        <button class="save-btn" @click="saveVehicle" :disabled="!isFormValid">
          保存
        </button>
      </view>

      <!-- Notice -->
      <view class="notice-section">
        <text class="notice-text"
          >请绑定真实有效的车牌号,否则将无法正常使用车牌进行付费。</text
        >
      </view>
    </view>

    <!-- Keyboard -->
    <view v-if="showKeyboard" class="keyboard-overlay" @click="hideKeyboard">
      <view class="keyboard" @click.stop>
        <!-- Province Keyboard -->
        <view v-if="inputIndex === 0" class="keyboard-grid">
          <view
            v-for="province in provinces"
            :key="province"
            class="key-btn"
            @click="selectChar(province)"
          >
            {{ province }}
          </view>
          <view class="key-btn delete" @click="deleteChar">
            <uni-icons type="clear" size="20" color="#666"></uni-icons>
          </view>
        </view>

        <!-- Letter/Number Keyboard -->
        <view v-else class="keyboard-grid">
          <view
            v-for="key in keyboardKeys"
            :key="key"
            class="key-btn"
            @click="selectChar(key)"
          >
            {{ key }}
          </view>
          <view class="key-btn delete" @click="deleteChar">
            <uni-icons type="clear" size="20" color="#666"></uni-icons>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
  import { ref, computed } from 'vue'

  const plateChars = ref(['', '', '', '', '', '', '', ''])
  const isNewEnergy = ref(false)
  const inputIndex = ref(-1)
  const showKeyboard = ref(false)

  const provinces = [
    '京',
    '津',
    '冀',
    '晋',
    '蒙',
    '辽',
    '吉',
    '黑',
    '沪',
    '苏',
    '浙',
    '皖',
    '闽',
    '赣',
    '鲁',
    '豫',
    '鄂',
    '湘',
    '粤',
    '桂',
    '琼',
    '渝',
    '川',
    '贵',
    '云',
    '藏',
    '陕',
    '甘',
    '青',
    '宁',
    '新'
  ]

  const keyboardKeys = [
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '0',
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'J',
    'K',
    'L',
    'M',
    'N',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z'
  ]

  const isFormValid = computed(() => {
    const requiredLength = isNewEnergy.value ? 8 : 7
    return plateChars.value.slice(0, requiredLength).every(char => char !== '')
  })

  const goBack = () => {
    uni.navigateBack()
  }

  const focusInput = (index: number) => {
    if (index === 7 && !isNewEnergy.value) return
    inputIndex.value = index
    showKeyboard.value = true
  }

  const hideKeyboard = () => {
    showKeyboard.value = false
    inputIndex.value = -1
  }

  const selectChar = (char: string) => {
    if (inputIndex.value >= 0 && inputIndex.value < 8) {
      plateChars.value[inputIndex.value] = char

      // Auto move to next input
      if (inputIndex.value < 7 && (inputIndex.value < 6 || isNewEnergy.value)) {
        inputIndex.value++
      } else {
        hideKeyboard()
      }
    }
  }

  const deleteChar = () => {
    if (inputIndex.value >= 0) {
      plateChars.value[inputIndex.value] = ''
      if (inputIndex.value > 0) {
        inputIndex.value--
      }
    }
  }

  const toggleNewEnergy = () => {
    isNewEnergy.value = !isNewEnergy.value
    if (!isNewEnergy.value) {
      plateChars.value[7] = ''
    }
  }

  const saveVehicle = () => {
    if (!isFormValid.value) {
      uni.showToast({
        title: '请完整填写车牌号',
        icon: 'none'
      })
      return
    }

    const licensePlate = plateChars.value.join('')

    // In real app, save to API
    uni.showToast({
      title: '保存成功',
      icon: 'success'
    })

    setTimeout(() => {
      uni.navigateBack()
    }, 1500)
  }
</script>

<style lang="scss" scoped>
  .add-vehicle-container {
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
    padding: 60rpx 32rpx;
  }

  .license-plate-section {
    .section-title {
      font-size: 32rpx;
      font-weight: 500;
      color: #2c3e50;
      margin-bottom: 32rpx;
      display: block;
    }

    .plate-input-container {
      display: flex;
      align-items: center;
      gap: 16rpx;
      flex-wrap: wrap;

      .plate-inputs {
        display: flex;
        gap: 8rpx;
        flex: 1;

        .plate-input-box {
          flex: 1;
          height: 88rpx;
          border: 2rpx solid #dcdfe6;
          border-radius: 8rpx;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 28rpx;
          font-weight: 600;
          color: #2c3e50;
          background: #ffffff;
          transition: all 0.3s ease;
          flex-shrink: 0;

          &.filled {
            border-color: #409eff;
            background: #ecf5ff;
          }

          &.new-energy {
            border-color: #67c23a;
            background: #f0f9ff;
          }

          .placeholder {
            color: #c0c4cc;
            font-size: 20rpx;
            font-weight: normal;
          }

          &:active {
            transform: scale(0.95);
          }
        }
      }

      .new-energy-btn {
        padding: 12rpx 20rpx;
        border: 2rpx solid #67c23a;
        border-radius: 8rpx;
        background: #f0f9ff;
        flex-shrink: 0;

        .new-energy-text {
          font-size: 22rpx;
          color: #67c23a;
          font-weight: 500;
          white-space: nowrap;
        }

        &:active {
          background: #e1f3d8;
        }
      }
    }
  }

  .save-section {
    margin-top: 80rpx;

    .save-btn {
      width: 100%;
      height: 88rpx;
      background: #409eff;
      color: #ffffff;
      border: none;
      border-radius: 44rpx;
      font-size: 32rpx;
      font-weight: 500;
      transition: all 0.3s ease;

      &:disabled {
        background: #c0c4cc;
        opacity: 0.6;
      }

      &:not(:disabled):active {
        transform: scale(0.98);
        background: #337ecc;
      }
    }
  }

  .notice-section {
    margin-top: 40rpx;
    padding: 0 20rpx;

    .notice-text {
      font-size: 24rpx;
      color: #909399;
      text-align: center;
      line-height: 1.6;
    }
  }

  .keyboard-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: flex-end;
    z-index: 1000;

    .keyboard {
      background: #ffffff;
      border-radius: 20rpx 20rpx 0 0;
      padding: 32rpx;
      width: 100%;
      max-height: 60vh;
      overflow-y: auto;

      .keyboard-grid {
        display: grid;
        grid-template-columns: repeat(6, 1fr);
        gap: 16rpx;

        .key-btn {
          height: 80rpx;
          border: 2rpx solid #dcdfe6;
          border-radius: 12rpx;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 32rpx;
          font-weight: 500;
          color: #2c3e50;
          background: #ffffff;
          transition: all 0.2s ease;

          &:active {
            background: #409eff;
            color: #ffffff;
            border-color: #409eff;
            transform: scale(0.95);
          }

          &.delete {
            background: #f5f7fa;

            &:active {
              background: #e74c3c;
              border-color: #e74c3c;
            }
          }
        }
      }
    }
  }
</style>
