// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  if (event.action == 'collection') {
    return collectBook
  } else if (event.action == 'delCollection') {
    return deleteCollection
  }
}
async function  getDBName (type) {
  if (type == 'new') {
    dbName = 'newBook'
  } else if (type == 'hot') {
    dbName = 'hotList'
  } else if (type == 'other') {
    dbName = 'otherList'
  } else if (type == 'classify') {
    dbName = 'classify'
  }
  return type
}
//收藏
async function collectBook (event) {
  // let bookeRelated = await db.collection('collectList').where({
  //   openId: event.openId == undefined ? event.userInfo.openId : event.openId
  // }).get()

  // var dbName = getDBName(event.bType)
  // let task = db.collection(dbName).doc(event.id).update({
  //   data: {
  //     collection: true
  //   }
  // })
  // if (bookeRelated.data.length === 0) {
  //   let result = await db.collection('collectList').add({
  //     data: {
  //       openId: event.openId == undefined ? event.userInfo.openId : event.openId,
  //       bookId: event.id,
  //       type: event.bType
  //     }
  //   })
  //   console.info(result)
  // }
  // let result = await task;
}
//移除收藏
async function deleteCollection(event) {
  //TODO:文章喜欢总数就不归还了？
  // let result = await db.collection('collectList').where({
  //   openId: event.openId == undefined ? event.userInfo.openId : event.openId,
  //   bookId: event.id,
  //   type: event.bType
  // }).remove()
  // var dbName = getDBName(event.bType)
  // let task = db.collection(dbName).doc(event.id).update({
  //   data: {
  //     collection: true
  //   }
  // })
  // console.info(result)
}