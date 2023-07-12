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
          <uni-grid-item v-for="(item, index) in userRoundVos" :key="index" :custom-style="{ background: 'none' }">
            <view class="grid-item-img" @click="handleGridImages(item.userId)">
              <image :src="item.logo" class="grid-icon" :class="{ confirm_img: item.pointEvilId }" />
              <text v-if="item.userId == userIdPoint" class="owner-icon"> &ensp;你&ensp; </text>
              <view
                v-if="selectedUserId == item.userId"
                class="cuIcon-roundcheck text-green text-shadow check-icon"
                style="font-size: 55rpx"
              />
              <text v-if="item.pointEvilId" class="confirm-text"> 已确认 </text>

              <text>{{ item.nickname }}</text>
            </view>
          </uni-grid-item>
        </uni-grid>
      </view>

      <view class="wrap">
        <text v-if="tipText">请先指出恶猫</text>
        <button class="button" type="primary" @click="confirmNextStep()">确认</button>
      </view>
    </view>
  </app-background>
</template>

<script setup lang="ts">
const userIdPoint = ref();

// 指认的恶猫图片
// const gridImages = ref([
//   {
//     logo: "https://jfkhjoidjf.ltd/api/static/file/cat/afro.png",
//     nickname: "张三",
//     owner: true,
//     seat: 1,
//     userId: "1",
//     confirm: false,
//   }
// ]);

// 是否已投票，恶猫图列表
const userRoundVos = ref([
  {
    cardResult: "fail",
    evilResult: null,
    gameId: "1676064065765642240",
    id: null,
    pointEvilId: null,
    pointMurderId: "13",
    pointSufferId: "18",
    roundId: "1676064065803390976",
    score: null,
    sort: 4,
    userId: "5",
    nickname: "张三",
    logo: "https://jfkhjoidjf.ltd/api/static/file/cat/afro.png",
  },
]);

const selectedUserId = ref(); // 被选择的角色
// Cannot redeclare block-scoped variable 'tipText'.Vetur(2451)
// TODO
const tipText = ref(false); // 提示指出恶猫

onLoad(async() => {
  // eslint-disable-next-line no-undef
  const app = getApp();
  console.log(app.globalData);
  userRoundVos.value = app.globalData.websocketData;

  const userInfo = await getUserInfo();
  userIdPoint.value = userInfo.userId;

  uni.onSocketMessage(function (res) {
    console.log("收到服务器内容 point：" + res.data);
    // gridImages.value = res.data.data.cardVos;
    const result = JSON.parse(res.data)
    userRoundVos.value = result.data.userRoundVos;

    // 进入计分板环节
    if (result.data.status === "finish") {
      uni.navigateTo({
        url: "/pages/score/score",
        fail(err) {
          console.log(err);
        },
      });
    }
  });
});

// 用户确认与否
const userIfConfirm = () => {
  for (let i = 0; i < userRoundVos.value.length; i++) {
    const item = userRoundVos.value[i];
    if (item.userId === userIdPoint.value) {
      return item.pointEvilId != null;
    }
  }
  return false
};

// 选择恶猫图片
const handleGridImages = (evilUserId: string) => {
  // console.log('selected', userId)

  if (userIfConfirm()) {
    selectedUserId.value = evilUserId;
  }
};

// 确认指认恶猫
const confirmNextStep = () => {
  if (selectedUserId.value) {
    const sendPointMsg = JSON.stringify({
      api: "POINT_EVIL",
      code: 200,
      data: { pointEvilId: selectedUserId.value },
      msg: "ok",
      requestId: 1,
      versionId: 1,
    });
    uni.sendSocketMessage({
      data: sendPointMsg,
    });
  } else {
    tipText.value = true;
  }

  // if (gridImages.value[0].confirm) {
  //   uni.navigateTo({
  //     url: "/pages/score/score",
  //     success() {
  //       gridImages.value[0].confirm = false;
  //     },
  //     fail(err) {
  //       console.log(err);
  //     },
  //   });
  // } else {
  //   gridImages.value[0].confirm = true;
  // }
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
