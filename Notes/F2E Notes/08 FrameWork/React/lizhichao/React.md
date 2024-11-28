



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
8. 将会忽略`[], true, false, null, undefined`



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

类组件的props的是存储到类的实例对象中,可以直接通过实例对象访问.

```jsx

//声明标签属性
<User name="孙悟空" age={18} gender={'男'} />

//接受标签属性
import React, {Component} from 'react'

class User extends Component {
  
  render(
  	return <div>
     	<ul>
      	<li>{this.props.name}</li> 
        <li>{this.props.age}</li>
        <li>{this.props.gender}</li>
      </ul>
     </div>
  )
}
```



类组件中的state统一存储到实例对象的state属性中,可以通过this.state来访问, 通过this.setState()来修改

当通过this.setState()修改state时候, 只会修改设置了的属性, 没有设置的不会修改.

在函数组件中, 响应函数直接以函数形式定义在组件中

在类组件中,响应函数是以类的方法定义,之前的属性都会

但是仅限于直接存储在state中的属性.之前的属性都会被保留.

```jsx
import React, {Component} from 'react'

class User extends Component {
  state = {
    count: 0,
    test: 'hhhh'
  }
  
  clickHandler = () => {
    // this.setState({count: this.state.count+1})  //采用这种方式 test也不会丢失
    this.setState(pre => {
      return {
        count: pre + 1
      }
    })
  }
  
  render(
  	return <div>
     	<h1>{this.state.count} -- {this.state.test}</h1>  //test值不会丢失
      <button onClick={clickHandler} >点击</button>
     </div>
  )
}
```



```jsx
import React, {Component} from 'react'

class User extends Component {
  state = {
    count: 0,
    test: 'hhhh',
    obj: {
      name: '孙悟空',
      age: 18
    }
  }
  
  clickHandler = () => {
    // this.setState({count: this.state.count+1})
    this.setState({
      // obj: {name: '猪八戒'}  //obj.age不是直接在state中声明的,所以会丢失,解决方法是对象合并
      obj: {...this.state.obj, name:'猪八戒'}
    })
  }
  
  render(
  	return <div>
     	<h1>{this.state.count} -- {this.state.test} </h1>
      <h1>{this.state.obj.name} -- {this.state.obj.age}</h1>
      <button onClick={clickHandler} >点击</button>
     </div>
  )
}
```



获取DOM对象

1.创建一个属性,用来存储DOM对象. 类组件中使用`React.createRef()`

2.在指定标签上使用这个属性

```jsx

import React, {Component} from 'react'

class User extends Component {

  divRef = React.createRef()
  
  render(
  	return <div ref={this.divRef}>
     	
      <button  >点击</button>
     </div>
  )
}
```



#### card组件

功能类似于vue中的插槽, 提取公共部分,减少代码量.



#### 添加表单

获取表单中的信息:  使用事件+`e.target.value`

禁用表单提交的默认操作: 禁用默认操作 `e.preventDefault()`

点击按钮后清空表单旧数据,

* 非受控组件: 普通变量形式
* 受控组件: 使用react的state, useState

```jsx

// src/Components/LogsForm.js  双向绑定

const LogsForm = (props) => {

  // let inputDate, inputDesc, inputTime;

  const [inputDate , setInputDate] = useState('');
  const [inputDesc , setInputDesc] = useState('');
  const [inputTime, setInputTime] = useState(0);

  const dateChangeHandler = (e) => {
    // inputDate = e.target.value
    setInputDate(e.target.value)
  }

  const descChangeHandler = (e) => {
    // inputDesc = e.target.value
    setInputDesc(e.target.value)
  }

  const timeChangeHandler = (e) => {
    // inputTime = e.target.value
    setInputTime(e.target.value)
  }

  const formSubmitHandler = (e) => {
    e.preventDefault();

    const newLog = {
      date: new Date(inputDate),
      desc: inputDesc,
      time: +inputTime
    };

    console.log('newLog', newLog)

    // 清空
    setInputDate('');
    setInputDesc('');
    setInputTime('');
    }



  return (
    <div className="logs-form">
      <div className="form-item">
        <label htmlFor="date">日期:</label>
        <input onChange={dateChangeHandler} value={inputDate} id="date" type="date" />
      </div>

      <div className="form-item">
        <label htmlFor="desc">内容:</label>
        <input onChange={descChangeHandler} value={inputDesc} id="desc" type="text" />
      </div>

      <div className="form-item">
        <label htmlFor="time">时长:</label>
        <input onChange={timeChangeHandler} value={inputTime} id="time" type="number" />
      </div>

      <div className="form-btn">
        <button onClick={formSubmitHandler}>提交</button>
      </div>
    </div>
  );
};

export default LogsForm;
```



