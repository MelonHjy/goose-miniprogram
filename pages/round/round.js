// pages/round/round.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    roundInfo:{
      last: null,
      murderId: null,
      role: "normal",
      roleText:"普通鹅",
      round: 4,
      roundId: "1648955806407856128",
      sort: 3,
      sufferId: null,
      userId: "1"
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var that = this
    let roundInfo = JSON.parse(options.roundInfo)
    console.log(roundInfo)
    that.setData({
      roundInfo: roundInfo
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