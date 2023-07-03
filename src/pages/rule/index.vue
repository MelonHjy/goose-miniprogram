<template>
  <app-background>
    <template #background>
      <image class="background-image" src="@/assets/index/images/background.png" mode="aspectFill" />
    </template>
    <view class="page">
      <!-- <cu-custom :is-back="false" /> -->
      <view class="content-wrapper">
        <!-- <view class="content-wrapper__title">
          <text>游戏规则</text>
        </view> -->
        <view class="content-wrapper__content">
          <mp-html selectable :content="content" />
        </view>
      </view>
    </view>
  </app-background>
</template>

<script setup lang="ts">
const userService = useService()
const content = ref('')
onLoad(async () => {
  content.value = await userService.app.getRules()
})
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

.content-wrapper {
  margin: 30rpx;
  margin-top: 20px;
  color: #f1f1f1;
  font-size: 30rpx;

  // &:last-child {
  //   margin-bottom: 0;
  // }

  // .content-wrapper__title {
  //   margin-bottom: 20px;
  //   color: #21201e;
  //   font-weight: 600;
  //   font-size: 32px;
  // }
}
</style>