把双向绑定数据集中到一个对象中. 两种方式建议第一种, 单独声明的形式,

```jsx
const LogsForm = (props) => {

  // let inputDate, inputDesc, inputTime;

  // const [inputDate , setInputDate] = useState('');
  // const [inputDesc , setInputDesc] = useState('');
  // const [inputTime, setInputTime] = useState(0);

  const [formData, setFormData ] = useState({
    inputDate: '',
    inputDesc: '',
    inputTime: ''
  })

  const dateChangeHandler = (e) => {
    // inputDate = e.target.value
    // setInputDate(e.target.value)

    setFormData({
      ...formData,
      inputDate: e.target.value
    })
  }

  const descChangeHandler = (e) => {
    // inputDesc = e.target.value
    // setInputDesc(e.target.value)

    setFormData({
      ...formData.inputDesc,
      inputDesc: e.target.value
    })
  }

  const timeChangeHandler = (e) => {
    // inputTime = e.target.value
    // setInputTime(e.target.value)

    setFormData({
      ...formData.inputTime,
      inputTime: e.target.value
    })
  }




  const formSubmitHandler = (e) => {
    e.preventDefault();

    const newLog = {
      date: new Date(formData.inputDate),
      desc: formData.inputDesc,
      time: +(formData.inputTime)
    };

    console.log('newLog', newLog)

    // 清空
    // setInputDate('');
    // setInputDesc('');
    // setInputTime('');

    setFormData({
      inputDate: '',
      inputDesc: '',
      inputTime: ''
    })
    }



  return (
    <div className="logs-form">
      <div className="form-item">
        <label htmlFor="date">日期:</label>
        <input onChange={dateChangeHandler} value={formData.inputDate} id="date" type="date" />
      </div>

      <div className="form-item">
        <label htmlFor="desc">内容:</label>
        <input onChange={descChangeHandler} value={formData.inputDesc} id="desc" type="text" />
      </div>

      <div className="form-item">
        <label htmlFor="time">时长:</label>
        <input onChange={timeChangeHandler} value={formData.inputTime} id="time" type="number" />
      </div>

      <div className="form-btn">
        <button onClick={formSubmitHandler}>提交</button>
      </div>
    </div>
  );
};

export default LogsForm;
```



**数据共享**

使用祖先组件来共享数据: state的提升

子组件传递数据=> 父组件 使用props的回调函数形式  中间可以间隔多个组件调用初始的函数

父组件传递数据=> 子组件 使用props

```jsx
// src/App.js 

const onSaveLog = (newLog) => {
    setLogsData([newLog, ...logsData]);
  };

  return (
    <div className="app">
      <LogsForm onSaveLog={onSaveLog} />
      <Logs LogsData={logsData} />
    </div>
  );
};
```



**删除数据**

将处理函数传递给子组件,在传递给子组件, 在最后的子组件中直接调用这个函数.





#### **创建自定义confirmModal(dialog)**

##### 创建逻辑



##### 存在问题

弹窗组件confirmModal展示以后, 可以点击多个触发其展示的组件logItem的删除按钮, 也就是会显示多个.使用幕布(背景层)来禁用触发,纯css实现. 

这个地方应该也能使用单例模式来实现.





#### 使用portal修改项目

原因: 因为只在特定使用删除组件, 耦合严重,可能存在的衍生css样式问题多. 

解决方案是,使用react的传送门portal功能, 其作用是将组件渲染到指定位置.



使用步骤:

1. 在index.html新增一个html元素
2. 修改组件的渲染方式
   1. 通过`ReactDOM.createPortal()`作为返回值创建元素
   2. 参数: 
      1. jsx(修改前return后的代码)
      2. 目标位置(DOM元素)

```html
//public/index.html

<body>
  <div id="root"></div>
  <div id="backdrop"></div>
</body>

```



```jsx
// src/Components/Backdrop/Backdrop.js

//因为弹窗组件confirmModal是包裹在Backdrop组件中的,所以我们将在Backdrop组件中使用portal功能

import ReactDOM from 'react-dom';

//修改前
const Backdrop = (props) => {
  return <div className="backdrop">{props.children}</div>
}

//修改后
const backdropRoot = document.getElementById('backdrop-root')
const Backdrop = (props) => {
  return ReactDOM.createPortal(
  	<div className="backdrop">{props.children}</div>,
  	backdropRoot
  )
}
```



#### 过滤功能

filter筛选



### 自动创建项目

使用包来创建react项目

```bash
npx create-react-app  名字
```



#### 项目解构

##### package.json

'eject': 慎用, 相关webpack配置.

'test': 单元测试相关.

##### public

manifest.json: 

