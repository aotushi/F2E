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


// 请求商品详情
// get
// /api/item/{skuId}

export const reqDetailInfo = (goodId) => {
  return request({
    url: 'https://api-hmugo-web.itheima.net/api/public/v1/goods/detail',
    method: 'get',
    params: {goods_id: goodId}
  })
}


export const reqDetailInfo2 = () => {
  return mockAjax({
    url: '/detail',
    method: 'get'
  })
}

// reqDetailInfo2()

// 请求添加到购物车
// 购物车页面更改数量也用这个接口
export const reqAddOrUpdateShopCart = (skuId, skuNum) => {
  return mockAjax({
    url: `/cart/addToCart/${skuId}/${skuNum}`,
    method: 'post'
  })
}


// 请求获取购物车页面数据
// /api/cart/cartlist
//  get

export const reqShopCartInfo = () => {
  return mockAjax({
    url: '/cart/cartList',
    method: 'get'
  })
}


// 切换商品选中状态
// /api/cart/checkCart/{skuId}/{isChecked}
// get


export const reqUpdateCartIsCheck = (skuId, isChecked) => {
  return mockAjax({
    url: `/cart/checkCart/${skuId}/${isChecked}`,
    method: 'get'
  })
}


// 请求删除购物车数据

export const deleteShopCart = (skuId) => {
  return mockAjax({
    url: `/cart/deleteCart/${skuId}`,
    method: 'delete'
  })
}


// 用户注册
// post
// 参数, 使用请求体携带: code phone password

export const reqUserRegister = (userInfo) => {
  return mockAjax({
    url: '/user/passport/register',
    method: 'post',
    data: userInfo
  })
}


// 手机验证码

export const reqGetCode = (phone) => {
  return mockAjax({
    url: `/user/passport/sendCode/${phone}`,
    method: 'get'
  })
}


// 用户login
export const reqUserLogin = (userInfo) => {
  return mockAjax({
    url: '/user/passport/login',
    method: 'post',
    data: userInfo
  })
}


// 根据token 获取用户信息
export const reqUserInfo = () => {
  return mockAjax({
    url: '/user/passport/auth/getUserInfo',
    method: 'get'
    
  })
}
