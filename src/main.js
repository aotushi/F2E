import '@/api'
import App from '@/App.vue'
import TypeNav from '@/components/TypeNav'
import router from '@/router'
import store from '@/store'
import Vue from 'vue'
// 全局注册组件 (非路由组件被搜歌组件使用,那么定义在components中,注册在全局)
Vue.component('TypeNav', TypeNav)


Vue.config.productionTip = false

new Vue({
  el: "#app",
  router,
  store,
  render: h => h(App),
  
})
