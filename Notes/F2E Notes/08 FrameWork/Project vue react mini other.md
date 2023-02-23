## vue前台项目

### 能说的点

*  编程式路由跳转到当前路由(参数不变), 多次执行会抛出NavigationDuplicated的警告错误

*  axios二次封装

* 三级分类列表卡顿解决(lodash)

* 三级分类列表页面跳转3种方案及选择

  

* mock数据的使用

* swiper轮播图的使用及问题解决



*  search页-(综合/价格)点击排序设置: 根据点击来展示不同的背景色和iconfont图标
*  search页 - 分页器组件



*  detail组件 使用排它思想实现背景色的切换
* detail组件  图片放大镜
* detail组件 添加购物车



* 购物车页面 修改数量判断
* 购物车页面 修改多个选中状态
* 购物车页面 进入组件发请求获取数据为空的原因及解决



* 支付页面 支付流程
* 支付页面 轮训订单支付状态



* 登录页 全局路由守卫



* 优化 图片/路由懒加载  前端表单验证使用库vee-validate







### 数据API

[商品分类--ShowDoc](https://www.showdoc.com.cn/128719739414963?page_id=2516997897914014)





### 项目创建

#### 脚手架创建项目



#### 认识项目目录及各个项目作用



#### main.js基本编码



### 项目配置

#### assets和public文件夹区别

```
assets存放组件共用资源,后期会被webpack处理, 而public不会.
public代表根路径,后期打包的dist文件夹
```



#### eslint禁用

默认项目中安装了eslint语法检查工具,严格级别高. 开发阶段需要禁用eslint.否则语法上问题,导致项目经常操作

如何禁用?

* 创建脚手架webpack配置文件  `vue.config.js`
* 项目重启

```js
vue.config.js中配置lintOnSave:false
module.exports = {
	lintOnSave: false, //禁用eslint
}
```



#### `@`代替具体路径

#### 作用

别名的作用,代表的是我们`src`文件夹的路径

#### 配置

##### 1.更改路径

一般是将src文件夹改成缩写

```javascript
//原写法
import App from 'src/App.vue'
```



```javascript
//新写法
import App from '@/App.vue'   //此时输入@符后,是没有自动提示的
```



##### 2.配置@的提示

根目录创建`jsconfig.json`文件,并配置别名@提示	

```json
{
  "compilerOptions": {
    "baseUrl": "./",
    "paths": {
        "@/*": ["src/*"]
    }
  },
  "exclude": ["node_modules", "dist"]
}
```



#### 其他

想看webpack相应版本的文档

如何查看vue-cli脚手架创建的项目搭配的webpack版本?

> 扩展 search node_modules
>
> 搜索webpack 查看关键字version
>
> 现在版本是5.72.1

通过查询[解析(Resolve) | webpack 中文文档 (docschina.org)](https://webpack.docschina.org/configuration/resolve/#resolvealias)来具体配置

##### resolve.alias

创建 `import` 或 `require` 的别名，来确保模块引入变得更简单。例如，一些位于 `src/` 文件夹下的常用模块：



#### jsconfig.json配置文件

> [VScode的jsconfig.json配置文件说明 - 掘金 (juejin.cn)](https://juejin.cn/post/7079769333471117343)
>
> [jsconfig.json Reference (visualstudio.com)](https://code.visualstudio.com/docs/languages/jsconfig)  vscode下的配置文件

##### 是什么

* `jsconfig.json`表明其所在目录为JS项目的根目录
* `jsconfig.json`文件指定根目录文件及通过JS语言服务提供的特别选项



##### 原因

* 显式的项目. 

> A JavaScript project is defined via a `jsconfig.json` file. The presence of such a file in a directory indicates that the directory is the root of a JavaScript project. The file itself can optionally list the files belonging to the project, the files to be excluded from the project, as well as compiler options (see below).



##### 实例

Using the "exclude" property

> The `exclude` attribute (a glob pattern) tells the language service what files are not part of your source code. This keeps performance at a high level. If IntelliSense is slow, add folders to your `exclude` list (VS Code will prompt you to do this if it detects the slow down).

```json
//vscode文档实例

{
  "compilerOptions": {
    "module" : "commonjs",
    "target": "es6"
  },
  "exclude": ["node_modules"]
}

//vue-cli脚手架生成实例
{
  "compilerOptions": {
    "target": "es5",
    "module": "esnext",
    "baseUrl": "./",
    "moduleResolution": "node",
    "paths": {
      "@/*": [
        "src/*"
      ]
    },
    "lib": [
      "esnext",
      "dom",
      "dom.iterable",
      "scripthost"
    ],
  }
}
```



Using the "include" property

> If no `include` attribute is present, then this defaults to including all files in the containing directory and subdirectories. 
>
> When a `include` attribute is specified, only those files are included.
>
> Tips: The file paths in `exclude` and `include` are relative to the location of `jsconfig.json`.

```json
{
  "compilerOptions": {
    "module": "commonjs",
    "target": "es6"
  },
  "include": ["src/**/*"]
}
```



##### 使用webpack 别名

For IntelliSense to work with webpack aliases, you need to specify the `paths` keys with a glob pattern.

For example, for alias 'ClientApp':

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "ClientApp/*": ["./ClientApp/*"]
    }
  }
}
```

and then to use the alias

```
import Something from 'ClientApp/foo';
```



##### 最佳实践

> **Tip:** If you do not have a `jsconfig.json` in your workspace, VS Code will by default exclude the `node_modules` folder.



下面是一个将常见项目组件映射到其安装文件夹的表，建议将其排除在外：

| 组件                        | 要排除的文件夹             |
| --------------------------- | -------------------------- |
| node                        | 排除node_modules文件夹     |
| webpack, webpack-dev-server | 排除内容文件夹，例如dist。 |
| bower                       | 排除bower_components文件夹 |
| ember                       | 排除tmp和temp文件夹        |
| jspm                        | 排除jspm_packages文件夹    |





### git基本操作

#### git介绍

```
git基本操作
		先有本地代码
			创建本地库
			创建远程库
			关联本地和远程
			修改本地
			修改远程

		先有远程代码
			直接克隆



	git分支扩展
		分支创建和合并
			本地创建分支   git checkout -b dev
			本地推送新分支自动在远程库建立新分支  git push origin dev
			合并分支之前如果是多人协作先拉取一下远程master，以防止别人已经做了更改
			本地切换到master 然后再合并分支  git merge dev 
			合并之后再次推送到远程master
		分支删除
			项目开发完成可以删除分支		  
			git push origin --delete dev  删除远程分支
			git branch -d dev  删除本地分支 
```



```bash
//项目操作
git init // 创建本地库
xxx      // 创建远程库
git remote add origin xxx.git //本地库关联远程库   origin是远程库的别名
git add .                     //放到暂存区
git commit -m "update"        //提交到仓库区  单引号在git中会被视作提交信息的一部分
git push origin master        //推送到origin地址中的master分支上
```



```bash
//如何撤销git add操作
git reset HEAD 整体回到上一次操作
```



#### 工程化下的git提交规范

> [代码规范 | 带你入门前端工程 (gitee.io)](https://woai3c.gitee.io/introduction-to-front-end-engineering/02.html#git-规范)





### 页面

#### 路由组件和非路由组件文件结构

非路由组件一般放在**src/coponents**文件夹下

路由组件一般放置在**src/pages|views**文件夹下



#### 路由组件和非路由组件区别

相同:使用都是3大步:定义-注册-使用;
不同:

​	存储文件夹不同;
​	注册的文件夹不同(非路由注册在要使用的组件中,路由组件在路由配置中注册);
​	使用(非路由使用组件标签, 路由组件使用声明式(router-link,view)+编程式导航(push replace)来使用);
​	生命周期不一样(路由组件在切换时会销毁重建(keep-alive),非路由组件不会)



#### 通过判断路径隐藏页面

案例: 登录页面和注册页面不需要显示footer组件

使用路由对象中的元配置 meta. 可以配置任意选项

```html
//写法繁琐 不推荐 避免变的很长

<div>
  <Header></Header>
  <router-view></router-view>
  <Footer v-show="$route.path !== '/login' && $route.path !== '/register'"></Footer>
</div>


//推荐
<div>
  <Header></Header>
  <router-view></router-view>
  <Footer v-show="!$route.meta.isHidden"></Footer>
</div>
```





### 面试题

```js

1: 描述: 编程式路由跳转到当前路由(参数不变), 多次执行会抛出NavigationDuplicated的警告错误
声明式路由跳转内部已经处理

原因：vue-router3.1.0之后, 引入了promise的语法.如果没有通过参数指定成功或者失败回调函数就返回一个promise且内部会判断如果要跳转的路径和参数都没有变化,会抛出一个失败的promise

解决: 
1：在跳转时指定成功或失败的回调函数, 或者catch处理错误
2: 修改Vue原型上的push和replace方法 (优秀)


5)面试问题3: 指定params参数时可不可以用path和params配置的组合?（对象写法）
不可以用path和params配置的组合, 
只能用name和params配置的组合,query配置可以与path或name进行组合使用


4)面试问题2: 如何指定params参数可传可不传  
    path: '/search/:keyword?'  //?代表params参数可传可不传

6)面试问题4: 如果指定name与params配置, 但params中数据是一个"", 无法跳转，路径会出问题
前提是路由params参数要可传可不传
解决1: 不指定params
解决2: 指定params参数值为undefined  使用params:this.keyword||undefined **


7)面试问题5: 路由组件能不能传递props数据?
    可以: 可以将query或且params参数映射/转换成props传递给路由组件对象
实现: props: (route)=>({keyword1:route.params.keyword, keyword2: route.query.keyword })
```



### 重写push/replace

```js
//练习 重写router中的push,replace方法

import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '.@/pages/home';

const originPush=VueRouter.prototype.push;

VueRouter.prototype.push=function(location, onResolve, onRejected){
    if(onResolve===undefined && onRejected===undefined){
        return originPush.call(this, location).catch(()=>{})
    }else{
        return originPush.call(this,location,onResolve, onRejected)
    }
}

//replace

Vue.use(VueRouter);

const router=new VueRouter({
    routes:[
        {
            path:'/home',
            component:Home
        }
    ]
})
```



### 二次封装axios 添加配置

// 配置基础路径和超时时间
// 添加进度条信息 nprogress
// 返回响应不再需要从data属性中拿数据,而是响应就是我们要的数据;
// 统一处理请求错误, 具体请求也可以选择处理或不处理

```javascript
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

		return config;
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
```



### 接口请求函数书写及如何测试

#### axios使用

##### 用法分类

* 函数用法
* 对象用法

##### 3种参数

params参数 query参数 请求体参数

params参数: 在URL中携带,属于路径一部分

query参数: 可以在URL中携带以`?`分隔; 也可以在配置对象中配置,配置的属性名叫做`params`

请求体参数: 在配置对象当中的data里配置,请求方式是put和post才有请求体参数

```javascript
//query参数
axios({
  url: 'localhost:8800/userinfo/1?name=aaa'
  method: 'post'
})

axios({
  url: 'localhost:8800/userinfo/1?name=aaa'
  method: 'post',
  params: {
  // 代表的是query参数
  	name: 'aaa'
	}
})

//请求体参数
axios({
  url: 'localhost:8800/userinfo/1?name=aaa'
  method: 'post',
  params: {
  // 代表的是query参数
  	name: 'aaa'
	},
  data: {
  // 请求体参数
  
  }
})
```



### 验证请求成功的两种方法

验证请求是否成功

```javascript
//1 直接在定义请求的地方直接调用

export const reqCategoryList = () => {
  return request({
    url: '/product/getBaseVategoryList',
    method: 'get'
  })
}

reqCategoryList()  // 在这里调用, 得把模块引入到main中: import "@/api"


//2 main.js中直接引入请求

import {reqCategoryList} from '@/api'
reqCategoryList()
```



### 404错误 跨域

测试ajax请求机解决跨域问题
返回404需要解决跨域
配置代理服务器解决跨域问题

```javascript
//vue.config.js

webpack4文档 devServer.proxy
```









### 路径改变切换路由组件的过程

```js
//第一步: 用户改变路径


//第二步: 匹配路由组件
当用户改变路径,这个路径就会到路由器中的路由数组内部与路由对象的路径进行匹配. 匹配到就显示对应路由组件.

//第三步: 切换显示刚匹配成功的路由组件
显示组件的同时会把刚匹配的路由对象, 也放在这个组件的$route中.  ** 都能在里面找到设置的信息.
```











### vuex中使用modules模块

```js
//modules代表模块化 将不同组件的数据放在不同的模块中

1.组件之间的解构
//home.js
const state = {}
const mutations = {}
const actions = {}
const getters = {}

export default {
  state,
  mutations,
  actions,
  getters
}


2.总vuex模块结构,其他vuex模块结构/写法



3.导入与使用
import home from './home'
import user from './user'

const store=new Vuex.Store({
    state,
    actions,
    mutations,
    modules:{
        home,
        user
    }
})

4.总store模块中state写法

module中的数据最后还是会合并到总的store对应的里面去 例如state合并到state中去, getters合并到getters中去

// store合并 小的store(每个模块对应的小的store)

合并注意事项: 除了state,其他三项(getters,mutations,actions)和原来形式一样.
合并前后区别:如果没有模块化,那么home和user组件中的4个数据都在总的store的state内部存储

如果一旦模块化,那么home和user中的state,可以合并到总的store内部.其它还是原来的形式:
const state={
    user:(a,b),
    home:(c,d)
}

cosnt getters = { //index.js中的getters
  xx  //home/getters中的数据 可以在这里访问到
}


```









### 鼠标移入时动态添加背景色

```js
//动态样式代替css中的hover, 样式类名不确定用不用,所以使用对象写法
//这种思想很重要,需要多次回顾

<div 
	class="item" 
	v-for="(c1, index) in categoryList"
	:key="c1.categoryId"
	:class="{item_on= currentIndex===index }"  //绑定动态样式,类名不确定要用对象形式
	@mouseenter="currentIndex=index"		   // 绑定移入事件,赋值
/> 
```

### 鼠标移出时消除背景色

如果没有设置消除背景色, 那么鼠标移出时最后的哪个div依然会保留背景色

<u>给父元素添加移出事件</u>

```html
<div @mouseleave="currentIndex = -1">
  <h2 class="all">全部商品分类</h2>
  <div class="sort">
    <div class="all-sort-list2">
      <div
           class="item"
           :class="{ item_on: currentIndex === index }"
           v-for="(c1, index) in categoryListSumIs15"
           v-bind:key="c1.cat_id"
           @mouseenter="currentIndex = index"
           >
        <h3>
          <a href="">{{ c1.cat_name }}</a>
        </h3>
        <div class="item-list clearfix">
          <div class="subitem">
            <dl class="fore" v-for="(c2, index) in c1.children" :key="c2.cat_id">
              <dt>
                <a href="">{{ c2.cat_name }}</a>
              </dt>
              <dd>
                <em v-for="(c3, index) in c2.children" :key="c3.cat_id">
                  <a href="">{{ c3.cat_name }}</a>
                </em>
              </dd>
            </dl>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
