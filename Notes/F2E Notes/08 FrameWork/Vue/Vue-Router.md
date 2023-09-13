
# 路由Router

### 安装

#### 网页/CDN

[Unpkg.com (opens new window)](https://unpkg.com/)提供了基于 NPM 的 CDN 链接。

安装最新版本:
`https://unpkg.com/vue-router/dist/vue-router.js`

安装指定版本:
`https://unpkg.com/vue-router@2.0.0/dist/vue-router.js`

省略的写法:
`https://unpkg.com/vue-router@2`

**实例**
```html
<script src="https://unpkg.com/vue@2"></script>
<script src="https://unpkg.com/vue-router@3"></script>
```

#### NPM

在模块化工程中使用, 必须通过`Vue.use()`明确安装路由功能

```javascript
npm i vue-router

// router/index.js
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.sue(VueRouter)
```


#### Vue CLI



#### 构建开发版



### 基础

#### vue-router插件

```js
//使用方法和Vuex插件用法相似.

1.	vue的一个插件库
2.	专门用来实现一个SPA应用
3.	基于vue的项目基本都会用到此库
4.	中文文档: http://router.vuejs.org/zh-cn/
5.	下载: npm install vue-router -S
```



#### 路由介绍及分类

1.	什么是路由?
1.1.一个路由就是一个映射关系(key:value)
1.2.key为路径, value可能是function或component

2.	路由分类
2.1.后端路由：
1)	理解： value是function, 用来处理客户端提交的请求。
2)	注册路由： `router.get(path, function(req, res))`
3)	工作过程：当服务器接收到一个请求时, 根据请求路径找到匹配的路由, 调用路由中的函数来处理请求, 返回响应数据
2.2.前端路由：
1)	浏览器端路由，value是component，用于展示页面内容。
2)	注册路由: `<Route path="/test" component={Test}>`
3)	工作过程：当浏览器的path变为/test时, 当前组件就会变为Test组件



#### 起步案例

将组件 (components) 映射到路由 (routes)，然后告诉 Vue Router 在哪里渲染它们

**1.定义路由器**

```javascript
import PageHome from './components/pages/Home';
import PageAbout from './components/pages/About';
const router = new VueRouter({
	routes: [
		{
			path: '/',
			component: PageHome
		},
		{
			path: '/about',
			component: PageAbout
		}
	]
});
```

**2.添加到Vue实例中**
```js
import router from './router';
	new Vue({
		el: '#app',
		router: router
});
```
**3.添加特殊组件`<router-view>`**
为了让它显示到页面上，需要添加一个特殊的组件`<router-view/>`
然后，在模板中，将`<router-view />`放到任何你想让路由所返回的组件被显示的地方。

#### 注意事项
* 通过注入路由器，在任何组件内通过 `this.$router` 访问路由器，也可以通过 `this.$route` 访问当前路由
* 使用 `this.$router` 的原因是我们并不想在每个独立需要封装路由的组件中都导入路由。
* 当 `<router-link>` 对应的路由匹配成功，将自动设置class属性值 `.router-link-active`



### 路由模式

#### Hash模式

