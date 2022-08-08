import '@/api'
import App from '@/App.vue'
import TypeNav from '@/components/TypeNav'
import router from '@/router'
import store from '@/store'
// import 'swiper/css/swiper.css'
import Pagination from '@/components/Pagination'
import SlideLoop from '@/components/SlideLoop'
import '@/mock/mockServer'
import 'swiper/css/swiper.css'
import Vue from 'vue'

// 全局注册组件 (非路由组件被搜歌组件使用,那么定义在components中,注册在全局)
Vue.component('TypeNav', TypeNav)
Vue.component('SlideLoop', SlideLoop)
Vue.component('Pagination', Pagination)


Vue.config.productionTip = false

new Vue({
  beforeCreate() { 
    Vue.prototype.$bus = this //全局事件总线 任意组件内部可以通过this.$bus访问到vm实例
  },
  el: "#app",
  router,
  store,
  render: h => h(App),
  
})
