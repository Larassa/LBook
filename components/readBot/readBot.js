// components/readBot/readBot.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    ifShowPopup: {
      type: Boolean
    },
    readType: {
      type: String
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    starValue: '',
    reason1: '',
    reason2: '',
  },

  /**
   * 组件的方法列表
   */
  methods: {
    closePopup () {
      this.triggerEvent("closePopup")
    },
    iptReason1 (e) {
      this.setData({
        reason1: e.detail.value
      })
		},
		iptReason2 (e) {
      this.setData({
        reason2: e.detail.value
      })
		},
		changeStar (e) {
			this.setData({
				starValue: e.detail
			})
		},
    recordReason (e) {
			let readType = e.currentTarget.dataset.readType
			if (readType != 0) {
				if (this.data.starValue == '') {
					wx.showToast({
						title: '奉献你的小星星吧',
						icon: 'none',
						image: '',
						duration: 1500,
						mask: false
					})
				} else if (this.data.reason == '') {
					wx.showToast({
						title: '你的看法还没告知大家哟',
						icon: 'none',
						image: '',
						duration: 1500,
						mask: false
					})
				} else {
					this.triggerEvent("sendComment",{
						readType: readType,
						starValue:  this.data.starValue,
						reason: this.data.reason2
					})
				}
			} else {
				if (this.data.reason == '') {
					wx.showToast({
						title: '你的看法还没告知大家哟',
						icon: 'none',
						image: '',
						duration: 1500,
						mask: false
					})
				} else {
					this.triggerEvent("sendComment", {
						readType: readType,
						starValue:  '',
						reason: this.data.reason1
					})
				}
			}
    }
  }
})
