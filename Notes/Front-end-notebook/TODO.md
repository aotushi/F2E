### TODO

- [ ]  vue.config.js文件配置   
- [ ] 百度前端学院
- [ ] 项目重写  vue3 react
- [ ]  书籍
  - [ ] JS权威指南
  - [ ] 你不知道的JS
  - [ ] JS高级程序设计
  - [ ] HTML和dom书籍(readme中的书籍)









### 掘金文章整理待办

```javascript
//获取文章列表
let arr = document.getElementsByClassName('title-row');
let res = [];

for (let i=0,len=arr.length; i<len; i++) {
  res[i] = {
    href: arr[i].childNodes[7].href,
    text: arr[i].childNodes[7].innerText
  }
}

let result = res.map(item => `- [ ] [${item.text}](${item.href})`)

//以JSON形式保存到本地
(function(console){

    console.save = function(data, filename){

        if(!data) {
            console.error('Console.save: No data')
            return;
        }

        if(!filename) filename = 'console.json'

        if(typeof data === "object"){
            data = JSON.stringify(data, undefined, 4)
        }

        var blob = new Blob([data], {type: 'text/json'}),
            e    = document.createEvent('MouseEvents'),
            a    = document.createElement('a')

        a.download = filename
        a.href = window.URL.createObjectURL(blob)
        a.dataset.downloadurl =  ['text/json', a.download, a.href].join(':')
        e.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
        a.dispatchEvent(e)
    }
})(console)

console.save(result, 'a.json')
```



### Sunshine_Lin

