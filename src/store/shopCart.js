import { reqAddOrUpdateShopCart } from "@/api";

const state = {
	// 根据api文档, 显示返回的信息中的data为null, 所以在state中不用声明接收的数据对象
};
const mutations = {
	
};
const actions = {
  async addOrUpdateShopCart({ commit }, { skuId, skuNum }) {
    const result = await reqAddOrUpdateShopCart(skuId, skuNum)
    // 下面这种写法可行, 但永远是成功的
    // if (result.code === 200) {
    //   return 'ok'
    // } else {
    //   return 'failed'
    // }

    if (result.code === 200) {
      return 'ok'
    } else {
      return Promise.reject(new Error('failed'))
    }
  }
};
const getters = {
	
};

export default {
	state,
	mutations,
	actions,
	getters,
};
