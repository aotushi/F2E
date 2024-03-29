---
alias: this
---


## 关于this !!!!

> https://github.com/mqyqingfeng/Blog/issues/7

### 1.前言

当JavaScript代码执行一段可执行代码(executable code)时，会创建对应的执行上下文(execution context)。

对于每个执行上下文，都有三个重要属性:

* 变量对象(Variable Object, VO)
* 作用域链(Scope chain)
* this

因为我们要从 ECMASciript5 规范开始讲起。

先奉上 ECMAScript 5.1 规范地址：

英文版：http://es5.github.io/#x15.1

中文版：http://yanhaijing.com/es5/#115



### 2. Types

首先是第8章的types

> Types are further subclassified into ECMAScript language types and specification types.
>
> An ECMAScript language type <u>corresponds to</u>(对应的) values that are directly manipulated by an ECMAScript programmer using the ECMAScript language. The ECMAScript language types are Undefined, Null, Boolean, String, Number, and Object.
>
> A specification type corresponds to meta-values that are used within algorithms to describe the semantics of ECMAScript language constructs and ECMAScript language types. The specification types are Reference, List, Completion, Property Descriptor, Property Identifier, Lexical Environment, and Environment Record.

我们简单的翻译一下：

ECMAScript 的类型分为语言类型和规范类型。

ECMAScript 语言类型是开发者直接使用 ECMAScript 可以操作的。其实就是我们常说的Undefined, Null, Boolean, String, Number, 和 Object。

而规范类型相当于 meta-values，是用来用算法描述 ECMAScript 语言结构和 ECMAScript 语言类型的。规范类型包括：Reference, List, Completion, Property Descriptor, Property Identifier, Lexical Environment, 和 Environment Record。

没懂？没关系，我们只要知道在 ECMAScript 规范中还有一种只存在于规范中的类型，它们的作用是用来描述语言底层行为逻辑。

今天我们要讲的重点是便是其中的 Reference 类型。它与 this 的指向有着密切的关联。

### Reference

#### 含义

8.7章 The Reference Specification Type:

> The Reference type is used to explain the behaviour of such operators as delete ,typeof, and the assignment operators.

所以 Reference 类型就是用来解释诸如 delete、typeof 以及赋值等操作行为的。

来自youyuxi的解释:

> 这里的 Reference 是一个 Specification Type，也就是 “只存在于规范里的抽象类型”。它们是为了更好地描述语言的底层行为逻辑才存在的，但并不存在于实际的 js 代码中。

#### 组成部分

> A Reference is a resolved name binding.
>
> A Reference consists of three components, the base value, the referenced name and the Boolean valued strict reference flag.
>
> The base value is either undefined, an Object, a Boolean, a String, a Number, or an environment record (10.2.1).
>
> A base value of undefined indicates that the reference could not be resolved to a binding. The referenced name is a String.

从上面的话可以看出,Reference主要包括3个部分:

* base value
* referenced name
* strict reference 

base value 就是属性所在的对象或者就是 EnvironmentRecord，它的值只可能是 undefined, an Object, a Boolean, a String, a Number, or an environment record 其中的一种。

referenced name 就是属性的名称.

举个例子:

```javascript
var foo = 1;
//对应的Reference是
var fooReference = {
  base: EnviromentRecord,
  name: 'foo',
  strict: false
}
```



```javascript
var foo = {
  bar: function() {
    return this;
  }
};

foo.bar();

//bar对应的Reference是
var BarReference = {
  base: foo,
  propertyName: 'bar',
  strict: false
}
```

而且规范中还提供了获取 Reference 组成部分的方法，比如 GetBase 和 IsPropertyReference。

1.GetBase

> GetBase(V). Returns the base value component of the reference V.

返回 reference 的 base value

2.IsPropertyReference

> IsPropertyReference(V). Returns true if either the base value is an object or HasPrimitiveBase(V) is true; otherwise returns false.

简单的理解：如果 base value 是一个对象，就返回true。



### GetValue

除此之外，紧接着在 8.7.1 章规范中就讲了一个用于从 Reference 类型获取对应值的方法： GetValue。

简单模拟 GetValue 的使用：

```javascript
var foo = 1;
var fooReference = {
  base: EnvironmentRecord,
  name: 'foo',
  strict: false
};
GetValue(fooReference); //1
```

GetValue 返回对象属性真正的值，但是要注意：

**调用 GetValue，返回的将是具体的值，而不再是一个 Reference**



### 如何确定this的值

看规范 11.2.3 Function Calls：

这里讲了当函数调用的时候，如何确定 this 的取值。

只看第一步、第六步、第七步：

> 1.Let *ref* be the result of evaluating MemberExpression.

> 6.If Type(*ref*) is Reference, then
>
> a. If IsPropertyReference(ref) is true, then
>
> ​	i. Let thisValue be GetBase(ref).
>
> b.Else, the base of ref is an Enviroment Record.
>
> ​	i.Let thisValue be the result of calling the ImplicitThisValue concreate method of GetBase(ref)
>
> 7.Else, Typeof(ref) is not Reference.
>
> a. Let thisValue be undefined.

让我们描述一下:

1.计算MemberExpression的结果赋值非ref

