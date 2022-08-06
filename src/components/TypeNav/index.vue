<template>
	<!-- 商品分类导航 -->
	<div class="type-nav">
		<div class="container">
			<div @mouseleave="moveOutDiv" @mouseenter="isShow = true">
				<h2 class="all">全部商品分类</h2>
				<transition name='sort'>
				<div class="sort" v-show="isShow">
					<div class="all-sort-list2" @click="toSearch">
						<div
							class="item"
							:class="{ item_on: currentIndex === index }"
							v-for="(c1, index) in categoryListSumIs15"
							v-bind:key="c1.cat_id"
							@mouseenter="moveInItem(index)"
						>
							<h3>
								<a
									href="javascript:;"
									:data-c1Id="c1.cat_id"
									:data-cName="c1.cat_name"
									>{{ c1.cat_name }}</a
								>
								<!-- <router-link
									:to="{
										name: 'search',
										query: { c1Id: c1.cat_id, c1Name: c1.cat_name },
									}"
									>{{ c1.cat_name }}</router-link
								> -->

								<!-- <a
									href="javascript:;"
									@click="
										$router.push({
											name: 'search',
											query: { c1Id: c1.cat_id, c1Name: c1.cat_name },
										})
									"
									>{{ c1.cat_name }}</a
								> -->
							</h3>
							<div class="item-list clearfix">
								<div class="subitem">
									<dl
										class="fore"
										v-for="(c2, index) in c1.children"
										:key="c2.cat_id"
									>
										<dt>
											<a
												href="javascript:;"
												:data-c2Id="c2.cat_id"
												:data-cName="c2.cat_name"
												>{{ c2.cat_name }}</a
											>
											<!-- <router-link
												:to="{
													name: 'search',
													query: { c2Id: c2.cat_id, c2Name: c2.cat_name },
												}"
												>{{ c2.cat_name }}</router-link
											> -->

											<!-- <a
												href="javascript:;"
												@click="
													$router.push({
														name: 'search',
														query: { c2Id: c2.cat_id, c2Name: c2.cat_name },
													})
												"
												>{{ c2.cat_name }}
											</a> -->
										</dt>
										<dd>
											<em v-for="(c3, index) in c2.children" :key="c3.cat_id">
												<a
													href="javascript:;"
													:data-c3Id="c3.cat_id"
													:data-cName="c3.cat_name"
													>{{ c3.cat_name }}</a
												>
												<!-- <router-link
													:to="{
														name: 'search',
														query: { c3Id: c3.cat_id, c3Name: c3.cat_name },
													}"
													>{{ c3.cat_name }}</router-link
												> -->
												<!-- <a
													href="javascript:;"
													@click="
														$router.push({
															name: 'search',
															query: { c3Id: c3.cat_id, c3Name: c3.cat_name },
														})
													"
													>{{ c3.cat_name }}</a
												> -->
											</em>
										</dd>
									</dl>
								</div>
							</div>
						</div>
					</div>
				</div>
				</transition>

			</div>

			<nav class="nav">
				<a href="###">服装城</a>
				<a href="###">美妆馆</a>
				<a href="###">尚品汇超市</a>
				<a href="###">全球购</a>
				<a href="###">闪购</a>
				<a href="###">团购</a>
				<a href="###">有趣</a>
				<a href="###">秒杀</a>
			</nav>
		</div>
	</div>
</template>