应用配置文件说明 webapp相关的配置

robots.txt

爬虫规则



#### 内联样式和样式表, CSS模块



```jsx
// src/App.js
// src/App.css

App.css中的样式是全局的,没有作用域, 存在样式覆盖问题. 使用CSS模块来解决没有作用域的问题.
```

##### 如何创建CSS模块

1.创建xx.module.css

2.在组件中引入css

3.通过classes设置类 `<p className={claess.p1} />`  会生成唯一的class值

```jsx
import classes from './App.module.css'


```



#### Fragment

类似于vue中的template, 返回子组件,不会创建任何多余的元素. 

react中的`React.Fragment`起到这个作用.

使用方式:

1.自定义实现Fragment

2.`React.Fragment`

3.简写`React.Fragment` ==> `<>`



```jsx

const Out = (props) => {
  return (
		{
      props.children
    }
	)
}
export default Out
```



### 项目-订餐应用

#### 实现适配

```jsx
//src/Index.js

document.documentElement.style.fontSize = 100/705 * 'vw';

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
	<React.StrictMode>
  	<App />
  </React.StrictMode>
)
```

#### 开发

![20220506173307498-1536x831](C:\PersonalData\F2E\Notes\F2E Notes\08 FrameWork\React\lizhichao\assets\20220506173307498-1536x831.png)



