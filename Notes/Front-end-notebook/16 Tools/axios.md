


## axios

### 概述

```js
文档:http://www.axios-js.com/zh-cn/docs/
Axios 是一个基于 promise 的 HTTP 库，可以用在浏览器和 node.js 中。

- 引用:
网页端: bootcdn.cn找链接: 
//<script src="https://cdn.bootcdn.net/ajax/libs/axios/0.21.0/axios.min.js"></script>
服务端:npm i axios

- 特点:
1.从浏览器中创建 XMLHttpRequests
2.从 node.js 创建 http 请求
3.支持 Promise API
4.拦截请求和响应
5.转换请求数据和响应数据
6.取消请求
7.自动转换 JSON 数据
8.客户端支持防御 XSRF

```



### 二次封装

```javascript
import axios from 'axios';
import NProgress from 'nprogress/nprogress';
import 'nprogress/nprogress.css';

const service=axios.create({
    baseURL:'/api',
    timeout:20000
})

service.interceptors.request.use(
	(config)=>{
        NProgress.start();
        return config;
    },
    //()=>{}
);

service.interceptors.response.use(
	(response)=>{
        NProgress.done();
        return response.data;
    },
    (error)=>{
        NProgress.done();
        return new Promise(()=>{})
    }
)
```



#### 1.axios拦截器

```js
axios拦截器
(1).axios请求拦截器:
 1.是什么？
 在真正发请求前执行的一个回调函数
 2.作用：
 对每次请求做一些处理，例如：统一直追加某些请求头、处理参数等
(2).axios响应拦截器:
 1.是什么？
 得到响应之后执行的两个回调函数（一个给成功用，一个给失败用）
 2.作用：
 若请求成功，对成功的数据进行处理 请求拦截器中失败的回调一般不写
 若请求失败，对失败进行进一步操作 
```

```js
//设置文件夹
src同级目录下设置ajax/axios.js //或者是axios/index.js
import axios from 'axios';

//请求拦截器 本质上是一个函数.请求真正发出去之前会调用该函数,调完该函数,再发请求
axios.interceptors.request.use((config)=>{
    //config.headers.demo=123; 给所有ajax请求追加请求头
    //config.params.age=18; 给所有ajax请求追加query参数
    return config;
})

axios.interceptors.response.use(
	(response)=>{ //响应成功走这个函数,状态码2开头 response=响应报文
        return response.data;
    },
    (error)=>{ //响应失败走这个函数(状态码不是2开头)
        //此处返回的若是非promise值,则组件中走成功的回调
        //此处返回的若是成功的promise值,则组件中走成功的回调
        //此处返回的若是失败的promise值,则组件中走失败的回调
         //此处返回的若是初始化的promise值,则组件啥也不走
        alert(error.message);       //可以省略在组件中的trycatch
        return new Promise(()=>{})
    }
)

export default axios;


//组件中导入拦截器
<script>
	import axios from './ajax/axios'

	export default {
		name:'App',
		methods:{
			async getData(){
				const result = await axios.get('https://v1.hitokoto.cn/',{params:{name:'tom'}})
				console.log(result) //可以省略try..catch语句
			}
		}
	}
</script>
```



#### 2.项目中的axios的使用

#### 2.1 axios

