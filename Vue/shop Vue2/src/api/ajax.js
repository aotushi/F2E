// 对axios进行二次封装, 让axios发请求时具有其他功能

// 配置基础路径和超时时间
// 添加进度条信息 nprogress
// 返回响应不再需要从data属性中拿数据,而是响应就是我们要的数据;
// 统一处理请求错误, 具体请求也可以选择处理或不处理

import axios from "axios";
import NProgress from "nprogress";
import "nprogress/nprogress.css";


const service = axios.create({
	baseURL: "/api", //设置当前项目当中所有接口路径中的公共路径,基础路径
	timeout: 20000, // 请求超时会报错
});

// 添加进度条功能
// 若添加额外功能, 必然用到请求拦截器和响应拦截器  直接github上拷贝更改

// Add a request interceptor
service.interceptors.request.use(
	function (config) {
		// Do something before request is sent
		NProgress.start();
		return config
	},
	function (error) {
		// Do something with request error
		return Promise.reject(error);
	}
);

// Add a response interceptor
service.interceptors.response.use(
	function (response) {
		// Any status code that lie within the range of 2xx cause this function to trigger
		// Do something with response data
		NProgress.done();

		return response.data;
	},
	function (error) {
		// Any status codes that falls outside the range of 2xx cause this function to trigger
		// Do something with response error
		NProgress.done();
		// return Promise.reject(error);

		// 统一处理错误
		console.log("发送ajax请求失败" + error.message || "未知错误");

		// 统一处理完成之后, 这个错误可以让后面继续处理,也可以不让后面继续处理
		return Promise.reject(new Error("发送ajax请求失败"));

		// 后面不继续处理 终端promise链
		// return new Promise(() => { })
	}
);


export default service
