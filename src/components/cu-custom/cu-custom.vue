<template>
  <view class="cu-custom" :class="{'lucency': props.isLucency}" :style="{'height': props.isLucency ? '0' : CustomBar + 'px'}">
    <view class="cu-bar" :class="[{'fixed': !props.noFixed, 'none-bg text-white bg-img': props.bgImage !== ''}, props.bgColor]" :style="{'height': CustomBar + 'px', 'padding-top': StatusBar + 'px', 'background-image': props.bgImage !== '' ? 'url(' + props.bgImage + ')' : ''}">
      <view v-if="props.isBack && mode !== 'singlePage'" class="action" @tap="BackPage">
        <text class="cuIcon-back" />
        <slot name="backText" />
      </view>
      <view v-if="props.isBack && mode === 'singlePage'" class="action" @tap="toHome">
        <text class="cuIcon-home padding-left-sm" />
        <slot name="homeText" />
      </view>
      <view v-if="props.isCustom" class="action border-custom" :style="{'width': Custom.width + 'px', 'height': Custom.height + 'px', 'margin-left': 'calc(750rpx - ' + Custom.right + 'px)'}">
        <text class="cuIcon-back" @tap="BackPage" />
        <text class="cuIcon-homefill" @tap="toHome" />
      </view>
      <view class="content" :style="{'top': StatusBar + 'px'}">
        <slot name="content" />
      </view>
      <slot name="right" />
    </view>
  </view>
</template>

<script lang="ts" setup>
type Props = {
  bgColor?: string
  isCustom?: boolean
  isBack?: boolean
  bgImage?: string
  isLucency?: boolean
  noFixed?: boolean
  homePage?: string
}

const props = withDefaults(defineProps<Props>(), {
  bgColor: '',
  isCustom: false,
  isBack: false,
  bgImage: '',
  isLucency: false,
  noFixed: false,
  homePage: ''
})

const BackPage = function () {
  wx.navigateBack({ delta: 1 })
}

const toHome = function () {
  if (props.homePage !== '') {
    uni.reLaunch({ url: props.homePage })
  } else {
    uni.reLaunch({ url: '/pages/index' })
  }
}

const StatusBar = ref(0)
const CustomBar = ref(0)
const Custom = ref({ width: 0, height: 0, right: 0 })
const mode = ref('default')
onMounted(() => {
  if (getCurrentPages().length === 1) {
    mode.value = 'singlePage'
  }

  const custom = uni.getMenuButtonBoundingClientRect()
  Custom.value = custom

  const systemInfoCache = uni.getStorageSync('systemInfo')
  if (systemInfoCache) {
    StatusBar.value = systemInfoCache.statusBarHeight
    CustomBar.value = custom.bottom + custom.top - systemInfoCache.statusBarHeight
  } else {
    wx.getSystemInfo({
      success: e => {
        StatusBar.value = e.statusBarHeight
        CustomBar.value = custom.bottom + custom.top - e.statusBarHeight
        uni.setStorageSync('systemInfo', {
          statusBarHeight: e.statusBarHeight
        })
      }
    })
  }
})

</script>

<style lang="scss" scoped>
/* colorui/components/cu-custom.wxss */
.lucency{
  /* position: absolute;
  z-index: 1; */
  background-color: transparent !important;
}
</style>