```









### 3级分类列表卡顿及解决

商品分类鼠标快速移入移出, 浏览器出现卡顿现象. 使用防抖和节流处理.  使用库lodash

lodash是已经存在的依赖包, 可以通过`search_modules`搜索确认

使用lodash时, 只引入所需的函数/功能



#### 函数防抖/节流

##### 函数防抖的应用场景:

连续的事件,只需触发一次的回调的场景有:

* 搜索框搜索输入.只需要用户最后一次输入完,再发请求
* 手机号,邮箱验证码输入监测
* 窗口大小Resize. 只需要窗口调整完成后,计算窗口大小.防止重复渲染

##### 函数节流的应用场景:

间隔一段时间执行一次回调的场景有:

* 滚动加载,加载更多或滚动到底部监听
* 谷歌搜索框,搜索联想功能
* 高频点击提交,表单重复提交.



#### throttle

两种引入形式. 及参数的具体含义

按需引入lodash减少打包体积

解决使用lodash节流后，快速移出后，可能还会显示某个子项
	{ 'trailing': true,leading:false}

'trailing': 是否在时间间隔之后执行函数
leading： 是否在时间间隔之前执行函数

```js
import _ from 'lodash'

methods: {
  moveInItem: _.throttle(function(index) {
    this.currentIndex = index
    console.log(index)
  }, 20, { 'trailing': false})
}

// 
import throttle from 'lodash/throttle'

methods: {
  moveInItem: throttle(function(index) {
    this.currentIndex = index
    console.log(index)
  }, 20, { 'trailing': false})
}
```





### 页面跳转实现的3种方式及选择

#### 实现

页面三级分类列表 和搜索框 跳转, 通过3种方式来跳转

* 每个a标签链接更改为`router-link`
* 将`router-link`改为编程式导航`$router.push({name:'search', query:{}})`
* 使用事件委托 + 自定义属性 来代替多个`$router.push`



#### 存在的问题

当`<a>`标签改为`<router-link>`后, 会出现卡顿现象

##### 原因

渲染组件标签时候, 其本质是通过和标签名绑定好的构造函数,实例化了一个对象, 称作是组件对象.

多层vfor循环中多个\<router-link>标签产生了多个组件, 内存占用大, 卡顿

#### 解决1-编程式导航代替声明式导航

使用编程式导航代替声明式导航

```html
<div
							class="item"
							:class="{ item_on: currentIndex === index }"
							v-for="(c1, index) in categoryListSumIs15"
							v-bind:key="c1.cat_id"
							@mouseenter="moveInItem(index)"
						>
							<h3>
								<!-- <a href="">{{ c1.cat_name }}</a> -->
								<!-- <router-link
									:to="{
										name: 'search',
										query: { c1Id: c1.cat_id, c1Name: c1.cat_name },
									}"
									>{{ c1.cat_name }}</router-link
								> -->

								<a
									href="javascript:;"
									@click="
										$router.push({
											name: 'search',
											query: { c1Id: c1.cat_id, c1Name: c1.cat_name },
										})
									"
									>{{ c1.cat_name }}</a
								>
							</h3>
```





#### 解决2 - 事件委托

每个a标签都添加了点击事件, 内存中会定义很多个函数,内存占用也是比较大,效率虽然比声明式导航大,但是不够好. 使用<u>事件委托</u>来代替



每个分类项都添加事件，事件的回调函数很多，效率也不好
在共同的祖先级元素添加事件监听
		问题：怎么知道点击的是不是a标签
		问题：假设你点击的就是a标签，怎么知道点击的是一级还是二级还是三级
		问题：参数怎么携带，要携带携带哪些个的参数



利用在a标签中添加自定义属性来解决以上问题

##### 自定义属性(data-)

```js
//为html标签添加自定义属性,结构是data-xxx="..."
标签的data-开头的属性，叫做自定义属性,通过它我们可以给标签添加上自定义的属性.
获取:通过事件属性 event.target.dataset来获取这个属性.

注意:Vue会把自定义属性的大写变为小写.

```



### 一级列表自动隐藏

	1、typeNav这个组件在home当中一上来是显示sort的，在search当中一上来就要隐藏sort，sort需要使用v-show
		在组件mouted的时候，需要添加判断是不是search，如果是search页面，需要把isShow改为false
	
	2、移入search页面的全部商品分类，sort是要显示的，移出以后sort又是要隐藏的
		移入的时候：需要在原来自己添加的div身上，再去添加移入事件，让isShow变为true
		移出的时候：原来自己添加的div身上我们已经写过移出事件，但是逻辑需要添加，修改为回调函数去做
				移出的时候页得去判断是不是在search移出，如果是也得需要内藏sort





#### 显示隐藏一级列表的过渡效果添加

首先谁要加过渡就看谁在隐藏和显示
	需要放在transition标签内部，name需要起名字
	参考官方给的过渡图
	移入的时候是有过渡的
	移出的时候立马隐藏的
	注意：高度也是变化的

```html
&.sort-enter {
height: 0;
opacity: 0;
}
&.sort-enter-to {
height: 461px;
opacity: 1;
}
&.sort-enter-active {
transition: all 2s;
}
```



#### 优化typeNav数据ajax请求次数，改变请求的位置

首页和search页面进入都会发送一次数据请求. 没有必要

之前我们是在typeNav组件内部dispatch去发送ajax请求，这样的话.	因为typeNav是被多个页面公用的，所以每次切换到一个页面，这个组件都会重新创建  mounted都会执行.	因此有几个页面公用了这个typeNav就会执行几次ajax请求, 所以我们放到App里面就只用执行一次，因为数据一样，没必要多次请求

```javascript
```



### 合并分类的query参数和搜索关键字的params参数

找到对应组件
	点击search按钮的时候，去看看有没有query参数
	点击类别选项的时候，去看看有没有params参数
	注意：我们点击搜索的时候关键字使用的是params参数
	点击类别选项的时候我们的参数使用的是query参数



跳转之前要合并params和query参数

```vue
<div>
  <h3>
    <a
    	href="javascript:;"
      :data-c1Id="c1.cat_id"
      :data-cName="c1.cat_name"
    >{{c1.cat_name}}</a>
  </h3>
</div>
```



```javascript
// Header组件的button按钮
		toSearch() {

			let location = {
				name: 'search',
				params: {keyword: this.keyword || undefined}
			}

			if (this.$route.query) {
				location.query = this.$route.query
			}
			this.$router.push( location);
		}
      
      
// TypeNav组件中的   
		// 事件委派 函数
		toSearch(event) {
			// event是什么 每一次触发事件时,系统(浏览器内核)都会把这一次触发事件相关的所有信息,封装为一个对象. 在浏览器调用回调函数的时候, 自动传递给回调函数的第一个形参
			// 回调函数 自己定义 自己没调用 最后执行了.  所以toSearch在html中可以不用括号 vue中的回调参数顺序可以改变,但原生的不能改
			// event 是浏览器调用函数传递过来的事件对象, 代表你传递的$event, 只能在模板里出现

			let targetNode = event.target; // 获取目标元素
			let data = targetNode.dataset;
			console.log("data", data);
			let { c1id, c2id, c3id, cname } = data;

			if (cname) {
				// cname存在, 证明点击的就是a标签
				let location = {
					name: "search",
				};
				let query = {
					cName: cname,
				};

				// 确定是几级的ID
				if (c1id) {
					query.c1Id = c1id;
				} else if (c2id) {
					query.c2Id = c2id;
				} else {
					query.c3Id = c3id;
				}

				location.query = query;
				// 跳转之前, 要合并原来过来时的params参数
				if (this.$route.params) {
					location.params = this.$route.params
				}
				this.$router.push(location);
			}
		},
```









### mock数据

#### 官网及介绍

mockjs.com

作用:生成随机数据,拦截ajax请求



#### 使用

```js
1.新建文件夹 src/mock 准备数据新建文件xxx.json  floor.json banner.json
2.安装mock模块 yarn add mockjs
3.创建src/mock/mockServer.js
	Mock.mock('/mock/banner',{code:200,data:banner}) //第一个参数，代表我们以后请求的路径，第二个参数代表返回的数据
4.在main.js中引入 import '@/mock/mockServer'
5.ajax文件中,新建mockAjax.js文件, 复制ajax.js中的内容, 但是基础路径改为/mock  // 不会向后台发送数据
```





#### 轮播图图片使用mock数据

注意根路径是在哪里 public文件夹

注意: 如果路由是采用history模式的话, 使用相对路径会出现错误 ??? (未验证) 所以建议,在public中link引入的初始化css使用绝对路径

```html
<div class="swiper-wrapper">
  <div class="swiper-slide" v-for="(banner, index) in bannerList" :key="banner.id">
    <!-- <img src="./images/banner1.jpg" /> -->
    <img :src="banner.imgUrl" />   imgUrl的值是绝对路径 "/images/banner1.jpg" 是相对于public文件下的路径
  </div>
</div>


<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width,initial-scale=1.0">
  <link rel="icon" href="<%= BASE_URL %>favicon.ico">
  <link rel="stylesheet" href="/css/reset.css">   // <-- here 去掉点号, 相对路径变绝对路径
  <title><%= htmlWebpackPlugin.options.title %></title> 
</head>
```





### floor数据请求在哪里?

是有两个Floor组件, 在父组件home中请求floor数据,通过props传递给floor

```html
<GoodsFloor v-for="(floor, index) in floorList" :key="floor.id" :floor="floor"></GoodsFloor>
```



### swiper轮播图使用

#### 各版本与相关的vue

> [swiper，vue中swiper的应用，swiper各个版本在vue项目中应用-爱代码爱编程 (icode.best)](https://icode.best/i/14635947330804)

swiper7、8不能在vue2中使用





#### 使用

> [Swiper使用方法 - Swiper中文网](https://www.swiper.com.cn/usage/index.html)



#### 注意事项

1.swiper必须在页面的数据结构显示完成创建才会生效
2.组件中引入swiper的js模块,main中引入css样式,(通过search node_modules查询路径)

```js
1、安装 
2、引入js和css
3、书写swiper的结构
4、实例化swiper实例对象

```



#### 存在问题

swiper实例化的时候, 页面显示还不一定成功

swiper创建的时间应该是在页面列表创建之后才会有效果. 静态页面是没问题的, 静态页面不需要等待数据，因此mounted完全可以去创建swiper. 现在我们的数据是动态的，mounted内部去创建，<span style="color:red">数据还没更新到界面上</span>，因此无效.可以使用延迟定时器去创建 但是不好

```html
<body>
  
</body>


<script>
  export default {
    name: '',
    mounted() {
      this.$store.dispatch('getBannerList') 						//异步代码
  
      //页面结构中的swiper-slide, 是根据请求回来的数据, 动态创建生成的.要保证请求回来的数据获取后,再实例化.
      new Swiper ('.swiper', { 													//同步代码. 先执行,在最终结构形成之前就实例化了,所以搞不定
        // direction: 'vertical', // 垂直切换选项
        loop: true, // 循环模式选项

        // 如果需要分页器
        pagination: {
          el: '.swiper-pagination',
        },

        // 如果需要前进后退按钮
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },

        // 如果需要滚动条
        scrollbar: {
          el: '.swiper-scrollbar',
        },
      })  
    }
  }
</script>
```





#### 解决swiper影响多个页面bug

但同时页面上多个组件的轮播图都生效了,因为多个组件中的轮播图样式class名称都相同. 解决:ref. this.$refs.xxx

通过选择器可以指定哪个地方需要，但是不好. 通过ref最好



#### 解决swiper失效

##### 定时器获取swiper的数据

```html
<div class="swiper-container" ref="bannerSwiper">
  
</div>


<script>
// 使用定时器解决没有拿到数据的问题
setTimeout(() => {
  new Swiper(this.$refs.bannerSwiper, {
  	//...
	})
}, 2000)

</script>
```

##### watch + this.$nextTick

Vue.nextTick 和 vm.$nextTick 效果一样
nextTick是在最近的一次更新dom之后会立即调用传入nextTick的回调函数

```javascript
// 没有添加nextTick
export default {
  name: '',
  mounted() {},
  watch: {
    bannerList: {
      handler(newVal, oldVal) {
        // 当数据变化, 就去实例化swiper. 但是发现不行.
        // 因为有了数据,上面页面才开始v-for形成结构, 得等结构完全形成之后再去实例化
        new Swiper(this.$refs.bannerSwiper, {
          //...
        })
      }
    }
  }
}

// 搭配使用nextTick
export default {
  name: '',
  mounted() {},
  watch: {
    bannerList: {
      handler(newVal, oldVal) {
        // nextTick是页面最近一次更新完成之后才会执行
        this.nextTick(() => {
          new Swiper(this.$refs.bannerSwiper, {
          	//...
        	})
        })
      }
    }
  }
}
```



### 封装轮播图组件 slideLoop

listContainer组件和floor组件中都使用了相同的代码. 把公共代码提取出来组成公共的组件

```javascript
定义可复用的轮播组件
	banner是在watch当中去创建swiper 因为组件创建的时候数据不一定更新
	floor是在mounted当中去创建swiper，因为内部组件创建的时候，数据已经存在了

	
	1、同一个组件  有好几个地方js代码是一样的                 封装函数   
 
 	2、不同的组件  有好几个地方js代码是一样的                 封装模块（vue中还能封装混入（混合）） 

	3、不同的组件  有好几个地方 html css  js都是一样的        封装组件 （html,css,js的混合体，混合件）

```



### Search页面

#### 请求数据

请求方法放到methods中, mounted直接调用方法

```javascript
methods: {
  getSearchInfo() {
    this.$store.dispatch("getSearchInfo", this.searchParams);
  }
}

mounted() {
  this.getSearchInfo()
}
```

dispatch方法的参数以载荷和对象形式分发

```javascript
this.$store.dispatch('getSearchInfo', {a:10})

this.$store.dispatch({
  type: 'getSearchInfo',
  a: 10
})
```



在点击三级分类或点击搜索按钮跳转过来之前, 把对应的三级分类名称和id或关键字keyword, 拿到添加到searchParams对应的搜索项当中去

```javascript
beforeMount() {
  this.handleSearchParams()
  let searchParams = {}
}

methods: {
 		// 封装函数handlerSearchParams, 因为重复出现在beforeMount和watch函数中.
		handlerSearchParams() {
			let {
				category1Id,
				category2Id,
				category3Id,
				categoryName,
			} = this.$route.query;

			let { keyword } = this.$route.params;

			// 可以保证当前searchParams一定包含了点击传递过来的搜索条件
			let searchParams = {
				...this.searchParams,  //浅拷贝最简单的形式
				category1Id,
				category2Id,
				category3Id,
				categoryName,
				keyword,
			};
			// 使用forEach(将对象属性转换为数组)循环对象,判断是否有空值,变为undefined.不传送,节省带宽.
			Object.keys(searchParams).forEach((key) => {
				if (searchParams[key] === "") {
					delete searchParams[key];
				}
			});
			this.searchParams = searchParams;
		},
}
```



#### search页面改变关键字无法重复发请求的bug

也就是复用组件时, 组件声明周期钩子不再调用, 需要根据路由参数变化来操作(3种方法: watch  beforeRouteUpdate  routeKey)

```javascript
watch: {
		$route() {
			this.handlerSearchParams();
			this.getSearchInfo();
		},
	},
