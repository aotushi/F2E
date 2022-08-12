import { deleteShopCart, reqAddOrUpdateShopCart, reqShopCartInfo, reqUpdateCartIsCheck } from "@/api";

const state = {
	// 根据api文档, 显示返回的信息中的data为null, 所以在state中不用声明接收的数据对象

	shopCartInfo: [],
};
const mutations = {
	RECEIVE_SHOPCARTINFO(state, shopCartInfo) {
		state.shopCartInfo = shopCartInfo;
	},
};
const actions = {
	async addOrUpdateShopCart({ commit }, { skuId, skuNum }) {
		const result = await reqAddOrUpdateShopCart(skuId, skuNum);
		// 下面这种写法可行, 但永远是成功的
		// if (result.code === 200) {
		//   return 'ok'
		// } else {
		//   return 'failed'
		// }

		if (result.code === 200) {
			return "ok";
		} else {
			return Promise.reject(new Error("failed"));
		}
	},

	async getShopCartInfo({ commit }) {
		const result = await reqShopCartInfo();
		if (result.code === 200) {
			console.log("result.data getShopCartInfo", result.data);
			commit("RECEIVE_SHOPCARTINFO", result.data);
		}
	},

	// 切换购物车选中状态请求 单个
	async updateCartIsCheck({ commit }, { skuId, isChecked }) {
		const result = await reqUpdateCartIsCheck(skuId, isChecked)
		if (result.code === 200) {
			return 'ok'
		} else {
			return Promise.reject(new Error('failed'))
		}
	},

	// 修改购物车 多个选中状态
	updateCartIsCheckAll({ getters, dispatch }, isChecked) {
		let promises = []
		getters.cartInfo.cartInfoList.forEach(item => {
			if (item.isChecked === isChecked) return //每个购物车数据已经和要改变的状态一样
			let promise = dispatch('udpateCartIsCheck', { skuId: item.skuId, isChecked })
			promises.push(promise)
		})

		return Promise.all(promises)
	},

	// 删除购物车数据
	async deleteShopCart({ commit }, skuId) {
		console.log('skuId', skuId)
		const result = await deleteShopCart(skuId)
		if (result.code === 200) {
			return 'ok'
		} else {
			return Promise.reject(new Error('failed'))
		}
	},

	// 删除选中的商品
	async deleteShopCartAll({ commit, getters, dispatch }) {
		let promises = []
		getters.cartInfo.cartInfoList.forEach(item => {
			if (!item.isChecked) return 
			let promise = dispatch('deleteShopCart', item.skuId)
			promises.push(promise)
		})

		return Promise.all(promises)
	}

};
const getters = {
	cartInfo(state) {
		return state.shopCartInfo[0] || {}
	}
};

export default {
	state,
	mutations,
	actions,
	getters,
};
