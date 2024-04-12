## [来源](https://jzplp.github.io/2022/vue-breadcrumb.html)

## 简介
面包屑（Breadcrumb）是网页中一个常见的模块，用于显示用户在网站中当前的所处的位置，并且可以向上导航。常见的前端组件库都会包含这个组件，例如：

- [Element UI Breadcrumb 面包屑](https://element.eleme.cn/#/zh-CN/component/breadcrumb)
- [Ant Design Vue Breadcrumb 面包屑](https://www.antdv.com/components/breadcrumb-cn)

面包屑的代码：

```html
<el-breadcrumb separator="/">
  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item :to="{ path: '/' }">活动管理</el-breadcrumb-item>
  <el-breadcrumb-item :to="{ path: '/' }">活动列表</el-breadcrumb-item>
  <el-breadcrumb-item :to="{ path: '/' }">活动详情</el-breadcrumb-item>
</el-breadcrumb>
```

以上代码存在的问题: 重复性.

## 方案
### 1.嵌套路由
嵌套路由本身就是带有层级的，天然适合自动生嵌套路由。Vue Router中对嵌套路由有[文档说明](https://router.vuejs.org/zh/guide/essentials/nested-routes.html)。
#### 方法描述
1. 按照Vue Router规范设置多级路由表，meta标签中放置面包屑名称。
2. 面包屑实现代码中使用route.matched获取多级路由，直接显示即可。

#### 优缺点
**优点**
1. 实现最简单，最方便。
2. 能够适应多种情形，无论是刷新页面还是直接访问子页面URL，都能保证面包屑的一致性。
3. 能够保存路由参数，query和定义在路由中的params都可以保存下来，上级跳转功能的体验较好。

**缺点**
1. 要求存在可以手写的路由表，使用自动生成路由的工程难以使用。例如vite-plugin-pages插件使用文件目录自动生成路由表，虽然可以自动生成嵌套路由，但是不方便设置meta。
2. 要求路由必须是清晰的树形结构，必须使用多级路由表。如果不路由结构不方便设置为树形，或者是网状结构，则不能使用此方法。

```vue
//Breadcrumb.vue

<template>
  <el-breadcrumb class="app-breadcrumb" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item,index) in levelList" :key="item.path">
        <span v-if="item.redirect==='noRedirect'||index==levelList.length-1" class="no-redirect">{{ item.meta.title }}</span>
        <a v-else @click.prevent="handleLink(item)">{{ item.meta.title }}</a>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>



<script>
import pathToRegexp from 'path-to-regexp'

export default {
  data() {
    return {
      levelList: null
    }
  },
  watch: {
    $route() {
      this.getBreadcrumb()
    }
  },
  created() {
    this.getBreadcrumb()
  },
  methods: {
    getBreadcrumb() {
      let matched = this.$route.matched.filter(item => item.meta && item.meta.title)
      const first = matched[0]

      if (!this.isDashboard(first)) {
        matched = [{ path: '/dashboard', meta: { title: 'Dashboard' }}].concat(matched)
      }

      this.levelList = matched.filter(item => item.meta && item.meta.title && item.meta.breadcrumb !== false)
    },
    isDashboard(route) {
      const name = route && route.name
      if (!name) {
        return false
      }
      return name.trim().toLocaleLowerCase() === 'Dashboard'.toLocaleLowerCase()
    },
    pathCompile(path) {
      const { params } = this.$route
      var toPath = pathToRegexp.compile(path)
      return toPath(params)
    },
    handleLink(item) {
      const { redirect, path } = item
      if (redirect) {
        this.$router.push(redirect)
        return
      }
      this.$router.push(this.pathCompile(path))
    }
  }
}
</script>

<style lang="scss" scoped>
.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  font-size: 16px;

  .no-redirect {
    color: #97a8be;
    cursor: text;
  }
}
</style>
```

### 2.缓存和计算新面包屑


### 3.递归处理路由表
