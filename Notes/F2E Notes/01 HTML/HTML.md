---
aliases: html
---

###  资源文档

#### 1.标准和文档

* w3.org
* whatwg.org
* developer.mozilla.org
* msdn.microsoft.com
* developer.apple.com

#### 2.大师

* Tim Berners-Lee
* Brendan Eich
* Bjarne Stroustrup





### HTML标签

#### 是什么
- HTML 标签是由*尖括号*包围的关键词，比如 \<html>
- HTML 标签通常是*成对出现*的，比如 \<b> 和 \</b>
- 标签对中的第一个标签是*开始标签*，第二个标签是*结束标签*
- 开始和结束标签也被称为*开放标签*和*闭合标签*

#### 种类
* 单标签(自结束标签)
* 双标签(有开始有结束)

#### 标签的关系
* 嵌套关系(包含关系,祖先和后代的关系)
* 并列关系(同级关系,兄弟之间的关系)



### HTML元素

#### 主要组成部分

* 开始标签(Opening tag): 包含元素的名称(本例为p)，被大于号、小于号所包围。表示元素从这里开始或者开始起作用.
* 结束标签(Closing tag): 与开始标签相似，只是其在元素名之前包含了一个斜杠。这表示着元素的结尾 
* 内容: 元素的内容
* 元素: 开始标签+结束标签+内容,便是一个完整的元素

