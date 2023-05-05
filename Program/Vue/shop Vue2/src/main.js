import '@/api'
import * as API from '@/api'
import App from '@/App.vue'
import Pagination from '@/components/Pagination'
import SlideLoop from '@/components/SlideLoop'
import TypeNav from '@/components/TypeNav'
import '@/mock/mockServer'
import router from '@/router'
import store from '@/store'
import 'swiper/css/swiper.css'
import Vue from 'vue'

import { Button, Message, MessageBox } from 'element-ui'

// 全局注册组件 (非路由组件被搜歌组件使用,那么定义在components中,注册在全局)
Vue.component('TypeNav', TypeNav)
Vue.component('SlideLoop', SlideLoop)
Vue.component('Pagination', Pagination)
Vue.use(Button)
// Vue.component(Button.name, Button)

Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;
Vue.prototype.$message = Message;

Vue.config.productionTip = false



import loading from '@/assets/images/loading.gif'
import VueLazyload from 'vue-lazyload'

Vue.use(VueLazyload, { // 内部自定义了一个指令lazy
  loading //指定未加载得到图片之前的loading图片
})

new Vue({
  beforeCreate() { 
    Vue.prototype.$bus = this //全局事件总线 任意组件内部可以通过this.$bus访问到vm实例
    Vue.prototype.$API = API
  },
  el: "#app",
  router,
  store,
  render: h => h(App),
  
})
