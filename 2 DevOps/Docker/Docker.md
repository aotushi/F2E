## Docker



### 安装Docker

使用场景不同,安装的版本不同.

#### windows平台安装

> docker desktop



#### Linux平台



### Docker了解

> [What is Docker? | Docker Docs](https://docs.docker.com/get-started/docker-overview/)



#### 是什么

> 是一个开放平台,用来开发,交付,运行应用.



#### docker平台

> Docker 提供了在松散隔离的环境（称为容器）中打包和运行应用应用的能力。独立和安全性让你可以同时运行多个容器在一个主机上.
>
> 容器是轻量的,且包含运行应用的所有东西,所以你不需要依赖主机上安装的东西.
>
> 容器是可分享的.

#### docker能干什么





#### docker结构

* 使用客户端-服务端结构
* 客户端与daemon守护进程通信, 后者负责构建,运行,分发docker容器的重担.
* 客户端和守护端可以运行在同一个系统上,或可以连接客户端到远程Docker守护
* docker客户端与守护daemon通信使用REAT API, UNIX套接字或网络接口.
* 另一个docker客户端是Docker Compose,可以让你在包含一组容器的应用中工作.

![docker-architecture](assets/docker-architecture.webp)



#### Docker daemon

* Docker daemon(`dockerd`)监听Docker API请求和管理Docker对象,例如images, containers, networks和volumes.
* 一个daemon能和其他daemons通信来管理Docker services.

#### Docker client

* Docker client(`docker`)是多个Docker用户和Docker交互的主要方式
* 客户端发送指令(例如`docker run`)到`dockerd`, 后期执行命令.
* `docker`命令使用Docker API.
* Docker客户端可以和多个daemon通信

#### Docker Desktop

* 一个Mac,Windows,Linux环境下易安装的应用, 让你构建和分享容器化的应用和微服务
* Docker Desktop包含Docker daemon(`dockerd`), Docker客户端(`docker`),Docker Compose, Dcoker Content Trust, Kubernetes, Credential Helper.

#### Docker registries

* Docker registry存储Docker images.
* Docker Hub是公用的registry, 也是Docker默认查找镜像的地方.
* 使用`docker pull`或`docker run`命令时, Docker从你配置的registry拉取镜像.
* 使用`docker push`命令时, Docker推送镜像到你配置的registry





#### Docker objects

当你使用Docker时, 你是创建并使用了images, containers, networks,volumes, plugins, and other objects.