```



#### 动态显示搜索条件和删除搜索条件后重新发送请求获取搜索数据

```javascript
		// 删除分类名称
		removeCategoryName() {
			this.searchParams.category1Id = undefined;
			this.searchParams.category2Id = undefined;
			this.searchParams.category3Id = undefined;
			this.searchParams.categoryName = undefined; // '' 空串也会被发送, 但是undefined不会发送请求
			// this.getSearchInfo();
			// 更新页码
			this.searchParams.pageNo = 1;
			// 更新路径后删除相应参数 只保留了params参数
			this.$router.replace({
				name: "search",
				params: this.$route.params,
			});
		},

		// 删除关键字搜索条件,重新发送请求
		removeKeyWord() {
			this.searchParams.keyword = undefined;
			this.$bus.$emit("clearKeyword"); // 通知header组件清除关键字
			// this.getSearchInfo();
			// 更新页码
			this.searchParams.pageNo = 1;
			this.$router.replace({ name: "search", query
      : this.$route.query });
		},

		// 删除品牌,重新发请求
		removeTrademark() {
			this.searchParams.trademark = undefined;
			// 更新页码
			this.searchParams.pageNo = 1;
			this.getSearchInfo();
		},
```



#### 解决删除关键字后, 输入框没有更新输入; 

涉及组件间通信, 使用全局事件总线

search组件

```javascript
		// 删除关键字搜索条件,重新发送请求
		removeKeyWord() {
			this.searchParams.keyword = undefined;
			this.$bus.$emit("clearKeyword"); // 通知header组件清除关键字    //<-- here
			// this.getSearchInfo();
			// 更新页码
			this.searchParams.pageNo = 1;
			this.$router.replace({ name: "search", query
      : this.$route.query });
		},
```



header组件

```javascript
	methods: {
		clearKeyword() {
			this.keyword = "";
		},
	},
    
    
	mounted() {
		this.$bus.$on("clearKeyword", this.clearKeyword);
	},
```



#### 解决删除选中的搜索条件后 路径不变的问题

更新路径后

```javascript
		// 删除分类名称
		removeCategoryName() {
			this.searchParams.category1Id = undefined;
			this.searchParams.category2Id = undefined;
			this.searchParams.category3Id = undefined;
			this.searchParams.categoryName = undefined; // '' 空串也会被发送, 但是undefined不会发送请求
			// this.getSearchInfo();
			// 更新页码
			this.searchParams.pageNo = 1;
			// 更新路径后删除相应参数 只保留了params参数
			this.$router.push({    // 路径变化就发送了请求, 依赖watch中的请求函数
				name: "search",
				params: this.$route.params,
			});
		},
      
      
      
    // 删除关键字搜索条件,重新发送请求
		removeKeyWord() {
			this.searchParams.keyword = undefined;
			this.$bus.$emit("clearKeyword"); // 通知header组件清除关键字
			// this.getSearchInfo();
			// 更新页码
			this.searchParams.pageNo = 1;
			this.$router.replace({ name: "search", query
      : this.$route.query });
		},
```





#### 点击品牌根据品牌来搜索(自定义事件向父组件传递点击的品牌)

使用自定义事件从子组件向父组件传递信息

```javascript
//子组件 searchSelector

    methods:{
      searchForTrademark(trademark){
        // 此回调中,需要更改searchParams参数
        // 发请求获取搜索结果
        // searchparams和发请求数据都在父组件中
        // 设计: 用户点击品牌,将品牌传递给父组件.
        this.$emit('searchForTrademark', trademark);
      },

      // 点击平台属性值的回调
      searchForProps(attrValue, attr){
        this.$emit('searchForProps', attrValue, attr);
      }
    }


// 父组件  search
<SearchSelector 
	@searchForTrademark="searchForTrademark" 

/>

  // 用户点击品牌后,根据品牌搜索重新发请求
  searchForTrademark(trademark) {
  this.searchParams.trademark = `${trademark.tmId}:${trademark.tmName}`;
  // 更新页码
  this.searchParams.pageNo = 1;
  this.getSearchInfo();
},  
```



#### 动态显示品牌搜索条件及删除品牌搜索条件重新发送请求

```javascript
```



#### 按平台属性搜索及属性搜索条件的动态显示和删除逻辑

在`a`标签中使用事件修饰符`.prevent`来阻止默认事件, 或者使用`href="javascript:;"`

```
//子组件 searchSelector

<li v-for="(attrValue, index) in attr.attrValueList" :key="attrValue">
  <a href="javascript:;" @click="searchForProps(attrValue, attr)">{{attrValue}}</a>
</li>


methods: {
	searchForProps(attrValue, attr) {
		this.$emit('searchForProps', attrValue, attr)
	}
}

//父组件 search
<SearchSelector 
	@searchForTrademark="searchForTrademark"
	@searchForProps="searchForProps"
/>

		//用户点击属性后,根据属性重新发送请求
		searchForProps(attrValue, attr) {
			let prop = `${attr.attrId}:${attrValue}:${attr.attrName}`;
			let isRepeate = this.searchParams.props.some(
				(item) => item === prop
			);
			if (isRepeate) {
				return;
			}
			this.searchParams.props.push(prop);
			// 更新页码
			this.searchParams.pageNo = 1;
			this.getSearchInfo();
		},
```



#### 解决点击属性多次根据同一个属性搜索的bug

判断数组中是否已经存在相同的属性

```javascript
		//用户点击属性后,根据属性重新发送请求
		searchForProps(attrValue, attr) {
			let prop = `${attr.attrId}:${attrValue}:${attr.attrName}`;
			let isRepeate = this.searchParams.props.some(
				(item) => item === prop
			);
			if (isRepeate) {
				return;
			}
			this.searchParams.props.push(prop);
			// 更新页码
			this.searchParams.pageNo = 1;
			this.getSearchInfo();
		},
```





#### 解决在搜索页多次跳转后,不能直接返回home的问题

```javascript
查看之前书写的所有跳转路由
如果是搜索页往搜索页去跳转使用replace
如果是home页往搜索页去跳转使用push

//TypeNav  Header
// 如果是从home页跳search页, 就push
// 如果是从search页 跳 search 页, 就replace
if (this.$route.path !== "/home") {
  this.$route.replace(location);
} else {
  this.$router.push(location);
}
// this.$router.push(location);
			
			
//search
this.$route.replace({name: '/search', params: this.$route.params})
```



#### 解决发送请求参数有空串的问题, 发请求前把空串的属性全部删除

携带属性值如果是undefined, 不会发送; 如果是空串, 会发送, 空串的参数也是占网络带宽

赋值searchParams参数之前, 需要对空串进行处理. 使用`Object.keys()`进行处理

```javascript
// search

handlerSearchParams() {
			let {
				category1Id,
				category2Id,
				category3Id,
				categoryName,
			} = this.$route.query;

			let { keyword } = this.$route.params;

			// 可以保证当前searchParams一定包含了点击传递过来的搜索条件
			let searchParams = {
				...this.searchParams,
				category1Id,
				category2Id,
				category3Id,
				categoryName,
				keyword,
			};
			// 使用forEach(将对象属性转换为数组)循环对象,判断是否有空值,变为undefined.不传送,节省带宽.
			Object.keys(searchParams).forEach((key) => {  //<-- here
				if (searchParams[key] === "") {
					delete searchParams[key];
				}
			});
			this.searchParams = searchParams;
		},
```



#### 排序点击之前的处理, 让背景色和图标可以根据数据动态显示及iconfont的在线使用

##### 排序数据的4种情况: 

order: "1:desc"//   排序是根据这个数据来排的
冒号前面代表的是排序标志   1代表综合排序   2代表价格排序
冒号后面代表的是排序类型   asc代表的是升序  desc代表的是降序

##### 动态确定排序项和排序方式

	1、背景色跟谁（是在综合上还是在价格上）  根据数据当中排序标志决定
	2、再让图标可以动态显示 
	  1、用啥图标
	  2、图标什么时候出现    和背景色一样，谁有背景色，那么谁就有图标
	  3、图标是向上还是向下  和数据排序类型相关asc和desc



```html
// public/index.html

<link rel="stylesheet" href="https://at.alicdn.com/t/c/font_3574453_6y5dx43und6.css">
```



```html
<ul class="sui-nav">
  <!-- <li :class="{active:searchParams.order.split(':')[0] ==='1'}"> -->
  <li :class="{ active: sortFlag === '1' }">
    <a
       href="javascript:;"
       @click="changeSort('1')"
       >
      综合
      <i    // 添加i标签, 添加iconfont图标
         v-if="sortFlag==='1'"
         class="iconfont"
         :class="{
                 icondown: sortType === 'desc',
                 iconup: sortType === 'asc',
                 }"
         ></i>
    </a>
  </li>
  <li :class="{ active: sortFlag === '2' }">
    <a
       href="javascript:;"
       @click="changeSort('2')"
       >
      价格
      <i
         v-if="sortFlag === '2'"
         class="iconfont"
         :class="{
                 icondown: sortType === 'desc',
                 iconup: sortType === 'asc',
                 }"
         ></i>
    </a>
  </li>
</ul>
```



```vue

//search组件
<script>
	export default {
    name: 'Search',
    methods: {
      changeSort(sortFlag) {
        //用户点击的是否和的排序标志是否一样

        // 获取原来的排序信息
        let originSortFlag = this.sortFlag
        let originSortType = this.sortType
        let newOrder = ''
        
        //判断用户点击的是否是原来的
        if (sortFlag === originSortFlag) {
          // !originSortType
          newOrder = `${originSortFlag}:${originSortType === 'asc'? 'desc':'asc'}`
        } else {
          // 假设用户点击的排序标志和原来不一样,更新; 
          newOrder = `${sortFlag}:desc`
        }
        this.searchParams.order = newOrder
        this.getSearchInfo()
    	}
    },
    
    computed: {
      sortFlag() {
        return this.searchParams.order.split(":")[0];
      },
      sortType() {
        return this.searchParams.order.split(":")[1];
      },
    }
  }


  
  
</script>
```





#### 阿里图标库使用

```js
使用链接形式

//引入
<link rel="stylesheet" href="https://at.alicdn.com/t/font_xxxx.css">
    
//页面中使用
<i class='iconfont' :class="theiconfontName"></i>  //通过表达式来求true/false
<i class='iconfont theiconfontName' ></i>
```



### search组件--分页器组件

实现静态组件	
	1、去课件当中获取到分页的静态组件
	2、注册组件并渲染静态组件

实现动态组件


	1、分页器组件用处
	第一点：用于展示当前页码
	第二点：用于展示总条数
	第三点：用于展示总页码
	第四点：用于展示连续页数
	第五点: 翻页的功能
		
	2、分页器需要什么数据，怎么来
	  展示当前页码，分页器本身没有，但是父组件有，父组件需要给子组件传
	  用于展示总条数，分页器本身也没有，父组件有，父组件需要给子组件传
	  用于展示总页码，分页器当中也是没有，父组件可以传递总条数和每页的数量给子组件，子组件可以计算
	  用于展示连续页数，分页器也没有这个数量，父组件也得传递这个数字，一般都是奇数(规定的 ???)


​	
​	3、动态组件的逻辑和功能
​	3-1：思考设计 分页组件所需要的从父组件传递的数据是那些（1、当前页码  2、每页数量  3、总数  4、连续页数）  
​	3-2：思考设计 分页内部需要计算的数据：总页数  连续页码的起始和结束
​	3-3：在分页当中开始去计算逻辑





```javascript
 //Pagination
 
 export default {
    name: "Pagination",
    props:{
      currentPageNo:Number,
      total:{
        type:Number,
        default:0
      },
      pageSize:{
        type:Number,
        default:0
      },
      continueNo:{ //连续页是几页
        type:Number,
        required:true
      }
    },
    computed:{
      // 计算总页码
      totalPageNo(){
        return Math.ceil(this.total / this.pageSize)
      },
      // 计算连续页的起始和结束位置   重要!!!
      startEnd(){
        let {continueNo, currentPageNo, totalPageNo} = this;
        let start=0;
        let end=0;

        if(continueNo>=totalPageNo){
          start=1,
          end=totalPageNo
        }else{
          // 正常情况
            start=currentPageNo-Math.floor(continueNo / 2);
            end=currentPageNo + Math.floor(continueNo / 2);

          // 非正常情况
          if(start <= 0){
            // 左侧非正常情况
            start=1
            end=continueNo //end += 1 - start

          }
          if(end>totalPageNo){
            // 右侧非常正情况
            end=totalPageNo
            start=totalPageNo-continueNo+1;
          }
        }

        return {start, end}
      }
    }
  }
```



#### 分页器动态数据的展示

```html
//Pagination

<template>
  <div class="pagination">
    <!-- 上一页不能点击的时候 -->
    <button :disabled="currentPageNo === 1" @click="$emit('changePageNo', currentPageNo-1)">上一页</button>
    <!-- 这个1要显示.  那么start不能是1, 就一定大于1 -->
    <button v-if="startEnd.start!==1" @click="$emit('changePageNo', 1)">1</button>
    <button v-if="startEnd.start>2">···</button>

    <!-- 这里是用来显示连续页的 -->
    <button :class="{active:currentPageNo === page}" v-for="page in startEnd.end" :key="page" v-if="page>=startEnd.start" @click="$emit('changePageNo', page)">{{page}}</button>
    
    <!-- 这三个点, 也不是永远显示的 -->
    <button v-if="startEnd.end < totalPageNo -1">···</button>
    <button v-if="startEnd.end < totalPageNo" @click="$emit('changePageNo', totalPageNo)">{{totalPageNo}}</button>
    <button :disabled="currentPageNo === totalPageNo" @click="$emit('changePageNo', currentPageNo+1)">下一页</button>
    
    <button style="margin-left: 30px">共 {{total}} 条</button>
  </div>
</template>
```



#### 点击按钮实现翻页 

本质上是使用自定义事件把分页器点击的页码传递给父组件,让父组件更改页码重新发送请求

```javascript
//Pagination
@click="$emit('changePageNo', xxx)


//search
		// 分页器点击切换页面的时候,触发的自定义事件
		changePageNo(page) {
			this.searchParams.pageNo = page;
			this.getSearchInfo();
		},
```



#### 修改搜索条件后, 分页都要从第一页开始

```javascript
//Search

removeKeyword() {
  //...
  this.searchParams.pageNo = 1
  //...
}

removeTrademark() {
  //...
  this.searchParams.pageNo = 1
  //...
}

