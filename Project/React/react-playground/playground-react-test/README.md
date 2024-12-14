## playground项目



### 背景知识

##### 1.需要使用插件babel将tsx编译为js



##### 2.编译后的js内容不能运行,因import无法使用,所以将import的url改为blob url



##### 3.如何将blob url替换babel编译的源tsx内容

使用babel插件.

babel 编译流程分为 parse、transform、generate 三个阶段。

babel 插件就是在 transform 的阶段增删改 AST的.所以, 

```tsx
import {transform} from '@babel/standalone'
import {PluginObj} from '@babel/core'

//将tsx代码转换成blob url
const url = URL.createObjectURL(new BLOB(
	[code1],
  {
    type: 'application/javascript'
  }
))

//将babel的source.value替换为blob url
const transformImportSourcePlugin: PluginObj = {
  visitor: {
    ImportDeclaration(path) {
      path.node.source.value = url
    }
  }
}

//触发编译操作后, 将转换后的内容添加到babel配置中
function onclick() {
  const res = transform(
  	code,
    {
      presets: ['react', 'typescript'],
      filename: 'test.ts',
      plugins: [transformImportSourcePlugin]
    }
  )
  
  console.log(res.code)
}
```



