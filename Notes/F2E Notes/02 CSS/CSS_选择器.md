





### 分类概述
**1.基本选择器**
* 全局选择器
* 类型选择器
* 类选择器
* ID选择器
* 属性选择器

**2.分组选择器**
* 选择器列表

**3.组合选择器**
* 后代选择器
* 直接子代组合器(`a>b`) 选择选择前一个元素的直接子代的节点
* 一般兄弟选择器(`a~b`) 后一个节点在前一个节点后面的任意位置，并且共享同一个父节点。
* 相邻兄弟选择器(`a+b`) 后一个元素紧跟在前一个之后，并且共享同一个父节点。

**4.伪选择器**
* 伪类选择器 伪选择器支持按照未被包含在文档树中的状态信息来选择元素。
* 伪元素选择器 伪选择器用于表示无法用 HTML 语义表达的实体


### 类型选择器(type)



### 类选择器(class)



### ID选择器



### 属性选择器


### 伪类选择器(Pseudo-classes)

> 概要: 不存在的类,来描述一个元素的特殊状态. 伪类一般情况下以":"开头

| 类型 | 选择器 | 示例    | 示例说明                                    | css  |
| ---- | ------ | ------- | ------------------------------------------- | ---- |
| 伪类 | :root  | :root   | 选择文档的根元素                            | 3    |
| 伪类 | :empty | p:empty | 选择每个没有任何子级的p元素（包括文本节点） | 3    |



##### :root选择器

```css
//:root选择器用匹配文档的根元素,可以定义全局变量供多个属性使用.

var()函数,用域插入自定义属性值,例如一个属性值在多出被使用
calc() 函数用于动态计算长度值。

:root{
    --windowW:1000px;
    --widowH:1000px;
}
.box{
    width:var(--windowW);
    height:cala(var(--windowH)-100px);
}
```



```html
=========第一种: 受其他元素的影响========

第一个儿子元素   元素:first-child{}
最后一个儿子元素  元素:last-child{}
第编号个儿子元素  元素:nth-child(){}
					odd 奇数
					even 偶数
					表达式 2n+1 n是从0开始的整数

倒数第某个元素  元素:nth-last-child(x){}
唯一的元素       元素:only-child{}


========第二种: 不受其他元素的影响========
第一个儿子元素  元素:first-of-type{}  /* 后面若有其他元素包含的目标元素,也算是第一个儿子元素 */
最后一个儿子元素 元素:last-of-type{}
第编号个儿子元素  元素:nth-of-type(){}
					odd 奇数
					even 偶数
					表达式 2n+1 n是从0开始的整数/2n等其他可以选择相应的表达式
倒数第编号个儿子元素 元素:nth-last-of-type(){}
唯一元素选择器      元素:only-of-type{}


============
空内容元素
元素:empty{}
```


#### 案例

携程导航案例

```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title></title>
		<style type="text/css">
			*{
				margin: 0;
				padding: 0;
				list-style: none;
			}
			body{
				padding: 10px;
			}
			nav ul {
				border-radius: 10px;
			}
			nav ul li{
				float:left;
				width:33.33%;
			}
			nav ul li a{
				display: block;
				height: 39px;
				background: orange;
				text-decoration: none;
				text-align: center;
				line-height: 39px;
				color:#fff;
				border-right: 1px solid #fff;
				border-bottom: 1px solid #fff;
			}
			/* nav ul li:first-of-type a{
				height: 79px;
				line-height: 79px;
				border-radius: 10px 0 0 10px;  第二种用法
			} */
			
			nav ul li a:only-child{
				height: 79px;
				line-height: 79px;
				border-radius: 10px 0 0 10px;/*圆角也是给a加,给ul加不显示.*/
			}
			nav ul li:nth-child(3) a:nth-last-child(2){
				border-radius: 0 10px 0 0;
			}
			nav ul li:nth-child(3) a:last-of-type{
				border-radius: 0 0px 10px 0;
			}
			nav:last-of-type{
			   margin-top: 10px;	
			}
			nav:last-of-type a{
				background: lightgreen;  /*加背景色要给a添加,因为a浮动覆盖了ul的*/
			}
			.clearFix::after{
				content: "";
				display: block;
				clear: both;
			}
		</style>
	</head>
	<body>
		<nav>
			<ul class="clearFix">
				<li>
					<a href="##">酒店</a>
				</li>
				<li>
					<a href="##">汉庭酒店</a>
					<a href="##">如家酒店</a>
				</li>
				<li>
					<a href="##">7天酒店</a>
					<a href="##">速8酒店</a>
				</li>
			</ul>
		</nav>
		<nav>
			<ul class="clearFix">
				<li>
					<a href="##">酒店</a>
				</li>
				<li>
					<a href="##">汉庭酒店</a>
					<a href="##">如家酒店</a>
				</li>
				<li>
					<a href="##">7天酒店</a>
					<a href="##">速8酒店</a>
				</li>
			</ul>
		</nav>
	</body>
</html>


```




