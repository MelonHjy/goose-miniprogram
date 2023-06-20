<script setup lang="ts">
// 定义更新方法
function versionUpdate () {
  // 判断应用的 getUpdateManager 是否在当前版本可用
  if (uni.canIUse('getUpdateManager') && uni.getUpdateManager) {
    const updateManager = uni.getUpdateManager()
    // 向小程序后台请求完新版本信息
    updateManager.onCheckForUpdate(function (res) {
      if (res.hasUpdate) {
        // 小程序有新版本，静默下载新版本，新版本下载完成
        updateManager.onUpdateReady(function () {
          // 模态弹窗（确认、取消）
          uni.showModal({
            title: '更新提示',
            content: '小程序已发布新版本，是否重启？',
            success: function (res) {
              // 用户点击确定
              if (res.confirm) {
                // 当新版本下载完成，调用该方法会强制当前小程序应用上新版本并重启
                updateManager.applyUpdate()

              // 用户点击取消
              } else if (res.cancel) {
                // 强制用户更新，弹出第二次弹窗
                uni.showModal({
                  title: '提示',
                  content: '小程序已发布新版本，是否重启',
                  showCancel: false, // 隐藏取消按钮
                  success: function (res) {
                    // 第二次提示后，强制更新
                    if (res.confirm) {
                      // 当新版本下载完成，调用该方法会强制当前小程序应用上新版本并重启
                      updateManager.applyUpdate()
                    }
                  }
                })
              }
            }
          })
        })
        // 当新版本下载失败
        updateManager.onUpdateFailed(function () {
          uni.showModal({
            title: '提示',
            content: '请您删除当前小程序，重新打开小程序'
          })
        })
      }
    })
  } else {
    // 提示用户在最新版本的客户端上体验
    // #ifdef MP-WEIXIN
    uni.showModal({
      title: '温馨提示',
      content: '当前微信版本过低，可能无法使用该功能，请升级到最新版本后重试。'
    })
  // #endif
  }
}

async function onKeyboardHeightChange () {
  if (uni.canIUse('onKeyboardHeightChange')) {
    uni.onKeyboardHeightChange((result) => {
      uni.$emit('keyboardHeightChange', result)
    })
  }
}
onLaunch(() => {
  console.log('App Launch')
  // #ifdef MP-WEIXIN
  versionUpdate()
  onKeyboardHeightChange()
  // #endif
})
onShow(() => {
  console.log('App Show')
})
onHide(() => {
  console.log('App Hide')
})
</script>

<style lang="scss">
// @import "vk-uview-ui/index.scss";
@import "~@/plugins/colorui/main.wxss";
@import "~@/plugins/colorui/icon.wxss";
@import "~@/plugins/colorui/animation.wxss";
</style>
