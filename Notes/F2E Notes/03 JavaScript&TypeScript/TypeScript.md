## 资料

> [TypeScript中文文档_入门进阶必备 (yayujs.com)](https://ts.yayujs.com/)
>
> https://ts.yayujs.com/
> 
> [TypeScript 入门教程 - 林不渡 - 掘金小册 (juejin.cn)](https://juejin.cn/book/7288482920602271802/section/7288482920841838652)
> 


# 基础概况
## vscode相关配置
在设置中搜索'typescript'后, 打开如下配置项:
```json
- Function Like Return Types，显示推导得到的函数返回值类型；
    
- Parameter Names，显示函数入参的名称；
    
- Parameter Types，显示函数入参的类型；
    
- Variable Types，显示变量的类型。
```


## 在线调试代码
需要粘贴 TypeScript 代码进行求助，
* 使用 Web IDE，比如 CodeSandbox
* 更好的选择——TypeScript 官方提供的 [TypeScript Playground](https://link.juejin.cn/?target=https%3A%2F%2Fwww.typescriptlang.org%2Fplay "https://www.typescriptlang.org/play")：


## 直接执行ts文件

使用来自社区的 npm 包 esno, 
```bash
$ npx esno index.ts
Hello World!
```



# 声明类型

## 原始类型声明类型
原始类型是`string, number, boolean`, 使用`:类型`的形式来标注
```ts
let userAge:number;

userAge = 18;
userAge = '18'; //error
```

## 引用类型声明类型
对数组和对象进行类型标注
### **声明数组的类型**
对数组有两种形式的类型标注:`Array<数组成员类型>`或`数组成员类型[]`. 这两种方式没有明显的区别，获得的类型提示都是完全一致的，仅仅取决于你想把数组成员的类型写在前还是后。

```ts
const userNames1: string[] = [];
const userNames2: Array<string> = [];
```


### **声明对象的类型**
使用接口(interface)来声明,再使用这个接口来作为对象类型变量的类型标注. 接口时专用于进行对象类型标注.
```ts
interface User {
	userName: string;
	userAge: number;
	userMarried: boolean;
}

const user: User = {
	userName: 'jack',
	userAge: 20,
	userMarried: false
}
```

接口属性类型可以时任意有效类型,例如时接口:
```ts
inerface JobModel {
	//...
}

interface Job {
	currentModel: JobModel
}

interafce User {
	userJob: Job;
}
```

接口+数组类型,可以描述一个成员时对象的数组类型:
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

使用接口来描述对象类型意味着，代码中的赋值需要完全符合这个接口定义的接口：必须拥有所有接口中定义的属性，不能多也不能少,否则报错. 那如果对象中，存在一个比较飘忽的属性，它可能存在也可能不存在.应该怎么做？此时我们可以使用可选标记：
```ts
// 类型 "{ userName: string; userAge: number; }" 中缺少属性 "userMarried"
const user1: User = {
  userName: 'test',
  userAge: 20,
};

const user2: User = {
  userName: 'test',
  userAge: 20,
  userMarried: false,
  // 对象字面量只能指定已知属性，并且“userJob”不在类型“User”中。
  userJob: 'fe',
};

```

对象存放常量:
这么做的好处是我们能够避免项目中出现 Magic Value，即莫名其妙的一个值，没有任何的注释，只能靠猜来理解这到底是个什么玩意：
```ts
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

在 TypeScript 中则提供了一个更好的常量定义方式，即枚举，上面的例子用枚举改写后是这样的：
```ts
enum UserLevelCode {
  Visitor = 10001,
  NonVIPUser = 10002,
  VIPUser = 10003,
  Admin = 10010,
  // ... 
}


//自动累加值
enum UserLevelCode {
  Visitor = 10001,
  NonVIPUser,
  VIPUser,
  Admin = 10010,
  // ...
}


//支持不同类型的值
function generate() {
  return Math.random() * 10000;
}

enum UserLevelCode {
  Visitor = 10001,
  NonVIPUser = 10002,
  VIPUser,
  Admin,
  Mixed = 'Mixed',
  Random = generate(),
  // ...
}



```
枚举能带来更明显的好处:
* 相比于使用对象，枚举能够提供清晰的提示，甚至可以看到这个枚举成员的值.
* 对于这种数字类型的值，枚举能够自动累加值
* 枚举中可以同时支持数字、字符串、函数计算等成员


### 函数类型的声明及重载
型其实就是对值的约束, 函数类型的声明也只是对入参和返回值进行类型声明.

函数声明和函数表达式的类型声明:
```ts
function sum(a: number, b: number): number {
  return a + b;
}

const sum = function(a: number, b: number): number {
  return a + b;
};

```

函数表达式声明的其它形式(使用 `const sum: 函数类型 =` 的方式进行类型标注，保持像变量类型标注的语法一样). 使用类型别名实现这种.
"类型别名"的作用就是给一个类型起一个新名字.

```ts
// 使用类型别名来声明一个独立的函数类型
type Sum = (a:number, b:number) => number;

const sum:Sum = function(a,b) {
	return a + b;
}
```