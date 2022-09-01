import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'normalize.css'
import '@/assets/styles/common.less'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import "@/router/permission"

// 创建一个vue应用实例
let app = createApp(App)
app.use(ElementPlus, {
  locale: zhCn,
})
app.use(store)
app.use(router)
app.use(ElementPlus)
app.mount('#app')