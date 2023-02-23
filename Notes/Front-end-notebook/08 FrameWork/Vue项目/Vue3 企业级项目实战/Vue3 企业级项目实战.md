

### Vue3简介及开发环境搭建

#### CDN模式

[unpkg.com/vue@next](https://link.juejin.cn/?target=https%3A%2F%2Funpkg.com%2Fvue@next) 可以拿到最新的 Vue 版本。

```js
<script src="https://unpkg.com/vue@next"></script>
```

静态资源 `CDN` 引入的开发形式，适用于一些简单的活动页、宣传页、官网等小项目，易于灵活的添加修改页面。但不利于项目的模块化开发，所以不适用一些中大型综合项目的开发。



实现简单的网页效果



#### vite模式

如何使用vite启动一个项目

**打开命令行输入**

> 兼容性注意，Vite 需要 [Node.js](https://nodejs.org/en/) 版本 14.18+，16+

```js
npm init @vitejs/app
```

根据提示输入项目名称和需要选择的模板（这里我们选择 vue 模板），并通过下列指令启动项目：

```js
cd vue3-vite
npm install (or 'yarn')
npm run dev (or 'yarn')
```

配置文件变成了 `vite.config.js`，可以通过[官方文档](https://link.juejin.cn/?target=https%3A%2F%2Fcn.vitejs.dev%2F)查看相应的属性，如 port、base、plugins 等等。

以上是掘金教程, 如果你在cmd环境中输入`npm init @vitejs/app`的话会提示:

> @vitejs/create-app is deprecated, use 'npm init vite' instead
>
> ....

运行推荐的命令`npm init vite`后, 会进入安装步骤.最后,是启动项目指令,与上面的相同.



vite官网教程:

使用npm

```js
npm create vite@latest
```

带有附加命令行:

```sh
# npm 6.x
npm create vite@latest my-vue-app --template vue

# npm 7+, extra double-dash is needed:
npm create vite@latest my-vue-app -- --template vue

# yarn
yarn create vite my-vue-app --template vue

# pnpm
pnpm create vite my-vue-app --template vue
```



#### Vue CLI模式

**全局安装**

对于 `Vue 3`，`Vue CLI` 版本也有所升级，目前想要生成 `Vue 3` 项目，需要将其升级到 `4.5.x` 版本，具体操作如下：

```js
yarn global add @vue/cli // 目前最高的版本为 5.0.8
# OR
npm install -g @vue/cli
```

> 在此之前，你需要先将本地的 @vue/cli 卸载，通过命令行 yarn remove global @vue/cli 或者 npm uninstall -g @vue/cli。

安装成功之后查看版本号，如下所示表示成功。

```js
vue3-demo vue --version
@vue/cli 5.0.8
vue3-demo
```

**布局安装**

以上是全局安装,如果我们需要局部安装的话,该怎么做?

只需将安装命令中的`-g`去掉即可,实现局部安装

```js
//局部安装

npm i @vue/cli
# or
yarn add @vue/cli
```

如果查看版本,提示命令不能被识别.需要将`vue.cmd`添加到环境变量中. 

> [局部使用vue和vue-cli构建自己的项目 - 掘金 (juejin.cn)](https://juejin.cn/post/6844903715015491597)

然后,再运行`vue --version`命令即可.



**初始化项目**

初始化项目，输入如下指令：

```js
vue create vue3-cli
```



![img](https://s.yezgea02.com/1661410238477/WeChat7353b87f89b12d39f2884e74f7de2379.png)

第一个选项为创建 `Vue 3` 纯净版（不带路由、状态管理、样式预处理等）。 同理第二个选项为创建 `Vue 2.0` 纯净版。 第三个选项为组合搭配，可供选择的插件如下图所示：

![img](https://s.yezgea02.com/1661410365497/WeChat31012605c450db0f0bf7ed92bb2a3a48.png)

上述默认回车后，会出现下图情况，系统会让你选择一个 `Vue` 的版本。

![img](https://s.yezgea02.com/1661410475510/WeChat489d68b93bfc3b2bf03f451052792020.png)

之后的选择基本上和 Vue CLI 旧版本大同小异。

创建完成之后，目录结构如下所示：

![img](https://s.yezgea02.com/1661411045795/WeChataa99051a7e028c59ae3a6b845c8e1501.png)

这里值得注意的是，早些时候`@vue/cli 4.5.x`版本，创建的下面中 `Vue` 的版本为 `3.x`，到了`@vue/cli 5.x`之后，创建的项目中 `Vue` 版本为 `3.2.x`，如下图所示。

![img](https://s.yezgea02.com/1661412166778/WeChat138f03f5d494ff19b33ebdd491741e42.png)

这就意味着，我们可以在项目中使用最新的 `<script setup>` 语法，这将让代码显得更加简洁。

上述创建的项目启动之后，默认开启 8080 端口，可以自行通过 `vue.config.js` 配置项更改项目配置。



#### Vue3 周边相关插件文档

| 相关库名称              | 在线地址 🔗                                                   |
| ----------------------- | ------------------------------------------------------------ |
| Vue3 官方文档           | [在线地址](https://link.juejin.cn/?target=https%3A%2F%2Fcn.vuejs.org%2Fguide%2Fintroduction.html) |
| Composition-API 手册    | [在线地址](https://link.juejin.cn/?target=https%3A%2F%2Fvue3js.cn%2Fvue-composition-api%2F) |
| Vue 3 源码学习          | [在线地址](https://link.juejin.cn/?target=https%3A%2F%2Fvue3js.cn%2Fstart%2F) |
| Vue-Router 4.x 官方文档 | [在线地址](https://link.juejin.cn/?target=https%3A%2F%2Frouter.vuejs.org%2Fzh%2Findex.html) |
| Vuex 4.x                | [Github](https://link.juejin.cn/?target=https%3A%2F%2Fvuex.vuejs.org%2F) |
| vue-devtools            | [Github](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fvuejs%2Fvue-devtools%2Freleases)(Vue3 需要使用最新版本) |
| Vite 中文文档           | [线上地址](https://link.juejin.cn/?target=https%3A%2F%2Fcn.vitejs.dev%2F) |
| Vite 源码学习           | [线上地址](https://link.juejin.cn/?target=https%3A%2F%2Fvite-design.surge.sh%2Fguide%2F) |



🎨 更新 `Vue3` 版本的 UI 库：

| 相关库名称         | 文档地址 🔗                                                   | 仓库地址 🏠                                                   |
| ------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| Vant 3             | [在线地址](https://link.juejin.cn/?target=https%3A%2F%2Fvant-contrib.gitee.io%2Fvant%2Fnext%2F%23%2F) | [在线地址](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fyouzan%2Fvant%2Ftree%2Fnext) |
| Ant Design Vue 2.0 | [在线地址](https://link.juejin.cn/?target=https%3A%2F%2F2x.antdv.com%2Fdocs%2Fvue%2Fintroduce-cn%2F) | [在线地址](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2FvueComponent%2Fant-design-vue%2F) |
| Element-plus       | [在线地址](https://link.juejin.cn/?target=https%3A%2F%2Felement-plus.gitee.io%2Fzh-CN%2F) | [在线地址](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Felement-plus%2Felement-plus%2Fissues%2F171) |
| Taro(Vue3)         | [在线地址](https://link.juejin.cn/?target=http%3A%2F%2Ftaro-docs.jd.com%2Ftaro%2Fdocs%2Fvue3) | [在线地址](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fnervjs%2Ftaro) |





### Vue3 组合API入口setup浅析

#### setup简介

组合 API（Composition API）

`Vue3` 将 `Vue 2.0` 的选项 API（options API）制作成一个个 `hook` （钩子）函数，如 `watch`、`computed` 等方法，在 `Vue 2.0` 中是以选项 API 的形式出现，如下：

```js
// options API
export default {
  name: 'App',
  watch: {

  },
  computed: {

  }
}
```

`Vue3` 新增的 `setup` 方法，也是以选项的形式出现在抛出的对象中，但是诸如上述代码中的 `watch`、`computed` 等属性，都变成 `hook` 函数的形式，通过 `vue` 解构出来，在 `setup` 方法中使用，如下所示：

```js
//composition API
import { watch, computed } from 'vue'
export default {
  name: 'App',
  setup() {
    watch(() => {
      // do something
    }, () => {
      // do something
    })
    const a = computed(() => {
      // do something
    })
  }
}

// Vue 3.2.x 推出的特有语法
<script setup>
  import { watch, computed } from 'vue'
  watch(() => {
    // do something
  }, () => {
    // do something
  })
  const a = computed(() => {
    // do something
  })
</script>
```



`setup` 存在的意义，就是为了让你能够使用新增的组合 API。并且这些组合 API 只能在 `setup` 函数内使用。

`setup` 调用的时机是创建组件实例，然后初始化 `props`，紧接着就是调用 `setup` 函数。从生命周期钩子的角度来看，它会在 `beforeCreate` 钩子之前被调用，所以 `setup` 内是拿不到 `this` 上下文的，这在后面的会详细分析。

生命周期对比: 

| Vue 2.0       | Vue3            |
| ------------- | --------------- |
| beforeCreate  | setup()         |
| created       | setup()         |
| beforeMount   | onBeforeMount   |
| mounted       | onMounted       |
| beforeUpdate  | onBeforeUpdate  |
| updated       | onUpdated       |
| beforeDestroy | onBeforeUnmount |
| destroyed     | onUnmounted     |
| activated     | onActivated     |
| deactivated   | onDeactivated   |
| errorCaptured | onErrorCaptured |



1、setup()：开始创建组件之前，在 `beforeCreate` 和 `created` 之前执行。创建的是`data` 和 `method`。

2、onBeforeMount()： 组件挂载到节点上之前执行的函数。

3、onMounted()：组件挂载完成后执行的函数。

4、onBeforeUpdate()：组件更新之前执行的函数。

5、onUpdated()：组件更新完成之后执行的函数。

6、onBeforeUnmount()：组件卸载之前执行的函数。

7、onUnmounted()：组件卸载完成后执行的函数。

8、onActivated()：被 `keep-alive` 缓存的组件激活时调用。

9、onDeactivated()：被 keep-alive 缓存的组件停用时调用，比如从 A 组件，切换到 B 组件，A 组件消失时执行。

10、onErrorCaptured()：当捕获一个来自子孙组件的异常时激活钩子函数。



#### template模板中使用setup

使用vite初始化项目

```sh
npm init vite
```



给 `script` 标签附上 `setup` 属性后，内部将不再通过 `export default` 抛出方式的语法。`template` 模板可以直接拿到 `script` 标签内声明的变量，并且支持响应式，这将使得代码变得简洁明了。



#### h渲染函数中使用setup

> h 函数是 createElement 的别名。

`setup` 也可以返回一个函数，函数中也能使用当前 `setup` 函数作用域中的响应式数据，我们将代码修改为如下：

```html
<script>
  import { ref, reactive, h } from 'vue'

  export default {
    setup() {
      const count = ref(1)
      const object = reactive({ foo: 'bar' })
      return () => h('h1', [count.value, object.foo])
    },
  }
</script>
```

通过 `h` 函数，将 `count.value`（在 setup 函数作用域内，需要使用 .value 获取值） 和 `object.foo` 渲染到 `h1` 标签内。

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9a5f5a970e9545b08a37106b9f7dabef~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp)





#### 组合如何接收外部传入的参数

Vue 3.2 为我们在 `script` 内默认添加了三个方法，这三个方法分别是`defineProps` 、 `defineEmits` 和 `defineExpose`

**defineProps**

我们现在需要一个父子组件的传值例子，修改上述 `src/App.vue` 文件如下：

```vue
<template>
  <Test :count="count"></Test>
</template>

<script setup>
import { ref } from 'vue'
import Test from './components/Test.vue'

const count = ref(0)
</script>
```

在 `src/components` 下新增 `Test.vue` 组件：

```vue
<template>
  <div>{{ props.count }}</div>
</template>

<script setup>
const props = defineProps({ count: Number })
console.log('props', props)
</script>
```

在页面中我们打印了 `props`，可以发现它被 `Proxy` 代理过，这是 `Vue3` 实现响应式的核心 API，也就是说从父亲组件传到子组件的 `count` 变量，已经是响应式数据。

并且在子组件内，可以通过 `watchEffect` 和 `watch` 观察到数据的变化情况，我们来试试让数据在父组件变化起来，分别做如下修改：

```vue
// App.vue
<template>
  <Test :count="count"></Test>
</template>

<script setup>
import { ref } from 'vue'
import Test from './components/Test.vue'

const count = ref(0)
setTimeout(() => {
  count.value = 100
}, 2000)
</script>
```

```vue
// Test.vue
<template>
  <div>{{ props.count }}</div>
</template>

<script setup>
import { watchEffect } from 'vue'
const props = defineProps({ count: Number })
watchEffect(() => {
    console.log('props.count = ', props.count)
  })
</script>
```



**defineEmits**

该属性的作用是在子组件获取父组件传递进来的方法，我们同样用一个例子来演示该属性的作用，在 `App.vue` 添加一个 `add` 方法如下：

```vue
<template>
  <Test :count="count" @add="add"></Test>
</template>

<script setup>
import { ref } from 'vue'
import Test from './components/Test.vue'

const count = ref(0)
const add = () => {
  count.value += 1
}
</script>
```

这里声明 `add` 方法，就不用再像 `setup` 函数那样，将其 `return` 出去。 在子组件内，通过 `defineEmits` 接受方法，如下所示：

```vue
<template>
  <div>{{ props.count }}</div>
  <button @click="add">+1</button>
</template>

<script setup>
const props = defineProps({ count: Number })
// 获取父组件传进来的add方法
const emit = defineEmits(['add'])

const add = () => {
  // 执行父组件传进来的add方法
  emit('add')
}
</script>
```



**defineExpose**

在 `Vue 3.2.x` 版本出来前，我们使用 `Vue3` 开发项目都是用 `setup` 函数的方式，在这种方式下，父组件通过 `ref` 去获取子组件 `return` 出来的方法是比较方便的，我们修改 `App.vue` 和 `Test.vue` 组件如下：

```html
// App.vue
<template>
  <Test :count="count" ref="TestRef"></Test>
</template>

<script setup>
import { ref } from 'vue'
import Test from './components/Test.vue'

const count = ref(1)
const TestRef = ref()
console.log('TestRef', TestRef)
</script>
// Test.vue
<template>
  <div>{{ props.count }}</div>
</template>

<script>
export default {
  name: 'Test',
  props: {
    count: Number
  },
  setup(props) {
    const testFn = () => {
      console.log('我是测试方法')
    }
    return {
      props,
      testFn // 将这个测试方法 return 出去
    }
  }
}
</script>
```

查看浏览器的打印结果如下图所示：

![img](https://s.yezgea02.com/1661483300234/WeChatd442859ee9e9e50964db6dacebff8d45.png)

上图显示 `TestRef` 的打印结果，也就意味着 `App.vue` 可以拿到 `Test.vue` 内部的方法。这个特性能帮我们实现很多有趣的组件。

但是到了 `Vue 3.2.x` 版本，使用 `script setup` 后，父组件就拿不到子组件的内部方法了，修改`Test.vue` 如下所示：

```html
// Test.vue
<template>
  <div>{{ props.count }}</div>
</template>

<script setup>
const props = defineProps({ count: Number })
const testFn = () => {
  console.log('这是测试方法')
}
</script>
```

浏览器打印结果如下：

![img](https://s.yezgea02.com/1661483782280/WeChat825f3bc896726644e0fffd411a6d9b63.png)

此时，`defineExpose` 的作用就得以体现了。在 `Test.vue` 中，将想要往外抛出的方法作为参数放到 `defineExpose` 中，如下所示：

```js
defineExpose({ testFn })
```

刷新浏览器，查看控制台如下图所示：

![img](https://s.yezgea02.com/1661483811185/WeChat7496cdace45c8b298b467a34ac6c673d.png)

#### 总结

在 `Vue3` 的迭代过程中，书写形式会变得越来越优雅，这从 `setup` 函数写法，到 `script setup` 写法的转变就能看出，老的写法比较累赘，每声明一个变量或者方法都要通过 `return` 方法返回给模板才能使用，而 `script setup` 则简洁明了，甚至引入的组件都帮你自动注册。这说明我们需要不断的学习才能更上时代的步伐。

> 文档最近更新时间：2022 年 9 月 20 日。



### Vue3 响应式系统API

响应式系统 API，顾名思义，就是指在新的特性中是如何去实现 `Vue` 的响应式功能。我们通过简单实例的形式讲解分析 `reactive`、`ref`、`computed`、`readonly`、`watchEffect`、`watch` 六个响应式 API 的使用方法。



#### reactive

`reactive` 是 `Vue 3` 中提供的实现响应式数据的方法。在 `Vue 2` 中实现响应式数据是通过 `Object` 的 [defineProPerty](https://link.juejin.cn/?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FJavaScript%2FReference%2FGlobal_Objects%2FObject%2FdefineProperty) 属性来实现的，而在 `Vue 3` 中的响应式是通过 `ES2015` 的 [Proxy](https://link.juejin.cn/?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FJavaScript%2FReference%2FGlobal_Objects%2FProxy) 来实现。

**reactive 参数必须是对象**

`reactive` 方法接受一个对象（json 或 Array）

`reactive` 包裹的对象，已经通过 `Proxy` 进行响应式赋能，所以我们可以通过如下形式修改值，会直接体现在 `template` 模板上。

> 响应式转换是“深层的”，会影响对象内部所有嵌套的属性。基于 `ES2015` 的 `Proxy` 实现，返回的代理对象不等于原始对象。建议仅使用代理对象而避免依赖原始对象。



#### ref

`ref` 和 `reactive` 一样，同样是实现响应式数据的方法。在业务开发中，我们可以使用它来定义一些简单数据.

```html
<script setup>
	import {ref} from 'vue'
  const count = ref(0)
</script>
```



修改数据，可以通过 `count.value = 1` 类似这样的语法去修改。但是为什么它需要这样去修改变量，而 `reactive` 返回的对象可以直接修改.

原因是 `Vue 3` 内部将 `ref` 悄悄的转化为 `reactive`，如上述代码会被这样转换：

```js
ref(0) => reactive({value: 0})
```

**自动解构**

当 `ref` 作为渲染上下文的属性返回（即在 `setup()` 返回的对象中）并在模板中使用时，它会自动解套，无需在模板内额外书写 `.value`。之所以会自动解套，是因为 `template` 模板在被解析的时候，`Vue3` 内部通过判断模板内的变量是否是 `ref` 类型。如果是，那就加上 `.value`，如果不是则为 `reactive` 创建的响应集代理数据。



**判断类型**

判断类型也可以通过 `isRef` 方法，如下：

```vue
<template>
  <p>{{ count }}</p>
</template>

<script setup>
import { ref, isRef } from 'vue'
const count = ref(0)
console.log(isRef(count)) // true
</script>
```



**访问模板中的元素**

在 `Vue 2` 中，我们可以通过给元素添加 `ref="xxx"` 属性，然后在逻辑代码中通过 `this.$refs.xxx` 获取到对应的元素

到了 `Vue 3` 后，`setup` 函数内没有 `this` 上下文，因此我们可以通过 `ref` 方法去获取，并且还需要在页面挂载以后才能拿到元素。

```vue
<template>
  <div ref='shisanRef'>十三</div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
const shisanRef = ref(null)
onMounted(() => {
  console.log(shisanRef)
})
</script>
```

![img](https://s.yezgea02.com/1663035720142/WeChat3d48bc23f0df1e31950b00eb7c7d7e8c.png)



#### computed

`Vue 2` 时代，`computed` 作为选项出现在页面中，而到了 `Vue 3` 时代，它将会以钩子函数的形式出现。

```vue
<template>
  <p>{{ text }}</p>
</template>

<script setup>
import { reactive, computed } from 'vue'
const state = reactive({
  name: '十三',
  desc: '你好'
})

const text = computed(() => {
  console.log('11')
  return state.name + state.desc
})

setTimeout(() => {
  state.name = '十六'
}, 2000)
</script>
```

上述形式 `computed` 返回的值是不可修改的，通过 `get` 和 `set` 的形式返回的值是可修改的，不过这种情况的使用场景不多，这里不作深究。 ????



#### readonly

`readonly` 顾名思义，用于创建一个只读的数据，并且所有的内容都是只读，不可修改。

修改这个数据，控制台报警告了，并且 `state` 打印出来之后，内部数据也没有变化。



#### watchEffect

首先 `watchEffect` 会追踪响应式数据的变化，并且还会在第一次渲染的时候立即执行

`watchEffect` 接受一个回调函数作为参数，并且该回调函数内如果有响应式变量,改变 x响应式变量时，回调函数也会被执行

**停止监听行为**

`watchEffect` 函数返回一个新的函数，我们可以通过执行这个函数或者当组件被卸载的时候，来停止监听行为。

```js
const stop = watchEffect((onInvalidate) => {
  console.log(`监听查询字段${state.search}`)
})

setTimeout(() => {
  stop()
})
```



**清除副作用**

`watchEffect` 的回调方法内有一个很重要的方法，用于清除副作用。它接受的回调函数也接受一个函数 `onInvalidate`。名字不重要，重要的是它将会在 `watchEffect` 监听的变量改变之前被调用一次，

```js
import { reactive, watchEffect } from 'vue'
let state = reactive({
  search: Date.now()
})
const stop = watchEffect((onInvalidate) => {
  console.log(`监听查询字段${state.search}`)
  onInvalidate(() => {
    console.log('执行 onInvalidate')
  })
})

const handleSearch = () => {
  state.search = Date.now()
}
```

`onInvalidate` 会在监听打印之前被执行一次。



#### watch

`watch` 的功能和之前的 `Vue 2` 的 `watch` 是一样的。和 `watchEffect` 相比较，区别在 `watch` 必须指定一个特定的变量，并且不会默认执行回调函数，而是等到监听的变量改变了，才会执行。

```js
let state = reactive({
  search: Date.now()
})
watch(() => {
  return state.search
}, (nextData, preData) => {
  console.log('preData', preData)
  console.log('nextData', nextData)
})

const handleSearch = () => {
  state.search = Date.now()
}
```



### Vue3 生命周期钩子函数,提供注入

#### 生命周期

生命周期钩子函数，`Vue 2` 对应 `Vue 3` 的写法如下

- ~~`beforeCreate`~~ -> `setup`。
- ~~`created`~~ -> `setup`。
- `beforeMount` -> `onBeforeMount`。
- `mounted` -> `onMounted`。
- `beforeUpdate` -> `onBeforeUpdate`。
- `updated` -> `onUpdated`。
- `beforeDestroy` -> `onBeforeUnmount`。
- `destroyed` -> `onUnmounted`。
- `errorCaptured` -> `onErrorCaptured`。

> Composition API 里没有 beforeCreate 和 created 对应的生命周期，统一改成 setup 函数。



**子组件与父组件的顺序**

当组件有变量更新导致页面变化的时候，

先执行 `onBeforeUpdate`，

执行了子组件的销毁生命周期钩子 `onBeforeUnmount` 和 `onUnmounted`，

执行父组件的 `onUpdated` 生命周期钩子函数。



#### 提供/注入(provide/inject)

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2b7dd7e202f34fbc9f0772813d9aa702~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp)

`祖先` 想要传递数据给 `儿子` 的的话，正常情况下，需要先传递给 `父亲` 组件，然后 `父亲` 组件再将数据传给 `儿子` 组件。

现在我们有了 `provide/inject`，便可以在 `祖先组件` 声明 `provide`，然后在 `儿子组件` 通过 `inject` 拿到数据。



**vue2写法**

祖先组件

```vue
<template>
  <div>
    <h1>提供/注入</h1>
    <Father />
  </div>

</template>

<script>
import Father from './components/Father.vue'

export default {
  components: {
    Father
  },
  provide: {
    name: '陈尼克'
  }
}
</script>
```

Father.vue  Son.vue

```vue
<!--Father.vue-->
<template>
  <div>我是父亲</div>
  <Son />
</template>

<script>
import Son from './Son.vue'
export default {
  name: 'Father',
  components: {
    Son
  }
}
</script>
```

```vue
<!--Son.vue-->
<template>
  <div>我是儿子，{{ name }}</div>
</template>

<script>
export default {
  name: 'Son',
  inject: ['name']
}
</script>
```



**vue3写法**

```vue
<!--App.vue-->
<template>
  <div>
    <h1>提供/注入</h1>
    <Father />
  </div>

</template>

<script setup>
import { provide } from 'vue'
import Father from './components/Father.vue'

provide('name', '陈尼克') // 单个声明形式
provide('info', {
  work: '前端开发',
  age: '18'
}) // 多个声明形式
</script>
```

```vue
<!--Son.vue-->
<template>
  <div>我是儿子，{{ name }}</div>
  <div>职业：{{ info.work }}</div>
  <div>年龄：{{ info.age }}</div>
</template>

<script setup>
import { inject } from 'vue'
const name = inject('name', '嘻嘻') // 第二个参数为默认值，可选
const info = inject('info')
</script>
```



**更改传入的值**

`Vue` 不建议我们直接在接收数据的页面修改数据源，用上述的例子就是不建议在 `Son.vue` 组件内去修改数据源，我们可以在 `App.vue` 组件内通过 `provide` 传递一个修改数据的方法给 `Son.vue`，通过在 `Son.vue` 内调用该方法去改变值。

```vue
<!--App.vue-->
<template>
  <div>
    <h1>提供/注入</h1>
    <Father />
  </div>

</template>

<script setup>
import { provide, ref } from 'vue'
import Father from './components/Father.vue'

const name = ref('陈尼克')
provide('name', name) // 单个声明形式
provide('info', {
  work: '前端开发',
  age: '18'
}) // 多个声明形式

const changeName = () => {
  name.value = '李尼克'
}

provide('changeName', changeName)
</script>
```



```vue
<!--Son.vue-->
<template>
  <div>我是儿子，{{ name }}</div>
  <div>职业：{{ info.work }}</div>
  <div>年龄：{{ info.age }}</div>
  <button @click="changeName">修改名字</button>
</template>

<script setup>
import { inject } from 'vue'
const name = inject('name', '嘻嘻') // 第二个参数为默认值，可选
const info = inject('info')
const changeName = inject('changeName')
</script>
```

在 `Son.vue` 组件中，你可以直接修改 `inject` 传进来的 `name` 值。但是你细想，数据源存在于 `App.vue` 中，你在 `Son.vue` 中私自修改了数据源传进来的值，那两边的值就会产生紊乱，上述业务逻辑属于简单的，当你在公司正式项目中这样做的时候，数据源就会变得杂乱无章，页面组件变得难以维护。

综上所述，一定要控制好数据源，保持单一数据流。



### Vue3 性能和业务层面上的提升

#### 虚拟DOM性能优化

**PatchFlag（静态标记）**







**hoistStatic（静态提升）**



**cacheHandler（事件监听缓存）**



**SSR 服务端渲染**



**StaticNode（静态节点）**



#### Tree shaking

> 没有被应用到的代码，编译后自动将其剔除。



在 `Vue 2` 中，无论有没有用到全部的功能，这些功能的代码都会被打包到生产环境中。究其原因，主要还是怪 `Vue 2` 生成实例是单例，这样打包的时候就无法检测到实例中的各个方法是否被引用到。如下：

```js
import Vue from 'vue'

Vue.nextTick(() => {})
```

而 `Vue 3` 经过改良之后，引入了 `Tree-shaking` 的特性，所有的方法通过模块化导入的形式。如下：

```js
import { nextTick, onMounted } from 'vue'

nextTick(() => {})
```

`nextTick` 方法会被打进生产包，而 `onMounted` 在代码里没有用到，最终不会出现在编译后的代码里。

`Tree-shaking` 做了两件事：

- 编译阶段利用 `ES` 的模块化判断有哪些模块已经加载。
- 判断哪些模块和变量，没有被使用或者引用到，从而删除对应的代码。





### Vite2构建项目及原理分析

`Vite` 利用浏览器原生的 `ES` 模块支持和用编译到原生的语言开发的工具（如 esbuild）来提供一个快速且现代的开发体验。



#### ES module

[ES module](https://link.juejin.cn/?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FJavaScript%2FGuide%2FModules%3Fspm%3Da2c6h.12873639.0.0.58f832acSuXjmc) 是 `Vite` 的核心,主流浏览器 Edge、Firefox、Chrome、Safari、Opera 的较新版本都已经支持了 `ES module`，除了万恶的 IE 浏览器。

它最大的特点就是在浏览器端直接使用 `export` 和 `import` 的方式进行导入和导出模块，前提必须在 `script` 标签里设置 `type=module`

```html
<script type="module">
  import { name } from './foo.js'
</script>
```

上述代码运行时，浏览器会发起 http 请求，请求 http server 托管的 `foo.js`，在 `foo.js` 内，我们可以使用 `export` 导出模块：

```js
// foo.js
export const name = 'Nick'
```



**Vite如何利用ES module**

我们通过 `Vite` 初始化一个 `vue3-vite` 项目，在页面中打开控制台，点击 `Sources`，如下所示：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/be02e0d0ddad4125a06a26633cd7796e~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp)

红框内就是引入了 `type=module` 属性，并且 src 引入 `/src/main.js`，我们打开它如下所示：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5fa243d555814b51877ab720b201f95a~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp)

script 标签内的内容如下：

```javascript
import { createApp } from '/node_modules/.vite/vue.js?v=5f7bc028'
import App from '/src/App.vue'

createApp(App).mount('#app')
```

从上述代码我们可以得到一些信息：

1. `createApp` 方法是从 `http://localhost:3001/node_modules/.vite/vue.js?v=5f7bc028` 中获取的。
2. 入口页面 `App.vue` 是从 `http://localhost:3001/src/App.vue` 中获取的。
3. 通过 `createApp` 方法，将应用挂在到了 `#app` 下。

`createApp` 是 `Vue 3` 新增的 `API`，它用于创建应用。`Vue 2` 时代的创建应用需要将代码通过 `webpack` 工具打包之后才能在浏览器运行，而 Vite 通过 `ES module` 的能力，省去了打包过程，直接在浏览器内通过 `/node_modules/.vite/vue.js?v=5f7bc028` 的形式引入代码。

**和webpack比较**

通过 `webpack` 打包实现编译，很难做到按需加载，因为都是静态资源，不管模块代码是否被使用到，都会被打包到 `bundle` 文件里。随着业务量增大，打包后的 `bundle` 随之越来越大。

后来为了减小 `bundle` 的体积，开发者们使用 `import()` 的方式实现按需加载的形式，但是被引入的模块依然需要提前打包，后来使用 `tree shaking` 等方式去掉未使用到的代码块。

但是上述的努力均没能比 `Vite` 更加优雅，`Vite` 可以在需要某个模块的时候动态引入，并且不需要提前打包。



#### vite.config.js常用配置介绍

和 `Vue CLI` 初始化项目需要通过 `vue.config.js` 配置一样，`Vite` 也需要通过 `vite.config.js` 去配置。

**plugins**

插件配置，接收一个数组，在数组内执行需要的插件。插件能帮助我们完成很多事情，比如 `Vite 2` 默认通过 `@vitejs/plugin-vue` 支持 `vue`，书写形式如下所示

```js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()]  
})
```



插件分为两个类型，一个是官方的，一个是社区的：

| 官方插件                                                     | 社区插件                                                     |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| [在线地址](https://link.juejin.cn/?target=https%3A%2F%2Fcn.vitejs.dev%2Fplugins%2F) | [在线地址](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fvitejs%2Fawesome-vite) |





**base**

`base` 配置项在开发或生产环境服务的 公共基础路径，打完包后在 /dist/index.html 中体现。默认值是 `/`，我们不妨把值设置成 `./`，如下所示：

```js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()]  
  base: './'
})
```

尝试着运行 `npm run build`，得到打包后的文件如下所示：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/11835eeaeed64ee795ebc086d56a3f38~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp)

静态资源的引入形式如上图所示，如果不加 `./` 路径，则在 `index.html` 内，引入的路径就会是绝对路径 `/xxx/xxx` 的形式。通过启动 `web` 服务的形式将 `index.html` 启动，如下所示：



**resolve.alias**

方便在组件内部引用文件时，方便书写。配置如下所示：

```js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()]  
  base: './',
  resolve: {
    // 别名设置
    alias: {
      '@': path.resolve(__dirname, '/src')
    }
  }
})
```

> Vite 1.0 是需要用 `/@/` ，加斜杠的形式，Vite 2 后，便优化了。



**resolve.extensions**

导入文件时，需要省略的扩展名列表，不过官方建议是尽量不要将 `.vue` 给省略了。配置如下：

```js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()]  
  base: './',
  resolve: {
    // 别名设置
    alias: {
      '@': path.resolve(__dirname, '/src')
    },
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json'] // 默认值
  }
})
```



**server**

该配置内置多种开发时常用的选项，我们通过代码来分析：

```js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()]  
  base: './',
  resolve: {
    // 别名设置
    alias: {
      '@': path.resolve(__dirname, '/src')
    },
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json'] // 默认值
  },
  server: {
    // 指定服务器主机名
    host: '0.0.0.0',
    // 开发环境启动的端口号
    port: 3008,
    // 是否在开发环境下自动打开应用程序
    open: true,
    // 代理
    proxy: {
      '/api': {
        target: 'http://jsonplaceholder.typicode.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})
```





### Vue-Router4新旧路由方法对比

#### 初始化

通过 `Vite` 初始化一个空项目，运行指令：

```js
npm init vite vue3-vite --template vue
```





#### 路由之间的跳转

组件之间必定需要通过跳转的形式关联起来，形成一个整体。

**组件形式跳转**

以使用 `vue-router` 为我们提供的全局组件 `router-link`

```vue
<template>
  <router-link to='/about'>Home</router-link>
</template>

<script>
export default {
  name: 'Home'
}
</script>
```

浏览器并没有因为点击跳转而刷新页面，这就是路由带来的单页面切换组件能力，在不刷新页面的情况下，改变可视区域的组件。

假如我们将 `router-link` 换成普通的 `a` 标签 `href` 跳转，也能实现页面组件之间的切换，但是这样就会导致浏览器页面的刷新，这并不是我们的初衷.





**方法形式跳转**

使用`router.push()`等方法实现路由跳转



#### 参数传递

路由参数传递有两种方式，一种是通过浏览器查询字符串的形式，另外一种是通过 `params` 形式传递.

**浏览器查询字符串query**

router-link

```vue
<!--Home.vue-->
<template>
  <router-link :to="{ path: '/about', query: { id: 1 } }">Home</router-link>
</template>

<script>
export default {
  name: 'Home'
}
</script>
```



router.push

```vue
<template>
  <button @click="linkTo">Home</button>
</template>

<script>
import { useRouter } from 'vue-router'
export default {
  name: 'Home',
  setup() {
    const router = useRouter()
    console.log('router', router)
    const linkTo = () => {
      router.push({
        path: '/about',
        query: {
          id: 1
        }
      })
    }

    return {
      linkTo
    }
  }
}
</script>
```

接收参数的话，我们修改 `About.vue` 如下所示：

```vue
<template>
  About
	<p>
    id: {{id}}
  </p>
</template>

<script>
import { useRoute } from 'vue-router'
export default {
  name: 'Abput',
  setup() {
    const route = useRoute()
    const { id } = route.query
    console.log('id=', id)
    return {
      id
    }
  }
}
</script>
```





**params形式**

如果我们不想污染浏览器查询字符串，但又想通过路由传参，`params` 是最好的选择。

router-link

```vue
<!--Home.vue-->
<template>
  <router-link :to="{ name: 'about', params: { id: 1 } }">Home</router-link>
</template>

<script>
export default {
  name: 'Home'
}
</script>
```

router.push

```vue
<template>
  <button @click="linkTo">Home</button>
</template>

<script>
import { useRouter } from 'vue-router'
export default {
  name: 'Home',
  setup() {
    const router = useRouter()
    const linkTo = () => {
      router.push({
        name: 'about',
        params: {
          id: 1
        }
      })
    }

    return {
      linkTo
    }
  }
}
</script>
```

要注意，通过 `params` 穿插，跳转的属性要通过 `name` 来控制，否则是拿不到传递的变量的。

接收组件 `About.vue` 修改如下：

```vue
<template>
  About
</template>

<script>
import { useRoute } from 'vue-router'
export default {
  name: 'About',
  setup() {
    const route = useRoute()
    const { id } = route.params
    console.log('id=', id)
  }
}
</script>
```

如果使用 `params` 的形式传参，在目标页面 `About.vue` 手动刷新的话，就拿不到 `params` 参数了，所以我个人使用 `query` 居多。







#### 路由守卫

**beforeEach afterEach**

`beforeEach` 和 `afterEach` 方法接收一个回调函数，回调函数内可以通过 `router.currentRoute`拿到当前的路径参数









#### 路由原理浅析

我们带着三个问题来阅读后续的文章。

- 为什么会出现前端路由？
- 前端路由解决了什么问题？
- 前端路由实现的原理是什么？



**传统页面**

在浏览器输入网址后发起请求，返回来的 `HTML` 页面是最终呈现的效果，那就是 `DOM `直出。并且每次点击页面跳转，都会重新请求 `HTML` 资源。



**单页面**

 `React` 、 `Vue` 、 `Angular` 等著名单页面应用框架。而这些框架有一个共同的特点，便是“通过 `JS` 渲染页面”。

以前我们直出 `DOM` ，而现在运用这些单页面框架之后， `HTML` 页面基本上只有一个 `DOM` 入口

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1ffef8918b4a4b9cb4401cc7a6dc4eb4~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp)



所有的页面组件，都是通过运行上图底部的 `app.js` 脚本，挂载到 `<div id="root"></div>` 这个节点下面。

既然单页面是这样渲染的，那如果我有十几个页面要互相跳转切换. 这时候 前端路由 应运而生，它的出现就是为了解决单页面网站，通过切换浏览器地址路径，来匹配相对应的页面组件。

前端路由 会根据浏览器地址栏 `pathname` 的变化，去匹配相应的页面组件。然后将其通过创建 `DOM` 节点的形式，塞入根节点 `<div id="root"></div>` 。这就达到了无刷新页面切换的效果，从侧面也能说明正因为无刷新，所以 `React`、`Vue`、`Angular` 等现代框架在创建页面组件的时候，每个组件都有自己的 生命周期 。



**原理**

前端路由 插件比较火的俩框架对应的就是 `Vue-Router` 和 `React-Router` ,但是它们的逻辑，归根结底还是一样的，用殊途同归四个字，再合适不过。

通过分析哈希模式和历史模式的实现原理，让大家对前端路由的原理有一个更深刻的理解。

**哈希模式**

`a` 标签锚点大家应该不陌生，而浏览器地址上 `#` 后面的变化，是可以被监听的，浏览器为我们提供了原生监听事件 `hashchange`，它可以监听到如下的变化：

- 点击 a 标签，改变了浏览器地址。
- 浏览器的前进后退行为。
- 通过 `window.location` 方法，改变浏览器地址。



**历史模式**

`history` 模式会比 `hash` 模式稍麻烦一些，因为 `history` 模式依赖的是原生事件 `popstate` ，下面是来自 `MDN` 的解释：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9e778ae17bb64effb55b03edad66f8df~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp)

> 小知识：pushState 和 replaceState 都是 HTML5 的新 API，他们的作用很强大，可以做到改变浏览器地址却不刷新页面。这是实现改变地址栏却不刷新页面的重要方法。

包括 `a` 标签的点击事件也是不会被 `popstate` 监听。我们需要想个办法解决这个问题，才能实现 `history` 模式。

解决思路：

我们可以通过遍历页面上的所有 `a` 标签，阻止 `a` 标签的默认事件的同时，加上点击事件的回调函数，在回调函数内获取 `a` 标签的 `href` 属性值，再通过 `pushState` 去改变浏览器的 `location.pathname` 属性值。然后手动执行 `popstate` 事件的回调函数，去匹配相应的路由。

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>History 模式</title>
</head>
<body>
  <div>
    <ul>
      <li><a href="/page1">page1</a></li>
      <li><a href="/page2">page2</a></li>
    </ul>
    <div id="route-view"></div>
  </div>
  <script type="text/javascript">
    window.addEventListener('DOMContentLoaded', Load)
    window.addEventListener('popstate', PopChange)
    var routeView = null
    function Load() {
      routeView = document.getElementById('route-view')
      // 默认执行一次 popstate 的回调函数，匹配一次页面组件
      PopChange()
      // 获取所有带 href 属性的 a 标签节点
      var aList = document.querySelectorAll('a[href]')
      // 遍历 a 标签节点数组，阻止默认事件，添加点击事件回调函数
      aList.forEach(aNode => aNode.addEventListener('click', function(e) {
        e.preventDefault() //阻止a标签的默认事件
        var href = aNode.getAttribute('href')
        //  手动修改浏览器的地址栏
        history.pushState(null, '', href)
        // 通过 history.pushState 手动修改地址栏，
        // popstate 是监听不到地址栏的变化，所以此处需要手动执行回调函数 PopChange
        PopChange()
      }))
    }
    function PopChange() {
      console.log('location', location)
      switch(location.pathname) {
      case '/page1':
        routeView.innerHTML = 'page1'
        return
      case '/page2':
        routeView.innerHTML = 'page2'
        return
      default:
        routeView.innerHTML = 'page1'
        return
      }
    }
  </script>
</body>
</html>
```



> 这里注意，不能在浏览器直接打开静态文件，本地直接打开 html 文件用的是 file 协议， popstate 监听的是 HTTP 协议，需要通过 web 服务，启动端口去浏览网址。





### Vue3 实战项目启动篇

#### 启动项目

**Node环境**

* 手动下载Node安装包直接安装
* 安装nvm

> 仓库地址：[github.com/nvm-sh/nvm](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fnvm-sh%2Fnvm) ，要注意的是，nvm 没有 windows 版本，所以使用 windows 电脑的同学需要可以去 [github.com/coreybutler…](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fcoreybutler%2Fnvm-windows%2Freleases) 下载适配 window 的 nvm，并且安装前需要清空本地之前下载的 Node。

**克隆代码**

大家可以前往[vue3-admin开源仓库](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fnewbee-ltd%2Fvue3-admin)克隆代码，指令如下所示：

```sh
git clone https://github.com/newbee-ltd/vue3-admin
```

下载完项目后，进入项目，安装 `npm` 包

```sh
cd xxx
npm i
```

下载完之后，启动项目

```sh
npm run dev
```



#### 目录介绍

- config：存放环境变量相关的路径参数，以及一些配置选项，如图片上传接口等。
- public：存放公共资源静态文件。
- src
  - components：公用组件。
  - router：路由配置项。
  - utils：工具类文件夹，包括请求库的封装，以及一些工具函数的抽离。
  - views：所有的页面组件，都放于此文件夹中。
- theme：`Element-plus` 插件生成的主题文件夹，内置配置好的主题样式。
- element-variables.scss：`Element-plus` 插件自动生成的 `sass` 样式文件。
- index.html：入口模板页。
- vite.config.js：`Vite` 配置文件，内置各类配置项。



#### 功能介绍







### 成为一名有独立开发能力的前端工程师

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1c638a8ba35e49eab3052c9872942071~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp)





#### 框架选型



#### 项目初始化

在你做完框架选型之后，你就该着手开始搭建项目了。此时当然可以手动搭建项目，这非常磨练基本功。但是在项目紧急的情况下，不允许你有过多的时间去研究手动搭建，你可以选择市面上一些成熟的解决方案，如 `Vue CLI`、`Vite`、`UmiJS`、`create-react-app`、`Next.js` 等等，这些工具将帮你完成项目的初始化工作。

看文档



#### UI组件库

UI 组件库的选型，绝大情况下取决于项目。

如果你是开发管理后台 B 端类型的项目，就可以使用 `Antd`、`Element UI`、`Element-Plus` 等，它们对后台的一些操作都有比较好的组件提供。

如果你要开发的是 C 端项目，比如电商类项目，可以考虑用 `Vant`，因为有赞是高度定制电商项目组件的公司，所以选它再合适不过。

如果是金融类项目，可以推荐使用京东组件库 `NUT UI`，它是京东金融团队推出的一套针对金融行业的组件库。

并且还要看是否支持按需加载、自定义主题色等，这关系到后续打包静态资源体积的大小，直接影响到项目的加载性能，所以做好充分的调研工作，还是很有必要的。



#### CSS预处理

预处理器的选择，我个人比较倾向 `Less`，因为多数 `UI` 组件库用的 `CSS` 预处理器就是 `Less`。预处理器的选择，倒不会对整个项目产生过大的影响，因为它们的作用都大同小异，无非就是给 `CSS` 赋能，让其有变量、计算、合并同类型等能力





#### HTTP请求库

市面上不乏好用的 `HTTP` 请求库，如 `Axios.js`、`request.js`、`fetch` 等等。当然，你可以直接在页面引入使用，在每个页面内部引入请求库。

```html
<script>
  import axios from 'axios'
  export default {
    setup() {
      axios.get('/xxx/xxx', { xxx: 'xxx' }, option).then(() => {})
    }
  }
</script>
```

但是这非常不极客，如果你的 `option` 配置需要修改的话，可能在整个项目有用到请求库的地方，都改上一遍。

所以你可以通过 `axios.js` 提供的拦截器，对它进行二次封装，再抛出去给下级页面使用，这样做的目的就是将数据和配置统一处理，你可以在封装的代码里统一抛出错误信息，不用每次在页面级的请求里单独抛错。



#### 全局状态管理

当你需要大量的组件间的状态共享以及事件传递的时候，状态管理插件就派上用场了。常见的管理插件有 `Redux`、`Moxb`、`Vuex`、`dva` 等等，其实都大同小异



#### 公共方法的封装

公共方法的封装也能体现一个前端程序员模块化的功底。比如 `localStorage`、正则验证、日期转换、可复用的 `json` 对象等等。



#### 打包构建部署

这块内容，那就是奇形怪状、千奇百怪的都有的。

大公司会有一套成熟的 CI、CD 持续集成体系，有完善的版本管理体系

小公司则对这块没有那么特别在意，前端打完包之后，只要将静态资源部署上去，能运行便可

其实说白了，前端的部署其实很简单，我们用一个简单的例子展示如下：

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>document</title>
</head>
<body>
    <div class='root'>
    </div>
    <script src='./bundle.js'></script>
</body>
</html>
```

你只要想办法，将打包完的后的 `./bundle.js` 文件如上述形式运行在浏览器环境，便能得到想要的结果。



#### 其他能力

**解决问题**



**布局**

整个网站的布局，一定要写好。尽量避免临时的修改一些宽高、边距等。好的布局，有益于后续的功能迭代及需求的改变。



**服务端能力**

前端这块还是需要对 `Node` 知识有所了解，遇到一些浏览器无法解决的问题，可以通过服务器的能力解决。比如在我开发的过程中有生成海报的功能，我就利用 `node` ，通过 `puppeteer` 在服务端生成图片在输出给前端。

 Nginx 的相关知识也能让你遇到跨域之类的问题，跨域通过本地 Nginx 代理来解决。



### Vite2 + Vue3 + Element-Plus搭建管理后台项目

> 注意：当前作者的 Node 版本为 16.13.2，npm 为 8.1.2。如果下面的操作出现一些诡异的指令报错，请同步版本。



#### 初始化Vite项目

通过如下指令新建一个项目：

```sh
# npm 6.x
npm init @vitejs/app newbee-admin --template vue  //旧语法
npm init vite newbee-admin --template vue         //新语法

# npm 7+, 需要额外的双横线：
npm init @vitejs/app newbee-admin -- --template vue  //旧语法
npm init vite newbee-admin -- --template vue         //新语法

# yarn
yarn create @vitejs/app newbee-admin --template vue
```

安装依赖包，并且启动项目：

```sh
npm i
npm run dev
```



#### 安装路由插件

打开命令行工具,在项目根目录安装 `vue-router`：

```sh
npm i vue-router@next
```

> 这里加一个 @next 代表的是安装最新的版本



安装成功之后，在 `src` 目录下新建 `router/index.js`，并添加路由配置项：

```js
// router/index.js
import { createRouter, createWebHashHistory } from 'vue-router'
import Index from '@/views/Index.vue'

const router = createRouter({
  history: createWebHashHistory(), // hash 模式
  routes: [
    {
      path: '/',
      component: Index
    }
  ]
})

export default router
```

顺带着在 `src` 目录下新增 `views` 目录，用于放置页面组件。之后在该目录下添加 `Index.vue` 组件，在 `template` 模板下随意添加一些内容：

```vue
<template>
  Index
</template>

<script>
export default {

}
</script>
```

上述获取文件路径是通过 `@/` 的形式。这需要我们在 `vite.config.js` 下添加 `resolve.alias`，代码如下：

```js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '~': path.resolve(__dirname, './'),
      '@': path.resolve(__dirname, 'src')
    },
  }
})
```

`@` 代表 `src` 目录下的别名；`~` 代表根目录下的别名，这样我们在项目中使用路径的时候，就不用写一长串。



配置完之后，我们需要在 `src/main.js` 中引入路由实例，如下所示：

```js
import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router'

const app = createApp(App) // 生成 Vue 实例 app

app.use(router) // 引用路由实例

app.mount('#app') // 挂载到 #app
```

别忘了将路由展示出来，修改 `src/App.vue` 如下所示：

```vue
<template>
  <!--路径匹配到的组件，将会展示在这里-->
  <router-view></router-view>
</template>

<script>
export default {
  name: 'App'
}
</script>
```



#### 环境变量配置

环境变量是当你打包或运行项目的时候，能告诉你当前处于哪一个环境。就目前而言，我们开发分项目几种环境，开发环境、测试环境、正式环境。不同的环境我们配置的资源可能都不同，如服务端接口、统计相关代码、日志的打印等等。

用 `Vue CLI` 启动的 `Vue` 项目，你可以在项目中使用 `process.env` 获取相关的环境变量。到了 `Vite` 这儿，就不能通过 `process.env` 来获取环境变量。

**打包时**

打包时，指的是在运行打包过程的时候，`vite.config.js` 内如何获取环境变量，配置静态资源路径需要它。

首先我们将 `package.json` 的 `scripts` 属性做如下改动：

```json
"scripts": {
  "dev": "vite --mode development",
  "build:beta": "vite build --mode beta",
  "build:release": "vite build --mode release",
  "serve": "vite preview"
}
```

通过在 `--mode` 后面添加相应的环境变量值。然后我们在 `vite.config.js` 内通过如下代码获取变量：

```js
export default ({ mode }) => defineConfig({
  ...
})
```

当你打包代码的时候，`index.html` 文件内的静态资源引用路径是根据 `vite.config.js` 的 `base` 属性配置的。如果我在发布的时候，使用的是在线静态资源 `CDN` 的形式，则需要做如下改动：

```js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default ({ mode }) => defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '~': path.resolve(__dirname, './'),
      '@': path.resolve(__dirname, 'src')
    },
    extensions: ['.vue', '.js', 'jsx', '.json']
  },
  base: mode == 'development' ? './' : (mode == 'beta' ? '//s.baidu.com/beta/xxx' : '//s.baidu.com/release/xxx') // 静态资源路径配置
})
```

尝试打包项目，运行指令：

```js
npm run build:beta
```

查看 `dist` 目录下的文件，静态资源前缀变成了我们配置好的 `//s.baidu.com/beta/xxx`，同理运行 `npm run build:release` 也会变成相应的前缀。

如果不需要配置的同学，直接修改 `base` 属性为 `./` 即可。打完包后如下所示：

![img](https://s.yezgea02.com/1616847271693/WeChata4ad238f28eda54a3e90dbb2e4107fbe.png)

直接加载相对路径下 `assets` 文件夹。



**运行时**

我们的代码在运行时，如何获取环境变量呢？答案是 `import.meta.env`。

它是 `Vite` 专门为项目提供的环境变量参数，通过它能获取到我们在 `scripts` 设置的 `mode` 环境变量。

我们不妨在 `src/views/Index.vue` 内打印一下这个变量：

```vue
<template>
  <div>Index</div>
</template>

<script>
const ENV = import.meta.env
export default {
  name: 'Index',
  setup() {
    console.log('ENV', ENV)
  }
}
</script>
```

如下所示：

![img](https://s.yezgea02.com/1615360277662/WeChatac603c5fc86939c2bca88998f1954103.png)

`MODE` 属性便是我们需要的环境变量，我们可以通过它去做一些有趣的事情，比如二次封装 `axios`。



#### **二次封装axios**

**安装axios**

```sh
npm i axios
```

**本地引入**

在 `src` 目录下新建 `utils/axios.js`

```js
import axios from 'axios'
import router from '@/router/index'
import config from '~/config'


// 这边由于后端没有区分测试和正式，姑且都写成一个接口。
axios.defaults.baseURL = config[import.meta.env.MODE].baseUrl
// 携带 cookie，对目前的项目没有什么作用，因为我们是 token 鉴权
axios.defaults.withCredentials = true
// 请求头，headers 信息
axios.defaults.headers['X-Requested-With'] = 'XMLHttpRequest'
axios.defaults.headers['token'] = localStorage.getItem('token') || ''
// 默认 post 请求，使用 application/json 形式
axios.defaults.headers.post['Content-Type'] = 'application/json'

// 请求拦截器，内部根据返回值，重新组装，统一管理。
axios.interceptors.response.use(res => {
  if (typeof res.data !== 'object') {
    alert('服务端异常！')
    return Promise.reject(res)
  }
  if (res.data.resultCode != 200) {
    if (res.data.message) alert(res.data.message)
    if (res.data.resultCode == 419) {
      router.push({ path: '/login' })
    }
    return Promise.reject(res.data)
  }

  return res.data.data
})

export default axios
```

此时我们需要在根目录下新增 `config/index.js`，代码如下：

```js
// config/index.js
export default {
  development: {
    baseUrl: '/api' // 开发代理地址
  },
  beta: {
    baseUrl: '//backend-api-02.newbee.ltd/manage-api/v1' // 测试接口域名
  },
  release: {
    baseUrl: '//backend-api-02.newbee.ltd/manage-api/v1' // 正式接口域名
  }
}
```

分别配置相应环境的域名地址。开发环境配置 `/api`，是为了后续配置 `proxy` 代理接口所用，下面我们就要讲解这块内容。



#### 配置proxy代理接口

在开发前端项目的时候，经常会遇到跨域问题，此时我们可以在 `vite.config.js` 下作如下配置：

```js
// vite.config.js
...
server: {
  proxy: {
    '/api': {
      target: 'http://backend-api-02.newbee.ltd/manage-api/v1', // 凡是遇到 /api 路径的请求，都映射到 target 属性
      changeOrigin: true,
      rewrite: path => path.replace(/^\/api/, '') // 重写 api 为 空，就是去掉它
    }
  }
}
...
```





#### 引入UI组件库element-plus

组件库叫 `element-plus`，这款组件是适配了 `Vue3`，且使用习惯贴合 `element-ui`

**安装**

```sh
npm i element-plus
```

> 官方文档：[element-plus.gitee.io/#/zh-CN](https://link.juejin.cn/?target=https%3A%2F%2Felement-plus.gitee.io%2F%23%2Fzh-CN)



**全局引入Element Plus**

文档, 全局引入的方式如下所示：

我们便按照它的方式修改 `src/main.js`，如下所示：

```js
import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import router from '@/router'

import 'element-plus/lib/theme-chalk/index.css';

const app = createApp(App)

app.use(router)

app.use(ElementPlus)

app.mount('#app')
```



**测试使用**

打开 `src/views/Index.vue` 稍作修改：

```vue
<template>
  <div><el-button type="primary">主要按钮</el-button></div>
</template>

<script>
export default {
  name: 'Index'
}
```



**按需引入**

> [快速开始 | Element Plus (gitee.io)](https://element-plus.gitee.io/zh-CN/guide/quickstart.html#按需导入)

自动导入



手动导入



#### element-plus自定义主题色配置

> 官方文档写的乱



`element-plus` 升级为正式版之后，官方在自定义主题上也增加了通过 sass 变量去控制主题样式，具体文档链接：[element-plus.gitee.io/zh-CN/guide…](https://link.juejin.cn/?target=https%3A%2F%2Felement-plus.gitee.io%2Fzh-CN%2Fguide%2Ftheming.html)

按照此小册的步骤来设置即可



#### 引入图标库







#### 公用方法封装

首先我们要在 `src/utils` 目录下新建 `index.js` 文件，内容如下：





#### vue-devtools

最新的插件已经支持 `Vue 3` 和 `Vite 2` 的开发模式，这边大家可以前往 `Github` 官网下载插件。

> [github.com/vuejs/vue-d…](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fvuejs%2Fvue-devtools%2Freleases%2Ftag%2Fv6.0.0-beta.7)





### Vue3实战之管理后台左右栏布局(Menu菜单组件)





### Vue3 实战之登录鉴权（Form 表单组件）

#### 本章节知识点

- 需要注册的组件：`ElForm`、`ElFormItem`、`ElInput`、`ElCheckbox`。
- `Form` 表单验证。
- `token` 鉴权。
- 公共变量的提取



#### 新建登录页面

先创建一个空的登录组件页面，找到 `views`，在其下新建一个 `Login.vue` 组件，新增代码如下所示：



在登录页面我们是不需要左侧菜单的。此时我们需要在 `App.vue` 里做文章。

思路大致是这样，声明一个 `showMenu` 布尔变量，用于控制是否展示菜单栏。再声明一个 `noMenu` 数组变量，用于存放不需要展示菜单的路径，再通过监听路由变化来匹配是否需要展示路径，最后通过 `showMenu` 来展示和隐藏。





#### 添加登录页样式 引入表单组件



之所以设置完 `token` 之后需要刷新页面，是因为 `token` 存储完成之后，如果通过 `router.push` 路由实例方法跳转首页，页面不刷新的情况下，`utils/axios.js` 里的 `localGet('token')`，是不会被执行的，如下所示：

```js
// src/utils/axios.js
axios.defaults.headers['token'] = localGet('token') || ''
```

测试:

在App.vue中使用watch监视route.path, 变化时打印axios.defaults.headers, 发现token键的值为空.    why???





#### 优化

1.直接在app.vue中添加路由导航守卫

问题: vscode修改后保存,意味着script文件刷新重新执行, 会有意外可能存在

这样做的目的，是不会让浏览器中先出现 vue3-admin 项目中的内部页面，之后再跳转的现象







### Vue3实战之首页大盘数据

#### 本章节知识点

- 需要注册的组件：`ElPopover`、`ElTag`、`ElCard`。
- `Echarts 5.0` 图表差插件的引入及使用。
- 个人信息弹窗显示。



#### 个人信息卡片制作

多个style写法









#### 大盘数据



**订单信息折线图**

静态资源引入

之所以采用这种形式，是因为后续的构建打包，会将第三方资源打成一个 `vendor.js` 文件，我不希望在 `vendor.js` 内部加入 `echart` 的代码，这样会使得 `vendor.js` 变得很臃肿，毕竟 `echart` 文件很大，几百 KB 的大小，有些无法接受。

这里如果采用 `script` 的形式引入，`echart` 资源就会另行加载，还是会挂载到 `window` 全局变量下。





#### 热销,新品,推荐页面制作

这三个页面的布局都是一样的，只不过请求接口的数据不一样罢了。实现这种需求的形式有两种。

- 通过 `Tab` 在统一组件内，切换不同的选项，从而替换展示的内容。
- 三个页面公用一个组件，通过路由监听变化，来判断不同的路径，对应不同的接口参数配置。

本项目中采用的是第二种方法，有兴趣的读者可以尝试改造成第一种方法。

新增页面的话，需要去 `App.vue` 添加菜单栏目，再去 `router/index.js` 添加组件路由配置，然后在 `views` 下新建组件。



效果如下:

![img](https://s.yezgea02.com/1618153210241/Kapture%202021-04-11%20at%2023.00.03.gif)



> 反复点击会发现一个问题：当你点击轮播图，再切回轮播图下的三个按钮的时候，会发生“上一次的 `router` 没有被销毁”的情况，然后又创建了一次 `router`，导致执行了好几次 `router.beforeEach` 的回调方法，也直接导致我们若是在回调方法内直接根据路径的变化，请求不同的接口，一次性会有多个请求发出。



这里，直接查看源码，探索一下 `beforeEach` 的源码是怎么解释的，如下所示：

![img](https://s.yezgea02.com/1618327440553/WeChatf71b0104cd3ae0e64e7f6c408c5a6b3f.png)

红框内的翻译大致是：返回一个函数，去消除注册的路由守卫。

很明显，代码需要修改：

> 哪里明显?
>
> 源码在哪里看的, 在本地项目和github上没有找到相同的注释.
>
> 现在是点击轮播图下3个按钮时, 相同的路由名称可以打印多次. 
>
> 现在的组件 IndexConfig 不会被销毁.  onUnmounted()不会执行, 



你还别说,还真管用. 但有个问题, 当我从swiper切换到任意一个按钮的时候, 不会执行router.beforeEach, 也就是不会打印to.name

第一次进入hot页面时, router.beforeEach也不打印(删除返回值,只保留router.beforeEach)

why?

我在onMounted中打印router, 怎么导致router.beforeEach不执行呢?(如何确定是因为打印router的原因, 我注释了,router.beforeEach就执行了)













