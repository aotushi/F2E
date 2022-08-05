// 接口请求函数
// 每个接口对应一个函数.如果要拿到相关接口的数据, 只需要调用相关的接口请求函数


import request from './ajax'
// import axios from 'axios'

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