removeProp(index) {
  //..
  this.searchParams.pageNo = 1
  //...
}
```



### detail详情页

#### zoom组件的假报错

    //zoom子组件
    
    <!--  Cannot read property '0' of undefined" 会报这个错，页面又没问题   传过来的是undefined-->
    <!--  Cannot read property imgList of undefined" 会报这个错，页面又没问题  空数组的0项的对象的属性值也是undefined-->
    <!-- <img :src="imgList[0].imgUrl" /> -->



如何处理:

vuex中对`skuInfo`使用'或'操作符,请求回来之前使用空对象代替

父组件取值使用'或'操作符, 获取数据之前使用空数组代替

zoom组件中,使用计算机属性+data来处理`imgList[0].imgUrl`出现undefined问题



```javascript
//Detail父组件

	computed: {
		...mapGetters(["categoryView", "skuInfo", "spuSaleAttrList"]),
		imgList() {
			// 或一个数组的原因. skuInfo是异步请求的数据. 当数据请求回来之前,这个值就是undefined. 添加或空数组,
      //确保最后不是undefined,浏览器不会报错.
			return this.skuInfo.skuImageList || [];
		},
```





```javascript
//zoom
data() {
  return {
    defaultIndex: 0
  }
}
computed: {
  defaultImg() {
    return this.imgList[this.defaultIndex] || {}
  }
}

//zoom模板中
<template>
  ...
	<-- <img :src="imgList[0].imgUrl" /> -->
  <img :src="defaultImg.imgUrl" />
	...
</template>
```



#### 详情页页面刷新, state里的数据是否需要重新初始化

刷新后或重启项目, vuex必然销毁之前的数据,重新初始化. 重新发送请求去获取数据.

state里的数据一开始就是有的, 只不过是我们初始化的,不是请求回来的.

但是state这个初始化的数据, 也会影响组件(组件也是可以获取这个初始化数据



因为vue和vuex无法永久存储数据, 才有h5的两个存储方案





#### 点击销售属性值切换选中状态 排它

使用排它思想(所有对象处于同一状态, 然后目标更新状态)

```vue
//Detail.vue

<template>
...
	<dt class="title">{{spuSaleAttr.saleAttrName}}</dt>
	<dd
  	changeprice="0"
    :class="{active: spuSaleAttrValue.isChecked === '1'}"
    v-for="(spuSaleAttrValue, index) in spuSaleAttr.spuSaleAttrValueList"
    :key="spuSaleAttrValue.id"
    @click="changeChecked(spuSaleAttr.spuSaleAttrValueList, spuSaleAttrValue)"
  >
  	{{ spuSaleAttrValue.saleAttrValueName }}
  </dd>
...
</template>



<script>
export default {
  methods: {
    // 点击切换销售属性的选中状态
    changeChecked(spuSaleAttrValueList, spuSaleAttrValue) {
      // spuSaleAttrValueList 当前属性的所有属性值列表
      // spuSaleAttrValue 代表点击的那一个属性值
      
      //排它第一步: 让所有的成员都变为同一种状态
      spuSaleAttrValueList.forEach(item => item.isChecked = '0')
      //排它第二步: 让当前点击的成员变为另一种状态
      spuSaleAttrValue.isChecked = '1'
    }
  }
}


</script>
```



#### 点击图片列表小图片, 切换橙色边框

设计数据

```vue
<template>
...

<div class="swiper-slide" v-for="(img, index) in imgList" :key="img.id">
  <img
       :src="img.imgUrl"
       @click="changeDefaultIndex(index)"
       :class="{ active: index === defaultIndex }"
       />
  </div>
...
</template>

<script>
	export default {
    data() {
      return {
        defaultImg: 0
      }
    }
  }
</script>
```



#### 点击小图之后,上面的zoom也切换为和小图同样的图片

下面点击第一张, 上面大图也得显示第一张

兄弟组件间通信: 全局事件总线

```vue
//imageList
<template>
<!-- vfor遍历任何东西都不会报错 -->
<div class="swiper-slide" v-for="(img, index) in imgList" :key="img.id">
  <img
       :src="img.imgUrl"
       @click="changeDefaultIndex(index)"
       :class="{ active: index === defaultIndex }"
       />
  </div>
</template>

<script>
	export default {
    methods: {
      changeDefaultIndex(index) {
        this.defaultIndex = index
        this.$bus.$emit('changeDefaultIndex', index)
      }
    }
  }

</script>
```



```vue
//zoom

<script>
export default {
  mounted() {
  this.$bus.$on('changeDefaultIndex', this.changeDefaultIndex)
},
  
	methods: {
    changeDefaultIndex(index) {
      this.defaultIndex = index
    }
  }
}

</script>
```



#### 图片放大镜

zoom组件

vue中获取dom元素 使用`ref`



1 HTML结构(先后顺序): img + 空div(承接鼠标事件 @mousemove="move") + div(大图) + div(蒙版)
2  根据'鼠标动,蒙版动, 根据鼠标位置求蒙版的位置'

```vue
<template>
  <div class="spec-preview">
    <!--  Cannot read property '0' of undefined" 会报这个错，页面又没问题   传过来的是undefined-->
    <!--  Cannot read property imgList of undefined" 会报这个错，页面又没问题  空数组的0项的对象的属性值也是undefined-->
    <!-- <img :src="imgList[0].imgUrl" /> -->
    <!-- 这是中图 -->
    <img :src='defaultImg.imgUrl' />
    <!-- 这是空div, 覆盖中图 承接鼠标事件-->
    <div class="event" @mousemove="move"></div>
    <!-- 这是大图 -->
    <div class="big">
      <img :src="defaultImg.imgUrl" ref="bigImg"/>
    </div>
    <!-- 这是蒙版 -->
    <div class="mask" ref="mask"></div>
  </div>
</template>

<script>
  export default {
    name: "Zoom",
    props:['imgList'],
    data(){
      return {
        defaultIndex:0
      }
    },
    computed:{
      // 根据设置的下标计算图片
      defaultImg(){
        return this.imgList[this.defaultIndex] || {};
      }
    },
    mounted(){
      // 兄弟组件使用全局事件总线来传递index
      this.$bus.$on('changeDefaultIndex', this.changeDefaultIndex);
    },
    methods:{
      changeDefaultIndex(index){
        this.defaultIndex=index;
      },
      move(event){
        //  鼠标动,蒙版动. 需要根据鼠标的位置求蒙版的位置
        // event.clientX 相对视口左上角
        // event.pageX   相对页面左上角
        // event.offsetX 相对元素自身左上角
        let bigImg = this.$refs.bigImg;
        let mask = this.$refs.mask;
        // 获取鼠标位置
        let mouseX = event.offsetX;
        let mouseY = event.offsetY;
        // 根据鼠标位置和蒙版宽度计算蒙版位置
        let maskX = mouseX - mask.offsetWidth/2;
        let maskY = mouseY - mask.offsetHeight/2;
        // 设置蒙版位置前,限定边界
        if(maskX < 0){
          maskX = 0;
        }else if(maskX > mask.offsetWidth ){   //样式中的宽度是父元素的一半
          maskX = mask.offsetWidth;
        }
        if(maskY < 0){
          maskY = 0;
        }else if(maskY > mask.offsetHeight){
          maskY = mask.offsetHeight;
        }
        // 设置蒙版的位置
        mask.style.left = maskX + 'px';
        mask.style.top = maskY + 'px';
        // 蒙版动, 大图动 大图刚好移动蒙版反向2倍
        bigImg.style.left = -maskX*2 + 'px';
        bigImg.style.top = -maskY*2 + 'px';
      }
    }
  }
</script>
```



```javascript
//zoom 

move(event) {
  let mask = this.$refs.mask
  let bigImg = this.$regs.bigImg
  
  let mouseX = event.offsetX
  let mouseY = event.offsetY
  
  let maskX = mouseX - mask.offsetWidth / 2
  let maskY = mouseY - mask.offsetHeight / 2
  
  if (maskX < 0) {
    maskX = 0
  } else if (maskX > mask.offsetWidth) {
    maskX = mask.offsetWidth
  }
  
  if (maskY < 0) {
    maskY = 0
  } else if (maskY > mask.offsetHeight) {
    maskY = mask.offsetHeight
  }
  
  mask.style.left = maskX + 'px'
  mask.style.top = maskY + 'px'
  
  //蒙版董 大图动 大图刚好移动蒙版反向2倍
  bigImg.style.lfet = -2*maskX = 'px'
  bigImg.style.top = -2 * maskY + 'px'
}
```



#### 商品数量的输入交互

加入购物车前的商品数量显示. 至少是个1

input输入框时, 失去焦点触发blur事件.但是会有问题,它不会判断这次输入的数据和之前的不一样才去触发.

使用change事件

输入框change事件,内部包含了失去焦点事件.触发前提是前后数据有差异才会触发

```javascript
$event.target.value
```



```vue
<template>
...
<div class="cartWrap">
  <div class="controls">
    <input
           autocomplete="off"
           class="itxt"
           v-model="skuNum"
           @change="
                    $event.target.value <= 1
                    ? (skuNum = $event.target.value)
                    : (skuNum = 1)
                    "
           />
    <a href="javascript:" class="plus" @click="skuNum++">+</a>
    <a href="javascript:" class="mins" @click="skuNum > 1 ? skuNum-- : (skuNum = 1)"
    >-</a>
  </div>
  <div class="add">
    <!-- 点击购物车:发后台请求,后台把信息存储. 请求成功后,会返回信息.再根据这个信息再去跳转.否则可能后台添加添加数据失败, 而我们已经跳到下个页面 -->
    <a href="javascript:" @click="addShopCart">加入购物车</a>
  </div>
  </div>
...
</template>

<script>
	export default {
    
  }
</script>
```









#### 添加购物车逻辑

之前的跳转都是直接的跳转,因为在跳转之前不需要发请求. 

比如从home到search, search到详情, 跳转时补发请求,而是跳转过去发请求拿数据



加入购物车逻辑:

* 点击'添加购物车'时, 需要先发请求给后台, 后台需要把这个购物车信息存储数据库.
* 请求成功后,会返回信息,根据返回信息再去跳转. 否则可能后台添加购物车失败



加入购物车注意事项:

* post请求, 只需要在vuex中的actions中发送请求, 其他mutations, state中不用声明数据
* 需要获取请求的成功失败数据, 成功返回字符串, 失败返回`Promise.reject(new Error('failed'))`
* 组件中则使用`try...catch`来获取返回的状态
* 传递的购物数据, 简单的通过路由参数,复杂的通过`sessionStorage`存储

```javascript
		async addShopCart() {

			try {
				// 成功的
				// 请求成功跳转到添加购物车页面
				await this.$store.dispatch("addOrUpdateShopCart", {
					skuId: this.skuId,
					skuNum: this.skuNum,
				});
				// alert("添加购物车成功, 前往购物车页面");
				// 向添加购物车页面跳转的时候,需要带两个东西, skuNum 和 商品详情信息
				// skuNum是一个简单数据, 可以直接通过路由传参query参数带过去
				// 商品详情是一个复杂数据, 使用sessionStorage
				sessionStorage.setItem("SKUINFO_KEY", JSON.stringify(this.skuInfo));
				this.$router.push("/addcartsuccess?skuNum=" + this.skuNum);
			} catch (error) {
				// 失败的
				alert(error.message);
			}
		},
```





### 添加购物车成功页面 addOrUpdate

从路由参数和sessionStorage中获取数据





### 购物车页面

#### 发请求获取购物车列表数据获取到的是空数组原因及解决

添加购物车时候, 并没有为请求添加标识(后台不知道是谁存放的). 所以

所以, 添加购物车时需要添加临时标识(身份标识). 需要在请求拦截器中添加身份标识



如何解决? 请求携带唯一用户标识

**生成临时标识**

使用uuid生成临时用户id. 不要是再次安装, uuid作为其他库的相关库已经安装在项目中

根据github上的文档说明来使用:



```javascript
// store/user.js

import {getUserTempId} from '@/utils/userabout'

const state = {
  userTempId: getUserTempId(),
}
```



```javascript
// utils/userabout

import { v4 as uuidv4 } from "uuid";

// 用来生成用户临时标识  uuid依赖包已经安装完
export const getUserTempId = () => {
	// 1.先从localStorage中获取用户临时标识
	let userTempId = localStorage.getItem("USERTEMPID_KEY");

	// 2.如果取到了,直接返回使用

	// 3.如果没有获取到,再通过uuid重新创建,并且存储到localStorage

  if (!userTempId) {
    userTempId = uuidv4()
    localStorage.setItem('USERTEMPID_KEY', userTempId)
  }
  
  return userTempId
};
```





**在请求头中添加临时标识**

请求头中的名称需要和后端确认

```javascript
import store from '@/store'

service.interceptors.request.use(
	config => {
    Nprogress.start()
    
    let userTempId = store.state.user.userTempId
    config.headers.userTempId = userTempId
    
    return config
  }
)
```





#### 数据假报错问题

数据还没有请求回来, 但是却已经计算了

解决: 将组件计算属性的求值函数 移动到 vuex中的getters + 使用`或`选项提供无数据时的空数据(数组,对象)





#### 购物车动态数据初始化展示

已选择, 全选, 总价的计算

选择框的是否选择的两种实现方式

```html
<input type="checkbox" name="chk_list" :checked="cart.isChecked" />


<input type = "checkbox" class="chooseAll" v-model="isCheckAll" /> 
//单个checkbox, v-model收集的是checked的值 多个收集的是一个数组
```





```javascript
// 计算商品总数. 
skuAllMount(){
  return this.cartInfoList.reduce((prev, item)=>{
    if (item.isChecked) {
      prev += item.skuNum
    }
    return prev
  }, 0)
},
  // 计算商品总价格
  skuAllMoney(){
    return this.cartInfoList.reduce((preVal, cart)=>{
      if (cart.isChecked) {
        preVal += cart.skuPrice*cart.skuNum;
      }
      return preVal
    }, 0)
  },
```



#### 购物车交互都要先发请求修改后台然后才能修改

数量的`+`, `-`, 或 直接输入, 都要先发请求更改后台数据, 然后再发请求获取数据



#### 修改数量 !!!!

仍然存在的问题: 数量为1时, 点击减号让然会请求. 使用disabled

```html
<li class="cart-list-con5">
  <a href="javascript:void(0)" class="mins" @click="updateSkuNum(cart, -1, true)">-</a>
  <input autocomplete="off" type="text"  minnum="1" class="itxt" :value="cart.skuNum" @change="updateSkuNum(cart,$event.target.value, false)">
  <a href="javascript:void(0)" class="plus" @click="updateSkuNum(cart, 1, true)">+</a>
</li>
```



```javascript
// 更新商品数量: 判断+更新数据+再次请求数据 正数代表增加,负数代表减少
async updateSkuNum(cart, disNum, flag){
  let originNum = cart.skuNum;
  if(flag){
    // flag为true, disNum是(1 或 -1)  传递的变化的量  另一种解决方案是当为1时, 减号就disabled
    if(disNum + originNum < 1){
      disNum = 1 - originNum;
    }
  }else{
    // flag为false, disNum是输入的最终值  传递的是最终的数量
    if(disNum < 1){ //disNum此时代表的是最终的值
      // 如果输入的值小于1, 那么也就是求原值originNum到最终值1的变化.(数字是从大变小的, 所以值是负或0)
      disNum = 1 - originNum; //这里的disNum代表的是变化的量  因为最终发请求的时候需要的是变化的量
    }else{
      // 如果输入的值不小于1, 那么也就是求原值originNum到输入值|最终值disNum的变化(变化的量=最终值-原值 )
      disNum = disNum - originNum; //等号左边代表变化的量, 等号右边代表输入的数量
    }
  }

  //经历了上面的过程, 到这里disNum一定是变化的量. 无论是点击'+ -' 或 输入
  try {
    // 发请求修改数量
    await  this.$store.dispatch('addOrUpdateShopCart', {skuId:cart.skuId, skuNum:disNum})
    alert('更改成功');
    // 发请求再次更新数量
    this.getShopCartInfo();
  } catch (error) {
    alert(error.message);
  }   
},
```



#### 修改购物车选中状态单个

修改单个商品的选中状态

```html
 <div class="cart-body">
        <ul class="cart-list" v-for="(cart, index) in cartInfoList " :key="cart.id">
          <li class="cart-list-con1">
            <input type="checkbox" name="chk_list" :checked="cart.isChecked" @click="updateCartIsCheck(cart.skuId, cart.isChecked)">
          </li>
```



```javascript
// 更新商品的复选框
async updateCartIsCheck(skuId, isChecked){
  try {
    await this.$store.dispatch('updateCartIsCheck', {skuId, isChecked:isChecked?0:1});
    alert('更新成功');
    this.getShopCartInfo();
  } catch (error) {
    alert(error.message);
  }
},
```



#### 修改购物车选中状态 多个

即使没有修改多个状态的接口, 但可以使用单个修改的接口 + Promise.all来实现这个功能

```javascript
//vuex
	// 切换购物车选中状态请求 单个
	async updateCartIsCheck({ commit }, { skuId, isChecked }) {
		const result = await reqUpdateCartIsCheck(skuId, isChecked)
		if (result.code === 200) {
			return 'ok'
		} else {
			return Promise.reject(new Error('failed'))
		}
	},

	// 修改购物车 多个选中状态
	updateCartIsCheckAll({ getters, dispatch }, isChecked) {
		let promises = []
		getters.cartInfo.cartInfoList.forEach(item => {
			if (item.isChecked === isChecked) return //每个购物车数据已经和要改变的状态一样
			let promise = dispatch('udpateCartIsCheck', { skuId: item.skuId, isChecked })
			promises.push(promise)
		})

		return Promise.all(promises)
	}
```



```javascript
isAllChecked:{
  get(){
    return this.cartInfoList.every(item => item.isChecked)
  },
    async set(value){
      // 点击输入框. 获得的是全选/全不选的布尔值  使用的v-model获取
      try {
        await this.$store.dispatch('updateCartIsCheckAll', value?1:0);
        alert('更改成功')
        this.getShopCartInfo();     
      } catch (error) {
        alert(error.message);
      }   
    }
},
```



#### 删除购物车数据





#### 删除多个选中的商品



```javascript
	// 删除选中的商品
	async deleteShopCartAll({ commit, getters, dispatch }) {
		let promises = []
		getters.cartInfo.cartInfoList.forEach(item => {
			if (!item.isChecked) return 
			let promise = dispatch('deleteShopCart', item.skuId)
			promises.push(promise)
		})

		return Promise.all(promises)
	}
```



```javascript
      // 删除多个购物车数据
      async deleteAll(){
            try {
            await this.$store.dispatch('deleteAllShopCart');
            alert('删除多个商品成功');
            this.getShopCartInfo();
          } catch (error) {
            alert('失败原因: ['+error.message+']')
          }
      }
```





### 注册和登录页面 静态页面

图片重复使用的公用图片放置到`assets`文件夹中

图片路径的两种方案:

* 相对路径
* 使用`~@`符代替

```css
background-image: url(../.././assets/images/icons.png)


background-images: url(~@/assets/images/icons.png)
```







### 用户注册逻辑

用户输入信息后, 收集信息发请求给后台



```html
          <div class="content">
            <form action="##">
              <div class="input-text clearFix">
                <span></span>
                <input type="text" placeholder="邮箱/用户名/手机号" v-model="phone">
              </div>
              <div class="input-text clearFix">
                <span class="pwd"></span>
                <input type="text" placeholder="请输入密码" v-model="password">
              </div>
              <div class="setting clearFix">
                <label class="checkbox inline">
                  <input name="m1" type="checkbox" value="2" checked="">
                  自动登录
                </label>
                <span class="forget">忘记密码？</span>
              </div>
              <button class="btn" @click.prevent='login'>登&nbsp;&nbsp;录</button>
            </form>

            <div class="call clearFix">
              <ul>
                <li><img src="./images/qq.png" alt=""></li>
                <li><img src="./images/sina.png" alt=""></li>
                <li><img src="./images/ali.png" alt=""></li>
                <li><img src="./images/weixin.png" alt=""></li>
              </ul>
              <router-link class="register" to="/register">立即注册</router-link>
            </div>
          </div>
```



```javascript
  export default {
    name: 'Login',
    data(){
      return {
        phone:'',
        password:''
      }
    },
    methods:{
      async login(){
        let {phone, password} = this;
        if(phone && password){
              try {
              await this.$store.dispatch('userLogin',{phone, password});
              alert('登录成功');
              let targetPath = this.$route.query.redirect || '/';
              this.$router.push(targetPath);
          } catch (error) {
              alert('失败原因 ['+error.message+']')
          }
        }
      }
    }
  }
```





### 用户登录逻辑

用户登录成功, 拿到token信息

#### vuex中token初始化声明问题

用户登录成功以后, 只返回token数据. 而其他用户数据,需要根据token数据重新获取(token校验)

```html
//login
<button class="btn" @click.prevent='login'>登&nbsp;&nbsp;录</button>
```

```javascript
//login
async login(){
  let {phone, password} = this;
  if(phone && password){
    try {
      await this.$store.dispatch('userLogin',{phone, password});
      alert('登录成功');
      let targetPath = this.$route.query.redirect || '/';
      this.$router.push(targetPath);
    } catch (error) {
      alert('失败原因 ['+error.message+']')
    }
  }
}
```

```javascript
// store/user

const state = {
	// token: "", //用户登录成功以后的token 初始化为空串不对, 
  token: localStorage.getItem('TOKEN_KEY')
  // 以前没有登录过, 初始化空串是没有问题的
  // 以前有登录过, 得先从localStorage里面去获取,如果获取不到再去登录; 获取到了就不需要再登录
}


const actions = {
  	// 用户login
	async userLogin({ commit }, userInfo) {
		const result = await reqUserLogin(userInfo);
		if (result.code === 200) {
      commit("RECEIVE_TOKEN", result.data.token);
      //token获取到以后, 需要存储到localStorage中, 因为token在一定时间内也不是随意更改的
      localStorage.setItem('TOKEN_KEY', result.data.token)
			return "ok";
		} else {
			return Promise.reject(new Error("failed"));
		}
	},
}
```



#### 登录请求成功以后, 跳转路由地址错误的原因

当点击button按钮时候, 因为是处于`<form>`表单中, 进而触发了`action`操作

解决: 使用时间修饰符`.prevent` 阻止事件冒泡 form表单自动跳转

```html
<button class="btn" @click.prevent='login'>登&nbsp;&nbsp;录</button>
```



#### 根据用户的token, 获取用户信息(路由守卫)

用户登录成功,跳转到首页之后, 应该显示用户的具体信息

注册全局前置导航守卫,用来对token校验(根据token获取用户信息)



设置全局前置守卫需要做的事情:

* 请求头中添加token
* vuex和api中添加获取用户信息的 请求链
* 在路由器中的全局前置守卫中 判断
  * 获取 token 和 userInfo
  * 如果token存在
    * 如果访问 `login`页面, 直接去往主页 `/`
    * 如果访问其他页面
      * userInfo是否存在
        * 存在, 无条件放行 `next() `
        * 不存在
          * 获取用户信息
            * 成功 无条件放行
            * 失败 清空用户token,并跳转到登录页



```javascript
//api中 请求头中添加token

// Add a request interceptor
service.interceptors.request.use(
	function (config) {
		// Do something before request is sent
		NProgress.start();

		
		let userTempId = store.state.user.userTempId
		if (userTempId) {
			config.headers.userTempId = userTempId
		}
		

		let token = store.state.user.token
		if (token) {
			config.token = token
		}
		
		return config;
	},
	function (error) {
		// Do something with request error
		return Promise.reject(error);
	}
);
```



```javascript
// store/user  请求头有token后, 获取用户信息的接口


  //根据token 获取用户信息
  async getUserInfo({ commit }) {
    const result = await reqUserLogin()

    if (result.code === 200) {
      commit('RECEIVE_USERINFO', result.data)

      return 'ok'
    } else {
      return Promise.reject(new Error('failed'))
    }
  },
```



```javascript
// router/index.js

router.beforeEach(async (to, from, next) => {
	// 1. 守卫拦截, 先去获取用户的token和用户的信息
	let token = store.state.user.token
	let userInfo = store.state.user.userInfo

	if (token) {
		//如果token是存在的, 代表用户登录过

		if (to.path === '/login') {
			// 用户已经登录, 还要向登录页面跳转, 没有必要
			next('/')
		} else {
			// 如果用户已经登录, 跳转的也不是登录页. 需要查看用户信息
			if (userInfo) {
				// 用户信息已获取, 无条件放行
				next()
			} else {
				// 用户已经登录, 但用户还没有获取用户信息. 在这里就要获取用户信息
				
				//用户根据token获取信息  需要判断获取成功和失败, 所以要改造action中的'getUserInfo' dispatch返回的是promise
				try {
					await store.dispatch('getUserInfo')
					// 获取用户信息成功, 无条件放行
					next()
				} catch (error) {
					// 根据token获取用户信息失败, 代表token可能过期
					// 把用户过期的token清理掉, 重新跳转到登录页
					// 如何清除token? 

					store.dispatch('clearToken')
					next('/login')
				}		
			}
		}
	}
})
```





#### 用户自动登录(保存token信息)

页面一刷新(项目重新启动),  首页上header组件中的信息都被初始化了. 消失了

想要的效果: 页面刷新后, 用户信息还能依然存在

自动登录本质就是把用户token给存储,以后只要是重新登录, 直接拿存储好的token就可以. 

自动登录是在拿到token 保存到localStorage. 初始化时候也要从localStorage中拿



```javascript
//store/user

//1.actions中获取token后 存储到localStorage中

//2. state中初始化声明token时候, 需要从localStorage中去获取


//3.token过期 需要清除
```





#### 用户退出登录

发请求, 请求成功以后, 清除state中的token, userInfo及localStorage中的TOKEN_KEY

```javascript
```



#### userTempId 与 token 的区别

userTempId 未登录状态下的用户身份识别表示

token 登录状态下的用户身份识别表示

如果没有登录, 添加的购物车信息是和临时身份标识对应的信息

如果登录, 我们同时在请求头添加了临时标识和登录后标识, 此时后台会把临时标识对应的数据, 转义到真正登录的标识数据里面, 而临时标识对应的数据就不见了.





### 交易页面

点击购物车结算会跳到订单交易页面

trade页面需要发两个请求:  获取验证码 获取用户信息地址











#### 点击地址动态交互改变默认地址及最终邮寄地址的计算



```html
				<p @click="changeDefault(address, userAddressList)">
					<span class="s1">{{ address.fullAddress }}</span>
					<span class="s2">{{ address.phoneNum }}</span>
					<span class="s3" v-if="address.isDefault === '1'">默认地址</span>
				</p>
```



```javascript
		// 排它实现修改默认地址
		changeDefault(address, userAddressList) {
			userAddressList.forEach((item) => (item.isDefault = "0"));
			address.isDefault = "1";
		},
```



#### 点击订单交易页面的提交订单

		需要先发请求 提交订单交易信息  正儿八经的去创建我们的订单   
		成功返回订单编号   然后把订单编号携带跳转路由去到订单支付页面



```html
		<div class="sub clearFix">
			<!-- <router-link class="subBtn" to="/pay">提交订单</router-link> -->
			<a class="subBtn" href="javascript:;" @click="submitOrder">提交订单</a>
		</div>
```



```javascript
		// 点击提交订单逻辑
		async submitOrder() {
			// 准备参数
			let tradeNo = this.tradeInfo.tradeNo;
			let tradeInfo = {
				consignee: this.defaultAddress.consignee,
				consigneeTel: this.defaultAddress.phoneNum,
				deliveryAddress: this.defaultAddress.fullAddress,
				paymentWay: "ONLINE",
				orderComment: this.message,
				orderDetailList: this.detailArrayList,
			};

			// 发送请求创建订单,不通过vuex发送请求
			const result = await this.$API.reqSubmitOrder(tradeNo, tradeInfo);
			if (result.code === 200) {
				alert("订单创建成功, 准备跳往支付页面");
				// 跳往支付页面,把返回的订单编号给带上
				this.$router.push("/pay?orderNum=" + result.data);
			}
		},
```





#### 另一种请求方式 (actions之外的)

ES6暴露的本质: 都是暴露的一个对象

```javascript
//main  无论哪种暴露方式,都是一个对象. 声明的API变量就是那个暴露的对象
import * as API from '@/api' 

beforeCreate() {
  Vue.prototype.$bus = this
  Vue.prototype.$API = API
}
```



```javascript
// 发送请求创建订单,不通过vuex发送请求
const result = await this.$API.reqSubmitOrder(tradeNo, tradeInfo);
```





### 支付页面



#### 按需引入element-ui

支付框使用UI框架的element-ui的MessageBox

element-ui当中分为两种组件:

第一种组件按需引入, 可以通过`Vue.use` 或 `Vue.component`全局注册

第二种组件和`MessageBox`类似, 引入之后不能直接注册, 而是挂载Vue的原型上使用

```javascript
// https://element.eleme.cn/#/zh-CN/component/quickstart
//main.js

import {Button, MessageBox} from 'element-ui'

Vue.use(Button)
// Vue.component(Button.name, Button)

Vue.prototype.$msgbox = MessageBox

Vue.prototype.$loading = Loading.service;
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;
Vue.prototype.$notify = Notification;
Vue.prototype.$message = Message;
```





#### 弹出二维码之后, 需要立即轮训订单支付状态,成功之后自动跳转到支付成功页面

使用循环定时器 和 轮询 

```javascript
		async pay() {
			
			try {
				// 1.使用qrcode包, 生成二维码图片链接成功 github上仓库的名字是node-qrcode
				let imgUrl = await QRCode.toDataURL(this.payInfo.codeUrl);
				//  this.$alert返回的也是promise,需要使用then,catch来处理对应的成功和失败操作.但是存在问题:点击后会强制关闭弹出框msgBox. 但现在需要判断用户是否支付才关闭.
				// 生成二维码图片进行展示
				this.$alert(`<img src=${imgUrl} />`, "请使用微信扫码支付", {
					dangerouslyUseHTMLString: true,
					showClose: false,
					showCancelButton: true,
					confirmButtonText: "我已成功支付",
					cancelButtonText: "支付遇到问题",
					center: true,
        }
				// 轮询: 生成二维码图片后,需要间隔让后台返回这个订单的支付状态,以判断用户是否支付.一个订单只能开启一个定时器
				// 必须添加if判断, 确保订单支付轮询只开启一个定时器
				if (!this.timer) {
					this.timer = setInterval(async () => {
						let result = await this.$API.reqPayStatus(
							this.orderNum
						);
						if (result.code === 200) {
							// 支付状态 成功
							// 0.存储成功的code, 用户用户点击跳转进行判断
							this.payStatus = 200;
							// 1.提示支付成功
							this.$alert.success("支付成功");
							// 2.关闭定时器
							clearInterval(this.timer);
							this.timer = null;
							// 3.关闭弹出框,跳转
							this.$msgbox.close();
							this.$router.push("/paysuccess");
						}
					}, 2000);
				}
			} catch (error) {
        // 生成失败
        this.$message.error('生成失败'+error.message);
      }
		},
```





#### 点击支付遇到的问题

`this.$alert`返回的是一个promise, `.then`对应的是点击确定按钮的操作, `.catch`对应的点击取消按钮的操作

```javascript
this.$alert(`<img src=${imgUrl} />`, "请使用微信扫码支付", {
					dangerouslyUseHTMLString: true,
					showClose: false,
					showCancelButton: true,
					confirmButtonText: "我已成功支付",
					cancelButtonText: "支付遇到问题",
					center: true,
          beforeClose:(action, instance, done)=>{
            // action代表点击的是哪个按钮. confirm-确定, concel-取消 close-关闭
            if(action === 'confirm'){
              //确定按钮
              // if(!this.payStatus){
              //   // 如果没有支付:
              //   // 1.提示
              //   this.$message.info('请确保支付成功,支付成功后会自动跳转');
              // }
              // 后门
              done();
              clearInterval(this.timer);
              this.timer = null;
              this.$router.push('/paysuccess');
            }else if(action === 'cancel'){
              // 取消按钮
              // 1.提示
              this.$message.warning('支付问题联系***');
              // 2.清除定时器
              clearInterval(this.timer);
              // 3.关闭消息盒子
              done();
            }
          }
				})
					.then(() => {})
					.catch(() => {});
					// then catch 使用后会强制关闭弹
```





#### 支付流程

	支付流程：
		1、生成了二维码
		2、messageBox展示了二维码
		3、刚展示完二维码：立马轮询 就需要发请求（这个请求要连续的去发） 隔2秒发一次 ，去查询支付状态是否支付完成
		4、后台会在发请求后返回支付状态码  支付状态码如果是205代表还在支付中，如果是200代表支付成功
		5、根据返回的支付状态码去决定后续操作
				1》如果在查询回来是200的时候，我们要自动跳转到支付成功页面，关闭messageBox,
				2》把这个状态码还要保存在data当中，用来去作为用户点击已成功支付按钮的判断依据
	
		6、去单独的处理点击我已成功支付或者支付遇到问题按钮的逻辑
				1》点击我已成功支付，那么要根据data当中存储的状态码判断是否真的支付完成，
					如果没有完成，停在当前页面并提示,不关闭messageBox,
	
				2》点击支付遇到问题，那么我们要提示用户找谁处理，停止往后台发请求，关闭messageBox





### 我的订单页面及二级路由使用



```javascript
	{
		path: '/center',
		component: Center,
		children: [
			{
				path: 'myorder',
				component: MyOrder
			},
			{
				path: 'grouporder',
				component: GroupOrder
			},
			{
				path: '',    // 写法注意
				component: MyOrder
			}
		]
	},
```





#### 订单分页器

注意: 组件上自定义事件调用方法, 其参数默认为`$event`, 可写可不写





#### 使用导航守卫解决未登录访问交易订单相关页面 

转向登录, 并完成登录后去到之前想去的页面

如果没登录，访问 （交易相关、支付相关、用户中心相关）跳转到登录页面 
登录后会自动跳转前面想去而没到的页面

只有携带了skuNum和sessionStorage内部有skuInfo数据  才能看到添加购物车成功的界面
	路由独享守卫和组件守卫使用
	如果是跳转单独的一个页面，需要检测，那么使用这两个守卫



```javascript
// router

} else {
		// 用户没有登录, 什么都不做, 直接放行.
		// 如果用户访问的是 交易相关 支付/个人中心, 需要跳转到登录页
		
		let targetPath = to.path
		if (['/trade', '/pay', '/center'].includes(targetPath)) {
		// 缺了 /center/myorder 匹配 startsWith  /  正则 重新尝试
			// next('/login')  登录成功不会去到之前想去的页面

			next('/login?redirect='+targetPath)  // 需要登录页面配合
		} else {
			next()
		}
	}
```

```javascript
// login

     async login(){
        let {phone, password} = this;
        if(phone && password){
              try {
              await this.$store.dispatch('userLogin',{phone, password});
              alert('登录成功');
              let targetPath = this.$route.query.redirect || '/';  // <-- here 
              this.$router.push(targetPath);
          } catch (error) {
              alert('失败原因 ['+error.message+']')
          }
        }
      }
```





#### 使用路由独享守卫解决必须携带skuNum sessionStorage内部存储skuInfo才能跳转到添加购物车页面



```javascript
//router/routes.js

// 路由独享守卫  (这个效果在全局守卫中也有)
{
		path: "/login",
		component: Login,
		meta: {
			isHidden: true,
		},
		// 路由独享守卫
		beforeEnter: (to, from, next) => {
			// 只有没登录才能去到登录的页面 通过token判断
			let token = store.state.user.token
			if (token) {
				next('/')
			} else {
				next()
			}

		}
	},
    
    
    
    
 	{
		path: "/addcartsuccess",
		component: AddCartSuccess,
		beforeEnter: (to, from, next) => {
			// 只有携带了skuNum和sessionStorage内部有skuInfo数据  才能看到添加购物车成功的界面
			// ...
			let skuNum = to.query.skuNum
			let skuInfo = sessionStorage.getItem('SKUINFO_KEY')

			if (skuNum && skuInfo) {
				next()
			} else {
				alert('必须要携带skuNum参数')
				// next('/')
				next(false) //什么也不做, 但页面会显示不全
			}
		}
	},
```





只有从购物车界面才能跳转到交易页面（创建订单）

只有从交易页面（创建订单）页面才能跳转到支付页面

只有从支付页面才能跳转到支付成功页面









### 优化

#### 图片懒加载

使用步骤:

如果使用最新版本的包,会报错.  vue-lazyload版本使用1系列

```bash
- 下载 yarn add vue-lazyload -S
- 在main.js中引入并配置loading图片
 - import Vuelazyload from 'vue-lazyload'
 - import loading from '@/assets/images/loading.git'
 - Vue.use(VueLazyload, { // 内部自定义了一个指令lazy
 	loading, //指定未加载得到图片之前的loading图片
 })
 
```



```html
	<div class="p-img">
    <!-- <a href="javascript:;" target="_blank"
><img :src="goods.defaultImg"
/></a> -->
    <router-link
                 :to="'/detail/' + goods.id"
                 >
      <!-- <img v-lazy="goods.defaultImg" /> -->
      <img :src="goods.defaultImg" />
    </router-link>
</div>
```



#### 路由懒加载

调用import函数把一次性打包的所有路由组件分开去打包加载  

	路由懒加载特点
		每个路由组件打包会打包成一个单独的文件
		第一次访问哪一个路由组件，再去加载哪一个打包好的文件

 




使用`import...from`方式是同步执行, 将所有的路由组件一次性打包在一个大的文件中

解决方法:  需要使用动态import语法, 也就是import()函数

动态引入

```javascript
//import Home from "@/pages/Home"; 

const Home = () => import('@/pages/Home')  //import函数可以让文件单独打包, 并且动态加载


{
  path: '/home',
  component: Home //当用户第一个访问Home组件, 就会执行Home函数
}
```



```javascript
{
  path: '/home',
  component: () => import("@/pages/Home")
}
```





在浏览器开发者工具中的`Network>JS`中`app.js`相较于之前会变小, 同时也会多出打包后的组件js文件



#### 前台表单验证

vue官方插件 `vee-validate 2.xx`版本

```markdown
// 这里使用的是2.x版本, 最新的3.x比较麻烦


github地址: https://github.com/logaretm/vee-validate
文档: https://vee-validate.logaretm.com/v2/guide/getting-started.html#usage

中文message: https://github.com/logaretm/vee-validate/blob/v2/locale/zh_CN.js
```



使用

因为减少main.js中的引入, 在`utils/validate.js`中引入, 然后在main.js中引入

```javascript
//utiles/validate.js

import Vue from 'vue'
import VeeValidate from 'vee-valiedate'

Vue.use(VeeValidate)
	
```



```javascript
//main.js

import '@/utils/validate'
```





在注册中使用

在组件模板中直接使用指令`v-validate`. 表单类元素必须使用name属性指定验证的字段名称

```bash
//register

<div class="content">
  <label>手机号:</label>
  <input
  placeholder="请输入你的手机号"
  v-model="phone"
  name="phone"  //需要声明的
  v-validate="{ required: true, regex: /^1\d{10}$/ }"  //需要声明的
  :class="{ invalid: errors.has('phone') }"   //需要声明的 
  />
  <!-- 获取phone字段验证错误的提示信息 -->
  <span class="error-msg">{{ errors.first("phone") }}</span>
  <!-- <input type="text" placeholder="请输入你的手机号" v-model="phone">
  <span class="error-msg">错误提示信息</span> -->
</div>
```



提示信息中文化

```javascript
// utils/validate

import Vue from 'vue'
import VeeValidate from 'vee-valiedate'
import zh_CN from 'vee-validate/dist/locale/zh_cn'

Vue.use(VeeValidate)


VeeValidate.Validator.localize('zh_CN', {
  messages: {
    ...zh_cn.messages,
    is: field => `${field}必须与密码相同`
  },
  attribute: {
    phone: '手机号',
    code: '验证码',
    password: '密码',
    password2: '确认密码',
    isCheck: '协议'
    
  }
})


//自定义校验规则  协议必须打钩同意

VeeValidate.Validate.extend('agree', {
  validte: value => {
    return value
  },
  
  getMessage: filed => field + '必须同意'
})
```





























































































## 后台
### 后台项目框架
> [14个适合后台管理系统快速开发的前端框架](https://mp.weixin.qq.com/s?__biz=MzIxMTI0NTE3NQ==&mid=2649604910&idx=1&sn=90b7fea9c420721bf8c7d5dd68606368&chksm=8f412236b836ab204dfca8a8269c43b4cde8f92d2e32d7ad902db3664c8fb8dd1083bd2ef5b8&scene=186&subscene=90&exptype=&rd2werd=1&key=32b1da591e592cb6fa1f8c9e1ea6367b7f03baeec6c7405daa6b09db68325ec33d70c8a260b183557a148e76cefa25a676131f2c8579c998db776426d4791db0419ffaf18b3550519dbf45a9d849159b6aa63577f61208bb5e3732a51208b7686f0fd3f66a02bcf6dfd4758bdbf73e29cb2a050888c48bff723239afbcad7795&ascene=7&uin=Mjg5MzM1MTUyNQ%3D%3D&devicetype=Windows+11+x64&version=6308011a&lang=en&session_us=gh_7aed10cde089&exportkey=n_ChQIAhIQP4OSWN1ZlySWZoMppsjpZRLsAQIE97dBBAEAAAAAAL9ED7YmmLYAAAAOpnltbLcz9gKNyK89dVj0kHoeGpWq%2B%2FWqOhok5l7fQDb275BLTZHVmKd7dqrTsgjfa5lk7jKBV0Rkz49eugtYMOgHO19miXHoMIScbdfflw5O%2BGU8Si4AsZugaaLGCevR8GpoVLqBbgO5gP4vfbZPNDtUia83fl2b6ovVrdDV%2Fw4t1AXUqrPn1qUbDn9HReMRqDFvfu0HJA%2FUkKhSWgUcR%2FhY4TJvjbwYtprXI%2BjjoKRlY1CkI%2FqTYJbv%2F8RgMf%2FdO22R5G3bRC4daovfwyUtrcrlJLNG&acctmode=0&pass_ticket=dAZ2tbtCiWzu0KFRYp3PDT0D7%2FpRMnIeCVoJ%2BSnyIlouz8kxYLbxjFG%2B0886iNa%2F9yb0Lbbe0GUdITar0szmIg%3D%3D&wx_header=1&fontgear=2)



```js
github仓库:
简洁版: https://github.com/PanJiaChen/vue-admin-template
加强版: https://github.com/PanJiaChen/vue-element-admin
```



### 模板启动命令和文件一览

```js
//模板

//模板调用命令
yarn dev
npm run dev

//文件夹一览
public  项目根目录,
src
tests 测试单元

.env.devlopment 开发环境配置的变量
.env.production 生产环境配置的变量
.env.staging 
.estlintignore eslint检查规范要忽略的内容
.eslintrc.js eslint配置文件
.gitignore  git相关忽略文件
.travis.yml 测试相关
babel.config.js
debug.log 调试日志,可写可不写
jest.config.js webpack中配置的
jsconfig.json 可写@符联想
LICENSE 证书
package-lock.json
package.json
postcss.config.js 自动给css添加前缀 例如使用css2还是css3
vue.config.js


//src文件夹一览
api 接口请求函数 
assets      图片
components  共用非路由组件
icons       svg图片 矢量图方法不失真
layout      一级路由组件: 对应后台首页整体框架 //应用中只有2个一级路由组件:登录页+layout
router
store
styles      项目共用的css文件,使用scss格式, 
    index.scss引入到main.js中
utils
utils/requests  axios的二次封装文件
	baseURL:process.env.VUE_APP_API
	process.env根据现在所处的环境,自动选择VUE_APP_API的值

views
App.vue
main.js
permission.js
setting.js


```



### 跨域

```js
//webpack官网查找


//pathRewrite
```





### Object.assign

```js
合并后面的对象到前面的对象当中

```



### 路由redirect

```js
{
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'dashboard' }
    }]
  },
      
  {
    path: '/product',
    component: Layout,
    name: 'Product',
    redirect: '/product/trademark/list',
    meta: { title: '商品管理', icon: 'el-icon-s-shop' },
    children: [
      {
        path: 'trademark/list',
        component: () => import('@/views/product/trademark/List'),
        name: 'Trademark',
        meta: { title: '品牌管理' }
      },
     ]
      
  }
