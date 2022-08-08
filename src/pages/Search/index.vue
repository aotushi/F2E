<template>
	<div>
		<TypeNav />
		<div class="main">
			<div class="py-container">
				<!--bread-->
				<div class="bread">
					<ul class="fl sui-breadcrumb">
						<li>
							<a href="#">全部结果</a>
						</li>
					</ul>
					<ul class="fl sui-tag">
						<li class="with-x" v-if="searchParams.categoryName">
							{{ searchParams.categoryName
							}}<i @click="removeCategoryName">×</i>
						</li>
						<li class="with-x" v-if="searchParams.keyword">
							{{ searchParams.keyword
							}}<i @click="removeKeyWord">×</i>
						</li>
						<li class="with-x" v-if="searchParams.trademark">
							{{ searchParams.trademark.split(":")[1]
							}}<i @click="removeTrademark">×</i>
						</li>
						<li
							class="with-x"
							v-for="(prop, index) in searchParams.props"
							:key="prop"
						>
							{{ prop.split(":")[1]
							}}<i @click="removeProp(index)">×</i>
						</li>
					</ul>
				</div>

				<!--selector-->
				<SearchSelector
					@searchForTrademark="searchForTrademark"
					@searchForProps="searchForProps"
				/>

				<!--details-->
				<div class="details clearfix">
					<div class="sui-navbar">
						<div class="navbar-inner filter">
							<ul class="sui-nav">
								<!-- <li :class="{active:searchParams.order.split(':')[0] ==='1'}"> -->
								<li :class="{ active: sortFlag === '1' }">
									<a
										href="javascript:;"
										@click="changeSort('1')"
									>
										综合
										<i
											v-if="sortFlag==='1'"
											class="iconfont"
											:class="{
												icondown: sortType === 'desc',
												iconup: sortType === 'asc',
											}"
										></i>
									</a>
								</li>
								<li :class="{ active: sortFlag === '2' }">
									<a
										href="javascript:;"
										@click="changeSort('2')"
									>
										价格
										<i
											v-if="sortFlag === '2'"
											class="iconfont"
											:class="{
												icondown: sortType === 'desc',
												iconup: sortType === 'asc',
											}"
										></i>
									</a>
								</li>
							</ul>
						</div>
					</div>
					<!-- 详情页 -->
					<div class="goods-list">
						<ul class="yui3-g">
							<li
								class="yui3-u-1-5"
								v-for="(goods, index) in goodsList"
								:key="goods.id"
							>
								<div class="list-wrap">
									<div class="p-img">
										<!-- <a href="javascript:;" target="_blank"
                      ><img :src="goods.defaultImg"
                    /></a> -->
										<router-link
											:to="'/detail/' + goods.id"
										>
											<!-- <img v-lazy="goods.defaultImg" /> -->
											<img :src="goods.defaultImg" />
										</router-link>
									</div>
									<div class="price">
										<strong>
											<em>¥</em>
											<i>{{ goods.price }}</i>
										</strong>
									</div>
									<div class="attr">
										<!-- <a
                      target="_blank"
                      href="item.html"
                      title="促销信息，下单即赠送三个月CIBN视频会员卡！【小米电视新品4A 58 火爆预约中】"
                      >{{ goods.title }}</a
                    > -->
										<router-link
											:to="'/detail/' + goods.id"
										>
											{{ goods.title }}
										</router-link>
									</div>
									<div class="commit">
										<i class="command"
											>已有<span>2000</span>人评价</i
										>
									</div>
									<div class="operate">
										<a
											href="success-cart.html"
											target="_blank"
											class="sui-btn btn-bordered btn-danger"
											>加入购物车</a
										>
										<a
											href="javascript:void(0);"
											class="sui-btn btn-bordered"
											>收藏</a
										>
									</div>
								</div>
							</li>
						</ul>
					</div>
					<!-- 分页器 -->
					<!-- <div class="fr page"> -->
					<Pagination
						:currentPageNo="searchParams.pageNo"
						:total="searchInfo.total"
						:pageSize="searchParams.pageSize"
						:continueNo="5"
						@changePageNo="changePageNo"
					></Pagination>
					<!-- </div> -->
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import SearchSelector from "./SearchSelector/SearchSelector";
export default {
	name: "Search",
	components: {
		SearchSelector,
	},
	data() {
		return {
			searchParams: {
				// 这个对象我们称作初始化所有的搜索参数
				// 只要作为搜索条件,所有相关数据,全部现在这个对象内部初始化
				category1Id: "",
				category2Id: "",
				category3Id: "", 
				categoryName: "",
				keyword: "",
				props: [],
				trademark: "",

				// 默认搜索条件
				order: "1:desc",  // 排序规则, 排序是后台排序的.我们搜索的时候得给后台一个默认的排序规则
				pageNo: 1,  //搜索第几页的商品, 分页也是后台做好的,我们也得告诉后台我们要第几页的数据
				pageSize: 10, //每页多少个商品,告诉后台,每页回来多少个商品,默认10个
			},
		};
	},
	// 按照分类名称和关键字进行搜索
	beforeMount() {
		this.handlerSearchParams();
	},
	mounted() {
		// 点击跳转过来,是在这里发请求的
		this.getSearchInfo();
		this.getSearchInfo2();
	},
	methods: {
		getSearchInfo() {
			this.$store.dispatch("getSearchInfo", this.searchParams);
		},
		getSearchInfo2() {
			this.$store.dispatch('getSearchInfo2')
		},
		// 封装函数handlerSearchParams, 因为重复出现在beforeMount和watch函数中.
		handlerSearchParams() {
			let {
				category1Id,
				category2Id,
				category3Id,
				categoryName,
			} = this.$route.query;

			let { keyword } = this.$route.params;

			// 可以保证当前searchParams一定包含了点击传递过来的搜索条件
			let searchParams = {
				...this.searchParams,
				category1Id,
				category2Id,
				category3Id,
				categoryName,
				keyword,
			};
			// 使用forEach(将对象属性转换为数组)循环对象,判断是否有空值,变为undefined.不传送,节省带宽.
			Object.keys(searchParams).forEach((key) => {
				if (searchParams[key] === "") {
					delete searchParams[key];
				}
			});
			this.searchParams = searchParams;
		},

		// 删除分类名称
		removeCategoryName() {
			this.searchParams.category1Id = undefined;
			this.searchParams.category2Id = undefined;
			this.searchParams.category3Id = undefined;
			this.searchParams.categoryName = undefined; // '' 空串也会被发送, 但是undefined不会发送请求
			// this.getSearchInfo();
			// 更新页码
			this.searchParams.pageNo = 1;
			// 更新路径后删除相应参数 只保留了params参数
			this.$router.replace({
				name: "search",
				params: this.$route.params,
			});
		},

		// 删除关键字搜索条件,重新发送请求
		removeKeyWord() {
			this.searchParams.keyword = undefined;
			this.$bus.$emit("clearKeyword"); // 通知header组件清除关键字
			// this.getSearchInfo();
			// 更新页码
			this.searchParams.pageNo = 1;
			this.$router.replace({ name: "search", query
      : this.$route.query });
		},

		// 删除品牌,重新发请求
		removeTrademark() {
			this.searchParams.trademark = undefined;
			// 更新页码
			this.searchParams.pageNo = 1;
			this.getSearchInfo();
		},

		// 用户点击品牌后,根据品牌搜索重新发请求
		searchForTrademark(trademark) {
			this.searchParams.trademark = `${trademark.tmId}:${trademark.tmName}`;
			// 更新页码
			this.searchParams.pageNo = 1;
			this.getSearchInfo();
		},

		//用户点击属性后,根据属性重新发送请求
		searchForProps(attrValue, attr) {
			let prop = `${attr.attrId}:${attrValue}:${attr.attrName}`;
			let isRepeate = this.searchParams.props.some(
				(item) => item === prop
			);
			if (isRepeate) {
				return;
			}
			this.searchParams.props.push(prop);
			// 更新页码
			this.searchParams.pageNo = 1;
			this.getSearchInfo();
		},
		// 用户点击删除属性后,重新发送请求
		removeProp(index) {
			this.searchParams.props.splice(index, 1);
			// 更新页码
			this.searchParams.pageNo = 1;
			this.getSearchInfo();
		},
		// 点击总和/排序链接的排序回调
		changeSort(sortFlag) {
			// 用户点击的是否和原来的排序标志是否一样

			// 获取原来的排序信息
			let originSortFlag = this.sortFlag;
			let originSortType = this.sortType;
			let newOrder = "";
			// 判断用户点击的是否是原来的
			if (sortFlag === originSortFlag) {
				// !originSortType
				newOrder = `${originSortFlag}:${
					originSortType === "asc" ? "desc" : "asc"
				}`;
			} else {
				// 假设用户点击的排序标志和原来不一样,更新; 排序蜡型,默认.
				newOrder = `${sortFlag}:desc`;
			}
			this.searchParams.order = newOrder;
			this.getSearchInfo();
		},
		// 分页器点击切换页面的时候,触发的自定义事件
		changePageNo(page) {
			this.searchParams.pageNo = page;
			this.getSearchInfo();
		},
	},
	computed: {
		...mapGetters(["goodsList"]),
		...mapState({
			searchInfo: (state) => state.search.searchInfo,
		}),
		// 优化sortFlag和sortType
		sortFlag() {
			return this.searchParams.order.split(":")[0];
		},
		sortType() {
			return this.searchParams.order.split(":")[1];
		},
	},
	watch: {
		$route() {
			this.handlerSearchParams();
			this.getSearchInfo();
		},
	},
};
</script>

