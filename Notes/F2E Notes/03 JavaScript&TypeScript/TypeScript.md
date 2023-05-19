## 资料

> [TypeScript中文文档_入门进阶必备 (yayujs.com)](https://ts.yayujs.com/)
>
> https://ts.yayujs.com/



# 基础

JavaScript 仅仅提供了动态类型（dynamic typing），这需要你先运行代码然后再看会发生什么。

替代方案就是使用静态类型系统（static type system），在代码运行之前就预测需要什么样的代码。



## 显示类型(explicit types)

为函数参数添加类型注解(type annotations),描述函数可以支持传入什么样的值.

```js
function greet(person: string, date: Date) {
  console.log(`Hello ${person}, today is ${date.toDateString()}!`);
}

// greet 支持传入一个 string 类型的 person 和一个 Date 类型的 date 。
```



## 类型抹除

类型注解并不是 JavaScript 的一部分。所以并没有任何浏览器或者运行环境可以直接运行 TypeScript 代码。这就是为什么 TypeScript 需要一个编译器，它需要将 TypeScript 代码转换为 JavaScript 代码，然后你才可以运行它。所以大部分 TypeScript 独有的代码会被抹除



## 降级(downleveling)

将高版本的 ECMAScript 语法转为低版本的过程就叫做**降级（downleveling）** 。

TypeScript 默认转换为 `ES3`，一个 ECMAScript 非常老的版本。

也可以使用 [target ](https://www.typescriptlang.org/tsconfig#target)选项转换为比较新的一些版本，比如执行 `--target es2015` 会转换为 ECMAScript 2015



## 配置

#### 严格模式

TypeScript 有几个严格模式设置的开关。除非特殊说明，文档里的例子都是在严格模式下写的。CLI 里的 [strict ](https://www.typescriptlang.org/tsconfig/#strict)配置项，或者 [tsconfig.json ](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html)中的 `"strict": true` 可以同时开启，也可以分开设置。在这些设置里，你最需要了解的是 [noImplicitAny ](https://www.typescriptlang.org/tsconfig#noImplicitAny)和 [strictNullChecks ](https://www.typescriptlang.org/tsconfig#strictNullChecks)。



#### noImplicitAny

启用 [noImplicitAny ](https://www.typescriptlang.org/tsconfig#noImplicitAny)配置项后，当类型被隐式推断为 `any` 时，会抛出一个错误。



#### strictNullChecks

默认情况下，像 `null` 和 `undefined` 这样的值可以赋值给其他的类型。这可以让我们更方便的写一些代码。但是忘记处理 `null` 和 `undefined` 也导致了不少的 bug

[strictNullChecks](https://www.typescriptlang.org/tsconfig#strictNullChecks)选项会让我们更明确的处理 `null` 和 `undefined`，也会让我们免于忧虑是否忘记处理 `null` 和 `undefined` 。

Example `tsconfig.json` files:

```json
{
  "compilerOptions": {
    "module": "commonjs",
    "noImplicitAny": true,
    "removeComments": true,
    "preserveConstEnums": true,
    "sourceMap": true
  },
  "files": [
    "core.ts",
    "sys.ts",
    "types.ts",
    "scanner.ts",
    "parser.ts",
    "utilities.ts",
    "binder.ts",
    "checker.ts",
    "emitter.ts",
    "program.ts",
    "commandLineParser.ts",
    "tsc.ts",
    "diagnosticInformationMap.generated.ts"
  ]
}
```



## 常见类型



### 原始类型: `string`，`number` 和 `boolean`（The primitives）



> 类型名 `String` ，`Number` 和 `Boolean` （首字母大写）也是合法的，但它们是一些非常少见的特殊内置类型。所以类型总是使用 `string` ，`number` 或者 `boolean` 。



### 数组(Array)

声明一个类似于 `[1, 2, 3]` 的数组类型，你需要用到语法 `number[]`。这个语法可以适用于任何类型（举个例子，`string[]` 表示一个字符串数组）。你也可能看到这种写法 `Array<number>`，是一样的。我们会在泛型章节为大家介绍 `T<U>` 语法。

> 注意 `[number]` 和 `number[]` 表示不同的意思，参考[元组 ](https://www.typescriptlang.org/docs/handbook/2/objects.html#tuple-types)章节





### any

TypeScript 有一个特殊的类型，`any`，当你不希望一个值导致类型检查错误的时候，就可以设置为 `any` 。

当一个值是 `any` 类型的时候:

* 可以获取它的任意属性 (也会被转为 `any` 类型)，
* 可以像函数一样调用它，
* 可以把它赋值给一个任意类型的值，
* 把任意类型的值赋值给它，
* 再或者是其他语法正确的操作



### `noImplicitAny`

如果你没有指定一个类型，TypeScript 也不能从上下文推断出它的类型，编译器就会默认设置为 `any` 类型。

如果你总是想避免这种情况，毕竟 TypeScript 对 `any` 不做类型检查，你可以开启编译项 [noImplicitAny ](https://www.typescriptlang.org/tsconfig#noImplicitAny)，当被隐式推断为 `any` 时，TypeScript 就会报错。





### 变量上的类型注解

当你使用 `const`、`var` 或 `let` 声明一个变量时，你可以选择性的添加一个类型注解，显式指定变量的类型：

```js
let myName:string = 'alice'
```

> TypeScript 并不使用“在左边进行类型声明”的形式，比如 `int x = 0`；类型注解往往跟在要被声明类型的内容后面。

不过大部分时候，这不是必须的。因为 TypeScript 会自动推断类型。举个例子，变量的类型可以基于初始值进行推断：

```js
// No type annotation needed -- 'myName' inferred as type 'string'
let myName = "Alice";
```





### 函数

**参数类型注解**

当你声明一个函数的时候，你可以在每个参数后面添加一个类型注解，声明函数可以接受什么类型的参数。参数类型注解跟在参数名字后面.当参数有了类型注解的时候，TypeScript 便会检查函数的实参.



> 即便你对参数没有做类型注解，TypeScript 依然会检查传入参数的数量是否正确



**返回值类型注解**

返回值的类型注解跟在参数列表后面：

```js
function getFavoriteNumber(): number {
  return 26;
}
```

跟变量类型注解一样，你也不需要总是添加返回值类型注解，TypeScript 会基于它的 `return` 语句推断函数的返回类型。



### 匿名函数

匿名函数有一点不同于函数声明，当 TypeScript 知道一个匿名函数将被怎样调用的时候，匿名函数的参数会被自动的指定类型。

这是一个例子：

```js
// No type annotations here, but TypeScript can spot the bug
const names = ["Alice", "Bob", "Eve"];
 
// Contextual typing for function
names.forEach(function (s) {
  console.log(s.toUppercase());
  // Property 'toUppercase' does not exist on type 'string'. Did you mean 'toUpperCase'?
});
 
// Contextual typing also applies to arrow functions
names.forEach((s) => {
  console.log(s.toUppercase());
  // Property 'toUppercase' does not exist on type 'string'. Did you mean 'toUpperCase'?
});
```

尽管参数 `s` 并没有添加类型注解，但 TypeScript 根据 `forEach` 函数的类型，以及传入的数组的类型，最后推断出了 `s` 的类型。

这个过程被称为**上下文推断（contextual typing）**，因为正是从函数出现的上下文中推断出了它应该有的类型。





### 对象类型

定义一个对象类型，我们只需要简单的列出它的属性和对应的类型。

```js
// The parameter's type annotation is an object type
function printCoord(pt: { x: number; y: number }) {
  console.log("The coordinate's x value is " + pt.x);
  console.log("The coordinate's y value is " + pt.y);
}
printCoord({ x: 3, y: 7 });
```

你可以使用 `,` 或者 `;` 分开属性，最后一个属性的分隔符加不加都行。

每个属性对应的类型是可选的，如果你不指定，默认使用 `any` 类型。



### 可选属性

对象类型可以指定一些甚至所有的属性为可选的，你只需要在属性名后添加一个 `?` ：

```js
function printName(obj: { first: string; last?: string }) {
  // ...
}
// Both OK
printName({ first: "Bob" });
printName({ first: "Alice", last: "Alisson" });
```

在 JavaScript 中，如果你获取一个不存在的属性，你会得到一个 `undefined` 而不是一个运行时错误。因此，当你获取一个可选属性时，你需要在使用它前，先检查一下是否是 `undefined`。



### 联合类型

TypeScript 类型系统允许你使用一系列的操作符，基于已经存在的类型构建新的类型。现在我们知道如何编写一些基础的类型了，是时候把它们组合在一起了。



#### 定义一个联合类型(管道符)

一个联合类型是由两个或者更多类型组成的类型，表示值可能是这些类型中的任意一个。这其中每个类型都是联合类型的**成员（members）**。

让我们写一个函数，用来处理字符串或者数字：

```js
function printId(id: number | string) {
  console.log("Your ID is: " + id);
}
// OK
printId(101);
// OK
printId("202");
// Error
printId({ myID: 22342 });
// Argument of type '{ myID: number; }' is not assignable to parameter of type 'string | number'.
// Type '{ myID: number; }' is not assignable to type 'number'.
```



#### 使用联合类型

在你有了一个联合类型的值后，你该怎样使用它呢？

TypeScript 会要求你做的事情，必须对每个联合的成员都是有效的。举个例子，如果你有一个联合类型 `string | number` , 你不能使用只存在 `string` 上的方法：

```js
function printId(id: number | string) {
  console.log(id.toUpperCase());
    // Property 'toUpperCase' does not exist on type 'string | number'.
    // Property 'toUpperCase' does not exist on type 'number'.
}
```

解决方案是用代码<u>收窄联合类型</u>，就像你在 JavaScript 没有类型注解那样使用。当 TypeScript 可以根据代码的结构推断出一个更加具体的类型时，类型收窄就会出现。

使用if...else进行代码收窄?

```js
function printId(id: number | string) {
  if (typeof id === "string") {
    // In this branch, id is of type 'string'
    console.log(id.toUpperCase());
  } else {
    // Here, id is of type 'number'
    console.log(id);
  }
}
```

再举一个例子，使用函数，比如 `Array.isArray`:

```js
function welcomePeople(x: string[] | string) {
  if (Array.isArray(x)) {
    // Here: 'x' is 'string[]'
    console.log("Hello, " + x.join(" and "));
  } else {
    // Here: 'x' is 'string'
    console.log("Welcome lone traveler " + x);
  }
}
```

有时候，如果联合类型里的每个成员都有一个属性，举个例子，数组和字符串都有 `slice` 方法，你就可以直接使用这个属性，而不用做类型收窄：

```js
// Return type is inferred as number[] | string
function getFirstThree(x: number[] | string) {
  return x.slice(0, 3);
}
```



### 类型别名

有的时候，一个类型会被使用多次，此时我们更希望通过一个单独的名字来引用它。这就是类型别名（type alias）。所谓类型别名，顾名思义，一个可以指代任意类型的名字。 其不属于JS中的任何数据类型,在运行时,Fish类型的对象将被视为普通的js对象.

类型别名的语法是：

```js
type Point = {
  x: number;
  y: number;
};
 
// Exactly the same as the earlier example
function printCoord(pt: Point) {
  console.log("The coordinate's x value is " + pt.x);
  console.log("The coordinate's y value is " + pt.y);
}
 
printCoord({ x: 100, y: 100 });
```

你可以使用类型别名给任意类型一个名字，举个例子，命名一个联合类型：

```js
type ID = number | string;
```

注意别名是唯一的别名，你不能使用类型别名创建同一个类型的不同版本。当你使用类型别名的时候，它就跟你编写的类型是一样的。换句话说，代码看起来可能不合法，但对 TypeScript 依然是合法的，因为两个类型都是同一个类型的别名:

```js
type UserInputSanitizedString = string;
 
function sanitizeInput(str: string): UserInputSanitizedString {
  return sanitize(str);
}
 
// Create a sanitized input
let userInput = sanitizeInput(getInput());
 
// Can still be re-assigned with a string though
userInput = "new input";
```



### 接口

接口声明（interface declaration）是*命名对象类型*的另一种方式：

```js
interface Point {
  x: number;
  y: number;
}
 
function printCoord(pt: Point) {
  console.log("The coordinate's x value is " + pt.x);
  console.log("The coordinate's y value is " + pt.y);
}
 
printCoord({ x: 100, y: 100 });
```

这个例子也同样可以运行，就跟我们使用了一个匿名对象类型一样。TypeScript 只关心传递给 `printCoord` 的值的结构（structure）——关心值是否有期望的属性。正是这种只关心类型的结构和能力的特性，我们才认为 TypeScript 是一个结构化（structurally）的类型系统。



#### 类型别名和接口的不同

类型别名和接口非常相似，大部分时候，你可以任意选择使用。接口的几乎所有特性都可以在 `type` 中使用，两者最关键的差别在于类型别名本身无法添加新的属性，而接口是可以扩展的。

```js
// Interface 通过继承扩展类型
interface Animal {
  name: string
}

interface Bear extends Animal {
  honey: boolean
}

const bear = getBear() 
bear.name
bear.honey


// Type 通过交集扩展类型
type Animal = {
  name: string
}

type Bear = Animal & { 
  honey: boolean 
}

const bear = getBear();
bear.name;
bear.honey;
```



```js
// Interface
// 对一个已经存在的接口添加新的字段
interface Window {
  title: string
}

interface Window {
  ts: TypeScriptAPI
}

const src = 'const a = "Hello World"';
window.ts.transpileModule(src, {});
        
// Type
// 创建后不能被改变
type Window = {
  title: string
}

type Window = {
  ts: TypeScriptAPI
}

// Error: Duplicate identifier 'Window'.
```



### 类型断言

让ts知道值的具体类型.

举个例子，如果你使用 `document.getElementById`，TypeScript 仅仅知道它会返回一个 `HTMLElement`，但是你却知道，你要获取的是一个 `HTMLCanvasElement`。

这时，你可以使用类型断言将其指定为一个更具体的类型：

```js
const myCanvas = document.getElementById("main_canvas") as HTMLCanvasElement;
```

你也可以使用尖括号语法（注意不能在 `.tsx` 文件内使用），是等价的：

```js
const myCanvas = <HTMLCanvasElement>document.getElementById("main_canvas");
```

> 谨记：因为类型断言会在编译的时候被移除，所以运行时并不会有类型断言的检查，即使类型断言是错误的，也不会有异常或者 `null` 产生。

```js
const x = "hello" as number;
// Conversion of type 'string' to type 'number' may be a mistake because neither type sufficiently overlaps with the other. If this was intentional, convert the expression to 'unknown' first.
```

有的时候，这条规则会显得非常保守，阻止了你原本有效的类型转换。如果发生了这种事情，你可以使用双重断言，先断言为 `any` （或者是 `unknown`），然后再断言为期望的类型：

```js
const a = (expr as any) as T;
```



### 字面量类型

除了常见的类型 `string` 和 `number` ，我们也可以将类型声明为更具体的数字或者字符串。

字面量类型本身并没有什么太大用：

```js
let x: "hello" = "hello";
// OK
x = "hello";
// ...
x = "howdy";
// Type '"howdy"' is not assignable to type '"hello"'.
```

如果结合联合类型，就显得有用多了。

举个例子，当函数只能传入一些固定的字符串时：

```js
function printText(s: string, alignment: "left" | "right" | "center") {
  // ...
}
printText("Hello, world", "left");
printText("G'day, mate", "centre");
// Argument of type '"centre"' is not assignable to parameter of type '"left" | "right" | "center"'.
```

例子2: 数字字面量类型

```js
function compare(a: string, b: string): -1 | 0 | 1 {
  return a === b ? 0 : a > b ? 1 : -1;
}
```

例子3: 非字面量类型联合：

```js
interface Options {
  width: number;
}
function configure(x: Options | "auto") {
  // ...
}
configure({ width: 100 });
configure("auto");
configure("automatic");

// Argument of type '"automatic"' is not assignable to parameter of type 'Options | "auto"'.
```



#### 字面量推断 !!

当你初始化变量为一个对象的时候，TypeScript 会假设这个对象的属性的值未来会被修改

```js
const obj = { counter: 0 };
if (someCondition) {
  obj.counter = 1;
}
```

TypeScript 并不会认为 `obj.counter` 之前是 `0`， 现在被赋值为 `1` 是一个错误。换句话说，`obj.counter` 必须是 `number` 类型，但不要求一定是 `0`，因为类型可以决定读写行为。 ??

这也同样应用于字符串:

```js
declare function handleRequest(url: string, method: "GET" | "POST"): void;

const req = { url: "https://example.com", method: "GET" };
handleRequest(req.url, req.method); // <-- 这里会报错

// Argument of type 'string' is not assignable to parameter of type '"GET" | "POST"'.
```

在上面这个例子里，`req.method` 被推断为 `string` ，而不是 `"GET"`，因为在创建 `req` 和 调用 `handleRequest` 函数之间，可能还有其他的代码，或许会将 `req.method` 赋值一个新字符串比如 `"Guess"` 。所以 TypeScript 就报错了。

有两种方式可以解决：

1. 添加一个类型断言改变推断结果
2. 也可以使用 `as const` 把整个对象转为一个类型字面量

```js
// Change 1:
const req = { url: "https://example.com", method: "GET" as "GET" };
// Change 2
handleRequest(req.url, req.method as "GET");
```

修改 1 表示“我有意让 `req.method` 的类型为字面量类型 `"GET"`，这会阻止未来可能赋值为 `"GUESS"` 等字段”。修改 2 表示“我知道 `req.method` 的值是 `"GET"`”.



```ts
const req = { url: "https://example.com", method: "GET" } as const;
handleRequest(req.url, req.method);
```

`as const` 效果跟 `const` 类似，但是对类型系统而言，它可以确保所有的属性都被赋予一个字面量类型，而不是一个更通用的类型比如 `string` 或者 `number` 。



### null和undefined

JavaScript 有两个原始类型的值，用于表示空缺或者未初始化，他们分别是 `null` 和 `undefined` 。

TypeScript 有两个对应的同名类型。它们的行为取决于是否打开了 [strictNullChecks ](https://www.typescriptlang.org/tsconfig#strictNullChecks)选项。

**`strictNullChecks` 关闭**

当 [strictNullChecks ](https://www.typescriptlang.org/tsconfig#strictNullChecks)选项关闭的时候，如果一个值可能是 `null` 或者 `undefined`，它依然可以被正确的访问，或者被赋值给任意类型的属性。这有点类似于没有空值检查的语言 (比如 C# ，Java) 。这些检查的缺少，是导致 bug 的主要源头，所以我们始终推荐开发者开启 [strictNullChecks ](https://www.typescriptlang.org/tsconfig#strictNullChecks)选项。



**`strictNullChecks` 打开**

当 [strictNullChecks ](https://www.typescriptlang.org/tsconfig#strictNullChecks)选项打开的时候，如果一个值可能是 `null` 或者 `undefined`，你需要在用它的方法或者属性之前，先检查这些值，就像用可选的属性之前，先检查一下 是否是 `undefined` ，我们也可以使用类型收窄（narrowing）检查值是否是 `null`：

```ts
function doSomething(x: string | null) {
  if (x === null) {
    // do nothing
  } else {
    console.log("Hello, " + x.toUpperCase());
  }
}
```



### 非空断言操作符(后缀`!`)

TypeScript 提供了一个特殊的语法，可以在不做任何检查的情况下，从类型中移除 null 和 undefined，这就是在任意表达式后面写上 ! ，这是一个有效的类型断言，表示它的值不可能是 null 或者 undefined

```ts
function liveDangerously(x?: number | null) {
  // No error
  console.log(x!.toFixed());
}
```

就像其他的类型断言，这也不会更改任何运行时的行为。重要的事情说一遍，只有当你明确的知道这个值不可能是 `null` 或者 `undefined` 时才使用 `!` 。 有啥意义?



### 枚举





### 不常见的原始类型

**binInt**

```ts
// Creating a bigint via the BigInt function
const oneHundred: bigint = BigInt(100);
 
// Creating a BigInt via the literal syntax
const anotherHundred: bigint = 100n;
```



**symbol**

这也是 JavaScript 中的一个原始类型，通过函数 `Symbol()`，我们可以创建一个全局唯一的引用：

```ts
const firstName = Symbol("name");
const secondName = Symbol("name");
 
if (firstName === secondName) {
  // This condition will always return 'false' since the types 'typeof firstName' and 'typeof secondName' have no overlap.
  // Can't ever happen
}
```





## 类型收窄

**将类型推导为更精确类型的过程，我们称之为收窄 (narrowing)**。 

 在编辑器中，我们可以观察到类型的改变：(vscode中,鼠标移动到参数上会显示)

```js
function padLeft(padding: number | string, input: string) {
  if (typeof padding === "number") {
    return new Array(padding + 1).join(" ") + input;
  }
  return padding + input;
}
```



### typeof类型保护

在 TypeScript 中，检查 `typeof` 返回的值就是一种类型保护。TypeScript 知道 `typeof` 不同值的结果，它也能识别 JavaScript 中一些怪异的地方.例如null

```tsx
function printAll(strs: string | string[] | null) {
  if (typeof strs === "object") {
    for (const s of strs) {    //报错
		  // Object is possibly 'null'.
      console.log(s);
    }
  } else if (typeof strs === "string") {
    console.log(strs);
  } else {
    // do nothing
  }
}
```





### 真值收窄

在 JavaScript 中，我们可以在条件语句中使用任何表达式，比如 `&&` 、`||`、`!` 等，举个例子，像 `if` 语句就不需要条件的结果总是 `boolean` 类型

```ts
function getUsersOnlineMessage(numUsersOnline: number) {
  if (numUsersOnline) {
    return `There are ${numUsersOnline} online now!`;
  }
  return "Nobody's here. :(";
}
```

这是因为 JavaScript 会做隐式类型转换，像 `0` 、`NaN`、`""`、`0n`、`null` `undefined` 这些值都会被转为 `false`，其他的值则会被转为 `true`。

当然你也可以使用 `Boolean` 函数强制转为 `boolean` 值，或者使用更加简短的`!!`：

```js
// both of these result in 'true'
Boolean("hello"); // type: boolean, value: true
!!"world"; // type: true,    value: true
```

这种使用方式非常流行，尤其适用于防范 `null`和 `undefiend` 这种值的时候。举个例子，我们可以在 `printAll` 函数中这样使用：

```ts
function printAll(strs: string | string[] | null) {
  if (strs && typeof strs === "object") {
    for (const s of strs) {
      console.log(s);
    }
  } else if (typeof strs === "string") {
    console.log(strs);
  }
}
```

可以看到通过这种方式，成功的去除了错误。

但还是要注意，在基本类型上的真值检查很容易导致错误，比如，如果我们这样写 `printAll` 函数：

```ts
function printAll(strs: string | string[] | null) {
  // !!!!!!!!!!!!!!!!
  //  DON'T DO THIS!
  //   KEEP READING
  // !!!!!!!!!!!!!!!!
  if (strs) {
    if (typeof strs === "object") {
      for (const s of strs) {
        console.log(s);
      }
    } else if (typeof strs === "string") {
      console.log(strs);
    }
  }
}
```

我们把原本函数体的内容包裹在一个 `if (strs)` 真值检查里，这里有一个问题，就是我们无法正确处理空字符串的情况。如果传入的是空字符串，真值检查判断为 `false`，就会进入错误的处理分支。

如果你不熟悉 JavaScript ，你应该注意这种情况。

另外一个通过真值检查收窄类型的方式是通过`!`操作符。

```js
function multiplyAll(
  values: number[] | undefined,
  factor: number
): number[] | undefined {
  if (!values) {
    return values;
    // (parameter) values: undefined
  } else {
    return values.map((x) => x * factor);
    // (parameter) values: number[]
  }
}
```



### 等值收窄

Typescript 也会使用 `switch` 语句和等值检查比如 `===` `!==` `==` `!=` 去收窄类型。比如：

```js
function exmaple(x:string|number, y:string|boolean) {
  if (x===y) {
    // we can call any 'string' method on 'x' or 'y'
    
  } else {
    console.log(x)  // (parameter) x: string | number
    console.log(y)  // (parameter) y: string | boolean
  }
}
```

在这个例子中，我们判断了 `x` 和 `y` 是否完全相等，如果完全相等，那他们的类型肯定也完全相等。而 `string` 类型就是 `x` 和 `y` 唯一可能的相同类型。所以在第一个分支里，`x` 和 `y` 就一定是 `string` 类型。



判断具体的字面量值也能让 TypeScript 正确的判断类型。在上一节真值收窄中，我们写下了一个没有正确处理空字符串情况的 `printAll` 函数，现在我们可以使用一个更具体的判断来排除掉 `null` 的情况：

```ts
function printAll(strs: string | string[] | null) {
  if (strs !== null) {
    if (typeof strs === "object") {
      for (const s of strs) {    //报错
        // Object is possibly 'null'.
        console.log(s);
      }
    } else if (typeof strs === "string") {
      console.log(strs);
    } else {
      // do nothing
    }
  }
}
```

JavaScript 的宽松相等操作符如 `==` 和 `!=` 也可以正确的收窄。在 JavaScript 中，通过 `== null` 这种方式并不能准确的判断出这个值就是 `null`，它也有可能是 `undefined` 。对 `== undefined` 也是一样，不过利用这点，我们可以方便的判断一个值既不是 `null` 也不是 `undefined`：



```ts
interface Container {
  value: umber | null | undefined
}

function multipleValue(container: Container, factor: number) {
  // remove both 'null' and 'undefined' from the type
  if (container != null) {
    console.log(container.value)
    container.value =* factor
  }
}
```



### in操作符收窄

JavaScript 中有一个 `in` 操作符可以判断一个对象是否有对应的属性名。TypeScript 也可以通过这个收窄类型。

举个例子，在 `"value" in x` 中，`"value"` 是一个字符串字面量，而 `x` 是一个联合类型：

通过 `"swim" in animal` ，我们可以准确的进行类型收窄。

```ts
type Fish = { swim: () => void };
type Bird = { fly: () => void };
 
function move(animal: Fish | Bird) {
  if ("swim" in animal) {
    return animal.swim();
    // (parameter) animal: Fish
  }
 
  return animal.fly();
  // (parameter) animal: Bird
}
```



而如果有可选属性，比如一个人类既可以 `swim` 也可以 `fly` (借助装备)，也能正确的显示出来：

```ts
type Fish = { swim: () => void };
type Bird = { fly: () => void };
type Human = { swim?: () => void; fly?: () => void };
 
function move(animal: Fish | Bird | Human) {
  if ("swim" in animal) {
    animal; // (parameter) animal: Fish | Human
  } else {
    animal; // (parameter) animal: Bird | Human
  }
}
```



### instanceof收窄

`instanceof` 也是一种类型保护，TypeScript 也可以通过识别 `instanceof` 正确的类型收窄：

```ts
function logVaule(x:Date | string) {
  if (x instanceof Date) {
    console.log(x.toUTCString()) // parameter x: Date
  } else {
    console.log(x.toUpperCase()) // parameter x: string
  }
}
```



### 赋值语句

TypeScript 可以根据赋值语句的右值，正确的收窄左值。

```ts
let x = Math.random() < 0.5 ? 10 : 'hello world'

x = 1
console.log(x) // x: number
x = 'goodbye'
console.log(x) //x : string
```

注意这些赋值语句都有有效的，即便我们已经将 `x` 改为 `number` 类型，但我们依然可以将其更改为 `string` 类型，这是因为 `x` 最初的声明为 `string | number`，赋值的时候只会根据正式的声明进行核对。

所以如果我们把 `x` 赋值给一个 boolean 类型，就会报错：

```ts
let x = Math.random() < 0.5 ? 10 : 'hello world'

x = 1
console.log(x) // x: number
x = 'goodbye'
console.log(x) //x : string

x = true // type 'boolean' is not assignable to type 'string | number'
console.log(x) // x: string| number
```



### 控制流分析

看看在 `if` `while`等条件控制语句中的类型保护

```ts
function padLeft(padding: number | string, input: string) {
  if (typeof padding === "number") {
    return new Array(padding + 1).join(" ") + input;
  }
  return padding + input;
}
```

在第一个 `if` 语句里，因为有 `return` 语句，TypeScript 就能通过代码分析，判断出在剩余的部分 `return padding + input` ，如果 padding 是 `number` 类型，是无法达到 (**unreachable**) 这里的，所以在剩余的部分，就会将 `number`类型从 `number | string` 类型中删除掉。

这种基于**可达性**(**reachability**) 的代码分析就叫做控制流分析(control flow analysis)。在遇到类型保护和赋值语句的时候，TypeScript 就是使用这样的方式收窄类型。而使用这种方式，一个变量可以被观察到变为不同的类型：

```ts
function example() {
  let x: string|number|boolean
  x = Math.random() < 0.5
  console.log(x) // x: boolean
  
  if (Math.random() < 0.5) {
    x = 'hello'
    console.log(x) //x:string
  } else {
    x = 100
    console.log(x) //x: number
  }
  
  return x; //x: string|number
}
```





### 类型判断式(type predicates)

在有的文档里， `type predicates` 会被翻译为**类型谓词**。考虑到 predicate 作为动词还有表明、声明、断言的意思，区分于类型断言（Type Assertion），这里我就索性翻译成类型判断式。

所谓 `predicate` 就是一个返回 `boolean` 值的函数。



如果你想直接通过代码控制类型的改变， 你可以自定义一个类型保护。实现方式是定义一个函数，这个函数返回的类型是类型判断式，示例如下：

```ts
type Fish = { swim: () => void };
type Bird = { fly: () => void };

function isFish(pet:Fish|Bird): pet is Fish {
  return (pet as Fish).swim !== undefined
}
```

在这个例子中，`pet is Fish`就是我们的类型判断式，一个类型判断式采用 `parameterName is Type`的形式，但 `parameterName` 必须是当前函数的参数名。

当 isFish 被传入变量进行调用，TypeScript 就可以将这个变量收窄到更具体的类型：

```ts
// Both calls to 'swim' and 'fly' are now okay.
let pet = getSmallPet();
 
if (isFish(pet)) {
  pet.swim(); // let pet: Fish
} else {
  pet.fly(); // let pet: Bird
}
```

注意这里，TypeScript 并不仅仅知道 `if` 语句里的 `pet` 是 `Fish` 类型，也知道在 `else` 分支里，`pet` 是 `Bird` 类型，毕竟 `pet` 就两个可能的类型。

你也可以用 `isFish` 在 `Fish | Bird` 的数组中，筛选获取只有 `Fish` 类型的数组

```ts
const zoo: (Fish | Bird)[] = [getSmallPet(), getSmallPet(), getSmallPet()];
const underWater1: Fish[] = zoo.filter(isFish);
// or, equivalently
const underWater2: Fish[] = zoo.filter(isFish) as Fish[];
 
// 在更复杂的例子中，判断式可能需要重复写
const underWater3: Fish[] = zoo.filter((pet): pet is Fish => {
  if (pet.name === "sharkey") return false;
  return isFish(pet);
});
```





### 可辨别联合（Discriminated unions）

让我们试想有这样一个处理 `Shape` （比如 `Circles`、`Squares` ）的函数，`Circles` 会记录它的半径属性，`Squares` 会记录它的边长属性，我们使用一个 `kind` 字段来区分判断处理的是 `Circles` 还是 `Squares`，这是初始的 `Shape` 定义：

```ts
interface Shape {
  kind: "circle" | "square";
  radius?: number;
  sideLength?: number;
}
```

























