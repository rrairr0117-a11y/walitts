<template>
  <div class="license-manager">
    <el-card class="header-card">
      <div class="header-content">
        <div class="title-section">
          <h2>🤖 瓦力AI智能配音接口</h2>
          <p class="subtitle">配置授权信息以使用智能配音功能（获取配音ID、智能生成配音）</p>
        </div>
        <el-button type="primary" @click="showCreateDialog">
          <el-icon><Plus /></el-icon>
          新增接口配置
        </el-button>
      </div>
    </el-card>

    <!-- 授权配置列表 -->
    <el-card class="list-card">
      <el-table :data="licenseList" style="width: 100%" v-loading="loading">
        <el-table-column prop="name" label="配置名称" width="200" />
        <el-table-column prop="api_secret" label="API密钥" width="250">
          <template #default="{ row }">
            <span class="secret-text">{{ maskSecret(row.api_secret) }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="license_key" label="授权密钥" width="200">
          <template #default="{ row }">
            <span v-if="row.license_key">{{ maskSecret(row.license_key) }}</span>
            <span v-else class="text-gray">未设置</span>
          </template>
        </el-table-column>
        <el-table-column prop="username" label="用户名" width="150">
          <template #default="{ row }">
            <span v-if="row.username">{{ row.username }}</span>
            <span v-else class="text-gray">-</span>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态" width="100">
          <template #default="{ row }">
            <el-tag :type="row.status === 1 ? 'success' : 'info'">
              {{ row.status === 1 ? '启用' : '禁用' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="300" fixed="right">
          <template #default="{ row }">
            <el-button size="small" @click="testLicense(row)">测试连接</el-button>
            <el-button size="small" @click="editLicense(row)">编辑</el-button>
            <el-button size="small" type="danger" @click="deleteLicense(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 创建/编辑对话框 -->
    <el-dialog
      :title="dialogTitle"
      v-model="dialogVisible"
      width="600px"
      @close="resetForm"
    >
      <el-form :model="form" :rules="rules" ref="formRef" label-width="120px">
        <el-form-item label="配置名称" prop="name">
          <el-input v-model="form.name" placeholder="例如：瓦力AI智能配音" />
        </el-form-item>
        
        <el-form-item label="API密钥" prop="api_secret">
          <el-input
            v-model="form.api_secret"
            type="textarea"
            :rows="3"
            placeholder="请输入API密钥（从rrairr.cn获取）"
          />
          <div class="form-tip">
            🔒 产品ID：66 | 🌐 接口地址：https://rrairr.cn/api/software-license
          </div>
        </el-form-item>

        <el-form-item label="授权密钥" prop="license_key">
          <el-input
            v-model="form.license_key"
            placeholder="请输入授权密钥（例如：LIC_ABC123_XYZ789）"
          />
          <div class="form-tip">
            💡 授权后可使用：获取配音ID接口、智能生成配音HTTP接口
          </div>
        </el-form-item>

        <el-form-item label="用户名">
          <el-input
            v-model="form.username"
            placeholder="可选，绑定的用户名"
          />
        </el-form-item>

        <el-form-item label="状态">
          <el-switch
            v-model="form.status"
            :active-value="1"
            :inactive-value="0"
            active-text="启用"
            inactive-text="禁用"
          />
        </el-form-item>
      </el-form>

      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="submitForm" :loading="submitting">
          确定
        </el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
import {
  fetchLicenseProviders,
  createLicenseProvider,
  updateLicenseProvider,
  deleteLicenseProvider,
  testLicenseProvider
} from '../api/license'

const loading = ref(false)
const submitting = ref(false)
const licenseList = ref([])
const dialogVisible = ref(false)
const dialogTitle = ref('新增授权配置')
const formRef = ref(null)
const editingId = ref(null)

const form = ref({
  name: '',
  api_secret: '',
  license_key: '',
  username: '',
  status: 1
})

const rules = {
  name: [
    { required: true, message: '请输入配置名称', trigger: 'blur' }
  ],
  api_secret: [
    { required: true, message: '请输入API密钥', trigger: 'blur' }
  ],
  license_key: [
    { required: true, message: '请输入授权密钥', trigger: 'blur' }
  ]
}

// 加载授权配置列表
const loadLicenseList = async () => {
  loading.value = true
  try {
    const data = await fetchLicenseProviders()
    licenseList.value = data
  } catch (error) {
    ElMessage.error('加载授权配置失败')
  } finally {
    loading.value = false
  }
}

// 显示创建对话框
const showCreateDialog = () => {
  dialogTitle.value = '新增接口配置'
  editingId.value = null
  dialogVisible.value = true
}

// 编辑授权配置
const editLicense = (row) => {
  dialogTitle.value = '编辑接口配置'
  editingId.value = row.id
  form.value = {
    name: row.name,
    api_secret: row.api_secret,
    license_key: row.license_key || '',
    username: row.username || '',
    status: row.status
  }
  dialogVisible.value = true
}

// 提交表单
const submitForm = async () => {
  if (!formRef.value) return
  
  await formRef.value.validate(async (valid) => {
    if (!valid) return
    
    submitting.value = true
    try {
      if (editingId.value) {
        // 更新
        await updateLicenseProvider(editingId.value, form.value)
        ElMessage.success('更新成功')
      } else {
        // 创建
        await createLicenseProvider(form.value)
        ElMessage.success('创建成功')
      }
      
      dialogVisible.value = false
      loadLicenseList()
    } catch (error) {
      ElMessage.error(error.response?.data?.message || '操作失败')
    } finally {
      submitting.value = false
    }
  })
}

// 测试授权
const testLicense = async (row) => {
  if (!row.license_key) {
    ElMessage.warning('请先设置授权密钥')
    return
  }
  
  const loadingMsg = ElMessage({
    message: '正在测试授权...',
    type: 'info',
    duration: 0
  })
  
  try {
    const response = await testLicenseProvider({
      api_secret: row.api_secret,
      license_key: row.license_key,
      username: row.username
    })
    
    loadingMsg.close()
    
    if (response.code === 200) {
      const data = response.data
      ElMessageBox.alert(
        `<div style="line-height: 1.8;">
          <p><strong>✅ 授权验证成功！</strong></p>
          <p>授权密钥：${data.license_key}</p>
          <p>用户名：${data.username || '-'}</p>
          <p>状态：${data.status}</p>
          <p>到期时间：${data.expires_at || '永久'}</p>
          ${data.days_remaining ? `<p>剩余天数：${data.days_remaining} 天</p>` : ''}
          <p>用户邮箱：${data.user_email || '-'}</p>
        </div>`,
        '测试结果',
        {
          dangerouslyUseHTMLString: true,
          confirmButtonText: '确定'
        }
      )
    } else {
      ElMessage.error(response.message || '授权验证失败')
    }
  } catch (error) {
    loadingMsg.close()
    ElMessage.error(error.response?.data?.message || '测试失败')
  }
}

// 删除授权配置
const deleteLicense = async (row) => {
  try {
    await ElMessageBox.confirm(
      `确定要删除授权配置"${row.name}"吗？`,
      '确认删除',
      {
        type: 'warning'
      }
    )
    
    await deleteLicenseProvider(row.id)
    ElMessage.success('删除成功')
    loadLicenseList()
  } catch (error) {
    if (error !== 'cancel') {
      ElMessage.error('删除失败')
    }
  }
}

// 重置表单
const resetForm = () => {
  form.value = {
    name: '',
    api_secret: '',
    license_key: '',
    username: '',
    status: 1
  }
  editingId.value = null
  if (formRef.value) {
    formRef.value.clearValidate()
  }
}

// 隐藏密钥
const maskSecret = (secret) => {
  if (!secret) return ''
  if (secret.length <= 10) return secret
  return secret.substring(0, 10) + '...' + secret.substring(secret.length - 6)
}

onMounted(() => {
  loadLicenseList()
})
</script>

<style scoped>
.license-manager {
  padding: 20px;
}

.header-card {
  margin-bottom: 20px;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.title-section h2 {
  margin: 0 0 8px 0;
  font-size: 24px;
  background: linear-gradient(135deg, #ff6b6b 0%, #ffa94d 50%, #ffd43b 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.subtitle {
  margin: 0;
  color: #6b4423;
  font-size: 14px;
}

.list-card {
  margin-top: 20px;
}

.secret-text {
  font-family: 'Courier New', monospace;
  color: #666;
}

.text-gray {
  color: #999;
}

.form-tip {
  margin-top: 8px;
  font-size: 12px;
  color: #ff6b6b;
  line-height: 1.5;
}
</style>
