import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import App from './App.vue'
import router from './router'
import axios from "axios";

// axios.defaults.baseURL="http://localhost:3000"



const app = createApp(App)
app.config.globalProperties.$http=axios;

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }

app.use(ElementPlus)
// app.mount('#app')

app.use(router).mount('#app')
