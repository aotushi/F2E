---
aliases: CSS选择器优先级
---

### 选择器优先级

#### 浏览器如何计算优先级

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



