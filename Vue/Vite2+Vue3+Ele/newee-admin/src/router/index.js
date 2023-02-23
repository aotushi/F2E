import AddGood from "@/views/AddGood.vue";
import Index from "@/views/Index.vue";
import IndexConfig from "@/views/IndexConfig.vue";
import Login from "@/views/Login.vue";
import Swiper from "@/views/Swiper.vue";
import { createRouter, createWebHashHistory } from "vue-router";

const router = createRouter({
	history: createWebHashHistory(),
	routes: [
		{
			path: "/",
			name: "index",
			component: Index,
		},
		{
			path: "/add",
			name: "add",
			component: AddGood,
		},
		{
			path: "/login",
			name: "login",
			component: Login,
		},
		{
			path: "/swiper",
			name: "swiper",
			component: Swiper,
		},
		{
			path: "/hot",
			name: "hot",
			component: IndexConfig,
		},
		{
			path: "/new",
			name: "new",
			component: IndexConfig,
		},
		{
			path: "/recommend",
			name: "recommend",
			component: IndexConfig,
		},
	],
});

export default router;
