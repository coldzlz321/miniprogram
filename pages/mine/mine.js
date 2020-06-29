//index.js
//获取应用实例
const app = getApp()
import {formatTime} from "../../utils/util"

Page({
  data: {
    motto: formatTime(new Date()),
    balance:0.00,
    freeze:0.00,
    thumbLeft:0,
    score:0,
    growth:0,
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    windowWidth:0
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  bindToastTap:function(){
    wx.showToast({
      title: '显示',
      icon:"loading"
    })
  },
  onLoad: function () {
    let that = this;
    wx.getSystemInfo({
      success(res){
        that.setData({
          windowWidth:res.windowWidth
        })  
      }
    }) 
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
   
  },
  scrollTab:function(e){
    
    
    let {scrollLeft,scrollWidth} = e.detail;
    let thumbLeft = (scrollLeft / (scrollWidth - this.data.windowWidth)) * 50;
    this.setData({
      thumbLeft
    })
   
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  onPullDownRefresh:function(){

  }
})
