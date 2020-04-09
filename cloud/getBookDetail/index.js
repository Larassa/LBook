// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  var dbName = ''
  if (event.bType == 'new') {
    dbName = 'newBook'
  } else if (event.bType == 'hot') {
    dbName = 'hotList'
  } else if (event.bType == 'other') {
    dbName = 'otherList'
  } else if (event.bType == 'classify') {
    dbName = 'classify'
  }
  return cloud.database().collection(dbName).where({
    id: event.id
  }).get({
    success: function (res) {
      return res
    },
    fail: function (res) {
      return res
    }
  })
}