```



### sidebar下动态生成子项

```js
//子项-->路由name
 <sidebar-item v-for="route in routes" :key="route.path" :item="route" :base-path="route.path" />
```



### 模块化在api中使用

```js
//1.
export default {}  //最终暴露的形式是{ default:{} }

//2.
export {default as trademark} from './trademark';
export {default as attr} from './attr';
最终暴露的形式是: {trademark, attr}

//3.在main.js中使用暴露的api
import * as API from '@/api';
Vue.prototype.$API = API;
```



### trademark组件中静态页面

```js
//分页器
<el-pagination
    style="text-align: center"
    :current-page="page"
    :page-size="limit"
    :total="total"
    :pager-count="5"
    :page-sizes="[3, 5, 7]"  //如果设置偶数,总数又为奇数.可能会出错,没有细查.
    layout="prev, pager, next, jumper,->, sizes, total "
    @size-change="handleSizeChange"
    @current-change="getTrademarkList"
></el-pagination>


//messageBox弹出框
在删除按钮中使用Messagebox的确认消息


//getTrademarkList中参数的设置
this.getTrademarkList(this.trademarkList.length>1?this.page:this.page-1)
this.getTrademarkList(trademark.id?this.page:1)

//修改按钮的浅克隆

//Form表单验证(单个+全部)
自定义校验规则

 var validatetmName = (rule, value, callback) => {
     if (value.length<2||value.length>20) {
         callback(new Error('tmName长度需在2-20之间'));
     } else {
         callback();
     }
 };
