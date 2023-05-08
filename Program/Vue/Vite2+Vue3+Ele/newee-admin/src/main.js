import router from "@/router";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import { createApp } from "vue";
import App from "./App.vue";

const app = createApp(App);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
	app.component(key, component);
}
const orderStatus = {
	0: "待支付",
	1: "已支付",
	2: "配货完成",
	3: "出库成功",
	4: "交易成功",
	"-1": "手动关闭",
	"-2": "超时关闭",
	"-3": "商家关闭",
};
app.config.globalProperties.$filters = {
	prefix(url) {
		if (url && url.startsWith("http")) {
			return url;
		} else {
			url = `http://backend-api-02.newbee.td${url}`;
			return url;
		}
	},
	orderMap(status) {
		return orderStatus[status] || "未知状态";
	},
};

app.config.globalProperties.goTop = function () {
	const main = document.querySelector(".el-card");
	main.scrollTop = 0;
};

app.use(router).mount("#app");
