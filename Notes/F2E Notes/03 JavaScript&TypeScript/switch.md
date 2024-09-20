---
alias: switch
---



#### switch语句(条件分支语句)
因为在JavaScript中对于case的比较是采用严格相等(`===`)的。
语法:

```JavaScript
switch (条件表达式) {
        case 表达式:
        	语句...;
        	break;
        case 表达式:
        	语句...;
        	break;
        case 表达式:
        	语句...;
        	break;
        default:
        	语句...;
        	break;
        }

===================================
switch (num) {
    case 1:
        alert('a');
        break;
    case 2:
        alert('b');
        break;
    case 3:
        alert('c');
        break;
    case 'b':
    case 'c':
    case 'd':
        alert('输错了');
        break;   // b,c,d共用c的内容.
}
```



执行流程
* switch-case在执行时，会自上向下依次将switch后的条件表达式和case后的表达式进行全等比较,
* 如果比较结果为true, 则自当前case处开始向下执行代码(执行完一个case后会接着执行),
* 如果比较结果为false,则继续向下比较直到找到true为止,
* 如果所有的比较结果都是false,则自default处开始向下执行代码.所以如果default代码在首部,需要加break,故无论哪个位置,加上.

* 注意:
  * switch-case条件满足时,自当前case处开始向下执行代码
  * 只要代码在case的后边,即使代码在其他的case后边也会执行
  * 如果不希望执行,可以在case后边添加break关键字,break关键字可以立刻结束switch语句
  * switch-case和if-else的功能基本是一致,甚至可以相互替代,但是日常使用中,if的使用频率会高一些.



##### 实例

```javascript
 var x=0; 
 switch(++x) { 
     case 0: ++x; 
     case 1: ++x; 
     case 2: ++x; 
 }

// x的最终值是3,没有break的情况下回继续向下执行后面的case语句
```



