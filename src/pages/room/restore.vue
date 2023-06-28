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
        <text>请选择凶手牌和受害者牌</text>
        <uni-grid :column="3" :show-border="false" :square="false">
          <uni-grid-item
            v-for="(item,index) in data.cardVos"
            :key="index"
            :custom-style="{'background':'none'}"
            @click="handleGrid(item)"
          >
            <view class="grid-item-img">
              <image :src="item.url" class="grid-icon" />
            </view>
          </uni-grid-item>
        </uni-grid>

        <view class="cards">
          <view class="card">
            <image :src="data.cardVos[0].url" mode="aspectFill" />
            <text>杀手狗</text>
          </view>
          <view class="card">
            <image :src="data.cardVos[1].url" mode="aspectFill" />
            <text>被害狗</text>
          </view>
        </view>
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
// let beginShow = true
const data = {
  currentUserSort: 1,
  murderUrl: 'https://jfkhjoidjf.ltd/api/static/file/dog/mask.png',
  sufferUrl: 'https://jfkhjoidjf.ltd/api/static/file/dog/chess.png',
  role: 'head',
  roleStr: '头猫',
  roleDesc: '请记住杀手狗和被害狗的模样，你是第一个表演者哦',
  cardVos: [
    { cardId: '10', url: 'https://jfkhjoidjf.ltd/api/static/file/dog/others18.png' },
    { cardId: '11', url: 'https://jfkhjoidjf.ltd/api/static/file/dog/repaire.png' },
    { cardId: '4', url: 'https://jfkhjoidjf.ltd/api/static/file/dog/chess.png' },
    { cardId: '5', url: 'https://jfkhjoidjf.ltd/api/static/file/dog/cigarette.png' },
    { cardId: '6', url: 'https://jfkhjoidjf.ltd/api/static/file/dog/computer3.png' },
    { cardId: '8', url: 'https://jfkhjoidjf.ltd/api/static/file/dog/mask.png' },
    { cardId: '9', url: 'https://jfkhjoidjf.ltd/api/static/file/dog/other15.png' }
  ]
}

// 开始表演
const handleGrid = () => {
  console.log('hahahaha')
  // beginShow = false
}
const confirm = () => {
  uni.navigateTo({
    url: '/pages/room/point',
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
  // margin-top: 200rpx;
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
  margin: 25rpx;
}

.card{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 15rpx;
}

.card image{
  width: 300rpx;
  height: 300rpx;
  margin-bottom: 20rpx;
}
</style>
