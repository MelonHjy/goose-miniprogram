<template>
  <app-background>
    <template #background>
      <image class="background-image" src="@/assets/index/images/background.png" mode="aspectFill" />
    </template>
    <view class="page">
      <view class="title">
        <text>房间号：123456</text>
      </view>
      <!-- 宫格 -->
      <view class="mb-[10px] mt-[24px]">
        <uni-grid :column="4" :show-border="false" :square="false">
          <uni-grid-item v-for="(item, index) in grids" :key="index" :custom-style="{ 'background': 'none' }">
            <view class="grid-item-img" @click="handleGrid(item.userId)">
              <image :src="item.logo" class="grid-icon" :class="{ 'confirm_img': item.confirm }" />
              <p v-if="item.owner" class="owner-icon">
                &ensp;你&ensp;
              </p>
              <view
                v-if="selectedUserId == item.userId"
                class="cuIcon-roundcheck text-green text-shadow check-icon"
                style="font-size: 55rpx;"
              />
              <p v-if="item.confirm" class="confirm-text">
                已确认
              </p>

              <text>{{ item.nickname }}</text>
            </view>
          </uni-grid-item>
        </uni-grid>
      </view>

      <view class="wrap">
        <button class="button" type="primary" @click="confirm()">
          确认
        </button>
      </view>
    </view>
  </app-background>
</template>

<script setup lang="ts">
// 初始宫格内容
const grids = ref([
  { logo: 'https://jfkhjoidjf.ltd/api/static/file/cat/afro.png', nickname: '张三', owner: true, seat: 1, userId: '1', confirm: false },
  { logo: 'https://jfkhjoidjf.ltd/api/static/file/cat/afro.png', nickname: '李四', owner: false, seat: 2, userId: '2', confirm: false },
  { logo: 'https://jfkhjoidjf.ltd/api/static/file/cat/afro.png', nickname: '王五', owner: false, seat: 3, userId: '3', confirm: true },
  { logo: 'https://jfkhjoidjf.ltd/api/static/file/cat/afro.png', nickname: '老六', owner: false, seat: 4, userId: '4', confirm: false },
  { logo: 'https://jfkhjoidjf.ltd/api/static/file/cat/afro.png', nickname: '小七', owner: false, seat: 5, userId: '5', confirm: true }
])

// 被选择的角色
const selectedUserId = ref()

// 九宫格item点击事件
const handleGrid = (userId: string) => {
  // console.log('selected', userId)

  if (!grids.value[0].confirm) {
    selectedUserId.value = userId
  }
}

// 确认
const confirm = () => {
  if (grids.value[0].confirm) {
    uni.navigateTo({
      url: '/pages/score/score',
      success () {
        grids.value[0].confirm = false
      },
      fail (err) {
        console.log(err)
      }
    })
  } else {
    grids.value[0].confirm = true
  }
}
</script>

<style lang="scss" scoped>
.page {
  box-sizing: border-box;
  width: 100%;
  height: 100vh;
  padding: 20px;
}

.background-image {
  width: 100%;
  height: 100%;
}

.w-full {
  width: 100% !important;
}

.title {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 40rpx;
  color: #f1f1f1;
}

.owner-icon {
  position: absolute;
  left: -2rpx;
  bottom: 60rpx;
  background: green;
}

.check-icon {
  position: absolute;
  right: 10rpx;
  top: 10rpx;
  // background: white;
}

.confirm-text {
  position: absolute;
  top: 60rpx;
  font-size: 45rpx;
  color: green;
  font-weight: bold;
  text-shadow: #000 1px 0 0, #000 0 1px 0, #000 -1px 0 0, #000 0 -1px 0;
}

.grid-icon {
  width: 160rpx;
  height: 160rpx;
  margin: 15rpx;
  object-fit: cover;
}

.grid-item-img {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  flex-direction: column;
  color: #f1f1f1;
}

.confirm_img {
  -webkit-filter: grayscale(100%);
  -moz-filter: grayscale(100%);
  -ms-filter: grayscale(100%);
  -o-filter: grayscale(100%);
  filter: grayscale(100%);
  filter: gray;
}

.wrap {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 250rpx;
}

.button {
  margin-bottom: 50rpx;
  width: 300rpx;
  height: 80rpx;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
