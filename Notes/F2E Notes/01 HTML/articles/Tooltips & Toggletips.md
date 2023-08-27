> https://inclusive-components.design/tooltips-toggletips/




## Inclusive tooltips(包容性工具提示)
首先要作对的事是让工具提示中的文本对辅助技术可访问.有很多方法可以将tooltip与焦点控件连接起来,我们基于tooltipo特定role来选择: tooltip是用作标签还是辅助性声明?

### 标签/辅助性描述
![](https://inclusive-components.design/content/images/2017/07/primary_or_auxiliary.svg)


一个带有"通知"提示的通知控制将该提示视为主要标签。另外，读取"查看通知并管理设置"的工具提示则是补充性的。





### 作为主要标签的tooltip

> 可以使用 aria-labelledby 来将一个元素与另一个元素关联起来，作为它的主要标签。

通过`aria-labelledby`和`id`属性共享相同的值来建立这种关系。
```html
<button class="notifications" aria-labelledby="notifications-label">  
  <svg><use xlink:href="#notifications-icon"></use></svg>
</button>  
<div role="tooltip" id="notifications-label">Notifications</div>


// 
```

* 记住`role=tooltip`的用法,其提供的所有保证就是,`aria-describedby`在受支持的环境中工作.[除非你合适的使用role, 否则ARIA标签和元素有时并不适用所有元素](https://www.tpgi.com/short-note-on-aria-label-aria-labelledby-and-aria-describedby/). [[aria-label,aria-labelledby,aria-describedby]]
* 在某些标签中的内容例如svg,链接的SVG中的任何文本内容都不会被读出。aria-labelledby关联优先于按钮的文本内容作为标签。

对于屏幕阅读器及用户,上面代码功能上与下面的简单文本标签类似:
```html
<button class="notifications">Notifications</button>
```

#### 多余的tooltips
* 使用title属性来链接相同文本节点
```html
<a href="/some/path" title="Heydon's special page">Heydon's special page</a>
```


#### 包含通知数量
> `aria-labelledby`能接受多个,以空格分隔的id.

通知按钮包含未读通知的数量.

![](https://inclusive-components.design/content/images/2017/07/notification_count-1.svg)


```html
<button class="notifications" aria-labelledby="notifications-count notifications-label">  
  <svg><use xlink:href="#notifications-icon"></use></svg>
  <span id="notifications-count">3</span>
</button>  
<div role="tooltip" id="notifications-label">Notifications</div>
```



### 作为辅助说明的tooltip


### 交互interaction


### 触摸交互(touch interaction)



### 兼容性的切换提示(inclusive toggletips)



