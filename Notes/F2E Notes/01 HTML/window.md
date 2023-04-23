---
aliases: window
---

# EventTarget
通过对象执行的`EventTarget`接口可以接收events以及可能监听它们.换句话说,任何事件目标实现与接口相关的3个方法.(不知所云)

[`Element`](https://developer.mozilla.org/en-US/docs/Web/API/Element)和它的后代,及[`Document`](https://developer.mozilla.org/en-US/docs/Web/API/Document) and [`Window`](https://developer.mozilla.org/en-US/docs/Web/API/Window),,是最通常的事件目标,但是其它对象也能是事件目标.例如:  [`XMLHttpRequest`](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest), [`AudioNode`](https://developer.mozilla.org/en-US/docs/Web/API/AudioNode), 和 [`AudioContext`](https://developer.mozilla.org/en-US/docs/Web/API/AudioContext)

很多事件目标(包括元素,文档和窗口)也支持通过`onevent`属性(properties和attributes)来设置事件处理器


为什么文档中对属性一词使用了**properties和attributes**来描述
这里使用'properties and attributes'两个词是为了表示DOM元素添加事件监听器的两种方式:

1. 使用元素的事件属性(attribute):
```html
<button onclick="handleClick()">click me </button>
```
2. 使用元素的事件属性(property)
```js
const button = document.querySelector('button');
button.onclick = function() {
  handleClick();
}
```
为什么会有这两种方式?
1.兼容性: 老版本浏览器中,只支持属性(attribute)方式.property方式是新添加的.所以两种方式是为了兼容所有浏览器
2.语义: 对于某些元素来说,属性(attribute)方式语义更清晰. 例如`<a href="xxx">`更符合标准. 但对于JS交互来说, property更方便.
3.默认值:属性(attribute)可以在HTML中直接设置默认值,而property可以在JS中设置默认值.
4.权重: JS中设置的property会覆盖HTML中的设置的attribute. 这是由于property是dom元素真正的特征,而attribute只是映射到property的一种方式.


## constructor
### EventTarget()
创建一个新的`EventTarget`对象实例.


## 实例方法

### EventTarget.addEventListener()
注册在`EventTarget`上指定事件类型的事件处理器


### EventTarget.removeEventListener()
移除`EventTarget`上的事件监听器

### EventTarget.dispatchEvent()
分发事件到`EventTarget`上.






# 概况

`Window`接口表示包含一个DOM文档的窗口.这个DOM文档指向在窗口中的 [DOM document](https://developer.mozilla.org/en-US/docs/Web/API/Document).

给定文档的窗口可以通过使用`document.defaultView`属性来获取.

一个全局变量,`window`,代表脚本运行的窗口,暴露给JS代码.

在选项卡浏览器中,每个选项卡都有自己的`Window`对象. 在给定选项卡中运行的JS代码看到的全局窗口总是代表运行代码的选项卡.
那就是说,即使在选项卡浏览器中,一些属性和方法依然应用到包含选项卡的全局窗口中,例如`resizeTo`和`innerHeight`. 通常, 任何不能合理适配到选项卡上,相反会适配到窗口.


# 实例属性
这个接口从`EventTarget`接口继承属性.

请注意，作为对象的属性（例如，用于覆盖内置元素的原型）在下面的单独部分中列出。

## Window.caches
只读.


## Window.clientInformation <span style="font-size:12px;border:1px solid #ccc;border-radius: 6px;" title="This value may not be changed." class="badge inline readonly">Read only</span>
Window.navigator的别名



## Window.console <span style="font-size:12px;border:1px solid #ccc;border-radius: 6px;" title="This value may not be changed." class="badge inline readonly">Read only</span>



## Window.credentialless <span style="font-size:12px;border:1px solid #ccc;border-radius: 6px;" title="This value may not be changed." class="badge inline readonly">Read only</span>




## Window.crypto <span style="font-size:12px;border:1px solid #ccc;border-radius: 6px;" title="This value may not be changed." class="badge inline readonly">Read only</span>




## Window.customElements <span style="font-size:12px;border:1px solid #ccc;border-radius: 6px;" title="This value may not be changed." class="badge inline readonly">Read only</span>


## Window.devicePixelRatio <span style="font-size:12px;border:1px solid #ccc;border-radius: 6px;" title="This value may not be changed." class="badge inline readonly">Read only</span>


## Window.document <span style="font-size:12px;border:1px solid #ccc;border-radius: 6px;" title="This value may not be changed." class="badge inline readonly">Read only</span>


## Window.frameElement <span style="font-size:12px;border:1px solid #ccc;border-radius: 6px;" title="This value may not be changed." class="badge inline readonly">Read only</span>


## Window.frames <span style="font-size:12px;border:1px solid #ccc;border-radius: 6px;" title="This value may not be changed." class="badge inline readonly">Read only</span>


## Window.fullScreen <abbr style="background: center/contain no-repeat url(https://developer.mozilla.org/static/media/nonstandard.d6e4c7b35b5ed187e936.svg);backgruond-color:#696969;display:inline-block; width:15px;height:15px;"></abbr>


## Window.history <span style="font-size:12px;border:1px solid #ccc;border-radius: 6px;" title="This value may not be changed." class="badge inline readonly">Read only</span>



## Window.indexDB <span style="font-size:12px;border:1px solid #ccc;border-radius: 6px;" title="This value may not be changed." class="badge inline readonly">Read only</span>


## Window.innerHeight <span style="font-size:12px;border:1px solid #ccc;border-radius: 6px;" title="This value may not be changed." class="badge inline readonly">Read only</span>


## Window.innerWidth <span style="font-size:12px;border:1px solid #ccc;border-radius: 6px;" title="This value may not be changed." class="badge inline readonly">Read only</span>


## Window.isSecureContext <span style="font-size:12px;border:1px solid #ccc;border-radius: 6px;" title="This value may not be changed." class="badge inline readonly">Read only</span>

## Window.launchQueu <span style="font-size:12px;border:1px solid #ccc;border-radius: 6px;" title="This value may not be changed." class="badge inline readonly">Read only</span> <span style="display:inline-block; width:15px; height:15px; background: center/contain url(https://developer.mozilla.org/static/media/experimental.2f9e05f53c6dbee7791c.svg)"></span>



## Window.length <span style="font-size:12px;border:1px solid #ccc;border-radius: 6px;" title="This value may not be changed." class="badge inline readonly">Read only</span>


## Window.location

一些案例:

- `window.location.href` returns the href (URL) of the current page
- `window.location.hostname` returns the domain name of the web host
- `window.location.pathname` returns the path and filename of the current page
- `window.location.protocol` returns the web protocol used (http: or https:)
- `window.location.assign()` loads a new document



#### JS获取URL参数值得几种方式

> [js获取url参数值的几种方式 - 简书 (jianshu.com)](https://www.jianshu.com/p/708c915fb905)

正则方式

```js
function getQueryString(name) {
  let reg = new RegExp("(^|&)" + name +"=([^&]*)(&|$)", "i")
  let r = window.location.search.substring(1).match(reg)
  if (r !== null) {
    return decodeURIComponent(r[2])
  }
  return null;
}
```



split拆分方法

```js
// 存在的潜在问题: 如果键值对中有'='字符串
function getQueryVariable(variable) {
  let query = window.location.search.substring(1)
  let vars = query.split('&')
  for (let i=0, len=vars.length; i<len; i++) {
    let pair = vars[i].split('&')
    if (pair[0] === variable) return pair[1]
  }
}
```



### window.open




## Window.locationbar  <span style="font-size:12px;border:1px solid #ccc;border-radius: 6px;" title="This value may not be changed." class="badge inline readonly">Read only</span>



## Window.localStorage <span style="font-size:12px;border:1px solid #ccc;border-radius: 6px;" title="This value may not be changed." class="badge inline readonly">Read only</span>


## Window.menubar <span style="font-size:12px;border:1px solid #ccc;border-radius: 6px;" title="This value may not be changed." class="badge inline readonly">Read only</span>



## Window.mozInnerScreenX <span style="font-size:12px;border:1px solid #ccc;border-radius: 6px;" title="This value may not be changed." class="badge inline readonly">Read only</span> <abbr style="background: center/contain no-repeat url(https://developer.mozilla.org/static/media/nonstandard.d6e4c7b35b5ed187e936.svg);backgruond-color:#696969;display:inline-block; width:15px;height:15px;"></abbr>


## Window.name



## Window.navigation <span style="font-size:12px;border:1px solid #ccc;border-radius: 6px;" title="This value may not be changed." class="badge inline readonly">Read only</span> <span style="display:inline-block; width:15px; height:15px; background: center/contain url(https://developer.mozilla.org/static/media/experimental.2f9e05f53c6dbee7791c.svg)"></span>


## Window.navigator <span style="font-size:12px;border:1px solid #ccc;border-radius: 6px;" title="This value may not be changed." class="badge inline readonly">Read only</span> 


## Window.opener



## Window.origin <span style="font-size:12px;border:1px solid #ccc;border-radius: 6px;" title="This value may not be changed." class="badge inline readonly">Read only</span> 


## Window.outerHeight <span style="font-size:12px;border:1px solid #ccc;border-radius: 6px;" title="This value may not be changed." class="badge inline readonly">Read only</span>




## Window.outerWidth <span style="font-size:12px;border:1px solid #ccc;border-radius: 6px;" title="This value may not be changed." class="badge inline readonly">Read only</span> 



## Window.pageXOffset <span style="font-size:12px;border:1px solid #ccc;border-radius: 6px;" title="This value may not be changed." class="badge inline readonly">Read only</span>



## Window.pageYOffset <span style="font-size:12px;border:1px solid #ccc;border-radius: 6px;" title="This value may not be changed." class="badge inline readonly">Read only</span>


## Window.parent <span style="font-size:12px;border:1px solid #ccc;border-radius: 6px;" title="This value may not be changed." class="badge inline readonly">Read only</span>



## Window.performance <span style="font-size:12px;border:1px solid #ccc;border-radius: 6px;" title="This value may not be changed." class="badge inline readonly">Read only</span>



## Window.personalbar <span style="font-size:12px;border:1px solid #ccc;border-radius: 6px;" title="This value may not be changed." class="badge inline readonly">Read only</span>




## Window.scheduler <span style="font-size:12px;border:1px solid #ccc;border-radius: 6px;" title="This value may not be changed." class="badge inline readonly">Read only</span>



## Window.screen <span style="font-size:12px;border:1px solid #ccc;border-radius: 6px;" title="This value may not be changed." class="badge inline readonly">Read only</span>



## Window.screenX Window.screenLeft <span style="font-size:12px;border:1px solid #ccc;border-radius: 6px;" title="This value may not be changed." class="badge inline readonly">Read only</span>



## Window.screenY Window.screenTop <span style="font-size:12px;border:1px solid #ccc;border-radius: 6px;" title="This value may not be changed." class="badge inline readonly">Read only</span>


## Window.scrollbars <span style="font-size:12px;border:1px solid #ccc;border-radius: 6px;" title="This value may not be changed." class="badge inline readonly">Read only</span>


## Window.scrollMaxX <span style="font-size:12px;border:1px solid #ccc;border-radius: 6px;" title="This value may not be changed." class="badge inline readonly">Read only</span> <abbr style="background: center/contain no-repeat url(https://developer.mozilla.org/static/media/nonstandard.d6e4c7b35b5ed187e936.svg);backgruond-color:#696969;display:inline-block; width:15px;height:15px;"></abbr>



## Window.scrollMaxY <span style="font-size:12px;border:1px solid #ccc;border-radius: 6px;" title="This value may not be changed." class="badge inline readonly">Read only</span> <abbr style="background: center/contain no-repeat url(https://developer.mozilla.org/static/media/nonstandard.d6e4c7b35b5ed187e936.svg);backgruond-color:#696969;display:inline-block; width:15px;height:15px;"></abbr>


## Window.scrollX <span style="font-size:12px;border:1px solid #ccc;border-radius: 6px;" title="This value may not be changed." class="badge inline readonly">Read only</span>




## Window.scrollY <span style="font-size:12px;border:1px solid #ccc;border-radius: 6px;" title="This value may not be changed." class="badge inline readonly">Read only</span>



## Window.self <span style="font-size:12px;border:1px solid #ccc;border-radius: 6px;" title="This value may not be changed." class="badge inline readonly">Read only</span>





## Window.sessionStorage 


## Window.speechSynthesis <span style="font-size:12px;border:1px solid #ccc;border-radius: 6px;" title="This value may not be changed." class="badge inline readonly">Read only</span>



## window.statusbar <span style="font-size:12px;border:1px solid #ccc;border-radius: 6px;" title="This value may not be changed." class="badge inline readonly">Read only</span>


## Window.toolbar <span style="font-size:12px;border:1px solid #ccc;border-radius: 6px;" title="This value may not be changed." class="badge inline readonly">Read only</span>


## Window.top <span style="font-size:12px;border:1px solid #ccc;border-radius: 6px;" title="This value may not be changed." class="badge inline readonly">Read only</span>


## Window.visualViewport <span style="font-size:12px;border:1px solid #ccc;border-radius: 6px;" title="This value may not be changed." class="badge inline readonly">Read only</span>



## Window.window <span style="font-size:12px;border:1px solid #ccc;border-radius: 6px;" title="This value may not be changed." class="badge inline readonly">Read only</span>









# 实例方法

从EventTarget接口中继承方法


## Window.addEventListener()



## Window.atob()



## Window.alert()


## Window.blur()



## Window.btoa()




## Window.cancelAnimationFrame()

使你能取消之前通过Window.requestAnimationFrame计划的回调.


## Window.clearImmediate()



## Window.clearInterval()




## Window.clearTimeout()



## Window.close()



## Window.confirm()





## Window.createImageBitmap()



## Window.dispatchEvent()



## Window.dump() <abbr style="background: center/contain no-repeat url(https://developer.mozilla.org/static/media/nonstandard.d6e4c7b35b5ed187e936.svg);backgruond-color:#696969;display:inline-block; width:15px;height:15px;"></abbr>


## Window.fetch()


## Window.find() <abbr style="background: center/contain no-repeat url(https://developer.mozilla.org/static/media/nonstandard.d6e4c7b35b5ed187e936.svg);backgruond-color:#696969;display:inline-block; width:15px;height:15px;"></abbr>


## Window.focus()




## Window.getComputedStyle() 


## Window.getDefaultComputedStyle() <abbr style="background: center/contain no-repeat url(https://developer.mozilla.org/static/media/nonstandard.d6e4c7b35b5ed187e936.svg);backgruond-color:#696969;display:inline-block; width:15px;height:15px;"></abbr>




## Window.getSelection()



## Window.matchMedia()


## Window.moveBy()



## Window.moveTo()


## Window.open()


#### 是什么

> `Window` 接口的 **`open()`** 方法，是用指定的名称将指定的资源加载到浏览器上下文（窗口 `window` ，内嵌框架 `iframe` 或者标签 `tab` ）。如果没有指定名称，则一个新的窗口会被打开并且指定的资源会被加载进这个窗口的浏览器上下文中。



#### 语法

```js
let windowObjectReference = window.open(strUrl, strWindowName, [strWindowFeatures])
```

* strUrl    要在新打开的窗口中加载的 URL。

* strWindowName  新窗口的名称。

* strWindowFeature  一个可选参数，列出新窗口的特征 (大小，位置，滚动条等) 作为一个[`DOMString`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String)。



#### 参数与返回值

**WindowObjectReference**

打开的新窗口对象的引用。如果调用失败，返回值会是 `null`。如果父子窗口满足“[同源策略](https://developer.mozilla.org/zh-CN/docs/Web/Security/Same-origin_policy)”，你可以通过这个引用访问新窗口的属性或方法。

**strUrl**

新窗口需要载入的 url 地址。*strUrl*可以是 web 上的 html 页面也可以是图片文件或者其他任何浏览器支持的文件格式。

**strWindowName**

新窗口的名称。该字符串可以用来作为超链接 [`<a>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/a) 或表单 [`<form>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/form) 元素的目标属性值。字符串中不能含有空白字符。 <u>注意：*strWindowName* 并不是新窗口的标题。</u>

**strWindowFeatures**

可选参数。是一个字符串值，这个值列出了将要打开的窗口的一些特性 (窗口功能和工具栏) 。字符串中不能包含任何空白字符，特性之间用逗号分隔开。参考下文的[位置和尺寸特征](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/open#position_and_size_features>)。



#### 说明

`open()` 方法，创建一个新的浏览器窗口对象，如同使用文件菜单中的新窗口命令一样。

如果*strUrl* 是一个空值，那么打开的窗口将会是带有默认工具栏的空白窗口（加载`about:blank`）。

注意：调用`window.open()`方法以后，远程 URL 不会被立即载入，载入过程是异步的。（实际加载这个 URL 的时间推迟到当前脚本块执行结束之后。窗口的创建和相关资源的加载异步地进行。）





#### 其他

例如在百度首页, 在控制台中使用open来跳转

```js
open('xxx.html') //打开新窗口 地址为https://baidu.com/xxx.html

open('https://abd.html') //打开新窗口 地址为https://abd.html
```









### 页面跳转的几种方式

#### 超链接

例子

```html
<a href="https://www.baidu.com" title="点击进入百度" target="_blank">点击进入百度</a>
```

其中属性`**target**`有以下的值可供选择，`_self`是默认值，可不填。因此使用频率较高的值是`_blank`，其可以在新窗口打开页面。

| 值                                                           | 描述                                 |
| ------------------------------------------------------------ | ------------------------------------ |
| _blank                                                       | 在新窗口中打开被链接文档。           |
| _self                                                        | 默认。在相同的框架中打开被链接文档。 |
| _parent                                                      | 在父框架集中打开被链接文档。         |
| _top                                                         | 在整个窗口中打开被链接文档。         |
| [framename](https://www.w3school.com.cn/tags/att_a_target.asp) | 在指定的框架中打开被链接文档。       |



#### JS方式

通过js方式跳转页面主要依赖于window的两个属性

##### window.location

> window.location 对象可用于获取当前页面地址（URL）并把浏览器重定向到新页面。

一些案例:

- window.location.href 返回当前页面的 href (URL)

```ini
window.location.href='https://www.baidu.com'复制代码
```

- window.location.replace 用新的文档替换当前文档，没有返回功能

```javascript
window.location.replace("https://www.baidu.com")复制代码
```

- window.location.assign 加载新文档，和window.location.href没什么区别

```javascript
window.location.assign("https://www.baidu.com")
```



##### window.open

> 打开一个新的浏览器窗口或查找一个已命名的窗口。

其中window.open的第二个属性有以下的值可供选择，

- _blank - URL加载到一个新的窗口。这是默认
- _parent - URL加载到父框架
- _self - URL替换当前页面
- _top - URL替换任何可加载的框架集
- *name* - 窗口名称

需要特别注意的是，`_blank`虽然可以打开一个新窗口，但也会受到浏览器限制，可能会被浏览器拦截。



#### JS创建a标签

> 超链接打开新窗口的方式还是挺实用的，只是在有些情境下可能不太方便，比如，对某个非超链接的元素进行操作，就无法使用`_target`，而如果绑定`click`事件，执行window.open()方法，又有被浏览器拦截的风险，实在不与推荐，这种情况下，使用下面的方法可以很好得解决问题。



```html
<p @click="toPage">点击进入百度</p>

<script>
	methods: {
    // 创建超链接 不会被拦截
    createSuperLabel(url, id) {
      let a = document.createElement('a')
      a.setAttribute('href', url)
      a.setAttribute('target', '_blank')
      a.setAttribute('id', id)
      
      //防止反复添加
      if (!document.getElementById(id)) {
        documnet.body.appendChild(a)
      }
      a.click()
    },
      
    toPage() {
      let url = 'https://www.baidu.com'
      let id = 'new_a'
      this.createSuperLabel(url, id)
    }
  }
</script>
```






## Window.postMessage()




## Window.print()


## Window.prompt()



## Window.queryLocalFonts()  <span style="display:inline-block; width:15px; height:15px; background: center/contain url(https://developer.mozilla.org/static/media/experimental.2f9e05f53c6dbee7791c.svg)"></span>


## Window.removeEventListener()



## Window.reportError()



## Window.requestAnimationFrame()
### 概述

window.requestAnimationFrame（）方法告诉浏览器您希望执行一个动画，并在下次重绘之前请求浏览器调用指定的函数以更新动画。该方法将回调作为重绘前要调用的参数。
这个函数就是修改DOM样式以反映下一次重绘有什么变化的地方.
requestAnimationFrame解决了浏览器不知道JS动画什么时候开始及最佳间隔是多少的问题.同时,通过传递给回调函数的参数解决了代码何时执行的问题.


### 语法
```js
requestAnimationFrame(callback)
```

### 参数
`callback`
当你的动画需要更新时，为下一次重绘所调用的函数。该回调函数会传入 [`DOMHighResTimeStamp`](https://developer.mozilla.org/zh-CN/docs/Web/API/DOMHighResTimeStamp) 参数，该参数与 [`performance.now()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Performance/now) 的返回值相同，它表示 `requestAnimationFrame()` 开始执行回调函数的时刻。(下次重绘的时间)



### 返回值
一个 `long` 整数，请求 ID，是回调列表中唯一的标识。是个非零值，没有别的意义。你可以传这个值给 [`window.cancelAnimationFrame()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/cancelAnimationFrame) 以取消回调函数请求。

### 取消重绘
cancelAnimationFrame使用requestAnimationFrame返回ID来取消重绘
```js
let requestId = window.requestAnimationFrame(() => console.log('repaint'))
window.cancelAnimationFrame(requestId)
```

### 通过requestAnimationFrame节流
> 支持这个方法的浏览器会暴露出作为钩子的回调队列. 所谓钩子(hook),就是浏览器在执行下一次重绘之前的一个点.这个回调队列是一个可修改的函数列表,包含应该在重绘之前调用的函数.每次调用requestAnimationFrame都会在队列上推入一个回调函数.
> 通过requestAnimationFrame()递归地向队列中假如回调函数,可以保证每次重绘最多只调用一次回调函数.这是一个非常好的节流工具.在频繁执行影响页面性能的代码时(例如滚动事件监听器),可以利用这个回调队列进行节流.

例如,滚动事件的节流:
```js
//原生
function expensiveOperation() {
	console.log('invoked at', Date.now())
}
window.addEventListener('scroll', () => expensiveOperation())

//将事件处理程序的调用限制在每次重绘前
function expensiveOperation() {
	console.log('invoked at', Date.now())
}
window.addEventListener('scroll', () => {
	window.requestAnimationFrame(expensiveOperation)
})

//优化: 上面的代码会将所有回调集中在重绘钩子,不会过滤掉多余的调用.使用一个标志变量,由回调设置其开关状态,来屏蔽多余的变量
let enqueud = false

function expensiveOperation() {
	console.log('invoked at', Date.now())
	enqueud = false
}
window.addEventListener('scroll', () => {
	if (!enqueud) {
		enqueud = true
		window.requestAnimationFrame(expensiveOperation)
	}
})

//优化2: 因为重绘是非常频繁的操作,上面的算不上真正的节流.更好的方法是配合使用一个计时器来限制操作执行的频率.
let enabled = false

function expensiveOperation() {
	console.log('invoked at', Date.now())
}
window.addEventListener('scroll', () => {
	if (!enabled) {
		enabled = false
		window.requestAnimationFrame(expensiveOperation)
		window.setTimeout(() => enabled = true, 50)
	}
})
```




## Window.requestIdleCalback()



## Window.resizeBy()




## Window.resizeTo()


## Window.scroll()



## Window.scrollBy()


## Window.scrollByLines() <abbr style="background: center/contain no-repeat url(https://developer.mozilla.org/static/media/nonstandard.d6e4c7b35b5ed187e936.svg);backgruond-color:#696969;display:inline-block; width:15px;height:15px;"></abbr>



## Window.scrollByPages() <abbr style="background: center/contain no-repeat url(https://developer.mozilla.org/static/media/nonstandard.d6e4c7b35b5ed187e936.svg);backgruond-color:#696969;display:inline-block; width:15px;height:15px;"></abbr>


## Window.scrollTo()


## Window.setImmediate()


## Window.setInterval()



## Window.setTimeout()




## Window.sizeToContent() <abbr style="background: center/contain no-repeat url(https://developer.mozilla.org/static/media/nonstandard.d6e4c7b35b5ed187e936.svg);backgruond-color:#696969;display:inline-block; width:15px;height:15px;"></abbr>



## Window.showOpenFilePicker() <span style="display:inline-block; width:15px; height:15px; background: center/contain url(https://developer.mozilla.org/static/media/experimental.2f9e05f53c6dbee7791c.svg)"></span>



## Window.showSaveFilePicker() <span style="display:inline-block; width:15px; height:15px; background: center/contain url(https://developer.mozilla.org/static/media/experimental.2f9e05f53c6dbee7791c.svg)"></span>





## Window.showDirectoryPicker() <span style="display:inline-block; width:15px; height:15px; background: center/contain url(https://developer.mozilla.org/static/media/experimental.2f9e05f53c6dbee7791c.svg)"></span>



## Window.stop()



## Window.updateCommands() <abbr style="background: center/contain no-repeat url(https://developer.mozilla.org/static/media/nonstandard.d6e4c7b35b5ed187e936.svg);backgruond-color:#696969;display:inline-block; width:15px;height:15px;"></abbr>







# 事件



## DOMContentLoaded



## load

### 概述
>当整个页面已经加载完,包括依赖的资源例如样式表,脚本,iframes,和图片,`load`事件才启动.
>与DOMContentLoaded相比,它是当页面DOM加载,不用等到资源完成加载就会启动.
>load事件不能取消,不会冒泡.

### 语法
```js
addEventListener('load', (event) => {})

onload = (event) => {}
```






# 继承


# 和DOM相关页面




