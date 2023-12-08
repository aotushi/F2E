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
indent_style = tab
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

end_of_line设置的换行符的表示方式。先看一下这几个值是什么意思
lf：全拼Line Feed，意思是换行，用符号 \n 表示
cr: 全拼Carriage Return， 意思是回车， 用符号 \r 表示
crlf：cr 和 lf的结合，回车换行，用符号 \r\n
insert_final_newline = true 代码最后新增一行
trim_trailing_whitespace = true 修剪尾随空格

### 2-5项目配置

#### npm和yarn修改配置

##### 本项目中修改npm或yarn配置

在项目根目录下创建`.npmrc`, `.yarnrc`文件,并各自编辑内容如下:
```bash
//npmrc
registry=https://registry.npm.taobao.org

//yarnrc
registry=https://registry.npm.taobao.org
```



##### 全局修改下载地址

```bash
//npm
npm config set registry https://registry.npm.taobao.org

//yarn
yarn config set registry https://registry.npm.taobao.org
```



#### pnpm





### 2-6 prettier配置

官网:prettier.cn

配置项: https://prettier.io/docs/en/options

使用介绍: [vscode使用prettier格式化代码不起作用、配置不生效的解决方法_vscode prettier不生效_云帆Plan的博客-CSDN博客](https://blog.csdn.net/a843334549/article/details/115391605)

#### 1.安装prettier包和vscode扩展Prettier-Code formatter

```bash
npm i prettier -D
```



#### 2.根目录下创建`prettier.cjs`文件

在此文件中添加相关配置项

```cjs
module.exports = {
// 每行最大列，超过换行
printWidth: 120,
// 使用制表符而不是空格缩进
useTabs: false,
// 缩进
tabWidth: 2,
// 结尾不用分号
semi: false,
// 使用单引号
singleQuote: true,
// 在JSX中使用单引号而不是双引号
jsxSingleQuote: true,
// 箭头函数里面，如果是一个参数的时候，去掉括号
arrowParens: 'avoid',
// 对象、数组括号与文字间添加空格
bracketSpacing: true,
// 尾随逗号
trailingComma: 'none',
}
```



#### 3.根目录下配置局部vscode配置

1.根目录下创建`.vscode>settings.json`文件,来实现项目格式化,可覆盖vscode相同配置

```json
//settings.json

{
  "editor.defaultFormatter": "esbenp.prettier-vscode", //编辑器默认使用prettier格式化
  "editor.formatOnSave": true,  //自动保存格式化
  "editor.codeActionOnSave": {  //代码自动修复 配合eslint使用
    "source.fixAll": true
  }
}
```



#### 遇到的问题: 

prettierrc中的内容更改后,在相同文件进行保存时,其格式还是更改之前的.

