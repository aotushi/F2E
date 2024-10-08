---
aliases: flex
---





# flex

## 介绍

Flex是Flexible Box的缩写，意为”弹性布局”，用来为盒状模型提供最大的灵活性。
任何一个容器都可以指定为Flex布局。行内元素也可以设置flex布局.
设为Flex布局以后:
* 子元素的块级特性会消失;
* 子元素的`float`、`clear`和`vertical-align`属性将失效。



## 基本概念与概念

![](https://jsd.cdn.zzko.cn/gh/aotushi/image-hosting@master/documentation/.4lahpd7pbs40.webp)


### Flex容器
>HTML 上的大多数元素都可以是Flex容器，比如 `div` 、`ul` 、`main` 块元素，`span` 、`em` 这样的内联元素。只需要在 HTML 元素上显式设置 `display` 的值为 `flex` 或 `inline-flex` 即可。
>**注意，HTML 中的可替代元素是无法成为Flex容器的，比如`img`、 `input`、 `select`等元素！**

![](https://jsd.cdn.zzko.cn/gh/aotushi/image-hosting@master/documentation/.1munzxai0xmo.webp)

### Flex容器与子元素关系
* 当一个元素变成了Flex容器之后，它的子元素，包括其伪元素 `::before` 、`::after` 和 文本节点 都将成为 **Flex 项目**
* 在 Flexbox 布局中，Flex容器和Flex项目之间的关系永远是**父子关系**。因此，Flex项目也可以是它的子元素的Flex容器，即 显式地在Flex项目设置 `display` 属性值为 `flex` 或 `inline-flex`


### 主轴与侧轴及方向
* 在 Flexbox 中，Flex容器内也有两个轴，而且这两个轴只存在于Flex容器中，分别叫 **主轴** （Main Axis）和 **侧轴** （Cross Axis）。
* Flexbox 中的主轴由 `flex-direction` 属性设置，默认情况下，主轴沿行方向（内联轴 Inline Axis）分布，如果该属性为 `column` ，则主轴沿列方向（块轴 Block Axis）分布
* Flexbox 布局中的主轴、主方向、侧轴和侧方向会随着：flex-direction,CSS 的书写模式`writing-mode` 或阅读模式 `direction` 影响。
* 主轴还是侧轴都有方向性,所以就有开始处（即起点）和结束处（即终点）之分。根据起点和终点之分，Flex 容器中的每根轴又有 **主轴起点** 、**主轴终点** 、**侧轴起点** 和 **侧轴终点** 之分。每根轴的起点和终点是由 `flex-direction` 和 `writing-mode` (或 `direction`) 来决定的。
* 

![](https://jsd.cdn.zzko.cn/gh/aotushi/image-hosting@master/documentation/.4pvf311r0jk0.webp)


### 容器的宽度和高度
* **主轴尺寸,侧轴尺寸与宽度,高度的关系**
	* 主轴尺寸和侧轴尺寸可以用来决定一个 Flex 容器的大小。但它们并不完全等同于 Flex 容器的宽高（`width x height` ）。
	* 因为 `flex-direction` 和 `writing-mode` 或 `direction` 属性值不同时，用于描述 Flex 容器的物理属性 `width` 和 `height` 有可能会互换的。
	* 当 `flex-direction` 为 `row` ，且书写模式和阅读模式是 LTR 时，主轴的尺寸对应的就是 Flex 容器的宽度，侧轴的尺寸对应的则是 Flex 容器的高度；
	* 当 `flex-direction` 为 `column` ，且书写模式和阅读模式是 LTR 时，主轴的尺寸对应的就是 Flex 容器的高度，侧轴的尺寸对应的则是 Flex 容器的宽度。
* **设置容器的宽度和高度**
	* 在 Flex 容器上显式使用 CSS 的物理属性 `width` 和 `height` 
	* 或使用 CSS 的逻辑属性 `inline-size` 和 `block-size` 设置 Flex 容器主轴和侧轴的尺寸 
	* 也可以使用 `min-*` 和 `max-*` 对 Flex 容器主轴和侧轴的尺寸加以限制。

![](https://jsd.cdn.zzko.cn/gh/aotushi/image-hosting@master/documentation/.2u3drqntyzk0.webp)


## 概念性知识
### CSS元素尺寸大小决定因素
* `auto` 
	* 设置值为 `auto` 时，容器的大小将会以容器上下文来计算。
	* 如果它是个块元素，等于父容器宽度; 如果它是个内联元素，则等于元素内容的尺寸大小；
	* 不过给 `min-width`、`min-height`、`min-inline-size` 或 `min-block-size` 设置值为 `auto` 时，将会指定一个自动计算好的最小值 
* `none` 如果取值为 `none` 时，元素盒子的大小是没有任何限制的。
* `<length-percentage>` 
	*  `<length>` 是一个长度值，它可能是一个固定长度值，也可能是一个相对长度值，主要取决于其单位，比如 `px` 是一个固定值，`vw` 和 `rem` 又是一个相对值。
	* `<percent>` 是一个百分比值，根据其父元素的宽度来解析百分比。
* `min-content`
	* 如果指定了内联轴，那么 `min-content` 对应的大小则是内联大小，否则将表现为属性的初始值，即固有的最小宽度。
* `max-content`
	* 如果指定了内联轴，那么 `max-content` 对应的大小则是内联大小，否则将表现为属性的初始值，即固有的首选宽度。
* `fit-content()`
	* 如果显式指定了内联轴，使用 `fit-content()` 函数，可以用指定的参数替换可用空间，即 `min(max-content, max(min-content, <length-percentage>))`；否则将表现为属性的初始值。
	* 对于内在尺寸，`fit-content(<length>)` 表现长度值（`<length>`）。如果 `fit-content()` 使用了百分比值，`min-content` 作为最小内容，`max-content` 作为最大内容 。

### flexbox布局中的项目尺寸影响因素
* 上述多个尺寸
* flex-basis 指定Flex项目在Flex容器主轴方向的初始值
	* 除了 `auto` 和 `content`，`flex-basis` 都以与水平书写模式中 `width`相同的方式解析（除了 `width` 值设置为 `auto`，`flex-basis` 设置为 `content`）。












## 容器的6属性

```markdown
flex-direction
flex-wrap
flex-flow
justify-content
align-items
align-content
```



### flex-direction

```js
flex-direction属性决定主轴的方向（即项目的排列方向）

flex-direction:row|row-reverse|column|column-reverse
row 默认值.     主轴是水平方向,左边开始,右边结束. 侧轴是垂直方向,上边开始,下边结束
row-reverse    主轴是水平方向,右边开始,左边结束. 侧轴是垂直方向,上边开始,下边结束

column         主轴是垂直方向,上边开始,下边结束. 侧轴是水平方向,左边开始,右边结束   
column-reverse 主轴是垂直方向,下边开始,上边结束. 侧轴是水平方向,左边开始,右边结束 
```




### flex-wrap

```js
flex-wrap属性定义，如果一条轴线排不下，如何换行

flex-wrap:nowrap|wrap|wrap-reverse

nowrap(默认):不换行
wrap:换行，第一行在上方
wrap-reverse: 换行，第一行在下方
```

nowrap: 不换行

![](https://upload-images.jianshu.io/upload_images/2326131-b71b6e4c79ceb64b.png?imageMogr2/auto-orient/strip|imageView2/2/w/700/format/webp)



wrap: 换行. 第一行在上方

![](https://upload-images.jianshu.io/upload_images/2326131-6de957f9ef4d43fa.jpg?imageMogr2/auto-orient/strip|imageView2/2/w/700/format/webp)





wrap-reverse: 换行 第一行在下方

![](https://upload-images.jianshu.io/upload_images/2326131-b432b2461d51d73a.jpg?imageMogr2/auto-orient/strip|imageView2/2/w/700/format/webp)





### flex-flow

```js
flex-direction属性和flex-wrap属性的简写形式，默认值为row nowrap。

.box{
    flex-flow:<flex-direction><flex-wrap>
}
```



### justify-content

```js
定义了项目在主轴上的对齐方式

justify-content: flex-start|flex-end|center|space-between|space-around

它可能取5个值，具体对齐方式与轴的方向有关。下面假设主轴为从左到右
flex-start（默认值）：左对齐
flex-end：右对齐
center： 居中
space-between：两端对齐，项目之间的间隔都相等。
space-around：每个项目两侧的间隔相等。所以，项目之间的间隔比项目与边框的间隔大一倍。
```

![justify-content](https://www.runoob.com/wp-content/uploads/2015/07/c55dfe8e3422458b50e985552ef13ba5.png)

### align-items

#### 定义
> 只用于控制 Flex 项目在 Flex 行侧轴方向的对齐方式


#### 使用背景
>


#### 语法
```css
align-items: normal | stretch(默认值) | <baseline-position> | [<overflow-position>? <self-position>]

<baseline-position> = 
  [ first | last ]?  &&
  baseline           

<overflow-position> = 
  unsafe  |
  safe    

<self-position> = 
  center      |
  start       |
  end         |
  self-start  |
  self-end    |
  flex-start  |
  flex-end    
```

#### 布局效果
![align-items](https://jsd.cdn.zzko.cn/gh/aotushi/image-hosting@master/documentation/image.1hy7w03un5nk.webp)


#### flex-direction与align-items
> 使用 flex-direction 改变主轴和侧轴方向时，它们的表现形式是相同的，只不过当 flex-direction 属性的值是 column （或 column-reverse）时，align-items 属性取值为 baseline 时产生的结果与 flex-start 或 start 相同。






### align-content

#### 定义
>除了可以让 Flex 项目所在行在 Flex 容器侧轴对齐之外，还可以用来分配 Flex 容器侧轴方向的剩余空间，比如 space-around 、space-between 和 space-evenly 等属性

#### 生效前提
> 注意: 只有当flex-wrap为非nowrap时候(wrap,wrap-reverse)时,才起作用


#### 特点
* 当 Flex 容器中只有一行 Flex 项目，那么 align-content 属性取值为 sapce-around 和 space-evenly 的效果等同于 center； align-content 属性取值为 space-between 的效果等同于 flex-start 和 start
* 同时设置 justify-content 和 align-content 两个属性的话，那么你可以使用它们的简写属性 place-content
	* 如果只显式给 place-content 属性设置了一个值，则表示 justify-content 和 align-content 使用的是同一个值；使用 `place-content: center` 构建一个水平垂直居中 的布局效果
	* 如果给 place-content 属性设置了两个值，则第一个值将作用于 align-content ，第二个值将作用于 justify-content



#### align-content与align-items区别

* align-content 属性必须要在 flex-wrap 属性值为 wrap 或 wrap-reverse 条件下才能正常工作；但 align-items 属性则不需要；
* align-content 属性除了可以让 Flex 项目所在行在 Flex 容器侧轴对齐之外，还可以用来分配 Flex 容器侧轴方向的剩余空间，比如 space-around 、space-between 和 space-evenly 等属性；但 align-items 属性则只用于控制 Flex 项目在 Flex 行侧轴方向的对齐方式。
* 如果在 Flex 容器上，同时设置了align-content属性的值是非stretch 值和align-items属性任一值，那么客户端会以align-content属性为主，而align-items属性则会被客户端忽略；如果在 Flex 容器上，同时设置了align-content属性值是stretch(即默认值)和显式设置了align-items属性任一值，那么客户端会以align-items属性为主，而align-content则会被客户端忽略。


#### align-items与align-self比较
* 当 align-self与align-content同时存在时，只有 align-content 属性值为 stretch 时，align-self属性的值才有效。
* 只不过 Flex 项目的 align-self 属性取值为 auto 时，不会覆盖 Flex 容器上 align-items 属性值的效果


#### flex项目上的margin
* 在 Flex 项目上使用 margin: auto，会致使 Flex 项目上的 align-self 属性失效。
* 使用场景: 将flex项目从flex容器的主轴上分离出来. 例如

![](https://jsd.cdn.zzko.cn/gh/aotushi/image-hosting@master/documentation/image.1wkpf6zyayow.webp)




## 弹性元素的6属性

```js
order
flex-grow
flex-shrink
flex-basis
flex
align-self
```

### order

```js
定义项目的排列顺序。数值越小，排列越靠前，默认为0

.item{
    order:<integer>  
}
```

![](https://www.runoob.com/wp-content/uploads/2015/07/59e399c72daafcfcc20ede36bf32f266.png)




### flex
> `flex` 是一个只能用于 Flex 项目的属性，它可以**让 Flex 项目根据 Flex 容器的可用空间对自身做伸缩计算** ，它包含三个子属性：`flex-basis` 、`flex-grow` 和 `flex-shrink`


```css
//属性是flex-grow, flex-shrink 和 flex-basis的简写，默认值为0 1 auto。后两个属性可选。
//该属性有两个快捷值：auto (1 1 auto) 和 none (0 0 auto)。 建议优先使用这个属性，而不是单独写三个分离的属性，因为浏览器会推算相关值。
.item {
  flex: none | [ <'flex-grow'> <'flex-shrink'>? || <'flex-basis'> ]
}
```


#### 特点
* 每一个 Flex 项目因未显式设置任何与尺寸有关的属性，浏览器视每一个 Flex 项目的尺寸即为其内容的最大尺寸（`max-content`），同时浏览器根据内容多少，可计算出其宽度的具体值是多少像素值。
* 默认值，即 `flex: 0 1 auto` ，对应的就是：
	- `flex-grow` 属性的初始值为 `0` ，表示 Flex 项目不扩展（即不瓜分 Flex 容器的剩余空间）；
	- `flex-shrink` 属性的初始值为 `1` ，表示 Flex 项目会收缩（即 Flex 项目在原始尺寸上按比率减去 Flex 容器的不足空间）；
	- `flex-basis` 属性的初始值为 `auto` ，表示 Flex 项目的基本尺寸是 Flex 项目的最大内容尺寸（即 `max-content`）。
- `flex` 属性可以指定 **`1`** **个值** （单值语法）、**`2`** **个值** （双值语法）或 **`3`** **个值** (三值语法)。
- `flex` 属性的单值语法时，其值必须为以下其中之一：
	- 一个无单位的数值（`<number>`），比如 `flex: 1` ，这个时候它（即`1`）会被当作 `flex-grow` 属性的值；
	- 一个有效的长度值（`<length-percentage>` ），比如 `flex: 30vw` ，这个时候它（即 `30vw`）会被当作 `flex-basis` 属性的值；
	- 关键词 `none` 、 `auto` 或 `initial` （即初始值）。
```css
.item {
	flex: 1;
	/* 等同于 */
	flex-grow: 1;
	flex-shrink: 1;
	flex-basis: 0%;
}

.item {
	flex: 30vw;

	/*等同于*/
	flex-grow: 1;
	flex-shrink: 1;
	flex-basis: 30vw;
}
```


* `flex` 属性的双值语法，其第一个值必须为**一个无单位的数值（`<number>`）** ，并且它会**被当作** **`flex-grow`** **属性的值** ；第二个值必须为以下之一：
	* 一个无单位的数值（`<number>`），它会被当作 `flex-shrink` 属性的值；
	- 一个有效的长度值（`<length-percentage>`），它会被当作 `flex-basis` 属性的值。
```css
.item {
  flex: 1 2;
  
  /* 等同于 */
  flex-grow: 1;
  flex-shrink: 2;
  flex-basis: 0%;
}
​
.item {
  flex: 2 30vw;
  
  /* 等同于 */
  flex-grow: 2;
  flex-shrink: 1;
  flex-basis: 30vw;
}
```

* `flex` 属性的三值语法：
	- 第一个值必须是一个无单位的数值（`<number>`），并且它会被当作 `flex-grow` 属性的值；
	- 第二个值必须是一个无单位的数值（`<number>`），并且它会被当作 `flex-shrink` 属性的值；
	- 第三个值必须是一个有效的长度值（`<length-percentage>`），并且它会被当作 `flex-basis` 属性的值。
```css
.items {
  flex: 2 1 200px;
    
  /* 等同于 */
  flex-grow: 2;
  flex-shrink: 1;
  flex-basis: 200px;
}
​
.item {
  flex: 30vw 2 1;
  
  /* 等同于 */
  flex-grow: 2;
  flex-shrink: 1;
  flex-basis: 30vw;
}
```

* 另外， `flex` 属性的取值还可以是：
	- `auto` ：Flex 项目会根据自身的 `width` （或 `inline-size`）和 `height` （或 `block-size`）来确定尺寸，但 Flex 项目会根据 Flex 容器剩余空间进行伸缩。其相当于 `flex: 1 1 auto` 。
```css
/*
	
*/
.item {
  flex: auto;
    
  /* 等同于 */
  flex-grow: 1;     /* Flex 项目可以扩展到超过其 flex-basis */
  flex-shrink: 1;   /* Flex 项目可以收缩到小于其 flex-basis */
  flex-basis: auto; /* Flex 项目为基本大小 auto，即 max-content */
}
```

* **让所有 Flex 项目尺寸相等**(均分 Flex 容器可用空间（不是均分 Flex 容器剩余空间)) ，习惯性使用 `flex: 1` 
* **让所有 Flex 项目尺寸宽度相等**, 使用`flex:1` + `min-width:0;`
```css
.item {
  flex: 1;
  
  /* 等同于 */
  flex-grow: 1;   /* Flex 项目可以增长到超过其 flex-basis */
  flex-shrink: 1; /* Flex 项目可以收缩到比它们的 flex-basis 小 */
  flex-basis: 0%; /* Flex 项目为基本大小 0 */
}


// 实现每个项目宽度相等
.item {
	flex: 1;
	min-width: 0;
}
```
**使用** **`flex: 1`** **表示所有 Flex 项目的大小都为零** ，因此，弹性容器中的所有空间均可供分配。由于所有 Flex 项目的 `flex-grow` 扩展因子均为 `1`，所以，它们可以平均增长并共享 Flex 容器空间。<span style="color:red">显式设置了`flex:1`，所有Flex项目的宽度（或高度）不一定相等。</span>

* `initial`
	*  Flex 项目会根据自身的 `width` (或 `inline-size`)， 和 `height` （或 `block-size`）来确定尺寸，Flex 项目不会扩展，但会收缩来适应 Flex 容器。其相当于 `flex: 0 1 auto`。
```css
.item {
  flex: initial;
  
  /* 等同于 */
  flex-grow: 0;
  flex-shrink: 1;
  flex-basis: auto;
}
```


* `none`
	* Flex 项目会根据自身的 `width` （或 `inline-size`），和 `height` （或 `block-size`）来设置尺寸，它是完全非弹性的，即不会收缩，也不会扩展来适应 Flex 容器。其相当于 `flex: 0 0 auto`。
```css
.item {
  flex: none;
  
  /* 等同于 */
  flex-grow: 0;
  flex-shrink: 0;
  flex-basis: auto;
}
```


#### 常见的值

**`flex: 0 auto; / flex: initial;`**
> 这两个值与 `flex: 0 1 auto` 相同，也是 `flex` 的**初始值** 。会根据 Flex 项目的 `width` (或 `inline-size`) ，和 `height` （或 `block-size`）属性值来决定 Flex 项目尺寸。
> 当 Flex 容器有剩余空间时，Flex 项目并不会扩展填满整个 Flex 容器，但当 Flex 容器有不足空间时，Flex 项目会收缩到其最小值，即 `min-content` 。


**`flex: auto; / flex: 1 1 auto;`**
> Flex 项目会根据 `width`（或 `inline-size`），和 `height`（或 `block-size`）来决定大小，但是完全可以扩展 Flex 容器剩余的空间。

**`flex: none; / flex: 0 0 auto;`**
> Flex 项目会根据 `width`（或 `inline-size`） ，和 `height` (或 `block-size`) 来决定大小，但是完全不可伸缩。

**`flex: <positive-number> / flex: 1 0px; `**
>Flex 项目可伸缩，并将 `flex-basis` 值设置为 `0` （需要带有效的 `<length>` 或 `<percentage>` 单位），导致 Flex 项目会根据设置的比例因子来计算 Flex 容器的剩余空间。Flex 项目按比例扩展或收缩。








### flex-grow
#### 作用
> 扩展flex项目,均分flexbox容器的剩余空间

#### 计算公式
下方公式中的弹性量指的是Flex 项目的一个弹性值，有可能是加上这个弹性值，也有可能是减去这个弹性值。即可增加或减少的一个弹性量 。

> flex项目的弹性量 = (flex容器可用空间 / 所有flex项目扩展值(flex-grow)总和) * 当前flex项目的flex-grow
> 
> flex项目计算后的值 = flex项目的弹性量 + flxe项目的基础尺寸(flex-basis)

![](https://jsd.cdn.zzko.cn/gh/aotushi/image-hosting@master/documentation/image.h8fs3cw44ts.webp)



#### 实例
> 掘金小册>现在web布局

**实例1**
在`flex:1`和`flex-basis: 0%`且flex项目上没有显示设置任何与尺寸相关的属性(如width/inline-size)

![](https://jsd.cdn.zzko.cn/gh/aotushi/image-hosting@master/documentation/image.6212ovfvv0w0.webp)

**实例2**
设置: `flex:1 160px`
```css
.item {
    flex: 1 160px;
    
    /* 等同于 */
    flex-grow: 1;
    flex-shrink: 1;
    flex-basis: 160px;
}
```

这个示例中，显式设置了 flex-basis 的值为 160px ，那么对应的 Flex 容器的剩余空间就是 200px （即 (1000px - 160px × 5) = 200px )。
因为 Flex 项目 A 的内容是一个长单词，它最终会以其内容的最小尺寸为准（即 min-content），大约是 237.56px 。
```
Flex 项目 A 的灵活性 = (Flex 容器的剩余空间  ÷ 所有 Flex 项目扩展因子 flex-grow 值总和 × 当前 Flex 项目自身的扩展因子 flex-grow

Flex 项目 A 的灵活性 = （200px ÷ 5) × 1 = 40px

Flex 项目 A 计算后的宽度（flex-basis） = 160px + 40px = 200px

Flex 项目 B 计算后的宽度 = ((1000px - 237.56px) - 160px × 4) ÷ 4 × 1 + 160px = 190.61px

Flex 项目 C 计算后的宽度 = ((1000px - 237.56px - 190.61px) - 160px × 3) ÷ 3 × 1 + 160px = 190.61px

Flex 项目 D 计算后的宽度 =  ((1000px - 237.56px - 190.61px - 190.61px) - 160px × 2) ÷ 2 × 1 + 160px = 190.61px

Flex 项目 E 计算后的宽度 =  ((1000px - 237.56px - 190.61px - 190.61px - 190.61px) - 160px × 1) ÷ 1 × 1 + 160px = 190.61px
```


**实例3**
给所有 Flex 项目显式设置 flex:1 ，并且显式设置 width 或 inline-size 属性的值为 160px ：
```css
.item {
    flex: 1;
    width: 160px;
    
    /* flex 等同于 */
    flex-grow: 1;
    flex-shrink: 1;
    flex-basis: 0%;
}
```
浏览器计算出来的 Flex 项目的 flex-basis 值将会是：
```
Flex 项目 A 的灵活性 = (Flex 容器的剩余空间  ÷ 所有 Flex 项目扩展因子 flex-grow 值总和 × 当前 Flex 项目自身的扩展因子 flex-grow

Flex 项目 A 的灵活性 = （1000px ÷ 5) × 1 = 200px

Flex 项目 A 计算后的宽度（flex-basis） = 0 + 200px = 200px

Flex 项目 B 计算后的宽度（flex-basis） = ((1000px - 200px）÷ 4) × 1 = 200px
Flex 项目 C 计算后的宽度（flex-basis） = ((1000px - 200px - 200px）÷ 3) × 1 = 200px
Flex 项目 D 计算后的宽度（flex-basis） = ((1000px - 200px - 200px - 200px）÷ 2) × 1 = 200px
Flex 项目 E 计算后的宽度（flex-basis） = ((1000px - 200px - 200px - 200px -200px）÷ 1) × 1 = 200px
```
如果你将 width:160px 换成 width: 260px （它已经大于 Flex 项目 A 的 min-content 值）。你会发现，Flex 项目 A 的 flex-basis 计算出来之后是 200px ，但浏览器最终计算出来的 Flex 项目 A 宽度，最终以 Flex 项目 A 的内容的最小尺寸（min-content ）为准，大约 237.52px 。



**实例4**
如果你在 Flex 项目显式设置了 `flex: auto` 时，相当于显式指定了 `flex-basis` 属性的值为 `auto` ，即：
```css
.item {
    flex: auto; /* 等同于 flex: 1 auto */
    /* 等同于 */
    flex-grow: 1;
    flex-shrink: 1;
    flex-basis: auto;
}
```

> 在 Flexbox 布局中，Flex 项目的 `flex-basis` 值为 `auto` 时，它的大小由 Flex 项目的最大内容长度（即 `max-content`）来决
> 定。

**实例5**
但当 `flex-basis: auto` 碰到 Flex 项目显式设置了长度尺寸，比如 `width` 或 `inline-size` 时，此时的 `auto` 计算出来的值就是对应的 `width` 或 `inline-size` 的值：
```css
.item {
    flex: auto;
    width: 160px;
    
    /* 等同于 */
    flex-grow: 1;
    flex-shrink: 1;
    flex-basis: auto; /* 每个 Flex 项目的 flex-basis 初始值等于 width */
}
```

计算之后
```
Flex 项目 A 的灵活性 = (Flex 容器的剩余空间  ÷ 所有 Flex 项目扩展因子 flex-grow 值总和 × 当前 Flex 项目自身的扩展因子 flex-grow

Flex 项目 A 的灵活性 = (1000px - 160px × 5) ÷ 5 × 1 = 40px

Flex 项目 A 计算后的宽度（flex-basis） = 160px + 40px = 200px

Flex 项目 B 计算后的宽度（flex-basis） = (1000px - 200px - 160px × 4) ÷ 4 × 1 + 160px = 200px
Flex 项目 C 计算后的宽度（flex-basis） = (1000px - 200px - 200px - 160px × 3) ÷ 3 × 1 + 160px = 200px
Flex 项目 D 计算后的宽度（flex-basis） = (1000px - 200px - 200px - 200px - 160px × 2) ÷ 2 × 1 + 160px = 200px
Flex 项目 E 计算后的宽度（flex-basis） = (1000px - 200px - 200px - 200px - 200px - 160px × 1) ÷ 1 × 1 + 160px = 200px
```


**实例6**
单独设置flex-grow
**仅在 Flex 项目显式设置** **`flex-grow`** **一个属性时，它的计算方式类似于** **`flex: auto`** ：
```css
.flex {
    flex: 1;
    
    /* 等同于 */
    flex-grow: 1;
    flex-shrink: 1;
    flex-basis:  0%; /* 浏览器计算值 */
}

.flex-grow {
    flex-grow: 1;
    
    /* 等同于 */
    flex-grow: 1;
    flex-shrink: 1; /* flex-shrink 的初始值为 1 */
    flex-basis: auto; /* flex-basis 的初始值为 auto */
}
```


**实例7**

在给 Flex 项目设置 `flex-grow` 属性的值时, 除了设置一个**正整数** 之外，还可以**给** **`flex-grow`** **设置一个小数值**
**所有 Flex 项目的** **`flex-grow`** **总和如果小于** **`1`** **，Flex 容器剩余空间还会有余留； `flex-grow`** **大于或等于**`1`**时，Flex 容器的剩余空间不会有余留**






**结论**
* 如果没有给flex项目显示设置尺寸(width, inline-size或flex-basis等), 所以它们的尺寸分别由每个 Flex 项目所在内容的最大宽度（max-content）来决定的，不过它们会受文本相关属性值的影响，比如 font-size 、font-family （字形的宽度或高度）、特定单词和文本的长度（比如长字符单词）、Flex 项目包含元素固有或指定的大小
* 当 Flex 项目未显式设置 flex-basis 、 width 或 inline-size 属性值时，浏览器将以 Flex 项目的内容长度（max-content）视为 Flex 项目的基础尺寸，但 Flex 容器的剩余空间等于 Flex 容器的可用空间 。
* 当Flex 项目显式设置了 <span style="color:blue">flex:1 和具体的 width 值</span>时，
	* 如果浏览器计算出来的 flex-basis 大于 Flex 项目的最小内容尺寸（min-content） 时，将以 flex-basis 计算出来的值作为 Flex 项目的宽度；
	* 如果计算出来的 flex-basis 小于 Flex 项目的最小内容尺寸（min-content）时，浏览器会把 Flex 项目的最小内容尺寸（min-content）作为 flex-basis 的最终值，也将其作为该 Flex 项目的宽度。
* 在 Flexbox 布局中，Flex 项目的 <span style="color:blue">`flex-basis` 值为 `auto` </span>时，它的大小由 Flex 项目的最大内容长度（即 `max-content`）来决定
* 只有 Flex 容器有剩余空间，且 `flex-grow` 值不为 `0` 时，Flex 项目才会按照扩展因子（`flex-grow` 值）比率来分割 Flex 容器的剩余空间。
- 如果 Flex 容器中所有 Flex 项目的 `flex-grow` 值的总和小于 `1` 时，Flex 容器的剩余空间是分不完的（有留存），只有 `flex-grow` 值的总和大于或等于 `1` 时，Flex 容器的剩余空间才能全部分完。
- Flex 容器中的所有 Flex 项目的 `flex-grow` 值设置为 `1` ，并不能平均分配 Flex 容器的剩余空间，它和 Flex 项目自身的内容最小尺寸以及它的内部固定尺寸的元素有关。
- Flex 项目的 `flex-grow` 会给 Flex 项目的 `flex-basis` 值带来变化，但它也会受 `min-*` （比如 `min-width` 、 `min-inline-size` 、`min-height` 、`min-block-size`）和 `max-*` （比如 `max-width` 、`max-inline-size` 、`max-height` 和 `max-block-size` ）等属性的影响。

#### 结论

| 设置flex项目尺寸           | 显示声明width/inline-size | flex项目宽度                                                                                                                                 | 其它 |
| -------------------------- | ------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- | ---- |
| 没设置                     | 没设置                    | 由所在内容最大宽度决定,同时也受文本相关属性影响                                                                                              |      |
| flex:1(flex-bais:0)        | 没设置                    | 如果计算出来的flex-basis大于项目最小内容尺寸, 使用flex-basis作为flex项目宽度; 如果flex-basis小于项目最小内容尺寸, 使用最小内容尺寸为项目宽度 |      |
| flex:1(flex-bais:0)        | 设置width为具体值         | 如果计算出来的flex-basis大于项目最小内容尺寸, 使用flex-basis作为flex项目宽度; 如果flex-basis小于项目最小内容尺寸, 使用最小内容尺寸为项目宽度 |      |
| flex:auto(flex-basis:auto) | 没设置                    | flex项目大小由项目的最大内容宽度(max-content)决定                                                                                            |     |
| flex:auto(flex-basis:auto) | 设置width为具体值         | 此时的 `auto` 计算出来的值就是对应的 `width` 或 `inline-size` 的值                                                                           |      |
| flex-grow: 1               | 没设置                    | 效果等同于flex:auto时                                                                                                                        |      |




**结论图示**
![](https://jsd.cdn.zzko.cn/gh/aotushi/image-hosting@master/documentation/image.gcmu9vxq188.webp)


### flex-shrink

> 是在 Flex 容器出现不足空间时（就是所有 Flex 项目的宽度总和大于 Flex 容器可用空间，Flex 项目溢出了 Flex 容器），让 Flex 项目根据自身的收缩因子 flex-shrink 来缩小尺寸 。


#### 计算公式
![](https://jsd.cdn.zzko.cn/gh/aotushi/image-hosting@master/documentation/image.39ct7xv0baw0.webp)




#### 特点

* 在 Flex 项目的计算中，不管是使用 flex-grow 还是 flex-shrink 对 Flex 项目进收缩扩展计算，计算出来的值不能比 Flex 项目的内容的最小长度（min-content）或内部固定元素的长度值还小 。

* 在 Flex 项目中如果未显式设置 flex-basis 的值，浏览器将会采用其默认值 auto 作为 flex-basis 的值。

* flex-basis 取值为 auto 时，且该 Flex 项目未显式设置 width 或 inline-size 属性值（非auto ），那么浏览器将会把 Flex 项目的内容长度作为 flex-basis 的值；反之，有显式设置 width 或 inline-size 属性值（非auto），那么浏览器会把 width 或 inline-size 属性值作为 flex-basis 的值。

* 当你在 Flex 项目同时设置了 width （或 inline-size），且 flex-basis 值为 0 （或任何一个非 auto 的值）时，那么 flex-basis 的值都会替代 width 或 inline-size 属性的值。











### flex-basis

#### 作用
><span style="color:red">flex-basis 属性在任何空间分配发生之前，会对 Flex 项目的尺寸大小进行初始化</span> 。`flex-basis` 其实就是 **将 Flex 项目放入弹性容器之前的大小** .但这个值绝不是 `flex-basis` 的最终值, 浏览器会根据相应的环境给 Flex 项目计算出一个最终的 `flex-basis` 值.



最终决定 Flex 项目大小的会由以下几个方面来决定:

* **Flex 容器的剩余空间（或不足空间）** 、
* **Flex 项目的理想主尺寸（Flex 项目的初始化值）** 、
* **Flex 项目的扩展因子** （`flex-grow` 值）或 **Flex 项目的收缩因子** （`flex-shrink` 值）、
*  **Flex 项目的最小内容（或最大内容）长度值** 以及 **Flex 项目的下限值（`min-\*`值）**
* **和（或）Flex 项目的上限值（`max-\*`值）**

#### 语法
```css
flex-basis: content | <width>
```

* 默认值`auto`,根据内容来计算
* `<width>`
	* 固定值`<length>`
	* 相对值`<length-percentage>`
	* 动态计算值: 使用 `calc()` 、`min()` 、`max()` 和 `clamp()`
	* `min-content/max-content/fit-content`
* content 是指 Flex 项目的内容的自动尺寸，它通常相当于 Flex 项目最大内容大小（max-content）。

**flex-basis: auto**
* 浏览器首先检查flex项目的主尺寸是否设置了绝对值.
	* 如果设置了绝对值,例如200px,那200px就是flex-basis的值(计算前的值)
	* flex项目计算后的值同时受到容器剩余/不足空间的影响,除非flex-grow/flex-shrink都显式设置为0,那flex-basis就是200px
* 如果flex项目可自动调整大小,则`auto`会解析为其内容大小,此时`min-content`, `max-content`就会起作用, 并且flex-basis的值将是`max-content`
* 如果一个值对于`width`将解析为`auto`,那该值对于`flex-basis`就会被解析为`content`. 例如,`flex-basis`的值是一个百分比,那么它会相对于容器的主轴尺寸来计算; 如果容器大小不确定,则`flex-basis`使用的值会是`content`.


#### 计算
初始设置的 `flex-basis` 值并不是 Flex 项目的最终主尺寸，因为影响其最终尺寸的因素较多,`flex-basis` 的计算分为两个部分:
* 由 Flex 容器空间（剩余空间或不足空间），`flex-grow` 、`flex-shink` 以及初始化 `flex-basis` 相关参数计算后的 `flex-basis` 值
* 指定 Flex 项目尺寸大小的相关属性权重的计算

#### 计算 > Flex项目尺寸大小的相关属性权重的计算
> 这部分的计算是指 Flex 项目的假设主尺寸，就是在参与 `flex-grow` 、`flex-shrink` 计算之前，Flex 项目的初始化尺寸由谁来决定。也就是说,当Flex项目上同时出现`flex-basis/width/min-width/max-width`时,谁最有决定权.

**初始化 Flex 项目的尺寸时存在一个隐式的公式** ，即：
```js
`content` ➜ `width` ➜ `flex-basis`
```
也就是说:
* 当Flex项目的Flex-basis和width都没显式设置(会取值为auto),Flex项目的初始化尺寸是fit-content;
	* 按照上序条件,flex-shrink显式重置为0,flex项目不可收缩时,flex项目初始化尺寸是max-content
* 当Flex项目显式设置width(一个具体值,不为auto),没有显示设置flex-basis时,浏览器会采取Flex项目上的`width`属性的值
* 如果Flex项目同时显式设置width与flex-basis(非auto默认值),flex-basis属性值将会替代width值.但是:
	* <span style="color:blue">flex-basis小于width</span>:
		* 且width**小于**flex项目内容最小值(min-content)时, flex-basis值等于width值
		* 且width**大于**flex项目内容最小值(min-content)时, flex-basis值等于flex项目内容最小值
	* <span style="color:blue">flex-basis大于width</span>:
		* 且小于flex项目的内容最小值,flex-basis会等于width值(这条规则复现不了)
		* 都大于flex项目内容最小值,flex-basis不会被任何其他值替代
* flex项目总宽度大于容器空间,但flex-basis显式设置了0或0%,即使flex-shrink是非0值,flex项目也不会按比例分配容器的不足空间.最终flex项目的flex-basis的值等于内容的最小尺寸.





#### min-width的应用

**背景**

> flexbox布局时候,某个flex项目的文本内容很长,导致内容溢出.

几种常见的对待文本溢出的解决方法:

```css
/* 长单词断行,常用语西文 */
.long-word {
  overflow-wrap: break-word;
}

/* 文本截取,末尾添加...  ② */
.text-overflow {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* 多行文本截取,末尾添加... */
.line_clamp {
  --line-clamp: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: var(--lin-clamp);
  -webkit-box-or-orient: vertical;
}
```



例外情况: 输入带有下划线的URL或没有空格的数字,字母等, 可能会超过声明的flex项目的宽度

> 张鑫旭的<CSS新世界>中 `3.1.3 深入了解min-content`章节中提到: 
>
> 1.替换元素(按钮,图片,图片等)的最小宽度是当前元素的内容自身的宽度
>
> 2.CJK文字最小宽度是单个汉字的宽度
>
> 3.非CJK文字(英文,数字,标点等字符)最小宽度由字符单元宽度决定, 所有连续的英文字母, 数字和标点都被认为是一个字符单元, 直到遇到中断字符.

```css
.long-word {
  overflow-wrap: break-word;
}
```

原因和解决方法: 

“**主轴上 Flex 项目的** **`overflow`** **属性是** **`visible`** **时，主轴上 Flex 项目的最小尺寸（min-size）将会指定一个自动的（automatic）最小尺寸** ”。

默认情况下，Flex 项目（设置为 `flex:1` 的 Flex 项目）在收缩的时候，其宽度不会小于其最小内容尺寸（即 `min-content`）。**要改变这一点，需要显式设置** **`min-width`** **或** **`min-height`** **的值** 。

```css
.long-word {
  overflow-wrap: break-word;
  min-width: 0;
}
```

Flex 项目的 `overflow` 的值为 `visible` 以外的值时会导致 `min-width` 的值为 `0`，这就是为什么在方法 ② 中做文本截取的时候，怎么没有 `min-width: 0`。



**flex布局实现等(均)分列**

> Flexbox 布局中要实现均分列（等分列）布局效果时，请在 Flex 项目上显式设置 **`min-width`** **的值为 ** **`0`** ，避免因内容不等长，造成列不均等。

























**`width/min-width/max-width`共同使用时谁会决定元素的宽度?**
> 以下规则同样适用于height及它们对应的CSS逻辑属性.`min-inline-size`、`inline-size`和`max-inline-size`；`min-block-size`、`block-size`和`max-block-size`
- 元素的 `width` 大于或等于 `max-width` 时，取 `max-width` ，即 **`max-width`** **能覆盖** **`width`** ；
- 元素的 `width` 小于或等于 `min-width` 时，取 `min-width` ，即 **`min-width`** **能覆盖** **`width`** ；
- 当 `min-width` 大于 `max-width` 时，取 `min-width` ，即 **`min-width`** **优先级将高于** **`max-width`** 。





### align-self

```css
//属性允许单个项目有与其他项目不一样的对齐方式，可覆盖align-items属性。默认值为auto，表示继承父元素的align-items属性，如果没有父元素，则等同于stretch。

.item {
  align-self: auto | flex-start | flex-end | center | baseline | stretch;
}


```

![](https://www.runoob.com/wp-content/uploads/2015/07/55b19171b8b6b9487d717bf2ecbba6de.png)





## Flexbox布局中的对齐方式
flex布局属性可以分为两组：**空间分配属性** 和 **对齐属性** 。
**用于分配 Flex 容器空间的属性主要有：**
- `justify-content`：沿 Flex 容器的主轴分配 Flex 容器的剩余空间；
- `align-content`：沿 Flex 容器的侧轴分配 Flex 容器的剩余空间；(<span style="color:red">只有当flex-wrap为非nowrap时候才会生效</span>)
- `place-content`：它是 `justify-content` 和 `align-content` 的简写属性。

**用于在Flexbox布局中对齐的属性**
- `align-self`：沿 Flex 容器侧轴对齐单个 Flex 项目；
- `align-items`：将所有 Flex 项目作为一个组，沿 Flex 容器侧轴对齐。


## Flex布局
以下布局都是默认flex-direction: flex-row的.
### 1.水平垂直居中

#### 实现方法

| 布局         | 元素类型    | 主轴方向设置             | 侧轴方向设置                                                 | 其它                                                         |
| ------------ | ----------- | ------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| 水平垂直居中 | 单行或单列  | justify-content: center  | align-items: center;<br /> 或align-content: center;且flex-wrap: wrap 或 wrap-reverse; |                                                              |
| 水平垂直居中 | 多行或多列  | justify-content: center; | ailgn-items: center;                                         | 注意: 多行的flex容器上要显示设置flex-direction:column;<br />需要避免 Flex 项目在侧轴被拉伸，可以重置 `align-items` 的值为 `stretch` 之外的值 |
| 水平垂直居中 | 只有一项    | justify-content: center  | align-self: center                                           | 注意:                                                        |
| 水平垂直居中 | 多行或 多列 | justify-content: center; | align-self: center;                                          |                                                              |
| 水平垂直     | 单个元素    | justify-content: center; | align-content: center;                                       | 1.使用两者简写属性:  `place-content: cente` <br />2. 需要配合`flex-wrap:wrap`使用 |
| 水平垂直     | 多行或多列  | justify-content: center; |                                                              | 同上;<br />3.潜在问题(下方注意事项中)                        |

对于单个元素的布局,也可以使用flex+margin的方式来实现:

父元素使用flex布局(上对齐/下对齐/垂直居中对齐和左右水平居中一样)

* flex项左对齐  margin-right: auto
* flex项右对齐 margin-left: auto
* flex项水平居中 margin: 0 auto;
* flex项水平垂直居中 margin: auto

![image](https://jsd.cdn.zzko.cn/gh/aotushi/image-hosting@master/documentation/image.738drafrlds0.webp)




#### 注意事项

1.多行水平垂直居中使用`place-content:center`(两个语法的缩写)方案存在缺陷: 如果flex容器没有足够空间会使flex项目断行,虽然使用Hack手段可以避免,但会让Web布局失去一定的灵活性,开发中不建议使用,除非你能提前预判:

```css
.container {
  display: flex;
  flex-wrap: wrap;
  place-content: center;
}

.container > .title {
  flex: 1 0 100%;
  text-align: center;
  white-space: nowrap;
}
```





#### 代码示例:

**1.多行或多列水平垂直居中**

```css
// justify-content: center; + align-self: center;
.container {
    display: flex;
    justify-content: center;
}

.container > * {   // 这里这个通配符的用法很赞
    align-self: center;
}

.container--multiple {
    flex-direction: column;
}
```


#### 实例



##### 1.水平垂直居中
1.1 justify-content + align-items
```css
//单行(或单列)水平垂直居中

.container {
	display: flex; // inline-flex
}
.contaienr--single {
	justify-content: center;
	align-items: center;
}

// 多行(或多列)水平垂直居中
.container {
	display: flex;
}
.container-multiple {
	flex-direction: column;
	align-items: center;
	justify-content:center;
}

```


1.2 justify-content + align-self
对待单个元素
```css
<div class="container">
   <div class="item">(^_^)</div>
<div>
.container {
    display: flex; /* 或 inline-flex */
    justify-content: center;  /* Flex 项目水平居中 */
}

.item {
    align-self: center;
}
```

对待多行或多列水平垂直居中
```css
.container {
	display: flex;
	justify-content: center;
}
.container > * {
	align-self: center;
}

.container--multiple {
	flex-direction: column;
}
```

1.3 place-content + flex-wrap

实现单个元素（Flex 项目）在 Flex 容器中水平垂直居中的另一种方案
```css
.container {
	display: flex;
	flex-wrap: wrap;
	place-content: center;

	// 等同于
	justify-content: center;
	align-content: center;
}

```
在特定场景或环境之下，这种方式也适用于多行水平垂直居中，比如 Flex 容器没有足够空间致使 Flex 项目断行：





### 等高布局

因为flex项的align-items默认值是`stretch`, 默认情况之下，Flex 容器中的所有 Flex 项目都是高度相等的.

如果flex项中包含多个子元素,可能因为内容差异导致flex项子元素在水平方向上不在一条线上, 这个时候有两种方法来解决, 1是使用弹性增长或收缩(`flex-grow/flex-shrink`)flex项中的子元素(前提,flex项也是flex容器); 2是用`margin-top: auto`, 对flex项中最后一个子元素声明此属性.

```css
<div class="cards">
    <div class="card">
        <figure>
            <img src="thumb.png" alt="缩略图" />
        </figure>
        <h3>Card Title</h3>
        <p>Card Describe</p>
        <button>Button</button>
    </div>
    <!-- 其他 Card -->
</div>
```



首先,使用flex布局实现flex项等高

```css
.container {
  display: flex;
  flex-wrap: nowra;
}

.container .card {
  display: flex;
  flex-direction: column;
  flex: 1 1 300px;
}
```



再次, 使用flex-grow对flex项中的子元素进行扩展(或者使用flex-shrink对子元素进行收缩). 或者在`button`元素上设置`margin-top`属性.

```css
.card p {
  flex-grow: 1;
}

// 另一种方法
.card button {
  margin-top: auto; //底部对齐
}
```





### 均分列(等分列)

均分列(等分列),列的宽度是相等的.

以往CSS 实现等分列都是通过百分比来计算，比如：

- 列数（`--column`）
- 列间距（`--gap`）

```md
列宽 = (容器宽度 - (列数 - 1)*列间距) / 列数
```

假设一个三列,列间距0,每列的宽度:

```css
.column {
    /**
     * 容器宽度 ➜ 100%
     * 列数    ➜ --columns = 3
     * 列间距  ➜  --gap = 0
     * 列宽 = ((100% - (3 - 1)  × 0) ÷ 3 = 33.3333% 
    **/
    width: 33.33333%; 
}
```

或者使用 `calc()` 函数和 CSS 的自定义属性结合：

```css
:root {
    --container-width: 100%; /* 容器宽度 */
    --columns: 3;            /* 列数 */
    --gap: 0 ;               /* 列间距 */
}

.column {
    width: calc((var(--container-width) - (var(--columns) - 1) * var(--gap)) / var(--columns));
}
```



以上方案的缺点: 需要提前知道等分的列数、列间距等，对于构建一个动态的等分列，上面方案的缺陷就出来了。开发者需要不断地去做数学计算，而且是需要知道参数的情况之下才行。



### 骰子的布局

> [Flex 布局教程：实例篇 - 阮一峰的网络日志](https://www.ruanyifeng.com/blog/2015/07/flex-examples.html)


<iframe src="https://codesandbox.io/embed/flex-tou-zi-g5m9ly?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="flex-骰子"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>




### 网格布局

#### 基本网格布局

![[Pasted image 20231003094637.png]]

```html
<div class="grid">
<div class="grid-cell">
	<div class="item">1</div>
	<div class="item">2</div>
</div>
<div class="grid-cell">
	<div class="item"></div>
	<div class="item"></div>
	<div class="item"></div>
</div>
<div class="grid-cell">
	<div class="item"></div>
	<div class="item"></div>
	<div class="item"></div>
	<div class="item"></div>
</div>
<div class="grid-cell">
	<div class="item">
		Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus, minus
		tempora tenetur officia optio maiores nesciunt nobis enim! Dolor
		facilis, iure earum ea ipsam odit voluptas! Nobis assumenda esse
		tempora. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod
		quasi animi, culpa, quis soluta aliquid corrupti inventore iste
		suscipit rerum error, quam cupiditate labore quaerat assumenda? Quasi
		saepe adipisci non. Lorem, ipsum dolor sit amet consectetur
		adipisicing elit. Harum incidunt distinctio consequuntur, unde quaerat
		quas obcaecati qui omnis! Beatae voluptates eaque libero nobis sequi
		molestias qui in praesentium consequatur a.
	</div>
	<div class="item">
		Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus, minus
		tempora tenetur officia optio maiores nesciunt nobis enim! Dolor
		facilis, iure earum ea ipsam odit voluptas! Nobis assumenda esse
		tempora. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod
		quasi animi, culpa, quis soluta aliquid corrupti inventore iste
		suscipit rerum error, quam cupiditate labore quaerat assumenda? Quasi
		saepe adipisci non. Lorem, ipsum dolor sit amet consectetur
		adipisicing elit. Harum incidunt distinctio consequuntur, unde quaerat
		quas obcaecati qui omnis! Beatae voluptates eaque libero nobis sequi
		molestias qui in praesentium consequatur a.
	</div>
</div>
</div>
```

```css
.grid {
	display: flex;
	flex-direction: column;
}
.grid-cell {
	margin: 10px 0;
	flex: 1;
	display: flex;
	gap: 10px;
}
.grid-cell .item {
	flex: 1;
	height: 50px;
	background-color: #eee;

	display: flex;
	justify-content: center;
	align-items: center;
}
.grid-cell:last-child .item {
	height: auto;
}
```


#### 百分比布局

某个网格的宽度为固定的百分比，其余网格平均分配剩余的空间。

![[Pasted image 20231003094935.png]]

```html
<h1>flex-网格布局-百分比布局</h1>
<p>某个网格的宽度为固定的百分比，其余网格平均分配剩余的空间。</p>
<div class="grid2">
	<div class="Grid-cell u-full">
		<div class="item">1</div>
	</div>
	<div class="Grid-cell">
		<div class="item u-1of2">1/2</div>
		<div class="item">auto</div>
		<div class="item">auto</div>
	</div>
	<div class="Grid-cell">
		<div class="item">auto</div>
		<div class="item u-1of3">1/3</div>
	</div>
	<div class="Grid-cell">
		<div class="item">auto</div>

		<div class="item u-1of3"">1/3</div>
		<div class="item u-1of4">1/4</div>
	</div>
</div>
```


```css
.grid2 {
        display: flex;
        flex-direction: column;
      }
.grid2 .Grid-cell {
	flex: 1;
	margin: 20px 0;

	display: flex;
	gap: 10px;
}
.Grid-cell .item {
	flex: 1;

	background-color: #eee;
	height: 50px;
}
.item.u-1of2 {
	flex: 0 0 50%;
}
.item.u-1of3 {
	flex: 0 0 33.33%;
}
.item.u-1of4 {
	flex: 0 0 25%;
}
```


### 圣杯布局
圣杯布局（Holy Grail Layout）指的是一种最常见的网站布局。页面从上到下，分成三个部分：头部（header），躯干（body），尾部（footer）。其中躯干又水平分成三栏，从左到右为：导航、主栏、副栏。
![[Pasted image 20231003101717.png]]

在flex出现之前可能需要使用负边距,flexbox出现后,可以使用order来实现相同的效果.
```html
<div class="container">
	<header></header>
	<main> 
		<secion class="center"></secion>
		<section class="left"></section>
		<section class="right"></section>
	</main>
	<footer></footer>
</div>
```

```css
.container {
	width: 70%;
	height: 500px;
	border: 1px solid #000;
	margin: auto;
	display: flex;
	flex-direction: column;
}
header,footer {
	flex: 1;
	height: 20px;
	background-color: #eee;
}
main {
	display: flex;
	flex: 1;
}

main .left,
main .right {
	flex: 0 0 8rem;
	background-color: #ee2;
}
main .center {
	flex: 1;
}
main .left {
	order: -1;
}
```


### 输入框布局
![[Pasted image 20231003111926.png]]

```html
<div class="InputAddOn">
  <span class="InputAddOn-item">...</span>
  <input class="InputAddOn-field">
  <button class="InputAddOn-item">...</button>
</div>
```


```css
.InputAddOn {
  display: flex;
}

.InputAddOn-field {
  flex: 1;
}
```
### 悬挂式布局
有时，主栏的左侧或右侧，需要添加一个图片栏。
![[Pasted image 20231003112227.png]]

```html
<div class="Media">
  <img class="Media-figure" src="" alt="">
  <p class="Media-body">...</p>
</div>
```

```css
.Media {
  display: flex;
  align-items: flex-start;
}

.Media-figure {
  margin-right: 1em;
}

.Media-body {
  flex: 1;
}
```


### 固定的底栏
有时，页面内容太少，无法占满一屏的高度，底栏就会抬高到页面的中间。这时可以采用Flex布局，让底栏总是出现在页面的底部。
![[Pasted image 20231003112329.png]]

```html
<body class="Site">
  <header>...</header>
  <main class="Site-content">...</main>
  <footer>...</footer>
</body>
```


```css
.Site {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
}

.Site-content {  //也可以给footer使用margin-top: auto
  flex: 1;    
}
```











