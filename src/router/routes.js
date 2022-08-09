import Detail from '@/pages/Details'
import Home from '@/pages/Home'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Search from '@/pages/Search'


const routes = [
		{
			path: '/detail/:goodId',
			component: Detail
		},
		{
			path: "/home",
			component: Home,
		},
		{
			path: "/search/:keyword?",
			name: 'search',
			component: Search,
		},
		{
			path: "/register",
			component: Register,
			meta: {
				isHidden: true
			}
		},
		{
			path: "/login",
			component: Login,
			meta: {
				isHidden: true
			}
		},
		{
			path: "/",
			redirect: "/home"
		}
	] 

export default routes
