<script setup>
import Footer from "@/components/Footer.vue";
import Header from "@/components/Header.vue";
import { localGet, pathMap } from "@/utils";
import { ShoppingCart } from "@element-plus/icons-vue";
import { reactive } from "vue";
import { useRoute, useRouter } from "vue-router";


const state = reactive({
	showMenu: true,
	defaultOpen: ["1", "2","3"],
	currentPath: "/",
});
const { defaultOpen, currentPath } = state;
const noShowMenuPaths = ["/login"];
const router = useRouter();
const route = useRoute();

// router.beforeEach((to) => {
// 	state.showMenu = !noShowMenuPaths.includes(to.path);
// });
// watch(() => route.path, (newVal, oldVal) => {
// 	console.log('axiosassaa, newVal', axios.defaults.headers)
// })
router.beforeEach((to, from, next) => {
	if (to.path === "/login") {
		next();
		state.showMenu = false;
	} else {
		// 如果不是/login, 判断是否有token
		if (!localGet("token")) {
			// 如果没有token, 则跳转到登陆页面
			next({ path: "/login" });
			// state.showMenu = false;
		} else {
			// 否则继续运行
			next();
		}
	}
	state.showMenu = !noShowMenuPaths.includes(to.path) && localGet("token");
	document.title = pathMap[to.name];
	state.currentPath = to.path;
});
</script>

<template>
	<div class="layout">
		<el-container v-if="state.showMenu" class="container">
			<el-aside class="aside">
				<!-- 系统名称+logo -->
				<div class="head">
					<div>
						<img src="//s.weituibao.com/1582958061265/mlogo.png" alt="logo" />
						<span>vue3 admin</span>
					</div>
				</div>
				<div class="line" />
				<el-menu background-color="#222832" text-color="#fff" router :default-active="currentPath" :default-openeds="defaultOpen">
					<!-- 一级栏目 -->
					<el-sub-menu index="1">
						<template #title>
							<span>Dashboard</span>
						</template>
						<!-- 二级栏目 -->
						<el-menu-item-group>
							<el-menu-item index="/">
								<el-icon> <Odometer /> </el-icon>首页
							</el-menu-item>
							<el-menu-item index="/add">
								<el-icon> <Plus /> </el-icon>添加商品
							</el-menu-item>
						</el-menu-item-group>
					</el-sub-menu>
					<el-sub-menu index="2">
						<template #title>
							<span>首页配置</span>
						</template>
						<el-menu-item-group>
							<el-menu-item index="/swiper">
								<el-icon> <Picture /> </el-icon>轮播图配置
							</el-menu-item>
							<el-menu-item index="/hot">
								<el-icon><StarFilled /></el-icon>热销商品配置
							</el-menu-item>
							<el-menu-item index="/new">
								<el-icon><Sell /></el-icon>新品上线配置
							</el-menu-item>
							<el-menu-item index="/recommend">
								<el-icon><ShoppingCart /></el-icon>为你推荐配置
							</el-menu-item>
						</el-menu-item-group>
					</el-sub-menu>
					<el-sub-menu index="3">
						<template #title>
							<span>模块管理</span>
						</template>
						<el-menu-item-group>
							<el-menu-item index="/category"><el-icon><Menu/></el-icon>分类管理</el-menu-item>
							<el-menu-item index="/good"><el-icon><Goods /></el-icon>商品管理</el-menu-item>
						</el-menu-item-group>
					</el-sub-menu>
				</el-menu>
			</el-aside>
			<el-container class="content">
				<Header />
				<div class="main">
					<router-view />
				</div>
				<Footer />
			</el-container>
		</el-container>
		<el-container v-else class="container">
			<router-view />
		</el-container>
	</div>
</template>

<style scoped>
.layout {
	min-height: 100vh;
	background-color: #fff;
}

.container {
	height: 100vh;
}

.aside {
	width: 200px !important;
	background-color: #222832;
}

.head {
	display: flex;
	align-items: center;
	justify-content: center;
	height: 50px;
}

.head > div {
	display: flex;
	align-items: center;
}

.head img {
	width: 50px;
	height: 50px;
	margin-right: 10px;
}

.head span {
	font-size: 20px;
	color: #fff;
}

.line {
	border-top: 1px solid hsla(0, 0%, 100%, 0.05);
	border-bottom: 1px solid rgba(0, 0, 0, 0.2);
}

.content {
	display: flex;
	flex-direction: column;
	max-height: 100vh;
	overflow: hidden;
}

.main {
	height: calc(100vh - 100px);
}
</style>

<style>
body {
	padding: 0;
	margin: 0;
	box-sizing: border-box;
}
</style>