```



### api中请求

```js
获取spu的详情信息  2种写法

addUpdate(spuInfo){
    //return request.post(`/admin/product/${spuInfo.id?'update':'save'}SpuInfo`, spuInfo)
    return request({
        url:`/admin/product/${spuInfo.id?'update':'save'}SpuInfo`,
        method:'post',
        data:spuInfo
    })
}
```





### scope和深度作用选择器

```js
scoped添加和不添加的区别
scoped不写，那么当前组件的样式会影响其它组件
scoped写上，把样式作用在当前组件内部及子组件的根元素身上 

scoped如何把样式作用在本组件和子组件根元素身上
加了scoped就会有唯一的一个标识值，而这个标识数据会作为被影响到的元素的属性
这个元素的样式会在选择器的最右侧添加这个属性选择器，交集选择器。


scoped中有些元素直接添加样式就会生效，而有些元素直接添加样式就不会生效？
一句话：scoped只能把样式作用延长到自身元素还有子组件的根元素身上
如果在scoped书写的样式，刚好是作用在子组件的根元素身上，就会生效
如果在scoped书写的样式，不是作用在子组件根元素而是子组件根元素内部元素身上，就不会生效


加了scoped，还想让子组件根元素内部元素的样式生效（使用深度作用选择器）
1、把子组件内部元素的样式重新写一个style写，不加scoped，用的不多

