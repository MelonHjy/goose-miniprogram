// pages/index/basics/home/home.js
const WebSocket = require('../utils/websocket.js');

Page({
  options: {
    addGlobalClass: true,
  },
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    // StatusBar: app.globalData.StatusBar,
    // CustomBar: app.globalData.CustomBar,
    cardCur: 0,
    isShowInput:false,
  },

    /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    console.log(66666666666)
    WebSocket.closeSocket()
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log(123123)
    wx.getUserProfile({
      desc: '用于保存用户的昵称', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
          console.log("11111111111",res)
          that.setData({
          userInfo: res.userInfo,
          avatarUrl:res.userInfo.avatarUrl,
        })
      }
    })
  },


    onGetPhoneNumber(e) {
      console.log(123123)
      var that = this;
      wx.login({
        success (res) {
          if (res.code) {
            console.log('步骤2获检查用户登录状态，获取用户电话号码！', res)
            wx.request({
              url: 'https://jfkhjoidjf.ltd/api/user/wechat/authCode',
              data: {code: res.code},
              success: function(res) {
                console.log("步骤三获取授权码，获取授权openid，session_key",res);
                var flagId=res.data.data;
                //解密手机号
                console.log("步骤4获取e",e);
                var msg = e.detail.errMsg;
                var encryptedData=e.detail.encryptedData;
                var iv=e.detail.iv;
                if (msg == 'getPhoneNumber:ok') {//这里表示获取授权成功
                  wx.checkSession({
                    success:function(){
                      // 调用登录接口
                      that.login(flagId, encryptedData, iv)
                    },
                    fail:function(){
                      // that.userlogin()
                    }
                  })
                }
              },fail:function(res){
                  console.log("fail",res);
              }
            })
          } else {
            console.log('登录失败！' + res.errMsg)
          }
        }
      })
    },

    login(flagId, encryptedData, iv){
      wx.request({
        method:'POST',
        url: 'https://jfkhjoidjf.ltd/api/user/login',
        data: {
          flagId: flagId,
          encryptedData: encryptedData,
          iv:iv
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success (res) {
          console.log(res.data)
          // app.globalData.token = res.data.data.token
          // app.globalData.userId = res.data.data.userId
          wx.setStorageSync('token',res.data.data.token);
          wx.setStorageSync('userId',res.data.data.userId);
          wx.showToast({
            title: '登录成功',
          })
        }
      })
    },
 //点击出现输入框
    showInput() {
      this.setData({
        isShowInput: true
      })
      console.error('show+++++++++++')
    },
    //隐藏输入框
    onHideInput() {
      this.setData({
        isShowInput: false
      })
      console.error('hide+++++++++++')
    },
    cardSwiper(e) {
      this.setData({
        cardCur: e.detail.current
      })
    },
    jumpTo(e) {
      return wx.navigateTo({
        url: e.currentTarget.dataset.page
      })
    }

})