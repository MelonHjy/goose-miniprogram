<template>
  <app-background>
    <template #background>
      <image class="background-image" src="@/assets/index/images/background.png" mode="scaleToFill" style="height:{{scoreList.length * 160}}rpx" />
    </template>
    <view class="page">
      <view v-for="item in scoreList" :key="item.userId">
        <image :src="item.logo" class="grid-icon" />
        <text>{{ item.scoreDetail }}</text>
        <text>{{ item.award }}</text>
      </view>

      <view class="wrap">
        <button class="button" type="primary" @click="beginNextGame()">
          开始下一局游戏
        </button>
        <button class="button" type="primary" @click="endBack()">
          结束
        </button>
      </view>
    </view>
  </app-background>
</template>

<script setup lang="ts">

const scoreList = [
  { userId: '1', logo: 'https://jfkhjoidjf.ltd/api/static/file/cat/afro.png', role: 'evil', seat: 1, scoreDetail: '3+3+3+3+3=15分', award: 'oscar' },
  { userId: '2', logo: 'https://jfkhjoidjf.ltd/api/static/file/cat/afro.png', role: 'normal', seat: 2, scoreDetail: '3+3+3+0+0=9分', award: '' },
  { userId: '3', logo: 'https://jfkhjoidjf.ltd/api/static/file/cat/afro.png', role: 'angle', seat: 3, scoreDetail: '3+3+3+0+0=9分', award: '' },
  { userId: '4', logo: 'https://jfkhjoidjf.ltd/api/static/file/cat/afro.png', role: 'death', seat: 4, scoreDetail: '3+3+3+0+0=9分', award: '' },
  { userId: '5', logo: 'https://jfkhjoidjf.ltd/api/static/file/cat/afro.png', role: 'king', seat: 5, scoreDetail: '3+3+3+0+0=9分', award: '' },
  { userId: '5', logo: 'https://jfkhjoidjf.ltd/api/static/file/cat/afro.png', role: 'king', seat: 5, scoreDetail: '3+3+3+0+0=9分', award: '' },
  { userId: '5', logo: 'https://jfkhjoidjf.ltd/api/static/file/cat/afro.png', role: 'king', seat: 5, scoreDetail: '3+3+3+0+0=9分', award: '' },
  { userId: '5', logo: 'https://jfkhjoidjf.ltd/api/static/file/cat/afro.png', role: 'king', seat: 5, scoreDetail: '3+3+3+0+0=9分', award: '' },
  { userId: '5', logo: 'https://jfkhjoidjf.ltd/api/static/file/cat/afro.png', role: 'king', seat: 5, scoreDetail: '3+3+3+0+0=9分', award: 'banana' }
]

// 开始下一把游戏
const beginNextGame = () => {
  uni.navigateTo({
    url: '/pages/room/room',
    fail (err) {
      console.log(err)
    }
  })
}
// 结束  返回主页
const endBack = () => {
  uni.reLaunch({
    url: '/pages/index',
    fail (err) {
      console.log(err)
    }
  })
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

.grid-icon {
  width: 160rpx;
  height: 160rpx;
  margin: 15rpx;
  object-fit: cover;
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
