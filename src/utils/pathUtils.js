// 路径工具函数
// 处理本地开发和 Docker 环境的路径差异

/**
 * 将各种格式的路径转换为可访问的 URL
 * @param {string} path - 原始路径
 * @returns {string} - 可访问的 URL
 */
export function toAccessibleUrl(path) {
  if (!path) return ''
  
  // 如果已经是 HTTP URL，直接返回
  if (/^https?:\/\//i.test(path)) return path
  
  // 如果是 file:// 协议，直接返回
  if (/^file:\/\//i.test(path)) return path
  
  // 处理 Docker 容器内的绝对路径
  let processedPath = path
  
  // 1. 处理 IndexTTS outputs 路径（静态挂载为 /outputs）
  if (path.startsWith('/app/IndexTTS-2/outputs/')) {
    processedPath = path.replace('/app/IndexTTS-2/outputs/', '/outputs/')
  } 
  // 2. 处理 voices 路径（静态通过 /audio/voices 访问，避免与 /voices API 前缀冲突）
  else if (path.startsWith('/app/IndexTTS-2/voices/')) {
    // /app/IndexTTS-2/voices/xxx.mp3 -> /audio/voices/xxx.mp3
    processedPath = path.replace('/app/IndexTTS-2/voices/', '/audio/voices/')
  }
  // 3. 处理 prompts 路径
  else if (path.startsWith('/app/IndexTTS-2/prompts/')) {
    processedPath = path.replace('/app/IndexTTS-2/prompts/', '/prompts/')
  }
  // 4. 处理其他 IndexTTS 路径
  else if (path.startsWith('/app/IndexTTS-2/')) {
    processedPath = path.replace('/app/IndexTTS-2/', '/outputs/')
  }
  // 5. 处理 Windows 绝对路径（本地开发）
  else if (/^[A-Z]:\\/i.test(path)) {
    // 如果是本地开发，使用 Electron 的 pathToFileUrl
    if (window.native?.pathToFileUrl) {
      return window.native.pathToFileUrl(path)
    }
    // 否则尝试提取相对路径部分
    const match = path.match(/outputs[\\\/](.+)$/i) || path.match(/voices[\\\/](.+)$/i)
    if (match) {
      processedPath = '/' + match[0].replace(/\\/g, '/')
    }
  }
  // 6. 处理相对路径（如 voices/xxx.mp3）
  else if (!path.startsWith('/')) {
    // 根据路径前缀决定挂载点
    if (path.startsWith('voices/')) {
      // 相对 voices 路径统一映射到 /audio/voices 静态目录
      // voices/xxx.mp3 -> /audio/voices/xxx.mp3
      processedPath = '/audio/voices/' + path.substring(7)
    } else if (path.startsWith('outputs/')) {
      processedPath = '/outputs/' + path.substring(8)
    } else {
      // 默认作为 outputs
      processedPath = '/outputs/' + path
    }
  }
  
  // 如果处理后的路径不是完整 URL，加上 API 基础 URL
  if (!processedPath.startsWith('http') && !processedPath.startsWith('file')) {
    const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8300'
    return baseUrl + processedPath
  }
  
  return processedPath
}

/**
 * 判断是否为 Docker 环境的路径
 * @param {string} path - 路径
 * @returns {boolean}
 */
export function isDockerPath(path) {
  return path && path.startsWith('/app/')
}

/**
 * 判断是否为 Windows 路径
 * @param {string} path - 路径
 * @returns {boolean}
 */
export function isWindowsPath(path) {
  return path && /^[A-Z]:\\/i.test(path)
}
