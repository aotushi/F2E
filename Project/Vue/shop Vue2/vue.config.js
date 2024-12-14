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


});