<script>
import { mapState } from "vuex";
// import _ from 'lodash'
import throttle from "lodash/throttle";
export default {
	name: "TypeNav",
	data() {
		return {
			currentIndex: -1,
			isShow: true,
		};
	},
	mounted() {
		// this.$store.dispatch("getCategoryList");  更换位置到APP组件中

		if (this.$route.path !== "/home") {
			this.isShow = false;
		}
	},
	computed: {
		...mapState({
			categoryList: (state) => state.home.categoryList,
		}),
		categoryListSumIs15() {
			return this.categoryList.filter((item, idx) => idx <= 15);
		},
	},
	methods: {
		// _.throttle(func, [wait=0], [options={}])
		// moveInItem(index) {  未节流时候的函数
		// 	this.currentIndex = index
		// 	console.log(index)
		// }

		// 节流时的函数
		moveInItem: throttle(
			function (index) {
				this.currentIndex = index;
				console.log(index);
			},
			20,
			{ trailing: false }
		),

		moveOutDiv() {
			this.currentIndex = -1;

			if (this.$route.path !== "/home") {
				this.isShow = false;
			}
		},

		// 事件委派 函数
		toSearch(event) {
			// event是什么 每一次触发事件时,系统(浏览器内核)都会把这一次触发事件相关的所有信息,封装为一个对象. 在浏览器调用回调函数的时候, 自动传递给回调函数的第一个形参
			// 回调函数 自己定义 自己没调用 最后执行了.  所以toSearch在html中可以不用括号 vue中的回调参数顺序可以改变,但原生的不能改
			// event 是浏览器调用函数传递过来的时间对象, 代表你传递的$event, 只能在模板里出现

			let targetNode = event.target; // 获取目标元素
			let data = targetNode.dataset;
			console.log("data", data);
			let { c1id, c2id, c3id, cname } = data;

			if (cname) {
				// cname存在, 证明点击的就是a标签
				let location = {
					name: "search",
				};
				let query = {
					cName: cname,
				};

				// 确定是几级的ID
				if (c1id) {
					query.c1Id = c1id;
				} else if (c2id) {
					query.c2Id = c2id;
				} else {
					query.c3Id = c3id;
				}

				location.query = query;
				// 跳转之前, 要合并原来过来时的params参数
				if (this.$route.params) {
					location.params = this.$route.params
				}
				this.$router.push(location);
			}
		},
	},
};
</script>

<style lang="less" scoped>
.type-nav {
	border-bottom: 2px solid #e1251b;

	.container {
		width: 1200px;
		margin: 0 auto;
		display: flex;
		position: relative;

		.all {
			width: 210px;
			height: 45px;
			background-color: #e1251b;
			line-height: 45px;
			text-align: center;
			color: #fff;
			font-size: 14px;
			font-weight: bold;
		}

		.nav {
			a {
				height: 45px;
				margin: 0 22px;
				line-height: 45px;
				font-size: 16px;
				color: #333;
			}
		}

		.sort {
			position: absolute;
			left: 0;
			top: 45px;
			width: 210px;
			height: 461px;
			position: absolute;
			background: #fafafa;
			z-index: 999;

			&.sort-enter {
				height: 0;
				opacity: 0;
			}
			&.sort-enter-to {
				height: 461px;
				opacity: 1;
			}
			&.sort-enter-active {
				transition: all .5s;
			}
			.all-sort-list2 {
				.item {
					h3 {
						line-height: 30px;
						font-size: 14px;
						font-weight: 400;
						overflow: hidden;
						padding: 0 20px;
						margin: 0;

						a {
							color: #333;
						}
					}

					.item-list {
						display: none;
						position: absolute;
						width: 734px;
						min-height: 460px;
						background: #f7f7f7;
						left: 210px;
						border: 1px solid #ddd;
						top: 0;
						z-index: 9999 !important;

						.subitem {
							float: left;
							width: 650px;
							padding: 0 4px 0 8px;

							dl {
								border-top: 1px solid #eee;
								padding: 6px 0;
								overflow: hidden;
								zoom: 1;

								&.fore {
									border-top: 0;
								}

								dt {
									float: left;
									width: 54px;
									line-height: 22px;
									text-align: right;
									padding: 3px 6px 0 0;
									font-weight: 700;
								}

								dd {
									float: left;
									width: 415px;
									padding: 3px 0 0;
									overflow: hidden;

									em {
										float: left;
										height: 14px;
										line-height: 14px;
										padding: 0 8px;
										margin-top: 5px;
										border-left: 1px solid #ccc;
									}
								}
							}
						}
					}

					&.item_on {
						background-color: hotpink;
						.item-list {
							display: block;
						}
					}
				}
			}
		}
	}
}
</style>
