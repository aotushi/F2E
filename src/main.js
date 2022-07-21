import App from '@/App.vue'
import router from '@/router'
import Vue from 'vue'

Vue.config.productionTip = false

new Vue({
  el: "#app",
  render: h => h(App),
  router
})
