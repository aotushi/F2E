<template>
  <el-table :loading="state.loading" :data="state.tableData" tooltip-effect="dark" style="width: 100%"
    @selection-change="handleSelectionChange">
    <slot name='column'></slot>
  </el-table>
  <el-pagination background layout="prev, pager, next" :total="state.total" :page-size="state.pageSize"
    :current-page="state.currentPage" @current-change="changePage" />
</template>

<script setup>
import axios from '@/utils/axios';
import { onMounted, reactive } from 'vue';

const props = defineProps({
  action: String
})
const state = reactive({
  loading: false,
  tableData: [], // 数据列表
  total: 0, // 总条数
  currentPage: 1, // 当前页
  pageSize: 10, // 分页大小
  multipleSelection: [], // 多选框
})
// 初始化钩子函数
onMounted(() => {
  getList()
})
// 获取列表方法
const getList = () => {
  state.loading = true
  axios.get(props.action, {
    params: {
      pageNumber: state.currentPage,
      pageSize: state.pageSize
    }
  }).then(res => {
    state.tableData = res.list
    state.total = res.totalCount
    state.currentPage = res.currPage
    state.loading = false
  })
}
// 选项
const handleSelectionChange = (val) => {
  state.multipleSelection = val
}
// 分页方法
const changePage = (val) => {
  state.currentPage = val
  getList()
}
// script setup 写法，需要通过 defineExpose 方法，将属性暴露出去，才能在父组件通过 ref 形式拿到本组件的内部参数
defineExpose({ state: state, getList: getList })
</script>
