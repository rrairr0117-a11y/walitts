import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  base: './',  // 关键设置：让资源路径相对
  plugins: [vue()],
  server: {
    host: '127.0.0.1',  // 强制使用 IPv4，避免 Windows IPv6/IPv4 兼容性问题
    port: 5173
  }
})
