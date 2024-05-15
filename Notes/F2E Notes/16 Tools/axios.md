


# axios

## 概述

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







### 1.axios拦截器

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



### 2.项目中的axios的使用

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


# axios 二次封装

## 简略版

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



## axios的封装

### 来源
> https://mp.weixin.qq.com/s?__biz=MzAxODE2MjM1MA==&mid=2651578212&idx=2&sn=3a4bdc17b0c1808f2b5649d84eff93a1&chksm=802508a5b75281b366dca8441c3ab2dc63b93adcd139ec5bb002dc8b10fef80efa49d49d92c2&scene=21#wechat_redirect

### 引入
> 一般在src目录中创建一个http(或request或api)文件夹,然后再里面新建一个http.js, 一个api.js.
> http.js用于axios的封装; api.js用来管理接口

```js
// http.js中

import axios from 'axios'
import {Toast} from 'vant'; //提示框组件
import router from '../router'
import store from '../store/index'
```

### 设置不同环境下的基础URL
我们的项目环境可能有开发环境、测试环境和生产环境。我们通过node的环境变量来匹配我们的默认的接口url前缀。axios.defaults.baseURL可以设置axios的默认请求地址

```js
// 环境的切换  
if (process.env.NODE_ENV == 'development') {      
    axios.defaults.baseURL = 'https://www.baidu.com';}   
else if (process.env.NODE_ENV == 'debug') {      
    axios.defaults.baseURL = 'https://www.ceshi.com';  
}   
else if (process.env.NODE_ENV == 'production') {      
    axios.defaults.baseURL = 'https://www.production.com';  
}
```


### 创建实例&&设置请求超时
通过axios.defaults.timeout设置默认的请求超时时间。例如超过了5s，就会告知用户当前请求超时，请刷新等。
```js
const instance = axios.create({
	timeout: 1000*5
})
```


### post请求头设置
post请求的时候，我们需要加上一个请求头，所以可以在这里进行一个默认的设置，即设置post的请求头为`application/x-www-form-urlencoded;charset=UTF-8`
```js
instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
```


### 请求拦截
```js
// 请求拦截器  

instance.interceptors.request.use(      
    config => {          
        // 登录流程控制中，根据本地是否存在token判断用户的登录情况          
        // 但是即使token存在，也有可能token是过期的，所以在每次的请求头中携带token          
        // 后台根据携带的token判断用户的登录情况，并返回给我们对应的状态码          
        // 而后我们可以在响应拦截器中，根据状态码进行一些统一的操作。          
        const token = store.state.token;          
        token && (config.headers.Authorization = token);          
        return config;      
    },      
    error => Promise.error(error))
```


### 响应链接
```js

// 提示函数
const tip = msg => {
	Toast({
		message: msg,
		duration: 1000,
		forbidClick: true
	})
}

// 跳转登录页
const toLogin = () => {
	router.replace({
		path: '/login',
		query: {
			redirect: router.currentRoute.fullPath
		}
	})
}

// 请求失败后的错误统一处理
const errorHandle = (satus, other) => {
	// 状态码判断
	switch(status) {
		// 401: 未登录状态，跳转登录页  
		case 401:  
				toLogin();  
				break;  
		// 403 token过期  
		// 清除token并跳转登录页  
		case 403:  
				tip('登录过期，请重新登录');  
				localStorage.removeItem('token');  
				store.commit('loginSuccess', null);  
				setTimeout(() => {  
						toLogin();  
				}, 1000);  
				break;  
		// 404请求不存在  
		case 404:  
				tip('请求的资源不存在');   
				break;  
		default:  
				console.log(other);	
	}
}

instance.interceptors.response.use(      
    // 请求成功  
    res => res.status === 200 ? Promise.resolve(res) : Promise.reject(res),      
    // 请求失败  
    error => {  
        const { response } = error;  
        if (response) {  
            // 请求已发出，但是不在2xx的范围   
            errorHandle(response.status, response.data.message);  
            return Promise.reject(response);  
        } else {  
            // 处理断网的情况  
            // eg:请求超时或断网时，更新state的network状态  
            // network状态在app.vue中控制着一个全局的断网提示组件的显示隐藏  
            // 关于断网组件中的刷新重新获取数据，会在断网组件中说明  
            if (!window.navigator.onLine) {  
               store.commit('changeNetwork', false);  
            } else {  
                return Promise.reject(error);  
            }  
        }  
    });

//暴露实例
export default instance

```


