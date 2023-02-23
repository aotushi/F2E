vue3 的写法变更

> [Vue 3 的基本使用 - 掘金 (juejin.cn)](https://juejin.cn/post/7050733512185348133)



### 0.创建项目

使用脚手架vite来创建项目, 参照vite官网

```js
pnpm create vite
```

其他资源

> [2. 创建vue3项目 | Vue3+TS 快速上手 (24kcs.github.io)](https://24kcs.github.io/vue3_study/chapter3/02_创建vue3项目.html#_1-使用-vue-cli-创建)



### 1.初始化

初始化项目并安装需要的插件

```js
pnpm i //初始化
pnpm add vuex vue-router //安装vuex 路由
pnpm add less less-loader -D //安装css解释器
```



启动项目

主要是pnpm的用法

```js
pnpm run dev
```





### 1 配置

#### 路径别名

> [Vite 配置路径别名 - 掘金 (juejin.cn)](https://juejin.cn/post/7039149085479141389)
>
> [vue.js - vite配置项目路径别名 - 个人文章 - SegmentFault 思否](https://segmentfault.com/a/1190000041417219)
>
> [vite中alias别名配置 - 掘金 (juejin.cn)](https://juejin.cn/post/7017701897662365709)

```js
// vite.config.js

import path from 'path'

export default defineConfig({
  //...
  alias: {
    '@': path.resolve(__dirname, 'src')
  }
})
```









