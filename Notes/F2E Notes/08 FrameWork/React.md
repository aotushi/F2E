

## 基本使用

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

- ```
  React.createElement()
  ```

  - `React.createElement(type, [props], [...children])`
  - 用来创建React元素
  - React元素无法修改

- ```
  ReactDOM.createRoot()
  ```

  - `createRoot(container[, options])`
  - 用来创建React的根容器，容器用来放置React元素

- ```
  root.render()
  ```

  - `root.render(element)`
  - 当首次调用时，容器节点里的所有 DOM 元素都会被替换，后续的调用则会使用 React 的 DOM 差分算法（DOM diffing algorithm）进行高效的更新。
  - 不会修改容器节点（只会修改容器的子节点）。可以在不覆盖现有子节点的情况下，将组件插入已有的 DOM 节点中。



### JSX

#### 基本介绍和使用 

JSX 是 JavaScript 的语法扩展，JSX 使得我们可以以类似于 HTML 的形式去使用 JS。JSX便是React中声明式编程的体现方式。声明式编程，简单理解就是以结果为导向的编程。使用JSX将我们所期望的网页结构编写出来，然后React再根据JSX自动生成JS代码。所以我们所编写的JSX代码，最终都会转换为以调用`React.createElement()`创建元素的代码。



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



#### 注意事项

1. 不要加引号
2. 有且只有一个根标签
3. html标签小写开头，React组件大写开头
4. 可以使用{}插入JS表达式。（表达式：有返回值的语句。JSX也是表达式）
5. 属性正常写（class使用className，style必须用{}）
6. 标签必须正常闭合
7. 布尔类型、Null 以及 Undefined 将会忽略



### 渲染列表







### P21 手动创建react项目









