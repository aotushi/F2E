## 仿掘金网站

### 概述

> 使用Vue3+TS+serverless来模仿掘金网站

### 1.需求确认

需要开发有如下页面:

* 首页
* 文章页
* 沸点页
* 个人主页
* 消息页



a

### 2.开发接口

#### 概述

> 确定需求之后,就需要开发接口.
>
> 使用阿里云云函数+nodejs进行接口开发,不需要熟悉后端.



#### 注册阿里云云函数

开通服务. 首次开通有3个月的优惠.

![image-20241209112205163](assets/image-20241209112205163.png)



#### 创建测试服务

> 使用的是旧版'函数2.0'

1. 点击左侧菜单'服务及函数'
2. 点击<button>创建服务</button>按钮,在对话框中填写:'服务名称','服务描述','日志功能'(禁用),点击'确定'
3. 点击<button>创建函数</button>,选择'使用自定义运行时创建',然后在表单中填写:
   1. 函数名称
   2. 请求处理程序类型: '处理HTTP请求'
   3. 运行环境: 'Node.js 16'
   4. 代码上传方式: '使用示例代码'
   5. 启动命令: 'npm run start'
   6. 监听端口: '9000'
4. 配置完成以后,点击'创建'按钮

5.编写编辑器中的内容

```js
const express = require('express')
const app = express()
const port = 9000

app.get('/*', (req, res) => {
  res.send({
    code: 202,
    message: '[GET]欢迎使用云函数'
  })
})

app.listene(port, () => {
  console.log(`函数启动并监听${port}`端口)
})
```

6.测试: 

6.1

6.2点击触发管理器,获取访问url,在postman中访问这个地址,获取到返参信息

注意: 需要编辑触发管理器,将'认证方式'更改为'无需认证'



### 3.Express使用介绍

#### 1.运行

#### 2.pm2监控

#### 3.使用路由创建API接口

如何创建?

```js
app.METHOD(PATH, HANDLER)
```

* METHOD: 路由方法
* PATH: 路由地址
* HANDLER: 路由处理函数

Express支持的5种路由方法:

* app.get()
* app.post()
* app.delete()
* app.put()
* app.all() 匹配有所请求



##### 1.请求对象

##### 2.响应对象

##### 3.分组路由

#### 4.中间件

**概述**

* 中间件是一个函数,有3个参数: req, res,next. next()方法的作用是进入下一个中间件.

* 使用app.use(Fn)来挂载到应用上才能使用

* app.use用法:第一个入参是路径, 第二个入参是中间件 `app.use('/test/*', myLogger)`

  

#### 5.统一错误处理

> 错误处理也是一个中间件.

```js
app.use((err, req, res, next) => {
  console.log(err.stack)
  res.status(500).send('服务器出错了')
})
```



注意:

* 错误处理中间件是一个'兜底'中间件,所以需要放在所有中间件的最后.
* 需要在错误中间件之前,声明一个404中间件.这俩中间件提高了健壮性.

### 4.数据库MongoDB

#### MongoDB介绍

> 文档型数据库.有3个基本概念:
>
> * 数据库(Database): 一个存储集合的仓库. MongoDB允许创建多个数据库,数据库之间互相隔离.
> * 集合(Collection): 一个数据库可以有多个集合,可将其看作数组,存储一类数据.
> * 文档(Document): 一个集合可以存储多个文档,可将其看作对象



#### MongoDB安装(8.0版本)

> https://blog.csdn.net/weixin_68256171/article/details/132337173



##### 测试

在cmd中,输入`mongsh`,即可成功运行mongodb

##### 创建目标数据库

使用use命令进入或创建还不存在的数据库

```bash
use juejin_blogs
```

创建用户名和密码

```bash
db.createUser({
	user: 'abc',
	pwd: 'abcpwd',
	roles: [
		{role:'readWrite', db:'juejin_blogs'}
	]
})
```

验证用户创建

```bash
show users
```



其他命令

```bash
//查看所有数据库
show dbs
//查看当前所在的数据库
db
//更改默认端口
在mongod.cfg中更改port的值即可
```







#### MongoDB增删改查操作







#### 使用mongoose操作数据库

**文档**

> https://mongoosejs.com/docs/



**安装依赖**

```bash
npm i mongoose -S
```

**配置文件**

```bash
//config/mongo.js

const mongoose = require('mongoose')
const connect = (req, res, next) => {
	mongoose
		.connect('mongodb://127.0.0.1:27017/juejin_blog', {
			user: 'abc',
      pass: 'abcpwd',
		})
		.then(() => {
      console.log('数据库连接成功')
      next()
    })
    .catch((err) => {
      console.log('数据库连接失败', err)
      res.status(500).send('数据库连接失败')
    })
}
```



**规范文档结构**

mongoose提供了Schema的概念,其作用是提前设定某个集合中文档的格式(有哪些字段及字段的约束).

例如





**操作文档**





### 5.后端API接口开发与部署

#### 概述

安装需求,将API开发任务分为5个部分:

* 用户管理接口
* 文章管理接口
* 沸点管理接口
* 消息与关注接口
* 项目完善和部署

#### 用户管理接口

```js
//用户注册
/create

//用户登录
/login

//用户信息修改
/update/:id

```



