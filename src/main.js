import Vue from 'vue'
import App from './App.vue'
import Vant from 'vant'
import 'vant/lib/index.css'
import VueRouter from 'vue-router';//使用插件
import axios from 'axios'
import router from './router/index'
Vue.config.productionTip = false


Vue.prototype.$axios = axios
Vue.use(Vant)  //全局引入
Vue.use(VueRouter)
new Vue({
  render: h => h(App),
  router:router
}).$mount('#app')
