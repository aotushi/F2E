// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  // wx.request({
  //   url: 'url',
  //   data: data,
  //   dataType: dataType,
  //   enableCache: true,
  //   enableChunked: true,
  //   enableHttp2: true,
  //   enableHttpDNS: true,
  //   enableQuic: true,
  //   forceCellularNetwork: true,
  //   header: header,
  //   httpDNSServiceId: 'httpDNSServiceId',
  //   method: method,
  //   responseType: responseType,
  //   timeout: 0,
  //   success: (result) => {},
  //   fail: (err) => {},
  //   complete: (res) => {},
  // })
  return {
    event,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
  }
}