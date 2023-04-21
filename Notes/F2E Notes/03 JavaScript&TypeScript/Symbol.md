---
alias: symbol
---


### 1.简介
背景
在传统的JavaScript中，对象的属性名都是由字符串构成的。这样就会带来一个问题，假如一个对象继承了另一个对象的属性，我们又需要定义新的属性时，很容易造成属性名的冲突。
为了解决这个问题，ES6引入了一种新的基本数据类型Symbol，它表示的是一个独一无二的值。至此,JS一共有6种基本数据类型[[JS Base|]].[[JS Base#JS数据类型#分类]]

### 是什么

> ES6引入新的原始数据类型, 表示独一无二的值
>
> 每个从`Symbol()`返回的symbol值都是唯一的。一个symbol值能作为对象属性的标识符；这是该数据类型仅有的目的.
>
> symbol值不能跟任何值进行计算. 
>
> 使用for..in或者for...of循环遍历的时候,遍历不到symbol属性.  可以使用Object.getOwnpropertySymbols()获取对象的symbol属性,使用 **Reflect.ownKeys**(对象)来遍历获取对象所有的属性.

```js
const s1 = Symbol();
console.log(s1);              //Symbol()
console.log(typeof s1);       //symbol

const s2 = Symbol('aa');
console.log(s2);              //Symbol(aa)
console.log(typeof s2);       //symbol

//每个返回的symbol值都是唯一的,所以相同值的symbol比较运算,返回false.
Symbol('aa') === Symbol('aa')  //false
```





#### 1.1 特点

1. Symbol 值通过 Symbol 函数生成，使用 typeof，结果为 "symbol"
```javascript
let s = Symbol();
console.log(typeof s); //'symbol'
```

2. Symbol 函数前不能使用 new 命令，否则会报错。这是因为生成的 Symbol 是一个原始类型的值，不是对象。

3. instanceof 的结果为 false
```javascript
let s = Symbol('foo');
console.log(s instanceof Symbol); //false
```

4. Symbol 函数可以接受一个字符串作为参数，表示对 Symbol 实例的描述，主要是为了在控制台显示，或者转为字符串时，比较容易区分。
```javascript
let s1 = Symbol('foo');
console.log(s1); //Symbol(foo)
```

5. 如果 Symbol 的参数是一个对象，就会调用该对象的 toString 方法，将其转为字符串，然后才生成一个 Symbol 值。
```javascript
const obj = {
  toString() {
    return 'abc';
  }
};
const sym = Symbol(obj);
console.log(sym); // Symbol(abc)
```

6. Symbol 函数的参数只是表示对当前 Symbol 值的描述，相同参数的 Symbol 函数的返回值是不相等的。
```javascript
// 没有参数的情况
var s1 = Symbol();
var s2 = Symbol();

console.log(s1 === s2); // false

// 有参数的情况
var s1 = Symbol('foo');
var s2 = Symbol('foo');

console.log(s1 === s2); // false
```

7. Symbol 值不能与其他类型的值进行运算，会报错。
```javascript
var sym = Symbol('My symbol');

console.log("your symbol is " + sym); // TypeError: can't convert symbol to string
```

8. Symbol 值可以显式转为字符串。
```javascript
var sym = Symbol('My symbol');

console.log(String(sym)); // 'Symbol(My symbol)'
console.log(sym.toString()); // 'Symbol(My symbol)'
```

9. Symbol 值可以作为标识符，用于对象的属性名，可以保证不会出现同名的属性。
```javascript
let mySymbol = Symbol();

//第一种写法
let a = {};
a[mySymbol] = 'Hello';

//第二种写法
let a = {
  [mySymbol]: 'Hello'
};

//第三种写法
let a = {};
Object.defineProperty(a, mySymbol, {value: 'Hello'})

// 以上写法都得到同样结果
console.log(a[mySymbol]); // "Hello!"
```

10. Symbol 作为属性名，该属性不会出现在 for...in、for...of 循环中，也不会被 Object.keys()、Object.getOwnPropertyNames()、JSON.stringify() 返回。但是，它也不是<u>私有属性</u>，有一个 Object.getOwnPropertySymbols 方法，可以获取指定对象的所有 Symbol 属性名。
```javascript
var obj = {};
var a = Symbol('a');
var b = Symbol('b');

obj[a] = 'Hello';
obj[b] = 'World';

var objectSymbols = Object.getOwnPropertySymbols(obj);

console.log(objectSymbols);
// [Symbol(a), Symbol(b)]
```

11. 如果我们希望使用同一个 Symbol 值，可以使用 Symbol.for。它接受一个字符串作为参数，然后搜索有没有以该参数作为名称的 Symbol 值。如果有，就返回这个 Symbol 值，否则就新建并返回一个以该字符串为名称的 Symbol 值。
```javascript
var s1 = Symbol.for('foo');
var s2 = Symbol.for('foo');

console.log(s1 === s2); // true
```

12. Symbol.keyFor 方法返回一个已登记的 Symbol 类型值的 key。
```javascript
var s1 = Symbol.for("foo");
console.log(Symbol.keyFor(s1)); // "foo"

var s2 = Symbol("foo");
console.log(Symbol.keyFor(s2) ); // undefined
```


### 2. 创建Symbol

> 所有原始值,除了Symbol依赖都有各自的字面形式(字符串,数字,布尔值,null,undefined).
>
> Symbol唯一且合理的使用方式, 是为对象添加\[属性\].
>
> 调用Symbol()函数时,也可以传入一个字符串参数作为对符号的描述,将来可以通过这个字符串来调试代码.但这个字符串参数与符号定义或标识符无关.



#### 0. 创建Symbol

可以通过全局的Symbol函数创建一个Symbol. 

```javascript
//创建了一个名为firstName的Symbol，用它将一个新的属性赋值给person对象
let firstName = Symbol(),
    person = {};

person[firstName] = 'Nicholas';
console.log(person[firstName]); //'Nicholas'
```

**注意**

>  由于Symbol是原始值，因此调用new Symbol()会导致程序抛出错误。也可以执行new Object（你的Symbol）创建一个Symbol的实例，但目前尚不清楚这个功能何时可以使用。



#### 1. Symbol函数

**Symbol函数接受<span style="color:blue;">一个可选参数</span>**，其可以让你添加一段文本描述即将创建的Symbol，这段描述不可用于属性访问，但是建议你在每次创建Symbol时都添加这样一段描述，以便于阅读代码和调试Symbol程序

```javascript
let firstName = Symbol('first name'),
    person = {};

person[firstName] = 'Nicholas';

console.log('first name' in person); //false
console.log(person[firstName]); //'Nicholas'
console.log(firstName); //'Symbol("first name")'
```

**[[Description]]**

Symbol的描述被存储在内部的[[Description]]属性中，只有当调用Symbol的toString()方法时才可以读取这个属性。在执行console.log()时隐式调用了firstName的toString()方法，所以它的描述会被打印到日志中，但<u>不能直接在代码里访问[[Description]].</u>

```javascript
let firstName = Symbol('first name'),
    result = firstName.toString();

console.log(result); //'Symbol(first name)'
```



**Symbole的辨识方法**

Symbol是原始值，且ECMAScript 6同时扩展了typeof操作符，支持返回"symbol"，所以可以用typeof来检测变量是否为Symbol类型。

通过其他间接方式也可以检测变量是否为Symbol类型，但是typeof操作符是最准确也是你最应首选的检测方式。

```javascript
let symbol = Symbol('test symbol');
console.log(teypof symbol); //'symbol'
```


### 3. Symbol的使用场景
#### 用作对象属性名
在使用Symbol类型的数据时，存在几种不同的写法，遵循的一个原则就是为对象字面量新增属性时需要使用方括号\[\]。不能通过点运算符为对象添加Symbol属性
```js
// 新增一个symbol属性
let PROP_NAME = Symbol();

// 第一种写法
let obj = {};
obj[PROP_NAME] = 'Hello';

// 第二种写法
let obj = {
    [PROP_NAME]: 'Hello'
};

// 第三种写法
let obj = {};
Object.deﬁneProperty(obj, PROP_NAME, {
    value: 'Hello' 
});
```

```js
const PROP_NAME = Symbol();
const obj = {};

obj.PROP_NAME = 'Hello!';
console.log(obj[PROP_NAME]);  // undeﬁned
console.log(obj['PROP_NAME']); // 'Hello'
```


#### 用于属性区分
>我们可能会遇到这样一种场景，即通过区分两个属性来做对应的处理。

例如: 求图形的面积
```js
// 求图形的面积
function getArea(shape, options) {
    let area = 0;
    switch (shape) {
        case 'triangle':
            area = .5 * options.width * options.height;
            break;
        case 'rectangle':
            area = options.width * options.height;
            break;
    }
    return area;
}
console.log(getArea('triangle', { width: 100, height: 100 }));  // 5000
console.log(getArea('rectangle', { width: 100, height: 100 })); // 10000
```
在上面的写法中，字符串'triangle'和'rectangle'会强耦合在代码中
而事实上，我们仅想区分各种不同的形状，并不关心每个形状使用什么字符串表示，我们只需要知道每个变量的值是独一无二的即可，此时使用Symbol就会很合适。
```js
// 事先声明两个Symbol值，用于作判断
let shapeType = {
    triangle: Symbol('triangle'),
    rectangle: Symbol('rectangle')
};

function getArea(shape, options) {
    let area = 0;
    switch (shape) {
        case shapeType.triangle:
            area = .5 * options.width * options.height;
            break;
        case shapeType.rectangle:
            area = options.width * options.height;
            break;
    }
    return area;
}

console.log(getArea(shapeType.triangle, { width: 100, height: 100 }));  // 5000
console.log(getArea(shapeType.rectangle, { width: 100, height: 100 })); // 10000
```

#### 用于属性名遍历
使用Symbol作为属性名时，不能通过Object.keys()函数或者for...in来枚举，可以将一些不需要对外操作和访问的属性通过Symbol来定义。
```js
let obj = {
    [Symbol('name')]: 'Hello',
    age: 18,
    title: 'Engineer'
};

console.log(Object.keys(obj));   // ['age', 'title']

for (let p in obj) {
    console.log(p);  // 分别会输出：'age' 和 'title'
}

console.log(Object.getOwnPropertyNames(obj));   // ['age', 'title']
```

因为Symbol属性不会出现在属性遍历的过程中，所以在使用JSON.stringify()函数将对象转换为JSON字符串时，Symbol值也不会出现在结果中。
**如何获取?** [[JS Base#对象自身方法#Object.getOwnPropertySymbols()]]



### 4. Symbol共享体系

#### 0. 背景

希望在不同的代码中共享同一个Symbol，例如，在你的应用中有两种不同的对象类型，但是你希望它们使用同一个Symbol属性来表示一个独特的标识符。一般而言，在很大的代码库中或跨文件追踪Symbol非常困难而且容易出错，出于这些原因，ECMAScript 6提供了一个可以随时访问的**全局Symbol注册表**。



#### 1. Symbol.for()

如果想创建一个可共享的Symbol，要使用Symbol.for()方法。它只接受一个参数，也就是即将创建的Symbol的字符串标识符，这个参数同样也被用作Symbol的描述

```javascript
let uid = Symbol('uid'),
    obj = {};

obj[uid] = '12345';

console.log(obj[uid]); //'12345'
console.log(uid); //'Symbol(uid)'
```

Symbol.for()方法首先在全局Symbol注册表中搜索键为"uid"的Symbol是否存在，如果存在，直接返回已有的Symbol；否则，创建一个新的Symbol，并使用这个键在Symbol全局注册表中注册，随即返回新创建的Symbol。

后续如果再传入同样的键调用Symbol.for()会返回相同的Symbol

```javascript
let uid = Symbol.for('uid'),
    obj = {
      [uid]: '12345'
    };

console.log(obj[uid]); //'12345'
console.log(uid); //'Symbol(uid)'

let uid2 = Symbol.for('uid');

console.log(uid === uid2); //true
console.log(obj[uid2]); //'12345'
console.log(uid); //'Symbol(uid)'
```



#### 2. Symbole.keyFor()

可以使用Symbol.keyFor()方法在Symbol全局注册表中检索与Symbol有关的键

```javascript
let uid = Symbol.for('uid');
console.log(Symbol.keyFor(uid)); //'uid'

let uid2 = Symbol.for('uid');
console.log(Symbole.keyFor(uid2)); //'uid'

let uid3 = Symbol('uid');
console.log(Symbol.keyFor(uid3)); //undefined
```

Symbol全局注册表是一个类似全局作用域的共享环境，也就是说你不能假设目前环境中存在哪些键。当使用第三方组件时，尽量使用Symbol键的命名空间以减少命名冲突。举个例子，jQuery的代码可以为所有键添加"jquery"前缀，就像"jquery.element"或其他类似的键。



### 4. Symbol与类型强制转换

自动转型是JavaScript中的一个重要语言特性，利用这个特性能够在特定场景下将某个数据强制转换为其他类型。然而，<u>其他类型没有与Symbol逻辑等价的值</u>，因而Symbol使用起来不是很灵活，<u>尤其是不能将Symbol强制转换为字符串和数字类型</u>，否则如果不小心将其作为对象属性，最终会导致不一样的执行结果。

**与字符串类型**

使用console.log()方法来输出Symbol的内容，它会调用Symbol的String()方法并输出有用的信息。也可以像这样直接调用String()方法来获得相同的内容

```javascript
let uid = Symbol.for('uid'),
    desc = String(uid);

console.log(desc); //'Symbol(uid)'
```

String()函数调用了uid.toString()方法，返回字符串类型的Symbol描述里的内容。但是，如果你尝试将Symbol与一个字符串拼接，会导致程序抛出错误：

```javascript
let uid = Symbol.for('uid'),
    desc = uid + ''; //报错
```

将uid与空字符串拼接，首先要将uid强制转换为一个字符串，而Symbol不可以被转换为字符串，故程序直接抛出错误。

**与数字类型**

将Symbol与每一个数学运算符混合使用都会导致程序抛出错误

```javascript
let uid = Symbol.for('uid'),
    sum = uid / 1; //报错
```

这个示例尝试将Symbol除1，程序直接抛出错误。而且无论使用哪一个数学操作符，都无法正常运行

**与逻辑操作符**

Symbol与JavaScript中的非空值类似，其等价布尔值为true

### 6. Symbol属性检索

Object.keys()方法和Object.getOwnPropertyNames()方法可以检索对象中所有的属性名：前一个方法返回所有可枚举的属性名；后一个方法不考虑属性的可枚举性一律返回。然而为了保持ECMAScript 5函数的原有功能，这两个方法都不支持Symbol属性，而是在ECMAScript 6中添加一个**Object.getOwnPropertySymbols()**方法来检索对象中的Symbol属性。

**Object.getOwnPropertySymbols()**

Object.getOwnPropertySymbols()方法的返回值是一个包含所有Symbol自有属性的数组

```javascript
let uid = Symbol.for('uid');
let obj = {
  [uid]: '12345'
};

let symbols = Object.getOwnPropertySymbols(obj);

console.log(symbols.length); //1
console.log(symbols[0]); //'Symbol(uid)'
```



**继承**

所有对象一开始都没有自己独有的属性，但是对象可以从原型链中继承Symbol属性。ECMAScript 6通过一些well-known Symbol预定义了这些属性。



```js
//要求: 向对象中添加方法up
//使用symbol为对象obj属性的两种方式: 
//		对象块作用域外: obj[属性名称];  
//		对象块作用域内: obj{[s]:值}

let game = {
    name: 'name1'
};

//添加方式0
//弊端: 无法判断对象里是否有重名的属性或方法
 game.up = function(){
     console.log('向上');
 }

//添加方式1 函数体外

let methodUp = Symbol('up');
game[methodUp] = function(){
    console.log('向上');
};

game[methodUp]();//调用方法

书写规范: 
game.methodUp的结果是game对象中有methodUp方法  不采纳
game[methodUp], 将methodUp变量对应的值作为对象的属性名,添加到对象中

//添加方式2  函数体内
let methodDown = Symbol('down');
let game = {
    name: 'name1',
    [methodDown]:function(){
        console.log('向下');
    }
}
game[methodDown]();


```



### Symbol属性/方法

#### Symbol.prototype.valueOf()

**Define**

`**valueOf()**` 方法返回当前 symbol 对象所包含的 symbol 原始值

**Syntax**

```javascript
symbol.valueOf()
```

**Description**

在 JavaScript 中，虽然大多数类型的对象在某些操作下都会自动的隐式调用自身的 `valueOf()` 方法或者 `toString()` 方法来将自己转换成一个原始值，但 symbol 对象不会这么干，symbol 对象无法隐式转换成对应的原始值：

```javascript
Object(Symbol("foo")) + "bar";
// TypeError: can't convert symbol object to primitive
// 无法隐式的调用 valueOf() 方法

Object(Symbol("foo")).valueOf() + "bar";
// TypeError:  can't convert symbol to string
// 手动调用 valueOf() 方法，虽然转换成了原始值，但 symbol 原始值不能转换为字符串

Object(Symbol("foo")).toString() + "bar";
// "Symbol(foo)bar"，需要手动调用 toString() 方法才行
```






### 8. 其他

#### 1. Symbol内置属性

> 扩展对象内置的功能, 不需要手动调用, 某些场景下会被动执行. 

```js
//声明一个对象
let obj = {
    name: 'yourname',
    [Symbol.replace]: function(){//注意写法,obj中Symbol.replace方法
        console.log('replace方法');
        return '对象方法执行了';
    }
}

//声明一个字符串
let str = 'hello Symbol';
//通过replace方法使用obj对象
let result = str.replace(obj, 'abc'); //这里的replace方法返回结果就是obj对象里的replace方法调用结果

console.log(result);

//打印结果
replace方法
对象方法执行了
```



#### 2. symbol为什么没有包装类型

```js
https://www.zhihu.com/question/316717095/answer/628772556
```



> 除了`null`和`undefined`，JS 里的原始类型都有对应的包装对象类型。为什么要有包装对象？是为了能用`.`语法来读取属性、调用方法（对象才能有属性和方法），比如 `"foo".length`、`(1).toFixed(2)`等代码中，都隐式的用到了包装对象。`null`和`undefined`不需要属性和方法，所以不需要包装对象。
>
> symbol 也需要读取属性和方法，所以也需要有包装对象，但一样也不推荐直接使用包装对象。ES6 是个新的开始，可以做一些大胆的改革，所以`new Symbol()` 被故意设计为抛异常，而不是墨守成规返回包装对象。但仍然能用 `Object()`把 symbol 转换为包装对象，有一个原因是因为已经有代码用 `Object(value) === value` 来判断一个值是不是对象值。
>
> 而且比起写出 `new Number()`、`new String()`、`new Boolean()` 这样的代码，菜鸟们写出 `new Symbol()`的概率更大，因为 symbol 没有字面量，而老的三种原始类型都有，有字面量的话会更容易学会用字面量。
>
> 但其实这个决定是有争议的，因为造成了语言的不统一，凭什么那仨不报错而你要报错？而且即便真把 symbol 的包装对象误作为属性键来使用，其实也能正常使用，因为有自动解包装的逻辑。
>
> ```js
> s = Symbol()
> ({[s]:1})[Object(s)] // 1
> ```
>
> 
>
> 未来的第七种原始类型 `BigInt()`，因为同样的原因，也不能被 `new`

