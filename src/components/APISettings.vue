<template>
  <div class="api-settings">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>后端 API 设置</span>
        </div>
      </template>
      
      <el-form label-width="120px">
        <el-form-item label="后端地址">
          <el-input v-model="currentAPI" readonly>
            <template #append>
              <el-button @click="testConnection" type="primary">测试连接</el-button>
            </template>
          </el-input>
        </el-form-item>
        
        <el-form-item label="连接状态">
          <el-tag :type="connectionStatus.type" size="large">
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
            <li><strong>本地 Docker 后端：</strong>需要先启动 Docker 容器</li>
            <li><strong>启动命令：</strong><code>docker-compose up -d</code></li>
            <li><strong>查看日志：</strong><code>docker logs wali-tts-backend</code></li>
            <li><strong>停止服务：</strong><code>docker-compose down</code></li>
          </ul>
        </el-alert>
      </el-form>
    </el-card>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import { API_ENDPOINTS } from '../api/config'
import service from '../api/config'

const currentAPI = ref('')
const connectionStatus = ref({
  type: 'info',
  text: '未测试'
})

onMounted(() => {
  // 固定使用本地 Docker 后端
  currentAPI.value = API_ENDPOINTS.local
})

const testConnection = async () => {
  connectionStatus.value = {
    type: 'warning',
    text: '测试中...'
  }
  
  try {
    const response = await service.get('/')
    connectionStatus.value = {
      type: 'success',
      text: '✅ 连接成功'
    }
    ElMessage.success('Docker 后端连接正常！')
  } catch (error) {
    connectionStatus.value = {
      type: 'danger',
      text: '❌ 连接失败'
    }
    ElMessage.error('无法连接到 Docker 后端，请检查容器是否启动')
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
