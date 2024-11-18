



### react介绍及基础使用

用来操作dom的,可以换个说法,替换原生操作dom的js的.



### 引入js脚本开发

```html
使用React开发Web项目，我们需要引入两个js脚本：

react.development.js

react 是react核心库，只要使用react就必须要引入
下载地址：https://unpkg.com/react@18.0.0/umd/react.development.js
react-dom.development.js

react-dom 是react的dom包，使用react开发web应用时必须引入
下载地址：https://unpkg.com/react-dom@18.0.0/umd/react-dom.development.js

```



### 3个api

#### React.createElement()

- `React.createElement(eleName, [eleProps], [...eleChildren])`
- 用来创建React元素,最终会通过<u>虚拟dom</u>转换为真实的dom元素
- React元素一旦创建,就无法修改. 因为dom操作太复杂了,只能通过创建新的元素来替换.



```html
<script>

	const button = React.createElement('button', {
    id: 'btn',
    className: 'btnClass',
    onClick: alertFn
  }, '点我一下')
  
  const div = React.creteElement('div', {}, '我是一个div', button)
  const root = ReactDOM.createReact(document.querySelector('root'))
  root.render(div)
  
  function alertFn() {
    alert('alert')
  }
</script>

```



```html

//现在要替换button的内容,只能重新声明一个新的button,然后让react重新渲染.这样只会<<重新渲染button元素>>
<script>
 const button = React.createElement('button', {
    id: 'btn',
    className: 'btnClass',
    onClick: alertFn
  }, '点我一下')
  
  const div = React.creteElement('div', {}, '我是一个div', button)
  const root = ReactDOM.createReact(document.querySelector('root'))
  root.render(div)
  
  function alertFn() {
    alert('alert')
  }
  
  
  
  const btnNode = document.getElementById('btn2')  //html中在id为root的元素之外新声明一个button按钮
    btnNode.addEventListener('click', function(event) {
      const button = React.createElement('button', {
      id: 'btn',
      className: 'btnClass',
      onClick: alertFn
    }, 'clickMe')

    const div = React.creteElement('div', {}, '我是一个div', button)
    const root = ReactDOM.createReact(document.querySelector('root'))
    root.render(div) //用新的div替换旧的div.
  })
  


</script>
```



#### ReactDOM.createRoot()

- `createRoot(container[, options])`
- 用来创建React的根容器，容器用来放置React元素

```html
<script>

	const button = React.createElement('button', {
    id: 'btn',
    className: 'btnClass',
    onClick: alertFn
  }, '点我一下')
  
  const div = React.creteElement('div', {}, '我是一个div', button)
  const root = ReactDOM.createRoot(document.querySelector('root'))
  root.render(div)
  
  // ReactDOM.render(div, document.getElementById('root')) //老版本的用法, 相当于createRoot+render
  
  function alertFn() {
    alert('alert')
  }
</script>
```



#### root.render()

- `root.render(element)`
- 当首次调用时，容器节点里的所有 DOM 元素都会被替换，后续的调用则会使用 React 的 DOM 差分算法（DOM diffing algorithm）进行高效的更新。
- 不会修改容器节点（只会修改容器的子节点）。可以在不覆盖现有子节点的情况下，将组件插入已有的 DOM 节点中。
- 重新渲染时(当重复调用render),react会比较两次渲染结果,对dom做最少的更改



### dom操作和react操作类比

```script
//dom操作
const div = document.createElement('div')
div.innerHTML = '我是一个div元素'
document.getElementById('root').appendChild(div)

//react操作
const div = React.createElement('div', {}, '我是一个div元素')
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(div)
```



















### JSX

#### 基本介绍和使用 

JSX 是 JavaScript 的语法扩展，JSX 使得我们可以以类似于 HTML 的形式去使用 JS。<u>JSX便是React中声明式编程的体现方式</u>。

声明式编程，简单理解就是以结果为导向的编程。使用JSX将我们所期望的网页结构编写出来，然后React再根据JSX自动生成JS代码(使用babel来翻译)。所以我们所编写的JSX代码，最终都会转换为以调用`React.createElement()`创建元素的代码。



使用babel将jsx内容转换成js.

```html
babel下载地址：https://unpkg.com/babel-standalone@6/babel.min.js

<script type="text/babel">
  // 命令式
  // const button = React.createElement('button', {id: 'btn'}, '按钮')
  // const root = ReactDOM.createRoot(document.getElementById('root'))
  // root.render(button)

  // 声明式
  const button = <button>我是按钮222</button>

  const root = ReactDOM.createRoot(document.getElementById('root'))
  root.render(button)
</script>
```



```html
<script>
	
</script>
```



#### 注意事项

1. 不是字符串,不要加引号
2. 有且只有一个根标签
3. **html标签小写开头，React组件大写开头**
4. 标签必须正常闭合.自结束标签必须写斜杠
5. 事件名称必须是驼峰形式,事件对应的必须是函数名称,不能是函数体代码
6. 可以使用**`{}`**插入JS表达式。（表达式：有返回值的语句。JSX也是表达式）
7. 在JSX中, 属性可以直接在标签中设置（class使用className，style必须用{}）
8. 将会忽略`[], false, null, undefined`



#### 渲染列表

