### desc

> 此文档主要记录浏览器相关笔记. 例如参考现在JS教程中的"浏览器: 文档, 事件, 接口"





## 浏览器

> [浏览器的工作原理：现代网络浏览器幕后揭秘 - HTML5 Rocks](https://www.html5rocks.com/zh/tutorials/internals/howbrowserswork/)
>
> [浏览器原理 - 掘金 (juejin.cn)](https://juejin.cn/post/6844903613278470152)  这个太模糊了



### 浏览器主要组成部分

- 浏览器引擎：在用户界面和呈现引擎之间传送指令。
- 渲染引擎：负责显示请求的内容。如果请求的内容是 HTML，它就负责解析 HTML 和 CSS 内容，并将解析后的内容显示在屏幕上。
- 网络：用于网络调用，比如 HTTP 请求。其接口与平台无关，并为所有平台提供底层实现。
- JavaScript 解释器：用于解析和执行 JavaScript 代码。
- [数据存储](https://cloud.tencent.com/product/cdcs?from=10680)：浏览器需要在硬盘上保存各种数据，例如 Cookie、storage、indexdb。



### 重绘reflow vs. 重排repaint

> https://juejin.cn/post/6844904083212468238

#### 背景
>我们可以将DOM和JavaScript想象成两个岛，它们之间的连接需要通过一座桥，而JavaScript对DOM的访问就需要通过这座桥，并收取“过桥费”，随着对DOM访问次数的增加，费用也就越高，因此我们需要尽量减少“过桥”的次数，也就是减少对DOM的访问和修改，而这也是优化DOM性能的手段之一。


#### 浏览器渲染HTML过程
浏览器渲染HTML的过程大致可以分为4步

1.HTML文件被HTML解析器解析成对应的DOM树，CSS样式文件被CSS解析器解析生成对应的样式规则集。
2.DOM树与CSS样式集解析完成后，附加在一起形成一个渲染树
3.节点信息的计算，即根据渲染树计算每个节点的几何信息
4.渲染绘制，即根据计算完成的节点信息绘制整个页面

 
#### 重排

**背景**
>因为浏览器渲染页面是基于流式布局的，对某一个DOM节点信息进行修改时，就需要对该DOM结构进行重新计算。该DOM结构的修改会决定周边DOM结构的更改范围，主要分为全局范围和局部范围。
>全局范围就是从页面的根节点html标签开始，对整个渲染树进行重新计算。例如，当我们改变窗口的尺寸或者修改了根元素的字体大小时.
>局部范围只会对渲染树的某部分进行重新计算。例如要改变页面中某个div的宽度，只需要重新计算渲染树中与该div相关的部分即可。

**是什么**
重排的过程就发生在DOM节点信息修改的时候，重排实际是根据渲染树中每个渲染对象的信息，计算出各自渲染对象的几何信息，例如DOM元素的位置、尺寸、大小等，然后将其安置在界面中正确的位置。

**引起重排的操作有哪些**
* 页面首次渲染
* 浏览器窗口大小发生改变
* 元素尺寸或位置发生改变
* 元素内容发生变化
* 元素字体发生变化
* 添加或删除可见的DOM元素
* 获取某些特定的属性

**后去某些特定属性引起重排;**
>也许几行简单的JavaScript代码就会引起很多重排的操作，而频繁的重排操作会对浏览器引擎产生很大的消耗。所以浏览器不会针对每个JS操作都进行一次重排，而是维护一个会引起重排操作的队列，等队列中的操作达到了一定的数量或者到了一定的时间间隔时，浏览器才会去flush一次队列，进行真正的重排操作。
虽然浏览器会有这个优化，但我们写的一些代码可能会强制浏览器提前flush队列，例如我们获取以下这些样式信息的时候。
```js
·  oﬀsetTop, oﬀsetLeft, oﬀsetWidth, oﬀsetHeight
·  scrollTop/Left/Width/Height
·  clientTop/Left/Width/Height
·  width,height
·  调用getComputedStyle()函数
```
当我们请求以上这些属性时，浏览器为了返回最精准的信息，需要flush队列，因为队列中的某些操作可能会影响到某些值的获取。因此，即使你获取的样式信息与队列中的操作无关，浏览器仍然会强制flush队列，从而引起浏览器重排的操作。

在获取以下一些常见的属性和函数时，会引发重排的操作。
* width：宽度。
* height：高度。
* margin：外边距。
* padding：内边距。
* display：元素显示方式。
* border：边框。
* position：元素定位方式。
* overflow：元素溢出处理方式。
* clientWidth：元素可视区宽度。
* clientHeight：元素可视区高度。
* clientLeft：元素边框宽度。
* clientTop：元素边框高度。
* offsetWidth：元素水平方向占据的宽度。
* offsetHeight：元素水平方向占据的高度。
* offsetLeft：元素左外边框至父元素左内边框的距离。
* offsetTop：元素上外边框至父元素上内边框的距离。
* offsetWidth：元素水平方向占据的宽度。
* offsetHeight：元素水平方向占据的高度。
* offsetLeft：元素左外边框至父元素左内边框的距离。
* offsetTop：元素上外边框至父元素上内边框的距离。
* scrollWidth：元素内容占据的宽度。
* scrollHeight：元素内容占据的高度。
* scrollLeft：元素横向滚动的距离。
* scrollTop：元素纵向滚动的距离。
* scrollIntoView()：元素滚动至可视区的函数。
* scrollTo()：元素滚动至指定坐标的函数。
* getComputedStyle()：获取元素的CSS样式的函数。
* getBoundingClientRect()：获取元素相对于视窗的位置集合的函数。
* scrollIntoViewIfNeeded()：元素滚动至浏览器窗口可视区的函数。（非标准特性，谨慎使用）

#### 重绘
**是什么**
>重绘只是改变元素在页面中的展现样式，而不会引起元素在文档流中位置的改变。例如更改了元素的字体颜色、背景色、透明度等，浏览器均会将这些新样式赋予元素并重新绘制。

**哪些元素引起重排**
在修改某些常见的属性时，会引发重绘的操作，接下来列举出了一部分。
* color：颜色。
* border-style：边框样式。
* visibility：元素是否可见。
* background：元素背景样式，包括背景色、背景图、背景图尺寸、背景图位置等。
* text-decoration：文本装饰，包括文本加下画线、上划线、贯穿线等。
* outline：元素的外轮廓的样式，在边框外的位置。
* border-radius：边框圆角。
* box-shadow：元素的阴影。

#### 性能优化
浏览器的重排与重绘是比较消耗性能的操作，所以我们应该尽量地减少重排与重绘的操作，这也是优化网页性能的一种方式

**1.将多次改变样式的属性操作合并为一次**
假如我们需要修改一个元素的样式，如果只修改style属性，我们可以得到以下代码
```js
var changeDiv = document.querySelector('#changeDiv');
changeDiv.style.width = '100px';
changeDiv.style.background = '#e3e3e3';
changeDiv.style.height = '100px';
changeDiv.style.marginTop = '10px';

// 上面的操作多次修改了style属性，会引发多次重排与重绘的操作。我们可以将这些CSS属性合并为一个class类。
// 然后通过JavaScript直接修改元素的class类。
div.changeDiv {
    width: '100px',
    background: #e3e3e3;
    height: 100px;
    margin-top: 10px;
}

document.getElementById('changeDiv').className = 'changeDiv';
```

**2. 将需要多次重排的元素设置为绝对定位**
需要进行重排的元素都是处于正常的文档流中的，如果这个元素不处于文档流中，那么它的变化就不会影响到其他元素的变化，这样就不会引起重排的操作。常见的操作就是设置其position为absolute或者fixed。

**3. 在内存中多次操作节点，完成后再添加至文档树中**
假如我们需要实现这样一个需求：通过异步请求获取表格的数据后，将其渲染到页面上。
这个需求可以有两种实现方式，一种是每次构造一行数据的HTML片段，分多次添加到文档树中；另一种是先在内存中构建出完整的HTML片段，再一次性添加到文档树中。
接下来我们看看这两种实现方式的代码，为了简写代码，我们引入了jQuery。
方法1: 每次构造一行数据，多次添加
```js
// 将数据渲染至table
function renderTable(list) {
    // 目标table元素
    var table = $('#table');
    var rowHTML = '';
    // 遍历数据集
    list.forEach(function(item) {
        rowHTML += '<tr>';
        rowHTML += '<td>' + item.name + '</td>';
        rowHTML += '<td>' + item.address + '</td>';
        rowHTML += '<td>' + item.email + '</td>';
        rowHTML += '</tr>';
        // 每次添加一行数据
        table.append($(rowHTML));
        // 添加完后清空
        rowHTML = '';
    });
}
```

方法2: 一次性构造完整的数据，然后添加。
```js
// 将数据渲染至table
function renderTable(list) {
    // 目标table元素
    var table = $('#table');
    var allHTML = '';
    // 遍历数据集
    list.forEach(function(item) {
        allHTML += '<tr>';
        allHTML += '<td>' + item.name + '</td>';
        allHTML += '<td>' + item.address + '</td>';
        allHTML += '<td>' + item.email + '</td>';
        allHTML += '</tr>';
    });
    // 获取完整片段后,一次性渲染
    table.append($(allHTML));
}
```
上述两种方法虽然只有两行简单的代码不同，但是执行的性能却是不一样的。在方法1中每次添加一行数据时，都会引发一次浏览器重排和重绘的操作，如果表格的数据很大，则会对渲染造成很大的影响。而方法2在内存中一次性构造出完整的HTML代码段，再通过一次操作去渲染表格，这样只会引起一次浏览器重排和重绘的操作，从而带来很大的性能提升

**4.将要进行复杂处理的元素处理为display属性为none，处理完成后再进行显示**
display属性为none的元素不会出现在渲染树中，所以对其进行处理并不会引起其他元素的重排。当我们需要对一个元素做复杂处理时，可以将其display属性设置为none，操作完成后，再将其显示出来，这样就只会在隐藏和显示的时候引发两次重排操作。

**5. 将频繁获取会引起重排的属性缓存至变量**
假如我们去实现这样一个场景：在获取一个特定元素后，根据几个不同的判断条件，需要改变元素的宽度。
我们不推荐以下这种写法。
```js
// 因为在使用这种写法时，在条件都通过后，需要获取3次width属性，从而会引发3次重排的操作。
var ele = document.querySelector('#ele');
// 判断条件1
if(true) {
    ele.style.width = '200px';
}
// 判断条件2
if(true) {
    ele.style.width = '300px';
}
// 判断条件3
if(true) {
    ele.style.width = '400px';
}
```

```js
// 推荐的写法
var ele = document.querySelector('#ele');
// 先获取width属性
var width = ele.style.width;
// 判断条件1
if(true) {
    width = '200px';
}
// 判断条件2
if(true) {
    width = '300px';
}
// 判断条件3
if(true) {
    width = '400px';
}
// 最后执行一次width属性赋值
ele.style.width = width;
```
**6. 尽量减少使用table布局**
如果table中任何一个元素触发了重排的操作，那么整个table都会触发重排的操作，尤其是当一个table内容比较庞大时，更加不推荐使用table布局。
如果不得已使用了table，可以设置table-layout:auto或者是table-layout:fixed。这样可以让table一行一行地渲染，这种做法也是为了限制重排的影响范围。

**7. 使用事件委托绑定事件处理程序**

**8. 利用DocumentFragment操作DOM节点**
DocumentFragment是一个没有父级节点的最小文档对象，它可以用于存储已经排好版或者尚未确定格式的HTML片段
DocumentFragment最核心的知识点在于它不是真实DOM树的一部分，它的变化不会引起DOM树重新渲染的操作，也就不会引起浏览器重排和重绘的操作，从而带来性能上的提升。

具体应用场景:
场景：假如往页面的ul元素中添加100个li元素
我们有两种实现方法，一种是通过createElement()函数来实现，另一种是通过createDocumentFragment()函数来实现。

1.createElement()函数
通过createElement()函数创建新元素是最原始的一种方法，其代码如下。
```js
<ul id="list"></ul>
<script>
    var list = document.querySelector('#list');
    for (var i = 0; i < 100; i++) {
        var li = document.createElement('li');
        var text = document.createTextNode('节点' + i);
        li.append(text);
        list.append(li);
    }
</script>
```
list在每次append新元素li时，都会引发一次重排的操作。

2.createDocumentFragement()函数
使用DocumentFragment()函数时一般分为3步
* 创建一个新的DocumentFragment对象。
* 将待处理的元素添加至DocumentFragment对象中。
* 处理DocumentFragment对象。
```html
<script>
    var list = document.querySelector('#list2');
    // 1.创建新的DocumentFragment对象
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < 100; i++) {
        var li = document.createElement('li');
        var text = document.createTextNode('节点' + i);
        li.append(text);
        // 2.将新增的元素添加至DocumentFragment对象中
        fragment.append(li);
    }
    // 3.处理DocumentFragment对象
    list.append(fragment);
</script>
```
使用DocumentFragment()函数处理DOM元素时，只有在最终append的时候才会去真正处理真实的DOM元素，因此只会引发一次重排操作，从而提升了浏览器渲染的性能。


**重绘与重排的关系**
重排一定会引起重绘的操作，而重绘却不一定会引起重排的操作

### 浏览器如何渲染页面

> [How browsers work (taligarsiel.com)](http://taligarsiel.com/Projects/howbrowserswork1.htm)   神作?
>
> https://godbasin.github.io/2021/10/16/web-browser-render/







## 浏览器中数据存储

### 资料

> mdn
>
> https://zh.javascript.info/data-storage



> 作为 Web Storage API 的接口，**`Storage`** 提供了访问特定域名下的会话存储或本地存储的功能，例如，可以添加、修改或删除存储的数据项。
>
> 如果你想要操作一个域名的会话存储，可以使用 [`Window.sessionStorage`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/sessionStorage)；如果想要操作一个域名的本地存储，可以使用 [`Window.localStorage`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/localStorage)。

### 存储方式

- cookie

- sessionStorage

- localStorage

  注意: session后台数据存储



### cookie

#### 是什么

HTTP Cookie（也叫 Web Cookie 或浏览器 Cookie）是服务器发送到用户浏览器并保存在本地的一小块数据，它会在浏览器下次向同一服务器再发起请求时被携带并发送到服务器上。



#### 使用案例

最常见的用处之一就是身份验证：

1. 登录后，服务器在响应中使用 `Set-Cookie` HTTP-header 来设置具有唯一“会话标识符（session identifier）”的 cookie。
2. 下次当请求被发送到同一个域时，浏览器会使用 `Cookie` HTTP-header 通过网络发送 cookie。
3. 所以服务器知道是谁发起了请求。

#### 创建cookie

> 当服务器收到 HTTP 请求时，服务器可以在响应头里面添加一个 [`Set-Cookie`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Set-Cookie) 选项。浏览器收到响应后通常会保存下 Cookie，之后对该服务器每一次请求中都通过 [`Cookie`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Cookie) 请求头部将 Cookie 信息发送给服务器。



#### 步骤

##### 1.服务器设置

服务器使用 [`Set-Cookie`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Set-Cookie) 响应头部向用户代理（一般是浏览器）发送 Cookie 信息。

```javascript
Set-Cookie: <cookie名>=<cookie值>
```

服务器通过该头部告知客户端保存 Cookie 信息。

```javascript
HTTP/1.0 200 OK
Content-type: text/html
Set-Cookie: yummy_cookie=choco
Set-Cookie: tasty_cookie=strawberry

[页面内容]
```

##### 2.浏览器请求

对该服务器发起的每一次新请求，浏览器都会将之前保存的 Cookie 信息通过 [`Cookie`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Cookie) 请求头部再发送给服务器。

```javascript
GET /sample_page.html HTTP/1.1
Host: www.example.org
Cookie: yummy_cookie=choco; tasty_cookie=strawberry
```





#### 设置cookie

##### 从document.cookie中读取

`document.cookie` 的值由 `name=value` 对组成，以 `;` 分隔。每一个都是独立的 cookie。

练习:

例如从百度搜索首页获取的cookie:

```javascript
'ZD_ENTRY=google; BAIDUID=CBDFC65C746C7770C41F24D35F6379CF:FG=1; BAIDUID_BFESS=CBDFC65C746C7770C41F24D35F6379CF:FG=1; H_WISE_SIDS=107313_110085_176399_180636_188740_194519_194530_196426_197471_197711_199568_204915_206123_208721_209204_209568_210305_210321_211435_212295_212797_212869_212967_213040_213356_214109_214129_214137_214142_214395_214800_215175_215730_216518_216585_216661_216842_216883_216941_217168_218359_218445_218454_218597_219068_219155_219248_219363_219412_219452_219548_219556_219666_219716_219732_219733_219741_219942_219946_220068_220071_220090_220189_220278_220301_220335_220394_220662_220769_221015_221108_221116_221118_221120_221193_221369_221417_221433_221464_221502_221740_221824_221871_221919_221962_221972_222004_222113; rsv_i=b13f%2BPPHhd0aADTbS7g1YzSCW%2FDHQpq1h6EgVGf0O3enwr%2B%2BpKMYp47P7IPlzaAQ6lL1VYHYyltnGPQ69dEX8EOw0JOqEOo; BDSVRTM=305; BA_HECTOR=a501a1a0uqa400ag2h8mqkhl1hdsgd316'
```



##### 写入document.cookie

我们可以写入 `document.cookie`。但这不是一个数据属性，它是一个 [访问器（getter/setter）](https://zh.javascript.info/property-accessors)。对其的赋值操作会被特殊处理。

**对 `document.cookie` 的写入操作只会更新其中提到的 cookie，而不会涉及其他 cookie。**

例如，此调用设置了一个名称为 `user` 且值为 `John` 的 cookie：

```javascript
document.cookie = "user=John"; // 只会更新名称为 user 的 cookie
alert(document.cookie); // 展示所有 cookie
```

如果你运行了上面这段代码，你会看到多个 cookie。这是因为 `document.cookie=` 操作不是重写整所有 cookie。它只设置代码中提到的 cookie `user`。

从技术上讲，cookie 的名称和值可以是任何字符。为了保持有效的格式，它们应该使用内建的 `encodeURIComponent` 函数对其进行转义：

```javascript
// 特殊字符（空格），需要编码
let name = "my name";
let value = "John Smith"

// 将 cookie 编码为 my%20name=John%20Smith
document.cookie = encodeURIComponent(name) + '=' + encodeURIComponent(value);

alert(document.cookie); // ...; my%20name=John%20Smith
```

#### 限制:

- `encodeURIComponent` 编码后的 `name=value` 对，大小不能超过 4KB。因此，我们不能在一个 cookie 中保存大的东西。
- 每个域的 cookie 总数不得超过 20+ 左右，具体限制取决于浏览器。



#### cookie选项设置

Cookie 有几个选项，其中很多都很重要，应该设置它。选项被列在 `key=value` 之后，以 `;` 分隔.

##### path

- **`path=/mypath`**

url 路径前缀必须是绝对路径。它使得该路径下的页面可以访问该 cookie。默认为当前路径。

如果一个 cookie 带有 `path=/admin` 设置，那么该 cookie 在 `/admin` 和 `/admin/something` 下都是可见的，但是在 `/home` 或 `/adminpage` 下不可见。

通常，我们应该将 `path` 设置为根目录：`path=/`，以使 cookie 对此网站的所有页面可见。

##### domain

- **`domain=site.com`**

domain 控制了可访问 cookie 的域。但是在实际中，有一些限制。我们无法设置任何域。

**无法从另一个二级域访问 cookie，因此 `other.com` 永远不会收到在 `site.com` 设置的 cookie。**

这是一项安全限制，为了允许我们将敏感数据存储在应该仅在一个站点上可用的 cookie 中。

默认情况下，cookie 只有在设置的域下才能被访问到。

请注意，默认情况下，cookie 也不会共享给子域，例如 `forum.site.com`。

```javascript
// 如果我们在 site.com 网站上设置了 cookie……
document.cookie = "user=John"

// ……在 forum.site.com 域下我们无法访问它
alert(document.cookie); // 没有 user
```

如何解除限制??

为此，当在 `site.com` 设置 cookie 时，我们应该明确地将 `domain` 选项设置为根域：`domain=site.com`。那么，所有子域都可以访问到这样的 cookie。

```javascript
// 在 site.com
// 使 cookie 可以被在任何子域 *.site.com 访问：
document.cookie = "user=John; domain=site.com"

// 之后

// 在 forum.site.com
alert(document.cookie); // 有 cookie user=John
```



出于历史原因，`domain=.site.com`（`site.com` 前面有一个点符号）也以相同的方式工作，允许从子域访问 cookie。这是一个旧的表示方式，如果我们需要支持非常旧的浏览器，那么应该使用它。

总结一下，通过 `domain` 选项的设置，可以实现允许在子域访问 cookie。





##### expires / max-age

默认情况下，如果一个 cookie 没有设置这两个参数中的任何一个，那么在关闭浏览器之后，它就会消失。此类 cookie 被称为 "session cookie”。

为了让 cookie 在浏览器关闭后仍然存在，我们可以设置 `expires` 或 `max-age` 选项中的一个

- **`expires=Tue, 19 Jan 2038 03:14:07 GMT`**

cookie 的过期时间定义了浏览器会自动清除该 cookie 的时间。

日期必须完全采用 GMT 时区的这种格式。我们可以使用 `date.toUTCString` 来获取它。例如，我们可以将 cookie 设置为 1 天后过期。

例如，我们可以将 cookie 设置为 1 天后过期。

```javascript
// 当前时间 +1 天
let date = new Date(Date.now() + 86400e3);
date = date.toUTCString();
document.cookie = "user=John; expires=" + date;
```



如果我们将 `expires` 设置为过去的时间，则 cookie 会被删除。

- **`max-age=3600`**

它是 `expires` 的替代选项，指明了 cookie 的过期时间距离当前时间的秒数。

如果将其设置为 0 或负数，则 cookie 会被删除：

```javascript
// cookie 会在一小时后失效
document.cookie = "user=John; max-age=3600";

// 删除 cookie（让它立即过期）
document.cookie = "user=John; max-age=0";
```

##### secure

- **`secure`**

Cookie 应只能被通过 HTTPS 传输。

**默认情况下，如果我们在 `http://site.com` 上设置了 cookie，那么该 cookie 也会出现在 `https://site.com` 上，反之亦然。**

也就是说，cookie 是基于域的，它们不区分协议。

使用此选项，如果一个 cookie 是通过 `https://site.com` 设置的，那么它不会在相同域的 HTTP 环境下出现，例如 `http://site.com`。所以，如果一个 cookie 包含绝不应该通过未加密的 HTTP 协议发送的敏感内容，那么就应该设置 `secure` 标识。

```javascript
// 假设我们现在在 HTTPS 环境下
// 设置 cookie secure（只在 HTTPS 环境下可访问）
document.cookie = "user=John; secure";
```







##### samesite  ????

这是另外一个关于安全的特性。它旨在防止 XSRF（跨网站请求伪造）攻击。

它有两个可能的值：

- **`samesite=strict`（和没有值的 `samesite` 一样)**

如果用户来自同一网站之外，那么设置了 `samesite=strict` 的 cookie 永远不会被发送。



- **`samesite=lax`**

该方法还可以防止 XSRF 攻击，并且不会破坏用户体验。

宽松（lax）模式，和 `strict` 模式类似，当从外部来到网站，则禁止浏览器发送 cookie，但是增加了一个例外。

如果以下两个条件均成立，则会发送含 `samesite=lax` 的 cookie：



缺点：

- `samesite` 会被到 2017 年左右的旧版本浏览器忽略（不兼容）。

**因此，如果我们仅依靠 `samesite` 提供保护，那么在旧版本的浏览器上将很容易受到攻击。**



##### XSRF攻击



##### httpOnly

Web 服务器使用 `Set-Cookie` header 来设置 cookie。并且，它可以设置 `httpOnly` 选项。

这个选项禁止任何 JavaScript 访问 cookie。我们使用 `document.cookie` 看不到此类 cookie，也无法对此类 cookie 进行操作。

作用:

这是一种预防措施，用户访问了带有黑客 JavaScript 代码的页面，黑客代码将执行并通过 `document.cookie` 获取到包含用户身份验证信息的 cookie。这就很糟糕了。如果 cookie 设置了 `httpOnly`，那么 `document.cookie` 则看不到 cookie



#### cookie函数 ????

演示使用, 更多的使用各种cookie库

##### [getCookie(name)](https://zh.javascript.info/cookie#getcookiename)

获取 cookie 最简短的方式是使用 [正则表达式](https://zh.javascript.info/regular-expressions)。

`getCookie(name)` 函数返回具有给定 `name` 的 cookie：

```javascript
// 返回具有给定 name 的 cookie，
// 如果没找到，则返回 undefined
function getCookie(name) {
  let matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}
```

这里的 `new RegExp` 是动态生成的，以匹配 `; name=<value>`。

请注意 cookie 的值是经过编码的，所以 `getCookie` 使用了内建方法 `decodeURIComponent` 函数对其进行解码。

##### [setCookie(name, value, options)](https://zh.javascript.info/cookie#setcookienamevalueoptions)

将 cookie 的 `name` 设置为具有默认值 `path=/`（可以修改以添加其他默认值）和给定值 `value`：

```javascript
function setCookie(name, value, options = {}) {

  options = {
    path: '/',
    // 如果需要，可以在这里添加其他默认值
    ...options
  };

  if (options.expires instanceof Date) {
    options.expires = options.expires.toUTCString();
  }

  let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);

  for (let optionKey in options) {
    updatedCookie += "; " + optionKey;
    let optionValue = options[optionKey];
    if (optionValue !== true) {
      updatedCookie += "=" + optionValue;
    }
  }

  document.cookie = updatedCookie;
}

// 使用范例：
setCookie('user', 'John', {secure: true, 'max-age': 3600});
```

##### [deleteCookie(name)](https://zh.javascript.info/cookie#deletecookiename)

要删除一个 cookie，我们可以给它设置一个负的过期时间来调用它：

```javascript
function deleteCookie(name) {
  setCookie(name, "", {
    'max-age': -1
  })
}
```

**更新或删除必须使用相同的路径和域**

请注意：当我们更新或删除一个 cookie 时，我们应该使用和设置 cookie 时相同的路径和域选项。

代码放在：[cookie.js](https://zh.javascript.info/article/cookie/cookie.js)。

### Window.sessionStorage

#### 概述

`sessionStorage` 属性允许你访问一个，对应当前源的 session [`Storage`](https://developer.mozilla.org/zh-CN/docs/Web/API/Storage) 对象。它与 [`localStorage`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/localStorage) 相似，不同之处在于 `localStorage` 里面存储的数据没有过期时间设置，而存储在 `sessionStorage` 里面的数据在页面会话结束时会被清除。

#### 特点

- 页面会话在浏览器打开期间一直保持，并且重新加载或恢复页面仍会保持原来的页面会话。
- **在新标签或窗口打开一个页面时会复制顶级浏览会话的上下文作为新会话的上下文，**这点和 session cookies 的运行方式不同。
- 打开多个相同的 URL 的 Tabs 页面，会创建各自的 `sessionStorage`。
- 关闭对应浏览器标签或窗口，会清除对应的 `sessionStorage`



#### 语法

```javascript
// 保存数据到 sessionStorage
sessionStorage.setItem('key', 'value');

// 从 sessionStorage 获取数据
let data = sessionStorage.getItem('key');

// 从 sessionStorage 删除保存的数据
sessionStorage.removeItem('key');

// 从 sessionStorage 删除所有保存的数据
sessionStorage.clear();
```





### localStorage

##### 概述

> 只读的`localStorage` 属性允许你访问一个[`Document`](https://developer.mozilla.org/zh-CN/docs/Web/API/Document) 源（origin）的对象 [`Storage`](https://developer.mozilla.org/zh-CN/docs/Web/API/Storage)；存储的数据将保存在浏览器会话中。



##### 实例

访问当前域名下的本地Storage对象.



##### 实际使用

如何监听localStorage的变化

> * storageEvent
> * 封装localStorage

storageEvent

JavaScript原生就有一个监听localStorage变化的事件——**storage**，使用方法如下

```javascript
window.addEventListener('storage', () => {
  //callbacks
})
```

封装localStorage

代理一下对localStorage进行多一层的封装，使得我们每次在操作localStorage的时候，都会多走一层函数，而我们就可以在这一层中去执行监听的事件了，下面是简单的代码例子：

```javascript
class CommonLocalStorage {
  private storage: Storage
  constructor() {
    this.storage = window.localStorage
  }

	set(key: string, value: any) {
    //执行监听的操作
    return this.storage.setItem(`${prefix}${key}`, value)
  }

	get(key: string) {
    //执行监听的操作
    return this.storage.removeItem(`${prefix}${key}`)
  }

	clear() {
    //执行监听的操作
    this.storage.clear()
  }
}

const commonStorage = new CommonLocalStorage()

export default commonStorage
```

### 相关问题

#### localStorage与sessionStorage区别
- 相同点(5条):
  - 浏览器不能禁用
  - 纯浏览器端存储, 大小不受限制
  - 只能保存文本, 如果是对象或数组, 需要转换为JSON
  - 请求时不会自动携带
  - API相同:
    - setItem(key, value)
    - getItem(key, value)
    - removeitem(key, value)
- 不同点(1条,关闭浏览器是否会被删除):
  - localStorage保存在本地文件中, 除非编码或手动删除, 否则一直存在
  - sessonStorage数据保存在当前会话内存中, 关闭浏览器则清除



#### 区别cookie 与 localStorage和sessionStorage

- 容量:  cookie小
- 请求时是否自动携带:  cookie自动携带
- API易用性:  cookie的操作语法不方便
- 浏览器是否可禁用: cookie可禁用

#### 区别cookie与session

- cookie保存在浏览器端(前台可以操作)
- session保存在服务器端(前台不能操作)
- session依赖于cookie(session的id以cookie的形式保存在浏览器端)

#### Cookie/Session/Token区别
* cookie是解决浏览器无状态的产物, 接收保存服务器发来的信息,例如sessionId,每次发送请求都会携带cookie
* session保存的用户信息存在服务器内存或数据库中
* token是服务器加密的用户信息,服务器将token发给浏览器,浏览器用cookie或storage保存cookie,然后浏览器每次发送请求都会携带token,服务器将其解密并确认用户登录




## 深入理解浏览器缓存机制

> [深入理解浏览器的缓存机制 · Issue #23 · ljianshu/Blog (github.com)](https://github.com/ljianshu/Blog/issues/23)
>
> [深入浅出浏览器缓存机制 - 掘金 (juejin.cn)](https://juejin.cn/post/6844903757872889870)

### 前言

缓存可以说是性能优化中简单高效的一种优化方式了。一个优秀的缓存策略可以缩短网页请求资源的距离，减少延迟，并且由于缓存文件可以重复利用，还可以减少带宽，降低网络负荷。

对于一个数据请求来说，可以分为发起网络请求、后端处理、浏览器响应三个步骤。浏览器缓存可以帮助我们在第一和第三步骤中优化性能。比如说直接使用缓存而不发起请求，或者发起了请求但后端存储的数据和前端一致，那么就没有必要再将数据回传回来，这样就减少了响应数据。

![](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/1/5/1681c21e04552f77~tplv-t2oaga2asx-zoom-in-crop-mark:3024:0:0:0.awebp)

### 缓存位置

从缓存位置上来说分为四种，并且各自有优先级，当依次查找缓存且都没有命中的时候，才会去请求网络。

- Service Worker
- Memory Cache
- Disk Cache
- Push Cache



#### 1.Service Worker

Service Worker 是运行在浏览器背后的独立线程，一般可以用来实现缓存功能。使用 Service Worker的话，传输协议必须为 HTTPS。因为 Service Worker 中涉及到请求拦截，所以必须使用 HTTPS 协议来保障安全。**Service Worker 的缓存与浏览器其他内建的缓存机制不同，它可以让我们自由控制缓存哪些文件、如何匹配缓存、如何读取缓存，并且缓存是持续性的**。

Service Worker 实现缓存功能一般分为三个步骤：首先需要先注册 Service Worker，然后监听到 install 事件以后就可以缓存需要的文件，那么在下次用户访问的时候就可以通过拦截请求的方式查询是否存在缓存，存在缓存的话就可以直接读取缓存文件，否则就去请求数据。

当 Service Worker 没有命中缓存的时候，我们需要去调用 fetch 函数获取数据。也就是说，如果我们没有在 Service Worker 命中缓存的话，会根据缓存查找优先级去查找数据。但是不管我们是从 Memory Cache 中还是从网络请求中获取的数据，浏览器都会显示我们是从 Service Worker 中获取的内容。

#### 2.Memory Cache

Memory Cache 也就是内存中的缓存，主要包含的是当前中页面中已经抓取到的资源,例如页面上已经下载的样式、脚本、图片等。读取内存中的数据肯定比磁盘快,内存缓存虽然读取高效，可是缓存持续性很短，会随着进程的释放而释放。 **一旦我们关闭 Tab 页面，内存中的缓存也就被释放了**。

**那么既然内存缓存这么高效，我们是不是能让数据都存放在内存中呢？**
 这是不可能的。计算机中的内存一定比硬盘容量小得多，操作系统需要精打细算内存的使用，所以能让我们使用的内存必然不多。

当我们访问过页面以后，再次刷新页面，可以发现很多数据都来自于内存缓存

![img](https:////upload-images.jianshu.io/upload_images/3174701-2fb1b19cf0d91709?imageMogr2/auto-orient/strip|imageView2/2/w/880/format/webp)

image

内存缓存中有一块重要的缓存资源是preloader相关指令（例如`<link rel="prefetch">`）下载的资源。总所周知preloader的相关指令已经是页面优化的常见手段之一，它可以一边解析js/css文件，一边网络请求下一个资源。

需要注意的事情是，**内存缓存在缓存资源时并不关心返回资源的HTTP缓存头Cache-Control是什么值，同时资源的匹配也并非仅仅是对URL做匹配，还可能会对Content-Type，CORS等其他特征做校验**。

#### 3.Disk Cache

Disk Cache 也就是存储在硬盘中的缓存，读取速度慢点，但是什么都能存储到磁盘中，**比之 Memory Cache 胜在容量和存储时效性上**。

在所有浏览器缓存中，Disk Cache 覆盖面基本是最大的。它会根据 HTTP Herder 中的字段判断哪些资源需要缓存，哪些资源可以不请求直接使用，哪些资源已经过期需要重新请求。并且即使在跨站点的情况下，相同地址的资源一旦被硬盘缓存下来，就不会再次去请求数据。绝大部分的缓存都来自 Disk Cache，关于 HTTP 的协议头中的缓存字段，我们会在下文进行详细介绍。

**浏览器会把哪些文件丢进内存中？哪些丢进硬盘中？**
 关于这点，网上说法不一，不过以下观点比较靠得住：

- 对于大文件来说，大概率是不存储在内存中的，反之优先
- 当前系统内存使用率高的话，文件优先存储进硬盘

#### 4.Push Cache

Push Cache（推送缓存）是 HTTP/2 中的内容，当以上三种缓存都没有命中时，它才会被使用。**它只在会话（Session）中存在，一旦会话结束就被释放，并且缓存时间也很短暂**，在Chrome浏览器中只有5分钟左右，同时它也并非严格执行HTTP头中的缓存指令。

Push Cache 在国内能够查到的资料很少，也是因为 HTTP/2 在国内不够普及。这里推荐阅读`Jake Archibald`的 [HTTP/2 push is tougher than I thought](https://links.jianshu.com/go?to=https%3A%2F%2Fjakearchibald.com%2F2017%2Fh2-push-tougher-than-i-thought%2F) 这篇文章，文章中的几个结论：

- 所有的资源都能被推送，并且能够被缓存,但是 Edge 和 Safari 浏览器支持相对比较差
- 可以推送 no-cache 和 no-store 的资源
- 一旦连接被关闭，Push Cache 就被释放
- 多个页面可以使用同一个HTTP/2的连接，也就可以使用同一个Push Cache。这主要还是依赖浏览器的实现而定，出于对性能的考虑，有的浏览器会对相同域名但不同的tab标签使用同一个HTTP连接。
- Push Cache 中的缓存只能被使用一次
- 浏览器可以拒绝接受已经存在的资源推送
- 你可以给其他域名推送资源

如果以上四种缓存都没有命中的话，那么只能发起请求来获取资源了。

那么为了性能上的考虑，大部分的接口都应该选择好缓存策略，**通常浏览器缓存策略分为两种：强缓存和协商缓存，并且缓存策略都是通过设置 HTTP Header 来实现的**。





### 缓存过程分析

浏览器与服务器通信的方式为应答模式，即是：浏览器发起HTTP请求 – 服务器响应该请求，**那么浏览器怎么确定一个资源该不该缓存，如何去缓存呢**？浏览器第一次向服务器发起该请求后拿到请求结果后，将请求结果和缓存标识存入浏览器缓存，**浏览器对于缓存的处理是根据第一次请求资源时返回的响应头来确定的**。具体过程如下图：



![](https://upload-images.jianshu.io/upload_images/3174701-de3d6e025582103a?imageMogr2/auto-orient/strip|imageView2/2/w/670/format/webp)



由上图我们可以知道：

- 浏览器每次发起请求，都会先在浏览器缓存中查找该请求的结果以及缓存标识
- 浏览器每次拿到返回的请求结果都会将该结果和缓存标识存入浏览器缓存中

以上两点结论就是浏览器缓存机制的关键，它确保了每个请求的缓存存入与读取，只要我们再理解浏览器缓存的使用规则，那么所有的问题就迎刃而解了，本文也将围绕着这点进行详细分析。为了方便大家理解，这里我们根据是否需要向服务器重新发起HTTP请求将缓存过程分为两个部分，分别是强缓存和协商缓存。



### 强缓存

**强缓存：不会向服务器发送请求，直接从缓存中读取资源，在chrome控制台的Network选项中可以看到该请求返回200的状态码，并且Size显示from disk cache或from memory cache。强缓存可以通过设置两种 HTTP Header 实现：Expires 和 Cache-Control。**

#### 1.Expires

**缓存过期时间，用来指定资源到期的时间，是服务器端的具体的时间点**。也就是说，Expires=max-age + 请求时间，需要和Last-modified结合使用。Expires是Web服务器响应消息头字段，在响应http请求时告诉浏览器在过期时间前浏览器可以直接从浏览器缓存取数据，而无需再次请求。

**Expires 是 HTTP/1 的产物，受限于本地时间，如果修改了本地时间，可能会造成缓存失效**。`Expires: Wed, 22 Oct 2018 08:41:00 GMT`表示资源会在 Wed, 22 Oct 2018 08:41:00 GMT 后过期，需要再次请求。

#### 2.Cache-Control

在HTTP/1.1中，Cache-Control是最重要的规则，主要用于控制网页缓存。比如当`Cache-Control:max-age=300`时，则代表在这个请求正确返回时间（浏览器也会记录下来）的5分钟内再次加载资源，就会命中强缓存。

Cache-Control 可以在请求头或者响应头中设置，并且可以组合使用多种指令：

| 指令         | 作用                                                   |
| ------------ | ------------------------------------------------------ |
| public       | 表示响应可以被客户端和代理服务器缓存                   |
| private      | 表示响应只可以被客户端缓存                             |
| max-age=30   | 缓存30秒后就过期,需要重新请求                          |
| s-maxage=30  | 覆盖max-age,作用一样,只在代理服务器中生效              |
| no-store     | 不缓存任何响应                                         |
| no-cache     | 资源被缓存,但是立即生效,下次会发起请求验证资源是否过期 |
| max-stale=30 | 30秒内,即使缓存过期,也使用该缓存                       |
| min-fresh=30 | 希望在30秒内获取最新的响应                             |

![](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/1/3/1681467d825b2ebe~tplv-t2oaga2asx-zoom-in-crop-mark:3024:0:0:0.awebp)

**public**：**所有内容都将被缓存（客户端和代理服务器都可缓存）**。具体来说响应可被任何中间节点缓存，如 Browser <-- proxy1 <-- proxy2 <-- Server，中间的proxy可以缓存资源，比如下次再请求同一资源proxy1直接把自己缓存的东西给 Browser 而不再向proxy2要。

**private**：**所有内容只有客户端可以缓存**，Cache-Control的默认取值。具体来说，表示中间节点不允许缓存，对于Browser <-- proxy1 <-- proxy2 <-- Server，proxy 会老老实实把Server 返回的数据发送给proxy1,自己不缓存任何数据。当下次Browser再次请求时proxy会做好请求转发而不是自作主张给自己缓存的数据。

**no-cache**：客户端缓存内容，是否使用缓存则需要经过协商缓存来验证决定。表示不使用 Cache-Control的缓存控制方式做前置验证，而是使用 Etag 或者Last-Modified字段来控制缓存。**需要注意的是，no-cache这个名字有一点误导。设置了no-cache之后，并不是说浏览器就不再缓存数据，只是浏览器在使用缓存数据时，需要先确认一下数据是否还跟服务器保持一致。**

**no-store**：所有内容都不会被缓存，即不使用强制缓存，也不使用协商缓存

**max-age**：max-age=xxx (xxx is numeric)表示缓存内容将在xxx秒后失效

**s-maxage**（单位为s)：同max-age作用一样，只在代理服务器中生效（比如CDN缓存）。比如当s-maxage=60时，在这60秒中，即使更新了CDN的内容，浏览器也不会进行请求。max-age用于普通缓存，而s-maxage用于代理缓存。**s-maxage的优先级高于max-age**。如果存在s-maxage，则会覆盖掉max-age和Expires header。

**max-stale**：能容忍的最大过期时间。max-stale指令标示了客户端愿意接收一个已经过期了的响应。如果指定了max-stale的值，则最大容忍时间为对应的秒数。如果没有指定，那么说明浏览器愿意接收任何age的响应（age表示响应由源站生成或确认的时间与当前时间的差值）。

**min-fresh**：能够容忍的最小新鲜度。min-fresh标示了客户端不愿意接受新鲜度不多于当前的age加上min-fresh设定的时间之和的响应。

![](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2018/5/20/1637d0bbd6da114f~tplv-t2oaga2asx-zoom-in-crop-mark:3024:0:0:0.awebp)



从图中我们可以看到，我们可以将多个指令配合起来一起使用，达到多个目的。比如说我们希望资源能被缓存下来，并且是客户端和代理服务器都能缓存，还能设置缓存失效时间等等。

#### 3.Expires和Cache-Control两者对比

其实这两者差别不大，区别就在于 Expires 是http1.0的产物，Cache-Control是http1.1的产物，**两者同时存在的话，Cache-Control优先级高于Expires**；在某些不支持HTTP1.1的环境下，Expires就会发挥用处。所以Expires其实是过时的产物，现阶段它的存在只是一种兼容性的写法。 强缓存判断是否缓存的依据来自于是否超出某个时间或者某个时间段，而不关心服务器端文件是否已经更新，这可能会导致加载文件不是服务器端最新的内容，**那我们如何获知服务器端内容是否已经发生了更新呢**？此时我们需要用到协商缓存策略。





### 协商缓存

**协商缓存就是强制缓存失效后，浏览器携带缓存标识向服务器发起请求，由服务器根据缓存标识决定是否使用缓存的过程，主要有以下两种情况**：

协商缓存生效，返回304和Not Modified

![](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2018/5/20/1637d0bbd6cd702d~tplv-t2oaga2asx-zoom-in-crop-mark:3024:0:0:0.awebp)



- 协商缓存失效，返回200和请求结果

![](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2018/5/20/1637d0bbda96ac60~tplv-t2oaga2asx-zoom-in-crop-mark:3024:0:0:0.awebp)

协商缓存可以通过设置两种 HTTP Header 实现：Last-Modified 和 ETag 。

#### 1.Last-Modified和If-Modified-Since

浏览器在第一次访问资源时，服务器返回资源的同时，在response header中添加 Last-Modified的header，值是这个资源在服务器上的最后修改时间，浏览器接收后缓存文件和header；

```yaml
Last-Modified: Fri, 22 Jul 2016 01:47:00 GMT
```

浏览器下一次请求这个资源，浏览器检测到有 Last-Modified这个header，于是添加If-Modified-Since这个header，值就是Last-Modified中的值；服务器再次收到这个资源请求，会根据 If-Modified-Since 中的值与服务器中这个资源的最后修改时间对比，如果没有变化，返回304和空的响应体，直接从缓存读取，如果If-Modified-Since的时间小于服务器中这个资源的最后修改时间，说明文件有更新，于是返回新的资源文件和200

![](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/1/4/16814782b5e34670~tplv-t2oaga2asx-zoom-in-crop-mark:3024:0:0:0.awebp)

#### 但是 Last-Modified 存在一些弊端：

- 如果本地打开缓存文件，即使没有对文件进行修改，但还是会造成 Last-Modified 被修改，服务端不能命中缓存导致发送相同的资源
- 因为 Last-Modified 只能以秒计时，如果在不可感知的时间内修改完成文件，那么服务端会认为资源还是命中了，不会返回正确的资源

既然根据文件修改时间来决定是否缓存尚有不足，能否可以直接根据文件内容是否修改来决定缓存策略？所以在 HTTP / 1.1 出现了 `ETag` 和`If-None-Match`

#### 2.ETag和If-None-Match

**Etag是服务器响应请求时，返回当前资源文件的一个唯一标识(由服务器生成)，只要资源有变化，Etag就会重新生成**。浏览器在下一次加载资源向服务器发送请求时，会将上一次返回的Etag值放到request header里的If-None-Match里，服务器只需要比较客户端传来的If-None-Match跟自己服务器上该资源的ETag是否一致，就能很好地判断资源相对客户端而言是否被修改过了。如果服务器发现ETag匹配不上，那么直接以常规GET 200回包形式将新的资源（当然也包括了新的ETag）发给客户端；如果ETag是一致的，则直接返回304知会客户端直接使用本地缓存即可。

![](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/1/4/168196be6f2b9438~tplv-t2oaga2asx-zoom-in-crop-mark:3024:0:0:0.awebp)



#### 3.两者之间对比：

- 首先在精确度上，Etag要优于Last-Modified。

Last-Modified的时间单位是秒，如果某个文件在1秒内改变了多次，那么他们的Last-Modified其实并没有体现出来修改，但是Etag每次都会改变确保了精度；如果是负载均衡的服务器，各个服务器生成的Last-Modified也有可能不一致。

- 第二在性能上，Etag要逊于Last-Modified，毕竟Last-Modified只需要记录时间，而Etag需要服务器通过算法来计算出一个hash值。
- 第三在优先级上，服务器校验优先考虑Etag



### 缓存机制

**强制缓存优先于协商缓存进行，若强制缓存(Expires和Cache-Control)生效则直接使用缓存，若不生效则进行协商缓存(Last-Modified / If-Modified-Since和Etag / If-None-Match)，协商缓存由服务器决定是否使用缓存，若协商缓存失效，那么代表该请求的缓存失效，返回200，重新返回资源和缓存标识，再存入浏览器缓存中；生效则返回304，继续使用缓存**。具体流程图如下：

![](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/1/4/1681964d963c5a86~tplv-t2oaga2asx-zoom-in-crop-mark:3024:0:0:0.awebp)

### 实际场景应用缓存策略

#### 1.频繁变动的资源

> Cache-Control: no-cache

对于频繁变动的资源，首先需要使用`Cache-Control: no-cache` 使浏览器每次都请求服务器，然后配合 ETag 或者 Last-Modified 来验证资源是否有效。这样的做法虽然不能节省请求数量，但是能显著减少响应数据大小。

#### 2.不常变化的资源

> Cache-Control: max-age=31536000

通常在处理这类资源时，给它们的 Cache-Control 配置一个很大的 `max-age=31536000` (一年)，这样浏览器之后请求相同的 URL 会命中强制缓存。而为了解决更新的问题，就需要在文件名(或者路径)中添加 hash， 版本号等动态字符，之后更改动态字符，从而达到更改引用 URL 的目的，让之前的强制缓存失效 (其实并未立即失效，只是不再使用了而已)。 在线提供的类库 (如 `jquery-3.3.1.min.js`, `lodash.min.js` 等) 均采用这个模式。

### 用户行为对浏览器缓存的影响

所谓用户行为对浏览器缓存的影响，指的就是用户在浏览器如何操作时，会触发怎样的缓存策略。主要有 3 种：

- 打开网页，地址栏输入地址： 查找 disk cache 中是否有匹配。如有则使用；如没有则发送网络请求。
- 普通刷新 (F5)：因为 TAB 并没有关闭，因此 memory cache 是可用的，会被优先使用(如果匹配的话)。其次才是 disk cache。
- 强制刷新 (Ctrl + F5)：浏览器不使用缓存，因此发送的请求头部均带有 `Cache-control: no-cache`(为了兼容，还带了 `Pragma: no-cache`),服务器直接返回 200 和最新内容。













## 浏览器相关

> [浏览器相关原理(面试题)详细总结一 - 掘金 (juejin.cn)](https://juejin.cn/post/6844903962216824839#heading-10)
>
> [浏览器相关原理(面试题)详细总结二 - 掘金 (juejin.cn)](https://juejin.cn/post/6844903969693646862#heading-1)

### 1.Chrome打开一个页面需要启动多少进程?分别有哪些进程?

浏览器从关闭状态进行启动，然后新开 1 个页面至少需要 1 个网络进程、1 个浏览器进程、1 个 GPU 进程以及 1 个渲染进程，共 4 个进程；后续再新开标签页，浏览器、网络进程、GPU进程是共享的，不会重新启动，如果2个页面属于同一站点的话，并且从a页面中打开的b页面，那么他们也会共用一个渲染进程，否则新开一个渲染进程。

最新的 Chrome 浏览器包括：1 个浏览器（Browser）主进程、1 个 GPU 进程、1 个网络（NetWork）进程、多个渲染进程和多个插件进程。

| 名称       | 定义                                                         |
| ---------- | ------------------------------------------------------------ |
| 浏览器进程 | 主要负责界面显示、用户交互、子进程管理，同时提供存储等功能   |
| 渲染进程   | 核心任务是将 HTML、CSS 和 JavaScript 转换为用户可以与之交互的网页，排版引擎 Blink 和 JavaScript 引擎 V8 都是运行在该进程中，默认情况下，Chrome 会为每个 Tab 标签创建一个渲染进程。出于安全考虑，渲染进程都是运行在沙箱模式下。 |
| GPU进程    | Chrome 刚开始发布的时候是没有 GPU 进程的。而 GPU 的使用初衷是为了实现 3D CSS 的效果，只是随后网页、Chrome 的 UI 界面都选择采用 GPU 来绘制，这使得 GPU 成为浏览器普遍的需求。最后，Chrome 在其多进程架构上也引入了 GPU 进程 |
| 网络进程   | 主要负责页面的网络资源加载，之前是作为一个模块运行在浏览器进程里面的，直至最近才独立出来，成为一个单独的进程 |
| 插件进程   | 主要是负责插件的运行，因插件易崩溃，所以需要通过插件进程来隔离，以保证插件进程崩溃不会对浏览器和页面造成影响 |



### 2.如何保证页面文件能被完成送达浏览器

#### 背景

互联网中的数据是通过数据包来传输的。数据包要在互联网上进行传输，就要符合网际协议(IP)，互联网上不同的在线设备都有唯一的地址，地址只是一个数字，只要知道这个具体的地址，就可以往这里发送信息。

如果要想把一个数据包从主机 A 发送给主机 B，那么在传输之前，数据包上会被附加上主机 B 的 IP 地址信息，这样在传输过程中才能正确寻址。额外地，数据包上还会附加上主机 A 本身的 IP 地址，有了这些信息主机 B 才可以回复信息给主机 A。这些附加的信息会被装进一个叫 IP 头的数据结构里。IP 头是 IP 数据包开头的信息，包含 IP 版本、源 IP 地址、目标 IP 地址、生存时间等信息。

IP 是非常底层的协议，只负责把数据包传送到对方电脑，但是对方电脑并不知道把数据包交给哪个程序，是交给浏览器还是交给王者荣耀？因此，需要基于 IP 之上开发能和应用打交道的协议，最常见的是`用户数据包协议（User Datagram Protocol)，简称UDP`和`传输控制协议（Transmission Control Protocol）,简称TCP`.



#### 传输过程

1.上层将数据包交给传输层

2.传输层会在数据包前面加上`UDP`头, 组成新的UDP数据包,再将新的UDP数据包交给网络层

3.网络层再将IP头附加到数据包上,组成新的IP数据包,并交给底层

4.数据包被传输到主机B的网络层,在这里主机B拆开IP头信息,并将拆开来的数据包交给传输层

5.在传输层,数据包中的UDP头会被拆开,并根据UDP中所提供的端口号,把数据部分交给上层的应用程序

6.最终,数据包就发送到主机B上层的应用程序这里



### 3.UCP和TCP的区别

* TCP协议在传送数据段的时候要给段标号；UDP协议不

* TCP协议可靠；UDP协议不可靠

* TCP协议是面向连接；UDP协议采用无连接

* TCP协议负载较高，采用虚电路；UDP采用无连接

* TCP协议的发送方要确认接收方是否收到数据段（3次握手协议）

* TCP协议采用窗口技术和流控制

### 4.TCP传输的详细过程

#### 4.1 进行3次握手,尽力TCP连接

#### 4.2 发送HTTP请求,服务器处理请求,返回响应结果

#### 4.3 关闭TCP连接




### 5.站点第二次打开的速度会快很多?

主要原因是第一次加载页面过程中，缓存了一些耗时的数据。 那么，哪些数据会被缓存呢？

#### 5.1 DNS缓存

在浏览器本地把对应的 IP 和域名关联起来，这样在进行DNS解析的时候就很快

#### 5.2 MemoryCache

是指存在内存中的缓存。从优先级上来说，它是浏览器最先尝试去命中的一种缓存。从效率上来说，它是响应速度最快的一种缓存。 内存缓存是快的，也是“短命”的。它和渲染进程“生死相依”，当进程结束后，也就是 tab 关闭以后，内存里的数据也将不复存在。

#### 5.3 浏览器缓存

浏览器缓存，也称Http缓存，分为强缓存和协商缓存。优先级较高的是强缓存，在命中强缓存失败的情况下，才会走协商缓存。

**强缓存**

`强缓存`是利用 http 头中的 `Expires` 和 `Cache-Control` 两个字段来控制的。强缓存中，当请求再次发出时，浏览器会根据其中的 expires 和 cache-control 判断目标资源是否“命中”强缓存，若命中则直接从缓存中获取资源，不会再与服务端发生通信。

实现强缓存，过去我们一直用expires。当服务器返回响应时，在 Response Headers 中将过期时间写入 expires 字段。像这样

```javascript
expires: Wed, 12 Sep 2019 06:12:18 GMT
```

可以看到，expires 是一个时间戳，接下来如果我们试图再次向服务器请求资源，浏览器就会先对比本地时间和 expires 的时间戳，如果本地时间小于 expires 设定的过期时间，那么就直接去缓存中取这个资源。

从这样的描述中大家也不难猜测，expires 是有问题的，它最大的问题在于对“本地时间”的依赖。如果服务端和客户端的时间设置可能不同，或者我直接手动去把客户端的时间改掉，那么 expires 将无法达到我们的预期。

考虑到 expires 的局限性，HTTP1.1 新增了`Cache-Control`字段来完成 expires 的任务。expires 能做的事情，Cache-Control 都能做；expires 完成不了的事情，Cache-Control 也能做。因此，Cache-Control 可以视作是 expires 的完全替代方案。在当下的前端实践里，我们继续使用 expires 的唯一目的就是向下兼容.

```javascript
cache-control: max-age=31536000
```

在 Cache-Control 中，我们通过max-age来控制资源的有效期。max-age 不是一个时间戳，而是一个时间长度。在本例中，max-age 是 31536000 秒，它意味着该资源在 31536000 秒以内都是有效的，完美地规避了时间戳带来的潜在问题。

Cache-Control 相对于 expires 更加准确，它的优先级也更高。当 Cache-Control 与 expires 同时出现时，我们以 Cache-Control 为准。

**协商缓存**

协商缓存依赖于服务端与浏览器之间的通信。协商缓存机制下，浏览器需要向服务器去询问缓存的相关信息，进而判断是重新发起请求、下载完整的响应，还是从本地获取缓存的资源。如果服务端提示缓存资源未改动（Not Modified），资源会被重定向到浏览器缓存，<u>这种情况下网络请求对应的状态码是 304。</u>

协商缓存的实现,从 `Last-Modified` 到 `Etag`,Last-Modified 是一个时间戳，如果我们启用了协商缓存，它会在首次请求时随着 Response Headers 返回：

```javascript
Last-Modified: Fri, 27 Oct 2017 06:35:57 GMT
```

随后我们每次请求时，会带上一个叫 If-Modified-Since 的时间戳字段，它的值正是上一次 response 返回给它的 last-modified 值：

```javascript
If-Modified-Since: Fri, 27 Oct 2017 06:35:57 GMT
```

服务器接收到这个时间戳后，会比对该时间戳和资源在服务器上的最后修改时间是否一致，从而判断资源是否发生了变化。如果发生了变化，就会返回一个完整的响应内容，并在 Response Headers 中添加新的 Last-Modified 值；否则，返回如上图的 304 响应，Response Headers 不会再添加 Last-Modified 字段。

使用Last-Modified 存在一些弊端，这其中最常见的就是这样两个场景:

* 我们编辑了文件，但文件的内容没有改变。服务端并不清楚我们是否真正改变了文件，它仍然通过最后编辑时间进行判断。因此这个资源在再次被请求时，会被当做新资源，进而引发一次完整的响应——不该重新请求的时候，也会重新请求
* 当我们修改文件的速度过快时（比如花了 100ms 完成了改动），由于 If-Modified-Since 只能检查到以秒为最小计量单位的时间差，所以它是感知不到这个改动的——该重新请求的时候，反而没有重新请求了

这两个场景其实指向了同一个 bug——服务器并没有正确感知文件的变化。为了解决这样的问题，`Etag 作为 Last-Modified 的补充出现了。`

`Etag` 是由服务器为每个资源生成的唯一的标识字符串，这个标识字符串可以是基于文件内容编码的，只要文件内容不同，它们对应的 Etag 就是不同的，反之亦然。因此 Etag 能够精准地感知文件的变化。

Etag 的生成过程需要服务器额外付出开销，会影响服务端的性能，这是它的弊端。因此启用 Etag 需要我们审时度势。正如我们刚刚所提到的——Etag 并不能替代 Last-Modified，它只能作为 Last-Modified 的补充和强化存在。

Etag 在感知文件变化上比 Last-Modified 更加准确，优先级也更高。当 Etag 和 Last-Modified 同时存在时，以 Etag 为准。

#### 5.4 Service Worker Cache

Service Worker 是一种独立于主线程之外的 Javascript 线程。它脱离于浏览器窗体，因此无法直接访问 DOM。这样独立的个性使得 Service Worker 的“个人行为”无法干扰页面的性能，这个“幕后工作者”可以帮我们实现离线缓存、消息推送和网络代理等功能。我们借助 Service worker 实现的离线缓存就称为 Service Worker Cache。

Service Worker 的生命周期包括 install、active、working 三个阶段。一旦 Service Worker 被 install，它将始终存在，只会在 active 与 working 之间切换，除非我们主动终止它。这是它可以用来实现离线存储的重要先决条件.



#### 5.5 Push Cache

ush Cache 是指 HTTP2 在 server push 阶段存在的缓存。这块的知识比较新，应用也还处于萌芽阶段，应用范围有限不代表不重要——HTTP2 是趋势、是未来。在它还未被推而广之的此时此刻，我仍希望大家能对 Push Cache 的关键特性有所了解：

Push Cache 是缓存的最后一道防线。浏览器只有在 Memory Cache、HTTP Cache 和 Service Worker Cache 均未命中的情况下才会去询问 Push Cache。

Push Cache 是一种存在于会话阶段的缓存，当 session 终止时，缓存也随之释放。

不同的页面只要共享了同一个 HTTP2 连接，那么它们就可以共享同一个 Push Cache。





### 浏览器输入URL后发生了什么？

> [细说浏览器输入URL后发生了什么 - 掘金 (juejin.cn)](https://juejin.cn/post/6844904054074654728)
>
> [从URL输入到页面展现到底发生什么？- github](https://github.com/ljianshu/Blog/issues/24)   //待整理
>
> [what-happens-when-zh_CN/README.rst at master · skyline75489/what-happens-when-zh_CN (github.com)](https://github.com/skyline75489/what-happens-when-zh_CN/blob/master/README.rst?utm_medium=social&utm_source=wechat_session&from=timeline&isappinstalled=0) //待整理
>
> 
>
> 

![lya7b81ow94pniln3aif.jpg (880×622) (cloudinary.com)](https://res.cloudinary.com/practicaldev/image/fetch/s--GY9Fa-eL--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/i/lya7b81ow94pniln3aif.jpg)







* 合成URL
* DNS域名解析
  * 浏览器缓存--->本地hosts文件--->本地DNS解析器缓存--->本地DNS服务器--->根域名服务器-->顶级域名服务器-->权威域名服务器

* 建立TCP连接
  * 首先，判断是不是https的，如果是: 服务端和客户端的信息传输都会通过TLS进行加密
  * 进行三次握手,建立TCP连接
    * 第一次握手：建立连接。客户端发送连接请求报文段
    * 第二次握手：服务器收到报文段。同时，自己还要发送请求信息给客户端
    * 第三次握手：客户端收到服务器的报文段。然后将向服务器发送报文段，客户端服务器更新状态,完成TCP三次握手。

* 发送HTTP请求,服务器处理请求,返回响应结果
* 关闭TCP连接,四次挥手
  * 第一次分手: 主机1向主机2发送报文,主机1
  * 第二次分手: 主机2接收报文,同意主机1的关闭请求
  * 第三次分手: 主机2向主机1发送报文, 请求关闭连接
  * 第四次分手: 主机1收到主机2报文, 向主机2发送报文段，然后主机1进入TIME_WAIT状态；
    * 主机2收到主机1的报文段以后，就关闭连接；
    * 主机1等待2个报文最大生存时间后依然没有收到回复，证明Server端已正常关闭，主机1关闭连接

* 浏览器渲染



#### DNS域名解析

**概况**

在网络世界，你肯定记得住网站的名称，但是很难记住网站的 IP 地址，因而也需要一个地址簿，就是 DNS 服务器。DNS 服务器是高可用、高并发和分布式的，它是树状结构，如图：

![DNS服务器](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/1/30/16ff45f30e08f1ae~tplv-t2oaga2asx-watermark.awebp)

**DNS分类:**

* 根DNS服务器: 返回顶级DNS服务器的IP地址
* 顶级DNS服务器: 返回权威DNS服务器的IP地址
* 权威DNS服务器: 返回相应主机的IP地址



**DNS的域名查询方式**

DNS的域名查找，

* 在客户端和浏览器，本地DNS之间的查询方式是递归查询；
* 在本地DNS服务器与根域及其子域之间的查询方式是迭代查询；

1.递归查询:

在客户端输入 URL 后，会有一个递归查找的过程，从浏览器缓存中查找->本地的hosts文件查找->找本地DNS解析器缓存查找->本地DNS服务器查找，这个过程中任何一步找到了都会结束查找流程。

![递归查询](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/1/30/16ff45eedca06afb~tplv-t2oaga2asx-watermark.awebp)

2.迭代查询:

如果本地DNS服务器无法查询到，则根据本地DNS服务器设置的转发器进行查询。若未用转发模式，则迭代查找过程如下图：

![](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/1/30/16ff48f72977d744~tplv-t2oaga2asx-watermark.awebp)

3.综合

![](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/1/30/16ff45e132f02931~tplv-t2oaga2asx-watermark.awebp)



4.查找中的优化:

* DNS存在着多级缓存，从离浏览器的距离排序的话，有以下几种: 浏览器缓存，系统缓存，路由器缓存，IPS服务器缓存，根域名服务器缓存，顶级域名服务器缓存，主域名服务器缓存。

* 在域名和 IP 的映射过程中，给了应用基于域名做负载均衡的机会，可以是简单的<u>负载均衡</u>，也可以根据地址和运营商做全局的负载均衡。

#### 建立TCP连接

首先，判断是不是https的，如果是，则HTTPS其实是HTTP + SSL / TLS 两部分组成，也就是在HTTP上又加了一层处理加密信息的模块。服务端和客户端的信息传输都会通过TLS进行加密，所以传输的数据都是加密后的数据。

进行三次握手,建立TCP连接:

* 第一次握手：建立连接。客户端发送连接请求报文段，将SYN位置为1，Sequence Number为x；然后，客户端进入SYN_SEND状态，等待服务器的确认；
* 第二次握手：服务器收到SYN报文段。服务器收到客户端的SYN报文段，需要对这个SYN报文段进行确认，设置Acknowledgment Number为x+1(Sequence Number+1)；同时，自己还要发送SYN请求信息，将SYN位置为1，Sequence Number为y；服务器端将上述所有信息放到一个报文段（即SYN+ACK报文段）中，一并发送给客户端，此时服务器进入SYN_RECV状态；
* 第三次握手：客户端收到服务器的SYN+ACK报文段。然后将Acknowledgment Number设置为y+1，向服务器发送ACK报文段，这个报文段发送完毕以后，客户端和服务器端都进入ESTABLISHED状态，完成TCP三次握手。



#### 发送HTTP请求,服务器处理请求,返回响应结果

TCP连接建立后，浏览器就可以利用HTTP／HTTPS协议向服务器发送请求了。服务器接受到请求，就解析请求头，如果头部有缓存相关信息如if-none-match与if-modified-since，则验证缓存是否有效，若有效则返回状态码为304，若无效则重新返回资源，状态码为200.





#### 关闭TCP连接

* 第一次分手：主机1（可以使客户端，也可以是服务器端），设置Sequence Number和Acknowledgment Number，向主机2发送一个FIN报文段；此时，主机1进入FIN_WAIT_1状态；这表示主机1没有数据要发送给主机2了；

* 第二次分手：主机2收到了主机1发送的FIN报文段，向主机1回一个ACK报文段，Acknowledgment Number为Sequence Number加1；主机1进入FIN_WAIT_2状态；主机2告诉主机1，我"同意"你的关闭请求；

* 第三次分手：主机2向主机1发送FIN报文段，请求关闭连接，同时主机2进入LAST_ACK状态；

* 第四次分手：主机1收到主机2发送的FIN报文段，向主机2发送ACK报文段，然后主机1进入TIME_WAIT状态；主机2收到主机1的ACK报文段以后，就关闭连接；此时，主机1等待2MSL后依然没有收到回复，则证明Server端已正常关闭，那好，主机1也可以关闭连接了。



#### 浏览器渲染

按照渲染的时间顺序，流水线可分为如下几个子阶段：构建 DOM 树、样式计算、布局阶段、分层、栅格化和显示。如图：

![](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/1/30/16ff48eeecb52d79~tplv-t2oaga2asx-watermark.awebp)

1.渲染进程将 HTML 内容转换为能够读懂DOM 树结构。

2.渲染引擎将 CSS 样式表转化为浏览器可以理解的styleSheets，计算出 DOM 节点的样式。

3.创建布局树，并计算元素的布局信息。

4.对布局树进行分层，并生成分层树。

5.为每个图层生成绘制列表，并将其提交到合成线程。合成线程将图层分图块，并栅格化将图块转换成位图。

6.合成线程发送绘制图块命令给浏览器进程。浏览器进程根据指令生成页面，并显示到显示器上。



##### 构建DOM树

浏览器从网络或硬盘中获得HTML字节数据后会经过一个流程将字节解析为DOM树,先将HTML的原始字节数据转换为文件指定编码的字符,然后浏览器会根据HTML规范来将字符串转换成各种令牌标签，如html、body等。最终解析成一个树状的对象模型，就是dom树。



##### 样式计算

渲染引擎将 CSS 样式表转化为浏览器可以理解的 styleSheets，计算出 DOM 节点的样式。

CSS 样式来源主要有 3 种，分别是`通过 link 引用的外部 CSS 文件、style标签内的 CSS、元素的 style 属性内嵌的 CSS。` 其样式计算过程为:

![](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/1/30/16ff45e91f199812~tplv-t2oaga2asx-watermark.awebp)



上面的 CSS 文本中有很多属性值，如 2em、blue、bold，这些类型数值不容易被渲染引擎理解，所以需要将所有值转换为渲染引擎容易理解的、标准化的计算值，这个过程就是属性值标准化。

##### 页面布局

局过程，即排除 `script、meta` 等功能化、非视觉节点，排除 `display: none` 的节点，计算元素的位置信息，确定元素的位置，构建一棵只包含可见元素布局树

其中，这个过程需要注意的是`回流和重绘`，关于回流和重绘，详细的可以看我另一篇文章[《浏览器相关原理(面试题)详细总结二》](https://juejin.cn/post/6844903969693646862#heading-1)，



##### 生成分层树

页面中有很多复杂的效果，如一些复杂的 3D 变换、页面滚动，或者使用 z-indexing 做 z 轴排序等，为了更加方便地实现这些效果，渲染引擎还需要为特定的节点生成专用的图层，并生成一棵对应的图层树（LayerTree）



##### 栅格化

合成线程会按照视口附近的图块来优先生成位图，实际生成位图的操作是由栅格化来执行的。所谓栅格化，是指将图块转换为位图。如图：

![](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/1/30/16ff45f311bb8934~tplv-t2oaga2asx-watermark.awebp)

通常一个页面可能很大，但是用户只能看到其中的一部分，我们把用户可以看到的这个部分叫做视口（viewport）。在有些情况下，有的图层可以很大，比如有的页面你使用滚动条要滚动好久才能滚动到底部，但是通过视口，用户只能看到页面的很小一部分，所以在这种情况下，要绘制出所有图层内容的话，就会产生太大的开销，而且也没有必要。



##### 显示

最后，合成线程发送绘制图块命令给浏览器进程。浏览器进程根据指令生成页面，并显示到显示器上，渲染过程完成。





### 根域名相关知识

> [根域名的知识 - 阮一峰的网络日志 (ruanyifeng.com)](https://www.ruanyifeng.com/blog/2018/05/root-domain.html)



理论上，所有域名查询都必须先查询根域名，因为只有根域名才能告诉你，某个顶级域名由哪台服务器管理。事实上也确实如此，ICANN 维护着一张列表，里面记载着顶级域名和对应的托管商。



### 练习

#### 1.根据路径不同显示不同内容的练习

```js
GET /login 响应体返回[登录页面]
GET /register 响应体返回[注册页面]

网址形式: /login/?a=100&b=200

const url=require('url');
require('http')
.createServer((request, response)=>{
    //解决汉字乱码问题,设置响应字符集
    response.setHeader('Content-type', 'text/html; charset=utf-8')
    const path=url.parse(request.url, true).pathname;
    if(request.method.toUpperCase()==='GET' && path==='/login'){
        response.end('登录页面');
    }else if(request.method.toUpperCase()==='GET' && path==='/register'){
        response.end('注册页面');
    }else{
        response.end('<h1>404 Not Found</h1>')
    }
    //处理response.end: 只有在输入其他网址情况下才输出,没有意义.改进:添加进判断404页面
    //response.end('test');
})
.listen(80)
```





#### 2.

```js
## 练习
 一
创建一个 HTTP 服务, 访问的时候, 返回一个粉色背景的界面, 顺便加一个 h1 标题, 标题内容 
『身是菩提树，心如明镜台，时时勤拂拭，勿使惹尘埃。』

二
http://127.0.0.1/?bg=rgb(0,10,200)&text=rgb(10,23,33)

根据参数变换网页的背景


require('require')
.createServer((request, response)=>{
    response.setHeader('Content-type', 'text/html;charset=utf-8');
    let query=url.parse(url.request, true).query;
    let bg=query.bg?query.bg:pink;
    
    response.end(`
                 <!DOCTYPE html>
                 <html lang="en">
                 <head>
                 <meta charset="UTF-8">
                 <meta name="viewport" content="width=device-width, initial-scale=1.0">
                 <title>Document</title>
                 <style>
                 body{
                 	background:pink;
                 }
				 h1{color:${bg}};
              </style>
              </head>
              <body>
              <h1></h1>
              </body>
              </html>
    `);
})
.listen(80);
===========================================================
url=require('url');
require('http')
.createServer((request, response)=>{
    response.setHeader('Content-type', 'text/html;charset=utf-8');
    let path=url.path(request.url).query;
    let bg=query.bg?query.bg:'pink ';
    let txtbg=query.text?query.text:'#fff';
    response.end(`
                 <!DOCTYPE html>
                 <html lang="en">
                 <head>
                 <meta charset="UTF-8">
                 <meta name="viewport" content="width=device-width, initial-scale=1.0">
                 <title>Document</title>
                 <style>
                 body{
                 background:${bg};
                 }
              </style>
              </head>
              <body>
              <h1></h1>
              </body>
              </html>
    `);
})
.listen(80);
```



#### 3.新建表格隔行换色

```js
搭建 HTTP 服务.
GET  /table  响应一个表格 4 行 3 列表格, 并实现隔行换色 (JS)

- 使用内联样式

const url=require('url');
require('http')
.createServer((request, response)=>{
    //获取URL路径部分
    const path=url.parse(request.url).pathname;
    if(path==='/table' && request.method==='GET'){
        
    }else{
        response.end('<h1>404 Not found</h1>')
    }
    response.end(`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        table,td{
            border-collapse: collapse;
        }
        td{
            border:1px solid;
            padding:10px 20px;
        }
    </style>
</head>
<body>
    <table>
        <tr><td>aaa</td><td>aaa</td><td>aaa</td><td>aaa</td></tr>
        <tr><td>aaa</td><td>aaa</td><td>aaa</td><td>aaa</td></tr>
        <tr><td>aaa</td><td>aaa</td><td>aaa</td><td>aaa</td></tr>
        <tr><td>aaa</td><td>aaa</td><td>aaa</td><td>aaa</td></tr>
    </table>
    <script>
        var trlist=document.querySelectorAll('tr');
        for(let i=0; i<trlist.length; i++){
            if(i % 2 === 0){
                trlist[i].style.background='pink';
            }else{
                trlist[i].style.background='yellowgreen';
            }
        }

    </script>
</body>
</html>
	`);
})
.listen(80);
```



#### 3.2 外部引入css和js代码

```js
- 使用link标签获得请求

问题: 响应体中的js和css应在在本地哪个位置?

    
//<link rel="stylesheet" href="/abc.css">    
//<script src="./js/app.js"></script>    
    
require('http')
.createServer((request, response)=>{
    //获取URL路径部分
    const path=url.parse(request.url).pathname;
    if(path==='/table' && request.method==='GET'){
        
    }else if(path==='/js/app.js' && request.method==='GET'){
             response.end(`
	 var trlist=document.querySelectorAll('tr');
        for(let i=0; i<trlist.length; i++){
            if(i % 2 === 0){
                trlist[i].style.background='pink';
            }else{
                trlist[i].style.background='yellowgreen';
            }
        }
	`)
    }
    else if(path==='/abc.css'){`
			table, td{
                border-collapse: collapse;
            }
            td{
                padding:10px 20px;
            }`
            
    }
    else{
        response.end('<h1>404 Not found</h1>')
    }
    response.end(`.....
```



#### 4.歌曲列表案例

```js
const data = [
    {
        id:1,
        name: '孙燕姿',
        song: '绿光'
    },
    {
        id:2,
        name: '周杰伦',
        song: '不能说的密码'
    },
    {
        id:3,
        name:'林俊杰',
        song: '不为谁而作的歌'
    },
    {
        id:4,
        name: '五月天',
        song:'干杯'
    },
    {
        id: 5,
        name: '张艺兴',
        song: '莲'
    },
    {
        id:6,
        name:'刘德华',
        song:'冰雨'
    },
    {
        id: 7,
        name: '张学友',
        song: '情人'
    }
];
//
const http = require('http');
const server = http.createServer((request, response) => {
    //响应一个表格
    // 拼接 tr 内容
    //  { id:1, name: '孙燕姿', song: '逆光' }   =>  <tr><td>1</td><td>孙燕姿</td><td>逆光</td></tr>
    //声明空字符串
    let str = '';
    data.forEach(item => {
        str += `<tr><td>${item.id}</td><td>${item.name}</td><td>${item.song}</td></tr>`
    });

    response.end(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>网页练习</title>
            <link rel="stylesheet" href="">
            <style>
                table, td{
                    border-collapse: collapse;
                }
                td{
                    padding: 10px 20px;
                }
            </style>
        </head>
        <body>
            <h1>歌曲列表</h1>
            <table border="1">
                <tr><td>ID</td><td>歌手</td><td>歌曲</td></tr>
                ${str}
            </table>
        </body>
        </html>
    `);
});

server.listen(8000);
```



### 其他





## 跨域

> [跨域资源共享 CORS 详解- 阮一峰](https://www.ruanyifeng.com/blog/2016/04/cors.html)
>
> [跨源资源共享(CORS) - MDN](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/CORS)
>
> https://segmentfault.com/a/1190000022398875(跨域解决方案)
>
> https://segmentfault.com/a/1190000011145364


待办
> https://www.cnblogs.com/hq233/p/9849939.html
> https://zhuanlan.zhihu.com/p/375404174





### what

`跨源资源共享` ([CORS](https://developer.mozilla.org/zh-CN/docs/Glossary/CORS))（或通俗地译为跨域资源共享）是一种基于 [HTTP](https://developer.mozilla.org/zh-CN/docs/Glossary/HTTP) 头的机制，该机制通过允许服务器标示除了它自己以外的其它 [origin](https://developer.mozilla.org/zh-CN/docs/Glossary/Origin)（域，协议和端口），使得浏览器允许这些 origin 访问加载自己的资源。

**CORS**是一个W3C标准，全称是"跨域资源共享"（Cross-origin resource sharing）。

<span style="color:blue">它允许浏览器向跨源服务器，发出[`XMLHttpRequest`](https://www.ruanyifeng.com/blog/2012/09/xmlhttprequest_level_2.html)请求，从而克服了AJAX只能 [同源](https://www.ruanyifeng.com/blog/2016/04/same-origin-policy.html) 使用的限制。</span>

**实例**

运行在 `https://domain-a.com` 的 JavaScript 代码使用 [`XMLHttpRequest`](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest) 来发起一个到 `https://domain-b.com/data.json` 的请求。



### 简介

CORS需要浏览器和服务器同时支持。目前，所有浏览器都支持该功能，IE浏览器不能低于IE10。

整个CORS通信过程，都是浏览器自动完成，不需要用户参与。对于开发者来说，CORS通信与同源的AJAX通信没有差别，代码完全一样。浏览器一旦发现AJAX请求跨源，就会自动添加一些附加的头信息，有时还会多出一次附加的请求，但用户不会有感觉。

因此，实现CORS通信的关键是服务器。只要服务器实现了CORS接口，就可以跨源通信







### 原因

> [同源安全策略](https://developer.mozilla.org/zh-CN/docs/Web/Security/Same-origin_policy) 默认阻止“跨域”获取资源。但是 CORS 给了web服务器这样的权限，即服务器可以选择，允许跨域请求访问到它们的资源。

```
1.同源策略
2.浏览器特有的一个问题,服务器之间是没有这个问题的.
3.跨域问题是浏览器的ajax引擎阻挡了返回的服务器数据
```



### 使用场景

这份 [cross-origin sharing standard](https://fetch.spec.whatwg.org/#http-cors-protocol) 允许在下列场景中使用跨站点 HTTP 请求：

- 前文提到的由 [`XMLHttpRequest`](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest) 或 [Fetch APIs](https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API) 发起的跨源 HTTP 请求。
- Web 字体 (CSS 中通过 `@font-face` 使用跨源字体资源)，[因此，网站就可以发布 TrueType 字体资源，并只允许已授权网站进行跨站调用](https://www.w3.org/TR/css-fonts-3/#font-fetching-requirements)。
- [WebGL 贴图](https://developer.mozilla.org/zh-CN/docs/Web/API/WebGL_API/Tutorial/Using_textures_in_WebGL)
- 使用 [`drawImage`](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/drawImage) 将 Images/video 画面绘制到 canvas。
- [来自图像的 CSS 图形](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Shapes/Shapes_From_Images)



### 功能概述

跨源资源共享标准新增了一组 HTTP 首部字段，允许服务器声明哪些源站通过浏览器有权限访问哪些资源。

对那些可能对服务器数据产生副作用的 HTTP 请求方法(GET之外及其他),浏览器必须首先使用 [`OPTIONS`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Methods/OPTIONS) 方法发起一个预检请求（preflight request），从而获知服务端是否允许该跨源请求。

在预检请求的返回中，服务器端也可以通知客户端，是否需要携带身份凭证（包括 [Cookies](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Cookies) 和 [HTTP认证](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Authentication) 相关数据）。

#### 错误检查

CORS 请求失败会产生错误，但是为了安全，在 JavaScript 代码层面是无法获知到底具体是哪里出了问题。你只能查看浏览器的控制台以得知具体是哪里出现了错误。





### 跨域10种解决方案

> [javascript - 10 种跨域解决方案（附终极方案）_个人文章 - SegmentFault 思否](https://segmentfault.com/a/1190000022398875()



#### CORS

跨域资源共享([CORS](https://link.segmentfault.com/?enc=CoF6bP66m7RAhbD54WQ9YA%3D%3D.459wt2d1S%2Bh3Ur0M2GGneKg3owiaAlqNtwue4IEi76DgGiB%2FmIGv7g7Wa0CjBh7Ja5KGeB1evP%2BbyUlM4%2Fnvbw%3D%3D)) 是一种机制，它使用额外的[HTTP](https://link.segmentfault.com/?enc=3jZ7zsnXFglRSbHnv6SJSQ%3D%3D.TTQ0f7DMeEM5WMJfK3aatpaDdQDvO9%2BxycIzDAhkfFulyEvfCA1TBbyIDiFqtTdLIIBb%2BsLHE2UNQceyKImVhQ%3D%3D)头来告诉浏览器 让运行在一个 origin (domain) 上的 Web 应用被准许访问来自不同源服务器上的指定的资源。当一个资源从与该资源本身所在的服务器**不同的域、协议或端口**请求一个资源时，资源会发起一个**跨域 HTTP 请求**。

而在 cors 中会有`简单请求`和`复杂请求`的概念。

**浏览器支持情况**

当你使用 IE<=9, Opera<12, or Firefox<3.5 或者更加老的浏览器，这个时候请使用 JSONP 。



##### 1).简单请求

不会触发 [CORS 预检请求](https://link.juejin.cn/?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FHTTP%2FAccess_control_CORS%23Preflighted_requests)。这样的请求为“简单请求”，请注意，该术语并不属于 [Fetch](https://link.juejin.cn/?target=https%3A%2F%2Ffetch.spec.whatwg.org%2F) （其中定义了 CORS）规范。若请求满足所有下述条件，则该请求可视为“简单请求”：

情况一: 使用以下方法(意思就是以下请求以外的都是非简单请求)

- [`GET`](https://link.juejin.cn/?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FHTTP%2FMethods%2FGET)
- [`HEAD`](https://link.juejin.cn/?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FHTTP%2FMethods%2FHEAD)
- [`POST`](https://link.juejin.cn/?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FHTTP%2FMethods%2FPOST)

情况二: 人为设置以下集合外的请求头

- [`Accept`](https://link.juejin.cn/?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FHTTP%2FHeaders%2FAccept)
- [`Accept-Language`](https://link.juejin.cn/?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FHTTP%2FHeaders%2FAccept-Language)
- [`Content-Language`](https://link.juejin.cn/?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FHTTP%2FHeaders%2FContent-Language)
- [`Content-Type`](https://link.juejin.cn/?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FHTTP%2FHeaders%2FContent-Type) （需要注意额外的限制）
- `DPR`
- `Downlink`
- `Save-Data`
- `Viewport-Width`
- `Width`

情况三：`Content-Type`的值仅限于下列三者之一：(例如 application/json 为非简单请求)

- `text/plain`
- `multipart/form-data`
- `application/x-www-form-urlencoded`

情况四:

请求中的任意[`XMLHttpRequestUpload`](https://link.juejin.cn/?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FAPI%2FXMLHttpRequestUpload) 对象均没有注册任何事件监听器；[`XMLHttpRequestUpload`](https://link.juejin.cn/?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FAPI%2FXMLHttpRequestUpload) 对象可以使用 [`XMLHttpRequest.upload`](https://link.juejin.cn/?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FAPI%2FXMLHttpRequest%2Fupload) 属性访问。

情况五:

请求中没有使用 [`ReadableStream`](https://link.juejin.cn/?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FAPI%2FReadableStream) 对象。



##### 2).非简单请求

除以上情况外的。



##### 3). Node中的CORS方案

**原生方式**

我们来看下后端部分的解决方案。`Node`中`CORS`的解决代码.

```js
app.use(async(ctx, next) => {
  ctx.set("Access-Control-Allow-Origin", ctx.headers.origin);
  ctx.set("Access-Control-Allow-Credentials", true);
  ctx.set("Access-Control-Request-Method", "PUT,POST,GET,DELETE,OPTIONS");
  ctx.set(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, cc"
  );
  if (ctx.method === "OPTIONS") {
    ctx.status = 204;
    return;
  }
  await next();
})
```

**第三方中间件**

为了方便也可以直接使用中间件

```js
const cors = require("koa-cors");

app.use(cors());

```

**关于 cors 的 cookie 问题**

想要传递`cookie`需要满足 3 个条件

[1.web](https://link.segmentfault.com/?enc=%2FADNWLKynK7roJvf4r3P5A%3D%3D.WQO0CJKKB5atum1r6jGuEg%3D%3D)请求设置`withCredentials`

这里默认情况下在跨域请求，浏览器是不带 cookie 的。但是我们可以通过设置`withCredentials`来进行传递`cookie`.

```javascript
// 原生 xml 的设置方式
var xhr = new XMLHttpRequest();
xhr.withCredentials = true;
// axios 设置方式
axios.defaults.withCredentials = true;
```

2.`Access-Control-Allow-Credentials`为`true`

3.`Access-Control-Allow-Origin`为非`*`

这里请求的方式，在`chrome`中是能看到返回值的，但是只要不满足以上其一，浏览器会报错，获取不到返回值。

![](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/4/13/1717441c93623a0c~tplv-t2oaga2asx-zoom-in-crop-mark:3024:0:0:0.awebp)



```js
Access to XMLHttpRequest at 'http://127.0.0.1:8080/api/corslist' from origin 'http://127.0.0.1:8000' has been blocked by CORS policy: The value of the 'Access-Control-Allow-Credentials' header in the response is '' which must be 'true' when the request's credentials mode is 'include'. The credentials mode of requests initiated by the XMLHttpRequest is controlled by the withCredentials attribute.
```



```js
Access to XMLHttpRequest at 'http://127.0.0.1:8080/api/corslist' from origin 'http://127.0.0.1:8000' has been blocked by CORS policy: The value of the 'Access-Control-Allow-Origin' header in the response must not be the wildcard '*' when the request's credentials mode is 'include'. The credentials mode of requests initiated by the XMLHttpRequest is controlled by the withCredentials attribute.

```





##### 示例

分别演示一下前端部分 `简单请求` 和 `非简单请求`

简单请求

```html
<script src="https://cdn.bootcss.com/axios/0.19.2/axios.min.js"></script>
<script>
  axios.get("http://127.0.0.1:8080/api/corslist");
</script>
```



非简单请求

这里我们加入了一个非集合内的 `headers` 头 `cc` 来达到非简单请求的目的。

```html
<script src="https://cdn.bootcss.com/axios/0.19.2/axios.min.js"></script>
<script>
  axios.get("http://127.0.0.1:8080/api/corslist", { headers: { cc: "xxx" } });
</script>
```

![](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/4/13/1717441c5360c403~tplv-t2oaga2asx-zoom-in-crop-mark:3024:0:0:0.awebp)



![](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/4/13/1717441c9140192e~tplv-t2oaga2asx-zoom-in-crop-mark:3024:0:0:0.awebp)



##### 其他

1、 在新版的 chrome 中，如果你发送了复杂请求，你却看不到 `options` 请求。可以在这里设置 `chrome://flags/#out-of-blink-cors` 设置成 `disbale` ，重启浏览器。对于非简单请求就能看到 `options` 请求了。

2、 一般情况下后端接口是不会开启这个跨域头的，除非是一些与用户无关的不太重要的接口。



#### Node正向代理

代理的思路为，利用服务端请求不会跨域的特性，让接口和当前站点同域。

代理前

![](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/4/13/1717441c9f004d9b~tplv-t2oaga2asx-zoom-in-crop-mark:3024:0:0:0.awebp)

![](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/4/13/1717441cb6c9453f~tplv-t2oaga2asx-zoom-in-crop-mark:3024:0:0:0.awebp)



##### 1) cli工具中的代理

<u>Webpack(4.x)</u>

在`webpack`中可以配置`proxy`来快速获得接口代理的能力。

```js
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: {
    index: "./index.js"
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist")
  },
  devServer: {
    port: 8000,
    proxy: {
      "/api": {
        target: "http://localhost:8080"
      }
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "webpack.html"
    })
  ]
};
```

修改前端接口请求方式，改为不带域名。（因为现在是同域请求了）

```js
<button id="getlist">获取列表</button>
<button id="login">登录</button>
<script src="https://cdn.bootcss.com/axios/0.19.2/axios.min.js"></script>
<script>
  axios.defaults.withCredentials = true;
  getlist.onclick = () => {
    axios.get("/api/corslist").then(res => {
      console.log(res.data);
    });
  };
  login.onclick = () => {
    axios.post("/api/login");
  };
</script>
```



<u>Vue-cli 3.x</u>

```js
// vue.config.js如果没有就创建

module.exports = {
  devServer: {
    port: 8000,
    proxy: {
      "/api": {
        target: "http://localhost:8080"
      }
    }
  }
};
```

以上所有配置都是有着共同的底层包 [http-proxy-middleware](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fchimurai%2Fhttp-proxy-middleware) .里面需要用到的各种 `websocket` ，`rewrite` 等功能，直接看这个库的配置就可以了。关于 http-proxy-middleware 这个库的原理可以看我这篇文章 [github.com/hua1995116/…](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fhua1995116%2Fproxy) 

上面配置写哪里都不用记的，想要哪个框架的 直接 google 搜索 xxx proxy 就行了。





##### 2) 使用自己的代理工具

[cors-anywhere](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2FRob--W%2Fcors-anywhere)

**「服务端」**

```javascript
// Listen on a specific host via the HOST environment variable
var host = process.env.HOST || "0.0.0.0";
// Listen on a specific port via the PORT environment variable
var port = process.env.PORT || 7777;

var cors_proxy = require("cors-anywhere");
cors_proxy
  .createServer({
    originWhitelist: [], // Allow all origins
    requireHeader: ["origin", "x-requested-with"],
    removeHeaders: ["cookie", "cookie2"]
  })
  .listen(port, host, function() {
    console.log("Running CORS Anywhere on " + host + ":" + port);
  });
复制代码
```

**「前端代码」**

```ini
<script src="https://cdn.bootcss.com/axios/0.19.2/axios.min.js"></script>
<script>
  axios.defaults.withCredentials = true;
  getlist.onclick = () => {
    axios
      .get("http://127.0.0.1:7777/http://127.0.0.1:8080/api/corslist")
      .then(res => {
        console.log(res.data);
      });
  };
  login.onclick = () => {
    axios.post("http://127.0.0.1:7777/http://127.0.0.1:8080/api/login");
  };
</script>
复制代码
```



**缺点」**

无法专递 cookie，原因是因为这个是一个代理库，作者觉得中间传递 cookie 太不安全了。https://github.com/Rob--W/cors-anywhere/issues/208#issuecomment-575254153



##### 3) charles

这是一个测试、开发的神器。[介绍与使用](https://juejin.cn/post/6844903665304600589)

利用 charles 进行跨域，本质就是请求的拦截与代理。



#### Nginx反向代理

Nginx 则是通过反向代理的方式，（这里也需要自定义一个域名）这里就是保证我当前域，能获取到静态资源和接口，不关心是怎么获取的。[nginx 安装教程](https://link.juejin.cn/?target=https%3A%2F%2Fblog.csdn.net%2Fdiaojw090%2Farticle%2Fdetails%2F89135073)

//略过 直接看原文





#### JSONP

>  script 标签 src 属性中的链 接却可以访问跨域的 js 脚本，利用这个特性，服务端不再返回 JSON 格式的数据，而是 返回一段调用某个函数的 js 代码，在 src 中进行了调用，这样实现了跨域。



**「使用限制」**

仅支持 GET 方法，如果想使用完整的 REST 接口，请使用 CORS 或者其他代理方式。

**「流程解析」**

1.前端定义解析函数（例如 jsonpCallback=function(){....}）

2.通过 params 形式包装请求参数，并且声明执行函数(例如 cb=jsonpCallback)

3.后端获取前端声明的执行函数（jsonpCallback），并以带上参数并调用执行函数的方式传递给前端。

**「使用示例」**

后端实现

```javascript
const Koa = require("koa");
const fs = require("fs");
const app = new Koa();

app.use(async (ctx, next) => {
  if (ctx.path === "/api/jsonp") {
    const { cb, msg } = ctx.query;
    ctx.body = `${cb}(${JSON.stringify({ msg })})`;
    return;
  }
});

app.listen(8080);
```



普通JS示例

```javascript
<script type="text/javascript">
  window.jsonpCallback = function(res) {
    console.log(res);
  };
</script>
<script
  src="http://localhost:8080/api/jsonp?msg=hello&cb=jsonpCallback"
  type="text/javascript"
></script>
```



JQuery Ajax示例

```javascript
<script src="https://cdn.bootcss.com/jquery/3.5.0/jquery.min.js"></script>
<script>
  $.ajax({
    url: "http://localhost:8080/api/jsonp",
    dataType: "jsonp",
    type: "get",
    data: {
      msg: "hello"
    },
    jsonp: "cb",
    success: function(data) {
      console.log(data);
    }
  });
</script>
```



#### websocket

[WebSocket](https://link.juejin.cn/?target=http%3A%2F%2Fdev.w3.org%2Fhtml5%2Fwebsockets%2F) 规范定义了一种 API，可在网络浏览器和服务器之间建立“套接字”连接。简单地说：客户端和服务器之间存在持久的连接，而且双方都可以随时开始发送数据。详细教程可以看 https://www.html5rocks.com/zh/tutorials/websockets/basics/

这种方式本质没有使用了 HTTP 的响应头, 因此也没有跨域的限制

前端部分

```html
<script>
  let socket = new WebSocket("ws://localhost:8080");
  socket.onopen = function() {
    socket.send("秋风的笔记");
  };
  socket.onmessage = function(e) {
    console.log(e.data);
  };
</script>
```



后端部分

```javascript
const WebSocket = require("ws");
const server = new WebSocket.Server({ port: 8080 });
server.on("connection", function(socket) {
  socket.on("message", function(data) {
    socket.send(data);
  });
});
```



#### window.postMessage

**「window.postMessage()」** 方法可以安全地实现跨源通信。通常，对于两个不同页面的脚本，只有当执行它们的页面位于具有相同的协议（通常为 https），端口号（443 为 https 的默认值），以及主机 (两个页面的模数 [`Document.domain`](https://link.juejin.cn/?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FAPI%2FDocument%2Fdomain)设置为相同的值) 时，这两个脚本才能相互通信。**「window.postMessage()」** 方法提供了一种受控机制来规避此限制，只要正确的使用，这种方法就很安全。

用途

1.页面和其打开的新窗口的数据传递

2.多窗口之间消息传递

3.页面与嵌套的 iframe 消息传递

用法

详细用法看 https://developer.mozilla.org/zh-CN/docs/Web/API/Window/postMessage

```
otherWindow.postMessage(message, targetOrigin, [transfer]);
```

- otherWindow: 其他窗口的一个引用，比如 iframe 的 contentWindow 属性、执行[window.open](https://link.juejin.cn/?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fen-US%2Fdocs%2FDOM%2Fwindow.open)返回的窗口对象、或者是命名过或数值索引的[window.frames](https://link.juejin.cn/?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fen-US%2Fdocs%2FDOM%2Fwindow.frames)。
- message: 将要发送到其他 window 的数据。
- targetOrigin: 通过窗口的 origin 属性来指定哪些窗口能接收到消息事件.
- transfer(可选) : 是一串和 message 同时传递的 [`Transferable`](https://link.juejin.cn/?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FAPI%2FTransferable) 对象. 这些对象的所有权将被转移给消息的接收方，而发送一方将不再保有所有权

示例

```html
// index.html
<iframe
  src="http://localhost:8080"
  frameborder="0"
  id="iframe"
  onload="load()"
></iframe>
<script>
  function load() {
    iframe.contentWindow.postMessage("秋风的笔记", "http://localhost:8080");
    window.onmessage = e => {
      console.log(e.data);
    };
  }
</script>
```



```html 
// another.html

<div>hello</div>
<script>
  window.onmessage = e => {
    console.log(e.data); // 秋风的笔记
    e.source.postMessage(e.data, e.origin);
  };
</script>
```



#### document.domain + Iframe

**该方式只能用于二级域名相同的情况下，比如`a.test.com`和`b.test.com`适用于该方式**。 只需要给页面添加`document.domain ='test.com'`表示二级域名都相同就可以实现跨域。



```html
// a.test.com
<body>
  helloa
  <iframe
    src="http://b.test.com/b.html"
    frameborder="0"
    onload="load()"
    id="frame"
  ></iframe>
  <script>
    document.domain = "test.com";
    function load() {
      console.log(frame.contentWindow.a);
    }
  </script>
</body>
```



```html
// b.test.com
<body>
  hellob
  <script>
    document.domain = "test.com";
    var a = 100;
  </script>
</body>
```



#### window.location.hash + Iframe

原理就是通过 url 带 hash ，通过一个非跨域的中间页面来传递数据。

实现流程

一开始 a.html 给 c.html 传一个 hash 值，然后 c.html 收到 hash 值后，再把 hash 值传递给 b.html，最后 b.html 将结果放到 a.html 的 hash 值中。 同样的，a.html 和 b.htm l 是同域的，都是`http://localhost:8000`，而 c.html 是`http://localhost:8080`

```xml
// a.html
<iframe src="http://localhost:8080/hash/c.html#name1"></iframe>
<script>
  console.log(location.hash);
  window.onhashchange = function() {
    console.log(location.hash);
  };
</script>


// b.html
<script>
  window.parent.parent.location.hash = location.hash;
</script>


// c.html
<body></body>
<script>
  console.log(location.hash);
  const iframe = document.createElement("iframe");
  iframe.src = "http://localhost:8000/hash/b.html#name2";
  document.body.appendChild(iframe);
</script>
```



#### window.name + Iframe

window 对象的 name 属性是一个很特别的属性，当该 window 的 location 变化，然后重新加载，它的 name 属性可以依然保持不变。

其中 a.html 和 b.html 是同域的，都是`http://localhost:8000`，而 c.html 是`http://localhost:8080`

```html
// a.html
<iframe
  src="http://localhost:8080/name/c.html"
  frameborder="0"
  onload="load()"
  id="iframe"
></iframe>
<script>
  let first = true;
  // onload事件会触发2次，第1次加载跨域页，并留存数据于window.name
  function load() {
    if (first) {
      // 第1次onload(跨域页)成功后，切换到同域代理页面
      iframe.src = "http://localhost:8000/name/b.html";
      first = false;
    } else {
      // 第2次onload(同域b.html页)成功后，读取同域window.name中数据
      console.log(iframe.contentWindow.name);
    }
  }
</script>
```

b.html 为中间代理页，与 a.html 同域，内容为空。

```xml
// b.html
<div></div>
// c.html
<script>
  window.name = "秋风的笔记";
</script>
```

通过 iframe 的 src 属性由外域转向本地域，跨域数据即由 iframe 的[window.name](https://link.segmentfault.com/?enc=Qr4L2SV%2BqGL4hyiRrYLJwQ%3D%3D.Cc7BOrkYzy6VqsdXrDaMgLSzCl16NVkYUsN3ady587I%3D)从外域传递到本地域。这个就巧妙地绕过了浏览器的跨域访问限制，但同时它又是安全操作。



#### 浏览器开启跨域(终极方案)

关闭浏览器跨域功能

注意事项: 因为浏览器是众多 web 页面入口。我们是否也可以像客户端那种，就是用一个单独的专门宿主浏览器，来打开调试我们的开发页面。例如这里以 chrome canary 为例，这个是我专门调试页面的浏览器，不会用它来访问其他 web url。因此它也相对于安全一些。当然这个方式，只限于当你真的被跨域折磨地崩溃的时候才建议使用以下。使用后，请以正常的方式将他打开，以免你不小心用这个模式干了其他的事。

Windows

https://juejin.cn/post/7042703896262737956

```moonscript
找到你安装的目录
.\Google\Chrome\Application\chrome.exe --disable-web-security --user-data-dir=xxxx
```

在快捷方式上右键属性弹框中,将目标后面添加上`--disable-web-security`




Mac

`~/Downloads/chrome-data`这个目录可以自定义.

```awk
/Applications/Google\ Chrome\ Canary.app/Contents/MacOS/Google\ Chrome\ Canary  --disable-web-security --user-data-dir=~/Downloads/chrome-data
```













#### 10种解决跨域方法 //todo

> https://juejin.cn/post/6844904126246027278



## 同源策略

> [浏览器的同源策略 - MDN](https://developer.mozilla.org/zh-CN/docs/Web/Security/Same-origin_policy)
>
> 

### 概述

> **同源策略**是一个重要的安全策略，它用于限制一个[origin](https://developer.mozilla.org/zh-CN/docs/Glossary/Origin)的文档或者它加载的脚本如何能与另一个源的资源进行交互。它能帮助阻隔恶意文档，减少可能被攻击的媒介。

### 同源

> 如果两个 URL 的 [protocol](https://developer.mozilla.org/zh-CN/docs/Glossary/Protocol)、[port (en-US)](https://developer.mozilla.org/en-US/docs/Glossary/Port) (如果有指定的话)和 [host](https://developer.mozilla.org/zh-CN/docs/Glossary/Host) 都相同的话，则这两个 URL 是*同源*。

```
- 同源策略(Same-Origin Policy)最早由 Netscape 公司提出，是浏览器的一种安全策略。
- 同源： 两者的协议、域名、端口号 必须完全相同。 两个资源必须来自同一个服务.
- 违背同源策略就是跨域。
- AJAX 的请求默认是要遵循『同源策略的』

```



### 同源策略带来的问题

> https://juejin.cn/post/7003232769182547998

1. 一级域名相同，只是二级域名不同的同一所有者的网页被限制（Cookie、LocalStorage、IndexDB的读取）
2. 无法跨域发送 AJAX 请求 ???
3. 无法操作 DOM

Q：为什么 Form 表单可以跨域发送请求，而 AJAX 不可以。
 A：因为 Form 表单提交之后会刷新页面，所以即使跨域了也无法获取到数据，所以浏览器认为这个是安全的。而 AJAX 最大的优点就是在不重新加载整个页面的情况下，更新部分网页内容。如果让它跨域，则可以读取到目标 URL 的私密信息，这将会变得非常危险，所以浏览器是不允许 AJAX 跨域发送请求的。








### 跨源网络访问

同源策略控制不同源之间的交互.这些交互通常分为三类：

- 跨域***写操作**（Cross-origin writes）*一般是被允许的*。*例如链接（links），重定向以及表单提交。特定少数的HTTP请求需要添加 [preflight](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/CORS#附带身份凭证的请求)。
- 跨域***资源嵌入**（Cross-origin embedding）*一般是被允许（后面会举例说明）。
- 跨域***读操作**（Cross-origin reads）*一般是不被允许的*，*但常可以通过内嵌资源来巧妙的进行读取访问。例如，你可以读取嵌入图片的高度和宽度，调用内嵌脚本的方法，或[availability of an embedded resource](https://grepular.com/Abusing_HTTP_Status_Codes_to_Expose_Private_Information). !!(这篇文章没看完, 挺有意思的  未完成)



#### **嵌入跨源的资源示例**

* \<script src="..."\>\</script\> 标签嵌入跨域脚本
* `<link rel="stylesheet" href="...">` 标签嵌入CSS。由于CSS的[松散的语法规则](http://scarybeastsecurity.blogspot.dk/2009/12/generic-cross-browser-cross-domain.html)，CSS的跨域需要一个设置正确的 HTTP 头部 `Content-Type` 。不同浏览器有不同的限制： [IE](http://msdn.microsoft.com/zh-CN/library/ie/gg622939(v=vs.85).aspx), [Firefox](https://www.mozilla.org/security/announce/2010/mfsa2010-46.html), [Chrome](https://code.google.com/p/chromium/issues/detail?id=9877), [Safari](https://support.apple.com/kb/HT4070) (跳至CVE-2010-0051)部分 和 [Opera](https://www.opera.com/support/kb/view/943/)。
* 通过 [`<img>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/img) 展示的图片。支持的图片格式包括PNG,JPEG,GIF,BMP,SVG,...
* 通过 [\<video\>](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/video) 和 [\<audio\>](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/audio) 播放的多媒体资源。
* 通过 [\<object\>](https://developer.mozilla.org/zh-CN/docs/web/html/element/object)、 [\<embed\>](https://developer.mozilla.org/zh-CN/docs/HTML/Element/embed) 和 `<applet>` 嵌入的插件。
* 通过 [`@font-face`](https://developer.mozilla.org/zh-CN/docs/web/css/@font-face) 引入的字体。一些浏览器允许跨域字体（cross-origin fonts），一些需要同源字体（same-origin fonts）。
* 通过 [\<iframe\>](https://developer.mozilla.org/zh-CN/docs/web/html/element/iframe) 载入的任何资源。站点可以使用 [X-Frame-Options](https://developer.mozilla.org/zh-CN/docs/HTTP/X-Frame-Options) 消息头来阻止这种形式的跨域交互。



#### 如何允许跨源访问

可以使用 [CORS](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/CORS) 来允许跨源访问。CORS 是 [HTTP](https://developer.mozilla.org/zh-CN/docs/Glossary/HTTP) 的一部分，它允许服务端来指定哪些主机可以从这个服务端加载资源。



#### 如何阻止跨源访问(暂时了解)

- 阻止跨域写操作，只要检测请求中的一个不可推测的标记(CSRF token)即可，这个标记被称为 [Cross-Site Request Forgery (CSRF)](https://www.owasp.org/index.php/Cross-Site_Request_Forgery_(CSRF)) 标记。你必须使用这个标记来阻止页面的跨站读操作。
- 阻止资源的跨站读取，需要保证该资源是不可嵌入的。阻止嵌入行为是必须的，因为嵌入资源通常向其暴露信息。
- 阻止跨站嵌入，需要确保你的资源不能通过以上列出的可嵌入资源格式使用。浏览器可能不会遵守 `Content-Type` 头部定义的类型。例如，如果您在HTML文档中指定 `<script>` 标记，则浏览器将尝试将标签内部的 HTML 解析为JavaScript。 当您的资源不是您网站的入口点时，您还可以使用CSRF令牌来防止嵌入。

#### 跨源脚本API访问(暂时了解)

https://developer.mozilla.org/zh-CN/docs/Web/Security/Same-origin_policy



#### 跨源数据存储访问

访问存储在浏览器中的数据，如 [localStorage](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/localStorage) 和 [IndexedDB](https://developer.mozilla.org/zh-CN/docs/IndexedDB)，是以源进行分割。每个源都拥有自己单独的存储空间，一个源中的 JavaScript 脚本不能对属于其它源的数据进行读写操作。





### 如何解决跨域

```
1)	JSONP是什么
JSONP(JSON with Padding)，是一个非官方的跨域解决方案，纯粹凭借程序员的聪明才智开发出来，只支持get请求。
2)	JSONP怎么工作的？
在网页有一些标签天生具有跨域能力，比如：img link iframe script。
JSONP就是利用script标签的跨域能力来发送请求的。案例:例如网页中script标签有不同地址的src


1)	CORS是什么？ 
CORS（Cross-Origin Resource Sharing），跨域资源共享。CORS是官方的跨域解决方案，它的特点是不需要在客户端做任何特殊的操作，完全在服务器中进行处理，支持get和post请求。
2)	CORS怎么工作的？
CORS是通过设置一个响应头来告诉浏览器，该请求允许跨域，浏览器收到该响应以后就会对响应放行。

```





### 原生JSONP实现跨域

#### JSONP介绍

```
1)JSONP是什么
JSONP(JSON with Padding)，是一个非官方的跨域解决方案，纯粹凭借程序员的聪明才智开发出来，只支持get请求。
2)JSONP怎么工作的？
在网页有一些标签天生具有跨域能力，比如：img link iframe script。
JSONP就是利用script标签的跨域能力来发送请求的。

```



#### JSONP案例

```html
--第一版 点击事件 使用script标签获取跨域内容,并将内容写入到页面中

================浏览器端=======================
<style>
    #abc {
        width: 400px;
        height: 200px;
        border: solid 1px #000;
    }
</style>
</head>
<body>
    <button>点击发送跨域请求</button>
    <div id="abc"></div>
<script>
	//获取元素
    const btn=document.querySelector('button');
    const abc=document.querySelector('#abc');
    
    btn.addEventListener('click', function(){
        //1.创建script标签
        let script=document.createElement('script');
        //2.设置script标签的src
        script.src='http://localhost:8001/jsonp-server';
        //3.将script标签插入到文档中
        document.body.appendChild(script);
    })
</script>  
    
================服务端=======================
<script>//为了代码格式添加
	const express=require('express');
    const app=express();
    app.all('/jsonp-server', (requeset, response)=>{
        response.send('跨域');
        //问题:浏览器通过script的src获取内容,但script标签无法解析中文.console控制台报错,is not defined.
        //如果返回的是response.send('alert(13)'),浏览器可正常执行.
    })
    app.listen(80);
</script>
```



```html
- 第二版 服务端使用jQuery+模板字符串+引号传递JS语句.
- 

================浏览器端=======================

================服务端=======================
<script>
    ...
    let data='中文汉字';
	response.send(
    	result.innerHTML= `${data}`;
    )
    ...
</script>
```



```HTML
- 第三版 服务器返回结果的数据处理代码不能放在服务器端. 客户端更改变量名字,服务端的JSON语句就无法使用
================浏览器端=======================
<body>
    <button>点击发送跨域请求</button>
    <div id="abc"></div>
<script>
	//获取元素
    const btn=document.querySelector('button');
    const result=document.querySelector('#abc');
    //重要:创建一个回调函数
    function callback(data){
        result.innerHTML=data;
    }
    ...
</script>


================服务端=======================
<script>//为了代码格式添加
	const express=require('express');
    const app=express();
    app.all('/jsonp-server', (requeset, response)=>{
        let data='中文汉字';
        response.send(`callback('${data}')`);
    })
    app.listen(80);
</script>
```



```html
- last版 去掉服务端和客户端的耦合, 函数名称
- 使用URL参数来传递函数名称
================浏览器端=======================
<body>
    <button>点击发送跨域请求</button>
    <div id="abc"></div>
<script>
	//获取元素
    const btn=document.querySelector('button');
    const result=document.querySelector('#abc');
    //重要:创建一个回调函数
    function callback2(data){
        result.innerHTML=data;
    }
    btn.addEventListener('click', function(){
        //1.创建script标签
        let script=document.createElement('script');
        //2.设置script标签的src
        script.src='http://localhost/jsonp-server?callback=callback2';
        //3.将script标签插入到文档中
        document.body.appendChild(script);
    })    
</script>


================服务端=======================
<script>//为了代码格式添加
	const express=require('express');
    const app=express();
    app.all('/jsonp-server', (requeset, response)=>{
        //获取URL中的参数
        let callback=request.query.callback;
        let data='中文汉字';
        response.send(`${callback}('${data}')`); //函数调用形式的字符串
    })
    app.listen(80);
</script>

```





```js
========HTML页面===============
<button>点击发送跨域请求</button>
<div id='abc'></div>
<script>
    //获取元素
    const button=document.querySelector('button');
	const abc=document.querySelector('#abc');

	//4.创建回调函数 
	//构建逻辑:1.服务端返回的处理代码不能放在服务端,原因之一是应对变量更名产生的后端操作.
    //2.解决方法: 本地创建回调函数
    //3.服务端返回的函数调用,名称需要和本地保持动态的一致
	//4.使用URL参数形式将函数名称发送到服务端. 只要前端两处名称保持一致即可.
	function ccc(data){
        abc.innerHTML=data;
    }
	//绑定事件
	button.addEventListener('click', function(){
        //1.创建script标签
        let script=document.createElement('script');
        //2.设置script标签的src
        script.src='http://127.0.0.1:8001/jsonp-server?callback=ccc';
        //3.将script标签插入到文档中
        document.body.appendChild(script);
    })
</script>

===============jsonp-server.js====================
app.all('/jsonp-server', (request, response)=>{
        //获取callback参数
        let callback=request.query.callback;
        //数据
        let data='test test';
        response.end(`
			${callback}(`${data}`); //内容发送到网页上script标签内,类型只能是JS代码
		`)
    })        
```



### AJAX功能调试步骤

```
1.检查console是否有报错
2.检查network 是否有请求
 2.1 如果没有请求
 2.1.1 检查事件绑定
 2.1.2 检查请求发送
 2.2 如果请求已经发送
 	2.2.1 检查响应体是否满足条件
     2.2.1.0 响应体是否满足条件,如果不满足:服务端人员
     2.2.1.1 如果数据OK,检查(回调函数)
     


```





### CORS

#### CORS介绍

```
CORS（Cross-Origin Resource Sharing），跨域资源共享。CORS是官方的跨域解决方案，它的特点是不需要在客户端做任何特殊的操作，完全在服务器中进行处理，支持get和post等请求。

2)	CORS怎么工作的？
CORS是通过设置一个响应头来告诉浏览器，该请求允许跨域，浏览器收到该响应以后就会对响应放行。
```



#### CORS使用

```js
3)	CORS的使用
//* 表示任何客户端网页都可跨域向我发送请求
//可将*号更改为特定的网站.例如a.com
主要是服务器端的设置：
router.get("/testAJAX" , function (req , res) {
	//通过res来设置响应头，来允许跨域请求
	//res.set("Access-Control-Allow-Origin","http://127.0.0.1:3000");  
	res.set("Access-Control-Allow-Origin","*");
	res.send("testAJAX返回的响应");
});

```





#### CORS案例

```html
================客户端====================
<button>点击</button>
<script>
	const btn=document.querySelector('button');
    btn.onclick=function(){
        const xhr=new XMLHttpRequest();
        xhr.open('GET', 'http://localhost/cors-server');
        xhr.send();
        xhr.onreadystatechange=function(){
            if(xhr.readyState===4){
                console.log(xhr.responseText);
            }
        }
    }
</script>

================客户端====================
<script>
	const express=require('expres');
	const app=express();

	app.all('/cors-server', (request, response)=>{
		response.setHeader('Access-Control-Allow-Origin', '*');
        response.send('CORS');
	})
</script>
设置CORS响应头    
response.setHeader('Access-Control-Allow-Origin', '*');//星号表示允许任何客户端网页发送请求
```





## 性能优化

### 资源

> [barretlee/performance-column: 🚅 性能专栏（Performance Column） (github.com)](https://github.com/barretlee/performance-column)
>
> 
