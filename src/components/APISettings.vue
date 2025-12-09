<template>
  <div class="api-settings">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>后端 API 设置</span>
        </div>
      </template>
      
      <el-form label-width="120px">
        <el-form-item label="API 类型">
          <el-radio-group v-model="apiType" @change="handleAPIChange">
            <el-radio label="local">本地 Docker 后端</el-radio>
            <el-radio label="remote">远程 TTS 服务</el-radio>
          </el-radio-group>
        </el-form-item>
        
        <el-form-item label="当前地址">
          <el-input v-model="currentAPI" readonly>
            <template #append>
              <el-button @click="testConnection">测试连接</el-button>
            </template>
          </el-input>
        </el-form-item>
        
        <el-form-item label="连接状态">
          <el-tag :type="connectionStatus.type">
            {{ connectionStatus.text }}
          </el-tag>
        </el-form-item>
        
        <el-divider />
        
        <el-alert
          title="使用说明"
          type="info"
          :closable="false"
          show-icon
        >
          <ul>
            <li><strong>本地 Docker 后端：</strong>需要先启动 Docker 容器（docker-compose up -d）</li>
            <li><strong>远程 TTS 服务：</strong>使用云端 TTS 服务（如仙宫云），需要配置 API 密钥</li>
          </ul>
        </el-alert>
      </el-form>
    </el-card>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import { switchAPI, getCurrentAPI, API_ENDPOINTS } from '../api/config'
import service from '../api/config'

const apiType = ref('local')
const currentAPI = ref('')
const connectionStatus = ref({
  type: 'info',
  text: '未测试'
})

onMounted(() => {
  currentAPI.value = getCurrentAPI()
  // 判断当前使用的是哪个 API
  if (currentAPI.value === API_ENDPOINTS.local) {
    apiType.value = 'local'
  } else {
    apiType.value = 'remote'
  }
})

const handleAPIChange = (value) => {
  switchAPI(value)
  currentAPI.value = getCurrentAPI()
  ElMessage.success('API 已切换，请测试连接')
  connectionStatus.value = {
    type: 'info',
    text: '未测试'
  }
}

const testConnection = async () => {
  connectionStatus.value = {
    type: 'warning',
    text: '测试中...'
  }
  
  try {
    const response = await service.get('/')
    connectionStatus.value = {
      type: 'success',
      text: '连接成功'
    }
    ElMessage.success('后端连接正常')
  } catch (error) {
    connectionStatus.value = {
      type: 'danger',
      text: '连接失败'
    }
    ElMessage.error('无法连接到后端，请检查服务是否启动')
  }
}
</script>

<style scoped>
.api-settings {
  padding: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

ul {
  margin: 0;
  padding-left: 20px;
}

li {
  margin: 8px 0;
}
</style>
