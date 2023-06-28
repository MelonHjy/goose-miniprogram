<template>
  <app-background>
    <template #background>
      <image class="background-image" src="@/assets/index/images/background.png" mode="aspectFill" />
    </template>
    <view class="page">
      <view>
        <view>
          <uni-table>
            <uni-tr>
              <uni-th width="150rpx" align="center">
                对局时间
              </uni-th>
              <uni-th width="120rpx" align="center">
                状态
              </uni-th>
              <uni-th width="204rpx" align="center">
                操作
              </uni-th>
            </uni-tr>
            <uni-tr v-for="item in recordList" :key="item.gameId">
              <uni-td>
                {{ item.created_time }}
              </uni-td>
              <uni-td>
                {{ item.status }}
              </uni-td>
              <uni-td>
                <view class="uni-group">
                  <button v-if="item.status == 'progress'" class="button" size="mini" type="warn" @click="reInRoom()">
                    重新进入
                  </button>
                  <button v-else type="primary" class="button" size="mini" @click="checkScore()">
                    查看详情
                  </button>
                </view>
              </uni-td>
            </uni-tr>
          </uni-table>
          <!-- <view v-for="item in recordList" :key="item.userId">
          <text>{{ item.created_time }}</text>
          <button class="button" type="primary" @click="navigate()">
            查看详情
          </button>
        </view> -->
        </view>
      </view>
    </view>
  </app-background>
</template>

<script setup lang="ts">
const recordList = [
  { gameId: '123', roomId: '1', currentRound: 1, totalRound: 5, status: 'finish', created_time: '1687683703897' },
  { gameId: '124', roomId: '1', currentRound: 2, totalRound: 5, status: 'finish', created_time: '1687683740605' },
  { gameId: '111', roomId: '1', currentRound: 2, totalRound: 5, status: 'finish', created_time: '1687683740605' },
  { gameId: '116', roomId: '1', currentRound: 2, totalRound: 5, status: 'finish', created_time: '1687683740605' },
  { gameId: '126', roomId: '1', currentRound: 2, totalRound: 5, status: 'progress', created_time: '1687683740605' }
]

// 查看详情
const checkScore = () => {
  uni.navigateTo({
    url: '/pages/score/score',
    fail (err) {
      console.log(err)
    }
  })
}

// 重新进入
const reInRoom = () => {
  uni.navigateTo({
    url: '/pages/room/room',
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
