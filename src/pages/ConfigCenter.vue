<template>
  <div>
    <h2 style="margin-bottom:16px;">配置中心</h2>

    <el-tabs v-model="activeTab">
      <!-- LLM 管理 -->
      <el-tab-pane label="LLM 管理" name="llm">
        <div class="toolbar">
          <el-button type="primary" @click="openLLMDialog()">新增 LLM 提供商</el-button>
        </div>

        <el-table :data="llmList" stripe border highlight-current-row class="styled-table">
          <el-table-column prop="name" label="名称" min-width="160" />
          <el-table-column prop="api_base_url" label="Base URL" min-width="240" />
          <el-table-column prop="model_list" label="模型列表" min-width="240" />
          <el-table-column label="API Key" min-width="180">
            <template #default="{ row }">
              <span class="api-key">{{ maskKey(row.api_key) }}</span>
            </template>
          </el-table-column>



          <el-table-column label="状态" width="120">
            <template #default="{ row }">
              <el-tag effect="light" :type="row.status === 1 ? 'success' : 'info'">
                <span class="status-dot" :class="row.status === 1 ? 'dot-green' : 'dot-gray'"></span>
                {{ row.status === 1 ? '启用' : '停用' }}
              </el-tag>
            </template>
          </el-table-column>

          <!-- <el-table-column prop="updated_at" label="更新于" min-width="180" /> -->

          <el-table-column label="操作" width="180" fixed="right" align="center">
            <template #default="{ row }">
              <div class="flex justify-center gap-2">
                <el-button type="primary" size="small" plain @click="openLLMDialog(row)">
                  编辑
                </el-button>

                <el-popconfirm title="确认删除该 LLM 提供商？" confirm-button-text="确定" cancel-button-text="取消"
                  @confirm="removeLLM(row.id)">
                  <template #reference>
                    <el-button type="danger" size="small" plain>
                      删除
                    </el-button>
                  </template>
                </el-popconfirm>
              </div>
            </template>
          </el-table-column>

        </el-table>
      </el-tab-pane>

      <!-- TTS 管理（列表，仅编辑） -->
      <el-tab-pane label="魔音工坊" name="tts">
        <div class="toolbar">
          <el-button type="success" @click="openLocalTTSDialog">🚀 启动本地 TTS</el-button>
        </div>

        <el-table :data="ttsList" stripe border highlight-current-row class="styled-table">
          <el-table-column prop="name" label="名称" min-width="160" />
          <el-table-column prop="api_base_url" label="Base URL" min-width="240" />

          <el-table-column label="API Key" min-width="180">
            <template #default="{ row }">
              <span class="api-key">{{ maskKey(row.api_key) }}</span>
            </template>
          </el-table-column>

          <el-table-column label="状态" width="120">
            <template #default="{ row }">
              <el-tag effect="light" :type="row.status === 1 ? 'success' : 'info'">
                <span class="status-dot" :class="row.status === 1 ? 'dot-green' : 'dot-gray'"></span>
                {{ row.status === 1 ? '启用' : '停用' }}
              </el-tag>
            </template>
          </el-table-column>

          <!-- <el-table-column prop="updated_at" label="更新于" min-width="180" /> -->

          <el-table-column label="操作" width="140" fixed="right">
            <template #default="{ row }">
              <el-button type="primary" size="small" plain @click="openTTSDialog(row)">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>

        <!-- 配置指南 -->
        <div class="tts-guide-card">
          <div class="guide-header">
            <h3>🚀 远程 TTS 服务配置指南</h3>
          </div>
          <div class="guide-content">
            <div class="guide-step">
              <div class="step-number">1</div>
              <div class="step-content">
                <h4>搜索瓦力自习室魔音工坊</h4>
                <p>复制下方链接到浏览器访问仙宫云，在搜索框中搜索"瓦力自习室"，点击查看"魔音工坊"镜像详情：</p>
                <p class="tip">🎁 <strong>通过此链接注册可获得免费 10 小时体验时长！</strong></p>
                <div class="link-copy-box">
                  <input 
                    type="text" 
                    readonly 
                    :value="xiangongyunLink" 
                    class="link-input"
                    @click="selectLink"
                    ref="linkInput"
                  />
                  <el-button 
                    type="primary" 
                    @click="copyLink"
                    class="copy-button">
                    复制链接
                  </el-button>
                </div>
                <div class="step-image" @click="previewImage('/images/tts-step1.png')">
                  <img src="/images/tts-step1.png" alt="步骤1：搜索瓦力自习室魔音工坊" />
                  <div class="image-mask">
                    <i class="el-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024"><path fill="currentColor" d="M512 160c320 0 512 352 512 352S832 864 512 864 0 512 0 512s192-352 512-352zm0 64c-225.28 0-384.128 208.064-436.8 288 52.608 79.872 211.456 288 436.8 288 225.28 0 384.128-208.064 436.8-288-52.608-79.872-211.456-288-436.8-288zm0 64a224 224 0 1 1 0 448 224 224 0 0 1 0-448zm0 64a160.192 160.192 0 0 0-160 160c0 88.192 71.744 160 160 160s160-71.808 160-160-71.744-160-160-160z"/></svg></i>
                    <span>点击查看大图</span>
                  </div>
                </div>
              </div>
            </div>

            <div class="guide-step">
              <div class="step-number">2</div>
              <div class="step-content">
                <h4>启动部署</h4>
                <p>在镜像详情页面，点击"立即部署"按钮：</p>
                <ul>
                  <li>选择合适的 GPU 配置（推荐 RTX 4090 D）</li>
                  <li>配置内存和磁盘空间</li>
                  <li>点击"<strong>确认部署</strong>"按钮开始部署</li>
                </ul>
                <div class="step-image" @click="previewImage('/images/tts-step2.png')">
                  <img src="/images/tts-step2.png" alt="步骤2：启动部署" />
                  <div class="image-mask">
                    <i class="el-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024"><path fill="currentColor" d="M512 160c320 0 512 352 512 352S832 864 512 864 0 512 0 512s192-352 512-352zm0 64c-225.28 0-384.128 208.064-436.8 288 52.608 79.872 211.456 288 436.8 288 225.28 0 384.128-208.064 436.8-288-52.608-79.872-211.456-288-436.8-288zm0 64a224 224 0 1 1 0 448 224 224 0 0 1 0-448zm0 64a160.192 160.192 0 0 0-160 160c0 88.192 71.744 160 160 160s160-71.808 160-160-71.744-160-160-160z"/></svg></i>
                    <span>点击查看大图</span>
                  </div>
                </div>
              </div>
            </div>

            <div class="guide-step">
              <div class="step-number">3</div>
              <div class="step-content">
                <h4>按顺序点击启动</h4>
                <p>部署完成后，在仙宫云控制台：</p>
                <ul>
                  <li><strong>步骤 ①：</strong>找到你的服务实例，点击进入详情</li>
                  <li><strong>步骤 ②：</strong>点击"<strong>n8n自动化教学</strong>"启动 n8n 服务</li>
                  <li><strong>步骤 ③：</strong>点击"<strong>瓦力</strong>"启动 TTS API 服务</li>
                </ul>
                <p class="tip">⚠️ 注意：必须按照 ① → ② → ③ 的顺序依次点击启动，等待每个服务启动完成后再启动下一个</p>
                <div class="step-image" @click="previewImage('/images/tts-step3.png')">
                  <img src="/images/tts-step3.png" alt="步骤3：按顺序点击启动" />
                  <div class="image-mask">
                    <i class="el-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024"><path fill="currentColor" d="M512 160c320 0 512 352 512 352S832 864 512 864 0 512 0 512s192-352 512-352zm0 64c-225.28 0-384.128 208.064-436.8 288 52.608 79.872 211.456 288 436.8 288 225.28 0 384.128-208.064 436.8-288-52.608-79.872-211.456-288-436.8-288zm0 64a224 224 0 1 1 0 448 224 224 0 0 1 0-448zm0 64a160.192 160.192 0 0 0-160 160c0 88.192 71.744 160 160 160s160-71.808 160-160-71.744-160-160-160z"/></svg></i>
                    <span>点击查看大图</span>
                  </div>
                </div>
              </div>
            </div>

            <div class="guide-step">
              <div class="step-number">4</div>
              <div class="step-content">
                <h4>获取服务地址并配置</h4>
                <p>所有服务启动完成后：</p>
                <ul>
                  <li><strong>获取地址：</strong>在服务详情页复制"外网访问地址"（格式：<code>https://xxxxx.container.x-gpu.com</code>）</li>
                  <li><strong>确认端口：</strong>确保端口是 <code>8300</code></li>
                  <li><strong>配置 SonicVale：</strong>在上方表格中填写完整的 Base URL</li>
                </ul>
                <p class="tip">完整的 Base URL 格式：<code>https://xxxxx.container.x-gpu.com:8300</code></p>
                <div class="config-tips">
                  <h5>📝 配置说明：</h5>
                  <ul>
                    <li><strong>Base URL：</strong>填写获取的完整地址（包含端口 8300）</li>
                    <li><strong>API Key：</strong>留空（当前版本不需要）</li>
                    <li><strong>状态：</strong>选择"启用"</li>
                  </ul>
                  <p class="tip">✅ 配置完成后，点击"<strong>测试</strong>"按钮验证连接是否成功</p>
                </div>
                <div class="step-image" @click="previewImage('/images/tts-step4.png')">
                  <img src="/images/tts-step4.png" alt="步骤4：获取服务地址并配置" />
                  <div class="image-mask">
                    <i class="el-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024"><path fill="currentColor" d="M512 160c320 0 512 352 512 352S832 864 512 864 0 512 0 512s192-352 512-352zm0 64c-225.28 0-384.128 208.064-436.8 288 52.608 79.872 211.456 288 436.8 288 225.28 0 384.128-208.064 436.8-288-52.608-79.872-211.456-288-436.8-288zm0 64a224 224 0 1 1 0 448 224 224 0 0 1 0-448zm0 64a160.192 160.192 0 0 0-160 160c0 88.192 71.744 160 160 160s160-71.808 160-160-71.744-160-160-160z"/></svg></i>
                    <span>点击查看大图</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </el-tab-pane>

      <!-- 瓦力AI智能配音接口 -->
      <el-tab-pane label="瓦力AI智能配音接口" name="license">
        <LicenseManager />
      </el-tab-pane>
    </el-tabs>

    <!-- LLM 弹窗 -->
    <el-dialog :title="llmForm.id ? '编辑 LLM 提供商' : '新增 LLM 提供商'" v-model="llmDialogVisible" width="560px">
      <el-form :model="llmForm" :rules="llmRules" ref="llmFormRef" label-width="110px">
        <el-form-item label="名称" prop="name">
          <el-input v-model="llmForm.name" placeholder="如：DeepSeek" />
        </el-form-item>
        <el-form-item label="Base URL" prop="api_base_url">
          <el-input v-model="llmForm.api_base_url" placeholder="https://api.xxx.com" />
        </el-form-item>
        <el-form-item label="API Key">
          <el-input v-model="llmForm.api_key" placeholder="可留空" show-password />
        </el-form-item>
        <el-form-item label="模型列表">
          <el-input v-model="llmForm.model_list" placeholder="用英文逗号分隔" />
        </el-form-item>
        <el-form-item label="状态">
          <el-switch v-model="llmForm.status" :active-value="1" :inactive-value="0" />
        </el-form-item>
        <el-form-item label="自定义参数" prop="custom_params">
          <el-input type="textarea" v-model="llmForm.custom_params" :rows="6" placeholder='请输入 JSON 格式参数' />
        </el-form-item>

      </el-form>

      <template #footer>
        <!-- 新增测试按钮 -->
        <el-button type="warning" @click="testLLM">测试</el-button>
        <el-button @click="llmDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="submitLLM">确定</el-button>
      </template>
    </el-dialog>

    <!-- 图片预览对话框 -->
    <el-dialog v-model="imagePreviewVisible" width="80%" :show-close="true" @close="imagePreviewVisible = false">
      <img :src="previewImageUrl" style="width: 100%; display: block;" alt="预览图片" />
    </el-dialog>

    <!-- TTS 弹窗（编辑） -->
    <el-dialog title="编辑 TTS 引擎" v-model="ttsDialogVisible" width="560px">
      <el-form :model="ttsForm" :rules="ttsRules" ref="ttsFormRef" label-width="110px">
        <el-form-item label="名称" prop="name">
          <el-input v-model="ttsForm.name" placeholder="如：Index_TTS" />
        </el-form-item>
        <el-form-item label="Base URL">
          <el-input v-model="ttsForm.api_base_url" placeholder="可留空" />
        </el-form-item>
        <el-form-item label="API Key">
          <el-input v-model="ttsForm.api_key" placeholder="可留空" show-password />
        </el-form-item>

        <el-form-item label="状态">
          <el-switch v-model="ttsForm.status" :active-value="1" :inactive-value="0" />
        </el-form-item>

      </el-form>

      <template #footer>
        <!-- 新增测试按钮 -->
        <el-button type="warning" @click="testTTS">测试</el-button>
        <el-button @click="ttsDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="submitTTS">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>



