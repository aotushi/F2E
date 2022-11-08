import { reqDetailInfo, reqDetailInfo2 } from "@/api";
const state = {
	detailInfo: {},
	detailInfo2: { skuInfo: { skuImageList: [] } },
};
const mutations = {
	RECEIVE_DETAILINFO(state, detailInfo) {
		state.detailInfo = detailInfo;
	},
	RECEIVE_DETAILINFO2(state, detailInfo) {
		state.detailInfo2 = detailInfo;
	},
};
const actions = {
	getDetailInfo: async function ({ commit }, goodId) {
		let result;
		if (goodId) {
			result = await reqDetailInfo(goodId);
		} else {
			console.log("goodId不能为空");
		}

		if (result.meta.status === 200) {
			commit("RECEIVE_DETAILINFO", result.message);
		}
	},
	async getDetailInfo2({ commit }) {
		let result = await reqDetailInfo2();
		if (result.code === 200) {
			commit("RECEIVE_DETAILINFO2", result.data);
		}
	},
};
const getters = {
	skuInfo(state) {
		let imgArray = state.detailInfo.pics?.map(item => ({ big: item.pics_big })) || []
		// console.log('imgArray', imgArray)
		state.detailInfo2.skuInfo.skuImageList.forEach((item, index) => {
			
			item.imgUrl = imgArray[index]?.big
			// item.skuId = imgArray[index]?.skuId
		})

		return state.detailInfo2.skuInfo || []
	},
	categoryView(state) {
		return state.detailInfo2.categoryView || {};
	},
	spuSaleAttrList(state) {
		return state.detailInfo2.spuSaleAttrList;
	},
};

export default {
	state,
	mutations,
	actions,
	getters,
};
