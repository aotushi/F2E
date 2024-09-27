---
alias: Unicode
---



## Unicode字符
>[Unicode与前端字符编码全揭秘 - 掘金 (juejin.cn)](https://juejin.cn/post/7070079762429034526)

### 产生背景
>计算机的底层是一个由0和1组成的数字世界，因此不能把现实中的字符（如：汉字、英语、标点符号等）直接写入内存，而必须先把它们转换成数字，然后把这些数字写入内存。等到读取的时候，再把数字转换成对应的字符。在这样一个字符和数字相互转换的过程中，就需要用到**字符集（Character Set）**。
>简单来讲，<span style="color:blue">字符集保存着字符和数字之间一对一的映射关系，而每个字符所对应的那个数字称为码点（Code Point）</span>。例如，ASCII就是被大家所熟知的一个字符集，其中字母`A`对应的码点是0x41（十六进制）。

ASCII包含的字符大部分是英文字母,英文字符和阿拉伯数字,为了适应各种符号及文字,Unicode就被创造出来了.

### 是什么
**Unicode**是一个超大字符集，其中几乎包含了全世界所有的字符

Unicode的码点范围，或者说编码空间，为U+0000..U+10FFFF，这些码点被平均分成17个**平面（Plane）**。其中，

- 第1个平面（U+0000..U+FFFF）称为**基本平面（Basic Multilingual Plane）**。
- 其余16个平面（U+10000..U+10FFFF）称为16个**补充平面（Supplementary Plane）**。

在一个平面中，又会根据字符类别划定大小不一的**区块（Block）**。例如，几乎所有的常用汉字都在基本平面中的CJK Unified Ideographs（U+4E00..U+9FFF）这个区块。

### 编码格式
字符必须先被转换成数字才能写入内存。那么，现在有了Unicode字符集，是不是只要将码点直接写入内存就可以了呢？事实并非如此。例如，对于字符串`狗🐶`，根据上文，可将其转换成十六进制码点序列`72D71F436`，进一步转换成二进制码点序列就是`11100101101011111111010000110110`。但在不了解原始字符串前提下,需要确定码点的边界,否则就无法准确的解码.一个简单的方法是通过将码点转换成二进制,把结果补齐到相同的位数(最高位前加0),然后再还原时以相同的位数单位进行读取.

例如,以`狗🐶`为例，整个转换过程如下：
```js
狗 -> U+72D7 -> 111001011010111 -> 000000011101011010111 
🐶 -> U+1F436 -> 11111010000110110 -> 000011111010000110110 

000000011101011010111000011111010000110110 
|-------------------||-------------------| 
21位                   21位
```

#### UTF-32
Unicode编码格式UTF-32类似于上面杜撰的UTF-21,也就是把码点统一补齐到32位(4个字节)
缺点: 浪费空间.

#### UTF-8
UTF-8针对不同范围的码点采用不同长度的字节数（1–4个字节）进行编码。整个编码过程相对复杂,在此不叙.
* 黑色的0和1表示固定标记位，用于确定码点边界。
* 其他颜色的0和1则表示如何将码点的各个比特位映射到对应的字节中。

![](https://jsd.cdn.zzko.cn/gh/aotushi/image-hosting@master/documentation/.79u67s7xscs0.webp)

UTF-8节省空间，还具有兼容ASCII、容错率高、没有字节序问题等诸多优点。所以在日常开发中，像HTML、CSS和JS这些文件几乎都以UTF-8格式保存。

#### UTF-16
JS内部采用另外一种Unicode编码格式——UTF-16.
UTF-16的编码规则：
* 对于基本平面（U+0000..U+FFFF）中的码点，统一使用2个字节来表示，且与码点完全相同。
* 对于所有补充平面（U+10000..U+10FFFF）中的码点，先减去0x10000，于是数值范围变成0x00000–0xFFFFF，然后补齐到20位，最后把这20位一分为二。
* 将较高的10位处理后，称为**高位代理项（High Surrogate）**
* 将较低的10位处理后，称为**低位代理项（Low Surrogate）**
- 高位代理项（2个字节）和低位代理项（2个字节）在一起组成一个**代理对（Surrogate Pair）**。一个代理对（4个字节）编码一个补充平面的码点。



### JS与Unicode的历史变迁
<span style="color:red">JS内部使用UTF-16编码，但是许多API却无法处理补充平面中的码点。</span>比如`String.length`，就是以**2个字节为单位**计算字符串长度。而在UTF-16中，补充平面的码点需要占据4个字节,所以会出现`'狗'.length`等于1，而`'🐶'.length`等于2。

UTF-32和UTF-8的设计时间要早于UTF-16,JS恰好诞生在Unicode还只有一个基本平面，而UTF-16并不存在的年代.


### Unicode in JS
在UTF-16中，**1个码元（Code Unit）等于2个字节**。所以，我们可以说`String.length`是以UTF-16码元为单位计算字符串长度。

#### Unicode字符转义序列
在JS字符串中，我们一般都直接输入字符本身，不过在少数不方便输入字符的情况下，也可以通过`\u码元`或`\u{码点}`的方式来表示一个Unicode字符。这两种写法的最大区别就在于，`\u码元`必须通过代理对来表示补充平面的码点，例如：
```js
console.log('狗' === '\u72D7'); // output: true 
console.log('狗' === '\u{72D7}'); // output: true 
console.log('🐶' === '\uD83D\uDC36'); // output: true 
console.log('🐶' === '\u{1F436}'); // output: true

```


#### 以码点为单位分隔字符串
在JS中，和`String.length`行为相同的API还有很多，例如：`String.prototype.slice()`、`String.prototype.charAt()`和通过下标获取字符串中某个字符等，这些API都是以码元为单位分割字符串。所以如果字符串中包含补充平面的字符，就会出现问题。例如：
```js
const str = '🐶狗'; 
console.log(str.slice(1)); // output: "\udc36狗" 
console.log(str.charAt(1)); // output: "\udc36" 
console.log(str[1]); // output: "\udc36"

```


ES6之后，JS实现了以码点为单位分割字符串的迭代器——`String.prototype[@@iterator]()`。另外，`Array.from`和`for..of`也可以实现这个功能，因为它们在底层也都调用了这个迭代器。
```js
const str = '🐶狗';

// 1. iterator
const strIter = str[Symbol.iterator]();
console.log(strIter.next().value); // "🐶"
console.log(strIter.next().value); // "狗"

// 2. Array.from
console.log(Array.from(str));  // output: [ "🐶", "狗" ]

// 3. for..of
for (let v of str) {
  console.log(v);
}
// output: "🐶" "狗"
```


#### 以字符簇为单位分割字符串
虽然字符串自身的迭代器是以码点为单位分割字符串，但是也还是会遇到一些出乎意料的结果。例如：
```js
console.log(Array.from('🐕‍🦺'));  // output: [ "🐕", "‍", "🦺" ]
// 泰语
console.log(Array.from('สุ'));  // output: [ "ส", "ุ" ]
```

因为许多我们看起来是一个字符的图形或文字，实际是由多个码点组合而成。在上面的例子中，`🐕‍🦺`由3个码点组成，用转义序列可以表示为`"\u{1F415}\u{200D}\u{1F9BA}"`，而`สุ`可以表示为`"\u{0E2A}\u{0E38}"`。

这些从人类视觉角度被认为是单个字符的图形或文字，实际是由多个码点组合而成,在Unicode中被称为**字素簇（Grapheme Cluster）**。

如果要以字素簇为单位分割字符串，目前来说有两个方案。
第一个方案是原生API——[Intl.Segmenter](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Ftc39%2Fproposal-intl-segmenter "https://github.com/tc39/proposal-intl-segmenter")目前这个提案处于Stage 4，并且[Chrome和Safari已经支持](https://link.juejin.cn/?target=https%3A%2F%2Fcaniuse.com%2Fmdn-javascript_builtins_intl_segments "https://caniuse.com/mdn-javascript_builtins_intl_segments")。
另外一个方案就是调用第三方开源库，比如：[graphemer](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fflmnt%2Fgraphemer "https://github.com/flmnt/graphemer")、[text-segmentation](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fniklasvh%2Ftext-segmentation "https://github.com/niklasvh/text-segmentation")。这些库的实现原理是根据Unicode本身规定的[GraphemeBreakProperty](https://link.juejin.cn/?target=http%3A%2F%2Funicode.org%2Freports%2Ftr29%2F%23Default_Grapheme_Cluster_Table "http://unicode.org/reports/tr29/#Default_Grapheme_Cluster_Table")对文本进行切分.不多介绍.

```js
const segmenter = new Intl.Segmenter();
const segments = segmenter.segment('🐕‍🦺สุ');
// segments是可迭代的，所以可以用Array.from或for..of来调用其内部的迭代器
console.log(Array.from(segments));
// output: [
//   {segment: '🐕‍🦺', index: 0, input: '🐕‍🦺สุ'},
//   {segment: 'สุ', index: 5, input: '🐕‍🦺สุ'}
// ]
```


#### Unicode字符属性转义序列
在JS中，正则表达式默认也是以码元为单位进行匹配，不过可以通过添加`u`标记，将其转换成以码点为单位进行匹配。
```js
// 以码元为单位匹配
/^.$/.test('狗');    // return: true
/^.$/.test('🐶');    // return: false
// 以码点为单位匹配
/^.$/u.test('🐶');   // return: true
```
加上`u`标记之后，还为正则表达式提供了一个强大的功能——[Unicode字符属性转义序列（Unicode Property Escapes）](https://link.juejin.cn/?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fen-US%2Fdocs%2FWeb%2FJavaScript%2FGuide%2FRegular_Expressions%2FUnicode_Property_Escapes "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Unicode_Property_Escapes")，它可以大大简化编写Unicode字符相关的正则表达式的复杂度。

首先，让我们来了解下什么是Unicode字符属性。Unicode中的每一个字符都有许多属性，比如：`Age`（首次被收录的Unicode版本）、`Block`（所属区块）和`General_Category`（所属类别）等。以`狗`为例，下表列出了这个字符的部分属性（完整列表见[此处](https://link.juejin.cn?target=https%3A%2F%2Futil.unicode.org%2FUnicodeJsps%2Fcharacter.jsp%3Fa%3D%25E7%258B%2597%26B1%3DShow "https://util.unicode.org/UnicodeJsps/character.jsp?a=%E7%8B%97&B1=Show")）。

|Property Name|Type|Value|
|:--|:--|:--|
|Age|Catalog|1.1|
|Block|Catalog|CJK_Unified_Ideographs|
|General_Category|Enumeration|Other_Letter|
|Unified_Ideograph|Binary|Yes|

Unicode字符属性转义序列正是利用这些属性，让我们可以在正则表达式中很方便地筛选出符合条件的字符集合。语法如下：
```js
// 非Binary类型的属性
\p{PropertyName=PropertyValue}


// Binary类型的属性
\p{PropertyName}
```
以一个常见场景为例，如果你在网上搜索“如何用正则表达式匹配汉字”，八成会看到一个答案是`/[\u4E00-\u9FA5]/`。这是因为上文提到，大部分常用汉字都在CJK Unified Ideographs（U+4E00..U+9FFF）这个区块，并且在几十年前，这个区块中最后一个汉字的码点就是U+9FA5。

但是随着时间的推移，越来越多的生僻字被包括进Unicode中，而且大部分在其他区块中,另外，这些新的区块中的码点也不是一次性分配完毕的，而是随着Unicode的版本逐步分配。所以从当下来看，`/[\u4E00-\u9FA5]/`这个正则表达式在匹配常用汉字时依然够用，但是如果需要匹配所有汉字，那么就不准确了。
在这种情况下，用Unicode字符属性转义序列就能很方便地解决这个问题，因为`Unified_Ideograph`（中日韩统一表意文字）这个属性只有在汉字字符中才是`Yes`，其他都为`No`。所以正则表达式可以写成：
```js
// 匹配一个汉字
/\p{Unified_Ideograph}/u

// 实例：去除字符串中的所有汉字
'abc汉字'.replace(/\p{Unified_Ideograph}/ug, '');  // return: 'abc'
// 相反，如果想匹配字符串中的所有非汉字字符，则可以使用\P{...}
'abc汉字'.replace(/\P{Unified_Ideograph}/ug, '');  // return: '汉字'

```
这样，正则表达式就再也不需要改动，而且更简洁、更准确、可读性更强。
再举个例子，在`General_Category`这个属性中有个值为`Punctuation`，于是我们就可以很方便地匹配字符串中的所有标点符号，无论是中文标点，还是英文标点。示例如下：
```js
// 去掉字符串中所有的标点符号
'中，。；：‘“”’「」英,.?;:\'"!'.replace(/\p{General_Category=Punctuation}/ug, ''); // return: 中英


// General_Category还支持下面这种省略属性名的简写方式
'中，。；：‘“”’「」英,.?;:\'"!'.replace(/\p{Punctuation}/ug, ''); // return: '中英'

```

> [General_Category的完整列表](https://link.juejin.cn?target=https%3A%2F%2Fwww.unicode.org%2Freports%2Ftr44%2F%23GC_Values_Table "https://www.unicode.org/reports/tr44/#GC_Values_Table")

不过，目前在字符属性转义序列中只支持部分Unicode字符属性，比如`Age`就不支持，但是ES规范中指定了必须支持的[属性列表](https://link.juejin.cn?target=https%3A%2F%2Ftc39.es%2Fecma262%2Fmultipage%2Ftext-processing.html%23sec-runtime-semantics-unicodematchproperty-p "https://tc39.es/ecma262/multipage/text-processing.html#sec-runtime-semantics-unicodematchproperty-p")。如果不了解每个属性的用途，可以参考此[文档](https://link.juejin.cn?target=https%3A%2F%2Fwww.unicode.org%2Freports%2Ftr44%2F%23Property_List_Table "https://www.unicode.org/reports/tr44/#Property_List_Table")。另外，Unicode官方也提供了[工具](https://link.juejin.cn?target=https%3A%2F%2Futil.unicode.org%2FUnicodeJsps%2Flist-unicodeset.jsp%3Fa%3D%255B%253AUnified_Ideograph%253A%255D%26g%3D%26i%3D "https://util.unicode.org/UnicodeJsps/list-unicodeset.jsp?a=%5B%3AUnified_Ideograph%3A%5D&g=&i=")，方便查看具有某个属性的所有字符。

#### Normalization
由于一些历史原因和扩展的需要，许多字符在Unicode中有多种表现形式，既可以使用单一码点，也可以使用字素簇。例如，拼音中的`ǒ`，既可以用`"\u{01D2}"`来表示，也可以用`"\u{006F}\u{030C}"`。在第二种形式中，`"\u{006F}"`表示普通英文字母`o`，`"\u{030C}"`则表示拼音声调符号 `̌`。这两种形式所表达的字符语义完全相同，但是在字符串比较时却并不相同。

```js
console.log("\u{01D2}" === "\u{006F}\u{030C}"); // output: false
```

对于这种情况，JS原生提供了[normalize](https://link.juejin.cn/?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fen-US%2Fdocs%2FWeb%2FJavaScript%2FReference%2FGlobal_Objects%2FString%2Fnormalize "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/normalize")函数，方便在两种形式之间相互转换。
```js// NFC = Normalization Form Composition
// NFD = Normalization Form Decomposition
'\u{006F}\u{030C}'.normalize('NFC');  // return: '\u{01D2}'
'\u{01D2}'.normalize('NFD');          // return: '\u{006F}\u{030C}'

// 参数为空时，默认转换成NFC格式
'\u{006F}\u{030C}'.normalize();     // return: '\u{01D2}'
'\u{01D2}'.normalize();             // return: '\u{01D2}'


```
还有另外一些字符，看起来并不一样，用处也不同，比如：`⁵`（U+2075）和`5`（U+0035），`⁵`一般用来表示数学中的指数（如：`2⁵`）。但是，在一些上下文中可能表达一样的含义，比如：`⁵只狗`和`5只狗`。我们可以认为这两个5其实表达同样的意思，或者说是相互兼容的。在这种情况下，我们也可以使用normalize函数处理，只需设置参数为`NFKC`。不过，由于这种兼容性十分受到上下文的影响，所以要慎用。
```js
'⁵只狗'.normalize('NFKC');  // return: "5只狗"
```


#### Unicode与JS相互转换
> [javascript - JS基础篇--JS之汉字与Unicode码的相互转化 - 风雨过后见彩虹 - SegmentFault 思否](https://segmentfault.com/a/1190000012030831)

**汉字转换成`unicode`编码，使用JS的`charCodeAt()`方法就可以。**
```js
'好'.charCodeAt(0).toString(16) //597d
```

对Unicode解码的话，必须要用转义字符`'\u'`
```js
'\u54e6'
"哦"
```

汉字转unicode方法
```js
function toUnicodeFun(data){
  if(data == '' || typeof data == 'undefined') return '请输入汉字';
   var str =''; 
   for(var i=0;i<data.length;i++){
      str+="\\u"+data.charCodeAt(i).toString(16);
   }
   return str;
}

var resultUnicode = toUnicodeFun('中国'); // \u4e2d\u56fd
console.log(resultUnicode);


//其它方法
function toUnicode(s){ 
    return s.replace(/([\u4E00-\u9FA5]|[\uFE30-\uFFA0])/g,function(newStr){
        return "\\u" + newStr.charCodeAt(0).toString(16); 
    }); 
}
```

unicode编码转换为汉字的方法:
```js
function toChineseWords(data){
    if(data == '' || typeof data == 'undefined') return '请输入十六进制unicode';
    data = data.split("\\u");
    var str ='';
    for(var i=0;i<data.length;i++){
        str+=String.fromCharCode(parseInt(data[i],16).toString(10));
    }
    return str;
}

var resultChineseWords = toChineseWords("\u4e2d\u56fd"); 
console.log(resultChineseWords);//中国
```

```js

```



### Unicode in HTML
在HTML中，除了直接输入字符本身之外，所有的Unicode字符还可以用**字符实体（Entity）** 来表示，格式为`&#十进制码点值;`或`&#x十六进制码点值;`，对于部分字符，还可以用`&实体名称;`表示。例如：

|Unicode字符|码点|十进制|十六进制|实体名称|
|---|---|---|---|---|
|<|`0x003C`|`&#60;`|`&#x3C;`|`&lt;`|
|🐶|`0x1F436`|`&#128054;`|`&#x1F436;`||

如果在浏览器中渲染以下html片段，你将会看到3只一模一样的狗子。
```html
<body>🐶 &#x1F436; &#128054;</body>
```
  
不过，当我们通过JS将上面的内容插入到body中时，不同的方法将得到不同的结果，例如：
```js
document.body.innerHTML = '🐶 &#x1F436; &#128054;';   // result: 🐶 🐶 🐶
document.body.textContent = '🐶 &#x1F436; &#128054;'; // result: 🐶 &#x1F436; &#128054;
```

这是因为，`innerHTML`将内容识别成HTML片段，所以会解析其中的字符实体，而`textContent`则将内容当做普通文本插入。


### Unicode in JSX

### Unicode in CSS
在CSS的字符串中，也可以用转义序列来表示一个Unicode字符，格式为`\十六进制码点值`。例如，`é`的码点为U+00e9，所以可以直接表示成`\e9`，前导0可以省略。
```css
.foo::after { content: '\e9'; /* é */ }
```

但是有些情况下，省略前导0可能会导致字符串解析错误。例如，如果把content的值改成`\e9cho`，你会发现最后浏览器中显示的结果是`ຜho`，而不是`écho`。这是因为解析器会把转义字符`\`后紧跟的连续的最多6个十六进制数字都用来组成码点。所以在`\e9cho`中，`\e9c`被解析成一个码点，而该码点对应的字符是`ຜ`。要想解决这个问题也很简单，只需要补全前导0即可，也就是`\0000e9cho`。


### 如何保证Unicode字符正确显示

上文中，我们提到如何在HTML、CSS和JS中使用转义序列或字符实体等形式来表示一个Unicode字符。但是，在允许的情况下始终应该优先选择输入Unicode字符本身，因为这样可维护性和可读性更好。但是，要想保证Unicode字符在浏览器中正确显示，我们还需要同时保证以下三点：

- 保存文件时，使用UTF-8编码。
- 对于HTML和CSS文件，需要在文件内声明编码格式，HTML为`<meta charset='utf-8'>`，CSS为`@charset 'utf-8'`。注意，虽然在HTML5中规定默认编码是UTF-8，但是有些浏览器并非如此（如：Safari），所以建议还是显式设置编码格式。
- 在服务器端，在请求资源的HTTP响应头中设置文件类型和编码格式，例如：`content-type: text/html; charset=utf-8`。

  






## 编码格式

在ECMAScript 6出现以前，JavaScript字符串一直基于16位字符编码（UTF-16）进行构建。每16位的序列是一个编码单元（code unit），代表一个字符. length、charAt()等字符串属性和方法都是基于这种编码单元构造的。在过去16位足以包含任何字符，直到Unicode引入扩展字符集，Unicode的目标是为全世界每一个字符提供全球唯一的标识符。如果我们把字符长度限制在16位，码位数量将不足以表示如此多的字符。

UTF-16中，前2<sup>16</sup>个码位均以16位的编码单元表示，这个范围被称作基本多文种平面（BMP，Basic Multilingual Plane）。超出这个范围的码位则要归属于某个辅助平面（supplementaryplane），其中的码位仅用16位就无法表示了。为此，UTF-16引入了代理对（surrogate pair），其规定用两个16位编码单元表示一个码位。

字符串里的字符有两种，一种是由一个编码单元16位表示的BMP字符，另一种是由两个编码单元32位表示的辅助平面字符。

```javascript
let text = '𠮷';
console.log(text.length); //2
console.log(/^.$/.test(text)); //false
console.log(text.charAt(0)); //''
console.log(text.charAt(1)); //''
console.log(text.charCodeAt(0)); //55362
console.log(text.charCodeAt(1)); //57271

//Unicode字符“[插图]”是通过代理对来表示的，因此，这个示例中的JavaScript字符串操作将其视为两个16位字符。
```



```JavaScript
字符串在计算机底层实际上就是一个字符数组
let str = 'Hello'; --> ['H', 'e', 'l', 'l', 'o'];

因为字符串是不可变数据类型,所以数组的破坏性方法无法使用.
```


