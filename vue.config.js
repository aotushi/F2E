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
const argPageName = argPageNameStr.replace("--", ""); //A1003054
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
	title = pages[0].title;
	pageName = pages[0].pageName;
	menuNumber = pages[0].menuNumber;
	isPureH5 = pages[0].isPureH5 || false;
}

const outputName = pageModule.appType === "igw" ? menuNumber : pageName;
const APPTYPE_NAME = (pageModule.appType = "igw" ? I2GW : W2SGW);

if (pageName === "") throw "请定义打包模块名称, 在pages.json里面".magenta;

console.table({
	隶属场景编号: pageName,
	隶属场景名称: pageModule.title,
	菜单号: menuNumber,
	应用类型: APPTYPE_NAME,
});

// 生产环境 预发布和测试(编译后的)
console.log(process.env.NODE_ENV);

const root = (...param) => path.resolve.apply(null, [__dirname, ...param]);

// 构建微应用 zipAppConfig.json文件
const zipAppConfig = {};

// 拼接zipAppConfig文件
zipAppConfig.agentId = menuNumber;
zipAppConfig.appName = pageModule.title;
zipAppConfig.container = pageModule.code;
zipAppConfig.index = "index.html";
zipAppConfig.openType = 1;
zipAppConfig.appType = pageModule.appType;
zipAppConfig.showAppBar = false;

// fs.writeFileSync()方法用于将数据同步写入文件。如果该文件已经存在，则替换该文件。 “ options”参数可用于修改方法的函数。
//
fs.writeFileSync(`./src/pagess/${pageName}/zipAppconfig.json`, JSON.stringify(zipAppConfig, null, 2));

// page title
const name = title || "项目标题";
const IS_PROD = ["production", "staging", "testing"].includes(process.env.NODE_ENV);
// path.resolve([...params])
// path.resolve()方法会把一个路径或路径片段的序列解析为一个绝对路径
// 例如下方会返回: E:\github\vue2program\src\pagess\A1003504\main.js
const entry = root("src", "pagess", pageName, "main.js");



const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const CopyWebpackPlugin = require("copy-webpack-plugin");
const resolve = (dir) => path.join(__dirname, dir);


// 返回: 例如,  E:\github\vue2program\dist\A1003504
const outputDir = root("dist", outputName);

//https://cli.vuejs.org/zh/config/#transpiledependencies

const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
	// 默认false, 启用本选项，以避免构建后的代码中出现未转译的第三方依赖。
	transpileDependencies: true,
	lintOnSave: false,
	// crossorigin: 'anonymous',
	devServer: {
		// port: 9020, 端口
		// open: true, 启动后自动打开浏览器
		// hot: true,
		// overlay: {
		// 当出现编译器错误或警告时, 在浏览器中显示全屏覆盖层
		// warnings: false,
		// errors: true
		// },
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

	publicPath: "./", // 部署应用包时基本URL. vue-router hash模式使用
	// publicPath: '/app', //部署应用包时基本URL. vue-router history模式使用
	// outputDir: 'dist', // 生产环境构建文件的目录
	assetsDir: "static", // outputDir的静态资源(js, css, img, fonts目录) 相对于 outputDir 的) 目录
	productionSourceMap: false, //如果不需要生产国环境的source map, 可以将其设置为false 以加速生产环境构建

	css: {
		extract: IS_PROD, //是否将组件中的CSS提取至一个独立的CSS文件中(而不是动态注入到JS中的inline代码中)
		sourceMap: false, //是否为 CSS 开启 source map。设置为 true 之后可能会影响构建的性能。
		loaderOptions: {
			//向 CSS 相关的 loader 传递选项
			scss: {
				// 向全局sass样式传入共享的全局变量, $src可以配置图片cdn前缀
				// prependData: `
				//   @import "$rootAssets/css/mixin.scss";
				//   @import "$rootAssets/css/variables.scss";
				// `
			},
		},
	},

	configureWebpack: (config) => {
		// 调整 webpack 配置  该对象将会被 webpack-merge 合并入最终的 webpack 配置。
    config.name = name
    config.entry = entry
  },
  

  chainWebpack: config => {
    if (!isPureH5) {

    }


    config.plugins.delete('preload')
    config.plugins.delete('prefetch')


    //别名 alias
    // 配置alias别名的两种方式 https://segmentfault.com/a/1190000039772292
    // config.resolve.alias
    //   .set('$root', resolve('src'))
    //   .set('$rootAssets', resolve('src/assets'))
    //   .set('$components', resolve('src/components'))
    //   .set('$utils', resolve(`src/utils`))
    //   .set('$images', resolve(`src/images`))
    //   .set('@', resolve(`src/pages/${pageName}`))
    //   .set('@assets', resolve(`src/pages/${pageName}/assets`))
    //   .set('@style', resolve(`src/pages/${pageName}/style`))
    //   .set('@api', resolve(`src/pages/${pageName}/apis`))
    //   .set('@components', resolve(`src/pages/${pageName}/components`))
    //   .set('@view', resolve(`src/pages/${pageName}/views`))
    


    // 3 函数形式
    // Object.assign(config.resolve, {
    //   alias: {
    //     '$root': path.resolve(__dirname, './src'),
    //     '$rootAssets': path.resolve(__dirname, './src/assets')
    //   }
    // })




    config.plugin('html').tap(args => {
      args[0].title = pageMoudle.title
      return args
    })
    /**
             * 设置保留空格
             */
    config.module
      .rule('vue')
      .use('vue-loader')
      .loader('vue-loader')
      .tap(options => {
        options.compilerOptions.preserveWhitespace = true
        return options
      })
      .end()

    // set svg-sprite-loader
    config.module
      .rule('svg')
      .exclude.add(resolve(`src/pages/${pageName}/icons`))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve(`src/pages/${pageName}/icons`))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()
    /**
             * 打包分析
             */
    if (IS_PROD) {
      config.plugin('webpack-report').use(BundleAnalyzerPlugin, [{
        analyzerMode: 'static'
      }])
    }
    config
      // https://webpack.js.org/configuration/devtool/#development
      .when(!IS_PROD, config => config.devtool('cheap-source-map'))
    config.when(IS_PROD, config => {
      config
        .plugin('ScriptExtHtmlWebpackPlugin')
        .after('html')
        .use('script-ext-html-webpack-plugin', [{
          // 将 runtime 作为内联引入不单独存在
          inline: /runtime\..*\.js$/
        }])
        .end()
      config.optimization.splitChunks({
        chunks: 'all',
        cacheGroups: {
          // cacheGroups 下可以可以配置多个组，每个组根据test设置条件，符合test条件的模块
          commons: {
            name: 'chunk-commons',
            test: resolve('src/components'),
            minChunks: 3, //  被至少用三次以上打包分离
            priority: 5, // 优先级
            reuseExistingChunk: true // 表示是否使用已有的 chunk，如果为 true 则表示如果当前的 chunk 包含的模块已经被抽取出去了，那么将不会重新生成新的。
          },
          node_vendors: {
            name: 'chunk-libs',
            chunks: 'initial', // 只打包初始时依赖的第三方
            test: /[\\/]node_modules[\\/]/,
            priority: 10
          },
          vantUI: {
            name: 'chunk-vantUI', // 单独将 vantUI 拆包
            priority: 20, // 数字大权重到，满足多个 cacheGroups 的条件时候分到权重高的
            test: /[\\/]node_modules[\\/]_?vant(.*)/
          }
        }
      })
      config.optimization.runtimeChunk('single')
    })
  }
});