![img](https://my-wp.oss-cn-beijing.aliyuncs.com/wp-content/uploads/2022/05/20220506213746650-1024x579.png)

##### Meal组件



##### counter组件

注意: jsx中使用逻辑判断时候, 带出多个标签时如何处理?

```jsx
  return (
    <div className={classes.counter}>
      {!!props.amount && <Fragment></Fragment><button className={classes.sub}>-</button>) && (<span className={classes.num}>{props.amount}</span></Fragment>}
      <button className={classes.add}>+</button>
    </div>
  );
```



##### 使用图表字体代替按钮符号

> https://docs.fontawesome.com/web/use-with/react

字体基线问题导致按钮符号偏下. 使用fontawesome

安装依赖

```
npm i --save @fortawesome/fontawesome-svg-core

npm i --save @fortawesome/free-solid-svg-icons
npm i --save @fortawesome/free-regular-svg-icons
npm i --save @fortawesome/free-brands-svg-icons


npm i --save @fortawesome/react-fontawesome@latest

```



引入组件

```jsx
import {fontAwesome} from '@fortawesome/fontawesome-svg-core'

```



引入图标

```js
import {faPlus, faMinus} from '@fortawesome/free-solid-svg-icons'
```

使用图标

```jsx
<FontAwesomeIcon icon={faPlus} />
```



##### Meals数据传递

数据要存放在使用它的组件的父组件之中.



##### 添加删除购物车中的商品

如果使用props方式传递回调函数的话, 但是传递层级多.



##### Context的使用

组件之间的通信:
在React中组件间的数据通信是通过props进行的，父组件给子组件设置props，子组件给后代组件设置props，props在组件间自上向下（父传子）的逐层传递数据。但并不是所有的数据都适合这种传递方式

Context为我们提供了一种在不同组件间共享数据的方式，它不再拘泥于props刻板的逐层传递，而是在外层组件中统一设置，设置后内层所有的组件都可以访问到Context中所存储的数据。



创建Context:

```js
const myContext = React.createContext(defaultValue)
```

defaultValue可以是任意类型的值.



两种使用方式:

首先,使用Xxx.Consumer组件来创建元素

```js
// src/store/Xxx.js

const Xxx = React.createContext({name:'孙悟空',age: 28})

export default Xxx
```



1.使用`组件+回调函数+入参`的形式来创建

```jsx
import Xxx from './stroe/Xxxd'



(
	<Xxx.Consumer>
  	{
      (ctx) => {   
        return <div>
        	{ctx.}  //可以访问ctx中的内容
        </div>
      }
    }
  </Xxx.Consumer>
)
```



2.使用钩子函数`useContext(导入的内容)`  推荐使用

```jsx
import Xxx from '../strore/Xxx'

const B = () => {
  return <>
  	const cusContext = useContext(Xxx)
  </>
}
```



以上是使用消费者的内容,, 但是使用前是需要生产者`Xxx.provider`来提供响应数据的. 

```jsx
import Xxx from '../store/Xxx'


const App = () => {
  return <div>
    <A/>  //A组件中访问不了生产者提供的数据
  	<Xxx.provider value={{name:'猪八戒', age:18}}>
    	
      <B/>
      <C/>
    </Xxx.provider>
  </div>
}
```



context的嵌套

* 组件访问context时遵循就近原则

* 如果没有Provider, 则读取Context的初始化属性

```jsx
import Xxx from '../store/Xxx'


const App = () => {
  return <div>
    <A/>  //A组件中访问不了生产者提供的数据
  	<Xxx.provider value={{name:'猪八戒', age:18}}>
      <B/>
      <Xxx2.provider value={{name:'沙和尚', age: 38}}>
      	<C/>
      </Xxx2.provider>
    </Xxx.provider>
  </div>
}
```



##### 搜索框实现

过滤

##### 购物车及购物车详情的显示与隐藏

注意事项:

```jsx
  const toggleShowCartDetail = () => {
    // setShowCartDetail(!showCartDetail);
    setShowCartDetail(preState => !preState);

  }
```



backdrop中的冒泡

1.props的扩展运算符用法

```jsx
const Backdrop = (props) => {
  return (
    ReactDOM.createPortal(<div {...props} className={`${classes.backdrop} ${props.className}`} >{props.children}</div>, backdropRoot)
  );
};

export default Backdrop;
```





##### 结账页面 + 支付条



### React副作用Effect

订餐应用中的潜在的问题:

* 购物车中商品清空以后, 购物车还显示
* 结账页面中商品清空以后, 页面还显示



关于第一个问题,在采用最新方案之前,我是通过props的回调函数方式:

* 在cartDetail组件上, 调用了父组件cart中的`toggleShowCartDetail`来触发购物车的显示/隐藏, 调用了
* 在cartDetail组件中, 调用了`<Meal>`组件外层div上的lcick事件, 触发父组件的`toggleShowCartDetail`方法



新的解决方案:

> 在组件每次重新渲染时候, 检查商品的总数量,如果数量是0,则修改showDetails为false 
>
> 组件每次重新渲染, 组件的函数都会执行.

以下方案会报错, 死循环

```jsx
if (ctx.totalAmount === 0) {
  setShowDetails(false)
}
```



#### **Effect(副作用)**

> [Effect – 李立超 | lilichao.com](https://lilichao.com/?p=5646)

React组件有部分逻辑都可以直接编写到组件的函数体中的，像是对数组调用filter、map等方法，像是判断某个组件是否显示等。但是有一部分逻辑如果直接写在函数体中，会影响到组件的渲染，这部分会产生“副作用”的代码，是一定不能直接写在函数体中。

##### React.strictMode

> 如果你的React使用了严格模式，也就是在React中使用了`React.StrictMode`标签，那么React会非常“智能”的去检查你的组件中是否写有副作用的代码.
>
> 官网说明: 
>
> Strict mode can’t automatically detect side effects for you, but it can help you spot them by making them a little more deterministic. This is done by intentionally double-invoking the following functions:
>
> - Class component `constructor`, `render`, and `shouldComponentUpdate` methods
> - Class component static `getDerivedStateFromProps` method
> - Function component bodies
> - State updater functions (the first argument to `setState`)
> - Functions passed to `useState`, `useMemo`, or `useReducer`

也就是,开发模式下且开启严格模式后, 以上函数会被调用两次. 如果你的浏览器中安装了React Developer Tools，第二次调用会显示为灰色。

```jsx
<React.StrictMode>
	<App/>
</React.StrictMode>
```





##### 背景问题:

当前state和旧值相同时候, 它是不会触发组件的重新渲染的. 但在案例中却不是这样的.

```jsx
// src/App.js
import React from 'react';
import B from './B'
const App = (props) => {
  console.log('app组件重新渲染')
  const [count, setCount] = React.useState(0);

  const onClickHandler = () => {
    console.log('点击了按钮')
    setCount(1)
  }
  return (
    <div>这是app组件
      <B />
      <div><button onClick={onClickHandler}>点击按钮</button></div>
    </div>
  );
};

export default App;


// src/B.js
import React from 'react';

const B = (props) => {
  console.log('b组件渲染了')
  return (
    <div>B组件</div>
  );
};

export default B;
```



**现象描述:**

1.页面刷新以后, 打印了`app组件重新渲染, b组件渲染了`

2.点击按钮以后,打印了`点击了按钮; app组件重新渲染; b组件渲染了`

3.再次点击按钮以后, 打印了`点击了按钮; app组件重新渲染`

4.再次点击按钮以后, 打印`点击了按钮`



**现象归因**

首先,需要了解以下setState方法的执行流程(函数组件中的,类组件中的顺序不太一样)

* 它会首先判断,组件处于什么阶段?
* 如果是渲染阶段: 不会检查state的值是否相同. (也就是重复调用的问题原因)
* 如果是非渲染阶段: 会检查state的值是否相同.
  * 如果值不相同, 则对组件进行重新渲染
  * 如果值相同, React在一些情况下会继续执行当前组件的渲染
    * 但是这个渲染不会触发其子组件的渲染, 这次渲染也不会产生实际的效果. 这种情况通常发生在值第一次相同时(3)



##### 使用Effect

> 钩子函数`useEffect()`，Effect的翻译过来就是副作用，专门用来处理那些不能直接写在组件内部的代码。
>
> 哪些代码不能直接写在组件内部呢？像是：获取数据、记录日志、检查登录、设置定时器等。简单来说，就是那些和组件渲染无关，但却有可能对组件产生副作用的代码。

语法

```jsx
useEffect(()=>{
    /* 编写那些会产生副作用的代码 */
});
```

`useEffect()`中的回调函数会在组件每次渲染完毕之后执行, React会确保effect每次运行时，DOM都已经更新完毕。.



##### 限制Effect

> 组件每次渲染effect都会执行，这似乎并不总那么必要。因此在`useEffect()`中我们可以限制effect的执行时机，在`useEffect()`中可以将一个数组作为第二个参数传递，像是这样：
>
> 设置以后effect只有在变量a或b发生变化时才会执行。这样即可限制effect的执行次数，也可以直接传递一个空数组，如果是空数组，那么effect只会执行一次。

```jsx
useEffect(()=>{
    /* 编写那些会产生副作用的代码 */

    return () => {
        /* 这个函数会在下一次effect执行前调用 */
    };
}, [a, b]);
```

例如,在餐饮项目中购物车页面中, 触发Effect执行有下面几种情况:

1. 初始化
2. 点击`+`按钮时
3. 点击购物车条时(没有必要)

所以我们想去除非必要情况下useEffect的执行, 就需要使用useEffect的第二个参数, 这个参数是一个数组, 数组内部需要传递依赖的值, 只有当依赖的值发生变化后, 才会执行useEffect函数.

```jsx
// 购物车 src/Components/Cart.js

  // 使用useEffect
  useEffect(() => {
    console.log('useEffect执行了')
    if (cardContext.totalAmount === 0) {
      setShowCartDetail(false);
      setShowCheckout(false);
    }
  }, [cardContext, setShowCartDetail, setShowCheckout])

// 去除setState
  // 使用useEffect
  useEffect(() => {
    console.log('useEffect执行了')
    if (cardContext.totalAmount === 0) {
      setShowCartDetail(false);
      setShowCheckout(false);
    }
  }, [cardContext])
```

**注意:**

* 通常会将useEffect使用的局部变量设置为依赖项, 这样可以确保这些值发生变化时,会触发useEffect的执行; 像setState()是由钩子函数useState()生成的, useState()会确保每次渲染都会获取到相同的setState()对象, 所以setState方法可以不设置到依赖项中.
* 如果设置了一个空数组, 则意味着useEffct只会在组件初始化时触发一次.



##### 在餐饮项目输入框中采用useEffect方案  / 清除Effect

```jsx
const FilterMeals = (props) => {

  const [inputVal, setInputVal] = useState('');
  const onInputSearchHandler = (e) => {
    setInputVal(e.target.value.trim());
    // props.onFilter(e.target.value) 旧方案
  }
  useEffect(() => {
    console.log('useEffect执行了')
    props.onFilter(inputVal);
  }, [inputVal])
  return (
    <div className={classes.filterMeals}>
      <FontAwesomeIcon icon={faSearch} className={classes.searchIcon}/>
      <input value={inputVal} onChange={onInputSearchHandler}type="text" className={classes.searchInput} />
      <h2 style={{fontSize: '40rem', color: "red"}}>{inputVal}</h2>
    </div>
  )
}

export default FilterMeals
```

存在的问题:

每次键盘输入时,都会触发useEffect函数. 不合理. 需要将此触发次数. 处理方案: 当用户停止输入1秒后, 才做查询. 

```jsx
// src/Components/Meals/filterMeal

  useEffect(() => {
    setTimeout(() => {
      console.log('useEffect执行了')
      props.onFilter(inputVal);
    }, 1000)
  }, [inputVal])
```

但是这样做的话,依然会有问题. 打印信息不会减少, 只是延迟了一秒后再执行而已, 并没有解决我们的问题.  <u>所以, 在开启一个定时器之前, 应该关掉上一次.</u>

所以,引入了useEffect的`清理函数`, 它会再useEffect下次执行前调用.

```jsx
// src/Components/Meals/filterMeal

  useEffect(() => {
    
    let timer = setTimeout(() => {
      console.log('useEffect执行了')
      props.onFilter(inputVal);
    }, 1000)
    
    
		return () => { // 清理函数
      clearTimeout(timer)
      
    }
  }, [inputVal])
```



### Reducer

> [Reducer – 李立超 | lilichao.com](https://lilichao.com/?p=5650)



#### 使用背景

为了解决复杂state带来的不便, React引入了reducer来整合state的复杂操作.

例如,我们在餐饮项目中引入了`React.createContext`来实现全局通信, 但是cardData这个state的更新需要多个函数方法, 可以引入reducer来整合.

```jsx
// src/store/cardContext.js
import React from "react";

const CardContext = React.createContext({
  items: [],
  totalAmount: 0,
  totalPrice: 0,
  addItem: (item) => {},
  removeItem: (id) => {},
  clearItem: () => {},
});


export default CardContext;

// src/App.js
import CardContext from './store/CardContext'
const App = () => {
    // 存储购物车数据
  const [cardData, setCardData] = useState({
    items: [],
    totalAmount: 0,
    totalPrice: 0,
  });
  
  const addItem = () => {};
  const removeItem = () => {};
  const clearItem = () => {};
  
  //...
  
  return (
  	<CardContext.Provider value={ ...cardData, addItem, subItem, clearItem}>
    	<FilterMeals onFilter={filterHandler} />
      <Meals meals={mealsData} clearable />
      <Cart />
    </CardContext.Provider>
  )
}
```



#### 语法

```jsx
const [state, dispathFn] = useReducer(reduceFn, initialArg, initFn)
```

* 返参:返回值和useState相似, state用来读取state的值, 第二个返参是'派发器', 通过它可以向`reducerFn()`函数发送不同的指令, 控制`reducerFn()`做不同的操作.
* 入参:
  * `reducerFn`: 一个函数,是所谓的整合器.它的返回值会称为新的state的值. 当调用dispathFn时,dispatchFn会将消息发送给`reducerFn()`, 然后`reducerFn()`可以根据不同的消息对state进行不同的处理. 
    * `reducerFn(state, action)`入参:
    * state 当前最新的state的值
    * action 需要一个对象, 在对象中会存储dispatch所发送的指令
  * `initialArg`: 就是state的初始值.
  * `initFn`, 暂时忽略



**注意事项**

`reducerFn`函数需要定在在函数组件的外部, 因为每次组件渲染都会生成一个新的reducerFn



基本使用:

```jsx
import React from "react";

const App = (props) => {
  // const [count, setCount] = React.useState(0);

  const reducerFn = (state, action) => {
    switch (action.type) {
      case "ADD":
        return state + 1;
      case "SUB":
        return state - 1;
      default:
        return state;
    }
  };

  const [count, dispatchCount] = React.useReducer(reducerFn, 0);

  const onAddHandler = () => {
    // dispatchCount("ADD"); 非对象入参也好用
    dispatchCount({type: 'ADD'})
  };
  const onSubHandler = () => {
    // dispatchCount("SUB");
    dispatchCount({type: 'SUB'})
  };

  return (
    <div>
      App组件
      <div
        style={{ width: "300px", height: "300px", backgroundColor: "#bfa", margin: "50rem auto", textAlign: "center", fontSize: "40px" }}
      >
        <button onClick={onSubHandler}>-</button>
        {count}
        <button onClick={onAddHandler}>+</button>
      </div>
    </div>
  );
};

export default App;
```



好了,让我更改餐饮项目中CardData中的操作方法,将其集中到reducer中

```jsx
// src/App.js
import CardContext from "./store/CardContext";

  const reducerFn = (state, action) => {
    const newCardData = { ...state };

    switch (action.type) {
      case "ADD":
        if (newCardData.items.find((item) => item.id === action.meal.id)) {
          // 已经存在
          action.meal.amount += 1;
        } else {
          // 不存在
          action.meal.amount = 1;
          newCardData.items.push(action.meal);
        }
        newCardData.totalPrice += action.meal.price;
        newCardData.totalAmount += 1;
        newCardData.totalPrice += action.meal.price;
        return newCardData;
      case "SUB":
        action.meal.amount -= 1;
        if (action.meal.amount === 0) {
          newCardData.items.splice(newCardData.items.indexOf(action.meal), 1);
        }
        newCardData.totalPrice -= action.meal.price;
        newCardData.totalAmount -= 1;
        newCardData.totalPrice -= action.meal.price;
        return newCardData;
      case "CLEAR":
        newCardData.items.forEach((item) => delete item.amount);
        newCardData.items = [];
        newCardData.totalAmount = 0;
        newCardData.totalPrice = 0;

        return newCardData;
      default:
        return state;
    }
  }
  
  
  
  const App = () => {
    //...
    let initalArgs = {
      items: [],
      totalAmount: 0,
      totalPrice: 0,
    }
    const [cardData, dispatchCardData ] = useReducer(reducerFn, initialArgs)
    
    
    
    return (
    	  return (
          <CardContext.Provider value={{ ...cardData, dispatchCardData}}>
            <FilterMeals onFilter={filterHandler} />
            <Meals meals={mealsData} clearable />
            <Cart />

          </CardContext.Provider>
  );
    )
  }
  
  
  
 // src/store/CardData.js
  
  const CardData = React.createContext({
    items: [],
    totalAmount: 0,
    totalPrice: 0,
    dispatchCardData: () => {}
  })
```

更新了以后, 点击新增/删除按钮, 数量会以2的倍数进行更新? 是因为我们在开发环境+严格模式下进行的开发.

```jsx
// index.js

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```



### React.memo

#### 背景

> 对组件进行缓存

#### 介绍

是一个高阶组件,接受另一个组件做为参数,返回一个包装过的新组件. 新组件具有缓存功能.

<u>包装过后, 只有组件的props发生变化,才会触发组件的重新渲染,否则总是返回缓存中的结果.</u> 



```jsx
// src/App.js
const App = (props) => {
  console.log('app组件渲染了')

  const clickHandler = () => {
    console.log('点击了按钮')
    setCount(count + 1)
  }

  const [count, setCount] = React.useState(0);
  return (
    <div>
      <h3>App组件</h3>
      <button onClick={clickHandler}>点击按钮{count}</button>
      <B />
    </div>
  );
};



import React from 'react';
import B from './B';


const A = (props) => {
  console.log('A组件渲染了')
  const [count, setCount] = React.useState(1);
  const addHandler = () => {
    setCount(preCount => preCount + 1)
  }
  const test = count % 4 === 0
  console.log('test', count, test)
  return (
    <>
    <h2>A组件 -- {count}</h2>
    <button onClick={addHandler}>增加</button>
    <button onClick={props.onAdd} >增加App</button>
    <B test={test} />
    </>
  );
};

export default React.memo(A)



// B.js
import React from 'react';

const B = (props) => {
  console.log('b组件渲染了')
  return (
    <>
    <div>这是B组件</div>
    <p>{props.test && 'haha'}</p>  //只有当props发生变化时, 才会重新渲染
    </>
  );
};

export default React.memo(B)
```





### React.useCallback()

#### 背景

> 一个钩子函数, 用来创建react中的回调函数. 其创建的回调函数不会总在组件重新渲染时重新创建.



设置一种场景, 使React.memo失效

```jsx
import React from 'react';
import B from './B';


const A = (props) => {
  console.log('A组件渲染了')
  const [count, setCount] = React.useState(1);
  const addHandler = () => {
    setCount(preCount => preCount + 1)
  }
  const test = count % 4 === 0
  return (
    <>
    <h2>A组件 -- {count}</h2>
    <button onClick={addHandler}>增加</button>
    <button onClick={props.onAdd} >增加App</button>  //调用App组件中的方法, 触发state的更新, A组件会重新渲染,即便使用了React.memo方法
    
    <B test={test} />
    </>
  );
};

export default React.memo(A)
```



使用useCallbact钩子来避免重新渲染问题:

```jsx
import React from 'react';
import A from './A';


const App = (props) => {
  console.log('app组件渲染了')

  const clickHandler = () => {
    console.log('点击了按钮')
    setCount(count + 1)
  }

  const [count, setCount] = React.useState(0);

  const onAddHandler = () => {
    setCount(count + 1)
  }
  return (
    <div>
      <h3>App组件 -- {count}</h3>
      <button onClick={clickHandler}>点击按钮{count}</button>
      <A onAdd={onAddHandler}/>
    </div>
  );
};

export default App;
```



#### 语法

```jsx
useCallback(cbFn, devArr)
```

1.回调函数

2.依赖数组

* 当依赖数组中的变量发生变化时, 回调函数才会执行, (包括空数组)
* 如果不指定依赖数组, 回调函数每次都会执行

一定要将回调函数中使用的所有变量都设置到依赖数组中(除了setState). 否则回调函数永远都是初始化哪个回调函数, 其作用域都会是初始化哪个作用域.



### Strapi了解使用

> [Strapi – 李立超 | lilichao.com](https://lilichao.com/?p=6156)



#### 是什么

> Strapi就是一个API的管理系统，通过Strapi我们可以直接以网页的形式去定义自己的API、包括设置模型、权限等功能。有了Strapi我们无需编写代码便可开发出功能强大的API。



#### 创建项目

```bash
//npm
npx create-strapi-app@latest my-project --quickstart

//yarn
yarn create strapi-app my-project --quickstart
```



#### 基本配置

##### 启动项目

> npm run develop



##### 配置显示语言

> src/admin/admin.example.js



### Fetch

#### fetch的两种使用方法

使用then,catch

```jsx

useEffect(() => {
  fetch("http://localhost:1337/api/student")
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        // 抛出一个错误
        throw new Error('数据请求失败')
      })
      .then((res) => {
        setLoading(false)
        setStuData(res.data);
      })
      .catch((err) => {
        console.log("err>", err);
        setLoading(false)
        // 设置一个错误状态
        setError(err.message)
      });
}, [])
```



使用await

注意, useEffect中不能使用async函数

```jsx
// 如下使用方法会报错

useEffect(async() => {
  let res = await fetch("http://localhost:1337/api/students")
})

// 解决方案
useEffect(() => {
  const fetchData = async () => {
    const res = await fetch("http://localhost:1337/api/students")
  }
  
  fetchData()
}, [])
```



#### 删除数据





### 自定义钩子

钩子函数只能放在组件内部或自定义钩子当中

Reaact中的钩子函数只能在函数组件或自定义钩子中调用. 当我们需要将react中的钩子函数提取到一个公共区域时,旧可以使用自定义钩子.

自定义钩子其实就是一个普通函数, 只是它的名字需要使用use开头.



### Redux

> "一个专为JS应用设计的可预期的状态容器"







#### 在网页中使用

##### 使用步骤

1. 引入redux
2. 创建reducer整合函数
3. 通过reducer对象创建store (容器)
4. 对store中的state进行订阅
5. 通过dispatch派发state的操作指令



state表示当前state, 可以根据这个state生成心的state

action是一个js对象, 他里面会保存操作的信息

* type表示操作的类型
* 其它需要传递的参数, 也可以在action中设置



##### 基本案例

state是一个原始值,但只是案例,也没有必要使用redux. 通常情况下redux中的state是一个对象.

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <script src="https://cdn.bootcdn.net/ajax/libs/redux/4.0.5/redux.min.js"></script>
  <title>Document</title>
</head>
<body>
  <button id="add">+</button>
  <span id="content">1</span>
  <button id="sub">-</button>
</body>
<script>
  const addNode = document.getElementById('add')
  const subNode = document.getElementById('sub')
  const contentNode = document.getElementById('content')
  let count = 1;

  const store = Redux.createStore(reducer, 1)

  function reducer(state, action) {
    switch (action.type) {
      case 'ADD':
        return state + 1
      case 'SUB':
        return state - 1
      default:
        return state
    }
  }

  store.subscribe(() => {
    count = store.getState()
    contentNode.innerHTML = count
  })

  addNode.addEventListener('click', () => {
    count += 1
    // contentNode.innerHTML = count
    store.dispatch({ type: 'ADD' })
  })

  subNode.addEventListener('click', () => {
    count -= 1
    // contentNode.innerHTML = count
    store.dispatch({ type: 'SUB' })
  })
</script>
</html>
```





#### 案例中存在的问题



##### 存在的问题

1. 如果state过于复杂, 将会非常难以维护
   1. 对state进行分组

2. state每次操作时,都是需要对state进行复制,然后再去修改

3. case后面的常量维护起来比较麻烦



##### 如何解决

使用Redux ToolKit(RTK). 另一种使用redux的方式.处理redux过程中的重复性工作,简化redux中的各种操作.



### RTK

> [Redux Toolkit（RTK） – 李立超 | lilichao.com](https://lilichao.com/?p=6210)

##### react中引入Redux

```bash
//旧方式
npm install -S redux react-redux
yarn add redux react-redux

//新方式
npm install react-redux @reduxjs/toolkit -S
yarn add react-redux @reduxjs/toolkit


```



在src/store目录下创建相关配置文件, 我们以最简单的index.js为例:

```js

import {createSlice, configureStore} from '@redux/toolkit'

const counterSlice = createSlice({
  name: 'counter',
  initialState: {value:0},
  reducers: {
    increment: state => {
      state.value += 1
    },
    decrement: state => {
      state.value -= 1
    }
  }
})

export const {increment, decrement} = counterSlice.actions;


//创建容器
const store = configureStore({
  reducer: {
    counter: counterSlice,reducer
  }
})

export default store
```



```jsx
//src/index.js

import store from './store'
import {Provider} from 'react-redux'

//...
root.render(
	<Provider store={store}>
  	<App/>
  </Provider>
)
```



```jsx
//src/App.js

import {useSelector, useDispatch} from 'react-redux'
import {increment, decrement} from '.store/index'

const App = () => {
  const counter = useSelector(state => state.value)
  const dispatch = useDispatch()
  
  return (
  	<>
    	<button onClick={dispatch(increment())}>+</button>
    	<span>{counter.value}</span>
    	<button onClick={dispatch(decrement())}>-</button>    
    </>
  )
}
```





















