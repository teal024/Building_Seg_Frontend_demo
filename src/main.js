import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'// 导入路由配置文件
import ElementPlus from 'element-plus'// 导入elementPlus
import 'element-plus/dist/index.css'
import store from './store'// 导入vuex文件
import * as echarts from 'echarts';// 导入echarts文件
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const app = createApp(App)
app.use(ElementPlus)
app.use(router)
app.use(store)
// 将 ECharts 挂载到全局 Vue 实例的原型上
app.config.globalProperties.$echarts = echarts;
app.config.devtools = true;
app.mount('#app')

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
app.use(pinia)

