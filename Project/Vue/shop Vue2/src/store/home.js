// home模块的vuex模块
import { reqBannerList, reqCategoryList, reqFloorList } from "@/api";

const state = {
  categoryList: [],
  bannerList: [],
  floorList: []
};
const mutations = {
  RECEIVE_CATEGORYLIST(state, categoryList) {
    state.categoryList = categoryList
  },
  RECEIVE_BANNERLIST(state, bannerList) {
    state.bannerList = bannerList
  },
  RECEIVE_FLOORLIST(state, floorList) {
    state.floorList = floorList
  }
};
const actions = {
  async getCategoryList({ commit }) {
    // reqCategoryList().then().catch()
    const result = await reqCategoryList()
    // console.log('result', result)
    if (result.meta.status === 200) {
      commit('RECEIVE_CATEGORYLIST', result.message)
    }
  },

  async getBannerList({ commit }) {
    const result = await reqBannerList()
    if (result.code === 200) {
      commit('RECEIVE_BANNERLIST', result.data)
    }
  },

  async getFloorList({ commit }) {
    const result = await reqFloorList()
    if (result.code === 200) {
      commit('RECEIVE_FLOORLIST', result.data)
    }
  }
};
const getters = {

};
// const modules = {};


export default {
  state,
  mutations,
  actions,
  getters
}
