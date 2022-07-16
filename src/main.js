import App from '@/App.vue'
import Vue from 'vue'

Vue.config.productionTip = false

new Vue({
  el: "#app",
  render: h=>h(App)
})