<script setup>
import { ref, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import {
  fetchLLMProviders, createLLMProvider, updateLLMProvider, deleteLLMProvider,
  fetchTTSProviders, updateTTSProvider, testLLMProvider, testTTSProvider
} from '../api/provider'
import request from '../api/config'
import LicenseManager from './LicenseManager.vue'

const activeTab = ref('llm')

// ---------- LLM ----------
const llmList = ref([])

const loadLLM = async () => { llmList.value = await fetchLLMProviders() }

const llmDialogVisible = ref(false)
const llmFormRef = ref()
const DEFAULT_CUSTOM_PARAMS = JSON.stringify(
  {
    response_format: { type: 'json_object' },
    temperature: 0.7,
    top_p: 0.9
  },
  null,
  2  // 漂亮一点，换行缩进
)

const llmForm = ref({
  id: null,
  name: '',
  api_base_url: '',
  api_key: '',
  model_list: '',
  status: 1,
  custom_params: DEFAULT_CUSTOM_PARAMS
})
const llmRules = {
  name: [{ required: true, message: '请输入名称', trigger: 'blur' }],
  api_base_url: [{ required: true, message: '请输入 Base URL', trigger: 'blur' }],
  custom_params: [
    {
      required: true,
      message: '自定义参数不能为空，至少为 {}',
      trigger: 'blur'
    },
    {
      validator: (rule, value, callback) => {
        const v = (value || '').trim()
        if (!v) {
          return callback(new Error('自定义参数不能为空，至少为 {}'))
        }
        try {
          JSON.parse(v)
          callback()
        } catch (e) {
          callback(new Error('自定义参数必须是合法 JSON 格式'))
        }
      },
      trigger: 'blur'
    }
  ]
}
function openLLMDialog(row) {
  if (row) llmForm.value = { ...row }
  else llmForm.value = { id: null, name: '', api_base_url: '', api_key: '', model_list: '', status: 1, custom_params: DEFAULT_CUSTOM_PARAMS }
  llmDialogVisible.value = true
}
function submitLLM() {
  llmFormRef.value.validate(async (valid) => {
    if (!valid) return
    try {
      if (llmForm.value.id) {
        await updateLLMProvider(llmForm.value.id, llmForm.value)
        ElMessage.success('已更新')
      } else {
        await createLLMProvider(llmForm.value)
        ElMessage.success('已创建')
      }
      llmDialogVisible.value = false
      await loadLLM()
    } catch {
      ElMessage.error('操作失败')
    }
  })
}
async function removeLLM(id) {
  try {
    await deleteLLMProvider(id)
    ElMessage.success('已删除')
    await loadLLM()
  } catch {
    ElMessage.error('删除失败')
  }
}


import { ElLoading } from 'element-plus'

async function testLLM() {
  // 打开等待框
  const loading = ElLoading.service({
    lock: true,
    text: '正在测试，请稍候...',
    background: 'rgba(0, 0, 0, 0.4)'
  })

  try {
    const res = await testLLMProvider(llmForm.value)
    if (res.code === 200) {
      ElMessage.success(res.message || '测试成功')
    } else {
      ElMessage.error(res.message || '测试失败')
    }
  } catch (e) {
    ElMessage.error('测试异常')
  } finally {
    // 关闭等待框
    loading.close()
  }
}



// ---------- TTS ----------
const ttsList = ref([])
const ttsDialogVisible = ref(false)
const ttsFormRef = ref()
const ttsForm = ref({
  id: 1,
  name: '',
  api_base_url: '',
  api_key: '',
  status: 1,
})
const ttsRules = {
  name: [{ required: true, message: '请输入名称', trigger: 'blur' }]
}

const loadTTS = async () => {
  const list = await fetchTTSProviders()
  ttsList.value = Array.isArray(list) ? list : []
}

function openTTSDialog(row) {
  ttsForm.value = { ...row }
  ttsDialogVisible.value = true
}

function submitTTS() {
  ttsFormRef.value.validate(async (valid) => {
    if (!valid) return
    try {
      await updateTTSProvider(ttsForm.value.id, ttsForm.value)
      ElMessage.success('已更新')
      ttsDialogVisible.value = false
      await loadTTS()
    } catch {
      ElMessage.error('操作失败')
    }
  })
}

// 启动本地 TTS
async function openLocalTTSDialog() {
  ElMessageBox.prompt('请输入 IndexTTS-2 目录路径', '启动本地 TTS', {
    confirmButtonText: '启动',
    cancelButtonText: '取消',
    inputPlaceholder: '例如: G:\\indextts2\\IndexTTS-2',
    inputValue: 'G:\\indextts2\\IndexTTS-2'
  }).then(async ({ value }) => {
    if (!value) {
      ElMessage.warning('请输入路径')
      return
    }
    
    const loading = ElLoading.service({
      lock: true,
      text: '正在配置本地 TTS...\n首次使用需要下载模型（约3GB），可能需要几分钟，请耐心等待',
      background: 'rgba(0, 0, 0, 0.4)'
    })
    
    try {
      const res = await request.post('/tts_providers/start_local', {
        indextts_path: value
      })
      
      loading.close()
      
      if (res.code === 200) {
        ElMessage.success('本地 TTS 启动成功！')
        await loadTTS() // 刷新列表
      } else {
        ElMessage.error(res.message || '启动失败')
      }
    } catch (error) {
      loading.close()
      ElMessage.error('启动失败：' + (error.message || '未知错误'))
    }
  }).catch(() => {
    // 用户取消
  })
}



async function testTTS() {
  const loading = ElLoading.service({
    lock: true,
    text: '正在测试 TTS，请稍候...',
    background: 'rgba(0, 0, 0, 0.4)'
  })

  try {
    console.log('ttsForm.value', ttsForm.value)
    const res = await testTTSProvider(ttsForm.value)
    if (res.code === 200) {
      ElMessage.success(res.message || 'TTS 测试成功')
    } else {
      ElMessage.error(res.message || 'TTS 测试失败')
    }
  } catch (e) {
    ElMessage.error('TTS 测试异常')
  } finally {
    loading.close()
  }
}



// ---------- 工具 ----------
const maskKey = (val) => (val ? '•'.repeat(Math.min(val.length, 8)) : '（未设置）')

// 仙宫云链接
const xiangongyunLink = ref('https://www.xiangongyun.com/image/detail/2e9b9ed0-2d07-4f20-bc29-17495011058f?r=JJDXHL')
const linkInput = ref(null)

// 选中链接
function selectLink() {
  if (linkInput.value) {
    linkInput.value.select()
  }
}

// 复制链接
async function copyLink() {
  try {
    await navigator.clipboard.writeText(xiangongyunLink.value)
    ElMessage.success('链接已复制到剪贴板！')
  } catch (err) {
    // 降级方案：使用传统方法
    if (linkInput.value) {
      linkInput.value.select()
      document.execCommand('copy')
      ElMessage.success('链接已复制到剪贴板！')
    }
  }
}

// 图片预览
const previewImageUrl = ref('')
const imagePreviewVisible = ref(false)

function previewImage(url) {
  previewImageUrl.value = url
  imagePreviewVisible.value = true
}

onMounted(async () => {
  await Promise.all([loadLLM(), loadTTS()])
})
</script>

<style scoped>
.toolbar {
  margin-bottom: 12px;
}

.masked {
  margin-right: 8px;
}

.styled-table {
  border-radius: 10px;
  overflow: hidden;
  font-size: 14px;
}

.styled-table ::v-deep(.el-table__header th) {
  background-color: #f9fafc;
  font-weight: 600;
  text-align: center;
}

.styled-table ::v-deep(.el-table__body td) {
  text-align: center;
}

.api-key {
  background: #f4f4f5;
  padding: 2px 6px;
  border-radius: 6px;
  font-size: 13px;
  color: #666;
}

.status-dot {
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  margin-right: 6px;
}

.dot-green {
  background: #67c23a;
}

.dot-gray {
  background: #909399;
}

/* TTS 配置指南样式 */
.tts-guide-card {
  margin-top: 24px;
  background: linear-gradient(135deg, #fef9e7 0%, #fff9e6 100%);
  border: 2px solid #f0c14b;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 12px rgba(240, 193, 75, 0.15);
}

.guide-header {
  margin-bottom: 20px;
  padding-bottom: 16px;
  border-bottom: 2px solid #f0c14b;
}

.guide-header h3 {
  margin: 0;
  font-size: 20px;
  color: #333;
  font-weight: 600;
}

.guide-content {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.guide-step {
  display: flex;
  gap: 16px;
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s, box-shadow 0.2s;
}

.guide-step:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.step-number {
  flex-shrink: 0;
  width: 36px;
  height: 36px;
  background: linear-gradient(135deg, #409eff 0%, #66b1ff 100%);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 18px;
  box-shadow: 0 2px 8px rgba(64, 158, 255, 0.3);
}

.step-content {
  flex: 1;
}

.step-content h4 {
  margin: 0 0 12px 0;
  font-size: 16px;
  color: #333;
  font-weight: 600;
}

.step-content p {
  margin: 8px 0;
  color: #666;
  line-height: 1.6;
}

.step-content ul {
  margin: 12px 0;
  padding-left: 20px;
  color: #666;
  line-height: 1.8;
}

.step-content li {
  margin: 6px 0;
}

.step-content code {
  background: #f5f7fa;
  padding: 2px 8px;
  border-radius: 4px;
  font-family: 'Courier New', monospace;
  font-size: 13px;
  color: #e96900;
}

.code-block {
  background: #2c3e50;
  color: #ecf0f1;
  padding: 16px;
  border-radius: 8px;
  margin-top: 12px;
  overflow-x: auto;
}

.code-block code {
  background: transparent;
  color: #ecf0f1;
  padding: 0;
  font-size: 13px;
  line-height: 1.6;
  word-break: break-all;
  white-space: pre-wrap;
}

.guide-link {
  display: inline-block;
  color: #409eff;
  text-decoration: none;
  padding: 8px 12px;
  background: #ecf5ff;
  border-radius: 6px;
  margin-top: 8px;
  transition: all 0.3s;
  font-size: 14px;
  word-break: break-all;
}

.guide-link:hover {
  background: #409eff;
  color: white;
  transform: translateX(4px);
}

.tip {
  background: #e6f7ff;
  border-left: 4px solid #1890ff;
  padding: 12px 16px;
  margin-top: 12px;
  border-radius: 4px;
  color: #0050b3;
  font-size: 14px;
}

.guide-button {
  margin-top: 12px;
  font-size: 15px;
  padding: 12px 24px;
  height: auto;
}

.step-image {
  position: relative;
  margin-top: 16px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  border: 1px solid #e4e7ed;
  cursor: pointer;
  max-width: 600px;
}

.step-image img {
  width: 100%;
  height: auto;
  display: block;
  transition: all 0.3s;
}

.image-mask {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s;
  color: white;
  font-size: 16px;
  gap: 8px;
}

.image-mask i {
  font-size: 32px;
}

.step-image:hover .image-mask {
  opacity: 1;
}

.step-image:hover img {
  transform: scale(1.05);
}

.config-tips {
  margin-top: 20px;
  padding: 16px;
  background: #f0f9ff;
  border-radius: 8px;
  border-left: 4px solid #409eff;
}

.config-tips h5 {
  margin: 0 0 12px 0;
  font-size: 15px;
  color: #409eff;
  font-weight: 600;
}

.config-tips ul {
  margin: 8px 0;
  padding-left: 20px;
}

.config-tips li {
  margin: 8px 0;
  color: #606266;
  line-height: 1.8;
}

.config-tips .tip {
  margin-top: 12px;
  margin-bottom: 0;
}

.link-copy-box {
  display: flex;
  gap: 12px;
  margin-top: 12px;
  align-items: center;
}

.link-input {
  flex: 1;
  padding: 10px 16px;
  border: 2px solid #dcdfe6;
  border-radius: 6px;
  font-size: 14px;
  color: #409eff;
  background: #f5f7fa;
  cursor: pointer;
  transition: all 0.3s;
  font-family: 'Courier New', monospace;
}

.link-input:hover {
  border-color: #409eff;
  background: #ecf5ff;
}

.link-input:focus {
  outline: none;
  border-color: #409eff;
  background: #ecf5ff;
}

.copy-button {
  padding: 10px 24px;
  font-size: 14px;
  height: auto;
}
</style>
