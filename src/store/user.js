// user模块的vuex模块
import { getUserTempId } from "@/utils/userabout";

const state = {
  // 页面已刷新, 就会调用
  userTempId: getUserTempId()
};
const mutations = {};
const actions = {};
const getters = {};
// const modules = {};

export default {
  state,
  mutations,
  actions,
  getters
}
