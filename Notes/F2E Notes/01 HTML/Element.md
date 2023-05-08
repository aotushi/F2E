
# 资源

> [Element - Web APIs | MDN (mozilla.org)](https://developer.mozilla.org/en-US/docs/Web/API/Element)


# 是什么
> `Element`是文档中所有元素对象继承的最通用基类(例如, 代表元素的对象).它只具有所有元素所共有的方法和性质。更多具体的类都是继承自`Element`.
> 例如, [HTMLElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement)接口HTML元素普通接口,[SVGElement](https://developer.mozilla.org/en-US/docs/Web/API/SVGElement)接口是所有SVG元素的基础.






# 实例属性
`Element`从父元素接口Node继承属性, 并通过扩展从该接口的父接口(EventTarget)继承属性.

## [`Element.assignedSlot`](https://developer.mozilla.org/en-US/docs/Web/API/Element/assignedSlot) Read only



## [`Element.attributes`](https://developer.mozilla.org/en-US/docs/Web/API/Element/attributes) Read only



## [`Element.childElementCount`](https://developer.mozilla.org/en-US/docs/Web/API/Element/childElementCount) Read only



## [`Element.children`](https://developer.mozilla.org/en-US/docs/Web/API/Element/children) Read only


## [`Element.classList`](https://developer.mozilla.org/en-US/docs/Web/API/Element/classList) Read only



## [`Element.className`](https://developer.mozilla.org/en-US/docs/Web/API/Element/className)


## [`Element.clientHeight`](https://developer.mozilla.org/en-US/docs/Web/API/Element/clientHeight) Read only




## [`Element.clientLeft`](https://developer.mozilla.org/en-US/docs/Web/API/Element/clientLeft) Read only


## [`Element.clientTop`](https://developer.mozilla.org/en-US/docs/Web/API/Element/clientTop) Read only


## [`Element.clientWidth`](https://developer.mozilla.org/en-US/docs/Web/API/Element/clientWidth) Read only

返回一个代表元素内部宽度的数字.

这个属性对行内元素和没有CSS的元素来说是0;另外,它是元素的像素宽度(以像素为单位).它包含内边距对排除边框,外边距和垂直滚动条(如果存在).

当`clientWidth`在根元素(`<html>`元素, 或在[怪异模式]([Quirks Mode - HTML: HyperText Markup Language | MDN (mozilla.org)](https://developer.mozilla.org/en-US/docs/Web/HTML/Quirks_Mode_and_Standards_Mode))下的`<body>`上),返回视口(viewport)的宽度(排除任何滚动条). 






## [`Element.elementTiming`](https://developer.mozilla.org/en-US/docs/Web/API/Element/elementTiming) Experimental



## [`Element.firstElementChild`](https://developer.mozilla.org/en-US/docs/Web/API/Element/firstElementChild) Read only



## [`Element.id`](https://developer.mozilla.org/en-US/docs/Web/API/Element/id)


## [`Element.innerHTML`](https://developer.mozilla.org/en-US/docs/Web/API/Element/innerHTML)



## [`Element.lastElementChild`](https://developer.mozilla.org/en-US/docs/Web/API/Element/lastElementChild) Read only



## [`Element.localName`](https://developer.mozilla.org/en-US/docs/Web/API/Element/localName) Read only


## [`Element.namespaceURI`](https://developer.mozilla.org/en-US/docs/Web/API/Element/namespaceURI) Read only



## [`Element.nextElementSibling`](https://developer.mozilla.org/en-US/docs/Web/API/Element/nextElementSibling) Read only



## [`Element.outerHTML`](https://developer.mozilla.org/en-US/docs/Web/API/Element/outerHTML)



## [`Element.part`](https://developer.mozilla.org/en-US/docs/Web/API/Element/part)



## [`Element.prefix`](https://developer.mozilla.org/en-US/docs/Web/API/Element/prefix) Read only



## [`Element.previousElementSibling`](https://developer.mozilla.org/en-US/docs/Web/API/Element/previousElementSibling) Read only




## [`Element.scrollHeight`](https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollHeight) Read only




## [`Element.scrollLeft`](https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollLeft)




## [`Element.scrollLeftMax`](https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollLeftMax) Non-standard Read only




## [`Element.scrollTop`](https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollTop)




## [`Element.scrollTopMax`](https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollTopMax) Non-standard Read only



## [`Element.scrollWidth`](https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollWidth) Read only





## [`Element.shadowRoot`](https://developer.mozilla.org/en-US/docs/Web/API/Element/shadowRoot) Read only




## [`Element.slot`](https://developer.mozilla.org/en-US/docs/Web/API/Element/slot)



## [`Element.tagName`](https://developer.mozilla.org/en-US/docs/Web/API/Element/tagName) Read only


## ARIA 中包含的实例属性

> ARIA是可访问性资源相关性指定（Accessible Rich Internet Applications）的缩写，是一项国际标准，旨在弥补HTML的不足，为Web应用程序添加语意信息，以便各种辅助技术（如屏幕阅读器）可以更好地理解和呈现Web文档内容。ARIA可以帮助开发人员创建可访问的Web应用程序，使残障用户也能够使用互联网。在MDN文档中，ARIA通常用于描述与可访问性相关的HTML和CSS属性、角色和状态等概念。









# 实例方法

# 事件

# 继承
## Node


## EventTarget





# 与DOM相关部分