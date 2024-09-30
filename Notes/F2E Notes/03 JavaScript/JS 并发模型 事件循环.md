
# 事件循环

## 事件循环机制Event Loop

### 资料

> https://zhuanlan.zhihu.com/p/33058983
>
> https://mp.weixin.qq.com/s/58UhR2OkGv06RKHAdh-SrQ



### 事件循环

#### 背景
为什么JavaScript需要事件循环呢？
因为JavaScript是一种单线程的语言，也就是说它一次只能执行一个任务。如果遇到了耗时的操作，比如网络请求或定时器，那么整个程序就会被阻塞，无法响应用户的交互。
**为了解决这个阻塞问题**，JavaScript采用了异步编程的方式，将耗时的操作交给浏览器或Node.js等环境去处理，而自己继续执行后面的代码。
**当耗时的操作完成后**，它们会产生一个消息（message），并放入一个消息队列（message queue）中等待被处理。
**那么什么时候处理这些消息呢**？这就需要事件循环来协调。简单地说，事件循环就是不断地检查消息队列中是否有待处理的消息，如果有，就取出消息并调用相应的函数来处理它。每个消息都会完整地处理完毕，然后再处理下一个消息。这样可以保证函数运行时不会被打断或干扰

下图是描述事件循环:
![](https://developer.mozilla.org/en-US/docs/Web/JavaScript/EventLoop/the_javascript_runtime_environment_example.svg)

图中的stack表示函数调用栈（call stack），heap表示对象分配的内存区域（heap），queue表示消息队列（message queue）
* 函数调用栈是用来存储当前正在执行或等待执行的函数调用信息（比如参数、返回地址、局部变量等）的数据结构。每当有一个新的函数调用发生时，就会创建一个新的帧（frame）并压入栈顶；每当有一个函数返回时，就会弹出栈顶的帧并恢复之前的执行状态。
* 堆是用来存储对象（object）和其他复杂数据类型（比如数组、字符串等）分配空间和引用关系
* 消息队列是用来存储异步操作产生


#### 2.可视化

> [JS Visualizer 9000 (jsv9000.app)](https://www.jsv9000.app/)

![Event Loop](https://wx1.sinaimg.cn/large/66fd066bgy1h05megk18vg224y1hge81.gif)

来源:[知乎](https://zhuanlan.zhihu.com/p/33058983?utm_source=com.microsoft.todos&utm_medium=social&utm_oi=41541510889472)



#### 3.浏览器环境下JS引擎的事件循环机制

##### 1.执行栈与事件队列

当javascript代码执行的时候会将不同的变量存于内存中的不同位置：堆（heap）和栈（stack）中来加以区分。其中，堆里存放着一些对象。而栈中则存放着一些基础类型变量以及对象的指针。 但是我们这里说的执行栈和上面这个栈的意义却有些不同。



**执行栈**  

> JS方法排队的地方

当我们调用一个方法的时候，js会生成一个与这个方法对应的执行环境（context），又叫执行上下文。这个执行环境中存在着这个方法的私有作用域，上层作用域的指向，方法的参数，这个作用域中定义的变量以及这个作用域的this对象。 而当一系列方法被依次调用的时候，因为js是单线程的，同一时间只能执行一个方法，于是这些方法被排队在一个单独的地方.



**同步代码执行顺序**

1. 当一个脚本第一次执行的时候，js引擎会解析这段代码，并将其中的<span style="color:blue">同步代码按照执行顺序加入执行栈中，然后从头开始执行</span>。

2. 如果当前<u>执行的是一个方法</u>，那么js会向执行栈中添加这个方法的执行环境，然后进入这个执行环境继续执行其中的代码。

3. 当这个执行环境中的代码 执行完毕并返回结果后，js会退出这个执行环境并把这个执行环境销毁，回到上一个方法的执行环境。。

4. 这个过程反复进行，直到执行栈中的代码全部执行完毕。

下图直观的展示了这个过程,其中的global就是初次运行脚本向执行栈中加入的代码:

![](https://pic2.zhimg.com/v2-2f761eb83b50f53d741e6aa1f15a9db1_b.webp)



**同步代码执行的特点**

* 一个方法执行会向执行栈中加入这个方法的执行环境，在这个执行环境中还可以调用其他方法，甚至是自己，其结果不过是在执行栈中再添加一个执行环境。

* 这个过程可以是无限进行下去的，除非发生了栈溢出，即超过了所能使用内存的最大值。



异步代码执行

js的另一大特点是非阻塞，实现这一点的关键在于下面要说的这项机制——事件队列（Task Queue）。

1. js引擎遇到一个异步事件后并不会一直等待其返回结果，而是会将这个<u>事件挂起</u>，继续执行执行栈中的其他任务。

2. 当一个异步事件返回结果后，js会将这个事件加入与当前执行栈不同的另一个队列，我们称之为<u>事件队列</u>。

3. 被放入事件队列不会立刻执行其回调，而是等待当前执行栈中的所有任务都执行完毕， 主线程处于闲置状态时，主线程会去查找事件队列是否有任务。

   ​	3.1如果有，那么主线程会从中取出排在第一位的事件，<u>并把这个事件对应的回调放入执行栈中，然后执行其中的同步代码</u>...

4. 如此反复，这样就形成了一个无限的循环。

这就是这个过程被称为“事件循环（Event Loop）”的原因。

过程展示图:

图中的stack表示我们所说的执行栈，web apis则是代表一些异步事件，而callback queue即事件队列。

![](https://pic4.zhimg.com/80/v2-da078fa3eadf3db4bf455904ae06f84b_1440w.jpg)



##### 2.macro task 和 micro task

以上的事件循环过程是一个宏观的表述，实际上因为异步任务之间并不相同，因此他们的执行优先级也有区别。不同的异步任务被分为两类：微任务（micro task）和宏任务（macro task）。

**分类**

以下事件属于宏任务：

- `setInterval()`
- `setTimeout()`
- Ajax
- DOM事件监听

以下事件属于微任务

- Promise
- async/await
- MutaionObserver()

在一个事件循环中，异步事件返回结果后会被放到一个任务队列中。

* 根据这个异步事件的类型，这个事件实际上会被放到对应的宏任务队列或者微任务队列中去。
* 在当前执行栈为空的时候，主线程会 查看微任务队列是否有事件存在。
  * 如果不存在，那么再去宏任务队列中取出一个事件并把对应的回到加入当前执行栈；
  * 如果存在，则会依次执行队列中事件对应的回调，直到微任务队列为空，然后去宏任务队列中取出最前面的一个事件，把对应的回调加入当前执行栈...如此反复，进入循环。



**当当前执行栈执行完毕时会立刻先处理所有微任务队列中的事件，然后再去宏任务队列中取出一个事件。同一次事件循环中，微任务永远在宏任务之前执行**。









#### 多进程和多线程

1.进程: 程序的一次执行, 它占有一片独有的内存空间

2.线程: CPU的基本调度单位, 是程序执行的一个完整流程



##### 进程与线程

1.一个进程中一般至少有一个运行的线程: 主线程

2.一个进程中也可以同时运行多个线程, 我们会说程序是多线程的

3.一个进程内的数据可以供其中的多个线程直接共享

4.多个进程之间的数据是不能直接共享的,可桥接



#### 浏览器进程分类

Firefox, IE: 单进程

Chrome, edge: 多进程



##### 查看浏览器是否多进程

任务管理器-进程



##### 浏览器运行是单线程还是多线程?

都是多线程运行的.



#### JS单线程

##### 如何证明JS执行是单线程的?

* setTimeout()的回调函数是在主线程执行的
* **定时器, 回调函数**只有在运行栈中的代码全部执行完后才有可能执行  //定时器是同步,回调函数是异步. 事件是同步, 回调是异步.

##### 为什么JS要用单线程模式, 而非多线程模式





#### 实例

```HTML
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
<script type="text/javascript">
//      定时器方法执行 本身是同步的  回调函数的执行是异步的
//      事件的绑定是同步的  但是事件回调函数的触发执行  是异步的
    box.onclick = function () {
          setTimeout(function () {
            console.log('哈哈哈')
        },3000);
    }
    var a = 0;
    for (var i = 0; i < 50000; i++) {
        for (var j = 0; j < 50000; j++) {
            a++;
        }
    }
    console.log(a)
   //setTimeout()
</script>
</body>
</html>
```



 

#### 同步异步

同步: 同步执行完成才会去执行异步

异步: 只要是异步的任务都会有自己的管理模块进行托管



### 事件循环模型

1.所有代码分类

* 初始化执行代码(同步代码): 包含绑定dom事件监听, 设置定时器, 发送ajax请求的代码
* 回调执行代码(异步代码): 处理回调逻辑

2.JS引擎执行代码的基本流程:

​	初始化代码 ---> 回调代码

3.模型的2个重要组成部分

* 事件管理模块
* 回调队列

4.模型的运转流程

* 执行初始化代码, 将事件回调函数交给对应模块管理
* 当事件发生时, 管理模块会将回调函数及其数据添加到回调队列中





### webworker ??

webworker模拟多线程

1.H5规范提供了JS分线程的实现, 取名为: Web Worker

2.相关API

* Worker: 构造函数, 加载分线程执行的JS文件
* Worker.prototype.onmessage: 用于接收另一个线程的回调函数
* Worker.prototype.postMessage: 向另一个线程发送消息

每个线程可以向不同线程发送消息, 也可以接收不同线程传来的消息

主线程操作

 发送消息: worker.postMessage(消息可以是任何数据)

 接收消息: worker.onmessage = function(event){console.log(event.date)} //接收到的消息或者数据在时间对象的data属性当中



子线程操作

发送消息: this.postMessage(消息可以是任何数据)

接受消息: this.onmessage = function(event){ console.log(event.data)} //接收的消息或者数据在时间对象的data属性当中



3.不足:

* worker内代码不能操作DOM
* 不能跨域加载JS
* 不是每个浏览器都支持这个新特性



```html
- webworker.html


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
<script type="text/javascript">
    console.log('今天晚上吃点啥');
//    var a = 0;
//    for (var i = 0; i < 30000; i++) {
//        for (var j = 0; j < 30000; j++) {
//            a++
//        }
//    }
    
//  构造函数调用  传入用于启动分线程的文件路径
    var myWorker = new Worker('mywork.js');
//  postMessage 由主线程 向子线程  传输数据
    myWorker.postMessage(50000);
//  主线程接收子线程 传回来的数据
    myWorker.onmessage = function (event) {
      console.log(event.data);
    }
</script>
</body>
</html>
```



```js
- mywork.js

function fun(a){
	var b = 0;
	for(var i=0; i<a; i++){
        for(var j=0; j<a; j++){
            b++;
        }
    }
    return b;
}
// onmessage 当主线程向子线程传输信息之后, 这个事件的回调函数就会触发
// 用事件对象上的一个属性来获取主线程post过来的数据, event.data
self.onmessage = function(event){
    var result = fun(event.data);
    self.postMessage(result);
}
```



### 最佳实践

#### 异步代码的几个推荐做法

> [写好 JavaScript 异步代码的几个推荐做法 (qq.com)](https://mp.weixin.qq.com/s/1Py2vPwjjqw17rn-uBfJ7g)
>
> https://maximorlov.com/linting-rules-for-asynchronous-code-in-javascript/


##### no-async-promise-executor

不建议将 `async` 函数传递给 `new Promise` 的构造函数。

```js
// ❌
new Promise(async (resolve, reject) => {});

// ✅
new Promise((resolve, reject) => {});
```

首先，你在 `Promise` 的构造函数里去使用 `async` ，那么包装个 `Promise` 可能就是没啥必要的。另外，如果 `async` 函数抛出了异常，新构造的 `promise` 实例并不会 `reject` ，那么这个错误就捕获不到了。



##### no-await-in-loop

不建议在循环里使用 `await`，有这种写法通常意味着程序没有充分利用 `JavaScript` 的事件驱动。

建议将这些异步任务改为并发执行，这可以大大提升代码的执行效率。

```js
// ❌
for (const url of urls) {
  const response = await fetch(url);
}

// ✅
const responses = [];
for (const url of urls) {
  const response = fetch(url);
  responses.push(response);
}

await Promise.all(responses);
```



##### no-promise-executor-return

不建议在 `Promise` 构造函数中返回值，`Promise` 构造函数中返回的值是没法用的，并且返回值也不会影响到 `Promise` 的状态。

正常的做法是将返回值传递给 `resolve`，如果出错了就传给 `reject`。

```js
// ❌
new Promise((resolve, reject) => {
  return result;
});

// ✅
new Promise((resolve, reject) => {
  resolve(result);
});
```



##### require-atomic-updates ??

不建议将赋值操作和 `await` 组合使用，这可能会导致条件竞争。

看看下面的代码，你觉得 `totalPosts` 最终的值是多少？

```js
// ❌
let totalPosts = 0;

async function getPosts(userId) {
  const users = [{ id: 1, posts: 5 }, { id: 2, posts: 3 }];
  //await sleep(Math.random() * 1000);
  await setTimeout(() => {}, Math.random()*1000);
  return users.find((user) => user.id === userId).posts;
}

async function addPosts(userId) {
  totalPosts += await getPosts(userId);
}

await Promise.all([addPosts(1), addPosts(2)]);
console.log('Post count:', totalPosts);
```

`totalPosts` 会打印 3 或 5，并不会打印 8

问题在于读取 `totalPosts` 和更新 `totalPosts` 之间有一个时间间隔。这会导致竞争条件，<span style="color:red">当值在单独的函数调用中更新时，更新不会反映在当前函数范围中</span>。因此，两个函数都会将它们的结果添加到 `totalPosts` 的初始值0。

避免竞争条件正确的做法：

```js
// ✅
let totalPosts = 0;

async function getPosts(userId) {
  const users = [{ id: 1, posts: 5 }, { id: 2, posts: 3 }];
  await sleep(Math.random() * 1000);
  return users.find((user) => user.id === userId).posts;
}

async function addPosts(userId) {
  const posts = await getPosts(userId);
  totalPosts += posts; // variable is read and immediately updated
}

await Promise.all([addPosts(1), addPosts(2)]);
console.log('Post count:', totalPosts);
```



##### max-nested-callbacks

防止回调地狱，避免大量的深度嵌套：

回调地狱让代码难以阅读和维护，建议将回调都重构为 `Promise` 并使用现代的 `async/await` 语法。

```js
/* eslint max-nested-callbacks: ["error", 3] */

// ❌
async1((err, result1) => {
  async2(result1, (err, result2) => {
    async3(result2, (err, result3) => {
      async4(result3, (err, result4) => {
        console.log(result4);
      });
    });
  });
});

// ✅
const result1 = await asyncPromise1();
const result2 = await asyncPromise2(result1);
const result3 = await asyncPromise3(result2);
const result4 = await asyncPromise4(result3);
console.log(result4);
```



##### no-return-await

返回异步结果时不一定要写 `await` ，如果你要等待一个 `Promise`，然后又要立刻返回它，这可能是不必要的。

```js

// ❌
async () => {
  return await getUser(userId);
}
```

从一个 `async` 函数返回的所有值都包含在一个 `Promise` 中，你可以直接返回这个 `Promise`。

```js
// ✅
async () => {
  return getUser(userId);
}
```

当然，也有个例外，如果外面有 `try...catch` 包裹，删除 `await` 就捕获不到异常了，在这种情况下，建议明确一下意图，把结果分配给不同行的变量。

```js
// 👎
async () => {
  try {
    return await getUser(userId);
  } catch (error) {
    // Handle getUser error
  }
}

// 👍
async () => {
  try {
    const user = await getUser(userId);
    return user;
  } catch (error) {
    // Handle getUser error
  }
}
```



##### prefer-promise-reject-errors

建议在 `reject Promise` 时强制使用 `Error` 对象，这样可以更方便的追踪错误堆栈。

```js
// ❌
Promise.reject('An error occurred');

// ✅
Promise.reject(new Error('An error occurred'));
```



##### node/handle-callback-err

强制在 `Node.js` 的异步回调里进行异常处理。

在 `Node.js` 中，通常将异常作为第一个参数传递给回调函数。忘记处理这些异常可能会导致你的应用程序出现不可预知的问题。

如果函数的第一个参数命名为 `err` 时才会触发这个规则，你也可以去 `.eslintrc` 文件里自定义异常参数名。

```js
// ❌
function callback(err, data) {
  console.log(data);
}

// ✅
function callback(err, data) {
  if (err) {
    console.log(err);
    return;
  }

  console.log(data);
}
```



##### node/no-sync

不建议在存在异步替代方案的 `Node.js` 核心 `API` 中使用同步方法。

在`Node.js` 中对 `I/O` 操作使用同步方法会阻塞事件循环。大多数场景下，执行 `I/O` 操作时使用异步方法是更好的选择。

```js
// ❌
const file = fs.readFileSync(path);

// ✅
const file = await fs.readFile(path);
```



##### @typescript-eslint/await-thenable

不建议 `await` 非 `Promise` 函数或值。

```js
// ❌
function getValue() {
  return someValue;
}

await getValue();

// ✅
async function getValue() {
  return someValue;
}

await getValue();
```



##### @typescript-eslint/no-floating-promises

建议 `Promise` 附加异常处理的代码。

```js
// ❌
myPromise()
  .then(() => {});

// ✅
myPromise()
  .then(() => {})
  .catch(() => {});
```



##### @typescript-eslint/no-misused-promises

不建议将 `Promise` 传递到并非想要处理它们的地方，例如 if 条件。

```js
// ❌
if (getUserFromDB()) {}

// ✅ 👎
if (await getUserFromDB()) {}
```

更推荐抽一个变量出来提高代码的可读性。

```js
// ✅ 👍
const user = await getUserFromDB();
if (user) {}
```


