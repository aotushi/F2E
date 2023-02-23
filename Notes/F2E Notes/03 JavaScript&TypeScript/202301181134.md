---
alias: new
---



### new介绍

> the `new` operator lets developers create an instance of a user-defined object type or one of the built-in object types that has a constructor function.



#### Syntax

> new constructor [ ([arguments])]

#### Parameters

`constructor`

A class or function that specifies the type of the object instance

`arguments`

A list of values that the `constructor` will be called with

#### Desc

**the `new` keyword does the following things:**

1.create <span style="color:blue">a blank, plain JavaScript object</span>

2.Adds a property to the new object(`__proto`__) that links to the constructor function's prototype object.

3.Binds the newly created object instance as the `this` context(i.e. all references to `this` in the constructor function now refer to the object created in the first step)

4.Returns `this` if the function doesn't return an object



**when the code `new Foo(...)` is executed, the following things happen:**

1.A new object is created, inherited from `Foo.prototype`

2.the constructor function `Foo` is called with the specified arguments, and with `this` bound to the newly created object. `new Foo` is equivalent to `new Foo()`. i.e. if no argument list is specified, `Foo` is called without arguments.

3.the object(not null, false, 3.1415 or other primitive types) returned by the constructor function becomes the result of the whole `new` expression. If the constructor function doesn't explicitly return an object, the object created in step 1 is used instead (normally constructors don't return a value, but they can choose to do s<u>o if they want to override the normal object createion process</u>) 没太明白,中文版翻译可以理解


