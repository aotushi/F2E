import AddCartSuccess from "@/pages/AddCartSuccess";
import Center from '@/pages/Center';
import GroupOrder from '@/pages/Center/GroupOrder';
import MyOrder from '@/pages/Center/MyOrder';
import Detail from "@/pages/Details";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Pay from '@/pages/Pay';
import PaySuccess from '@/pages/PaySuccess';
import Register from "@/pages/Register";
import Search from "@/pages/Search";
import ShopCart from "@/pages/ShopCart";
import Trade from '@/pages/Trade';

const routes = [
	{
		path: '/center',
		component: Center,
		children: [
			{
				path: 'myorder',
				component: MyOrder
			},
			{
				path: 'grouporder',
				component: GroupOrder
			},
			{
				path: '',
				component: MyOrder
			}
		]
	},
	{
		path: '/pay',
		component: Pay
	},
	{
		path: '/paysuccess',
		component: PaySuccess
	},
	{
		path: '/trade',
		component: Trade
	},
	{
		path: "/shopcart",
		component: ShopCart
	},
	{
		path: "/addcartsuccess",
		component: AddCartSuccess,
	},
	{
		path: "/detail/:goodId",
		component: Detail,
	},
	{
		path: "/home",
		component: Home,
	},
	{
		path: "/search/:keyword?",
		name: "search",
		component: Search,
	},
	{
		path: "/register",
		component: Register,
		meta: {
			isHidden: true,
		},
	},
	{
		path: "/login",
		component: Login,
		meta: {
			isHidden: true,
		},
	},
	{
		path: "/",
		redirect: "/home",
	},
];

export default routes;
