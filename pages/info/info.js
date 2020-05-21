// pages/info/info.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bankName:'',
    bankAddress:'',
  },
  submit:function(){
    
    if(this.data.bankName == '' || this.data.bankName == null){
      wx.showToast({
        title: `银行名称不能为空！`,
        icon: 'none'
      });
      return;
    }
    if(this.data.bankAddress == '' || this.data.bankAddress == null){
      wx.showToast({
        title: `所在支行名称不能为空！`,
        icon: 'none'
      });
      return;
    }
    wx.setStorage({
      data: this.data,
      key: 'loins_bankName',
    })
    var pages =getCurrentPages();//当前页面栈
    if (pages.length >1) {
      var beforePage = pages[pages.length- 2];//获取上一个页面实例对象
      beforePage.onLoad();//触发父页面中的方法
      }
    wx.navigateBack({
      delta:1,
    })
  },
  onChangeBankName:function(e){
    this.setData({
      bankName: e.detail
    })
    console.log(this.data.bankName)
  },
  onChangeBankAddress:function(e){
    this.setData({
      bankAddress: e.detail
    })
    console.log(this.data.bankAddress)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '个人信息维护',
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