> [浅谈前端路由原理hash和history - 掘金 (juejin.cn)](https://juejin.cn/post/6993840419041706014)

>`vue-roter` 的两种路由模式，及差异化，简单来讲就是，`hash` 路由兼容更好，但是带#显得丑些; `histroy` 和正常 url 路径一样，但是需要在服务器进行单独配置

##### 概述及特点

##### 定义
> `hash` 模式是一种把前端路由的路径用井号 `#` 拼接在真实 `url` 后面的模式。当井号 `#` 后面的路径发生变化时，浏览器并不会重新发起请求，而是会触发 `onhashchange` 事件。

`vue-router` 默认 hash 模式 —— 使用 URL 的 hash 来模拟一个完整的 URL，于是当 URL 改变时，页面不会重新加载。

 `hash`（#）是 `URL` 的锚点，代表的是网页中的一个位置，单单改变 `#` 后的部分，浏览器只会滚动到相应位置，不会重新加载网页.

同时每一次改变 `#` 后的部分，都会在浏览器的访问历史中增加一个记录，使用 "后退" 按钮，就可以回到上一个位置，所以说 `hash` 模式通过锚点值的改变，根据不同的值，渲染指定 `DOM` 位置的不同数据。

`#` 符号本身以及它后面的字符称之为 `hash`，可通过` window.location.hash` 属性读取。



##### 特点

- `hash` 虽然出现在URL中，但不会被包括在 `HTTP` 请求中。它是用来指导浏览器动作的，对服务器端完全无用，因此，改变 `hash` 不会重新加载页面
- 可以为 `hash` 的改变添加监听事件onhasChange()：
- window.addEventListener("hashchange", fncEvent, false)
- 每一次改变 hash（`window.location.hash`），都会在浏览器的访问历史中增加一个记录
- url 带一个 `#` 号



#### 如何获取页面的hash变化

**监听$route变化**

```javascript
// 监听,当路由发生变化的时候执行
watch: {
  $route: {
    handler: function(val, oldVal){
      console.log(val);
    },
    // 深度观察监听
    deep: true
  }
},
```



**window.location.hash**

window.location.hash 的值可读可写，读取来判断状态是否改变，写入时可以在不重载网页的前提下，添加一条历史访问记录。





#### History模式

##### 概述及特点

**定义**
history模式的URL中没有#，它使用的是传统的路由分发模式，即用户在输入一个URL时，服务器会接收这个请求，并解析这个URL，然后做出相应的逻辑处理。

**特点**
- URL中不含#号
- 需要后配支持,对每一个它不能识别的请求做出响应，并返回你所依赖的HTML页面.否则容易返回404.

**使用**
路由器的mode改为history的方式 (vue-router 3.0)
```js
const router = new VueRouter({
	mode: 'history',
	routes: [
		{ path: '/', component: PageHome },
		{ path: '/about', component: PageAbout }
	]
});
```












### 动态路由匹配

#### 背景

<span style="color:blue">有时候我们要将所有路由，全都映射到同个组件</span>. 例如，我们有一个 `User` 组件，对于所有 ID 各不相同的用户，都要使用这个组件来渲染。那么，我们可以在 `vue-router` 的路由路径中使用<span style="color:blue">“动态路径参数”(dynamic segment) </span>来达到这个效果

#### 代码实现

<span style="color:blue">动态路径参数 以冒号开头</span>

像 `/user/foo` 和 `/user/bar` 都将映射到相同的路由。

```javascript
const User = {
  template: '<div>User</div>'
}

const router = new VueRouter({
  routes: [
    // 动态路径参数 以冒号开头
    { path: '/user/:id', component: User }
  ]
})
```



#### 获取路径参数的值

一个“路径参数”使用冒号 `:` 标记。当匹配到一个路由时，参数值会被设置到<span style="color:blue"> this.<span style="color:red">$route</span>.params</span>，可以在每个组件内使用。

你可以在一个路由中设置多段“路径参数”，对应的值都会设置到 `$route.params` 中。例如：

| 模式                          | 匹配路径            | $route.params                          |
| ----------------------------- | ------------------- | -------------------------------------- |
| /user/:username               | /user/evan          | `{ username: 'evan' }`                 |
| /user/:username/post/:post_id | /user/evan/post/123 | `{ username: 'evan', post_id: '123' }` |




##### query参数设置流程

* 路由定义: query参数无需声明

* from路由组件, 通过`<router-link>`或路由器实例方法进行路由跳转
  * path接收的参数: path字符串/path对象/命名路由/path+query对象
  * 形成的路径: `/route?id=123`
* to路由组件, 通过路由实例对象`$route.query`来获取







##### params参数设置

* 路由定义:  路由对象path属性, 添加后缀`:xxx`
* from路由组件: 通过`<router-link to>`或路由器实例方法进行路由跳转
  * push等接收的参数类型: path字符串/path对象/命名路由
  * 形成的路径: `/route/id`
  * 如果路径中同时存在params和query参数, params参数需要设置在前.
* to路由组件: 通过路由实例对象`$route.params`来获取





#### 响应路由参数的变化

当使用路由参数时，例如从 `/user/foo` 导航到 `/user/bar`，**原来的组件实例会被复用**。因为两个路由都渲染同个组件，比起销毁再创建，复用则显得更加高效。**不过，<span style="color:red">这也意味着组件的生命周期钩子不会再被调用</span>**。

复用组件时，想对路由参数的变化作出响应的话,有3种方式:
* watch
* beforeRouteUpate (vue 2.2+)
* router key

##### watch
在beforeRouteUpdate诞生前的用法
```javascript
watch: {
  $route(to, from) {
    //对路由变化作出响应....
  }
}
```


##### beforeRouteUpdate
```javascript
beforeRouteUpate(to, from, next) {
}
```


##### router key
> https://mp.weixin.qq.com/s/0Yekkc08ozbNxuquHVGveg
```html
<router-view v-bind="$route.fullpath"></router-view>
```







### 路由顺序
>vue-router在内部通过遍历路由数组的方式来挑选被显示的路由，并选取其中匹配到当前URL的第一个。


#### 404页面
**如何配置**
>可以利用vue-router会按顺序搜索路由直到与通配符（\*）匹配的特点，来渲染一个显示错误页面。


常规参数只会匹配被 `/` 分隔的 URL 片段中的字符。如果想匹配**任意路径**，我们可以使用<span style="color:blue">通配符 (`*`)</span>

```javascript
const router = new VueRoute({
	routes: [
		// ..．你的其他路由．..
		{
			path: '*',
			component: PageNotFound
		}
	]
});
```

**嵌套路由中的404**
在使用嵌套路由时，如果没有匹配到子路由，则路由器会继续往下对其父路由之外的路由列表进行搜寻，所以通配符路由返回的都是同样的PageNotFound组件。如果想让子路由的错误页面也能在父组件中显示，则需要在子路由数组中添加该通配符路由
```js
const router = new VueRoute({
	routes: [
		{
			path: '/settings',
			component: PageSettings,
			children: [
				{
					path: 'profile',
					component: PageSettingsProfile
				},
				{
					path: '*',
					component: PageNotFound
				}
			]
		},
			{
			path: '*',
			component: PageNotFound
		}
	]
});
```

##### 注意事项

* 含有*通配符*的路由应该放在最后。
* 路由 `{ path: '*' }` 通常用于客户端 404 错误。如果你使用了*History模式*，请确保[正确配置你的服务器](https://v3.router.vuejs.org/zh/guide/essentials/history-mode.html)。



##### 获取通配符匹配的内容

当使用一个*通配符*时，`$route.params` 内会自动添加一个名为 `pathMatch` 参数。它包含了 URL 通过*通配符*被匹配的部分：

```javascript
// 给出一个路由 { path: '/user-*' }
this.$router.push('/user-admin')
this.$route.params.pathMatch // 'admin'
// 给出一个路由 { path: '*' }
this.$router.push('/non-existing')
this.$route.params.pathMatch // '/non-existing'
```



#### 高级匹配模式
>`vue-router` 使用 [path-to-regexp (opens new window)](https://github.com/pillarjs/path-to-regexp/tree/v1.7.0)作为路径匹配引擎，所以支持很多高级的匹配模式，例如：可选的动态路径参数、匹配零个或多个、一个或多个，甚至是自定义正则匹配。
>查看它的[文档 (opens new window)](https://github.com/pillarjs/path-to-regexp/tree/v1.7.0#parameters)学习高阶的路径匹配，还有[这个例子 (opens new window)](https://github.com/vuejs/vue-router/blob/dev/examples/route-matching/app.js)展示 `vue-router` 怎么使用这类匹配。

<iframe src="https://codesandbox.io/embed/vuerouter-advancedmatch-565fmm?autoresize=1&fontsize=12&hidenavigation=1&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="vueRouter/advancedMatch"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>





#### 匹配优先级

匹配的优先级就按照路由的定义顺序：路由定义得越早，优先级就越高。



### 嵌套路由

#### 背景

实际生活中的应用界面，通常由多层嵌套的组件组合而成。同样地，URL 中各段动态路径也按某种结构对应嵌套的各层组件，例如：

```
/user/foo/profile                     /user/foo/posts
+------------------+                  +-----------------+
| User             |                  | User            |
| +--------------+ |                  | +-------------+ |
| | Profile      | |  +------------>  | | Posts       | |
| |              | |                  | |             | |
| +--------------+ |                  | +-------------+ |
+------------------+                  +-----------------+
```



#### 如何实现嵌套路由

组件中的设置:
一个被渲染组件同样可以包含自己的嵌套 `<router-view>`。例如，在 `User` 组件的模板添加一个 `<router-view>`：

```javascript
const User = {
  template: `
    <div class="user">
      <h2>User {{ $route.params.id }}</h2>
      <router-view></router-view>
    </div>
  `
}
```

路由中的设置:
要在嵌套的出口中渲染组件，需要在 `VueRouter` 的参数中使用 `children` 配置：

```javascript
const router = new VueRouter({
  routes: [
    {
      path: '/user/:id',
      component: User,
      children: [
        {
          // 当 /user/:id/profile 匹配成功，
          // UserProfile 会被渲染在 User 的 <router-view> 中
          path: 'profile',
          component: UserProfile
        },
        {
          // 当 /user/:id/posts 匹配成功
          // UserPosts 会被渲染在 User 的 <router-view> 中
          path: 'posts',
          component: UserPosts
        }
      ]
    }
  ]
})
```



#### 注意事项

* **以 `/` 开头的嵌套路径会被当作根路径。 这让你充分的使用嵌套组件而无须设置嵌套的路径。**

* `children` 配置就是像 `routes` 配置一样的路由配置数组



#### 空的子路由设置

基于上面的配置，当你访问 `/user/foo` 时，`User` 的出口是不会渲染任何东西，这是因为没有匹配到合适的子路由。如果你想要渲染点什么，可以提供一个 空的 子路由：

```javascript
const router = new VueRouter({
  routes: [
    {
      path: '/user/:id',
      component: User,
      children: [
        // 当 /user/:id 匹配成功，
        // UserHome 会被渲染在 User 的 <router-view> 中 when /user/:id is matched
        { path: '', component: UserHome }

        // ...其他子路由
      ]
    }
  ]
})
```

#### to.meta
> 当使用嵌套路由时，to.meta指向的是子路由的元信息，而非其父路由。
> 也就是说，如果你在/account上添加了meta对象，而用户访问的是/account/email，则所获得的meta对象是关于该子路由的，而非父路由。

如何解决? 通过遍历to.matched的方式来曲线救国，它同样也包含了父路由的元信息
```js
router.beforeEach((to, from, next) => {
		const requiresAuth = to.matched.some((record) => {
		return record.meta.requiresAuth;
	}
	if (requiresAuth && ! userAuthenticated()) {
		next('/login');
	} else {
		next();
	}
});
```

### 链接导航
#### 背景
如何让用户在不同的路由之间跳转呢?最显而易见的答案——`<a>`标签,但存在如下缺点:
使用锚点来链接页面虽然在技术上行得通，但是如果你用的是HTML5 History模式，页面会在每次单击链接后重载，就跟在一个传统的网站里一样没区别.
使用`<router-link>`来代替`<a>`标签

#### 使用

```html
<router-link to="/user/1234">Go to user #1234</router-link>

//渲染结果
<a href="/user/1234">Go to user #1234</a>
```
单击该链接，它就会直接将你带往/user/1234，而无须加载一个新的页面。这大幅度提升了网站性能.因为所有的HTML、Javascript以及CSS都已经被下载下来了


#### 属性介绍
除了to属性还有一些其它属性,这里列举几个.具体需在API文档中查看.

**tag属性**
上面例子的渲染结果:
```html
<a href="/user/1234">Go to user #1234</a>
```

注意: 
* 单击该链接时，href不会起作用，因为Vue已经在上面添加了一个事件监听器，它取消了单击事件产生的处理自身导航的默认行为
* 出于一些原因，保留它仍然不失用处，比如在上面悬停就可以看到这个链接会跳转到哪里，或者能让你在新窗口中打开页面（这个vue-router就鞭长莫及了）

tag属性是什么?
>可以渲染除了锚点以外的元素.Vue会往这个元素添加一个事件监听器，以监测它被单击的时机，从而处理导航。

```html
<router-link to="/user/1234" tag="li">Go to user #1234</router-link>
```
渲染结果:
```html
<li>Go to user #1234</li>
```

渲染非a标签存在的缺点:
* 失去了锚点标签以及它的href属性
* 失去了几个重要的原生浏览器行为：
	* 浏览器这下就不知道这个列表项是一个链接，由此在它上面悬停也就不会给你带来任何关于这个链接的信息；
	* 不能通过鼠标右键在新窗口打开这个链接；
	* 一些诸如屏幕阅读器的辅助技术也不会把这个元素认为是一个链接了

最佳实践
在`<router-link>`元素里面加上锚点标签
```html
<router-link to="/user/1234" tag="li">
	<a>Go to user #1234</a>
</router-link>
```
渲染结果如下:
```html
<li><a href="/user/1234">Go to user #1234</a></li>
```


**active-class属性**

背景:
当`<router-link>`组件的to属性中的路径与当前页面的路径相匹配时，链接就被激活了(active). 当链接被激活时，vue-router会自动为生成的元素赋予一个类（class）。在默认情况下，这个类是`router-link-active`，不过你可以通过使用`active-class`属性来配置这个类。

配置`active-class`属性
```html
<ul class="nav navbar-nav">
	<router-link to="/blog" tag="li" active-class="active">
		<a>Blog</a>
	</router-link>
	<router-link to="/user/1234" tag="li" active-class="active">
		<a>User #1234</a>
	</router-link>
</ul>
```


#### 原生事件
如果想给某个`<router-link>`添加一个事件处理器（event handler），可以用@click。
在默认情况下，在组件上使用v-on就可以监听该组件触发的自定义事件。而对于原生事件，就可代之以`.native`修饰符来监听

```html
<router-link to="/blog" @click.native="handleClick">Blog</router-link>
```





### 编程式导航

#### 是什么

除了使用 `<router-link>` 创建 a 标签来定义导航链接，我们还可以借助 router 的实例方法，通过编写代码来实现。
这些方法效仿浏览器原生的history方法——如history.pushState()、history.replaceState()以及history.go()




#### push方法

**push原理解析**

`router.push` 会向 history 栈添加一个新的记录，所以，当用户点击浏览器后退按钮时，则回到之前的 URL。
当你点击 `<router-link>` 时，这个方法会在内部调用，所以说，点击 `<router-link :to="...">` 等同于调用 `router.push(...)`。



**声明式和编程式**

| 声明式                    | 编程式             |
| ------------------------- | ------------------ |
| `<router-link :to="...">` | `router.push(...)` |



**参数(location)的形式**

* 字符串 字符串路径
* 对象  描述地址的对象

```javascript
// 字符串
router.push('home')

// 对象
router.push({ path: 'home' })

// 命名的路由
router.push({ name: 'user', params: { userId: '123' }})

// 带查询参数，变成 /register?plan=private
router.push({ path: 'register', query: { plan: 'private' }})
```



**参数(location)注意事项**

<span style="color:red">**如果提供了 `path`，`params` 会被忽略**</span>

需要提供路由的 `name` 或手写完整的带有参数的 `path`

```javascript
const userId = '123'
router.push({ name: 'user', params: { userId }}) // -> /user/123
router.push({ path: `/user/${userId}` }) // -> /user/123
// 这里的 params 不生效
router.push({ path: '/user', params: { userId }}) // -> /user
```

同样的规则也适用于 `router-link` 组件的 `to` 属性



#### onComplete / onAbort

在 2.2.0+，可选的在 `router.push` 或 `router.replace` 中提供 `onComplete` 和 `onAbort` 回调作为第二个和第三个参数。

这些回调将会在导航成功完成 (在所有的异步钩子被解析之后) 或终止 (导航到相同的路由、或在当前导航完成之前导航到另一个不同的路由) 的时候进行相应的调用。

在 3.1.0+，可以省略第二个和第三个参数，此时如果支持 Promise，`router.push` 或 `router.replace` 将返回一个 Promise。



#### replace方法

与push的比较

它不会向 history 添加新记录，而是跟它的方法名一样 —— 替换掉当前的 history 记录。

声明式与编程式

| 声明式                            | 编程式                |
| --------------------------------- | --------------------- |
| `<router-link :to="..." replace>` | `router.replace(...)` |



#### go

介绍

这个方法的参数是一个整数，意思是在 history 记录中向前或者后退多少步，类似 `window.history.go(n)`。



实例

```javascript
// 在浏览器记录中前进一步，等同于 history.forward()
router.go(1)

// 后退一步记录，等同于 history.back()
router.go(-1)

// 前进 3 步记录
router.go(3)

// 如果 history 记录不够用，那就默默地失败呗
router.go(-100)
router.go(100)
```



#### 操作History ??

如果你已经熟悉 [Browser History APIs (opens new window)](https://developer.mozilla.org/en-US/docs/Web/API/History_API)，那么在 Vue Router 中操作 history 就是超级简单的。

还有值得提及的，Vue Router 的导航方法 (`push`、 `replace`、 `go`) 在各类路由模式 (`history`、 `hash` 和 `abstract`) 下表现一致。



### 命名路由

#### 背景

有时候，通过一个名称来标识一个路由显得更方便一些，特别是在链接一个路由，或者是执行一些跳转的时候。

#### 配置

1.在创建 Router 实例的时候，在 `routes` 配置中给某个路由设置名称

```css
const router = new VueRouter({
  routes: [
    {
      path: '/user/:userId',
      name: 'user',
      component: User
    }
  ]
})
```

2.给 `router-link` 的 `to` 属性传一个对象 / 给路由方法(push/replace)添加含有name属性的对象

```html
//链接导航
<router-link :to="{ name: 'user', params: { userId: 123 }}">User</router-link>
<router-link to="/suerId/1234">User</router-link>

//编程导航
$router.push({name: 'user', params:{userId: 123}})
```



#### 完整实例

> https://github.com/vuejs/vue-router/blob/dev/examples/named-routes/app.js



<iframe src="https://codesandbox.io/embed/strange-dew-g1l0mq?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="strange-dew-g1l0mq"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>



### 命名视图

#### 背景

有时候想同时 (同级) 展示多个视图，而不是嵌套展示，例如创建一个布局，有 `sidebar` (侧导航) 和 `main` (主内容) 两个视图，这个时候命名视图就派上用场了.   (非嵌套路由??)

#### 定义

一个单路由可以定义多个命名的组件,通过相应的名字被渲染成`<router-view>`



#### 设置

1.路由对象中添加**components**配置

一个视图使用一个组件渲染，因此对于同个路由下的多个视图就需要多个组件

```javascript
const router = new VueRouter({
  routes: [
    {
      path: '/',
      components: {
        default: Foo,
        a: Bar,
        b: Baz
      }
    }
  ]
})
```

2.组件中

在组件中使用多个`<router-view name="xxx">`. 如果 `router-view` 没有设置名字，那么默认为 `default`。

```html
<router-view class="view one"></router-view>
<router-view class="view two" name="a"></router-view>
<router-view class="view three" name="b"></router-view>
```



#### 实例

<iframe src="https://codesandbox.io/embed/vuerouter-namedview-20qrtn?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="vueRouter/namedView"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>



#### 嵌套命名视图

我们也有可能使用命名视图创建嵌套视图的复杂布局。这时你也需要命名用到的嵌套 `router-view` 组件。

我们以一个设置面板为例：

```md
/settings/emails                                       /settings/profile
+-----------------------------------+                  +------------------------------+
| UserSettings                      |                  | UserSettings                 |
| +-----+-------------------------+ |                  | +-----+--------------------+ |
| | Nav | UserEmailsSubscriptions | |  +------------>  | | Nav | UserProfile        | |
| |     +-------------------------+ |                  | |     +--------------------+ |
| |     |                         | |                  | |     | UserProfilePreview | |
| +-----+-------------------------+ |                  | +-----+--------------------+ |
+-----------------------------------+                  +------------------------------+
```

- `Nav` 只是一个常规组件。
- `UserSettings` 是一个视图组件。
- `UserEmailsSubscriptions`、`UserProfile`、`UserProfilePreview` 是嵌套的视图组件。



`UserSettings` 组件的 `<template>` 部分应该是类似下面的这段代码：

```html
<!-- UserSettings.vue -->
<div>
  <h1>User Settings</h1>
  <NavBar/>
  <router-view/>
  <router-view name="helper"/>
</div>
```

*嵌套的视图组件在此已经被忽略了，但是你可以在[这里 (opens new window)](https://jsfiddle.net/posva/22wgksa3/)找到完整的源代码。*

然后你可以用这个路由配置完成该布局：

```javascript
{
  path: '/settings',
  // 你也可以在顶级路由就配置命名视图
  component: UserSettings,
  children: [
    {
      path: 'emails',
      component: UserEmailsSubscriptions
  	}, 
    {
    	path: 'profile',
      components: {
        default: UserProfile,
        helper: UserProfilePreview
      }
  }]
}
```

**实例**

<iframe src="https://codesandbox.io/embed/vuerouter-nestednamedview-mhxnuh?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="vueRouter/nestedNamedView"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>





### 重定向
#### **使用背景**
>想要将一个网页重定向到另一个网页。在这种情况下，你肯定不希望习惯了前往a页面访问的用户看到一个错误页面，也不会希望搜索引擎链接到一堆不存在的页面上。
>为了解决这个问题，可以指定一个redirect属性，用于替代component

#### 是什么
>“重定向”的意思是，当用户访问 `/a`时，URL 将会被替换成 `/b`，然后匹配路由为 `/b


#### 2种实现方式
* redirect
* alias

#### redirect
redirect属性用来代替一个component.
**redirect属性的值可以是 路径字符串, 命名的路由, 方法**
注意[导航守卫](https://v3.router.vuejs.org/zh/guide/advanced/navigation-guards.html)并没有应用在跳转路由上，而仅仅应用在其目标上

字符串
```javascript
const router = new VueRouter({
  routes: [
    { path: '/a', redirect: '/b' }
  ]
})
```



命名路由
```javascript
const router = new VueRouter({
  routes: [
    { path: '/a', redirect: { name: 'foo' }}
  ]
})
```



方法
```javascript
const router = new VueRouter({
  routes: [
    { path: '/a', redirect: to => {
      // 方法接收 目标路由 作为参数
      // return 重定向的 字符串路径/路径对象
    }}
  ]
})
```

注意[导航守卫](https://v3.router.vuejs.org/zh/guide/advanced/navigation-guards.html)并没有应用在跳转路由上，而仅仅应用在其目标上. 在下面这个例子中，为 `/a` 路由添加一个 `beforeEnter` 守卫并不会有任何效果。(文档中没有案例)

案例

* relative redirect to a sibling route
* absolute redirect
* dynamic redirect, 
* named redirect
* redirect with params
* redirect with caseSensitive
* redirect with pathToRegexpOptions
* catch all redirect

<iframe src="https://codesandbox.io/embed/vuerouter-redirect-s634z9?autoresize=1&fontsize=12&hidenavigation=1&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="vueRouter/redirect"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>



#### 别名
**是什么**
如果你想让页面从/a和/b都可被访问，可以给/a路由取一个叫/b的别名：

```javascript
const router = new VueRouter({
  routes: [
    { path: '/a', 
	    component: A, 
	    alias: '/b' 
	  }
  ]
})
```



### 路由组件props传参

#### 背景

在组件中使用 `$route` 会使之与其对应路由形成高度耦合，从而使组件只能在某些特定的 URL 上使用，限制了其灵活性。

#### 解决
> 使用`props`将组件和路由解耦,取代与`$route`的耦合

传统的$route方式取参
```javascript
const User = {
  template: '<div>User {{ $route.params.id }}</div>'
}
const router = new VueRouter({
  routes: [{ path: '/user/:id', component: User }]
})
```

通过`props`取参,这样你便可以在任何地方使用该组件，使得该组件更易于重用和测试。
```javascript
const User = {
  props: ['id'],
  template: '<div>User {{ id }}</div>'
}

//与当前组件匹配的路由
const router = new VueRouter({
  routes: [
    { path: '/user/:id', component: User, props: true },

    // 对于包含命名视图的路由，你必须分别为每个命名视图添加 `props` 选项： !!!
    {
      path: '/user/:id',
      components: { default: User, sidebar: Sidebar },
      props: { default: true, sidebar: false }
    }
  ]
})
```




#### props传参 3种形式

未使用路由props传参时,接收路由参数的方法(computed等)

```javascript
//直接使用$route.params.xxx

//计算属性等
computed: {
  id(){ return this.$route.params.id },
  title(){ return this.$route.query.title },
  content(){ return this.$route.query.content } 
}
```



##### 布尔模式

> 如果 `props` 被设置为 `true`，`route.params` 将会被设置为组件属性。

在路由配置中添加`props: true`后, 路由组件的`$attrs`会接收到相应的params参数, 一般是使用props来接收它.

注意：对于包含命名视图的路由，你必须分别为每个命名视图添加 `props` 选项





##### 对象模式

如果 `props` 是一个对象，它会被按原样设置为组件属性。<span style="color:red">当 `props` 是静态的时候有用。 ???</span>

这里的'静态'不理解. 在组件中使用props传递数据根据是否绑定v-bind分为静态和动态, 但是和接收路由props是没关系的吧.

```javascript
const router = new VueRouter({
  routes: [
    {
      path: '/promotion/from-newsletter',
      component: Promotion,
      props: { newsletterPopup: false }  //props对象形态, 只能传递布尔值
    }
  ]
})
```



##### 函数模式

可以创建一个函数返回 `props`。这样你便可以将参数转换成另一种类型，将静态值与基于路由的值结合等等。

```javascript
const router = new VueRouter({
  routes: [
    {
      path: '/search',
      component: SearchUser,
      props: route => ({ query: route.query.q })
    }
  ]
})
```

URL `/search?q=vue` 会将 `{query: 'vue'}` 作为属性传递给 `SearchUser` 组件。

请尽可能保持 `props` 函数为<span style="color:red">无状态</span>的，因为它只会在路由发生变化时起作用。如果你需要状态来定义 `props`，请使用包装组件，这样 Vue 才可以对状态变化做出反应。

##### 案例

<iframe src="https://codesandbox.io/embed/vuerouter-routecomponentdeliverparams-rhk23r?autoresize=1&eslint=1&fontsize=12&hidenavigation=1&moduleview=1&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="vueRouter/routeComponentDeliverParams"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>


##### 在`<router-link>`中设置props
通过 router-link 组件的 props 属性，可以把路由参数传递给已渲染的组件。

下面是一个设置 props 的例子：
```html
<router-link :to="{ name: 'user', params: { id: userId }}" v-bind:props="{ name: 'world' }">
  User
</router-link>
```





### 前端路由的理解

> [Vue 了解前端路由 hash 与 history 差异 - 掘金 (juejin.cn)](https://juejin.cn/post/7096034733649297421)
>
> https://www.yuque.com/cuggz/interview/hswu8g#054faf174e3bbcf9f4d162773ee937b0

#### 出现的背景

在前端技术早期，一个 url 对应一个页面，如果要从 A 页面切换到 B 页面，那么必然伴随着页面的刷新。

用户只有在刷新页面的情况下，才可以重新去请求数据。

Ajax 的出现允许人们在不刷新页面的情况下发起请求；与之共生的，还有“不刷新页面即可更新页面内容”这种需求。在这样的背景下，出现了 **SPA（单页面应用**）

在 SPA 诞生之初，人们并没有考虑到“定位”这个问题——在内容切换前后，页面的 URL 都是一样的，这就带来了两个问题：

- SPA 其实并不知道当前的页面“进展到了哪一步”。可能在一个站点下经过了反复的“前进”才终于唤出了某一块内容，但是此时只要刷新一下页面，一切就会被清零，必须重复之前的操作、才可以重新对内容进行定位——SPA 并不会“记住”你的操作。
- 由于有且仅有一个 URL 给页面做映射，这对 SEO 也不够友好，搜索引擎无法收集全面的信息

为了解决这个问题，前端路由出现了。

#### SPA页面介绍

- `SPA` 单页面及应用方式:单一页面应用程序，只有一个完整的页面；它在第一次加载页面时,就将唯一完整的 `html` 页面和所有其余页面组件一起下载下来，这样它在切换页面时，不会加载整个页面，而是只更新某个指定的容器中内容。
- 单页面应用(`SPA`)的核心之一是: 更新视图而不重新请求页面。
- 路由器对象底层实现的三大步骤即(1)**监视**地址栏变化；(2)**查找**当前路径对应的页面组件；(3)将找到的页面组件**替换**到 `router-vieW` 的位置。
- `vue-router` 在实现单页面前端路由时，提供了两种方式：`Hash` 模式和 `History` 模式；vue2 是根据 `mode` 参数来决定采用哪一种方式，vue3 则是 `history` 参数











#### 缓存路由组件keep-alive

```js
//路由组件不显示了会被销毁,通过生命周期(mounted, beforeDestroy)查看验证

//使用keep-alive阻止路由组件销毁. 使用include='组件名称'来指定不销毁的组件.如果都不销毁,占内存.
<keep-alive include='子组件名称'>
    <router-view></router-view>
</keep-alive>


```



### 导航守卫

`vue-router` 提供的导航守卫主要用来通过跳转或取消的方式守卫导航。有多种机会植入路由导航过程中：<span style="color:blue">全局的, 单个路由独享的, 或者组件级的</span>

**参数或查询的改变并不会触发进入/离开的导航守卫**。你可以通过[观察 `$route` 对象](https://v3.router.vuejs.org/zh/guide/essentials/dynamic-matching.html#响应路由参数的变化)来应对这些变化，或使用 `beforeRouteUpdate` 的组件内守卫。

#### 分类
* 全局导航守卫
	* 前置守卫 beforeEach(to,from,next)
	* 解析守卫 beforeResolve()
	* 后置守卫 afterEach(to,from)
* 路由独享守卫
	* beforeEnter(to,from,next)
* 组件内守卫
	* beforeRouteEnter






#### 全局前置守卫beforeEach

##### 注册

使用 `router.beforeEach` 在路由器构造函数中,注册一个全局前置守卫：

```javascript
const router = new VueRouter({ ... })

router.beforeEach((to, from, next) => {
  // ...
})
```

当一个导航触发时，全局前置守卫按照创建顺序调用。守卫是异步解析执行，此时导航在所有守卫 resolve 完之前一直处于 **等待中**。



##### 参数

每个守卫方法接收三个参数：

- **`to: Route`**: 即将要进入的目标 [路由对象](https://v3.router.vuejs.org/zh/api/#路由对象)
- **`from: Route`**: 当前导航正要离开的路由
- **`next: Function`**: 一定要调用该方法来 **resolve** 这个钩子。执行效果依赖 `next` 方法的调用参数。
  - **`next()`**: 进行管道中的下一个钩子。如果全部钩子执行完了，则导航的状态就是 **confirmed** (确认的)。
  - **`next(false)`**: 中断当前的导航。如果浏览器的 URL 改变了 (可能是用户手动或者浏览器后退按钮)，那么 URL 地址会重置到 `from` 路由对应的地址。
  - **`next('/')` 或者 `next({ path: '/' })`**: 跳转到一个不同的地址。当前的导航被中断，然后进行一个新的导航。你可以向 `next` 传递任意位置对象，且允许设置诸如 `replace: true`、`name: 'home'` 之类的选项以及任何用在 [`router-link` 的 `to` prop](https://v3.router.vuejs.org/zh/api/#to) 或 [`router.push`](https://v3.router.vuejs.org/zh/api/#router-push) 中的选项。
  - **`next(error)`**: (2.4.0+) 如果传入 `next` 的参数是一个 `Error` 实例，则导航会被终止且该错误会被传递给 [`router.onError()`](https://v3.router.vuejs.org/zh/api/#router-onerror) 注册过的回调。


确保 `next` 函数在任何给定的导航守卫中都被严格调用一次。它可以出现多于一次，但是只能在所有的逻辑路径都不重叠的情况下，否则钩子永远都不会被解析或报错



#### 全局解析守卫

用 `router.beforeResolve` 注册一个全局守卫。这和 `router.beforeEach` 类似，区别是在导航被确认之前，**同时在所有组件内守卫和异步路由组件被解析之后**，解析守卫就被调用

在`beforeRouteEnter`调用之后调用



#### 全局后置守卫

你也可以注册全局后置钩子，然而和守卫不同的是，这些钩子不会接受 `next` 函数也不会改变导航本身：

**使用场景:**
* 跳转之后滚动条滚到顶部
* 设置页面标题

```javascript
router.afterEach((to, from) => {
  // ...
  window.scrollTo(0, 0)
})

// 设置页面标题
router.afterEach((to,from) => {
	document.title = to.meta.title
})
```



#### 路由独享守卫

可以在路由配置上直接定义 `beforeEnter` 守卫. 这些守卫与全局前置守卫的方法参数是一样的

```javascript
const router = new VueRouter({
  routes: [
    {
      path: '/foo',
      component: Foo,
      beforeEnter: (to, from, next) => {
        // ...
      }
    }
  ]
})
```



#### 组件内的守卫

可以在路由组件内直接定义以下路由导航守卫：

- `beforeRouteEnter` //等效于beforeEach 里面的this
- `beforeRouteUpdate` (2.2 新增) //
- `beforeRouteLeave`



```javascript
const Foo = {
  template: `...`,
  beforeRouteEnter(to, from, next) {
    // 在渲染该组件的对应路由被 confirm 前调用
    // 不！能！获取组件实例 `this`
    // 因为当守卫执行前，组件实例还没被创建
  },
  beforeRouteUpdate(to, from, next) {
    // 在当前路由改变，但是该组件被复用时调用
    // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
    // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
    // 可以访问组件实例 `this`
  },
  beforeRouteLeave(to, from, next) {
    // 导航离开该组件的对应路由时调用
    // 可以访问组件实例 `this`
  }
}
```



##### beforeRouteEnter()中无法访问this的原因及解决

`beforeRouteEnter` 守卫 **不能** 访问 `this`，因为守卫在导航确认前被调用，因此即将登场的新组件还没被创建。

不过，你可以通过传一个回调给 `next`来访问组件实例。在导航被确认的时候执行回调，并且把组件实例作为回调方法的参数。

```javascript
beforeRouteEnter (to, from, next) {
  next(vm => {
    // 通过 `vm` 访问组件实例
  })
}
```

注意 `beforeRouteEnter` 是支持给 `next` 传递回调的唯一守卫



##### beforeRouteLeave

通常用来禁止用户在还未保存修改前突然离开。该导航可以通过 `next(false)` 来取消

```javascript
beforeRouteLeave (to, from, next) {
  const answer = window.confirm('Do you really want to leave? you have unsaved changes!')
  if (answer) {
    next()
  } else {
    next(false)
  }
}
```



#### 完整的导航解析流程

1. 导航被触发。
2. 在失活的组件里调用组件后置守卫 `beforeRouteLeave` 。
3. 调用全局前置守卫 `beforeEach` 。
4. 在重用的组件里调用 组件解析守卫`beforeRouteUpdate`  (2.2+)。
5. 在路由配置里调用路由前置守卫 `beforeEnter`。
6. 解析异步路由组件。
7. 在被激活的组件里调用组件前置守卫 `beforeRouteEnter`。
8. 调用全局解析守卫 `beforeResolve` (2.5+)。
9. 导航被确认。
10. 调用全局后置守卫 `afterEach` 钩子。
11. 触发 DOM 更新。
12. 调用组件前置守卫 `beforeRouteEnter` 中传给 `next` 的回调函数，创建好的组件实例会作为回调函数的参数传入。



#### 触发钩子的完整顺序

> https://www.yuque.com/cuggz/interview/hswu8g#2c3f563ad7506984575f1a323937c5c0

路由导航、keep-alive、和组件生命周期钩子结合起来的，触发顺序，假设是从a组件离开，第一次进入b组件

- beforeRouteLeave：路由组件的组件离开路由前钩子，可取消路由离开。
- beforeEach：路由全局前置守卫，可用于登录验证、全局路由loading等。
- beforeEnter：路由独享守卫
- beforeRouteEnter：路由组件的组件进入路由前钩子。
- beforeResolve：路由全局解析守卫
- afterEach：路由全局后置钩子
- beforeCreate：组件生命周期，不能访问this。
- created;组件生命周期，可以访问this，不能访问dom。
- beforeMount：组件生命周期
- deactivated：离开缓存组件a，或者触发a的beforeDestroy和destroyed组件销毁钩子。
- mounted：访问/操作dom。
- activated：进入缓存组件，进入a的嵌套子组件（如果有的话）。
- 执行beforeRouteEnter回调函数next。







### 路由元信息

##### 如何定义meta字段?

定义路由的时候可以配置 `meta` 字段：

```javascript
const router = new VueRouter({
  routes: [
    {
      path: '/foo',
      component: Foo,
      children: [
        {
          path: 'bar',
          component: Bar,
          // a meta field
          meta: { requiresAuth: true }
        }
      ]
    }
  ]
})
```



##### 如何访问meta字段?

一个路由匹配到的所有路由记录会暴露为 `$route` 对象 (还有在导航守卫中的路由对象) 的 `$route.matched` 数组。因此，我们需要遍历 `$route.matched` 来检查路由记录中的 `meta` 字段。



##### 案例,在导航守卫中检查元字段

```javascript
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!auth.loggedIn()) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next() // 确保一定要调用 next()
  }
})
```



### 过渡动效 ???

`<router-view>` 是基本的动态组件，所以我们可以用 `<transition>` 组件给它添加一些过渡效果

```html
<transition>
  <router-view></router-view>
</transition>
```



### 数据获取 ????

#### 背景

有时候，进入某个路由后，需要从服务器获取数据。例如，在渲染用户信息时，你需要从服务器获取用户的数据。我们可以通过两种方式来实现：

- **导航完成之后获取**：先完成导航，然后在接下来的组件生命周期钩子中获取数据。在数据获取期间显示“加载中”之类的指示。
- **导航完成之前获取**：导航完成前，在路由进入的守卫中获取数据，在数据获取成功后执行导航。



#### 导航完成之后获取

当你使用这种方式时，我们会马上导航和渲染组件，然后在组件的 `created` 钩子中获取数据。这让我们有机会在数据获取期间展示一个 loading 状态，还可以在不同视图间展示不同的 loading 状态。 ??

##### 案例

假设我们有一个 `Post` 组件，需要基于 `$route.params.id` 获取文章数据：

```html
<template>
  <div class="post">
    <div v-if="loading" class="loading">
      Loading...
    </div>

    <div v-if="error" class="error">
      {{ error }}
    </div>

    <div v-if="post" class="content">
      <h2>{{ post.title }}</h2>
      <p>{{ post.body }}</p>
    </div>
  </div>
</template>
```



```javascript
export default {
  data () {
    return {
      loading: false,
      post: null,
      error: null
    }
  },
  created () {
    // 组件创建完后获取数据，
    // 此时 data 已经被 observed 了
    this.fetchData()
  },
  watch: {
    // 如果路由有变化，会再次执行该方法
    '$route': 'fetchData'
  },
  methods: {
    fetchData () {
      this.error = this.post = null
      this.loading = true
      // replace getPost with your data fetching util / API wrapper
      getPost(this.$route.params.id, (err, post) => {
        this.loading = false
        if (err) {
          this.error = err.toString()
        } else {
          this.post = post
        }
      })
    }
  }
}
```



#### 在导航完成前获取数据

通过这种方式，我们在导航转入新的路由前获取数据。我们可以在接下来的组件的 `beforeRouteEnter` 守卫中获取数据，当数据获取成功后只调用 `next` 方法。

```javascript
export default {
  data () {
    return {
      post: null,
      error: null
    }
  },
  beforeRouteEnter (to, from, next) {
    getPost(to.params.id, (err, post) => {
      next(vm => vm.setData(err, post))
    })
  },
  // 路由改变前，组件就已经渲染完了
  // 逻辑稍稍不同
  beforeRouteUpdate (to, from, next) {
    this.post = null
    getPost(to.params.id, (err, post) => {
      this.setData(err, post)
      next()
    })
  },
  methods: {
    setData (err, post) {
      if (err) {
        this.error = err.toString()
      } else {
        this.post = post
      }
    }
  }
}
```

在为后面的视图获取数据时，用户会停留在当前的界面，因此建议在数据获取期间，显示一些进度条或者别的指示。如果数据获取失败，同样有必要展示一些全局的错误提醒。





<iframe src="https://codesandbox.io/embed/2-methods-of-request-data-in-vue2-1izcwf?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="2 methods of request data in vue2"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>



### 路由懒加载

#### 背景

当打包构建应用时，JavaScript 包会变得非常大，影响页面加载。如果我们能把不同路由对应的组件分割成不同的代码块，然后当路由被访问的时候才加载对应组件，这样就更加高效了。

结合 Vue 的[异步组件 (opens new window)](https://cn.vuejs.org/v2/guide/components-dynamic-async.html#异步组件)和 Webpack 的[代码分割功能 (opens new window)](https://doc.webpack-china.org/guides/code-splitting-async/#require-ensure-/)，轻松实现路由组件的懒加载。



#### 如何做?

首先，可以将异步组件定义为返回一个 Promise 的工厂函数 (该函数返回的 Promise 应该 resolve 组件本身)：

```javascript
const Foo = () =>
  Promise.resolve({
    /* 组件定义对象 */
  })
```

第二，在 Webpack 2 中，我们可以使用[动态 import (opens new window)](https://github.com/tc39/proposal-dynamic-import)语法来定义代码分块点 (split point)：

```javascript
import('./Foo.vue') // 返回 Promise
```

结合这两者，这就是如何定义一个能够被 Webpack 自动代码分割的异步组件

```javascript
const Foo = () => import('./Foo.vue')
```

在路由配置中什么都不需要改变，只需要像往常一样使用 `Foo`：

```js
const router = new VueRouter({
  routes: [{ path: '/foo', component: Foo }]
})
```



#### 把组件按组分块???



#### 懒加载实现的 3 种技术

> https://www.yuque.com/cuggz/interview/hswu8g#2c3f563ad7506984575f1a323937c5c0

* 箭头函数+import动态加载
* 箭头函数+require动态加载
* webpack的require.ensure技术

##### 箭头函数+import

```javascript
const List = () => import('@/components/list.vue')
const router = new VueRouter({
  routes: [
    { path: '/list', component: List }
  ]
})
```

##### 箭头函数+require

```javascript
const router = new Router({
  routes: [
   {
     path: '/list',
     component: resolve => require(['@/components/list'], resolve)
   }
  ]
})
```

##### require.ensure

这种情况下，多个路由指定相同的chunkName，会合并打包成一个js文件。

```javascript
// r就是resolve
const List = r => require.ensure([], () => r(require('@/components/list')), 'list');
// 路由也是正常的写法  这种是官方推荐的写的 按模块划分懒加载 
const router = new Router({
  routes: [
  {
    path: '/list',
    component: List,
    name: 'list'
  }
 ]
}))
```





### 导航故障

#### 背景

当使用 `router-link` 组件时，Vue Router 会自动调用 `router.push` 来触发一次导航。 虽然大多数链接的预期行为是将用户导航到一个新页面，但也有少数情况下用户将留在同一页面上：

- 用户已经位于他们正在尝试导航到的页面
- 一个[导航守卫](https://v3.router.vuejs.org/zh/guide/advanced/navigation-guards.html)通过调用 `next(false)` 中断了这次导航
- 一个[导航守卫](https://v3.router.vuejs.org/zh/guide/advanced/navigation-guards.html)抛出了一个错误，或者调用了 `next(new Error())`

当使用 `router-link` 组件时，**这些失败都不会打印出错误**。然而，如果你使用 `router.push` 或者 `router.replace` 的话，可能会在控制台看到一条 *"Uncaught (in promise) Error"* 这样的错误，后面跟着一条更具体的消息。让我们来了解一下如何区分*导航故障*。



#### 检测导航故障

*导航故障*是一个 `Error` 实例，附带了一些额外的属性。要检查一个错误是否来自于路由器，可以使用 `isNavigationFailure` 函数：

```javascript
import VueRouter from 'vue-router'
const { isNavigationFailure, NavigationFailureType } = VueRouter

// 正在尝试访问 admin 页面
router.push('/admin').catch(failure => {
  if (isNavigationFailure(failure, NavigationFailureType.redirected)) {
    // 向用户显示一个小通知
    showToast('Login in order to access the admin panel')
  }
})
```



##### `NavigationFailureType`

`NavigationFailureType` 可以帮助开发者来区分不同类型的*导航故障*。有四种不同的类型：

- `redirected`：在导航守卫中调用了 `next(newLocation)` 重定向到了其他地方。
- `aborted`：在导航守卫中调用了 `next(false)` 中断了本次导航。
- `cancelled`：在当前导航还没有完成之前又有了一个新的导航。比如，在等待导航守卫的过程中又调用了 `router.push`。
- `duplicated`：导航被阻止，因为我们已经在目标位置了



#### 导航故障的属性

所有的导航故障都会有 `to` 和 `from` 属性，分别用来表达这次失败的导航的目标位置和当前位置。

```js
// 正在尝试访问 admin 页面
router.push('/admin').catch(failure => {
  if (isNavigationFailure(failure, NavigationFailureType.redirected)) {
    failure.to.path // '/admin'
    failure.from.path // '/'
  }
})
```





## 路由问题



### 1.编程式路由跳转到当前路由(参数不变), 多次执行会抛出NavigationDuplicated的警告错误

原因：vue-router3.1.0之后, 引入了promise的语法
如果没有通过参数指定成功或者失败回调函数就返回一个promise且内部会判断如果要跳转的路径和参数都没有变化,会抛出一个失败的promise

解决: 

1. 在跳转时指定成功或失败的回调函数, 或者catch处理错误. 	这个解决办法不好，因为不能一劳永逸，后期如果用到了push / replace 还要继续都得写

```javascript
this.$router.push('xxx', () => {}, () => {})
或者
this.$router.push().catch(() => {})
```



2. 修改Vue原型上的push和replace方法 (优秀)

```javascript
// 缓存原型上的push方法
const originPush = VueRouter.prototype.push
VueRouter.prototype.push = function(location, onComplete, onAbort) {
  // this是路由器对象$router
  // 如果调用push, 传递了成功或者失败的回调函数
  if (onComplete || onAbort) {
    originPush.call(this, location, onComplete, onAbort) //不用返回, 因为执行的结果返回是undfined
  } else {
    // 如果调用push, 没传递了成功或者失败的回调函数, 可能会抛出失败的promise, 需要catch一下
    return originPush.call(this, location).catch(() => {
      console.log('catch error')
    })
  }
}
```


## 测试组件
### 案例
提供一个简单组件
```js
const NotificationCount = {
	template: `<p>
			Messages: <span class="count">{{ messageCount }}</span>
			<a @click.prevent="handleUpdate">(update)</a>
		</p>`,
	props: {
		initialCount: {
			type: Number,
			default: 0
		}
	},
	data() {
		return { messageCount: this.initialCount };
	},
	methods: {
		handleUpdate() {
			this.$http.get('/api/new-messages').then((data) => {
				this.messageCount += data.messages.length;
			});
		}
	}
};
```

组件最初会展示从initialCount属性传递的通知计数，之后会在每次单击更新链接时发送API请求，然后更新计数。
**那么该如何为它编写测试呢？**
有3个功能点需要进行测试：
· 应当测试被提供的初始通知计数是否被正确地展示。
· 应当有一个测试来确保当链接被单击时，通知计数被正确地更新。
· 最后，在调用API失败时，组件还应当能够优雅地处理异常错误。

**测试**
>要测试NotificationCount组件，我们可以创建一个新的Vue实例，并将NotificationCount组件放入其中作为子组件

```js
const vm = new Vue({
	template: '<NotificationCount :initial-count="5" />',
	components: { NotificationCount }
}).$mount();

//因为没有为new Vue()提供el属性，所以需要手动调用.$mount()方法，以便Vue触发挂载进程。否则，将无法对其进行测试。
```

在控制台输出vm.$el.outerHTML的结果如下所示：
```html
<p>
	Messages: <span class="count">5</span>
	<a>(update)</a>
</p>
```


思路: 现在来编写一段代码，在组件已被挂载时，如果没有按预期展示数据，则抛出一个错误，这样就不需要每次手动检查HTML。
vm.$el是一个标准的DOM节点，所以可以通过.querySelector()方法在它的子元素中查找选择器为.count的span元素：
```js
const count = vm.$el.querySelector('.count').innerHTML
if (count !== '5') {
	throw new Error('Expected count to equal 5')
}
```



### vue-test-utils
**是什么**
>ue-test-utils是一个协助你编写测试的Vue官方库。它提供多种在为组件编写测试时常用的功能，比如查询DOM节点、设置props和data、模拟组件和其他参数、处理事件等。

**使用**
安装
```js
npm i -D vue-test-utils
```

**写测试文件**
```js
import {mount} from 'vue-test-utils'

const wrapper = mount(NotificationCount, {
	propsData: {
		initialCount: 5
	}
});

const count = wrapper.find('.count').text()  //查询DOM
expect(count).toBe('5')
```

mount函数
这个函数接受组件和它的一些配置作为参数,并返回一个由vue-test-utils提供的wrapper对象. 它将需要进行模拟的组件封装起来以便对它执行不同的操作，并可以在不使用过多原生浏览器DOM方法的情况下查询这些组件。

第二个参数:
对象,告诉Vue需要让组件拥有什么属性(这里是props)
其他用法:
propsData: 用来传递props的
```js
const wrapper = mount(NotificationCount, {
	propsData: {
		initialCount: 5
	}
});
```

slots: 用来传递components或者HTML字符串的
```js
const wrapper = mount(BlogPost, {
	slots: {
		default: BlogContentComponent,
		header: '<h2>Blog post title</h2>'
	},
	propsData: {
		author: blogAuthor
	}
});
```

mocks: 用来为组件实例增加属性的
比如，第一个例子中，我们曾使用this.$http.get()来发送HTTP请求。下面来模拟这个API
```js
const wrapper = mount(NotificationsCount, {
	mocks: {
		$http: {
			get() {
				return Promise.resolve({ messageCount: 2 });
			}
		}
	},
	propsData: {
		initialCount: 0
	}
});
```

listeners: 包含若干事件监听方法的对象。
```js
const wrapper = mount(Counter, {
	listeners: {
		count(clicks) {
			console.log(`Clicked ${clicks} times`);
		}
	}
});
```

stubs: 与mocks类似，但不同于对变量进行模拟，它用于对组件进行存根
```js
const wrapper = mount(TheSidebar, {
	stubs: {
		'sidebar-content': FakeSidebarContent
	}
});
```


4个.set*()方法: 用于设置props、data、computed属性和组件方法。
`.setComputed()和.setMethods()`可以用来覆盖computed属性和组件方法





find方法
wrapper实例提供的方法之一，当提供一个用于查询wrapper实例子元素的选择器时，它会返回DOM中第一个匹配该选择器的元素节点。在.find()方法定位到目标元素节点之后，它会返回该元素节点的wrapper对象——而不是节点本身。


测试事件
如何在一个组件中触发事件。
例如在NotificationCount组件中有一个更新消息计数的链接：我们来编写一个测试，该测试会单击链接并校验事件是否被触发。
要测试链接是否被单击，可以通过一个方法模拟this.$http的调用过程，之后返回一个promise（像之前那样），同时还会将一个变量设置为true以表示其已经被调用：
```js
let clicked = false;

const wrapper = mount(NotificationsCount, {
	mocks: {
		$http: {
			get() {
				clicked = true;
				return Promise.resolve({ messageCount: 1 });
			}
		}
	},
	propsData: {
		initialCount: 2
	}
});
```

Wrapper对象拥有一个.trigger()方法，可以使用它来触发单击事件
```js
    wrapper.find('a').trigger('click');
```

现在，测试clicked是否为true——如果不是，则测试失败：
```js
    expect(clicked).toBe(true);
```


## 实际问题

### 1.重新加载当前页面
#### 方法的举例
* `window.location.reload()`方法
* 路由配置中添加唯一查询参数
* router-view添加唯一的key
* watch监听$route路由变化
* 跳转到中转页面,再跳回来

#### window.location.reload

> 不推荐. 它违反了单页面应用的原则，它会重新加载整个SPA应用
> 在某些情况下，例如当你需要清除所有的JavaScript状态，或者当你的应用遇到无法恢复的错误时，使用 `window.location.reload()` 可能是有用的。但在大多数情况下，尽量避免使用它来刷新你的Vue组件或页面。


#### 路由配置中添加唯一query参数

```js
this.$router.push({
	path: routerPath,
	query: { unique: new Date().getTime() }
})
```



#### router-view添加key
> 这种方案更适合路径相同,但是参数不同的情况.
> 例如, /user/data, /user/data/1, user/data/2, 三个页面公用user/data路径对应的组件.


```vue
<template>
	<router-view :key="$route.fullPath"></router-view> 
</template>
```


#### watch监听路由变化
可以给路由添加一些其它内容来触发更新. 例如meta中添加unique参数

```js
watch: {
	'$route': {
		immediate: true,
		deep: true,
		handler: 'refreshData'
	}
},

methods: {
	refreshData() {
		// 方法
	}
}
```