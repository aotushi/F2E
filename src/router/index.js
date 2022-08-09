import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);

import routes from './routes';

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
	routes, // 配置路由
	scrollBehavior(to, from, savedPosition) {
		// 始终滚动到顶部
		return { x:0, y:0}
	}
});
