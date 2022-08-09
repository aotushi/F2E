import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

import home from './home';
import search from './search';
import user from './user';
import detail from './detail'

const state = {};
const mutations = {};
const actions = {};
const getters = {};
// const modules = {};

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  modules: {
    home,
    user,
    search,
    detail
  }
});
