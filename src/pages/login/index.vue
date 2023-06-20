<template>
  <view class="login-page">
    <view class="login-page__header">
      <view class="login-page-logo">
        <!-- <image class="login-page-logo__image" src="@/assets/logo.png" /> -->
      </view>
      <view class="login-page-tip">
        <text>欢迎使用{{ config.TITLE }}</text>
      </view>
    </view>
    <view class="login-page__content" />
    <view class="login-page__button">
      <button class="ym-button ym-button--primary login-button" open-type="getPhoneNumber" @getphonenumber="validateaAreementFlag">
        <!-- <image class="icon-weixin" src="@/assets/images/login/icon-weixin.png" /> -->
        <text>微信用户一键登录</text>
      </button>
    </view>
    <view class="agreement-box">
      <view class="agree-box" @click="agreementFlag = !agreementFlag">
        <uni-icons v-if="agreementFlag" type="checkbox-filled" color="#C98800" size="24" />
        <uni-icons v-else type="circle" color="#C98800" size="24" />
        <text>登录即同意百会链</text>
        <text class="link">《用户协议》</text>
        <text class="text-color-primary">与</text>
        <text class="link">《隐私协议》</text>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>

// 进入页面时，注销登录
onLoad(async () => {
  await setToken(null)
  await setUserInfo(null)
})

// 微信 flagId
const flagId = ref('')
const getFlagId = async () => {
  const loginResult = await (uni.login({ provider: 'weixin' }) as unknown as Promise<{ code: string }>)
  const code = loginResult.code
  // flagId.value = await service.app.getWeixinFlagId({ code })
  flagId.value = code
}
onMounted(getFlagId)
const getFlagIdTimer = setInterval(getFlagId, 1000 * 60 * 10)
onUnmounted(() => clearInterval(getFlagIdTimer))

const props = ref<{
  inviterId?: string
  from?: string
}>({
  inviterId: undefined,
  from: undefined
})

onLoad((options) => {
  const loginStorageFrom = uni.getStorageSync('login:from') || ''
  uni.setStorageSync('login:from', '')

  props.value.inviterId = options?.inviterId || ''
  props.value.from = decodeURIComponent(options?.from || loginStorageFrom || '')
})

// 同意用户协议与隐私条款
const agreementFlag = ref(false)
const validateaAreementFlag = async function (event: any) {
  console.log(event)
  if (event?.detail?.errMsg?.includes('fail')) return

  if (agreementFlag.value) {
    submitForm(event)
  } else {
    uni.showModal({
      title: '用户协议与隐私政策',
      content: '同意以下协议：百会链《用户协议》与《隐私政策》，未注册的手机号将自动完成账号注册。',
      confirmText: '同意',
      cancelText: '不同意',
      showCancel: true,
      success: async (res) => {
        if (res.confirm) {
          agreementFlag.value = true
          submitForm(event)
        } else {
          return uni.showToast({ title: '请同意用户协议与隐私条款', icon: 'none' })
        }
      }
    })
  }
}

// 微信登录
const submitForm = async function (event: any) {
  if (!flagId.value) return
  const { encryptedData, iv } = event.detail

  if (!agreementFlag.value) return

  if (encryptedData == null || iv == null) return uni.showToast({ icon: 'none', title: '需要允许获取用户手机号授权' })
  // const userInfo = await service.app.loginByWeixin({
  //   flagId: flagId.value,
  //   encryptedData,
  //   iv,
  //   inviterId: props.value.inviterId || ''
  // })

  console.log({
    flagId: flagId.value,
    encryptedData,
    iv,
    inviterId: props.value.inviterId || ''
  })

  uni.showToast({ icon: 'none', title: '登录成功' })

  // // 设置Token
  // await setToken(userInfo.token)

  // // 设置用户信息
  // await setUserInfo(userInfo)
}

</script>

<style lang="scss" scoped>
$theme-color: #c98800;

.login-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #fff;

  &__header {
    width: 357px;
    margin: 0 auto;
    padding-top: 96px;
  }

  &__content {
    width: 550px;
    min-height: 400px;
    margin: 0 auto;
  }

  &__button {
    width: 550px;
    margin: 0 auto;
  }
}

.login-page-logo {
  display: flex;
  align-items: center;
  justify-content: center;

  &__icon {
    flex: 0 0 89px;
    width: 89px;
    height: 89px;
    margin-right: 20px;
    background: #00ba75;
    border-radius: 50%;
  }

  &__text {
    color: #333;
    font-weight: 500;
    font-size: 60px;
  }

  &__image {
    display: block;
    width: 324px;
    height: 105px;
    margin: 0 auto;
  }
}

.login-page-tip {
  margin-top: 34px;
  margin-right: -18px;
  color: #666;
  font-weight: 400;
  font-size: 26px;
  line-height: 37px;
  letter-spacing: 18px;
  text-align: center;
}

.ym-button {
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  min-width: 200px;
  height: 82px;
  color: #353535;
  font-weight: 500;
  font-size: 32px;
  line-height: 40px;
  text-align: center;
  background: #fff;
  border-radius: 50px;

  &::after {
    border-color: #353535;
    border-radius: 50rem;
  }

  &:active {
    opacity: 0.6;
  }

  &--plain {
    background: none !important;
  }

  &--primary {
    color: #fff;
    background: $theme-color;

    &::after {
      border-color: $theme-color;
    }

    &[plain] {
      color: $theme-color;
    }
  }

  &--warn {
    color: #fff;
    background: #f55;

    &::after {
      border-color: #f55;
    }

    &[plain] {
      color: #f55;
    }
  }
}

.login-button {
  margin-bottom: 14px;

  .icon-weixin {
    display: inline-block;
    width: 42px;
    height: 35px;
    margin-right: 12px;
  }
}

.agreement-box {
  margin-top: 40px;
  text-align: center;
}

.agree-box {
  display: flex;
  align-items: center;
  justify-content: center;

  text {
    margin-left: 10rpx;
    color: #333;
    font-weight: 400;
    font-size: 24rpx;
    line-height: 48rpx;
    vertical-align: middle;
  }
}

.link {
  color: $theme-color !important;
}

</style>
