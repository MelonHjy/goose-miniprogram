<template>
  <app-background>
    <template #background>
      <image class="background-image" src="@/assets/index/images/background.png" mode="aspectFill" />
    </template>
    <view class="page">
      <view>
        <view v-for="item in recordList" :key="item.userId">
          <text>{{ item.created_time }}</text>
          <button class="button" type="primary" @click="navigate()">
            查看详情
          </button>
        </view>
      </view>
    </view>
  </app-background>
</template>

<script setup lang="ts">
const recordList = [
  { gameId: '123', roomId: '1', currentRound: 1, totalRound: 5, status: 'finish', created_time: '1687683703897' },
  { gameId: '124', roomId: '1', currentRound: 2, totalRound: 5, status: 'progress', created_time: '1687683740605' }
]

// 点击事件
const navigate = () => {
  uni.navigateTo({
    url: '/pages/score/index',
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
</style>
