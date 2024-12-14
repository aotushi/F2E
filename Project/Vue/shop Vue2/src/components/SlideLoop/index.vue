<template>
	<div class="swiper-container" id="mySwiper" ref="bannerSwiper">
		<div class="swiper-wrapper">
			<div
				class="swiper-slide"
				v-for="(banner, index) in bannerList"
				:key="banner.id"
			>
				<!-- <img src="./images/banner1.jpg" /> -->
				<img :src="banner.imgUrl" />
			</div>
		</div>
		<!-- 如果需要分页器 -->
		<div class="swiper-pagination"></div>

		<!-- 如果需要导航按钮 -->
		<div class="swiper-button-prev"></div>
		<div class="swiper-button-next"></div>
	</div>
</template>

<script>
import Swiper from 'swiper'
export default {
	name: "SlideLoop",
  props: {
    bannerList: {
      type: Array,
      required: true,
      default: () => []
    }
  },
	watch: {
		// 统一两个组件中 使用swiper的形式
		// 这里无法监视floor的, 因为数据早过来了. 添加immediate
		bannerList: {
			handler(newVal, oldVal) {
				this.$nextTick(() => {
					new Swiper(this.$refs.bannerSwiper, {
						// direction: 'vertical', // 垂直切换选项
						loop: true, // 循环模式选项

						// 如果需要分页器
						pagination: {
							el: ".swiper-pagination",
						},

						// 如果需要前进后退按钮
						navigation: {
							nextEl: ".swiper-button-next",
							prevEl: ".swiper-button-prev",
						},

						// 如果需要滚动条
						scrollbar: {
							el: ".swiper-scrollbar",
						},
					});
				});
			},
			immediate: true,
		},
	},
};
</script>

<style scoped>
</style>
