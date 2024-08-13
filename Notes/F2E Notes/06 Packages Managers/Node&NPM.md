## Nodejs学习教程

> https://www.zhihu.com/question/59212916/answer/273289677



\1. 认真学习 ECMAScript，并学会如何看 ECMAScript 规范；

\2. 学会看 Node.js API，而不是学着死记硬背，并常看社区动态以及 CHANGELOG；

\3. 学会搜索 Node.js 生态圈，而不是死记硬背要学会某个框架，那样没用；

\4. 在会 Promise / yield / async 外，还应该不忘好好学习 callback，很多新人把这块重要的思想给忽略了；

\5. 夯实编程基础，与 Node.js 无关，如数据结构、设计模式、操作系统等等，这些东西会了之后你的思想就对了，造轮子什么的手到擒来；

\6. 学习整个后端体系，包括但不局限于 HTTP 协议、TCP 等等，还有数据库（并不是学会如何写 SQL，而是数据库基础）；



作者：死月絲卡蕾特
链接：https://www.zhihu.com/question/59212916/answer/273289677
来源：知乎
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。



> [NodeSchool](https://nodeschool.io/zh-cn/)
>
> 





## Node.js安装配置

### 1.下载安装Node.js

> 官网下载最新版本：https://nodejs.org/en/download/

可以下载安装包, 或者下载zip文件找个目录保存，解压下载的文件，然后配置环境变量，将解压文件所在的路径配置到环境变量中。



### 2.配置默认安装目录和缓存日志目录

> 这里的环境配置主要配置的是npm安装的全局模块所在的路径，以及缓存cache的路径，之所以要配置，是因为以后在执行类似：npm install express [-g] （后面的可选参数-g，g代表global全局安装的意思）的安装语句时，会将安装的模块安装到【C:\Users\用户名\AppData\Roaming\npm】路径中，占C盘空间。

####  2.1 创建默认安装目录和缓存日志目录

#### 1. 创建文件夹

希望将全模块所在路径和缓存路径，放在我node.js安装的文件夹中，则在我安装的文件夹【"D:\Program Files \nodejs】下创建两个文件夹【node_global】及【node_cache】分别作为默认安装目录和缓存日志目录。

#### 2.执行命令

```shell
npm config set prefix "D:\Program Files\nodejs\node_global"
npm config set cache  "D:\Promgram Files\nodejs\node_cache"
```

输入`npm list -global`命令来查看全局安装目录：



### 3.node.js环境配置

> 这里默认是D:\Program Files\nodejs为node的安装路径
>
> 如果是安装安装的,环境变量会自动配置的

#### 1.进入环境变量配置

> 我的电脑”-右键-“属性”-“高级系统设置”-“高级”-“环境变量”，进入环境变量对话框

1、【系统变量】下新建【NODE_PATH】，此处设置第三方依赖包安装目录
如果跟着第2步修改了全局安装目录，则输入【D:\Program Files\nodejs\node_global\node_modules 】

2、【系统变量】下的【Path】添加上node的路径【D:\Program Files\nodejs\】

3、如果设置了全局安装目录，【用户变量】下的【Path】将默认的 C 盘下 APPData/Roaming\npm 修改为【D:\Program Files\nodejs\node_global】，【D:\Program Files\nodejs\node_cache】，这是nodejs默认的模块调用路径



### 4.配置淘宝镜像

#### 查看npm下载源 

> npm config get registry

将npm的模块下载仓库从默认的国外站点改为国内的站点，这样下载模块的速度才能比较快，现在用的都是淘宝镜像源（https://registry.npmmirror.org），使用淘宝镜像源有两种方式：

1）临时使用

> npm --registry https://registry.npmmirror.org install cluster

这个代码就是只在安装cluster的使用淘宝镜像下载，每次安装一个模块都用挺长的代码，比较繁琐，所以推荐第二种方式。

2）永久使用

这里有也两种配置选择，一是直接修改npm命令的仓库地址为淘宝镜像源，另一种是安装cnpm命令。

第一种: 直接修改npm的默认配置

> npm config set registry https://registry.npmmirror.org

验证：配置后可以根据 `npm config get registry`或 `npm config list` 命令查看npm下载源是否配置成功，

第二种: 安装cnpm

> npm i -g cnpm --registry=https://registry.npmmirror.org

验证方式变成了`cnpm config get registry` 或 `cnpm config list`


## NRM
### nrm管理多个npm镜像地址
全局安装nrm后, 即可设置切换多个镜像地址
```bash
# 全局安装
npm i -g nrm


# 添加镜像
# nrm add <registry name> <registry url>
nrm add china-tower http://10.34.53.35:7001/


# 使用镜像
nrm use china-tower

# 展示当前所有镜像
nrm ls

```

## NVM
### 使用nvm管理多个nodejs版本
> 以下内容是仓库地址github.com/nvm-sh/nvm下的.
> 目前使用的是https://github.com/coreybutler/nvm-windows 具体教程查看仓库地址


NVM就是一个比较好用node管理工具，切换node版本。 

官网教程

```bash
https://github.com/nvm-sh/nvm#usage
```



### 配置教程

#### 0. 删除已安装的nodejs

完整清楚已安装的nodejs,包括文件夹和环境变量中的配置

具体可以参考下面连接中的内容:

> [node彻底删除_qq_45353152的博客-CSDN博客_卸载node](https://blog.csdn.net/qq_45353152/article/details/124611034)



#### 1. 下载nvm安装包

##### 使用安装包

* 安装版本使用最新
* 点击执行exe文件, 注意修改nvm的安装根目录以及node的安装根目录，后者是以后管理多版本node的源文件储存地址

##### 使用命令行

> [GitHub - nvm-sh/nvm: Node Version Manager - POSIX-compliant bash script to manage multiple active node.js versions](https://github.com/nvm-sh/nvm#usage)

在git中使用命令行安装, 安装以后在git中可以查看,但在cmd环境中报错,无法识别nvm命令.



安装情况

安装完成后, 在cmd命令行窗口中查看是否安装成功

* `nvm version` 检查nvm是否安装成功





#### 2.管理nodejs

**注意:**在1.1.9版本中, 先前安装的版本没有删除,但是使用`nvm use 版本号`中会报错. 必须先卸载之前安装的nodejs,删除其安装文件夹. 

##### 查看已安装的版本版本

```bash
nvm list
```



##### 查看可安装的版本

```bash
nvm list available
```

##### 安装指定版本

```bash
nvm install 版本号

//如果只写大的版本号,那么会安装当前版本号的最新版本; lts表示最新版本
```



##### 指定node版本

```bash
nvm use 版本号
```



##### 卸载指定的版本

```bash
nvm uninstall 版本号
```



#### 其他命令

- nvm arch：表示node是运行在32位还是64位。
- nvm on ：开启node.js版本管理。
- nvm off：关闭node.js版本管理。
- nvm list [available]：查看已安装的node版本。available可选参数，查看所有可安装的node版本。list可简化成ls。
- nvm install [version]：安装指定的node版本。
- nvm use [version] [arch]：使用指定版本的node。可指定32位或64位。
- nvm uninstall \<version>: 卸载指定版本的node。
* nvm version：查看nvm版本号。version可简化为v。
* nvm proxy url  设置代理地址



### 遇到的问题??? (待解决)

在管理员权限下使用cmd窗口命令, 只有使用全局安装`-g`才能将下载的包安装到nvm设置的目录中.否则将安装在当前命令行位置下的目录.



#### 安装yarn后,无法识别

**全局安装yarn**

```bash
npm install yarn -g
```

**检查**
检查但无法识别命令, 在当前node版本文件夹下也没有发现yarn.
```bash
yarn -v
```

**解决**

需要进行环境变量的配置（就是把yarn.cmd命令配置到环境变量中). 一般来说，这两个命令都在相应的bin目录下，但这里比较特殊，系统自动保存在了node_global目录下.

重启cmd窗口,重新检查yarn版本



#### 命令行安装后,cmd中无法运行nvm

暂时没有找到能解决的方法



### npx介绍
> https://github.com/LightXJ/blog/issues/28

#### 是什么
npm从5.2版开始，增加了npx命令。它有很多用处，本文介绍该命令主要使用场景。  
Node自带npm模块，npx又是npm的自带模块，所以可以直接使用npx命令。万一不能，可以手动安装为  
`npm install -g npx`

#### 作用
**调用项目安装的模块**
npx想要解决的主要问题，就是调用项目内部安装的模块。比如，项目内部安装了测试工具Mocha  
`npm install -d mocha`  
一般来说，调用Mocha,只能在项目脚本和package.json的scripts字段里面，如果想在命令行下调用，必须像下面

```js
# 项目的根目录下执行
$ node-modules/.bin/mocha --version
```

npx就是想解决这个问题，让项目内部安装的模块用起来更方便，只要像下面这样调用就行了。

```js
npx mocha --version
```

**避免全局安装**
除了调用项目内部模块，npx还能避免全局安装的模块。比如，create-react-app这个模块是全局安装，npx可以运行它，而且不进行全局安装。  
`npx create-react-app my-react-app`  
上面代码运行时，npx将create-react-app下载到一个临时目录，使用以后再删除。所以，以后再次执行上面的命令，会重新下载create-react-app

下载全局模块时，npx允许指定版本  
`npx uglify-js@3.1.0 main.js -o ./dist/main.js`  
上面代码指定使用3.1.0版本的uglify-js压缩脚本  
注意，只要npx后面的模块无法在本地发现，就会下载同名模块。比如，本地没有安装http-server模块，下面的命令会自动下载该模块，在当前目录启动一个web服务。  
`npx http-server`

#### 配置




### package.json

#### 资料

> 英文原版：https://docs.npmjs.com/files/package.json
>
> 国内整理：《[npm的package.json中文文档](https://github.com/ericdum/mujiang.info/issues/6/)》



#### 是什么

大家都知道，**`package.json 用来描述项目及项目所依赖的模块信息。`**，就是帮我们管理项目中的依赖包的，让我们远离了依赖地狱。

package.json是管理其依赖的配置文件, 初始化项目时, 会在目录下生成3个目录/文件:

* node_modules
* package.json
* package.lock.json



#### package-lcok.json

本质上package-lock.json文件是为了锁版本, 在package.json中指定的子npm包比如：react: "^16.0.0"，在实际安装中，只要高于react的版本都满足package.json的要求。这样就使得根据同一个package.json文件，两次安装的子依赖版本不能保证一致。





#### package.json 常用属性

以下指示选取了其中几个比较重要的字段:

**name**

在package.json中最重要的就是name和version字段。他们都是必须的，如果没有就无法install。name和version一起组成的标识在假设中是唯一的。改变包应该同时改变version。

name是这个东西的名字。注意：

- 不要把node或者js放在名字中。因为你写了package.json它就被假定成为了js，不过你可以用"engine"字段指定一个引擎（见后文）。
- 这个名字会作为在URL的一部分、命令行的参数或者文件夹的名字。任何non-url-safe的字符都是不能用的。
- 这个名字可能会作为参数被传入require()，所以它应该比较短，但也要意义清晰。
- 在你爱上你的名字之前，你可能要去npm registry查看一下这个名字是否已经被使用了。http://registry.npmjs.org/

**version**

version必须能被[node-semver](https://github.com/isaacs/node-semver)解析，它被包在npm的依赖中。（要自己用可以执行`npm install semver`）

**scripts**

在npm中使用script标签来定义脚本，每当制定npm run的时候，就会自动创建一个shell脚本，这里需要注意的是，npm run新建的这个 Shell，会将本地目录的node_modules/.bin子目录加入PATH变量。

这意味着，当前目录的node_modules/.bin子目录里面的所有脚本，都可以直接用脚本名调用，而不必加上路径。比如，当前项目的依赖里面有 esbuild，只要直接写esbuild xxx 就可以了。

以下两种写法都是等价的:

```json
{
//...  

"script" : {
  "build": "esbuild index.js"
}

}
```



```json
{
  //...
  "script": {
    "build": "./node_modules/.bin/esbuild index.js"
  }
}
```

<span style="color:blue">注意事项:</span>
如果我在项目下只是安装一个局部包,那么我运行这个包命令的话,会显示npm无法识别这个命令.(待上传一个实例图片...)
原因? [[#布局安装的包的命令无法别识别]]




**bin**

bin属性用来将可执行文件加载到全局环境中，指定了bin字段的npm包，一旦在全局安装，就会被加载到全局环境中，可以通过别名来执行该文件。

比如\@bytepack/cli的npm包：

```json
"bin": {
    "bytepack": "./bin/index.js"
 },
```

一旦在全局安装了@bytepack/cli，就可以直接通过bytepack来执行相应的命令，比如

```bash
bytepack -v
// 显示1.11.0
```

如果非全局安装，那么会自动连接到项目的node_module/.bin目录中。与前面介绍的script标签中所说的一致，可以直接用别名来使用。





**workspaces**  ???

workspaces解决了本地文件系统中如何在一个顶层root package下管理多个子packages的问题，在workspaces声明目录下的package会软链到最上层root package的node_modules中





#### package.json环境相关属性

常见的环境，基本上分为浏览器browser和node环境两大类，接下来我们来看看package.json中，跟环境相关的配置属性。环境的定义可以简单理解如下：

- browser环境：比如存在一些只有在浏览器中才会存在的全局变量等，比如window，Document等
- node环境: npm包的源文件中存在只有在node环境中才会有的一些变量和内置包，内置函数等。



**type**

js的模块化规范包含了commonjs、CMD、UMD、AMD和ES module等, 从node13.2.0开始后，node正式支持了ES module规范，在package.json中可以通过type字段来声明npm包遵循的模块化规范。

package.json

```json
{
   name: "some package",
   type: "module"||"commonjs" 
}
```

- 不指定type的时候，type的默认值是commonjs，不过建议npm包都指定一下type
- 当type字段指定值为module则采用ESModule规范
- 当type字段指定时，目录下的所有.js后缀结尾的文件，都遵循type所指定的模块化规范
- 除了type可以指定模块化规范外，通过文件的后缀来指定文件所遵循的模块化规范，以.mjs结尾的文件就是使用的ESModule规范，以.cjs结尾的遵循的是commonjs规范



**main /  modules  /browser**

- main : 定义了 npm 包的入口文件，browser 环境和 node 环境均可使用
- module : 定义 npm 包的 ESM 规范的入口文件，browser 环境和 node - 环境均可使用
- browser : 定义 npm 包在 browser 环境下的入口文件

我们来看一下这3个字段的使用场景，以及同时存在这3个字段时的优先级。我们假设有一个npm包为demo1,

```bash
----- dist
   |-- index.browser.js
   |-- index.browser.mjs
   |-- index.js
   |-- index.mjs
```



其package.json中同时指定了main,module和browser这3个字段，

```json
  "main": "dist/index.js",  // main 
  "module": "dist/index.mjs", // module

  // browser 可定义成和 main/module 字段一一对应的映射对象，也可以直接定义为字符串
  "browser": {
    "./dist/index.js": "./dist/index.browser.js", // browser+cjs
    "./dist/index.mjs": "./dist/index.browser.mjs"  // browser+mjs
  },

  // "browser": "./dist/index.browser.js" // browser
```

默认构建和使用，比如我们在项目中引用这个npm包：

通过构建工具构建上述代码后，模块的加载循序为：_**browser+mjs > module > browser+cjs > main**_这个加载顺序是大部分构建工具默认的加载顺序，比如webapck、esbuild等等。可以通过相应的配置修改这个加载顺序，不过大部分场景，我们还是会遵循默认的加载顺序。



**exports**

如果在package.json中定义了exports字段，那么这个字段所定义的内容就是该npm包的真实和全部的导出，优先级会高于main和file等字段。

```json
{
  "name": "pkg",
  "exports": {
    ".": "./main.mjs",
    "./foo": "./foo.js"
  }
}
```



```javascript
import { something } from "pkg"; // from "pkg/main.mjs"
```



```javascript
const { something } = require("pkg/foo"); // require("pkg/foo.js")
```

从上述的例子来看，exports可以定义不同path的导出。如果存在exports后，以前正常生效的file目录到处会失效，比如require('pkg/package.json')，因为在exports中没有指定，就会报错。  exports还有一个最大的特点，就是条件引用，比如我们可以根据不同的引用方式或者模块化类型，来指定npm包引用不同的入口文件。

```json
// package.json
{ 
  "name":"pkg",
  "main": "./main-require.cjs",
  "exports": {
    "import": "./main-module.js",
    "require": "./main-require.cjs"
  },
  "type": "module"
}
```

上述的例子中，如果我们通过

```
const p = require('pkg')
```

引用的就是"./main-require.cjs"。如果通过：

```
import p from 'pkg'
```

引用的就是"./main-module.js"最后需要注意的是 ：***如果存在exports属性，exports属性不仅优先级高于main，同时也高于module和browser字段。***





#### package.json依赖相关属性

package.json中跟依赖相关的配置属性包含了dependencies、devDependencies、peerDependencies和peerDependenciesMeta等。

dependencies是项目的依赖，而devDependencies是开发所需要的模块，所以我们可以在开发过程中需要的安装上去，来提高我们的开发效率。这里需要注意的时，在自己的项目中尽量的规范使用，形如webpack、babel等是开发依赖，而不是项目本身的依赖，不要放在dependencies中。



**dependencies**

依赖是给一组包名指定版本范围的一个hash。这个版本范围是一个由一个或多个空格分隔的字符串。依赖还可以用tarball或者git URL。

请不要将测试或过渡性的依赖放在`dependencies`hash中

**devDependencies**

如果有人要使用你的模块，那么他们可能不需要你开发使用的外部测试或者文档框架。

在这种情况下，最好将这些附属的项目列在`devDependencies`中。

这些东西会在执行`npm link`或者`npm install`的时候初始化，并可以像其他npm配置参数一样管理。



**peerDependencies**

peerDependencies是package.json中的依赖项,可以解决核心库被下载多次，以及统一核心库版本的问题。

```json
//package/pkg
----- node_modules
   |-- npm-a -> 依赖了react,react-dom
   |-- npm-b -> 依赖了react,react-dom
   |-- index.js
```

比如上述的例子中如果子npm包a,b都以来了react和react-dom,此时如果我们在子npm包a,b的package.json中声明了PeerDependicies后，相应的依赖就不会重新安装。需要注意的有两点：









**peerDependenciesMeta**

看到“Meta”就有元数据的意思，这里的peerDependenciesMeta就是详细修饰了peerDependicies，比如在react-redux这个npm包中的package.json中有这么一段：

```json
 "peerDependencies": {
    "react": "^16.8.3 || ^17 || ^18"
  },
 "peerDependenciesMeta": {
    "react-dom": {
      "optional": true
    },
    "react-native": {
      "optional": true
    }
  }
```

这里指定了"react-dom","react-native"在peerDependenciesMeta中，且为可选项，因此如果项目中检测没有安装"react-dom"和"react-native"都不会报错。

值得注意的是，通过peerDependenciesMeta我们确实是取消了限制，但是这里经常存在非A即B的场景，比如上述例子中，我们需要的是“react-dom”和"react-native"需要安装一个，但是实际上通过上述的声明，我们实现不了这种提示。







#### 版本号

> 公众号: 程序员成长指北

版本号由三部分组成：`major.minor.patch`，主版本号.次版本号.修补版本号。

例如：1.2.3，主要版本1，次要版本2，补丁3。

- `补丁`中的更改表示不会破坏任何内容的错误修复。
- `次要版本`的更改表示不会破坏任何内容的新功能。
- `主要版本`的更改代表了一个破坏兼容性的大变化。如果用户不适应主要版本更改，则内容将无法正常工作。

#### 安装依赖包的版本如何指定

`~` 会匹配最近的小版本依赖包，比如 ~1.2.3 会匹配所有 1.2.x 版本，但是不包括 1.3.0

`^` 会匹配最新的大版本依赖包，比如 ^1.2.3 会匹配所有 1.x.x 的包，包括 1.3.0，但是不包括 2.0.0

`*` 安装最新版本的依赖包，比如 *1.2.3 会匹配 x.x.x，



你可以`指定特定的版本号`，直接写1.2.3，前面**什么前缀都没有**，这样固然没问题，但是如果依赖包发布新版本修复了一些小bug，那么需要手动修改package.json文件；`~` 和 `^` 则可以解决这个问题。

但是需要注意 ^ 版本更新可能比较大，会造成项目代码错误， **建议使用 `~` 来标记版本号**，这样可以保证项目不会出现大的问题，也能保证包中的小bug可以得到修复。

版本号写 *，这意味着安装最新版本的依赖包，但缺点同上，可能会造成版本不兼容，**慎用！**



#### 多人开发时依赖包安装的问题

场景介绍:

假设我们中安装了 `vue`, 当我们运行安装 `npm install vue -save` 的时候，在项目中的package.json 的 vue 版本是  `vue: ^3.0.0`,，vue 发布了新版本 3.0.1，这时新来一个同事，从新 `git clone` 克隆项目，执行 `npm install`安装的时候，在他电脑的vue版本就是 3.0.1了，因为^只是锁了主要版本，这样我们电脑中的vue版本就会不一样.

**从理论上讲（大家都遵循语义版本控制的话）**，它们应该仍然是兼容的，但也许 bugfix 会影响我们正在使用的功能，而且当使用vue版本3.0.0和3.0.1运行时，我们的应用程序会产生不同的结果。



解决方法:

为了解决这个不同人电脑安装的所有依赖版本都是一致的，确保项目代码在安装所执行的运行结果都一样，这时 `package-lock.json` 就应运而生了。





### package-lock.json

#### 介绍

`package-lock.json` 它会**在 npm 更改 node_modules 目录树 或者 package.json 时自动生成的** ，它准确的描述了当前项目npm包的依赖树，并且在随后的安装中会根据 package-lock.json 来安装，保证是相同的一个依赖树，不考虑这个过程中是否有某个依赖有小版本的更新。

它的产生就是来对整个依赖树进行版本固定的（锁死）。



当我们在一个项目中`npm install`时候，会自动生成一个`package-lock.json`文件，和`package.json`在同一级目录下。`package-lock.json`记录了项目的一些信息和所依赖的模块。

当我们下次再`npm install`时候，npm 发现如果项目中有 `package-lock.json` 文件，会根据 `package-lock.json` 里的内容来处理和安装依赖而不再根据 `package.json`。



注意:

> 注意，使用`cnpm install`时候，并不会生成 `package-lock.json` 文件，也不会根据 `package-lock.json` 来安装依赖包，还是会使用 `package.json` 来安装。



#### 生成逻辑

假设我们现在有三个 package，在项目 lock-test中，安装依赖A，A项目面有B，B项目面有C

```json
// package lock-test
{ "name": "lock-test", "dependencies": { "A": "^1.0.0" }}
// package A
{ "name": "A", "version": "1.0.0", "dependencies": { "B": "^1.0.0" }}
// package B
{ "name": "B", "version": "1.0.0", "dependencies": { "C": "^1.0.0" }}
// package C
{ "name": "C", "version": "1.0.0" }
```

在这种情况下 `package-lock.json`, 会生成类似下面铺平的结构

```json
// package-lock.json
{ 
    "name": "lock-test",  
    "version": "1.0.0",  
    "dependencies": {    
        "A": { "version": "1.0.0" },
        "B": { "version": "1.0.0" },
        "C": { "version": "1.0.0" }  
    }
}
```

如果后续无论是直接依赖的 A 发版，或者间接依赖的B, C 发版，只要我们不动 `package.json`, `package-lock.json` 都不会重新生成。

A 发布了新版本 1.1.0，虽然我们 package.json 写的是 ^1.0.0 但是因为 `package-lock.json` 的存在，npm i 并不会自动升级，

我们可以手动运行 npm i A@1.1.0 来实现升级。

因为 1.1.0 `package-lock.json` 里记录的 A@1.0.0 是不一致的，因此会更新 `package-lock.json` 里的 A 的版本为 1.1.0。

B 发布了新版本 1.0.1, 1.0.2, 1.1.0, 此刻如果我们不做操作是不会自动升级 B 的版本的，但如果此刻 A 发布了 1.1.1，虽然并没有升级 B 的依赖，但是如果我们项目里升级 A@1.1.1，此时 `package-lock.json` 里会把 B 直接升到 1.1.0 ,因为此刻^1.0.0的最新版本就是 1.1.0。

经过这些操作后 项目 lock-test 的 package.json 变成

```json
// package 
lock-test{ "dependencies": { "A": "^1.1.0" }}
```

对应的 `package-lock.json` 文件

```json
{  
    "name": "lock-test",  
    "version": "1.0.0",
    "dependencies": {  
        "A": { "version": "1.1.0" },
        "B": { "version": "1.1.0" },
        "C": { "version": "1.0.0" }
    }
}
```

这个时候我们将 B 加入我们 lock-test 项目的依赖, B@^1.0.0，package.json如下

```json
{ "dependencies": { "A": "^1.1.0", "B": "^1.0.0" }}
```

我们执行这个操作后，`package-lock.json` 并没有被改变，因为现在 `package-lock.json` 里 B@1.1.0 满足 ^1.0.0 的要求

但是如果我们将 B 的版本固定到 2.x 版本, `package-lock.json` 就会发生改变

```json
{ "dependencies": { "A": "^1.1.0", "B": "^2.0.0" }}
```

因为存在了两个冲突的B版本，`package-lock.json` 文件会变成如下形式

```json
{  
    "name": "lock-test",
    "version": "1.0.0",  
    "dependencies": {    
        "A": {      
            "version": "1.1.0",      
            "dependencies": {        
                "B": { "version": "1.1.0" }      
            }    
        },    
        "B": { "version": "2.0.0" },    
        "C": { "version": "1.0.0" }  
    }
}
```

因为 B 的版本出现了冲突，npm 使用嵌套描述了这种行为

我们实际开发中并不需要关注这种生成的算法逻辑，我们只需要了解，`package-lock.json` 的生成逻辑是为了能够精准的反映出我们 node_modules 的结构，并保证能够这种结构被还原。



#### package-lock.json意外更改的原因

1. package.json 文件修改了
2. 挪动了包的位置

将部分包的位置从 dependencies 移动到 devDependencies 这种操作，虽然包未变，但是也会影响 `package-lock.json`，会将部分包的 dev 字段设置为 true

3. registry 的影响

经过实际使用发现，如果我们 node_modules 文件夹下的包中下载时，就算版本一样，安装源 `registry` 不同，执行 npm i 时也会修改 package-lock.json



可能还存在其他的原因，但是 `package-lock.json` 是不会无缘无故被更改的，一定是因为 **package.json 或者 node_modules 被更改了**，因为 正如上面提到的 package-lock.json 为了能够精准的反映出我们 node_modules 的结构



#### 开发建议

一般情况下 `npm install` 是可以的，他能保证根据 `package-lock.json` 还原出开发时的 `node_modules`。

但是为了防止出现刚刚提到的意外情况，除非涉及到对包的调整，其他情况下建议使用 `npm ci `来安装依赖，会避免异常的修改 `package-lock.json`，

持续集成工具中更推荐是用 `npm ci`，保证`构建环境的准确性`，**npm i 和 npm ci 的区别** 可以参考官方文档 npm-ci









### 使用流程

```js
- 在页面中直接调用地址
1.下载到本地
2.页面中使用链接引入

- node环境下如何使用

//引入lodash包
const _=require('lodash');
console.log(_.random(1, 100));
//node调用js文件


- 其他:
包是存在依赖的,下载一个包,可能在下载了多个包
```



#### 团队开发使用流程

```js
# node_modules文件夹是不进入git仓库的,需要在.gitignore中忽略.
# 远端仓库 强推会覆盖远端仓库内容, 语法: git push -u origin master -f

1. 从仓库中拉取仓库代码 //git clone 远端地址
2. 运行 npm install 安装相关依赖 //npm i
3. 运行项目，继续开发


```







```js
npm -version/-v
npm init/i 初始化
npm i --yes 简洁写法 全部采用默认值,但上级路径中不能存在中文
npm search/s name 搜索包
npm install/i name 安装包

//安装到依赖中  包名会被注册在package.json中的dependencies里面,在生产环境下这个包的依赖依然存在.
//安装包并添加到生产中(devdependencies)  6版本可省略,自动添加到依赖中
npm i name --save-dev
npm i name -D

//安装包并添加到开发中(dependencies)
//
npm i name --save
npm i name -S


npm i name -g 全局安装

npm i/install  安装全部依赖
npm i --production 只安装dependencies中的依赖

npm remove/r name1 name2 移除包,可以添加多个包的名字
```



### 封装 NPM 包

创建自己的 NPM 包可以帮助代码进行迭代进化，使用步骤也比较简单

0. 修改为官方的地址 (npm config set registry https://registry.npmjs.org/) 使用非官方地址时才要(淘宝镜像才使用此步)

1. 创建文件夹，并创建文件 **index.js**， 在文件中声明函数，使用 module.exports 暴露
2. 文件夹下 npm 初始化工具包(npm init)，package.json 填写包的信息
3. 账号注册（激活账号）,==完成邮箱验证==
4. 文件夹下,命令行下 『npm login』 填写相关用户信息
5. 文件夹下, 命令行下『 npm publish』 提交包 👌

> npm 有垃圾检测机制，如果名字简单或做测试提交，很可能会被拒绝提交
>
> ==可以尝试改一下包的名称来解决这个问题==



### 升级npm包

升级 NPM 包，需要修改 package.json 中的版本号修改，只需要执行『npm publish』就可以能提交

1. 修改包代码
2. 修改 package.json 中版本号
3. npm publish 提交

### 删除 npm 包

```
npm unpublish 包名 --force
```



## NPM

### 介绍

全称：Node Package Manager , Node 的包管理器，也是一个应用程序。是随同NodeJS一起安装的包管理和分发工具，它很方便让JavaScript开发者下载、安装、上传以及管理已经安装的包。

### 包是什么

Node.js 的包基本遵循 CommonJS 规范，将一组相关的模块组合在一起，形成一个完整的工具

### 作用

通过 NPM 可以对 Node 的工具包进行**搜索、下载、安装、删除、上传**。借助别人写好的包，可以让我们的开发更加方便。

### 安装

安装完 nodejs 之后会自动安装 npm

详见Node安装教程





### 背景知识(开发+生产)

```js
开发环境:项目处在编码阶段,
    用到的辅助工具依赖就安装到devDependencies下,使用npm install 包名 --save-dev(-D)
	例如:css预处理器:Less, Sass, Stylus; ESlint; Webpack打包工具
    
    
生产环境: 上线服务
	如果项目运行需要的依赖,就安装到dependencies下, 使用npm install 包名  --save(-S)
    例如:Vue.js,React框架; axios; ElementUI组件库
```



## NPM常用命令

> [CLI Commands | npm Docs (npmjs.com)](https://docs.npmjs.com/cli/v8/commands)

#### 查看 npm 的版本

```sh
npm -v 
```

#### 初始化

//主要是用来创建package.json文件,如果已经存在,则不需要重新创建.
//包名字不能使用中文,大写和npm

##### 基础语法

```shell
npm init [-f| --force| -y | --yes]
```



```sh


npm init
//简洁写法, 输入都采用默认值
npm init --yes
```

运行后会创建 package.json 文件  //一般放在根目录下           

```json
{
  "name": "1-npm",      #包的名字
  "version": "1.0.0",   #包的版本
  "description": "",    #包的描述
  "main": "index.js",   #包的入口文件
  "scripts": {			#脚本配置
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",			#作者
  "license": "ISC"		#版权声明
}
```

> ==注意生成的包名不能使用中文，大写 ！！！ 不能使用 npm 作为包的名字==

关于开源证书扩展阅读

<http://www.ruanyifeng.com/blog/2011/05/how_to_choose_free_software_licenses.html>

#### 搜索

##### 搜索
```js
npm search 包名
```

##### 查看本地包
```js
npm ls 包名
```

##### 查看全局安装的包
```js
npm ls 包名 -g
```

##### 查看远程包
查看最新版本
```js
npm view 包名 version
```

查看所有的版本
```js
npm view 包名 versions
```

或者
```js
npm info 包名
```




### 安装模块

#### 基础语法
```markdown
npm install [<@scope>/]<pkg>
npm install [<@scope>/]<pkg>@<tag>
npm install [<@scope>/]<pkg>@<version>
npm install [<@scope>/]<pkg>@<version range>
npm install <alias>@npm:<name>
npm install <folder>
npm install <tarball file>
npm install <tarball url>
npm install <git:// url>
npm install <github username>/<github project>

aliases: add, i, in, ins, inst, insta, instal, isnt, isnta, isntal, isntall

common options: [-S|--save| -D|--save-dev| -O|--save-optional] [-E| --save-exact] [--dry-run]
            
```

* 安装包,默认会安装最新的版本

```tiki wiki
npm install gulp
```

* 安装指定版本的包

```tiki wiki
npm install gulp@3.9.1
```

安装包并将信息保持到项目的package.json文件中;

* 6版本的 npm ，安装包时会自动保存在 dependencies 中，可以不用写 `--save`

* 一次安装多个包
	命令行可以添加多个包 npm i chalk ludash


* 安装包到生产/开发环境依赖


安装包信息到**生产环境(dependencies)** `-S | -save`

```markdown
//npm5及之后, `npm install`和`npm install --save`是等价的，所以–save可以省略

npm i gulp --save
npm i gulp -S
```

package.json文件的 dependencies 字段：

```shell
## 安装并在 package.json 中保存包的信息(dependencies 属性)
"dependencies": { 
    "gulp": "^3.9.1"
}
```



安装包信息到**开发环境(devDependencies)** `-D | --save-dev`

```sh
//安装并在 package.json 中保存包的信息(devDependencies 属性) 主要用来保存一些开发依赖包,例如webpack
npm i gulp --save-dev
npm i gulp -D
```

package.json 文件的 devDependencies字段：

```markdown
"devDependencies": {
    "gulp": "^3.9.1"
}
```



项目对模块的依赖可以使用下面的 3 种方法来表示（假设当前版本号是 1.1.0 ）：
- 兼容模块新发布的补丁版本：~1.1.0、1.1.x、1.1
- 兼容模块新发布的小版本、补丁版本：^1.1.0、1.x、1
- 兼容模块新发布的大版本、小版本、补丁版本：*、x



安装包信息到**可选阶段(optionalDependencies)** `-O | --save-optional`

```markdown
npm i gulp --save-optional
npm i gulp -O
```

package.json 文件的optionalDependencies字段：

```markdown
"optionalDependencies": {
    "gulp": "^3.9.1"
}
```

**精确安装指定模块**版本 `-E | --save-exact`

```markdown
npm i gulp --save-exact
npm i gulp -E
```

输入命令npm install gulp -ES，留意package.json 文件的 dependencies 字段，以看出版本号中的^消失了

```markdown
"dependencies": {
    "gulp": "3.9.1"
}
```



**全局安装** 使用`-g` 或 `--global`

```shell
//package.json没有变化,对单个项目没有影响
//全局安装位置的查看命令: npm root -g 打印结果就是下面的文件夹
//安装位置: .../AppDate/Roaming/npm/node_modles
//会创建全局的命令: 


npm install less -g
npm install nodemon -g 
```

**局部安装**
安装到当前项目中,因为没有全局安装,不在环境变量中,启动安装命令,可以使用`npx 原命令`.
```bash
npm i xxx

//安装,执行安装包命令
npi i @vue/cli
npx create vue 项目包名
```



### 查看安装的模块

#### 基础语法

```shell
npm ls [[<@scope>/]<pkg> ...]

aliases: list, la, ll
```

查看全局安装的模块及依赖

```shell
npm ls -g
```


#### 安装相关问题

**1.依赖错误 ERESOLVE unable to resolve dependency tree**
新安装的依赖和已经安装的依赖之间的版本不适配,引起了冲突.
```bash
npm ERR! code ERESOLVE
npm ERR! ERESOLVE unable to resolve dependency tree
npm ERR! 
npm ERR! While resolving: vuecliformat@0.1.0
npm ERR! Found: eslint@7.32.0
npm ERR! node_modules/eslint
npm ERR!   dev eslint@"^7.32.0" from the root project
npm ERR! 
npm ERR! Could not resolve dependency:
npm ERR! peer eslint@">=8.0.0" from eslint-plugin-prettier@5.2.1
npm ERR! node_modules/eslint-plugin-prettier
npm ERR!   dev eslint-plugin-prettier@"*" from the root project
npm ERR!
npm ERR!
npm ERR! Fix the upstream dependency conflict, or retry
npm ERR! this command with --force, or --legacy-peer-deps
npm ERR!
npm ERR! Fix the upstream dependency conflict, or retry
npm ERR!
npm ERR! Fix the upstream dependency conflict, or retry
npm ERR!
npm ERR! Fix the upstream dependency conflict, or retry
npm ERR!
npm ERR! Fix the upstream dependency conflict, or retry
npm ERR!
npm ERR!
npm ERR!
npm ERR! Fix the upstream dependency conflict, or retry
npm ERR! this command with --force, or --legacy-peer-deps
npm ERR! to accept an incorrect (and potentially broken) dependency resolution.
npm ERR!
npm ERR! See C:\Users\Null\AppData\Local\npm-cache\eresolve-report.txt for a full report.

npm ERR! A complete log of this run can be found in:
npm ERR!     C:\Users\Null\AppData\Local\npm-cache\_logs\2024-08-13T06_30_08_389Z-debug-0.log
```

**解决方案**
推荐方法1和3

* 更新已经安装的依赖
```bash
npm update eslint -D
```


* 使用`--legacy-peer-deps`语句,强制忽略依赖冲突
	使用 `--legacy-peer-deps`语句来忽略对等依赖冲突
```bash
npm install eslint-plugin-prettier eslint-config-prettier -D --legacy-peer-deps
```


* 降级`eslint-plugin-prettier`
	选择是安装与你当前 ESLint 版本兼容的 eslint-plugin-prettier 版本
```bash
npm install eslint-plugin-prettier@4.2.1 eslint-config-prettier -D
```

* 使用 `--force`语句强制安装
	这是最不推荐的做法,因为它可能会导致包之间的不兼容
```bash
npm install eslint-plugin-prettier eslint-config-prettier -D --force
```





### 卸载模块

#### 基础语法

```html
npm uninstall [<@scope>/]<pkg>[@<version>]... [-S|--save|-D|--save-dev|-O|--save-optional]

aliases: remove, rm, r, un, unlink
```

如卸载开发版本的模块, 一行可以写多个包名

```javascript
npm uninstall gulp --save-dev

npm remove jquery
npm remove jquery chalk //可以在写法上移出多个包
```



### 更新模块

#### 基础语法

```html
npm update [-g] [<pkg>...]
```



### 检查模块是否已过时

#### 基础语法

```html
npm outdated [[<@scope>/]<pkg>...]
```



### 全局变量配置

```js
window电脑
环境变量的设置 path路径
```





### 查看某条命令的帮助

#### 基础语法

```shell
npm help <term> [<terms..>]
```

例如输入`npm help install`，系统在默认的浏览器或者默认的编辑器中打开本地nodejs安装包的文件/nodejs/node_modules/npm/html/doc/cli/npm-install.html



### 查看包安装路径

输出 node_modules的路径

```shell
npm root [-g]
```

### 查询安装的包

```js
1.查询全局是否安装过某个包
npm list 包名 -g

2.查询全局安装过的包
npm list -g --depth 0
```



## 配置NPM

##### 基础语法

 ```shell
 npm config set <key> <value> [-g|--global] 
 npm config get <key>
 npm config delete <key>
 npm config list
 npm config edit
 npm get <key>
 npm set <key> <value> [-g | --global]
 ```

##### NPM设置代理及修改镜像

首先查看当前配置是否已经存在代理: 

```javascript
npm config ls   //ls <== list的缩写
```

设置网络代理
npm支持http代理,但socks5代理需要转换设置
```bash
npm config set proxy "http://127.0.0.1:7890" //一般从代理软件上获取
npm config set https-proxy "http://127.0.0.1:7890"
```

查看代理
```bash
npm config get proxy
或
npm config list
```

[npm设置socks5代理](https://zhuanlan.zhihu.com/p/337940332)

```bash
# 安装转换工具 设置代理端口为7890
npm i -g http-proxy-to-socks
# 然后使用工具监听8002端口,支持http代理,然后所有8002的http代理都将转换成socks代理发送到7890上
htps -s 127.0.0.1:7890 -p 8002  # 需要一直开着
# 设置npm代理为8002
npm config set proxy http://127.0.0.1:7890
npm config set https-proxy http://127.0.0.1:7890
```



将npm默认下载地址更改成国内淘宝镜像

```bash
npm config set registry https://registry.npmmirror.com
```

再次查看确认是否更改

```bash
npm config ls
```

更新

```bash
npm update
```





#### 管理模块缓存

基础语法

 ```shell
 npm cache add <tarball file>
 npm cache add <folder>
 npm cache add <tarball url>
 npm cache add <name>@<version>
 
 npm cache ls [<path>]
 
 npm cache clean [<path>]
 ```

最常用命令无非清除npm本地缓存

 ```shell
 npm cache clean
 ```



#### 启动模块

##### 基础语法

 ```shell
 npm start [--<args>]
 ```

该命令写在package.json文件scripts的start字段中，可以自定义命令来配置一个服务器环境和安装一系列的必要程序，如

```json
"scripts": {
    "start": "gulp -ws"
}
```

此时在cmd中输入npm start命令相当于执行gulpfile.js文件自定义的watch和server命令。

如果package.json文件没有设置start，则将直接启动node server.js



#### 停止模块

##### 基础语法

```shell
npm stop [-- <args>]
```



#### 重新启动模块

##### 基础语法

 ```shell
 npm restart [--<args>]
 ```



#### 测试模块

##### 基础语法

```
npm test [-- <args>]
npm tst [-- <args>]
```

该命令写在package.json文件scripts的test字段中，可以自定义该命令来执行一些操作，如

```
"scripts": {
    "test": "gulp release"
},
```

此时在cmd中输入npm test命令相当于执行gulpfile.js文件自定义的release命令。






### npx介绍
> https://github.com/LightXJ/blog/issues/28

#### 是什么
npm从5.2版开始，增加了npx命令。它有很多用处，本文介绍该命令主要使用场景。  
Node自带npm模块，npx又是npm的自带模块，所以可以直接使用npx命令。万一不能，可以手动安装为  
`npm install -g npx`

#### 作用
**调用项目安装的模块**
npx想要解决的主要问题，就是调用项目内部安装的模块。比如，项目内部安装了测试工具Mocha  
`npm install -d mocha`  
一般来说，调用Mocha,只能在项目脚本和package.json的scripts字段里面，如果想在命令行下调用，必须像下面

```js
# 项目的根目录下执行
$ node-modules/.bin/mocha --version
```

npx就是想解决这个问题，让项目内部安装的模块用起来更方便，只要像下面这样调用就行了。

```js
npx mocha --version
```

**避免全局安装**
除了调用项目内部模块，npx还能避免全局安装的模块。比如，create-react-app这个模块是全局安装，npx可以运行它，而且不进行全局安装。  
`npx create-react-app my-react-app`  
上面代码运行时，npx将create-react-app下载到一个临时目录，使用以后再删除。所以，以后再次执行上面的命令，会重新下载create-react-app

下载全局模块时，npx允许指定版本  
`npx uglify-js@3.1.0 main.js -o ./dist/main.js`  
上面代码指定使用3.1.0版本的uglify-js压缩脚本  
注意，只要npx后面的模块无法在本地发现，就会下载同名模块。比如，本地没有安装http-server模块，下面的命令会自动下载该模块，在当前目录启动一个web服务。  
`npx http-server`

#### 配置




## package.json

#### 资料

> 英文原版：https://docs.npmjs.com/files/package.json
>
> 国内整理：《[npm的package.json中文文档](https://github.com/ericdum/mujiang.info/issues/6/)》



#### 是什么

大家都知道，**`package.json 用来描述项目及项目所依赖的模块信息。`**，就是帮我们管理项目中的依赖包的，让我们远离了依赖地狱。

package.json是管理其依赖的配置文件, 初始化项目时, 会在目录下生成3个目录/文件:

* node_modules
* package.json
* package.lock.json



#### package-lcok.json

本质上package-lock.json文件是为了锁版本, 在package.json中指定的子npm包比如：react: "^16.0.0"，在实际安装中，只要高于react的版本都满足package.json的要求。这样就使得根据同一个package.json文件，两次安装的子依赖版本不能保证一致。





#### package.json 常用属性

以下指示选取了其中几个比较重要的字段:

**name**

在package.json中最重要的就是name和version字段。他们都是必须的，如果没有就无法install。name和version一起组成的标识在假设中是唯一的。改变包应该同时改变version。

name是这个东西的名字。注意：

- 不要把node或者js放在名字中。因为你写了package.json它就被假定成为了js，不过你可以用"engine"字段指定一个引擎（见后文）。
- 这个名字会作为在URL的一部分、命令行的参数或者文件夹的名字。任何non-url-safe的字符都是不能用的。
- 这个名字可能会作为参数被传入require()，所以它应该比较短，但也要意义清晰。
- 在你爱上你的名字之前，你可能要去npm registry查看一下这个名字是否已经被使用了。http://registry.npmjs.org/

**version**

version必须能被[node-semver](https://github.com/isaacs/node-semver)解析，它被包在npm的依赖中。（要自己用可以执行`npm install semver`）

**scripts**

在npm中使用script标签来定义脚本，每当制定npm run的时候，就会自动创建一个shell脚本，这里需要注意的是，npm run新建的这个 Shell，会将本地目录的node_modules/.bin子目录加入PATH变量。

这意味着，当前目录的node_modules/.bin子目录里面的所有脚本，都可以直接用脚本名调用，而不必加上路径。比如，当前项目的依赖里面有 esbuild，只要直接写esbuild xxx 就可以了。

以下两种写法都是等价的:

```json
{
//...  

"script" : {
  "build": "esbuild index.js"
}

}
```



```json
{
  //...
  "script": {
    "build": "./node_modules/.bin/esbuild index.js"
  }
}
```

<span style="color:blue">注意事项:</span>
如果我在项目下只是安装一个局部包,那么我运行这个包命令的话,会显示npm无法识别这个命令.(待上传一个实例图片...)
原因? [[#布局安装的包的命令无法别识别]]




**bin**

bin属性用来将可执行文件加载到全局环境中，指定了bin字段的npm包，一旦在全局安装，就会被加载到全局环境中，可以通过别名来执行该文件。

比如\@bytepack/cli的npm包：

```json
"bin": {
    "bytepack": "./bin/index.js"
 },
```

一旦在全局安装了@bytepack/cli，就可以直接通过bytepack来执行相应的命令，比如

```bash
bytepack -v
// 显示1.11.0
```

如果非全局安装，那么会自动连接到项目的node_module/.bin目录中。与前面介绍的script标签中所说的一致，可以直接用别名来使用。





**workspaces**  ???

workspaces解决了本地文件系统中如何在一个顶层root package下管理多个子packages的问题，在workspaces声明目录下的package会软链到最上层root package的node_modules中





#### package.json环境相关属性

常见的环境，基本上分为浏览器browser和node环境两大类，接下来我们来看看package.json中，跟环境相关的配置属性。环境的定义可以简单理解如下：

- browser环境：比如存在一些只有在浏览器中才会存在的全局变量等，比如window，Document等
- node环境: npm包的源文件中存在只有在node环境中才会有的一些变量和内置包，内置函数等。



**type**

js的模块化规范包含了commonjs、CMD、UMD、AMD和ES module等, 从node13.2.0开始后，node正式支持了ES module规范，在package.json中可以通过type字段来声明npm包遵循的模块化规范。

package.json

```json
{
   name: "some package",
   type: "module"||"commonjs" 
}
```

- 不指定type的时候，type的默认值是commonjs，不过建议npm包都指定一下type
- 当type字段指定值为module则采用ESModule规范
- 当type字段指定时，目录下的所有.js后缀结尾的文件，都遵循type所指定的模块化规范
- 除了type可以指定模块化规范外，通过文件的后缀来指定文件所遵循的模块化规范，以.mjs结尾的文件就是使用的ESModule规范，以.cjs结尾的遵循的是commonjs规范



**main /  modules  /browser**

- main : 定义了 npm 包的入口文件，browser 环境和 node 环境均可使用
- module : 定义 npm 包的 ESM 规范的入口文件，browser 环境和 node - 环境均可使用
- browser : 定义 npm 包在 browser 环境下的入口文件

我们来看一下这3个字段的使用场景，以及同时存在这3个字段时的优先级。我们假设有一个npm包为demo1,

```bash
----- dist
   |-- index.browser.js
   |-- index.browser.mjs
   |-- index.js
   |-- index.mjs
```



其package.json中同时指定了main,module和browser这3个字段，

```json
  "main": "dist/index.js",  // main 
  "module": "dist/index.mjs", // module

  // browser 可定义成和 main/module 字段一一对应的映射对象，也可以直接定义为字符串
  "browser": {
    "./dist/index.js": "./dist/index.browser.js", // browser+cjs
    "./dist/index.mjs": "./dist/index.browser.mjs"  // browser+mjs
  },

  // "browser": "./dist/index.browser.js" // browser
```

默认构建和使用，比如我们在项目中引用这个npm包：

通过构建工具构建上述代码后，模块的加载循序为：_**browser+mjs > module > browser+cjs > main**_这个加载顺序是大部分构建工具默认的加载顺序，比如webapck、esbuild等等。可以通过相应的配置修改这个加载顺序，不过大部分场景，我们还是会遵循默认的加载顺序。



**exports**

如果在package.json中定义了exports字段，那么这个字段所定义的内容就是该npm包的真实和全部的导出，优先级会高于main和file等字段。

```json
{
  "name": "pkg",
  "exports": {
    ".": "./main.mjs",
    "./foo": "./foo.js"
  }
}
```



```javascript
import { something } from "pkg"; // from "pkg/main.mjs"
```



```javascript
const { something } = require("pkg/foo"); // require("pkg/foo.js")
```

从上述的例子来看，exports可以定义不同path的导出。如果存在exports后，以前正常生效的file目录到处会失效，比如require('pkg/package.json')，因为在exports中没有指定，就会报错。  exports还有一个最大的特点，就是条件引用，比如我们可以根据不同的引用方式或者模块化类型，来指定npm包引用不同的入口文件。

```json
// package.json
{ 
  "name":"pkg",
  "main": "./main-require.cjs",
  "exports": {
    "import": "./main-module.js",
    "require": "./main-require.cjs"
  },
  "type": "module"
}
```

上述的例子中，如果我们通过

```
const p = require('pkg')
```

引用的就是"./main-require.cjs"。如果通过：

```
import p from 'pkg'
```

引用的就是"./main-module.js"最后需要注意的是 ：***如果存在exports属性，exports属性不仅优先级高于main，同时也高于module和browser字段。***





#### package.json依赖相关属性

package.json中跟依赖相关的配置属性包含了dependencies、devDependencies、peerDependencies和peerDependenciesMeta等。

dependencies是项目的依赖，而devDependencies是开发所需要的模块，所以我们可以在开发过程中需要的安装上去，来提高我们的开发效率。这里需要注意的时，在自己的项目中尽量的规范使用，形如webpack、babel等是开发依赖，而不是项目本身的依赖，不要放在dependencies中。



**dependencies**

依赖是给一组包名指定版本范围的一个hash。这个版本范围是一个由一个或多个空格分隔的字符串。依赖还可以用tarball或者git URL。

请不要将测试或过渡性的依赖放在`dependencies`hash中

**devDependencies**

如果有人要使用你的模块，那么他们可能不需要你开发使用的外部测试或者文档框架。

在这种情况下，最好将这些附属的项目列在`devDependencies`中。

这些东西会在执行`npm link`或者`npm install`的时候初始化，并可以像其他npm配置参数一样管理。



**peerDependencies**

peerDependencies是package.json中的依赖项,可以解决核心库被下载多次，以及统一核心库版本的问题。

```json
//package/pkg
----- node_modules
   |-- npm-a -> 依赖了react,react-dom
   |-- npm-b -> 依赖了react,react-dom
   |-- index.js
```

比如上述的例子中如果子npm包a,b都以来了react和react-dom,此时如果我们在子npm包a,b的package.json中声明了PeerDependicies后，相应的依赖就不会重新安装。需要注意的有两点：









**peerDependenciesMeta**

看到“Meta”就有元数据的意思，这里的peerDependenciesMeta就是详细修饰了peerDependicies，比如在react-redux这个npm包中的package.json中有这么一段：

```json
 "peerDependencies": {
    "react": "^16.8.3 || ^17 || ^18"
  },
 "peerDependenciesMeta": {
    "react-dom": {
      "optional": true
    },
    "react-native": {
      "optional": true
    }
  }
```

这里指定了"react-dom","react-native"在peerDependenciesMeta中，且为可选项，因此如果项目中检测没有安装"react-dom"和"react-native"都不会报错。

值得注意的是，通过peerDependenciesMeta我们确实是取消了限制，但是这里经常存在非A即B的场景，比如上述例子中，我们需要的是“react-dom”和"react-native"需要安装一个，但是实际上通过上述的声明，我们实现不了这种提示。







#### 版本号

> 公众号: 程序员成长指北

版本号由三部分组成：`major.minor.patch`，主版本号.次版本号.修补版本号。

例如：1.2.3，主要版本1，次要版本2，补丁3。

- `补丁`中的更改表示不会破坏任何内容的错误修复。
- `次要版本`的更改表示不会破坏任何内容的新功能。
- `主要版本`的更改代表了一个破坏兼容性的大变化。如果用户不适应主要版本更改，则内容将无法正常工作。

#### 安装依赖包的版本如何指定

`~` 会匹配最近的小版本依赖包，比如 ~1.2.3 会匹配所有 1.2.x 版本，但是不包括 1.3.0

`^` 会匹配最新的大版本依赖包，比如 ^1.2.3 会匹配所有 1.x.x 的包，包括 1.3.0，但是不包括 2.0.0

`*` 安装最新版本的依赖包，比如 *1.2.3 会匹配 x.x.x，



你可以`指定特定的版本号`，直接写1.2.3，前面**什么前缀都没有**，这样固然没问题，但是如果依赖包发布新版本修复了一些小bug，那么需要手动修改package.json文件；`~` 和 `^` 则可以解决这个问题。

但是需要注意 ^ 版本更新可能比较大，会造成项目代码错误， **建议使用 `~` 来标记版本号**，这样可以保证项目不会出现大的问题，也能保证包中的小bug可以得到修复。

版本号写 *，这意味着安装最新版本的依赖包，但缺点同上，可能会造成版本不兼容，**慎用！**



#### 多人开发时依赖包安装的问题

场景介绍:

假设我们中安装了 `vue`, 当我们运行安装 `npm install vue -save` 的时候，在项目中的package.json 的 vue 版本是  `vue: ^3.0.0`,，vue 发布了新版本 3.0.1，这时新来一个同事，从新 `git clone` 克隆项目，执行 `npm install`安装的时候，在他电脑的vue版本就是 3.0.1了，因为^只是锁了主要版本，这样我们电脑中的vue版本就会不一样.

**从理论上讲（大家都遵循语义版本控制的话）**，它们应该仍然是兼容的，但也许 bugfix 会影响我们正在使用的功能，而且当使用vue版本3.0.0和3.0.1运行时，我们的应用程序会产生不同的结果。



解决方法:

为了解决这个不同人电脑安装的所有依赖版本都是一致的，确保项目代码在安装所执行的运行结果都一样，这时 `package-lock.json` 就应运而生了。





## package-lock.json

#### 介绍

`package-lock.json` 它会**在 npm 更改 node_modules 目录树 或者 package.json 时自动生成的** ，它准确的描述了当前项目npm包的依赖树，并且在随后的安装中会根据 package-lock.json 来安装，保证是相同的一个依赖树，不考虑这个过程中是否有某个依赖有小版本的更新。

它的产生就是来对整个依赖树进行版本固定的（锁死）。



当我们在一个项目中`npm install`时候，会自动生成一个`package-lock.json`文件，和`package.json`在同一级目录下。`package-lock.json`记录了项目的一些信息和所依赖的模块。

当我们下次再`npm install`时候，npm 发现如果项目中有 `package-lock.json` 文件，会根据 `package-lock.json` 里的内容来处理和安装依赖而不再根据 `package.json`。



注意:

> 注意，使用`cnpm install`时候，并不会生成 `package-lock.json` 文件，也不会根据 `package-lock.json` 来安装依赖包，还是会使用 `package.json` 来安装。



#### 生成逻辑

假设我们现在有三个 package，在项目 lock-test中，安装依赖A，A项目面有B，B项目面有C

```json
// package lock-test
{ "name": "lock-test", "dependencies": { "A": "^1.0.0" }}
// package A
{ "name": "A", "version": "1.0.0", "dependencies": { "B": "^1.0.0" }}
// package B
{ "name": "B", "version": "1.0.0", "dependencies": { "C": "^1.0.0" }}
// package C
{ "name": "C", "version": "1.0.0" }
```

在这种情况下 `package-lock.json`, 会生成类似下面铺平的结构

```json
// package-lock.json
{ 
    "name": "lock-test",  
    "version": "1.0.0",  
    "dependencies": {    
        "A": { "version": "1.0.0" },
        "B": { "version": "1.0.0" },
        "C": { "version": "1.0.0" }  
    }
}
```

如果后续无论是直接依赖的 A 发版，或者间接依赖的B, C 发版，只要我们不动 `package.json`, `package-lock.json` 都不会重新生成。

A 发布了新版本 1.1.0，虽然我们 package.json 写的是 ^1.0.0 但是因为 `package-lock.json` 的存在，npm i 并不会自动升级，

我们可以手动运行 npm i A@1.1.0 来实现升级。

因为 1.1.0 `package-lock.json` 里记录的 A@1.0.0 是不一致的，因此会更新 `package-lock.json` 里的 A 的版本为 1.1.0。

B 发布了新版本 1.0.1, 1.0.2, 1.1.0, 此刻如果我们不做操作是不会自动升级 B 的版本的，但如果此刻 A 发布了 1.1.1，虽然并没有升级 B 的依赖，但是如果我们项目里升级 A@1.1.1，此时 `package-lock.json` 里会把 B 直接升到 1.1.0 ,因为此刻^1.0.0的最新版本就是 1.1.0。

经过这些操作后 项目 lock-test 的 package.json 变成

```json
// package 
lock-test{ "dependencies": { "A": "^1.1.0" }}
```

对应的 `package-lock.json` 文件

```json
{  
    "name": "lock-test",  
    "version": "1.0.0",
    "dependencies": {  
        "A": { "version": "1.1.0" },
        "B": { "version": "1.1.0" },
        "C": { "version": "1.0.0" }
    }
}
```

这个时候我们将 B 加入我们 lock-test 项目的依赖, B@^1.0.0，package.json如下

```json
{ "dependencies": { "A": "^1.1.0", "B": "^1.0.0" }}
```

我们执行这个操作后，`package-lock.json` 并没有被改变，因为现在 `package-lock.json` 里 B@1.1.0 满足 ^1.0.0 的要求

但是如果我们将 B 的版本固定到 2.x 版本, `package-lock.json` 就会发生改变

```json
{ "dependencies": { "A": "^1.1.0", "B": "^2.0.0" }}
```

因为存在了两个冲突的B版本，`package-lock.json` 文件会变成如下形式

```json
{  
    "name": "lock-test",
    "version": "1.0.0",  
    "dependencies": {    
        "A": {      
            "version": "1.1.0",      
            "dependencies": {        
                "B": { "version": "1.1.0" }      
            }    
        },    
        "B": { "version": "2.0.0" },    
        "C": { "version": "1.0.0" }  
    }
}
```

因为 B 的版本出现了冲突，npm 使用嵌套描述了这种行为

我们实际开发中并不需要关注这种生成的算法逻辑，我们只需要了解，`package-lock.json` 的生成逻辑是为了能够精准的反映出我们 node_modules 的结构，并保证能够这种结构被还原。



#### package-lock.json意外更改的原因

1. package.json 文件修改了
2. 挪动了包的位置

将部分包的位置从 dependencies 移动到 devDependencies 这种操作，虽然包未变，但是也会影响 `package-lock.json`，会将部分包的 dev 字段设置为 true

3. registry 的影响

经过实际使用发现，如果我们 node_modules 文件夹下的包中下载时，就算版本一样，安装源 `registry` 不同，执行 npm i 时也会修改 package-lock.json



可能还存在其他的原因，但是 `package-lock.json` 是不会无缘无故被更改的，一定是因为 **package.json 或者 node_modules 被更改了**，因为 正如上面提到的 package-lock.json 为了能够精准的反映出我们 node_modules 的结构



#### 开发建议

一般情况下 `npm install` 是可以的，他能保证根据 `package-lock.json` 还原出开发时的 `node_modules`。

但是为了防止出现刚刚提到的意外情况，除非涉及到对包的调整，其他情况下建议使用 `npm ci `来安装依赖，会避免异常的修改 `package-lock.json`，

持续集成工具中更推荐是用 `npm ci`，保证`构建环境的准确性`，**npm i 和 npm ci 的区别** 可以参考官方文档 npm-ci









### 使用流程

```js
- 在页面中直接调用地址
1.下载到本地
2.页面中使用链接引入

- node环境下如何使用

//引入lodash包
const _=require('lodash');
console.log(_.random(1, 100));
//node调用js文件


- 其他:
包是存在依赖的,下载一个包,可能在下载了多个包
```



#### 团队开发使用流程

```js
# node_modules文件夹是不进入git仓库的,需要在.gitignore中忽略.
# 远端仓库 强推会覆盖远端仓库内容, 语法: git push -u origin master -f

1. 从仓库中拉取仓库代码 //git clone 远端地址
2. 运行 npm install 安装相关依赖 //npm i
3. 运行项目，继续开发


```







```js
npm -version/-v
npm init/i 初始化
npm i --yes 简洁写法 全部采用默认值,但上级路径中不能存在中文
npm search/s name 搜索包
npm install/i name 安装包

//安装到依赖中  包名会被注册在package.json中的dependencies里面,在生产环境下这个包的依赖依然存在.
//安装包并添加到生产中(devdependencies)  6版本可省略,自动添加到依赖中
npm i name --save-dev
npm i name -D

//安装包并添加到开发中(dependencies)
//
npm i name --save
npm i name -S


npm i name -g 全局安装

npm i/install  安装全部依赖
npm i --production 只安装dependencies中的依赖

npm remove/r name1 name2 移除包,可以添加多个包的名字
```



### 封装 NPM 包

创建自己的 NPM 包可以帮助代码进行迭代进化，使用步骤也比较简单

0. 修改为官方的地址 (npm config set registry https://registry.npmjs.org/) 使用非官方地址时才要(淘宝镜像才使用此步)

1. 创建文件夹，并创建文件 **index.js**， 在文件中声明函数，使用 module.exports 暴露
2. 文件夹下 npm 初始化工具包(npm init)，package.json 填写包的信息
3. 账号注册（激活账号）,==完成邮箱验证==
4. 文件夹下,命令行下 『npm login』 填写相关用户信息
5. 文件夹下, 命令行下『 npm publish』 提交包 👌

> npm 有垃圾检测机制，如果名字简单或做测试提交，很可能会被拒绝提交
>
> ==可以尝试改一下包的名称来解决这个问题==



### 升级npm包

升级 NPM 包，需要修改 package.json 中的版本号修改，只需要执行『npm publish』就可以能提交

1. 修改包代码
2. 修改 package.json 中版本号
3. npm publish 提交

### 删除 npm 包

```
npm unpublish 包名 --force
```








## 常见问题

### 初始化项目,node-sass下载失败

> [node-sass安装失败解决方法汇总 · Issue #311 · iuap-design/blog (github.com)](https://github.com/iuap-design/blog/issues/311)

报错信息
```bash
Downloading binary from https://github.com/sass/node-sass/releases/download/v4.11.0/win32-x64-72_binding.node
Cannot download "https://github.com/sass/node-sass/releases/download/v4.11.0/win32-x64-72_binding.node":

HTTP error 404 Not Found

Hint: If github.com is not accessible in your location
      try setting a proxy via HTTP_PROXY, e.g.

      export HTTP_PROXY=http://example.com:1234

or configure npm proxy via

      npm config set proxy http://example.com:8080
```

根据报错提示,可以通过添加代理的方式来解决问题.但是添加代理后依然会报错. 因为请求的地址返回的404, 这个页面是个空页面.

稳重提到了3种解决方案,我们这里只采用第三种更改特定模块淘宝镜像的方法:

```bash
npm set sass_binary_site=https://npm.taobao.org/mirrors/node-sass/

//or

npm i cnpm -g --registry=https://registry.npmmirror.com
cnpm i node-sass
```



### npm不是内部或外部命令
> 使用npm报错:npm不是内部或外部命令,也不是可运行的程序
> is not recognized as an internal or external command

> [关于局部安装npm模块找不到命令的问题分析及解决方案_神一样的男人000的博客-CSDN博客_npm run build:stage 未找到命令](https://blog.csdn.net/qq_21998595/article/details/80460673)

我们安装完包后执行的命令, 其位置是在node_modules中的`.bin`文件夹中, 如果是全局安装的话, 其文件夹中的各个命令执行文件可以被识别, 但局部安装的就无法别识别.

所以解决方法:(推荐第三种)

1.在系统环境变量Path中添加局部`node_modules/.bin`的路径  或 使用`npx npm ...`命令. 此命令会在执行时将其添加到环境变量中

2.在当前目录环境下使用命令 `C:\...\node_modules\.bin\脚本名称 目标文件`这种形式

3.在package.json中配置scripts项, 相当于将命令行语句保存下来，之后只要运行简单的命令类似：npm run build，就可以实现了。

```js
{
  "scripts": {
    "js": "josn-server --watch db.json"
    //"js": "json-server --watch" 可以灵活指定文件
  },
  "dependencies": {
    "json-server": "^0.17.1"
  }
}
```



### 3000端口被占用,拒绝访问(todo)

> [http - Node.js EACCES error when listening on most ports - Stack Overflow](https://stackoverflow.com/questions/9164915/node-js-eacces-error-when-listening-on-most-ports)

```sh
net stop winnat


net start winnat
```



### 升级指定子依赖的版本号
固定版本 固定npm依赖版本
> https://www.cnblogs.com/hanshuai/p/16880792.html
> https://juejin.cn/post/7163150684747989005
> https://juejin.cn/post/7205181884590276669
> https://juejin.cn/post/7302439422671208483


### CNPM

#### 介绍

cnpm 是淘宝对国外 npm 服务器的一个完整镜像版本，也就是淘宝 npm 镜像，网站地址:

* 旧地址 http://npm.taobao.org/  (2022.05.31到期)
* 新地址 https://npmmirror.com

#### 安装

安装配置方式有两种

* npm install -g cnpm --registry=https://registry.npmmirror.com
* alias cnpm="npm --registry=https://registry.npmmirror.com \
  --cache=$HOME/.npm/.cache/cnpm \
  --disturl=https://registry.npmmirror.com/dist \
  --userconfig=$HOME/.cnpmrc"       (只能在Linux下使用)

#### 使用

配置完成后，就可以使用 cnpm 命令来管理包，使用方法跟 npm 一样

```sh
cnpm install lodash
```

#### npm 配置淘宝镜像地址

```sh
//查看配置的镜像
npm get registry

//淘宝镜像
npm config set registry https://registry.npmmirror.com
//官方镜像   
npm config set registry https://registry.npmjs.org/

```

> 在发布工具的时候, 一定要将仓库地址, 修改为官方的地址

### Yarn

#### 介绍

yarn 是 Facebook 开源的新的包管理器，可以用来代替 npm。

#### 特点

yarn 相比于 npm 有几个特点

* 本地缓存。安装过的包下次不会进行远程安装
* 并行下载。一次下载多个包，而 npm 是串行下载
* 精准的版本控制。保证每次安装跟上次都是一样的

#### 安装

##### yarn 安装: 命令行+安装包

只需要一行命令即可安装 yarn, 缺点:yarn全局命令不生效 解决:添加path变量

```sh
npm install yarn -g
```

##### msi 安装包安装

<https://classic.yarnpkg.com/en/docs/install#windows-stable>

#### 相关命令

yarn 的相关命令

1)  yarn --version //yarn -v

2)  yarn init  //生成package.json   

3)  yarn global add  packageName (全局安装)

​	全局安装路径 `C:\Users\你的用户名\AppData\Local\Yarn\bin`

4)  yarn global remove less (全局删除)

5)  yarn add packageName (局部安装)  //安装在当前文件夹下的node_modules文件夹

6)  yarn add package --dev (开发依赖 相当于npm中的--save-dev)

7)  yarn (global) remove package  移除命令

8)  yarn list //列出已经安装的包名 用的很少

9)  yarn info packageName //获取包的有关信息  几乎不用

10)  yarn //安装package.json中的所有依赖  和npm i的作用一样



> npm 5 引入离线缓存，提高了安装速度，也引入了 package-lock.json 文件增强了版本控制

yarn 修改仓库地址

```sh
yarn config set registry https://registry.npm.taobao.org
```

### CYarn

跟 npm 与 cnpm 的关系一样，可以为 yarn 设置国内的淘宝镜像，提升安装的速度. 基本上用不着

```sh
npm install cyarn -g --registry "https://registry.npm.taobao.org"
```

配置后，只需将yarn改为cyarn使用即可

### bower

```js
下载后,使用link标签引用
```



### 局部装和全局安装

```js
- 局部安装较多
- 全局安装(特定的)有: cnpm nodemon 
```







### 附录

### 关于版本号

版本格式：主版本号.次版本号.修订号

* "^3.0.0" ：锁定主版本，以后安装包的时候，保证包是3.x.x版本，x默认取最新的。
* "~3.2.x" ：锁定小版本，以后安装包的时候，保证包是3.1.x版本，x默认取最新的。
* "3.1.1" ：锁定完整版本，以后安装包的时候，保证包必须是3.1.1版本。

安装指定版本的工具包

```shell
yarn add jquery@1.11.2
```

#### npm 清除缓存

```
npm cache clean
```







### 模块化

#### 组件化好处

```
1.复用性
2.维护性
```



### 介绍

模块化指的就是将一个大的功能拆分为一个一个小的模块，通过不同的模块的组合来实现一个大功能。

- 在node中一个 js 文件就是一个模块
- 模块内部代码对于外部来说都是不可见的，可以通过两种方式向外部暴露

### 模块创建

```js
在模块JS文件中使用module_exports暴露需要引入的对象
```



在文件中对外暴露的两种方法: **module_exports=模块  exports.模块**

```js
function test(){
    return 11;
}

//exports=module.exports={
//一个对象
module.exports = test;
}

//多个对象 ES6对象语法=
module.exoprts={
    test,
    test2
}
=========第二种==============
exports.test=test;
exports.test2=test2;
```

这里有几点注意：

* module.exports 可以暴露任意数据
* 可以使用 module.exports 暴露多个数据
* exports 也可以暴露数据，不过不能使用 `exports = xxx` 的形式
* require返回的是目标模块module.exports的值





### 模块引入

使用 require 引入文件即可

```js
var test = require('./test.js');  
//路径问题: 引入文件时, 无需使用绝对路径.写相对路径就可以,即使更改位置,也不会产生影响.
//require 返回的是目标模块 module.exports 的值
原始多个类型
```

这里有几点注意：

* 如果没有加文件后缀，会按照以下后缀的**顺序**来加载文件
  * .js    fs模块同步读取文件编译执行
  * .json  fs模块同步读取文件，用JSON.parse()解析返回结果. 必须使用双引号,最后一个不写逗号
  * .node 这是c/c++编写的扩展文件，通过dlopen()方法编译
* 其他扩展名  会以.js文件载入
* 如果是文件夹则会默认加载该文件夹下 package.json 文件中 main 属性对应的文件   npm init --yes
* 如果 main 属性对应的文件不存在，则自动找 index.js  index.json 
* 如果是内置模块或者是 npm 安装的模块，直接使用包名字即可 //例如http, fs
* npm 引入包时，如果当前文件夹下的 node_modules 没有，则会自动向上查找

### 简化

引入

```js
下载到本地的包 了解

const _ = require('./node_modules/lodash/lodash.js');
const _ = require('./node_modules/lodash/');
```



导出

```
module.exports       
```

导入

```
var res = require('./module.js');
var name=require('name');
```



