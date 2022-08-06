<template>
	<!--楼层-->
	<div class="floor">
		<div class="py-container">
			<div class="title clearfix">
				<h3 class="fl">{{ floor.name }}</h3>
				<div class="fr">
					<ul class="nav-tabs clearfix">
						<li
							class="active"
							v-for="(nav, index) in floor.navList"
							:key="nav.text"
						>
							<a href="#tab1" data-toggle="tab">{{ nav.text }}</a>
							<!-- <a href="#tab1" data-toggle="tab">热门</a> -->
						</li>
						<!-- <li>
							<a href="#tab2" data-toggle="tab">大家电</a>
						</li>
						<li>
							<a href="#tab3" data-toggle="tab">生活电器</a>
						</li>
						<li>
							<a href="#tab4" data-toggle="tab">厨房电器</a>
						</li>
						<li>
							<a href="#tab5" data-toggle="tab">应季电器</a>
						</li>
						<li>
							<a href="#tab6" data-toggle="tab">空气/净水</a>
						</li>
						<li>
							<a href="#tab7" data-toggle="tab">高端电器</a>
						</li> -->
					</ul>
				</div>
			</div>
			<div class="tab-content">
				<div class="tab-pane">
					<div class="floor-1">
						<div class="blockgary">
							<ul class="jd-list">
								<li v-for="(keyword, index) in floor.keywords" :key="index">
									{{ keyword }}
								</li>
							</ul>
							<!-- <img src="./images/floor-1-1.png" /> -->
							<img :src="floor.imgUrl" />
						</div>
						<div class="floorBanner">
							<!-- <div class="swiper-container" id="floor1Swiper" ref="floorSwiper">
								<div class="swiper-wrapper">
									<div
										class="swiper-slide"
										v-for="(carousel, index) in floor.carouselList"
										:key="carousel.id"
									> -->
										<!-- <img src="./images/floor-1-b01.png" /> -->
										<!-- <img :src="carousel.imgUrl" />
									</div> -->
									<!-- <div class="swiper-slide">
										<img src="./images/floor-1-b02.png" />
									</div>
									<div class="swiper-slide">
										<img src="./images/floor-1-b03.png" />
									</div> -->
								<!-- </div> -->
								<!-- 如果需要分页器 -->
								<!-- <div class="swiper-pagination"></div> -->

								<!-- 如果需要导航按钮 -->
								<!-- <div class="swiper-button-prev"></div>
								<div class="swiper-button-next"></div>
							</div> -->

							<SlideLoop :bannerList = "floor.carouselList"></SlideLoop>
						</div>
						<div class="split">
							<span class="floor-x-line"></span>
							<div class="floor-conver-pit">
								<!-- <img src="./images/floor-1-2.png" /> -->
								<img :src="floor.recommendList[0]" />
							</div>
							<div class="floor-conver-pit">
								<!-- <img src="./images/floor-1-3.png" /> -->
								<img :src="floor.recommendList[1]" />
							</div>
						</div>
						<div class="split center">
							<!-- <img src="./images/floor-1-4.png" /> -->
							<img :src="floor.bigImg" />
						</div>
						<div class="split">
							<span class="floor-x-line"></span>
							<div class="floor-conver-pit">
								<!-- <img src="./images/floor-1-5.png" /> -->
								<img :src="floor.recommendList[2]" />
							</div>
							<div class="floor-conver-pit">
								<!-- <img src="./images/floor-1-6.png" /> -->
								<img :src="floor.recommendList[3]" />
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
// import Swiper from "swiper";
export default {
	name: "GoodsFloor",
	// props: ['floor']
	props: {
		floor: {
			type: Object,
			required: true,
			default: function () {
				return {};
			},
		},
	},
	mounted() {
		// 在listContainer中, 轮播图直接在这实例化是不行的,最终采用watch+nextTick方案
		// 在floor中,直接成功了. 原因: 数据早已经获取了
		// new Swiper(this.$refs.floorSwiper, {
		// 	// direction: 'vertical', // 垂直切换选项
		// 	loop: true, // 循环模式选项
		// 	// 如果需要分页器
		// 	pagination: {
		// 		el: ".swiper-pagination",
		// 	},
		// 	// 如果需要前进后退按钮
		// 	navigation: {
		// 		nextEl: ".swiper-button-next",
		// 		prevEl: ".swiper-button-prev",
		// 	},
		// 	// 如果需要滚动条
		// 	scrollbar: {
		// 		el: ".swiper-scrollbar",
		// 	},
		// });
	},


};
</script>

<style lang="less" scoped>
.floor {
	margin-top: 15px;

	.py-container {
		width: 1200px;
		margin: 0 auto;

		.title {
			.fl {
				float: left;
				color: #c81623;
				font-size: 20px;
				line-height: 30px;
				margin: 9px 0;
				font-weight: 700;
			}

			.fr {
				float: right;

				.nav-tabs {
					margin: 10px 0 0;
					display: inline-block;

					li {
						float: left;
						line-height: 18px;

						a {
							padding-top: 1px;
							font-weight: 400;
							background-color: #fff;

							&::after {
								content: "|";
								padding: 0 10px;
							}
						}

						&:nth-child(7) {
							a {
								&::after {
									content: "";
								}
							}
						}

						&.active {
							a {
								color: #e1251b;
							}
						}
					}
				}
			}
		}

		.tab-content {
			border-top: 2px solid #c81623;
			border-bottom: 1px solid #e4e4e4;

			.tab-pane {
				.floor-1 {
					height: 360px;
					display: flex;

					.blockgary {
						width: 210px;
						height: 100%;
						background: #f7f7f7;

						.jd-list {
							padding: 15px 0;
							overflow: hidden;

							li {
								list-style-type: none;
								float: left;
								width: 40%;
								margin: 0 10px;
								border-bottom: 1px solid #e4e4e4;
								text-align: center;
								line-height: 26px;
							}
						}

						img {
							width: 100%;
						}
					}

					.floorBanner {
						width: 330px;
						height: 100%;
					}

					.split {
						width: 220px;
						height: 100%;
						position: relative;

						.floor-x-line {
							position: absolute;
							background: #e4e4e4;
							width: 220px;
							height: 1px;
							top: 180px;
						}

						.floor-conver-pit {
							width: 100%;
							height: 50%;

							img {
								width: 100%;
								height: 100%;
								transition: all 400ms;

								&:hover {
									opacity: 0.8;
								}
							}
						}
					}

					.center {
						border: 1px solid #e4e4e4;
					}
				}
			}
		}
	}
}
</style>
