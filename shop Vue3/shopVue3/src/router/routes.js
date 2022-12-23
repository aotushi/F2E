// import AddCartSuccess from "@/pages/AddCartSuccess";
// import Center from '@/pages/Center';
// import GroupOrder from '@/pages/Center/GroupOrder';
// import MyOrder from '@/pages/Center/MyOrder';
// import Detail from "@/pages/Details";
import Home from "@/pages/Home/index.vue";
// import Login from "@/pages/Login";
// import Pay from '@/pages/Pay';
// import PaySuccess from '@/pages/PaySuccess';
// import Register from "@/pages/Register";
// import Search from "@/pages/Search";
// import ShopCart from "@/pages/ShopCart";
// import Trade from '@/pages/Trade';

const routes = [
  // {
	// 	path: '/center',
	// 	component: Center,
	// 	children: [
	// 		{
	// 			path: 'myorder',
	// 			component: MyOrder
	// 		},
	// 		{
	// 			path: 'grouporder',
	// 			component: GroupOrder
	// 		},
	// 		{
	// 			path: '',
	// 			component: MyOrder
	// 		}
	// 	]
	// },
	// {
	// 	path: '/pay',
	// 	component: Pay,
	// 	beforeEnter: (to, from, next) => {
	// 		// vi只有从交易页面（创建订单）页面才能跳转到支付页面
	// 		if (from.path === '/trade') {
	// 			next()
	// 		} else {
	// 			alert('只有从交易页面（创建订单）页面才能跳转到支付页面')
	// 			next(false)
	// 		}
	// 	}
	// },
	// {
	// 	path: '/paysuccess',
	// 	component: PaySuccess,
	// 	beforeEnter: (to, from, next) => {
	// 		if (from.path === '/pay') {
	// 			next()
	// 		} else {
	// 			alert('只有从支付页面才能跳转到支付成功页面')
	// 			next(false)
	// 		}
	// 	}
	// },
	// {
	// 	path: '/trade',
	// 	component: Trade
	// },
	// {
	// 	path: "/shopcart",
	// 	component: ShopCart
	// },
	// {
	// 	path: "/addcartsuccess",
	// 	component: AddCartSuccess,
	// 	beforeEnter: (to, from, next) => {
	// 		// 只有携带了skuNum和sessionStorage内部有skuInfo数据  才能看到添加购物车成功的界面
	// 		// ...
	// 		let skuNum = to.query.skuNum
	// 		let skuInfo = sessionStorage.getItem('SKUINFO_KEY')

	// 		if (skuNum && skuInfo) {
	// 			next()
	// 		} else {
	// 			alert('必须要携带skuNum参数')
	// 			// next('/')
	// 			next(false) //什么也不做, 但页面会显示不全
	// 		}
	// 	}
	// },
	// {
	// 	path: "/detail/:goodId",
	// 	component: Detail,
	// },
	{
		path: "/home",
		component: Home,
	},
	// {
	// 	path: "/search/:keyword?",
	// 	name: "search",
	// 	component: Search,
	// },
	// {
	// 	path: "/register",
	// 	component: Register,
	// 	meta: {
	// 		isHidden: true,
	// 	},
	// },
	// {
	// 	path: "/login",
	// 	component: Login,
	// 	meta: {
	// 		isHidden: true,
	// 	},
	// 	// 路由独享守卫
	// 	// beforeEnter: (to, from, next) => {
	// 	// 	// 只有从购物车界面才能跳转到交易页面（创建订单）
	// 	// 	if (from.path === '/shopcart') {
	// 	// 		next()
	// 	// 	} else {
	// 	// 		next(false)
	// 	// 	}

	// 	// }
	// },
	{
		path: "/",
		redirect: "/home",
	},
]


export default routes
