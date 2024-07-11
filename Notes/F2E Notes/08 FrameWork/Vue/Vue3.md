
# Vue项目初始化

## CDN模式
[unpkg.com/vue@next](https://link.juejin.cn/?target=https%3A%2F%2Funpkg.com%2Fvue%40next "https://unpkg.com/vue@next") 可以拿到最新的 Vue 版本。 使用场景集中在实现简单需求方面.
```html
<script src="https://unpkg.com/vue@next"></script>
```



## Vue-CLI模式
使用vue-cli创建vue3项目时,版本需要4.5.x,升级之前许先卸载低版本.(或可以升级)
**查看/升级/卸载/安装全局版本**
```bash
#命令行查看vue版本
vue --version

# 升级vue-cli
npm update -g @vue/cli

#卸载全局中的低版本
npm uninstall -g @vue/cli

#或,卸载具体项目中的低版本
npm uninstall vue-cli

# 安装
npm i -g @vue/cli
```

创建项目
```bash
vue create vue3-demo
```

**局部安装**
由于局部安装,命令不一样,所以单独写.
>在本地目录中安装 Vue CLI 后，我们需要使用 `npx` 前缀来执行命令，因为 `vue` 命令不包含在全局路径中。在使用 `npx` 前缀后，它将自动查找本地目录中安装的 Vue CLI 版本，然后运行相应的命令。


```bash
# 局部安装
npm i @vue/cli

# 查看局部安装版本(Window)
npx vue -V
```



## Vite模式
[搭建Vite项目](https://cn.vitejs.dev/guide/)

```bash
npm create vite@latest  

# npm init vite 这个命令也可以

# yarn create vite

# pnpm create vite
```


## 使用实例
### 动态绑定ref
> https://blog.csdn.net/qq_36330228/article/details/134466234



