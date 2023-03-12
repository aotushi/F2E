

## Git

Git 是一款开源免费的分布式的版本控制系统，是一个应用程序

### 资料

> [Git权威指南 — GotGit](https://gotgit.readthedocs.io/en/latest/index.html)



### 作用

版本控制系统在项目开发中作用重大，主要的功能有以下几点

- 代码备份
- 版本回退
- 协作开发
- 权限控制

### 下载安装

下载地址 <https://git-scm.com/>

安装方式与 QQ 安装相同，一路下一步，中间可以设置软件的安装路径



### Linux 常用命令

Linux 是一套开源免费的操作系统。与系统的交互通常用命令来实现，常用的命令有：

- <span style="color:red">ls</span>         查看文件夹下的文件 （list 单词的缩写）   
- <span style="color:red">cd</span>       进入某一个文件夹内 （change directory 缩写） cd .. 回到上一级  <span style="color:red">Tab 键自动补全路径</span>
- clear   清屏（也可以使用 <span style="color:red">ctrl + l </span> 快捷键）
- mkdir  创建文件夹（make directory）
- touch  test.html   创建一个文件
- rm   test.html   删除文件 remove
- rm  dir   -r   删除文件夹 (-r 删除文件夹选项  -f 强制) force 
- mv   test.html  t.html   移动文件，重命名  move  缩写
- cat   test.html  查看文件内容
- ctrl + c 取消命令 (cancel)
- Tab 自动补齐路径
- <span style="color:red">上下方向键</span>，可以查看命令历史 (history 查看所有的历史命令)

Vim 是一款命令行下的文本编辑器，编辑方式跟图形化编辑器不同

* `vim test.html`  编辑文件（文件不存在则创建）
* i    进入编辑模式(i  insert)
* `ESC` + `:wq` 保存并退出
* `ESC` + `:q!` 不保存并退出

![img](D:/0922frontend/习题&笔记/笔记/assets/vim-vi-workmodel.png)

### Git 使用

```js
官方文档:https://git-scm.com/docs
```





### git传输协议

> [通过 https / ssh 协议推拉代码 - Gitee.com](https://gitee.com/help/articles/4238#article-header0)



### 基本介绍

#### .git 目录

![1576587724690](D:/0922frontend/习题&笔记/笔记/assets/1576587724690.png)

* hooks 目录包含客户端或服务端的钩子脚本，在特定操作下自动执行
* info 信息文件夹. 包含一个全局性排除文件，可以配置文件忽略
* logs 保存日志信息
* objects <span style='color:red'>目录存储所有数据内容</span>,本地的版本库存放位置
* refs 目录存储指向数据的提交对象的指针（分支）
* config 文件包含项目特有的配置选项
* description 用来显示对仓库的描述信息
* HEAD 文件指示目前被检出的分支
* index 暂存区文件，是一个二进制文件  (git ls-files)

> 切记： <span style="color:red">不要手动去修改 .git 文件夹中的内容</span>

#### 版本库的三个区域

* 工作区（代码编辑区）
* 暂存区（修改待提交区）
* 仓库区（代码保存区）

![img](https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2469289094,3249956923&fm=26&gp=0.jpg)

#### 空文件夹无法提交

git和 svn不同，仅仅跟踪文件的变动，不跟踪目录。

```HTML
最主流的做法是，在空目录下创建 .gitkeep 或者 .keep 空文件，或者 .gitignore 文件，这只是一个约定俗成的空目录识别文件名，其实除了占位识别空目录
```



#### 关于颜色

* 红色   红色的文件 修改只存在于『工作区』
* 绿色   绿色的文件 此修改存在于『工作区与暂存区』



### 使用配置

#### 本地生成密钥连接远端

[文章来源](https://juejin.cn/post/6844904008163786765)

本地生成密钥是配合版本工具进行开发.一般本地只有一套密钥,但也可以根据不同的邮箱为多个远端生成相应的密钥.

1.**生成SSH-key**

在git中输入以下命令,路径不影响,会在window系统用户文件夹下的`.ssh`文件夹下生成相应密钥.

```cmd
//生成方法1
ssh-keygen -t ed25519 -C 'email@example.com'ssh-keygen -t ed25519 -C "email@example.com"  -f ~/.ssh/gitlab_id_rsa

//生成方法2
ssh-keygen -o -t rsa -b 4096 -C "email@example.com" -f ~/.ssh/gitlab_id_rsa

//以上两种方法加密方式不同
email@example.com 代表注册Gitlab账号时用的邮箱
-f 代表文件名
~/.ssh/ 代表ssh的文件路径
gitlab_id-rsa 代表ssh文件名（可以自定义）
```



2.**远端网站添加SSH-key**

3.**测试密钥**

以`GitHub`为例，在`GitBash`中输入以下的命令

```js
ssh -T git@github.com
//如果连接成功,会显示相应信息.
```





#### 同一电脑配置多个Git公钥

> [一些常用的 Git 进阶知识与技巧 - 知乎 (zhihu.com)](https://zhuanlan.zhihu.com/p/431093836)





[同一台电脑配置Gitee、Github 的 Git SSH公钥](https://blog.csdn.net/u010698107/article/details/113485131)

1.清除git的全局设置

```javascript
//查看全局配置
git config --global --list


//删除全局用户名和邮箱
git config --global --unset user.name
git config --global --unset user.email
```

2.创建ssh key

进入`.ssh`文件夹下, 生成key

```javascript
cd ~/.ssh
ssh-keygen -t rsa -C "xxx@xxx.com" 
//邮件地址为gitee或github使用的邮件地址
```

3.配置github秘钥

```javascript
ssh-keygen -t rsa -C "github使用的邮箱地址"

//设置github的ssh key名称为id_rsa_github
```

4.配置gitee秘钥

```javascript
ssh-keygen -t rsa -C "gitee使用的邮箱地址"
//设置gitee的ssh key保存名称为 id_rsa_gitee
```

5.向github和gitee添加公钥public key

6.创建配置文件,解决ssh冲突

6.1在`.ssh`文件夹下创建config文件

6.2添加内容以区分两个ssh key

```javascript
cd ~/.ssh
vim config

#github
Host github.com
HostName github.com
PreferredAuthentications publickey
IdentityFile ~/.ssh/id_rsa_github

#gitee
Host gitee.com
HostName gitee.com
PreferredAuthentications publickey
IdentityFile ~/.ssh/id_rsa_gitee
```

7.测试链接是否正常

```javascript
ssh -T git@github.com

ssh -T git@gitee.com
```





#### 使用个人令牌方法访问github

**背景**

> 在2021年8月停止使用账号和密码的方式访问github仓库，改为token认证的方式。

**token获取方式**

> setting-->Developer settings-->Personal access tokens--> Generate new token

**本地已有仓库更改密码为token**

> git config --local user.password token    //--local含义为只设置当前仓库的密码 --global就是设置全局的密码





#### 起始配置用户名和邮箱

第一次使用 Git 的时候，会要求我们配置用户名和邮箱，用于表示开发者的信息

```
git config --global user.name "Your Name" 

git config --global user.email "email@example.com" 
```

> 注意命令之间的空格

可以使用 `git config -l `命令来查看配置信息



#### 代理配置

##### HTTP

运行git config之后,可以看到options信息. 在config file location中可以看到又global,system,local,blob等关键字及解释.

global 即是读/写当前用户全局的配置文件(~/.gitconfig 文件，属于某个计算机用户).  --glboal 选项指的是修改 Git 的全局配置文件 ~/.gitconfig，而非各个 Git 仓库里的配置文件 .git/config。protocol 指的是代理的协议，如 http，https，socks5 等。port 则为端口号。

system 即是读写系统全局的配置文件(/etc/gitconfig 文件，属于计算机)

local 即是当前 clone 仓库 的配置文件(位于 clone 仓库下 .git/config)

```js
https://ericclose.github.io/git-proxy-config.html

//查看全局的http https代理 get前面好像没有横线
git config --global --get http.proxy
git config --global --get https.proxy



#http代理
// 设置HTTP 代理 针对所有域名
git config --global http.proxy http://127.0.0.1:1080
git config --global https.proxy http://127.0.0.1:1080

// 设置Socks5 代理
git config --global http.proxy socks5://127.0.0.1:1080
git config --global https.proxy socks5://127.0.0.1:1080
这里的 socks5 仅仅是代理使用的协议，它依然是针对 http 设置的，所以仅对 http 协议的仓库有效。使用 git@xxx 这种 ssh 连接的不会使用代理。

//域名代理  git config –global http.url.proxy protocol://127.0.0.1:port Git 不认 https.proxy ，设置 http.proxy 就可以支持 https 了。

git config --global http.https://github.com.proxy http://127.0.0.1:1080


//取消http https代理
git config --global --unset http.proxy
git config --global --unset https.proxy
```



##### SSH

```js
在这种情况下，Git 依靠 ssh 处理连接； 为了通过代理进行连接，您必须配置 ssh 本身，在 ~/.ssh/config 文件中设置 ProxyCommand 选项。Linux 和 macOS 是通过 nc 来执行 ProxyCommand 的，Windows 下则是通过 connect。

//https代理
1.编辑 ~/.ssh/config文件
2.文件添加如下内容
 Host github.com
 	User git
  ProxyCommand connect -H 127.0.0.1:7890 %h %p


Host 后面 接的 github.com 是指定要走代理的仓库域名。
在 ProxyCommand 中，Windows 用户用的是 connect 。
-H 选项的意思是 HTTP 代理。
在调用 ProxyCommand 时，％h 和 ％p 将会被自动替换为目标主机名和 SSH 命令指定的端口（ %h 和 %p 不要修改，保留原样即可）。

//socks5代理
1.编辑 ~/.ssh/config 文件
vim ~/.ssh/config

2.给文件加上如下内容：
Host github.com
    User git
    ProxyCommand connect -S 127.0.0.1:7891 %h %p


解释：
Host 后面 接的 github.com 是指定要走代理的仓库域名。
在 ProxyCommand 中，Windows 用户用的是 connect。
单独的 -S 选项指的就是 socks5 代理
在调用 ProxyCommand 时，％h 和 ％p 将会被自动替换为目标主机名和 SSH 命令指定的端口（ %h 和 %p 不要修改，保留原样即可）。
```





#### 使用ssh或https方式pull/push

```js
//https://www.cnblogs.com/zhoumiao/p/10493403.html

切换成https访问
git remote set-url origin https://...

切换成ssh方法
git remote set-url origin git@...
```



#### 查看本机ssh key公钥

```js
cat ~/.ssh/id_rsa.pub
```



#### 远程仓库

```js
//显示所有远程仓库
git remote -v

//添加远程版本库
git remote add [shortname][url] //shortname为本地的版本库: git rmeote add origin git@github.com:..

//删除远程仓库
git remote rm name

//修改远程仓库名称
git remote rename old_name new_name
```







#### 配置忽略文件.gitigonre

.gitignore 可以在子文件夹下创建

##### 仓库中没有提交该文件

项目中有些文件不应该存储到版本库中，Git 中需要创建一个文件 『.gitignore』 配置忽略，一般与 .git 目录同级。

常见情况有：

1. 临时文件.     
2. 多媒体文件，如音频，视频
3. 编辑器生成的配置文件  (.idea)
4. npm 安装的第三方模块

```js
//以#开始的行,被视为注释

//忽略所有的 .idea 文件夹
.idea
//忽略所有以 .test 结尾的文件
*.test
//忽略 node_modules 文件和文件夹 斜杠加不加都可以
/node_modules

//忽略掉所有文件名是foo.txt的文件
foo.txt

//忽略所有生成的html文件,除了foo.html
*.html
!foo.html

//忽略所有.o和.a文件
*.[oa]
```





##### 仓库中已经提交该文件
不推荐
```js
//1.对于已经加入到版本库的文件，可以在版本库中删除该文件
git rm --cached .idea

//然后在 .gitignore 中配置忽略
.idea

//最后
add  和 commit 提交即可
```

[推荐](https://blog.csdn.net/NEWCIH/article/details/121989006)
```bash
git update-index --assume-unchanged 文件名

git update-index --assume-unchanged *.obsidian
```
如果你需要重新追踪该文件夹，你可以使用 `git update-index --no-assume-unchanged <file_or_folder>` 命令。





### 基本操作

#### 初始化及提交

Git 的起始操作包括以下几个步骤

1. 创建并进入空文件夹
2. 右键 -> 点击 Git Bash Here 启动命令行
3. `git init` 仓库初始化
4. 创建一个初始化文件 index.html
5. `git add index.html` 将文件加入到暂存区
6. `git commit -m '注释'`   提交到仓库  m 是 message 单词的缩写





#### 查看暂存区文件

```git
git ls-files
```





#### 常用命令

```js
- git status 版本状态查看 
- git add -A 添加所有新文件到暂存区
- git commit -m '注释 ' 提交修改并注释
- git diff  查看工作区与暂存区的差异（不显示新增文件） 显示做了哪些修改
- git diff --cached 查看暂存区与仓库的差异

```



```bash
git checkout -b branchName

git add .

git commit -m 'xxx'

git checkout master

git merget branchName

git pull

git push
```







#### 状态查看

git status 查看当前 Git 仓库的状态

#### 常见状态

```
On branch master    在 master 分支上
nothing to commit, working tree clean  没有什么需要提交, 工作树是干净的
```

工作区的所有的修改都已经提交

```
Untracked files:    未跟踪的文件(新的文件)
  (use "git add <file>..." to include in what will be committed)
        cart.html   
```

有新增文件

```
Changes to be committed:  以下修改将会被提交
  (use "git restore --staged <file>..." to unstage)
        new file:   cart.html
```

暂存区有新的修改, 可以使用 git commit 命令进行提交

```
Changes not staged for commit:  为登上舞台修改提交
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
        modified:   app.css
        modified:   app.js
```

在工作区对这几个文件进行了内容修改.



### git命令

#### 历史版本回滚

> HEAD指向的版本就是当前的版本,因此git允许我们在版本的历史之间穿梭.
>
> 使用git log查看提交历史,查询需要返回的版本的id
>
> 版本回退之后,需要再次回到回退前,可以使用git reflog查看命令历史, 里面会有需要的版本id

#### 版本回滚的[3种情况](https://blog.csdn.net/weixin_43410419/article/details/84672111):

#### 1.明确知道回退到第几个版本

```js
回到上一个版本: git reset --hard HEAD
回到上上一个版本: git reset --hard HEAD^^
回到20个版本之前: git reset --hard HEAD~20
```

#### 2. 回退版本不确定

```js
1.使用git log 查看每次的提交记录
2.借助id来回退
git reset --hard commit_id  //id可以只简写为前7位. 返回某个节点,不保留修改.

git commit之后,撤销commit提交,却保留代码:
git reset --soft HEAD^ //HEAD^是上一个版本,也可以写成HEAD~1
```

#### 3. 回退到某个文件之后,又需要返回最近更新的某个版本

```js
1. git reflog 查看每一次命令记录
2. git reset --hard commit_id 返回相应的版本
```

#### 4.放弃所有本地修改

```js
git checkout . //在add之前使用,撤销所有的更改. 在add之后使用,无效.
```











#### 分支

分支是 Git 重要的功能特性之一，开发人员可以在主开发线的基础上分离出新的开发线。branch

#### 基本介绍

```js
//为什么使用分支? https://blog.csdn.net/IAlexanderI/article/details/83239459
本来在master分支上开发的,如果我每实现一个小的功能,就进行一次commit的话?那么分支上不就有很多的commit的吗?推送上去,您会看见服务器上有很多不必要的提交,这样子就不简洁了,版本历史也不清楚.但是使用分支,完成一个完整的功能,然后主分支使用 git merge --squash branchName 合并分支,做一个整的提交推送,那么服务器上的历史只有这一个commit的了,这不就简洁了吗?
    

```



#### 基本操作

| 序号 | 参数                   | 描述                            |
| ---- | ---------------------- | ------------------------------- |
| 1    | git branch             | 查看分支                        |
| 2    | git branch name        | 新建分支,其中name为分支名称     |
| 2.5  | git checkout -b name   | 创建并切换分支                  |
| 3    | git checkout name      | 切换到name分支                  |
| 4    | git merge name         | 合并name分支到当前分支          |
| 5    | git branch -d name     | 删除name分支                    |
| 6    | git push -u name:name1 | 提交本地分支name到远程分支name1 |
| 7    | git log                | 查看commit日志                  |

##### 创建分支

name 为分支的名称

```sh
git branch name   
```

查看分支

```sh
git branch
```

##### 切换分支

```sh
git checkout name
```

##### 合并分支 //

```sh
git merge name 需要在主分支下合并
```

##### 删除分支

```sh
git branch -d name
```

##### 创建并切换分支

```sh
git checkout -b name   
```

> 注意:  <span style="color:red;font-weight:bold">每次在切换分支前 提交一下当前分支</span>



```HTML
- git仓库在切换分支前要做好初始化提交
- git仓库不能嵌套
- 分支在合并完毕之后,内容是会保留的
```



#### 冲突

当多个分支修改同一个文件后，合并分支的时候就会产生冲突。冲突的解决非常简单，『将内容修改为最终想要的结果』，然后继续执行 git add 与 git commit 就可以了。

1.定位产生冲突的文件(git status/目录结尾显示merging)

2.修改冲突文件的内容为最终想要的结果

3.git add -A 和 git commit

如何查看冲突: git status或者是目录最后是否出现merging



仓库不能嵌套.在外层使用git命令会报错,内层不会报错.

分支在合并完之后,内容会是保留的



#### revert commit 与 reset commit

Revert 的指令是**再做一个新的 Commit，来取消你想要撤回的 Commit, 所以会增加一条commit**

在[SourceTree](https://so.csdn.net/so/search?q=SourceTree&spm=1001.2101.3001.7020)中，如果想取消已经commit的code，**可以右击选reverse commit.（撤回 老commit的同时，新建了一个commit)**

如果想撤回[commit](https://so.csdn.net/so/search?q=commit&spm=1001.2101.3001.7020)又不想新加一个commit的话，不要用reverse commit，**而是用Reset 指令**



#### reset rebase  revert的区别

| 指令   | 改变历史记录 | 使用场景                                                     |
| ------ | ------------ | ------------------------------------------------------------ |
| reset  | 是           | 把目前的状态设定成某个指定的 Commit的状态，通常适用于尚未推出去的 Commit。 |
| rebase | 是           | 不管是新增、修改、删除Commit 都相当方便，用来整理、编辑没有推出去的 Commit 相当方便，但通常也只适用于尚未推出去的 Commit。 |
| revert | 是           | 新增一个Commit 来取消另一个Commit 的內容，原本的 Commit 依旧会保存在历史记录中。虽然会因此而增加 Commit 数，但通常比较适用于已经推出去的 Commit，或是不允许使用 Reset 或 Rebase 之修改历史记录的指令的场合。 |



#### 合并rebase

> [【Git】rebase 用法小结 - 简书 (jianshu.com)](https://www.jianshu.com/p/4a8f4af4e803)

rebase的作用简要概括为：可以对某一段线性提交历史进行编辑、删除、复制、粘贴；因此，合理使用rebase命令可以使我们的提交历史干净、简洁！

但是需要注意的是：

> 不要通过rebase对任何已经提交到公共仓库中的commit进行修改（你自己一个人玩的分支除外）



##### 具体操作

当我们在本地仓库中提交了多次，在我们把本地提交push到公共仓库中之前，为了让提交记录更简洁明了，我们希望把如下分支B、C、D三个提交记录合并为一个完整的提交，然后再push到公共仓库。

![](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2018/5/2/1631fdf49c54c568~tplv-t2oaga2asx-zoom-in-crop-mark:3024:0:0:0.awebp)

现在我们在测试分支上添加了四次提交，我们的目标是把最后三个提交合并为一个提交

![](https://upload-images.jianshu.io/upload_images/2147642-ce849c4eab3d803b.png?imageMogr2/auto-orient/strip|imageView2/2/w/434/format/webp)



这里我们使用命令

```bash
git rebase -i [startpoint] [endpoint]
```

`-i`的意思是`--interactive`，即弹出交互式的界面让用户编辑完成合并操作.

`[startpoint] [endpoint]`则指定了一个编辑区间，如果不指定`[endpoint]`，则该区间的终点默认是当前分支HEAD所指向的commit(注：该区间指定的是一个前开后闭的区间)。 

在查看到了log日志后，我们运行以下命令：

```bash
git rebase -i 36224db
```

或者

```bash
git rebase -i HEAD~3
```

然后我们会看到如下界面:

![](https://upload-images.jianshu.io/upload_images/2147642-03d48aa767efb307.png?imageMogr2/auto-orient/strip|imageView2/2/w/647/format/webp)



上面未被注释的部分列出的是我们本次rebase操作包含的所有提交，下面注释部分是git为我们提供的命令说明。每一个commit id 前面的pick表示指令类型，git 为我们提供了以下几个命令:

```bash
pick：保留该commit（缩写:p）

reword：保留该commit，但我需要修改该commit的注释（缩写:r）

edit：保留该commit, 但我要停下来修改该提交(不仅仅修改注释)（缩写:e）

squash：将该commit和前一个commit合并（缩写:s）

fixup：将该commit和前一个commit合并，但我不要保留该提交的注释信息（缩写:f）

exec：执行shell命令（缩写:x）

drop：我要丢弃该commit（缩写:d）
```

根据我们的需求，我们将commit内容编辑如下:

![](https://upload-images.jianshu.io/upload_images/2147642-a651234e62ed20a5.png?imageMogr2/auto-orient/strip|imageView2/2/w/536/format/webp)



上面的意思就是把第二次、第三次提交都合并到第一次提交上

然后`wq`保存退出后是注释修改界面:

![](https://upload-images.jianshu.io/upload_images/2147642-44bbd784dcadfb31.png?imageMogr2/auto-orient/strip|imageView2/2/w/801/format/webp)

可以再浏览态 按下两个dd可以删除一行

最终的编辑效果如下：

![](https://upload-images.jianshu.io/upload_images/2147642-334e0a5c47a24f87.png?imageMogr2/auto-orient/strip|imageView2/2/w/448/format/webp)

编辑完保存即可完成commit的合并了：













### 最佳实践

#### commit信息

> [How to Write a Git Commit Message (cbea.ms)](https://cbea.ms/git-commit/?continueFlag=5736f6f7a67304664b0f56b2e45e0238)



**The seven rules of a great Git commit message**

* Separate subject from body with a blank line
* Limit the subject line to 50 characters
* Capitalize the subject line 
* Do not end the subject line with a period(标点)
* Use the imperative mood(祈使语气) in the subject line
* Wrap the body at 72 characters
* Use the body to explain what and why vs. how

```yaml
SUBJECT LINE COMMENT (LESS THAT 50 CHARACTERS)
// blank line
body line(less that 72 characters)
//

```





#### 前端工程化下git提交规范

> [代码规范 | 带你入门前端工程 (gitee.io)](https://woai3c.gitee.io/introduction-to-front-end-engineering/02.html#扩展)

git 规范一般包括两点：分支管理规范和 git commit 规范。



#### 分支管理规范

一个项目可以创建两个分支：master 和 dev。master 对应线上分支，不能直接在 master 分支上写代码，开发时需要从 master 上拉一个 dev 分支进行开发。



**开发新功能**

当团队成员开发新功能时，需要从 dev 上拉一个 `feature-功能名称-开发姓名` 分支进行开发，例如：`feature-login-tgz`。开发完成后需要合并回 dev 分支。

**修改bug**

当团队成员修改 bug 时，需要从有 bug 的分支（环境）上拉一个 `bug-功能名称-开发姓名` 分支进行修复，例如：`bug-login-tgz`。修复完成后需要合并回原来出现 bug 的分支。

以 `feature` 或 `bug` 开始的分支都属于临时分支，在通过测试并上线后需要将临时分支进行删除。避免 git 上出现太多无用的分支。

**合并分支**

在将一个分支合并到另一个分支时（例如将 `feature-*` 合并到 dev），需要查看自己的新分支中有没有多个重复提交或意义不明的 commit。如果有，则需要对它们进行合并（git rebase）。示例：

```bash
# 这两个 commit 可以合并成一个
chore: 修改按钮文字
chore: 修改按钮样式

# 合并后
chore: 修改按钮样式及文字
```

**注意**：在将 `feature-*` 合并到 dev 时，需要先将 dev 分支合并到 `feature-*` 分支，然后再将 `feature-*` 合并到 dev 分支，避免出现代码冲突的情况。同理，合并 `bug-*` 分支也一样。  ????

**部署**

当 dev 分支通过测试后，就可以合并到 master 进行发布了



**发布可能出现的意外情况**

举个例子，假设程序要新增 a、b 两个功能，我们的操作流程是这样的：

1. 从 dev 分支拉两个新分支 `feature-a-tgz`、`feature-b-tgz`。
2. 开发完成合并回 dev。
3. dev 测试完毕后，合并到 master 进行发布。

如果这时突然被告知 b 功能不上，只上 a 功能。我们可以将 `feature-a-tgz` 分支重新部署到测试环境，这样就不用做任何的代码回滚。只要 `feature-a-tgz` 分支测试通过就可以直接合到 master 进行线上发布。



#### git commit提交规范

 commit message 的格式：

```bash
<type>(<scope>): <subject>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```

commit message 分为三个部分(使用空行分割):

1. 标题行（subject）: 必填, 描述主要修改类型和内容。
2. 主题内容（body）: 描述为什么修改, 做了什么样的修改, 以及开发的思路等等。
3. 页脚注释（footer）: 可以写注释，放 BUG 号的链接。

scope

commit message 影响的功能或文件范围, 比如: route, component, utils, build...

[subject](https://woai3c.gitee.io/introduction-to-front-end-engineering/02.html#subject)

commit message 的概述

[body](https://woai3c.gitee.io/introduction-to-front-end-engineering/02.html#body)

具体修改内容, 可以分为多行.

[footer](https://woai3c.gitee.io/introduction-to-front-end-engineering/02.html#footer)

一些备注, 通常是 BREAKING CHANGE 或修复的 bug 的链接





commit 的类型：

- feat: 新功能、新特性
- fix: 修改 bug
- perf: 更改代码，以提高性能（在不影响代码内部行为的前提下，对程序性能进行优化）
- refactor: 代码重构（重构，在不影响代码内部行为、功能下的代码修改）
- docs: 文档修改
- style: 代码格式修改, 注意不是 css 修改（例如分号修改）
- test: 测试用例新增、修改
- build: 影响项目构建或依赖项修改
- revert: 恢复上一次提交
- ci: 持续集成相关文件修改
- chore: 其他修改（不在上述类型中的修改）
- release: 发布新版本

#####  约定式提交规范

以下内容来源于：https://www.conventionalcommits.org/zh-hans/v1.0.0-beta.4/

- 每个提交都必须使用类型字段前缀，它由一个名词组成，诸如 `feat` 或 `fix` ，其后接一个可选的作用域字段，以及一个必要的冒号（英文半角）和空格。
- 当一个提交为应用或类库实现了新特性时，必须使用 `feat` 类型。
- 当一个提交为应用修复了 `bug` 时，必须使用 `fix` 类型。
- 作用域字段可以跟随在类型字段后面。作用域必须是一个描述某部分代码的名词，并用圆括号包围，例如： `fix(parser):`
- 描述字段必须紧接在类型/作用域前缀的空格之后。描述指的是对代码变更的简短总结，例如： `fix: array parsing issue when multiple spaces were contained in string.`
- 在简短描述之后，可以编写更长的提交正文，为代码变更提供额外的上下文信息。正文必须起始于描述字段结束的一个空行后。
- 在正文结束的一个空行之后，可以编写一行或多行脚注。脚注必须包含关于提交的元信息，例如：关联的合并请求、Reviewer、破坏性变更，每条元信息一行。
- 破坏性变更必须标示在正文区域最开始处，或脚注区域中某一行的开始。一个破坏性变更必须包含大写的文本 `BREAKING CHANGE`，后面紧跟冒号和空格。
- 在 `BREAKING CHANGE:` 之后必须提供描述，以描述对 API 的变更。例如： `BREAKING CHANGE: environment variables now take precedence over config files.`
- 在提交说明中，可以使用 `feat` 和 `fix` 之外的类型。
- 工具的实现必须不区分大小写地解析构成约定式提交的信息单元，只有 `BREAKING CHANGE` 必须是大写的。
- 可以在类型/作用域前缀之后，: 之前，附加 `!` 字符，以进一步提醒注意破坏性变更。当有 `!` 前缀时，正文或脚注内必须包含 `BREAKING CHANGE: description`



#### commit实例

##### fix（修复BUG）

每次 git commit 最好加上范围描述。

例如这次 BUG 修复影响到全局，可以加个 global。如果影响的是某个目录或某个功能，可以加上该目录的路径，或者对应的功能名称。

```js
// 示例1
fix(global):修复checkbox不能复选的问题
// 示例2 下面圆括号里的 common 为通用管理的名称
fix(common): 修复字体过小的BUG，将通用管理下所有页面的默认字体大小修改为 14px
// 示例3
fix(test): value.length -> values.length
```

##### [#](https://woai3c.gitee.io/introduction-to-front-end-engineering/02.html#feat-添加新功能或新页面)feat（添加新功能或新页面）

```js
feat: 添加网站主页静态页面

这是一个示例，假设对任务静态页面进行了一些描述。
 
这里是备注，可以是放 BUG 链接或者一些重要性的东西。
```

##### [#](https://woai3c.gitee.io/introduction-to-front-end-engineering/02.html#chore-其他修改)chore（其他修改）

chore 的中文翻译为日常事务、例行工作。顾名思义，即不在其他 commit 类型中的修改，都可以用 chore 表示。

```js
chore: 将表格中的查看详情改为详情
```

其他类型的 commit 和上面三个示例差不多，在此不再赘述。



#### 验证git commit规范

利用 [git hook (opens new window)](https://git-scm.com/book/zh/v2/自定义-Git-Git-钩子)能在特定的重要动作发生时触发自定义脚本。

验证 git commit 规范也不例外，我们需要通过 git 的 `pre-commit` 钩子函数来进行。当然，你还需要下载一个辅助插件 husky 来帮助你进行验证。

> pre-commit 钩子在键入提交信息前运行，它用于检查即将提交的快照。

husky 是一个开源的工具，使用它我们可以在 `package.json` 里配置 `git hook` 脚本。下面让我们看一下如何使用：

下载

```bash
npm i -D husky
```

在package.json中加上下面的代码

```json
"husky": {
  "hooks": {
    "pre-commit": "npm run lint",
    "commit-msg": "FORCE_COLOR=1 node script/verify-commit.js",
    "pre-push": "npm test"
  }
}
```

然后在你项目根目录下新建一个文件夹 `script`，并在下面新建一个文件 `verify-commit.js`，输入以下代码：

```javascript
const chalk = require('chalk')

const msgPath = process.env.HUSKY_GIT_PARAMS
const userEmail = process.env.GIT_AUTHOR_EMAIL
const msg = require('fs')
.readFileSync(msgPath, 'utf-8')
.trim()

const commitRE = /^(feat|fix|docs|style|refactor|perf|test|workflow|build|ci|chore|release|workflow)(\(.+\))?: .{1,80}/

if (!commitRE.test(msg)) {
    console.log()
    console.error(
    `  ${chalk.bgRed.white(' ERROR ')} ${chalk.red(
        '不合法的 commit 消息格式',
    )}\n\n`
        + chalk.red(
            '  请使用正确的提交格式:\n\n',
        )
        + `    ${chalk.green('feat: add \'comments\' option')}\n`
        + `    ${chalk.green('fix: handle events on blur (close #28)')}\n\n`
        + chalk.blue('  请查看 git commit 提交规范：https://github.com/woai3c/Front-end-articles/blob/master/git%20commit%20style.md。\n'),
    )

    process.exit(1)
}
```



现在来解释下各个钩子的含义：

1. `"pre-commit": "npm run lint"`，在 `git commit` 前执行 `npm run lint` 检查代码格式。
2. `"commit-msg": "node script/verify-commit.js"`，在 `git commit` 时执行脚本 `verify-commit.js` 验证 commit 消息。如果不符合脚本中定义的格式，将会报错。
3. `"pre-push": "npm test"`，在你执行 `git push` 将代码推送到远程仓库前，执行 `npm test` 进行测试。如果测试失败，将不会执行这次推送。

通过工具，我们可以很好的管理团队成员的 git commit 格式，无需使用人力来检查，大大提高了开发效率。



#### lint-staged

使用 `lint-staged` 可以只对 git 暂存区上的文件进行校验，不需要对所有的文件进行 lint 检查。

安装

```bash
npm i -D lint-staged
```

将原来 `package.json` 文件中的代码：

```json
"husky": {
  "hooks": {
    "pre-commit": "npm run lint",
    "commit-msg": "node script/verify-commit.js",
    "pre-push": "npm test"
  }
},
```

改为

```bash
"husky": {
  "hooks": {
    "pre-commit": "lint-staged",
    "commit-msg": "node script/verify-commit.js",
    "pre-push": "npm test"
  }
},
"lint-staged": {
  "src/**/*.{js,jsx,ts,tsx}": "eslint",
  "test/**/*.{js,jsx,ts,tsx}": "eslint"
},
```

文件过滤说明：

```javascript
{
    "*.js": "项目下所有的 js 文件（不包含子文件夹）",
    "**/*.js": "项目下所有的 js 文件",
    "src/*.js": "src 目录所有的 js 文件（不包含子文件夹）",
    "src/**/*.js": "src 目录所有的 js 文件"
}
```

多个后缀匹配：

```json
"lint-staged": {
    "src/**/*.{js,jsx,ts,tsx}": "eslint",
  },
```





#### 修改最近一次的提交信息

git 的版本管理思路，十分简单：使用一个类似链表的结构，将每次修改记录串联起来。每次提交都会产生一个 SHA1 的唯一标示符，我们可以利用 git 提供的命令行工具对“链表”中的每次修改进行编辑、删除、插入、移动等等多种操作。

> [git 常用技巧 | 小胡子哥的个人网站 (barretlee.com)](https://www.barretlee.com/blog/2018/11/26/git-常用技巧/)

下面是一个提交了 4 次的分支效果，每个节点的意思是 `节点名(commit 信息 - SHA1)`：

```
A(add A - 510fdc) -> B(add B - 0406b6) -> C(add C - 39a9c2) -> D(add D - 3131e0)<当前>
```

将上次提交的信息（add D），修改为 `push D`，可以通过 commit 的 amend 指令进行修改，如下：

```bash
git commit --amend
# 执行命令后，会进入到一个交互窗口，可以在交互窗口内修改上次的提交信息
```



#### 利用rebase对提交进行各种修改

rebase 的常用操作分为这么几步：

1. 选择操作的起点位置，`git rebase -i SHA1`
2. 指定每个节点的操作方式，`保留/删除/修改/...`，进入操作
3. 进入下一步操作/终止操作，`git rebase --continue`，`git rebase --abort`

比如我们要将节点 B 的 commit 信息（add B），修改为 `push B`，那么按照上述的操作指南，可以执行（**第一步**）：

```bash
# 第一步，进入 B 之前的节点，A
git rebase -i 510fdc # 510fdc 是 A 节点的 SHA1
```

此时会进入一个交互窗口，内容大致为：

```bash
pick B 0406b6
pick C 39a9c2
pick D 3131e0
```

**你需要看懂这个结构**。由于我们将操作指针指向了 A，所以它会展示 A 以后的所有提交记录，根据链表顺序排列，依次展示节点 B、C、D，前面的一个英文单词是操作指令，总共有这么几种指令：

- `pick`，保留节点，不做任何变更
- `edit`，保留节点，修改内容
- `drop`，删除节点，删除本次提交
- `reword`，保留节点，修改提交信息
- `squash`，保留节点修改，并且与上一个节点合并，也就是两次提交并做一次
- `fixup`，保留节点修改，忽略本次提交信息
- `exec`，run command (the rest of the line) using shell



用的比较多的是前三个，可以只关注前三个。我们需要修改下交互窗口的内容，改为（**第二步**）：

```bash
+ edit B 0406b6
- pick B 0406b6
pick C 39a9c2
pick D 3131e0
```

上面是 diff，实际内容是：

```bash
edit B 0406b6
pick C 39a9c2
pick D 3131e0
```

此时会进入一个临时 git 分支，大致是这样：

```bash
branch(0406b6):
```

由于你告诉了 git 要对 B 节点就行修改，所以它就停在了 B 处理，等着你修改，此时，你可以通过 amend 命令修改提交信息：

```bash
branch(0406b6): git commit --amend
# 进入交互窗口，将 commit 信息修改为 push B
```

操作完成后，执行（**第三步**）：

```bash
git rebase --continue
```

由于你告诉 git 只需要操作一个节点，所以它会回到最初的位置<当前>，否则的话，它会继续进入下一个临时 git 分支。当然，如果你进入第三步以后，突然又不想修改了，可以执行：

```bash
git rebase --skip
```

跳过对本节点的修改。



#### 将一个分支合并到另一个分支

通过 `git cherry-pick SHA1` 这个指令可以可以完成目标，

```bash
master: A(add A - 510fdc) -> B(add B - 0406b6) -> C(add C - 39a9c2)<当前>
                                     \
dev:                             D(add D - 4569c2) -> E(add E - 087342)
```

如果我们想把 dev 分支 D 节点的修改合并到 master 分支，可以执行：

```bash
# 首先确保自己在 master 分支上，git branch master
git cherry-pick 4569c2 # 4569c2 为 D 节点的 SHA1
```



#### 快速定位一个bug在哪次修改上

假设我们在本地提交了一堆 commit，正准备 push 到仓库之前，发现有一个 bug，但是记不起来是哪一次 commit 造成的了，怎么办？我们需要通过 `reset/rebase/stash` 等操作回滚到上一个状态进行测试，但是这样会很麻烦，而且效率不一定很高，git 为我们提供了更加便捷的工具 `git bisect`，通过二分法找 bug。它提供的命令也很直白：

```bash
git bisect start                 # 进入二分查找
git bisect good [good-commit-id] # 设置没问题的版本 SHA1，排查起点
git bisect bad [bad-commit-id]   # 设置有问题的版本 SHA1，排查终点
# 此时 git 就会自动进入到中间版本状态
```

进入中间版本状态，测试后，如果有问题，就标记为 bad，如果没有问题，就标记为 good，如下：

```bash
git bisect bad  # 有问题
git bisect good # 没问题
```

当你找到问题以后，可以执行 reset 回到初始状态：

```bash
git bisect reset
```

然后通过上面介绍的 rebase edit 操作对错误分支进行修改。



## GitHub

### 介绍

GitHub 是一个 Git 仓库管理网站。可以创建远程中心仓库，为多人合作开发提供便利。

企业中使用的中心仓库大概率不是github,也可能不是码云.公司会搭建属于自己的Git中心仓库服务.

GitLab是一个软件,可以用来搭建类似与github的服务.

### 使用流程



#### 命令介绍

```js
- remote命令
git remove命令是对远程仓库'别名'进行管理
add 添加
origin 原始的起源 别名

 - 删除别名 remove
git remote remove 别名

 - 重命名
 git remote rename one two 把one改为two
 
- Linux命令使用技巧,获取命令帮助
 - 使用-h. 例如git remote -h
 - 使用--help. 两个可以配合使用,一方无法使用使用另一方


# 分支重命名
将当前分支的名称改为main
git branch -M main

# 推送命令
git push -u origin main

git push将本地仓库的[某个分支]推送到远端的仓库的某个分支
- origin 远端仓库的URL的别名(与远端仓库的URL等效的)
- main 本地仓库的分支名
- -u 设置分支的关联
  - 第一次推送时加-u之后,后续再次提交该分支,则不需要再写[别名与分支名]

# 代码推送
git push origin main
 - origin 远端仓库的别名
 - main 要更新的远端仓库的分支名

- 推送之前要先执行一次git pull(下载到本地的和现在云端的内容不一致,已有其他方的提交)

# 代码强制推送
git push -f origin main(或是master)


- github操作指导
…or create a new repository on the command line
echo "# one" >> README.md
git init
git add README.md
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/aotushi/one.git
git push -u origin main
                
…or push an existing repository from the command line
git remote add origin https://github.com/aotushi/one.git
git branch -M main
git push -u origin main
```

#### 推送仓库步骤

```HTML
1.本地创建一个仓库, 并做提交
2.github上创建仓库
3.运行命令推送
 - 3.1 git remote add origin URL
 - 3.2 git branch -M main
 - 3.3 git push -u origin main


如果出现报错:hint: Updates were rejected because the tip of your current branch is behind...

可以强制推送: git push -f origin main

```



#### git clone仓库速度太慢的解决方法

来源:[知乎](https://www.zhihu.com/question/27159393)

1.使用镜像域名

只需要将 [www.github.com](https://link.zhihu.com/?target=http%3A//www.github.com/)/后面为代码库 改为[www.github.com.cnpmjs.org/后面为代码库地址](https://link.zhihu.com/?target=http%3A//xn--www-c88d846h.github.com.cnpmjs.org/%E5%90%8E%E9%9D%A2%E4%B8%BA%E4%BB%A3%E7%A0%81%E5%BA%93%E5%9C%B0%E5%9D%80) 

2.使用代理



GitHub 远程仓库使用流程较为简单，主要有以下几种场景：

#### <span style="color:red">本地有仓库</span>

1. 注册并激活账号

2. 创建仓库

3. 获取仓库的地址

4. 本地配置远程仓库的地址

   ```shell
   git remote add origin https://github.com/xiaohigh/test2.git  
   //远端仓库管理   弗拉基米尔·伊里奇·乌里扬诺夫
   add  添加
   origin 远端仓库的别名
   https://github.com/xiaohigh/test2.git    仓库地址
   
   ```

5. 本地提交（确认代码已经提交到本地仓库）

6. 将本地仓库内容推送到远程仓库

   ```shell
   git push -u origin master
   //
   push 推送
   -u   关联, 加上以后,后续提交时可以直接使用 git push
   origin 远端仓库的别名
   master 本地仓库的分支
   ```



#### git本地分支关联远程仓库分支

```js
git pull origin develop
获取远程仓库中 develop 分支上的 commits，然后把origin/develop merge 到你目前 checkout 下来的分支中

```



#### <span style="color:red">本地没有仓库</span>

1. 注册并激活账号

2. 克隆仓库

   ```shell
   git clone https://github.com/xiaohigh/test2.git 
   ```

3. 增加和修改代码

4. 本地提交

   ```shell
   git add -A
   git commit -m 'message'
   ```

5. 推送到远程

   ```shell
   git push origin master
   ```

> 克隆代码之后， 本地仓库会默认有一个远程地址的配置， 名字为 origin

#### <span style="color:red">多人合作</span>

##### 账号仓库配置

GitHub 团队协作开发也比较容易管理，可以创建一个组织

- 首页 -> 右上角 `+` 号-> new Organization
- 免费计划
- 填写组织名称和联系方式（不用使用中文名称）
- 邀请其他开发者进入组织（会有邮件邀请）

* 点击组织右侧的 settings 设置
* 左侧 Member privileges
* 右侧 Base permissions 设置 write 👌

##### 协作流程

第一次

* 得到 Git 远程仓库的地址和账号密码

* 将代码克隆到本地（地址换成自己的）

  ```shell
  git clone https://github.com/xiaohigh/test.git
  
  - 第二种写法
  git clone https://github.com/xiaohigh/test.git 文件夹名称
  ```

* 切换分支

  ```
  git checkout -b xiaohigh //命名规则:自己名字/当前开发功能命名
  ```

* 开发代码

* 本地提交

  ```shell
  git add -A
  git commit -m '注释内容'
  ```

* 合并分支

  ```shell
  git checkout master  //切换到主分支之下
  git merge xiaohigh
  ```

* 更新本地代码

  ```shell
  git pull  //前提远端仓库已有其他方进行了更新,和当前本地clone下来的已不一致
  ```

* 提交代码

  ```shell
  git push 
  ```

##### 工作流程

第二次流程(在原先的文件夹内)

1. 更新代码

   ```
   git checkout master
   git pull
   ```

2. 切换并合并分支 //切换并新建分支

   ```
   git checkout xiaohigh
   git merge master
   
   //
   git checkout -b newbranch
   ```

3. 开发功能

4. 提交

   ```
   git add -A
   git commit -m '注释'
   ```

5. 合并分支

   ```
   git checkout master
   git merge xiaohigh
   ```

6. 更新代码

   ```
   git pull
   ```

7. 推送代码

   ```
   git push
   ```

##### 冲突解决

同分支冲突一样的处理，将代码调整成最终的样式，提交代码即可。



### github使用场景

#### 1.github远程仓库名或地址更改,本地如何同步?

```js
1.查看本地仓库地址
git remote -v
2.删除远程仓库地址
git remote rm origin
3.添加远程仓库(修改过名字的)
git remote add origin 地址
4.同步
git pull origin master

//其他 推送可能遇到的问题 上游无分支
git push --set-upstream origin master
```



### GitFlow

GitFlow 是团队开发的一种最佳实践，将代码划分为以下几个分支

![img](D:/0922frontend/习题&笔记/笔记/assets/o_git-workflow-release-cycle-4maintenance.png)

- Master 主分支。上面只保存正式发布的版本
- Hotfix  线上代码 Bug 修复分支。开发完后需要合并回Master和Develop分支，同时在Master上打一个tag
- Feather 功能分支。当开发某个功能时，创建一个单独的分支，开发完毕后再合并到 dev 分支
- Release 分支。待发布分支，Release分支基于Develop分支创建，在这个Release分支上测试，修改Bug
- Develop 开发分支。开发者都在这个分支上提交代码

首次克隆完代码后，只要有4个分支(master hotfix release develop),需要切换到开发分支

```sh
//查看所有分支
git branch -a
//切换到开发分支
git checkout  dev

//提交的话一般只是提交更改的分支,其他分支不必提交
```


#### github本地自动提交

在本地将更新自动提交到github仓库的方法:
* [使用git-auto-commit Action](https://github.com/marketplace/actions/git-auto-commit)
* [git-autocommit](https://github.com/kspi/git-autocommit)
* inotifywait
* https://www.cnblogs.com/Java3y/p/12196210.html
* https://www.ruanyifeng.com/blog/2019/09/getting-started-with-github-actions.html
* 



## 附录

### Git 官方书籍

[https://git-scm.com/book/zh/v2/%E8%B5%B7%E6%AD%A5-%E5%85%B3%E4%BA%8E%E7%89%88%E6%9C%AC%E6%8E%A7%E5%88%B6](https://git-scm.com/book/zh/v2/起步-关于版本控制)

### CRLF

CRLF 是Carriage-Return Line-Feed 的缩写。

CR 表示的是 ASCII 码的第 13 个符号 \r 回车，LF 表示的是 ASCII 码表的第 10 个符号 \n 换行。

每个操作系统对回车换行的存储方式不同

* windows 下用 CRLF（\r\n）表示
* linux 和 unix 下用 LF（\n）表示
* mac 系统下用 CR（\r）表示

![打字机](D:/0922frontend/习题&笔记/笔记/assets/打字机.jpg)

### 

### 常见错误

#### 回车换行转换问题

```sh
warning: LF will be replaced by CRLF in 5.html.
The file will have its original line endings in your working directory
```

这个问题主要是 Git 在你提交时自动地把回车（CR）和换行（LF）转换成换行（LF），没有影响，<span style="color:red">这里建议大家保留这个状态</span>。可以通过下面的命令设置不转换，但是不推荐

```sh
git config --global core.autocrlf false // 不推荐
```

#### 提交报错

![img](D:/0922frontend/习题&笔记/笔记/assets/1532788288.bmp)

其他人已经提交过，本地代码需要更新，首先运行 git pull 命令



#### 冲突提醒

![1574235172869](D:/0922frontend/习题&笔记/笔记/assets/1574235172869.png)

编辑冲突

#### 提交错误

```sh
xiaohigh@DESKTOP-252ML8M MINGW64 /d/www/BJ0819/day13/代码/1-GitHub/7-test-ssh/8-https-to-ssh (master)
$ git push
fatal: The current branch master has no upstream branch.
To push the current branch and set the remote as upstream, use

    git push --set-upstream origin master
```

如果第一次将本地仓库分支提交到远程时，直接使用 `git push` 可能会报这个错误，解决方法

```sh
git push -u origin master
```

### 提交错误

![1576840150520](D:/0922frontend/习题&笔记/笔记/assets/1576840150520.png)

当前所在文件夹不是一个 git 仓库目录，切换目录工作

### 找不到 .git 的方法

![1582943996890](E:\github\notebook\note2\assets\1582943996890.png)



#### 在线练习网站

https://learngitbranching.js.org/