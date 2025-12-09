// src/api/config.js
import axios from 'axios'

// 后端 API 配置
// 用户可以在设置中切换本地或远程后端
const API_ENDPOINTS = {
  local: 'http://127.0.0.1:8300',      // 本地 Docker 后端
  remote: 'https://your-api.com'       // 远程 TTS 服务（仙宫云等）
}

// 从 localStorage 读取用户选择，默认使用本地
const getBaseURL = () => {
  const savedEndpoint = localStorage.getItem('api_endpoint')
  return savedEndpoint || API_ENDPOINTS.local
}

const service = axios.create({
  baseURL: getBaseURL(),
  timeout: 1000000
})

// 导出切换 API 的方法
export const switchAPI = (type) => {
  const newURL = API_ENDPOINTS[type]
  if (newURL) {
    localStorage.setItem('api_endpoint', newURL)
    service.defaults.baseURL = newURL
    console.log('API 切换到:', newURL)
  }
}

// 导出当前 API 地址
export const getCurrentAPI = () => service.defaults.baseURL

// 导出可用的 API 端点
export { API_ENDPOINTS }

// 请求拦截器
service.interceptors.request.use(
  config => {
    // 这里可以加 token
    return config
  },
  error => Promise.reject(error)
)

// 响应拦截器
service.interceptors.response.use(
  response => response.data,
  error => {
    console.error('API Error:', error)
    return Promise.reject(error)
  }
)

export default service
