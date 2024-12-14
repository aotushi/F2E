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
export const uploadImgsServer = "http://backend-api-02.newbee.ltd/manage-api/v1/upload/files";

export const pathMap = {
	index: "首页",
	login: "登陆",
	add: "添加商品",
	swiper: "轮播图配置",
	hot: "热销商品配置",
	new: "新品上线配置",
	recommend: "为你推荐配置",
	category: "分类管理",
	level2: "分类二级管理",
	level3: "分类三级管理",
	good: "商品管理",
	order: "订单管理",
	order_detail: "订单详情",
	guest: "会员管理",
	account: '账户管理'
};
