### 资料

> [TypeScript中文文档_入门进阶必备 (yayujs.com)](https://ts.yayujs.com/)
>
> https://ts.yayujs.com/



## 基础

JavaScript 仅仅提供了动态类型（dynamic typing），这需要你先运行代码然后再看会发生什么。

替代方案就是使用静态类型系统（static type system），在代码运行之前就预测需要什么样的代码。



### 显示类型(explicit types)

为函数参数添加类型注解(type annotations),描述函数可以支持传入什么样的值.

```js
function greet(person: string, date: Date) {
  console.log(`Hello ${person}, today is ${date.toDateString()}!`);
}

// greet 支持传入一个 string 类型的 person 和一个 Date 类型的 date 。
```



### 类型抹除

类型注解并不是 JavaScript 的一部分。所以并没有任何浏览器或者运行环境可以直接运行 TypeScript 代码。这就是为什么 TypeScript 需要一个编译器，它需要将 TypeScript 代码转换为 JavaScript 代码，然后你才可以运行它。所以大部分 TypeScript 独有的代码会被抹除



### 降级(downleveling)

将高版本的 ECMAScript 语法转为低版本的过程就叫做**降级（downleveling）** 。

TypeScript 默认转换为 `ES3`，一个 ECMAScript 非常老的版本。

也可以使用 [target ](https://www.typescriptlang.org/tsconfig#target)选项转换为比较新的一些版本，比如执行 `--target es2015` 会转换为 ECMAScript 2015



### 配置

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

