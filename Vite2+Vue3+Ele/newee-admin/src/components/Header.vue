<template>
  <div class="header">
    <div class="left">
      <span style="font-size:20px;">{{ state.name }}</span>
    </div>
    <div class="right">右</div>
  </div>
</template>


<script setup>
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
// 获取路由实例
const router = useRouter()
// 声明路由和title对应的键值
const pathMap = {
  index: '首页',
  add: '添加商品'
}
const state = reactive({ name: '首页' })

//监听路由变化
router.afterEach(to => {
  // console.log('to', to)
  const { id } = to.query
  state.name = pathMap[to.name]
})
</script>

<style scoped>
.header {
  height: 50px;
  border-bottom: 1px solid #e9e9e9;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
}
</style>
