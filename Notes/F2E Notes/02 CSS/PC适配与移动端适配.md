

[前端响应式布局实现方案 - 掘金](https://juejin.cn/post/7227358177490567226)
[移动端适配及PC端适配心得总结体会(一) (可能比较全 - 掘金](https://juejin.cn/post/6884042902587047943)
[移动端适配及PC端适配心得总结体会(二) (可能比较全 - 掘金](https://juejin.cn/post/6885721051360133133)

## 相关概念

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



## PC适配


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



#### 案例//todo??
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








## 移动端适配

