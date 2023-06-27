<template>
  <app-background>
    <template #background>
      <image class="background-image" src="@/assets/index/images/background.png" mode="aspectFill" />
    </template>
    <view class="page">
      <view v-for="item in scoreList" :key="item.userId">
        <text>{{ item.logo }}</text>
      </view>
    </view>
  </app-background>
</template>

<script setup lang="ts">
const scoreList = [
  { userId: '1', logo: 'https://jfkhjoidjf.ltd/api/static/file/cat/afro.png', role: 'evil', seat: 1, scoreDetail: '3+3+3+3+3=15分', award: 'oscar' },
  { userId: '2', logo: 'https://jfkhjoidjf.ltd/api/static/file/cat/afro.png', role: 'normal', seat: 2, scoreDetail: '3+3+3+0+0=9分', award: 'banana' }
]
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
