//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    active: 0,
    result:'',
    qr1:``,
    qr2:'',
    companyCode:"",
    companyName:""
  },
  onChangeCompanyName:function(e){
    this.setData({
      companyName: e.detail
    })
    console.log(this.data.bankName)
  },
  onChangeCompanyCode:function(e){
    e.detail = e.detail.replace(/[^\w_]/g,'')
    this.setData({
      companyCode: e.detail
    })
    console.log(this.data.companyCode)
  },
  onChange(event) {
    // wx.showToast({
    //   title: `切换到标签 ${event.detail.name}`,
    //   icon: 'none'
    // });
  },
  submit:function(){
    var _this = this;
    var _result = '';
    // if(_this.data.companyCode !=null && _this.data.companyCode != ''){
        
    // }
    // if(_this.data.companyName !=null && _this.data.companyName != ''){
      
    // }
    _result = '###'+_this.data.companyCode+','+_this.data.companyName;
    this.loinsQuery(_result);
  },
  getScancode: function () {
    var _this = this;
    // 允许从相机和相册扫码
    wx.scanCode({
      success: (re) => {
        var _result = re.result;
        // if(_this.data.companyCode !=null && _this.data.companyCode != ''){
        //   _result += ','+_this.data.companyCode;
        // }
        // if(_this.data.companyName !=null && _this.data.companyName != ''){
        //   _result += ','+_this.data.companyName;
        // }
        this.loinsQuery(_result);
      }
    })
  },
  loinsQuery:function(result){
    var _this = this;
    wx.getStorage({
      key: 'loins_bankName',
      success:function(res){
        if(res.data.bankName&&res.data.bankName==''){
          wx.showToast({
            title: `请先维护个人信息`,
            icon: 'none'
          });
          return;
        }
        var _params = {
          "userName": res.data.bankName,
          "channelName": res.data.bankAddress,
          "businessType": "002",
          "keywords": result
      }
      
      wx.request({
        url: 'https://www.accrpa.com/ErwmServlet',
        data:encodeURIComponent(JSON.stringify(_params)),
        method:'post',
        success:function(data){
          var _data = JSON.parse(decodeURIComponent(data.data)) ;
          if(_data||_data.result||_data.result !=''){
            wx.showToast({
              title: _data['result']||'数据异常请稍后再试',
              icon: 'none'
            });
            // const QR = require('../../utils/weapp-qrcode.js')
            // var imgData = QR.drawImg(_data.qr1, {
            //   typeNumber: 4,
            //   errorCorrectLevel: 'M',
            //   size: 500
            // })

            _this.setData({
              companyCode:'',
              companyName:'',
              qr1: _data.qr1 ? ('data:image/png;base64,'+_data.qr1) : '',
              qr2: _data.qr2 ? ('data:image/png;base64,'+_data.qr2) : ''
            })
            console.log(_this.data.qr2);
            // _this.setData({
            //   qr1: _data.qr1,
            //   qr2:_data.qr2
            // })
          }else{
            
          }
        },
        error:function(e){
          wx.showToast({
            title: e,
            icon: 'none'
          });
        }
      })
      },
      fail:function(e){
        wx.showToast({
          title: `请先维护个人信息`,
          icon: 'none'
        });
        console.log(e)
      }
    })
  },
  onLoad:function(){
    wx.setNavigationBarTitle({
      title: '扫一扫',
    })
  }
  // data: {
  //   motto: 'Hello World',
  //   userInfo: {},
  //   hasUserInfo: false,
  //   canIUse: wx.canIUse('button.open-type.getUserInfo')
  // },
  //事件处理函数
  // bindViewTap: function() {
  //   wx.navigateTo({
  //     url: '../logs/logs'
  //   })
  // },
  // onLoad: function () {
  //   if (app.globalData.userInfo) {
  //     this.setData({
  //       userInfo: app.globalData.userInfo,
  //       hasUserInfo: true
  //     })
  //   } else if (this.data.canIUse){
  //     // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
  //     // 所以此处加入 callback 以防止这种情况
  //     app.userInfoReadyCallback = res => {
  //       this.setData({
  //         userInfo: res.userInfo,
  //         hasUserInfo: true
  //       })
  //     }
  //   } else {
  //     // 在没有 open-type=getUserInfo 版本的兼容处理
  //     wx.getUserInfo({
  //       success: res => {
  //         app.globalData.userInfo = res.userInfo
  //         this.setData({
  //           userInfo: res.userInfo,
  //           hasUserInfo: true
  //         })
  //       }
  //     })
  //   }
  // },
  // getUserInfo: function(e) {
  //   console.log(e)
  //   app.globalData.userInfo = e.detail.userInfo
  //   this.setData({
  //     userInfo: e.detail.userInfo,
  //     hasUserInfo: true
  //   })
  // }
  
})
