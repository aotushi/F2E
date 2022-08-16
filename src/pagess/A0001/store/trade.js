import { reqTradeInfo } from "@/pagess/A0001/api"

const state = {
  tradeInfo: {}
}

const mutations = {
  RECEIVE_TRADEINFO(state, tradeInfo) {
    state.tradeInfo = tradeInfo
  }
}


const actions = {
  // 获取结算时 商品信息
  async getTradeInfo({ commit }) {
    const result = await reqTradeInfo()

    if (result.code === 200) {
      commit('RECEIVE_TRADEINFO', result.data)
    }
  }
}

const getters = {
  detailArrayList(state) {
    return state.tradeInfo.detailArrayList || []
  }
}



export default {
  state,
  mutations,
  actions,
  getters
}
