import { reqDetailInfo, reqDetailInfo2 } from "@/api";
const state = {
	detailInfo: {},
	detailInfo2: {}
};
const mutations = {
	RECEIVE_DETAILINFO(state, detailInfo) {
		state.detailInfo = detailInfo;
	},
	RECEIVE_DETAILINFO2(state, detailInfo) {
		state.detailInfo2 = detailInfo
	}
};
const actions = {
  getDetailInfo: async function ({ commit }, goodId) {
    let result;
    if (goodId) {
      result = await reqDetailInfo(goodId);
    } else {
      console.log('goodId不能为空')
    }
		

		if (result.meta.status === 200) {
      commit("RECEIVE_DETAILINFO", result.message);
		}
	},
	async getDetailInfo2({commit}) {
		let result = await reqDetailInfo2()
		if (result.code === 200) {
			commit("RECEIVE_DETAILINFO2", result.data)
		}
	}
};
const getters = {};

export default {
	state,
	mutations,
	actions,
	getters,
};