2、深度作用选择器的写法    ********************
如果是原生css 深度作用选择器  
父元素 >>> 选中的元素 
如果是less  scss 预编译的css文件
/deep/ 用于less
::v-deep  都行


添加深度作用选择器css怎么处理的
不加添加深度作用选择器的时候，scoped的唯一标识会作为属性选择器添加在css选择器最右侧选中的元素身上，去限制
添加了深度作用选择器的时候，scoped的唯一标识会作为属性选择器添加在css选择器最左侧元素身上，限制不了选中的元素
```



### echarts与vchart

```js
1.安装包  yarn add echarts@4 v-charts vue-count-to
2.引入echarts和v-charts
2.1 main.js中 import '@/plugins/vcharts'
2.2 
```



```js
//引入echarts的几种方式
1.cdn
2.安装包

//页面使用
1.为Echarts准备一个具备大小的DOM
<div id='main' style="width:600px; height:600px"></div>

2.基于准备好的DOM,初始化echarts实例
var myCharts = echarts.init(document.getElementById('main'), 'macarons');

3.指定图标配置项和数据
var option = {}

4.使用刚指定的配置项和数据显示图表
myCharts.setOption(option);

//webpack中使用
1.安装包并引入
 1.1 主题引入需要使用require
2.页面加载初始化图表
```





### 用户权限设置

#### 路由分类

```js
常量路由
是任意用户都能操作的路由，就是都能看到这个路由组件

异步路由
就是权限路由，用户拥有这个路由对应的name信息，这个路由组件才能被用户操作，才能看到

任意路由，
随意的不合法的路由，全部转向404组件页面，添加路由器的时候，必须最后一个注册
```



```js
//路由组件中不同类型的分类
```





### 用户权限

```js
//发请求一般在mounted中, 也可以在created中发


//搜索小技巧
使用分页器和搜索按钮使用的数据是两个对象, 浅拷贝

//全选框的全选和部分选择的展示

```









<hr style="border:2px solid red"/>

## view-product-attr

### 三级分类

```js
三级分类:
1.数据展示 
 写三级分类接口请求函数
 一上来第一个分类就要有数据，所以我们要mouted发请求拿数据给第一项分类去遍历展示数据
 选中了第一项当中的某个分类，才会发请求拿第二项的数据进行遍历展示
 选中了第二项当中的某个分类，才会发请求拿第三项的数据进行遍历展示
 选中第一项需要清空第23项的数据
 选中第二项需要清空第三项的数据
 选中123项都要和父组件通信，把id传递到父组件当中

2.组件通信(自定义事件)
 父组件当中判断level保存三个id
 在父组件获取子组件传递过来的数据，保存3级id的时候需要发请求获取属性数据
 在父组件获取子组件传递过来的数据，保存1级id的时候需要清空父组件的23级id及属性列表数据
 在父组件获取子组件传递过来的数据，保存2级id的时候需要清空父组件的3级id及属性列表数据

```



```js
form表单的行内样式实现:添加属性 :inline="true"
form表单收集数据: 
<el-form :model="cForm">
    <el-select v-model="cForm.category1Id">
        <el-option :value="c1.id">
            
自定义事件@change="handlerCategory1"需要添加在select组件中, 事件名称必须是change
自定义事件属性值传递的方式{categoryId:category1Id, level:1} ++ //对象形式参数,添加了标志符
```



### HintButton

```js
//定义 注册 使用
```



### 使用v-show展示隐藏

```js
//页面上同一个位置的要展示两个div, 使用v-show来展示与隐藏
<div v-show="isShowList"></div>
<div v-show="!isShowList"></div>
```



### table如何收集数据

```js
input使用v-model既能展示数据又能收集数据:

<el-table :data="attrForm.attrValueList">
  <el-table-column>
    <template slot-scope="{row, $index}">
        <el-input v-model="row.valueName">
```





### 深拷贝

```js
拷贝:必须出现另外一个内存空间.
深拷贝: 对象当中所有的对象数据在拷贝给另一个内存的时候,拷贝数据而非地址
浅拷贝: 对象当中所有的对象数据再拷贝给另一个内存的时候,拷贝地址

如何深拷贝?使用lodash中的cloneDeep方法
import cloneDeep from 'lodash/cloneDeep';
this.xxx = cloneDeep(yyy)
```



### 编辑模式和查看模式的切换

```js
给每个属性值添加<模式标识>数据,用于确定这个属性值当前是input还是span
 添加属性值时,都添加一个属性isEdit:true, 代表添加属性值是编辑模式
 修改属性值时,都添加一个属性isEdit:false, 这里需要使用$set才能实现响应式.!!
 每个属性值根据isEdit决定展示input还是span,使用v-if
```



```js
<el-input 
	v-if="row.isEdit"
	@blur="toLook(row)"
	@keyup.enter.native="toLook(row)"
></el-input>

<span v-else @click="toEdit(row)"> {{row.valueName}} </span>

//点击添加属性值回调
addAttrValue() {
    this.attrForm.attrValueList.push({
        attrId: this.attrForm.id, //这个id代表属性值所属属性的id,有id就是修改页面,没有就是增加页面undefined
        valueName: '', //需要用户输入的属性值名称
        isEdit: true  // 这个属性标识证明这个属性值的模式是编辑模式
    })
}

//点击添加修改属性按钮显示修改属性的页面
showUpdateDiv(row) {
    this.isShowList = true;
    this.attrForm = cloneDeep(row);
    
    this.attrForm.attrValueList.forEach((item)=>{
        this.$set(item, 'isEdit', false)
    })
}

//input失去焦点或回车,切换为查看模式
toLook(row) {
    //1.失去焦点或回车后,需要判断数据中是否有属性值名称,没有值或值不合法,不会变为span
    if(row.valueName.trim()==='') {
        return row.valueName = '';
    }
    //2.还需要判断当前输入的值,是否和已经存在的属性值相同.如果重复,不能变为span
    let isRepeat = this.attrForm.attrValueList.some(item=>{
        if(item !== row){
            return item.valueName === row.valueName
        }
    })
    if(isRepeat){
        this.$message.info('重复了');
        row.valueName = '';
        return;
    }
    row.isEdit = false;
}

//对span进行点击时,切换为编辑模式
toEdit(row) {
    row.isEdit = true;
}
```



### 响应式对象数据属性的添加和删除

```js
//响应式数据添加this.$set(),  Vue.set()
this.$set(item, 'isEdit', false) //需要添加属性的对象,添加的属性性,属性值

//响应式数据删除 this.$delete() Vue.delete()
错误: 直接delete删除对象当中的属性，不会导致页面更改.因为响应式属性只是在检测属性值的改变而不是检测属性的删除
正确：我们需要使用Vue.delete this.$delete方法  除了删除，还添加了更新界面的操作
```



### 自动获取焦点

```js
//什么时候: 1.添加属性值  2.从span变为input的时候
//使用方法: 元素添加focus()方法
//如何获取当前元素? ref+下标index
//注意事项: 使用this.$nextTick()方法, 避免元素还未创建成功就读取产生的错误.
 //this.$nextTick() 页面更新完成后自动调用

addAttrValue() {
    this.$nextTick(()=>{
        this.$refs[this.attrForm.attrValueList.length - 1].focus();
    })
}

toEdit(row,index) {
    this.$nextTick(()=>{
        this.$refs[index].focus();
    })
}
```



### 气泡确认框

```js
//按钮点击事件为onConfirm
```





### 保存属性操作

```js
//
async save(){
    //1.获取参数
    let attr = this.attrForm;
    //2.整理参数
    //2.1 如果属性值名称如果为空串,从属性值列表中删除(没有失去焦点的情况保存)
    //2.2 属性值中试试isEdit属性
    attr.attrValueList = attr.attrValueList.filter((item)=>{
        if(item.valueName !==''){
            delete item.isEdit;
            return true;
        }
    })
    //2.3 属性值列表中如果没有属性值,不发请求
    if(attr.attrValueList.length === 0){
        this.$message.info('须有属性才能保存');
        return;
    }
    //3.发请求
    try{
        //4.成功
        await this.$API.attr.addOrUpdate(attr);
        this.$message.success('保存成功')
        this.isShowList = true;
        this.getAttrList();
    }catch(error){
        //5.失败
        this.$message.error('失败')
    }
}
```





## view-product-component-spuform





### refs子组件获取

```js
//高级组件通信中
 $refs: 包含所有有ref属性的标签对象或组件对象的容器对象
 能方便的得到子组件/后代组件/父组件/祖辈组件对象, 从而更新其data或调用其方法
```





### .sync父子组件通信同步

```js
<SpuForm v-show="isShowSpuForm" @update:visible="isShowSpuForm=$event" />
<SpuForm v-show="isShowSpuForm" :visible.sync="isShowSpuForm" />
    
子组件中
<el-button @click="$emit('update:visible', false)" ></el-button>
```



### el-table中的列数据展示获取

```js
<el-table :data="xx" border> //通过data获取数据 border关键字有无为边框显示的true/false

<el-table-column prop="prop" label="label"> 
//每列获取的prop都是xx(对象或数组)中按顺序的一项
//label显示列的名称
//width 直接数字赋值,无需单位px等
//一般在内部的select, input组件上有v-model属性,自动收集到:data对应的变量中
```





### 销售属性值的收集

```js
//点击添加销售属性值列表当中的按钮
showInput(row) {
    //1.实现后添加的属性响应式
    this.$set(row, 'inputVisible', true);
    //2.自动获取焦点
    this.$nextTick(()=>{
        this.$refs.saveTagInput.focus();
    })
}

//el-select中属性的收集
<el-select v-model="xxx"> 展示和收集,'xxx'一般在data中设置好,格式根据要求
 <el-option  vfor :label="xx.xx" :value="xx.xx" > label是展示,value是收集到xxx中
```





## view-product-sku





### 数据展示和收集

```js
//不用template直接展示动态数据
<el-form-item  lable="label" label-width="100px" >
  {{spu.spuName}}
</el-form-item>

//select组件中的数据收集 v-model收集的就是option中value的值
<el-select  v-model="attr.attrIdValueId">
    <el-option :value="`${attr.id}:${attrValue.id}`" >
        
//图片列表的收集 selection-change会自动获取选中的图片的信息
<el-form-item label="图片列表">
    <el-table @selection-change="handleSelectionChange">
```





### 图片操作:设为默认|默认

```js
//在获取图片列表的同时,配置isDefault属性,避免后期使用$set
//这这里添加好属性后,直接将其赋值给响应式属性this.spuImageList,所以内部也都是响应式的
spuImageList.forEach((item)=>{item.isDefault = '0'});
this.spuImageList = spuImageList;

//排它实现 设为默认和默认的切换
setDefaultImg(row, spuImageList) {
    spuImageList.forEach((item)=>(item.isDefault = '0'));
    row.isDefault = '1';
}
```





### 平台/销售属性值列表中reduce方法使用

```js
//
skuForm.skuAttrValueList = attrList.reduce((prev, item)=>{
    if(item.attrIdValueId){
        let [attrId, valueId] = item.attrIdValueId.split(':');
        let obj = { attrId, valueId };
        prev.push(obj)
    }
    return prev;
},[])
```





## view-product-spu





### 三级联动组件

```js

```



### 分页器

```js
<el-pagination>
```



### 3个页面显示隐藏

```js
3个页面显示隐藏通过2个数据实现,通过v-show实现
isShowSpuForm=false;
isShowSpuForm=false;

<div v-show="!isShowSpuForm && !isShowSpuForm">
<SpuForm v-show="isShowSpuForm"></SpuForm>
<SkuForm v-show="isShowSkuForm"></SkuForm>
```



#### 三级联动组件可操作性

```js
3级联动组件的可操作性在spu页面时根据是否进入SpuForm,SkuForm页面相关.没有进入可点击,进入了不能点击.

2种实现:
2.1 当点击相关回调时,直接将this.isShowList的值变为false
2.2 监视.当SpuForm,SkuForm状态改变时,更改this.isShowList状态
watch:{
    isShowSpuForm(newVal, oldVal){
      this.isShowList = !newVal;
    },
    isShowSkuForm:{
      handler(newVal, oldVal){
        this.isShowList = !newVal;
      }
    }
  },
```





## view-product-SpuForm





### 显示sku列表功能

```js
使用dialog弹出框显示sku列表信息+table组件搭配loading样式

在两个el-card组件之外,引入el-dialog组件
loading样式引入前后的true/false
```





### 抽屉

```js
<el-drawer
:visible.sync="isShowSkuInfo"
:with-header="false"   //标头是否显示
size="50%">  //size表示占据浏览器的多少
<el-row>

//span表示占据几格(一行被分为24格)    
<el-col :span='5'></el-col>
```





### scoped和深度作用选择器

```js
scoped添加和不添加的区别
scoped不写，那么当前组件的样式会影响其它组件
scoped写上，把样式作用在当前组件内部及子组件的根元素身上 

scoped如何把样式作用在本组件和子组件根元素身上
加了scoped就会有唯一的一个标识值，而这个标识数据会作为被影响到的元素的属性
这个元素的样式会在选择器的最右侧添加这个属性选择器，交集选择器。


scoped中有些元素直接添加样式就会生效，而有些元素直接添加样式就不会生效？
一句话：scoped只能把样式作用延长到自身元素还有子组件的根元素身上
如果在scoped书写的样式，刚好是作用在子组件的根元素身上，就会生效
如果在scoped书写的样式，不是作用在子组件根元素而是子组件根元素内部元素身上，就不会生效


加了scoped，还想让子组件根元素内部元素的样式生效（使用深度作用选择器）
1、把子组件内部元素的样式重新写一个style写，不加scoped，用的不多

2、深度作用选择器的写法    ********************
如果是原生css 深度作用选择器  
父元素 >>> 选中的元素 
如果是less  scss 预编译的css文件
/deep/ 用于less
::v-deep  都行


添加深度作用选择器css怎么处理的
不加添加深度作用选择器的时候，scoped的唯一标识会作为属性选择器添加在css选择器最右侧选中的元素身上，去限制
添加了深度作用选择器的时候，scoped的唯一标识会作为属性选择器添加在css选择器最左侧元素身上，限制不了选中的元素
```





## view-product-trademark



### api文件格式

```js
//将本来可以存在在index.js中的所有接口请求函数,按照页面归属拆分成相应的文件夹. 并将index.js改成引入并暴露的方式. 最终在main.js中可以导入使用.

api/product/trademark.js
api/product/attr.js
api/product/index.js

//index.js中引入并暴露的方式, default不能省略. 所有的暴露本质上都是一个对象
export {default as trademark} from './trademark';
export {default as attr} from './attr';

//main.js
import * as API from '@/api/product';
Vue.prototype.$API = API;

