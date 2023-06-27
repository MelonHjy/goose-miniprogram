<template>
  <app-background>
    <template #background>
      <image class="background-image" src="@/assets/index/images/background.png" mode="aspectFill" />
    </template>
    <view class="page">
      <cu-custom :is-back="false" />
      <image class="page-title animation-fade" src="@/assets/index/images/title.png" mode="widthFix" />

      <!-- 组件list -->
      <view class="nav-list margin-top">
        <view v-for="item in navList" :key="item.name" hover-class="none" class="nav-li" :class="`bg-${item.color}`" @click="navigate(item)">
          <image src="@/assets/index/images/0004.svg" mode="widthFix" class="image-bg" />
          <view class="nav-title">
            <text>{{ item.title }}</text>
          </view>
          <!-- <view class="flex">
            <view class="flex-sub nav-name">
              <text>{{ item.name }}</text>
            </view>
            <view class="flex-sub nav-des text-right align-end">
              <text>组件</text>
            </view>
          </view> -->
          <text :class="`cuIcon-${item.icon}`" />
        </view>
      </view>
    </view>
  </app-background>
</template>

<script setup lang="ts">
const navList = ref([
  // {
  //   title: '线上对局',
  //   name: 'bar',
  //   color: 'pink light w-full',
  //   icon: 'game',
  //   link: '/room/index'
  // },
  {
    title: '线下对局',
    name: 'bar',
    color: 'red light',
    icon: 'friendadd',
    linkType: 'page',
    link: 'room/room'
  },
  {
    title: '加入对局',
    name: 'bar',
    color: 'orange light',
    icon: 'friend',
    linkType: 'input',
    link: 'room/room'
  },
  {
    title: '对局记录',
    name: 'bar',
    color: 'yellow light',
    icon: 'baby',
    linkType: 'page',
    link: 'record/index'
  },
  {
    title: '游戏规则',
    name: 'bar',
    color: 'olive light',
    icon: 'info',
    linkType: 'page',
    link: 'rule/index'
  }
])

// 点击事件
const navigate = (item:any) => {
  if (item.linkType === 'page') {
    uni.navigateTo({
      url: item.link,
      fail (err) {
        console.log(err)
      }
    })
  }
  // if (item.linkType === 'input') {
  //   // 弹出输入框
  //   // router.push(item.link)
  // }
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

.page-title {
  display: block;
  width: 600px;
  margin: 60px auto 120px;
}

.nav-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 0 36px;

  .nav-li {
    position: relative;
    z-index: 1;
    width: 46%;
    margin: 0 1.0% 32px;
    padding: 20px;
    overflow: hidden;
    background-position: center;
    background-size: cover;
    border-radius: 20px;
    height: 165rpx;
  }

  .nav-li::after {
    position: absolute;
    bottom: -10%;
    left: 0;
    z-index: -1;
    width: 100%;
    height: 100%;
    background-color: inherit;
    border-radius: 10px;
    transform: scale(0.9, 0.9);
    opacity: 0.2;
    content: "";
  }

  .nav-li.cur {
    color: #fff;
    background: rgb(94 185 94);
    box-shadow: 4px 4px 6px rgb(94 185 94 / 0.4);
  }

  .nav-title {
    font-weight: 480;
    font-size: 30px;
  }

  .nav-title::first-letter {
    margin-right: 4px;
    font-size: 40px;
  }

  .nav-name {
    position: relative;
    margin-top: 20px;
    font-size: 28px;
    text-transform: capitalize;
  }

  .nav-des {
    position: relative;
    margin-top: 30px;
    font-size: 24px;
    text-transform: capitalize;
  }

  .nav-name::before {
    position: absolute;
    bottom: 0;
    left: 0;
    display: block;
    width: 40px;
    height: 6px;
    background: #fff;
    opacity: 0.5;
    content: "";
  }

  .nav-name::after {
    position: absolute;
    right: 40px;
    bottom: 0;
    display: block;
    width: 90px;
    height: 1px;
    background: #fff;
    opacity: 0.3;
    content: "";
  }

  .nav-name::first-letter {
    margin-right: 1px;
    font-weight: bold;
    font-size: 36px;
  }

  .nav-li > text {
    position: absolute;
    top: 16px;
    right: 24px;
    width: 60px;
    height: 60px;
    font-size: 52px;
    line-height: 60px;
    text-align: center;
  }

  .image-bg {
    position: absolute;
    z-index: -2;
    height: 100%;
    margin: -8px 0 0 -32px;
    opacity: 0.5;
  }
}

.w-full {
  width: 100% !important;
}
</style>
