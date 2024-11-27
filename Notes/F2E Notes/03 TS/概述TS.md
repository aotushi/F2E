## TS开发环境搭建

> 主要是VSCode中配置

### 打开VSCode中TS的所有配置
1. 通过 Ctrl(Command) + Shift + P 打开命令面板，找到「打开工作区设置」这一项
2. 输入'typescript',会筛选出所有 TypeScript 有关的配置.点击左侧的"TypeScript"，会在右侧展示内置的配置.
3. 补全搜索框中的搜索词，使用“typescript inlay hints”, 更新右侧的配置选项.

### 推荐开启的配置
- Function Like Return Types，显示推导得到的函数返回值类型；
  
- Parameter Names，显示函数入参的名称；
  
- Parameter Types，显示函数入参的类型；
  
- Variable Types，显示变量的类型。

> 这些配置的主要能力就是把参数名，参数类型，以及推导得到的类型等等信息直接展示在屏幕上，否则你就需要悬浮鼠标在代码上来查看这些信息了。对于入门阶段的开发者来说，可以开启这些配置项来获得更清晰的类型信息。



### 如何分享TS代码给他人
推荐的方式
* 使用 Web IDE，比如 CodeSandbox
* TS官方的 [TypeScript Playground](https://link.juejin.cn/?target=https%3A%2F%2Fwww.typescriptlang.org%2Fplay "https://www.typescriptlang.org/play")

## TS中的类型

### 类型结构

![image-20241126194855331](C:\PersonalData\F2E\Notes\F2E Notes\03 TS\assets\image-20241126194855331.png)







## 原始类型



#### 原始类型的类型标注
使用 `: 类型` 的语法来实现，这里的类型其实也就是 string / number / boolean：
```ts
const userName: string = 'linbudu'
const userAge :number = 18
const userMarried: boolean = false
```



### 枚举类型

> [TypeScript: Handbook - Enums](https://www.typescriptlang.org/docs/handbook/enums.html)

#### 背景

> 为了解决程序中采用数值或字符串判断时候出现的**可读性差和变量分布散乱**的问题,可以引入枚举来代替数值类型或字符串类型.
>
> 枚举类型变量通常用于集中定义和管理一组相关的常量，便于在其他地方引用. 
>
> TS支持数值枚举和字符串枚举.

#### 枚举带来的好处:

* 枚举能提供清晰的提示及值
* 对于数值类型的值,可以自动累加值

在JS中通过对象方式定义常量,可以起到注释作用.

```js
const userLevelCode = {
  Visitor: 10001,
  NonVIPUser: 10002,
  VIPUser: 10003,
  Admin: 10010,
  // ... 
}



fetchUserInfo({
  // ...
  // 后续维护者：这到底是个啥？？
  userCode: 10001
})

fetchUserInfo({
  // ...
  // 后续维护者：哦，这里要给访客用户啊
  userCode: userLevelCode.Visitor
})

```

在TS中提供了一个更好的定义常量的方式: 枚举.

```ts
enum UserLevelCode {
  Visitor = 10001,
  NonVIPUser = 10002,
  VIPUser = 10003,
  Admin = 10010,
  // ... 
}

```



#### 数值枚举

> 数值枚举是数值类型的子类型,是默认的枚举类型. 因此可以将数值型枚举类型赋值给number类型. 但数值类型也能赋值给枚举类型,不会报错.
>
> 数值枚举可以混入计算成员和常量成员. 简单说,没有初始化的枚举要么排在第一位,要么排在初用数值常量或其它常量枚举成员初始化之后.

其声明如下:

```ts
enum MonthOfYear {
  January,
  February,
  March,
  April,
  May,
  ... //省略后续代码
}

let month: MonthOfYear = MonthOfYear.March
console.log(month); //2

//赋值给数值类型
const month2: number = MonthOfYear.January

//数值类型赋值给枚举类型
const month3: MonthOfYear = 10;
```

在没有显式地给各个枚举成员赋值的情况下，枚举中的第一个成员将从0开始取值，而下一个成员会在上一个成员取值的基础上加1.

当然,也可以显式赋值.

```ts
enum MonthOfYear {
  January = 1,
  February,    //2
  March = 10,
  April,       //11
  May,
  ... //省略后续代码
}

let month: MonthOfYear = MonthOfYear.March
console.log(month); //3
```



**枚举如何解决分支判断中可读性差的问题?**

```ts
enum UserType {
  Admin,
  VIP,
  Normal,
  Guest
}

//做分支判断时
if (userType === UserType.Admin) {
  //..
} else if (userType === UserType.VIP || userType == UserType.Normal) {
  //...
} else if (userType === UserType.Guest) {
  //...
}
```



#### 字符串枚举

> 字符串枚举的定义方式和数值枚举类似，但区别在于各个成员需要显式地赋值为字符串.
>
> 字符串枚举成员必须使用**字符串字面量**或**另一个字符串枚举成员**来初始化。

```ts
enum MonthOfYear {
    January = "1月",
    February = "2月",
    March = "3月",
    April = "4月",
    May = "5月",
    ...//省略后续代码
}
　
let month: MonthOfYear = MonthOfYear.March;
console.log(month); //3月

enum Direction {
    Up = 'UP',
    Down = 'DOWN',
    Left = 'LEFT',
    Right = 'RIGHT',

    U = Up,
    D = Down,
    L = Left,
    R = Right,
}
```



##### 与字符串的关系

字符串枚举可以赋值给字符串,但是反过来不行,会产生报错.

```ts
enum Direction {
    Up = 'UP',
    Down = 'DOWN',
    Left = 'LEFT',
    Right = 'RIGHT',
}

const diretion: string = Direction.Up

const direction2: Direction = 'UP'; //编译错误
```





#### 慎用的枚举形式



#### 常量枚举成员和计算枚举成员

根据枚举成员的值可以将枚举成员划分位如下两类:

* 常量枚举成员
* 计算枚举成员

#### 常量枚举成员

符合的几种情况,都是常量枚举成员:

* 没有显式声明初始值,且是第一个枚举成员
* 不是第一个枚举成员, 但是前一个枚举成员的类型是数值型.
* 枚举成员的值是**常量枚举表达式**

##### 常量枚举表达式

> 是TS表达式的子集,能够在编译阶段被求值.

具体规则:

* 可以是: 数字字面量,字符串字面量和不包含替换值的模板字面量;
* 可以是: 对前面定义的常量枚举成员的引用;
* 可以是用分组运算符包围起来的常量枚举表达式
* 可以使用一元运算符`+, -, ~`, 操作数必须为常量枚举表达式.
* 可以使用二元运算符`+,-,*, **, /, %, <<, >>, >>>, &, |, ^`, 两个操作数必须为常量枚举表达式



ok,让我们来看下例子吧:

```ts
enum Foo {
  A=0,
  B=`B`,
  C='C',
  D=A,
}

enum Bar {
  A=-1,
  B=1+2,
  C=(4/2)*3
}
```



```ts
let a = 1;
enum Foo {
  A,
  B=`${a}` //显式报错: Type 'string' is not assignable to type 'number' as required for computed enum member values.ts(18033)
}

//
enum Foo2 {
  A:string, //An enum member name must be followed by a ',', '=', or '}'.ts(1357)
}
```



#### 计算枚举成员

##### 是什么

> 除常量枚举成员之外的其他枚举成员都属于计算枚举成员

```ts

enum Foo {
  A="a".lnegth,
  B=Math.pow(2,3)
}
```





#### 使用示例(降低耦合度)

枚举表示一组有限元素的集合,并通过枚举成员名来引用集合中的元素. 有时, 程序并不关心枚举成员值, 在这种情况下,让TS自动计算枚举成员值是很方便. 

程序不依赖枚举成员值时,可以降低代码的耦合度,使其易于扩展. 例如,想给Direction枚举添加一个名为None的枚举成员来表示未知方向。按照惯例，None应作为第一个枚举成员,同时其它枚举成员的值也会发生变化, 由于move函数行为不直接依赖枚举成员的值,因此这次修改对已有功能不会产生任何影响.

```ts
enum Direction {
  up,
  down,
  left,
  right
}

function move(direction: Direction) {
  switch(direction) {
    case Direction.up:
      console.log('up')
      break
    case Direction.down:
      console.log('down')
      break
    case Direction.left:
      console.log('left')
      break
    case Direction.right:
      console.log('right')
      break
  }
}

move(Direction.up)   //up
move(Direction.down) //down


//
```





#### 联合枚举类型(Union enums types)

##### 是什么

> 当枚举类型中的所有成员都是字面量枚举成员时，该枚举类型成了联合枚举类型。

官网上的描述: '有一种特殊的常量枚举成员类型, 其不会被计算值. 字面量枚举成员是没有初始化值的常量枚举成员或是有值且初始化是如下几种情况的: 

* 任意字符串字面量
* 任意数值字面量
* 使用了一元减号的任意数值字面量.

`这里我们还是需要回忆下不符合条件的枚举成员值有: 二元表达式/变量/函数调用/引用的之前枚举成员/`

当枚举中所有成员具有字面量枚举值时,会产生如下语义:

* **枚举成员也会成为一种类型**

* **枚举类型自身会成为每个枚举成员的一种并集**(就是联合类型)

```ts
// 枚举成员也是一种类型

enum ShapeKind {
  Circle,
  Square
}

interface Circle {
  kind: ShapeKind.Circle,
  radius: number
}

interface Square {
  kind: ShapeKind.Square,
  radius: number
}

let c: Circle {
  kind: ShapeKind.Square,
  // 
  radius: 100
}
```





##### 联合枚举成员类型

> 定义, 

联合枚举成员类型是联合枚举类型的子类型,因此可以将成员类型赋值给联合枚举类型.

```ts
enum Direction {
  up,
  down
}

const up: Direction.up = Direction.up
const direction: Direction = up
```



##### 联合枚举类型

> 定义, 是由所有联合枚举成员类型构成的联合类型

```ts
enum Direction {
  left,
  down,
  right,
  left
}

type UnionDirectionType = Direction.up | Direction.down | Direction.right | Direction.left
```





#### 在运行时

在运行时,枚举以对象形式存在. 

```ts
enum E {
  X,
  Y,
  Z,
}
 
function f(obj: { X: number }) {
  return obj.X;
}
 
// Works, since 'E' has a property named 'X' which is a number.
f(E);
```



#### 在编译时

> 使用`keyof typeof`获取表示所有枚举键为字符串的类型.

```ts
enum LogLevel {
  ERROR,
  WARN,
  INFO,
  DEBUG,
}
 
/**
 * This is equivalent to:
 * type LogLevelStrings = 'ERROR' | 'WARN' | 'INFO' | 'DEBUG';
 */
type LogLevelStrings = keyof typeof LogLevel;
 
function printImportant(key: LogLevelStrings, message: string) {
  const num = LogLevel[key];
  if (num <= LogLevel.WARN) {
    console.log("Log level key is:", key);
    console.log("Log level value is:", num);
    console.log("Log level message is:", message);
  }
}
printImportant("ERROR", "This is a message");
```



##### 反转映射







##### `const`枚举







##### Ambient enums(包裹枚举?)



#### 对象 vs. 枚举

> 在ts中,如果一个对象使用`as const`,你可能都不需要枚举了. 此处对象是常量对象.





















### 引用类型的标注

数组类型有两种标注方法:
> 这两种方式没有明显的区别，获得的类型提示都是完全一致的，仅仅取决于你想把数组成员的类型写在前还是后。
* `Array<数组类型>`
* `数组类型[]`

```ts
const userName1: string[] = [];
const userName1: Array<string> = [];
```

Set类型和Map类型和数组类型标注有点类似.
```ts

const set = new Set<number>();

set.add(1);
set.add('2'); // X 类型“string”的参数不能赋给类型“number”的参数。

const map = new Map<number, string>();

map.set(1, '1');
map.set('2', '2'); // X 类型“string”的参数不能赋给类型“number”的参数。

```




对象类型标注:
使用接口(interface)进行标注:
```ts
interface User {
	userName: string,
	userAge: number,
	userMarried: boolean
}

const user: User = {
	userName: 'test', 
	userAge: 20, 
	userMarried: false,
}
```



#### 进阶类型


##### 接口类型
* 接口的属性类型可以是任意有效的类型，可以是一个接口
* 接口加上数组类型,可以描述一个成员是对象的数组类型
* 可选属性使用`?`当作可选标记

```ts
interface JobModel {
  // ...
}

interface Job {
  currentModel: JobModel;
}

interface User {
  userJob: Job;
}

```

```ts
const userList: User[] = [
  {
    userName: 'test',
    userAge: 20,
    userMarried: false,
  },
  {
    userName: 'test',
    userAge: 20,
    userMarried: false,
  },
  {
    userName: 'test',
    userAge: 20,
    userMarried: false,
  },
];

```


```ts
// 这里的问号意味着，userJob 被标记成了一个可选的属性，也就是说变量即使不具有 userJob 属性，也可以认为是符合了 User 类型：

interface User {
  userName: string;
  userAge: number;
  userMarried: boolean;
  userJob?: string;
}


const user: User = {
  userName: 'test',
  userAge: 20,
  userMarried: false,
};

```



### 对象类型

#### 元组类型

> 通常用于表示长度较固定的类型,并可分别指定每个元素的类型.

#### 元组的声明和读写
```ts
let 变量名称: [类型1,类型2,...,类型n] = [值1,值2,...,值n]
```
可以设置为只读元组
```ts
let 变量名称: readonly[] = [类型1,类型2,...,类型n] = [值1,值2,...,值n]
```


#### 元组中的可选元素和剩余元素
> 在声明元组时,将元组尾部的一些元素声明为可选元素,对这些元素可以不设置初始值.

```ts
let 变量名称: [类型1,类型2,...,可选类型1?,可选类型2?,...] = [初始值列表]

//实例
let tumple1 = [number, number, string?, number? ] = [100,200]; //不会编译错误
```

> 设置可选元素依然会限定元组的最小长度及最大长度。如果元组尾部的元素数量不确定，可以使用剩余元素表示。剩余元素的声明方式如下，只需在元组类型声明尾部加上“...类型[​]​”即可。

```ts
let 变量名称: [类型1,类型2,...,类型n,...类型[]] = [初始值列表];
```

> 可选元素和剩余元素可以混合使用，但可选元素必须位于中间，剩余元素必须位于最后。

```ts
let tuple1: [number, boolean?, ...string[]] = [1];
tuple1 = [1, true];
tuple1 = [1, true, "a", "b", "c"];
```

#### 元组的方法
> 元组本质上是数组,数组所有的方法都可以使用,但不建议使用任何方法,因为使用这些方法会使元组绕过编译检查.

```ts
let tuple2: [string, number, boolean] = ["a", 1, true];
//以下代码将执行成功，执行后元组为 ["a", 1, true,4]
tuple2.push(4);
//以下2句代码将执行成功，执行后元组为 [2, 1, true,4]
tuple2.shift();
tuple2.unshift(2);
```

#### 元组转换为数组
元组是数组的子类型,因此可以将元组的值赋给数组,然后作为数组使用.但不推荐,因为作为数组使用也会绕过编译检查.
数组的值不能赋给元组,会引起编译错误.



### 函数类型

#### 函数声明与函数表达式类型描述
```ts
function sum(a: number, b: number): number {
  return a + b;
}

const sum = function(a: number, b: number): number {
  return a + b;
};

```


#### 函数表达式的另一种类型描述
使用变量类型标注的方式(`const sum:函数类型=...`)来标注函数表达式类型的.

1. 搭配类型别名
2. 使用变量类型标注方式给函数表达式进行类型标注
```ts
type Sum = (a: number, b: number) => number;

const sum: Sum = function(a,b) {
	return a + b;
}
```


#### 函数返回值 void vs undefined
> 在 5.1 版本之前返回值类型标注为 undefined，就需要有显式的 return 语句.在之后，TS 对这个不符直觉的问题进行了修正，即允许了 undefined 作为无显式 return 语句函数的返回值类型，但考虑到发布时间较晚，因此还是有必要了解这个问题的。

```ts

// 5.1之前 返回undefined类型,需要显式使用return; 5.1版本之后,无需显式使用return
function handle(): undefined {
	//....
	return;
}

// void表示函数没有返回值
function handler1(): void {};
```



#### 函数重载
> 是函数重载的概念，它指的就是根据不同的入参匹配不同的实际逻辑，实现一个函数名走天下。但是参数名称因为入参类型的多样,无法描述清楚.所以TS支持了类型层面的重载.

```js

function sum(x, y) {
  if (typeof x === 'number' && typeof y === 'number') {
    return x + y;
  } else if (Array.isArray(x) && typeof y === 'number') {
    return x.map((num) => num + y);
  } else if (typeof x === 'number' && Array.isArray(y)) {
    return y.map((num) => num + x);
  } else if (Array.isArray(x) && Array.isArray(y)) {
    if (x.length !== y.length) {
      throw new Error('Arrays must have the same length');
    }
    return x.map((num, index) => num + y[index]);
  } else {
    throw new Error('Invalid arguments');
  }
}

console.log(sum(2, 3)); // 5
console.log(sum([1, 2, 3], 4)); // [5, 6, 7]
console.log(sum(5, [1, 2, 3])); // [6, 7, 8]
console.log(sum([1, 2, 3], [4, 5, 6])); // [5, 7, 9]
console.log(sum('a', 'b')); // Error: Invalid arguments
console.log(sum([1, 2, 3], [4, 5])); // Error: Arrays must have the same length

```

```js
// 函数入参
function sum(numberOrArray, numberOrArray) { }

```


```ts
// 函数重载

function sum(base: number, incre: number): number;
function sum(baseArray: number[], incre: number): number[];
function sum(incre: number, baseArray: number[]): number[];
function sum(baseArray: number[], increArray: number[]): number[];
function sum(x: number | number[], y: number | number[]): number | number[] {
  if (typeof x === 'number' && typeof y === 'number') {
    return x + y;
  } else if (Array.isArray(x) && typeof y === 'number') {
    return x.map((num) => num + y);
  } else if (typeof x === 'number' && Array.isArray(y)) {
    return y.map((num) => num + x);
  } else if (Array.isArray(x) && Array.isArray(y)) {
    if (x.length !== y.length) {
      throw new Error('Arrays must have the same length');
    }
    return x.map((num, index) => num + y[index]);
  } else {
    throw new Error('Invalid arguments');
  }
}

```

> 需要注意的是，在标注了每一种可能的重载的方式以后，在最后那个实际实现的函数类型标注里，我们需要标注各个参数类型和返回值类型，使用上面所有重载可能出现的类型组成的联合类型。但实际上这最后一个函数类型标注并不会被调用方看到，在匹配到对应的调用时，我们就能够获取到与参数组合完全匹配的提示与类型保障：



> TypeScript 中的函数重载还是属于**伪重载**，它只能在类型层面帮你实现重载的效果，而实际的逻辑运行，由于 JavaScript 不支持，它也就束手无策了。真正的函数重载应该是直接定义多个同名的函数，这些函数的内部逻辑是仅服务一套参数组合的，比如上面的例子用 Java 改写：

```java
public class Calculator {
    public int add(int x, int y) {
        return x + y;
    }

    public int[] add(int[] x, int y) {
        // 省略内部实现
    }

    public int[] add(int x, int[] y) {
        // 省略内部实现
    }

    public int[] add(int[] x, int[] y) {
        // 省略内部实现
    }

    public static void main(String[] args) {
        Calculator calculator = new Calculator();
        // 自动根据入参类型分发到对应的方法
        System.out.println(calculator.add(2, 3)); // 5
        System.out.println(Arrays.toString(calculator.add(new int[]{1, 2, 3}, 4))); // [5, 6, 7]
        System.out.println(Arrays.toString(calculator.add(5, new int[]{1, 2, 3}))); // [6, 7, 8]
        System.out.println(Arrays.toString(calculator.add(new int[]{1, 2, 3}, new int[]{4, 5, 6}))); // [5, 7, 9]
    }
}

```



### Class



#### 面向过程与面向对象



#### 两种方式的比较

> 你可以认为它们是实现同一种效果的不同手段而已。
>
> * 比如类比到做一锅黄焖鸡，
>   * 面向对象要求:你分别建立鸡肉对象、土豆对象、青椒对象、锅对象等等，这些对象携带着自己的信息，只要将它们组合在一起就是一道菜。
>   * 面向过程的范式则是，按照顺序逐步完成这道菜，依次备菜、起锅烧油、煎炒、焖等等。
> * 面向对象强调对象的组合交互; 面向过程强调程序的执行流程
> * 函数与 Class，分别是面向过程和面向对象这两种编程范式中的底层实现依赖。
>
> 



#### 面向对象

Class类如何体现面向对象的特点?

* 封装性:  它将一个对象相关的所有属性和方法封装在 Class 内部，供外界进行交互
* 继承

| 特性   | 面向对象                                                     | 面向过程                           |
| ------ | ------------------------------------------------------------ | ---------------------------------- |
| 封装性 | 一个对象相关的所有属性和方法封装在 Class 内部，供外界进行交互 | 需要通过一个个变量和函数来进行维护 |
| 继承性 | 实现继承                                                     |                                    |



```js
// 封装性


// 函数实现
const person1 = {
  name: 'Linbudu',
  age: 18
}

const getPersonDesc = (person) => {
  return `${person.name} at ${person.age} years old`;
}


// 类class实现
class Person {
  name;
  age;

  constructor(personName, personAge) {
    this.name = personName;
    this.age = personAge;
  }
  
  getDesc(): string {
    return `${this.name} at ${this.age} years old`;
  }
}

// 实例
const person1 = new Person("Linbudu", 18);
const person2 = new Person("Charles", 20);

person1.name; // Linbudu
person1.getDesc(); // Linbudu at 18 years old


// 继承
class School {}

class Student extends Person {
  grade: number;
  school: School;
}

class Job {}

class Worker extends Person {
  salary: number;
  job: Job;
}

```



#### class中类型描述

##### 基本介绍

```ts
class Person {
  name: string;
  age: number;

  constructor(personName: string, personAge: number) {
    this.name = personName;
    this.age = personAge;
  }

  getDesc(): string {
    return `${this.name} at ${this.age} years old`;
  }
}

const person = new Person("Linbudu", 18);

console.log(person.getDesc()); // Linbudu at 18 years old

```



#### 类中的重载

```ts
class Person {
  feedPet(catFood: CatFood): void;
  feedPet(dogFood: DogFood): void;
  feedPet(rabbitFood: RabbitFood): void;
  feedPet(food: CatFood | DogFood | RabbitFood): void {}
}

```





#### 作为工具方法的命名空间

例如,可能会在 utils 文件夹下封装很多通用的函数,果这些工具方法都放置在一个文件内部，那使用起来就可能显得混乱.可以考虑使用 Class ，将一批功能类似的方法收拢到一个 Class 内部：

```ts
// util文件 显得混乱

export function isSameDate(){ } // 判断两个日期是否是同一天

export function diffDate(){ } // 判断两个日期的差值

export function getRandomInt(){ } // 获取随机整数

// ...


// util文件 使用class命令空间
export class DateUtils {
  static isSameDate(){ }  // 静态成员
  static diffDate(){ }
}

export class NumberUtils { }
export class UserListUtils { }
// ...



//导入文件并使用
import { DateUtils } from './utils';

DateUtils.isSameDate();

```







## any unknow 类型断言

### any

> 在我们不知道对一个变量提供何种类型时，就可以使用 any 类型来作为临时性的过渡方案
>
> any 类型 = 万能类型 + 放弃类型检查

```ts
let x: any;

function myFunc(param: any): any { ... }

const myArray: any[] = [1, "hello", true];

let myObject: any = { prop1: "hello", prop2: 123 };

```



### unknow

> unknow类型 = 万能类型 + 保留类型检查

```ts
function myFunc(param: unknown) {
  // ...
}

myFunc({});
myFunc([]);
myFunc(true);

```



### 类型断言

它能够修改一个变量的类型——无论是TS自己推导的，还是你手动标注的。



#### 将非具体类型断言为具体类型

```ts
// unknow类型报错

function myFunc(param: unknown) {
  param.forEach((element) => {}); // X “param”的类型为“未知”。
}

// 使用类型断言解决unknow类型报错的问题
function myFunc(param: unknown) {
  (param as unknown[]).forEach((element) => {});
}

```



```ts
// 第二个断言更能体现断言的意义: 

function myFunc(param: unknown) {
  (param as number[]).forEach((element) => {
    element = element + 1;
  });
}

function myFunc(param: unknown) {
  (param as unknown[]).forEach((element) => {
    element = (element as number) + 1;
  });
}

```





#### 将具体类型断言为非具体类型

将一个拥有具体类型的变量断言到 any / unknown 类型：

```ts
const str: string = "linbudu";

(str as any).handler().result.prop; // ...

```

> 为什么我们需要这么做？因为很多时候，你面临的项目中并不会是完全没有类型定义的，这些变量可能最开始也是被维护者精心设计了类型的，但随着项目的不断迭代和维护者的更替，它们才日渐年久失修，导致你在使用这些变量时需要面对大量的类型报错。所以这个时候我们就可以请出类型断言，先将其断言到一个万能类型，然后就重复我们上面学习的，随着一步步调用不断完善类型，然后最后回头补全的过程。



#### 类型断言实践

```ts
interface IUser {
  name: string;
  job?: IJob;
}

interface IJob {
  title: string;
}

const user: IUser = {
  name: 'foo',
  job: {
    title: 'bar',
  },
};

const { name, job = {} } = user;

const { title } = job; // 类型“{}”上不存在属性“title”。

```

由于我们在第一次解构赋值时，为 job 提供了一个空对象作为默认值，TypeScript 会认为此时 job 的类型就是一个空对象，所以我们在第二次解构赋值时，就无法从 job 上获得 title 属性了。要解决这个问题，我们可以在第一次解构赋值时将这个空对象断言到预期的类型：

```ts
const { name, job = {} as IJob } = user;

const { title } = job;

```



## 类型别名,联合类型,交叉类型



### 类型别名

在 TypeScript 中，类型别名起到的就是变量(引用,复用)的作用，它可以存储一个类型，后续你可以直接引用它即可。

#### 使用场景

##### 1.引用复用

```ts
type Handler = () => void;

const handler1: Handler = () => {};
const handler2: Handler = () => {};

```

##### 2.替换接口,实现对对象类型的复用

```ts
type User =  {
  userName: string;
  userAge: number;
  userMarried: boolean;
  userJob?: string;
}

const user: User = { /* ... */ }

```



### 联合类型

#### 语法

定义一个联合类型，需要使用类型别名来存放：

```ts
//语法

A | B | C

// 定义
type PossibleType = string | number | boolean;

// 使用

let foo: PossibleType = 'lin';
foo = 599;
foo = true;

```

#### 使用场景

联合类型对其中的类型成员并没有限制，你可以混合原始类型，字面量类型，函数类型，对象类型等等等等。而在实际应用中，最常见的应该是**字面量联合类型**，它表示一组精确的字面量类型：

##### 字面量联合类型

```ts

type Status = 'success' | 'failure';
type Code = 200 | 404 | 502;

```



##### 接口联合类型

```ts
interface VisitorUser {}
interface CommonUser {}
interface VIPUser {}
interface AdminUser {}

type User = VisitorUser | CommonUser | VIPUser | AdminUser;

const user: User = {
  // ...任意实现一个组成的对象类型
}

```



### 字面量类型

#### 是什么

> 字面量类型是和原始类型以及对象类型对应的.可以将**字面量类型**作为标注类型. 相比它们对应的原始类型，能够提供更精确的类型信息与类型提示.



将变量类型约束在几个特定的字符串值之间.表达“这个变量是字符串类型”和“这个变量只能是'xxx'这个字符串”这两个概念.

```ts
type Status = 'success' | 'failure'; // 组成Status 的这两个“值”，其实就是字面量类型
type Code = 200 | 404 | 502;

const literalString: 'linbudu' = 'linbudu';
const literalNumber: 599 = 599;
const literalBoolean: true = true;
const literalObject: { name: 'linbudu' } = { name: 'linbudu' };
const literalArray: [1, 2, 3] = [1, 2, 3];

```



### 交叉类型

交叉类型的本质，其实就是表示一个同时满足这些子类型成员的类型，所以如果你交叉两个对象类型，可以理解为是一个新的类型内部合并了这两个对象类型. 使用`&`实现交叉类型.

```ts
interface UserBasicInfo {}
interface UserJobInfo {}
interface UserFamilyInfo {}

type UserInfo = UserBasicInfo & UserJobInfo & UserFamilyInfo;

// 类型别名UserInfo表示,需要实现3个对象的所有属性.
```



注意事项:

交叉类型结果为`never`类型(没有任何意义的类型)

```ts
type Test = string & number; // never 类型

```



#### 使用

##### 交叉类型和联合类型同时使用

先交叉再联合

```ts
// 伪代码
type Reward = (FE & React) | (OutstandingAuthors & PostLastMonth);

```

先联合再交叉

```ts
type UnionIntersection = (1 | 2 | 3) & (1 | 2); // 1 | 2
```





## 泛型

> 「泛型」，其实本质就是类型世界中的参数。参数与返回值类型的关联时，才使用泛型。

### 泛型在类型别名中

> Status 就像一个函数，它声明了自己有一个参数 T，即泛型，并会将这个参数 T 合并到自己内部的联合类型中。

```ts
type Status = 'success' | 'failure' | 'pending';

type Status<T> = 'success' | 'failure' | 'pending' | T;
type CompleteStatus = Status<'offline'>;

```



### 泛型在函数中

背景:

如果一个函数,入参和出参的类型一致,应该怎么写呢?

```ts
function fn(a: string|number): string|number {}
```

这种写法就会面临两个问题:

* 联合类型无法一一对应
* 类型增多以后,非常不实用

这个时候就需要泛型.

```ts
function fn<T>(a: T): T {}
```

#### 3个T的作用

1. 第一个`<T>`是声明泛型
2. 第2和第3个T是普通的类型标注

#### 多个泛型

函数中多个入参类型.

```ts
function fn<T1, T2, T3>(a: T1, b: T2, c: T3): T1 {}
```





## 类型声明: 让JS和TS融合得再紧密一些

体现在3个方面:

* 前期数以百万计的npm包,可以通过`类型声明`来实现类型提示,而不需要新发布一个版本
  * 类型声明在TS中需要专门的`.d.ts`文件来书写, 这里的`d`就是declaration的意思
* 模块类型声明
  * 可以为JS/TS,及非JS/TS类型文件提供类型声明
* 变量类型声明

```ts
//npm包的类型声明的两种方式

1.一种是将类型声明包含在包内, 例如axios
2.一种是将类型声明提供在包外, 例如@types/lodash, 里面是`xxx.d.ts`
```



```ts

// 模块类型声明

declare module "lodash" {
  camelCase(string?: string): string;
  capitalize(string?: string): string;
  endsWith(string?: string): string;
  // ...
}


// css module
// CSS modules
type CSSModuleClasses = { readonly [key: string]: string }

declare module '*.module.css' {
  const classes: CSSModuleClasses
  export default classes
}
declare module '*.module.scss' {
  const classes: CSSModuleClasses
  export default classes
}
declare module '*.module.sass' {
  const classes: CSSModuleClasses
  export default classes
}
// ...

```



```ts
// 变量类型声明
declare var window: Windos & typeof globalThis;

interface Window {
  //....
}
```



## 内置工具类型

> 对于内置方法，其实就是一批语言层面提供了的通用工具方法，还是以 JavaScript 为例，内置方法既包括了我们可以通过其它方法模拟的 `Array.prototype.map`，也包括 `Function()` 这样只能由底层引擎实现的部分。而 JavaScript 中的内置方法是用来操作值的，TypeScript 的内置方法是用来操作类型的。
>
> **TypeScript 内置了一批简单的工具类型，它们就是类型别名的使用方式，同时在全局可用，无需导入**



对象类型的处理是内置工具类型中占比较大的部分,例如Partial, Required, Readonly, Record, Pick, Omit...;除此以外，集合类型与函数类型也占有一席之地。比如集合类型的 Exclude(差集) 和 Extract(交集)。Exclude 和 Extract 的作用也正是如此，只要你把联合类型看成一个类型组成的集合就好理解了。内置工具类型中提供了 Parameters 和 ReturnType 这两个类型来提取函数的参数类型与返回值类型：

### Partial

> 工具类型Partial，它接收一个对象类型，并**将这个对象类型的所有属性都标记为可选**，这样我们就不需要一个个将它们标记为可选属性了。



```ts
type User = {
  name: string;
  age: number;
  email: string;
};

type PartialUser = Partial<User>;

const user: User = {
  name: 'John Doe',
  age: 30,
  email: 'john.doe@example.com'
};

// 可以不实现全部的属性了！
const partialUser: PartialUser = {
  name: 'John Doe',
  age: 30
};

```



### Required

> 将属性标记为必选的 Required

```ts
type User = {
  name?: string;
  age?: number;
  email?: string;
};

type RequiredUser = Required<User>;

const user: User = {
  name: 'John Doe'
};

// 现在你必须全部实现这些属性了
const requiredUser: RequiredUser = {
  name: 'John Doe',
  age: 30,
  email: 'john.doe@example.com'
};


```



### Readonly

> 用于将对象类型所有属性标记为只读的工具类型 Readonly

```ts
type User = {
  name: string;
  age: number;
  email: string;
};

type ReadonlyUser = Readonly<User>;

const user: User = {
  name: 'John Doe',
  age: 30,
  email: 'john.doe@example.com'
};

const readonlyUser: ReadonlyUser = {
  name: 'John Doe',
  age: 30,
  email: 'john.doe@example.com'
};

// 修改 user 对象的属性
user.name = 'Jane Doe';
user.age = 25;
user.email = 'jane.doe@example.com';

// 修改 readonlyUser 对象的属性
// readonlyUser.name = 'Jane Doe';  // 报错
// readonlyUser.age = 25;  // 报错
// readonlyUser.email = 'jane.doe@example.com';  // 报错


```



### Record

> 用于声明一个内部属性**键类型一致、键值类型也一致**的对象类型



```ts
type UserProps = 'name' | 'job' | 'email';

// 等价于你一个个实现这些属性了
type User = Record<UserProps, string>;

const user: User = {
  name: 'John Doe',
  job: 'fe-developer',
  email: 'john.doe@example.com'
};

```

可以使用 Record 类型来声明属性名还未确定的接口类型，如：

```ts
type User = Record<string, string>;

const user: User = {
  name: 'John Doe',
  job: 'fe-developer',
  email: 'john.doe@example.com',
  bio: 'Make more interesting things!',
  type: 'vip',
  // ...
};

```



### Pick

> Pick 类型接收一个对象类型，以及一个字面量类型组成的联合类型，这个联合类型只能是由对象类型的属性名组成的。它会对这个对象类型进行裁剪，只保留你传入的属性名组成的部分：

```ts
type User = {
  name: string;
  age: number;
  email: string;
  phone: string;
};

// 只提取其中的 name 与 age 信息
type UserBasicInfo = Pick<User, 'name' | 'age'>;

const user: User = {
  name: 'John Doe',
  age: 30,
  email: 'john.doe@example.com',
  phone: '1234567890'
};

const userBasicInfo: UserBasicInfo = {
  name: 'John Doe',
  age: 30
};

```





### Omit

> Omit 类型就是 Pick 类型的另一面，它的入参和 Pick 类型一致，但效果却是相反的——它会移除传入的属性名的部分，只保留剩下的部分作为新的对象类型：

```ts
type User = {
  name: string;
  age: number;
  email: string;
  phone: string;
};

// 只移除 phone 属性
type UserWithoutPhone = Omit<User, 'phone'>;

const user: User = {
  name: 'John Doe',
  age: 30,
  email: 'john.doe@example.com',
  phone: '1234567890'
};

const userWithoutPhone: UserWithoutPhone = {
  name: 'John Doe',
  age: 30,
  email: 'john.doe@example.com'
};


```



### Exclude

> 代表差集的 Exclude，它能够从一个类型中移除另一个类型中也存在的部分：

```ts
type UserProps = 'name' | 'age' | 'email' | 'phone' | 'address';
type RequiredUserProps = 'name' | 'email';

// OptionalUserProps = UserProps - RequiredUserProps
type OptionalUserProps = Exclude<UserProps, RequiredUserProps>;

const optionalUserProps: OptionalUserProps = 'age'; // 'age' | 'phone' | 'address';

```



### Extract

> 用于提取另一个类型中也存在的部分，即交集：

```ts
type UserProps = 'name' | 'age' | 'email' | 'phone' | 'address';
type RequiredUserProps = 'name' | 'email';

type RequiredUserPropsOnly = Extract<UserProps, RequiredUserProps>;

const requiredUserPropsOnly: RequiredUserPropsOnly = 'name'; // 'name' | 'email';


```



### Paramters  ReturnType

```ts
type Add = (x: number, y: number) => number;

type AddParams = Parameters<Add>; // [number, number] 类型
type AddResult = ReturnType<Add>; // number 类型

const addParams: AddParams = [1, 2];
const addResult: AddResult = 3;

```



### typeof

> 那么如果，我们只有一个函数，而并没有这个函数类型呢？此时可以使用 TypeScript 提供的类型查询操作符，即 typeof（记得和 JavaScript 的 typeof 区分一下），来获得一个函数的结构化类型，再配合工具类型即可即可：

```ts
const addHandler = (x: number, y: number) => x + y;

type Add = typeof addHandler; // (x: number, y: number) => number;

type AddParams = Parameters<Add>; // [number, number] 类型
type AddResult = ReturnType<Add>; // number 类型

const addParams: AddParams = [1, 2];
const addResult: AddResult = 3;

```



### Awaited

> 对于异步函数类型，提取出的返回值类型是一个 `Promise<string>` 这样的类型，如果我想提取 Promise 内部的 string 类型呢？贴心的 TypeScript 为你准备了 Awaited 类型用于解决这样的问题：

```ts
const promise = new Promise<string>((resolve) => {
  setTimeout(() => {
    resolve("Hello, World!");
  }, 1000);
});

type PromiseInput = Promise<string>;
type AwaitedPromiseInput = Awaited<PromiseInput>; // string

```



```ts
// 定义一个函数，该函数返回一个 Promise 对象
async function getPromise() {
  return new Promise<string>((resolve) => {
    setTimeout(() => {
      resolve("Hello, World!");
    }, 1000);
  });
}

type Result = Awaited<ReturnType<typeof getPromise>>; // string 类型

```







## 模板字符串类型

> TS 中提供了“模板字符串类型”这么一个能力，类似于模板字符串，它可以实现对字面量类型的计算，以及批量生成字符串类型的能力



### 使用

> 模板字符串类型的语法和模板字符串完全一致，包括定义与内部的计算插槽：

```ts
type Name = 'linbudu';

// "Hi, linbudu"
type Greeting = `Hi, ${Name}`;

```



> **模板字符串类型可以提供更为精确的字符串类型结构描述**，比如此前，我们无法检查一个字符串是否满足 `1.2.3` 这样结构的版本号格式：

```ts
type Version = string;

const v1: Version = '1.1.0';
const v2: Version = '1.0'; // 没有检查出不符合预期结构

```

```ts
type Version = `${number}.${number}.${number}`;

const v1: Version = '1.1.0';
const v2: Version = '1.0'; // 报错：类型 "1.0" 不能赋值给类型 `${number}.${number}.${number}`
const v3: Version = 'a.0.0'; // 报错：类型 "a.0" 不能赋值给类型 `${number}.${number}.${number}`

```



> 即当一个模板字符串类型中的插槽传入了联合类型时，这个模板字符串类型会自动被扩展为使用所有联合类型的组合。

```ts
type Brand = 'iphone' | 'xiaomi' | 'honor';

type SKU = `${Brand}`; // "iphone" | "xiaomi" | "honor"

```

多个插槽都被传入了联合类型

```ts
type Brand = 'iphone' | 'xiaomi' | 'honor';
type Memory = '16G' | '64G';
type ItemType = 'official' | 'second-hand';

type SKU = `${Brand}-${Memory}-${ItemType}`;

```





## 配置TypeScript

> 按照这些配置的能力来划分，可以分为**产物控制、输入与输出控制、类型声明、代码检查**几大类，你并不需要每次创建新项目都把它们配置一遍，按照自己的实际需求进行微调即可。

### 产物控制

> 是通常配置最频繁的部分，主要是 target 与 module 这两个配置项，它们分别控制产物语法的 ES 版本以及使用的模块（CommonJs / ES Module）

#### target配置

```js
//原始代码
const arr = [1, 2, 3];

for (let i of arr) {
  console.log(i);
}

const obj = {
  a: 1,
  b: 2,
  c: 3
};

for (let key in obj) {
  console.log(key);
}


//编译成不同环境的代码
// ES6
"use strict";
const arr = [1, 2, 3];
for (let i of arr) {
    console.log(i);
}
const obj = {
    a: 1,
    b: 2,
    c: 3
};
for (let key in obj) {
    console.log(key);
}

// ES5
"use strict";
var arr = [1, 2, 3];
for (var _i = 0, arr_1 = arr; _i < arr_1.length; _i++) {
    var i = arr_1[_i];
    console.log(i);
}
var obj = {
    a: 1,
    b: 2,
    c: 3
};
for (var key in obj) {
    console.log(key);
}

```

如果我们的 target 指定了一个版本，比如 es5，但你又希望使用 es6 中才有的 Promise 语法，此时就需要在 lib 配置项中新增 'es2015.promise'，来告诉 TypeScript 你的目标环境中需要启用这个能力，否则就会得到一个错误：

```ts
const handler = async () => {};

//异步函数或方法必须返回 “Promise”。请确保具有对 “Promise” 的声明或在 “--lib” 选项中包含了 “ES2015”。ts(2697)
```

配置方式如下:

```ts
{
  "compilerOptions": {
    "lib": ["ES2015"],
    "target": "ES5"
  }
}

```



#### module配置

```js
export const foo = "foo";

export function bar() {
  console.log("bar");
}

// module 配置为 CommonJs
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bar = exports.foo = void 0;
exports.foo = "foo";
function bar() {
    console.log("bar");
}
exports.bar = bar;


// module 配置为 ESNext
export const foo = "foo";

export function bar() {
  console.log("bar");
}

```



### 输入控制/输出控制

> 在 TypeScript 中，我们首先使用 **include 和 exclude** 这两个配置项来确定要包括哪些代码文件，再通过 **outDir** 选项配置你要存放输出文件的文件夹

```json
// 首先通过 include ，我们指定了要包括 src 目录下所有的文件，再通过 exclude 选项，剔除掉已经被 include 进去的文件,
// 然后在完成编译后，你就可以在 dist 目录下找到编译产物了
{
  "compilerOptions": {
    "target": "es5",
    "module": "commonjs",
    "outDir": "dist",
    "strict": true
  },
  "include": [
    "src/**/*"
  ],
  "exclude": [
    "src/generated",
    "**/*.spec.ts"
  ]
}

```

上面说到在使用高于当前 target 时的语法，需要在 lib 中显式添加这部分语法的类型声明，那么如果使用了来自外部 npm 包的类型声明呢？在类型声明一节中我们已经学到，TypeScript 会加载所有 node_modules 中 所有 @types 文件夹下的声明文件，假设我们的项目中被三方依赖安装了大量的 @types 文件，导致类型加载缓慢或者冲突，此时就可以使用 types 配置项来显式指定你需要加载的类型定义：

```json
{
  "compilerOptions": {
    "types": ["node", "jest", "react"],
  }
}

```

以上配置会加载 `@types/node`，`@types/jest`，`@types/react` 这几个类型定义包。



### 类型相关配置

类型相关的配置项也是一个重要的组成部分，这里我们只挑几个使用频率最高的。

**declaration**

> 控制是否生成 .d.ts 文件，如果禁用的话你的编译产物将只包含 JS 文件，与之相对的是 emitDeclarationOnly，如果启用，则只会生成 .d.ts 文件，而不会生成 JS 文件，如果你两个都不想要呢？——请使用 noEmit ！启用后将不会输出 JS 文件与声明文件，但类型检查能力还是能保留的。



### 代码检查

> 即你看到的 no-XXX 格式的规则

- **noImplicitAny**，当 TypeScript 无法推断出你这个变量或者参数到底是什么类型时，它只能默默给一个 any 类型。如果你的项目维护地还比较认真，可以启用这个配置，来检查看看代码里有没有什么地方是遗漏了类型标注的。
- **noUnusedLocals** 与 noUnusedParameters，类似于 ESLint 中的 `no-unused-var`，它会检查你的代码中是否有声明了但没有被使用的变量/函数。是否开启同样取决于你对项目质量的要求，毕竟正常情况下项目中其实不应该出现定义了但没有消费的变量，这可能就意味着哪里的逻辑出错了。
- **noImplicitReturns**，启用这个配置项会要求你的函数中所有分支代码块都必须有显示的 return 语句，我们知道 JavaScript 中不写 return （即这里的 Implicit Returns）和只写一个简单的 return 的效果是完全一致的，但从类型层面来说却不一致，它标志着你到底是没有返回值还是返回了一个 undefined 类型的值。因此，启用这个配置项可以让你确保函数中所有的分支都有一个有效的 return 语句，在那些分支层层嵌套的情况下尤其好用。
