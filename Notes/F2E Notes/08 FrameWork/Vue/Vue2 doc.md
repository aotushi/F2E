

# 前端框架出现前的比较

## 页面局部刷新

> [前端框架的出现 | 深入理解Vue.js实战 (godbasin.github.io)](https://godbasin.github.io/vue-ebook/vue-ebook/0.html#前端的飞速发展)

一般看来，浏览器生成了最终的 Render 树，页面也已经渲染完毕，似乎浏览器已经完成了它的工作了。但现实中我们的页面更多的不只是静态的页面，还会包括点击、拖拽等事件操作，以及接口请求、数据渲染到页面等动态的交互逻辑，这时候我们会需要更新页面的信息。

我们的业务代码中情况会复杂得多，除了插入内容，还包括内容更新、删除元素节点等。不管是哪种情况，目前来说前端一般分为两种方式：

(1) 字符串模版：使用拼接的方式生成 DOM 字符串，直接通过`innerHTML()`插入页面。
(2) 节点模版：使用`createElement()`/`appendChild()`/`textContent`等方法，动态地插入 DOM 节点。

假设页面中存在`<div id="div"></div>`这样一个元素，我们需要插入一些内容如`<p>测试<a>test</a></p>`：

```javascript
var div = document.getElementById('div')

/** 1.字符串模板 **/
div.innerHTML = "<p>测试<a>test</a></p>"

/** 2.节点模板 **/
const p = document.createElement('p')
p.textContent = '测试'
const a = document.createElement('a')
a.textContent = 'test'

p.appendChild(a)
div.appendChild(p)
```

我们使用 DOM API 和 CSS API 的时候，通常会触发浏览器的两种操作：**Repaint（重绘）和 Reflow（回流）**：

- Repaint：页面部分重画，通常不涉及尺寸的改变，常见于颜色的变化。
- Reflow：意味着节点需要重新计算和绘制，常见于尺寸的改变。

在 Reflow 的时候，浏览器会使渲染树中受到影响的部分失效，并重新构造这部分渲染树，完成 Reflow 后，浏览器会重新绘制受影响的部分到屏幕中，该过程成为 Repaint。

回流的花销跟 render tree 有多少节点需要重新构建有关系，所以使用`innerHTML()`可能会导致更多的开销。

## 非框架和框架就某个功能的实现比较

> [前端框架的出现 | 深入理解Vue.js实战 (godbasin.github.io)](https://godbasin.github.io/vue-ebook/vue-ebook/0.html#前端框架的出现-2)

省略











# Vue简介

> [Vue简介-Vue是什么？-CSDNVue入门技能树](https://edu.csdn.net/skill/vue/vue-712ec6452ab547478479a4509f787517?a=vue-f92d37226dc14bb58918663305bfc15b)

## 什么是Vue
> 构建用户界面的**渐进式**前端框架(用到哪一块就用哪一块，不需要全部用上)

渐进式
最核心的部分是视图层渲染,然后往外是组件机制,在这个基础上再加入路由机制,再加入状态管理,最外层是构建工具.

分层
就是说你既可以只用最核心的视图层渲染功能来快速开发一些需求,也可以使用一整套全家桶来开发大型应用.


## Vue兼容性及资源

#### 版本

**Vue.js 不支持 IE8 及其以下版本，因为 Vue.js 使用了 IE8 不能模拟的 ECMAScript 5 特性。 Vue.js 支持所有[兼容 ECMAScript 5 的浏览器](http://caniuse.com/#feat=es5)**

#### 资源

vue.js中文官网：http://cn.vuejs.org/





# Vue开发环境搭建的3种方式


## 1. CDN模式

[[202302170957|script标签引入]]

[unpkg.com/vue@next](https://link.juejin.cn/?target=https%3A%2F%2Funpkg.com%2Fvue@next) 可以拿到最新的 Vue 版本。

 <script src="https://unpkg.com/vue@next"></script>

静态资源 `CDN` 引入的开发形式，适用于一些简单的活动页、宣传页、官网等小项目，易于灵活的添加修改页面。但不利于项目的模块化开发，所以不适用一些中大型综合项目的开发。

## 2.NPM安装vue
构建大型应用
```js
#最新稳定版
npm i vue
```




## 3.脚手架


### 3.1 CLI安装
对于 `Vue 3`，`Vue CLI` 版本也有所升级，目前想要生成 `Vue 3` 项目，需要将其升级到 `4.5.x` 版本，具体操作如下：
* 以前安装过低版本,需要提前卸载 
* 全局或局部安装vue cli
```bash
// 搜索是否安装(全局)

vue --version

// 卸载
npm uninstall -g @vue/cli

//安装
npm i -g @vue/cli //全局安装
# npm i @vue/cli    //局部安装


// 查看版本号 确认安装成功
vue --version

// 初始化项目
vue create 项目名称
```


### 3.2 Vite安装
> 兼容性注意，Vite 需要 [Node.js](https://nodejs.org/en/) 版本 14.18+，16+

vite官网教程:

使用npm
```bash
npm create vite
```

带有附加命令行
```bash
# npm 6.x
npm create vite@latest my-vue-app --template vue

# npm 7+, extra double-dash is needed:
npm create vite@latest my-vue-app -- --template vue

# yarn
yarn create vite my-vue-app --template vue

# pnpm
pnpm create vite my-vue-app --template vue
```



### 3.3安装遇到的问题
**描述**
> 在Document/temp/1209文件夹下执行命令: `npm i @vue/cli`,但是它却安装在了当前文件夹的上一级.

**原因**
1.当您在命令行中执行 `npm install` 命令时，npm 会在当前目录下查找名为 `node_modules` 的文件夹，并将安装的包放入其中。如果当前目录下不存在 `node_modules` 文件夹，npm 会在父目录中查找，直到找到为止，或者直到到达文件系统的根目录。
2.`1209` 目录中不存在 `package.json` 文件，而在 `temp` 目录中存在。npm 会将包安装在找到的第一个包含 `package.json` 文件的目录中。

**解决**
在当前目录下初始化一个仓库 `npm init -y`. 再次执行安装命令即可

# Vue实例和选项

### [[202302171119|vue选项]]
文档位置: https://v2.cn.vuejs.org/v2/api


### [[202302171122|vue实例]]
> 一个 Vue 应用由一个通过 `new Vue` 创建的**根 Vue 实例**，以及可选的嵌套的、可复用的组件树组成。

```javascript
let vm = new Vue({
  //选项
})
```

当创建一个 Vue 实例时，你可以传入一个**选项对象**。作为参考，你也可以在 [API 文档](https://cn.vuejs.org/v2/api/#选项-数据)中浏览完整的选项列表




# 模板语法

> Vue.js 使用了基于 HTML 的模板语法，允许开发者声明式地将 DOM 绑定至底层 Vue 实例的数据。

> 在底层的实现上，Vue 将模板编译成虚拟 DOM 渲染函数。也可以不用模板，[直接写渲染 (render) 函数](https://cn.vuejs.org/v2/guide/render-function.html)，使用可选的 JSX 语法




## 插值





## 指令

> 指令 (Directives) 是带有 `v-` 前缀的特殊 attribute。指令 attribute 的值预期是**单个 JavaScript 表达式** (`v-for` 是例外情况)。指令的职责是，当表达式的值改变时，将其产生的连带影响，响应式地作用于 DOM.
>

### 语法

#### 参数

> 一些指令能够接收一个“参数”，在指令名称之后以冒号表示。例如，`v-bind` 指令可以用于响应式地更新 HTML attribute：


### 实例

在H5项目中,禁用苹果手机页面的'橡皮筋'效果.场景是展示弹窗+阴影效果时,背后的主页面在苹果手机上可以弹性滑动,安卓手机上不存在这种效果.
```js
//main.js
import directives from './utils/directives'
Object.keys(directives).forEach(direcitveName => Vue.directive(directiveName, directives[directiveName]))

//directives/stopBounceDirective
// const isIos = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream  差方法
const isIos = ['iPad Simulator','iPhone Simulator', 'iPod Simulator', 'iPad', 'iPhone', 'iPod'].includes(navigator.platform) || (navigator.userAgent.includes('Mac') && 'ontouchend' in document)
const stopBounceDirective = {
	bind(el) {
		if (!isIos) {
			return;
		}
		el.stopBounceObserver = new MutationObserver(mutations => {
			mutations.forEach(mutation => {
				if (mutation.type === 'attribute' && mutation.attributeName === 'style') {
					const displayValue = window.getComputedStyle(el).display;
					if (displayValue === 'none') {
						document.body.removeEventListener('touchmove', stopBounceDirective.preventTouchMove, {passive: false});
					} else {
						document.body.addEventListener('touchmove', stopBounceDirective.preventTouchMove, {passive: false});
					}
				}
			})
		})

		const config = {attributes: true, atributeFilter: ['style']}
		el.stopBounceObserver.observe(el, config)
	},

	unbind(el) {
		if (el.stopBounceObserver) {
			el.stopBounceObserver.disconnect();
			document.body.removeEventListener('touchmove', stopBounceDirective.preventTouchMove, {passive: false})
		}
	},

	preventTouchMove(event) {
		event.preventDefault();
	}
};

export default stopBounceDirective;
```









### 事件绑定注意事项

0.v-on指令监听DOM事件,接收JS代码或方法名称(事件回调).//
1.事件的回调都配置在methods对象中
2.methods中的函数,都是被Vue所管理的,,this的指向是vm/组件实例对象
3.methods中配置的函数,不能使用箭头函数,this会丢失.



### Class与Style绑定

> 操作元素的 class 列表和内联样式是数据绑定的一个常见需求。因为它们都是 attribute，所以我们可以用 `v-bind` 处理它们：只需要通过表达式计算出字符串结果即可。
>
> 不过，字符串拼接麻烦且易错。因此，在将 `v-bind` 用于 `class` 和 `style` 时，Vue.js 做了专门的增强。表达式结果的类型除了**字符串**之外，还可以是**对象或数组**
> 注意非prop属性传递的规则: 组件上的会覆盖实例中的同名属性,但class和style会合并,但同名style下的属性会也被覆盖





## 生命周期

### 概述

> 每个 Vue 实例在被创建时都要经过一系列的初始化过程——例如，需要设置数据监听、编译模板、将实例挂载到 DOM 并在数据变化时更新 DOM 等。同时在这个过程中也会运行一些叫做**生命周期钩子**的函数，这给了用户在不同阶段添加自己的代码的机会
>
> 生命周期钩子的 `this` 上下文指向调用它的 Vue 实例
>
> 注意: 生命周期函数不能使用箭头函数,否则造成this的失效.



### 1.图示

![vue生命周期-2.png](https://i.loli.net/2021/01/15/JMm3HIuOPCYQwjB.png)

### 阶段分类

#### 初始化阶段
从`new Vue()`到`created`之间的阶段

这个阶段的主要目的是在Vue.js实例上<span style="color:blue">初始化一些属性,事件以及响应式数据</span>, 如props, methods, data, computed, watch, provide, inject等.

**从源码角度解读**
new Vue()被调用时发生了什么?
```js
01  function Vue (options) {
02    if (process.env.NODE_ENV !== 'production' && !(this instanceof Vue) ) {
04      warn('Vue is a constructor and should be called with the `new` keyword')
05    }
06    this._init(options)
07  }
08  
09  export default Vue
```

构造函数中的逻辑很简单。首先进行安全检查，在非生产环境下，如果没有使用new来调用Vue，则会在控制台抛出错误警告我们.
然后调用this.\_init(options)来执行生命周期的初始化流程。也就是说，生命周期的初始化流程在this.\_init中实现。

**\_init()方法**
当new Vue()执行后，触发的一系列初始化流程都是在 \_init方法中启动的。\_init的实现如下：
```js
01  Vue.prototype._init = function (options) {
02    vm.$options = mergeOptions(
03      resolveConstructorOptions(vm.constructor),
04      options || {},
05      vm
06    )
07  
08    initLifecycle(vm)
09    initEvents(vm)
10    initRender(vm)
11    callHook(vm, 'beforeCreate')
12    initInjections(vm) // 在data/props前初始化inject
13    initState(vm)
14    initProvide(vm) // 在data/props后初始化provide
15    callHook(vm, 'created')
16  
17    // 如果用户在实例化Vue.js时传递了el选项，则自动开启模板编译阶段与挂载阶段
18    // 如果没有传递el选项，则不进入下一个生命周期流程
19    // 用户需要执行vm.$mount方法，手动开启模板编译阶段与挂载阶段
20  
21    if (vm.$options.el) {
22      vm.$mount(vm.$options.el)
23    }
24  }
```
可以看到，Vue.js会在初始化流程的不同时期通过callHook函数触发生命周期钩子。

$options属性的作用:
将用户传递的options选项与当前构造函数的options属性及其父级实例构造函数的options属性，合并生成一个新的options并赋值给$options属性。
resolveConstructorOptions函数的作用就是获取当前实例中构造函数的options选项及其所有父级的构造函数的options。

在初始化的过程中，首先初始化事件与属性，然后触发生命周期钩子beforeCreate。随后初始化provide/inject和状态(指的是props、methods、data、computed以及watch). 接着触发生命周期钩子created。最后，判断用户是否在参数中提供了el选项，如果是，则调用vm.$mount方法，进入后面的生命周期阶段。


#### 模板编译阶段
在created到beforeMount之间的阶段.

这个阶段的主要目的:
* 将模板编译为渲染函数,只存在于完整版中
* 如果只在包含运行时的构建版本中执行`new Vue()`,则不会存在这个阶段.

当使用vue-loader或vueify时，\*.vue文件内部的模板会在构建时预编译成JavaScript，所以最终打好的包里是不需要编译器的，用运行时版本即可。由于模板这时已经预编译成了渲染函数，所以在生命周期中并不存在模板编译阶段，初始化阶段的下一个生命周期直接是挂载阶段。

#### 挂载阶段
beforeMount钩子函数到mounted钩子函数之间是挂载阶段。

在这个阶段，Vue.js会将其实例挂载到DOM元素上，通俗地讲，就是将模板渲染到指定的DOM元素中。在挂载的过程中，Vue.js会开启Watcher来持续追踪依赖的变化。

在已挂载状态下，Vue.js仍会持续追踪状态的变化。当数据（状态）发生变化时，Watcher会通知虚拟DOM重新渲染视图，并且会在渲染视图前触发beforeUpdate钩子函数，渲染完毕后触发updated钩子函数。


#### 卸载阶段
应用调用vm.$destroy方法后，Vue.js的生命周期会进入卸载阶段。
在这个阶段，Vue.js会将自身从父组件中删除，取消实例上所有依赖的追踪并且移除所有的事件监听器。







###  2.Vue各阶段数据可使用情况

Props，methods,data和computed的初始化都是在beforeCreated和created之间完成的。

computed实在props之后执行的

```js
https://juejin.cn/post/6844903904585449486
```

#### **加载顺序**
props->methods->data->computed->watch

| 类型       | 加载顺序 | 加载时间                   | 写法    | 作用         | 备注                                                 |
| -------- | ---- | ---------------------- | ----- | ---------- | -------------------------------------------------- |
| prop     | 1    | beforeCreate与created之间 | 对象或数组 | 接收父组件传递的值  |                                                    |
| data     | 3    | 同上                     | 对象或数组 | 定义以及初始化数据  | 最后是用于视图上展示的数据,否则最好定义在外面或vm对象内(减少开支,提高性能); 组件内只接收函数 |
| computed | 4    | 同上                     | 函数    | 简单数据计算(相对) |                                                    |
| watch    | 2    | 函数                     | 函数    | 复杂的数据计算    |                                                    |

```md
1. `beforeCreate`: 在实例创建之后，数据观测(data observer)、事件监听和指令等尚未被初始化时被调用。
    
2. 初始化`props`和`methods`。
    
3. 初始化`data`和`data`观测。
    
4. `created`: 实例已经创建完成之后被调用。在这一步，实例已完成以下的配置：数据观测(data observer)，属性和方法的运算，`watch`事件回调。然而，挂载阶段还没开始，`$el`属性目前不可见。
    
5. 初始化`computed`属性和`watch`监听器。
    
6. `beforeMount`: 在挂载开始之前被调用：相关的`render`函数首次被调用。
    
7. 创建`vm.$el`并用它替换`el`，然后挂载到实例上去。
    
8. `mounted`: `el`被新创建的`vm.$el`替换，并挂载到实例上去之后调用该钩子。
    
9. 当`data`变化时，`watch`监听器和`computed`属性会被触发。
```

### 3.父子组件的生命周期

#### 3.1 父子组件生命周期

加载渲染过程

父 beforeCreate -> 父 created -> 父 beforeMount -> 子 beforeCreate -> 子 created -> 子 beforeMount -> 子 mounted -> 父 mounted

子组件更新过程

父 beforeUpdate -> 子 beforeUpdate -> 子 updated -> 父 updated

父组件更新过程

父 beforeUpdate -> 父 updated

销毁过程

父 beforeDestroy -> 子 beforeDestroy -> 子 destroyed -> 父 destroyed




#### 3.2 其他情况

```js
1.异步情况
 父组件中的created
 async created() {
   let response = await this.$publicApi.downLoadImg(this.value[i].fileId).catch((err) => false);
 }

结果: 通过打印结果可知, await之后的内容需要在子组件执行完成生命周期(created之后)才会执行
渲染多个子组件的话, 子组件的mounted是在所有的created之后才执行的

需要写个案例来验证下.
```



### 4. 生命周期钩子里的异步请求

```js
//https://juejin.cn/post/6844903721558769678
1.vue声明周期不是阻塞设计的
2.async/await 不会阻塞钩子函数, 是让钩子内的多个异步函数同步调用(!)，并不是为了阻塞钩子


```


### 5.生命周期函数hooks调用
>https://blog.csdn.net/hbiao68/article/details/111404861
>组件的所有生命周期钩子都可以通过`@hook:钩子名称`来监听触发

**使用案例**
* 定时器清除
* 外部监听生命周期函数

#### 定时器清除案例
>生成和清除定时器可以定义在一个地方,便于理解和维护

```js
//未添加hook方法
mounted() {
	this.timer = setInterval(() => {
		this.level++
	}, 1000)
}

beforeDestory() {
	if (timer) {
		clearInterval(timer)
		this.timer = null
	}
}
```

```js
//添加hook方法
mounted() {
	this.timer = setInterval(() => {
		this.level++
	}, 1000)

	// 在销毁之前执行hook方法
	this.$once('hook:beforeDestory', () => {
		if (this.timer) {
			clearInterval(this.timer)
		}
	})

	// hook函数可以执行多次
	this.$once('hook:beforeDestory', () => {
		// ...
	})
}
```


#### 外部监听生命周期函数
使用场景:
* 使用的第三方组件，对于开发者来说内部就是一个沙盒，不了解内部的逻辑，并且不能修改内部代码 
* 希望监听类似change事件，或者是在组件加载完之后执行某个业务逻辑

```js
<template>
  <!--通过@hook:updated监听组件的updated生命钩子函数-->
  <!--组件的所有生命周期钩子都可以通过@hook:钩子函数名 来监听触发-->
  <custom-select @hook:updated="myUpdated" />
</template>
<script>
import CustomSelect from '../components/custom-select'
export default {
  components: {
    CustomSelect
  },
  methods: {
    myUpdated() {
      console.log('custom-select组件的updated钩子函数被触发')
    }
  }
}
</script>
```


### 6.高精度权限控制-自定义指令directive
#### 背景
> 通常给一个元素添加v-if / v-show，来判断该用户是否有权限，但如果判断条件繁琐且多个地方需要判断，这种方式的代码不仅不优雅而且冗余。针对这种情况，我们可以封装了一个指令权限，能简单快速的实现按钮级别的权限判断。

#### 实现
新建个array.js文件，用于存放与权限相关的全局函数; 将array文件挂载到全局中; 最后我们在页面中就可以通过自定义指令 v-permission来判断：

```js
// array.js
export function checkArray (key) {
	let arr = ['admin', 'editor']
	let index = arr.includes(key)
	if (index) {
		return true //有权限
	} else {
		return false /无权限
	}
}
```


```js
// main.js
import {checkArray} from './common/array'

Vue.directive('permission', {
	inserted(el, binding) {
		let permission = binding.value
		if (permission) {
			let hasPermission = checkArray(permission)
			if (!permission) {
				el.parentNode && el.parentNode.removeChild(el)
			}
		}
	}
})
```

```vue
 <div class="btns">  
    <button v-permission="'admin'">权限按钮1</button>  // 会显示  
    <button v-permission="'visitor'">权限按钮2</button> //无显示  
    <button v-permission="'editor'">权限按钮3</button> // 会显示  
  </div>
```






## 计算属性

### 概述

#### 背景

模板内的表达式(插值和指令)非常便利，但是设计它们的初衷是用于简单运算的。在模板中放入太多的逻辑会让模板过重且难以维护.

```html
<div id="example">
  {{ msg.split('').reverse().join('')}}
</div>
```

在这个地方，模板不再是简单的声明式逻辑.对于任何复杂逻辑,你都应当使用**计算属性**。

#### 语法

```javascript
{ [key: string]: Function | {get: Function, set: Function }}
```

```javascript
export default {
  computed: {
    //仅读取
    keyString: function() {
      return this.a * 2
    },
    //读取的简写,适用于对象方法的简写
    keyString() {
      return this.a * 2
    }
    
    //读取和设置
    aPlus: {
      get: function() {
        return this.xxx
      },
      set: function(val) {
        this.a = val - 1
      }
    }
  }
}
```



#### 详细

计算属性将被混入到 Vue 实例中。所有 getter 和 setter 的 this 上下文自动地绑定为 Vue 实例。

注意如果你为一个计算属性使用了箭头函数，则 `this` 不会指向这个组件的实例，不过你仍然可以将其实例作为函数的第一个参数来访问。

```javascript
computed: {
  aDouble: vm => vm.a * 2
}
```







#### 特点

* 计算属性computed：要显示的数据不存在，要通过计算得来,只要是/* vc */身上有的都可以加工.可读可改的数据
* 函数底层用到的是对象setter和getter方法
* 执行的时机：
  * 初始显示会执行一次，得到初始值去显示。
  * 当依赖的数据发生改变时会被再次调用。
* 优势：与methods实现相比，内部有缓存机制，效率更高。
* 计算属性是用于直接读取使用的，不要加`()`.因为本质是一个属性. ??
* 在watch中修改源数据,会导致原数据的丢失.这种场景适合使用计算属性 **



#### 基本使用

可以像绑定普通property一样在模板中绑定计算属性. 在模板中不能使用括号来调用计算属性,会报错.

data 中内容依赖变更时，data 属性不会变更（它的设计目标就是保存组件的局部状态数据而已）。而

computed 则是通过【依赖追踪】实现的，在 computed 求值时引用的 Vue 变量变化时，会触发对 computed 的重新计算。

```javascript 
[Vue warn]: Error in render: "TypeError: reversedMsg is not a function"
```



```html
<div>
  <p>
    Original message: "{{msg}}"
  </p>
  <p>
    Computed reversed msg: "{{ reversedMsg }}"
    Computed reversed msg: "{{ reversedMsg() }}"
  </p>
</div>

<script>
	let vm = new Vue({
    el: '#root',
    data: {
      msg: 'Hello'
    },
    computed: {
      reversedMsg: function() {
        return this.msg.split('').reverse().join('')
      }
    }
  })
</script>
```



### 计算属性缓存vs方法

#### 比较

* 在表达式中调用方法可以达到计算属性取值的同样效果.
* **计算属性是基于它们的响应式依赖进行缓存的**. 只在相关响应式依赖发生改变时它们才会重新调用函数求值; 每当触发重新渲染时，调用方法将**总会**再次执行函数

#### 缓存原因

性能开销

假设我们有一个性能开销比较大的计算属性 **A**，它需要遍历一个巨大的数组并做大量的计算。然后我们可能有其他的计算属性依赖于 **A**。如果没有缓存，我们将不可避免的多次执行 **A** 的 getter！





### 计算属性 vs 侦听属性

<span style="color:blue">当需要在数据变化时执行**异步或开销较大**的操作时， `watch` 方式是最有用的</span>。

侦听属性允许执行<span style="color:blue">异步操作 (访问一个 API)</span>，限制我们执行该操作的频率，并在我们得到最终结果前，<span style="color:blue">设置中间状态</span>。这些都是计算属性无法做到的。



`watch` 完全可以替代 `computed` ？什么情况下，只能使用`computed`呢？

`computed` 最大特点就是缓存，所以上述问题可以转换为：哪些情况下，我们需要依赖缓存？

现在有这样一个需求，子组件中需要同时显示改变前和改变后的值。如果使用watch,会出现新值和旧值相同,因为前提是如果父组件传递给子组件的数据类型是引用类型.



### 计算属性实例
##### 1.计算属性来实现省市区三级联动
> [vue3 setup 中国省市区三级联动options最简洁写法，无需任何库 - 掘金 (juejin.cn)](https://juejin.cn/post/7297983578548355099)



<iframe src="https://codesandbox.io/embed/ntwg3m?view=Editor+%2B+Preview&module=%2Fsrc%2FApp.vue&hidenavigation=1"
     style="width:100%; height: 500px; border:0; border-radius: 4px; overflow:hidden;"
     title="vue2-实例-三级联动"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

<iframe src="https://www.bilibili.com/"></iframe>




    
## 侦听属性/watch

### 概述

#### 背景

侦听器用来监听某些数据变化，观察 Vue 实例变化的一个表达式或计算属性函数。Vue 实例将会在实例化时调用`$watch()`，遍历 watch 对象的每一个属性。

当需要在数据变化时**执行异步或开销较大**的操作时，使用侦听器

#### 语法

```javascript
{
  [key: string]: string | Function | Object | Array
}
```

多种写法

```javascript
var vm = new Vue({
  data: {
    a: 1,
    b: 2,
    c: 3,
    d: 4,
    e: {
      f: {
        g: 5
      }
    }
  },
  watch: {
    a: function (val, oldVal) {
      console.log('new: %s, old: %s', val, oldVal)
    },
    
    // 方法名
    b: 'someMethod',
    
    // 该回调会在任何被侦听的对象的 property 改变时被调用，不论其被嵌套多深
    c: {
      handler: function (val, oldVal) { /* ... */ },
      deep: true
    },
    
    // 若其值为true,则handler在初始化会调用一次,firstName改变调用一次
    d: {
      handler: 'someMethod',
      immediate: true
    },
    
    // 你可以传入回调数组，它们会被逐一调用
    e: [
      'handle1',
      function handle2 (val, oldVal) { /* ... */ },
      {
        handler: function handle3 (val, oldVal) { /* ... */ },
        /* ... */
      }
    ],
    
    // watch vm.e.f's value: {g: 5}
    'e.f': function (val, oldVal) { /* ... */ }
  }
})
vm.a = 2 // => new: 2, old: 1
```



#### 详细

* 一个对象，键是需要观察的<u>表达式</u>，值是对应<u>回调函数</u>/ 方法名
* Vue 实例将会在实例化时调用 `$watch()`，遍历 watch 对象的每一个 property。



#### 特点

* 属性必须先存在，才能进行监视！！
* 当被监视的属性(data中的属性)变化时, 回调函数自动调用, 进行相关操作
* 监视的两种写法：
  * new Vue时传入watch配置 (精简写法是函数, 完整写法是对象)
  * 通过vm.$watch监视
* 深度监视 deep:true
* 在watch中修改源数据,会导致原数据的丢失.这种场景适合使用计算属性
* <span style="color:red;"> mounted 钩子函数会在 watch 中的 handler 函数之前执行，因为 mounted 是在组件渲染完毕后执行的，而 watch 监听的数据变化需要等到组件渲染完毕后才能触发</span>



### computed和watch之间的区别

* 只要是computed能完成的功能，watch都可以完成; watch能完成的功能，computed不一定能完成，例如：watch可以进行异步操作
  * computed属性的结果是会被缓存的,并且依赖响应式数据的变化才会发生变化
  * 定义的函数接收return的结果, return属性同步执行,是没有办法拿到异请求的结果的

* computed依赖缓存,值不变前提下多次读取使用缓存; watch多次读取会多次调用



```html
<div id="root">
    姓：<input type="text" v-model="firstName"> <br/><br/>
    名：<input type="text" v-model="lastName"><br/><br/>
    <span>全名:{{fullName}}</span><br/><br/>
</div>

<script>
	const vm=new Vue({
        el:"#root",
        data:{
            firstName:'张',
            lastName:'三',
            fullName:''
        },
        watch:{
            //监测firstName,完整写法:
            firstName:{
                //若其值为true,则handler在初始化会调用一次,firstName改变调用一次
                immediate:true, 
            	handler(newValue, oldValue){//固定的属性名称handler newValue和oldValue是firstName的新旧值
                	this.fullName=newValue+this.lastName;
            	}
            }
            //监测firstName,精简写法:
            firstName(newValue, oldValue){//当firstName变化时,函数才会被vm调用.
        		this.fullName=newValue+this.lastName;
    		}
            
            //监测lastName, 精简写法
            lastName(newValue, oldValue){
        		this.fullName=this.firstName+newValue;
   			}
        }
    })
    //watch的第二种写法:
    vm.$watch('firstName', {
        immediate:true,
        handler:function(newValue, oldValue){
            setTimeout(()=>{//此处的定时器函数一定要写箭头函数
                this.fullName=newValue+this.lastName;
            },1000)
        }
    })
    
</script>
```



### 实例

#### 手动触发$watch
```js
  watch: {
    dialogVisible(newVal) {
      if (newVal) {
        // 对话框显示时,手动触发 tableHeaderKey 的 watch
        this.$watch("tableHeaderKey", this.updateTableHeaderKey, {
          immediate: true,
        });

        this.getDetailDialogTableData();
      }
    },
  },
```



### 实例问题

在项目中,从上一级页面使用params传递参数到当前页面的接收的props中, 在使用watch监视(没有使用immediate)时候, 发现watch中的没有调用console.

```md
Vue的`watch`观察者是异步的：在同步代码（例如你的`created`或`mounted`方法）执行完之后，所有的观察者回调才会被调用。也就是说，在你的`created`或`mounted`方法中看到的值，可能在`watch`观察者回调执行前就已经被设置了。
```








## 条件渲染

### 1.v-if

```js
使用逻辑运算符搭配条件渲染

//复杂
v-show=" $route.path!=='/login' && $route.path!=='/search' "

//简单 在login和search路由定义中添加属性meta,值为对象
v-show=" !$route.meta.isHidden "
```

#### 1.2.用key管理可复用元素

Vue 会尽可能高效地渲染元素，通常会复用已有元素而不是从头开始渲染。

```js
<template v-if="loginType === 'username'">
  <label>Username</label>
  <input placeholder="Enter your username">
</template>

<template v-else>
  <label>Email</label>
  <input placeholder="Enter your email address">
</template>
```

在上面的代码中切换 `loginType` 将不会清除用户已经输入的内容。因为两个模板使用了相同的元素，`<input>` 不会被替换掉——仅仅是替换了它的 `placeholder`。

所以 Vue 为你提供了一种方式来表达“这两个元素是完全独立的，不要复用它们”。只需添加一个具有唯一值的 `key` attribute 即可.

```js
<template v-if="loginType === 'username'">
  <label>Username</label>
  <input placeholder="Enter your username" key="username-input">
</template>
<template v-else>
  <label>Email</label>
  <input placeholder="Enter your email address" key="email-input">
</template>
```

注意，`<label>` 元素仍然会被高效地复用，因为它们没有添加 `key` attribute。



### 2.v-show

#### 2.1 v-if与v-show的比较

与v-if用法大体相同,不同的是带有 `v-show` 的元素始终会被渲染并保留在 DOM 中。`v-show` 只是简单地切换元素的 CSS property `display`

注意，`v-show` 不支持 `<template>` 元素，也不支持 `v-else`



### 3.v-if与v-show区别

`v-if` 是“真正”的条件渲染，因为它会确保在切换过程中条件块内的事件监听器和子组件适当地被销毁和重建。

`v-if` 也是惰性的：如果在初始渲染时条件为假，则什么也不做——直到条件第一次变为真时，才会开始渲染条件块。

相比之下，`v-show` 就简单得多——不管初始条件是什么，元素总是会被渲染，并且只是简单地基于 CSS 进行切换。

一般来说，`v-if` 有更高的切换开销，而 `v-show` 有更高的初始渲染开销。因此，如果需要非常频繁地切换，则使用 `v-show` 较好；如果在运行时条件很少改变，则使用`v-if` 较好。

| 条件渲染 |      适用场景      |              特点               |
| :------: | :----------------: | :-----------------------------: |
|   v-if   | 切换频率很低的场景 |     不展示的DOM节点直接删除     |
|  v-show  | 切换频率很高的场景 | 不展示的DOM节点隐藏display:none |









### 4. v-if与v-for一起使用

> [vue中v-for和v-if不能同时使用解决方案 | 默 (yingliyu.github.io)](https://yingliyu.github.io/2020/06/16/vue-if-for/)

**不推荐**同时使用 `v-if` 和 `v-for`

当 `v-if` 与 `v-for` 一起使用时，`v-for` 具有比 `v-if` 更高的优先级

### 

> 在官方文档中明确指出**v-for和v-if不建议一起使用**。 原因：v-for比v-if优先级高，所以使用的话，每次v-for都会执行v-if,造成不必要的计算，影响性能，尤其是当之需要渲染很小一部分的时候。

`v-for` 和 `v-if` 同时使用有 3 种情景：

1. 部分遍历（内/外部条件）：一个 `list` 中某个属性值符合条件的遍历出来；
2. 全部遍历（外部条件）：某外部条件符合条件时遍历全部。
3. 全部遍历（内部条件）：根据某内部条件渲染出不同的内容。

#### 解决方案:

##### 使用计算属性

> 在计算属性中先用内/外部条件处理数据，再遍历处理后的数据

```javascript
<!-- 遍历list，条件是值小于100 方案：使用计算属性activeList首先筛选出符合条件的值再直接遍历 -->
<ul>
  <li v-for="item in activeList" :key="item"></li>
</ul>

export default {
  data() {
    return {
      list: [78, 90, 20, 45, 66, 120, 136]
    }
  },
  computed: {
    activeList() {
      return this.list.filter((item) => item < 100)
    }
  }
}
```



##### 条件放于父元素(外部条件)

> 解决方案：外部条件放到遍历的父级元素上，没有父级可以使用`<template></template>`。

```javascript
<ul v-if="isActive">
  <li v-for="item in list" :key="item"></li>
</ul>
<!-- or -->
<div>
  <template v-if="isActive">
    <span v-for="item in list" :key="item"></span>
  </template>
  <p>Hello,My name is Lillian!</p>
</div>

export default {
  data() {
    return {
      isActive: true,
      list: [78, 90, 20, 45, 66, 120, 136]
    }
  }
}
```



##### 遍历`template`(内部条件)

> 根据某内部条件，显示不同内容。注意 `key` 不能放 `template` 标签上

```html
<div>
  <template v-for="item in list">
    <span v-if="item.type===0" :key="item.id">文字+图标</span>
    <span v-if="item.type===1" :key="item.id">文字+文字</span>
    <span v-else :key="item.id">其他</span>
  </template>
</div>
```

`vue` 中会优先执行 `v-for`, 当 `v-for` 把所有内容全部遍历之后 , `v-if` 再对已经遍历的元素进行删除 , 造成了加载的浪费 , 所以应该尽量在执行 `v-for` 之前优先执行 `v-if` , 可以减少加载的压力。





## 列表渲染

> 可以用 `v-for` 指令基于一个数组来渲染一个列表。`v-for` 指令需要使用 `item in items` 形式的特殊语法，其中 `items` 是源数据数组，而 `item` 则是被迭代的数组元素的**别名**

> 在 `v-for` 块中，我们可以访问所有父作用域的 property。`v-for` 还支持一个可选的第二个参数，即当前项的索引

> 也可以用 `of` 替代 `in` 作为分隔符，因为它更接近 JavaScript 迭代器的语法



### 1.基本列表

```HTML
动态标签属性需要加冒号,指令语法不需要加冒号

v-for指令:
1.用于展示列表数据
2.语法：v-for="(item/值, index/索引) in arr" :key="item.id"
3.可遍历：数组、对象、字符串

v-for遍历数组:值,索引
<li v-for="(item, index) in arr" :key="item.id">{{item.name}}--{{item.age}}</li>

v-for遍历对象:value,key是对象的value,key  第三个参数为索引
<li v-for="(value, key, index) in object" :key="key">{{value}}</li>   //指令语法解析标签体内容


v-for遍历字符串:值,索引
<li v-for="(data,index) in r" :key="index">{{data}} --- {{index}}</li>
```



在遍历对象时，会按 `Object.keys()` 的结果遍历，但是**不能**保证它的结果在不同的 JavaScript 引擎下都一致



### 2.维护状态(key)

当 Vue 正在更新使用 `v-for` 渲染的元素列表时，它默认使用“就地更新”的策略。如果数据项的顺序被改变，Vue 将不会移动 DOM 元素来匹配数据项的顺序，而是就地更新每个元素，并且确保它们在每个索引位置正确渲染。

这个默认的模式是高效的，但是**只适用于不依赖子组件状态或临时 DOM 状态 (例如：表单输入值) 的列表渲染输出**。

为了给 Vue 一个提示，以便它能跟踪每个节点的身份，从而重用和重新排序现有元素，你需要为每项提供一个唯一 `key` attribute：

```js
<div v-for="item in items" v-bind:key="item.id">
  <!-- 内容 -->
</div>
```



#### 2.1 使用key的原因

概述:
* key的作用就是定位,告诉vue这是哪个元素
* 如果没key:你在数组的中间删除或是添加一个元素，Vue不会知道该元素对应的是页面上哪一个元素，<span style="color:red">它会更新从删除或是添加元素的位置到列表结尾之间的每一个元素</span>
* 如果有key: 通过它可以告诉Vue数组中的每个元素应该与页面上哪个元素**相关联**，从而删除正确的元素。key属性的值默认为元素在循环时的索引。

实例:
输出5个颜色随机的、包含数字1到5的段落元素
<iframe src="https://codesandbox.io/embed/vue-demo-keyzuo-yong-1r1cro?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="vue-demo-key作用"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

上面的示例会输出5个颜色随机的、包含数字1到5的段落元素
如果没有加key: 删除第二个时,Vue更新页面上对应元素的文本来反映变化,一直到数组的末尾.但Vue无法判断元素和与之相关的dom元素,<span style="color:red">最终它会删除最后一个元素</span>. 最后的颜色会被删除掉.
如果添加了key: 单击第二个元素将会把two从数组中删除，同时对应的元素也将被删除



#### 2.2 一种安全获取key的方法

```js
//https://juejin.cn/post/6844903823757180941#heading-1

两种不太合适的方案:
1.使用index  //这个列表进行增删的操作，可能会出现渲染错乱的问题
2.使用Math.random()  //把key="Math.random()"直接写在了模板中，导致我们每次渲染，key都会变. 固定下key，从而解决上述问题。但是这种方案的问题是，污染了数据。如果后续我们要把这份儿list存到数据库，我们不得不再过滤掉这些key


data() {
    return {
        // 数据初始化时加上key
        list: [{}, {}, {}].map(item => {
            item.key = Math.random()
            return item
        })
    }
},
methods: {
    // 每次添加项目时，也事先加上key
    addItem2List() {
        this.list.push({
            key: Math.random()
        })
    }
}


```

```html
<template>
    <div>
        <ul>
            <li v-for="item in list" :key="getUID(item)"></li>
        </ul>
    </div>
</template>

<script>
let uid = 0

// WeakMap保证了Map的key可以被及时GC
const Item2UIDMap = new WeakMap()

export default {
    data() {
        return {
            list: [{}, {}, {}]
        }
    },
    methods: {
        getUID(item) {
            const persistedUID = Item2UIDMap.get(item)
            if (!persistedUID) {
                Item2UIDMap.set(item, ++uid)
                return uid
            }
            return persistedUID
        }
    }
}
</script>

//这种也是有问题.ue组件销毁了之后再重新激活, 打印这个weakMap, 之前item的还在weakmap里面
```

```js
let rowKeyCounter = 0
data.forEach(item => {
	item.rowKey = rowKeyCounter
	rowKeyCounter++
})
```

### 3.数组更新检测

#### 3.1变更方法

Vue 将被侦听的数组的变更方法进行了包裹，所以它们也将会触发视图更新。这些被包裹过的方法包括：

```js
push
pop
shift
unshift
reverse
splice
sort
```



#### 3.2替换数组

变更方法，顾名思义，会变更调用了这些方法的原始数组。相比之下，也有非变更方法，例如 `filter()`、`concat()` 和 `slice()`。它们不会变更原始数组，而**总是返回一个新数组**。当使用非变更方法时，可以用新数组替换旧数组：

```js
example1.items = example1.items.filter(function (item) {
  return item.message.match(/Foo/)
})
```

Vue 为了使得 DOM 元素得到最大范围的重用而实现了一些智能的启发式方法，所以用一个含有相同元素的数组去替换原来的数组是非常高效的操作

**注意** 由于 JavaScript 的限制，Vue **不能检测**数组和对象的变化



#### 3.3过滤/排序

有时，我们想要显示一个数组经过过滤或排序后的版本，而不实际变更或重置原始数据。在这种情况下，可以创建一个计算属性，来返回过滤或排序后的数组。

在计算属性不适用的情况下 (例如，在嵌套 `v-for` 循环中) 你可以使用一个方法：

### 4. v-for使用值范围

`v-for` 也可以接受整数。在这种情况下，它会把模板重复对应次数

```js
<div>
  <span v-for="n in 10">{{ n }} </span>
</div>

结果: 1,2,3,4,5,6,7,8,9,10
```



### 5. template上使用v-for

类似于 `v-if`，你也可以利用带有 `v-for` 的 `<template>` 来循环渲染一段包含多个元素的内容

```js
<ul>
  <template v-for="item in items">
    <li>{{ item.msg }}</li>
    <li class="divider" role="presentation"></li>
  </template>
</ul>
```

#### 5.1 不推荐在template上进行列表渲染

```html
//https://blog.csdn.net/weixin_43487782/article/details/108909901
如果试图给<template>绑定key，那么控制台就会报错. <template> cannot be keyed. Place the key on real elements instead.
<template>元素不会出现在最终的渲染结果中。假如给<template>元素绑定key，相当于key值就丢失了，等于没有绑定  
key可以给内部元素绑定吗？答案是可以的，但强烈不推荐。原因是如果内部有很多平级的元素，就得给每个元素都加一个key,而且会报错.
```



### 6. v-for与v-if一同使用

> 注意我们**不**推荐在同一元素上使用 `v-if` 和 `v-for`

当它们处于同一节点，`v-for` 的优先级比 `v-if` 更高，这意味着 `v-if` 将分别重复运行于每个 `v-for` 循环中。当你只想为*部分*项渲染节点时，这种优先级的机制会十分有用

```js
<li v-for="todo in todos" v-if="!todo.isComplete">
  {{ todo }}
</li>
```

上面的代码将只渲染未完成的 todo。

而如果你的目的是有条件地跳过循环的执行，那么可以将 `v-if` 置于外层元素 (或template) 上

```js
<ul v-if="todos.length">
  <li v-for="todo in todos">
    {{ todo }}
  </li>
</ul>
<p v-else>No todos left!</p>
```



### 7.组件上使用v-for

自定义组件上，你可以像在任何普通元素上一样使用 `v-for`

2.2.0+ 的版本里，<span style="color:blue">当在组件上使用 `v-for` 时，`key` 现在是必须的。</span>

```js
<my-component v-for="item in items" :key="item.id"></my-component>
```

然而，任何数据都不会被自动传递到组件里，因为组件有自己独立的作用域。为了把迭代数据传递到组件里，我们要使用 prop：

```js
<my-component
  v-for="(item, index) in items"
  v-bind:item="item"
  v-bind:index="index"
  v-bind:key="item.id"
></my-component>
```

不自动将 `item` 注入到组件里的原因是，这会使得组件与 `v-for` 的运作紧密耦合。明确组件数据的来源能够使组件在其他场合重复使用。





#### 列表过滤

```HTML
在watch中修改源数据,会导致原数据的丢失.这种场景适合使用计算属性
想要对数据加工后再展示且不破坏源数据,最好使用计算属性.

return arrs.filter(arr=>arr.name.indexOf(xxx)!=-1)
```









## 事件处理

### 1.监听事件

可以用 `v-on` 指令监听 DOM 事件，并在触发时运行一些 JavaScript 代码

### 2.事件处理方法

许多事件处理逻辑会更为复杂，所以直接把 JavaScript 代码写在 `v-on` 指令中是不可行的。因此 `v-on` 还可以接收一个需要调用的方法名称.

```html
<div id='example'>
  <button v-on:click='greet'>
    greet
  </button>
</div>
```

```js
var example = new Vue({
  el:'example',
  data:{name:'vuejs'},
  //methods对象中定义方法
  methods:{
    greet:function(event) {
      //event是原生DOM事件
      alert('hello'+this.name+'!');
      //this指向当前vue实例
      
      if(event) {
        alert(event.target.tagName);
      }
    }
  }
})

//也可以js直接调用方法
exmaple.greet(); //
```



### 3.内联处理器中的方法

除了直接绑定到一个方法，也可以在内联 JavaScript 语句中调用方法

```html
<div id='example2'>
  <button v-on:click='say(hi)'>
    say hi
  </button>
  <button v-on:click='say(what)'>
    say what
  </button>
</div>
```

```js
let example2 = new Vue({
  el:'#example2',
  methods:{
    say:function(msg) {
      alert(msg);
    }
  }
})
```

有时也需要在内联语句处理器中**访问原始的 DOM 事件**。可以用<span style="color:blue; fontSize:bold;">特殊变量 `$event` </span>把它传入方法

```html
<button v-on:click="warn(form can't be submitted yet',$event)">
  submit
</button>
```

```js
//..
methods:{
  warn:function(msg,event) {
    //可以访问原生的事件对象
    if(event) {
      event.preventDefault();
    }
    alert(msg);
  }
}
```



### 4.事件修饰符

在事件处理程序中调用 `event.preventDefault()` 或 `event.stopPropagation()` 是非常常见的需求。尽管我们可以在方法中轻松实现这点，但更好的方式是：方法只有纯粹的数据逻辑，而不是去处理 DOM 事件细节。

为了解决这个问题，Vue.js 为 `v-on` 提供了**事件修饰符**。之前提过，修饰符是由点开头的指令后缀来表示的

| 修饰符                                               | 说明                                        |
| ---------------------------------------------------- | ------------------------------------------- |
| `.stop`                                              | `event.stopPropagation()`，阻止事件继续传播 |
| `.prevent`                                           | `event.preventDefault()`，阻止默认事件      |
| `.capture`                                           | 添加事件监听器时使用事件捕获模式            |
| `.self `                                               | 只监听自身标签触发的事件                    |
| `.once`                                              | 只绑定一次                                  |
| `.enter`/`.tab`/`.esc`/`.space`/`.ctrl`/`.[keyCode]` | 按键修饰符                                  |





```html
//阻止单击事件继续传播
<a v-on:click.stop='doThis'></a>

//提交事件不再重载页面
<form v-on:submit.prevent='onSubmit'></form>
  
//修饰符可以串联
<a v-on:click.stop.prevent='doThat'></a>

//只有修饰符
<form v-on:submit.prevent></form>
  
<!-- 添加事件监听器时使用事件捕获模式 -->
<!-- 即内部元素触发的事件先在此处理，然后才交由内部元素进行处理 -->
<div v-on:click.capture="doThis">...</div>

<!-- 只当在 event.target 是当前元素自身时触发处理函数 -->
<!-- 即事件不是从内部元素触发的 -->
<div v-on:click.self="doThat">...</div>

<!-- 点击事件将只会触发一次 -->
<a v-on:click.once="doThis"></a>

Vue 还对应 addEventListener 中的 passive 选项提供了 .passive 修饰符。
<!-- 滚动事件的默认行为 (即滚动行为) 将会立即触发 -->
<!-- 而不会等待 `onScroll` 完成  -->
<!-- 这其中包含 `event.preventDefault()` 的情况 -->
<div v-on:scroll.passive="onScroll">...</div>
```



**注意**

使用修饰符时，顺序很重要；相应的代码会以同样的顺序产生。因此，用 `v-on:click.prevent.self` 会阻止**所有的点击**，而 `v-on:click.self.prevent` 只会阻止对元素自身的点击。

不像其它只能对原生的 DOM 事件起作用的修饰符，`.once` 修饰符还能被用到自定义的[组件事件](https://cn.vuejs.org/v2/guide/components-custom-events.html)上

不要把 `.passive` 和 `.prevent` 一起使用，因为 `.prevent` 将会被忽略，同时浏览器可能会向你展示一个警告。请记住，`.passive` 会告诉浏览器你*不*想阻止事件的默认行为


**疑问**
1.el-table标签中使用 `@click.stop`不生效, 使用`@click.native.stop`生效. 有时间看看源码咋写的.



### 5.按键修饰符

在监听键盘事件时，我们经常需要检查详细的按键。Vue 允许为 `v-on` 在监听键盘事件时添加按键修饰符

你可以直接将 [`KeyboardEvent.key`](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values) 暴露的任意有效按键名转换为 kebab-case 来作为修饰符。

```html
<input v-on:keyup.page-down='onPageDown'>
```

在上述示例中，处理函数只会在 `$event.key` 等于 `PageDown` 时被调用

#### 5.1 按键码

`keyCode` 的事件用法[已经被废弃了](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/keyCode)并可能不会被最新的浏览器支持

使用 `keyCode` attribute 也是允许的

```html
<input v-on:keyup.13='submit'>
```

为了在必要的情况下支持旧浏览器，Vue 提供了绝大多数常用的按键码的别名：

- `.enter`
- `.tab`
- `.delete` (捕获“删除”和“退格”键)
- `.esc`
- `.space`
- `.up`
- `.down`
- `.left`
- `.right`



#### 案例



#####  一个标签/组件上绑定多个标签

```js
<baseForm
	@click.capture = 'doThis'
	@click = 'doThat'
/>
  
其他:
1.事件执行顺序  先执行了doThis, 再执行doThat
2.如果子组件是二次封装的UI框架,capture可能会失效,不会执行
```



##### 使用ctrl+enter键发送消息

```html
 <textarea @keydown="enterPress" placeholder="请输入"></textarea>

<javascript>
	function enterPress(event) {
    	if (event.keyCode === '13' && event.ctrlKey) {
    		//...
    	}
    }
</javascript>
```





### 6.系统修饰符

可以用如下修饰符来实现仅在按下相应按键时才触发鼠标或键盘事件的监听器

```js
.ctrl
.alt
.shift
.meta
//在 Mac 系统键盘上，meta 对应 command 键 (⌘)。在 Windows 系统键盘 meta 对应 Windows 徽标键 (⊞)
```

例如:

```html
<!-- Alt + C -->
<input v-on:keyup.alt.67="clear">

<!-- Ctrl + Click -->
<div v-on:click.ctrl="doSomething">Do something</div>
```



### 7.其他

#### 7.1 Vue如何劫持所有的click事件 ????

```js
//https://www.zhihu.com/question/290066361

1.事件冒泡方案的问题
1.1 事件冒泡可能会被阻止 click.stop
1.2 页面可能存在多个vue实例

2.混入方案
混入会对所有的组件有效,在每个组件渲染完成后把当前实例的context传进要进行捕获click的函数中.
Vue.mixin({
  mounted() {
    this.$nextTick(() => {
      delegateBehavior(this);
    })
  }
})

delegateBehavior(context:any) {
  //在context的$el上添加_uid的赋值
  if (context.$el) {
    context.$el.setAttribute('vueautoreport-uid', context._uid);
  }
  //在root上做标记,不以次数, 可能页面存在多个vue实例
  if (context.$root.$el && !context.$root.$el._isBindDelegate) {
    eventTypes.forEach((eventType) => {
      //root组件绑定捕获事件,处理冒泡阻止的情况
      context.$root.$el.addEventListener(eventType, (e:Event) => {
        this.captureEvent(e, this.captureContexts, eventType);
      }, true);
    })
    context.$root.$el._isBindDelegate = true;
  }
}
```



## 表单输入绑定

### v-model

v-model可以实现表单元素和数据的双向绑定,本质上是语法糖

v-model在内部为不同的输入元素使用不同的属性并抛出不同的事件

#### 写法

```HTML
  单向数据绑定(v-bind):<input type='text' :value='msg' ><br/><br/>
  双向数据绑定(v-model):<input type='text' v-model:value='msg'>
  双向数据绑定简写(v-model):<input type='text' v-model='msg'> //简写形式   
```



#### 限制

* `<input>`
* `<select>`
* `<textarea>`
* components

#### 实现原理
>https://www.cnblogs.com/chris-oil/p/16408309.html
##### 1.作用在普通表单元素上

动态绑定了 `input` 的 `value` 指向了 `messgae` 变量，并且在触发 `input` 事件的时候去动态把 `message` 设置为目标值

```html
<input v-model="sth" />   
<input v-model:value='sth'> 
//  等同于
<input 
    v-bind:value="message" 
    v-on:input="message=$event.target.value"
>
//$event 指代当前触发的事件对象;
//$event.target 指代当前触发的事件对象的dom;
//$event.target.value 就是当前dom的value值;
//在@input方法中，value => sth;
//在:value中,sth => value;
```

##### 2.作用在组件上

在自定义组件中，v-model 默认会利用名为 value 的 prop 和名为 input 的事件

因此父组件`v-model`语法糖本质上可以修改为 `'<child :value="message" @input="function(e){message = e}"></child>'`

在组件的实现中，我们是可以通过 **v-model属性** 来配置子组件接收的prop名称，以及派发的事件名称。

```vue
//父组件中
<aa-input v-model='aa'></aa-input>
//等价于
<aa-input v-bind:value='aa' v-on:input='aa=$event.target.value'></aa-input>

//子组件中
<input v-bind:value="aa" v-on:input="onmessage"></input>
props:{value: aa,}
methods: {
	onmessage(e) {
		this.$emit('input', e.target.value)
	}
}
```

```html
//以上功能的代码实现:
<div id="root">
   <aa-input txt="txt" v-model="aa"></aa-input>
   //等价于
  <aa-input txt="txt" v-bind:value="aa" v-on:input="aa=$event.target.value">
  </div> 
  <script> 
    Vue.component('aa-input', {
      template: `
        <div>
          <input :value="value" v-on:input="onmessage"></input>  
        </div>
      `,
     props: [
      'txt',
      'value'
    ],
      methods: {
        onmessage(e) {
          this.$emit('input', e.target.value)
        }
      }
    })
    let vm = new Vue({
      el: '#root',
      data: {
        question: '',
        answer: 'I cannot give you an answer until you ask me a question!',
        sex:'男',
        isAgree: false,
        aa: '父组件内容'
      },
      methods: {
        change(e) {
          console.log(e.target.checked)
          e.target.checked = false
        }
      }
    })
  </script>
```



默认情况下，一个组件上的 v-model 会把 value 用作 prop 且把 input 用作 event.



##### 缺点和解决

<span style="color:blue">v-model应用到组件上，它会默认把value作为组件的属性，把input作为给组件绑定的事件时的事件名</span>; 但有时候我们不想用value当做默认的属性名和不想input作为给组件绑定的时间时的事件名

解决方法:

在vue2.2版本之后，可以在定义组件时通过model选项方式定制prop/event

```vue
export default {
	model: {
		prop: 'num', //自定义属性名
		event: 'addNum' //自定义事件名
	}
}
```



#### 实例
1.对输入框值进行格式化,非法字符直接清空无法输入
这里需要注意的是 v-model与input事件的组合也能使用
```js
// 案例
<el-input v-model.trim="query.inqId" @input="handleInput('query.inqId', query.inqId)" />

export default {
	//...
	methods: {
		handleInput(name, value) {
			let nameArr = name.split('.')
			let lastKey = nameArr.pop()
			nameArr.reduce((prev, crt) => prev[crt] ,this)[lastKey] = this.formatInp(value)
		},
		formatInp(str) {
			return str.replace(/[<>&\"'#]/g, '')
		}
	}
}

// 疑问: v-model中也有input方法 再重新声明一个不会冲突吗.  不会
```



### 基础用法

用 `v-model` 指令在表单 `<input>`、`<textarea>` 及 `<select>` 元素上创建双向数据绑定。它会根据控件类型自动选取正确的方法来更新元素。

 `v-model` 本质上不过是语法糖。它负责监听用户的输入事件以更新数据，并对一些极端场景进行一些特殊处理。

<span style='color:blue;'>`v-model` 会忽略所有表单元素的 `value`、`checked`、`selected` attribute 的初始值而总是将 Vue 实例的数据作为数据来源。你应该通过 JavaScript 在组件的 `data` 选项中声明初始值。</span>

v-model 在内部使用不同的属性为不同的输入元素并抛出不同的事件：

- text(input) 和 textarea 元素使用 value 属性和 input 事件；
- checkbox(input)  和 radio(input)  使用 checked 属性和 change 事件；
- select 元素将 value 作为 prop 并将 change 作为事件。



#### 单行文本输入

 v-model 只是 v-bind 和 v-on 的语法糖，当使用文本 input(包括 email，number 等) textarea 时，v-model=”message” 等价于`:value=”message” @input=”e => { message = e.target.value}”`

```html
<div id="app">
  <input type="text" v-model="message">
  //等同于
  <input type="text" :value="message" @input="message=$event.target.value">
  <p>
    {{message}}
  </p>
</div>


<script>
	let vm = new Vue({
    el: "#app",
    data: {
      message: "hello"
    }
  })
</script>
```



#### 多行文本

```html
<span>Multiline message is:</span>
<p style="white-space: pre-line;">{{ message }}</p>
<br>
<textarea v-model="message" placeholder="add multiple lines"></textarea>
```



#### 复选框

##### 单个复选框, 绑定到布尔值

单个复选框，使用 v-bind 和 checked 属性模拟：

`v-model="isAgree"`  相等于 

`v-bind:checked="isAgree" v-on:change="isAgree=$event.target.checked"`

```html
<div id="root">
  <label for="license">
    <input type="checkbox" v-model="isAgree" id="license">
    //等同于
  	<input type="checkbox" id="license" :checked="isAgree" @change="isAgree=!isAgree">同意协议
  </label>
  <h2>
    您选择的是: {{isAgree}}
  </h2>
  <button :disabled="!isAgree">下一步</button>
</div>

<script>
	let vm = new Vue({
    el: "#root",
    name: "rootName",
    data: {
      isAgree: false
    }
  })
</script>
```



##### 多个复选框

多个复选框共享一个数据源(v-model 指定的值)时，经常有这种情况的使用，如购物车、菜单树等，配合 v-model 与 value 一起使用，勾选的值 value 会被绑定到同一个数组，要注意指定该值为数组类型。

```html
<div id="root">
	<!-- CheckBox复选框 -->
	<input type="checkbox" value="basketball" v-model="hobbies">篮球
	<input type="checkbox" value="badminton"  v-model="hobbies">羽毛球
	<input type="checkbox" value="football"   v-model="hobbies">足球
	<input type="checkbox" value="table tennis" v-model="hobbies">乒乓球
  //等同于  ????
  <input type="checkbox" value="table tennis" :checked="" @change="onChange">乒乓球
	<h2>您的爱好：{{hobbies}}</h2>
  </div>
<script>
	let vm = new Vue({
    el: "#root",
    name: "rootName",
    data: {
      hobbies: []
    },
    methods: {
      onChange(e) {
        let targetValue = e.target.value;
        if (this.hobbies.includes(targetValue)) {
          this.hobbies = this.hobbies.filter(item => item !== targetValue)
        } else {
          this.hobbies.push(target.value)
        }
      }
    }
  })
</script>
```



#### 单选按钮

单选按钮在<u>单独使用</u>时，不需要 v-model，直接使用 v-bind 绑定一个布尔类型的值，为真时选中，为否时不选中

```html
<div id="app">
  <label>
    单选按钮
    <input type="radio" :checked="picked">
  </label>
  {{ picked }}
</div>
<script>
	let app = new Vue({
  el: "#app",
  data: {
    picked: true
  }
})
</script>
```

<u>单选按钮的组合使用</u>

<span style="color:blue">使用value+v-model实现组合排斥效果</span>

radio单选按钮属性. name属性用于对提交到服务器后的表单数据进行标识.

<span style="color:blue">name一样时,为单选;name不一样,多选</span>. 若绑定同样的v-model为互斥单选.

```html
<div id='example'>
  <input type='radio' id='one' value='One' v-model='picked'>
  <label for='one'>One</label>
  <br>
  <input type='radio' id='two' value='Two' v-model='picked'>
  //等同于
  <input type="radio" id="two" value="two" :checked="value" @change="value=$event.target.checked"/>
  <label for='two'>Two</label>
  <br>
  <span>Picked:{{picked}}</span>
</div>

<script>
new Vue({
  el:'#example',
  data() {
    return {
      picked:''
    }
  }
})
</script>
```









#### 选择框

##### 单选

<iframe height="300" style="width: 100%;" scrolling="no" title="表单输入绑定-select" src="https://codepen.io/westover/embed/WNjdbVz?default-tab=html%2Cresult&theme-id=light" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/westover/pen/WNjdbVz">
  表单输入绑定-select</a> by xxl (<a href="https://codepen.io/westover">@westover</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>


**注意:** 如果 `v-model` 表达式的初始值未能匹配任何选项，`<select>` 元素将被渲染为“未选中”状态。在 iOS 中，这会使用户无法选择第一个选项。因为这样的情况下，iOS 不会触发 change 事件。因此，更推荐像上面这样提供一个值为空的禁用选项。

##### 多选

绑定到一个数组. <span style="color:blue">multiple属性规定可同时选择多个选项</span>.格式是`multiple='multiple'`,也可以简写成multiple.

鼠标用户可以按住 Ctrl, Command, 或 Shift 键（取决于你的操作系统）然后点击不同选项以选择或取消选择。

<iframe height="300" style="width: 100%;" scrolling="no" title="" src="https://codepen.io/westover/embed/poPpJgQ?default-tab=html%2Cresult&theme-id=light" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/westover/pen/poPpJgQ">
  </a> by xxl (<a href="https://codepen.io/westover">@westover</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>
<iframe src="https://codesandbox.io/embed/vue-basic-form-select-multiple-995qgz?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="Vue-basic-form/select multiple"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>



##### v-for渲染动态选项

<iframe height="300" style="width: 100%;" scrolling="no" title="表单输入绑定-vfor" src="https://codepen.io/westover/embed/jOmYPMe?default-tab=html%2Cresult&theme-id=light" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/westover/pen/jOmYPMe">
  表单输入绑定-vfor</a> by xxl (<a href="https://codepen.io/westover">@westover</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>


#### 值绑定 ???

对于<span style="color:blue">单选按钮，复选框及选择框</span>的选项，`v-model` 绑定的值通常是静态字符串 (对于复选框也可以是布尔值)：

```html
<!-- 当选中时，`picked` 为字符串 "a" -->
<input type="radio" v-model="picked" value="a">

<!-- `toggle` 为 true 或 false -->
<input type="checkbox" v-model="toggle">

<!-- 当选中第一个选项时，`selected` 为字符串 "abc" -->
<select v-model="selected">
  <option value="abc">ABC</option>
</select>
```

但是有时我们可能想把值绑定到 Vue 实例的一个动态 property 上，这时可以用 `v-bind` 实现，并且这个 property 的值可以不是字符串。

##### 复选框

> 这里的 `true-value` 和 `false-value` attribute 并不会影响输入控件的 `value` attribute，因为浏览器在提交表单时并不会包含未被选中的复选框。如果要确保表单中这两个值中的一个能够被提交，(即“yes”或“no”)，请换用单选按钮。

这几部分的文档真是晦涩不明,没有达到百科全书的功效.哎....

```html
<div id="root">
  <input 
         type="checkbox" 
         name="" 
         id="" 
         v-model="toggle" 
         true-value="yes" 
         false-value="no"
         >input值测试
  <h2>toggle: {{toggle}}</h2>
</div>

<script>
  let vm = new Vue({
    el: "#root",
    data: {
      toggle: ''
    },
    methods: {

    }
  });
</script>


```



##### 单选按钮

```html
<input type="radio" v-model="pick" v-bind:value="a">

// 当选中时
vm.pick === vm.a
```



##### 选择框的选项

```html
<select v-model="selected">
    <!-- 内联对象字面量 -->
  <option v-bind:value="{ number: 123 }">123</option>
</select>

// 当选中时
typeof vm.selected // => 'object'
vm.selected.number // => 123
```



#### 3.修饰符

##### .lazy
在默认情况下，`v-model` 在每次 `input` 事件触发后将输入框的值与数据进行同步 (除了[上述](https://cn.vuejs.org/v2/guide/forms.html#vmodel-ime-tip)输入法组合文字时)。你可以添加 `lazy` 修饰符，从而转为在 `change` 事件之后进行同步：

v-model中将不同的输入元素分成了3类,只有一类(text/textarea)使用input事件.

```html
<!-- 在“change”时而非“input”时更新 -->
<input v-model.lazy="msg">
```



##### .number

如果想自动将用户的输入值转为数值类型，可以给 `v-model` 添加 `number` 修饰符
```html
<input 
	v-model.number="age" 
  type="number"
  v-bind:value="a"  
  //没有显示.  前面讲过,使用v-model时会忽略表单元素value/checked/selected属性的初始值,并总是将实例的数据作为数据来源.
>

<script>
  let vm = new Vue({
    el: "#root",
    data: {
      age:'',
      a: "1111"
    }
  });
</script>
```

因为即使在 `type="number"` 时，HTML 输入元素的值也总会返回字符串。如果这个值无法被 `parseFloat()` 解析，则会返回原始的值。

##### .trim
如果要自动过滤用户输入的首尾空白字符，可以给 `v-model` 添加 `trim` 修饰符
```html
<input v-model.trim="msg">
```


### 组件上使用v-model

```js
//自定义组件中使用model来定义双向绑定的值，model是个对象，它必须有prop属性和event属性，缺一不可。prop属性表示父亲的v-model=””引号中的那个东西到底是谁。props: []数组中必须“迎接一下这个值”。自定义组件中要改变值，必须使用event中定义的这个方法，如果要通知父亲改变，就$emit()这个函数即可。

//代码实现


vue.js 则是采用数据劫持结合发布者-订阅者模式的方式，通过Object.defineProperty()来劫持各个属性的setter，getter，在数据变动时发布消息给订阅者，触发相应的监听回调。

动态属性和自定义事件,绑定value,通过v-on触发,从而更新数据.
双向绑定得的实现主要依赖于Object.defineProperty(),通过这个函数可以监听到get,set事件
```





















## 组件

### 简介

组件提供了一种抽象，让我们可以使用独立可复用的小组件来构建大型应用，任意类型的应用界面都可以抽象为一个组件树

### 组件快速熟悉

#### 基本示例

组件是可复用的 Vue 实例，所以它们与 `new Vue` 接收相同的选项, 仅有的例外是像 `el` 这样根实例特有的选项。

<iframe src="https://codesandbox.io/embed/vue-components1-l1u9fc?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="vue/components1"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>



#### 组件复用

**一个组件的 `data` 选项必须是一个函数**，因此每个实例可以维护一份被返回对象的独立的拷贝

<iframe src="https://codesandbox.io/embed/vue-components1-l1u9fc?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="vue/components1"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

#### 组件的组织

通常一个应用会以一棵嵌套的组件树的形式来组织：

![](https://cn.vuejs.org/images/components.png)

为了能在模板中使用，这些组件必须先注册以便 Vue 能够识别。这里有两种组件的注册类型：**全局注册**和**局部注册**。

全局注册的组件可以用在其被注册之后的任何 (通过 `new Vue`) 新创建的 Vue 根实例，也包括其组件树中的所有子组件的模板中。

#### 通过Prop向子组件传递数据

##### 是什么

Prop 是你可以在组件上注册的一些自定义 attribute。当一个值传递给一个 prop attribute 的时候，它就变成了那个组件实例的一个 property。

在子组件上用一个 `props` 选项将其包含在该组件可接受的 prop 列表中.

```vue
Vue.component('blog-post', {
	props: ['title'],
	template: '<h3>{{title}}</h3>'
})
```



##### 特点

* 一个组件默认可以拥有任意数量的 prop，任何值都可以传递给任何 prop。
* 能在组件实例中访问这个值，就像访问 `data` 中的值一样

##### 向子组件传递自定义attribute的 2 种方式

一个 prop 被注册之后，你就可以像这样把数据作为一个自定义 attribute 传递进来

<u>传递静态attribute</u>

```html
<blog-post title="My journey with Vue"></blog-post>
```



<u>使用`v-bind`传递动态prop</u>

无论何时为 `post` 对象添加一个新的 property，它都会自动地在 `<blog-post>` 内可用(响应式)

```html
<blog-post
	v-for="post in posts"
  v-bind:key="post.id"
  v-bind:title="post.title"
></blog-post>

// 其他情况 简化接收一个对象
<blog-post
  v-for="post in posts"
  v-bind:key="post.id"
  v-bind:title="post.title"
  v-bind:content="post.content"
  v-bind:publishedAt="post.publishedAt"
  v-bind:comments="post.comments"
></blog-post>
//简化
<blog-post
  v-for="post in posts"
  v-bind:key="post.id"
  v-bind:post="post"
></blog-post>
```



#### 单个根元素

当构建一个 `<blog-post>` 组件时, **每个组件必须只有一个根元素**

```html
<div class="blog-post">
  <h3>{{ title }}</h3>
  <div v-html="content"></div>
</div>
```



#### 监听子组件事件

通过监听子组件事件来和父组件进行沟通.

案例: 引入一个辅助功能来放大博文的字号，同时让页面的其它部分保持默认的字号



Vue 实例提供了一个自定义事件的系统:

* 父级组件可以像处理 native DOM 事件一样通过 `v-on` 监听子组件实例的任意事件

* 子组件可以通过调用内建的 [**`$emit`** 方法](https://cn.vuejs.org/v2/api/#vm-emit)并传入事件名称来触发一个事件

<iframe src="https://codesandbox.io/embed/vue-components1-l1u9fc?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="vue/components1"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

##### 使用事件抛出一个值

使用 `$emit` 的第二个参数来提供这个值

子组件中:

```html
<button v-on:click="$emit('enlarge-text', 0.1)">
  Enlarge text
</button>
```

父组件中:

```html
<blog-post
  ...
  v-on:enlarge-text="postFontSize += $event"
></blog-post>
```

或者，如果这个事件处理函数是一个方法, 那么这个值将会作为第一个参数传入这个方法:

```html
<blog-post
  ...
  v-on:enlarge-text="onEnlargeText"
></blog-post>

methods: {
  onEnlargeText: function (enlargeAmount) {
    this.postFontSize += enlargeAmount
  }
}
```



##### 在组件上使用v-model

自定义事件也可以用于创建支持 `v-model` 的自定义输入组件

```html
<input v-model="searchText">
```

等价于:

```html
<input
	v-bind:value="searchText"
  v-on:input="searchText=$event.target.value"
>
```

当用在组件上时，`v-model` 则会这样：

```html
<custom-input
	v-bind:value="searchText"
  v-on:input="searchText=$event"              
></custom-input>
```

为了让它正常工作，这个组件内的 `<input>` 必须

- 将其 `value` attribute 绑定到一个名叫 `value` 的 prop 上
- 在其 `input` 事件被触发时，将新的值通过自定义的 `input` 事件抛出

写成代码之后是这样的：

```javascript
Vue.component('custom-input', {
  props: ['value'],
  template: `
  	<input
  		v-bind:value="value"
  		v-on:input="$emit('input', $event.target.value)"
  	>  
  `
})
```





#### 通过插槽分发内容



#### 动态组件



#### 解析DOM模板注意事项





### 组件名称

#### 组件名定义方式

定义组件名称有两种方式:

##### kebab-case((短横线分隔命名)

```js
Vue.component('my-component-name', { /* ... */ })
```

当使用 kebab-case (短横线分隔命名) 定义一个组件时，你也必须在引用这个自定义元素时使用 kebab-case，例如 `<my-component-name>`

##### 使用PascalCase(首字母大写命名)

"当使用 PascalCase (首字母大写命名) 定义一个组件时，你在引用这个自定义元素时<span style="color:blue">两种命名法都可以使用</span>。也就是说 `<my-component-name>` 和 `<MyComponentName>` 都是可接受的. 注意，尽管如此，直接在 DOM (即非字符串的模板) 中使用时只有 kebab-case 是有效的。



### 组件注册

#### 全局注册

##### 注册及使用

1. 利用`Vue.component()`方法,传入自定义组件名称,然后传入组件的配置
2. 在Vue实例挂载的DOM元素上使用它,以 *标签* 形式使用组件.

**全局注册**

它们在注册之后可以用在任何新创建的 Vue 根实例 (`new Vue`) 的模板中

##### 案例

```html

<div id="app">
  <component-a></component-a>
  <component-b></component-b>
  <component-c></component-c>
</div>

<script>
	Vue.component('component-a', { /* ... */ }) //定义一个名为component-a的新组件
	Vue.component('component-b', { /* ... */ })
	Vue.component('component-c', { /* ... */ })

	new Vue({ el: '#app' })
</script>
```

##### 总结

* 创建全局组件时，应该使用Vue对象的component方法，这个方法接收<span style="color:blue">两个参数</span>。第一个字符串：表示组件名称， 第二个为一个对象：表示组件内容
* 组件要<span style="color:blue">渲染的内容</span>应该写在template选项中，作为其值进行处理
* 注册时，<span style="color:blue">推荐组件名称</span>为【小写加分隔符链接的形式】，类似于css属性名的写法
* 组件全局注册后，在任何vue实例中都可以使用，但前提是相关vue实例应该在注册后在声明; 在所有子组件中也是如此，也就是说<span style="color:blue">这三个组件*在各自内部*也都可以相互使用</span>。
* 组件在使用时，应该以标签形式调用

##### 组件内容的其他选项

<u>组件中的data必须是函数</u>

> 与创建Vue实例不同,data属性必须是一个函数. 解决对象共享数据的问题(组件中多处引入会共享/操作同一个对象)

<u>HTML</u>限制

在某些时候，vue组件会受到html的限制，比如table内就只能写行列，select内只能写option等，这个时候组件直接写进去就会无效，此时我们就可以使用<span style="color:blue">is属性</span>来实现

![](https://img-blog.csdnimg.cn/20190408200155622.png)

自定义组件 被认为是无效的内容，因此在渲染的时候会导致错误。这时应使用特殊的 is 属性：

![](https://img-blog.csdnimg.cn/20190408200335372.png)

标准HTML中，一些元素中只能放置特定的子元素，另一些元素只能存在于特定的父元素中。比如table中不能放置div，tr的父元素不能div等。所以，**当使用自定义标签时，标签名还是那些标签的名字，但是可以在标签的is属性中填写自定义组件的名字**

<u>在非单文件组件时的项目文件的开发调用</u>

1. index.html单独一个文件
2. 每个组件一个js文件
3. 实例化vue对象一个文件
4. 然后在js文件里面调用，各个js文件，创建vue实例的那个js应该放在最后面调用

![](https://img-blog.csdnimg.cn/20190408201200556.png)



##### 全局组件的进阶

<u>组件复用的基本体现</u>

定义后的组件可以通过标签多次调用

```html

<div id="app">
    <my-component></my-component><!-- 以标签形式使用组件 -->
    <my-component></my-component><!-- 以标签形式使用组件 -->
    <my-component></my-component><!-- 以标签形式使用组件 -->
    <my-component></my-component><!-- 以标签形式使用组件 -->
</div>
<script>
    // 定义一个名为 my-component 的新组件
    Vue.component('my-component', {
        //组件内容写这里
        template: "<div>这是一个全局组件</div>",
    })
    //声明一个vue实例
    var vueApp = new Vue({
        el: '#app',
    })
</script>
```

<u>组件的template选项</u>

注意：组件中的template只能有一个根元素。

```html
<div id="app">	<!-- 在第一个vue实例中调用全局组件 -->
    <my-component></my-component><!-- 以标签形式使用组件 -->
</div>
<div id="app1">	<!-- 在第二个vue实例中调用全局组件 -->
    <my-component></my-component><!-- 以标签形式使用组件 -->
</div>
<script>
    // 定义一个名为 my-component 的新组件
    Vue.component('my-component', {
        //组件内容写这里
        template: "<div>这是一个全局组件</div>",
    })
    //声明一个vue实例
    var vueApp = new Vue({
        el: '#app',
    });
    var vueApp = new Vue({
        el: '#app1',
    });
</script>
```

<u>声明在前面的全局组件可以直接使用声明在后面的全局组件</u>

```html
<div id="app">
    <component-1></component-1><!-- 以标签形式使用组件 -->
</div>
<script>
    Vue.component('component-1', {
        template: `<div>这是第一个组件
                   <component-2></component-2>
                   <component-3></component-3>
                   </div>`,
    });
    Vue.component('component-2', {
        template: "<div>这是第二个组件</div>",
    });
    Vue.component('component-3', {
        template: "<div>这是第三个组件</div>",
    });
    //声明一个vue实例
    var vueApp = new Vue({
        el: '#app',
    });
</script>
```



#### 局部注册

##### 背景

全局注册往往是不够理想的。比如，如果你使用一个像 webpack 这样的构建系统，全局注册所有的组件意味着即便你已经不再使用这个组件了，它仍然会被包含在你最终的构建结果中。这造成了用户下载的 JavaScript 的无谓的增加。

##### 2种引入方式

**定义**

Vue实例中有个选项components可以注册局部组件，注册后就只在该实例作用域下有效

**2种引入**

* 通过一个普通的 JavaScript 对象来定义组件
* 使用`import`函数返回`Promise`

```js
var ComponentA = { /* ... */ }
var ComponentB = { /* ... */ }
var ComponentC = { /* ... */ }

new Vue({
  el:"#app",
  components: {
    'component-a':ComponentA,
    'component-b':ComponentB,
    'component-d': () => import('./components/componentD')
  }
})
```

对于 `components` 对象中的每个 property 来说，其 property 名就是自定义元素的名字，其 property 值就是这个组件的选项对象。注意<span style="color:blue">**局部注册的组件在其子组件中不可用**</span>

##### 使用形式

<u>组件中嵌套</u>

```html
<div id="app">
    <my-component></my-component>	
</div>
<script>
    var vueApp = new Vue({
        el: '#app',
        components: {
            'my-component': {
            	//调用该局部组件下的局部组件<next-component>
                template: '<div>{{message}}<next-component></next-component></div>',
                data: function () {
                    return {
                        message: '这是一个局部组件',
                    }
                },
                components:{
                    'next-component':{
                        template:'<div>这是局部组件下的局部组件</div>'
                    }
                }
            }
        }
    });
</script>
```



<u>在组件中定义子组件时,可以使用外部定义对象作为组件内容</u>

```html
div id="app">
    <my-component></my-component>
</div>
<script>
    var obj1 = {
        template:`<div>我是第一个子div</div>`
    }
    var obj2 = {
        template:`<div>我是第二个子div</div>`
    }
    Vue.component('my-component',{
        template:`<div>
                    <sub1></sub1>
                    <sub2></sub2>
                  </div>`,
        components: {
            sub1:obj1,
            sub2:obj2
        }
    })
    var vueApp = new Vue({
        el: '#app',
    });
</script>
```



##### 在模板中使用

<u>组件调用时可以直接使用单标签形式</u>

当用单标签多次调用同一组件，只会产生组件一次

```html
<div id="app">
<person-message></person-message>
<person-message/>
</div>
```



#### 模块系统

如果你通过 `import`/`require` 使用一个模块系统，那么我们会为你提供一些特殊的使用说明和注意事项。

##### 在模块系统中局部注册

使用了诸如 Babel 和 webpack 的模块系统。在这些情况下，我们推荐创建一个 `components` 目录，并将每个组件放置在其各自的文件中。然后你需要在局部注册之前导入每个你想使用的组件。

```js
import ComponentA from './ComponentA'
import ComponentC from './ComponentC'

export default {
  components: {
    ComponentA,
    ComponentC
  },
  // ...
}

//在 ComponentA 和 ComponentC 都可以在 ComponentB 的模板中使用了。
```





##### 基础组件的自动化全局注册

> 文档

**背景**

某些组件是相对通用的,有时候会把它们称为[基础组件](https://cn.vuejs.org/v2/style-guide/#基础组件名-强烈推荐)，它们会在各个组件中被频繁的用到。所以会导致很多组件里都会有一个包含基础<span style="color:blue">组件的长列表</span>

如果你恰好使用了 webpack (或在内部使用了 webpack 的 [Vue CLI 3+](https://github.com/vuejs/vue-cli))，那么就可以使用 `require.context` 只在<span style="color:blue">全局注册通用的基础组件</span>。

**案例**

应用入口文件 (比如 `src/main.js`) 中全局导入基础组件的示例代码：

```js
import Vue from 'vue';
import upperFirst from 'lodash/upperFirst';
import camelCase from 'lodash/camelCase';

const requireComponent = require.context(
	//其组件目录的相对路径
  './compoennts',
  //是否查询其子目录
  false,
  //匹配基础组件文件名的正则表达式
  /Base[A-Z]\w+\.(vue|js)$/
)

requireComponent.keys().forEach(fileName => {
  //获取组件配置
  const componentConfig = requirecomponent(fileName);
  
  //获取组件的PascalCase命名
  const componentName = upperFirst(
  camelCase(
  	//获取和目录深度无关的文件名
    fileName
    	.split('/')
    	.pop()
    	.replace(/\.\w+$/, '')
  ))
})

// 全局注册组件
  Vue.component(
    componentName,
    // 如果这个组件选项是通过 `export default` 导出的，
    // 那么就会优先使用 `.default`，
    // 否则回退到使用模块的根。
    componentConfig.default || componentConfig
  )
})


//项目示例
https://github.com/bencodezen/vue-enterprise-boilerplate/blob/main/src/components/_globals.js
```

**全局注册的行为必须在根 Vue 实例 (通过 `new Vue`) 创建之前发生**



##### 其他方法

> https://mp.weixin.qq.com/s/0Yekkc08ozbNxuquHVGveg

先在components文件夹（这里面都是些高频组件）添加一个叫global.js的文件，在这个文件里使用require.context 动态将需要的高频组件统统打包进来。然后在main.js文件中引入global.js的文件。

```javascript
//global.js

import Vue from 'vue'
function changeStr(str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

const requireComponent = require.context('./', false, /\.vue$/)

const install = () => {
  requireComponent.keys().forEach(fileName => {
    let config = requireComponent(fileName)
    console.log(config) // ./child1.vue 然后用正则拿到child1
    let componentName = changeStr(
    	fileName.replace(/^\.\//, '').replace(/\.\w+$/, '')
    )
    
    Vue.component(comopnentName, config.default || config)
  })
}

export default {
  install //对外暴露install方法
}

//main.js
import index from './components/globals.js'
Vue.use(index)
```



### Prop 传递数据

#### 基本使用

> 详见 组件-->基本使用-->prop



#### Prop的大小写(camelCase vs kebab-case)

HTML 中的 attribute 名是大小写不敏感的，所以浏览器会把所有大写字符解释为小写字符。

> 在父组件中,HTML中通过kebab形式指定的属性，会在子组件内部自动转换为camel形式
>
> 在子组件中,camelCase (驼峰命名法) 的 prop 名需要使用其等价的 kebab-case (短横线分隔命名) 命名
>
> 在子组件中, 组件的template选项(字符串模板) 如果你使用字符串模板，那么这个限制就不存在了。



```html
<div id="app">
  <price-display percentage-discount="20%"></price-display>
</div>
<script>
    Vue.component('price-display', {
    props: {
      percentageDiscount: Number
    }
  });
new Vue({
  el: '#app'
});
</script>
```



如果你使用字符串模板，那么这个限制就不存在了。

```js
Vue.component('blog-post', {
  // 在 JavaScript 中是 camelCase 的
  props: ['postTitle'],
  template: '<h3>{{ postTitle }}</h3>'
})
```

```html
<!-- 在 HTML 中是 kebab-case 的 -->
<blog-post post-title="hello!"></blog-post>
```







#### Prop类型

> 除了可以传递一个的简单数组，来表明组件可以接收的属性的名称，也可以传递一个对象，来描述属性的信息，比如它的类型、是否必须、默认值以及用于高级验证的自定义验证函数。

##### 数组字符串形式

```js
props:['title', 'likes', 'author', 'callback']
```



##### 对象形式

property的名称和**值**分别是prop各自的名称和**类型**:

```js
props: {
  title:String,
  likes: Number,
  author: Object,
  callback: Function,
  contactsPromise: Promise //or any other constructor
}
```



#### 传递静态/动态Prop

*任何*类型的值都可以传给一个 prop

给prop传递静态的值(字符串)

```html
<blog-post title="My journey with Vue"></blog-post>
```

给prop传递动态的值
> 使用v-bind指令,最终求值是表达式的值

```html
// 传递一个数值
<div id="app">
	<son :num="2"></son>   //传递的是数值
	<son :num="'2'"></son> //传递的是字符串格式
</div>

//...
<script>
	Vue.component('son', {
		props: ['num'],
		computed: {
			showNumType() {
				return typeof this.num
			}
		},
		template: `
			<div>num's type is {{showNumType}}, its value is {{this.num}}</div>
		`
	})

	new Vue({
		el: '#app',
		
	})
</script>
```






#### prop数据流

##### 单向下行绑定
所有的 prop 都使得其父子 prop 之间形成了一个**单向下行绑定**：

* 父级 prop 的更新会向下流动到子组件中，<span style="color:red">但是不可以在子组件中修改prop</span>
* 这样会防止从子组件意外变更父级组件的状态，从而导致你的应用的数据流向难以理解。

**每次父级组件发生变更时，子组件中所有的 prop 都将会刷新为最新的值**。这意味着<span style="color:blue;">**你不应该在一个子组件内部改变 prop**</span>。如果你这样做了，Vue 会在浏览器的控制台中发出警告。

**两种变更prop的情形**(**prop为原始值)**
* 使用data来接收 //这个prop不再变化
* 使用计算属性来接收处理  //这个prop会发生变化,例如数组/对象的增删

1.使用响应式data来接收prop
>用prop来传递一个初始值;这个子组件希望其作为<span style="text-decoration:underline blue">本地的prop数据</span>来使用.

```js
props:['initialCounter'],
data:function() {
  return {
    counter: this.initialCounter
  }
}
```

2.使用计算属性
>prop以原始的值传入并且需要进行转换. 这种情况下,最好使<span style="text-decoration:underline blue">用prop值来定义一个计算属性</span>

```js
props:['size'],
computed: {
  normalizedSize: function() {
    return this.size.trim().toLocalLowerCase();
  }
}
```

**注意**: 在 JavaScript 中**对象和数组是通过引用传入**的，所以对于一个数组或对象类型的 prop 来说，在子组件中改变变更这个对象或数组本身**将会**影响到父组件的状态。

##### 双向绑定
双向绑定的两种方案:
* `.sync`
* `v-model`

**.sync**

语法糖实现
```html
<count-from-number :number.sync="numberToDisplay" />

// 等于下面的代码

<count-from-number :number="numberToDisplay" @update:number="val=>numberToDisplay = val"
```
如果想要更改父级组件的值，需要触发update:number事件，该指令的参数——示例中为number——是将要更新的值的名称。
如何实现组件CountFromNumber呢?
```js
	Vue.component('count-from-number', {
		template: '<p>当前数字是 {{ number }}</p>',
		props: {
			number: {
				type: Number,
				required: true
			}
		},
		mounted(){
			setInterval(() => {
				this.$emit('update:number', this.number + 1);
			}, 1000);
		}
	});
```
在某些情况下，将触发事件的逻辑封装到计算属性中会有利于代码的组织，如下所示：
```js
	Vue.component('count-from-number', {
		template: '<p>当前数字是 {{ number }}</p>',
		props: {
			number: {
				type: Number,
				required: true
			}
		},
		computed: {
			localNumber: {
				get() {
					return this.number
				},
				set(val) {
					this.$emit('update:number', value)
				}
			}
		},
		mounted(){
			setInterval(() => {
				this.localNumber++;
			}, 1000);
		}
	});
```

注意事项:
如果父级组件与子组件都对同一个值的更新做出反应，并且在处理更新的过程中再次改变这个值，有可能引发无限循环.
如果只更新从prop传入的值，而不关心父级组件的值的更新，你可以在一开始的data函数中通过this来引用prop的值，将它复制到data对象中. 
此时,如果prop的值更新了，组件内部并不会更新，因为它引用的是另外一个值。
如果你想要根据新提供的数值重新开始计数，可以为data中用来接收prop的值添加一个**侦听器**，将新的值复制给number。

```js
Vue.component('count-from-number', {
	template: `<p>当前的数字是 {{number}} </p>`,
	props: {
		number: {
			type: Number,
			required: true
		}
	},
	data() {
		return {
			initialNumber: this.number
		}
	},
	mounted() {
		setInterval(() => this.initialNumber++, 1000)
	},
	watch: {
		initialNumber: {
			//deep: true,
			//immediate: true,
			handler(newVal, oldVal) {
				//
				this.umber = newVal
			}
		}
	}
})
```


**v-model**
> 与.sync修饰符相似，可以在组件上使用v-model指令来创建自定义输入组件。

示例:
```js
<input-username v-model="username" />

//上面的代码等效于

<input-username :value="username" @input="value => username.value"
```
为了创建InputUsername组件，我们需要它做两件事情：首先，它需要通过value属性获取初始值，然后不论何时只要value的值发生变化，它必须触发一个input事件。

在之前例子中使用的方法（通过触发事件来改变值或使用计算属性）将不再有效。这里，必须监听输入框元素的input事件：
```js
Vue.component('InputUsername', {
	template: `
		<input type="text" :value="value" @input="handlerInput" />
	`,
	props: {
		value: {
			type: String,
			required: true
		}
	},
	methods: {
		handlerInput(e) {
			let value = e.target.value.toLowerCase()
			if (value !== e.target.value) {
				e.target.value = value   //输入大写字母会自动转换为小写字母
			} else {
				this.$emit('input', value)
			}
		}
	}
})
```
v-model的用法还是不变。唯一的区别是无法输入大写字母！




#### Prop验证

##### 获取prop的时机

<span style="color:red">prop 会在一个组件实例创建之前进行验证</span>，所以实例的 property (如 `data`、`computed` 等) 在 `default` 或 `validator` 函数中是不可用的

在beforeCreate中获取不到prop中的值,在created中可以获取到prop中的值.



**指定prop的类型**

> 要指定一个prop的类型，可以为它传递一个原生的构造函数，例如Number、 String或者Object，也可以是一个用于instanceof操作符检测的自定义构造函数

```js
Vue.component('price-display', {
  props: {
    price: Number,                       //接收类型为数值
    unit:  [String,Number,Object,Price], // 接收类型可以为多种类型, 这里的Price为自定义构造函数
  }
})
```

如果price不是一个数字，或者unit不是一个字符串，Vue就会抛出一个警告。



**指定prop类型,是否必须,默认值,验证函数**

> 指定一个prop是否是必需的，
> 或者在没有传入值时，给它设定一个默认值。为此，可以传递给它一个对象而不是像前面那样的构造函数，并通过该对象的type属性来设置prop的类型

指定的键值: 

* type表示用来验证数据的类型

* default表示如果父组件没有向子组件传参，则使用默认值
* required表示必须传入

* <span style="color:red">默认项和required不能同时声明</span>

```js
Vue.component('price-display', {
  props: {
    price: {
      type: Number,
      required: true //必须传递
    },
    unit: {
      type: String,
      default: "$"  //默认值
    },
    price2: {
      type: Number,
      required: true,
      validator(value) { //验证函数
        return value >= 0
      }
    }
  }
})
```

当 prop 验证失败的时候，(开发环境构建版本的) Vue 将会产生一个控制台的警告。



##### prop类型检查 type的值
原生构造函数
- `String`
- `Number`
- `Boolean`
- `Array`
- `Object`
- `Date`
- `Function`
- `Symbol`
* <u>自定义的构造函数，并且通过 `instanceof` 来进行检查确认。</u> 

例如，给定下列现成的构造函数：来验证 `author` prop 的值是否是通过 `new Person` 创建的。

```js
function Person(firstName, lastName) {
  this.firstName = firstName,
  this.lastName = lastName
}

Vue.component('blog-post', {
  props: {
    author: Person
  }
})
```



#### 非prop的attribute

一个非 prop 的 attribute 是指传向一个组件，但是该组件并没有相应 prop 定义的 attribute

因为显式定义的 prop 适用于向一个子组件传入信息，然而组件库的作者并不总能预见组件会被用于怎样的场景。这也是为什么组件可以接受任意的 attribute，而<span style="color:blue">这些非prop的 attribute 会被添加到这个组件的根元素上</span>。

```html
<!-- data-date-picker="activated" attribute 就会自动添加到 <bootstrap-date-input> 的根元素上。 -->

<bootstrap-date-input data-date-picker="activated"></bootstrap-date-input>
```



##### 替换/合并已有的attribute

* 对于绝大多数 attribute 来说，从外部提供给组件的值会替换掉组件内部设置好的值
* `class` 和 `style` attribute 不会覆盖而是合并

例如: 组件`<bootstrap-date-input>`的模板如下:

```html
<input type="date" class="form-control">
```

在组件标签上绑定的attribute有:

```html
<bootstrap-data-input
	data-date-picker="activated"
  class="date-picker-theme-dark"
></bootstrap-data-input>
```

两个class会合并,得到最终的值`form-control date-picker-theme-dark`



##### 禁用attribute继承

如果你**不**希望组件的根元素继承 attribute，你可以在组件的选项中设置 `inheritAttrs: false`

```js
Vue.component('my-component', {
  inheritAttrs: false
})
```

这尤其适合配合实例的 `$attrs` property 使用，该 property 包含了传递给一个组件的 attribute 名和 attribute 值，

有了 `inheritAttrs: false` 和 `$attrs`，你就可以手动决定这些 attribute 会被赋予哪个元素。在撰写[基础组件](https://cn.vuejs.org/v2/style-guide/#基础组件名-强烈推荐)的时候是常会用到的：

```js
Vue.component('base-input', {
  inheritAttrs: false,
  props: ['label', 'value'],
  template: `
		<label>
			{{label}}
			<input
				v-bind="$attrs"
				v-bind:value="value"
				v-on:input="$emit('input', $event.target.value)"
		</label>
	`
})
```

**注意**:  `inheritAttrs: false` 选项**不会**影响 `style` 和 `class` 的绑定。

这个模式允许你在使用基础组件的时候更像是使用原始的 HTML 元素，而不会担心哪个元素是真正的根元素：

```html
<base-input
	label='Username'
	v-model='username'
	required
  placeholder='Enter your name'
></base-input>
```

### prop案例 !!!

#### 1. v-bind=$attrs应用封装公共组件

<iframe src="https://codesandbox.io/embed/vue-attrs-gl5inh?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="vue/$attrs"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>



#### 2.对象prop传递给子组件的2种方案
两种方案:
* 子组件中声明对象类型的prop
* 使用`v-bind`将对象解构传递给子组件
第二种方式会将对象中的所有属性作为独立的prop传递给子组件。(适合动态组件)

```vue

attrs={
	placeholder="item.attrs.placeholder"
  clearable="item.attrs.clearable"
  maxlength="item.attrs.maxlength"
}
<component 
 :is="item.component" 
 v-model="formData[item.prop]" 
 v-bind="item.attrs" 
 :class="item.componentClass"
 :style="item.componentStyle" />

//上面的动态组件相当于
<component 
 :is="item.component"
 v-model="formData[item.prop]" 
 :placeholder="item.attrs.placeholder"
 :clearable="item.attrs.clearable"
 :maxlength="item.attrs.maxlength"
 :class="item.componentClass"
 :style="item.componentStyle" />

```


### 非prop属性
> 如果为某个组件设置的属性并不是用作prop，该属性会被添加到组件的HTML根元素上。
> 组件和组件的根元素设置相同的属性, 如果我们为两者设置了相同的属性，组件上的属性会覆盖它内部模板上的属性。但class和style，同名的值会被合并





### 组件使用基本流程

#### 定义组件 ?



#### 注册组件

> 所有的组件定以后,必须注册后才能使用. 注册分为全局,局部.



##### 全局注册

Vue.component('组件名', 组件)    

##### 局部注册

在vm中添加components属性 components:{组件名:组件}

#### 写组件标签

​    




### 动态组件

#### 背景

在不同组件之间进行动态切换是非常有用的，比如在一个多标签的界面里

#### 语法

通过Vue 的 `<component>` 元素加一个特殊的 `is` attribute 来实现

```html
<component v-bind:is="currentTabComponent"></component>
```

##### 属性值类型

* 已注册组件的名字
* 一个组件的选项对象

##### 属性的处理

> 请留意，这个 attribute 可以用于常规 HTML 元素，但这些元素将被视为组件，这意味着所有的 attribute **都会作为 DOM attribute 被绑定**。对于像 `value` 这样的 property，若想让其如预期般工作，你需要使用 [`.prop` 修饰器](https://cn.vuejs.org/v2/api/#v-bind)。


##### HTML中的properties和attributes比较

> [API — Vue.js (vuejs.org)](https://v2.cn.vuejs.org/v2/api/#v-bind)
> [javascript - What is the difference between properties and attributes in HTML? - Stack Overflow](https://stackoverflow.com/questions/6003819/what-is-the-difference-between-properties-and-attributes-in-html#answer-6004028)

* html元素上定义的是*attributes*， 浏览器解析html元素后创建的DOM对象节点上具有的是*properties*
* 对一个DOM节点对象来说,*properties*是这个节点对象的属性, *attributes*是这个对象*attributes*属性的元素.
* DOM节点的很多*properties*与具有相同或类似名字的*attributes*相关,但不是一一对应的关系. 
	* 例如input元素, `value`的property代表input盒子当前的文本内容,通过`theInput.value`来获取; 而`value`的attribute包含HTML源码`value` attribute的初始文本内容, 通过`theInput.getAttribute('value')` 或`theInput.defaultValue`来获取其原始
	* 一些*properties*直接代表对应的属性,例如'rel', 'id';
	* 一些*properties*直接通过稍微不同的名字来代表,例如`HTMLFor`代表`for`的attribute, `className`代表`class`
	* 一些*properties*代表具有限制或更改的attributes(例如`src`, `href`, `disabled`, `multiple`)
	* 具体的对应关系可查看文档: [HTML Standard (whatwg.org)](https://html.spec.whatwg.org/multipage/common-dom-interfaces.html#reflect)




#### 两种示例

<u>已注册组件的名字</u>

```html
<div id="root">
  <button
  	v-for="tab in tabs"
    v-bind:key="tab"
    v-on:click="currentTab=tab"
  >
    {{tab}}
  </button>
  
  <component v-bind:is="currentTabComponents"></component>
</div>

<script>
	Vue.component('tab-home', {
    template: '<div>Home components</div>'
  })
  Vue.component("tab-posts", {
    template: "<div>Posts component</div>"
  });
  Vue.component("tab-archive", {
    template: "<div>Archive component</div>"
  });
  
  new Vue({
    el: '#root',
    data: {
      currentTab: 'Home',
      tabs:['Home', 'Posts', 'Archive'],
    },
    computed: {
      currentTabComponent: function() {
        return 'tab-'+this.currentTab.toLowerCase()
      }
    }
  })
</script>
```





<u>一个组件的选项对象</u>

```html
<div id="root">
  <button
  	v-for="tab in tabs"
    v-bind:key="tab.name"
    v-on:click="currentTab=tab"
  >
    {{tab}}
  </button>
  <component v-bind:is="currentTab.component"></component>
</div>

<script>
	let tabs = [
    {
     name: 'Home', 
     components: {
      template:'<div>Home component</div>'
    	}
    },
    {
      name:'Posts',
      components: {
        template:'<div>Posts component</div>'
      }
    },
    {
      name:'Archive',
      components: {
        template:'<div>Archive component</div>d'
      }
    }
  ];
  
  new Vue({
    el:'#root',
 		data: {
      tabs,
      currentTab: tabs[0]
    }
  })

</script>
```



动态`<component>`案例

```vue
// src/comopnents/baseComponents/baseForm/index.vue

<template>
	<div @clik.stop>
    <component
    	:is="componentId"
      v-bind="$attrs"
      @click="(param) => this.$emit('click', param)"
    ></component>
  </div>
</template>


<script>
	import baseInput from "./baseInput"
  import baseSelect from "./baseSelectCustom"; // 定制版
  import baseTime from "./baseTime";
  import baseCheck from "./baseCheck";
  import baseJudge from "./baseJudge";
  import baseupload from "./baseupload";
  import baseSelectQuery from "./baseSelectQuery";
  import baseSelectQuery_two from "./baseFromMask_two";
  import baseSearchShll from "./baseSearchShll";
  import baseCheckTwo from "./basecheckTwo";
  import baseTime_two from "./baseTime_two";
  import baseCheckthree from "./baseCheckthree";
  import baseInputTwo from "./baseInputTwo";
  import baseuploadMetering from "./baseuploadMetering";
  import baseInputSelects from "./baseInputSelects";
  import basejudeFlag from "./basejudeFlag"
  import basePopup from "./baseInputpopup";
  import baseInforSearchShll from "./baseInforSearchShll";
  import baseTimeashdas from "./baseTimeashdas";
  import baseJudges from "./baseJudges";
  import baseJudgetb from "./baseJudgetb";
  
  export default {
    name: 'baseFrom',
    components: {
      baseInput,
      baseSelect,
      baseTime,
      baseCheck,
      baseJudge,
      baseupload,
      baseSelectQuery,
      baseSelectQuery_two,
      baseSearchShll,
      baseCheckTwo,
      baseTime_two,
      baseCheckthree,
      baseInputTwo, 
      baseuploadMetering,
      baseInputSelects,
      basejudeFlag,
      basePopup,
      baseInforSearchShll,
      baseTimeashdas,
      baseJudges,
      baseJudgetb,
    },
    props: {
      type: {type:String, default: '1'}
    },
    computed: {
      componentId() {
        return [
          "baseInput",//ok
          "baseSelect",//ok
          "baseTime",//ok
          "baseCheck",//ok
          "baseJudge",//ok
          "baseupload",//该组件默认不可修改
          "baseSelectQuery",//ok
          "baseSelectQuery_two",//
          "baseSearchShll",//9
          "baseCheckTwo",//ok
          "baseTime_two",//ok
          "baseCheckthree",//ok
          "baseInputTwo", //13ok
          "baseuploadMetering", // 14
          "baseInputSelects",//15
          "basejudeFlag",//16
          "basePopup",
          'baseInforSearchShll',//18ok
          'baseTimeashdas',//19ok
          'baseJudges',//20ok
          'baseJudgetb',//21ok
        ][this.type - 1];
      }
    }
  }
</script>
```



```vue
// 其他组件调用baseForm

<!-- 发电用户普查 -->
<article class="publicData" v-show="powerUsers">
  <template v-for="(item, index) in publicEntryList">
	<baseFrom
          v-if="[19].indexOf(index) != -1"
          :key="index"
          v-bind="item"
          v-model="publicEntryList[index]"
          @click="entryList($event, item, index)"
          />
  </template>
</article>
```




#### keep-alive

##### 背景

当在这些组件之间切换的时候，你有时会想保持这些组件的状态，以避免反复重渲染导致的性能问题。更希望那些标签的组件实例能够被在它们第一次被创建的时候缓存下来。为了解决这个问题，我们可以用一个 `<keep-alive>` 元素将其动态组件包裹起来

```html
//失活组件将会被缓存

<keep-alive>
	<component v-bind:is="currentTabComponent"></component>
</keep-alive>
```



**注意事项** 注意这个 `<keep-alive>` 要求被切换到的组件都有自己的名字，不论是通过组件的 `name` 选项还是局部/全局注册。

##### 实例

[这个示例](https://codesandbox.io/s/github/vuejs/vuejs.org/tree/master/src/v2/examples/vue-20-keep-alive-with-dynamic-components)

<iframe src="https://codesandbox.io/embed/github/vuejs/vuejs.org/tree/master/src/v2/examples/vue-20-keep-alive-with-dynamic-components?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="vue-20-keep-alive-with-dynamic-components"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>



### 异步组件

在大型应用中，我们可能需要将应用分割成小一些的代码块，并且只在需要的时候才从服务器加载一个模块。为了简化，Vue 允许你以一个工厂函数的方式定义你的组件，这个工厂函数会异步解析你的组件定义。Vue 只有在这个组件需要被渲染的时候才会触发该工厂函数，且会把结果缓存起来供未来重渲染。例如

```js
Vue.component('async-example', function(resolve, reject) {
  setTimeout(function() {
    //向resolve回调传递组件定义
    resolve({
      template: '<div>i am aysnc'</div>'
    })
  },1000)
})
```

#### 具体用法

##### 异步组件和 [webpack 的 code-splitting 功能](https://webpack.js.org/guides/code-splitting/)一起配合使用

```javascript
Vue.component('async-webpack-example', function (resolve) {
  // 这个特殊的 `require` 语法将会告诉 webpack
  // 自动将你的构建代码切割成多个包，这些包
  // 会通过 Ajax 请求加载
  require(['./my-async-component'], resolve)
})
```

##### 在工厂函数中返回一个 `Promise`

```javascript
Vue.component(
  'async-webpack-example',
  // 这个动态导入会返回一个 `Promise` 对象。
  () => import('./my-async-component')
)
```



#### 实例



#### 特点

* 可以实现组件的按需加载,性能优化,提高页面加载速度
* '路由懒加载'就是使用异步组件的原理



#### 处理加载状态????



### 访问元素&组件

#### 背景

> 在绝大多数情况下，我们最好不要触达另一个组件实例内部或手动操作 DOM 元素。不过也确实在一些情况下做这些事情是合适的。

#### 访问根实例

> 在每个 `new Vue` 实例的子组件中，其根实例可以通过 `$root` property 进行访问
>
> 所有的子组件都可以将这个实例作为一个全局 store 来访问或使用。

```javascript
//Vue根实例
new Vue({
  data: {
    foo: 1
  },
  computed: {
    bar: function () { /* ... */ }
  },
  methods: {
    baz: function () { /* ... */ }
  }
})

//子组件中
 //获取根组件数据
this.$root.foo

 //写入根组件的数据
this.$root.foo = 2

 //访问根组件的计算属性
this.$root.bar

 //调用根组件的方法
this.$root.baz()
```

#### 最佳实践

> 在demo或少量组件的应用使用. 中大型应用推荐使用vuex



### 访问子级组件实例

#### 背景

在 JavaScript 里直接访问一个子组件, 而不是间接通过`prop` 和 `事件`

#### ref

##### 定义及调用

> 通过`ref`这个attribute为**子组件或元素**赋予一个自定义ID引用, 使用`this.$refs.ID`来访问这个子组件



##### 使用场景

* ref加在普通元素上,`this.$refs.name`获取的是dom元素
* ref加在子组件上, 获取的组件实例
* 当v-for用于元素或组件,ref获取的将是一组数组或dom节点



##### 实例

<u>从父级组件自动聚焦到子组件的输入框</u>

<iframe src="https://codesandbox.io/embed/vue-ref-40woi2?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="vue/ref"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>




<u>`ref`与`v-for`一起使用</u>

当 `ref` 和 `v-for` 一起使用的时候，你得到的 ref 将会是一个包含了对应数据源的这些子组件的数组或dom节点数组. 这里的ref的值是固定值,所以`this.$refs.ID`获得是一个数组.

同样,如果存在多个`v-for`循环,并且绑定在上面的`ref`的值相同,那么

<iframe src="https://codesandbox.io/embed/boring-panna-3usu2q?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="boring-panna-3usu2q"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>



##### 注意事项

* `$refs` 只会在组件渲染完成之后生效，并且它们不是响应式的。其本身是作为渲染结果被创建的,在初始渲染的时候不能访问它们,还不存在.
* 避免在模板或计算属性中访问 `$refs`, 因为不是响应式的





### 访问父级组件实例

#### $parent

> 用来从一个子组件访问父组件的实例。替代将数据以 prop 的方式传入子组件的方式。



#### 使用场景

需要特别地共享一些组件库,例如 Google 地图组件. `<google-map>` 组件可以定义一个 `map` property，所有的子组件都需要访问它

```html
<google-map>
  <google-map-markers v-bind:places="iceCreamShops"></google-map-markers>
</google-map>
```

<iframe src="https://codesandbox.io/embed/github/vuejs/vuejs.org/tree/master/src/v2/examples/vue-20-accessing-parent-component-instance?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="vue-20-accessing-parent-component-instance"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>



#### 存在问题

组件层级变化,导致`this.$parent`访问的不是原来的组件.例如: 添加一个新的 `<google-map-region>` 组件

```html
<google-map>
  <google-map-region v-bind:shape="cityBoundaries">
    <google-map-markers v-bind:places="iceCreamShops"></google-map-markers>
  </google-map-region>
</google-map>
```

紧接着的处理方法:

```javascript
var map = this.$parent.map || this.$parent.$parent.map
```



#### 最佳实践-依赖注入



### 依赖注入 ???

#### 背景

子组件访问父组件实例使用`$parent`, 但是组件层级发生变化的话(例如之间插入一个新的组件,改变原先的父子关系),`$parent`取到的实例不会是原先的那个组件实例.

#### provide

`provide` 选项允许我们指定我们想要**提供**给后代组件的数据/方法

```javascript
provide: function() {
  return {
    getMap: this.getMap
  }
}
```



#### inject

在任何后代组件中,都可以使用`inject`选项来接收指定的想要添加在这个实例上的 property

```javascript
inject: ['getMap']
```

**示例**

<iframe src="https://codesandbox.io/embed/github/vuejs/vuejs.org/tree/master/src/v2/examples/vue-20-dependency-injection?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="vuejs/vuejs.org"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>



#### 存在的问题

* 它将你应用程序中的组件与它们当前的组织方式耦合起来，使重构变得更加困难。
* 所提供的 property 是非响应式的



#### 实例

##### 使用provide与inject实现响应式数据更改

传递一个响应式对象

<iframe src="https://codesandbox.io/embed/immutable-bash-ez3q1w?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="immutable-bash-ez3q1w"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>



### 实例事件监听器???

#### 背景

Vue实例在事件接口中提供了如下方法:

除了`$emit(eventName, [...args])`触发一个事件,参数传给监听器回调外, 事件监听器有:

* 通过`$on(eventName, eventHandler)`侦听一个事件
* 通过`$once(eventName, eventHandler)`一次性侦听一个事件
* 通过`$off(eventName, eventHandler)`停止侦听一个事件

#### 使用场景

需要在一个组件实例上手动侦听事件时

#### 案例

将一个日期选择器附加到输入框上,同时在组件被销毁之前,也销毁这个日期选择器

```javascript
// 一次性将这个日期选择器附加到一个输入框上
// 它会被挂载到 DOM 上。
mounted: function () {
  // Pikaday 是一个第三方日期选择器的库
  this.picker = new Pikaday({
    field: this.$refs.input,
    format: 'YYYY-MM-DD'
  })
},
// 在组件被销毁之前，
// 也销毁这个日期选择器。
beforeDestroy: function () {
  this.picker.destroy()
}
```



#### 存在问题???

> 表述晦涩,较难理解

- 它需要在这个组件实例中保存这个 `picker`，如果可以的话最好只有生命周期钩子可以访问到它。这并不算严重的问题，但是它可以被视为杂物。
- 我们的建立代码独立于我们的清理代码，这使得我们比较难于程序化地清理我们建立的所有东西。



#### 解决,程序化的侦听器

```javascript
mounted: function () {
  var picker = new Pikaday({
    field: this.$refs.input,
    format: 'YYYY-MM-DD'
  })

  this.$once('hook:beforeDestroy', function () {
    picker.destroy()
  })
}
```

使用了这个策略，我甚至可以让多个输入框元素同时使用不同的 Pikaday，每个新的实例都程序化地在后期清理它自己：

```javascript
mounted: function () {
  this.attachDatepicker('startDateInput')
  this.attachDatepicker('endDateInput')
},
methods: {
  attachDatepicker: function (refName) {
    var picker = new Pikaday({
      field: this.$refs[refName],
      format: 'YYYY-MM-DD'
    })

    this.$once('hook:beforeDestroy', function () {
      picker.destroy()
    })
  }
}
```



<iframe src="https://codesandbox.io/embed/github/vuejs/vuejs.org/tree/master/src/v2/examples/vue-20-programmatic-event-listeners?autoresize=1&fontsize=12&hidenavigation=1&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="vue-20-programmatic-event-listeners"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>



### 组件循环引用 (未完成)????

#### 递归组件

> 组件是可以在它们自己的模板中调用自身的。不过它们只能通过 `name` 选项来做这件事



##### how

如何获取组件name值?

* 显示声明的name值
* Vue.component全局注册的一个组件,全局ID自动设置为组件的name



##### 潜在问题

递归组件可能导致无限循环

```javascript
name: 'stack-overflow'
template: '<div><stack-overflow></stack-overflow></div>'
```

类似上述的组件将会导致“max stack size exceeded”错误，所以请确保递归调用是条件性的 (例如使用一个最终会得到 `false` 的 `v-if`)。





#### 组件之间的循环引用????



### 模板定义的替代品(未完成)

#### 内联模板

> 当 `inline-template` 这个特殊的 attribute 出现在一个子组件上时，这个组件将会使用其里面的内容作为模板，而不是将其作为被分发的内容。这使得模板的撰写工作更加灵活。





#### X-Template



### 组件控制更新

#### 强制更新

> 如果你发现你自己需要在 Vue 中做一次强制更新，99.9% 的情况，是你在某个地方做错了事。
>
> 可能还没有留意到[数组](https://cn.vuejs.org/v2/guide/list.html#注意事项)或[对象](https://cn.vuejs.org/v2/guide/list.html#对象变更检测注意事项)的变更检测注意事项，或者你可能依赖了一个未被 Vue 的响应式系统追踪的状态。
>
> 通过 [`$forceUpdate`](https://cn.vuejs.org/v2/api/#vm-forceUpdate) 来做这件事。





#### `v-once`创建低开销静态组件

> 组件包含了**大量**静态内容。在这种情况下，你可以在根元素上添加 `v-once` attribute 以确保这些内容只计算一次然后缓存起来

```vue
Vue.component('terms-of-service', {
  template: `
    <div v-once>
      <h1>Terms of Service</h1>
      ... a lot of static content ...
    </div>
  `
})
```





### 父子组件

#### 父组件触发子组件每次都需要重新渲染

```html
//需要动态触发的组件，添加一个key，key值为时间毫秒，类似于js防止缓存的后缀
<template>
	<div :key='(new Date()).getTime()'>
    /...
  </div>
</template>
```



#### 子组件修改父组件值的方法

```markdown
vue中父组件向子组件传值时，其父子prop之间形成单向下行绑定，反过来则不行，这样可以防止子组件意外改变父组件的值，怕子组件污染父组件，造成不可控； 此外，每次父组件的数据发生更新时，子组件的值都会更新到最新的数据，但不能直接在子组件内部改变prop（父组件传过来的值），否则浏览器就会发出警告
```

需要在子组件修改父组件值的需求，这里介绍三种方法实现：

##### 自定义事件

通过$emit派发一个自定义事件,父组件收到后,由父组件进行更改

##### 引用类型直接更改

只要prop是对象或者数组(引用类型)，在子组件里面就可以修改从而改变父组件的值

##### vuex

虽然有两种方法可以实现子组件修改父组件值，但是官方是不推荐在子组件内修改通过prop传入的父组件的值，推荐使用[vuex](https://vuex.vuejs.org/zh/guide/)



### 如何快速封装一个业务组件
>https://juejin.cn/post/6844904169418014734
>https://padaker.com/blog/post/5eccfe1a1027605e59d37a38

* `$attrs`  往原组件外再套一层，并且保留全组件的所有功能。然后扩展自己的功能。
* 

#### `$attr`
假设我们有一个组件x-button，很遗憾这个组件居然不支持加载状态！那咋办，为了用户体验，我们得给它加上加载状态才行。所以我们在它的基础上封装一个y-button：
```vue
<template>
  <x-button>
    <i v-if="loading" class="font-loading"></i>
    <slot></slot>
  </x-button>
</template>
```

```js
export default {
  name: 'YButton',
  props: {
    loading: {
      type: Boolean,
      default: false,
    }
  }
};
```


如果我们要给原来的x-button传递属性咋办？
* 单个传递
* 使用`$attr`

```vue
<template>
  <x-button v-bind="$attrs">
    <i v-if="loading" class="font-loading"></i>
    <slot></slot>
  </x-button>
</template>



export default {
  props: {
    loading: {
      type: Boolean,
      default: false,
    }
  }
};
```

#### 封装表格组件-列的配置
El-table原始操作:
```vue
<template>
  <el-table :data="tableData">
    <el-table-column prop="date" label="日期" width="180"> </el-table-column>
    <el-table-column prop="name" label="姓名" width="180"> </el-table-column>
    <el-table-column prop="address" label="地址"> </el-table-column>
  </el-table>
</template>

export default {
  data() {
    return {
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        }
      ]
    };
  }
};

```

现在我们开始改造这个组件，封装一个f-table！首先我们要将这些el-table-column都干掉。
```vue
<template>
  <div>
    <el-table>
      <el-table-column v-for="(col, i) in cols" :key="i" v-bind="col"> </el-table-column>
    </el-table>
  </div>
</template>

export default {
  props: {
    cols: {
      type: Array,
      default: () => []
    }
  }
};
```
使用的时候:
```vue
<template>
  <div>
    <f-table cols=""></f-table>
  </div>
</template>


export default {
  data() {
    return {
      cols: [
        {
          prop: "date",
          label: "日期",
          width: "180",
				  formatter: dateFormatter
        }
      ]
    };
  }
};
```

#### 封装表格组件-数据获取方式
```vue
<el-table :data="tableData">
```
el-table是通过data属性来传递数据的.
*我们不直接传入数据，而是传入获取数据的方法。*


```vue
<template>
  <div>
    <el-table :data="tableData">
      <!-- ... -->
    </el-table>
  </div>
</template>


export default {
  props: {
    // ...
    fetch: {
      type: Function,
      default: () => Promise.resolve({ rows: [] })
    }
  },
  data() {
    return {
      loading: false,
      tableData: []
    };
  },
  created() {
    this.fetchData()
  },
  methods: {
    async fetchData() {
      this.loading = true;
      try {
        const { rows } = await this.fetch();
        this.tableData = rows;
      } catch (error) {
        console.error(error);
      } finally {
        this.loading = false;
      }
    }
  }！
};
```


**组件调用代码**
我们只需要关心怎么获取数据，要展示什么数据。没了！
```vue
<template>
  <div>
    <f-table :cols="cols" :fetch="fetchUsers"></f-table>
  </div>
</template>


export default {
  data() {
    return {
      cols: [
        {
          prop: "date",
          label: "日期",
          width: "180"
        }
      ]
    };
  },
  methods: {
    fetchUsers() {
      return {
        rows: [{ name: "xxx", date: "xx" }]
      };
    }
  }
};
```


#### 封装表格组件-添加分页

**ELPagination原始操作**
```vue
<template>
  <div>
    <el-pagination :current-page.sync="currentPage" :total="total"> </el-pagination>
  </div>
</template>


export default {
  data() {
    return {
      currentPage: 1,
      total: 0
    };
  }
};
```


**整合到FTable中**
* 在fetch的时候多返回了total表明总数据，以便于分页
* 在fetch的时候向函数中传入了当前页码
* 在页码改变的时候重新获取数据
```vue
<template>
  <div>
    <el-table :data="tableData">
      <!--  -->
    </el-table>
    <el-pagination @current-change="fetchData" :current-page.sync="currentPage" :total="total">
    </el-pagination>
  </div>
</template>



export default {
  // ...
  data() {
    return {
      // ...
      currentPage: 1,
      total: 0
    };
  },
  methods: {
    async fetchData() {
      // ...
      const { rows, total } = await this.fetch(this.currentPage);
      this.tableData = rows;
      this.total = total;
    }
  }
};
```


**调用组件**
```vue
<f-table :cols="cols" :fetch="fetchUsers"></f-table>


methods: {
  async fetchUsers(currentPage) {
    const query = {
      page: currentPage
    };
    const { rows, total } = await api.getUsers(query);
    return { rows, total };
  }
}
```
一个带有自动分页的表格组件就封装好了，使用起来十分简单。

当然这并不能满足你的所有需求我知道。比如你想要使用表格最原始的el-table-column，给表格列加个按钮，加个输入框什么的。


## 自定义事件

> 除了可以处理原生DOM事件，v-on指令也可以处理组件内部触发的自定义事件。
> $emit(eventName) 触发当前实例上的事件，附加参数都会传给监听器回调。
> $on(eventName) 监听当前实例上的自定义事件。回调函数会接收所有传入事件触发函数的额外参数。

**组件内部监听组件自身触发的事件**:
* v-on + $emit
* $on  + $emit

### 注意事项
#### 事件名的写法
* 始终推荐使用kebab-case事件名

### 基本用法
#### 使用`v-on + $emit`监听子组件事件
> 除了可以处理原生DOM事件，v-on指令也可以处理组件内部触发的自定义事件。调用this.$emit()函数可以触发一个自定义事件，它接收一个事件名称以及其他任何你想要传递的参数。然后就可以使用组件上的v-on指令来监听这个事件了。

下面是一个简单的组件，每次被单击时，它都会触发一个叫作count的事件,
使用这个组件时，可以使用v-on指令来监听这个自定义事件，就和使用v-on指令监听click事件一样。下面的示例将接收counter组件中通过事件传递的数字并显示在页面上
```html
<div id="app">
	<button @click="handleClick">单击了 {{ clicks }} 次</button>
</div>

<script>
	<div id="app">
		<counter v-on:count="handleCount"></counter>
		<p>单击次数 = {{ clicks }}</p>
	</div>
		<script>
		const Counter = {
			template: `
				<div>
					<button @click="handleClick">单击了{{clicks}}次</button>
				</div>
			`,
			data() {
				return {
					clicks: 0
				}
			},
			methods: {
				handleClick() {
					this.clicks++
					this.$emit('count', this.clicks)
				}
			}
		}

		new Vue({
			el: '#app',
			data: {
				clicks: 0
			},
			methods: {
				headleCount(clicks) {
					this.clicks = clicks;
				}
			},
			components: {
				Counter
			}
		});
</script>
```


#### 使用$on方法来监听组件<span style="color:red">自身触发</span>的事件
**$on + $emit**
>在组件内部代码中，使用$on方法来监听组件自身触发的事件
>它和任何事件分发器（event dispatcher）的工作原理几乎相同：当使用\$emit方法触发一个事件，通过\$on方法添加的事件处理函数就会执行

```html
// UI组件
<template>
  <section>
    <h1>left</h1>
    <el-button type="primary" @click="isClick">点击</el-button>
  </section>
</template>

<script>
  export default {
    methods: {
      isClick() {
        this.$emit('isLeft', '点击事件！');
      }
    },
    mounted() {
      this.$on('isLeft', (val) => {
        console.log(val);
      });
    }
  }
</script>
```


```html
//自定义组件

<div id="app">
	点击按钮更新后的值是: {{value}}
	<count-button ref="countButton" @click="handlerClick"></count-button>
</div>
<script>
	Vue.component('count-button', {
		template: `
			<button @click="click">点击我</button>
		`,
		methods: {
			click() {
				this.$emit('click', 'transferVal')
			}
		}
	})

	new Vue({
		el: '#app',
		methods: {
			handlerClick(val) {
				this.$emit('eventName', val)
			}
		},
		mounted() {
			this.$on('eventName', val=>console.log('val', val)) // 'transferVal'
		}
	})
</script>
```

#### 使用this.$on方法监听子组件触发的事件
**$on + ref + $emit**
> 不过不能使用`this.$on`方法监听子组件触发的事件；如果这么做，可以在组件上使用`v-on`指令，或者可以使用组件上的ref属性来调用子组件自身的`.$on`方法
> 如何使用this.$on方法监听子组件触发的事件:
> * 在组件上使用v-on指令，
> * 或者可以使用组件上的ref属性来调用子组件自身的.$on方法

在组件上使用v-on指令,是最简洁的形式.
**使用v-on**
```html
// 
<div id="app">
	<count-button @count="handleClick" ></count-button>
</div>

<script>
  Vue.component('count-button', {
	  template:`
				<button @click="handlerClick">点击加 {{clicks}}次</button>
			`,
			data(){
				return {
					clicks: 0
				}
			},
			methods: {
				handlerClick() {
					this.clicks++
					this.$emit('count', this.clicks)  //1
					// this.$emit('click', 'vvvv') 
				}
			}
  })
	new Vue({
		el: '#app',
		data: () => ({
			clicks: 0
		}),
		methods: {
			handleClick() {
				this.clicks++;
				this.$emit('count', this.clicks);    //2
			}
		},
		mounted() {
			this.$on('count', val => console.log('count', val))   //3
		}
	});
</script>
```

**使用ref属性**
```html
  <div id="app">
    点击按钮更新后的值是: {{value}}
    <count-button ref="countButton" ></count-button>
  </div>
  <script>
    Vue.component('count-button', {
      template:`
        <button @click="handlerClick">点击加 {{clicks}}次</button>
      `,

      data(){
        return {
          clicks: 0
        }
      },

      methods: {
        handlerClick() {
          this.clicks++
          this.$emit('count', 'vvvv')
        }
      }
    })

    new Vue({
      el:'#app',
      data: {
        value: 0
      },
      mounted() {
        this.$refs['countButton'].$on('count', val=>console.log('va', val)) // 'vvvv'
      },
    })

  </script>
```


#### \$once \$off
> \$once的行为和$on一样，但绑定的监听器只会执行一次——在事件第一次被触发时；而\$off方法则用于移除一个事件监听器。

由于Vue内置了完整的事件触发器，当你使用Vue时，不需要再引入自己的事件触发器了。甚至在开发Vue组件的局部代码时也可以利用Vue的事件触发器，只需要用new Vue()创建一个实例。 只要情况允许，vuex往往是更好的选择。

```js
const events = new Vue()

let count = 0

function logCount() {
	count++
	console.log('调试函数执行了${count}次')
}

events.$on('test-event', logCount)

setInterval(() => {
	events.$emit('test-event')
}, 1000)

setInterval(() => {
	events.$emit('test-event')
}, 10000)
```

### 2 自定义组件的v-model

一个组件上的 `v-model` 默认会利用名为 `value` 的 prop 和名为 `input` 的事件

但是像单选框、复选框等类型的输入控件可能会将 `value` attribute 用于[不同的目的](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/checkbox#Value)。<span style="color:blue;">**`model` 选项**可以用来声明v-model传递的属性和事件名称</span>,仍需要在组件的props选项中声明这个属性.

```html

<script>
Vue.component('base-checkbox', {
  model: {
    prop: 'checked',
    event: 'change'
  },
  props: {
    checked: Boolean  //props中需要接收绑定传递的v-model属性
  },
  template: `
  	<input
  		type="checkbox"
  		v-bind:checked="checked"
  		v-on:change="$emit('change', $event.target.value)"
  `
})
</script>  


<base-checkbox v-model="test"></base-checkbox>
```



### 3 原生事件绑定到组件

#### 背景

在一个组件的根元素上直接监听一个**原生事件**。

#### 与自定义事件区别

如果不加`.native`修饰符就是自定义事件,两者差异在于事件接收的返回值的不同

#### 实现

使用 `v-on` 的 `.native` 修饰符

```js
<base-input v-on:focus.native="onFocus"></base-input>
```

```html
<template>
	<div id='app'>
    {{abc}}
    <base-input
    	v-on:input="onInput"
      //v-on:input.native="onInput"
    ></base-input>
  </div>
</template>

<script>
	const baseInput = {
    template: `
			<input 
				v-on:input="$emit('input', $event.target.value)"  
			/>
		`
  };
  
  new Vue({
    el: '#app',
    data: {abc:''},
    components: {baseInput},
    methods: {
      onInput(event) {
        console.log(event); //打印值
        this.abc = event;
      }
    }
  })
</script>


//自定义事件的返回值  子组件返回'$event.target.value'
返回的是输入的值

//.native修饰符绑定原生事件的返回值  子组件返回'$event.target.value'


#### 存在的问题

如果子组件根元素不是触发事件的直接元素(例如被label包裹的input元素),那么父级的 `.native` 监听器将静默失败,不会产生任何报错，但是 `onFocus` 处理函数不会如你预期地被调用。

```html
<base-input v-on:focus.native="onFocus"></base-input>

<label>
	{{label}}
  <input
  	v-bind="$attrs"
    v-bind:value="value"
    v-on:input="$emit('input', $event.target.value)"
  />
</label>
```



#### 解决

`$listeners` ，**它是一个对象，里面包含了作用在这个组件上的所有监听器**。例如：

注意:如果添加了`.native`事件修饰符,其事件是不包含在`$listeners`中

```js
{
  foucs: function(event) {/**/} 
  input: function(value) {/**/}
}
```

配合 `v-on="$listeners"` 将所有的事件监听器指向这个组件的某个特定的子元素。

对于类似 `<input>` ,你希望它也可以配合 `v-model` 工作的组件来说，为这些监听器创建一个类似下述 `inputListeners` 的计算属性通常是非常有用的：

```html
<div>
	<base-input
    label='username'
  	v-model='lovingVue'
  ></base-input>
  <br/>
  <p>
    lovingVue's value: {{lovingVue}}
  </p>
</div>

<script>
Vue.component('base-input', {
  inheritAttrs: false,
  props: ['label', 'value'],
  computed: {
    inputListeners: function() {
      var vm = this;
      return Object.assign({}, 
      	this.$listeners,
        {
        	input: function(event) {
            vm.$emit('input', event.target.value)
          }
      	}
      )
    }
  },
  template: `
		<label>
			{{label}}
			<input
				v-bind='$attrs'
				v-bind:value='value'
				v-on='inputListeners'
		</label>
	`
})

new Vue({
  el: '#app',
  data: {lovingVue: 'aaa'}
})
</script>
```





### 4 `.sync修饰符 `
#### 背景
在有些情况下，我们可能需要**对一个 prop 进行“双向绑定”**。不幸的是，真正的双向绑定会带来维护上的问题，因为子组件可以变更父组件，且在父组件和子组件两侧都没有明显的变更来源。
(这里的prop双向绑定,就是普通的prop传值形式,区别在于,在子组件上直接使用这个父组件传递过来属性而非先将其复制到一个空属性再操作)
子组件更改父组件的内容

#### 语法

推荐使用以 `update:myPropName` 的模式触发事件代替直接更改prop。

举个例子.在一个包含 `title` prop 的的组件中，我们可以用以下方法赋新值

```html
//父组件(监听事件并根据需要来更新一个本地数据的property)
<text-document
	v-bind:title='doc.title'
	v-on:update:title="doc.title=$event"   //
></text-document>

//缩写
<text-document v-bind:title.sync='doc.title'></text-document>

//子组件上
this.$emit('update:title', newTitle)
```



#### 注意

* 带有 `.sync` 修饰符的 `v-bind` **不能**和表达式一起使用 (例如 `v-bind:title.sync=”doc.title + ‘!’”` 是无效的)。

* `v-bind.sync="doc"` 可以绑定一个对象,相当于设置多个 prop, 同时可以各自添加用于更新的`v-on`监听器.但<span style="color:red">不能直接使用字面量对象形式, 也无法使用数组</span>

```html
//绑定对象
<text-document v-bind.sync="doc"></text-document>

//禁止的样式
<text-document v-bind.sync="{title: 'title'}"></text-document>
```



`v-bind.sync='data中的对象doc'`, 把 `doc` 对象中的每一个 property (如 `title`) 都作为一个独立的 prop 传进去，<u>然后各自添加用于更新的 `v-on` 监听器</u>。 (注意写法)

```html
<text-document v-bind.sync="doc"></text-document>


<script>
  Vue.component('text-component', {
    template: '<div>
    <p @click="changeTitle">接收的prop--title: {{title}}</p>
    <p>接收的prop--name: {{name}}</p>
  	</div>',
  
  	methods: {
      changeTitle() {
        this.$emit('update:title', 'string') //子组件-->父组件的更新 然后子组件也更新
      }
    }
  })
	let vm = new Vue({
    el: '#root',
    data: {
      doc: {
        title: 'title',
        name: 'jack',
        age: '33'
      }
    }
  })
</script>
```



### 5. 自定义事件与原生dom事件

#### 5.1 定义比较

```markdown
自定义事件：子组件在父组件中使用时，直接绑定在子组件上的事件就是自定义事件，必须经过子组件的触发vm.$emit()才能执行
原生事件：直接在子组件里的模板上绑定的事件，子组件引入后是可以直接触发的

在dom元素上绑定的事件，触发的是dom的原生事件
在组件上绑定的事件，触发的是自定义事件，需要用this.$emit(‘eventName’)来触发。
```



#### 5.2 直接触发绑定的自定义事件,通过`.native`修饰符


### 6.组件内部使用\$on+\$emit
> 在组件内部代码中，还可以使用\$on方法来监听组件自身触发的事件。它和任何事件分发器（event dispatcher）的工作原理几乎相同：当使用\$emit方法触发一个事件，通过\$on方法添加的事件处理函数就会执行。
> 不过不能使用this.\$on方法监听子组件触发的事件；如果这么做，可以在组件上使用v-on指令，或者可以使用组件上的ref属性来调用子组件自身的.\$on方法：

```html
<div id="app">
	<counter ref="counter"></counter>
</div>
<script>
	// 为了简单起见，该组件没有写完整
	new Vue({
		el: '#app',
		mounted() {
			this.$refs.counter.$on('count', this.handleCount);
		}
	});
</script>
```

## 插槽
#### 概述
>插槽就是子组件中的提供给父组件使用的一个占位符，用slot /slot 表示，父组件可以在这个占位符中填充任何模板代码，如 HTML、组件等，填充的内容会替换子组件的slot /slot标签。
>具名插槽其实就是给插槽取个名字。
>默认插槽就是指没有名字的插槽。
>作用域插槽其实就是带数据的插槽，即带参数的插槽，简单的来说就是子组件提供给父组件的参数，该参数仅限于插槽中使用，父组件可根据子组件传过来的插槽数据来进行不同的方式展现和填充插槽内容。（常用场景：如果子组件中的某一部分的数据，每个父组件都会有自己的一套对该数据的不同的呈现方式，这时就需要用到作用域插槽

### 使用场景
如果父组件在使用到一个复用组件的时候，获取这个组件在不同的地方有少量的更改，如果去重写组件是一件不明智的事情

通过`slot`插槽向组件内部指定位置传递内容，完成这个复用组件在不同场景的应用

比如布局组件、表格列、下拉选、弹框显示内容等


### 分类
* 默认插槽
* 具名插槽
* 作用域插槽

### 默认插槽


### 具名插槽
插槽带有name属性,不带name属性的`<slot>`出口会带有隐含的名字'default'.
```vue
<div class="container">
	<header>
		<slot name="header"></slot>
	</header>
	<main>
		<slot></slot>
	</main>
	<footer name="footer"></footer>
</div>



```


传递内容:
可以在 `<template>` 元素上使用 `v-slot` 指令，并以 `v-slot` 的参数的形式提供其名称：
注意 **`v-slot` 只能添加在 `<template>` 上**
```vue
<base-layout>  
<template v-slot:header>  
<h1>Here might be a page title</h1>  
</template>  
  
<p>A paragraph for the main content.</p>  
<p>And another one.</p>  
  
<template v-slot:footer>  
<p>Here's some contact info</p>  
</template>  
</base-layout>


// 版本2 具名插槽缩写(将'v-slot:'替换为'#')
<template #header>
```


### 作用域插槽
> 让插槽中的内容能够访问子组件中才有的数据.
> 在子组件`<slot>`标签上绑定目标attribute

```html
//子组件
<span>  
	<slot v-bind:user="user">  
		{{ user.lastName }}  
	</slot>  
</span>


// 父组件
<current-user>

	<template v-slot:default="slotProps">
		{{slotProps.user.firstName}}
	</template>
</current-user>
```

**独占默认插槽的缩写语法**
在上述情况下，当被提供的内容_只有_默认插槽时，组件的标签才可以被当作插槽的模板来使用。这样我们就可以把 `v-slot` 直接用在组件上：
```html
//版本1
<current-user v-slot:default="slotProps">  
	{{ slotProps.user.firstName }}  
</current-user>

//版本2 更简洁
<current-user v-slot="slotProps">  
{{ slotProps.user.firstName }}  
</current-user>


//版本3 解构插槽prop
<current-user v-slot="{ user }">  
{{ user.firstName }}  
</current-user>


// 版本4 重命名prop
<current-user v-slot="{ user: person }">  
{{ person.firstName }}  
</current-user>

//版本5 定义prop默认值
<current-user v-slot="{ user = { firstName: 'Guest' } }">  
{{ user.firstName }}  
</current-user>
```


### 
### 案例
#### 作用域插槽示例1-[Vue Virtual Scroller](https://github.com/Akryum/vue-virtual-scroller)

[Vue2版本](https://github.com/Akryum/vue-virtual-scroller/tree/v1/packages/vue-virtual-scroller)


#### 作用域插槽示例2-[Vue Promised](https://github.com/posva/vue-promised) 



#### 作用域插槽示例3- [Portal Vue](https://github.com/LinusBorg/portal-vue) 







## 可复用性&组合 ?

### 混入mixin

> 文档
> https://mp.weixin.qq.com/s/0Yekkc08ozbNxuquHVGveg

#### 是什么

> 混入是一种代码组织方式，可以在多个组件间横向复用代码

例如，假设你有许多用于显示不同类型用户的组件。虽然大部分显示的信息都依赖于用户的类别，但是组件间相当多的逻辑代码是共同的。有3种处理方式：
* 可以为所有的组件编写重复的代码（很明显这不是一个好主意）；
* 可以将共同的代码分离到多个函数中，并存储到util文件里；
* 或者可以使用混入。
使用混入是一种更加符合Vue习惯的处理方式

只要将混入对象添加到组件中，那么该组件就可以获取到存储在混入对象中的任何东西。


#### 使用场景
当某段代码重复出现在多个组件中，并且这个重复的代码块很大的时候，将其作为一个minxin常常能给后期的维护带来很大的方便。
```javascript
// 定义一个混入对象
var myMixin = {
  created: function () {
    this.hello()
  },
  methods: {
    hello: function () {
      console.log('hello from mixin!')
    }
  }
}

// 定义一个使用混入对象的组件
var Component = Vue.extend({
  mixins: [myMixin]
})

var component = new Component() // => "hello from mixin!"
```


#### 使用方法
>将混入对象添加到组件中,该组件就可以获取到存储在混入对象中的任何东西
>将混入和Vue中的数据合并使用,类似于Object.assign(mixins, vueObj). 
>对于重复的方法、计算属性或其他任何非生命周期钩子属性，组件中的属性会覆盖混入对象中的属性
>

**影响的组件属性**
- `data` 数据对象：混入的 `data` 对象会和组件自身的 `data` 合并成一个新的对象，并且组件自身的 `data` 选项优先级更高，会覆盖混入选项中的同名数据。
- `methods` 方法列表：混入的 `methods` 对象会和组件自身的 `methods` 合并成一个新的对象，如果混入和组件自身都有相同的方法名，则组件自身的方法将被调用，优先级更高。
- `computed` 计算属性列表：混入的 `computed` 对象会和组件自身的 `computed` 合并成一个新的对象，并且组件自身的计算属性优先级更高。
- `watch` 监听器列表：混入的 `watch` 对象会和组件自身的 `watch` 合并成一个新的对象，但是如果混入和组件自身都监测了某个属性，则只会触发组件自身定义的监听器。
- 生命周期钩子函数：混入的生命周期钩子函数可以和组件自身的同名钩子函数一起被调用，但执行顺序是：混入的先执行，组件自身的后执行。



实例
```js
//mixin对象
const userMixin = {
	methods: {
		getUserInfomation() {
			return fetch(`/api/user/${userid}`)
				.then(res => res.json())
		}
	}
}
```

```js

import userMixin from './mixins/user'
Vue.component('user-admin', {

	mixins: [userMixin],  // 使用'mixins'选项来接收混入
	template: '<div v-if="user">姓名: {{user.name}}</div>',
	props: {
		userId: {
			type: Number
		}
	},
	data() {
		return {
			user: undefined
		}
	},
	mounted() {
		this.getUserInfomation(this.userId)
			.then(user => this.user = user)
	}
})
```


#### 注意事项
* 官方的Vue代码风格指南建议对于混入中的私有属性（不应该在混入之外使用的方法、数据和计算属性），应该在它们的名称前面添加前缀: 例如混入对象的log()方法可以写成'\$\_loggingMixin2\_log()'
* 当决定将哪些代码放在混入对象中，哪些代码放入组件中时，你必须衡量这样做的代价与收益。

### 自定义指令 directives

#### 背景

在 Vue2.0 中，代码复用和抽象的主要形式是组件。有的情况下，你仍然需要<span style="color:blue;">对普通 DOM 元素进行底层操作</span>，这时候就会用到自定义指令。

#### 分类

指令分为**全局指令**和**局部指令**

#### 全局指令

##### 语法

```javascript
Vue.directive(id, [denfinition])
```

##### 参数

* id  `{string}`
* [denfinition] `{Function | Object}`

##### 用法

注册或获取全局指令

```javascript
//注册
Vue.directive('my-directive', {
  bind: function() {},
  inserted: function() {},
  update: function() {},
  componentUpdated: function() {},
  unbind: function() {}
})

// 注册 (指令函数)
Vue.directive('my-directive', function () {
  // 这里将会被 `bind` 和 `update` 调用   ???why
})

// getter，返回已注册的指令
var myDirective = Vue.directive('my-directive')
```







#### 局部指令

##### 语法

组件中也接受一个 `directives` 的选项

```javascript
// 子组件


export default {
  //...
  
  directives: {
    foucs: {
      inserted: function(el) {
        el.focus();
      }
    }
  }
}
```



#### 钩子函数

一个指令定义对象可以提供如下几个钩子函数 (均为可选)：

* `bind`: 只调用一次，指令第一次绑定到元素时调用。在这里可以进行一次性的初始化设置。
* `inserted`：被绑定元素插入父节点时调用 (仅保证父节点存在，但不一定已被插入文档中)。
* `update`：所在组件的 VNode 更新时调用，**但是可能发生在其子 VNode 更新之前**。指令的值可能发生了改变，也可能没有。但是你可以通过比较更新前后的值来忽略不必要的模板更新 (详细的钩子函数参数见下)。
* `componentUpdated`：指令所在组件的 VNode **及其子 VNode** 全部更新后调用。
* `unbind`：只调用一次，指令与元素解绑时调用。



#### 钩子函数参数

- `el`：指令所绑定的元素，可以用来直接操作 DOM。
- `binding`: 一个对象，包含以下 property：
  - `name`：指令名，不包括 `v-` 前缀。
  - `value`：指令的绑定值，例如：`v-my-directive="1 + 1"` 中，绑定值为 `2`。
  - `oldValue`：指令绑定的前一个值，仅在 `update` 和 `componentUpdated` 钩子中可用。无论值是否改变都可用。
  - `expression`：字符串形式的指令表达式。例如 `v-my-directive="1 + 1"` 中，表达式为 `"1 + 1"`。
  - `arg`：传给指令的参数，可选。例如 `v-my-directive:foo` 中，参数为 `"foo"`。
  - `modifiers`：一个包含修饰符的对象。例如：`v-my-directive.foo.bar` 中，修饰符对象为 `{ foo: true, bar: true }`。
- `vnode`：Vue 编译生成的虚拟节点。移步 [VNode API](https://cn.vuejs.org/v2/api/#VNode-接口) 来了解更多详情。
- `oldVnode`：上一个虚拟节点，仅在 `update` 和 `componentUpdated` 钩子中可用

除了 `el` 之外，其它参数都应该是只读的，切勿进行修改。如果需要在钩子之间共享数据，建议通过元素的 [`dataset`](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLElement/dataset) 来进行。

#### 注意事项

* 自定义指令中,不能直接使用this
* 自定义指令中的update和componentUpdated相当于钩子函数中的mounted和updated. 其他项也类似



**案例**

<iframe src="https://codesandbox.io/embed/vue-directive-fipq1q?fontsize=11&hidenavigation=1&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="vue/directive"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>



#### 实例

##### 禁止使用大写字母

<iframe src="https://codesandbox.io/embed/vue-directive-fipq1q?fontsize=12&hidenavigation=1&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="vue/directive"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>





##### 复制黏贴指令v-copy

> [Michael-lzg/v-directives: vue自定义指令集合 (github.com)](https://github.com/Michael-lzg/v-directives)

思路：

1. 动态创建 textarea 标签，并设置 readOnly 属性及移出可视区域
2. 将要 copy 的值赋给 textarea 标签的 value 属性，并插入到 body
3. 选中值 textarea 并复制
4. 将 body 中插入的 textarea 移除
5. 在第一次调用时绑定事件，在解绑时移除事件

<iframe src="https://codesandbox.io/embed/vue-directives-3hj3o3?fontsize=11&hidenavigation=1&moduleview=1&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="vue/directives"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>







##### 长按指令 v-longpress

需求：实现长按，用户需要按下并按住按钮几秒钟，触发相应的事件

思路：

1. 创建一个计时器， 2 秒后执行函数
2. 当用户按下按钮时触发 mousedown 事件，启动计时器；用户松开按钮时调用 mouseout 事件。
3. 如果 mouseup 事件 2 秒内被触发，就清除计时器，当作一个普通的点击事件
4. 如果计时器没有在 2 秒内清除，则判定为一次长按，可以执行关联的函数。
5. 在移动端要考虑 touchstart，touchend 事件



<iframe src="https://codesandbox.io/embed/vue-directives-3hj3o3?fontsize=11&hidenavigation=1&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="vue/directives"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>



##### v-debounce

背景：在开发中，有些提交保存按钮有时候会在短时间内被点击多次，这样就会多次重复请求后端接口，造成数据的混乱，比如新增表单的提交按钮，多次点击就会新增多条重复的数据。

需求：防止按钮在短时间内被多次点击，使用防抖函数限制规定时间内只能点击一次。

思路：

1. 定义一个延迟执行的方法，如果在延迟时间内再调用该方法，则重新计算执行时间。
2. 将时间绑定在 click 方法上。

<iframe src="https://codesandbox.io/embed/vue-directives-3hj3o3?fontsize=11&hidenavigation=1&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="vue/directives"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>


另一种处理防抖方案:
```js
export default {
	install(Vue) {
		Vue.directive('preventReClick', {
			inserted(el, binding) {
				el.addEventListener('click', () => {
					if (!el.disabled) {
						el.disabled = true
						setTimeout(() => {
							el.disabled = false
						}, binding.value || 3000)
					}
				})
			}
		})
	}
}
```


##### v-emoji

背景：开发中遇到的表单输入，往往会有对输入内容的限制，比如不能输入表情和特殊字符，只能输入数字或字母等。

我们常规方法是在每一个表单的@change 事件上做处理。

<iframe src="https://codesandbox.io/embed/vue-directives-3hj3o3?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="vue/directives"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>






##### v-lazyLoad

> 图片懒加载.  dom笔记

背景：在类电商类项目，往往存在大量的图片，如 banner 广告图，菜单导航图，美团等商家列表头图等。图片众多以及图片体积过大往往会影响页面加载速度，造成不良的用户体验，所以进行图片懒加载优化势在必行。

需求：实现一个图片懒加载指令，只加载浏览器可见区域的图片。

思路：

1. 图片懒加载的原理主要是判断当前图片是否到了可视区域这一核心逻辑实现的
2. 拿到所有的图片 dom ，遍历每个图片判断当前图片是否到了可视区范围内
3. 如果到了就设置图片的 src 属性，否则显示默认图片

图片懒加载有两种方式可以实现，一是绑定 srcoll 事件进行监听，二是使用 IntersectionObserver 判断图片是否到了可视区域，但是有浏览器兼容性问题。

下面封装一个懒加载指令兼容两种方法，判断浏览器是否支持 IntersectionObserver API，如果支持就使用 IntersectionObserver 实现懒加载，否则则使用 srcoll 事件监听 + 节流的方法实现。

<iframe src="https://codesandbox.io/embed/vue-directives-3hj3o3?fontsize=11&hidenavigation=1&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="vue/directives"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>




##### v-permission

背景：在一些后台管理系统，我们可能需要根据用户角色进行一些操作权限的判断，很多时候我们都是粗暴地给一个元素添加 `v-if / v-show` 来进行显示隐藏，但如果判断条件繁琐且多个地方需要判断，这种方式的代码不仅不优雅而且冗余。针对这种情况，我们可以通过全局自定义指令来处理。

需求：自定义一个权限指令，对需要权限判断的 Dom 进行显示隐藏。

思路：

1. 自定义一个权限数组
2. 判断用户的权限是否在这个数组内，如果是则显示，否则则移除 Dom

<iframe src="https://codesandbox.io/embed/vue-directives-3hj3o3?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="vue/directives"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>




##### vue-waterMarker

> 这个方案实现的并不完善, 需要改善????

需求：给整个页面添加背景水印

思路：

1. 使用 `canvas` 特性生成 `base64` 格式的图片文件，设置其字体大小，颜色等。
2. 将其设置为背景图片，从而实现页面或组件水印效果





##### v-draggable

需求：实现一个拖拽指令，可在页面可视区域任意拖拽元素。

思路：

1. 设置需要拖拽的元素为相对定位，其父元素为绝对定位。
2. 鼠标按下`(onmousedown)`时记录目标元素当前的 `left` 和 `top` 值。
3. 鼠标移动`(onmousemove)`时计算每次移动的横向距离和纵向距离的变化值，并改变元素的 `left` 和 `top` 值
4. 鼠标松开`(onmouseup)`时完成一次拖拽



##### 高精度权限控制

> https://mp.weixin.qq.com/s/0Yekkc08ozbNxuquHVGveg

我们通常给一个元素添加v-if / v-show，来判断该用户是否有权限，但如果判断条件繁琐且多个地方需要判断，这种方式的代码不仅不优雅而且冗余。针对这种情况，我们可以封装了一个指令权限，能简单快速的实现按钮级别的权限判断。我们先在新建个array.js文件，用于存放与权限相关的全局函数

```javascript
//array.js

export function checkArray(key) {
  let arr = ['admin', 'editor']
  let index = arr.indexOf(key)
  if (index > -1) {
    return true //有权限
  } else  {
    return false //无权限
  }
}
```

然后将array文件挂载到全局

```javascript
//mian.js

import {checkArray} from './common/array'
Vue.config.productionTop = false;
Vue.directive('permission', {
  inserted(el, binding) { 
    let permission = binding.value; // 获取到 v-permission的值
    if (permission) {
      let hasPermission = checkArray(permission);
      if (!hasPermission) { // 没有权限 移除Dom元素
        el.parentNode && el.parentNode.removeChild(el);
      }
    }
  }
})
```

最后我们在页面中可以通过自定义指令v-permission来判断

```html
 <div class="btns">
    <button v-permission="'admin'">权限按钮1</button>  // 会显示
    <button v-permission="'visitor'">权限按钮2</button> //无显示
    <button v-permission="'editor'">权限按钮3</button> // 会显示
  </div>
```



#### 全局注册自定义指令

```js
// main.js
import directives from '@/utils/directives'

Object.keys(directives).forEach(key => Vue.directives(key, directives[key]))
```



```js
// src/utils/directives

import * as safe from './safe'

export default {
  has: {
    inserted: function(el, {value}) {
      //...
    }
  },
  ...safe
}
```



```js
// src/utils/directives/safe

impor
```



#### 实例

v-xssHtml html的安全校验(富文本)

```js
```





### 过滤器 filters

> https://godbasin.github.io/vue-ebook/vue-ebook/3.html#_3-2-2-%E8%BF%87%E6%BB%A4%E5%99%A8
>
> 官网

#### 是什么

用来文本格式化, 支持全局定义和组件中定义

#### 使用

过滤器可以用在两个地方：**双花括号插值和 `v-bind` 表达式** (后者从 2.1.0+ 开始支持)。

过滤器应该被添加在 JavaScript 表达式的尾部，由“管道”符号指示

```html
<!-- 在双花括号中 -->
{{ message | capitalize }}

<!-- 在v-bind中 -->
<div v-bind:id="rawId | formatId"></div>
```

在组件的选项中定义本地的过滤器 或 在创建Vue实例之前定义全局过滤器

```javascript
//本地过滤器
filters: {
  capitalize: function(value) {
    if (!value) return ''
    value = value.toString()
    return value.charAt(0).toUpperCase() + value.slice(1)
  }
}

//全局过滤器
Vue.filters('capitaliza', function(value) {
  if(!value) return ''
  value = value.toString()
  return value.charAt(0).toUpperCase() + value.slice(0)
})
new Vue({
  //...
})
```



过滤器可以<u>串联,从左到右执行,返回的结果被下一个过滤器接收并处理</u>

过滤器是JS函数,可以接收参数.但管道符左侧实为第一个参数.

```javascript
//过滤器串联
{{ message | filterA | filterB }}

//过滤器接收参数
{{ message | filterA('arg1', 'arg2')}}  //第一个参数是message,第二个为'arg1', 第三个为'arg2'
```



#### 实例

main.js中注册多个全局过滤器

```js
// main.js

import * as filters from '@/utils/filters' //只暴露一个打对象且不是默认暴露

Object.keys(filters).forEach(key => Vue.filter(key, filters[key]))
```

```js
// utlis/filters 暴露一个对象

const a = () => {}
const b = () => {}

export {
	a,
  b
}
```





千分位处理

```javascript
// 全局定义
// 千分位处理
Vue.filter('thousandth', function (value) {
  if (!value) return '';
  return value && value.toString().replace(/^(-?\d+?)((?:\d{3})+)(?=\.\d+$|$)/, function (all, pre, groupOf3Digital) {
    return pre + groupOf3Digital.replace(/\d{3}/g, ',$&')
  });
})

// 局部定义
// 乘以倍数
filters: {
  multiply: function (value, times) {
    if (!value) return '';
    return value * ( parseInt(times) || 1);
  }
}
```



千分位添加逗号

```js
const thousandStr = num => num.toString().replace(/\d+/, n => {
  return n.replace(/(\d)(?=(\d{3})+$)/, m => m+',')
})
```





#### 注意事项

* 全局过滤器与本地过滤器重名, 使用全局过滤器
* 过滤器函数总是接收表达式的值(之前的操作链的结果)作为第一个参数.



#### 实例

过滤器函数的默认参数

使用库来进行辅助格式化

```javascript
//默认参数
Vue.filter('dataFormater', function(value, str='YYYY-MM-DD'){
	return moment(value).format(str);
})

//使用库 例如时间处理的 moment dayjs

```



```vue
 <div>
    <h2>显示格式化的日期时间</h2>
    <p>{{ date }}</p>
    <p>{{ date | filterDate }}</p>
    <p>年月日: {{ date | filterDate("YYYY-MM-DD") }}</p>
 </div>
 ......
  filters: {
    filterDate(value, format = "YYYY-MM-DD HH:mm:ss") {
      console.log(this)//undefined 过滤器没有this指向的
      return moment(value).format(format);
    }
  },
  data() {
    return {
      date: new Date()
    };
  }
```





### 自定义插件

```HTML
自定义插件: 
插件就是一个集合

1. 自定义的插件是一个对象,对象里有一个install方法
2. 使用Vue.use(对象名称)来调用对象里的install方法
3. 插件中可以自定义指令, 给Vue添加属性, 给Vue原型上添加数据供实例vm使用(原型上添加的属性或方法,一般之前添加$)

使用Vue.use(插件名称)来调用里面的的install方法
原型上添加方法/属性,建议添加$
```



```js
//自定义插件 test.js

const extension={};
extension.install=function(Vue, options){//Vue, options是配置对象
	//添加两个全局指令
    Vue.directive('upper-text', function(ele, binding){
        ele.innerText=binding.value.toUpperCase();
    });
    Vue.directive('lower-text', function(ele, binding){
        ele.innerText = binding
    });
    //给Vue自身添加属性
    Vue.projectName='管理系统';
    Vue.version='1.0';
    Vue.showInfo=function(){ console.log('xxxx') };
    //给Vue原型上添加数据，供vm使用. 建议添加$符
    Vue.prototype.$random=function(min, max){
        return Max.floor(Math.random()*max+min);
    }

}

//index.html
<script src='./test.js'></script>
<div id='root'>
	<h2 v-upper-text='name'></h2>
	<h2 v-lower-text='name'></h2>   
	<h2>{{$random(2,8)}}</h2>
</div>
<script>
	Vue.config.productionTip=false;
	Vue.use(test);
	new Vue({
        el:'#root',
        data:{name:'atBeiJing'},
        
    })
</script>
```





### 渲染函数 & JSX

#### 基础

Vue 推荐在绝大多数情况下使用模板来创建你的 HTML。然而在一些场景中，你真的需要 JavaScript 的完全编程的能力。这时你可以用**渲染函数**，它比模板更接近编译器。

案例: 要生成一些带锚点的标题,分别使用模板和渲染函数来实现, 对比实现的难易度:
```html
//实现效果
<h1>
  <a name="hello-world" href="#hello-world">
    Hello world!
  </a>
</h1>
```

定义组件如下:

```HTML
<anchored-heading :level="1">Hello world!</anchored-heading>
```



**模板**

存在的问题: 代码冗长，而且在每一个级别的标题中重复书写了 `<slot></slot>`，在要插入锚点元素时还要再次重复。

```html
<script type="text/x-template" id="anchored-heading-template">
  <h1 v-if="level === 1">
    <slot></slot>
  </h1>
  <h2 v-else-if="level === 2">
    <slot></slot>
  </h2>
  <h3 v-else-if="level === 3">
    <slot></slot>
  </h3>
  <h4 v-else-if="level === 4">
    <slot></slot>
  </h4>
  <h5 v-else-if="level === 5">
    <slot></slot>
  </h5>
  <h6 v-else-if="level === 6">
    <slot></slot>
  </h6>
</script>
```



```javascript
Vue.component('anchored-heading', {
  template: '#anchored-heading-template',
  props: {
    level: {
      type: Number,
      required: true
    }
  }
})
```



**渲染函数**

```javascript
Vue.component('anchored-heading', {
  render: function (createElement) {
    return createElement(
      'h' + this.level,   // 标签名称
      this.$slots.default // 子节点数组
    )
  },
  props: {
    level: {
      type: Number,
      required: true
    }
  }
})
```


<iframe src="https://codesandbox.io/embed/templateyi-zhi-duo-pan-duan-you-hua-7tslll?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="template一值多判断优化"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>
   




















# 工具??

### 单文件组件

#### 背景

在很多 Vue 项目中，我们使用 `Vue.component` 来定义全局组件，紧接着用 `new Vue({ el: '#container '})` 在每个页面内指定一个容器元素.

在更复杂的项目中，或者你的前端完全由 JavaScript 驱动的时候，下面这些缺点将变得非常明显：

- **全局定义 (Global definitions)** 强制要求每个 component 中的命名不得重复
- **字符串模板 (String templates)** 缺乏语法高亮，在 HTML 有多行的时候，需要用到丑陋的 `\`
- **不支持 CSS (No CSS support)** 意味着当 HTML 和 JavaScript 组件化时，CSS 明显被遗漏
- **没有构建步骤 (No build step)** 限制只能使用 HTML 和 ES5 JavaScript，而不能使用预处理器，如 Pug (formerly Jade) 和 Babel



#### 单文件组件

文件扩展名为 `.vue` 的 **single-file components (单文件组件)** 为以上所有问题提供了解决方法，并且还可以使用 webpack 或 Browserify 等构建工具。

**特点**

- [完整语法高亮](https://github.com/vuejs/awesome-vue#source-code-editing)
- [CommonJS 模块](https://webpack.js.org/concepts/modules/#what-is-a-webpack-module)
- [组件作用域的 CSS](https://vue-loader.vuejs.org/zh-cn/features/scoped-css.html)

可以使用预处理器来构建简洁和功能更丰富的组件，比如 Pug，Babel (with ES2015 modules)，和 Stylus

如果搭配 `vue-loader` 使用 webpack，它也能为 CSS Modules 提供头等支持 ????



##### 关注点分离

**关注点分离不等于文件类型分离。**在现代 UI 开发中，我们已经发现相比于把代码库分离成三个大的层次并将其相互交织起来，把它们划分为松散耦合的组件再将其组合起来更合理一些。在一个组件里，其模板、逻辑和样式是内部耦合的，并且把他们搭配在一起实际上使得组件更加内聚且更可维护。

即便你不喜欢单文件组件，你仍然可以把 JavaScript、CSS 分离成独立的文件然后做到热重载和预编译。

```vue
<!-- my-component.vue -->
<template>
  <div>This will be pre-compiled</div>
</template>
<script src="./my-component.js"></script>
<style src="./my-component.css"></style>
```



##### 案例-TODOlist



#### 搭建工具 ???

##### 脚手架工具-CLI3



##### 从零搭建-Vue-Loader



### 组件测试??



### TypeScript支持??





# 生产环境部署??

以下大多数内容在你使用 [Vue CLI](https://cli.vuejs.org/zh/) 时都是默认开启的。该章节仅跟你自定义的构建设置有关。

#### 开启生产环境模式

开发环境下，Vue 会提供很多警告来帮你对付常见的错误与陷阱。而在生产环境下，这些警告语句却没有用，反而会增加应用的体积。此外，有些警告检查还有一些小的运行时开销，这在生产环境模式下是可以避免的。

```javascript
//main.js
Vue.config.productionTip = false;
```



##### 不使用构建工具

如果用 Vue 完整独立版本，即直接用 `<script>` 元素引入 Vue 而不提前进行构建，请记得在生产环境下使用压缩后的版本 (`vue.min.js`)。两种版本都可以在[安装指导](https://cn.vuejs.org/v2/guide/installation.html#直接用-lt-script-gt-引入)中找到。



##### 使用构建工具

当使用 webpack 或 Browserify 类似的构建工具时，Vue 源码会根据 `process.env.NODE_ENV` 决定是否启用生产环境模式，默认情况为开发环境模式。在 webpack 与 Browserify 中都有方法来覆盖此变量，以启用 Vue 的生产环境模式，同时在构建过程中警告语句也会被压缩工具去除。所有这些在 `vue-cli` 模板中都预先配置好了

**webpack**

在 webpack 4+ 中，你可以使用 `mode` 选项：

```
module.exports = {
  mode: 'production'
}
```

但是在 webpack 3 及其更低版本中，你需要使用 [DefinePlugin](https://webpack.js.org/plugins/define-plugin/)：

```
var webpack = require('webpack')

module.exports = {
  // ...
  plugins: [
    // ...
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    })
  ]
}
```



**Browserify**

了解

**Gulp**

了解下



#### 模板预编译

当使用 DOM 内模板或 JavaScript 内的字符串模板时，模板会在运行时被编译为渲染函数。通常情况下这个过程已经足够快了，但对性能敏感的应用还是最好避免这种用法。

预编译模板最简单的方式就是使用[单文件组件](https://cn.vuejs.org/v2/guide/single-file-components.html)——相关的构建设置会自动把预编译处理好，所以构建好的代码已经包含了编译出来的渲染函数而不是原始的模板字符串。

如果你使用 webpack，并且喜欢分离 JavaScript 和模板文件，你可以使用 [vue-template-loader](https://github.com/ktsn/vue-template-loader)，它也可以在构建过程中把模板文件转换成为 JavaScript 渲染函数。





#### 提取组件的CSS

当使用单文件组件时，组件内的 CSS 会以 `<style>` 标签的方式通过 JavaScript 动态注入。这有一些小小的运行时开销，如果你使用服务端渲染，这会导致一段“<span style="color:blue">无样式内容闪烁 (fouc)</span>”。

将所有组件的 CSS 提取到同一个文件可以避免这个问题，也会让 CSS 更好地进行压缩和缓存。

查阅这个构建工具各自的文档来了解更多：

- [webpack + vue-loader](https://vue-loader.vuejs.org/zh-cn/configurations/extract-css.html) (`vue-cli` 的 webpack 模板已经预先配置好)
- [Browserify + vueify](https://github.com/vuejs/vueify#css-extraction)
- [Rollup + rollup-plugin-vue](https://vuejs.github.io/rollup-plugin-vue/#/en/2.3/?id=custom-handler)



#### 跟踪运行时的错误

如果在组件渲染时出现运行错误，错误将会被传递至全局 `Vue.config.errorHandler` 配置函数 (如果已设置)。

利用这个钩子函数来配合错误跟踪服务是个不错的主意。比如 [Sentry](https://sentry.io/)，它为 Vue 提供了[官方集成](https://sentry.io/for/vue/)。







![QQ图片20210118092331.png](https://i.loli.net/2021/01/18/FCrtGB5HEpmKTJa.png)







#### 继承的关系

```HTML
1.Vue.extend调用的返回值是VueComponent构造函数,所以new Example()其实就是在new VueComponent()

vue中简略的源代码解析:
<script>
	const Vue={
        extend(){
            function VueComponent(){}
        }
        return VueComponent; //Vue中返回的是VueComponent函数
    }
    const School=Vue.extend();
    const s = new School();
    console.log(s); //打印形式:VueComponent{}, 意思是VueComponent new出来的实例.
</script>
<!--
继承本质: 子类原型=父类实例
子类的实例化对象.__proto__===子类.prototype===父类实例
父类实例.__proto__===父类.prototype
子类的实例化对象.__proto__.__protot__===父类.prototype
-->
s.__proto__.__proto__===Person.prototype

2.vc和vm的关系 //vm是Vue实例对象

vm.$children[0].__proto instanceof Vue
vm.$children[0].__proto__.__proto__ === Vue.prototype
```



```HTML
//非单文件组件 缺点:
1.  模板编写没有提示
2.	没有构建过程, 无法将ES6转换成ES5
3.	不支持组件的CSS
4.	真正开发中几乎不用


```





```js
//定义组件 简略版
const Xxx=Vue.extend({
    //data中存放组件所需的数据
	data(){
		return{
            name:'xxx',
            age:'xxx'
        }
	},
    //template中配置组件的模板结构
    template:`
		<div>	
			...{{name}}
		</div>
	`
})

//注册组件 全局
Vue.comopnent('School', School)

//定义vm,管理所有组件
new Vue({
    el:'#root',
    //注册组件-局部
    components:{
        School:School
    }
})
```



```js
//定义组件 复杂版使用App父组件包裹其他组件

<body>
    <div id='root'>
        <App/> //此步骤可以使用实例中的template属性替换,实现干净的HTML
    </div>
</body>
<script>
const Xxx=Vue.extend({
    //data中存放组件所需的数据
	data(){
		return{
            name:'xxx',
            age:'xxx'
        }
	},
    //template中配置组件的模板结构
    template:`
		<div>	
			...{{name}}
		</div>
	`
})

const Hello=Vue.extend({
    template:`<h2>我是Hello组件内容 </h2>`
})

const App=Vue.extend({
    components:{Xxx:Xxx, Hello:Hello},
    template:`
		<div>
			<Xxx/>
			<Hello/>
		</div>
	`
})



//定义vm,管理所有组件
new Vue({
    el:'#root',
    //注册组件-局部
    components:{App},
    template:`<App/>`  //这种写法可以省略
})

</script>
```





#### 单文件组件

```js
文件结构:
components/School.vue
App.vue
index.html

School.vue:
//严格来说,并非一个组件,而是一个组件的所有配置
 /*配置组件模板结构*/
 <template> 
     <div>//需要一个根标签
     	<h2 class='name'>{{name}}</h2>
     </div>
 </template>
/* 配置组件的数据,交互等 */
<script>
     //暴露组件配置,并没有创建组件,因为没有调用Vue.extend
     export default{
		data(){
            return{}
        },
        methods:{}
	}
</script>

/* 配置组件的样式 */
<style>
	.name{
        background-color:yellow;
    }	    
</style>
======================
App.vue
<template>
    <div>
    	...
		<School/>
    </div>
</template>

<script>
    import School from './components/School.vue';
	export default{
        data(){return{}}
        components:{School:School} //触发对象简写形式
    }
</script>
<style>
</style>

=======================
index.html
<body>
    <App/>
</body>

<script>
import App from './App.vue'
new Vue({
    el:'#root',
    components:{App}
})
</script>
```





# Vue项目实例

### Vue脚手架

```HTML
vue-cli //command line interface https://cli-vuejs.org/zh/

vue-cli是vue官方提供的脚手架工具,最新版是4. 3.x版与4.x版变化不大,但与2.x版本比较变化大.

```



### 安装及文件结构

```HTML
0.问题
在cdm正常运行,但是在git中会出现错误. 
解决: https://cli.vuejs.org/zh/guide/creating-a-project.html#vue-create

1.创建脚手架3/4的vue项目:
 1.1 npm install -g @uve/cli  //全局安装脚手架
 1.2 vue create vue-demo      //创建项目名称
 1.3 npm run serve /yarn serve //运行项目

2.脚手架结构
|-- node_modules   包文件夹
|-- public
	|-- index.html: 主页面文件
|-- src
	|-- main.js: 应用入口js
|-- babel.config.js: babel的配置文件
|-- vue.config.js: vue的配置文件，需要手动添加
|-- .gitignore: git版本管制忽略的配置
|-- package.json: 应用包配置文件 
|-- README.md: 应用描述说明的readme文件
```



### 代码解释

```HTML
//run-time 运行环境/生产环境

vue.runtime.common.js和vue.js有何区别？
vue.runtime.common.js（项目中用的多） : 
1.不包含模板解析器，打包后体积小
2.配置项中的不能写template，要用render: h => h(App)代替
vue.js : 
1.包含解模板析器，打包后体积大
2.配置可以写template
```



### 临时关闭eslint语法检查

```js
//3种方法:

1. /* eslint-disable-next-line */ 会被eslint识别,下一句不会进行语法检查.
2. /* eslint-disable */ 放在script标签下,所有的交互脚本不进行语法检查
3. 脚手架环境下,配置文件vue.config.js  参考文档:https://cli.vuejs.org/zh/config/#lintonsave
	3.1 官网 vue-cli
	3.2 根目录下创建vue.config.js文件,暴露一个对象
//例如:
module.exports={
    lintOnSave:false
}
```



### 路由角色权限
来源:https://juejin.cn/post/7250386282400596029
>角色权限，简单来说就是登录的用户能看到系统的哪些页面，不能看到系统的哪些页面。能看到系统的哪些按钮，不能看到系统的哪些按钮。
 一般是后台管理系统才会涉及到如此复杂的角色权限。

https://juejin.cn/post/6844903916870565901?searchId=20231108093359D181CFD66DDD427C28D4


## vue原理及MVVM响应式原理 ???

### vue基本原理

当一个Vue实例创建时，Vue会<span style="color:blue">遍历</span>data中的属性，用 <span style="color:blue">Object.defineProperty（vue3.0使用proxy ）</span>将它们转为 getter/setter，并且在内部<span style="color:blue">追踪相关依赖</span>，在属性<span style="color:blue">被访问和修改时</span>通知变化。 

每个组件实例都有相应的 <span style="color:blue">watcher 程序实例</span>，它会在<span style="color:blue">组件渲染的过程</span>中把<span style="color:blue">属性记录为依赖</span>，之后当依赖项的setter被调用时，会通知watcher重新计算，从而致使它关联的组件得以更新。



### 什么是MVVM

Model–View–ViewModel （MVVM） 是一个软件架构设计模式,

* M：model、就是模型数据，普通的JS对象.可以理解为data中的对象
* V：view、就是Dom
* VM：view-model、就是Vue，view和model不可以直接交互，需要通过VM联系到一起

<span style="background: #ccc">M 到 V（数据驱动视图）：Data Bindings：通过数据绑定联系到一起。</span>

<span style="background: #ccc">V 到 M（视图影响数据）：Dom Listeners：通过事件监听联系到一起。</span>

<span style="background: #ccc">只要数据进行了改变，同时视图也会同时更新。</span>

#### MVVM组成图示

![](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/4/17/16a2afb76e831546~tplv-t2oaga2asx-zoom-in-crop-mark:3024:0:0:0.awebp)



理解了基本思想之后，我们要做什么才能**实现VM呢？**

1.首先，需要利用Object.defineProperty，将要观察的对象，转化成getter/setter，以便拦截对象赋值与取值操作，称之为<span style="color:blue">Observer</span>，也就是<u>数据观察者</u>；

2.需要将DOM解析，提取其中的指令与占位符，并赋与不同的操作，称之为<span style="color:blue">Compile</span>，也就是<u>指令解析器</u>

3.需要将Compile的解析结果，与Observer所观察的对象连接起来，建立关系，在Observer观察到对象数据变化时，接收通知，同时更新DOM，称之为<span style="color:blue">Watcher</span>，也就是<u>订阅者</u>，它是Observer和Compile之间通信的桥梁；

4.最后，需要一个公共入口对象，接收配置，协调上述三者，称为vm，也就是Vue;



### vue数据绑定原理

> [2019前端最全面试题 - 知乎 (zhihu.com)](https://zhuanlan.zhihu.com/p/63962882)

Vue的数据双向绑定都是依据Object.defineProperty()这一方法来做的, 这个方法可以定义一个对象某个属性的描述符, 我们需要用到的就是描述符当中的getter和setter

```javascript
const obj = {a:1}
obj.a // 1

obj.a = 2
```

当我们输入obj.a时 就是在访问obj对象a属性的getter 当输入obj.a = 2 时就是在访问obj对象a属性的setter

```javascript
Object.defineProperty(obj, 'a', {
  get : function(){
    return val
  },
  set : function(newValue){
    val = newValue
  },
  enumerable : true,
  configurable : true
})
```

getter和setter都是一个函数 我们还可以这样做 例如

```javascript
get: function() {
  // 每次访问obj.a时都会执行这段代码
  console.log('hello, 你在读取a的值')
  return val
}
set: function(newValue) {
  val = newValue
  // 每次给obj.a赋值时都会执行这段代码
  console.log('你设置了a的值')
}
```

Vue的双向数据绑定就是根据上面的原理来实现的 只要在读取值时收集观察者 在赋值时触发观察者更新函数 就可以实现数据变更 从而实现DOM重新渲染

复制放到HTML文件里自己运行一下 然后打开网页 在控制台里输入data.user.name看看 会有惊喜

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>动态数据绑定（一）</title>
</head>
<body>
 <script>
    var data = {
        user: {
            name: 'xiaoming',
            age: 18,
            occupation: 'frontend'
        },
        address: {
            city: 'shaoguan'
        }
    }; 
    function Observer(data) {
        this.data = data;
        this.walk(data);
    }
    Observer.prototype = {
        walk: function(obj) {
            var value,
                key;
            for (key in obj) {
                if (obj.hasOwnProperty(key)) {
                    value = obj[key];
                    if (typeof value === 'object') {
                        new Observer(value);
                    }
                    this.convert(key, value); 
                }   
            }
        },
        convert: function(key, value) {
            Object.defineProperty(this.data, key, {
                get : function(){ 
                    console.log("你访问了" + key);
                    return value; 
                },
                set : function(newValue){ 
                    value = newValue; 
                    console.log('你设置了' + key + '=' + value);
                }
            });
        }
    }  
    var example = new Observer(data);
 </script> 
</body>
</html>
```



### 响应式限制

#### 对象添加新属性
>因为getter/setter方法是在Vue实例初始化的时候添加的，只有已经存在的属性是响应式的；当为对象添加一个新的属性时，直接添加并不会使这个属性成为响应式的：
```js
const vm = new Vue({
	data: {
		formData: {
			username: 'someuser'
		}
	}
});
vm.formData.name = 'Some User';
```

formData.username属性是响应式的，formData.name属性不是.

**解决方法**
* 直接在初始化时添加这个属性
* 使用Object.assign()来创建一个新的对象然后覆盖原有对象
* Vue.set()/ this.$set()

`Object.assign()`
```js
vm.formData = Object.assign({}, vm.formData, {name: 'some User'})
```

`Vue.set`
```js
Vue.set(vm.formData, 'name', 'Some User');
```


#### 设置数组的元素
不能检测以下数组的变动:
* 当你利用索引直接设置一个数组项时，例如：vm.items[indexOfItem] = newValue
* 当你修改数组的长度时，例如：vm.items.length = newLength


**解决方法**
* 使用Vue更新后的7个数组方法来更新数组数据.
* Vue.set()


#### 清空对象
>https://cloud.tencent.com/developer/article/1753936


清空data中的对象,有以下几种方法:
* elementui中的`resetFields()`方法
* this.$options.data()
* Object.assign()
* for...in循环
**this.$options.data()**
```js
this.form = this.$options.data().form
```

**Object.assign()**
```js
Object.assign(this.$data, this.$options.data()) //重置data内的数据

Object.assign(this.$data.formData, this.$options.data().formData) //重置data内的FormData

this.formData = Object.assign({}, this.$options.data().formData)  //重置data内的FormData
```

**遍历对象**
```js
for (let key in obj) {
	delete obj[key]
}
```

# Vuex

### 基本介绍

1.	专门在Vue中实现{/*集中式状态管理*/}的一个插件，对vue应用中多个组件的共享状态进行集中式的管理(读/写)，也可以认为是一种组件间通信的方式，且适用于任意组件间通信。
2.	github站点: https://github.com/vuejs/vuex
3.	在线文档: https://vuex.vuejs.org/zh-cn/

什么时候使用Vuex
1. 多个组件依赖于同一状态
2. 来自不同组件的行为需要变更同一状态
3. 多个组件要共享状态 

//生成的$store可以在vm身上访问到

#### 安装
* cdn
* npm
CDN方式
```html
<script src="https://unpkg.com/vuex@3"></script>
```
npm方式
* npm i -S vuex
* 如果使用的是诸如webpack的打包工具，那么就要像使用vue-router那样，调用Vue.use()
```js
// store/index

import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.store({
	state: {},
	//...
})
```



### 原理

vuex生成了一个store实例，并且把这个实例挂在了所有的组件上，所有的组件引用的都是同一个store实例。
store实例上有数据，有方法，方法改变的都是store实例上的数据。由于其他组件引用的是同样的实例，所以一个组件改变了store上的数据， 导致另一个组件上的数据也会改变，就像是一个对象的引用。
如果对vuex的实现有兴趣，可以看看我自己造的一个vue轮子对应的[vuex插件](http://link.zhihu.com/?target=https%3A//github.com/woai3c/mini-vuex/blob/master/mini-vuex.js)。它实现了除vuex模块外的所有功能。



### 背景

应用遇到**多个组件共享状态**时，单向数据流的简洁性很容易被破坏：

- 多个视图依赖于同一状态。
- 来自不同视图的行为需要变更同一状态。

对于问题一，传参的方法对于多层嵌套的组件将会非常繁琐，并且对于兄弟组件间的状态传递无能为力。

对于问题二，我们经常会采用父子组件直接引用或者通过事件来变更和同步状态的多份拷贝。以上的这些模式非常脆弱，通常会导致无法维护的代码。

因此，把组件的共享状态抽取出来，以一个全局单例模式管理. 通过定义和隔离状态管理中的各种概念并通过强制规则维持视图和状态间的独立性，我们的代码将会变得更结构化且易维护。









### 流程图

![vuex图](https://img2018.cnblogs.com/blog/1581023/201902/1581023-20190222191642909-1072295625.png)



### 配置Vuex

#### 1.项目中创建vuex文件

推荐如下几种格式:

`vuex/store.js`

`store/index.js`

#### 2.Vuex的引入和暴露

```javascript
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {}
const mutations = {}
const actions = {}
const getters = {}

const store = new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})

export default store
```



#### 3.在项目main.js中引入

```javascript
import store from './store'
import router from './router'

new Vue({
  beforeCreate() {
    Vue.prototype.$bus = this;
    Vue.prototype.$API = API;
  },
  el: '#app',
  router,
  store,
  render: h=>h(App)
}
```



### store容器介绍
包含: state(状态) mutation(变更) action(动作) getter() module(模块)
每一个 Vuex 应用的核心就是 store（仓库）。“store”基本上就是一个容器，它包含着你的应用中大部分的**状态 (state)**。

Vuex 和单纯的全局对象有以下两点不同：
1. Vuex 的状态存储是响应式的。
2. 你不能直接改变 store 中的状态。改变 store 中的状态的唯一途径就是显式地**提交 (commit) mutation**。



<iframe src="https://codesandbox.io/embed/vue-store-simplecase-8w423d?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="vue/store/simpleCase"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>





### state

#### 单一状态树

Vuex 使用**单一状态树**，用一个对象就包含了全部的应用层级状态，作为一个“唯一数据源 ([SSOT (opens new window)](https://en.wikipedia.org/wiki/Single_source_of_truth))”而存在。这也意味着，每个应用将仅仅包含一个 store 实例。
单一状态树让我们能够直接地定位任一特定的状态片段，在调试的过程中也能轻易地取得整个当前应用状态的快照。

#### 要求
存储在 Vuex 中的数据和 Vue 实例中的 `data` 遵循相同的规则，例如状态对象必须是纯粹 (plain) 的。

#### 在vue组件中获取Vuex状态

由于 Vuex 的状态存储是响应式的，从 store 实例中读取状态最简单的方法就是在[计算属性 (opens new window)](https://cn.vuejs.org/guide/computed.html)中返回某个状态

```javascript
import state from './store'
// 创建一个 Counter 组件
const Counter = {
  template: `<div>{{ count }}</div>`,
  computed: {
    count () {
      return store.state.count
    }
  }
}
```

每当 `store.state.count` 变化的时候, 都会重新求取计算属性，并且触发更新相关联的 DOM。



##### 存在的问题

这种模式导致组件依赖全局状态单例。在模块化的构建系统中，在每个需要使用 state 的组件中需要频繁地导入，并且在测试组件时需要模拟状态。



##### 解决

Vuex 通过 `store` 选项，提供了一种机制将状态从根组件“注入”到每一个子组件中（需调用 `Vue.use(Vuex)`）

```javascript
const app = new Vue({
  el: '#app',
  // 把 store 对象提供给 “store” 选项，这可以把 store 的实例注入所有的子组件
  store,
  components: { Counter },
  template: `
    <div class="app">
      <counter></counter>
    </div>
  `
})
```

通过在根实例中注册 `store` 选项，该 store 实例会注入到根组件下的所有子组件中，且子组件能通过 `this.$store` 访问到。让我们更新下 `Counter` 的实现：

```javascript
const Counter = {
  template: `<div>{{ count }}</div>`,
  computed: {
    count () {
      return this.$store.state.count
    }
  }
}
```



#### 辅助函数mapState
**是什么**
vuex提供了一个辅助函数mapState，它返回一个被用作计算属性的**函数**对象。

**使用**
* mapState函数以一个对象作为参数，并将其中的各个键值分别映射到一个计算属性。
* 如果键值给定的是函数，则该函数会以state作为其第一个参数被调用，从而使你能够从这个参数上获取state的值。
* 如果只是要从state上获取一个属性作为计算属性，也可以只赋予它一个字符串
* 
数组
>如果所做的所有映射都只是简单地将计算属性的名称映射到vuex中的属性名
>可以使用数组写法
```js
export default {
	//..
	computed: mapState(['count']) //缩写形式
}
```

对象写法: 键值为函数
>* 如果属性中有要映射到不同名称的，或者需要进行处理时，就需要用完整对象写法
>* 如果使用完整函数写法(非ES6箭头函数),还可以通过this来访问组件实例
```js
export default {
	//...
	computed: mapState({
		count: state => state.count
	})
}
```

```js
export default {
	//...
	computed: mapState({
		count: function(state) {
			return state.count + this.xxxx;
		}
	})

}
```

对象写法: 键值为字符串
```js
export default {
	//...
	computed: mapState({
		count: 'count'
	})
}
```

**将mapState结合到计算属性**
使用展开运算符结合两个对象.使用了对象展开符，那么可能会需要像Babel这样的编译工具来确保最大限度的浏览器支持。
```js
computed: {
	doubleFoo() {
		return this.foo * 2;
	},
	...mapState({
		count: state => state.count,
		somethingElse: 'somethingElse'
	})
}
```

其展开的结果如下:
```js
computed: {
	doubleFoo() {
		return this.foo * 2;
	},
	count() {
		return this.$store.state.count
	},
	somethingElse() {
		return this.$store.state.somethingELse
	}
}
```



**源码**

```javascript
//https://unpkg.com/vuex@3 

/**
   * Reduce the code which written in Vue.js for getting the state.
   * @param {String} [namespace] - Module's namespace
   * @param {Object|Array} states # Object's item can be a function which accept state and getters for param, you can do something for state and getters in it.
   * @param {Object}
   */
  var mapState = normalizeNamespace(function (namespace, states) {
    var res = {};
    if ( !isValidMap(states)) {
      console.error('[vuex] mapState: mapper parameter must be either an Array or an Object');
    }
    normalizeMap(states).forEach(function (ref) {
      var key = ref.key;
      var val = ref.val;

      res[key] = function mappedState () {
        var state = this.$store.state;
        var getters = this.$store.getters;
        if (namespace) {
          var module = getModuleByNamespace(this.$store, 'mapState', namespace);
          if (!module) {
            return
          }
          state = module.context.state;
          getters = module.context.getters;
        }
        return typeof val === 'function'
          ? val.call(this, state, getters)
          : state[val]
      };
      // mark vuex getter for devtools
      res[key].vuex = true;
    });
    return res
  });
```




### getters

#### 背景

有时候需要从 store 中的 state 中派生出一些状态，例如对列表进行过滤并计数

如果有多个组件需要用到此属性，我们要么复制这个函数，或者抽取到一个共享函数然后在多处导入它——无论哪种方式都不是很理想。

Vuex 允许我们在 store 中定义“getter”（可以认为是 store 的计算属性）。就像计算属性一样，<span style="color:blue">getter 的返回值会根据它的依赖被缓存起来，且只有当它的依赖值发生了改变才会被重新计算。</span>



#### 语法

Getter 接受 state 作为其第一个参数, 也可以接收其他getter作为第二个参数

```javascript
const store = new Vuex.Store({
  state: {
    todos: [
      { id: 1, text: '...', done: true },
      { id: 2, text: '...', done: false }
    ]
  },
  getters: {
    doneTodos: state => {
      return state.todos.filter(todo => todo.done)
    }
  }
})

getters: {
  // ...
  doneTodosCount: (state, getters) => {
    return getters.doneTodos.length
  }
}
```



#### 通过属性访问
Getter 会暴露为 `store.getters` 对象, 可以以属性的形式访问这些值
```javascript
computed: {
  doneTodosCount () {
    return this.$store.getters.doneTodosCount
  }
}
```

Getter 也可以接受其他 getter 作为第二个参数,不同getter之间可以互相访问
```javascript
getters: {
  // ...
  doneTodosCount: (state, getters) => {
    return getters.doneTodos.length
  }
}
```

在组件中使用
```javascript
computed: {
  doneTodosCount () {
    return this.$store.getters.doneTodosCount
  }
}
```

注意，getter 在通过属性访问时是作为 Vue 的响应式系统的一部分缓存其中的



#### 通过方法访问
通过让 getter 返回一个函数，来实现给 getter 传参。在你对 store 里的数组进行查询时非常有用。

```javascript
getters: {
  getTodoById: state => id => {
    return state.todos.find(todo => todo.id === id)
  }
}
```

```javascript
store.getters.getTodoById(2)
```

注意，getter 在通过方法访问时，每次都会去进行调用，而不会缓存结果



#### mapGetters辅助函数
`mapGetters` 辅助函数仅仅是将 store 中的 getter 映射到局部计算属性：

**数组写法**
```js
import {mapGetters} from 'vuex'

export default {
	//..
	computed: mapGetters(['unread', 'unreadFrom'])
}
```
等效于下面的写法
```js
computed: {
	unread() {
		return this.$store.getters.unread;
	},
	unreadFrom() {
		return this.$store.getters.unreadFrom;
	},
}
```


**对象写法**
```js
computed: mapGetters({
	unreadMessages: 'unread',
	unreadMessagesFrom: 'unreadFrom'
})
```


### Mutations
#### 介绍
更改 Vuex 的 store 中的状态的唯一方法是提交 mutation。
mutation是一个函数，它对state进行同步变更，通过调用store.commit()并传入mutation名称的方式来达成。

每个 mutation 都有一个字符串的 **事件类型 (type)** 和 一个 **回调函数 (handler)**。这个回调函数就是我们实际进行状态更改的地方，并且它会接受 state 作为第一个参数：
案例:
创建一个mutation,并在==组件==中调用==store.commit()==来触发这个mutation
```javascript
import Vuex from 'vuex';

export default new Vuex.Store({
	state: {
		messages: []
	},
	mutations: {
		addMessage(state, newMessage) {
			state.messages.push(newMessage);
		}
	}
});
```

```js
const SendMessage = {
	template: '<form @submit="handleSubmit">...</form>',
	data: () => ({
		formData: { ... }
	}),
	methods: {
		handleSubmit() {
			this.$store.commit('addMessage', this.formData);
		}
	}
};
```


#### commit方法的两种写法
要唤醒一个 mutation handler，你需要以相应的 type 调用 store.commit 方法：
**提交载荷(Payload)**
* 可以向 store.commit 传入额外的参数，即 mutation 的 载荷（payload）
* 在大多数情况下，载荷应该是一个对象
```js
//mutations
mutations: {
	increment(state, n) {
		state.count += n
	}
}

//store.commit('increment', 10)
```

```js
mutations: {
  increment (state, payload) {
    state.count += payload.amount
  }
}

store.commit('increment', {
  amount: 10
})
```
**提交对象**
直接使用包含 type 属性的对象：
```js
store.commit({
  type: 'increment',
  amount: 10
})

mutations: {
	increment(state, payload) {
		state.count += payload.amount
	}
}
```



#### 组件中提交Mutation

组件中提交mutation的方式有: 

* `this.$store.commit('xxx')`
* `mapMutations`  将组件中的methods映射为`$store.commit`调用

```javascript
import { mapMutations } from 'vuex'

export default {
  // ...
  methods: {
    ...mapMutations([
      'increment', // 将 `this.increment()` 映射为 `this.$store.commit('increment')`

      // `mapMutations` 也支持载荷：
      'incrementBy' // 将 `this.incrementBy(amount)` 映射为 `this.$store.commit('incrementBy', amount)`
    ]),
    ...mapMutations({
      add: 'increment' // 将 `this.add()` 映射为 `this.$store.commit('increment')`
    })
  }
}
```


#### mapMutations
与辅助函数mapGetters拥有完全相同的写法

**数组写法**
```js
import {mapMutations} from 'vuex'

export default {

	methods: {
		...mapMutations(['addMessage'])
	}
}
```

等效于下面的写法：
它也支持payload参数（再重申一下，这个参数是可选的）
```js
methods: {
	addMessage(payload) {
		return this.$store.commit('addMessage', payload);
	},
}
```

**对象写法**
如果想让mutation的方法名称不同于mutation的名称的话
```js
methods: mapMutations({
	addNewMessage: 'addMessage'
})
```
等效于下面的写法
```js
methods: {
	addNewMessage(payload) {
		return this.$store.commit('addMessage', payload);
	},
}
```


#### 注意事项
**Mutation需遵循Vue的响应规则**
* 最好提前在store中初始化好所有所需属性
* 当需要在对象上添加新属性时:
	* 使用`Vue.set(obj, 'newProp', 123)`
	* 新对象替换老对象.例如利用[对象展开运算符](https://github.com/tc39/proposal-object-rest-spread)




**使用常量代替Mutation事件类型**

使用常量替代 mutation 事件类型在各种 Flux 实现中是很常见的模式。这样可以使 linter 之类的工具发挥作用，同时把这些常量放在单独的文件中可以让你的代码合作者对整个 app 包含的 mutation 一目了然

多人协作的大型项目中，这会很有帮助. 不强制使用

```javascript
// mutation-types.js
export const SOME_MUTATION = 'SOME_MUTATION'
```

```javascript
// store.js
import Vuex from 'vuex'
import { SOME_MUTATION } from './mutation-types'

const store = new Vuex.Store({
  state: { ... },
  mutations: {
    // 我们可以使用 ES2015 风格的计算属性命名功能来使用一个常量作为函数名
    [SOME_MUTATION] (state) {
      // mutate state
    }
  }
})
```


**Mutation必须是同步函数**
总结; 如果是异步函数, 本地无法监测mutation触发时,数据的前后变化





### Actions

#### 语法

> https://v3.vuex.vuejs.org/zh/api/#actions

在 store 上注册 action。处理函数总是接受 `context` 作为第一个参数，`payload` 作为第二个参数（可选）。
`context` 对象包含以下属性：

```js
{
  state,      // 等同于 `store.state`，若在模块中则为局部状态
  rootState,  // 等同于 `store.state`，只存在于模块中
  commit,     // 等同于 `store.commit`
  dispatch,   // 等同于 `store.dispatch`
  getters,    // 等同于 `store.getters`
  rootGetters // 等同于 `store.getters`，只存在于模块中
}
```

 

#### 与mutations的比较

Action 类似于 mutation，不同在于：
- Action 提交的是 mutation，而不是直接变更状态。
- Action 可以包含任意异步操作。



#### action语法
* Action 函数接受一个与 store 实例具有相同方法和属性的 **context 对象**，
* 通过 `context.commit` 提交一个 mutation，
* 通过 `context.state` 和 `context.getters` 来获取 state 和 getters。
* 实践中,经常使用ES6的参数解构来简化代码

**context对象**
context对象即等于vuex的store, 即当前的vuex模块。通过context对象，可以访问到stat（e即它的state属性），不过不能直接修改它——还是得通过提交mutation来变更

简单示例:
```javascript
const store = new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    increment (state) {
      state.count++
    }
  },
  actions: {
    increment (context) {
      context.commit('increment')
    },
    increment2 ({commit}) {
      commit('increment')
    }
  }
})
```





#### 分发(调用)action
Action 通过 `store.dispatch` 方法触发：
dispatch调用语法与commit相同：
* 它既可以接受action的名称作为其第一个参数、payload对象作为其第二个参数
* 也可以接受一个包含type属性的对象作为其payload参数。
```javascript
store.dispatch('increment')
```

Actions 支持同样的<span style="color:red">载荷方式和对象方式</span>进行分发(调用);
```javascript
// 以载荷形式分发
store.dispatch('incrementAsync', {
  amount: 10
})

// 以对象形式分发
store.dispatch({
  type: 'incrementAsync',
  amount: 10
})
```



#### 组件中分发(调用)Action

组件中分发Action的方式有:

* 使用`this.$store.dispatch('xxx')`
* 使用 `mapActions` 辅助函数将组件的 methods 映射为 `store.dispatch` 调用

```javascript
import { mapActions } from 'vuex'

export default {
  // ...
  methods: {
    ...mapActions([
      'increment', // 将 `this.increment()` 映射为 `this.$store.dispatch('increment')`

      // `mapActions` 也支持载荷：
      'incrementBy' // 将 `this.incrementBy(amount)` 映射为 `this.$store.dispatch('incrementBy', amount)`
    ]),
    ...mapActions({
      add: 'increment' // 将 `this.add()` 映射为 `this.$store.dispatch('increment')`
    })
  }
}
```







#### Promise与Action

问题:
Action 通常是异步的，那么如何知道 action 什么时候结束呢？更重要的是，我们如何才能组合多个 action，以处理更加复杂的异步流程？
解决: 可以在action中返回一个promise对象来代替上述做法。另外，调用dispatch也会返回一个promise对象，运用它就可以在action运行结束时去运行其他代码。

首先，你需要明白 `store.dispatch` 可以处理被触发的 action 的处理函数返回的 Promise，并且 `store.dispatch` 仍旧返回 Promise：
```js
actions: {
  actionA ({ commit }) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        commit('someMutation')
        resolve()
      }, 1000)
    })
  }
}
```

现在你可以：
```js
store.dispatch('actionA').then(() => {
  // ...
})
```

在另外一个 action 中也可以：
```js
actions: {
  // ...
  actionB ({ dispatch, commit }) {
    return dispatch('actionA').then(() => {
      commit('someOtherMutation')
    })
  }
}
```

最后，如果我们利用 [async / await (opens new window)](https://tc39.github.io/ecmascript-asyncawait/)，我们可以如下组合 action：
```js
// 假设 getData() 和 getOtherData() 返回的是 Promise

actions: {
  async actionA ({ commit }) {
    commit('gotData', await getData())
  },
  async actionB ({ dispatch, commit }) {
    await dispatch('actionA') // 等待 actionA 完成
    commit('gotOtherData', await getOtherData())
  }
}
```

> 一个 `store.dispatch` 在不同模块中可以触发多个 action 函数。在这种情况下，只有当所有触发函数完成后，返回的 Promise 才会执行。



### Module

#### 背景

由于使用单一状态树，应用的所有状态会集中到一个比较大的对象。当应用变得非常复杂时，store 对象就有可能变得相当臃肿。

为了解决以上问题，Vuex 允许我们将 store 分割成**模块（module）**。每个模块拥有自己的 state、mutation、action、getter、甚至是嵌套子模块——从上至下进行同样方式的分割

```javascript
const moduleA = {
  state: () => ({ ... }),
  mutations: { ... },
  actions: { ... },
  getters: { ... }
}

const moduleB = {
  state: () => ({ ... }),
  mutations: { ... },
  actions: { ... }
}

const store = new Vuex.Store({
  modules: {
    a: moduleA,
    b: moduleB
  }
})

store.state.a // -> moduleA 的状态
store.state.b // -> moduleB 的状态
```



#### 模块的局部状态

**和无模块store的对比**
第一个变化
* mutation和getter中的state现在指向的则是该模块的state，而非根节点的state（即主store的state
* action当中的context对象指向的也是module而非store
* 在getters, 通过其第三个参数rootState属性来访问根节点状态; 
* 在action中,则可以通过context对象的rootState属性来访问
第二个变化
* 当你从store中取数据时必须指定从哪个模块取  `state.模块名称.keyOfstate`
* 组件中对mapState的调用需要添加模块名称为第一个参数: `mapState('moduleName', ['messages'])`. 这样可能会有多个mapState



对于模块内部的 mutation 和 getter，接收的第一个参数是**模块的局部状态对象**。

```javascript
const moduleA = {
  state: () => ({
    count: 0
  }),
  mutations: {
    increment (state) {
      // 这里的 `state` 对象是模块的局部状态
      state.count++
    }
  },

  getters: {
    doubleCount (state) {
      return state.count * 2
    }
  }
}
```

对于模块内部的 action，局部状态通过 `context.state` 暴露出来，根节点状态则为 `context.rootState`：

```javascript
const moduleA = {
  // ...
  actions: {
    incrementIfOddOnRootSum ({ state, commit, rootState }) {
      if ((state.count + rootState.count) % 2 === 1) {
        commit('increment')
      }
    }
  }
}
```

对于模块内部的 getter，根节点状态会作为第三个参数暴露出来：

```javascript
const moduleA = {
  // ...
  getters: {
    sumWithRootCount (state, getters, rootState) {
      return state.count + rootState.count
    }
  }
}
```



#### 命名空间

**背景**
>在默认情况下，只有state是带命名空间的。而模块内部的getter、mutation和action仍然与未做模块拆分时的调用方式完全相同，而且如果被分发的action同时存在于多个模块中时，则每个模块中的该action都会被分发。


如果希望你的模块具有更高的封装度和复用性，你可以在模块对象中添加<span style="color:blue"> `namespaced: true` </span>的方式使其成为带命名空间的模块。当模块被注册后，它的所有 getter、action 及 mutation 都会自动根据模块注册的路径调整命名

**组件中方法变化**
```js
//getters
computed: mapGetters(['moduleName/gettersName'])

//mapState
computed: mapState('moduleName', ['xxx'])

methods: {
	...mapActions()
}
```
完整写法:
```js
computed: mapGetters({
	gettersName() {
		return this.$store.getters['moduleName/gettersName']
	}
})
```

```js
//mutation action

store.commit('moduleName/mutationFnName', payload)

store.dispatch('moduleName/actionFnName')

```

```javascript
const store = new Vuex.Store({
  modules: {
    account: {
      namespaced: true,

      // 模块内容（module assets）
      state: () => ({ ... }), // 模块内的状态已经是嵌套的了，使用 `namespaced` 属性不会对其产生影响
      getters: {
        isAdmin () { ... }   // -> getters['account/isAdmin']
      },
      actions: {
        login () { ... }     // -> dispatch('account/login')
      },
      mutations: {
        login () { ... }     // -> commit('account/login')
      },

      // 嵌套模块
      modules: {
        // 继承父模块的命名空间
        myPage: {
          state: () => ({ ... }),
          getters: {
            profile () { ... } // -> getters['account/profile']
          }
        },

        // 进一步嵌套命名空间
        posts: {
          namespaced: true,

          state: () => ({ ... }),
          getters: {
            popular () { ... } // -> getters['account/posts/popular']
          }
        }
      }
    }
  }
})
```

启用了命名空间的 getter 和 action 会收到局部化的 `getter`，`dispatch` 和 `commit`。换言之，你在使用模块内容（module assets）时不需要在同一模块内额外添加空间名前缀。更改 `namespaced` 属性后不需要修改模块内的代码



#### 在带命名空间的模块访问全局内容

如果你希望使用全局 state 和 getter，`rootState` 和 `rootGetters` 会作为第三和第四参数传入 getter，也会通过 `context` 对象的属性传入 action。

若需要在全局命名空间内分发 action 或提交 mutation，将 `{ root: true }` 作为第三参数传给 `dispatch` 或 `commit` 即可。

```javascript
modules: {
  foo: {
    namespaced: true,

    getters: {
      // 在这个模块的 getter 中，`getters` 被局部化了
      // 你可以使用 getter 的第四个参数来调用 `rootGetters`
      someGetter (state, getters, rootState, rootGetters) {
        getters.someOtherGetter // -> 'foo/someOtherGetter'
        rootGetters.someOtherGetter // -> 'someOtherGetter'
      },
      someOtherGetter: state => { ... }
    },

    actions: {
      // 在这个模块中， dispatch 和 commit 也被局部化了
      // 他们可以接受 `root` 属性以访问根 dispatch 或 commit
      someAction ({ dispatch, commit, getters, rootGetters }) {
        getters.someGetter // -> 'foo/someGetter'
        rootGetters.someGetter // -> 'someGetter'

        dispatch('someOtherAction') // -> 'foo/someOtherAction'
        dispatch('someOtherAction', null, { root: true }) // -> 'someOtherAction'

        commit('someMutation') // -> 'foo/someMutation'
        commit('someMutation', null, { root: true }) // -> 'someMutation'
      },
      someOtherAction (ctx, payload) { ... }
    }
  }
}
```



#### 在带命名空间的模块注册全局 action
两种实现方式:
* 函数写法
* 对象写法

对象写法
```javascript
{
  actions: {
    someOtherAction ({dispatch}) {
      dispatch('someAction')
    }
  },
  modules: {
    foo: {
      namespaced: true,

      actions: {
        someAction: {
          root: true,
          handler (namespacedContext, payload) { ... } // -> 'someAction'
        }
      }
    }
  }
}
```

函数写法
```js
{
	mutatios: {
		mutationName() {
			
		}
	},
  actions: {
    someOtherAction ({dispatch}) {
      dispatch('someAction')
    }
  },
  modules: {
    foo: {
      namespaced: true,
			// ...
      actions: {
        someAction({dispatch, commit}) {
	        commit('mutationName', null, {root: true}) //
        }
      }
    }
  }
}
```

#### 带命名空间的绑定函数

当使用 `mapState`, `mapGetters`, `mapActions` 和 `mapMutations` 这些函数来绑定带命名空间的模块时，写起来可能比较繁琐：

```js
computed: {
  ...mapState({
    a: state => state.some.nested.module.a,
    b: state => state.some.nested.module.b
  })
},
methods: {
  ...mapActions([
    'some/nested/module/foo', // -> this['some/nested/module/foo']()
    'some/nested/module/bar' // -> this['some/nested/module/bar']()
  ])
}
```

对于这种情况，你可以将模块的空间名称字符串作为第一个参数传递给上述函数，这样所有绑定都会自动将该模块作为上下文。于是上面的例子可以简化为：

```js
computed: {
  ...mapState('some/nested/module', {
    a: state => state.a,
    b: state => state.b
  })
},
methods: {
  ...mapActions('some/nested/module', [
    'foo', // -> this.foo()
    'bar' // -> this.bar()
  ])
}
```

而且，你可以通过使用 `createNamespacedHelpers` 创建基于某个命名空间辅助函数。它返回一个对象，对象里有新的绑定在给定命名空间值上的组件绑定辅助函数：

```javascript
import { createNamespacedHelpers } from 'vuex'

const { mapState, mapActions } = createNamespacedHelpers('some/nested/module')

export default {
  computed: {
    // 在 `some/nested/module` 中查找
    ...mapState({
      a: state => state.a,
      b: state => state.b
    })
  },
  methods: {
    // 在 `some/nested/module` 中查找
    ...mapActions([
      'foo',
      'bar'
    ])
  }
}
```



####  给插件开发者的注意事项 ??

如果你开发的[插件（Plugin）](https://v3.vuex.vuejs.org/zh/guide/plugins.html)提供了模块并允许用户将其添加到 Vuex store，可能需要考虑模块的空间名称问题。对于这种情况，你可以通过插件的参数对象来允许用户指定空间名称：

```javascript
// 通过插件的参数对象得到空间名称
// 然后返回 Vuex 插件函数
export function createPlugin (options = {}) {
  return function (store) {
    // 把空间名字添加到插件模块的类型（type）中去
    const namespace = options.namespace || ''
    store.dispatch(namespace + 'pluginAction')
  }
}
```



#### 模块动态注册?

在 store 创建**之后**，你可以使用 `store.registerModule` 方法注册模块：

```js
import Vuex from 'vuex'

const store = new Vuex.Store({ /* 选项 */ })

// 注册模块 `myModule`
store.registerModule('myModule', {
  // ...
})
// 注册嵌套模块 `nested/myModule`
store.registerModule(['nested', 'myModule'], {
  // ...
})
```

之后就可以通过 `store.state.myModule` 和 `store.state.nested.myModule` 访问模块的状态。

模块动态注册功能使得其他 Vue 插件可以通过在 store 中附加新模块的方式来使用 Vuex 管理状态。例如，[`vuex-router-sync` (opens new window)](https://github.com/vuejs/vuex-router-sync)插件就是通过动态注册模块将 vue-router 和 vuex 结合在一起，实现应用的路由状态管理。

你也可以使用 `store.unregisterModule(moduleName)` 来动态卸载模块。注意，你不能使用此方法卸载静态模块（即创建 store 时声明的模块）。

注意，你可以通过 `store.hasModule(moduleName)` 方法检查该模块是否已经被注册到 store。

##### [#](https://v3.vuex.vuejs.org/zh/guide/modules.html#保留-state)保留 state

在注册一个新 module 时，你很有可能想保留过去的 state，例如从一个服务端渲染的应用保留 state。你可以通过 `preserveState` 选项将其归档：`store.registerModule('a', module, { preserveState: true })`。

当你设置 `preserveState: true` 时，该模块会被注册，action、mutation 和 getter 会被添加到 store 中，但是 state 不会。这里假设 store 的 state 已经包含了这个 module 的 state 并且你不希望将其覆写。



#### 模块重用

有时我们可能需要创建一个模块的多个实例，例如：

- 创建多个 store，他们公用同一个模块 (例如当 `runInNewContext` 选项是 `false` 或 `'once'` 时，为了[在服务端渲染中避免有状态的单例 (opens new window)](https://ssr.vuejs.org/en/structure.html#avoid-stateful-singletons))
- 在一个 store 中多次注册同一个模块

如果我们使用一个纯对象来声明模块的状态，那么这个状态对象会通过引用被共享，导致状态对象被修改时 store 或模块间数据互相污染的问题。

实际上这和 Vue 组件内的 `data` 是同样的问题。因此解决办法也是相同的——使用一个函数来声明模块状态（仅 2.3.0+ 支持）：

```javascript
const MyReusableModule = {
  state: () => ({
    foo: 'bar'
  }),
  // mutation, action 和 getter 等等...
}
```



#### 实践案例

store文件夹解构如下：

```javascript
store
	--basemodules
  --localStandardData
  --modules
  	--anhui
    	--meteringpoint.js
			--powerplantMeteringpoint.js
    --beiJing
    	--xxx.js
    --xinjiang
    	--xxx.js
  	--xxx1.js
		--xxx2.js
```

问题及解决方法：

store文件夹下存在多个js文件多个文件夹，结构有嵌套，单一结构数量又多。如果在默认文件中使用import方法引入，写法繁琐。

使用require.context自动导入模块

```javascript
const modulesFiles = require.context('./modules', true, /\.js$/)
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  let moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')

  // 处理多层级文件 让第二层级首字母大写
  if (moduleName.includes('/')) {
    let multipleFolderName = moduleName.split('/')
    
    // for (let idx = 1, len = multipleFolderName.length; idx < len; idx++) {
    //   const item = multipleFolderName[idx]
    //   multipleFolderName[idx] = item.slice(0, 1).toUpperCase() + item.slice(1)
    // }
    // moduleName = multipleFolderName.join('')
   

    multipleFolderName.forEach((item, idx) => idx != 0 && item[0].toUpperCase())
    moduleName = multipleFolderName.join('')
  }

  const value = modulesFiles(modulePath)
  modules[moduleName] = value.default
  return modules
 }, {})
```







#### 6大模块

```js
//0127 
modules模块

命名空间namespaced:true

Vuex核心概念
1.store对象
2.state状态数据
3.mutations
 3.1 本质:函数
 3.2 同步修改状态数据
4.actions
 4.1 本质:函数 所以mapActions放在methods中,mapState放在computed中
 4.2 获取异步数据
 4.2 触发commit,同时将异步数据提交给mutations
5.getters
 5.1 根据已有的状态数据计算得到新的状态数据
 5.2 等同于Vue中的computed
6.dispatch
 6.1.分发actions
7.modules
 7.1 Vuex中的模块化
```









#### getters (值是对象)+

```js
//存在$store身上的一个属性,
//和组件中使用computed,过滤功能相同,实现同样效果.
$store身上有一个getters属性,值是对象, $store可以获取到其返回值($store.getters.demo)
 
// vuex/store.js
const getters={
    //第一种属性形式-属性是函数的简写形式
    demo(state){  //函数会接收两个参数,第二个参数可省略.
        return state.sum * 100;
    }
    //第二种属性形式
    demo:function(state){
        return state.sum * 100;
    }
}

// 组件.vue使用getters属性的返回值

插值语法: 
{{ $store.getters.demo}}

computed计算属性:
computed:{
    return this.$store.getters.demo;
}
```



#### 求和基本版优化++

```JS
// 组件中使用computed简化模板中{{$store.state.sum}} 
1.手写计算属性,定义简化求和中的值

2.引入mapState生成计算属性
import {mapState} from 'vuex';

```



#### 辅助函数

```js
//mapState mapGetters   mapActions mapMutations
1.mapState mapGetters 是用在组件计算属性computed中用来获取$store中的state和getters
2.mapActions mapMutations 是用在组件方法methods中用来获取actions, mutations的.

3.辅助函数内部可以是对象也可以是数组,
    使用数组的前提条件: 数组中名字需要和vuex插件中对象相应的名字一样; 数据也是插件中不能是模块里的
```





#### 优化-mapState

```js
mapState放在那里?  获取state属性,放在computed计算属性对象中

//代替computed,获取state中的数据

mapState是vuex中的一个方法(需要import),形参是对象或数组,返回值是一个对象({he:f}),可以简写成数组. //和计算属性的get函数相似
mapState({sum:'sum'}) 变量sum对应页面上的sum,字符串sum对应可以获取vc上的state上的sum的值的函数,代替computed繁琐获取
放在computed中需要对mapState使用展开运算符 ...mapState({sum:'sum'}). 变成key:value形式
mapState可以简写的条件: 传入对象的属性名和值相同可省略,对象变数组形式,带着引号.

//手动获取sum的值(也是mapState生成的代码形式):
computed:{
    he(){
        return this.$store.state.sum;
    }
}

//靠mapState生成计算属性
computed:{
    ...mapState({he:'sum'})
}

//简化mapState 如果对象属性和属性值同名,可以变成数组形式
computed:{
    ...mapState(['sum'])
}
```



#### 优化-mapGetters

```js
//介绍:
mapGetters获取的是vuex插件vuex/store中getters方法的返回值,也是vc身上getters属性的值.
mapGetters是vuex中的一个方法(需要import),参数是对象或数组,返回值是一个对象

//手动获取bigSum的值:
import {mapGetters} from 'vuex'
computed:{
    bigSum(){
        return this.$store.getters.bigSum;
    }
    //模块形式下的
    bigSum:state=>state.detail.detailInfo;
}

//靠mapState生成计算属性
computed:{
    ...mapGetters({bigSum:'bigSum'})
}

//简化mapGetters 如果对象属性和属性值同名,可以变成数组形式 冒号不能省略
computed:{
    ...mapState(['bigSum'])
}
```



#### commit替换dispatch

```js
//简介
如果actions中业务逻辑不复杂,可以省略,直接使用组件.commit的形式将信息发送到mutations中

//复杂版:
- 1组件中
methods:{
    //dispatch
    increment(){
        this.$store.dispatch('jia', this.n) //this.n是data中的属性,jia传递到store中的actions对象中
    }
}
- 1vuex插件中:
const actions={
    jia(context,value){
        context.commit('JIA', value);
    }
}

//简略版:
- 1组件中
methods:{
    //commit
    increment(value){
        this.$store.commit('JIA', value)
    }
}
```





#### 优化-mapMutations

```JS
//简介:
靠mapMutations生成x方法,和vuex插件中的mutations中的x函数对话,完成

//methods中手动写事件回调函数:
increment(value){
    this.$store.commit('JIA',value)
}

//靠mapMutations生成increment函数，和mutations中的JIA对话，完成加. 参数value自动获取自动传递
...mapMutations({
    increment:'JIA'
})

//简写成数组: 前提mutations中的函数名称和组件中的事件回调同名
...mapMutations(['JIA', 'JIAN'])

```



#### 优化-mapActions

```js
//简介
靠mapActions生成x方法,和actions中的函数对话,完成操作

//methods中手写事件回调:
incrementIfOdd(value){
    this.$store.dispathc('jiaOdd', value)
}

//methods中 mapActions生成incrementIfOdd方法,和actions中的jiaOdd对话,完成操作
...mapActions({
    incremntIfOdd:'jiaOdd',
    incremntAsync:'jiaAsync'
})

//mapActions简写 若组件事件回调和actions中的函数名一样,可简写数组形式
...mapActions(['jiaOdd', 'jianAsync'])

```





### Vuex 日常问题

#### 刷新后数据失效

> [vuex页面刷新数据丢失的解决办法 - 掘金 (juejin.cn)](https://juejin.cn/post/6844903791838363655)

```js
export default {
  name: 'App',
  created () {
    //在页面加载时读取sessionStorage里的状态信息
    if (sessionStorage.getItem("store") ) {
        this.$store.replaceState(Object.assign({}, this.$store.state,JSON.parse(sessionStorage.getItem("store"))))
    } 

    //在页面刷新时将vuex里的信息保存到sessionStorage里
    window.addEventListener("beforeunload",()=>{
        sessionStorage.setItem("store",JSON.stringify(this.$store.state))
    })
  }
}
```








# Vue Loader
> 创建个性化webpack配置

### 文档
> https://vue-loader.vuejs.org/zh/


#### 深度作用选择器
> https://juejin.cn/post/6978781674070884366
> 


## vue中组件通信方式总结

```js
组件间通信方式总结
组件之间的关系:
1.父子
2.祖孙
3.兄弟
4.其它
vue组件间通信方式:
1.props
2.自定义事件  
3.全局事件总线
4.消息订阅与发布(Pubsub)
5.slot插槽
6.vuex

1.props:
1.此方式用于父组件与子组件之间传递数据
2.所有标签属性都会成为组件对象的属性, 模板页面可以直接引用
问题: 
1.如果需要向非子后代传递数据必须多层逐层传递
2.兄弟组件间也不能直接props通信, 必须借助父组件才可以

2.vue自定义事件
1. 用来实现子组件向父组件通信的方式, 功能类似于函数类型的props
2. 实现流程
(1)	父组件: 
1.组件标签属性或mounted(): 给子组件对象绑定事件监听, 用于接收数据
2.在beforeDestroy(): 通过子组件对象解绑对应的事件监听
(2)	子组件: 
通过当前组件对象分发事件, 传递数据值

3.消息订阅与发布
1. 消息订阅与发布与全局事件总线一样都可以实现任意组件间通信
2. 但需要额外引入第三方实现库, 而全局事件总线不用, 一般在vue项目中不用
3. 实现流程
(1)	在接收数据的组件: 
1.mounted(): 订阅消息, 在回调函数中接收数据并处理
2.beforeDestroy(): 取消订阅
(2)	在发送数据的组件: 发布消息

4.slot插槽
1. 当一个组件有不确定的结构时, 就需要使用slot技术
2. 注意: 插槽内容是在父组件中编译后, 再传递给子组件
(1)	当只有一个不确定的结构时, 可以使用默认slot
(2)	当有多个不确定的结构时, 可以使用命名slot
3. 特殊情况：如果决定结构的数据在子组件, 那需要使用作用域插槽


5.全局事件总线(是什么,作用, 流程)
1. 全局事件总线是任意关系的组件间通信(传值/数据)的解决方案
2. 全局事件总线是一个对象, 有事件处理的相关方法, 在vue中就是vm对象
3. 实现流程
(1)	将新创建的vm或最外层已有的vm作为总线对象保存到Vue的原型对象上
(2)	需要传值/数据的组件: 得到总线对象, 调用其$emit()分发事件, 携带数据
(3)	需要接收消息/数据的组件: 
①	在mounted()中: 得到总线对象, 调用其$on()绑定监听, 接收数据
②	在beforeDestroy()中: 得到总线对象, 调用其$off()解绑监听
```





## vue脚手架配置代理总结



### 方法一

> 在vue.config.js中追加如下配置

```json
devServer:{
    "proxy":"http://localhost:5000"
}
```

说明：

1. 优点：配置简单，前端请求资源时可以不加任何前缀。
2. 缺点：不能配置多个代理，不能灵活的控制请求是否走代理。
3. 工作方式：若按照上述配置代理，当请求了3000不存在的资源时，那么该请求会转发给5000 （有限匹配前端资源）



### 方法二

编写vue.config.js配置具体代理规则：

```js
module.exports = {
	devServer: {
    proxy: {
      '/api1': {// 匹配所有以 '/api'开头的请求路径
        target: 'http://localhost:5000',// 代理目标的基础路径
        changeOrigin: true,
        pathRewrite: {'^/api1': ''}
      },
      '/api2': {// 匹配所有以 '/api'开头的请求路径
        target: 'http://localhost:5001',// 代理目标的基础路径
        changeOrigin: true,
        pathRewrite: {'^/api2': ''}
      }
    }
  }
}
```

说明：

1. 优点：可以配置多个代理，可以灵活的控制请求是否走代理。
2. 缺点：配置繁琐，前端请求资源时必须加前缀。





# 组件间10种通信

**组件间10种通信方式:**

* props
* vue自定义事件
* 全局事件总线
* v-model
* .sync 属性修饰符
* \$ref, \$children&\$parent
* \$attrs与\$listeners
* provide & inject
* 插槽与作用域插槽
* vuex





### PubsubJs

```js
//一般使用全局事件总线代替. 比全局总线, 有体积缺点.
```



### Vuex

```js
//任何组件间通信都可以使用
看项目大小决定是否使用.项目如果小,使用veux反而会降低效率,因为vuex需要占用打包体积.

6个核心概念
```







### props

#### 特征

* 用来实现父子之间相互通信的最基本方式, 也是用得最多的方式; Vue设计理念是单向数据流,父子组件数据传递应自上而下.
* 父 ==> 子, 传递的是非函数类型的属性
* 子 ==> 父, 传递的是函数类型的属性  (文档不建议这么做)
* 其它关系的组件使用props就会比较麻烦.需要经过父组件传递



#### 实例

父=>子

父组件传给子组件数值，子组件不要对其进行修改，而是需要找个变量将父组件传递的数值给赋值过来然后对变量进行操作.

代码中的方式只适合prop里面的数值是原始类型，不能是对象类型，如果count是对象类型，需要进行深拷贝进行赋值，不然的话，改变number的数值，count的数值还是会改变的

```html
<div id="app">
  <counter :count='1'></counter>
  <counter :count='2'></counter>
</div>
<script>
  Vue.component('counter', {
    props: ['count'],
    data: function() {
      return {
        number: this.count
      }
    },
    template: '<div @click="add">{{number}}----{{count}}</div>',
    methods: {
      add: function() {
        this.number++,
      }
    },
  })
  let vm = new Vue({
    el: "#app",
  })
</script>
```

子=>父

> [Vue通过props来实现子组件给父组件传递参数 - 问某完红 - 博客园 (cnblogs.com)](https://www.cnblogs.com/renag/p/15686418.html)
>
> 通过props属性让父组件传递给子组件传递一个函数,子组件再调用这个函数,把要传递的数据通过参数的形式传递给父组件,父组件可以接收数据.
>
> 注意: 如果我们传递data中的一个数据(函数类型)来实现这种效果呢? 很麻烦

```html
		<div id="root">
      <counter :add-Count="addCount"></counter>  //vue推荐使用kebab-case写法
      <h3>子组件中num的值是: {{count}}</h3>
		</div>

		<script>
      Vue.component('counter', {
        template: `
          <div @click="add">num的值是(点击新增): {{num}}!</div>
        `,
        data(){
          return {
            num: 0
          }
        },
        props: ['addCount'],
        methods: {
          add() {
            this.num++;
            this.addCount(this.num)
          }
        }
      })
			let vm = new Vue({
				el: "#root",
        data: {
          count: 0,
        },
        methods: {
          addCount(num) {
            this.count = num
          }
        }
			});
		</script>
```



#### 特殊

路由配置props(3种). 使用3种方式(布尔值, 对象, 函数),来实现路由组件之间的传参





###  `.sync 属性修饰符`

#### 语法

```html
<my-component
	v-bind:title.sync="doc.title"
></my-component>

//语法糖
<my-component
  v-bind:title="doc.title"
  v-on:udpate:title="doc.title=$event"
 ></my-component>
```

#### 特点

* 绑定一个自定义事件监听, 用来接收子分组分发事件携带的数据来更新父组件的数据.

* 功能与v-model相似,实现父子组件相互通信,更准确的是双向数据同步.

* 语法本质:任意名称props与event的语法


#### sync和v-model比较

  相同: sync和v-model用在组件标签上,都可以达到父子组件数据同步
  不同: sync达到数据同步: 子组件内部不是表单类元素; v-model达到数据同步: 子组件内部一定是表单类元素
* 在Vue.js 2中，v-model和.sync都可以实现双向绑定，但.sync更灵活。它是在为组件添加v-model之后添加的。.sync允许对多个prop使用v-model逻辑。
* v-model总是绑定到名为value的prop，而.sync允许您使用多个prop。
* 组件发出的事件名称（@update用于.sync，@input用于v-model）。
* 如果有value属性并且想要为其启用双向绑定，则使用v-model。在所有其他情况下，请使用.sync。

#### 利用sync能做什么呢?

* 实现父子组件间数据双向同步;常用于封装可复用组件(需要更新父组件数据)
* v-model一般用于带表单项的组件;sync一般用于不带表单项标签的组件
* 代码实现 子组件中的数值改变后父组件中的值也跟着变化
  ​ 
  ​ 





### v-model

#### 语法糖

原生input上的v-model的本质:  动态的value属性(单向数据绑定v-bind)与原生input事件监听

```html
组件标签上的v-model的本质: 是单向数据绑定v-bind与自定义input事件监听的组合
<input type='text' v-model='name2'>
<input type="text" :value="name2" @input="name2=$event.target.value">


//2.在组件身上使用
父组件: 
<CustomInput :value="name4" @input="name4=$event"/>
子组件: 
props: ['value']
<input type="text" :value="value" @input="$emit('input', $event.target.value)">
```



#### 特点

* v-model不仅能实现原生标签与其父组件间数据双向通信(同步), 也能实现父子组件间数据双向通信(同步)
* 一般用于封装带表单项的复用性组件

#### 使用



```js

```









### 自定义事件与全局事件总线

#### Vue自定义事件

vue的自定义事件: 用来实现子向父组件通信, 功能相当于函数类型的props

绑定vue自定义事件监听,只能在组件标签上绑定,事件名是任意的, 可以与原生DOM事件名相同
只当执行$emit('自定义事件名', data)时分发自定义事件, 才会触发自定义事件监听函数调用
$event: 就是分发自定义事件时指定的data数据 $event可以是任意类型, 甚至可以没有

```js
vue自定义事件

//其他: 原生DOM事件介绍

原生DOM事件
绑定原生DOM事件监听的2种情况
在html标签上绑定DOM事件名的监听
在组件标签上绑定DOM事件名的监听, 事件绑定在组件的根标签上
当用户操作对应的界面时, 浏览器就会自动创建并封闭包含相关数据的事件对象, 分发对应的事件, 从而触发事件监听回调函数调用
事件对象event, 本质是 "事件数据对象"
event对象内的数据属性: target / offsetX / offsetY / keyCode等
$event就是浏览器创建的event对象, 默认传递给事件监听回调函数的就是它


如果在组件标签身上添加原生dom事件, 那么这是一个自定义事件, 只不过事件类型和原生的事件类型名一样
如果想在组件标签上添加原生dom事件, 需要添加时间修饰符.native
```



| 类型          | 事件类型 | 回调函数   | 谁调用                       | event事件对象                           |
| ------------- | -------- | ---------- | ---------------------------- | --------------------------------------- |
| DOM事件       | 固定几个 | 自己去定义 | 系统调用浏览器去调用         | 浏览器调用回调,传递的默认参数event      |
| Vue自定义事件 | 无数个   | 自己去定义 | 自己去调用 使用$emit触发调用 | 默认传递自己给的参数(没有就是undefined) |



```html

<div id="root">
  <counter @inc="addNumber"></counter>
</div>

<script>
  Vue.component("counter", {
    template: `
          <div @click="add">点击一下</div>
        `,
    methods: {
      add() {
        this.$emit('inc', '传递的数据')
      },
    },
  });
  let vm = new Vue({
    el: "#root",
    data: {
      count: 0,
    },
    methods: {
      addNumber(step) {
        console.log(step)
      },
    },
  });
</script>

//自定义事件相当于
vm.$on('inc', function addNumber(step) { console.log(step)} )
vm.$emit('inc', '传递的数据')
```


```js

1.绑定自定义事件: 子组件给父组件传递数据
 第1种方式：
 - 父组件中:<Demo @haha="test"/> 添加'@自定义事件=回调函数'.回调函数test的参数是子组件传递的值.
 - 子组件中:一般在methods中的回调函数中触发, 也可以直接绑定到事件上.
   - methods中触发的: this.$emit('haha', 传递的值)可提供多个value
   - 绑定到事件上: <button @click="$emit('自定义事件名称', 传递的值)" >

 第2种方式： $on 表示绑定
    父组件中:<Demo ref="demo"/>, mounted函数中：this.$refs.demo.$on('haha',this.test)
    子组件中(同上,没变化):一般在methods中触发, this.$emit('haha', value)


//总结:
1.适用范围: 适合子组件给父组件传数据.代替通过props传递的回调函数,不适合兄弟组件和隔层组件,因为有嵌套.
2.使用方法: 
    2.1 若,父组件想让子组件给自己传数据，那么就要给子组件绑定自定义事件   $emit
    2.2.父组件需要在子组件身上绑定自定义事件 @自定义事件名称="回调函数" //回调函数的参数是传递的值


//扩展: props传递回调函数实现子到父的组件通讯
 1.父组件中,给子组件绑定动态属性: <Demo :test='test'/> + 父组件的methods中有名为test()的函数
 2.子组件中,使用props获取: props:['test'], test在实例身上. 可在methods中调用this.test(value)
 3.子组件中调用父组件中的函数并传参
```


#### Vue全局事件总线EventBus

##### 是什么

> 思路就是声明一个全局Vue实例变量EventBus，把所有的通信数据，事件监听都存储到这个变量上，这样就到达在组件间实现数据共享，有点类似Vuex。但是这种方式只适合极小的项目，复杂的项目还是推荐Vuex。

##### 实现

*  Vue原型对象上有3个事件处理的方法: `$on() / $emit() / $off()`

* 组件对象的原型对象是vm对象: 组件对象可以直接访问Vue原型对象上的方法


```javascript
//入口js中的vm作为全局事件总线对象: 
beforeCreate() {
  Vue.prototype.$bus = this
}
//分发事件/传递数据的组件: 
this.$bus.$emit('eventName', data)


//处理事件/接收数据的组件: 
this.$bus.$on('eventName', (data) => {})
```



```html
//另一种形式 兄弟组件之间的通信

<div id="app">
  <a-name></a-name>
  <b-name></b-name>
</div>
<script>
	const bus = new Vue()
  Vue.component('a-name', {
    template: '<h1>我是前面的组件</h1>',
    created() {
      bus.$on('aa', result => { console.log(result)})
    }
  });
  
  Vue.component('b-name', {
    template: '<h1 @click="click(2)">我是后面的组件</h1>',
    created() {
      click(id) {
        bus.$emit('aa', id)
      }
    }
  })
</script>
```


```js

1.	Vue原型对象上包含事件处理的方法
1)	$on(eventName, listener): 绑定自定义事件监听
2)	$emit(eventName, data): 分发自定义事件
3)	$off(eventName): 解绑自定义事件监听
4)	$once(eventName, listener): 绑定事件监听, 但只能处理一次

2.	//所有组件对象的原型对象的原型对象就是Vue的原型对象  +++
1)	所有组件对象都能看到Vue原型对象上的属性和方法
2)	Vue.prototype.$bus = new Vue(), 所有的组件对象都能看到$bus这个属性对象

3.	全局事件总线
1)	包含事件处理相关方法的对象(只有一个)
2)	所有的组件都可以得到



$bus:总线
// 全局事件总线优缺点:
 优点: 适用任何组件间通信
 缺点: 管理不够集中

//使用
 给谁绑定的事件,就去触发谁的emit


//为什么全局事件总线要绑定在Vue的原型上?
0.组件实例对象VueComponent(vc)是源码生成的,
1.每一个组件生成的实例化对象VueComponent都是不一样的.
2.每个组件的实例化对象都能访问Vue原型上的属性和方法

// 查看原型链:
打印组件的this,顺序: 
//打印版:
VueComponent->__proto__->__proto__->__protot__
//解释:
实例对象vc-> VueComponent.prototype||Vue的实例 ->Vue.prototype->Object

继承的原理:子类的原型对象(VueComponent.prototype)等于父类的实例(new Vue/Vue.prototype)


<!--  *****
  
组件对象vc-->原型对象-->原型对象(Vue原型对象)
组件对象vc-->__proto__-->__proto__
    
继承本质: 子类原型=父类实例
子类的实例化对象.__proto__===子类.prototype===父类实例
父类实例.__proto__===父类.prototype
子类的实例化对象.__proto__.__proto__===父类.prototype
-->

//Vue.prototype.p=100, 在main.js中的位置不能在new Vue()之后
//$on, $emit在Vue的原型上.?? 
//谁能调用$on,$emit? vm和vc,vc也是找到的vm身上的.
//this.$bus.$on/$emit  $bus是原型上的 $on/$emit是this(vm)身上的.
    
    
```

### 4: `$attrs与$listeners`

#### 是什么

父组件中给子组件传递的所有属性组成的对象及自定义事件方法组成的对象

#### 传递方式

**$attrs**

> 包含了父作用域中不作为 prop 被识别 (且获取) 的 attribute 绑定 (`class` 和 `style` 除外)

**$listeners**

> 包含了父作用域中的 (不含 `.native` 修饰器的) `v-on` 事件监听器。它可以通过 `v-on="$listeners"` 传入内部组件——在创建更高层次的组件时非常有用。
>
> 在Vue3中已经被删除,放到$attrs中

可以通过v-bind 一次性把父组件传递过来的属性添加给当前组件的子组件 `v-bind="$attrs"`
可以通过v-on   一次性把父组件传递过来的事件监听添加给子组件 `v-on="$listeners"`

v-bind: 的特别使用: `<div v-bind="{ id: someProp, 'other-attr': otherProp }"></div>`
v-on: 的特别使用: `<button v-on="{ mousedown: doThis, mouseup: doThat }"></button>`

```html
<div id="app">
  <child 
  	:foo="foo" 
    :bar="bar" 
    @one.native="triggerOne" 
    @two="triggerTwo"
  ><child>
</div>
    
<script>
	let Child = Vue.extend({
    template: '<h2>{{ foo }}</h2>',
    props: ['foo'],
    create() {
      console.log(this.$attrs, this.$listeners)
      // -> {bar: "parent bar"}
      // -> {two: fn}

      // 这里我们访问父组件中的 `triggerTwo` 方法
      this.$listeners.two()
      // -> 'two'
    }
  })   
  
  new Vue({
    el: '#app',
    data: {
      foo: 'parent foo',
      bar: 'parent bar'
    },
    methods: {
      triggerOne() {
        alert('one')
      },
      triggerTwo() {
        alert('two')
      }
    }
  })
</script>
```







### provide/inject

#### 类型

* provide: `Object | () => Object`
  * `provide` 选项应该是一个对象或返回一个对象的函数,该对象包含可注入其子孙的 property
  * 在该对象中可以使用Symbols 作为 key，但是只在原生支持 `Symbol` 和 `Reflect.ownKeys` 的环境下
* inject: `Array<string> | {[key: string]: string | Symbol | Object}`
  * `inject` 选项应该是：
    * 一个字符串数组 或
    * 一个对象: 对象的 key 是<u>本地的绑定名</u>(写死的要和传递过来的一致)，value 是：
      * 在可用的注入内容中搜索用的 key (字符串或 Symbol)，或 
      * 一个对象，该对象的的:
        * `from` property 是在可用的注入内容中搜索用的 key (字符串或 Symbol)
        * `default` property 是降级情况下使用的 value



> 以上地方没理解. ????

#### 注意事项

* `provide` 和 `inject` 绑定并不是可响应的。这是刻意为之的。

* 如果你传入了一个可监听的对象，那么其对象的 property 还是可响应的



#### 详细

这对选项需要一起使用，以允许一个祖先组件向其所有子孙后代注入一个依赖，不论组件层次有多深，并在其上下游关系成立的时间里始终生效。









### 5: `$children与$parent`属性

```js
$children：所有子组件对象的数组
$parent：代表父组件对象

父组件当中可以通过$children找到所有的子组件去操作子组件的数据（当然可以找孙子组件）
子组件当中可以通过$parent找到父组件（当然可以继续找爷爷组件）操作父组件的数据


理解:
    $children: 所有直接子组件对象的数组, 利用它可以更新多个子组件的数据
    $parent: 父组件对象, 从而可以更新父组件的数据
    $refs: 包含所有有ref属性的标签对象或组件对象的容器对象
利用它们能做什么?
    能方便的得到子组件/后代组件/父组件/祖辈组件对象, 从而更新其data或调用其方法
    官方建议不要大量使用, 优先使用props和event
    在一些UI组件库定义高复用组件时会使用$children和$parent, 如Carousel组件
    
```

#### 扩展

```js
//mixin

 多个组件有部分相同的js代码
 html js  css 相同     封装组件
 单个组件js代码重复    封装函数
 不同的组件js代码重复  封装混合  
 
 实现组件之间js代码的复用  利用vue的mixin技术   参考官网
 比如多个组件的methods里面很多函数都是重复的 那么我们可以定义单独的模块去把这些相同的代码定义到外部
 export const xxxMixin = {
     methods:{
         重复的代码写在这
     }
 }
```







### 作用域插槽slot-scope

```js
命名插槽中的内容可被认作是默认值, 可以显示可以被覆盖

//作用域插槽
1.数据在父组件中
2.数据最终传递给了子组件进行vfor展示
3.子组件在展示过程中,数据的结构由父组件决定.

父组件要把需要子组件展示的数据传递给子组件
子组件在展示的过程当中，需要改变结构的数据传回给父组件
父组件再把结果和数据一并传回给子组件


什么情况下使用作用域插槽?
    父组件需要向子组件传递标签结构内容
    但决定父组件传递怎样标签结构的数据在子组件中
编码:
    
子组件:
<slot :row="item" :$index="index">  <!-- slot的属性会自动传递给父组件,传递的是一个对象 -->
</slot>
父组件:
<template slot-scope="{row, $index}">
 <span>{{$index+1}}</span> &nbsp;&nbsp;
<span :style="{color: $index%2===1 ? 'blue' : 'green'}" >{{row.text}}</span>
</template>
使用作用域插槽:
    对于封装列表之类的组件特别需要
    element-ui中: Table组件中就用到了slot-scope
```







### 7: vuex

    vuex用来统一管理多个组件共享的状态数据
    任意要进行通信的2个组件利用vuex就可以实现
        A组件触发action或mutation调用, 将数据保存到vuex的状态中
        B组件读取vuex中的state或getters数据, 得到最新保存的数据进行显示



### Vue项目优化

> https://juejin.cn/post/6844903918753808398#heading-20









# Vue开发实例

> https://juejin.cn/post/6844903632815521799 (待完成)





### 1.Vue数据更新但页面没有更新的7种情况

> https://segmentfault.com/a/1190000022772025
> 如果你发现你自己需要在 Vue 中做一次强制更新，99.9% 的情况，你错了

#### 1.1

```js
//1.Vue 无法检测实例被创建时不存在于 data 中的 property
原因：由于 Vue 会在初始化实例时对 property 执行 getter/setter 转化，所以 property 必须在 data 对象上存在才能让 Vue 将它转换为响应式的。
```





#### 1.2

```js
//2.Vue 无法检测对象 property 的添加或移除
原因：官方 - 由于 JavaScript（ES5） 的限制，Vue.js 不能检测到对象属性的添加或删除。因为 Vue.js 在初始化实例时将属性转为 getter/setter，所以属性必须在 data 对象上才能让 Vue.js 转换它，才能让它是响应的。
解决: 
 动态添加
 Vue.set(vm.obj, propertyName, newValue);
 vm.$set(vm.obj, propertyName, newValue);
 this.obj = Object.assign({}, this.obj, {a:1, b:2})
 动态移除
 Vue.delete(vm.obj, propertyName);
 vm.$delete(vm.obj, propertyName);
```



#### 1.3

```js
//3.Vue 不能检测通过数组索引直接修改一个数组项
原因：官方 - 由于 JavaScript 的限制，Vue 不能检测数组和对象的变化；尤雨溪 - 性能代价和获得用户体验不成正比。
// Vue.set
Vue.set(vm.items, indexOfItem, newValue)

// vm.$set
vm.$set(vm.items, indexOfItem, newValue)

// Array.prototype.splice  使用重写的数组的7个方法
vm.items.splice(indexOfItem, 1, newValue)

//扩展: Object.defineProperty() 可以监测数组的变化
Object.defineProperty() 可以监测数组的变化。但对数组新增一个属性（index）不会监测到数据变化，因为无法监测到新增数组的下标（index），删除一个属性（index）也是。
```



```js
var arr = [1, 2, 3, 4]
arr.forEach(function(item, index) {
    Object.defineProperty(arr, index, {
    set: function(value) {
      console.log('触发 setter')
      item = value
    },
    get: function() {
      console.log('触发 getter')
      return item
    }
  })
})
arr[1] = '123'  // 触发 setter
arr[1]          // 触发 getter 返回值为 "123"
arr[5] = 5      // 不会触发 setter 和 getter
```



#### 1.4

```js
//4.Vue 不能监测直接修改数组长度的变化
原因：官方 - 由于 JavaScript 的限制，Vue 不能检测数组和对象的变化；尤雨溪 - 性能代价和获得用户体验不成正比。

var vm = new Vue({
  data: {
    items: ['a', 'b', 'c']
  }
})
vm.items.length = 2 // 不是响应性的

//解决 数组方法
vm.items.splice(newLength)

```



#### 1.5

```js
//5.在异步更新执行之前操作 DOM 数据不会变化
原因：Vue 在更新 DOM 时是异步执行的。只要侦听到数据变化，Vue 将开启一个队列，并缓冲在同一事件循环中发生的所有数据变更。如果同一个 watcher 被多次触发，只会被推入到队列中一次。这种在缓冲时去除重复数据对于避免不必要的计算和 DOM 操作是非常重要的。然后，在下一个的事件循环“tick”中，Vue 刷新队列并执行实际 (已去重的) 工作。Vue 在内部对异步队列尝试使用原生的 Promise.then、MutationObserver 和 setImmediate，如果执行环境不支持，则会采用 setTimeout(fn, 0) 代替。


```

```js
//场景
<div id='example'>{{message}}</div>

let vm = new Vue({
  el: '$example',
  data: {
    message: '123'
  }
})

vm.message = 'new message'; //更改数据
vm.$el.textContent === 'new message'; //false
vm.$el.style.color = 'red'; //页面没有变化
```

```js
//解决方法

//场景
<div id='example'>{{message}}</div>

let vm = new Vue({
  el: '$example',
  data: {
    message: '123'
  }
})

vm.message = 'new message'; //更改数据
Vue.nextTick(function() {
  vm.$el.textContent === 'new message';
	vm.$el.style.color = 'red';
})
```

#### 1.5.1 异步更新带来的数据响应的误解

```js
<!-- 页面显示：我更新啦！ -->
<div id="example">{{message.text}}</div>
var vm = new Vue({
  el: '#example',
  data: {
    message: {},
  }
})
vm.$nextTick(function () {
  this.message = {}
  this.message.text = '我更新啦！'
})

那是因为 Vue.js 的 DOM 更新是异步的，即当 setter 操作发生后，指令并不会立马更新，指令的更新操作会有一个延迟，当指令更新真正执行的时候，此时 text 属性已经赋值，所以指令更新模板时得到的是新值。

模板中每个指令/数据绑定都有一个对应的 watcher 对象，在计算过程中它把属性记录为依赖。之后当依赖的 setter 被调用时，会触发 watcher 重新计算 ，也就会导致它的关联指令更新 DOM。
具体流程如下所示：

执行 this.message = {}; 时， setter 被调用。
Vue.js 追踪到 message 依赖的 setter 被调用后，会触发 watcher 重新计算。
this.message.text = '我更新啦！'; 对 text 属性进行赋值。
异步回调逻辑执行结束之后，就会导致它的关联指令更新 DOM，指令更新开始执行。
所以真正的触发模版更新的操作是 this.message = {};这一句引起的，因为触发了 setter，所以单看上述例子，具有响应式特性的数据只有 message 这一层，它的动态添加的属性是不具备的。
```



#### 1.6

```js
//6.循环嵌套层级太深，视图不更新？
针对上述情况有人给出的解决方案是使用强制更新：vm.$forceUpdate()
```



#### 1.7

```js
//7.拓展：路由参数变化时，页面不更新（数据不更新）
原因：路由视图组件引用了相同组件时，当路由参会变化时，会导致该组件无法更新，也就是我们常说中的页面无法更新的问题。
<div id="app">
  <ul>
    <li><router-link to="/home/foo">To Foo</router-link></li>    
    <li><router-link to="/home/baz">To Baz</router-link></li>    
    <li><router-link to="/home/bar">To Bar</router-link></li>    
  </ul>    
  <router-view></router-view>
</div>
const Home = {
  template: `<div>{{message}}</div>`,
  data() {
    return {
      message: this.$route.params.name
    }
  }
}

const router = new VueRouter({
  mode:'history',
    routes: [
    {path: '/home', component: Home },
    {path: '/home/:name', component: Home }
  ]
})

new Vue({
  el: '#app',
  router
})


上段代码中，我们在路由构建选项 routes 中配置了一个动态路由 '/home/:name'，它们共用一个路由组件 Home，这代表他们复用 RouterView
当进行路由切换时，页面只会渲染第一次路由匹配到的参数，之后再进行路由切换时，message 是没有变化的。

解决方法(多种,只列举几种常见的):
1.通过watch监视$route的变化
watch: {
  '$route': function() {
    this.message = this.$route.param.name;
  }
}

2.给<router-view>绑定key属性
给 <router-view> 绑定 key 属性，这样 Vue 就会认为这是不同的 <router-view>。
弊端：如果从 /home 跳转到 /user 等其他路由下，我们是不用担心组件更新问题的，所以这个时候 key 属性是多余的

```



### 2.如何保存页面当前的状态?

> https://www.yuque.com/cuggz/interview/hswu8g#02b671eb804c1a7a0e637fb68e91d8ac



既然是要保持页面的状态（其实也就是组件的状态），那么会出现以下两种情况：

- 前组件会被卸载
- 前组件不会被卸载

那么可以按照这两种情况分别得到以下方法：

#### 组件会被卸载

##### 将状态存储在**LocalStorage / SessionStorage**

只需要在组件即将被销毁的生命周期中在 LocalStorage / SessionStorage 中把当前组件的 state 通过 JSON.stringify() 储存下来就可以了。在这里面需要注意的是组件更新状态的时机。



缺点:

* json序列化有无法处理的数据类型
* ???

##### 路由传值



#### 组件不会卸载

##### 单页面渲染

要切换的组件作为子组件全屏渲染，父组件中正常储存页面状态



#### 其他

keep-alive


### 3.获取vue组件的实例
在JS文件中获取组件实例
* 根组件  暴露
* 单文件组件 
在单文件组件中, mounted中执行导入的'sendThis'方法传递当前实例.
在utils中的getInstance.js中, 将参数赋值给参数.

<iframe src="https://codesandbox.io/embed/gracious-firefly-54djf6?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="getVueInstance"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>




### 其他问题
> https://mp.weixin.qq.com/s/i2wR2oVn8ionY9sCkxNOjQ


### 3.简化template模板中大量的一值多判断
> https://mp.weixin.qq.com/s/0Yekkc08ozbNxuquHVGveg


### 4. 组件注册简化版
使用webpack的require方法来自动将公共组件注册到vue中,省去繁琐引入.
在这个components文件里使用require.context 动态将需要的高频组件统统打包进来。然后在main.js文件中引入global.js的文件。

类似案例 [[Tool-webpack#API]]

```js
// components/global.js

import Vue from 'vue'
function changeStr(str) {
	return str.charAt(0).toUpperCase() + str.slice(1)
}

const requireComponent = require.context('./', false, '\.vue$')
//查找同级目录下的vue结尾的组件
const install = () => {
	requireComponent.keys().forEach(fileName => {
		let config = requireComponent(fileName)
		let componentName = changeStr(
			fileName.repalce(/^\.\//, '').replace(/\.\w+$/, '')
				)
		Vue.component(componentName, config.default || config)
	})
}

export default {
	install
}

// main.js
import index from './components/global.js'
Vue.use(index)
```


### hook

**背景**
>创建一个定时器，在组件被销毁之前，这个定时器也要销毁。但是这种写法有个很明显的弊端：定时器timer的创建和清理并不是在一个地方，这样很容易导致忘记去清理！

```js
mounted() {  
  // 创建一个定时器  
    this.timer = setInterval(() => {  
      // ......  
    }, 500);  
  },  
  // 销毁这个定时器。  
  beforeDestroy() {  
    if (this.timer) {  
      clearInterval(this.timer);  
      this.timer = null;  
    }  
  }
```

使用hook对代码整合,更容易维护:
```js
mounted() {
	let timer = setInterval(() => {
		// ...
	}, 500)

	this.$once('hook:beforeDestroy', function() {
		if (timer) {
			clearInterval(timer)
			timer = null
		}
	})
}
```



### 5.生产环境下禁止`console.*`打印
不实用插件配置,直接重写方法
> [【实用】Vue线上环境禁止打印console.log\_vue线上log打印都没有是在哪配置的\_AndyHu99的博客-CSDN博客](https://blog.csdn.net/qq_42281321/article/details/125599433)

```js
// console方法
function rewriteConsole(methods = ['log']) {
	methods.forEach(method => {
		const originalMethod = console[method]
		console[method] = process.env.NODE_ENV === 'production' ? () => {} : orignalMehtod;
	})
}
```


### 6.vue中阻止重复请求
> [vue阻止重复请求 - 掘金](https://juejin.cn/post/7189231050806001719)


#### 1.定时器方案
**概述**
适用于业务简单,例如同一个按钮防止多次点击,我们可以用定时器做防抖处理
当用户连续点击多次同一个按钮,最后一次点击之后,过小段时间后才发起一次请求 **原理**:每次调用方法后都产生一个定时器,定时器结束以后再发请求,如果重复调用方法,就取消当前的定时器,创建新的定时器,等结束后再发请求,工作当中可以用第三方封装的工具函数例如`lodash`的`debounce`方法来简化防抖的代码

**代码**
lodash.debounce()
```js
<script>
// 定义请求接口
function sendPost(data){
    return axios({
        url: 'https://nodejs-cloud-studio-demo-bkzxs.nodejs-cloud-studio-demo.50185620.cn-hangzhou.fc.devsapp.net/test',
        method: 'post',
        data
    })
}


new Vue({
    el: '#app',
    methods: {
        // 调用lodash的防抖方法debounce,实现连续点击按钮多次,0.3秒后调用1次接口
        onClick: _.debounce(async function(){
            let res = await sendPost({username:'zs', age: 20})
            console.log('请求的结果', res.data)
        }, 300),
    },
})
</script>
```

vue中使用插件+计时器
```js

// 插件 extension.js
export default {
	install(Vue) {
		Vue.directive('preventReClick', {
			inserted(el, binding) {
				el.addEventListener('click', () => {
					if (!el.disabled) {
						el.disabled = true
						setTimeout(() => {
							el.disabled = false
						}, binding.value || 4000)
					}
				})
			}
		})
	}
}




```

**存在的问题**
无法解决多个按钮件的重复请求的发送问题,例如下面两种情况

1.情况1, 在点击事件上做防抖
按钮事件间是相互独立的,调用的是不同方法,做不到按钮间防抖效果

```html
<body>
    <div id="app">
        <button @click="onClick1" ref="btn1">请求1</button>
        <button @click="onClick2" ref="btn2">请求2</button>
    </div>
</body>
<script>
  
let sendPost = function(data){
    return axios({
        url: 'http://nodejs-cloud-studio-demo-bkzxs.nodejs-cloud-studio-demo.50185620.cn-hangzhou.fc.devsapp.net/test',
        method: 'post',
        data
    })
}
new Vue({
    el: '#app',
    mounted() {
        this.$refs.btn1.click()
        this.$refs.btn2.click()
    },
    methods: {
        // 使用lodash对请求方法做防抖
        //这里有问题,只是对每个按钮的点击事件单独做了防抖,但是两个按钮之间做不到防抖的效果
        onClick1: _.debounce(async function(){
            let res = await sendPost({username:'zs', age: 20})
            console.log('请求1的结果', res.data)
        }, 300),
        onClick2: _.debounce(async function(){
            let res = await sendPost({username:'zs', age: 20})
            console.log('请求2的结果', res.data)
        }, 300),
    },
})
</script>
```

2.情况2, 在接口方法上做防抖
按钮间调用的方法是相同的,是可以对方法做防抖处理,但是处理本身对方法做了一次封装,会影响到之前方法的返回值接收,需要对之前的方法做更多处理,变得更加复杂,不推荐

```html
<body>
    <div id="app">
        <button @click="onClick1" ref="btn1">请求1</button>
        <button @click="onClick2" ref="btn2">请求2</button>
    </div>
</body>
<script>
// 使用lodash对请求方法做防抖,    
let sendPost = _.debounce(function(data){
    //这里有问题,这里的返回值不能作为sendPost方法执行的返回值,因为debounce内部包裹了一层
    return axios({
        url: 'http://nodejs-cloud-studio-demo-bkzxs.nodejs-cloud-studio-demo.50185620.cn-hangzhou.fc.devsapp.net/test',
        method: 'post',
        data
    })
}, 300)
new Vue({
    el: '#app',
    mounted() {
        this.$refs.btn1.click()
        this.$refs.btn2.click()
    },
    methods: {
        onClick1: async function(){
            //这里有问题,sendPost返回值不是promise,而是undefined
            let res = await sendPost({username:'zs', age: 20})
            console.log('请求1的结果', res)
        },
        onClick2: async function(){
            let res = await sendPost({username:'zs', age: 20})
            console.log('请求2的结果', res)
        },
    },
})
</script>
```


#### 通过取消ajax请求
**概述**
直接对请求方法做处理,通过ajax库的api方法把重复的请求给取消掉

**原理**
通过调用`XMLHttpRequest`对象实例的`abort`方法把请求给取消掉
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
</body>
<script>
//原生ajax的语法    
let xhr = new XMLHttpRequest();
xhr.open("GET", "http://nodejs-cloud-studio-demo-bkzxs.nodejs-cloud-studio-demo.50185620.cn-hangzhou.fc.devsapp.net/test?username=zs&age=20", true);
xhr.onload = function(){
    console.log(xhr.responseText)
}
xhr.send();
//在谷歌浏览器的低速3g下面测试
//通过XMLHttpRequest实例的abort方法取消请求
setTimeout(() => xhr.abort(), 100);
</script>
</html>
```

**axios取消请求**
通过`axios`的`CancelToken`对象实例`cancel`方法把请求给取消掉
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script src="https://lf9-cdn-tos.bytecdntp.com/cdn/expire-1-M/axios/0.26.0/axios.min.js" type="application/javascript"></script>
</head>
<body>
</body>
<script>
/*axios的取消的语法*/
// 方式1-通过axios.CancelToken.source产生cancelToken和cancel方法
/*
const source =  axios.CancelToken.source();
axios.get('http://nodejs-cloud-studio-demo-bkzxs.nodejs-cloud-studio-demo.50185620.cn-hangzhou.fc.devsapp.net/test', {
    params: {username: 'zs', age: 20}, 
    cancelToken: source.token
}).then(res=>{
    console.log('res', res.data)
}).catch(err=>{
    console.log('err', err)
})
//在谷歌浏览器的低速3g下面测试
//通过调用source的cancel方法取消
setTimeout(() => source.cancel(), 100);
*/

/**/
// 方式2-通过new axios.CancelToken产生cancelToken和cancel方法
let cancelFn 
const cancelToken =  new axios.CancelToken(cancel=>{
    cancelFn = cancel
});
axios.get('http://nodejs-cloud-studio-demo-bkzxs.nodejs-cloud-studio-demo.50185620.cn-hangzhou.fc.devsapp.net/test', {
    params: {username: 'zs', age: 20}, 
    cancelToken: cancelToken
}).then(res=>{
    console.log('res', res.data)
}).catch(err=>{
    console.log('err', err)
})
//在谷歌浏览器的低速3g下面测试
//通过调用cancelFn方法取消
setTimeout(() => cancelFn(), 100);

</script>
</html>

```


**代码**

1.通过axios请求拦截器取消重复请求
> 通过`axios`请求拦截器,在每次请求前把请求信息和请求的取消方法放到一个map对象当中,并且判断map对象当中是否已经存在该请求信息的请求,如果存在取消上传请求


#### 通过缓存ajax结果
**概述**
直接对请求方法做处理,通过ajax库的api方法在请求之前先访问缓存列表,如果有结果那么从缓存当中获取结果,如果没有再向服务器索要数据

**代码**
步骤1-通过axios请求拦截器,设置config.adapter自定义处理请求
设置config.adapter后,请求会被拦截,不会再向服务器发请求


步骤2-定义缓存对象,在请求和响应拦截器使用缓存
定义缓存对象,提供查询和添加的方法,并且缓存需要设置大小和超时时间

```html
<body>
    <div id="app">
        <button @click="onClick1" ref="btn1">请求1</button>
        <button @click="onClick2" ref="btn2">请求2</button>
    </div>
</body>
<script>
// 缓存对象
let cache = {
    // 缓存列表
    list: [],
    // 最大缓存数
    MAX_NUM: 100,
    // 最大缓存时间
    EXPIRED_TIME: 60000,
    // 根据请求的信息(请求方式,url,请求get/post数据),产生map的key
    getRequestKey(config){
        const { method, url, params, data } = config;
        return [method, url, Qs.stringify(params), Qs.stringify(data)].join("&");
    },
    // 添加缓存结果
    add({config, data}){
        if(config.data) config.data = JSON.parse(config.data)
        let key = this.getRequestKey(config)
        let i = this.list.findIndex(t=>t.key === key)
        if(i>-1){
            // 保存请求结果
            this.list[i].data = data
            // 把结果给接口
            this.list[i].resolve(data)
        }else{
            // 添加到缓存列表中
            this.list.push({ time: Date.now(), key, data })
        }
    },
    // 查找缓存结果
    find(config){
        // 根据请求信息生成key
        let key = this.getRequestKey(config)
        let i = this.list.findIndex(t=>  t.key === key)
        // 判断缓存当中是否有该请求结果
        if(i>-1){
            let f = this.list[i]
            // 判断是否超出了最大缓存时间
            if(Date.now() - f.time > this.EXPIRED_TIME){
                // 清除该缓存
                this.list.splice(i, 1)
            }else{
                // 返回缓存
                return f
            }
        }
        // 添加缓存信息
        let t = {key, time: Date.now()}
        t.data = new Promise((resolve)=>{
            t.resolve = resolve
        })
        // 判断是否超出了最大缓存数量
        if(this.list.length === this.MAX_NUM){
            this.list.shift()
        }
        this.list.push(t)
        // 返回undefined,让请求拦截不执行config.adapter
        return undefined
    }
}   

let sendPost = function(data){
    return axios({
        url: 'http://nodejs-cloud-studio-demo-bkzxs.nodejs-cloud-studio-demo.50185620.cn-hangzhou.fc.devsapp.net/test',
        method: 'post',
        data
    })
}
axios.interceptors.request.use(async function (config) {
    let f =  cache.find(config)
    // 查看缓存当中有没有
    if(f){
        // 通过config.adapter,允许自定义处理请求
        config.adapter = function (config) {
            return new Promise((resolve) => {
                const res = {
                    status: 200,
                    statusText: 'OK',
                    headers: { 'content-type': 'application/json; charset=utf-8' },
                    config,
                    request: {}
                }
                // 判断缓存当中data是否是Promise?
                //   如果是,代表数据正在获取中
                //   如果不是代表请求已经获取过
                if(f.data instanceof Promise){
                    f.data.then(data=>{
                        resolve({ ...res, data })
                    })
                }else{
                    resolve({ ...res, data: f.data })
                }
            })
        }
    }
    return config
})
axios.interceptors.response.use(
  (response) => {
        //请求成功
        //缓存结果到缓存中
        cache.add(response)
        return response;
   }
);

new Vue({
    el: '#app',
    mounted() {
        this.$refs.btn1.click()
        this.$refs.btn2.click()
    },
    methods: {
        // 使用lodash对请求方法做防抖
        //这里有问题,只是对每个按钮的点击事件单独做了防抖,但是两个按钮之间做不到防抖的效果
        onClick1: async function(){
            let res = await sendPost({username:'zs', age: 20})
            console.log('请求1的结果', res.data)
        },
        onClick2: async function(){
            let res = await sendPost({username:'zs', age: 20})
            console.log('请求2的结果', res.data)
        },
    },
})
</script>
</html>

```


### 7.vue刷新当前页面
>[vue刷新当前页面 - 掘金](https://juejin.cn/post/7188103333440127037)

* 通过location.reload和$router.go(0)方法
* 通过空白页面
* 通过provide和inject
* 通过router-view绑定key属性

#### location.reload和$router.go(0)
通过`location.reload`和`$router.go(0)`都可以实现页面刷新,它利用浏览器刷新功能,相当于按下了`f5`键刷新页面  
**优点**:足够简单  
**缺点**:会出现页面空白,用户体验不好


#### 通过空白页面
通过`$router.replace`方法,跳转一个空白页面,然后再调回之前页面,它利用`vue-router`切换页面会把页面销毁并新建新页面的特性  
**优点**:不会出现页面空白,用户体验好  
**缺点**:地址栏会出现快速切换的过程


#### 通过provide和inject
通过在父页面的`<router-view></router-view>`上添加`v-if的控制`来销毁和重新创建页面的方式刷新页面,并且用到`provide`和`inject`实现多层级组件通信方式,父页面通过`provide`提供`reload`方法,子页面通过`inject`获取`reload`方法,调用方法做刷新  
**优点**:不会出现页面空白,地址栏会不会出现快速切换的过程,用户体验好  
**缺点**:实现稍复杂,涉及到`provide`和`inject`多层级组件间的通信,和`v-if`控制组件创建和销毁,和`$nextTick`事件循环的应用

  

#### 通过给router-view添加key属性

通过在父页面的`<router-view></router-view>`上绑定和切换`key`属性,来销毁和重新创建页面的方式刷新页面,具体的方式是指定key的值为`$route.fullPath`,通过在子页面通过`this.$router.push(this.$route.path+'?t='+Date.now())`来改变`$route.fullPath`的值,从而刷新页面

**优点**:不会出现页面空白,并且代码简单 **缺点**:地址栏出现随机参数



### 封装组件-动态表单





## Vue3

### 教程资源

[前言 | Vue3 入门指南与实战案例 (chengpeiquan.com)](https://vue3.chengpeiquan.com/)

[玩转Vue3：升级你的前端框架](https://juejin.cn/book/7051153166443741188)

[ Vue3 企业级项目实战](https://juejin.cn/book/6933939264455442444/section)

[Vue 商城项目开发实战](https://juejin.cn/book/6844733826191589390/section)

