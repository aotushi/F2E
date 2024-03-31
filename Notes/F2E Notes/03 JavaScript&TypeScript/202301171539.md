---
alias: if-else
---


#### if语句(条件判断语句)

语法: 

```JavaScript
if(条件表达式){
    语句...
}
========================  
if(!isNaN(i)){
    语句...
}
```

执行流程:

* if语句在执行时,先对条件表达式进行 求值判断.
  * 如果为true, 则执行if后的语句
  * 如果为false, 则不执行
* if语句会控制紧随其后的那条语句, 如果希望可以控制多条语句,可以将语句放入一个代码块
* 如果if的条件表达式不是一个布尔值,它会将其先转换为布尔值然后判断



if语句条件判断:

> https://dorey.github.io/JavaScript-Equality-Table/

A standard IF statement. If(*value*) {/*- green -*/} else { /*- white -*/ }

Note: This row does not match up with any of the rows in the other table.




#### if语句

##### if-else语句

语法:

```JavaScript
if(条件表达式){
    语句...
}else{
    语句...
}
```

执行流程:

if-else语句在执行时,会先对条件表达式进行求值判断,
* 如果为true, 则执行if后的条件表达式
* 如果为false, 则执行else后的条件表达式





#####  if-else if-else语句

语法:

```JavaScript
if(条件表达式){
    语句...
}else if(条件表达式){
    语句...
}else if(条件表达式){
    语句...
}else if(条件表达式){
    语句...
}else{
    语句...
}
```

执行流程
* if-else if-else在执行时,自上向下依次对if后的条件表达式进行求值判断,
  * 如果结果为true,则执行当前if后的语句,执行完毕语句结束.
  * 如果结果为false,则继续向下判断,直到找到true为止,
  * 如果没有true,则执行else后的语句.
* ==if-else if-else中只会有一个代码块会执行,一旦符合条件其余代码块都不会执行==

案例

```JavaScript
//练习1:编写一个程序，获取一个用户输入的整数。然后通过程序显示这个数是奇数还是偶数。

<script>
    let num = +prompt('请输入一个整数');   //注意,prompt函数如果不填写值会直接返回一个字符串
	if(num > 0){
        if (num % 2 === 0){
        	alert('偶数');
    	}else{
        	alert('奇数');
    	}
    }else{
        alert('非法数值,请重新输入');
    }
    
</script>   

```


### 如何处理过多的if/else判断

#### 来源: https://dreith.com/blog/theres-such-a-thing-as-using-too-many-ifs/


案例,使用if/else时产生了重复声明及逻辑操作
```js
const setBackgroundColor = (colorName) => {
	let colorCode = '';
	if(colorName === 'blue') {
		colorCode = '#2196F3';
	} else if(colorName === 'green') {
		colorCode = '#4CAF50';
	} else if(colorName === 'orange') {
		colorCode = '#FF9800';
	} else if(colorName === 'pink') {
		colorCode = '#E91E63';
	} else {
		colorCode = '#F44336';
	};
	document.body.style.backgroundColor = colorCode;
};
```

#### 改进方案
* switch
	* 不推荐,依然会产生许多我们不需要的样板和重复代码
* lookup table

**switch**
```js
const setBackgroundColor = (colorName) => {
	let colorCode = '';
	switch(colorName) {
		case 'blue':
			colorCode = '#2196F3';
			break;
		case 'green':
			colorCode = '#4CAF50';
			break;
		case 'orange':
			colorCode = '#FF9800';
			break;
		case 'pink':
			colorCode = '#E91E63';
			break;
		default:
			colorCode = '#f44336';
	};
	document.body.style.backgroundColor = colorCode;
};
```

**lookup table**
```js
const colorCodes = {
	'blue'   : '#2196F3',
	'green'  : '#4CAF50',
	'orange' : '#FF9800',
	'pink'   : '#E91E63',
	'default': '#F44336'
};

const setBackgroundColor = (colorName) => {
	document.body.style.backgroundColor = colorCodes[colorName]
		? colorCodes[colorName]
		: colorCodes['default'];
};
```


#### 总结
使用查找表代替if/else、switch,将多个比较逻辑转换成数据.