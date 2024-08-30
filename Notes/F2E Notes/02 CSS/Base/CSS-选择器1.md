---
aliases: CSS选择器分类
---

# CSS选择器分类
#### 基本选择器

* 全局选择器
* 类型选择器
* 类选择器
* ID选择器
* 属性选择器

#### 分组选择器
* 选择器列表

#### 组合选择器
* 后代组合器
* 直接子代组合器
* 一般兄弟组合器
* 相邻兄弟组合器

#### 伪选择器
* 伪类选择器
* 伪元素选择器



# 属性选择器

## 来源
> https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Selectors/Attribute_selectors



## 存在和值选择器

| 声明              | 案例                              | 作用                                                           |
| --------------- | ------------------------------- | ------------------------------------------------------------ |
| `[attr]`        | `[title]`                       | 选择带有`title`属性的所有元素                                           |
| `[attr]`        | li`[class]`                     | 选择带有class属性的`<li>`元素                                         |
| `[attr=value]`  | `a[href="https://example.com"]` | 精确匹配带有`attr`属性及值为`value`的元素                                  |
| `[attr~=value]` | `p[class~="special"]`           | 精确匹配带有`attr`属性及值为`value`的元素或匹配`attr`属性列表(以空格分离)中含有`value`的元素 |
| [attr\|=value]  | div[lang\|="zh"]                | 精确匹配带有`attr`属性及值为`value`的元素或匹配以`value`开头紧且跟连字号(`-`)的元素       |
|                 |                                 |                                                              |

```css
//选取的指定词汇必须是只以此词汇或者以此词汇+"-"的属性值
<div class="de"></div>
<div class="de-lang"></div>
//而不是连接起来作为整体值中以此词汇开头的,这种找不到
<div class="delang"></div>

```


## 子字符串匹配选择器(substring matching selector)
| 声明              | 案例                  | 作用                       |
| --------------- | ------------------- | ------------------------ |
| `[attr^=value]` | `li[class^="box-"]` | 匹配属性以`box-`开头的元素         |
| `[attr$=value]` | `li[class$="-box"]` | 匹配有`-box`结尾的属性的元素        |
| `[attr*=value]` | `li[class*="box"]`  | 匹配在属性字符串任意位置包含`box`属性的元素 |


## 大小写敏感(Case-sensitivity)






[通用选择器](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Universal_selectors)（[Universal selector](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Universal_selectors)）

选择所有元素。（可选）可以将其限制为特定的名称空间或所有名称空间。 **语法：**`*` `ns|*` `*|*` **例子：**`*` 将匹配文档的所有元素。

[元素选择器](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Type_selectors)（[Type selector](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Type_selectors)）

