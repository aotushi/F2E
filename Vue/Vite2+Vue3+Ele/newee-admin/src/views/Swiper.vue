<template>
	<el-card class="swiper-container">
		<div class="header">
			<el-button type="primary" size="small" :icon="Plus" @click="handleAdd">增加</el-button>
			<el-popconfirm title="确定删除吗?" confirmButtonText="确定" cancelButtonText="取消" @confirm="handleDelete">
				<template #reference>
					<el-button type="danger" size="small" :icon="Delete">批量删除</el-button>
				</template>
			</el-popconfirm>
		</div>
		<el-table
			v-loading="state.loading"
			:data="state.tableData"
			tooltip-effect="dark"
			style="width: 100%"
			ref="multipleTable"
			@selection-change="handleSelectionChange"
			max-height="750"
		>
			<el-table-column type="selection" width="55"></el-table-column>
			<el-table-column label="轮播图" width="200">
				<template #default="scope">
					<img style="width: 150px; height: 150px" :src="scope.row.carouselUrl" alt="轮播图" />
				</template>
			</el-table-column>
			<el-table-column label="跳转链接">
				<template #default="scope">
					<a target="_blank" :href="scope.row.redirectUrl">{{ scope.row.redirectUrl }}</a>
				</template>
			</el-table-column>
			<el-table-column prop="carouselRank" label="排序值" width="120"></el-table-column>
			<el-table-column prop="createTime" label="添加时间" width="200"></el-table-column>
		</el-table>
		<el-pagination
			background
			layout="prev,pager,next"
			:total="state.total"
			:page-size="state.pageSize"
			:current-page="state.currentPage"
			@current-change="changePage"
			style="justify-content: center"
		/>
	</el-card>
	<DialogAddSwiperVue ref="addSwiper" :reload="getCarousels" :type="state.type" />
</template>

<script setup>
import axios from "@/utils/axios";
import { Delete, Plus } from "@element-plus/icons-vue";
import { onMounted, reactive, ref } from "vue";
import DialogAddSwiperVue from "../components/DialogAddSwiper.vue";

const state = reactive({
	loading: false,
	tableData: [],
	currentPage: 1,
	pageSize: 20,
	type: "add", // 操作类型
	multipleSelection: [], // 选中项
	total: 0, // 总条数
});

const addSwiper = ref(null);

const handleSelectionChange = (val) => {
	state.multipleSelection = val;
};

// 批量删除
const handleDelete = () => {
	if (!state.multipleSelection.length) {
		return ElMessage.error("请选择项");
	}

	axios
		.delete("/carousels", {
			data: {
				ids: state.multipleSelection.map((i) => i.carouselId),
			},
		})
		.then(() => {
			ElMessage.success("删除成功");
			getCarousels();
		});
};

onMounted(() => {
	getCarousels();
});

// 获取轮播图列表
const getCarousels = () => {
	state.loading = true;
	axios
		.get("/carousels", {
			params: {
				pageNumber: state.currentPage,
				pageSize: state.pageSize,
			},
		})
		.then((res) => {
			state.tableData = res.list;
			state.loading = false;
			state.total = res.totalCount;
			state.currentPage = res.currPage;
		});
};
// 添加轮播项
const handleAdd = () => {
	state.type = "add";
	addSwiper.value.open();
};
// 修改轮播图
const handleEdit = (id) => {
	state.type = "edit";
	addSwiper.value.open(id);
};

// 点击分页
const changePage = (page) => {
	state.currentPage = page;
	getCarousels();
};
</script>

<style scoped>
.swiper-container {
	/* height: calc(100vh - 100px); */
	height: 100%;
}
</style>
