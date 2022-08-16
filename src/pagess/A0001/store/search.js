import { reqSearchInfo, reqSearchInfo2 } from "@/pagess/A0001/api";

const state = {
  searchInfo: {},
  searchInfo2: []
};
const mutations = {
  RECEIVE_SEARCHINFO(state, searchInfo) {
    state.searchInfo = searchInfo
  },
  RECEIVE_SEARCHINFO2(state, searchInfo2) {
    state.searchInfo2 = searchInfo2
  }
};
const actions = {
  async getSearchInfo({ commit }, searchParams) {
    let result = await reqSearchInfo(searchParams)
    if (result.code === 200) {
      commit('RECEIVE_SEARCHINFO', result.data)
    }
  },

  async getSearchInfo2({ commit }) {
    let result = await reqSearchInfo2()
    if (result.meta.status === 200) {
      commit('RECEIVE_SEARCHINFO2', result.message.goods)
    }
  }
};
const getters = {
  attrsList(state) {
    let samllImgArray = state.searchInfo2.map(obj => obj.goods_small_logo).filter((url, index) => index <= 11)
    state.searchInfo.attrsList?.forEach((item, index) => {
      
    })
    return state.searchInfo.attrsList || []
  },
  goodsList(state) {
    let imgArray = state.searchInfo2.map(obj => ({
      defaultImg: obj.goods_big_logo,
      price: obj.goods_price,
      name: obj.goods_name,
      id: obj.goods_id
    })).filter((item, index) => item.defaultImg && item.price && index <= 11)
    state.searchInfo.goodsList?.forEach((item, index) => {
      if (imgArray[index]) {
        item.price = imgArray[index].price
        item.defaultImg = imgArray[index].defaultImg
        item.title = imgArray[index].name
        item.id = imgArray[index].id
      }
    })
    return state.searchInfo.goodsList || []
  },
  trademarkList(state) {
    return state.searchInfo.trademarkList || []
  }

};
// const modules = {};

export default {
  state,
  mutations,
  actions,
  getters
}
