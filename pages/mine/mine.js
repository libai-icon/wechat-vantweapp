// pages/mine.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      bankName:'',
      bankAddress:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '个人信息',
    })
    var _this = this;
    wx.getStorage({
      key: 'loins_bankName',
      success:function(res){
        console.log(res)
        _this.setData({
          bankAddress:res.data.bankAddress,
          bankName:res.data.bankName
        })
      },
      fail:function(e){
        console.log(e)
      }
    })
  },
  newInfo:function(){
    wx.navigateTo({
          url: '../info/info',
        })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})