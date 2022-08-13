// user模块的vuex模块
import { reqGetCode, reqUserLogin, reqUserRegister } from "@/api";
import { getUserTempId } from "@/utils/userabout";

const state = {
	// 页面已刷新, 就会调用
	userTempId: getUserTempId(),
	code: "",
	// token: "", //用户登录成功以后的token 初始化为空串不对, 
  token: localStorage.getItem('TOKEN_KEY'),
  // 以前没有登录过, 初始化空串是没有问题的
  // 以前有登录过, 得先从localStorage里面去获取,如果获取不到再去登录; 获取到了就不需要再登录


  userInfo: {} //根据token获取用户信息
};
const mutations = {
	RECEIVE_USERCODE(state, code) {
		state.code = code;
	},
	RECEIVE_TOKEN(state, token) {
		state.token = token;
  },
  
  RECEIVE_USERINFO(state, userInfo) {
    state.userInfo = userInfo
  },

  RESET_TOKEN(state) {
    state.token = ''
  }
};
const actions = {
	async userRegister({ commit }, userInfo) {
		const result = await reqUserRegister(userInfo);

		if (result.code === 200) {
			return "ok";
		} else {
			return Promise.reject(new Error("failed"));
		}
	},

	// 获取验证码
	async getCode({ commit }, phone) {
		const result = await reqGetCode(phone);
		if (result.code === 200) {
			commit("RECEIVE_USERCODE", result.data);

			return "ok";
		} else {
			return Promise.reject(new Error("failed"));
		}
	},

	// 用户login
	async userLogin({ commit }, userInfo) {
		const result = await reqUserLogin(userInfo);
		if (result.code === 200) {
      commit("RECEIVE_TOKEN", result.data.token);
      //token获取到以后, 需要存储到localStorage中, 因为token在一定时间内也不是随意更改的
      console.log('token', result)
      localStorage.setItem('TOKEN_KEY', result.data.token)
			return "ok";
		} else {
			return Promise.reject(new Error("failed"));
		}
  },
  
  //根据token 获取用户信息
  async getUserInfo({ commit }) {
    const result = await reqUserLogin()

    if (result.code === 200) {
      commit('RECEIVE_USERINFO', result.data)

      return 'ok'
    } else {
      return Promise.reject(new Error('failed'))
    }
  },

  // 清除用户token信息
  async clearToken({ commit }) {
    commit('RESET_TOKEN')
  }
};
const getters = {};
// const modules = {};

export default {
	state,
	mutations,
	actions,
	getters,
};
