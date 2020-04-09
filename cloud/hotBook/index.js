// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  return cloud.database().collection("hotList").field({
    id: true,
    title: true,
    author: true,
    url: true,
    classify: true,
    star: true
  }).get()
}