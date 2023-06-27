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
// import { useService, useConfig } from '@/plugins/app-core'
// import { useConfig } from '@/plugins/app-core'
import { useService } from '@/plugins/app-core'
// const config = useConfig()
// console.log(config)
const service = useService()
console.log(service)
// const content = service.app.getProtocol({ type: 3 })
const content = '<p>&nbsp; &nbsp; &nbsp; &nbsp; 类似于王牌对王牌（奖门人）的传声筒游戏，但是用小程序玩</p><p>&nbsp; &nbsp; &nbsp; &nbsp;1、你是一只猫，社区里有5-9只猫，有7-11只狗（按玩家人数来定）。有一天社区发生了命案，一只狗被另一只狗杀了，你目睹了命案过程</p><p>&nbsp; &nbsp; &nbsp; &nbsp;2、晚上，猫一只一只回来猫舍。第一只回来的是你，第二只回来的是猫2。现在只有你知道真实案情，你只能通过猫叫和做动作告诉猫2。猫2也会通过猫叫和做动作告诉猫3。猫做完动作后，就可以看到后面的猫做的动作，但不能猫叫和做动作（例如此时你可以看到猫2做的动作，但不能猫叫和做动作）。直到告诉了最后一只猫后，进入还原案情环节【注意，社区中有一只恶猫，它为了不让别的猫知道真实案情，会故意做错一些动作，但不会太明显，因为最后会有指认恶猫的环节】</p><p>&nbsp; &nbsp; &nbsp; &nbsp; 3、还原案情环节。由最后一只猫先还原案情（即指出是哪只狗杀了哪只狗），正义的主人会判断是否还原成功。如果还原成功，则直接跳到指认恶猫环节，而没有成功则轮到倒数第二只猫还原。如果轮到你都还没有猫还原成功，则进入指认恶猫环节</p><p>&nbsp; &nbsp; &nbsp; &nbsp;4、指认恶猫环节。所有猫同时指认恶猫，当所有猫都指认后，正义的主人会判断是否指认成功</p><p>&nbsp; &nbsp; &nbsp; &nbsp;5、游戏结束，主人会给各位猫咪一些猫粮，聪明的猫咪会得到更多哦</p>'
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
  margin-top: 20px;
  margin: 30rpx;
  font-size: 30rpx;
  color: #f1f1f1;

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
