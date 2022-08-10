<template>
	<div class="swiper-container" ref="imgSwiper">
		<div class="swiper-wrapper">
			<!-- vfor遍历任何东西都不会报错 -->
			<div class="swiper-slide" v-for="(img, index) in imgList" :key="img.id">
				<img
					:src="img.imgUrl"
					@click="changeDefaultIndex(index)"
					:class="{ active: index === defaultIndex }"
				/>
			</div>
		</div>
		<div class="swiper-button-next"></div>
		<div class="swiper-button-prev"></div>
	</div>
</template>

<script>
import Swiper from "swiper";
export default {
	name: "ImageList",
	data() {
		return {
			defaultIndex: 0,
		};
	},
	props: ["imgList"],
	methods: {
		changeDefaultIndex(index) {
			this.defaultIndex = index;
			this.$bus.$emit("changeDefaultIndex", index);
		},
	},
	watch: {
		bannerList: {
			immediate: true,
			handler(newValue, oldValue) {
				this.$nextTick(() => {
					new Swiper(this.$refs.imgSwiper, {
						// loop: true,
						// 如果需要前进后退按钮
						navigation: {
							nextEl: ".swiper-button-next",
							prevEl: ".swiper-button-prev",
						},
						slidesPerView: 4,
						slidesPerGroup: 2,
					});
				});
			},
		},
	},
};
</script>

<style lang="less" scoped>
.swiper-container {
	height: 56px;
	width: 412px;
	box-sizing: border-box;
	padding: 0 12px;
	.swiper-slide {
		width: 56px;
		height: 56px;
		img {
			width: 100%;
			height: 100%;
			border: 1px solid #ccc;
			padding: 2px;
			width: 50px;
			height: 50px;
			display: block;
			&.active {
				border: 2px solid #f60;
				padding: 1px;
			}
			// &:hover {
			//   border: 2px solid #f60;
			//   padding: 1px;
			// }
		}
	}
	.swiper-button-next {
		left: auto;
		right: 0;
	}
	.swiper-button-prev {
		left: 0;
		right: auto;
	}
	.swiper-button-next,
	.swiper-button-prev {
		box-sizing: border-box;
		width: 12px;
		height: 56px;
		background: rgb(235, 235, 235);
		border: 1px solid rgb(204, 204, 204);
		top: 0;
		margin-top: 0;
		&::after {
			font-size: 12px;
		}
	}
}
</style>