> https://juejin.cn/user/1292681407377624/posts?sort=newest



 - [ ] [每个前端都必须要学会的Webpack优化手段](https://juejin.cn/post/7083519723484708878)
 - [ ] [「基础搭建」从零开始，基于 Webpack5 搭建一个 Vue-Cli](https://juejin.cn/post/7075136766428217358)
 - [ ] [如何使用JS代码计算LocalStorage容量！](https://juejin.cn/post/7072166349329399838)
 - [ ] [如何在Webpack项目中实现代码的规范？](https://juejin.cn/post/7084564788365721613)
 - [ ] [所以，e.target 和 e.currentTarget 到底有啥区别呢？](https://juejin.cn/post/7069569810220187678)
 - [ ] [不废话，代码实践带你掌握 强缓存、协商缓存！](https://juejin.cn/post/7065895592613904392)
 - [ ] [MutationObserver 在实现页面水印中所扮演的角色](https://juejin.cn/post/7065124657413750821)
 - [ ] [async/await 你是会用，但是你知道怎么处理错误吗？](https://juejin.cn/post/7064389512729722910)
 - [ ] [简单说说 tree-shaking 有啥鸟用吧！](https://juejin.cn/post/7062180864968359943)
 - [ ] [打包的3种hash值你知道吗？当年我校招时被这题难倒了！](https://juejin.cn/post/7060688758370205733)
 - [ ] [栈内存只有984KiB，如果一个字符串超级长，能存的下吗？](https://juejin.cn/post/7054195221239693342)
 - [ ] [春节走亲戚不知道该怎么称呼？”亲戚关系计算器“你值得拥有！](https://juejin.cn/post/7051347332813553700)
 - [ ] [Web Worker：靓仔，要不要试试开个「子线程」耍耍？很快的哦！](https://juejin.cn/post/7051110516906786830)
 - [ ] [「一周一个大厂」复盘一下 拼多多 的面经，发现不足，逐一击破！](https://juejin.cn/post/7045946373123883039)
 - [ ] [「保姆式教学」如何搭建一个符合标准的Vue3 + Ts + Vite脚手架？](https://juejin.cn/post/7044539879640236045)
 - [ ] [「Vue源码学习」简单讲一讲keep-alive的原理吧](https://juejin.cn/post/7043401297302650917)
 - [ ] [「一周一个大厂」复盘一下Taptap的面经，发现不足，逐一击破！](https://juejin.cn/post/7042514828912492581)
 - [ ] [我画了13张图，用最通俗易懂的话讲HTTPS，拿下！](https://juejin.cn/post/7042158171778973732)
 - [ ] [你知道 0.1+0.2 ==0.3是进制问题，但你讲不出个所以然，是吧？🐶](https://juejin.cn/post/7041546152994406430)
 - [ ] [Vite为什么快呢？快在哪？说一下我自己的理解吧](https://juejin.cn/post/7040750959764439048)
 - [ ] [React、Vue我全都要！React Hook 实现 Vue 的11个基本功能](https://juejin.cn/post/7037130413155811341)
 - [ ] [「干货」今年我写了55篇文章，面试了30个人，学习了385个知识点！](https://juejin.cn/post/7035905352746926116)
 - [ ] [想知道一个20k级别前端在项目中是怎么使用LocalStorage的吗？](https://juejin.cn/post/7033749571939336228)
 - [ ] [你说你会Promise？那你解决一下项目中的这五个难题？](https://juejin.cn/post/7033395086696136711)
 - [ ] [后端一次给你10万条数据，如何优雅展示，到底考察我什么?](https://juejin.cn/post/7031923575044964389)
 - [ ] [网易面试官：请你实现一下JS重载？可不是TS重载哦！](https://juejin.cn/post/7031525301414805518)
 - [ ] [看似简单的题，席卷几十个前端群，王红元老师都亲自出面解答](https://juejin.cn/post/7030425359392882695)
 - [ ] [史上最全！熬夜整理56个JavaScript高级的手写知识点！！专业扫盲！](https://juejin.cn/post/7023906112843808804)
 - [ ] [「万字总结」熬夜总结50个JS的高级知识点，全都会你就是神！！！](https://juejin.cn/post/7022795467821940773)
 - [ ] [工作中遇到的50个JavaScript的基础知识点](https://juejin.cn/post/7020940475133591566)
 - [ ] [leader：深拷贝有这5个段位，你只是青铜段位？还想涨薪？](https://juejin.cn/post/7017991655009566728)
 - [ ] [良苦用心啊！我把7大跨域解决方法原理画成10张图，做成图解！](https://juejin.cn/post/7017614708832206878)
 - [ ] [有了这25个正则表达式，代码效率提高80%](https://juejin.cn/post/7016871226899431431)
 - [ ] [setTimeout+Promise+Async输出顺序？很简单呀！](https://juejin.cn/post/7016298598883131423)
 - [ ] [7张图，从零实现一个简易版Vue-Router，太通俗易懂了！](https://juejin.cn/post/7012272146907037732)
 - [ ] [这可能是掘金讲「原型链」，讲的最好最通俗易懂的了，附练习题！](https://juejin.cn/post/7007416743215759373)
 - [ ] [7张图，20分钟就能搞定的async/await原理！为什么要拖那么久？](https://juejin.cn/post/7007031572238958629)
 - [ ] [中秋！还记得西游记里的嫦娥吗？我用10000张图片拼成了儿时女神！](https://juejin.cn/post/7005221466014744612)
 - [ ] [太震撼了！我把七大JS排序算法做成了可视化！！！太好玩了！](https://juejin.cn/post/7004454008634998821)
 - [ ] [95%的人都回答不上来的问题：函数的length是多少？](https://juejin.cn/post/7003369591967596552)
 - [ ] [林三心花了3小时实现了这30个JS原生方法，我看看谁比我短！！！](https://juejin.cn/post/7002248038529892383)
 - [ ] [林三心画了8张图，最通俗易懂的Vue3响应式核心原理解析](https://juejin.cn/post/7001999813344493581)
 - [ ] [哪是大神？只是用他人七夕约会时间，整理「JS避免内存泄漏」罢了](https://juejin.cn/post/6996828267068014600)
 - [ ] [赠你13张图，助你20分钟打败了「V8垃圾回收机制」！！！](https://juejin.cn/post/6995706341041897486)
 - [ ] [基础很好？总结了38个ES6-ES12的开发技巧，倒要看看你能拿几分？🐶](https://juejin.cn/post/6995334897065787422)
 - [ ] [15张图，20分钟吃透Diff算法核心原理，我说的！！！](https://juejin.cn/post/6994959998283907102)
 - [ ] [看了就会，手写Promise原理，最通俗易懂的版本！！！](https://juejin.cn/post/6994594642280857630)
 - [ ] [一个月，从LV2到LV4，这个毕业刚一年的菜鸟经历了啥？](https://juejin.cn/post/6990146025100935205)
 - [ ] [为了让你们进阶Canvas，我花7小时写了3个有趣的小游戏！！！](https://juejin.cn/post/6989003710030413838)
 - [ ] [腾讯面试官：兄弟，你说你会Webpack，那说说他的原理？](https://juejin.cn/post/6987180860852142093)
 - [ ] [为了让她10分钟入门canvas，我熬夜写了3个小项目和这篇文章](https://juejin.cn/post/6986785259966857247)
 - [ ] [「自我检验」输入URL发生了啥？希望你顺便懂这15个知识点](https://juejin.cn/post/6986416221323264030)
 - [ ] [「自我检验」熬夜总结50个Vue知识点，全都会你就是神！！！](https://juejin.cn/post/6984210440276410399)
 - [ ] [「记录优化」我是如何在项目中实现大文件分片上传，暂停续传的](https://juejin.cn/post/6982877680068739085)
 - [ ] [「百毒不侵(七)」面试官最喜欢问的6种清除浮动和BFC](https://juejin.cn/post/6982179919597928485)
 - [ ] [「百毒不侵」面试官最喜欢问的14种Vue修饰符](https://juejin.cn/post/6981628129089421326)
 - [ ] [「百毒不侵(六)」月薪从3k到15k，一个普通人的学习路线](https://juejin.cn/post/6979778540044550152)
 - [ ] [从3000人大公司跳到30人小公司的转变｜2021 年中总结](https://juejin.cn/post/6977702818614345736)
 - [ ] [「Vue源码学习(五)」面试官喜欢问的——Vue常用方法源码解析](https://juejin.cn/post/6974293864345518087)
 - [ ] [「Vue源码学习(四)」立志写一篇人人都看的懂的computed，watch原理](https://juejin.cn/post/6974293549135167495)
 - [ ] [「Vue源码学习(三)」你不知道的-初次渲染原理](https://juejin.cn/post/6970209585671979044)
 - [ ] [「百毒不侵(四)」懂了这十五个Vue冷门知识，再也不怕面试官刁难了](https://juejin.cn/post/6969862183387660324)
 - [ ] [「Vue源码学习(二)」你不知道的-模板编译原理](https://juejin.cn/post/6969563640416436232)
 - [ ] [「Vue源码学习(一)」你不知道的-数据响应式原理](https://juejin.cn/post/6968732684247892005)
 - [ ] [「百毒不侵(三)」结合“康熙选秀”，给大家讲讲“虚拟列表”](https://juejin.cn/post/6966179727329460232)
 - [ ] [「百毒不侵(二)」戏说 “浏览器渲染”](https://juejin.cn/post/6955321016121819167)
 - [ ] [「Vue源码学习」你想知道Vuex的实现原理吗？](https://juejin.cn/post/6952473110377414686)
 - [ ] [「百毒不侵(一)」(a == 1 && a == 2 && a == 3) 有可能是 true 吗？](https://juejin.cn/post/6950664413317693470)
 - [ ] [「Leetcode系列」Leetcode——027，028](https://juejin.cn/post/6950565228350275597)
 - [ ] [「Vue源码学习」你真的知道插槽Slot是怎么“插”的吗](https://juejin.cn/post/6949848530781470733)
 - [ ] [「Leetcode系列」021,026](https://juejin.cn/post/6949770498746089509)
 - [ ] [「ElementUI源码学习(一)」ElementUI组件源码之——Layout](https://juejin.cn/post/6949113659637366814)
 - [ ] [「Leetcode系列」经典题目——盛最多水的容器](https://juejin.cn/post/6941009346352381989)
 - [ ] [ES6：连女朋友看了都喜欢的小知识-解构默认赋值，剩余参数](https://juejin.cn/post/6940994836887502856)
 - [x] [ES6：连女朋友看了都喜欢的小知识-如何排序一个Map对象](https://juejin.cn/post/6940644097652703246)
 - [ ] [「Leetcode系列」连女朋友看了都喜欢的五道题之：001, 007，009, 014, 020](https://juejin.cn/post/6938988563031654413)
 - [ ] [简易实现express中间件](https://juejin.cn/post/6920129718163341320)
 - [ ] [webpack系列之：babel的原理](https://juejin.cn/post/6844904190343381005)
 - [ ] [按着这些视频路线走，你绝对能成为前端大神（干货满满）](https://juejin.cn/post/6844904185163415560)
 - [ ] [Vue系列之：eventBus的的使用](https://juejin.cn/post/6844904176686727176)
 - [ ] [Vue源码系列之：Vuex源码简单实现](https://juejin.cn/post/6844904183448109063)
 - [x] [JS初级基础之：手写一些常用的方法(一)](https://juejin.cn/post/6844904179815858190)





### 程序员依扬

> https://juejin.cn/user/3720403075993373/posts



- [ ] [聊聊程序员面试时，那些必须注意的事情](https://juejin.cn/post/7064378348343918629)
- [ ] [切勿习惯性加班](https://juejin.cn/post/6973828161662353439)
- [ ] [我的 2020 总结，我在蚂蚁成长的这一年](https://juejin.cn/post/6919273190804062216)
- [ ] [多年经验总结，写出最惊艳的 Markdown 高级用法](https://juejin.cn/post/6916304556733399054)
- [x] [【进阶 6-3 期】Array 原型方法源码实现大揭秘](https://juejin.cn/post/6844903938890661896)
- [ ] [【进阶 7-5 期】浅出篇 | 7 个角度吃透 Lodash 防抖节流原理](https://juejin.cn/post/6844903886281506829)
- [ ] [【1 月最新】前端 100 问：能搞懂 80% 的请把简历给我](https://juejin.cn/post/6844903885488783374)
- [ ] [【进阶 7-4 期】深入篇 | 阿里 P6 必会 Lodash 防抖节流函数实现原理](https://juejin.cn/post/6844903879017021454)
- [ ] [【进阶 7-3 期】[译] Throttle 和 Debounce 在 React 中的应用](https://juejin.cn/post/6844903871504973837)
- [ ] [【进阶 7-2 期】深入浅出防抖函数 debounce](https://juejin.cn/post/6844903863061839885)
- [ ] [【进阶 7-1 期】深入浅出面试必考题 - 节流函数 throttle](https://juejin.cn/post/6844903855667281928)
- [ ] [【进阶 6-2 期】深入高阶函数应用之柯里化](https://juejin.cn/post/6844903847677132807)
- [ ] [【进阶 6-1 期】JavaScript 高阶函数浅析](https://juejin.cn/post/6844903839032672263)
- [ ] [【半月刊 4】前端高频面试题及答案汇总](https://juejin.cn/post/6844903821420789767)
- [ ] [【进阶5-2期】图解原型链及其继承优缺点](https://juejin.cn/post/6844903814324027399)
- [ ] [【半月刊 3】前端高频面试题及答案汇总](https://juejin.cn/post/6844903807789318152)
- [ ] [【半月刊 2】前端高频面试题及答案汇总](https://juejin.cn/post/6844903789049167885)
- [ ] [【进阶5-1期】重新认识构造函数、原型和原型链](https://juejin.cn/post/6844903779079290887)
- [ ] [【半月刊】前端高频面试题及答案汇总](https://juejin.cn/post/6844903778387247117)
- [ ] [【进阶4-4期】Lodash是如何实现深拷贝的](https://juejin.cn/post/6844903775283445767)
- [ ] [精华提炼「你不知道的 JavaScript」之作用域和闭包](https://juejin.cn/post/6844903766542516231)
- [ ] [【进阶4-3期】面试题之如何实现一个深拷贝](https://juejin.cn/post/6844903764499906568)
- [ ] [前端大神 Winter 直播笔记及我的学习方法论](https://juejin.cn/post/6844903763161907207)
- [ ] [【进阶4-2期】Object.assign 原理及其实现](https://juejin.cn/post/6844903753490006029)
- [ ] [【进阶4-1期】详细解析赋值、浅拷贝和深拷贝的区别](https://juejin.cn/post/6844903745961066503)
- [ ] [【进阶3-5期】深度解析 new 原理及模拟实现](https://juejin.cn/post/6844903736666488846)
- [ ] [【进阶3-4期】深度解析bind原理、使用场景及模拟实现](https://juejin.cn/post/6844903733013250056)
- [ ] [【进阶1-3期】JavaScript深入之内存空间详细图解](https://juejin.cn/post/6844903717716623374)
- [ ] [【进阶1-2期】JavaScript深入之执行上下文栈和变量对象](https://juejin.cn/post/6844903717381079047)
- [ ] [【进阶3-3期】深度解析 call 和 apply 原理、使用场景及实现](https://juejin.cn/post/6844903730580553736)
- [ ] [【进阶3-2期】JavaScript深入之重新认识箭头函数的this](https://juejin.cn/post/6844903728198205453)
- [ ] [【进阶3-1期】JavaScript深入之史上最全--5种this绑定全面解析](https://juejin.cn/post/6844903726625325063)
- [ ] [【进阶2-3期】JavaScript深入之闭包面试题解](https://juejin.cn/post/6844903725903904775)
- [ ] [【进阶2-2期】JavaScript深入之从作用域链理解闭包](https://juejin.cn/post/6844903725404782599)
- [ ] [【进阶2-1期】深入浅出图解作用域链和闭包](https://juejin.cn/post/6844903724901466120)
- [ ] [【进阶1-5期】JavaScript深入之4类常见内存泄漏及如何避免](https://juejin.cn/post/6844903724893077512)
- [ ] [【进阶1-4期】JavaScript深入之带你走进内存机制](https://juejin.cn/post/6844903718354157575)
- [ ] [【进阶1-1期】理解JavaScript 中的执行上下文和执行栈](https://juejin.cn/post/6844903717372723208)
- [ ] [Vue 进阶系列（三）之Render函数原理及实现](https://juejin.cn/post/6844903709441261581)
- [ ] [Vue 进阶系列（二）之插件原理及实现](https://juejin.cn/post/6844903701979627528)
- [ ] [Vue 进阶系列（一）之响应式原理及实现](https://juejin.cn/post/6844903697005150222)
- [ ] [JavaScript常用八种继承方案](https://juejin.cn/post/6844903696111763470)
- [ ] [2018大厂高级前端面试题汇总](https://juejin.cn/post/6844903695411314696)



### lzg9527

> [lzg9527 的个人主页 - 文章 - 掘金 (juejin.cn)](https://juejin.cn/user/2330620381629070/posts)



- [ ] [这几个高级前端常用的API，你用到了吗？](https://juejin.cn/post/7028744289890861063),
- [ ] [从零搭建一个前端cli脚手架并发布到npm](https://juejin.cn/post/7010673349571379231),
- [ ] [前端性能优化——图片篇](https://juejin.cn/post/6965761736083243044),
- [ ] [万恶的前端内存泄漏及万善的解决方案](https://juejin.cn/post/6914092198170460168),
- [ ] [分享8个非常实用的Vue自定义指令](https://juejin.cn/post/6906028995133833230),
- [ ] [前端性能优化之图片懒加载](https://juejin.cn/post/6903774214780616718),
- [ ] [你必须知道的webpack插件原理分析](https://juejin.cn/post/6901210575162834958),
- [ ] [webpack的异步加载原理及分包策略](https://juejin.cn/post/6895546761255845901),
- [ ] [react基础知识总结（持续更新ing...）](https://juejin.cn/post/6872905077493858312),
- [ ] [谈谈数据状态管理和实现一个简易版vuex](https://juejin.cn/post/6866964944634511368),
- [ ] [解锁各种js数组骚操作，总有你想要的！](https://juejin.cn/post/6854818587820736526),
- [ ] [code-review之前端代码优化](https://juejin.cn/post/6850037282419392526),
- [ ] [code-review之前端代码规范](https://juejin.cn/post/6846687599281569800),
- [ ] [总结18个webpack插件，总会有你想要的！](https://juejin.cn/post/6844904193589772301),
- [ ] [你真的了解ES6的Set，WeakSet，Map和WeakMap吗？](https://juejin.cn/post/6844904191610060814),
- [ ] [谈谈图片上传及canvas压缩的流程](https://juejin.cn/post/6844904185259884558),
- [ ] [有趣的Canvas，你值得拥有！](https://juejin.cn/post/6844904196689362958),
- [ ] [从零构建到优化一个类似vue-cli的脚手架](https://juejin.cn/post/6844904168868544525),
- [ ] [搭建一个vue-cli4+webpack移动端框架（开箱即用）](https://juejin.cn/post/6844904152389124103),
- [ ] [谈谈关于文件上传下载那些事](https://juejin.cn/post/6844904142251507720),
- [ ] [你也许不知道的javascript高级函数](https://juejin.cn/post/6844904127948914701),
- [ ] [从 javascript 事件循环看 Vue.nextTick 的原理和执行机制](https://juejin.cn/post/6844904117895168008),
- [ ] [总结javascript处理异步的方法](https://juejin.cn/post/6844904101994561549),
- [ ] [总结vue知识体系之高级应用篇](https://juejin.cn/post/6844904094692278286),
- [ ] [总结vue知识体系之实用技巧](https://juejin.cn/post/6844904080960126989),
- [ ] [总结vue知识体系之基础入门篇](https://juejin.cn/post/6844904079164964871),
- [ ] [2020年你不能不知道的webpack基本配置](https://juejin.cn/post/6844904070956711943),
- [ ] [总结移动端H5开发常用技巧（干货满满哦！）](https://juejin.cn/post/6844904066301050893),
- [ ] [JS基础总结（5）—— JS执行机制与EventLoop](https://juejin.cn/post/6844904056159223816),
- [ ] [JS基础总结（4）——this指向及call/apply/bind](https://juejin.cn/post/6844904054481485832),
- [ ] [JS基础总结（3）——作用域和闭包](https://juejin.cn/post/6844904051998457869),
- [ ] [JS基础总结（2）——原型与原型链](https://juejin.cn/post/6844904051390283783),
- [ ] [JS基础总结（1）——数据类型](https://juejin.cn/post/6844904050903744519),
- [ ] [总结几个vue-router的使用技巧](https://juejin.cn/post/6844904022281814023),
- [ ] [几种常见的JS递归算法](https://juejin.cn/post/6844904014207795214),
- [ ] [浅谈webscoket原理及其应用](https://juejin.cn/post/6844904009728262152),
- [ ] [总结前端性能优化的方法](https://juejin.cn/post/6844904006297321480),
- [ ] [总结几个webpack打包优化的方法](https://juejin.cn/post/6844904004825120782),
- [ ] [教你一步步封装vue组件并发布到npm](https://juejin.cn/post/6844903991655022600),
- [ ] [从一道面试题中总结JS作用域，this 指向和箭头函数](https://juejin.cn/post/6844903990291873806),
- [ ] [浅谈JavaScript的防抖与节流](https://juejin.cn/post/6844904004850286605),
- [ ] [搭建一个vue-cli的移动端H5开发模板](https://juejin.cn/post/6844904005265522696),
- [ ] [从零开始构建一个webpack项目](https://juejin.cn/post/6844904005286494215),
- [ ] [总结几个移动端H5软键盘的大坑及其解决方案](https://juejin.cn/post/6844904005286510599),
- [ ] [一文读尽前端路由、后端路由、单页面应用、多页面应用](https://juejin.cn/post/6844903975309819911)





### 知乎文章

[(26 封私信 / 11 条消息) 紫云飞 - 知乎 (zhihu.com)](https://www.zhihu.com/people/zi-yun-fei/answers/by_votes)





## 个人博客

### 李靖

> [Category: 前端杂烩 | 小胡子哥的个人网站 (barretlee.com)](https://www.barretlee.com/blog/categories/前端杂烩/)

```js
let res = document.documentElement.byClassName('cate-detail')[0].children

let res2 = [].filter.call(res, (v,i) => i%2 !== 0).map(v => [].map.call(v.childNodes, v1=>v1.innerText))

let res3 = res2.flat()
```





### 宝玉

> [宝玉 - 博客园 (cnblogs.com)](https://www.cnblogs.com/dotey/)
>
> [最近一个其他团队的同... - @宝玉xp的微博 - 微博 (weibo.com)](https://weibo.com/1727858283/LhY43ddp6)
>
> [微博搜索 (weibo.com)](https://s.weibo.com/weibo?q=%23软工好问题%23)
>
> 