```js
//axios封装 请求和响应拦截,错误统一处理
import axios from 'axios';
import {Toast} from 'vant';

const service = axios.create({
  baseURL: 'http://127.0.0.1:3000',
  timeout: 6000,
  withCredentials: false //设置跨域是否允许携带凭证(开发环境需要配置，因为要使用跨域；生产环境可能需要将其注释掉！)
});

// 设置post请求头
const contentTypeUTF8 = 'application/x-www-form-urlencoded;charset=UTF-8';
const contentTypeJSON = 'application/json';
service.defaults.headers.post['Content-Type'] = false ? contentTypeUTF8 : contentTypeJSON;

//请求拦截器
service.interceptors.request.use(
  (config) => {
  	Toast.loading({
    	overlay: true,
    	duration: 0,
    	forbidClidk: true,
    	message: '加载中''
  	});
  	return config;
	},
  (error) => {
    Toast.clear();
    Toast({
      message: '请求错误',
      duration: 1000,
      forbidClick: true
    })
    return Promise.reject(error);
  }                           
)

//响应拦截器
service.interceptors.response.use(
	(response) => {
    Toast.clear();
    return Promise.reject(response.data);
  },
  (error) => {
    Toast.clear();
    let {response, message} = error;
    
    //状态码404
    if (response?.status === 404) {
    	Toast({
      	message: '网络请求不存在',
        duration: 1000,
        forbidClick: true
      });
    	return error;
    }
  
  	//网络异常
  	if (!window.navigator.onLine) {
  		Toast({
        message: '请检查网络是否连接正常',
        duration: 1500,
        forbidClick: true
      })
  		return;
		}

		//请求超时
		if (message.includes('timeout')) {
      Toast({
        message: '请求超时',
        duration: 1500,
        forbidClick: true
      })
      return error
    }

		return error
  }
)



/**********************************************
 * get方法，对应get请求 
 * @param url     @type {String}  [请求的url地址] 
 * @param params  @type {Object}  [请求时携带的参数] 
 */
export const axiosGet = ({url, data}) => service.get(url, data);

/********************************************** 
 * post方法，对应post请求 
 * @param url     @type {String}  [请求的url地址] 
 * @param datas  @type {Object}  [请求时携带的参数] 
 */
export const axiosPost = ({url, data}) => service.post(url, data);



/********************************************** 
 * post方法，对应post请求 
 * @param url     @type {String}  [请求的url地址] 
 * @param datas  @type {Object}  [请求时携带的参数] 
 */
// export const post = (url, data) => service.post(url, datas);

// export const post = (url, params) => {
//     return new Promise((resolve, reject) => {
//       if(isAddPassword === 'true'){
      
//         // let authTokenUrl = sessionStorage.getItem("authTokenUrl") ? JSON.parse(sessionStorage.getItem("authTokenUrl")) : {};
//         // let obj = {auth_token: authTokenUrl.authToken ||  ENV.VUE_APP_TOKEN}
//         // params = {...params,...obj}
//         let paramsData = testencrypt(JSON.stringify(params)) 

//         service.post(url,paramsData).then(res => {
//             resolve(res);
//         })
//         .catch(err => {
//             reject(err)
//         })
//       } else {
        
//         service.post(url,params).then(res => {
//           resolve(res);
//         })
//         .catch(err => {
//             reject(err)
//         })
//       }
        
//     });
// }

/********************************************** 
 * put方法，对应put请求 
 * @param {String} url [请求的url地址] 
 * @param {Object} params [请求时携带的参数] 
 */
// export function put(url, params) {
//     return new Promise((resolve, reject) => {
//         service.put(url, JSON.stringify(params))
//             .then(res => {
//                 resolve(res);
//             })
//             .catch(err => {
//                 reject(err)
//             })
//     });
// }


/********************************************** 
 * delete方法，对应delete请求 
 * @param {String} url [请求的url地址] 
 * @param {Object} params [请求时携带的参数] 
 */
// export function del(url, params) {
//     return new Promise((resolve, reject) => {
//         service.delete(url, JSON.stringify(params))
//             .then(res => {
//                 resolve(res);
//             })
//             .catch(err => {
//                 reject(err)
//             })
//     });
// }
```





#### 2.2 axios项目封装

```javascript
import axios from 'axios'
import store from '@/store'
import { Toast }from 'vant'

import { baseApi } from '@/config'

const service = axios.crate({
  baseURL: baseApi,  // url = baseApi url + request url
  withCredentials: true, //send cookies when cross-domain request
  timeout: 5000
})


// 请求拦截器
service.interceptors.request.use(
	config => {
    // 不传默认开启loading
    if (!config.hidelaoding) {
      // loading
      Toast.loading({
        forbidClick: true
      })
    }
    
    if (store.getters.token) {
      config.headers['X-Token'] = ''
    }
    
    return config
  },
  
  error => {
    console.log(error)
    return Promise.reject(error)
  }
)


service.interceptors.response.use(
	response => {
    Toast.clear()
    const res = response.data
    if (res.status && res.status !== 200) {
      // 登录超时
      if (res.status === 401) {
        store.dispatch('FedLogOut').then(() => {
          location.reload()
        })
      }
      
      return Promise.reject(res || 'error')
    } else {
      return Promise.resolve(res)
    }
  },
  error => {}
)
```



### 如何添加headers

post方法：

```coffeescript
axios.post(this.baseUrl+'/vat/fpxx',{
	"params":value
},{
	headers:{
		'authorization':Token
	}
}).then((res)=>{})
```

注意：post的headers不能写在请求体里面，在参数对象之前或之后都可以，再添加一个对象，然后声明headers;

get方法：

```coffeescript
axios.get(that.baseUrl+"/vat/myinfo",{
	headers:{
		authorization:Token
	},
	params:{
		'params1':value
	}
}).then((res)=>{});
```