按照给定的节点名称，选择所有匹配的元素。 **语法：**`elementname` **例子：**`input` 匹配任何 [`<input>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/Input) 元素。

[类选择器](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Class_selectors)（[Class selector](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Class_selectors)）

按照给定的 `class` 属性的值，选择所有匹配的元素。 **语法**：`.classname` **例子**：`.index` 匹配任何 `class` 属性中含有 "index" 类的元素。

类选择器以一个句点（`.`）开头，会选择文档中应用了这个类的所有项.

<u>指向特定元素的类</u>
使用附加了类的欲选元素的选择器做到这点，其间没有空格
命名规范: 
* 不能以数字开头, 可以用字母, 下划线开头,+数字+下划线+中划线+字母;
* 建议使用驼峰命名法(小驼峰): 第一个单词首字母小写, 第二个单词首字母大写
```html
span.highLight {}
```

多个类被指向一个元素
你能对一个元素应用多个类，然后分别指向它们，或者仅仅在选择器中存在所有这些类的时候选择这一元素。???(难以理解)

[ID 选择器](https://developer.mozilla.org/zh-CN/docs/Web/CSS/ID_selectors)（[ID selector](https://developer.mozilla.org/zh-CN/docs/Web/CSS/ID_selectors)）
按照 `id` 属性选择一个与之匹配的元素。需要注意的是，一个文档中，每个 ID 属性都应当是唯一的。 **语法：**`#idname` **例子：**`#toc` 匹配 ID 为 "toc" 的元素。

[属性选择器](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Attribute_selectors)（[Attribute selector](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Attribute_selectors)）
按照给定的属性，选择所有匹配的元素。 
**语法：**`[attr]` `[attr=value]` `[attr~=value]` `[attr|=value]` `[attr^=value]` `[attr$=value]` `[attr*=value]` **例子：**`[autoplay]` 选择所有具有 `autoplay` 属性的元素（不论这个属性的值是什么）。



#### 分组选择器(Grouping selectors)

[选择器列表](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Selector_list)（[Selector list](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Selector_list)）
`,` 是将不同的选择器组合在一起的方法，它选择所有能被列表中的任意一个选择器选中的节点。 **语法**：`A, B` **示例**：`div, span` 会同时匹配 [`span`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/span) 元素和 [`div`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/div) 元素。

多个使用相同样式的CSS选择器，那么这些单独的选择器可以被混编为一个“选择器列表”，使用<span style="color:blue">逗号分隔</span>

<span style="color:blue">如果任何一个选择器无效 (存在语法错误)，那么整条规则都会被忽略。</span>

```css
h1,h2,h3,h4,h5,h6 {
  color: green;
  }
```



#### 组合器(Combinators)
[后代组合器](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Descendant_combinator)（[Descendant combinator](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Descendant_combinator)）

“ ”（空格）组合器选择前一个元素的后代节点。 **语法：**`A B` **例子：**`div span` 匹配所有位于任意 [`<div>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/div) 元素之内的 [`<span>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/span) 元素。

[直接子代组合器](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Child_combinator)（[Child combinator](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Child_combinator)）

`>` 组合器选择前一个元素的直接子代的节点。 **语法**：`A > B` **例子**：`ul > li` 匹配直接嵌套在 [`<ul>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/ul) 元素内的所有 [`<li>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/li) 元素。

[一般兄弟组合器](https://developer.mozilla.org/zh-CN/docs/Web/CSS/General_sibling_combinator)（[General sibling combinator](https://developer.mozilla.org/zh-CN/docs/Web/CSS/General_sibling_combinator)）
`~` 组合器选择兄弟元素，也就是说，后一个节点在前一个节点后面的任意位置，并且共享同一个父节点。 **语法**：`A ~ B` **例子**：`p ~ span` 匹配同一父元素下，[`<p>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/p) 元素后的所有 [`<span>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/span) 元素。

[紧邻兄弟组合器](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Adjacent_sibling_combinator)（[Adjacent sibling combinator](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Adjacent_sibling_combinator)）
`+` 组合器选择相邻元素，即后一个元素紧跟在前一个之后，并且共享同一个父节点。 **语法：**`A + B` **例子：**`h2 + p` 会匹配所有紧邻在 [`<h2>` (en-US)](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Heading_Elements) 元素后的 [`<p>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/p) 元素。

[列组合器](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Column_combinator)（[Column combinator](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Column_combinator)）Experimental

`||` 组合器选择属于某个表格行的节点。 **语法：** `A || B` **例子：** `col || td` 会匹配所有 作用域内的 [`<td>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/td) 元素



#### 伪选择器(Pseudo)
> [CSS Pseudo-Elements Module Level 4 (w3.org)](https://www.w3.org/TR/css-pseudo-4/)


##### 伪类
<span style="text-decoration:underline red ">伪类是选择器的一种，它用于选择处于特定状态的元素</span>，比如当它们是这一类型的第一个元素时，或者是当鼠标指针悬浮在元素上面的时候。

##### 语法
```css
:pseudo-class-name
```


##### 简单伪类
[`:first-child`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:first-child)伪类选择器

表示在一组兄弟元素中的第一个元素



[`:last-child`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:last-child) 

代表父元素的最后一个子元素



[`:only-child`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:only-child)

匹配没有任何兄弟元素的元素

等效的选择器还可以写成 `:first-child:last-child`或者`:nth-child(1):nth-last-child(1)`,当然，前者的权重会低一点。





[`:invalid`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:invalid)

表示任意内容未通过验证的 [`<input>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/Input) 或其他 [`<form>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/form) 元素 



```css
/*可选定任意无效的<input> */

input:invalid {
  background-color: pink;
}
```



注意:

[单选钮（Radio buttons）](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:invalid#单选钮（radio_buttons）)

若一组单选钮被设定为必须选定一个，在该组中没有按钮被选中的情况，:invalid 伪类被应用到该组中的所有按钮。（单选钮组按照 name 属性共享相同值。）

[Gecko 默认](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:invalid#gecko_默认)

默认情况下，Gecko 不应用 :invalid 伪类设置的样式。但是，Gecko 可以使用 [`:-moz-ui-invalid` (en-US)](https://developer.mozilla.org/en-US/docs/Web/CSS/:user-invalid) 伪类的样式（使用 [`box-shadow`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/box-shadow) 属性设置红色发光边框）来达到类似的效果，它可以被应用在:invalid 伪类的子集中。



##### 用户行为伪类

**用户行为伪类**，有时叫做**动态伪类**，表现得就像是一个类在用户和元素交互的时候加到了元素上一样。案例包括：

- `:hover`——只会在用户将指针挪到元素上的时候才会激活，一般就是链接元素。
- `:focus`——只会在用户使用键盘控制，选定元素的时候激活。




#### 来源


