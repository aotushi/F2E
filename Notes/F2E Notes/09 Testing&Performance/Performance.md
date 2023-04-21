
# 资源
* https://mp.weixin.qq.com/mp/appmsgalbum?__biz=MzkxNTIwMzU5OQ==&action=getalbum&album_id=1783331624198144008&scene=173&from_msgid=2247493765&from_itemidx=1&count=3&nolastread=1#wechat_redirect

* [barretlee/performance-column: 🚅 性能专栏](https://github.com/barretlee/performance-column)
* [聊一聊前端性能优化 - 掘金 (juejin.cn)](https://juejin.cn/post/6911472693405548557)
* [🔥 2022 前端性能优化最佳实践 - SegmentFault 思否](https://segmentfault.com/a/1190000041753539)
* [前端性能优化 24 条建议(2020) - 知乎 (zhihu.com)](https://zhuanlan.zhihu.com/p/121056616?utm_source=com.microsoft.todos&utm_medium=social&utm_oi=41541510889472)


# 性能优化大纲


## 背景

>性能优化的目的，就是为了提供给用户更好的体验，这些体验包含这几个方面：**展示更快**、**交互响应快**、**页面无卡顿情况**。
 更详细的说，就是指，在用户输入url到站点完整把整个页面展示出来的过程中，通过各种优化策略和方法，让页面加载更快；在用户使用过程中，让用户的操作响应更及时，有更好的用户体验。


## 调试工具

### Network

Chrome浏览器控制台中Network选项下,可以看到资源加载详情，初步评估影响`页面性能`的因素。
鼠标右键可以自定义选项卡，页面底部是当前加载资源的一个概览。`DOMContentLoaded` DOM渲染完成的时间，`Load`：当前页面所有资源加载完成的时间
![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/62898f76c242450eb318b1816428ff65~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

使用**ctrl+shift+P**来调出控制台扩展工具,添加规则


#### **瀑布流waterfall**
![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1613fbeaffb64587a36613271ecfcade~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

-   `Queueing` 浏览器将资源放入队列时间
-   `Stalled` 因放入队列时间而发生的停滞时间
-   `DNS Lookup` DNS解析时间
-   `Initial connection` 建立HTTP连接的时间
-   `SSL` 浏览器与服务器建立安全性连接的时间
-   `TTFB` 等待服务端返回数据的时间
-   `Content Download` 浏览器下载资源的时间


### Lighthouse
-   `First Contentful Paint` 首屏渲染时间，1s以内绿色
-   `Speed Index` 速度指数，4s以内绿色
-   `Time to Interactive` 到页面可交换的时间

根据chrome的一些策略自动对网站做一个质量评估，并且会给出一些优化的建议。



### Performance
对网站最专业的分析~后面会多次讲到



### webPageTest
可以模拟不同场景下访问的情况，比如模拟不同浏览器、不同国家等等，在线测试地址：[webPageTest](https://link.juejin.cn/?target=https%3A%2F%2Fwww.webpagetest.org%2F "https://www.webpagetest.org/")

下面是两张示意图:
![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a1da6a84b5944311a4f8c6f78b2f5fa1~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c2fd7f9c05be47bb80ad67064fc72917~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)



### 资源打包分析

#### webpack-bundle-analyzer


### 开启sourcemap
`bpack.config.js`

```java
module.exports = {
    mode: 'production',
    devtool: 'hidden-source-map',
}
复制代码
```

`package.json`

```json
"analyze": "source-map-explorer 'build/*.js'",
复制代码
```

`npm run analyze`

![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2057c48588f942579c235925d943c162~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)



## web API

#### 监听窗口激活状态

```js
//窗口激活状态监听
let vEvent = 'visibilitychange';
if (document.webkitHidden != undefined) {
    vEvent = 'webkitvisibilitychange';
}

function visibilityChanged() {
    if (document.hidden || document.webkitHidden) {
        document.title = '客官，别走啊~'
        console.log("Web page is hidden.")
    } else {
        document.title = '客官，你又回来了呢~'
        console.log("Web page is visible.")
    }
}

document.addEventListener(vEvent, visibilityChanged, false);
```


#### 观察长任务(performance中的Task)
```js
const observer = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
        console.log(entry)
    }
})

observer.observe({entryTypes: ['longtask']})
```


#### 监听网络变化
网络变化时给用户反馈网络问题，有时候看直播的时候自己的网络卡顿，直播平台也会提醒你或者自动给你切换清晰度
```js
var connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
var type = connection.effectiveType;

function updateConnectionStatus() {
  console.log("Connection type changed from " + type + " to " + connection.effectiveType);
  type = connection.effectiveType;
}

connection.addEventListener('change', updateConnectionStatus);
```


#### 计算DOMContentLoaded时间

```js
window.addEventListener('DOMContentLoaded', (event) => {
    let timing = performance.getEntriesByType('navigation')[0];
    console.log(timing.domInteractive);
    console.log(timing.fetchStart);
    let diff = timing.domInteractive - timing.fetchStart;
    console.log("TTI: " + diff);
})
```

#### 更多计算规则
```md
DNS 解析耗时: domainLookupEnd - domainLookupStart
TCP 连接耗时: connectEnd - connectStart
SSL 安全连接耗时: connectEnd - secureConnectionStart
网络请求耗时 (TTFB): responseStart - requestStart
数据传输耗时: responseEnd - responseStart
DOM 解析耗时: domInteractive - responseEnd
资源加载耗时: loadEventStart - domContentLoadedEventEnd
First Byte时间: responseStart - domainLookupStart
白屏时间: responseEnd - fetchStart
首次可交互时间: domInteractive - fetchStart
DOM Ready 时间: domContentLoadEventEnd - fetchStart
页面完全加载时间: loadEventStart - fetchStart
http 头部大小： transferSize - encodedBodySize
重定向次数：performance.navigation.redirectCount
重定向耗时: redirectEnd - redirectStart
```


### 雅虎军规
![](https://image-static.segmentfault.com/984/490/984490192-6265650bc7d5b)

#### cookie
* 减少cookie大小
* 静态资源不需要cookie，可以采用其他的域名，不会主动带上cookie

#### content
* 减少http请求
* 减少NDS查询
* 避免重定向
* 缓存ajax请求
* 延迟加载
* 预加载
* 减少DOM节点数量
* 尽量减少iframe使用
* 避免404
* 划分内容到不同的域名


#### images
* 优化图片
* 使用css sprite优化
* 不要在HTML中缩放图片
* 使用Favicon.icon尽可能小且可缓存

#### css
* 把样式写在`<head>`中
* 不要使用css表达式
* 使用link代替`@import`
* 避免使用Filters

#### javascript
* JS放在底部
* 把JS和css放在外部文件中
* 压缩JS和css
* 移除重复脚本
* 减少dom操作
* 使用高效的事件处理

#### mobile
* 保持单个文件小于25k
* 把打包的内容分为多段文档

#### server
* 使用cdn
* 添加Expires或cache-control缓存头
* 启用Gzip
* 配置Etags
* 尽早输出缓冲?
* ajax使用get请求
* 避免图片src为空



#### 总结

#### 避免过多的回流和重绘
连续触发页面回流操作
```js
  let cards = document.getElementsByClassName("MuiPaper-rounded");
  const update = (timestamp) => {
    for (let i = 0; i <cards.length; i++) {
      let top = cards[i].offsetTop;
      cards[i].style.width = ((Math.sin(cards[i].offsetTop + timestamp / 100 + 1) * 500) + 'px')
    }
    window.requestAnimationFrame(update)
  }
  update(1000);
```

