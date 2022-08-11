import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

import detail from './detail';
import home from './home';
import search from './search';
import shopCart from './shopCart';
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
    user,
    search,
    detail,
    shopCart
  }
});
