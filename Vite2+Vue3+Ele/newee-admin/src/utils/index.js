export function localGet(key) {
	let value = window.localStorage.getItem(key);
	try {
		return JSON.parse(window.localStorage.getItem(key));
	} catch (error) {
		return value;
	}
}

export function localSet(key, value) {
	window.localStorage.setItem(key, JSON.stringify(value));
}

export function localRemove(key) {
	window.localStorage.removeItem(key);
}

export const uploadImgServer = "http://backend-api-02.newbee.ltd/manage-api/v1/upload/file";

export const pathMap = {
	index: "首页",
	login: "登陆",
	add: "添加商品",
	swiper: "轮播图配置",
};
