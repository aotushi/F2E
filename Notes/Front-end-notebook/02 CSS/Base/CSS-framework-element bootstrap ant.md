

## Element

### 使用

```js
//主页
element.eleme.cn

//使用
1.完整引入
1.1 引入:main.js中
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);
1.2 使用组件标签
<el-button>默认按钮</el-button> //直接在模板中添加即可
========================================================	
2.按需引入
 2.0 yarn add element-ui
 2.1 安装 yarn add babel-plugin-component
 2.2 在babel.config.js中设置   //官网更新慢,按此处来设置
  2.2.1  
 module.exports = {
     presets: [
         '@vue/cli-plugin-babel/preset',
         ["@babel/preset-env", { "modules": false }]
     ],
     plugins:[
         [参考：vue脚手架配置代理.md
          "component",
          {
          "libraryName": "element-ui",
          "styleLibraryName": "theme-chalk"
          }
     ]
     ]
 }
   
 2.3 引入和全局注册需要使用的组件 在main.js中
 2.3.1 引入和注册
	import {Button,Message,MessageBox} from 'element-ui';
	Vue.component(Button.name, Button)  //注册全局组件
	Vue.component(Message.name, Message)

  2.3.2 标签书写样式
    <el-button>xxx</el-button>
 
 2.4 在组件.vue中引入和局部注册 
	import {Button} from 'element-ui'
	export default{
        name:'App',
        components:{Button}
    }
 2.5 写样式
```



### 自定义主题

```js
//介绍
https://element.eleme.cn/#/zh-CN/component/custom-theme
//主题编辑器

//仅替换主题色 使用在线主题生成工具 
1.下载
2.src下导入theme文件夹
3.重设vue.config.js文件, 将theme变为~src/theme 

```





## tailwindcss

版本: 3

### 介绍

原生css: 

组件化css: bootstrap

原子化css: tailwind



### 如何引入使用



### 如何复用

在mail.css中新加类如下:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

// 新加的复用类
@layer components {
  .classNamesExample {
    @apply px-6 py-2 ....
  }
}
```



### 在tailwind中写原生css

要是找不到可以使用原生写法  不建议这么写

3.0版本基本上不用这么写.

```css
@tailwind base;
@tailwind components;


// 新加的复用类
@layer components {
  .classNamesExample {
    @apply px-6 py-2 ....
  }
}

@tailwind utilities;
// 原生css
@layer utilities {
  .btn3 {
    width: 100px;
    height: 200px;
    background-color: red;
  }
}
```



### tailwind中的单位换算

间距 

每个项目的rem和px的换算比例是不同的,  tailwind中规定的是1rem=16px

```
1 0.25rem 4px
4 1rem 16px
```





### 给标签添加基础属性

在main.css中添加

```css
@tailwind base;

@layer base {
  a { display: block; }  // 给a标签添加基础属性
}
```



