// 授权管理 API
import request from './config'

/**
 * 获取所有授权配置
 */
export function fetchLicenseProviders() {
  return request.get('/license_providers/').then(res => {
    if (res.code === 200) {
      return res.data
    }
    return []
  })
}

/**
 * 获取单个授权配置
 */
export function getLicenseProvider(id) {
  return request.get(`/license_providers/${id}`)
}

/**
 * 创建授权配置
 */
export function createLicenseProvider(data) {
  return request.post('/license_providers/', data)
}

/**
 * 更新授权配置
 */
export function updateLicenseProvider(id, data) {
  return request.put(`/license_providers/${id}`, data)
}

/**
 * 删除授权配置
 */
export function deleteLicenseProvider(id) {
  return request.delete(`/license_providers/${id}`)
}

/**
 * 测试授权配置
 */
export function testLicenseProvider(data) {
  return request.post('/license_providers/test', data)
}

/**
 * 验证当前授权
 */
export function verifyCurrentLicense() {
  return request.get('/license_providers/verify/current')
}
