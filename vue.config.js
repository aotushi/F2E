// console.log('process_env.VUE_APP_ENV', process.env)

const path = require("path");
const fs = require("fs");

const I2GW = "i项目";
const W2SGW = "项目AA";

const { pages } = require(`./pages.${process.env.VUE_APP_ENV}.json`);

// The process.argv property returns an array containing the command line arguments passed when the Node.js process was launched

// 例如 执行命令 yarn serve --development后, 打印process.argv的结果如下:
// process.argv [
//   'D:\\Program Files\\nodejs\\node.exe',
//   'E:\\github\\vue2program\\node_modules\\@vue\\cli-service\\bin\\vue-cli-service.js',
//   'serve',
//   '--development'
// ]
const argPageNameStr = process.argv[process.argv.length - 1];
const argPageName = argPageNameStr.replace("--", "");  //A1003054
const pageModule = pages.find((page) => page.name === argPageName);  

//  pageModule 结果
    // {
    //   "name": "A1003504",
    //   "code": "YJZC",
    //   "author": "移动作业",
    //   "menuNumber": "A1003504",
    //   "offLine": false,
    //   "appType": "igw",
    //   "title": "移动作业"
    // },

let { name: pageName, menuNumber, isPureH5, title } = pageModule || {};



// 如果没有指定模块名称, 默认取pages第一项
const dirs = fs.readdirSync(path.resolve("src/pagess"));


// path.resolve('a') 返回的是当前绝对路径拼接现在的参数/Users/xxxx/a
// console.log('path.resolve("src/pages")', path.resolve("src/pages"))   E:\github\vue2program\src\pages

// fs.readdirSync
// The fs.readdirSync() method is used to synchronously read the contents of a given directory. The method returns an array with all the file names or objects in the directory.
// 该方法将返回一个包含“指定目录下所有文件名称”的数组对象。

if (!dirs.includes(pageName)) {
  // [title, pageName, menuNumber, isPureH5].forEach(item => item = pages[0][item])
  title = pages[0].title
  pageName = pages[0].pageName
  menuNumber = pages[0].menuNumber
  isPureH5 = pages[0].isPureH5 || false
}


const outputName = pageModule.appType === 'igw' ? menuNumber : pageName
const APPTYPE_NAME = pageModule.appType = 'igw' ? I2GW : W2SGW


//构建微应用 zipAppConfig.json文件
// const zipAppConfig = {}

// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
// const CopyWebpackPlugin = require('copy-webpack-plugin')
// const resolve = dir = path.join(_dirname, dir)


// page title
const name = title || '项目标题'
// 生产环境 预发布和测试(编译后的)
console.log(process.env.NODE_ENV)

const IS_PROD = ['production', 'staging', 'testing'].includes(process.env.NODE_ENV)


const root = (...param) => path.resolve.apply(null, [__dirname, ...param])



if (pageName === '') throw '请定义打包模块名称, 在pages.json里面'.magenta

console.table({
  隶属场景编号: pageName,
  隶属场景名称: pageModule.title,
  菜单号: menuNumber,
  应用类型: APPTYPE_NAME
})



const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
	transpileDependencies: true,
	lintOnSave: false,
	devServer: {
		proxy: {
			"/api": {
				// 转发目标服务器地址
				// target: "http://182.92.128.115",
				target: "http://127.0.0.1",
				// 是否把路径中的/api去掉
				// pathRewrite: { "^/api": "" }
			},
		},
	},
});
