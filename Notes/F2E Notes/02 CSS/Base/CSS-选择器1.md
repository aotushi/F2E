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
在关闭括号前面使用字符`i`来匹配大小写不敏感的属性. 这个符号告诉浏览器匹配不区分大小写的ASCII字符.





## 伪类/伪元素选择器

### 伪类选择器
#### 是什么
伪类是一个选择器,用来选择特定状态的元素.
以冒号`:`开头+关键字来标识,一般前面搭配元素来标识,不写元素也是合法的.

```
*:fist-child {}
p:first-child {}
:first-child {}
```

#### 元素的伪类选择器列表
> https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-classes#element_display_state_pseudo-classes




### 伪元素选择器
#### 是什么
伪元素像添加进标签中一个新的html元素,而不是对已存在元素使用类.
以双冒号`::`开头, 早期也使用过单冒号.



#### 使用案例
**伪元素和伪类组合使用**
```css
p:first-child::first-line {
	font-size: 120%;
	font-weight: bold;
}
```

**特殊的`::before`, `::after`**
