import router from "@/router";
// import { ElButton } from "element-plus";
// import "element-plus/dist/index.css";
import { createApp } from "vue";
import App from "./App.vue";
import "./style.css";

createApp(App).use(router).mount("#app");
