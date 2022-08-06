import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);

import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Search from "@/pages/Search";

const originPush = VueRouter.prototype.push
VueRouter.prototype.push = function (location, onComplete, onAbort) {
	if (onComplete || onAbort) {
		return originPush.call(this, location, onComplete, onAbort)
	} else {
		return originPush.call(this, location).catch(() => console.log('catch error'))
	}
}

const originReplace = VueRouter.prototype.replace
VueRouter.prototype.replace = function (location, onComplete, onAbort) {
	if (onComplete || onAbort) {
		return originReplace.call(this, location, onComplete, onAbort)
	} else {
		return originReplace.call(this, location).catch(() => console.log('catch error'))
	}
}


export default new VueRouter({
	routes: [
		{
			path: "/home",
			component: Home,
		},
		{
			path: "/search/:keyword?",
			name: 'search',
			component: Search,
		},
		{
			path: "/register",
			component: Register,
			meta: {
				isHidden: true
			}
		},
		{
			path: "/login",
			component: Login,
			meta: {
				isHidden: true
			}
		},
		{
			path: "/",
			redirect: "/home"
		}
	], // 配置路由
});
