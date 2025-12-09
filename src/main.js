import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import router from './router'
import './theme.css'  // 引入暖色系主题

// 关闭 Vue 开发者工具
if (process.env.NODE_ENV === 'production') {
  window.__VUE_PROD_DEVTOOLS__ = false
}

createApp(App).use(router).use(ElementPlus).mount('#app')
