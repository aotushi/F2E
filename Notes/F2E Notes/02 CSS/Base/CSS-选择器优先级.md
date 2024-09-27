---
aliases: CSS选择器优先级
---

# 优先级

> CSS中的优先级规则分为两大类，一类称为继承，另一类称为级联。- `<CSS选择器世界(第2版) 2.1 继承与级联`


## 继承
> 关于继承，只需要记住这样一句话：被继承的CSS声明的优先级一定位于整个CSS世界的底层。

举个例子:
> 对于 ::first-line 伪元素,直接应用的属性总是优先于继承的属性,即使继承的属性使用了 !important。


```html
<p id="text">文字</p>

p::first-line {color: blue;}
#text { color: green !important}
```


如果一个CSS属性同时继承自多个元素，则DOM层级越深的元素所继承的CSS优先级越高。


## 级联

> 在CSS的继承与级联规则中，级联层的优先级定义为以下10项。

(1)transition过渡声明；
(2)设置了!important的浏览器内置样式；
(3)设置了!important的用户设置的样式；
(4)@layer规则中设置的包含!important的样式；
(5)开发者设置的包含!important的样式；
(6)animation动画声明；
(7)开发者设置的CSS样式；
(8)@layer规则中的CSS样式；
(9)用户设置的CSS样式；
(10)浏览器内置的CSS样式。

注意:

* 对于transition过渡声明，规则中称其优先级最高，位于顶级，但是无论如何测试它都是一个普通的CSS属性行为，并不具有规则所称的具有顶级的层级
* 对于animation动画声明，在规则中，其优先级低于!important属性，但是实际测试结果却不是这样的：除Firefox浏览器之外的所有浏览器，包括Chrome、Safari、Edge甚至IE浏览器，其@keyframes规则中的CSS优先级都高于!important。
* 浏览器内置样式，官方说法叫作“用户代理样式, 在右上角会有user agent stylesheet的标识，中文版显示的是“用户代理样式表”​。
* 用户设置样式，这指的是用户通过某些行为带来的样式，例如浏览器自身提供的样式设置选项，或者是安装了某个浏览器插件。在右上角会有injected stylesheet字样，中文版显示的是“注入样式表”​。
* 开发者设置的样式，其实就是Web前端开发人员日常所写的CSS代码，无论是内联在HTML中的CSS还是CSS文件中的代码，都属于这个级联层

级联层的优先顺序: 日常开发代码>@layer开发代码>插件注入代码>浏览器内置代码
开发者设置的级联层优先级最高，浏览器内置的级联层的优先级最低。每个层级中的任何CSS的优先级都不可能比它上面的层级高。


## @layer规则
> 作用是可以让CSS代码的级联层级降低，从而确保主业务的CSS代码不受第三方组件的CSS代码的影响。


### 语法规则
```css
@layer {rules} 
@layer layer-name {rules}; 
@layer layer-name; 
@layer layer-name, layer-name, layer-name;
```

@layer {rules}语法没有任何层级名，称为**匿名级联层**，而下面3种语法均需要自定义级联层的名称，称为**命名级联层**。
















### 浏览器如何计算优先级

<span style="color:blue">一个选择器的优先级可以说是由四个部分相加 (分量)，可以认为是个十百千 — 四位数的四个位数：</span>

1. **千位**： 如果声明在 [`style`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Global_attributes#attr-style) 的属性（内联样式）则该位得一分。这样的声明没有选择器，所以它得分总是1000。
2. **百位**： 选择器中包含<u>ID选择器</u>则该位得一分。
3. **十位**： 选择器中包含<u>类选择器、属性选择器、伪类</u>则该位得一分。
4. **个位**：选择器中包含<u>元素、伪元素选择器</u>则该位得一分。

**注**: <span style="color:blue">通用选择器 (`*`)，组合符 (`+`, `>`, `~`, ' ')，和否定伪类 (`:not`) 不会影响优先级。</span>

在进行计算时不允许进行进位，例如，20 个类选择器仅仅意味着 20 个十位，而不能视为 两个百位，也就是说，无论多少个类选择器的权重叠加，都不会超过一个 ID 选择器。



`:not` 否定伪类在优先级计算中不会被看作是伪类。事实上，在计算选择器数量时还是会把其中的选择器当做普通选择器进行计数。

有如下 CSS 样式声明：

```
div.outer p {
  color: orange;
}

div:not(.outer) p {
  color: blueviolet;
}
```

将其应用于以下的 HTML 时：

```
<div class="outer">
  <p>This is in the outer div.</p>
  <div class="inner">
    <p>This text is in the inner div.</p> //颜色变成blueviolet
  </div>
</div>
```

会在屏幕上出现以下结果：



##### !important

有一个特殊的 CSS 可以用来覆盖所有上面所有优先级计算，不过需要很小心的使用 — `!important`。用于修改特定属性的值， 能够覆盖普通规则的层叠。

最佳实践: **强烈建议除了非常情况不要使用它。**当你不能编辑核心的CSS模块，不能用任何其他方式覆盖，而你又真的想要覆盖一个样式时。覆盖 `!important` 唯一的办法就是另一个 `!important` 具有 相同*优先级* 而且顺序靠后，或者更高优先级。

经验:

- **一定**要优先考虑使用样式规则的优先级来解决问题而不是 `!important`
- **只有**在需要覆盖全站或外部 CSS 的特定页面中使用 `!important`
- **永远不要**在你的插件中使用 `!important`
- **永远不要**在全站范围的 CSS 代码中使用 `!important`





#### 案例

| 选择器                                    | 千位 | 百位 | 十位 | 个位 | 优先级 |
| :---------------------------------------- | :--- | :--- | :--- | :--- | :----- |
| `h1`                                      | 0    | 0    | 0    | 1    | 0001   |
| `h1 + p::first-letter`                    | 0    | 0    | 0    | 3    | 0003   |
| `li > a[href*="en-US"] > .inline-warning` | 0    | 0    | 2    | 2    | 0022   |
| `#identifier`                             | 0    | 1    | 0    | 0    | 0100   |
| 内联样式                                  | 1    | 0    | 0    | 0    | 1000   |

**选择器优先级图表**

![](https://justcode.ikeepstudying.com/wp-content/uploads/2016/07/css_weight.png)