更新掘力值/阅读量/点赞量,不通过用户修改更新这个接口,而是通过文章操作接口完成后更新即可.



#### 文章管理接口

##### 1.分析文章功能,涉及文章需要的字段

| 字段       | 说明       | 必填 |
| ---------- | ---------- | ---- |
| title      | 标题       | √    |
| intro      | 简介       | √    |
| created_by | 作者       | 必填 |
| content    | 内容       | 必填 |
| status     | 文章状态() |      |
| tags       | 文章标签   |      |
| page_view  | 文章浏览量 |      |
| category   | 文章分类   |      |
| created_at | 创建时间   |      |
| updated_at | 更新时间   |      |
|            |            |      |



##### 2.1创建文章接口

```js
router.post('/create')
```



##### 2.2发布文章接口

```js

router.post('/publish/:id')
```



##### 3.修改与删除文章接口

```js

router.put('/put/:id')

router.delete('/remove/:id')
```



##### 4.文章点赞和收藏接口

文章的点赞和收藏存储的字段几乎一致, 同时消息中心有一个'赞和收藏'的消息列表,沸点中有点赞. 

所以集中在一起.



1.点赞和收藏需要的字段

| 字段        | 说明                  |
| ----------- | --------------------- |
| target_id   | 文章或沸点的id        |
| type        | 类型 1点赞 2收藏      |
| target_type | 目标类型: 1文章 2沸点 |
| created_by  | 点赞或收藏的创建者ID  |
| created_at  | 创建时间              |

2.创建点赞和收藏的Model模型

```js
```



3.创建点赞和收藏的路由

```js

router.post('/toggle', async (req, res, next) => {
  
})
```



##### 5.文章评论接口

文章评论与沸点评论通用,涉及一个单独的集合来存储文章和沸点的评论数据.

评论分为3类: 文章的评论, 评论的评论, 评论的评论的回复

1.设计字段. 它这里写的乱七八糟的.对应不起来

| 字段        | 说明                                          |
| ----------- | --------------------------------------------- |
| source_type | 1文章 2沸点                                   |
| type        | 评论类型: source-内容 comment-评论 reply-回复 |
| source_id   | 文章或沸点的id                                |
|             |                                               |
|             |                                               |
| content     | 评论内容                                      |
| created_by  | 评论创建者                                    |
|             |                                               |
| parent_id   | 父级评论的id                                  |
| target_user | 评论对象创建者的id (评论的评论 ??)            |
| reply_id    | 回复某个评论的id                              |
|             |                                               |
| created_at  | 创建时间                                      |

2.创建评论的接口

```js

router.post('/create', async(req, res, next) => {
  
})
```



3.评论列表接口

```js
let commentsModel = require('../module/comments.js')


router.get('/list/:source_id', async(req, res, next) => {
  let {source_id} = req.params
  try {
    let list = await commentsModel.aggregate([
      {$match: {source_id: ObjectId(source_id)}},
      {$lookup: {
        from: 'users',
        localField: 'created_by',
        foreignField: '_id',
        as: 'created_by'
      }}
    ])
    
    res.send(list)
  } catch(err) {
    next(err)
  }
})
```



##### 6.文章列表接口

文章数据包括: 

```js

router.get('/list', async(req, res, next) => {
  let {user_id} = req.query
  try {
    let result = await articlesModel.aggregate([
      //关联查询评论集合
      {
        $lookup: {
          from: 'comments',
          localFields: '_id',
          foreignField: 'source_id',
          as: 'comments'
        }
      },
      //关联评论集合
      {
        $lookup: {
          from: 'praises',
          localField: '_id',
          foreignField: 'target_id',
          as:"praises"
        }
      }
    ])
    
    res.send(result)
  } catch(err) {
    next(err)
  }
})
```



#### 3项目完善和部署

#### 1.通用配置

包含: JWT登录验证; 分页查询列表;

##### 登录验证

登录验证通常的解决方案是JWT,就是将用户信息加密后生成token令牌,请求接口时在请求头中配置携带. 需要使用第三方的express-jwt来实现该逻辑.

安装

```bash
npm i express-jwt
```



创建utils/jtw.js

编写生成token和验证token的两个方法并导出

```js
const {exporessjwt: exjwt} = require('wxperss-jwt')

let jwt = require('jsonwebtoken')

//密钥
const SECRET_KEY = 'alifn_jueblog_jwt_8756'
//生成JWT
function geneJWT(data) {
  let token = jwt.sign(data, SECRET_KEY, {expiresIn: '7d'})
  return token
}

//验证jwt
function verfiyJWT() {
  return exjwt({
    secret: SECRET_KEY,
    algorithms: ['HS256'],
    requestProperty: 'auth'
  })
}

module.exports = {
  genoJWT, verifyJWT
}
```





#### 2.统一使用分页查询列表





#### 3.统一处理路由异常

1.路由中的错误处理, 使用next(err)

2.在路由错误中间件中统一处理错误

```js
//index.js

app.use((err, req, res, next) => {
  let err400 = ['ValidationError', 'CastError']
  let code = err400.includes(err.name) ? 400 : err.status || 500
  res.status(code).send({
    name: err.name,
    message: err.message
  })
})
```







### 将代码发布到云函数

