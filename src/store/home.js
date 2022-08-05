// home模块的vuex模块
import { reqCategoryList } from "@/api";

const state = {
  categoryList: []
};
const mutations = {
  RECEIVE_CATEGORYLIST(state, categoryList) {
    state.categoryList = categoryList
  }
};
const actions = {
  async getCategoryList({ commit }) {
    // reqCategoryList().then().catch()
    const result = await reqCategoryList()
    console.log('result', result)
    if (result.meta.status === 200) {
      commit('RECEIVE_CATEGORYLIST', result.message)
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
