---
alias: JavaScript格式
---

# 资料收集

> <编写可维护的JavaScript>



# JS编写格式



## 缩进

### **使用制表符进行缩进**

* 优点: 制表符和缩进层级是一对一的关系; 文本编辑器可以配置制表符的长度
* 缺点: 系统对制表符的解释不一致,可能长可能短.对代码展现一致性不好,团队开发也应该避免这种情况

### **使用空格进行缩进**

* 优点: 在所有系统的编辑器中,文件展示格式相同
* 缺点: 略. (没看懂原文意思,不重要)



### **使用建议**

* 配置tab键为4个空格
* 选择适合自己的使用

## 语句结尾



由于自动分号插入ASI(automatic semicolon insertion)机制很复杂且难以记忆,推荐不要省略分号.

## 行的长度

* 单行长度限定为80个字符



## 换行

* 当一行长度达到单行最大字符数限制时, 要将一行拆成两行.通常在运算符后换行,下一行增加两个层级的缩进.(假定缩进层级是4个字符)

```js
// 好的做法,在运算符后换行,第二行追加两个缩进
callAFunction(document, element, window, 'some string value', true, 123,
		navigator);

// 不好的做法,第二行只有一个缩进
callAFunction(document, element, window, 'some string value', true, 123,
	navigator);

// 不好的做法,运算符之前换行了
callAFunction(document, element, window, 'some string value', true, 123
		,navigator);
```

* 例外情况: 给变量赋值,第二行的位置应当和赋值运算符的位置保持对齐.

```js
var result = something + anotherThing + yetAnotherThing + somethingElse +
    			 anotherSomethingElse;
```



## 空行

插入空行的几种场景.

* 不相关语义代码之间
* 方法之间
* 方法的局部变量和第一条语句之间
* 多行或单行注释之前
* 在方法内的逻辑片段之间

## 命名

### 变量和函数(方法)命名规范

* JS语言规范遵照驼峰式大小写,小写字母开头后续每个单词首字母大写
* 变量名命名前缀是名词
* 函数命名前缀是动词
  * 以下是使用动词常见的约定:
  * can/has/is   函数返回一个布尔值
  * get 函数返回一个非布尔值
  * set 函数用来保存一个值
* 命名长度尽可能短并抓住要点
* 尽量在变量命名中体现出值的数据类型
  * 命名count,length,size表名数据类型是数字; 命名name,title,message表名数据类型是字符串
* 避免使用没有意义的命名.例如foo, bar, tmp等



### 常量命名规范

* 使用大写字母和下划线来命名,下划线用以分隔单词

```js
var MAX_COUNT = 10;
var VALUE = "http://www.nczonline.net/";
```



### 构造函数命名规范

* 构造函数的命名遵照大驼峰命名法(Pascal Case)

```js
// 好的写法
function Person(name) {
  this.name = name;
}
```









## 注释
JS支持两种不同类型的注释,单行注释和多行注释

### 单行注释
注意事项:
* 单行注释以两个斜线开始,以行尾结束
* 单行注释不应当以连续多行注释的形式出现,除非你注释掉一大段代码; 只有当需要注释一段很长的文本时才使用多行注释;

```js
// 好的写法
if (condition) {

	// 如果代码执行到这里,则表明通过了所有的安全性检查
	allowed()
}

// 不好的写法
if (condition) {
	// 如果代码执行到这里,则表明通过了所有的安全性检查
	allowed()
}

// 不好的写法: 错误的缩进
if (condition) {

// 如果代码执行到这里,则表明通过了所有的安全性检查
	allowed()
}

// 好的写法
var result = something + somethingElse; // somethingElse不应当取值为null

// 不好的写法
var result = something + somethingElse;// somethingElse不应当取值为null
```


### 多行注释
* 多行注释可以包括跨行文本.以`/*`开始,以`*/`结束.
* 多行注释总是出现在将要描述的代码段之前,注释和代码之间没有空行间隔
* 和单行注释一样,多行注释之前应当有一个空行,且缩进层级和其描述的代码保持一致.

```js
// 好的写法
if (condition) {

	/*
	 * 如果代码执行到这里
	 * 说明通过了所有的安全性检测
	*/
	allowed()
}
```


### 使用注释的时机
* 当代码不够清晰时添加注释,当代码很明了时不添加注释


### 文档注释
文档注释有多种格式,来自JavaDoc文档格式最流行: 多行注释以单斜线加双星号(`/**`)开始,接下来是描述信息,其中使用`@`符号来表示一个或多个属性. 下面是在JS文件中对应的类似例子:
```js
/**
 * 返回一个对象,这个对象包含被提供对象的所有属性
 * @method merge
 * @param {Object} 被合并的一个或多个对象
 * @return {Object} 一个新的合并后的对象
 * 
 */
Y.merge = function() {
	var args   = arguments,
			i      = 0,
			len    = args.length,
			result = {}
}
```

**添加注释的内容**
* 所有的方法  应当对方法,期望的参数和可能的返回值添加注释描述
* 所有的构造函数 应当对自定义类型和期望的参数添加描述
* 所有包含文档化的方法的对象  如果一个对象包含一个或多个附带文档注释的方法,那么这个对象也应当适当针对文档生成工具添加文档注释.



## 语句和表达式

#### 1.块语句应总是使用花括号
无论包含多行代码还是单行代码;
块语句包括:
`if for while do...while try...catch...finally`


#### 2.花括号的对齐方式
有两种花括号对齐风格.
* 第一种, 将花括号放置在快语句的第一句代码的末尾 **推荐**
* 第二种, 将左花括号放置于快语句的首行的下一行

