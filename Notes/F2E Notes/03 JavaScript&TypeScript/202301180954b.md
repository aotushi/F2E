---
alias: delete
---

### delete


**define**

> the delete operator<span style="color:blue"> removes a property from an object</span>; if no more references to the same proeprty are held, it is eventually released automatically.(如果没有对同一属性更多的引用, 它最终将自动被释放)

**syntax**

> delete expression

Where expression should evaluate to property references. e.g.:

```javascript
delete obj.property
delete obj['property']
```

**return value**

`true` for all cases except when the proeprty is  an [`own`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwnProperty)(Object.hasOwnProperty()) [`non-configurable`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors/Cant_delete) property, in which case, `false` is returned in non-strict mode.

```javascript
```



**example**

无法删除函数参数

```javascript
```






