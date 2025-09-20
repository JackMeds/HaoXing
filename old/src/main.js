import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from "axios";
import Vant from 'vant';
import 'vant/lib/index.css'

const app = createApp(App)
app.config.globalProperties.$axios = axios.create({
    baseURL: '/api', // 您的 API 基础 URL
    // 其他配置...
});;
app.use(router).use(Vant).mount('#app')