# 项目中封装API接口管理

>新建了一个api文件夹，里面有一个index.js和一个base.js，以及多个根据模块划分的接口js文件。index.js是一个api的出口，base.js管理接口域名，其他js则用来管理各个模块的接口。

index.js
```js
/**   
 * api接口的统一出口  
 */  
// 文章模块接口  
import article from '@/api/article';  
// 其他模块的接口……  
  
// 导出接口  
export default {      
    article,  
    // ……  
}
```


base.js
通过base.js来管理我们的接口域名，不管有多少个都可以通过这里进行接口的定义。即使修改起来，也是很方便的。
```js
/**  
 * 接口域名的管理  
 */  
const base = {      
    sq: 'https://xxxx111111.com/api/v1',      
    bd: 'http://xxxxx22222.com/api'  
}  
  
export default base;
```

article.js
```js
/**  
 * article模块接口列表  
 */  
  
import base from './base'; // 导入接口域名列表  
import axios from '@/utils/http'; // 导入http中创建的axios实例  
import qs from 'qs'; // 根据需求是否导入qs模块  
  
const article = {      
    // 新闻列表      
    articleList () {          
        return axios.get(`${base.sq}/topics`);      
    },
    // 新闻详情,演示      
    articleDetail (id, params) {          
        return axios.get(`${base.sq}/topic/${id}`, {              
            params: params          
        });      
    },  
    // post提交      
    login (params) {          
        return axios.post(`${base.sq}/accesstoken`, qs.stringify(params));      
    }  
    // 其他接口…………  
}

export default article;
```


### api挂载到vue原型上

```js
// main.js
import Vue from 'vue'  
import App from './App'  
import router from './router' // 导入路由文件  
import store from './store' // 导入vuex文件  
import api from './api' // 导入api接口  
  
Vue.prototype.$api = api; // 将api挂载到vue的原型上
```

然后可以在页面中调用接口
```js
methods: {      
    onLoad(id) {        
        this.$api.article.articleDetail(id, {          
            api: 123        
        }).then(res=> {  
            // 执行某些操作        
        })      
    }    
}
```


# 断网提示
> 在断网的时候，来更新vue中network的状态，那么这里我们根据network的状态来判断是否需要加载这个断网组件。断网情况下，加载断网组件，不加载对应页面的组件。当点击刷新的时候，我们通过跳转refesh页面然后立即返回的方式来实现重新获取数据的操作。因此我们需要新建一个refresh.vue页面，并在其`beforeRouteEnter`钩子中再返回当前页面。

```vue
// app.vue
<template>    
    <div id="app">      
        <div v-if="!network">        
            <h3>我没网了</h3>        
            <div @click="onRefresh">刷新</div>        
        </div>      
        <router-view/>        
    </div>  
</template>  
  
<script>    import { mapState } from 'vuex';  
    export default {    
        name: 'App',    
        computed: {      
            ...mapState(['network'])    
        },    
        methods: {      
            // 通过跳转一个空页面再返回的方式来实现刷新当前页面数据的目的  
            onRefresh () {        
                this.$router.replace('/refresh')      
            }    
        }  
    }</script>
```

```js
// refresh.vue
beforeRouteEnter(to,from,next) {
	next(vm => {
		vm.$router.replace(from.fullPath)
	})
}
```


# 配置
### 更改baseURL
项目中可能会有几个请求不使用baseURL配置,可以在请求的第三个参数中使用`{baseURL: '/test'}`来变更基础路径

