
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



## 优化资料

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
//这段代码的实现和示意图感觉不相符
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

<iframe src="https://codesandbox.io/embed/bom-requestanimationframe-wtc5bn?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="bom-requestAnimationFrame"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>





## 页面渲染优化

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



### 减少重流重绘

#### 1.骨架屏
用css提前占好位置，当资源加载完成即可填充，减少页面的回流与重绘，同时还能给用户最直接的反馈。 图中使用插件：[react-placeholder](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fbuildo%2Freact-placeholder "https://github.com/buildo/react-placeholder")
关于实现骨架屏还有很多种方案，用`Puppeteer`服务端渲染的挺多的

使用css伪类：[只要css就能实现的骨架屏方案](https://link.juejin.cn/?target=https%3A%2F%2Fsegmentfault.com%2Fa%2F1190000020437426 "https://segmentfault.com/a/1190000020437426")


![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3666ae07b9eb4d839f7a893b89d83f47~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)




#### 窗口化

原理：只加载当前窗口能显示的DOM元素，当视图变化时，删除隐藏的，添加要显示的DOM就可以保证页面上存在的dom元素数量永远不多，页面就不会卡顿

图中使用的插件：[react-window](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fbvaughn%2Freact-window "https://github.com/bvaughn/react-window")
![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1a459cc811844b7793aff6c9878d19ad~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

安装：`npm i react-window`

引入：`import { FixedSizeList as List } from 'react-window';`

使用：
```js
const Row = ({ index, style }) => (
  <div style={style}>Row {index}</div>
);
 
const Example = () => (
  <List
    height={150}
    itemCount={1000}
    itemSize={35}
    width={300}
  >
    {Row}
  </List>
);
```


### 缓存

#### 1.http缓存
##### keep-alive

判断是否开启：看`response headers`中有没有`Connection: keep-alive` 。开启以后，看`network`的瀑布流中就没有 `Initial connection`耗时了

nginx设置keep-alive（默认开启）

```ini
# 0 为关闭
#keepalive_timeout 0;
# 65s无连接 关闭
keepalive_timeout 65;
# 连接数，达到100断开
keepalive_requests 100;
复制代码
```

##### Cache-Control / Expires / Max-Age

设置资源是否缓存，以及缓存时间

##### Etag / If-None-Match

资源唯一标识作对比，如果有变化，从服务器拉取资源。如果没变化则取缓存资源，状态码304，也就是协商缓存

##### Last-Modified / If-Modified-Since

通过对比时间的差异来觉得要不要从服务器获取资源

更多HTTP缓存参数可参考：[使用 HTTP 缓存：Etag, Last-Modified 与 Cache-Control](https://link.juejin.cn/?target=https%3A%2F%2Fharttle.land%2F2017%2F04%2F04%2Fusing-http-cache.html "https://harttle.land/2017/04/04/using-http-cache.html")





#### 2.Service worker
借助webpack插件`WorkboxWebpackPlugin`和`ManifestPlugin`,加载serviceWorker.js,通过`serviceWorker.register()`注册

```js
new WorkboxWebpackPlugin.GenerateSW({
    clientsClaim: true,
    exclude: [/\.map$/, /asset-manifest\.json$/],
    importWorkboxFrom: 'cdn',
    navigateFallback: paths.publicUrlOrPath + 'index.html',
    navigateFallbackBlacklist: [
        new RegExp('^/_'),
        new RegExp('/[^/?]+\\.[^/]+$'),
    ],
}),

new ManifestPlugin({
    fileName: 'asset-manifest.json',
    publicPath: paths.publicUrlOrPath,
    generate: (seed, files, entrypoints) => {
        const manifestFiles = files.reduce((manifest, file) => {
            manifest[file.name] = file.path;
            return manifest;
        }, seed);
        const entrypointFiles = entrypoints.app.filter(
            fileName => !fileName.endsWith('.map')
        );

        return {
            files: manifestFiles,
            entrypoints: entrypointFiles,
        };
    },
}),
```




### 预加载&懒加载

#### preload
就拿demo中的字体举例，正常情况下的加载顺序是这样的：
![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6e3226bc21f14a41ac195618456bdde9~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

假如preload
```html
<link rel="preload" href="https://fonts.gstatic.com/s/longcang/v5/LYjAdGP8kkgoTec8zkRgqHAtXN-dRp6ohF_hzzTtOcBgYoCKmPpHHEBiM6LIGv3EnKLjtw.119.woff2" as="font" crossorigin="anonymous"/> 
<link rel="preload" href="https://fonts.gstatic.com/s/longcang/v5/LYjAdGP8kkgoTec8zkRgqHAtXN-dRp6ohF_hzzTtOcBgYoCKmPpHHEBiM6LIGv3EnKLjtw.118.woff2" as="font" crossorigin="anonymous"/> 
<link rel="preload" href="https://fonts.gstatic.com/s/longcang/v5/LYjAdGP8kkgoTec8zkRgqHAtXN-dRp6ohF_hzzTtOcBgYoCKmPpHHEBiM6LIGv3EnKLjtw.116.woff2" as="font" crossorigin="anonymous"/> 
```

![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9790c73b17ef43a9acb1701215aca9d4~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)





#### prefetch
场景：首页不需要这样的字体文件，下个页面需要：首页会以最低优先级Lowest来提前加载
```html
<link rel="prefetch" href="https://fonts.gstatic.com/s/longcang/v5/LYjAdGP8kkgoTec8zkRgqHAtXN-dRp6ohF_hzzTtOcBgYoCKmPpHHEBiM6LIGv3EnKLjtw.113.woff2" as="font"/> 
<link rel="prefetch" href="https://fonts.gstatic.com/s/longcang/v5/LYjAdGP8kkgoTec8zkRgqHAtXN-dRp6ohF_hzzTtOcBgYoCKmPpHHEBiM6LIGv3EnKLjtw.118.woff2" as="font"/> 
<link rel="prefetch" href="https://fonts.gstatic.com/s/longcang/v5/LYjAdGP8kkgoTec8zkRgqHAtXN-dRp6ohF_hzzTtOcBgYoCKmPpHHEBiM6LIGv3EnKLjtw.117.woff2" as="font"/> 
```

需要的页面，从`prefetch cache`中取
![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/04a0fe68e9634c20b963d1d2817126ad~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

webpack也是支持这两个属性的:[webpackPrefetch 和 webpackPreload](https://link.juejin.cn/?target=https%3A%2F%2Fwww.cnblogs.com%2Fskychx%2Fp%2Fwebpack-webpackChunkName-webpackPreload-webpackPreload.html "https://www.cnblogs.com/skychx/p/webpack-webpackChunkName-webpackPreload-webpackPreload.html")


### 懒加载
#### 图片
* 普通图片
* 渐进式图片(类似高斯模糊),需要出稿时指定这种格式
* `响应式图片`
原生模式：`<img src="./img/index.jpg" sizes="100vw" srcset="./img/dog.jpg 800w, ./img/index.jpg 1200w"/>`




#### 路由
通过函数 + import实现

`const Page404 = () => import(/* webpackChunkName: "error" */'@views/errorPage/404');`


### 白屏loading

* 使用`webpack`插件`HtmlWebpackPlugin`将loading资源插入到页面中
* 

### 图片资源的优化
>[🔥 2022 前端性能优化最佳实践 - JavaScript进阶之路 - SegmentFault 思否](https://segmentfault.com/a/1190000041753539)

#### 1.使用雪碧图
雪碧图的作用就是减少请求数，而且多张图片合在一起后的体积会少于多张图片的体积总和，这也是比较通用的图片压缩方案
现在很少用了


#### 2.降低图片质量
压缩方法有两种，一是通过在线网站进行压缩，二是通过 webpack 插件 image-webpack-loader。它是基于 [imagemin](https://link.segmentfault.com/?enc=PAoQ%2BkIno1eABSR%2Bi3eflA%3D%3D.7PB%2BfABhYfIPZz805iNFLC73YrooJkNp9aa2idh1joQGH5yBIHzfJcMbYnfpBTfjjxTkQZMeKgY2vrQyQg9W1fLjUTq3CV9K0Xb4jeD%2B9UQ%3D) 这个 Node 库来实现图片压缩的。

使用很简单，我们只要在`file-loader`之后加入 `image-webpack-loader` 即可：
```js
npm i -D image-webpack-loader
```

webpack配置如下:
```bash
// config/webpack.base.js
// ...
module: {
    rules: [
        {
            test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
            use: [
                {
                    loader: 'file-loader',
                    options: {
                        name: '[name]_[hash].[ext]',
                        outputPath: 'images/'
                    }
                },
                {
                    loader: 'image-webpack-loader',
                    options: {
                        // 压缩 jpeg 的配置
                        mozjpeg: {
                            progressive: true,
                            quality: 65
                        },
                        // 使用 imagemin**-optipng 压缩 png，enable: false 为关闭
                        optipng: {
                            enabled: false
                        },
                        // 使用 imagemin-pngquant 压缩 png
                        pngquant: {
                            quality: '65-90',
                            speed: 4
                        },
                        // 压缩 gif 的配置
                        gifsicle: {
                            interlaced: false
                        },
                        // 开启 webp，会把 jpg 和 png 图片压缩为 webp 格式
                        webp: {
                            quality: 75
                        }
                    }
                }
            ]
        }
    ];
}
```


#### 3.图片懒加载
在页面中，先不给图片设置路径，只有当图片出现在浏览器的可视区域时，才去加载真正的图片，这就是延迟加载。对于图片很多的网站来说，一次性加载全部图片，会对用户体验造成很大的影响，所以需要使用图片延迟加载。


#### 4.使用CSS3代替图片
有很多图片使用 CSS 效果（渐变、阴影等）就能画出来，这种情况选择 CSS3 效果更好。因为代码大小通常是图片大小的几分之一甚至几十分之一。

#### 5.使用webpack格式图片
`WebP` 是 Google 团队开发的加快图片加载速度的图片格式，其优势体现在它具有更优的图像数据压缩算法，能带来更小的图片体积，而且拥有肉眼识别无差异的图像质量；同时具备了无损和有损的压缩模式、Alpha 透明以及动画的特性，在 JPEG 和 PNG 上的转化效果都相当优秀、稳定和统一。



## 压缩

### Gzip
开启方式可参考：[nginx开启gzip](https://juejin.cn/post/6844903605187641357 "https://juejin.cn/post/6844903605187641357")

还有一种方式：打包的时候生成gz文件，上传到服务器端，这样就不需要nginx来压缩了，可以降低服务器压力。 可参考：[gzip压缩文件&webPack配置Compression-webpack-plugin](https://link.juejin.cn/?target=https%3A%2F%2Fsegmentfault.com%2Fa%2F1190000020976930 "https://segmentfault.com/a/1190000020976930")

### 服务端压缩




### JS/CSS/HTML压缩
工程化项目中直接使用对应的插件即可，webpack的主要有下面三个：

-   UglifyJS
-   webpack-parallel-uglify-plugin
-   terser-webpack-plugin 具体优缺点可参考：[webpack常用的三种JS压缩插件](https://link.juejin.cn/?target=https%3A%2F%2Fblog.csdn.net%2Fqq_24147051%2Farticle%2Fdetails%2F103557728 "https://blog.csdn.net/qq_24147051/article/details/103557728")。`压缩原理`简单的讲就是去除一些空格、换行、注释，借助es6模块化的功能，做了一些`tree-shaking`的优化。同时做了一些代码混淆，一方面是为了更小的体积，另一方面也是为了源码的安全性。

css压缩主要是mini-css-extract-plugin，当然前面的js压缩插件也会给你做好css压缩。使用姿势：
```js
npm install --save-dev mini-css-extract-plugin
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
plugins:[
 new MiniCssExtractPlugin({
       filename: "[name].css",
       chunkFilename: "[id].css"
   })
]
```

html压缩可以用`HtmlWebpackPlugin`，单页项目就一个index.html,性能提升微乎其微~


### HTTP2首部压缩
**http2的特点**
-   二进制分帧
-   首部压缩
-   流量控制
-   多路复用
-   请求优先级
-   服务器推送`http2_push: 'xxx.jpg'` 具体升级方式也很简单，修改一下nginx配置，方法请自行`Google`


## webpack优化

除了上面提到的几个插件之外,还有以下几种:
### 1.DllPlugin提升构建速度

通过`DllPlugin`插件，将一些比较大的，基本很少升级的包拆分出来，生成`xx.dll.js`文件,通过`manifest.json`引用

`webpack.dll.config.js`
```js
const path = require("path");
const webpack = require("webpack");
module.exports = {
    mode: "production",
    entry: {
        react: ["react", "react-dom"],
    },
    output: {
        filename: "[name].dll.js",
        path: path.resolve(__dirname, "dll"),
        library: "[name]"
    },
    plugins: [
        new webpack.DllPlugin({
            name: "[name]",
            path: path.resolve(__dirname, "dll/[name].manifest.json")
        })
    ]
};
```

`package.json`
```js
"scripts": {
    "dll-build": "NODE_ENV=production webpack --config webpack.dll.config.js",
  },
```

### 2.splitChunks拆包

```js
optimization: {
	splitChunks: {
			cacheGroups: {
					vendor: {
							name: 'vendor',
							test: /[\\/]node_modules[\\/]/,
							minSize: 0,
							minChunks: 1,
							priority: 10,
							chunks: 'initial'
					},
					common: {
							name: 'common',
							test: /[\\/]src[\\/]/,
							chunks: 'all',
							minSize: 0,
							minChunks: 2
					}
			}
	}
},
```

