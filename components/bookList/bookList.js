// components/bookList/bookList.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    list: {
      type: Array
    },
    type: {
      type: String
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
  },

  /**
   * 组件的方法列表
   */
  methods: {
    goBookDetail (e) {
      // console.log(e)
      let id = e.currentTarget.dataset.id
      let type = e.currentTarget.dataset.type ? e.currentTarget.dataset.type : 'classify'
      wx.navigateTo({
        url: `/pages/bookDetail/bookDetail?id=${id}&type=${type}`
      });
    }
  }
})