### 返回数据类型
`responseType` 表示浏览器将要响应的数据类型。`responseType`是Axios请求配置中的一个选项，它决定了Axios如何处理从服务器返回的响应数据的格式。
// 选项包括: 'arraybuffer', 'document', 'json'(默认), 'text', 'stream' 
// 浏览器专属：'blob'






### 更换返回数据的格式
**背景**
> 因为axios中的默认transformReponse使用了JSON.parse。JSON.parse会舍去小点后的0。

源码
```js
transformResponse: [function transformResponse(data) {
    /*eslint no-param-reassign:0*/
    if (typeof data === 'string') {
      try {
        data = JSON.parse(data);
      } catch (e) { /* Ignore */ }
    }
    return data;
  }],
```

处理方案: 只能是后端把浮点数转成字符串传给前端，或者前端特殊处理加上小数显示


# 实例

## 在处理异步请求时，如何确保数据的一致性和同步性?
### 背景介绍
假设,某个页面分a和b两个tab页, 同时a和b页面上的echarts图表使用同一个组件,其数据通过页面初始化和切换时请求获取.页面初始化时展示a页,如果我频繁进行a和b页的切换,echarts会出现数据叠加的问题.也就是数据不一致和不同步.

竞态条件（Race Condition）是一个术语，用于描述一个系统或者过程的输出依赖于不受控制的事件发生顺序或者时机的情况。在并发编程中，当两个或多个并发进程（或线程）访问和操作某些共享数据，并且最终结果取决于这些进程的执行顺序时，就可能发生竞态条件。如果有多个HTTP请求并发地尝试更新同一个ECharts图表的数据，而这些请求的响应返回顺序无法预测，那么就可能出现竞态条件。例如：
1. 请求A开始执行并请求数据。
2. 请求B开始执行并请求数据（此时请求A尚未完成）。
3. 请求B的数据返回并更新了图表。
4. 请求A的数据返回并尝试更新图表（此时可能会覆盖或与请求B的数据混合）。
如果请求A和请求B都没有适当的同步机制来控制对图表数据的访问，那么最终图表显示的数据可能是不正确的，因为它可能反映了两个请求中的某一个，或者两者的混合结果。

