import '@/api'
import App from '@/App.vue'
import TypeNav from '@/components/TypeNav'
import router from '@/router'
import store from '@/store'
// import 'swiper/css/swiper.css'
import 'swiper/css/swiper.css'
import Vue from 'vue'

import SlideLoop from '@/components/SlideLoop'
import '@/mock/mockServer'

// 全局注册组件 (非路由组件被搜歌组件使用,那么定义在components中,注册在全局)
Vue.component('TypeNav', TypeNav)
Vue.component('SlideLoop', SlideLoop)


Vue.config.productionTip = false

new Vue({
  el: "#app",
  router,
  store,
  render: h => h(App),
  
})
