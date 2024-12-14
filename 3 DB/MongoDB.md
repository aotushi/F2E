## MongoDB介绍

### 类比SQL模型

![epub_38209697_7](assets/epub_38209697_7.jpg)

说明:

* 数据库(database): 一个数据库包含多个不同名称的集合
* 集合: 相当于SQL中的表, 一个集合可以存放多个不同的文档
* 文档: 相当于数据表中的一行, 由多个不同字段组成
* 字段: 文档中的一个属性, 等同于列
* 索引: 独立的检索式数据结构,与sql概念一致
* _id: 每个文档中都拥有一个唯一的`_id`字段
* 视图: 可以看作虚拟集合, 与sql中的视图类似.
* 聚合操作($lookup): MongoDB用于实现'类似'表连接的聚合操作符.



### 类SQL语句

#### 创建表

```js
use people
db.people.insertOne({
  user_id:'abc',
  age: 55,
  status: 'a'
})
```



#### 创建索引

> **`user_id: 1`**: 表示对 `user_id` 字段创建升序索引（1 表示升序）。
>
> **`age: -1`**: 表示对 `age` 字段创建降序索引（-1 表示降序）。

```js
db.people.createIndex(
	{user_id:1, age: -1}
)
```



使用索引

```js
db.people.find(
	{user_id: someValue}
).sort({age: -1})
```



#### 插入数据

```js
db.people.insertOne(
	{user_id: 'bcd', age: 56, status: 'b'}
)
```



#### 查询全表

```js
db.people.find()
```



#### 条件查询 ?

```js
db.people.find(
	{status: 'b'}, //查询条件
  {user_id:1, status:1, _id:0} //指定返回的字段: 
)
```



#### 分页查询

```js
db.people.find().limit(5).skip(10)
```



#### 更新数据

```js
db.people.updateMany(
	{age: {$gt: 25}},
  {$set: {status: 'caa'}}
)
```



#### 删除数据

```js
db.people.deleteMany(
	status: 'd'
)
```



### 安装

#### window环境下安装

#### 1.安装

> MongoDB进阶与实战2.1.2

安装完成以后(服务已经启动了), 将bin路径添加到环境变量path中,然后在命令行中连接数据库.

6版本之前使用mongshell连接, 之后需要单独安装这个软件.

在命令行中输入`mongsh`, 进入`>test`集合, 连接成功.

在安装目录下bin文件夹中的mongod.cfg文件中, 有默认选项:主机,端口

#### 2.初始化用户

创建对应的数据库、用户，并设置自己的密码，在接入MongoDB的shell窗口中执行以下命令：

```bash
db=db.getSiblingDB('adming')
db.createUser({
	user:'admin',
	pwd:'admin@5',
	roles: [
		{role:'readWrite', db:'juejin_blogs'},
		{role:'clusterAdmin', db: 'admin'},
		{role:'dbAdminAnyDatebase', db:'admin'},
		{role:'userAdminAnyDatebase',db:'admin'},
		{role:'readWriteAnyDatabase',db:'admin'}
	]
})

db=db.getSiblingDB('appdb')
db.createUser({
	user:'appuser',
	pwd:'appuser@5',
	roles:[
		{role:'dbOwner',db:'appdb'}
	]
})
```



#### mongo shell常用命令

| 命令             | 说明                         |
| ---------------- | ---------------------------- |
| show databases   | 显示数据库列表               |
| use              | 切换数据库(没有就创建再切换) |
| show collections | 显示当前数据库的集合列表     |
| show users       | 显示当前数据库用户列表       |
| show roles       | 显示当前数据库的角色列表     |
| load             | 执行一个JS文件               |
| quit             | 退出当前shell                |
| help             |                              |



### 使用

#### 1插入文档

使用use命令切换到要添加文档的数据库,向当前库的目标集合中执行一个insert操作

```js
use test
test.book.insertOne(
	{
    title: 'my first book',
    publishDate: new Date(),
    tags: ['nosql', 'mongodb'],
    type: 'technology',
    favCount: 25,
    author: 'zale'
  }
)

db.book.find()
```

插入N条数据:

MongoDB为每个文档自动创建的id字段，默认使用的是ObjectId类型。

```js
let books = []
//处理

db.book.insertMany(books)
```





#### 2查询文档

##### 查询全部数据

```js
db.book.find()
```

在终端工具中,如果返回数量多,mongo shell会自动分批显示,默认每次展示20条, 输入it命令读取下一批.

##### 指定条件查询

```js
//查询分类未novel的book文档
db.book.find({type:'novel'})
//按照id查询单个book文档
db.book.find({_id: ObjectId('5d944a4b34f16ef5599f4d3c')})
//查询分类为'literature',收藏数超过10个book文档
db.book.find({type:'literature', favCount: {$gt:10}})
```



##### 排序, 分页

如果不指定排序条件，MongoDB则会默认按物理顺序返回.

```js
// 按出版时间,降序返回
db.book.find(
	{	type:'novel'}
).sort({publishedDate: -1})
```

skip用于指定跳过记录数，limit则用于限定返回结果数量。可以在执行find命令的同时指定skip、limit参数，以此实现分页的功能。

