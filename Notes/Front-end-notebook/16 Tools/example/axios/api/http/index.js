import axios from 'axios'
import httpDefaultSetting from './http-default-setting'
// import * as httpUtil from './http-util'
// import * as requestInterceptor from './request-interceptor'
// import * as requestTransform from './request-transform'
// import * as responseInterceptor from './response-interceptor'
// import * as responseTransform from './response-transform'
// import adapter from './adapter'
// import config from '../../config'
import apiEnv from '../../config/api.env.js'
import store from '../../store'
const http = axios.create(httpDefaultSetting)
const cancelToken = axios.cancelToken
import {showSignInTip} from '../../utils/tip'

// 设置请求拦截器
http.interceptors.request.use(
  config => {
    let rawURL = config.url
    if (rawURL.includes('@')) {
      config.url = apiEnv.base.autoCompletePrefix + '/' + rawURL.split('@')[1]
    }
    // 添加标准请求报文字段到header
    let currentTime = (new Date()).valueOf()
    config.headers.rid = Math.random().toFixed(12).toString().slice(2)
    config.headers.ts = currentTime
    config.headers.key = config.headers.key || store.state.user.regionKey

    return config
  },

  // err => { }
)

// adapter
// axios.adapter()


// 设置请求数据转换

// 响应拦截器
http.interceptors.response.use(
  response => {
    let { result } = response.data

    // 开发环境, 且为mock环境时, 使用写作平台的数据转换
    if ((process.env.NODE_ENV === 'development') && (apiEnv.dev.mockOrReal === 'mock')) {
      response.data = JSON.parse(result)
    }
    return response
  },

  error => {
    if (error.code === 'ECONNABORTED' && error.message.includes('timeout')) {
      return Promise.reject('timeout')
    } else if (error.message === '暂无权限') {
      return Promise.reject(error)
    } else {
      if (error.response.status) {
        switch (error.response.status) {
          case 400:
            Message({
              message: '错误请求',
              duration: 5000
            })
            break
          case 401:
            Message({
              message: '未授权',
              duration: 5000
            })
            break
          case 403:
            Message({
              message: '拒绝访问',
              duration: 5000
            })
            break
          case 404:
            Message({
              message: '未找到资源',
              duration: 5000
            })
            break
          case 405:
            Message({
              message: '请求方法不允许',
              duration: 5000
            })
            break
          case 408:
            Message({
              message: '请求超时',
              duration: 5000
            })
            break
          case 500:
            Message({
              message: '服务器内部错误',
              duration: 5000
            })
            break
          case 501:
            Message({
              message: '网络未实现',
              duration: 5000
            })
            break
          case 502:
            Message({
              message: '错误网关',
              duration: 5000
            })
            break
          case 503:
            Message({
              message: '服务不可用',
              duration: 5000
            })
            break
          case 504:
            Message({
              message: '网络超时',
              duration: 5000
            })
            break
          case 505:
            Message({
              message: 'HTTP版本不支持此请求'
              ,duration: 5000
            })
            break
          default:
            Message({
              message: '连接错误' + error.response.status,
              duration: 5000
            })
        }
      }
    }
    return Promise.reject(error)
  }
)


function handleResponse(res, resolve, reject) {
  if (res.data.code === '00000000') {
    resolve(res.data.result)
  } else {
    ErrorTip(res.data && (res.data.msg || res.data.reqMsg))
    reject(res.data)
  }
}

export function require(method, url, params, config, isUserResponseHandle) {
  { params, config, isUserResponseHandle } = transform(params, config, isUserResponseHandle)
  let data = {}
  if (method === 'post') {
    [data, params] = [params, data]
  }
  
  // 取消请求
  !(config && config.notCancelRequest) & hasRequestUrlList[url] && hasRequestUrlList[url]()  // 不会执行
  if (config) { //需要放置到发送请求之后
    if (config.hasOwnProperty('notCancelRequest') && !config.notCancelRequest) {
      if (hasRequestUrlList[url]) {
        hasRequestUrlList[url]()
      }
    }
  }
  return new Promise((resolve, reject) => {
    let source = axios.CancelToken
    hasRequestUrlList[url] = source.cancel
    return http.request({
      method,
      url,
      data,
      params,
      cancelToken: source.token,
      ...config
    }).then(res => {
      if (res.data.code === '10000010') {

      } else if (res.data.code === '10000011') {
        //单点登录拦截
        showSignInTip(store.state.user.regionKey)
      } else if (isUserResponseHandle) {
        handleResponse(res, resolve, reject)
      } else {
        resolve(res.data)
      }
    }).catch(err => {
      err.msg && ErrorTip(err.msg)
      err === 'timeout' && ErrorTip('请求超时')
      reject(err)
    })
  })
}
