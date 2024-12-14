<template>
	<div>
		<TypeNav></TypeNav>
		<ListContainer></ListContainer>
		<TodayRecommend></TodayRecommend>
		<GoodsRank></GoodsRank>
		<GuessWhatLike></GuessWhatLike>
		<!-- <GoodsFloor></GoodsFloor>
		<GoodsFloor></GoodsFloor> -->
		<GoodsFloor v-for="(floor, index) in floorList" :key="floor.id" :floor="floor"></GoodsFloor>
		<GoodsBrands></GoodsBrands>
	</div>
</template>

<script>
import ListContainer from "./ListContainer";
import TodayRecommend from "./Recommend";
import GoodsRank from "./Rank";
import GuessWhatLike from "./GuessWhatLike";
import GoodsFloor from "./GoodsFloor";
import GoodsBrands from "./Brands";
import { mapState } from 'vuex';


export default {
	name: "HomeComponent",
	components: {
		ListContainer,
		TodayRecommend,
		GoodsRank,
		GuessWhatLike,
		GoodsFloor,
		GoodsBrands,
	},
  mounted() {
		this.$store.dispatch('getFloorList')
  },

  // 从vuex当中拿数据到vue中,使用computed; 拿方法使用methods
  // 
  computed: {
		...mapState({
			floorList: state => state.home.floorList
		})
  }
};
</script>

<style lang="less" scoped></style>