<style lang="less" scoped>
.main {
	margin: 10px 0;

	.py-container {
		width: 1200px;
		margin: 0 auto;

		.bread {
			margin-bottom: 5px;
			overflow: hidden;

			.sui-breadcrumb {
				padding: 3px 15px;
				margin: 0;
				font-weight: 400;
				border-radius: 3px;
				float: left;

				li {
					display: inline-block;
					line-height: 18px;

					a {
						color: #666;
						text-decoration: none;

						&:hover {
							color: #4cb9fc;
						}
					}
				}
			}

			.sui-tag {
				margin-top: -5px;
				list-style: none;
				font-size: 0;
				line-height: 0;
				padding: 5px 0 0;
				margin-bottom: 18px;
				float: left;

				.with-x {
					font-size: 12px;
					margin: 0 5px 5px 0;
					display: inline-block;
					overflow: hidden;
					color: #000;
					background: #f7f7f7;
					padding: 0 7px;
					height: 20px;
					line-height: 20px;
					border: 1px solid #dedede;
					white-space: nowrap;
					transition: color 400ms;
					cursor: pointer;

					i {
						margin-left: 10px;
						cursor: pointer;
						font: 400 14px tahoma;
						display: inline-block;
						height: 100%;
						vertical-align: middle;
					}

					&:hover {
						color: #28a3ef;
					}
				}
			}
		}

		.details {
			margin-bottom: 5px;

			.sui-navbar {
				overflow: visible;
				margin-bottom: 0;

				.filter {
					min-height: 40px;
					padding-right: 20px;
					background: #fbfbfb;
					border: 1px solid #e2e2e2;
					padding-left: 0;
					border-radius: 0;
					box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

					.sui-nav {
						position: relative;
						left: 0;
						display: block;
						float: left;
						margin: 0 10px 0 0;

						li {
							float: left;
							line-height: 18px;

							a {
								display: block;
								cursor: pointer;
								padding: 11px 15px;
								color: #777;
								text-decoration: none;
							}

							&.active {
								a {
									background: #e1251b;
									color: #fff;
								}
							}
						}
					}
				}
			}

			.goods-list {
				margin: 20px 0;

				ul {
					display: flex;
					flex-wrap: wrap;

					li {
						height: 100%;
						width: 20%;
						margin-top: 10px;
						line-height: 28px;

						.list-wrap {
							.p-img {
								padding-left: 15px;
								width: 215px;
								height: 255px;

								a {
									color: #666;

									img {
										max-width: 100%;
										height: auto;
										vertical-align: middle;
									}
								}
							}

							.price {
								padding-left: 15px;
								font-size: 18px;
								color: #c81623;

								strong {
									font-weight: 700;

									i {
										margin-left: -5px;
									}
								}
							}

							.attr {
								padding-left: 15px;
								width: 85%;
								overflow: hidden;
								margin-bottom: 8px;
								min-height: 38px;
								cursor: pointer;
								line-height: 1.8;
								display: -webkit-box;
								-webkit-box-orient: vertical;
								-webkit-line-clamp: 2;

								a {
									color: #333;
									text-decoration: none;
								}
							}

							.commit {
								padding-left: 15px;
								height: 22px;
								font-size: 13px;
								color: #a7a7a7;

								span {
									font-weight: 700;
									color: #646fb0;
								}
							}

							.operate {
								padding: 12px 15px;

								.sui-btn {
									display: inline-block;
									padding: 2px 14px;
									box-sizing: border-box;
									margin-bottom: 0;
									font-size: 12px;
									line-height: 18px;
									text-align: center;
									vertical-align: middle;
									cursor: pointer;
									border-radius: 0;
									background-color: transparent;
									margin-right: 15px;
								}

								.btn-bordered {
									min-width: 85px;
									background-color: transparent;
									border: 1px solid #8c8c8c;
									color: #8c8c8c;

									&:hover {
										border: 1px solid #666;
										color: #fff !important;
										background-color: #666;
										text-decoration: none;
									}
								}

								.btn-danger {
									border: 1px solid #e1251b;
									color: #e1251b;

									&:hover {
										border: 1px solid #e1251b;
										background-color: #e1251b;
										color: white !important;
										text-decoration: none;
									}
								}
							}
						}
					}
				}
			}

			.page {
				width: 733px;
				height: 66px;
				overflow: hidden;
				float: right;

				.sui-pagination {
					margin: 18px 0;

					ul {
						margin-left: 0;
						margin-bottom: 0;
						vertical-align: middle;
						width: 490px;
						float: left;

						li {
							line-height: 18px;
							display: inline-block;

							a {
								position: relative;
								float: left;
								line-height: 18px;
								text-decoration: none;
								background-color: #fff;
								border: 1px solid #e0e9ee;
								margin-left: -1px;
								font-size: 14px;
								padding: 9px 18px;
								color: #333;
							}

							&.active {
								a {
									background-color: #fff;
									color: #e1251b;
									border-color: #fff;
									cursor: default;
								}
							}

							&.prev {
								a {
									background-color: #fafafa;
								}
							}

							&.disabled {
								a {
									color: #999;
									cursor: default;
								}
							}

							&.dotted {
								span {
									margin-left: -1px;
									position: relative;
									float: left;
									line-height: 18px;
									text-decoration: none;
									background-color: #fff;
									font-size: 14px;
									border: 0;
									padding: 9px 18px;
									color: #333;
								}
							}

							&.next {
								a {
									background-color: #fafafa;
								}
							}
						}
					}

					div {
						color: #333;
						font-size: 14px;
						float: right;
						width: 241px;
					}
				}
			}
		}
	}
}
</style>
