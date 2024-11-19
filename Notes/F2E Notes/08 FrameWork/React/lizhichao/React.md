



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
root.render(App)
```



##### 启动项目/构建项目

```bash
npx react-scripts start
npx react-scripts build
```

执行后,会在package.json中生成默认配置,及根目录下生成build文件夹. 为了更方便使用这个命令, 将其配置到package.json文件中.

```json
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build"
  },
```





### 项目练习

#### 1.手动创建项目

具体操作根据上一目录中的内容来操作,同时需要在package.json中添加eslint,用来检查react语法是否正确.

```json
...
"eslintConfig": {
  "extends": [
    "react-app" //会有语法提示, 可选
  ]
}
```

#### 项目介绍

> [练习1：学习记录器 – 李立超 | lilichao.com](https://lilichao.com/?p=5753)

![img](https://my-wp.oss-cn-beijing.aliyuncs.com/wp-content/uploads/2022/04/20220418220344552.png)





##### 页面CSS实现

首先实现其中一个的样式



##### 引入组件

**介绍**

react中有两种组件创建方式:

- 函数式组件(简单, 首推使用)
  - 就是一个返回JSX的普通函数
  - 组件首字母必须大写. ?
- 类组件



函数组件实现:

```js
// src/App.js

const App = function() {
  return <div><h1>hello world</h1></div>
}
export default App

// src/index.js
import ReactDom from 'react-dom/client'
import App from './App'
const root = ReactDom.createRoot(document.getElementById('root'))
root.render(<App/>)
```



类组件实现:

```js
// src/App.js

// 类组件必须继承React.Component
class App extends React.Component {
  
  
  //类组件中,必须添加一个render()方法,且方法的返回值要是一个jsx
  render() {
    return <div>我是一个类组件</div>
  }
}
```



##### 事件

> [事件 – 李立超 | lilichao.com](https://lilichao.com/?p=5730)



原生dom中事件的实现:

```html
//dom0
<button onclick="alert('点击了一下')">
  点击按钮
</button>

//dom2
document.getElementById('btn').addEventListener('click',(event) => {
//...
})
```



react中的事件绑定:

```jsx
const clickHandler = () => {
  alert('点击了一下')
}

const ele = <button onClick={clickHandler}>点击这个按钮</button>
```



注意事项:

* react事件使用驼峰命名法
* 事件属性需要一个函数对象,而不是调用函数



##### 事件对象

React事件也会产生事件对象，在事件的响应函数中可以定义第一个参数来获取事件对象：

```jsx

const clickHandler = (e) => {
  e.preventDefault()
  e.stopPropagation()
}
```



##### props

> [props – 李立超 | lilichao.com](https://lilichao.com/?p=5734)

组件的参数需要通过属性传递，可以像这样向组件中**传递参数**：

```
<Button bgColor='red' color='white'>我是一个按钮</Button>
```

上边的案例中我们设置了两个属性，这些属性会被封装到一个对象中并作为参数传递给Button组件，只需要在Button组件中定义一个参数即可获取，通常这个参数我们会命名为props，像这样：

```jsx

import './Button.css';
const Button = (props) => {
    return <button style={{backgroundColor:props.bgColor, color:props.color}}>{props.children}</button>;
};


export default Button;
```

在组件内部可以通过props.xxx来访问外部传递进的属性，从而达到动态设置的目的。需要注意的是，**标签体(标签之内的内容)**也可以设置为props的一个属性，叫做children，可以通过props.children来获取标签体的内容。

还有一点一定要记住，props中的属性是**只读**属性是无法修改的！

**props.children**

相当于vue中的插槽.使用props.children来接受父组件中当前组件标签之间写入的内容



开发环境下的数据传递与使用: 

> 两种方案, 具体的和解构简写的

```jsx
const Logs = () => {
  return <div className="logs">
    {/* <LogItem date={new Date(2024,11,19,15,30)} desc={'学习react'} time={'40分钟'}/> */}

    {
      resData.map((item,index) => {
        // return <LogItem key={index} date={item.date} desc={item.desc} time={item.time}/>
        return <LogItem key={index} {...item}/>
      })
    }
    
  </div>

}
```





##### state

> [state – 李立超 | lilichao.com](https://lilichao.com/?p=5597)
>
> [state的问题 – 李立超 | lilichao.com](https://lilichao.com/?p=5602)



对应vue中的响应式数据. 如何声明?

* 引入构造函数useState
* 需要在组件(函数组件,类组件)中声明,返回一个数组,数组中有两个参数,一个初始值,另一个是更新响应式数据的函数,会触发组件的重新渲染.

```jsx
import {useState} from 'react'

