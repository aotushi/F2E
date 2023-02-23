## 接口调试工具

**资料地址**

> https://juejin.cn/post/6975533854555635726

### Hoppscotch(Postwoman)

#### 在线版本: 

[hoppscotch.io/cn/](https://hoppscotch.io/cn/)

#### Chrome插件

Hoppscotch Browser Extension



### Postman

> 用得少



### curl

#### 是什么?

命令行工具, 作用是发出网络请求,然后得到和提取数据. 类似postman,更高级



#### 资源

> 1 [curl网站开发指南 - 阮一峰的网络日志 (ruanyifeng.com)](https://www.ruanyifeng.com/blog/2011/09/curl.html)
>
> 2 [curl 的用法指南 - 阮一峰的网络日志 (ruanyifeng.com)](https://www.ruanyifeng.com/blog/2019/09/curl-reference.html)
>
> [Curl Cookbook (catonmat.net)](https://catonmat.net/cookbooks/curl)



#### 命令介绍

cmd环境中可以直接用curl, ps中使用curl.exe

```sh
curl 域名 															//查看网页源码
curl -o [文件名] 域名 										//保存网页
curl -L 域名														//自动重定向到域名的最新域名上
curl -i 域名														//显示http response的头信息
curl -v 域名														//显示一次http通信的整个过程，包括端口连接和http request头信息
curl --trace output 域名 								//更详细的通信过程
curl --trace-ascii output 域名 					//同上
curl example.com/form.cgi?data=xxx  		// 发送表单 get请求
curl -X POST --data "date=April 1" example.com/form.cgi 						//发送表单 post请求
curl -X POST--data-urlencode "date=April 1" example.com/form.cgi 		//发送表单 post请求 编码

//请求类型 使用'-X 类型名'来实现,默认是GET
curl -X POST www.example.com
curl -XPOST www.example.com
curl -X DELETE www.example.com


//文件上传


//请求头中添加字段
 //reference 表示从哪来

//user agent字段 表示客户端设备信息 服务器有时会根据这个字段，针对不同设备，返回不同格式的网页，比如手机版和桌面版。
```



##### `-A`参数

指定客户端的用户代理标头，即`User-Agent`。curl 的默认用户代理字符串是`curl/[version]`。

```sh
curl -A 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.100 Safari/537.36' https://google.com
```

上面命令将`User-Agent`改成 Chrome 浏览器

```sh
curl -A '' https://google.com
```

上面命令会移除`User-Agent`标头。



##### `-H`参数

通过`-H`参数直接指定标头，更改`User-Agent`。

```sh
curl -H 'User-Agent: php/1.0' https://google.com
```

设置编码格式,如果请求头和响应中的格式一致,依然乱码,可能是cmd等终端中的编码格式不正确. [cmd默认GBK格式,更改为utf-8](https://blog.csdn.net/u014636245/article/details/98673719)格式如下:

```bash
>>>chcp 65001

```







cookie字段

具体的cookie的值，可以从http response头信息的`Set-Cookie`字段中得到。

`-c cookie-file`可以保存服务器返回的cookie到文件，`-b cookie-file`可以使用这个文件作为cookie信息，进行后续的请求。

```sh
curl --cookie "name=xxx" www.example.com

$ curl -c cookies http://example.com
$ curl -b cookies http://example.com
```



##### `-b`字段

用来向服务器发送 Cookie。

```sh
curl -b 'foo=bar' https://google.com
```

上面命令会生成一个标头`Cookie: foo=bar`，向服务器发送一个名为`foo`、值为`bar`的 Cookie。

```sh
curl -b 'foo1=bar;foo2=bar2' https://google.com
```

上面命令发送两个 Cookie。

```sh
curl -b cookies.txt https://www.google.com
```

上面命令读取本地文件`cookies.txt`，里面是服务器设置的 Cookie（参见`-c`参数），将其发送到服务器. ?? 文件位置是?



##### `-c`

将服务器设置的 Cookie 写入一个文件

```sh
curl -c cookies.txt https://www.google.com
```

上面命令将服务器的 HTTP 回应所设置 Cookie 写入文本文件`cookies.txt`



##### `-d`

`-d`参数用于发送 POST 请求的数据体。如果是其它类型请求,需要指明.

```sh
curl -d'login=emma＆password=123'-X POST https://google.com/login
# 或者
curl -d 'login=emma' -d 'password=123' -X POST  https://google.com/login
```

使用`-d`参数以后，HTTP 请求会自动加上标头`Content-Type : application/x-www-form-urlencoded`。并且会自动将请求转为 POST 方法，因此可以省略`-X POST`。

`-d`参数可以读取本地文本文件的数据，向服务器发送。

```sh
curl -d '@data.txt' https://google.com/login
```

上面命令读取`data.txt`文件的内容，作为数据体向服务器发送。



`--data-urlencode`

等同于`-d`，发送 POST 请求的数据体，区别在于会自动将发送的数据进行 URL 编码

```sh
curl --data-urlencode 'comment=hello world' https://google.com/login
```

上面代码中，发送的数据`hello world`之间有一个空格，需要进行 URL 编码。



##### `-e`

用来设置 HTTP 的标头`Referer`，表示请求的来源

```sh
curl -e 'https://google.com?q=example' https://www.example.com
```

上面命令将`Referer`标头设为`https://google.com?q=example`。

`-H`参数可以通过直接添加标头`Referer`，达到同样效果。

```sh
curl -H 'Referer: https://google.com?q=example' https://www.example.com
```





##### `-F`

用来向服务器上传二进制文件

```sh
curl -F 'file=@photo.png' https://google.com/profile
```

上面命令会给 HTTP 请求加上标头`Content-Type: multipart/form-data`，然后将文件`photo.png`作为`file`字段上传。

`-F`参数可以指定 MIME 类型。

```sh
curl -F 'file=@photo.png;type=image/png' https://google.com/profile
```

上面命令指定 MIME 类型为`image/png`，否则 curl 会把 MIME 类型设为`application/octet-stream`。

`-F`参数也可以指定文件名。

```sh
curl -F 'file=@photo.png;filename=me.png' https://google.com/profile
```

上面命令中，原始文件名为`photo.png`，但是服务器接收到的文件名为`me.png`。



##### `-G`

用来构造 URL 的查询字符串

```sh
curl -G -d 'q=kitties' -d 'count=20' https://google.com/search
```

上面命令会发出一个 GET 请求，实际请求的 URL 为`https://google.com/search?q=kitties&count=20`。如果省略`--G`，会发出一个 POST 请求。

如果数据需要 URL 编码，可以结合`--data--urlencode`参数。

```sh
curl -G --data-urlencode 'comment=hello world' https://www.example.com
```



##### `-H`

添加 HTTP 请求的标头

```sh
curl -H 'Accept-Language: en-US' https://google.com
```

上面命令添加 HTTP 标头`Accept-Language: en-US`。

```sh
curl -H 'Accept-Language: en-US' -H 'Secret-Message: xyzzy' https://google.com
```

上面命令添加两个 HTTP 标头。

```sh
curl -d '{"login": "emma", "pass": "123"}' -H 'Content-Type: application/json' https://google.com/login
```

上面命令添加 HTTP 请求的标头是`Content-Type: application/json`，然后用`-d`参数发送 JSON 数据。



##### `-i`

打印出服务器回应的 HTTP 标头

```sh
curl -i https://www.example.com
```

上面命令收到服务器回应后，先输出服务器回应的标头，然后空一行，再输出网页的源码



##### `-I`

向服务器发出 HEAD 请求，然会将服务器返回的 HTTP 标头打印出来

```sh
curl -I https://www.example.com
```

上面命令输出服务器对 HEAD 请求的回应

`--head`参数等同于`-I`



##### `-k`

指定跳过 SSL 检测。

```sh
curl -k https://www.example.com
```

上面命令不会检查服务器的 SSL 证书是否正确。



##### `-L`

让 HTTP 请求跟随服务器的重定向。curl 默认不跟随重定向

```sh
curl -L -d 'tweet=hi' https://api.twitter.com/tweet
```



`--limit-rate`

`--limit-rate`用来限制 HTTP 请求和回应的带宽，模拟慢网速的环境

```sh
curl --limit-rate 200k https://google.com
```



##### `-o`

将服务器的回应保存成文件，等同于`wget`命令

```sh
curl -o example.html https://www.example.com
```

上面命令将`www.example.com`保存成`example.html`。



##### `-O`

将服务器回应保存成文件，并将 URL 的最后部分当作文件名

```sh
curl -O https://www.example.com/foo/bar.html
```

上面命令将服务器回应保存成文件，文件名为`bar.html`。



##### `-s`

将不输出错误和进度信息

```sh
curl -s https://www.example.com
```

上面命令一旦发生错误，不会显示错误信息。不发生错误的话，会正常显示运行结果。

如果想让 curl 不产生任何输出，可以使用下面的命令。

```sh
curl -s -o /dev/null https://google.com
```



##### `-S`

`-S`参数指定只输出错误信息，通常与`-s`一起使用。

> ```bash
> $ curl -s -o /dev/null https://google.com
> ```

上面命令没有任何输出，除非发生错误。



##### `-u`

用来设置服务器认证的用户名和密码

```sh
curl -u 'bob:12345' https://google.com/login
```

上面命令设置用户名为`bob`，密码为`12345`，然后将其转为 HTTP 标头`Authorization: Basic Ym9iOjEyMzQ1`。

curl 能够识别 URL 里面的用户名和密码。

```sh
curl https://bob:12345@google.com/login
```

上面命令能够识别 URL 里面的用户名和密码，将其转为上个例子里面的 HTTP 标头。

> ```bash
> curl -u 'bob' https://google.com/login
> ```

上面命令只设置了用户名，执行后，curl 会提示用户输入密码。





##### `-v`

输出通信的整个过程，用于调试

```sh
curl -v https://www.example.com
```

`--trace`参数也可以用于调试，还会输出原始的二进制数据。

```sh 
curl --trace - https://www.example.com
```



##### `-x`

指定 HTTP 请求的代理。

```sh
curl -x socks5://james:cats@myproxy.com:8080 https://www.example.com
```

上面命令指定 HTTP 请求通过`myproxy.com:8080`的 socks5 代理发出。

如果没有指定代理协议，默认为 HTTP。

```sh
curl -x james:cats@myproxy.com:8080 https://www.example.com
```

上面命令中，请求的代理使用 HTTP 协议。



##### `-X`

指定 HTTP 请求的方法。post/delete等等

```sh
curl -X POST https://www.example.com
```

上面命令对`https://www.example.com`发出 POST 请求。





##### http请求认证

有些网域需要HTTP认证，这时curl需要用到`--user`参数。

```sh
curl --user name:password example.com
```











### 插件类型

#### REST Client

> vscode 插件



#### Talend API Tester





## api



### 免费在线api

1.[public-apis/public-apis: A collective list of free APIs (github.com)](https://github.com/public-apis/public-apis)

2.[JSONPlaceholder - Free Fake REST API (typicode.com)](http://jsonplaceholder.typicode.com/)

获取帖子列表：[jsonplaceholder.typicode.com/posts](https://link.juejin.cn?target=http%3A%2F%2Fjsonplaceholder.typicode.com%2Fposts)

根据帖子ID获取详情：[jsonplaceholder.typicode.com/posts/1](https://link.juejin.cn?target=https%3A%2F%2Fjsonplaceholder.typicode.com%2Fposts%2F1)

获取某个用户所有的帖子：[jsonplaceholder.typicode.com/posts?userI…](https://link.juejin.cn?target=http%3A%2F%2Fjsonplaceholder.typicode.com%2Fposts%3FuserId%3D5)

获取帖子所有的评论：[jsonplaceholder.typicode.com/posts/1/com…](https://link.juejin.cn?target=https%3A%2F%2Fjsonplaceholder.typicode.com%2Fposts%2F1%2Fcomments)

获取评论列表：[jsonplaceholder.typicode.com/comments](https://link.juejin.cn/?target=http%3A%2F%2Fjsonplaceholder.typicode.com%2Fcomments)

获取某个帖子的所有评论：[jsonplaceholder.typicode.com/comments?po…](https://link.juejin.cn/?target=http%3A%2F%2Fjsonplaceholder.typicode.com%2Fcomments%3FpostId%3D4)

获取专辑列表：[jsonplaceholder.typicode.com/albums](https://link.juejin.cn?target=http%3A%2F%2Fjsonplaceholder.typicode.com%2Falbums)

根据专辑ID获取详情：[jsonplaceholder.typicode.com/albums/6](https://link.juejin.cn?target=http%3A%2F%2Fjsonplaceholder.typicode.com%2Falbums%2F6)

获取某个用户所有专辑：[jsonplaceholder.typicode.com/albums?user…](https://link.juejin.cn?target=http%3A%2F%2Fjsonplaceholder.typicode.com%2Falbums%3FuserId%3D9)

获取待办事宜列表：[jsonplaceholder.typicode.com/todos](https://link.juejin.cn?target=http%3A%2F%2Fjsonplaceholder.typicode.com%2Ftodos)

根据待办ID获取详情：[jsonplaceholder.typicode.com/todos/6](https://link.juejin.cn?target=http%3A%2F%2Fjsonplaceholder.typicode.com%2Ftodos%2F6)

获取某个用户所有待办事宜：[jsonplaceholder.typicode.com/todos?userI…](https://link.juejin.cn?target=http%3A%2F%2Fjsonplaceholder.typicode.com%2Ftodos%3FuserId%3D9)

获取用户列表：[jsonplaceholder.typicode.com/users](https://link.juejin.cn/?target=http%3A%2F%2Fjsonplaceholder.typicode.com%2Fusers)

根据用户ID获取详情：[jsonplaceholder.typicode.com/users/5](https://link.juejin.cn/?target=http%3A%2F%2Fjsonplaceholder.typicode.com%2Fusers%2F5)

获取照片列表：[jsonplaceholder.typicode.com/photos](https://link.juejin.cn/?target=http%3A%2F%2Fjsonplaceholder.typicode.com%2Fphotos)

根据照片ID获取详情：[jsonplaceholder.typicode.com/photos/8](https://link.juejin.cn/?target=http%3A%2F%2Fjsonplaceholder.typicode.com%2Fphotos%2F8)



[Lorem Picsum](https://picsum.photos/)



物流接口 `http://www.kuaidi100.com/query?type=快递公司代号&postid=快递单号`

快递公司编码：

- 申通：`shentong`
- EMS：`ems`
- 顺丰：`shunfeng`
- 圆通：`yuantong`
- 中通：`zhongtong`
- 韵达：`yunda`
- 天天：`tiantian`
- 汇通：`huitongkuaidi`
- 全峰：`quanfengkuaidi`
- 德邦：`debangwuliu`
- 宅急送：`zhaijisong`



淘宝商品接口

`http://suggest.taobao.com/sug?code=utf-8&q=商品关键字&callback=cb`  `callback` 是回调函数设定

[商品分类--ShowDoc](https://www.showdoc.com.cn/128719739414963?page_id=2516997897914014)





### 本地模拟数据工具

推荐mock, json-server



### Mock









### json-server

官网

> [typicode/json-server: Get a full fake REST API with zero coding in less than 30 seconds (seriously) (github.com)](https://github.com/typicode/json-server#getting-started)
>
> [『前端必备』本地数据接口 —— json-server 从入门到膨胀 - 掘金 (juejin.cn)](https://juejin.cn/post/7043424909472563208)



#### 介绍

[npm地址](https://link.juejin.cn/?target=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Fjson-server) | [github地址](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Ftypicode%2Fjson-server)

使用 `json-server` 需要遵守一定的规范。

- 数据查询要使用 `GET`。
- 新增数据要使用 `POST`。
- 删除数据要使用 `DELETE`。
- 修改数据使用 `PUT` 和 `PATCH`。



其他啰嗦的介绍可以打开上面提供的[网址](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Ftypicode%2Fjson-server)看看



#### 起步

**1.node环境安装**

> `node` 版本一定要 `12` 以上



**2.安装json-server**

```sh
npm i json-server -g
```



**3.创建数据库**

在你本机创建一个文件夹，然后新建一个 `json` 文件，再填入数据即可。

建议文件名不要出现中文。

例如: 创建 `json-server-demo` 文件夹，在 `json-server-demo` 里创建 `db.json` 文件



**4.启动服务**

进入 `json-server-demo` 目录，打开终端输入以下命令即可

```sh
json-server --watch db.json
```









#### 查(get)

使用了GET方法

```sh
http://localhost:3000/posts
```



#### 增删改查

##### 增(post)

使用请求体新增参数

```sh
http://localhost:3000/posts
```

在vscode中使用reset-client时报错, github有相同的问题,但没有明确的答案.

所以,这里使用的curl命令, id参数会自动新增

```sh
curl -d"title=js2&author=js22" http://localhost:3000/posts
```



##### 删(delete)

`json-server` **删除数据**需要使用 `DELETE` 方法。

删除的公式是：

```sh
http://localhost:3000/{接口名}/{id}
```

使用curl实现

```sh
curl -X DELETE http://localhost:3000/posts/2
```

删除成功,返回一个空对象



##### 改(put/patch)

修改数据分为2个方法：

- `put` ：覆盖
- `patch` ：更新

公式如下所示：

```bash
http://localhost:3000/posts/{id}
```



更新: 使用curl实现: 把posts下id为2的数据的title改为'xxx'

```sh
curl -X PATCH http://localhost:3000/posts/2 -d title=xxx   //title=xxx 不能加单引号,只能使用双引号

curl -X PATCH http://localhost:3000/posts/2 -d "title=222&author=333" //更新这两个参数的值
```



覆盖: 把 `id` 为 `1` 的数据改成 `{ "title": "t111", "author": "a111" }`

```sh
curl -X PUT http://localhost:3000/posts/1 -d "title=t111&author=a111"
```



#### 配置命令项概况

查看配置项

> json-server -h

| 参数               | 简写  | 说明                             |
| ------------------ | ----- | -------------------------------- |
| --config           | -c    | 指定配置文件                     |
| --port             | -p    | 端口号                           |
| --host             | -H    | 主机地址                         |
| --watch            | -w    | 监听文件                         |
| --routes           | -r    | 指定路由文件                     |
| --middlewares      | -m    | 指定中间件                       |
| --static           | -s    | 设置静态文件                     |
| --read-only        | --ro  | 只读                             |
| --no-cors          | --nc  | 禁用跨源资源共享                 |
| --no-gzip          | --ng  | 禁止GZIP                         |
| --snapshots        | -S    | 设置快照目录                     |
| --delay            | -d    | 设置反馈延时（ms）               |
| --id               | -i    | 设置数据的id属性（e.g. \_id）     |
| --foreignKeySuffix | --fks | 设置外键后缀（如post\_id中的\_id） |
| --quiet            | -q    | 禁止输出日志消息                 |
| --help             | -h    | 显示帮助信息                     |
| --version          | -v    | 显示版本号                       |



##### 端口

```sh
json-server -p 6666 db.json
```



##### 主机地址

```sh
json-server --host 0.0.0.0 db.json
```

这里设置了 `0.0.0.0` ，之后通过本机 `IP` 来访问即可。同一个局域网内的其他设备也可以通过这个地址来访问。



#### 查询操作

##### 普通查询



##### id查询

数据结构

```json
{
  "posts": [
    {
      "id": 1,
      "title": "文章111",
      "author": "张三"
    },
    {
      "id": 2,
      "title": "文章222",
      "author": "李四"
    }
  ]
}
```



```sh
http://localhost:3000/posts/{id}
```



##### 条件查询

数据

```json
{
  "posts": [
    {
      "id": 1,
      "title": "文章111",
      "author": "张三"
    },
    {
      "id": 2,
      "title": "文章222",
      "author": "李四"
    },
    {
      "id": 3,
      "title": "文章333",
      "author": "张三"
    }
  ]
}
```





<u>单一条件查询</u>

查找 `author` 为 `张三` 的所有数据

```sh
http://localhost:3000/posts?author=张三
```



<u>多条件查询(且)</u>

筛选的是 `author = 张三` 且 `title = 文章333` 的数据

```sh
http://localhost:3000/posts?author=张三&title=文章333
```



<u>多条件查询(或)</u>

筛选的是 `title = 222` 和 `title = 333` 这两条数据出来

```sh
http://localhost:3000/posts?title=文章222&title=文章333
```

重复使用 `title` ，会把符合条件的都筛查出来。



<u>深度属性查询</u>

```json
{
  "posts": [
    {
      "id": 1,
      "title": "文章111",
      "authorInfo": {
        "name": "张三",
        "age": 20
      }
    },
    {
      "id": 2,
      "title": "文章222",
      "authorInfo": {
        "name": "李四",
        "age": 24
      }
    }
  ]
}
```

查询 `authorInfo.name = 张三` 的数据。使用 `.` 的方式来访问子级数据

```sh
http://localhost:3000/posts?authorInfo.name=张三
```



<u>分页查询</u>

使用 `_page` 和 `_limit`(可选) 对数据进行分页。需要注意，`_page` 和 `_limit` 前面都要有**下划线**。

- `_page`：页码
- `_limit`：每页的数据量

修改 `db.json` 里的数据方便测试分页功能，如下所示

```json
{
  "comments": [
    { "id": 1, "body": "some comment 1", "postId": 1 },
    { "id": 2, "body": "some comment 2", "postId": 1 },
    { "id": 3, "body": "some comment 3", "postId": 2 },
    { "id": 4, "body": "some comment 4", "postId": 3 },
    { "id": 5, "body": "some comment 5", "postId": 1 },
    { "id": 6, "body": "some comment 6", "postId": 3 },
    { "id": 7, "body": "some comment 7", "postId": 3 },
    { "id": 8, "body": "some comment 8", "postId": 1 },
    { "id": 9, "body": "some comment 9", "postId": 2 },
    { "id": 10, "body": "some comment 10", "postId": 2 },
    { "id": 11, "body": "some comment 11", "postId": 3 },
    { "id": 12, "body": "some comment 11", "postId": 1 }
  ]
}
```



需要获取第2页的数据，每页3条：

```sh
http://localhost:3000/comments?_page=2&_limit=3
```

除了要返回的数据外，还会在 `Headers` 里返回 **总数；第一个、前一个、下一个、最后一个的链接**。 使用curl演示一下:

```sh
//powershell 此环境中会提示&是保留字需要双引号
curl.exe http://localhost:3000/commments?_page=2"&"_limit=3

//cmd 使用双引号
curl "http://localhost:3000/comments?_page=2&_limit=3"
curl http://localhost:3000/comments?_page=2"&"_limit=3
```



![21.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/be0c262bd0d54b30806a2fb386c81037~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp?)



`x-total-count`存放总数

`link`字段里存放的第**第一个、前一个、下一个、最后一个** 的链接地址

```html
"
<http://localhost:3000/comments?_page=1&_limit=3>; rel=\"first\", <http://localhost:3000/comments?_page=1&_limit=3>; rel=\"prev\", <http://localhost:3000/comments?_page=3&_limit=3>; rel=\"next\", <http://localhost:3000/comments?_page=4&_limit=3>; rel=\"last\"
"
```



##### 排序查询

需要添加 **排序的标记 ( `_sort` )**，然后设置 **排序规则 ( `_order` )**。

其中，排序规则有 **升序 ( `asc` )** 和 **降序 ( `desc` )** 。

```sh
http://localhost:3000/{接口名}?_sort=要排序的字段名&_order=排序规则
```

以这份数据为例

```json
{
  "comments": [
    { "id": 11, "body": "some comment 1", "postId": 1 },
    { "id": 2, "body": "some comment 2", "postId": 1 },
    { "id": 3, "body": "some comment 3", "postId": 2 },
    { "id": 10, "body": "some comment 4", "postId": 3 },
    { "id": 7, "body": "some comment 5", "postId": 1 },
    { "id": 6, "body": "some comment 6", "postId": 3 },
    { "id": 5, "body": "some comment 7", "postId": 3 },
    { "id": 8, "body": "some comment 8", "postId": 1 },
    { "id": 9, "body": "some comment 9", "postId": 2 },
    { "id": 4, "body": "some comment 10", "postId": 2 },
    { "id": 1, "body": "some comment 11", "postId": 3 },
    { "id": 12, "body": "some comment 11", "postId": 1 }
  ]
}
```

`id` 的排序是乱的，如果使用普通的方式请求回来的数据是原模原样返回的。



<u>升序</u>

> 以 `id` 为参考字段进行升序排列返回给客户端。

```sh
http://localhost:3000/comments?_sort=id
或
http://localhost:3000/comments?_sort=id&_order=asc
```

普通升序排列的话，`_order=asc` 可以不传。只需指定 **参考字段 ( `_sort` )** 即可





<u>降序</u>

> 降序必须填好 `_order=desc` 。

```sh
http://localhost:3000/comments?_sort=id&_order=desc
```





<u>多字段排序</u>

这次的需求是：

1. 首先按 `postId` 升序排列
2. 在 `1` 的基础上再对 `id` 进行倒序排列

> 多个字段用 `,` 分格。

```sh
http://localhost:3000/comments?_sort=postId,id&_order=asc,desc
```



##### 切片查询

切片的意思是指定 **头** 和 **尾** ；也可以指定 **头** 和 **片段长度** 。

用到的关键字有：

- `_start`：开始位置（下标，从0开始）
- `_end`：结束位置
- `_limit`：片段长度

**总数** 会放在 `headers` 里。

以这份数据为例

```json
{
  "comments": [
    { "id": 1, "body": "some comment 1", "postId": 1 },
    { "id": 2, "body": "some comment 2", "postId": 1 },
    { "id": 3, "body": "some comment 3", "postId": 2 },
    { "id": 4, "body": "some comment 4", "postId": 3 },
    { "id": 5, "body": "some comment 5", "postId": 1 },
    { "id": 6, "body": "some comment 6", "postId": 3 },
    { "id": 7, "body": "some comment 7", "postId": 3 },
    { "id": 8, "body": "some comment 8", "postId": 1 },
    { "id": 9, "body": "some comment 9", "postId": 2 },
    { "id": 10, "body": "some comment 10", "postId": 2 },
    { "id": 11, "body": "some comment 11", "postId": 3 },
    { "id": 12, "body": "some comment 11", "postId": 1 }
  ]
}
```



> 需求：返回下标从 `2-6` 的数据

使用 `_start` 和 `_end` 的方式

```sh
http://localhost:3000/comments?_start=2&_end=6
```

使用 `_start` 和 `_limit` 的方式

```sh
http://localhost:3000/comments?_start=2&_limit=4
```



##### 范围查询

范围查询包括 **大于等于**、**小于等于**、**不等于** 三种情况

`大于等于 _gte`

**大于等于** 使用的关键字是 `_gte` 。注意，前面有个下划线的。

> 需求：查询 `comments` 接口 `id` 大于等于 `4` 的数据

```sh
http://localhost:3000/comments?id_gte=4
```

`小于等于 _lte`

> 需求：查询 `comments` 接口 `id` 小于等于 `4` 的数据

```sh
http://localhost:3000/comments?id_lte=4
```

`联合大于和小于一起使用`

需求：查询 `comments` 接口 `id` 大于等于 `4` 且 小于等于 `6` 的数据

```sh
http://localhost:3000/comments?id_gte=4&id_lte=6
```

`不等于`

> 需求：查询 `comments` 接口 `id` 不等于 `2` 的数据

```sh
http://localhost:3000/comments?id_ne=2
```



##### 模糊查询

模糊查询的关键字是 `_like`

> 需求：查询 `comments` 接口 `body` 包含 `1` 的数据

```sh
http://localhost:3000/comments?id_like=1
```



##### 全文查询

全文查询的关键字是 `q`

准备以下数据比较好演示

```json
{
  "authors": [
    { "id": 1, "name": "zhangsan", "age": 18},
    { "id": 2, "name": "lisi", "age": 21},
    { "id": 3, "name": "wangwu", "age": 24}
  ]
}
```

> 查询所有字段中包含 `2` 的数据出来

```sh
http://localhost:3000/authors?q=2
```

![30.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d8ae5ef31b3d4c538ecd568bfa87bb6c~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp?)

因为 `id` 为 `3` 的那条数据里 `age` 是 `24` ，也算是包含了 `2` 





##### 外键关联查询

外键查询需要 **2个接口** 关联查询

准备以下数据方便演示

```json
{
  "posts": [
    { "id": 1, "title": "文章111", "author": "张三" },
    { "id": 2, "title": "文章222", "author": "李四" }
  ],
  "comments": [
    { "id": 1, "body": "some comment 1", "postId": 1 },
    { "id": 2, "body": "some comment 2", "postId": 1 },
    { "id": 3, "body": "some comment 3", "postId": 2 }
  ]
}
```

`posts` 里有2条数据。

`comments` 里有3条数据，其中每条数据都有一个 `postId`，是对应 `posts` 每条数据的 `id`

> 需求：查询 `posts` 里 `id` 为 `1` 的所有 `comments` 内容

```sh
http://localhost:3000/posts/1/comments
```



##### 关系拼装

关系拼装可以把关联的2个接口的数据拼接起来并返回。

其中有2种查询关系：

- 包含子资源 `_embed`
- 包含父资源 `_expand`

准备以下数据方便演示

```json
{
  "posts": [
    { "id": 1, "title": "文章111", "author": "张三" },
    { "id": 2, "title": "文章222", "author": "李四" }
  ],
  "comments": [
    { "id": 1, "body": "some comment 1", "postId": 1 },
    { "id": 2, "body": "some comment 2", "postId": 1 },
    { "id": 3, "body": "some comment 3", "postId": 2 }
  ]
}
```

**包含子资源 _embed**

```sh
http://localhost:3000/posts?_embed=comments
```

![32.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fa736f67c8684f04aa9434a6f70679ef~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp?)





> 需求：在 `comments` 里，把 `posts` 里 `id` 为 `2` 的数据找出来并拼接起来

```sh
http://localhost:3000/posts/2?_embed=comments
```



**包含父资源**

```sh
http://localhost:3000/comments?_expand=post
```

![34.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/df14c3221fd44ee9948c125d85bcbd52~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp?)





##### **配置路由**

有时候我们的 `api地址` 可能不像上面所有案例中那么简单，此时就可以使用 **自定义路由** 的方法来模拟。

比如模拟下面这个接口：

```sh
http://localhost:3000/api/users/1
```

实现的步骤如下所示：

1. 创建 `routes.json` 文件（也可以不叫这个名字）
2. 启动服务时使用 `--routes` 参数

1.创建routes.json,输入以下内容

```json
{
  "/api/*": "/$1"
}
```

2.启动服务

```sh
json-server db.json --routes routes.json
```

3.访问

```sh
http://localhost:3000/api/posts
```



##### 静态资源

静态资源包含 `html` 、`css` 、`js` 、图片、视频等资源。

**配置**

配置方式分2种：

- 默认配置
- 指定资源位置



**默认配置**

需要在根目录下创建 `public` 文件夹，里面放入 `html` 等文件

![35.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/31a78f72917348c596cb870ba93c40f8~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp?)

然后在浏览器访问一下 `http://localhost:3000/`, 访问的就是此html的内容.也可以加入自己的 `css` 和 `js` 进行设计交互



**指定资源位置**

`json-server` 配资静态资源的默认方式是在根目录下创建 `public` 文件夹，然后里面放入静态资源。

但如果你不想使用 `public` 作为静态资源的文件夹，也可以自己起过另一个名字，然后在启动环境时使用 `--static` 来指定目标目录就行了。

比如我创建了一个 `some-other-dir` 作为静态资源的目录，使用以下命令指定以下即可。

```swift
json-server db.json --static ./some-other-dir
```





**多媒体资源**

除了放 `html` 、`css` 和 `js` 资源外，还可以放图片和视频。

我以图片为例，我在 `public` 目录下添加一个图片。直接在 `http://localhost:3000/` 后面跟着 `图片文件名` 即可。





##### 其它

**生成动态数据**

如果我们要模拟100条数据，甚至更多的话，创建 `json` 文件然后一条一条录入的方式真的很不合时。

此时我们可以使用 `js` 通过循环的方式来实现数据创建。



1、首先在根目录下创建一个 `db.js` 的文件。

2、输入一下内容

```js
module.exports = () => {
  const data = { users: [] }
  // 创建 100 个 users
  for (let i = 0; i < 100; i++) {
    data.users.push({ id: i, name: `user${i}` })
  }
  return data
}
```

3、运行 `js` 文件

```sh
json-server db.js
```

4、查询一下

```sh
 http://localhost:3000/users
```



**查询整个数据库**

访问以下地址可以获得整个数据库的数据。

```sh
 http://localhost:3000/db
```



**远程模式**

如果想使用互联网上的数据，也可以直接运行 `json-server` 然后加上远端的地址即可。

```sh
json-server http://jsonplaceholder.typicode.com/db
```













## VIM

### 基本操作

> [萌新的hhkb上手教程 | dOwOb](https://dowob.cn/2019/03/27/萌新的hhkb上手教程/)
>
> [VS Code 与 Vim | Jingchao's Blog (chengjingchao.com)](https://chengjingchao.com/2020/06/13/VS-Code-与-Vim/)
>
> [VSCodeVim 最佳实践_gneveek的博客-CSDN博客](https://blog.csdn.net/gneveek/article/details/104014551)
>
> [VSCodeVim 最佳实践 | 周岩的 BLOG (zhouyanlt.github.io)](https://zhouyanlt.github.io/vim/2019/09/20/vscode-vim-best-practices.html)



### 光标移动

#### 快速跳到下一个空格

* 大写E+小写l
* f+`<space>` 或 f+`<tab>`







### 操作



#### 对一个单词进行操作



### 记录与回放

例如: 多行添加相同注释

```vim
1. 按'q',进入记录与回放模式
2. 按'a',将接下来的操作记录到字符'a'中  //字母a不限制,也可以是其他字符
3. 具体操作过程. 注意: 鼠标移动使用vim快捷键
4. 光标移到下一行,按'q'结束记录
5. 按 '@a',重播记录
6. 按 'n@a', 在接下来的n行重播记录
```



### 替换

> [在 Vim 中优雅地查找和替换 | Harttle Land](https://harttle.land/2016/08/08/vim-search-in-file.html)

#### 语法

```
:{作用范围}s/{目标}/{替换}/{替换标志}
```

例如 `:%s/foo/bar/g` 会在全局范围(`%`)查找 `foo` 并替换为 `bar`，所有出现都会被替换（`g`）



#### 作用范围

作用范围分为当前行,全文,选取等等.

当前行替换:

```
:s/foo/bar/g
```

全文：

```
:%s/foo/bar/g
```

选区，在 Visual 模式下选择区域后输入 `:`，Vim 即可自动补全为 `:'<,'>`。

```
:'<,'>s/foo/bar/g
```

2-11 行：

```
:5,12s/foo/bar/g
```

当前行 `.` 与接下来两行 `+2`：

```
:.,+2s/foo/bar/g
```

#### 替换标志符

上文中命令结尾的 `g` 即是替换标志之一，表示全局 `global` 替换（即替换目标的所有出现）。 还有很多其他有用的替换标志：

空替换标志表示只替换从光标位置开始，目标的第一次出现：

```
:%s/foo/bar
```

`i` 表示大小写不敏感查找，`I` 表示大小写敏感：

```
:%s/foo/bar/i
# 等效于模式中的\c（不敏感）或\C（敏感）
:%s/foo\c/bar
```

`c` 表示需要确认，例如全局查找 `"foo"` 替换为 `"bar"` 并且需要确认：

```
:%s/foo/bar/gc
```

回车后 Vim 会将光标移动到每一次 `"foo"` 出现的位置，并提示

```
replace with bar (y/n/a/q/l/^E/^Y)?
```

按下 `y` 表示替换，`n` 表示不替换，`a` 表示替换所有，`q` 表示退出查找模式， `l` 表示替换当前位置并退出。`^E` 与 `^Y` 是光标移动快捷键，参考： [Vim 中如何快速进行光标移动](https://harttle.land/2015/11/07/vim-cursor.html)。



#### 在选中的文本中替换某个词

在步骤1的情况下,输入`:`, vim会在命令行中自动添加`'<,'>`,这个时候紧跟着在其后输入`s/pattern/word/g`.

```bash
'<,'>s/haha/hehe/g
```

回车结束后,选中文本中所有的haha都会被替换成hehe.

替换的时候,最好还是一个个确认,加上c:

```bash
'<,'>s/haha/hehe/cg
```



### 搜索

#### 在选中的段落中搜索

选中的段落是在视图模式下选中的,然后在搜索命令后添加加搜索目标单词targetWord

```bash
/\%VtargetWord
```

回车结束后,在选中的文本中搜索'hello'这个词.





#### 快速搜索某个变量

光标移到想搜索的那个函数名或变量名上，按`*`就可以搜索了，按`n`下一个，按`N`上一个

##### 示例

快速查询变量定义的位置

* 先在这个变量上按下`*`键
* 按`gg`回到首行
* 按`n`到下一个它出现的位置
* 按`zz`调整到屏幕中间,便于查看





### 行级操作

#### 删除一行

`dd`

#### 注释一行

`gcc`   `gc` 是 `go comment`, 两个 c 表示注释一行

#### 左移一行

`<<`

#### 右移一行

`>>`



### 多行操作

1. 光标移到想要删除或注释的第一行
2. 通过左边的相对行号，看一下想操作的最后一行的相对行号n
3. 得出要操作的行数 m = n+1 (因为光标所在那行相当于第0行，所以要+1)
4. 这时就可以用 Vim 的多行操作了，删除一行是 dd, **删除多行是 mdd**; 注释一行是 gcc, **注释多行是 mgcc**, 其他的类推



### 调整光标所在的位置

#### 快速调到某行号

* `:行号数字`
* `行号数字gg`





#### 调整光标所在行在屏幕中的位置

- `zz` 调整光标所在行到屏幕中间 (z 什么意思我也不知道，就硬记吧)
- `zt` 调整光标所在行到屏幕最上方 (t == top)
- `zb` 调整光标所在行到屏幕最下方 (b == bottom)







### 高亮显示搜索项

vscode中通过setting.json设置`vim.hlsearch: true`实现

### 取消高亮

`:noh`

或

`/aaa` 随便输入搜索内容,例如'aaa'





### 复制/粘贴/剪贴

#### 复制

在 vim 中，可以使用 `y` 命令进行复制，输入该命令之后，还需要再输入一个 *motion* 操作符来指定要复制字符、单词、还是行，具体说明如下：

- yw
  复制一个单词 (包括单词后面的空白字符)
- ye
  复制一个单词 (不包括单词后面的空白字符)
- yl
  复制当前光标下的字符
- yh
  复制光标前面的一个字符
- 4yl
  复制当前光标下的字符、以及后面三个字符，总共四个字符
- 4yh
  复制光标前面的四个字符 (不包括当前光标所在的字符)
- yy
  复制当前光标所在的一整行
- 4yy
  复制当前光标所在的行、以及后面三行，总共四行



**复制到空格之前的位置**

* y+E
* y+f+`<space> 或 <tab>`







#### 粘贴

* p(小写) 在光标位置之后粘贴
* P(大写) 在光标位置之前粘贴



### 折叠

> [VS Code VIM 插件高效使用|OhYee 博客](https://www.ohyee.cc/post/note_vim)

- zc 折叠代码块
- zo 展开代码块
- za 切换折叠
- zR 展开所有
- zM 折叠所有



## VSCODE

### 基本配置



### vscode调试vue/react

> https://mp.weixin.qq.com/s/ryBuaX6_KcBVEnd_whk8xw

[第一次使用VS Code时你应该知道的一切配置 - 掘金 (juejin.cn)](https://juejin.cn/post/6844903826063884296)



### 用户设置

```
editor.codeActionsOnSave中的source.organizeImports属性，这个属性能够在保存时，自动调整 import 语句相关顺序，能够让你的 import 语句按照字母顺序进行排列，推荐设置为true,即"editor.codeActionsOnSave": { "source.organizeImports": true }；
```



### 插件推荐

> https://github.com/varHarrie/varharrie.github.io/issues/10



















### 调试vue的步骤

##### 1. 新建`./vscode/launch.json`

##### 2.内容

```json
{
  "configurations": [
    {
      "name": "Launch Chrome",
      "request": "launch",
      "type": "pwa-chrome",
      "url": "http://localhost:8080",
      "sourceMapPathOverrides": {
      	"webpack://test-vue-debug/src/App.vue?11c4 ": "${workspaceRoot}/src/*"
    	}
    }
  ]
}
```

##### 3.webpach设置output

```javascript
output: {
  devtoolModuleFilenameTemplate: 'webpack调试://[resource-path]'
}
```









## 杂项

### 代码分享工具

> [使用 Carbon 和 Polacode 创建代码截图_超级大洋葱806的博客-CSDN博客_polacode怎么截图](https://blog.csdn.net/u014779536/article/details/107309638)

* polacode
* Carbon







## 性能优化

### 资料

> [聊一聊前端性能优化 - 掘金 (juejin.cn)](https://juejin.cn/post/6911472693405548557)
>
> [🔥 2022 前端性能优化最佳实践 - SegmentFault 思否](https://segmentfault.com/a/1190000041753539)






## chrome devtools

























