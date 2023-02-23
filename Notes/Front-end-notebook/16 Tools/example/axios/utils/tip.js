// tip.js在统一接口请求封装中引入, 用于sso拦截提示并强制退出

import Vue from "vue";
import signInTip from "../components/SignInTip.vue";

export function showSignInTip(val) {
	let signInTipComponent = Vue.extend(signInTip);
	let signInTipInstance = new signInTipComponent().$mount();
	document.body.appendChild(signInTipInstance.$el);
	signInTipInstance.isShowTip = true;
	signInTipInstance.regionKey = val;
}