let [count, setCount] = useState(1)
```

setCount修改的是下一次渲染时候count的值

setCount()会触发组件的重新渲染,它是异步的. 

```jsx
const add = () => {
  setCount(2)
  setCount(3)
  setCount(4) //因为是异步的,所以这3次执行都会放到任务队列中, 也只会执行最后一次.
}
```







##### state注意事项

如果修改的state是一个对象, 然后只修改对象的某个属性,那么这个对象在更改之后,不会触发渲染.

setState会触发组件的重新渲染,但如果是在原对象上更改, 调用setState不会触发重新渲染.

```jsx
const App = () => {
  console.log('app组件执行了,组件创建完成')
  
  let [counter, setCount] = useState({
    name: '孙悟空',
    age: 18
  })
  const update1 = () => {
    counter.name = '猪八戒'
    console.log('add>counter>', counter)  //虽然更改了对象,但是setCount没有触发重新渲染
    setCount(counter)
  }
  const update2 = () => {
    // let counter2 = Object.assign({}, counter)  第一种方案
    // counter2.name = '猪八戒'
    // setCount(counter2)

    setCount({...counter, name: '猪八戒'})  //第二种方案
  }

  return <div className="app">
    <h2>{counter.name}--{counter.age}</h2>
    <button onClick={update1}>+</button>
    <button onClick={update2}>-</button>
  </div>
}
export default App
```



##### state问题

setState()会触发组件的重新渲染,它是异步的. 所以当调用setState(),需要用旧state的值时,要注意,可能会出现计算错误的情况. 

为了避免这种情况, 为setState传递回调函数的形式来修改state

```jsx
const App = () => {
  console.log('app组件执行了,组件创建完成')
  
  let [counte, setCounte] = useState(1)
  const update1 = () => {
		setTimeout(() => {
      setCounte(counte + 1)  // 在1秒内点击两次, coute的值都是相同的旧值,而不是第一次点击后的新counte
    }, 1000)
  }

    const update2 = () => {
    setState(state => state + 1)  //可以获取到state的最新值
  }
    
    
  return <div className="app">
    <h2>{counter.name}--{counter.age}</h2>
    <button onClick={update1}>+</button>
    <button onClick={update2}>+Callback</button>
  </div>
}
export default App
```



##### 获取原生的dom对象-useRef()

 获取原生dom对象

- 原生dom操作
- 从react中获取dom对象
  -  1.创建一个存储Dom对象的容器
    -  使用useRef()钩子函数
      - 钩子函数注意事项:
        - React中的钩子函数只能用于函数组件或自定义钩子
        -  钩子函数只能直接在函数中调用
  - 2.将容器设置为想要获取DOM对象元素的ref属性 //react会自动获取当前元素的dom对象,设置为容器的current属性

```jsx
import {useRef} from 'react'

const App = () => {
  console.log('app组件执行了,组件创建完成')

  // const h2Ref = useRef()
  const h2Ref = {current: null}
  console.log('h2Ref', h2Ref.current) //{current: h2#h2}

  const h2Node = document.getElementById('h2')
  console.log('h2Ref === h2Node', h2Ref.current === h2Node) // true



  const handleBtnClick = () => {
    console.log('h2Ref', h2Ref)
  }
  return <div className="app">
    <h2 id="h2" ref={h2Ref}>hello world</h2>
    <button onClick={handleBtnClick}>+</button>
    <button >+Callback</button>
  </div>
}
export default App

```





useRef()

- 返回一个普通对象, 对象的current属性是一个DOM对象  {current: undefined}
- 我们可以创建一个对象,来代替useRef()返回的对象
- 两者区别: 我们创建的对象,组件每次重新渲染都会创建一个新对象; useRef()创建的对象, 可以确保每次渲染获取到的都是同一个对象
- 使用场景: 当需要一个对象不会因为组件的重新渲染而改变时, 旧可以使用useRef



##### 类组件















