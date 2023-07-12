<template>
  <app-background>
    <template #background>
      <image class="background-image" src="@/assets/index/images/background.png" mode="aspectFill" />
    </template>
    <view class="page">
      <view class="title">
        <text>房间号: 123456</text>
      </view>

      <!-- 宫格 -->
      <view class="mb-[10px] mt-[24px]">
        <text>请选择凶手牌和受害者牌</text>
        <uni-grid :column="3" :show-border="false" :square="false">
          <uni-grid-item v-for="(item, index) in data.cardVos" :key="index" :custom-style="{ background: 'none' }">
            <view class="grid-item-img">
              <image
                :src="item.url"
                class="grid-icon"
                :class="{ 'confirm-img': item.cardId === killerId || item.cardId === victimId }"
                @click="selectGrid(item.cardId, item.url)"
              />
            </view>
            <text v-if="item.cardId === killerId" class="confirm-text">杀手狗</text>
            <text v-if="item.cardId === victimId" class="confirm-text">被害狗</text>
          </uni-grid-item>
        </uni-grid>

        <view class="cards">
          <view class="card" @click="handleGrids('killer')">
            <image :src="killerImage" mode="aspectFill" :class="{ 'stage-highlight': handleKillerStage }" />
            <text>杀手狗</text>
          </view>
          <view class="card" @click="handleGrids('victim')">
            <image :src="victimImage" mode="aspectFill" :class="{ 'stage-highlight': handleVictimStage }" />
            <text>被害狗</text>
          </view>
        </view>
      </view>

      <view class="wrap">
        <text v-if="tipText">请先指出杀手狗和被害狗的模样</text>
        <text v-if="handleEndStage">请等待其他玩家指认结束</text>
        <button class="button" type="primary" :disabled="handleEndStage" @click="confirmNext()">确认</button>
      </view>
    </view>
  </app-background>
</template>

<script setup lang="ts">
// let beginShow = true
const data = ref({
  currentUserSort: 1,
  murderUrl: "https://jfkhjoidjf.ltd/api/static/file/dog/mask.png",
  sufferUrl: "https://jfkhjoidjf.ltd/api/static/file/dog/chess.png",
  role: "head",
  roleStr: "头猫",
  roleDesc: "请记住杀手狗和被害狗的模样，你是第一个表演者哦",
  cardVos: [
    { cardId: "10", url: "https://jfkhjoidjf.ltd/api/static/file/dog/others18.png" },
    { cardId: "11", url: "https://jfkhjoidjf.ltd/api/static/file/dog/repaire.png" },
    { cardId: "4", url: "https://jfkhjoidjf.ltd/api/static/file/dog/chess.png" },
    { cardId: "5", url: "https://jfkhjoidjf.ltd/api/static/file/dog/cigarette.png" },
    { cardId: "6", url: "https://jfkhjoidjf.ltd/api/static/file/dog/computer3.png" },
    { cardId: "8", url: "https://jfkhjoidjf.ltd/api/static/file/dog/mask.png" },
    { cardId: "9", url: "https://jfkhjoidjf.ltd/api/static/file/dog/other15.png" },
  ],
  status: "",
});

const tipText = ref(false); // 提示指出杀手和被害的模样

const killerId = ref(); // 凶手
const victimId = ref(); // 被害
const killerImage = ref(); // 凶手头像
const victimImage = ref(); // 受害者头像
const handleKillerStage = ref(false); // 指出凶手阶段
const handleVictimStage = ref(false); // 指出受害者阶段

const handleEndStage = ref(false); // 指出结束阶段

onLoad(() => {
  // eslint-disable-next-line no-undef
  const app = getApp();
  console.log(app.globalData);
  data.value = app.globalData.websocketData;

  uni.onSocketMessage(function (res) {
    console.log("收到服务器内容 restore：" + res.data);
    const result = JSON.parse(res.data)
    data.value = result.data;

    // 进入指认恶猫环节
    if (data.value.status === "pointEvil") {
      // eslint-disable-next-line no-undef
      const app = getApp();
      app.globalData.websocketData = result.data

      uni.navigateTo({
        url: "/pages/room/point",
        fail(err) {
          console.log(err);
        },
      });
    }
  });
});

// 选择凶手还是受害者阶段
const handleGrids = (stage: string) => {
  if (handleEndStage) {
    // 指认过就不能再指认
    return;
  }

  if (stage === "killer") {
    handleKillerStage.value = true;
    handleVictimStage.value = false;
  } else if (stage === "victim") {
    handleKillerStage.value = false;
    handleVictimStage.value = true;
  } else {
    handleKillerStage.value = false;
    handleVictimStage.value = false;
  }
};

// 指认图片
const selectGrid = function (index: string, url: string) {
  if (handleEndStage) {
    // 指认过就不能再指认
    return;
  }
  if (index === victimId.value || index === killerId.value) {
    return;
  } else if (handleKillerStage.value) {
    killerId.value = index;
    killerImage.value = url;
  } else if (handleVictimStage.value) {
    victimId.value = index;
    victimImage.value = url;
  } else {
    return;
  }
};

// 确认指认的图片
const confirmNext = () => {
  if (killerId.value && victimId.value) {
    const sendStoreMsg = JSON.stringify({
      api: "POINT_CARD",
      code: 200,
      data: { pointMurderId: killerId.value, pointSufferId: victimId.value },
      msg: "ok",
      requestId: 1,
      versionId: 1,
    });
    uni.sendSocketMessage({
      data: sendStoreMsg,
    });
    handleEndStage.value = true;
  } else {
    tipText.value = true;
  }
};
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
.wrap {
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

text {
  color: #f1f1f1;
}

.info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.cards {
  display: flex;
  flex-direction: row;
  margin: 25rpx;
}

.card {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 15rpx;
}

.card image {
  width: 300rpx;
  height: 300rpx;
  margin-bottom: 20rpx;
  background-color: $uni-border-color;
}
.confirm-img {
  -webkit-filter: grayscale(100%);
  -moz-filter: grayscale(100%);
  -ms-filter: grayscale(100%);
  -o-filter: grayscale(100%);
  filter: grayscale(100%);
  filter: gray;
}
.stage-highlight {
  -webkit-box-shadow: 0 0 5rpx rgba(0, 113, 241, 1);
  box-shadow: 0 0 25rpx rgb(13, 219, 175), 0 0 5rpx rgb(237, 4, 54);
}
.confirm-text {
  position: absolute;
  top: 60rpx;
  left: 50rpx;
  font-size: 45rpx;
  color: green;
  font-weight: bold;
  text-shadow: #000 1px 0 0, #000 0 1px 0, #000 -1px 0 0, #000 0 -1px 0;
}
</style>
