---
aliases: 迭代器
---


## 概述
>[迭代器和生成器 - JavaScript | MDN (mozilla.org)](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Iterators_and_generators)
>JavaScript权威指南12章


for/of循环和扩展操作符可以直接操作可迭代对象

### 关系
* **可迭代对象**指的是任何具有专用迭代器方法，且该方法返回迭代器对象的对象。
* **迭代器对象**指的是任何具有next()方法，且该方法返回迭代结果对象的对象。
* **迭代结果对象**是具有属性value和done的对象。

### 迭代一个可迭代对象
要迭代一个可迭代对象
* 1.要调用其迭代器方法获得一个迭代器对象。
* 2.重复调用这个迭代器对象的next()方法，直至返回done属性为true的迭代结果对象。
这里比较特别的地方是，可迭代对象的迭代器方法没有使用惯用名称，而是使用了符号Symbol.iterator作为名字。因此可迭代对象iterable的简单for/of循环也可以写成如下这种复杂的形式：
```js
let iterable = [99]
let iterator = iterable[Symbol.iterator]()
for (let result=iterator.next(); !result.done; result=iterator.next()) {
	console.log(result.value) // 99
}
```

### 注意
内置可迭代数据类型的迭代器对象本身也是可迭代的（也就是说，它们有一个名为Symbol.iterator的方法，返回它们自己）
在下面的代码所示的需要迭代“部分使用”的迭代器时，这种设计是有用的：
```js
let list = [1,2,3,4,5]
let iter = list[Symbol.iterator]()
let head = iter.next().value; //1
let tail = [...iter] // [2,3,4,5]
```


