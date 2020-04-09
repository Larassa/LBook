// pages/bag/bag.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bookList: [],
    loading: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getBookList()
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
  getBookList () {
    wx.cloud.callFunction({
      name: "getBookList"
    }).then( res => {
      this.setData({
        bookList: res.result.data,
        loading: false
      })
    }).catch( err => {
      console.log("fail",err)
    }) 
  },
  goBookClassify (e) {
    let index = e.currentTarget.dataset.index
    wx.navigateTo({
      url: `../bookClassify/bookClassify?index=${index}`,
    });
  }
})