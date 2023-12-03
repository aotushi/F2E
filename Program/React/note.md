# React18后台管理系统



## 第2章-技术选型



### 2-2技术选型

* 考虑兼容性: Vue2, React
* 不考虑兼容性: Vue3 React
* 后台UI框架:
  * Vue-Element
  * React-AntDesign
  * Arco-Design
* H5 UI框架
  * Vant WeUI Arco-Design
* 小程序框架
  * 微信原生
  * Taro
  * uni_app
* 地图
  * 大屏: 百度地图,高德地图, echarts, G2plot(阿里)



### 2-3本次课程技术选型

最新版本

* React18
* Router6
* Vite4
* TS+Antd

状态管理

* redux  不推荐
* resso
* zustand



### 2-4创建vite项目

React18+ReactRouter6.0+Vite+TypeScript+Antd5.0



#### 创建项目

```js
//npm
npm install vite@latest

//yarn
yarn create vite

//pnpm
npm create vite
```



#### 项目配置概览

格式化统一配置:

* editorconfig
  * 编辑器工具统一
* npm/yarn/pnpm
  * 镜像源
* eslint/prettier
  * 语法检查
  * 语法美化

#### 配置editorconfig

项目根目录层级创建`.editorconfig`文件

```.editorconfig
# https://editorconfig.org

root = true
[*]
charset = utf-8
indent_style = space
indent_size = 2
end_of_line = lf
insert_final_newline = true
trim_trailing_whitespace = true

```



配置解读
root=true 对所有文件生效
end_of_line= lf 不同操作系统换行符不同
end_of_line
lf | cr | crlf (大小写不限）
复制代码
end_of_line设置的换行符的表示方式。先看一下这几个值是什么意思
lf：全拼Line Feed，意思是换行，用符号 \n 表示
cr: 全拼Carriage Return， 意思是回车， 用符号 \r 表示
crlf：cr 和 lf的结合，回车换行，用符号 \r\n
insert_final_newline = true 代码最后新增一行
trim_trailing_whitespace = true 修剪尾随空格

