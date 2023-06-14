// pages/room/room.js
const WebSocket = require('../utils/websocket.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    roomId:'123456',
    title:'喵喵喵',
    userList:[{
      'logo':'https://jfkhjoidjf.ltd/api/static/file/cat/afro.png',
      'nickname':'猫猫',
      'index':'1'
    },{
      'logo':'https://jfkhjoidjf.ltd/api/static/file/cat/ballet_dress.png',
      'nickname':'猫猫2',
      'index':'2'
    },{
      'logo':'https://jfkhjoidjf.ltd/api/static/file/cat/chef_hat3.png',
      'nickname':'猫猫3',
      'index':'3'
    },]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log(123123)
    let that = this;
    if(options.type==='video'){
      wx.showToast({
        title: '线上模式开发中，敬请期待！',
        icon: 'error',
        duration: 1000,
        success: function () {
          setTimeout(function () {
            wx.navigateBack({
              delta: 1
            })
          }, 1000);
        }
      })
      return
    }
    var token = wx.getStorageSync("token")
    wx.request({
      url: 'https://jfkhjoidjf.ltd/api/room/create',
      method:'POST',
      data: {
        type: options.type
      },
      header: {
        'content-type': 'application/json',
        'token': token
      },
      success (res) {
        console.log(res.data)
        that.setData({
          roomId: res.data.data.roomId,
          title: res.data.data.title,
        })
        // 连接websocket
        var userId = wx.getStorageSync("userId")
        WebSocket.connectSocket({
          data: {
            roomId:res.data.data.roomId,
            userId:userId
          },
          success: function (res) {
            console.log(res, '连接成功')
          }
        })
        // 设置接收消息回调
        WebSocket.onSocketMessageCallback = that.onSocketMessageCallback
      }
    })
  },

   // Socket收到的信息
   onSocketMessageCallback: function(data) {
      if (data.code === 200 && data.msg === 'ok') {
        if(data === 'ENTER'){
          that.setData({
            userList: data.data
          }) 
        }
        if(data.api === 'BEGIN'){
         wx.navigateTo({
            url: '/pages/round/round?roundInfo=' + JSON.stringify(data.data)
          })
        }
      }else{
        if(data.api === 'ERROR'){
          wx.showToast({
            title: data.msg,
            icon: 'none',
            duration: 2000
          })
        }
      }
},

  begin(){
    WebSocket.sendSocketMessage({
      data: {
        api: "BEGIN",
        data: null
      },
      success: function (res) {
        console.log(res, '发送成功')
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})