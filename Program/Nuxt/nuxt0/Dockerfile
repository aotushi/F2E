#Dockerfile
#制定node镜像的版本
FROM node:20.10.0-alpine
#移动当前目录下面的文件到app目录下
ADD . /app/
#进入到app目录下面，类似cd
WORKDIR /app
#安装依赖
# RUN npm config set registry https://registry.npm.taobao.org/ && \
COPY package*.json ./    
RUN npm i
#对外暴露的端口
COPY . .
EXPOSE 3000
#程序启动脚本
CMD ["npm", "start"]