2.判断ref是不是一个Reference类型

 2.1 如果ref是Reference,并且IsPropertyReference(ref)是true, 那么this的值为GetBase(ref)

 2.2 如果ref是Reference,并且base value值是Environment Record,那么this 的值为ImplicitThisValue(ref)

3.ref不是一个Reference类型

 3.1 this的值是undefined.



### 具体分析

一步步看:

**1.计算MemberExpression的结果赋值给ref**

什么是MemberExpression? 看规范 11.2 Left-Hand-Side Expressions

- PrimaryExpression // 原始表达式 可以参见《JavaScript权威指南第四章》
- FunctionExpression // 函数定义表达式
- MemberExpression [ Expression ] // 属性访问表达式
- MemberExpression . IdentifierName // 属性访问表达式
- new MemberExpression Arguments // 对象创建表达式

举个例子:

```javascript
function foo() {
  console.log(this);
}

foo(); //MemberExpression是foo

function foo() {
  return function() {
    console.log(this);
  }
}
foo()(); //MemberExpression是foo()

var foo = {
  bar: function() {
    return this;
  }
}
foo.bar(); //MemberExpression是foo.bar
```

所以简单理解 MemberExpression 其实就是()左边的部分。



**2.判断ref是不是一个Reference类型**

关键就在于看规范是如何处理各种 MemberExpression，返回的结果是不是一个Reference类型

举个例子:

```javascript
var value = 1;
var foo = {
  value: 2,
  bar: function() {
    return this.value;
  }
};

//示例1
console.log(foo.bar());

//示例2
console.log((foo.bar)())

//示例3
console.log((foo.bar = foo.bar)());

//示例4
console.log((false||foo.bar)())

//示例5
console.log((foo.bar, foo.bar)())
```

#### foo.bar()

查看规范 11.2.1 Property Accessors，这里展示了一个计算的过程，什么都不管了，就看最后一步：

> Return a value of type Reference whose base value is baseValue and whose referenced name is propertyNameString, and whose strict mode flag is strict.

我们得知该表达式返回了一个 Reference 类型！

根据之前的内容，我们知道该值为：

```javascript
var Reference = {
  base: foo,
  name: 'bar',
  strict: false
}
```

接下来按照2.1的判断流程走:

> 2.1 如果ref是Reference, 并且IsPropertyReference(ref)是true,那么this的值为GetBase(ref)

该值是Reference类型,那么IsPropertyReference(ref)的结果是多少呢?

前面我们已经铺垫了 IsPropertyReference 方法，如果 base value 是一个对象，结果返回 true。

base value 为 foo，是一个对象，所以 IsPropertyReference(ref) 结果为 true。 

这个时候我们可以确定this 的值了

```javascript
this = GetBase(ref);
```

GetBase 也已经铺垫了，获得 base value 值，这个例子中就是foo，所以 this 的值就是 foo ，示例1的结果就是 2.

#### (foo.bar)()

示例2:

```javascript
console.log((foo.bar)());
```

foo.bar被()包住,查看规范11.1.6 The Grouping Operator

直接看结果部分:

> The production *PrimaryExpression: **(Expression)*** is evaluated as follows:

> Return the result of evaluating Expression. This may be of type Reference.
>
> Note This algorithm(运算法则) does not apply GetValue to the result of evaluating Expression.

实际上()并没有对MemberExpression进行计算,所以其实跟示例1的结果是一样的.



#### (foo.bar = foo.bar)()

示例3,有赋值操作运算符,查看规范11.13.1 Simple Assignment(=):

计算的第三步:

> 3. Let rval be GetValue(rref)

因为使用了GetValue,所以返回的值不是Reference类型

按照之前讲的判断逻辑

> 如果 ref 不是Reference，那么 this 的值为 undefined

this为undefined,非严格模式下,this的值为 undefined 的时候，其值会被隐式转换为全局对象。



#### (false || foo.bar)()

示例4，逻辑与算法，查看规范 11.11 Binary Logical Operators：

计算的第二步:

> 2.Let lval be GetValue(lref)

因为使用了 GetValue，所以返回的不是 Reference 类型，this 为 undefined



#### (foo.bar, foo.bar)()

示例5，逗号操作符，查看规范11.14 Comma Operator ( , )

计算的第二步:

> 2.Call GetValue(lref).

因为使用了 GetValue，所以返回的不是 Reference 类型，this 为 undefined



#### 揭晓结果

最后一个例子的结果是

```javascript
var value = 1;

var foo = {
  value: 2,
  bar: function() {
    return this.value;
  }
};

//示例1
foo.bar(); //2

//示例2
console.log((foo.bar)()); //2

//示例3
console.log((foo.bar = foo.bar)()); //1

//示例4
console.log((false || foo.bar)()); //1

//示例5
console.log((foo.bar, foo.bar)()); //1
```

注意：以上是在非严格模式下的结果，严格模式下因为 this 返回 undefined，所以示例 3 会报错。(接下去的不会执行了)



### 补充

还有一个最普通的情况

```javascript
function foo() {
  console.log(this);
}
foo();
```

MemberExpression是foo,解析标识符,查看规范 10.3.1 Identifier Resolution，会返回一个 Reference 类型的值：

```javascript
var fooReference = {
  base: EnvironmentRecord,
  name: 'foo',
  strict: false
}
```
