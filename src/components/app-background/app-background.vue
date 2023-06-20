<template>
  <view class="ym-background">
    <view class="ym-background__background">
      <slot name="background" />
    </view>
    <view class="ym-background__slot">
      <slot />
    </view>
  </view>
</template>

<script setup lang="ts">
</script>

<style lang="scss" scoped>
.ym-background {
  position: relative;

  &__background {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 0;
    width: 100%;
    height: 100%;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;

    &::v-deep(image) {
      width: 100%;
      height: 100%;
    }
  }

  &__slot {
    position: relative;
    z-index: 1;
  }
}
</style>