注意: JSX中`{}`只能放js表达式,不能放语句,但是语句中可以去操作jsx

```html
	<script type="text/babel">

  const arr = ['孙悟空', '猪八戒', '沙和尚']

  let list = <ul>{arr.map((item, index) => <li key={index}>{item}</li>)}</ul>


  const div = <div> {list} </div>

  const root = ReactDOM.createRoot(document.getElementById("root")); //获取根元素对应的react元素

  root.render(div);
	</script>
```

#### 虚拟DOM

渲染机制, react通过虚拟dom,将react元素和原生dom进行映射,虽然操作react元素,但是这些操作最终都会在真实dom中体现.

虚拟dom的好处:

* 降低dom原生api的复杂度
* 解决兼容问题
* 提升性能,减少dom的不必要操作

通过一个例子来体现:

当在列表中重新渲染时候(root.render()), react通过diffing算法, 将新的元素和旧元素进行比较,通过比较找到发生变化的元素,并且只对发生变化的元素进行修改.

**比较逻辑:**

1. 比较两次数据时, react先比较父元素,父元素不同,直接所有元素全部替换
2. 父元素一致,再去逐个比较子元素,直到找到所有发生变化的元素为止

```html
	<script type="text/babel">


    const arr = ['孙悟空', '猪八戒', '沙和尚']

    let list = <ul>{arr.map((item, index) => <li>{item}</li>)}</ul>

    const button = <button onClick={handleBtnClick}>点我一下</button>

    function handleBtnClick() {
      console.log('按钮被点击了')
      // arr.unshift('唐僧') //第一项不一致,导致其后所有项都会发生变化
      arr.push('唐僧') //前3项一致,所以只有新增项才会发生变化
      
      list = <ul>{arr.map((item, index) => <li key={index}>{item}</li>)}</ul>

      root.render(<div> {list} {button} </div>)
    }

    const div = <div> {list} {button} </div>

		const root = ReactDOM.createRoot(document.getElementById("root")); //获取根元素对应的react元素

		root.render(div);
	</script>
```



**循环中的key值**

上例中的数组循环时候,需要为每一项添加独一无二的key值.

在列表的最后新增一个元素, 没有改变列表其它元素,并不会产生性能问题.

在列表的最前新增一个元素, 其余元素的未知全都发生了变化, 而React默认是根据位置比较元素,所以此时所有元素都会被修改. 所以为列表设计了key属性, 当设置key以后再比较元素时,就会比较元素的key.

```html
	<script type="text/babel">


    const arr = ['孙悟空', '猪八戒', '沙和尚']

    let list = <ul>{arr.map((item, index) => <li key={item}>{item}</li>)}</ul>

    const button = <button onClick={handleBtnClick}>点我一下</button>

    function handleBtnClick() {
      console.log('按钮被点击了')
      arr.unshift('唐僧')
      
      list = <ul>{arr.map((item, index) => <li key={item}>{item}</li>)}</ul>

      root.render(<div> {list} {button} </div>)
    }

    const div = <div> {list} {button} </div>

		const root = ReactDOM.createRoot(document.getElementById("root")); //获取根元素对应的react元素

		root.render(div);
	</script>
```



如果key值是索引,可能会产生问题. 就上面的例子而言, 如果在列表最前面插入新元素的话,那原列表所有元素的key值都发生了变化,都需要重新渲染. 如果元素索引不会发生变化,就可以使用索引当key或者不设置key.











### 手动创建react项目

> 笔记: [创建React项目（手动） – 李立超 | lilichao.com](https://lilichao.com/?p=5710)
>
> 视频: https://www.bilibili.com/video/BV1bS4y1b7NV

我们先手动创建项目,react提供react-scripts包.

##### 手动创建项目的步骤

1. 创建项目, 目录结构如下:

```md
根目录
    - public
        - index.html （添加标签 <div id="root"></div>）
    - src
        - App.js
        - index.js
```

2. 进入所在目录,并执行命令`npm init -y`或`yarn init -y`
3. 安装项目依赖：`npm install react react-dom react-scripts -S` 或 `yarn add react react-dom react-scripts`
4. 运行`npx react-scripts start`启动项目（初次启动需要输入y确认）
   1. 或者将`react-scripts start`设置到`package.json`的scripts选项中，然后通过`npm start`启动（初次启动需要输入y确认）”scripts”: { “start”: “react-scripts start” }



20241118,安装的react, react-dom, react-scripts版本分别是: 

```json
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-scripts": "^5.0.1"
  }
```



**index.html内容**

```html
<!DOCTYPE html>
<html lang="zh">
<head>
   <meta charset="UTF-8">
   <title>Title</title>
</head>
<body>
<div id="root"></div>
</body>
</html>
```



**App.js**

```js
const App = <div><h1>hello world!</h1></div>

export default App;
```



**index.js**

```js
import ReactDom from 'react-dom/client'; //版本18之后,需要在客户端引入时添加client, 服务器上也有对应的名称.
import App from './App'


const root = ReactDom.createRoot(document.getElementById('root'))
root.render(element)
```



##### 启动项目

```bash
npx react-scripts build
```

执行后,会在package.json中生成默认配置,及根目录下生成build文件夹. 为了更方便使用这个命令, 将其配置到package.json文件中.

```json
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build"
  },
```