![element.png (584×255) (mozit.cloud)](https://media.prod.mdn.mozit.cloud/attachments/2019/02/08/16475/cfa4526491ae15e6256fd67bb16bc7ea/element.png)



#### 标签和元素的关系

> [HTML Tags Vs Elements - Tutorial Republic](https://www.tutorialrepublic.com/html-tutorial/html-elements.php)

* 一个HTML元素是开始标签及它的属性,结束标签,及两者之间的所有的集合
* 简单起见,标签项和元素通常来表示同样的事情-就是它在你网页上定义的东西.



### HTML元素参考

> [HTML 元素参考 - HTML（超文本标记语言） | MDN (mozilla.org)](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element)

以下HTML元素根据功能进行分类,

#### 根元素

| ELement  | Description                    |
| -------- | ------------------------------ |
| `<html>` | 代表一个HTML文档的根(顶级元素) | 

#### 文档元数据
元数据(metadata)包含关于页面的信息.包括样式,脚本,帮助软件(搜索引擎,浏览器等)来使用和渲染页面的数据.
样式或脚本的元数据可能定义在当前页面或另一个文件.
| ELement   | Description                                                                                                                    |
| --------- | ------------------------------------------------------------------------------------------------------------------------------ |
| `<base>`  | 指定文档中所有相对URL使用的基础URL.一个文档中只能有一个这样的元素                                                              |
| `<head>`  | 包含文档中机器可读的信息,例如title,scripts,style sheets                                                                        |
| `<link>`  | 指定当前文档和外部资源的关系.常用来链接CSS,除了别的以外也用来建立网站图标(“favicon”样式图标和移动设备上主屏幕和应用程序的图标) |
| `<meta>`  | 表示不能被其它HTMLmeta-related元素代表的元数据,例如`<base> <link> <script> <style> <title>`                                    |
| `<style>` | 包含文档或部分文档的样式信息(?). 标签包含CSS, 应用到包含此元素的文档内容上.                                                    |
| `<title>` | 定义显示在浏览器标题栏或页面选项卡上的文档标题.它仅包含文本;元素内的标签会被忽略.                                              | 


#### 分区根元素

| ELement  | Description                                       |
| -------- | ------------------------------------------------- |
| `<body>` | 代表HTML文档的内容.一个文档中只能有一个这样的元素 | 


#### 内容分区
内容分区元素允许你组织文档内容为逻辑块. 使用分区元素来为页面内容创建大致轮廓,包含header和footer导航, 及识别内容分区的heading元素.
| ELement                     | Description                                                                                                                                                                                         |
| --------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `<address>`                 | 表示包含的HTML为个人或组织提供联系信息                                                                                                                                                              |
| `<article>`                 | 代表在文档/页面/应用或网站中的自包含组合, 旨在独立分发或复用(例如,在联合发布中?).包含示例: 论坛帖子、杂志或报纸文章、博客条目、产品卡、用户提交的评论、交互式小部件或小工具或任何其他独立的内容项。 |
| `<aside>`                   | 代表文档的一部分,其内容与文档主要内容间接相关.  Asides(离题的话)通常以侧边栏或呼出框(call-out boxes)呈现.                                                                                           |
| `<footer>`                  | 代表它最近的章节内容或章节根元素的根部. 一个`<footer>`单独包含分区作者,版权数据或相关文档链接的信息.                                                                                                |
| `<header>`                  | 代表介绍性内容,通常是一组介绍性或导航性辅助工具.它可能包含一些标题元素,但也包含logo,搜索表单,作者名字和其它元素.                                                                                    |
| `<h1> <h2><h3><h4><h5><h6>` | 代表6类章节标题.`<h1>`是最高分区标准,`<h6>`是最低.                                                                                                                                                  |
| `<hgroup>`                  | 代表含有次级内容(例如子标题,一个可选的标题,或一个标签行)分组的标题 ?                                                                                                                                |
| `<main>`                    | 代表文档的正文的主要内容. 主要内容区域由直接与文档的中心主题或应用程序的中心功能相关或扩展的内容组成                                                                                                |
| `<nav>`                     | 代表网页的一个章节,其目的是提供导航链接,或在当前文档内或链接到其它文档. 平常的导航章节例子是菜单栏(menu),内容表格和索引.                                                                            |
| `<section>`                 | 代表文档通用独立章节,其没有有更具体的语义元素来代表它. 章节应该总是有一个标题,除了极少数例外.                                                                                                                                                                                                   |


#### 文本内容
是使用HTML文本内容元素来组织放置在开始`<body>`和关闭`</body>`标签之间的内容的块或章节,对[可访问性](https://developer.mozilla.org/en-US/docs/Glossary/Accessibility)和[SEO](https://developer.mozilla.org/en-US/docs/Glossary/SEO)是重要的,这些元素识别该内容的目的或结构.
| ELement        | Description                                                                                                                                                                                                                  |     |
| -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --- |
| `<blockquote>` | 表明被包含的文本是一个延伸引用.通常,这是通过缩进(indentation)来直观渲染的. 使用`cite`属性提供引用来源的URL,而使用`<cite>`元素提供源文字表示.                                                                                 |     |
| `<dd>`         | 提供说明列表中(`<dl>`)中前置的(`<dt>`)的说明,定义或值.                                                                                                                                                                       |     |
| `<div>`        | 文档流通用容器.它不会在内容或样式上有影响直至以一些方式使用CSS设置样式(例如, 样式直接应用于它, 或者一些布局样式例如flexbox应用到它父元素上).                                                                                 |     |
| `<dl>`         | 表示一个描述列表. 这个元素包含术语组(指定使用`<dt>`元素)和描述组(由`<dd>`提供)的列表. 这个元素的平常用法是现词汇表或显示元数据（键值对列表）?                                                                                |     |
| `<dt>`         | 在说明或定义列表中指定一个术语,并且必须在`<dl>`元素内部使用.它通常跟着一个`<dd>`元素; 然后,一行中多个`<dt>`元素表明表示多个术语，这些术语都由紧接着的下一个 `<dd>` 元素定义                                                  |     |
| `<figcaption>` | 表示一个标题或图例来描述其父元素`<figure>`剩余的内容                                                                                                                                                                         |     |
| `<hr>`         | 表示在段落标准元素之间的一个主题终端: 例如,在一个故事中情节变换, 或章节内部主题转移.                                                                                                                                         |     |
| `<li>`         | 表示一个列表中的一项.它必须被父元素包含: 一个有序列表(`<ol>`), 一个无序列表(`<ul>`). 在菜单和无序列表中, 列表项通常使用==项目符号==(?)来展示. 在有序列表中,它们通常在左侧用升序计数(ascending counter)来展示,例如数字或字母. |     |
| `<menu>`  ?    | `<ul>`的语义代替,但被浏览器视为与`<ul>`来说没什么不同. 与 `<ul>` 没有什么不同。它表示项的无序列表（由`<li>` 元素表示）。                                                                                                     |     |
| `<ol>`         | 表示有序列表项,通常渲染为一个数字列表.                                                                                                                                                                                       |     |
| `<ul>`         | 表示无序列表项,通常渲染为一个符号列表.                                                                                                                                                                                       | `   |
| `<p>`          | 表示一个段落.段落通常在视觉媒体中表示为文本块，由空行和/或首行缩进与相邻块分隔, 但是HTML段落可以是任何内容的解构分组,例如图片或表单.                                                                                         |     |
| `<pre>`        | 表示预格式化的文本，该文本应该按照 HTML 文件中编写的格式精确呈现.文本通常使用非对称(non-proportional),或等宽monospaced字体表示.元素中的空格(Whitespace)作为编写的方式展示.                                                                                                                                                                                                                        |     |


#### 内联文本语义
| ELement | Description |
| ------- | ----------- |
|         |             |


#### 图片和多媒体
| ELement | Description |
| ------- | ----------- |
|         |             |


#### 嵌入内容
| ELement | Description |
| ------- | ----------- |
|         |             |


#### SVG和MathML
| ELement | Description |
| ------- | ----------- |
|         |             |


#### 脚本
为了创建动态内容和 Web 应用程序，HTML 支持使用脚本语言，最突出的就是 JavaScript。有一些特定的元素用于支持此功能。
| ELement  | Description                                                                                                                                                                                            |     |
| -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --- |
| canvas   | 用来通过 [canvas scripting API](https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API) 或 [WebGL API](https://developer.mozilla.org/zh-CN/docs/Web/API/WebGL_API) 绘制图形及图形动画的容器元素。 |     |
| noscript | 定义脚本未被执行时（页面的脚本类型不受支持，或当前浏览器关闭了脚本）的替代内容。                                                                                                                       |     |
| script   | 用于嵌入可执行脚本或数据。这通常用作嵌入或者引用 JavaScript 代码。`<script>` 元素也能在其他语言中使用，比如 [WebGL](https://developer.mozilla.org/zh-CN/docs/Web/API/WebGL_API) 的 GLSL 着色器语言和 [JSON](https://developer.mozilla.org/zh-CN/docs/Glossary/JSON)。                                                                                                                                                                                                       |     |



#### 编辑表示
| ELement | Description |
| ------- | ----------- |
|         |             |


#### 表格内容
| ELement | Description |
| ------- | ----------- |
|         |             |


#### 表单
| ELement | Description |
| ------- | ----------- |
|         |             |


#### 交互元素
| ELement | Description |
| ------- | ----------- |
|         |             |


#### Web组件
| ELement | Description |
| ------- | ----------- |
|         |             |


#### 过时和不推荐元素
| ELement | Description |
| ------- | ----------- |
|         |             |

* acronym
* applet
* bgsoud
* big
* blink
* center
* content
* dir
* font
* grame
* frameset
* image
* keygen
* marquee
* menuitem
* nobr
* noembed
* noframes
* params
* plaintext
* rb
* rtc
* shasow
* spacer
* strike
* tt
* xmp



### HTML属性参考
>https://developer.mozilla.org/en-US/docs/Web/HTML/Reference




### 全局属性
>https://developer.mozilla.org/en-US/docs/Web/HTML/Reference



### 内容分类
> https://developer.mozilla.org/en-US/docs/Web/HTML/Reference


### 日期和时间格式化
>https://developer.mozilla.org/en-US/docs/Web/HTML/Reference




### HTML标签写法和注释

#### 标签写法

在HTML中,标签和属性名字是大小写不敏感.意味着标签`<P>` 和 `<p>`在HTML中定义同样的段落.

但是在XHTML中,它们是大小写敏感的.

使用建议: 使用小写标签和属性名在HTML中.



#### HTML注释

An HTML comment begins with `<!--`, and ends with `-->`, as shown in the example below:

```html
<!-- This is an HTML comment -->
<!-- This is a multi-line HTML comment 
     that spans across more than one line -->
<p>This is a normal piece of text.</p>


<!-- Hiding this image for testing
<img src="images/smiley.png" alt="Smiley">
-->
```



### HTML元素的类型
>[Content categories - HTML: HyperText Markup Language | MDN (mozilla.org)](https://developer.mozilla.org/en-US/docs/Web/HTML/Content_categories)


元素可以被分成两类: 块级别元素 和 行内级别元素.
块元素装饰文档结构,行内元素装饰块的内容.
块元素占据可访问宽度的100%,它的首尾被渲染成换行符; 行内元素仅占据它所需空间.
最常用的块级元素:
```
<div>
<p>
<h1> - <h6>
<form>
<ol>
<ul>
<li>
```

最常用的行内元素
```
<img>
<a>
<span>
<strong>
<b>
<em>
<i>
<code>
<input>
<button>
```



#### 块元素

> 块级别元素是作为块被格式化的元素(即, 占据可用全部宽度),在块元素之前和之后有换行符.
> 通常来说,块元素可以包含行内元素和其他块元素.


#### 内联元素
内联级元素是源文档中不构成新内容块的元素; 内容以行形式分布. ????
内联元素通常只包含文本和其他内联元素.
一个内联元素仅仅占据需要的宽度,也不会强制换行.


#### 元素类型
>[HTML Standard (whatwg.org)](https://html.spec.whatwg.org/multipage/dom.html)
>


最新的HTML规范已经不按inline和block来区分元素.在规范中每个元素会规定如下两项:
* categories 该元素本身的分类
* element    规定了合法的元素的内容（子元素、文本等）类型。





### HTML属性

#### 是什么

* 定义元素额外的特征或属性,例如图片的宽度和高度. 
* 属性通常被定义在开始(闭合)标签,通常包含名字/值对,例如`name="value"`. 属性值应始终用引号引起来.

* 一些属性需要特定元素.来个例子, 一个`<img>`标签必须包含一个`src`  和 `alt`属性.

* 在HTML5中有几个属性不是由名字/值对构成,只是仅仅由名字构成.这样的属性被称为**布尔值属性**. 通常用的布尔值属性是`checked, readonly, required`等等.

* 属性值通常**大小写敏感**,除了id和class属性. 使用推荐是小写.



#### 图示

![](https://mdn.mozillademos.org/files/16476/attribute.png)



#### 属性的组成

* 在属性与元素名称（或上一个属性，如果有超过一个属性的话）之间的<span style="color:blue">空格符</span>
* 属性的<span style="color:blue">名称</span>，并接上一个等号。
* 由引号所包围的<span style="color:blue">属性值</span>



#### 命名注意事项

不包含 ASCII 空格（以及 `"` `'`  `=` `<` `>` 反引号）的简单属性值可以不使用引号，但是建议将所有属性值用引号括起来，这样的代码一致性更佳，更易于阅读。





### HTML文档结构/声明/组成

#### 基本结构(4部分)

* DTD(文档类型声明 `<!DOCTYPE>` declaration)
* The main container(`<html>` element)
* The head section(`<head>` element)
* The body section(`<body>` element)



#### 文档声明类型

##### 作用

会通知浏览器即将处理的文档类型,允许它们相应的调整处理机制.这DTD插入一个特殊标签(<!DOCTYPE>),为每个文档采用特定形式.此声明只能出现在文档开始.



#### main container: HTML元素

##### 组成

分成两部分: the `<head>` and  the `<body>`

##### \<head>元素

`<head>`部分是文档元信息(metadata)的容器.描述了文档的各种属性信息,包括文档标题,与其他文件的关系等.

此元数据可以根据使用的元素分成5类.

* The document's title: 简要描述文档中处理的主题.这是必要的一项,使用`<title>`元素插入.
* Style declarations: Style组定义用在为文档中的元素设置描述性属性. 它使用`<style>`元素插入.
* Client-side scripts: 插入程序以提供功能和交互. 用`<script>`元素来声明
* Meta statement: 定义自定义的属性和值. 使用`<meta>`元素插入.
* Relational information: 表示与文档以某种方式相关的资源. 使用`<link>`标签插入.
* base



##### \<body>元素

文档`<body>`仅仅是可渲染部分的容器.从这开始写你自己的内容(添加标题,段落,图片等),当页面加载时候你的访客立即访问的部分.



### meta标签

#### 资料

> [HTML meta标签总结与属性使用介绍 - SegmentFault 思否](https://segmentfault.com/a/1190000004279791)
>
> [HTML Standard (whatwg.org)](https://html.spec.whatwg.org/multipage/semantics.html#the-meta-element)



#### 作用

* meta常用于定义页面的说明，关键字，最后修改日期，和其它的元数据。
* 这些元数据将服务于浏览器（如何布局或重载页面），搜索引擎和其它网络服务



#### 组成

- 如果设置了 [`name`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/meta#attr-name) 属性，`meta` 元素提供的是文档级别（*document-level*）的元数据，应用于整个页面。
- 如果设置了 [`http-equiv`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/meta#attr-http-equiv) 属性，`meta` 元素则是编译指令，提供的信息与类似命名的 HTTP 头部相同。
- 如果设置了 [`charset`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/meta#attr-charset) 属性，`meta` 元素是一个字符集声明，告诉文档使用哪种字符编码。
- 如果设置了 [`itemprop`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Global_attributes#attr-itemprop) 属性，`meta` 元素提供用户定义的元数据。



#### name属性

##### 作用

* 与之对应的属性值为content，content中的内容是对name填入类型的具体描述，便于搜索引擎抓取
* name属性主要用于描述网页，比如网页的关键词，叙述等。

##### description

```html
<meta name="description" content="xxx">
```



##### viewport

```html
<meta name="viewport" content="width=device-width, initial-scale=1"
```



##### robots

说明：robots用来告诉爬虫哪些页面需要索引，哪些页面不需要索引。
content的参数有all,none,index,noindex,follow,nofollow。默认是all。

```html
<meta name="robots" content="none"> 

<meta name="robots" content="index,follow,max-snippet:200,max-image-preview:large">

//max-snippet 谷歌搜索参数 最多只能使用 [number] 个字符作为此搜索结果的文字摘要。
//max-image-preview:       设置此网页的图片预览在搜索结果中的尺寸上限。
      
```





#### http-equiv属性

http-equiv顾名思义，相当于http的文件头作用。equiv的全称是"equivalent"

##### content-type

说明：用于设定网页字符集，便于浏览器解析与渲染页面

```html
<meta http-equiv="content-Type" content="text/html;charset=utf-8">  //旧的HTML，不推荐

<meta charset="utf-8"> //HTML5设定网页字符集的方式，推荐使用UTF-8
```

##### X-UA-Compatible(浏览器采取何种版本渲染当前页面)

说明：用于告知浏览器以何种版本来渲染页面。（一般都设置为最新模式，在各大框架中这个设置也很常见。）

```html
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/> //指定IE和Chrome使用最新版本渲染当前页面
```

##### cache-control(指定请求和响应遵循的缓存机制)

###### 用法1.

说明：指导浏览器如何缓存某个响应以及缓存多长时间。

```html
<meta http-equiv="cache-control" content="no-cache">
```

共有以下几种用法：

1. no-cache: 先发送请求，与服务器确认该资源是否被更改，如果未被更改，则使用缓存。
2. no-store: 不允许缓存，每次都要去服务器上，下载完整的响应。（安全措施）
3. public : 缓存所有响应，但并非必须。因为max-age也可以做到相同效果
4. private : 只为单个用户缓存，因此不允许任何中继进行缓存。（比如说CDN就不允许缓存private的响应）
5. maxage : 表示当前请求开始，该响应在多久内能被缓存和重用，而不去服务器重新请求。例如：max-age=60表示响应可以再缓存和重用 60 秒。

> [参考链接：HTTP缓存](https://link.segmentfault.com/?enc=g0wxoHT0Oi4trg%2F%2Ban326g%3D%3D.dEwDy5%2FLkodWzR2WjHO05GZuB6PtHxTtOBUB1IDUDaERHCm3hXiEiPVHJzbYOa8d8%2Bw1LuwSX3ne0BZ%2FPWKqZ1KNEXjrYZJH41veJo6QM4d%2B5RhdP27jIuR%2B89KmUlmlPVIMpMymxG96ffRTtVU9tat2pi6tP03mSJqyUn3cINY%3D)

###### 用法2.(禁止百度自动转码)

说明：用于禁止当前页面在移动端浏览时，被百度自动转码。虽然百度的本意是好的，但是转码效果很多时候却不尽人意。所以可以在head中加入例子中的那句话，就可以避免百度自动转码了。
举例：

```html
<meta http-equiv="Cache-Control" content="no-siteapp" />
```

##### expires

说明:用于设定网页的到期时间，过期后网页必须到服务器上重新传输。

```html
<meta http-equiv="expires" content="Sunday 26 October 2016 01:00 GMT" />
```



##### Set-Cookie(cookie设定)

如果网页过期。那么这个网页存在本地的cookies也会被自动删除。

```html
<meta http-equiv="Set-Cookie" content="name, date"> //格式

<meta http-equiv="Set-Cookie" content="User=Lxxyx; path=/; expires=Sunday, 10-Jan-16 10:00:00 GMT"> //具体范例
```



##### Refresh

meta实现自动刷新

```html
<!-- 在 5s 之后自动跳转到同域下的 page2.html 页面 -->
<meta http-equiv="Refresh" content="5; URL=page2.html">
```



#### 其他类型元数据

Facebook和twitter提供的元数据协议

```html
<meta property="twitter:site" content="@FinancialTimes">
<meta proeprty="fb:pages" content="8860325749">
```



### link标签

#### 作用

* 指明当前文档和外部资源的关系
* 最常用连接到样式表, 网站icon图标(facivon, 移动端上的home屏幕或者app)



#### 属性





#### 作用

通过预处理提升渲染速度

- **dns-prefetch**。当 link 标签的 rel 属性值为“dns-prefetch”时，浏览器会对某个域名预先进行 DNS 解析并缓存。这样，当浏览器在请求同域名资源的时候，能省去从域名查询 IP 的过程，从而减少时间损耗。
- **preconnect**。让浏览器在一个 HTTP 请求正式发给服务器前预先执行一些操作，这包括 DNS 解析、TLS 协商、TCP 握手，通过消除往返延迟来为用户节省时间。
- **prefetch/preload**。两个值都是让浏览器预先下载并缓存某个资源，但不同的是，prefetch 可能会在浏览器忙时被忽略，而 preload 则是一定会被预先下载。
- **prerender**。浏览器不仅会加载资源，还会解析执行页面，进行预渲染。

![Untitled](https://cdn.staticaly.com/gh/aotushi/image-hosting@master/documentation/Untitled.2apv2rlf77i8.webp)





### script标签

#### 属性

**async**
对传统脚本来说,如果async存在,那传统脚本会在解析的同时并行获取,并在可用时立即执行.
对模块脚本来说,如果async存在,那脚本和所有的依赖将在延迟队列中执行,所以它们在解析时获取并一旦可用立即执行.
此属性允许消除**解析器阻塞JavaScript(parser-blocking JS)**，其中浏览器必须在继续解析之前加载和评估脚本。在这种情况下，延迟具有类似的效果

**defer**
声明之后,表明脚本应该在文档解析之后执行,但是在开始DOMContentLoaded之前.
如果缺少src属性,则不能使用此属性,其不会起到任何作用.
对模块脚本没有作用,模块脚本默认延迟.
带有defer属性的脚本将以它们出现在文档中的顺序来执行



**crossorigin**
对于未通过标准CORS检查的脚本,将只为window.onerror()传递最少的信息.
若要允许为静态资源使用单独域名的网站进行错误记录,则使用此属性.




#### 问题:
在script标签中写入defer或者async时，就会使JS文件异步加载，即html执行到script标签时，JS加载和文档解析同时进行.
async是在加载完成后,立即执行,阻塞HTML解析.
defer是在加载完成后,等到HTML加载完成后再加载.
所以,浏览器解析new Vue时候会报错.
两种解决方案:
1.移除关键字
2.将Vue实例代码放在一个DOMContentLoader事件监听器中,以确保在创建实例之前,vue已经加载完成.
```html
//Uncaught ReferenceError: Vue is not defined
<html>
  <head>
    <script src="https://unpkg.com/vue@2" async ></script>
  </head>
  <body>
    <div id="root">
      //...
    </div>
    
    <script>
	    document.addEventListener('DOMContentLoaded', function() {
		    let vm = new Vue({
        el:"#root",
	      })
	    })
    </script>
  </body>
</html>
```





### viewport









### style标签



### title标签



### base标签





## 其他

异步加载HTML

> [Async Fragments: Rediscovering Progressive HTML Rendering with Marko (ebayinc.com)](https://tech.ebayinc.com/engineering/async-fragments-rediscovering-progressive-html-rendering-with-marko/)





### crossorigin属性
概况
用在audio,video,img,link,script元素上.定义元素如何处理跨域请求,