### 创建可迭代对象/迭代器对象/迭代结果对象
示例12-1：可迭代的数值Range类
```js

class Range {
	constructor(from,to) {
		this.from = from
		this.to = to
	}

	// 让Range对象像数值的集合一样
	has(x) { return typeof x === 'number' && this.from <= x && x <= this.to; }

  // 使用集合表示法返回当前范围的字符串表示
  toString() {
	  return `{x | ${this.from} <= x <= ${this.to}`
  }

	// 通过返回一个迭代器对象,让Range对象可迭代
	// 注意这个方法的名字是一个特殊的符号,不是字符串
	[Symbol.iterator]() {
		// 每个迭代器实例必须相互独立,互不影响地迭代自己的范围
		// 因此需要一个状态变量跟踪迭代的位置.从第一个大于等于from的整数开始
		let next = Math.ceil(this.from)
		let last = this.to
		return {
			// 这个next()方法是迭代器对象的标志
			// 它必须返回一个迭代器结果对象
			next() {
				return (next <= last) //如果没有返回last,则返回next并给它加1,否则返回表示完成的对象
					? { value: next++ }
					: { done: true }
			},
			//为了方便起见，让迭代器本身也可迭代
			[Symbol.iterator]() { return this; }
		}
	}
}


for (let x of new Range(1,10)) console.log(x) //打印数值1到10

[...new Range(-2, 2)] //[-2,-1,0,1,2]
```


### 迭代协议

迭代协议具体分为两个协议：[可迭代协议](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Iteration_protocols#可迭代协议)和[迭代器协议](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Iteration_protocols#迭代器协议)。

### 可迭代协议

**可迭代协议**允许 JavaScript 对象定义或定制它们的迭代行为，例如，在一个 [`for..of`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/for...of) 结构中，哪些值可以被遍历到。

#### Symbol.iterator / @@iterator

要成为**可迭代**对象， 一个对象必须实现 `**@@iterator**` 方法。这意味着对象（或者它[原型链](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Inheritance_and_the_prototype_chain)上的某个对象）必须有一个键为 `@@iterator` 的属性，可通过常量 [`Symbol.iterator`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Symbol/iterator) 访问该属性：

| 属性                | 值                                                  |
| ------------------- | --------------------------------------------------- |
| `[Symbol.iterator]` | 一个无参数的函数,其返回值为一个符合迭代器协议的对象 |


### 迭代器协议
**默认Iterator接口**
只有部署了Iterator接口的数据结构才能使用for...of遍历，举例如下
```js
// 对象默认不能使用for...of循环
const obj = {
    name: 'kingx',
    age: 11
};
for (let key of obj) {
    console.log(key); // TypeError: obj[Symbol.iterator] is not a function
}
// 数组能正常使用for...of循环
const arr = ['one', 'two'];
for (let key in arr) {
    console.log(key); // 0, 1
}
```



**原生具备iterator接口的数据**(可用for of遍历): 
* Array 
* Arguments 
* Set 
* Map 
* String 
* TypeArray 
* NodeList

**自定义迭代器**
自定义一些可以使用for...of循环的数据结构，那么该怎么做呢？==需要自定义遍历数据的时候, 要想到迭代器==
方法就是为数据结构添加上Iterator接口，Iterator接口是部署在==Symbol.iterator==属性上的，它是一个函数，因此我们只需要对特定的数据结构加上Symbol.iterator属性即可。

案例: 为对象类型数据添加Iterator接口,使得它可以使用for...of循环.
```javascript
function Person(name, age) {
	this.name = name
	this.age = age
}

Person.prototype[Symbol.iterator] = function() {
	// 设置变量,记录遍历的次数
	let count = 0
	// 通过Object.keys()函数获取实例自身的所有属性
	let propArr = Object.keys(this)
	return {
		next: function() {
			if (count < propArr.length) {
				let index = count++
				return {
					value: propArr[index]
					done: false
				}
			} else {
				value: undefined
				done: true
			}
		}
	}

}
```

**ES5实现迭代器功能**
```javascript
function createIterator(items) {
  let i=0;
  return {
    next:function() {
      let done = i>= items.length;
      let value = !done ? items[i++] : undefined;
      
      return {
        done: done,
        value: value
      }
    }
  }
}

//iterator是一个迭代器对象
let iterator = createIterator([1,2,3]);

console.log(iterator.next()); // { done: false, value: 1 }
console.log(iterator.next()); // { done: false, value: 2 }
console.log(iterator.next()); // { done: false, value: 3 }
console.log(iterator.next()); // { done: true, value: undefined }
```





### for...of
ES6中增加了一种新的for...of循环，主要目的是为了统一所有数据结构的遍历方式。
除了迭代器之外，我们还需要一个可以遍历迭代器对象的方式，ES6 提供了 for of 语句，我们直接用 for of 遍历一下我们上节生成的遍历器对象试试：

```javascript
let iterator = createIterator([1,2,3]);

for(let value of iterator) {
  console.log(value);
}
```

结果报错 `TypeError: iterator is not iterable`，表明我们生成的 iterator 对象并不是 iterable(可遍历的)。

那什么才是可遍历的呢？

其实一种数据结构只要部署了 Iterator 接口，我们就称这种数据结构是“可遍历的”（iterable）。

<u>ES6 规定，默认的 Iterator 接口部署在数据结构的 Symbol.iterator 属性</u>，或者说，一个数据结构只要具有 Symbol.iterator 属性，就可以认为是"可遍历的"（iterable）。

举个例子:

```javascript
const obj = {
    value: 1
};

for (value of obj) {
    console.log(value);
}

// TypeError: iterator is not iterable
```

我们直接 for of 遍历一个对象，会报错，然而如果我们给该对象添加 Symbol.iterator 属性：

```javascript
const obj = {
  value: 1
};

obj[Symbol.iterator] = function() {
  return createIterator([1,2,3]);
}

for (value of obj) {
  console.log(value);
}
// 1
// 2
// 3
```

我们也可以发现 for of 遍历的其实是对象的 Symbol.iterator 属性。



#### 默认可遍历对象

 ES6 默认部署了 Symbol.iterator 属性，当然我们也可以手动修改这个属性：

```javascript
var colors = ["red", "green", "blue"];

colors[Symbol.iterator] = function() {
    return createIterator([1, 2, 3]);
};

for (let color of colors) {
    console.log(color);
}

// 1
// 2
// 3
```




#### 使用范围

* 数组
* Set
* Map
* 类数组对象(arguments, DOM NodeList对象)
* Generator对象
* 字符串

**数组结构使用for...of**

**Set/Map结构使用for...of循环**

**NodeList结构使用for...of循环**

**arguments对象使用for...of循环**
arguments也是一个类数组对象，同样可以使用for...of循环进行遍历

**特定函数返回值使用for...of循环**
对象类型的数据无法直接使用for...of循环进行遍历，但是我们可以借助ES6中Object对象新增的几个函数来间接地实现for...of循环
* Object.entries()[[JS Base#Object.entries()]]函数：返回一个遍历器对象，由键、值构成的对象数组。
* Object.keys()[[JS Base#Object.keys]] 函数：返回一个遍历器对象，由所有的键构成的数组。
* Object.values()[[JS Base#Object.values()]]函数：返回一个遍历器对象，由所有的值构成的数组。


#### 模拟实现for...of

模拟实现 for of 也比较简单，基本就是通过 Symbol.iterator 属性获取迭代器对象，然后使用 while 遍历一下：
```javascript
function forOf(obj, cb) {
  let iterable, result;
  if (typeof obj[Symbol.iterator] !== 'function') {
    throw new TypeError(obj + 'is not iterator')
  }
  if (typeof cb !== 'function') {
    throw new TypeError('cb must be callable')
  }
  iterable = obj[Symbol.iterator]();
  result = iterable.next();
  while(!result.done) {
    cb(result.value);
    result = iterable.next();
  }
}
```


#### for...of与forEach, for...in比较
引用: [[JS Base#for...of与forEach,for...in比较]]


### 内建迭代器
ES6 为数组、Map、Set 集合内建了以下三种迭代器：
1.entries()返回一个遍历器对象,用来遍历[键名,键值]组成的数组.对于数组,键名就是索引.
2.keys() 返回一个遍历器对象,用来遍历所有的键名.
3.values()返回一个遍历器对象,用来遍历所有的键值.


### 关闭迭代器
对于`for...of`的循环，可以由`break`, `throw continue `  或`return`终止。在这些情况下，迭代器关闭。


### 迭代器工作原理
```js
1.创建一个指针对象, 指向当前数据结构的起始位置
2.第一次调用对象的next方法,指针自动指向数据结构的第一个成员
3.接下来不断调用next方法,指针一直往后移动,直到指向最后一个成员 //会多循环一次
4.每调用next方法返回一个包含value和done属性的对象  //最后一次
```



#### 数组迭代器

```js
- 数组可以实现遍历的原因: 内部实现了迭代器iterator接口,内部有迭代器方法Symbol.iterator方法(在原型上的方法,通过浏览器可以查看到其原型上具有这个方法)
- [Symbol.iterator]()返回值类型是一个对象

const arr = ['唐僧', '孙悟空', '猪八戒', '沙僧'];
const iterator = arr[Symbol.iterator]();//在原型上有Symbol.iterator方法
console.log(iterator);//输出结果: 指针对象 Array Iterator{}

iterator.next();//log {value: '唐僧', done: false} //false表示迭代还没有结束
iterator.next();//log {value: '孙悟空', done: false}
iterator.next();//log {value: '猪八戒', done: false}
iterator.next();//log {value: '沙僧', done: false}
iterator.next();//log {value: undefined, done: true}

```



#### 迭代器自定义遍历对象

```js
- 配合浏览器报错完善函数功能
- 循环遍历的是对象里的members数组.

const team = {
    name: 'exampleName',
    members: ['a', 'b', 'c', 'd'],
    //添加迭代器方法,实现for..of功能
    [Symbol.iterator]: function(){
        //声明索引变量
        let index = 0;
        return{//TypeError:Result of Symbol.iterator method is not an object at... 
        	   //TypeError: undefined is not a function at ... //对象里需要next方法
        	next:()=>{
    			//TypeError: Iterator result undefined is not an object at ... 所以需要在next方法种也返回一个对象,对象的内容根据打印的结果来
    			//到这一步,刷新页面后,页面会一直返回undefined. 因为没有结束
    			//为了实现value遍历目标值, 需要声明一个索引/指针变量
    			//return{value:xxx, done:false};
                let result ={value: this.member[index]}
                //处理done
                if(index<this.member.length){
                    result.done = false;
                }else{
                    result.done = true;
                }
                index++;
                return result;
			}
    	}
    }
}

//this指向team.两种实现方式:箭头函数, this赋值(_this self that等)
const team = {
    name: 'exampleName',
    members: ['a', 'b', 'c', 'd'],
    [Symbol.iterator]:{
        let index = 0;
        return{
        	next:()=>{
    			let result={value:this.members[index]};
    			if(index<this.members.length){
                    result.done=false;
                }else{
                    result.done=true;
                }
    			return result;
				index++;
			}
    	}
    }
}

for(let i of team){
    console.log(i);//log结果: 
}

=======================================
const team2 = {
    name: 'exampleName',
    members: ['a', 'b', 'c', 'd']
}
for(let i of team2['members']){
    console.log(i);//log结果: a b c d
}
```


### 实现

> [迭代器和生成器 - JavaScript | MDN (mozilla.org)](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Iterators_and_Generators#iterables)

它允许创建一个简单的范围迭代器，它定义了从开始（包括）到结束（独占）间隔步长的整数序列。 
它的最终返回值是它创建的序列的大小，由变量iterationCount跟踪。
```javascript
function makeRangeIterator(start = 0, end = Infinity, step = 1) {
    let nextIndex = start;
    let iterationCount = 0;

    const rangeIterator = {
       next: function() {
           let result;
           if (nextIndex < end) {
               result = { value: nextIndex, done: false }
               nextIndex += step;
               iterationCount++;
               return result;
           }
           return { value: iterationCount, done: true }
       }
    };
    return rangeIterator;
}
```

使用这个迭代器
```js
let it = makeRangeIterator(1, 10, 2);

let result = it.next();
while (!result.done) {
 console.log(result.value); // 1 3 5 7 9
 result = it.next();
}

console.log("Iterated over sequence of size: ", result.value); // 5
```


### 迭代器如何关闭/todo
> [JavaScript迭代器如何关闭? - 知乎](https://www.zhihu.com/question/462012759/answer/1914177301)

