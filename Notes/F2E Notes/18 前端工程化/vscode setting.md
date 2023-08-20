## VSCode配置



### 隐藏缩略图

`minimap:AutoHide`



## 插件

### vim

#### 启用相对行号

`Smart Relative Line` 



#### 搜索全部高亮(明黄色)

`search Highlight Color`  输入颜色,例如'yellow'

`search Hightlight Text Color` 





## WSL配置

### 添加代理工具

#### 参考资料

* [linux下配置V2ray作为客户端来访问GitHub、G*le等服务 | 菜鸟程序员博客 (witersen.com)](https://www.witersen.com/?p=1408)
* [Linux下使用v2ray - Jun's Blog (junz.org)](https://www.junz.org/post/v2_in_linux/)
* [下载安装 · Project V 官方网站 (v2ray.com)](https://www.v2ray.com/chapter_00/install.html)

**wsl环境中创建Downloads文件夹**

```bash
username@Null:~$ mkdir Downloads
```

**在window资源管理器中直接复制过去**

window上下载后软件v2ray后，在文件管理器地址栏路绝中输入`\\wsl$\Ubuntu\home\你的用户名\Downloads`, 就会弹出wsl的资源管理器图形.(已经[安装桌面文件管理器Nautilus](https://learn.microsoft.com/zh-cn/windows/wsl/tutorials/gui-apps#install-nautilus))

**更换config.json**

在window上使用过v2rayN可以将服务器配置导出客户端配置,然后替换掉

**执行v2ray**

```bash
username@Null:~/Downloads/v2ray-linux-64$ ./v2ray
```

**修改firefox浏览器代理配置**

安装firefox

```bash
sudo apt install firefox
```

修改firefox代理配置,将代理地址变成你config.json中的地址,类似`127.0.0.1:1080`

```bash

```

在更改firefox配置后,之前我们已经启动了v2ray.可以看到可以访问.



### 安装中文输入法
> [wsl2官方gui安装IDEA踩坑记录 | MonkeyWie's Blog](https://monkeywie.cn/2021/09/26/wsl2-gui-idea-config/)


