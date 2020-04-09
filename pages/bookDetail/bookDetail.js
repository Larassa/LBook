// pages/bookDetail/bookDetail.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail: {
      id: null,
      url: '',
      title: '',
      author: '',
      star: '',
      commentNum: '',
      readingNum: '',
      wReadNum: '',
      // readType: '',
      collect: ''
		},
		ifComment: '',
    ifCollect: '',
    ifShowPopup: false,
    readType: '',
    moreTxt: true,
    moreAuthor: false,
    moreBookList: [
      {
        url: 'https://img1.doubanio.com/view/subject/m/public/s33523889.jpg',
        title: '云游',
        star: '4'
      },
      {
        url: 'https://img9.doubanio.com/view/subject/m/public/s33519906.jpg',
        title: '被统治的艺术',
        star: '4'
      },
      {
        url: 'https://img1.doubanio.com/view/subject/m/public/s33505898.jpg',
        title: '了不起的我',
        star: '4'
      },
      {
        url: 'https://img1.doubanio.com/view/subject/m/public/s33523889.jpg',
        title: '云游',
        star: '4'
      },
      {
        url: 'https://img9.doubanio.com/view/subject/m/public/s33519906.jpg',
        title: '被统治的艺术',
        star: '4'
      },
      {
        url: 'https://img1.doubanio.com/view/subject/m/public/s33505898.jpg',
        title: '了不起的我',
        star: '4'
      },
    ],
		bType: '',
		reason: '',
		starValue: '',
		readType: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
      mask: true,
    })
    this.setData({
      id: options.id,
      bType: options.type
    })
    console.log(options.type)
		this.getDetail()
		this.getBookRelated()
		this.getCommentList()
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
   * 获取书籍详情
   */
  getDetail () {
    let _this = this
    wx.cloud.callFunction({
      name: "getBookDetail",
      data: {
        id: _this.data.id,
        bType: _this.data.bType
      },
      success(res) {
        _this.setData({
          detail: res.result.data[0],
          // ifCollect: res.result.data[0].collect
        })
        console.log(res)
        wx.hideLoading();
      },
      fail(res) {
        console.log("fail", res)
      }
    })
    
	},
	/**
	 * 获取用户是否收藏
	 */
	getBookRelated() {
		let _this = this
		wx.cloud.database().collection('collectList').where({
			_openid: app.globalData.openId,
			id: _this.data.id,
			type: _this.data.bType
		}).get({
			success: function (res) {
				if (res.data.length != 0) {
					// if (res.data[0].id == _this.data.id && res.data[0].type == _this.data.bType) {
						_this.setData({
							ifCollect: true
						})
					// }
				} else {
					_this.setData({
						ifCollect: false
					})
				}
				console.log("获取收藏列表", res)
			},
			fail: function (res) {
				console.log("获取收藏列表成功", res)
			}
		})
	},
	/**
	 * 获取用户的书评
	 */
	getCommentList () {
		let _this = this
		wx.cloud.database().collection('commentList').where({
			_openid: app.globalData.openId,
			id: _this.data.id,
			type: _this.data.bType
		}).get({
			success: function (res) {
				if (res.data.length != 0) {
						_this.setData({
							ifComment: true,
							reason: res.data[0].reason,
							readType: res.data[0].readType,
							starValue: res.data[0].starValue
						})
				} else {
					_this.setData({
						ifComment: false
					})
				}
				console.log("获取书评列表", res)
			},
			fail: function (res) {
				console.log("获取书评列表成功", res)
			}
		})
	},
  /**
   * 弹框
   */
  showPopup (e) {
    let readType = e.currentTarget.dataset.readType
    this.setData({
      readType: readType
    })
    this.setData({
      ifShowPopup: true
    })
  },
  /**
   * 收起弹框
   */
  closePopup () {
    this.setData({
      ifShowPopup: false
    })
  },
  /**
   * 展开内容简介
   */
  showMoreTxt () {
    let moreTxt = this.data.moreTxt
    this.setData({
      moreTxt: !moreTxt
    })
  },
  /**
   * 展开作者简介
   */
  showMoreAuthor () {
    let moreAuthor = this.data.moreAuthor
    this.setData({
      moreAuthor: !moreAuthor
    })
  },
  /**
   * 收藏
   */
  collect () {
		let _this = this
		if (this.data.ifCollect == false) {
			wx.cloud.database().collection("collectList").add({//user为表名
				data: {
					id: _this.data.detail.id,
					type: _this.data.bType,
					title: _this.data.detail.title,
					author: _this.data.detail.author,
					url: _this.data.detail.url,
					// readType: _this.data.detail.readType,
					star: _this.data.detail.star,
					digest: _this.data.detail.digest,

				},
				success (res) {
					console.log("success",res)
					_this.setData({
						ifCollect: true
					})
					wx.showToast({
						title: '收藏成功',
						icon: 'success',
						image: '',
						duration: 1500,
						mask: false,
					})
				},
				fail (res) {
					console.log("fail",res)
				}
			}) 
		} else {
			wx.cloud.database().collection("collectList").where({
				_openid: app.globalData.openId,
				id: _this.data.id,
				type: _this.data.bType
			}).remove({
				success (res) {
					console.log("success",res)
					_this.setData({
						ifCollect: false
					})
					wx.showToast({
						title: '已取消收藏',
						icon: 'none',
						image: '',
						duration: 1500,
						mask: false,
					})
				},
				fail (res) {
					console.log("fail",res)
				}
			})
		}
	},
	/**
	 * 书评
	 */
	sendComment (e) {
		console.log("e", e)
		let _this = this
		if (this.data.ifComment == false) {
			wx.cloud.database().collection("commentList").add({//user为表名
				data: {
					id: _this.data.detail.id,
					type: _this.data.bType,
					title: _this.data.detail.title,
					author: _this.data.detail.author,
					url: _this.data.detail.url,
					star: _this.data.detail.star,
					digest: _this.data.detail.digest,
					readType: e.detail.readType,
					reason: e.detail.reason,
					starValue: e.detail.starValue,
				},
				success (res) {
					console.log("success",res)
					_this.setData({
						ifComment: true
					})
					wx.showToast({
						title: '点评成功',
						icon: 'success',
						image: '',
						duration: 1500,
						mask: false,
					})
					_this.closePopup()
				},
				fail (res) {
					console.log("fail",res)
				}
			}) 
		}
	},
  /**
   * 查看书评
   */
  goComment () {
    wx.navigateTo({
      url: '../comment/comment'
    })
  },
  /**
   * 查看分类
   */
  goBookClassify () {
    wx.navigateTo({
      url: '../bookClassify/bookClassify'
    })
  },
  /**
   * 查看书的详情
   */
  goBookDetail () {
    wx.navigateTo({
      url: '../bookDetail/bookDetail'
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