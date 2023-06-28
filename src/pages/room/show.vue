<template>
  <app-background>
    <template #background>
      <image class="background-image" src="@/assets/index/images/background.png" mode="aspectFill" />
    </template>
    <view class="page">
      <view class="title">
        <text>房间号：123456</text>
      </view>

      <view class="mb-[10px] mt-[24px] info">
        <text>你的角色是：{{ data.roleStr }}</text>
        <text>座位：{{ data.currentUserSort }}</text>
        <text>{{ data.roleDesc }}</text>
        <text v-if="false">请耐心等待。在此期间不要偷看别人表演哦。前面表演完毕会通知你的</text>

        <view class="cards">
          <view class="card">
            <image :src="data.murderUrl" mode="aspectFill" />
            <text>杀手狗</text>
          </view>
          <view class="card">
            <image :src="data.sufferUrl" mode="aspectFill" />
            <text>被害狗</text>
          </view>
        </view>
      </view>

      <view class="wrap">
        <button class="button" type="primary" @click="begin()">
          开始表演
        </button>
        <button class="button" type="primary" @click="end()">
          结束表演
        </button>
        <button class="button" type="primary" @click="restore()">
          还原案情
        </button>
      </view>
    </view>
  </app-background>
</template>

<script setup lang="ts">
// let beginShow = true
// const wait = false
const data = {
  currentUserSort: 1,
  murderUrl: 'https://jfkhjoidjf.ltd/api/static/file/dog/mask.png',
  sufferUrl: 'https://jfkhjoidjf.ltd/api/static/file/dog/chess.png',
  role: 'head',
  roleStr: '头猫',
  roleDesc: '请记住杀手狗和被害狗的模样，你是第一个表演者哦'
}

// 开始表演
const begin = () => {
  console.log('hahahaha')
  // beginShow = false
}
// 结束表演
const end = () => {
  console.log('hahahaha')
}
//
const restore = () => {
  uni.navigateTo({
    url: '/pages/room/restore',
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

.title{
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 40rpx;
  color: #f1f1f1;
}

.grid-icon{
  width: 160rpx;
  height: 160rpx;
  margin: 15rpx;
  object-fit: cover;
}
.grid-item-img{
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  flex-direction: column;
  color: #f1f1f1;
}
.wrap{
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 200rpx;
}
.button {
  margin-bottom: 50rpx;
  width: 300rpx;
  height: 80rpx;
  display: flex;
  justify-content: center;
  align-items: center;
}

text{
  color: #f1f1f1;
}

.info{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.cards{
  display: flex;
  flex-direction: row;
  margin: 50rpx;
}

.card{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 15rpx;
}

.card image{
  width: 320rpx;
  height: 320rpx;
  margin-bottom: 20rpx;
}
</style>
