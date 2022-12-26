import vue from "@vitejs/plugin-vue";
import path from "path";
import AutoImport from "unplugin-auto-import/vite";
import ElementPlus from "unplugin-element-plus/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import Components from "unplugin-vue-components/vite";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		vue(),
		AutoImport({
			resolvers: [ElementPlusResolver()],
		}),
		Components({
			resolvers: [
				ElementPlusResolver({
					importStyle: "sass",
				}),
			],
		}),
		// 用于内部方法调用，样式缺失的现象，如 ElMessage 等
		ElementPlus(),
	],
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "src"),
			"~": path.resolve(__dirname, "./"),
		},
	},
	server: {
		proxy: {
			"/api": {
				target: "http://backend-api-02.newbee.ltd/manage-api/v1",
				changeOrigin: true,
				rewrite: (path) => path.replace(/^\/api/, ""),
			},
		},
	},
	css: {
		preprocessorOptions: {
			// 覆盖element-plus包中的主题变量文件
			scss: {
				additionalData: `@use "@/styles/element/index.scss" as *;`,
			},
		},
	},
});
