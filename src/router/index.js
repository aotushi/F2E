import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);

import store from '@/store';
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


const router = new VueRouter({
	routes, // 配置路由
	scrollBehavior(to, from, savedPosition) {
		// 始终滚动到顶部
		return { x:0, y:0}
	}
});

router.beforeEach(async (to, from, next) => {
	// 1. 守卫拦截, 先去获取用户的token和用户的信息
	let token = store.state.user.token
	let userInfo = store.state.user.userInfo

	if (token) {
		//如果token是存在的, 代表用户登录过

		if (to.path === '/login') {
			// 用户已经登录, 还要向登录页面跳转, 没有必要
			next('/')
		} else {
			// 如果用户已经登录, 跳转的也不是登录页. 需要查看用户信息
			if (userInfo) {
				// 用户信息已获取, 无条件放行
				next()
			} else {
				// 用户已经登录, 但用户还没有获取用户信息. 在这里就要获取用户信息
				
				//用户根据token获取信息  需要判断获取成功和失败, 所以要改造action中的'getUserInfo' dispatch返回的是promise
				try {
					await store.dispatch('getUserInfo')
					// 获取用户信息成功, 无条件放行
					next()
				} catch (error) {
					// 根据token获取用户信息失败, 代表token可能过期
					// 把用户过期的token清理掉, 重新跳转到登录页
					// 如何清除token? 

					store.dispatch('clearToken')
					next('/login')
				}
				

				
				
			}
		}
	}
})

export default router
