// pages/bookClassify/bookClassify.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: 0,
    list: [],
    list1: [],
    list2: [],
    list3: [],
    list4: [],
    list5: [],
    list6: [],
    list7: [],
    list8: [],
		list9: [],
    type: null,
		showList: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    })
    let index = Number(options.index)
    this.setData({
      active: index ? index : this.data.active,
      type: options.type ? options.type : '',
      showList: true
    })
    if (this.data.type != 'collection' && this.data.type != 'comment') {
      this.getList()
    } else if (this.data.type == 'collection') {
			this.getCollectList()
    } else {
			this.getCommentList()
		}
    
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

  tabClick (e) {
    wx.showLoading({
      title: '加载中',
    })
    this.setData({
      active: e.detail.index
    })
    this.getList()
  },
  // 获取列表
  getList () {
    let _this = this
    wx.cloud.callFunction({
      name: 'getClassifyList',
      data: {
        classify: _this.data.active
      },
      success(res) {
        if (_this.data.active == 0) {
          _this.setData({
						list: res.result.data
          })
        } else if (_this.data.active == 1) {
          _this.setData({
            list1: res.result.data
          })
        } else if (_this.data.active == 2) {
          _this.setData({
            list2: res.result.data
          })
        } else if (_this.data.active == 3) {
          _this.setData({
            list3: res.result.data
          })
        } else if (_this.data.active == 4) {
          _this.setData({
            list4: res.result.data
          })
        } else if (_this.data.active == 5) {
          _this.setData({
            list5: res.result.data
          })
        } else if (_this.data.active == 6) {
          _this.setData({
            list6: res.result.data
          })
        } else if (_this.data.active == 7) {
          _this.setData({
            list7: res.result.data
          })
        } else if (_this.data.active == 8) {
          _this.setData({
            list8: res.result.data
          })
        }
        wx.hideLoading()
      },
      fail(res) {
        console.log("fail", res)
      }
    })
  },
	/**
	 * 获取收藏列表
	 */
	getCollectList () {
		let _this = this
		wx.cloud.database().collection('collectList').where({
			_openid: app.globalData.openId
		}).get({
			success: function (res) {
				wx.hideLoading()
				_this.setData({
					list9: res.data
				})
			},
			fail: function (res) {
				console.log("fail", res)
			}
		})
	},
	/**
	 * 获取收藏列表
	 */
	getCommentList () {
		let _this = this
		wx.cloud.database().collection('commentList').where({
			_openid: app.globalData.openId
		}).get({
			success: function (res) {
				wx.hideLoading()
				_this.setData({
					list9: res.data
				})
			},
			fail: function (res) {
				console.log("fail", res)
			}
		})
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