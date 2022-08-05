import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

import home from './home';
import user from './user';

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
    user
  }
});
