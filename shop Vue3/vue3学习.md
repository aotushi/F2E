### 尚硅谷教程 & 掘金教程

> [139_尚硅谷Vue3技术_分析工程结构_哔哩哔哩_bilibili](https://www.bilibili.com/video/BV1Zy4y1K7SH?p=139&vd_source=0a44ae8faaf24c34689c5c4ff8731349)



### 工程结构分析

#### 关闭语法检查

和vue2中的设置相同

* 根目录下新建vue.config.js
* 添加以下语法

```js
module.exports = {
  lintOnSave: false, //关闭语法检查
  //...
}
```



#### 入口文件中的app

```js
//main.js

import {createApp} from 'vue'
import App from './App.vue'

//创建应用实例对象-app,类似之前Vue2中的vm,但app更轻,挂载在其身上的属性更少
const app = createApp(App)

//挂载
app.mount('#app')
```





#### App.vue文件

vue3组件中的模板结构可以没有根标签







### 安装开发者工具

Chrome中的vue.js devtools

vue2和vue3是不同的插件, 可以同时安装



### 初识setup

































