Page({

  /**
   * 页面的初始数据
   */
  data: {
    indicatorDots: true,
    vertical: true,
    autoplay: true,
    interval: 2000,
    duration: 500,
    imgList:[
      {
        url: 'https://6c75-lu-xbbrd-1301105611.tcb.qcloud.la/swiperImg/%E8%AF%BB%E4%B9%A6%E6%94%BB%E7%95%A5.png?sign=d2606e5f264df74c041afe99c6d2ac3c&t=1583577149'
      },
      {
        url: 'https://6c75-lu-xbbrd-1301105611.tcb.qcloud.la/swiperImg/%E8%AF%BB%E4%B9%A6%E6%94%BB%E7%95%A5%20(2).png?sign=d38655e362dced9e644ce40059669511&t=1583577198'
      },
      {
        url: 'https://6c75-lu-xbbrd-1301105611.tcb.qcloud.la/swiperImg/%E8%AF%BB%E4%B9%A6%E6%94%BB%E7%95%A5%20(1).png?sign=0c941ae017af87d39f10beaf35f7fc0b&t=1583577218'
      }
    ],
    newBookList:[],
    hotBookList: [],
    excelentList: [],
    othersList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getNewBookList()
    this.getHotList()
    this.getExcellent()
    this.getOtherList()
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
   * 获取每新书列表
   */
  getNewBookList () {
    let that = this
    wx.cloud.callFunction({
      name: "newBook",
      success (res) {
        that.setData({
          newBookList: res.result.data
        })
        console.log("success",res)
      },
      fail (res) {
        console.log("fail",res)
      }
    })
  },

  /**
   * 获取热门书籍
   */
  getHotList () {
    let that = this
    wx.cloud.callFunction({
      name: "hotBook",
      success (res) {
        that.setData({
          hotBookList: res.result.data
        })
        console.log("success",res)
      },
      fail (res) {
        console.log("fail",res)
      }
    })
  },
  /**
   * 查看书的详情
   */
  goBookDetail (e) {
    let id = e.currentTarget.dataset.id
    let type = e.currentTarget.dataset.type
    wx.navigateTo({
      url: `../bookDetail/bookDetail?id=${id}&type=${type}`
    })
  },
  /**
   * 获取精彩片段
   */
  getExcellent () {
    let _this = this
    wx.cloud.database().collection('excellentList').get({
      success(res) {
        _this.setData({
          excelentList: res.data
        })
        console.log('excellent success', res)
      },
      fail(res) {
        console.log('excellent fail', res)
      }
    })
  },
  /**
   * 他们在看
   */
  getOtherList () {
    let _this = this
    wx.cloud.database().collection('otherList').field({
      id: true,
      title: true,
      star: true,
      url: true
    }).get({
      success(res) {
        _this.setData({
          othersList: res.data
        })
        console.log('othersList success', res)
      },
      fail(res) {
        console.log('othersList fail', res)
      }
    })
  },
})