import Vue from 'vue'
import App from './App.vue'
import router from '@/router'

Vue.config.productionTip = false
Vue.config.devtools = true;

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
