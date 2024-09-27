

[前端响应式布局实现方案 - 掘金](https://juejin.cn/post/7227358177490567226)
[移动端适配及PC端适配心得总结体会(一) (可能比较全 - 掘金](https://juejin.cn/post/6884042902587047943)
[移动端适配及PC端适配心得总结体会(二) (可能比较全 - 掘金](https://juejin.cn/post/6885721051360133133)

# 相关概念

### 1.像素相关
#### 像素
像素就是构成图像的最小单位,指显示屏上的最小单位, 图像由像素组成,单位面积内的像素越多 效果就越好 像素的大小不是绝对的,是根据设备的分辨率决定的

#### 分辨率
屏幕分辨率 : 屏幕横向和纵向的像素点数,单位为px
>相同大小的屏幕 分辨率越低,单位像素尺寸越大,分辨率越高,单位像素尺寸越小

图像分辨率 : 指图片含有的像素数 , 表示图片分别在垂直和水平上所具有的像素点数
>同一尺寸的图片，分辨率越高，图片越清晰。


#### PPI
每英寸包括的像素数
>PPI可以用于描述屏幕的清晰度以及一张图片的质量,PPI越高，屏幕越清晰。

#### 设备物理像素(物理分辨率)
设备的真实分辨率 屏幕有多少个像素点 就是多少分辨率
>以iphone6 为例 物理分辨率为750x1334,也就是显示屏内部led灯的个数


#### 设备独立像素dips(逻辑分辨率)
一种单位来告诉不同分辨率的手机，它们在界面上显示元素的大小是多少 即设备几个像素当成一个像素使用
>以iphone6为例, dips为375x667 即是2x2个物理像素当做一个设备独立像素

#### 设备像素比dpr
物理像素比设备独立像素的比值

css中的像素只是一个抽象的单位，在不同的设备或不同的环境中，css中的1px所代表的设备物理像素是不同的,1px并不是绝对的,它只代表了当前设备像素的最小单位.
在pc端 1px等于一个设备的物理像素,但是移动设备的屏幕像素密度越来越高 ,iphone6上一个css像素是等于两个物理像素,通过dpr，我们可以知道该设备上一个css像素代表多少个物理像素

**获取设备像素比dpr**
```js
window.devicePixelRatio
```

```css
-webkit-min-device-pixel-ratio
React Native: PixelRatio.get()
```


**其它**
为什么iphone6的逻辑像素是375 ,设计稿为750宽

这种设计图秤为2倍图,因为切图时获取的图片是页面的两倍大, 但是视网膜屏幕会把图片缩小一倍,这样会更加细腻 更清晰,


#### CSS像素
CSS像素，当页面缩放比例为100%时，一个CSS像素等于一个设备独立像素。

但是CSS像素是很容易被改变的，当用户对浏览器进行了放大，CSS像素会被放大，这时一个CSS像素会跨越更多的物理像素。

`页面的缩放系数 = CSS像素 / 设备独立像素`


### 视口

#### 布局视口layout viewport
##### 定义
布局视口:当前浏览器的可视区域,不包括菜单栏及浏览器的ui不包含滚动条等

##### 表现
在PC端上，设置viewport不生效,布局视口永远等于浏览器窗口的宽度。
在移动端上，由于要使为PC端浏览器设计的网站能够完全显示在移动端的小屏幕里 布局视口默认是980px,会出现滚动条

但是在iphone和ipad上没有指定初始的缩放值的话，那么iphone和ipad会自动计算initial-scale这个值，以保证当前layout viewport的宽度在缩放后就是浏览器可视区域的宽度

**获取布局视口宽度**
```js
document.documentElement.clientWidth / Height
```


#### 视觉视口visual viewport

##### 定义
用户当前看到的区域,包含滚动条等.默认等于当前浏览器的窗口大小

##### 表现
用户通过缩放放大网站，CSS像素增大,一个CSS像素可以跨越更多的设备像素,我们能看到的网站区域将缩小，此时视觉视口变小

假设屏幕上本来需要200个CSS像素才能占满屏幕，由于放大，现在只需要100个CSS像素就能占满，所以视觉视口的宽就变成100px。

同理, 用户缩小网站，我们看到的网站区域将变大，此时视觉视口变大

##### 获取视觉视口宽度
```js
window.innerWidth
```


#### 理想视口ideal viewport

##### 定义
> 布局视口的一个理想尺寸，只有当布局视口的尺寸等于设备屏幕的尺寸时，才是理想视口。

##### 表现
ideal viewport 的意义在于，无论在何种分辨率的屏幕下，那些针对ideal viewport 而设计的网站，不需要用户手动缩放，也不需要出现横向滚动条，都可以完美的呈现给用户。
比如一段14px大小的文字，不会因为在一个高密度像素的屏幕里显示得太小而无法看清，理想的情况是这段14px的文字无论是在何种密度屏幕，何种分辨率下，显示出来的大小都是差不多的。

##### 获取理想视口宽度
```js
window.screen.width
```


#### 移动端实现理想视口
```html
<meta name="viewport" content="width=device-width; initial-scale=1; maximum-scale=1; minimum-scale=1; user-scalable=no;" />
```

**meta标签的作用**
该meta标签的作用是让当前布局视口的宽度等于设备的宽度，同时不允许用户手动缩放

视觉视口等于理想视口这时，1个CSS像素就等于1个设备独立像素，而且我们也是基于理想视口来进行布局的，所以呈现出来的页面布局在各种设备上都能大致相似。

>要把当前的viewport宽度设为ideal viewport的宽度，既可以设置 width=device-width，也可以设置 initial-scale=1，但这两者各有一个小缺陷，就是iphone、ipad以及IE 会横竖屏不分，通通以竖屏的ideal viewport宽度为准。所以，最完美的写法应该两者都写上去，这样就 initial-scale=1 解决了 iphone、ipad的毛病，width=device-width则解决了IE的毛病：

页面的缩放系数 = 理想视口宽度 / 布局视口宽度

如果meta同时设置了 initial-scale和width,布局视口 讲取两者间的最大值

参考:[视口解析](https://www.jianshu.com/p/7c5fdf90c0ef)



#### 常见获取窗口的大小
![[Pasted image 20231005181534.png]]

* document.documentElement.clientHeight：获取浏览器布局视口高度，包括内边距，但不包括垂直滚动条、边框和外边距。
* document.documentElement.offsetHeight：包括内边距、滚动条、边框和外边距。
* document.documentElement.scrollHeight：在不使用滚动条的情况下适合视口中的所有内容所需的最小宽度。测量方式与clientHeight相同：它包含元素的内边距，但不包括边框，外边距或垂直滚动条。
* window.innerHeight：获取浏览器视觉视口高度（包括垂直滚动条）。
* window.outerHeight：获取浏览器窗口外部的高度。表示整个浏览器窗口的高度，包括侧边栏、窗口镶边和调正窗口大小的边框。
* window.screen.Height：获取获屏幕取理想视口高度，这个数值是固定的，设备的分辨率/设备像素比
* window.screen.availHeight：浏览器窗口可用的高度。



### 响应式设计与自适应设计的区别
>响应式开发一套界面，通过检测视口分辨率，针对不同客户端在客户端做代码处理，来展现不同的布局和内容；
>自适应需要开发多套界面，通过检测视口分辨率，来判断当前访问的设备是pc端、平板、手机，从而请求服务层，返回不同的页面。




### 适配分辨率有哪些?

```md
//PC & MAC & Chrome
常用
1280 x 800
1366 x 1024 (IPad Pro)
1440 x 900
1680 x 1050
1600 x 900
1920 x 1200
2560 x 1440
更高忽略
2880 x 1620
3200 x 1800
5120 x 2880

// PC & Windows & Chrome （或 PC & MAC & Chrome & 外设显示器）
1280 x 720/1024
1366 x 768
1440 × 900
1600 x 900
1920 x 1080




```


### 屏幕尺寸大全
* https://uiiiuiii.com/screen/




# PC适配


### 媒体查询

#### 是什么
通过css的@media、link的meida属性可以针对不同的屏幕大小使用对应的样式。通常用来特殊处理，适配不同屏幕，比如屏幕较小时隐藏侧边栏等

通常会有几个分割点，区分不同屏幕大小。常见分割方案如下

* <=600px， <=900px，<=1200px， <=1800px，>1800px
* <=480px，<=800px， <=1400px， >1400
* <768px（超小屏幕-手机），>=768px（小屏幕-平板），>=992px（桌面端），>=1200px（大屏）

TIP: 不管是移动优先还是PC优先，都是依据当随着屏幕宽度增大或减小的时候，后面的样式会覆盖前面的样式。因此，<span style="color:blue;">移动端优先首先使用的是min-width，PC端优先使用的max-width</span> ???

#### 使用方式
* css的@meida
```css
@media screen and (max-width: 1400px) {
	.home {
		width: 80%;
		font-size: 14px;
	}
}

@media screen and (max-width: 900px) {
	.home {
		width: 100%;
		font-size: 10px;
	}

}
```
* link的media属性
```html
< link rel="stylesheet" media="(max-width: 1400px)" href="pc.css" />
< link rel="stylesheet" media="(max-width: 900px)"  href="laptop.css" />
```


#### 样式案例
**通用样式**
```css
设备范围
    默认样式    注意：默认样式要写在最前面
    /* 打印样式 */
        @media print {}
    /* 手机等小屏幕手持设备 */
        @media screen and (min-width: 320px) and (max-width: 480px) {}
    /* 平板之类的宽度 1024 以下设备 */
        @media only screen and (min-width: 321px) and (max-width: 1024px) {}
    /* PC客户端或大屏幕设备: 1028px 至更大 */
        @media only screen and (min-width: 1029px) {}
    /* 竖屏 */
        @media screen and (orientation:portrait) {对应样式}
    /* 横屏 */
        @media screen and (orientation:landscape){对应样式}
```

**移动优先**
```css
/* iphone6 7 8 */
body {
    background-color: yellow;
}
/* iphone 5 */
@media screen and (max-width: 320px) {
    body {
      background-color: red;
    }
}
/* iphoneX */
@media screen and (min-width: 375px) and (-webkit-device-pixel-ratio: 3) {
    body {
      background-color: #0FF000;
    }
}
/* iphone6 7 8 plus */
@media screen and (min-width: 414px) {
    body {
      background-color: blue;
    }
}
/* ipad */
@media screen and (min-width: 768px) {
    body {
      background-color: green;
    }
}
/* ipad pro */
@media screen and (min-width: 1024px) {
    body {
      background-color: #FF00FF;
    }
}
/* pc */
@media screen and (min-width: 1100px) {
    body {
      background-color: black;
    }
}

```

**PC优先**
```css
/* pc width > 1024px */
    body {
        background-color: yellow;
    }
/* ipad pro */
@media screen and (max-width: 1024px) {
    body {
        background-color: #FF00FF;
    }
}
/* ipad */
@media screen and (max-width: 768px) {
    body {
        background-color: green;
    }
}
/* iphone6 7 8 plus */
@media screen and (max-width: 414px) {
    body {
        background-color: blue;
    }
}
/* iphoneX */
@media screen and (max-width: 375px) and (-webkit-device-pixel-ratio: 3) {
    body {
        background-color: #0FF000;
    }
}
/* iphone6 7 8 */
@media screen and (max-width: 375px) and (-webkit-device-pixel-ratio: 2) {
    body {
        background-color: #0FF000;
    }
}
/* iphone5 */
@media screen and (max-width: 320px) {
    body {
        background-color: #0FF000;
    }
}

```

#### 布局案例: 媒体查询+rem
```css
html{
   font-size:19.20px;  /*默认以设计稿为基准,将设计稿除100*/
   //1rem = 19.20px
}
@media only screen and (max-width: 1366px) {
	 //1rem = 13.66px;
   html{
      font-size:13.66px;
   }
}
#test{
   width:14.21875rem;
}

```


优点: 面对不同分辨率设备灵活性强,  能够快捷解决多设备显示适应问题
缺点:
* 只能在选取的几个主流设备尺寸下呈现完美适配，
* 用户体验也不友好，布局在响应断点范围内的分辨率下维持不变，而在响应断点切换的瞬间，布局带来断层式的切换变化
* 代码累赘 工作量大 效率低 加载时间长
* 一定程度上改变了原有的网站结构

#### 兼容性
除了 ie 大部分浏览器都支持
![[Pasted image 20231003161642.png]]


### 百分比
#### 是什么
根据比值来计算, 一个元素在原设计稿里，量出来距离顶部是200px，如果写死可能是`top:200px` 或者`margin-top:200px`,现在要转成百分比，那么这个值可能就是`23.3%`。这个值怎么算？如果设计稿是1080，`200/1080=18.51%`这样计算出来百分比的值。

#### 设计方法
设计方法：使用%百分比定义宽度，高度大都是用px来固定住，可以根据可视区域 (viewport) 和父元素的实时尺寸进行调整，尽可能的适应各种分辨率。往往配合 max-width/min-width 等属性控制尺寸流动范围以免过大或者过小影响阅读。

注意事项:
>子元素height和width/ top和bottom 、left和right的百分比是相对于父元素width，height
子元素的padding/margin 不论是垂直方向或者是水平方向，都相对于直接父亲元素的width，而与父元素的height无关。



#### 案例1
```css
/* pc width > 1100px */
html, body { margin: 0;padding: 0;width: 100%;height: 100%;}
aside {
    width: 10%;
    height: 100%;
    background-color: red;
    float: left;
}
main {
    height: 100%;
    background-color: blue;
    overflow: hidden;
}
/* ipad pro */
@media screen and (max-width: 1024px) {
    aside {
      width: 8%;
      background-color: yellow;
    }
}
/* ipad */
@media screen and (max-width: 768px) {
    aside {
      float: none;
      width: 100%;
      height: 10%;
      background-color: green;
    }
    main {
      height: calc(100vh - 10%);
      background-color: red;
    }
}
/* iphone6 7 8 plus */
@media screen and (max-width: 414px) {
    aside {
      float: none;
      width: 100%;
      height: 5%;
      background-color: yellow;
    }
    main {
      height: calc(100vh - 5%);
      background-color: red;
    }
}
/* iphoneX */
@media screen and (max-width: 375px) and (-webkit-device-pixel-ratio: 3) {
    aside {
      float: none;
      width: 100%;
      height: 10%;
      background-color: blue;
    }
    main {
      height: calc(100vh - 10%);
      background-color: red;
    }
}
/* iphone6 7 8 */
@media screen and (max-width: 375px) and (-webkit-device-pixel-ratio: 2) {
    aside {
      float: none;
      width: 100%;
      height: 3%;
      background-color: black;
    }
    main {
      height: calc(100vh - 3%);
      background-color: red;
    }
}
/* iphone5 */
@media screen and (max-width: 320px) {
    aside {
      float: none;
      width: 100%;
      height: 7%;
      background-color: green;
    }
    main {
      height: calc(100vh - 7%);
      background-color: red;
    }
}
```


#### 案例2-rem和vw单位在移动端最佳实践
> CSS新世界 7.3rem和vw单位 -张鑫旭

有了vw单位，再配合calc()函数进行计算，无须使用任何JavaScript代码，我们就可以实现基于设备宽度的移动端布局适配方案。
```css
html {
    font-size: 16px;
}
@media screen and (min-width: 375px) {
    html {
        /* 375px作为16px基准，414px宽度时正好对应18px的根字号大小 */
        font-size: calc(16px + 2 * (100vw - 375px) / 39);
    }
}
@media screen and (min-width: 414px) {
    html {
        /* 屏幕宽度从414px到1000px，根字号大小累积增加4px（18px-22px） */
        font-size: calc(18px + 4 * (100vw - 414px) / 586);
    }
}
@media screen and (min-width: 1000px) {
    html {
        /* 屏幕宽度从1000px往后每增加100px，根字号大小就增加0.5px */
        font-size: calc(22px + 5 * (100vw - 1000px) / 1000);
    }
}
```


### 纯CSS方案
>[作为一个初级前端，面试的时候要求手写js轮播效果，写不出来正常吗？ - 知乎](https://www.zhihu.com/question/326363448/answer/1847750740)

响应式字体大小
```js
calc(38px + (60-38)*(100vw - 768px) / (1440px-768px))
```



### 动态rem方案
#### rem与em的区别
* em  两种情况: 用于font-size表示代表父元素字体大小;用在其它属性代表当前元素自身的font-size
* rem 根据根节点 html 的字体大小计算（root em），默认是 16 px

#### 是什么
以rem/em作为长度单位声明所有节点的几何属性，再根据不同屏幕大小，设置 **根元素/当前元素 的font-size**来实现响应式。通常用于对不同屏幕大小要设置不同字体大小，对响应式要求较高的系统

#### rem布局思想
* 一般不要给元素设置具体的宽度，但是对于一些小图标可以设定具体宽度值
* 高度值可以设置固定值，设计稿有多大，我们就严格有多大
* 所有设置的固定值都用rem做单位（首先在HTML总设置一个基准值：px和rem的对应比例，然后在效果图上获取px值，布局的时候转化为rem值)
* js获取真实屏幕的宽度，让其除以设计稿的宽度，算出比例，把之前的基准值按照比例进行重新的设定，这样项目就可以在移动端自适应了


#### 案例0
全屏16:9的解决方案
* 在 css 表示长度的时候，用设计稿上的长度除以 192, 算得 rem 的值。
* 页面内写一段 js 代码，根据我们上面的公式去计算并设置 html 元素的 font-size 值。
```js
// 方法1
export function init(screenRatioByDesign: number = 16 / 9) {
  let docEle = document.documentElement
  function setHtmlFontSize() {
    var screenRatio = docEle.clientWidth / docEle.clientHeight;
    var fontSize = (
      screenRatio > screenRatioByDesign
        ? (screenRatioByDesign / screenRatio)
        : 1
    ) * docEle.clientWidth / 10;

    docEle.style.fontSize = fontSize.toFixed(3) + "px";
  }
  setHtmlFontSize()
  window.addEventListener('resize', setHtmlFontSize)
}

//方法2
function refreshRem() {
    var docEl = doc.documentElement;
    var width = docEl.getBoundingClientRect().width;
    var rem = width / 10;
    docEl.style.fontSize = rem + 'px';
    flexible.rem = win.rem = rem;
}
win.addEventListener('resize', refreshRem);
```
#### 案例1

> [个人博客-使用rem来实现PC端适配屏幕尺寸](https://waliblog.com/css/2018/03/19/compatible.html)

`rem`相对于根元素(即html元素)`font-size`计算值的倍数。这里以PC常见的分辨率1920px和1366px(14寸笔记本)为例说明。为了更好的说明，假设设计师给的设计稿是1920px，我们既要做1920px屏幕，也要给1366px的屏幕做适配。


如果某个元素宽度是`273px`，高度随意。那么在1366px屏幕上宽度应该显示多少呢？

我们将屏幕宽度等比分成100份
```
//1920分辨率屏幕
avg = 1920 / 100 = 19.20 px

//1366分辨率屏幕
avg = 1366 / 100 = 13.66 px
```
在1366分辨率屏幕应该显示宽度 = `1366 * (273 / 1920)` 最后是`194.228125`px

```
//1920分辨率屏幕定义根元素字体大小
font-size = 19.20px //即 1rem = 19.20px

//1366分辨率屏幕
font-size = 13.66px  //即 1rem = 13.66px
```

适配代码, 也就是`194.228125 / 13.66 = 14.21876`.

```
html{
   font-size:19.20px;  /*默认以设计稿为基准*/
}

@media only screen and (max-width: 1366px) {
   html{
      font-size:13.66px;
   }
}

#test{
   width:14.21875rem;
}
```

#### px自动转换rem
每次手动计算麻烦, 使用插件将写好的px直接转换为rem.

**sass方法**
```
// PX 转 rem
@function px2Rem($px, $base-font-size: 19.2px) {
  @if (unitless($px)) { //有无单位
    @return ($px / 19.2) * 1rem;
  } @else if (unit($px) == em) {
    @return $px;
  }
  @return ($px / $base-font-size) * 1rem;
}
```

测试
```
#test{
   width:px2Rem(273px) 
}
//输出
#test{
   width:14.21875rem;
}
```


**插件方法**


#### rem布局缺点
* 在响应式布局中，必须通过js来动态控制根元素font-size的大小，也就是说css样式和js代码有一定的耦合性，且必须将改变font-size的代码放在css样式之前
* REM布局也是目前多屏幕适配的最佳方式。默认情况下我们html标签的font-size为16px,我们利用媒体查询，设置在不同设备下的字体大小

### scale整体缩放
#### 是什么
>scale缩放主要用于大屏可视化的响应式场景。

#### 背景


#### 具体概述
如果当前屏幕宽高比（1920 / 1080）大于设计稿宽高比（1440 * 1024），需要缩放的比例就是屏幕高度除以设计稿高度（1080 / 1024 = 1.05）即transform: scale(1.05)
如果当前屏幕宽高比（1200 / 900）小于设计稿宽高比（1440 * 1024），需要缩放的比例就是屏幕宽度除以设计稿宽度（1200 / 1440 = 0.83）即transform: scale(0.83)









### Flex布局方案
传统的布局方案依赖于`display`、`position`、`float`等属性，对响应式布局并不友好）
**通常可以解决绝大多数情况下的响应式布局问题，包括圣杯布局、流式布局、多列布局、内容居中等多种场景**
**缺点**是宽度缩小但字体、图标等都不会同步缩小导致换行错位




### Grid布局
#### 是什么
Grid 布局即网格布局，比较擅长将一个页面划分为几个主要区域，以及定义这些区域的大小、位置、层次等关系。号称是最强大的的 CSS 布局方案，是目前唯一一种 CSS 二维布局。


### 第三方方案

#### UI框架自带响应式布局
##### 是什么
许多UI框架都自带一套响应式方案，这也是最易上手的响应式方案。以ElementUI为例

Layout布局
基于24 分栏布局的el-row、el-col，能够迅速简便地创建响应式布局，xs、sm、md、lg和xl属性更具体地设置响应式布局

Container布局容器
通过`<el-container>、<el-header>、<el-aside>、<el-aside>、<el-footer>`快速搭建页面的基本结构。


#### postcss-px-to-viewport
##### 是什么
一款插件, 将px单位转换为视口单位的 (vw, vh, vmin, vmax) 的 PostCSS 插件.

##### 仓库地址
[README\_CN.md](https://github.com/evrone/postcss-px-to-viewport/blob/master/README_CN.md)


##### 使用
1. 在项目中安装`postcss-px-to-viewport`包: `npm i postcss-px-to-viewport -D`
2. 项目根目录下创建`postcss.config.js`,或者在脚手架配置文件中plugins导入配置
3. 启动项目, 按照UI图上的尺寸编写即可

##### `postcss.config.js`
PC端配置
```js

// postcss.config.js

module.exports = {
	plugins: {
		// autoprefixer: {},
		'postcss-px-to-viewport-8-plugin': {
		unitToConvert: 'px', // 要转化的单位
		viewportWidth: 1920, // UI设计稿的宽度
		unitPrecision: 6, // 转换后的精度，即小数点位数
		propList: ['*'], // 指定转换的css属性的单位，*代表全部css属性的单位都进行转换
		viewportUnit: 'vw', // 指定需要转换成的视窗单位，默认vw
		fontViewportUnit: 'vw', // 指定字体需要转换成的视窗单位，默认vw
		selectorBlackList: ['wrap'], // 指定不转换为视窗单位的类名，
		minPixelValue: 1, // 默认值1，小于或等于1px则不进行转换
		mediaQuery: true, // 是否在媒体查询的css代码中也进行转换，默认false
		replace: true, // 是否转换后直接更换属性值
		exclude: [/node_modules/], // 设置忽略文件，用正则做目录名匹配
		landscape: false // 是否处理横屏情况
		}
	}
};

```

移动端配置
```js
// vue.config.js
module.exports = {
//动态设置 extract 的值。开发环境设为 false，生产环境设为 true，以便打包出单独的 css 文件。
extract: IS_PROD,
sourceMap: false,
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          require('postcss-px-to-viewport')({
            unitToConvert: 'px', // 需要转换的单位，默认为"px"
            viewportWidth: 375, // 视窗的宽度，对应移动端设计稿的宽度，一般是375
            // viewportHeight:667,// 视窗的高度，对应的是我们设计稿的高度
            unitPrecision: 3, // 单位转换后保留的精度
            propList: [
              // 能转化为vw的属性列表
              '*',
            ],
            viewportUnit: 'vw', // 希望使用的视口单位
            fontViewportUnit: 'vw', // 字体使用的视口单位
            selectorBlackList: [], // 需要忽略的CSS选择器，不会转为视口单位，使用原有的px等单位。
            minPixelValue: 1, // 设置最小的转换数值，如果为1的话，只有大于1的值会被转换
            mediaQuery: false, // 媒体查询里的单位是否需要转换单位
            replace: true, // 是否直接更换属性值，而不添加备用属性
            exclude: /(\/|\\)(node_modules)(\/|\\)/, // 忽略某些文件夹下的文件或特定文件，例如 'node_modules' 下的文件
          }),
        ],
      },
    },
  },
};
```


##### 存在的问题
* 行内样式不能转换为vw


#### flexible+postcss-pxtorem
>[一篇文章搞懂，vue中pc端与移动端适配解决方案（亲测有效） - 掘金](https://juejin.cn/post/7278646930174165050#heading-10)








# 移动端适配


> [移动端适配的5种方案 (juejin.cn)](https://juejin.cn/post/6953091677838344199)



# 屏幕/视口/像素概念
​在学习移动端之前，我们先来学习一些基础的概念和专有名词，这些知识会在以后的面试、工作沟通中经常用到。
> [移动端前端开发之viewport | 思忆技术 (si-yee.com)](https://blog.si-yee.com/2019/04/11/%E7%A7%BB%E5%8A%A8%E7%AB%AF%E5%89%8D%E7%AB%AF%E5%BC%80%E5%8F%91%E4%B9%8Bviewport/)


## 屏幕相关

### 1.屏幕大小
​			指屏幕对角线长度，单位是英寸(inch)。常见的尺寸有： 3.5寸、4.0寸、5.0寸、5.5寸、6.0寸等等。

​			**<span style="color:red">备注：1英寸(inch) = 2.54厘米(cm)</span>**

![](https://s1.ax1x.com/2020/06/27/NyZQbQ.png)


### 2.屏幕分辨率
​			是指屏幕在：横向、纵向上的**物理像素点**总数。一般表示用 n * m 表示。

​			例如：iPhone6 的屏幕分辨率为：<span style="color:red">**750 * 1334**</span>

- ​	注意点:	
  - <span style="color:red">**屏幕分辨率是一个固定值，无法修改！！**</span>
  - 屏幕分辨率、显示分辨率是两个概念，系统设置中可以修改的是：显示分辨率。
  - 屏幕分辨率 >= 显示分辨率。

**常见手机分辨率**

|                        型号                         |           分辨率（物理像素点总和）            |
| :-------------------------------------------------: | :-------------------------------------------: |
|                   iPhone 3G / 3GS                   |                   320 * 480                   |
|                    iPhone 4 / 4s                    |                   640 * 960                   |
|                    iPhone 5 / 5s                    |                  640 * 1136                   |
| <span style='color:red'>**iPhone 6 / 7 / 8**</span> | **<span style='color:red'>750 * 1334</span>** |
|                 iPhone 6p / 7p / 8p                 |                  1242 x 2208                  |
|                      iPhone X                       |                  1125 * 2436                  |
|                      华为 P30                       |                  1080 * 2340                  |
|                     华为Mate40                      |                  2772 x 1344                  |
|                       小米10                        |                  2340 x 1080                  |
|                       小米11                        |                  3200 x 1440                  |

### 3.屏幕密度

又称：屏幕像素密度，是指屏幕上每英寸里包含的物理像素点个数，单位是 ppi （pixels per inch），其实这里还有另一个单位 dpi（dots per inch），两个值的计算方式都一样，只是使用的场景不同。 ppi主要用来衡量屏幕，dpi 用来衡量打印机、投影仪等。

<img src="https://s1.ax1x.com/2020/06/27/NyZ1Ej.png" style="zoom: 25%;" />



## 像素相关

> https://www.cnblogs.com/houxianzhou/p/14604922.html
> 

### 0. css(css pixel, px) 像素

> 适用于web编程， 在CSS中以px为后缀，是一个长度单位

在 CSS 规范中，长度单位可以分为两类，绝对单位以及相对单位

px是一个相对单位，相对的是设备像素（device pixel）

一般情况，页面缩放比为1，1个CSS像素等于1个设备独立像素

`CSS`像素又具有两个方面的相对性：

- 在同一个设备上，每1个 CSS 像素所代表的设备像素是可以变化的（比如调整屏幕的分辨率）
- 在不同的设备之间，每1个 CSS 像素所代表的设备像素是可以变化的（比如两个不同型号的手机）

在页面进行缩放操作也会 引起`css`中`px`的变化，假设页面放大一倍，原来的 1px 的东西变成 2px，在实际宽度不变的情况下1px 变得跟原来的 2px 的长度（长宽）一样了（元素会占据更多的设备像素）

假设原来需要 320px 才能填满的宽度现在只需要 160px

px会受到下面的因素的影响而变化：

- 每英寸像素（PPI）
- 设备像素比（DPR）



### 1.设备像素（device pixel）

**设备像素：又名物理像素**(physical pixel)。指的是设备能控制显示的最小物理单位，不一定是一个小正方形区块，也没有标准的宽高，只是用于显示丰富色彩的一个“点”而已

可以参考公园里的景观变色彩灯，一个彩灯(物理像素)由红、蓝、绿小灯组成，三盏小灯不同的亮度混合出各种色彩

从屏幕在工厂生产出的那天起，它上面设备像素点就固定不变了，单位为`pt`

![](https://mmbiz.qpic.cn/mmbiz_png/gH31uF9VIibRcRiczR54yJAzIMHicu30E1HhFYuugVde3iaSHW43XF1xDaoKBwwsQhVfgu362RNXCTfgsBpnmQ9Evw/640?wx_fmt=png)



### 3.设备独立像素

设备独立像素简称 DIP （device-independent pixel），又称：**屏幕密度无关像素**。表示*与设备无关的逻辑像素*，<span style="color:blue">代表可以通过程序控制使用的虚拟像素</span>。是一个总体概念，包括了`css`像素。可以理解为：<span style="color:blue">`CSS像素 = 设备独立像素 = 逻辑像素`。</span>在`iOS`、`Android`和`React Native`开发中样式单位其实都使用的是设备独立像素。

**出现的原因?**

更高分辨率的屏幕诞生.理论上来讲，在白色手机(分辨率320\*480)上相同大小的图片和文字，在黑色手机(分辨率640\*960)上会被缩小一倍，因为它的分辨率提高了一倍。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/37001e1c48e14b6c8606024183a1151b~tplv-k3u1fbpfcp-zoom-in-crop-mark:1304:0:0:0.awebp)

乔布斯在`iPhone4`的发布会上首次提出了`Retina Display`(视网膜屏幕)的概念，它正是解决了上面的问题. 在`iPhone4`使用的视网膜屏幕中，<span style="color:blue;">把`2x2`个像素当`1`个像素使用</span>，这样让屏幕看起来更精致，但是元素的大小却不会改变。

如果黑色手机使用了视网膜屏幕的技术，那么显示结果应该是下面的情况，比如列表的宽度为`300`个像素，那么在一条水平线上，白色手机会用`300`个物理像素去渲染它，而黑色手机实际上会用`600`个物理像素去渲染它。



我们必须<span style="color:blue">用一种单位</span>来同时告诉不同分辨率的手机，要显示的目标(对象)在界面上显示元素的大小是多少，这个单位就是设备独立像素(`Device Independent Pixels`)简称`DIP`或`DP`。

上面我们说，列表的宽度为`300`个像素，实际上我们可以说：列表的宽度为`300`个设备独立像素。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a0dd7c1f817e4bbabe5590651ed97eb6~tplv-k3u1fbpfcp-zoom-in-crop-mark:1304:0:0:0.awebp)



Chrome开发工具,模拟手机型号,每种型号上面会显示一个尺寸，比如`iPhone X`显示的尺寸是`375x812`，实际`iPhone X`的分辨率会比这高很多，这里显示的就是设备独立像素。



### 获取DIP

在`javaScript`中可以通过`window.screen.width/ window.screen.height` 查看





#### 4.设备像素比(dpr)

设备像素比dpr(device pixel ratio), 单一方向上【设备像素】除以【设备独立像素】的比值，用于描述整个渲染环境在硬件设备上的缩放程度。


$$
dpr = \frac{设备像素}{设备独立像素}
$$


获取:

在`web`中，浏览器为我们提供了`window.devicePixelRatio`来帮助我们获取`dpr`。

在`css`中，可以使用媒体查询`min-device-pixel-ratio`，区分`dpr`：

```css
@media (-webkit-min-device-pixel-ratio: 2), (min-device-pixel-ratio: 2) {}
```



几款手机的屏幕像素参数，[点击这里查看更多](https://uiiiuiii.com/screen/)

|                        型号                         |           分辨率（物理像素点总和）            |            设备独立像素(dip或dp)             |             像素比(dpr)              |
| :-------------------------------------------------: | :-------------------------------------------: | :------------------------------------------: | :----------------------------------: |
|                     IPhone 3GS                      |                   320 * 480                   |                  320 * 480                   |                  1                   |
|                    IPhone 4 / 4s                    |                   640 * 960                   |                  320 * 480                   |                  2                   |
|                    IPhone 5 / 5s                    |                  640 * 1136                   |                  320 * 568                   |                  2                   |
| <span style='color:red'>**IPhone 6 / 7 / 8**</span> | **<span style='color:red'>750 * 1334</span>** | **<span style='color:red'>375 * 667</span>** | **<span style='color:red'>2</span>** |
|                 IPhone 6p / 7p / 8p                 |                  1242 x 2208                  |                  414 * 736                   |                  3                   |
|                      IPhone X                       |                  1125 * 2436                  |                  375 * 812                   |                  3                   |
|                       华为P10                       |                  1080 x 1920                  |                  360 x 640                   |                  3                   |



具体描述如下：

| 设备像素比 | 设备像素         | CSS像素 |
| ---------- | ---------------- | ------- |
| 1:1        | 1*1  1个设备像素 | 1       |
| 2:1        | 2*2  4个设备像素 | 1       |
| 3:1        | 3*3 9个设备像素  | 1       |

例外:

`iPhone 6、7、8 Plus`的实际物理像素是`1080 x 1920`，

在Chrome开发者工具中它的设备独立像素是`414 x 736`，设备像素比为`3`，

设备独立像素和设备像素比的乘积并不等于`1080 x 1920`，而是等于`1242 x 2208`。

实际上，手机会自动把`1242 x 2208`个像素点塞进`1080 * 1920`个物理像素点来渲染，我们不用关心这个过程，而`1242 x 2208`被称为屏幕的`设计像素`。我们开发过程中也是以这个`设计像素`为准。



安卓和苹果手机上设备独立像素的应用:

从苹果提出视网膜屏幕开始，才出现设备像素比这个概念.

由于`Android`屏幕尺寸非常多、分辨率高低跨度非常大，不像苹果只有它自己的几款固定设备、尺寸。所以，为了保证各种设备的显示效果，`Android`按照设备的像素密度将设备分成了几个区间：

由于各个设备的尺寸、分辨率上的差异，设备独立像素也不会完全相等，所以各种`Android`设备仍然不能做到在展示上完全相等。		


#### 总结

因为苹果高清屏的出现,为了保持设计值在不同设备上保持同样的宽高, 引入了设备独立像素(dip).

和出厂就设定好的<u>设备像素</u>不同, 设备独立像素是一个虚拟像素单位,不同设备上其值也不同, 其值获取方式为: `window.screen.width / height`

在高清屏上用来表示`x*x`个设备像素来表示一个设备独立像素, 所以出现<u>设备像素比(`dpr device-pixel-ratio`)</u>的概念,其求值公式是`dpr=设备像素/设备独立像素`,

注意: 某些手机的<u>设备独立像素 × 设备像素比 > 设备像素</u>, 手机会自动把其乘积的像素塞进设备像素内,我们不需要关心这个过程,开发中仍然以其乘积作为设计像素为准.

由于各个设备尺寸,分辨率上的差异,设备独立像素也不完全相等所以各种安卓设备仍然不能做到展示上完全相等.



* 无缩放情况下，1个CSS像素等于1个设备独立像素
* 设备像素由屏幕生产之后就不发生改变，而设备独立像素是一个虚拟单位会发生改变
* PC端中，1个设备独立像素 = 1个设备像素 （在100%，未缩放的情况下）
* 在移动端中，标准屏幕（160ppi）下 1个设备独立像素 = 1个设备像素
* 设备像素比（dpr） = 设备像素 / 设备独立像素
* 每英寸像素（ppi），值越大，图像越清晰







### 图片高清显示

#### 位图像素

位图和矢量图

- 位图，又称点阵图像或栅格图像，是由n个的像素点组成的。放大后会失真。(常见有：png、jpeg、jpg、gif)

  一般使用：PhotoShop等软件进行编辑

- 矢量图，又称为面向对象图像或绘图图像，在数学上定义为一系列由线连接的点，放大后不会失真。（常见：svg）

  一般使用：Adobe Illustrator，Sketch等软件进行编辑

位图像素也是一个长度单位，位图像素可以理解为位图中的一个“小格子”，是位图的最小单元。

<img src="http://yanxuan.nosdn.127.net/e3806cdf0166598c91224acbc390971b.png" />



> <span style="color:red">注意：1个位图像素对应1个物理像素，图片才能得到完美清晰的展示。</span>
>
> 具体编码时借助媒体查询：@media screen and (-webkit-min-device-pixel-ratio:x)



#### media显示图片

> 在不同dpr下的设备显示分辨率不同的图片



```css
//1.浏览器适配
//2.媒体查询的坑:会逐个全部匹配,所以顺序有要求:要是查询min,从小到大;查询max,从大到小写css.
//3.现状:现在使用media的项目少,一般是使用链接显示图片.

//查询min,像素比从小到大排列.
@media screen and (-webkit-min-device-pixel-ratio:2){
    .log{
        content:url(../imgs/logo@2x.png);
    }
}
@media screen and (-webkit-min-device-pixel-ratio:3){
    .log{
        content:url(../imgs/logo@2x.png);
    }
}
```



## 视口(viewport)

> [Viewport - 术语表 | MDN (mozilla.org)](https://developer.mozilla.org/zh-CN/docs/Glossary/Viewport#了解更多)
> https://developer.mozilla.org/en-US/docs/Web/CSS/Viewport_concepts
>
> https://juejin.cn/post/6844903734347055118
>
> https://www.luanzhuxian.com/post/fd25c770.html#:~:text=%E4%B8%8A%E9%9D%A2%E5%9C%A8%E4%BB%8B%E7%BB%8D%20CSS%20%E5%83%8F%E7%B4%A0,%E8%A7%86%E5%8F%A3%3D%20%E8%A7%86%E8%A7%89%E8%A7%86%E5%8F%A3%20%E3%80%82
> [移动端前端开发之viewport | 思忆技术 (si-yee.com)](https://blog.si-yee.com/2019/04/11/%E7%A7%BB%E5%8A%A8%E7%AB%AF%E5%89%8D%E7%AB%AF%E5%BC%80%E5%8F%91%E4%B9%8Bviewport/) 未整理





### 概述

viewport 即视窗、视口，用于显示网页部分的区域，在 PC 端视口即是浏览器窗口区域;
在移动端，为了让页面展示更多的内容，视窗的宽度默认不为设备的宽度，在移动端视窗有三个概念：**布局视窗、视觉视窗、理想视窗**

**布局视口**
> 在浏览器窗口css的布局区域，布局视口的宽度限制css布局的宽。为了能在移动设备上正常显示那些为pc端浏览器设计的网站，移动设备上的浏览器都会把自己默认的 viewport 设为 980px 或其他值，一般都比移动端浏览器可视区域大很多，所以就会出现浏览器出现横向滚动条的情况

  
**视觉视口**
终端设备显示网页的区域

**理想视口**
> 针对当前设备最理想的展示页面的视窗，不会出现横向滚动条，页面刚好全部展现在视窗内，理想视窗也就是终端屏幕的宽度。

> 移动设备的理想`viewport`，即网站页面在移动端展示的理想大小。可以通过调用`screen.width / height`来获取理想视口大小。没有一个固定的尺寸，不同的设备有不同`ideal viewport`。
  上面在介绍`CSS`像素时曾经提到`页面的缩放系数 = CSS像素 / 设备独立像素`，实际说`页面的缩放系数 = 理想视口宽度 / 视觉视口宽度`更为准确。????
所以，当页面缩放比例为100%时，`ideal viewport`的宽度等于移动设备的屏幕宽度，`CSS像素 = 设备独立像素`，`理想视口 = 视觉视口`。
`ideal viewport`的意义在于，无论在何种分辨率的屏幕下，那些针对`ideal viewport`而设计的网站，不需要用户手动缩放，也不需要出现横向滚动条，都可以完美的呈现给用户。



### pc端视口
在pc端，视口的默认宽度和**浏览器窗口**的宽度一致。在 css 标准文档中，视口也被称为：<u>初始包含块</u>，它是所有 css 百分比宽度推算的根源，在pc端可通过如下几种方式获取宽度：

```js
console.log('最干净的显示区域',document.documentElement.clientWidth);//常用
console.log('最干净的显示区域+滚动条',window.innerWidth);
console.log('最干净的显示区域+滚动条+浏览器边框',window.outerWidth);
console.log('与浏览器无关，当前设备显示分辨率横向的值',screen.width);
```

### 移动端视口

移动端浏览器通常宽度是 240px~640px，而大多数为 PC 端设计的网站宽度至少为 800px，如果仍以浏览器窗口作为视口的话，网站内容在手机上看起来会非常窄。(压缩之后内容全部变小)???

因此，引入了<u>布局视口、视觉视口和理想视口</u>三个概念，使得移动端中的视口与浏览器宽度不再相关联。???



#### 1. 布局视口(layout viewport)
**概况**
布局视口是网页布局的基准窗口，在`PC`浏览器上，布局视口就等于当前浏览器的窗口大小。
一般移动设备的浏览器都默认设置了一个 viewport 元标签，定义一个虚拟的布局视口（layout viewport），用于解决早期的页面在手机上显示的问题。iOS, Android 基本都将这个视口分辨率设置为 980px，所以 PC 上的网页基本能在手机上呈现，只不过元素看上去很小，一般默认可以通过手动缩放网页。


**示意图**

完全缩小的情况下：visual viewport = layout viewport
![vvlv](https://jsd.cdn.zzko.cn/gh/aotushi/image-hosting@master/documentation/vvlv.30uoqdglkio0.webp)

不完全缩小的情况下：layout viewport > visual viewport
![lvvv](https://jsd.cdn.zzko.cn/gh/aotushi/image-hosting@master/documentation/lvvv.2qbw97frja00.webp)


**获取布局视口:**

默认的布局视口宽度为980px.`clientWidth`不包括border,margin和滚动条(如果存在).

```javascript
document.documentElement.clientWidth
document.documentElement.clientHeight
```

**设置**

如果显式设置布局视口,可以使用HTML中的meta标签

```javascript
<meta name='viewport' content="width=400"
```

布局视口使移动端浏览器屏幕宽度与视口完全独立开来. CSS将根据它来进行计算,并被它约束.

 <img src="https://s1.ax1x.com/2020/06/28/NRoBg1.png" style="zoom: 50%;" />


#### 2. 视觉视口(visual viewport)
**概况**
用户通过屏幕真实看到的区域，默认等于浏览器窗口的大小（包括滚动条宽度）。可以通过`window.innerWidth`来获取，宽度等于浏览器可视区域的宽度。
当用户对浏览器进行缩放时，不会改变布局视口的大小，所以页面布局是不变的，但是缩放会改变视觉视口的大小。
例如：用户将浏览器窗口放大了200%，这时浏览器窗口中的`CSS`像素会随着视觉视口的放大而放大，这时一个`CSS`像素会跨越更多的物理像素。
所以，布局视口会限制你的`CSS`布局而视觉视口决定用户具体能看到什么。

**是什么**
视觉视口(`visual viewport`)：用户通过屏幕真实看到的区域。


**视觉视口与布局视口关系**
* <span style="color:blue">视觉视口默认等于当前浏览器的窗口大小<span style="background: #ccc">（包括滚动条宽度）</span>。</span>
>可以把`layout viewport`理解为一张完全遮住并且不能更边大小的白纸，把`visual viewport`理解为一个有边框的透视器，你可以通过这个透视器来查看这张白纸的内容。通过这个透视器你可以一点点的看到白纸部分内容，这里所能看到的就是`visual viewport`。你也可以靠近或者远离的方式来透视白纸（白纸静止不动），你看的内容可以变多或者变少，但是白纸`layout viewport`自身的大小和形状是不会发生改变的。 -- [来源](https://blog.si-yee.com/2019/04/11/%E7%A7%BB%E5%8A%A8%E7%AB%AF%E5%89%8D%E7%AB%AF%E5%BC%80%E5%8F%91%E4%B9%8Bviewport/#:~:text=%E5%8F%AF%E4%BB%A5%E6%8A%8Alayout%20viewport%E7%90%86%E8%A7%A3%E4%B8%BA%E4%B8%80%E5%BC%A0%E5%AE%8C%E5%85%A8%E9%81%AE%E4%BD%8F%E5%B9%B6%E4%B8%94%E4%B8%8D%E8%83%BD%E6%9B%B4%E8%BE%B9%E5%A4%A7%E5%B0%8F%E7%9A%84%E7%99%BD%E7%BA%B8%EF%BC%8C%E6%8A%8Avisual%20viewport%E7%90%86%E8%A7%A3%E4%B8%BA%E4%B8%80%E4%B8%AA%E6%9C%89%E8%BE%B9%E6%A1%86%E7%9A%84%E9%80%8F%E8%A7%86%E5%99%A8%EF%BC%8C%E4%BD%A0%E5%8F%AF%E4%BB%A5%E9%80%9A%E8%BF%87%E8%BF%99%E4%B8%AA%E9%80%8F%E8%A7%86%E5%99%A8%E6%9D%A5%E6%9F%A5%E7%9C%8B%E8%BF%99%E5%BC%A0%E7%99%BD%E7%BA%B8%E7%9A%84%E5%86%85%E5%AE%B9%E3%80%82%E9%80%9A%E8%BF%87%E8%BF%99%E4%B8%AA%E9%80%8F%E8%A7%86%E5%99%A8%E4%BD%A0%E5%8F%AF%E4%BB%A5%E4%B8%80%E7%82%B9%E7%82%B9%E7%9A%84%E7%9C%8B%E5%88%B0%E7%99%BD%E7%BA%B8%E9%83%A8%E5%88%86%E5%86%85%E5%AE%B9%EF%BC%8C%E8%BF%99%E9%87%8C%E6%89%80%E8%83%BD%E7%9C%8B%E5%88%B0%E7%9A%84%E5%B0%B1%E6%98%AFvisual%20viewport%E3%80%82%E4%BD%A0%E4%B9%9F%E5%8F%AF%E4%BB%A5%E9%9D%A0%E8%BF%91%E6%88%96%E8%80%85%E8%BF%9C%E7%A6%BB%E7%9A%84%E6%96%B9%E5%BC%8F%E6%9D%A5%E9%80%8F%E8%A7%86%E7%99%BD%E7%BA%B8%EF%BC%88%E7%99%BD%E7%BA%B8%E9%9D%99%E6%AD%A2%E4%B8%8D%E5%8A%A8%EF%BC%89%EF%BC%8C%E4%BD%A0%E7%9C%8B%E7%9A%84%E5%86%85%E5%AE%B9%E5%8F%AF%E4%BB%A5%E5%8F%98%E5%A4%9A%E6%88%96%E8%80%85%E5%8F%98%E5%B0%91%EF%BC%8C%E4%BD%86%E6%98%AF%E7%99%BD%E7%BA%B8layout%20viewport%E8%87%AA%E8%BA%AB%E7%9A%84%E5%A4%A7%E5%B0%8F%E5%92%8C%E5%BD%A2%E7%8A%B6%E6%98%AF%E4%B8%8D%E4%BC%9A%E5%8F%91%E7%94%9F%E6%94%B9%E5%8F%98%E7%9A%84%E3%80%82)

视觉视口和缩放比例的关系为:

> 当前的缩放值 = 理想视口宽度 / 视觉视口宽度   ???


**获取视觉视口宽度/高度:**

```javascript
window.innerwidth
window.innerHeight
```

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bacccff7697542f799ad99cd078de44c~tplv-k3u1fbpfcp-zoom-in-crop-mark:1304:0:0:0.awebp)





#### 3. 理想视口
> 布局视口的默认宽度并不是一个理想的宽度，于是 Apple 和其他浏览器厂商引入了理想视口的概念，它对设备而言是最理想的布局视口尺寸。显示在理想视口中的网站具有最理想的宽度，用户无需进行缩放。
> 
> 理想视口的值其实就是屏幕分辨率的值，它对应的像素叫做设备独立像素（device independent pixel, dip）。dip 和设备的物理像素无关，一个 dip 在任意像素密度的设备屏幕上都占据相同的空间。如果用户没有进行`缩放`，那么一个 CSS 像素就等于一个 dip。


> 理想视口宽度 = 移动设备横向分辨率 / DPR

**获取**
我们可以通过调用`screen.width / height ` 来获取理想视口的宽/高
```javascript
window.screen.width
window.screen.height
```



### 理想视口设置(viewport)

移动设备默认的`viewport`默认是`layout viewport`，也就是那个比屏幕要宽的`viewport`，但在进行移动设备网站的开发时，我们需要的是`ideal viewport`。那么怎么才能得到`ideal viewport`呢？这就该轮到`meta`标签出场了。

`meta`元素表示那些不能由其它`HTML`元相关元素之一表示的任何元数据信息，它可以告诉浏览器如何解析页面。我们可以借助`meta`元素的`viewport`来帮助我们设置视口、缩放等，从而让移动端得到更好的展示效果。

```html
<meta name="viewport" content="width=device-width, initial-scale=1, maxium-scale=1, user-scalable=no">
```

作用是让当前`viewport`的宽度等于设备的宽度，同时不允许用户手动缩放。如果你不这样的设定的话，那就会使用那个比屏幕宽的默认`layout viewport`，就会出现横向滚动条。

#### meta标签 viewport
1. width  布局视口的宽度  //开启理想视口
2. initial-scale  【系统】初始缩放比例  //开启理想视口
3. maximum-scale 允许【用户】缩放的最大比例
4. minimum-scale  允许【用户】缩放的最小比例
5. user-scalable  是否允许用户缩放
6. viewport-fit 设置为cover值可以解决刘海屏的留白问题 

`viewport`配置的具体含义：

| name          | 可能值                | 描述                                                         |
| :------------ | :-------------------- | :----------------------------------------------------------- |
| width         | 正整数或device-width  | 以pixels（像素）为单位， 定义布局视口的宽度。                |
| height        | 正整数或device-height | 以pixels（像素）为单位， 定义布局视口的高度。                |
| initial-scale | 0.0 - 10.0            | 定义页面初始缩放比率。This parameter sets the initial zoom level, which means **1 CSS pixel** is equal to **1 viewport pixel**. |
| minimum-scale | 0.0 - 10.0            | 定义缩放的最小值；必须小于或等于maximum-scale的值。          |
| maximum-scale | 0.0 - 10.0            | 定义缩放的最大值；必须大于或等于minimum-scale的值。          |
| user-scalable | 布尔值（yes或者no）   | 如果设置为 no，用户将不能放大或缩小网页。默认值为 yes。      |


**width** 

> 用来设置页面的布局视口宽度,属性值不带单位,默认单位为像素.其默认值在不同的浏览器中不同,但大多数为980.

<span style="color:#ee0b41">width值可以是 device-width，也可以是具体值，但有些安卓手机是不支持具体值，IOS全系列都支持。</span>

在w3schools.com中的解释是:

> `width=device-width` part sets <span style="background: #ccc" >the width of the page</span> to follow <span style="background: #ccc">the screen-width of the device</span>(which will vary depending on the device). 这里的 'the width of the page' 应该指的就是布局视口的宽度. 'the screen-width of the device'指的是设备独立像素.

width能决定布局视口的宽度,实际上并不是唯一决定性因素,设置initial-scale也能影响到布局视口,因为<span style="color: red">布局视口取得是`width`和`视觉视口宽度`的最大值.</span>

`width`能控制`layout viewport`的宽度，`device-width`就等于理想视口的宽度，所以设置`width=device-width`就相当于让布局视口等于理想视口。

```html
<meta name="viewport" content="width=device-width">

device-width = 设备的物理分辨率 / (devicePixelRatio * scale)
```

通过设置`initial-scale`可以达到同样的效果：

```html
<meta name="viewport" content="initial-scale=1">
```

由于`initial-scale = 理想视口宽度 / 视觉视口宽度`，所以我们设置`initial-scale=1;`就相当于让视觉视口等于理想视口。

```
当前缩放值 = ideal viewport宽度 / visual viewport宽度
```



**initial-scale**  

>Possible: a positive number between 0.0 and 10.0
>des: defines the ratio between the <span style="background: #ccc">device width</span>(device-width in portrait mode or device-height in landscape mode) and <span style="background: #ccc">the viewport size</span>.

根据上面的device-width的解释,其值为设备屏幕宽度,也就是设备独立像素,其值的获取方式是`screen.width`
1. initial-scale 为页面初始化时的显示比例。  
2. initial-scale = 屏幕宽度(设备独立像素)  /  布局视口宽度。(理想视口宽度 / 视觉视口宽度
3. 只写initial-scale = 1.0 也可以实现完美视口，但为了良好的兼容性，width=device-width, initial-scale=1.0一般一起写。

**maximum-scale** 
1. 设置允许用户最大缩放比例，苹果浏览器 safari 不认识该属性
2. maximum-scale = 屏幕宽度(设备独立像素) / 视觉视口宽度值


**minimum-scale**
1. 设置允许用户最小缩放比例。
2. minimum-scale = 屏幕宽度(设备独立像素) / 视觉视口宽度值

**user-scalable**
  user-scalable的值是no和
​	是否允许用户通过手指缩放页面。苹果浏览器 safari 不认识该属性

**viewport-fit**
值设置为 cover 可以解决『刘海屏』的留白问题

 
#### 注意事项

要把当前的`viewport`宽度设为`ideal viewport`的宽度，既可以设置`width=device-width`，也可以设置`initial-scale=1`。但这两者各有一个小缺陷，就是`iPhone`、`iPad`以及`IE`会横竖屏不分，通通以竖屏的`ideal viewport`宽度为准。所以，最完美的写法应该是，两者都写上去，这样就`initial-scale=1`解决了`iPhone`、`iPad`的毛病，`width=device-width`则解决了`IE`的毛病。当两个设置冲突时，布局视口取两者最大值。

这时，1个`CSS`像素就等于1个设备独立像素，而且我们也是基于理想视口来进行布局的，所以呈现出来的页面布局在各种设备上都能大致相似。





**其他注意事项**

* viewport标签只针对移动端浏览器有效,对PC端是无效的
* 当缩放比例为100%, dip宽度=CSS像素宽度=理想视口宽度=布局视口宽度
* 单独设置`initial-scale`或`width`都会有兼容问题,所以设置布局视口为理想视口的最佳方法是同时设置这两个属性
* 即使设置了`user-scalable=no` 在Android Chrome浏览器中也可以强制启动手动缩放



### 获取各种窗口大小Api

- window.screen.height：获取获屏幕取理想视口高度，在`pc`端和`innerHeight`相等，在移动端可能还包含浏览器头部和底部`bar`的高度。这个数值是固定的，设备的分辨率/设备像素比。
- window.screen.availHeight：浏览器窗口可用的高度。
- window.innerHeight：获取浏览器视觉视口高度（包括垂直滚动条）。
- window.outerHeight：获取浏览器窗口外部的高度。表示整个浏览器窗口的高度，包括侧边栏、窗口镶边和调正窗口大小的边框。
- document.documentElement.clientHeight：获取浏览器布局视口高度，包括内边距，但不包括垂直滚动条、边框和外边距。
- document.documentElement.offsetHeight：包括内边距、滚动条、边框。
- document.documentElement.scrollHeight：在不使用滚动条的情况下适合视口中的所有内容所需的最小宽度。测量方式与`clientHeight`相同：它包含元素的内边距，但不包括边框，外边距或垂直滚动条。







## 缩放的表现

#### <span style='color:blue'>PC端缩放</span>
放大时
- 元素的 css 像素值不变，但一个css像素所占面积变大了。

缩小时
- 元素的 css 像素值不变，但一个css像素所占面积变小了。

```js
//pc端,resize监测视口(初始包含块)的变化
//移动端, 布局视口
window.onresize=()=>{
    console.log(document.documentElement.clientWidth)
}
```



#### 移动端缩放
屏幕放大时
- 布局视口不变
- 视觉视口变小

屏幕缩小时
- 布局视口不变
- 视觉视口变大

从现实世界的观感来说,放大页面时页面(布局视口)宽高不变确实有些违反常理,通过以下几个关键点来理解:
2. 放大时候, 每个css像素占用了更多的物理像素,但就是为什么内容看起来变大了.
3. 布局视口的尺寸是以CSS像素计算的,所以它保持不变.


# 适配方案

WEB端开发

在写`CSS`时，我们用到最多的单位是`px`，即`CSS像素`，当页面缩放比例为`100%`时，一个`CSS像素`等于一个设备独立像素。

但是`CSS像素`是很容易被改变的，当用户对浏览器进行了放大，`CSS像素`会被放大，这时一个`CSS像素`会跨越更多的物理像素。

`页面的缩放系数 = CSS像素 / 设备独立像素`。




## 移动端适配原因

通常在PC端`1个设备独立像素 = 1个设备像素`，不用考虑兼容的问题。但在移动端，不同厂商不同型号的设备的`PPI`和`DPR`是不同的，也就是设计图上的1像素在不同设备上占据的实际物理像素值可能不同，所以同样的设计图在不同设备上展示效果是不尽相同的，分辨率越高，图像越缩小。

由于移动端设备的屏幕尺寸大小不一，会出现：同一个元素，在两个不同的手机上显示效果不一样（比例不同）。要想让同一个元素在不同设备上，显示效果一样，就需要适配，**无论采用何种适配方式，中心原则永远是：**<span style="color:#ee0b41">等比</span>！。


## 移动端适配4种方案
### 种类
让元素的宽高和文字的尺寸大小都使用rem单位，然后在不同宽度的设备下设置准确的根字号大小就可以了。

主流的适配方式有4种：
* 媒体查询
* viewport 适配
* rem 适配（主流方式，几乎完美适配）
* vw适配



### 0.媒体查询

#### 概述

> 通过CSS的@media媒体查询设置不同的style.通过媒体查询,可以根据不同的屏幕设置不同样式,实现不同屏幕适配.

link元素中的CSS媒体查询,不同屏幕加载不同样式文件

```html
<link rel='stylesheet' media="(max-width: 500px)" href="mobile.css"/>
<link rel='stylesheet' media="(min-width: 980px)" href="pc.css" />
```

CSS样式表中的媒体查询:

```html
//mobile.css

@media only screen and (max-width: 414px){
	html{ font-size: 64px;}
}
@media only screen and (max-width: 375px) {
	html{ font-size:58px}
}
@media only screen and (max-width:360px) {
	html{ font-size: 56px}
}
@media only screen and (max-width: 320px) {
	html{ font-size: 50px;}
}
```

<iframe src="https://codesandbox.io/embed/xiang-ying-shi-bu-ju-mei-ti-cha-xun-98pq7u?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="响应式布局-媒体查询"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>




### 1.viewport 适配

- 方法：拿到设计稿之后，设置**布局视口**宽度为设计稿宽度，然后直接按照设计稿给宽高进行布局即可。
- 优点：不用复杂的计算，直接使用图稿上标注的px值
- 缺点：
  - 不能使用完整的meta标签，会导致在某些安卓手机上有兼容性问题。
  - 不希望适配的东西，例如边框，也强制参与了适配

```css
<meta name="viewport" content="width=375">
```


### 2 rem适配 

#### 原理
据屏幕宽度动态设置`html`标签的`font-size`。再将`px`替换为`rem`单位来布局，就可以达到适配的目的。

**em 和 rem**
em 和 rem 都是 css 中的长度单位。而且两个都是相对长度单位，不过两个有点区别
* em 相对的是父级元素的字体大小
* rem 相对的是根元素的字体大小

rem适配的原理：编写样式时统一使用rem为单位，在不同设备上动态调整根字体大小



#### 具体方案

##### 方案一 设置值/100

![rem适配方案1.png](https://i.loli.net/2021/01/05/ziclxkXCKmEVnaM.png)

##### 方案介绍

淘宝、百度的移动端页面用的此方案

1. 设置完美视口
2. <span style="color:#ee0b41">通过js设置根字体大小 = ( 当前设备横向独立像素值 *100)/设计稿宽度</span>
3. <span style="color:#ee0b41">编写样式时，直接以rem为单位，值为：原型上设计值 / 100 </span>  
4. 增加 JS 代码进行实时适配

##### 公式详解
来让我们细化一下公式:
```html
还是相同占比的问题:

设计值/设计稿宽度  = x/dip

设计值/设计稿宽度*100 = x/dip*100

```


$$
\begin{aligned}
\frac{设计值}{设计稿宽度} = \frac{x}{dip} \\
\\
\frac{dip*100}{设计稿宽度} = \frac{x*100}{设计值} \\
\\
规定:1rem=\frac{dip*100}{设计稿宽度}
\\
故: 1rem = \frac{x*100}{设计值} = \frac{dip*100}{设计稿宽度}
\\
故: x = \frac{设计值}{100}*1rem
\end{aligned}
$$


##### 代码实例

优势：编写样式时直接挪动小数点即可。

```html
//页面JS脚本中-设置实时刷新页面布局
<script type='text/javascript'>
    function adapter(){ //适配器函数
  			//获取手机横向的设备独立像素dip
        const dip=document.documentElement.clientWidth;
  			//计算根根字体大小(100是我们指定的,375是设计稿宽度)
        const rootfontSize=(dip*100)/375;
  			//设置根字体
    	document.documentElement.style.fontSize=rootFontSize+'px';
    }
    window.onresize=adapter;
</script>

less写法:
@font:100rem;
*{margin:0;padding:0}
#demo{
	width:690/@font;
	height:300/@font;
	background-color:#ddd;
    //border:1px solid black; 边框不参与适配 都是固定的1px
	border:0.01rem solid black; 边框参与适配 有大有小 1/100
}
```







##### 方法二  设计值/(设计稿宽度/10)

![rem适配方案2.png](https://i.loli.net/2021/01/05/PnVTJDEoRyYHAqO.png)

搜狐、唯品会的移动端页面用的此方案

1. 设置完美视口
2. <span style="color:#ee0b41">通过js设置根字体大小  = 当前设备横向独立像素值 / 10 </span>
3. <span style="color:#ee0b41">编写样式时，直接以rem为单位，值为：(设计值/(设计稿宽度/10))*rem</span>   例如345px/(375px/10)\*rem(41.4px)
4. 增加 JS 代码进行实时适配

```javascript
function adapter() {
  let rem = document.documentElement.clientWidth / 10
  
  document.style.fontSize = rem + 'px'
   
}

window.onresize = adapter()
```





### 2.1 淘宝flexible

> [使用Flexible实现手淘H5页面的终端适配 · Issue #17 · amfe/article (github.com)](https://github.com/amfe/article/issues/17)
>
> [amfe/lib-flexible: 可伸缩布局方案 (github.com)](https://github.com/amfe/lib-flexible)
>
> https://www.luanzhuxian.com/post/783ce8a9.html



`flexible`方案是阿里早期开源的一个移动端适配解决方案，引用`flexible`后，我们在页面上统一使用`rem`来布局。
它的核心代码非常简单：

```javascript
// set 1rem = viewWidth / 10
function setRemUnit () {
    var rem = document.documentElement.clientWidth / 10
    document.documentElement.style.fontSize = rem + 'px'
}
setRemUnit()
```



淘宝的做法是将`html`节点的`font-size`设置为页面`clientWidth`(布局视口)的1/10，即`1rem`就等于页面布局视口的1/10.

如果是750的设计稿，根元素的`font-size`是75px，那么设计稿上一个宽度375px的`div`就是5rem，占设计稿的50%。若要适配宽度为375的设备，根元素的`font-size`是37.5px，5rem就是187.5px，仍然占设备宽的50%。

设计步骤:

1、动态设置`viewport`的`scale`，控制页面的渲染比例：

```javascript
var scale = 1 / devicePixelRatio
document.querySelector('meta[name="viewport"]').setAttribute('content','initial-scale=' + scale + ', maximum-scale=' + scale + ', minimum-scale=' + scale + ', user-scalable=no')

```



2、动态设置根元素的`font-size`：

```javasript
document.documentElement.style.fontSize = document.documentElement.clientWidth / 10 + 'px'
```



3、在写`css`时转换为`rem`：

```
各元素的css尺寸 = 设计稿标注尺寸 / 根元素font-size = 设计稿标注尺寸 / 设计稿横向分辨率 / 10
```



总结:

```html
html = vp(视口宽度) / 10 = deviceWide(设备宽度) * dpr / 10
css元素尺寸 = 设计稿尺寸px / 根元素font-size
```





**<span style="color:red">重要</span>**

> 我一直觉得很难理解,各个教程就都是直说UI元素大小/rem基准值就得出结果.并没有说因为什么

其实就是一个比例关系:
$$
\frac{设计值}{设计稿宽度} = \frac{x}{dip}\\
\\
\\

故: \frac{设计值}{设计稿宽度} = \frac{x}{10rem}\\
\\
故: x = \frac{设计值}{设计稿宽度}*10rem
\\
故: x = \frac{设计值}{\frac{设计稿宽度}{10} } \times 1rem
$$





当viewport单位得到众多浏览器的兼容,上面这种方案已经被官方抛弃:

> lib-flexible这个过渡方案已经可以放弃使用,不管是现在还是以前的版本,都存有一定的问题. 建议大家开始使用viewport来替代此方案



### 2.2 网易方案

> https://www.luanzhuxian.com/post/783ce8a9.html

如果设计稿的宽度是640px，根元素的`font-size`是100px相当于1rem，那么一个占满屏幕的元素的宽度就是6.4rem，6.4rem就是css样式该元素的宽度值。那如果现在要适配iPhone5，iPhone5的设备像素屏幕宽度为320px，如果想让6.4rem的元素以同样比例占满屏幕，则根元素的`font-size`是多少？

```
6.4rem = 320px
1rem = 320 / 6.4 = 50px
```



就是要把根元素的`font-size`设为50px。那如果现在要适配iPhone6？

```
6.4rem = 375px
1rem = 375 / 6.4 = 58.59375px
```



同理其他设备，只要通过`deviceWidth / 6.4`计算出根元素的`font-size`就可以了。

1、首先通过`meta`标签设置视口：

```html
<meta name="viewport" content="initial-scale=1, maximum-scale=1, minium-scale=1">
```

2、算出设计图相对100px的比例。因为假设设计稿根元素`font-size`是100，拿设计稿横向分辨率除以100得到body元素的宽度：

```javascript
750 / 100 = 7.5rem // 设计稿横向分辨率为750
640 / 100 = 6.4rem // 设计稿横向分辨率为640
```

3、在`dom ready`后，动态设置根元素的`font-size`：

```javascript
document.documentElement.style.fontSize = document.documentElement.clientWidth / 7.5 + 'px' //设计稿横向分辨率为750
```

同理如果设计稿是640就除以6.4。

4、在写`css`时转换为`rem`，设计稿上元素尺寸是多少，除以个100就行了，这也是为什么取100作为参照，就是为了写样式时转换`rem`方便。

也就是：

```
转换系数 = 设计图宽度 / 100
根元素font-size = deviceWide(设备宽度) / 转换系数
css尺寸 = 设计稿尺寸px / 100
```

> 注释: 感觉别人理解这里都很容易,到自己这了反而很难. 还是一步步写出推算公式吧
>
> 核心还是等比关系

$$
关系: \frac{x}{dip} = \frac{设计值}{设计稿宽度} 
\\
\\
x = \frac{设计值}{设计稿宽度} \times dip
\\
\\
x \div \frac{1}{100} = \frac{设计值}{设计稿宽度 \times \frac{1}{100}} \times div
\\
\\
x \times 100 = 1rem \times 设计值
\\
\\故: 
x  = \frac{设计值}{100} \times 1rem
$$





### 2.3 淘宝 网易方案比较

- 网易是以`100px`作为参照，任何设计图上元素的尺寸转为`rem`都是相对于`100px`做转换的。不同设备的根元素的`font-size`都需要根据设计图的尺寸做比例转换。转换后我们写的以`rem`为单位的样式就能还原出设计图的样子。
- 淘宝的做法就是任何设备宽都是`10rem`，根元素的`font-size`都是`设备宽 / 10`，任何元素的尺寸转为`rem`后其实是保留了相对于设备宽的比例，这个比例拿到其他设备上就能还原出设计图的样子。
- 网易不用管`dpr`，只需知道设计稿宽度。
- 网易的做法，`rem`值很好计算，淘宝的做法肯定得用计算器才能用好了 。不过要是你使用了`less`和`sass`这样的`css`处理器，就好办多了。

```css
less

// 定义一个变量和一个 mixin
@baseFontSize: 75;  // 基于视觉稿横屏尺寸 / 100 得出的基准font-size
.px2rem (@name, @px) {
    @{name}: @px / @baseFontSize * 1rem;
}

// 使用示例：
.container {
    .px2rem(width, 320);
}
// 编译后：
.container {
    width: 4.26rem;
}


sass

@function px2rem ($px) {
    $baseFontSize: 75px;
    @return ($px / $baseFontSize) + rem;
}
.container {
    width: px2rem(320px);
}
```









### 3.vw vh方案

> https://www.luanzhuxian.com/post/783ce8a9.html

由于`viewport`单位得到众多浏览器的兼容，上面方案现在已经被官方弃用。现在最流行的是`vw`、`vh`方案。

`vh、vw`方案即将视觉视口宽度 `window.innerWidth `和视觉视口高度 `window.innerHeight` 等分为 100 份. 上面的flexible就是模仿这种方案,因为早些时候vw还没有得到很好的兼容.

#### 单位

vw和vh是两个相对单位
- vw(Viewport’s width)：`1vw`等于视觉视口的1%。
- vh(Viewport’s height)：`1vh`为视觉视口高度的1%。
- vmin：`vw`和`vh`中的较小值。
- vmax：选取`vw`和`vh`中的较大值。

如果视觉视口为375px,那么1vw=3.75px, 这时UI给定的一个元素的宽为75px(设备独立像素),我们只需要将它设位置75/3.75 = 20vw.


#### vh实践
>来源: CSS新世界>7.3 rem和vw单位与移动端适配最佳实践

vh单位的经典应用，那就是当内容高度不足一屏时，让底部栏贴在浏览器窗口的底部；当内容高度超过一屏时，让底部栏贴在页面最下方。
```html
	<div class="container">
		<content></content>
		<footer></footer>
	</div>
```

```css
.container {
	display: flex;
	flex-direction: column;
	min-height: 100vh;
}
footer {
	margin-top: auto;
}
```


#### vw+calc函数实现移动端布局适配方案
> CSS新世界 7.3 rem和vw单位与移动端适配最佳实践

有了vw单位，再配合calc()函数进行计算，无须使用任何JavaScript代码，我们就可以实现基于设备宽度的移动端布局适配方案。

例如，希望375px～414px的宽度区间的根字号大小是16px～18px，就可以这么设置：
```css
html {
	font-size: 16px;
}

@media screen and (min-width: 375px) {
	html {
	  // 
		font-size: calc(16px + 2 * (100vw - 375px) / 39); 
	}
}

@media screen and (min-width: 414px) {
	html {
		font-size: 18px;
	}
}
```

按照上面的计算公式,如果设备宽度是375px,则font-size属性的计算值是16px; 如果设备宽度是400px,则计算值为17.28px; 如果设备宽度是414px，则font-size属性的计算值是18px;
第二步,将觉稿对应的px尺寸使用rem表示就可以了.例如，视觉稿上图片尺寸是120px×80px，则我们布局的时候使用：
```css
img {
	width: 7.5rem;
	height: 5rem;
}
```
3px的间隙可以如下表示:
```css
.container {
	gap: calc(3/16rem);
	/* 也可以直接设置成 gap:.1875rem; */
}
```


#### 最佳实践范例代码
>下面这段CSS代码是我最常用的基于rem和vw单位并配合calc()函数的移动端适配代码，大家可以自行微调或者直接复制粘贴到自己的项目中使用，例如screen and可以删除，1000px之后的尺寸可以使用固定值等：

```css
html {
    font-size: 16px;
}
@media screen and (min-width: 375px) {
    html {
        /* 375px作为16px基准，414px宽度时正好对应18px的根字号大小 */
        font-size: calc(16px + 2 * (100vw - 375px) / 39);
    }
}
@media screen and (min-width: 414px) {
    html {
        /* 屏幕宽度从414px到1000px，根字号大小累积增加4px（18px-22px） */
        font-size: calc(18px + 4 * (100vw - 414px) / 586);
    }
}
@media screen and (min-width: 1000px) {
    html {
        /* 屏幕宽度从1000px往后每增加100px，根字号大小就增加0.5px */
        font-size: calc(22px + 5 * (100vw - 1000px) / 1000);
    }
}
```


**起点中文网移动端 适配方案**
```css
html {
  font-size: 16px
}
@media screen and (min-width:375px) {
  html {
    font-size: calc(100% + 2 * (100vw - 375px)/ 39);
    font-size: calc(16px + 2 * (100vw - 375px)/ 39)
  }
}
@media screen and (min-width:414px) {
  html {
    font-size: calc(112.5% + 4 * (100vw - 414px)/ 586);
    font-size: calc(18px + 4 * (100vw - 414px)/ 586)
  }
}
@media screen and (min-width:600px) {
  html {
    font-size: calc(125% + 4 * (100vw - 600px)/ 400);
    font-size: calc(20px + 4 * (100vw - 600px)/ 400)
  }
}
@media screen and (min-width:1000px) {
  html {
    font-size: calc(137.5% + 6 * (100vw - 1000px)/ 1000);
    font-size: calc(22px + 6 * (100vw - 1000px)/ 1000)
  }
}
```

#### 范例升级+clamp函数
>随着越来越多的浏览器支持clamp()函数，我们也可以使用下面这种更加精简的语法：

```css
html {
	font-size: 16px;
	font-size: clamp(16px, calc(16px + 2 * (100vw - 375px) / 39), 22px);
}
```


#### 纯vw适配方案使用场景
>CSS新世界 7.3 rem和vw单位与移动端适配最佳实践


>在这种纯vw单位的布局方式下，布局尺寸和图文大小既不使用px单位，也不使用rem单位，而是统一使用vw单位。例如，视觉稿上图片的尺寸是120px×80px，使用vw单位表示就是：

```css
img {
	- [ ] width: 32vw;
	height: 21.333vw;
}
```

一切单位皆是vw。于是，开发的时候只需要使用vw单位按照1∶1的尺寸将视觉稿复刻下来，就可以做到无论是什么宽度的设备，都会等比例缩放，不用担心因为设备宽度不一样而出现错位或无法对齐等布局问题。
但是，不建议在长期维护的大型项目中使用纯vw布局方式，因为这种布局方式一旦确定，后期更换布局的成本会非常高，这种布局方式比较适合用在运营活动页面中。



## 适配问题及解决

> [关于移动端适配，你必须要知道的 - 掘金 (juejin.cn)](https://juejin.cn/post/6844903845617729549#heading-21)

### 1px问题

为了适配各种屏幕，我们写代码时一般使用设备独立像素来对页面进行布局。

而在设备像素比大于`1`的屏幕上，我们写的`1px`实际上是被多个物理像素渲染，这就会出现`1px`在有些屏幕上看起来很粗的现象。



#### border-image

基于`media`查询判断不同的设备像素比给定不同的`border-image`：

```css
.border_1px{
  border-bottom: 1px solid #000;
}
@media only screen and (-webkit-min-device-pixel-ratio:2){
  .border_1px{
    border-bottom: none;
    border-width: 0 0 1px 0;
    border-image: url(../img/1pxline.png) 0 0 2 0 stretch;
  }
}
```



#### background-image

和`border-image`类似，准备一张符合条件的边框背景图，模拟在背景上。

```css
.border_1px{
  border-bottom: 1px solid #000;
}
@media only screen and (-webkit-min-device-pixel-ratio:2){
  .border_1px{
    background: url(../img/1pxline.png) repeat-x left bottom;
    background-size: 100% 1px;
  }
}
```

上面两种都需要单独准备图片，而且圆角不是很好处理，但是可以应对大部分场景。



#### 伪类 + transform

基于`media`查询判断不同的设备像素比对线条进行缩放：

```css
.border_1px:before{
  content: '';
  position: absolute;
  top: 0;
  height: 1px;
  width: 100%;
  background-color: #000;
  transform-origin: 50% 0%;
}
@media only screen and (-webkit-min-device-pixel-ratio:2){
  .border_1px:before{
    transform: scaleY(0.5);
  }
}
@media only screen and (-webkit-min-device-pixel-ratio:3){
  .border_1px:before{
    transform: scaleY(0.33);
  }
}
```

这种方式可以满足各种场景，如果需要满足圆角，只需要给伪类也加上`border-radius`即可。



#### svg

上面我们`border-image`和`background-image`都可以模拟`1px`边框，但是使用的都是位图，还需要外部引入。

借助`PostCSS`的`postcss-write-svg`我们能直接使用`border-image`和`background-image`创建`svg`的`1px`边框：

```css
@svg border_1px { 
  height: 2px; 
  @rect { 
    fill: var(--color, black); 
    width: 100%; 
    height: 50%; 
    } 
  } 
.example { border: 1px solid transparent; border-image: svg(border_1px param(--color #00b1ff)) 2 2 stretch; }
```

编译后

```css 
.example { border: 1px solid transparent; border-image: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' height='2px'%3E%3Crect fill='%2300b1ff' width='100%25' height='50%25'/%3E%3C/svg%3E") 2 2 stretch; }
```

上面的方案是大漠在他的文章中推荐使用的，基本可以满足所有场景，而且不需要外部引入，这是我个人比较喜欢的一种方案。

#### 设置viewport

通过设置缩放，让`CSS`像素等于真正的物理像素。

例如：当设备像素比为`3`时，我们将页面缩放`1/3`倍，这时`1px`等于一个真正的屏幕像素。

```javascript
const scale = 1 / window.devicePixelRatio;
    const viewport = document.querySelector('meta[name="viewport"]');
    if (!viewport) {
        viewport = document.createElement('meta');
        viewport.setAttribute('name', 'viewport');
        window.document.head.appendChild(viewport);
    }
    viewport.setAttribute('content', 'width=device-width,user-scalable=no,initial-scale=' + scale + ',maximum-scale=' + scale + ',minimum-scale=' + scale);
```

实际上，上面这种方案是早先`flexible`采用的方案。

当然，这样做是要付出代价的，这意味着你页面上所有的布局都要按照物理像素来写。这显然是不现实的，这时，我们可以借助`flexible`或`vw、vh`来帮助我们进行适配。????





### 适配iPhoneX

iPhoneX和其他具有边缘屏幕的手机

![331ae1667fbd495892819ea0a3750ad6~tplv-k3u1fbpfcp-zoom-in-crop-mark:1304:0:0:0.awebp (1304×685) (byteimg.com)](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/331ae1667fbd495892819ea0a3750ad6~tplv-k3u1fbpfcp-zoom-in-crop-mark:1304:0:0:0.awebp)

这些手机和普通手机在外观上无外乎做了三个改动：圆角（`corners`）、刘海（`sensor housing`）和小黑条（`Home Indicator`）。为了适配这些手机，安全区域这个概念变诞生了：安全区域就是一个不受上面三个效果的可视窗口范围。

为了保证页面的显示效果，我们必须把页面限制在安全范围内，但是不影响整体效果。

#### viewport-fit

`viewport-fit`是专门为了适配`iPhoneX`而诞生的一个属性，它用于限制网页如何在安全区域内进行展示.

它的值是:

`contain`: 可视窗口完全包含网页内容

`cover`：网页内容完全覆盖可视窗口

默认情况下或者设置为`auto`和`contain`效果相同

#### env / constant

我们需要将顶部和底部合理的摆放在安全区域内，`iOS11`新增了两个`CSS`函数`env、constant`，用于设定安全区域与边界的距离。

函数内部可以是四个常量：

- `safe-area-inset-left`：安全区域距离左边边界距离
- `safe-area-inset-right`：安全区域距离右边边界距离
- `safe-area-inset-top`：安全区域距离顶部边界距离
- `safe-area-inset-bottom`：安全区域距离底部边界距离

注意：我们必须指定`viweport-fit`后才能使用这两个函数

```javascript
<meta name="viewport" content="viewport-fit=cover"
```

`constant`在`iOS < 11.2`的版本中生效，`env`在`iOS >= 11.2`的版本中生效，这意味着我们往往要同时设置他们，将页面限制在安全区域内：

```css
body {
  padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom);
}
```

当使用底部固定导航栏时，我们要为他们设置`padding`值：

```css
{
  padding-bottom: constant(safe-area-inset-bottom)
  padding-bottom: env(safe-area-inset-bottom)
}
```



### 横屏适配

很多视口我们要对横屏和竖屏显示不同的布局，所以我们需要检测在不同的场景下给定不同的样式：

#### JS检测横屏

`window.orientation`获取屏幕旋转方向

```javascript
window.addEventListener('resize', () => {
  if (window.orientation === 180 || window.orientation === 0) {
    //正常方向或屏幕旋转180度
    console.log('竖屏')
  };
  
  if (window.orientation === 90 || window.orientation === -90) {
    // // 屏幕顺时钟旋转90度或屏幕逆时针旋转90度
    console.log('横屏')
  }
})
```

#### CSS检测横屏

```css
@media screen and (orientation: portrait) {
  /*竖屏...*/
} 
@media screen and (orientation: landscape) {
  /*横屏...*/
}
```



### 图片模糊问题

#### 产生原因

我们平时使用的图片大多数都属于位图（`png、jpg...`），位图由一个个像素点构成的，每个像素都具有特定的位置和颜色值.

理论上，位图的每个像素对应在屏幕上使用一个物理像素来渲染，才能达到最佳的显示效果。

而在`dpr > 1`的屏幕上，位图的一个像素可能由多个物理像素来渲染，然而这些物理像素点并不能被准确的分配上对应位图像素的颜色，只能取近似值，所以相同的图片在`dpr > 1`的屏幕上就会模糊:

#### 解决方案

为了保证图片质量，我们应该尽可能让一个屏幕像素来渲染一个图片像素，所以，针对不同`DPR`的屏幕，我们需要展示不同分辨率的图片。

如：在`dpr=2`的屏幕上展示两倍图`(@2x)`，在`dpr=3`的屏幕上展示三倍图`(@3x)`。

##### media查询

使用`media`查询判断不同的设备像素比来显示不同精度的图片：

只适用于背景图. ???

```css
.avatar{
  background-image: url(conardLi_1x.png);
}
@media only screen and (-webkit-min-device-pixel-ratio:2){
  .avatar{
    background-image: url(conardLi_2x.png);
  }
}
@media only screen and (-webkit-min-device-pixel-ratio:3){
  .avatar{
    background-image: url(conardLi_3x.png);
  }
}
```



##### image-set

> 只适用于背景图

```css
.avatar {
    background-image: -webkit-image-set( "conardLi_1x.png" 1x, "conardLi_2x.png" 2x );
}
```



##### srcset

使用`img`标签的`srcset`属性，浏览器会自动根据像素密度匹配最佳显示图片：

```css
<img src="conardLi_1x.png"
     srcset=" conardLi_2x.png 2x, conardLi_3x.png 3x">
```



##### JS拼接图片URL

使用`window.devicePixelRatio`获取设备像素比，遍历所有图片，替换图片地址：

```javascript
const dpr = window.devicePixelRatio;
const images =  document.querySelectorAll('img');
images.forEach((img)=>{
  img.src.replace(".", `@${dpr}x.`);
})

```



##### 使用svg

`SVG `的全称是可缩放矢量图（`Scalable Vector Graphics`）。不同于位图的基于像素，`SVG` 则是属于对图像的形状描述，所以它本质上是文本文件，体积较小，且不管放大多少倍都不会失真。

除了我们手动在代码中绘制`svg`，我们还可以像使用位图一样使用`svg`图片：

```html
<img src="conardLi.svg">

<img src="data:image/svg+xml;base64,[data]">

.avatar {
  background: url(conardLi.svg);
}
```

- [99designs.com/blog/tips/p…](https://link.juejin.cn/?target=https%3A%2F%2F99designs.com%2Fblog%2Ftips%2Fppi-vs-dpi-whats-the-difference%2F)
- [www.w3cplus.com/css/vw-for-…](https://link.juejin.cn/?target=https%3A%2F%2Fwww.w3cplus.com%2Fcss%2Fvw-for-layout.html)
- [aotu.io/notes/2017/…](https://link.juejin.cn/?target=https%3A%2F%2Faotu.io%2Fnotes%2F2017%2F11%2F27%2Fiphonex%2Findex.html)



# 移动端事件

### 事件类型

移动端事件列表

* touchstart   元素上触摸开始时触发
* touchmove   元素上触摸移动时触发
* touchend   手指从元素上离开时触发
* touchcancel   触摸被打断时触发

这几个事件最早出现于IOS safari中，为了向开发人员转达一些特殊的信息。

### 应用场景

- touchstart 事件可用于元素触摸的交互，比如页面跳转，标签页切换

- touchmove 事件可用于页面的滑动特效，网页游戏，画板

- touchend 事件主要跟 touchmove 事件结合使用

- touchcancel 使用率不高


注意：

- touchmove 事件触发后，即使手指离开了元素，touchmove 事件也会持续触发
- 触发 touchmove 与 touchend 事件，一定要先触发 touchstart 
- <span style="color:#ee0b41">事件的作用在于实现移动端的界面交互</span>

### 点击穿透

<span style="color:#ee0b41">        touch 事件结束后会默认触发元素的 click 事件</span>，如没有设置完美视口，则事件触发的时间间隔为 300ms 左右，如设置完美视口则时间间隔为 30ms 左右（备注：具体的时间也看设备的特性）。

​       如果 touch 事件隐藏了元素，则 click 动作将作用到新的元素上，触发新元素的 click 事件或页面跳转，此现象称为点击穿透

```
1.使用默认阻止事件 event.preventDefault()
2.点击穿透的对象使用touch事件代替click事件
3.延时(需要大于touch和click事件之间的时间差)使用pointerEvent属性no/auto;
4.延时(需要大于时间差)再调用事件函数.
```



#### 解决方法一

阻止默认行为

```js
//阻止默认行为
node.addEventListener('touchstart', function(e){
    console.log('hello')
	e.preventDefault(); 
})
```

#### 解决方法二

使背后元素不具备click特性，用touchXxxx代替click

```js
banner_img.addEventListener('touchstart',()=>{
    location.href = 'http://www.baidu.com'
    //window.location.href="https://www.baidu.com"
})
```

#### 解决方案三

让背后的元素暂时失去click事件，300毫秒左右再复原

```css
#anode{
  pointer-events: none; //老属性,表示这个元素不能响应任何事件.
}
```

```js
btn.addEventListener('touchstart',(event)=>{
    shade.style.display =  'none'
    setTimeout(()=>{
        anode.style.pointerEvents = 'auto'; //500毫秒之后,取消事件冻结
    },500)
})
```

#### 解决方案四

让隐藏的元素延迟300毫秒左右再隐藏

```js
btn.addEventListener('touchstart',(event)=>{
    setTimeout(()=>{
    	shade.style.display =  'none'
    },300)
})
```





### 其他

#### 真机调试

```
内网穿透工具:
utools
ngrok
```



# 一、vue脚手架rem适配

> [(4条消息) vue和react脚手架rem适配配置_張三同学的博客-CSDN博客_react rem适配](https://blog.csdn.net/weixin_46535880/article/details/123971379)
> [H5 屏幕的适配办法终结者-小佑Blog| 小佑前端 | WEB前端博客 | WEB前端笔记 (lordblog.cn)](https://lordblog.cn/archives/h5%E5%B1%8F%E5%B9%95%E7%9A%84%E9%80%82%E9%85%8D%E5%8A%9E%E6%B3%95%E7%BB%88%E7%BB%93%E8%80%85)


### 插件postcss-px2rem + js

1. 初始化vue脚手架

   ```
   vue create hello-world
   ```

2. 安装依赖：

   ```js
   yarn add postcss-loader postcss-px2rem
   ```

3. 根目录下建立：vue.config.js ，内容如下：

   ```js
   var px2rem = require('postcss-px2rem');
   
   module.exports = {
     css: {
       loaderOptions: {
         postcss: {
            plugins:[px2rem({remUnit: 375/10})] //375是设计稿宽度
         }
       }
     }
   }
   ```

4. `src/utils/` 目录下创建 `rem.js 或 adapter.js` (响应式判断设备大小，设置不同的根字体大小)，内容如下

   ```js
   function adapter (){
   	const dp = document.documentElement.clientWidth
   	const rootFontSize = dp/10
   	document.documentElement.style.fontSize = rootFontSize + 'px'
   }
   adapter()
   window.onresize = adapter
   ```

5. 在 `scr/index.js` 入口文件中直接引入执行 `rem.js 或 adapter.js`

   ```javascript
   import '@/utils/rem.js'
   //or
   import '@/utils/adapter.js'
   ```

6. 在项目中的写法

   ```vue
   直接按照设计稿中的虚拟像素写, px2rem会将px转换为rem值.
   
   remUnit代表1rem的值是多少
   
   remUnit: 37.5 代表 1rem = 37.5px; 所以当你一个75px值时，它会自动转成 (75px/37.5)rem,
   ```


### postcss-pxtorem + js/@media
> [H5 屏幕的适配办法终结者-小佑Blog| 小佑前端 | WEB前端博客 | WEB前端笔记 (lordblog.cn)](https://lordblog.cn/archives/h5%E5%B1%8F%E5%B9%95%E7%9A%84%E9%80%82%E9%85%8D%E5%8A%9E%E6%B3%95%E7%BB%88%E7%BB%93%E8%80%85)

1.安装`postcss-pxtorem`
```bash
npm i postcss-pxtorem -D
```


2.配置
```js
/* postcss.config.cjs  */
module.exports = {
  plugins: {
    'postcss-pxtorem': {
      rootValue: 16, // 基准值，对应于根元素的 font-size
      unitPrecision: 5, // 保留小数点位数
      propList: ['*', '!min-width', '!max-width'], // 排除 min-width 和 max-width 属性
      selectorBlackList: [], // 忽略的选择器
      replace: true, // 替换而不是添加备用属性
      mediaQuery: false, // 允许在媒体查询中转换 px
      minPixelValue: 0 // 最小的转换数值
    }
  }
};


/* vite  */
export default defineConfig({
  css: {
    postcss: './postcss.config.cjs',
  }
})

```


3.使用
在编写样式时候,直接使用px即可. 通过构建工具运行项目时, 此插件会自动将px转换位rem

4.使用@media媒体查询或js来动态调整font-size
两种方案任选其一
4.1 使用媒体查询
```css
html {
  font-size: 16px; /* 默认基准值 */
}
...
@media (min-width: 1024px) {
  html {
    font-size: 14px; /* 适配较大屏幕 */
  }
}
@media (min-width: 1440px) {
  html {
    font-size: 16px; /* 适配超大屏幕 */
  }
}

```

4.2 使用js动态设置根元素的font-size
```js
// ./utils/setRootFontSize

funtion setRootFontSize() {
	const clientWidth = document.documentElement.clientWidth
	const rootfontSize=(dip*100)/375;
	document.documentElement.style.fontSize=rootFontSize+'px';
}
```

# 二、react脚手架rem适配

1. 初始化react脚手架

   ```
   create-react-app hello_react
   ```

2. 安装依赖

   ```
   yarn add postcss-px2rem customize-cra react-app-rewired
   ```

3. 根目录下建立：config-overrides.js ，内容如下：

   ```js
   const { override,addPostcssPlugins } = require('customize-cra');
   
   module.exports = override(
       //此处375是设计稿宽度
   	addPostcssPlugins([require("postcss-px2rem")({ remUnit: 375/10 })])
   );
   ```

4. 更改package.json中的启动命令，如下：

   ```json
   "scripts": {
       "start": "react-app-rewired start",
       "build": "react-app-rewired build",
       "test": "react-app-rewired test",
       "eject": "react-app-rewired eject"
    },
   ```

5. src目录下建立rem.js，内容如下(给不同设备设置根字体大小)：

   ```js
   function adapter (){
   	const dp = document.documentElement.clientWidth
   	const rootFontSize = dp/10
   	document.documentElement.style.fontSize = rootFontSize + 'px'
   }
   adapter()
   window.onresize = adapter
   ```





## 浏览器

### 其他

判断是否是IE浏览器

```javascript
//document.documentMode 返回IE浏览器版本,例如IE5,返回5;
let isIe = document.documentMode
	|| +(navigator.userAgent.match(/MSIE\s(\d+)/)) && RegExp.$1;
```


## PC端适配方案


