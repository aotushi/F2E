---
aliases: 生成器
---


### 概述
Generator()函数是ES6提供的一种异步编程解决方案。


### Generator函数特征
* function关键字与函数名之间有一个星号（*）。
* 函数体内部使用yield关键字来定义不同的内部状态。

**实例**
下面的代码定义了一个简单的Generator()函数，内部包含两个状态，hello与world。
```js
function* helloworldGenerator() {
    console.log('Generator执行');
    yield 'hello';
    yield 'world';
}

const hw = helloworldGenerator();
console.log('这是测试执行先后顺序的语句');
hw.next();
```
上面代码的执行结果如下所示
```js
这是测试执行先后顺序的语句
Generator执行
```


#### yield表达式与next()关系
Generator()函数返回的是部署了Iterator接口的对象，而该对象是通过调用next()函数来遍历内部状态的，所以在没有调用下一轮next()函数时，函数处于暂停状态，而这个暂停状态就是通过yield表达式来体现的，因此Generator()函数对异步的控制是通过yield表达式来实现的
通过Iterator接口的next()函数执行过程可以看出next()函数与yield表达式的关系。
* next()函数的返回值是一个具有value和done属性的对象，next()函数调用后，如果遇到yield表达式，就会暂停后面的操作，并将yield表达式执行的结果作为value值进行返回，此时done属性的值为false。
* 当再次执行next()函数时，会再继续往下执行，直到遇到下一个yield表达式。
* 当所有的yield语句执行完毕时，会直接运行至函数末尾，如果有return语句，将return语句的表达式值作为value值返回；如果没有return语句，则value以undefined值进行返回，这两种情况下的done属性的值都为true，遍历结束。
```js
function* helloworldGenerator() {
    yield 'hello';
    yield 'world';
    return 'success';
}

const hw = helloworldGenerator();
hw.next();  // {value: "hello", done: false}
hw.next();  // {value: "world", done: false}
hw.next();  // {value: "success", done: true}
```


#### for...of与Generator
Generator()函数的返回值是一个部署了Iterator接口的对象，刚好可以使用for...of循环进行遍历，并且不需要手动调用next()函数，遍历的结果就是yield表达式的返回值。

对象类型的值在默认情况下是不能使用for...of循环进行遍历的，但是借助于Generator()函数可以实现for...of循环的遍历。
主要思路是给对象的Symbol.iterator属性设置一个Generator()函数，在Generator()函数内通过yield控制遍历的返回值。
```js
function* propGenerator() {
    let propArr = Object.keys(this);
    for (let prop of propArr) {
     // 通过yield控制每轮循环的返回值为由属性名和属性值构成的数组
        yield [prop, this[prop]];
    }
}
let obj = {
    name: 'kingx',
    age: 12
};
// 为obj对象添加Symbol.iterator属性
obj[Symbol.iterator] = propGenerator;
// 对yield的返回值
for (let [key, value] of obj) {
    console.log(key, ':', value);
}
```



