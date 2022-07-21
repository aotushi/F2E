<template>
  <div id="app">
    <!-- 测试内容 -->
    <!-- 测试内容2 -->
    <!-- 测试内容3 -->
    <!-- 测试内容4 -->
    <Header></Header>
    <router-view></router-view>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from '@/components/Header'
import Footer from '@/components/Footer'

  export default {
    name:'App',
    components: {
      // 非路由组件的注册
      Header,
      Footer
    }
  }
</script>

<style scoped>
  
</style>
