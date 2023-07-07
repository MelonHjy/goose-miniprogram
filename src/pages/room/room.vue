<template>
  <app-background>
    <template #background>
      <image class="background-image" src="@/assets/index/images/background.png" mode="aspectFill" />
    </template>
    <view class="page">
      <view class="title">
        <text>房间号：{{ roomNumber }}</text>
      </view>
      <!-- 宫格 -->
      <view class="mb-[10px] mt-[24px]">
        <uni-grid :column="4" :show-border="false" :square="false">
          <uni-grid-item
            v-for="(item, index) in grids"
            :key="index"
            :custom-style="{ background: 'none' }"
            @click="handleGrid(item)"
          >
            <view class="grid-item-img">
              <image :src="item.logo" class="grid-icon" />

              <text>{{ item.nickname }}</text>
            </view>
          </uni-grid-item>
        </uni-grid>
      </view>

      <view class="wrap">
        <button class="button" type="primary" @click="begin">开始游戏</button>
        <button class="button" type="primary" @click="invite">邀请好友</button>
      </view>
    </view>
  </app-background>
</template>

<script setup lang="ts">
// import config from "@/config"
import { buildWSUrl, buildUrlParams } from "@/utils/urlbuilder";

const roomNumber = ref("");
const roomId = ref("");

onLoad(async (option) => {
  const userInfo = await getUserInfo();
  const userId = userInfo.userId;
  roomId.value = option.roomId;
  roomNumber.value = option.roomNumber; // const wsurl = config.WS_BASE_URL + roomId.value + '/' + userId;

  const wsurl = buildWSUrl([roomId.value, userId]); // 链接socket
  uni.connectSocket({ url: wsurl }); // 加入线下房间
  uni.onSocketMessage(function (res) {
    console.log("收到服务器内容 room：" + res.data);
    grids.value = res.data.userVoList;
  });
});

// 初始宫格内容
const grids = ref([
  {
    logo: "https://jfkhjoidjf.ltd/api/static/file/cat/afro.png",
    nickname: "张三",
    owner: true,
    seat: 1,
    userId: "1",
  },
  {
    logo: "https://jfkhjoidjf.ltd/api/static/file/cat/afro.png",
    nickname: "李四",
    owner: false,
    seat: 2,
    userId: "2",
  },
  {
    logo: "https://jfkhjoidjf.ltd/api/static/file/cat/afro.png",
    nickname: "王五",
    owner: false,
    seat: 3,
    userId: "3",
  },
]);

// 九宫格item点击事件
const handleGrid = (item: any) => {
  console.log("hahahaha");
};

// 开始游戏
const begin = () => {
  const sendBeginMsg = JSON.stringify({ api: "BEGIN", code: 200, data: null, msg: "ok", requestId: 1, versionId: 1 });
  uni.sendSocketMessage({
    data: sendBeginMsg,
    success: (result) => {
      console.log("发送开始游戏消息", result);
      uni.$emit("wsBegin", { data: result });
      uni.navigateTo({
        // url: "/pages/room/show",
        url: buildUrlParams("/pages/room/show", { roomNumber: roomNumber.value }),
        fail(err) {
          console.log(err);
        },
      });
    },
    fail: (result) => console.log(result),
  });
};

// 邀请好友
const invite = () => {
  console.log("hahahaha");
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