```js
//比如，假定每页大小为8条，查询第3页的book文档
db.book.find().skip(16).limit(8)
```

如果limit是1, 那可以使用findOne.



##### 使用投射

投射（projection）可以让数据库只返回一部分被关注的字段，而不是整个文档。1返回0不返回

```js
//让数据库仅仅返回book文档中的标题（title）、收藏数（favCount）字段，
db.book.find({},{title:1,favCount:1}).limit(5)

//默认情况下，_id会被一起返回，可以在projection参数中明确将其去除
db.book.find({},{title:1,favCount:1,_id:0}).limit(5)

//
{title:'book-1',faCount:21}
...
{title:'book-5',faCount:25}
```



##### 查询限定符

比较操作符

| 操作符 | 描述           |
| ------ | -------------- |
| $eq    | 等值比较       |
| $gt    |                |
| $gte   |                |
| $in    | 数组中包含     |
| $lt    |                |
| $lte   |                |
| $ne    |                |
| $nin   | 不在数组中包含 |



逻辑操作符

| 操作符 | 说明     |
| ------ | -------- |
| $and   |          |
| $or    |          |
| $not   |          |
| $nor   | 即非查询 |



数组操作符

| 操作符     | 描述           |
| ---------- | -------------- |
| $all       | 全包含         |
| $elemMatch | 仅一个元素匹配 |
| $size      | 大小匹配       |



#### 3更新文档

可以用update命令对指定的数据进行更新，命令的格式如下：

```js
db.{collection}.update(query, update, options)
```

参数说明

* query：描述更新的查询条件；
* update：描述更新的动作及新的内容；
* options：描述更新的选项。



##### 更新单个文档

```js
//如某个book文档被收藏了，则需要将该文档的favCount字段自增
db.book.update(
	{"_id": ObjectId('5d944a4b34f16ef5599f4d4e')},
  {"$inc": {"favCount": 1}}
)
```



##### 更新多个文档

默认情况下，update命令只在更新第一个文档之后返回，如果需要更新多个文档，则可以使用multi选项。

```js
//将分类为“novel”的文档的发布时间（publishedDate）调整到当前时间
db.book.update(
	{'type': 'novel'},
  {'$set': {publishedDate: new Date()}},
  {multi: true}
)
```



##### 使用upsert命令

> upsert是一种特殊的更新，其表现为如果目标文档不存在，则执行插入命令

```js
db.book.upsert(
	{title: 'My first book'},
  {
    $set: {
      publishedDate: new Date(),
      tags: ['nosql', 'mongodb'],
      type: 'none',
      author: ;'zale'
    }
  },
  {upsert: true}
)
```



##### 实现replace语义

update命令中的更新描述（update）通常由操作符描述，如果更新描述中不包含任何操作符，那么MongoDB会实现文档的replace语义

```js
db.book.update(
	{title: 'my first book'},
  {'justTitle': "what's wrong"}
)
//替换后的文档
{'_id':ObjectId('5e6d0b7d66862f7ceb8225cb'), justTitle:"what's wrong"}
```

update命令的选项配置较多，为了简化使用还可以使用一些快捷命令，具体如下：

* updateOne：更新单个文档。
* updateMany：更新多个文档。
* replaceOne：替换单个文档。



##### findAndModify命令

> findAndModify兼容了查询和修改指定文档的功能

```js
//将某个book文档的收藏数（favCount）加1

db.book.findAndModify({
  query: {"_id": ObjectId('5d944a4b34f16ef5599f4d4e')},
  update: {"$inc": {"favCount": 1}}
})
```

默认情况下，findAndModify会返回修改前的“旧”数据。如果希望返回修改后的数据，则可以指定new选项

```js
db.book.findAndModify({
  query: {"_id": ObjectId('5d944a4b34f16ef5599f4d4e')},
  update: {"$inc": {"favCount": 1}},
  new: true
})
```



update命令与findAndModify比较:

| 操作符    | 格式                                          | 描述                                         |
| --------- | --------------------------------------------- | -------------------------------------------- |
| $set      | `{$set: {field: value}}`                      | 指定一个键并更新值,若键不存在则创建          |
| $unset    | `{$unset: {field: 1}}`                        | 删除一个键                                   |
| $inc      | `{$inc: {field: value}}`                      | 对数值类型进行增减                           |
| $push     | `{$push: {field: value}}`                     | 将数值追加到数组中, 若数组不存在会进行初始化 |
| $pushAll  | `{$pushAll: {field: value_array}}`            | 追加多个值到一个数组字段内                   |
| $pull     | `{$pull: {field: value}}`                     | 从数组中删除指定元素                         |
| $addToSet | `{$addToSet: {field: value}}`                 | 添加元素到数组中, 具有排重功能 ?             |
| $rename   | `{$rename: {old_field_name: new_field_name}}` | 修改字段名称                                 |
| $bit      | `{$bit: {field: {and: 5}}}`                   | 位操作, integer类型                          |









##### 更新操作符







#### 4删除文档



#### 5使用聚合



#### 计算文档大小



#### 定义mongo shell环境