### 伪元素选择器(Pseudo-elements)
>[Pseudo-classes and pseudo-elements - Learn web development | MDN (mozilla.org)](https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Selectors/Pseudo-classes_and_pseudo-elements#what_is_a_pseudo-element)
>[Pseudo-elements - CSS: Cascading Style Sheets | MDN (mozilla.org)](https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-elements)


#### 概述
伪元素是为选择器添加的关键字,用来装饰选择元素特定的部分.伪元素以双冒号开始`::`,例如`::before`就是一个伪元素的例子.

在一个选择器中你只能用一次伪元素.它必须出现在语句中的简单选择器之后。
> 注意,一些早起伪元素使用单冒号语法.现代浏览器支持具有单冒号或双冒号语法的早期伪元素，以实现向后兼容性.
> 但在使用中,双冒号应该代替单冒号.


#### 语法
```css
selector::pseudo-element {
	property: value;
}
```


#### 集合
##### `::after` `::before`
>[::before和::after伪元素的用法 - starof - 博客园 (cnblogs.com)](https://www.cnblogs.com/starof/p/4459991.html)

`::before和::after`下特有的content，用于在css渲染中向元素逻辑上的头部或尾部添加内容。
这些添加不会出现在DOM中，不会改变文档内容，不可复制，仅仅是在css渲染层加入。
所以不要用:before或:after展示有实际意义的内容，尽量使用它们显示修饰性内容，例如图标。
举例：网站有些联系电话，希望在它们前加一个icon☎，就可以使用:before伪元素，如下：

```html
<!DOCTYPE html>
<meta charset="utf-8" />
<style type="text/css">
    .phoneNumber::before {
    content:'\260E';
    font-size: 15px;
}
</style>
<p class="phoneNumber">12345645654</p>
```

这些特殊字符的html，js和css的写法是不同的，具体可查看[html特殊字符的html，js，css写法汇总。](http://www.cnblogs.com/starof/p/4718550.html)

**content属性**
>[content - CSS: Cascading Style Sheets | MDN (mozilla.org)](https://developer.mozilla.org/en-US/docs/Web/CSS/content)

::before和::after必须配合content属性来使用，content用来定义插入的内容，content必须有值，至少是空。默认情况下，伪类元素的display是默认值inline，可以通过设置display:block来改变其显示。

content可取以下值。





##### `::backdrop`




##### `::cue`
##### `::cue-region`

##### `::first-letter`
##### `::first-line`
##### `::file-selector-button`

##### `::grammar-error`<span style="display:inline-block; width:15px; height:15px; background: center/contain url(https://developer.mozilla.org/static/media/experimental.2f9e05f53c6dbee7791c.svg)"></span>

##### `::marker`

##### `::part()`
##### `::placeholder`

##### `::selection`
##### `::slotted()`
##### `::spelling-error`<span style="display:inline-block; width:15px; height:15px; background: center/contain url(https://developer.mozilla.org/static/media/experimental.2f9e05f53c6dbee7791c.svg)"></span>

##### `::target-text`<span style="display:inline-block; width:15px; height:15px; background: center/contain url(https://developer.mozilla.org/static/media/experimental.2f9e05f53c6dbee7791c.svg)"></span>



```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title></title>
		<style type="text/css">
			.box{
				width: 300px;
				height: 300px;
				background: pink;
				overflow: hidden;
				position: relative;
			}
			.box::before{
				content:"before"; /* 必写项content */
				width:100px;
				height: 100px;
				background: yellow;
				/* display: block;
				margin: 10px auto 0; */
				float:left;
			}
			.box::after{
				content:"after";
				width: 100px;
				height: 100px;
				background: green;
				position: absolute;
				left:0;
				right:0;
				bottom:0;
				top:0;
				margin: auto;
			}
		</style>
	</head>
	<body>
		<div class="box">
			<i>box</i>
			
		</div>
		
	</body>
</html>
```





### 组合选择器(combinators)


#### 子元素选择器

概述: 当使用  `>` 选择符分隔两个元素时,它只会匹配那些作为第一个元素的**直接后代(**子元素)的元素

语法: 元素1>元素2{样式声明}

示例: 

```html
span{background:white;}
div>span{
background:lightblue;
}
```



当应用如何网页时:

```html
<div>
    <span>
        Span 1. In the div.
    	<span>Span 2. In the span that's in the div.</span>	
    </span>
</div>
<span>Span 3. Not in a div at all</span>
```



网页效果:

<span style="background:lightblue;">Span 1. In the div.</span> Span 2. In the span that's in the div.
Span 3. Not in a div at all.



#### 相邻兄弟选择器
> 概要: 相邻兄弟选择器(`+`) 介于两个选择器之间,当第二个元素 **紧跟** 在第一个元素之后,并且两个元素都是属于同一个`父元素` 的子元素,则第二个元素将被选中.


语法:
```css
former_element + target_element {style properties }
```




#### 通用兄弟选择器

> 概述: 兄弟选择符，位置无须紧邻，只须同层级，`A~B` 选择`A`元素之后所有同层级`B`元素。

语法:
```html
former_element ~ target_element { style properties }
```




