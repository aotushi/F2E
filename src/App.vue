<template>
  <div id="app">
    <Header></Header>
    <router-view></router-view>
    <Footer v-show="!$route.meta.isHidden"></Footer>
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
