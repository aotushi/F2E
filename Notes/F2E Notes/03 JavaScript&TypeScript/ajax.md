---
alias: ajax
---



### Ajax简介
**Asynchronous JavaScript and XML**
AJAX 全称为Asynchronous Javascript And XML，就是异步的 JS 和 XML。
通过AJAX可以在浏览器中向服务器发送异步请求，最大的优势：无刷新获取数据。
AJAX 不是新的编程语言，而是一种将现有的标准组合在一起使用的新方式。

extensible markup language 可扩展标记语言
XML 可扩展标记语言。
XML 被设计用来传输和存储数据。
XML和HTML类似，不同的是HTML中都是预定义标签，而XML中没有预定义标签，全都是自定义标签，用来表示一些数据。
已被JSON代替

**AJAX特点**
- 优点
1)	可以无需刷新页面而与服务器端进行通信。
2)	允许你根据用户事件来更新部分页面内容
- 缺点
1)	没有浏览历史，不能回退
2)	存在跨域问题
3)	SEO不友好

### 基本原理
Ajax的基本原理是通过XMLHttpRequest对象向服务器发送异步请求，获取服务器返回的数据后，利用DOM的操作来更新页面。
XMLHttpRequest是一个JavaScript对象，支持异步请求，可以及时向服务器发送请求和处理响应，并且不阻塞用户，达到不刷新页面的效果。

#### 现有方式

```
1.原生ajax
2.封装:axios jQuery
3.fetch 系统自带
```



### 使用Ajax提交form表单
在使用Ajax提交form表单时，需要对form表单进行特殊的处理，包括以下几点。
* 将form标签的action属性和method属性去掉。
* 将提交form表单按钮的type="submit"改为type="button"


以下是通过原生方式和FormData方式进行提交

<iframe src="https://codesandbox.io/embed/zealous-tess-koye9k?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="zealous-tess-koye9k"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>
   >


#### FormData注意事项

**multipart/form-data**
https://juejin.cn/post/6864189266399150088

https://juejin.cn/post/7057293668440834061




### get与post比较
Ajax请求通常会有get和post两种方式.只是发送的机制不同，主要体现在以下几点
* **参数传递**
	* get请求会将参数添加到请求URL的后面，没有请求主体，调用send()函数时，传递的参数为null.即xhr.send()
	* post请求的数据会放请求体中，用户是无法通过URL直接看到的，调用send()函数时，传递的参数为data，即xhr.send(data)。
* **服务端参数获取**
	* 使用Express作为服务端框架，get请求通过Request.query来获取参数；
	* 使用post请求时需要添加中间件，同时通过Request.body来获取参数。
* **传递的数据量**
	* get请求传输的数据量小，对于不同的浏览器有所差异，Chrome浏览器限制为8K，IE限制为2K；
	* post请求传递的数据量大，一般默认不受限制，但实际上服务器会规定post请求传递的数据量大小。
* **安全性**
	* get请求安全性较低，参数会出现在URL上，采用明文数据传输，通过浏览器缓存或者历史记录可以很容易获取到某些隐私请求的参数；
	* post请求通过请求体进行数据传输，数据不会出现在URL上，隐藏了请求数据的信息，安全性较高。
* **处理form表单的差异性**
	* form表单采用get请求时，action指定的url中的请求参数会被丢弃，提交时只会将form表单内的元素值进行拼接并向服务端传递。
	* post请求时, action指定的url中的参数会被接收



### get和post使用注意事项

* 使用get方式请求时，如果请求的url不发生改变，可能会存在缓存的问题，因此在请求的url后一般会拼接上一个时间戳，以避免出现缓存。
* 使用get方式请求时，请求的参数会拼接在url后，如果浏览器编码、服务器编码、数据库编码格式不一致，可能会导致乱码的问题。通常的做法是对请求的参数经过encodeURIComponent()函数处理。
```js
xhr.open('get', '/getUser?username='+encodeURIComponent(username), true)
```
* 使用post方式请求时，需要设置请求头中的content-type属性，表示数据在发送至服务器时的编码类型。
	* 默认情况下，使用post方式提交form表单时，content-type值为application/x-www-form-unlencoded，另外还可以支持multipart/formdata、application/json等格式
```js
xhr.setRequestHeader('content-type','application/x-www-form-urlencoded')
```



### get/post使用场景

**Ajax使用get方式的场景**
* 请求是为了检索资源，form表单的数据仅用于帮助搜索。
* 传递的数据量小，适合于url中传递参数。
* 数据安全性低，适合明文传输。

**Ajax使用post方式的场景**
* 请求会修改数据库中的资源，例如新增、修改、删除等操作。
* 传递的数据量大，超出url中携带参数长度的限制。
* 用于用户名、密码及身份证号等类似敏感信息的数据传输。