### 代码示例
```vue
<div class="box">
	<div class="projects mgb-15">
		<div class="projects__main">
			<div class="projects__item" v-for="(item, index) in progress.type" :key="index" style="width: 33.3%">
				<span
					class="projects__inner"
					:class="progress.active == item.id ? 'projects__inner--current' : ''"
					@click="updateActive('progress', item.id);handleChangeTabs('progress', item.id)"
>
					{{item.name}}>>>>
				</span>
			</div>
		</div>
	</div>
	<van-tabs v-model="orderProgressTab.active" class="init-tabs mgb-10">
		<van-tab name="a" title="整体情况111111">
			<div style="height: 260px; width:100%;">
				<BarLine :data="orderProgressTotal" v-if="orderProgressTab.active == 'a'" ></BarLine>
			</div>
		</van-tab>
		<van-tab name="b" title="日变化趋势222222" >
			<div style="height: 260px; width:100%;">
				<BarLine :data="orderProgressTrend" v-if="orderProgressTab.active == 'b'" ></BarLine>
			</div>
		</van-tab>
	</van-tabs>
</div>

<script>
	    updateActive(type, id) {
      console.log('updateActive>type,id>',type,id)
      if (type == 'order' && this.order.active != id) {
        this.order.active = id;
      } else if (type == 'progress' && this.progress.active != id) {
        this.progress.active = id;
        if(this.progress.active == '1') {
          this.progress.activeName = '订单';
        } else if (this.progress.active == '2') {
          this.progress.activeName = '铁塔';
        } else if (this.progress.active == '3') {
          this.progress.activeName = '机房';
        }
      }
    },  
    //切换
    handleChangeTabs: debounce(function(type, id) {
      console.log('handleChangeTabs>>type,id>>', type,id)
      this.barLineKey++;
      this.linesChartKey++;
      if (type == 'order') {
        if (this.order.active == id) {
          // this.order.active = id
          this.getSummaryData()
          this.getLinesData()
          this.getBarLineData()
        }
      } else if (type == 'progress') {
        if (this.progress.active == id) {
          // this.progress.active = id
          // if(this.progress.active == '1') {
          //   this.progress.activeName = '订单'
          // } else if (this.progress.active == '2') {
          //   this.progress.activeName = '铁塔'
          // } else if (this.progress.active == '3') {
          //   this.progress.activeName = '机房'
          // }
          this.getOrderProgress()
          this.getOrderChange()
          this.getQrderChangeTotal()
          this.getOrderProgressTotal()
          this.getOrderProgressTrend()
        }
      }
    },300),



		getOrderProgressTotal() {
      if (this.cancelTokenSources.orderProgressTotal) {
        this.cancelTokenSources.orderProgressTotal.cancel('Cancelled the previous request');
      }

      // 创建一个新的CancelToken
      this.cancelTokenSources.orderProgressTotal = axios.CancelToken.source();

      let params = {
        statDate: this.datePicker.selectDate,
        areaId: this.areaId,
        type: this.progress.active
      }

			// 清空数据以避免重复
			  this.orderProgressTotal.dataX = [];
        this.orderProgressTotal.data.forEach((dataset) => {
          dataset.values = [];
        });
      console.log('getOrderProgressTotal>请求开始')
      this.$http.post('/api/quality/curingOverall', params, {
        cancelToken: this.cancelTokenSource.token
      }).then(res => {
        // 请求成功，清空取消令牌源
        this.cancelTokenSource = null;

        // 清空数据以避免重复  <<<<这里注意
        this.orderProgressTotal.dataX = [];
        this.orderProgressTotal.data.forEach((dataset) => {
          dataset.values = [];
        });

        // 处理响应数据
        let list = res.qrAuditupdateData
        list.forEach(item => {
          if (this.progress.active == '1') {
            this.orderProgressTotal.data[0].name = '已起租塔类订单数量'
            this.orderProgressTotal.data[1].name = '沉淀固化塔类订单数量'
            this.orderProgressTotal.data[2].name = '沉淀固化塔类订单占已起租塔类订单比'
          } else if (this.progress.active == '2') {
            this.orderProgressTotal.data[0].name = '铁塔资源数量'
            this.orderProgressTotal.data[1].name = '沉淀固化铁塔资源数量'
            this.orderProgressTotal.data[2].name = '沉淀固化铁塔资源占铁塔资源比'
          } else if (this.progress.active == '3') {
            this.orderProgressTotal.data[0].name = '机房资源数量'
            this.orderProgressTotal.data[1].name = '沉淀固化机房资源数量'
            this.orderProgressTotal.data[2].name = '沉淀固化机房资源占机房资源比'
          }
          this.orderProgressTotal.dataX.push(item.AREA_NAME)
          this.orderProgressTotal.data[2].values.push(item.COL1)
          this.orderProgressTotal.data[1].values.push(item.COL2)
          this.orderProgressTotal.data[0].values.push(item.COL3)
      }).catch(error => {
        if (axios.isCancel(error)) {
          console.log('请求被取消', error.message);
        } else {
          // 处理错误
          console.error('发生错误：', error);
        }
      })
    },
</script>

```


### 处理方式
为了避免竞态条件，可以采取以下措施：

- 使用互斥锁（mutex）或其他同步机制来控制对共享资源的并发访问。
- 使用取消令牌（cancel tokens）来取消之前的请求，确保只有最新的请求会更新数据。
- 在每次请求开始之前清空数据，以确保不会有旧数据残留。
- 在更新数据时进行适当的检查，以确保只处理预期的响应。



## axios处理数值会将小数点后的0处理掉
### 概述
> https://github.com/axios/axios/issues/2279

axios在处理返回数据时,会调用`JSON.parse()`方法.
处理方法:
* 让后端返回字符串
* 可以调用方法`Number.prototype.toFixed(n)`来强制处理数据


