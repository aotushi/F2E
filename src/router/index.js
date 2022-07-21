import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);

import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Search from "@/pages/Search";

export default new VueRouter({
	routes: [
		{
			path: "/home",
			component: Home,
		},
		{
			path: "/search",
			component: Search,
		},
		{
			path: "/register",
			component: Register,
		},
		{
			path: "/login",
			component: Login,
		},
	], // 配置路由
});