//页面中使用
this.$API.trademark.addOrUpdate();
```



### el-table中数据的展现

```js
//1.属性介绍
data="data" 这个属性是用来展示数据的，但是现在我们还没数据,data必须是一个数组
            表格展示数据的时候，数据的格式必须是数组，数组内部是对象
border 这个属性代表是否需要边框

//数据传递
table当中:data="trademarkList"，代表的是表格要展示的数组
当我们写上这个的时候，table会把这个数组给每个列传递一份
每个列内部都是在展示我们的这个数组数据 v-for.每个列在展示数据的时候，结构可自定义,也就是说table列内部是有作用域插槽的

table的列在展示数据的时候，如果我们的数据就是要展示的数据，那么直接写prop就行
如果我们的数据不是直接展示的数据，而是需要其它的结构，那么必须使用作用域插槽
<template slot-scope="{row, $index}"
row代表当前遍历的对象
$index代表当前遍历对象的下标
```



### el-table中的列column

```js
//属性展示
prop="prop" 需要展示数据当中的某个属性时使用,可直接使用数据中的属性
label="label" 代表这一列的名称
width="width" 代表这一列的宽度 直接写数字不需要px.不写则列平分
align="center" 可以让某个列中的数据居中显示
```



### 分页器

```js
//属性介绍
这次我们用的是element-ui给我们封装的分页器组件
    :current-page="pageNum"  传递的当前页码  
    :page-size="pageSize"    传递的每页数量
    :total="totalCount"      传递的总数
    :pager-count="5"         传递的连续页数，如果写的是5，连续数是3 5包含了首页和尾页
    @current-change="handleCurrentChange"  切换页面的事件

    以前没写过的
    :page-sizes="[10, 20, 50]" 在页面可以改变当前页的数量
    @size-change="handleSizeChange" 改变当前页数量的事件

    layout="total, sizes, prev, pager, next, jumper" //可以改变分页器前后顺序（布局顺序）

    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
//回调函数

//请求当前页面回调的2种写法
```



### 嵌套表格Dialog对话框

```js
//Dialog 对话框 <el-Dialog> 自定义内容-嵌套表单的dialog
el-form代表的是表单,表单里面是表单项,每个表单项都可以通过label-width设置表单项名称的宽度,每个表单项都可以通过label设置表单项名称
form当中都会写：model="对象" 
 作用：1、以后用来去对这个form表单验证 2、用来标识这个form收集的数据收集到哪


```



### upload

```js
在拷贝upload组件的时候，把html  css   js相关的东西全拷贝
action 控制的是上传的接口地址
上传图片分为两步：
我们在上传的时候需要调用接口，把本地的图片传到后端服务器.然后,后端服务器会给我们返回这个图片在后端服务器上的地址（线上路径). 我们要收集的东西就是返回来的这个路径
          

:show-file-list="false"代表显示的只有一张图片，不是多个（照片墙） 
:on-success="handleAvatarSuccess" 代表图片上传成功后的回调
:before-upload="beforeAvatarUpload" 代表图片上传前的回调

beforeAvatarUpload(file) {
    //file代表的是你上传的那个图片
    const isJPG = file.type === "image/jpeg"; //判断上传的图片是否是jpg格式
    const isLt2M = file.size / 1024 / 1024 < 2; //判断上传的图片大小是不是小于2M
}

handleAvatarSuccess(res, file) {
      //res代表上传成功后返回的响应数据
      //file代表上传成功后返回的图片文件本身
      // console.log(res,file)
}
```



### 图片上传取消按钮bug

```js
//在增加按钮点击的回调中,将tmForm对象数据清空  如果是弹出框的取消按钮也可以

```



### 修改按钮

```js
如果采用this.tmForm = 对象的形式,会出现数据修改同步的bug. 因为引用的是对象地址,在弹出框中修改,列表中的数据也会跟着发生变化.
使用数据拷贝解决,因为都是基本数据类型, 所以使用扩展运算符(...)实现浅拷贝. 扩展运算符是最简单的浅拷贝方式.

1.浅拷贝
 this.tmForm = {...row} //最简单的浅拷贝形式 扩展运算符
2.属性赋值
this.tmForm.tmName = row.tmName;
```



### 弹出框dialog 成功失败回调

```js
//成功的流程
1.弹出提示信息
2.关闭弹出框
3.重新发请求获取列表页数据
 3.1 如果添加成功,重新请求的是第一页的数据,添加的新数据在最后一页(不存在id属性)
 3.2 如果修改成功,发请求获取当前页数据
this.$API.trademark.addOrUpdate(trademark.id?this.page:1)

//失败的流程 
弹出信息提示
```





### 删除按钮回调

```js
//使用MessageBox弹框中的'确认消息' this.$confirm

//删除成功
1.删除成功后的提示 await this.$API.trademark.delete(row.id)
2.重新发送请求获取列表数据 
 2.1 如果当前页只有一个数据,那么要请求前一页数据
 2.2 如果当前页大于1个数据,那么请求当前页数据
this.getTardemarkList(this.trademarkList.length>1?this.page:this.page-1)
```





### '添加按钮'增加表单验证

```js
'添加'按钮 加上表单验证+自定义校验规则

//表单验证
1.规则
 每个要验证的字段规则都是一个数组.数组里面是对象,每个对象就是一个规则
 每个规则对象里包含3个:1.规则 2.错误提示信息 3.触发时机
 触发时机有3种: 1.失去焦点blue 2.内容改变的时候change 3.整体验证时
2.代码
<el-form>中添加 :rules='rules'
data(){}中return返回对象中添加el-form-item的验证对象 rules{} 
 验证规则rules的格式:
 rules:{
     tmName(使用prop获取):[
         {required:true, message:'报错信息', trigger:'blur'},
         {min:3,max:5,message:'长度在3-5个字符', trigger:'blur'}
     ]
 }

3.使用自定义校验规则代替rules中的规则
 需要在相应规则验规里添加配置: { validator: validatePass, trigger: 'blur' }
 需要在data中定义配置的函数: validatePass
 var validateTmName = (rule, value, callback) => {
     if (value.length<2 || value.length>20) {
         // value就是后期验证的用户输入的数据
         // callback是回调,如果cb调用时传递了参数,代表验证失败;如果没有传递参数,代表验证成功
         callback(new Error("tmName长度必须是2-20之间"));
     } else {
         callback();
     }
 };

4.在添加/修改按钮中,添加表单验证的回调
 submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },

5.点击取消按钮后,将报错信息消除
 在取消按钮添加回调,并打上ref标记
 <el-button @click="cancelUpload('tmForm')" ref="cancelUpload">取 消</el-button
 cancelUpload(tmForm){
     this.$refs[tmForm].resetFields();
     this.dialogFormVisible = false;
 }
```



## view-product-category





### 表格懒加载

```js
 <el-table
      border
      lazy
      :data="categorys"
      :load="load"
      style="width: 900px;margin-bottom: 20px;"
      :row-key="getRowKey"
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
      :row-class-name="tableRowClassName"
    >
```





### 表格树形结构







## 知识点

### 不使用脚手架配置vue项目

```js
webpack：实现模块化，js文件可以使用require、exports、import、export进行连结。
webpack-dev-server：可以提供一个虚拟服务器，实时预览，8080端口本质上就是webpack-dev-server在提供服务。打包的bundle.js不会真正物理生成

```

### webpack配置

```js
npm i webpack@4  vue@2 vue-loader vue-template-compiler css-loader style-loader -S
npm i webpack-dev-server@3 -g  //代理服务需要全局安装 ??



//1.安装webpack 4版本.  最新5版本和和webpack-dev-server有点不兼容

//2.配置文件 webpack.config.js

//3.webpack缺点 需要引入webpack-dev-server
 3.1 不能实时打包，代码一变化，就进行打包
 3.2 没有8080服务器，网页需要双击打开，这意味着js文件不能虚拟生成。

 //4.安装webpack-dev-server，装版本3
 
 //5.更新配置webpack.config.js

 //6.安装其他需要的扩展  css-loader style-loader
 
 //7.安装其他需要的插件 vue-loader vue-template-compiler
 
 //8.手写基本的vue项目文件结构
```



```js
//webpack.config.js
const {VueLoaderPlugin} = require('vue-loader')
module.exports = {
     entry:"./src/main.js"
     output:{
     	filename:'bundle.js',
 		publicPath:'可自定义'    	
 	},
     devServer:{
         //根目录
         contentBase:'./public',
         port:8080   
     },
     //写loader的地方，让webpack能够识别更多类型文件
     module:{   //不是modules
         rules:[
             {
                 test:/\.css$/,
                 use:['style-loader', 'css-loader']
             },
             {
                 test:/\.vue$/,
                 use:['vue-loader']
             }
         ]
     },
     // 写loader的地方，让webpack能够识别更多类型文件
     plugins:[
         new VueLoaderPlugin()
     ]
 }
```





### 扩展

```js
nodejs中的方法 http://nodejs.cn/api/querystring.html

//1.作用: 用于解析和格式化URL查询字符串

//2.使用
 2.1 引入 const querystring = require('querystring');
 2.2 使用stringify方法 通过遍历对象的自身属性从给定的 obj 生成 URL 查询字符串。

 
 querystring.stringify({ foo: 'bar', baz: ['qux', 'quux'], corge: '' });
// 返回 'foo=bar&baz=qux&baz=quux&corge='

querystring.stringify({ foo: 'bar', baz: 'qux' }, ';', ':');
// 返回 'foo:bar;baz:qux'
```



### 小程序补充知识

```js
1. 所有{{ }}插值不能有函数的调用. 解决方法就是使用wxs文件

2. wxs文件使用
 主文件:
 <wsx src="./test.wxs" module="test"/>    
 <view {{test.xxx(arr)}}>
 </view>

3.类名如果要动态使用函数,必须写wxs文件
```



### 小程序和vue比较

```js
vue循环不需要加{{}}

小程序循环有{{}}
<view wx:for="{{arr}}" :key="index">
    
小程序中事件监听不加{{}}, 但是data-n要有{{}}
<button bindtap="taphandle" data-n="{{index}}"></button>

小程序可以迭代所有对象,相当于(value,index) in object
二层循环要必会键名相同, 使用wx:for-item="xxx" wx:for-index="yyy"来更新键名和值

```





### 筛选器 ++

```js

```





### 双色球

```js

```





### 小程序中使用有赞 Vant weap Ui库

```js
vant ui 是服务于vue的
vant weapp ui是服务于小程序的
```





### 比较数组中的对象和对象是否相同

```js
//比较属性名是否存在

 for(let i = 0 ; i < this.nowChoosed.length ;i++) {
     if(this.nowChoosed[i].n == item.n) return true;
 }
```





### vue 小程序中图片路径

```js
根路径public文件夹

<img src="`./image/${xx}/xx.jpg`">
    
<view>
    <image src="/images/xx.jpg">
</view>
```



### 

### 小程序/vue 动态样式

```js
 wx:for="{{33}}" wx:key="index"

<view>   小程序中是表达式  vue中是对象
    <image src="{{}}" class="imgStyle, {{index+1===idx?'current':""}}"
</view>

<view>  ??
    <image src="{{}}" class="imgStyle, {{current: index+1===idx}}"
</view>


:class="['redBalls', {current: a>b}]"
```



### 小方法

```js
//随机数 取整

parseInt(Math.random()*33) + 1;
~~(Math.random()*33) + 1;     //运算符, 取整

//小程序中data中数组更新 使用数组的拆包形式 不能使用push push返回的是新的数组长度

data:{
    allArr:[],
    redArr:[],
    blueNumber:4
}
this.setData({
    allArr:[...this.data.allArr, {red:this.data.redArr,blue:this.data.blueNu}]
})


//排序
getOrder(arr){
    arr=arr.sort(function(a,b){
        return a-b;
    });
    return arr.join(',')
}

//删filter改map增加...

 deleteBrand(car){ //如果将形参car改为item,则是全部删除
      this.carChoosed = this.carChoosed.filter(item=>item!==car)
    }
```









### 工作相关

```js
蓝湖


```





### 小程序自定义事件

```js
this.triggerEvent('事件名称', value)
```





### vue中$data用法

```js
$data对应的data中的数据, 可以再模板中实现this的功能. 但2.6版本中this也可以使用.

可以传动态值  $data[name]

data(){
    return {
        a:1,
        b:2,
        name:{a:33,b:44}
    }
}

$data[name]
```



### 父子组件受控++

```js
//受控: 相互通信

子组件改变自定义属性的值, 因为不能双向数据绑定, 所以有两种模式:克隆+watch, value+onchange


父组件给子组件传一个引用类型值，此时有两种处理方法：
①	子组件克隆一下这个值，就可以愉快的v-model到这个克隆值上了（因为不能直接v-model到props上，不允许），v-model要结合watch使用，watch中写this.$emit()；
②	子组件不克隆，直接用props，但是当改变的时候，直接$emit父亲。


增加表单：正则表达式的验证、不能都用复选框（也要有下拉选择、单选按钮）、PCAS的集成。


//element-ui种 input的checked属性是惰性的, 更改以后不会再变化. 需要将他封装成一个函数

//判断数组种一项是否选中来更新样式, 一般使用includes方法
```





### Vue中v-model是如何实现的?

```js
Ojbect.defineProperty()数据劫持

Vue中自定义组件如何使用v-model？？
答：自定义组件中使用model来定义双向绑定的值，model是个对象，它必须有prop属性和event属性，缺一不可。prop属性表示父亲的v-model=””引号中的那个东西到底是谁。props: []数组中必须“迎接一下这个值”。自定义组件中要改变值，必须使用event中定义的这个方法，如果要通知父亲改变，就$emit()这个函数即可。



//2.如何影响data中的值
两种方式: data中更改或生命周期中更改
```





### element-ui相关

```js
1.form表单中的rules验证,添加正则验证: pattern   //文档中没有找到
rules:{
 name: [
   { required: true, message: '请输入姓名', trigger: 'blur' },
   { pattern: /^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/, message: '请输入合乎常理的姓名', trigger: 'blur' }
 ],
}
 
 
 2.
```





### json-server

```js
//使用json-server生成相应开头的手机号码
var mockjs = require('mockjs');
const random = mockjs.Random();

mobile = Number(random.pick(['139', '176','186','135'])+random.integet(0,99999999).toString().padStart(8,'0'))
```





## 业务实现

### 两个轮询避免冲突

现有两个函数'toReceiveMsg', 'toUpdateUserStatus',轮询间隔分别为3秒和90秒.如何避免在访问一个函数的同时,假如另一个函数也调用了,延迟这个函数的调用?

```javascript
let isUpdate = false,
    nextFunName = '';

async function toReceiveMsg() {
  if (isUpdate) {
    return nextFunName = 'toReceiveMsg'
  }
  let res = await axios.get({});
  if (res.code === '200') {
    //some code here
    if (nextFunName === 'toUpdateUserStatus') {
      toUpdateUserStatus()
      nextFunName = ''
    }
  }
  isUpdate = false;
}


async function toUpdateUserStatus() {
  if (isUpdate) {
    return nextFunName = 'toUpdateUserStatus'
  }
  let res = await axios.get({})
  if (res.code === '200') {
    //some code here
    if (nextFunName === 'toReceiveMsg') {
      toReceiveMsg()
      nextFunName = ''
    }
  }
  isUpdate = false
}
```















































































































































































































































H
