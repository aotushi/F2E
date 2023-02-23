// import { require } from "../http";
// import store from '../../store'

// 接口配置
import common from "api/interface/common";
import mall from "api/interface/mall";
import order from "./order";

let requestUrl = {};
const extendRequestUrl = (list) => {
	Object.keys(list).forEach((listKey) => {
		Object.keys(list[listKey]).forEach((key) => {
			requestUrl[`${listKey}/${key}`] = value[key];
		});
	});
};
extendRequestUrl({
	common,
	mall,
	order,
});

// 简单实现extendRequestUrl
let interfaceObj = { common, mall, order };

for (let { key, value } of Object.entries(interfaceObj)) {
	Object.keys(value).forEach((item) => {
		requestUrl[`${key}/${item}`] = value[key];
	});
}

export function commonGet(requestUrlKey, param, config, isUserResponseHandle) {
	// 判断

	return require("get", requestUrl[requestUrlKey], param, config, isUserResponseHandle);
}

export function commonPost(requestUrlKey, param, config, isUserResponseHandle) {
	//...
	return require("post", requestUrl[requestUrlKey], param, config, isUserResponseHandle);
}
