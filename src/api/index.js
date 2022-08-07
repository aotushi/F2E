// 接口请求函数
// 每个接口对应一个函数.如果要拿到相关接口的数据, 只需要调用相关的接口请求函数


import mockAjax from '@/api/mockAjax'
import request from './ajax'
// 请求三级分类列表数据
// /api/product/getBaseCategoryList  get 无参
export const reqCategoryList = () => {
  return request({
    // url: '/product/getBaseCategoryList',
    url: 'https://api-hmugo-web.itheima.net/api/public/v1/categories',
    method: 'get'
  })
}


// 测试接口
// reqCategoryList()



// 请求获取模拟接口的数据banner floor
export const reqBannerList = () => {
  return mockAjax({
    url: '/banner',
    method: 'get'
  })
}

export const reqFloorList = () => {
  return mockAjax({
    url: '/floor',
    method: 'get'
  })
}


// 请求获取search页面数据  原请求是post请求, 新api只有get请求
// /api/list
// post
// {
//   "category3Id": "61",
//     "categoryName": "手机",
//     "keyword": "小米",
//     "order": "1:desc",
//     "pageNo": 1,
//     "pageSize": 10,
//     "props": ["1:1700-2799:价格", "2:6.65-6.74英寸:屏幕尺寸"],
//                 "trademark":"4:小米"
    
// }

export const reqSearchInfo = (searchParam) => {
  return mockAjax({
    url: '/search',
    method: 'post',
    data: searchParam
  })
}

// reqSearchInfo()

export const reqSearchInfo2 = () => {
  return request({
    url: 'https://api-hmugo-web.itheima.net/api/public/v1/goods/search',
    method: 'get'
  })
}
