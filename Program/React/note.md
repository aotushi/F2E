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

#### 安装

```bash
npm i prettier -D
```



#### 根目录下创建`prettier.cjs`文件

在此文件中添加相关配置项

```cjs
```



#### 自动格式化

1.在vscode中安装prettier插件

2.根目录下创建`.vscode>settings.json`文件,来实现项目局部格式化

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



3.



### 问题: 

prettierrc中的内容更改后,自动保存使用的格式化配置还是更改之前的.



### 2.7 ESLint配置及使用

如果使用yarn create vite创建的项目自带的有eslintrc文件，不需要再次安装eslint,只需要配置rules规则.



#### ESLint安装及配置

1.**项目中安装ESLint **

```bash
npm init @eslint/config

# 或者
npx eslint --init

# 使用yarn时，需要先安装eslint插件才可以执行命令
yarn add eslint -D
yarn eslint --init

# pnpm
pnpm eslint --init
```



2.**初始化选择**

* How would you like to use ESLint?
  选择第三条 To check syntax, find problems, and enforce code style ，检查语法、检测问题并强制代码风格。
* What type of modules does your project use?
  采用的 ES6 模块系统导入导出，选择 JavaScript modules (import/export) 。
* Which framework does your project use?
  选择 React 。
* Does your project use TypeScript?
  选择 Yes 后生成的 eslint 配置文件会给我们默认配上支持 Typescript 的 parse 以及插件 plugins 等。
* Where does your code run?
  Browser 和 Node 环境都选上，之后可能会编写一些 node 代码。
* What format do you want your config file to be in?
  选择 JavaScript ，即生成的配置文件是 js 文件，配置更加灵活。
* Would you like to install them now with npm?
  当然 Yes 了～
  

在漫长的安装结束后，项目根目录下多出了新的文件 .eslintrc.cjs ，这便是我们的 eslint 配置文件了。其默认内容如下：

```js
module.exports = {
  parser: {}, // 解析器
  extends: [], // 继承的规则 [扩展]
  plugins: [], // 插件
  rules: {} // 规则
  };
  module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
  "eslint:recommended",
  "plugin:react/recommended",
  "plugin:@typescript-eslint/recommended",
  ],
  overrides: [],
  parser: "@typescript-eslint/parser",
  parserOptions: {
  ecmaVersion: "latest",
  sourceType: "module",
  },
  plugins: ["react", "@typescript-eslint"],
  /*
  * "off" 或 0 ==> 关闭规则
  * "warn" 或 1 ==> 打开的规则作为警告（不影响代码执行）
  * "error" 或 2 ==> 规则作为一个错误（代码不能执行，界面报错）
  */
  rules: {
  'react/react-in-jsx-scope': 'off',
  'no-console': 'error', // 禁止使用console
  'no-unused-vars': 'error',// 禁止定义未使用的变量
  'no-debugger': 'error', // 禁止使用debugger
  'no-var': 'error', // 要求使用 let 或 const 而不是 var
  },
}
```



3.**Prettier和ESLint冲突问题**

如果项目出现规则冲突以后，需要安装以下插件解决冲突，如果未出现冲突，则可以忽略。
安装插件 eslint-plugin-prettier eslint-config-prettier

```bash
npm install eslint-plugin-prettier eslint-config-prettier -D
```

* eslint-config-prettier 的作用是关闭eslint中与prettier相互冲突的规则。
* eslint-plugin-prettier 的作用是赋予eslint用prettier格式化代码的能力。





#### 其它

`.eslintrc.cjs`报错

在`.eslinttc.cjs`文件中,找到env对象,添加`node:true`,设置node环境即可



`.tsconfig.json`报错

将bundler替换成node

```json
"moduleREsolution": "bundler"
//"allowImportingTsExtensions": true,
```



`tsconfig.node.json`报错

将bundler替换成node

```json
"moduleResolution": "node"
```



main.tsx中报错

删除App.tsx的扩展名

导入报错, 在`tsconfig.json`中添加默认导出

```json
"allowImportingTsExtensions": true,
```





#### 配置





### 2.8 Vite配置







## 第3章



### 3-1 初识ReactHook

#### Vue与React比较

| Vue                                    | React                              |
| -------------------------------------- | ---------------------------------- |
| MV*框架                                |                                    |
| 虚拟DOM(算法不同)                      |                                    |
| 专注于视图层                           |                                    |
| 尤雨溪开发                             | Facebook                           |
| @vue/cli vite                          | create-react-app vite              |
| 指令 v-if/v-for/v-model/v-bind/v-show/ | 没有指令                           |
| 框架自动优化性能                       | 手工优化(memo/useMemo/useCallback) |
| 表单(双向绑定) 组件(单向数据流)        | 单向数据流                         |
| SFC(Template/Script/Style)             | JSX(all in js)                     |
| vue-router/vuex/pina elementui         | React-router/redux/mobox, antd     |





### 3-2 JSX语法

#### 什么是jsx?

jsx是javascript的一种衣服啊扩展.



#### 案例

* 变量声明
* 条件判断
* 样式
* 循环
* 属性传递
* 表单事件









