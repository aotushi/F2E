import router from "@/router";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import { createApp } from "vue";
import App from "./App.vue";

const app = createApp(App);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
	app.component(key, component);
}

app.config.globalProperties.$filters = {
	prefix(url) {
		if (url && url.startsWith("http")) {
			return url;
		} else {
			url = `http://backend-api-02.newbee.td${url}`;
			return url;
		}
	},
};

app.config.globalProperties.goTop = function () {
	const main = document.querySelector(".el-card");
	main.scrollTop = 0;
};

app.use(router).mount("#app");
