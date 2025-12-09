<template>
  <div class="prompt-manager">
    <!-- 顶部栏 -->
    <div class="header-bar">
      <h2 class="page-title">功能说明与致谢</h2>
      <div class="toolbar">
        <el-button type="danger" plain round @click="noticeVisible = true">
          <el-icon style="margin-right: 6px;">
            <WarningFilled />
          </el-icon>
          提示词说明
        </el-button>
      </div>
    </div>

    <!-- 提示词说明弹窗 -->
    <el-dialog v-model="noticeVisible" title="📢 提示词必备格式说明" width="750px">
      <div class="notice-content">
        <p>⚠️ 创建提示词时，必须遵守以下规则，否则会创建失败：</p>

        <p>
          ✅ 必须包含 <strong>小说原文</strong>：
          <code>
&lt;novel_content&gt;<br />
{novel_content}<br />
&lt;/novel_content&gt;
      </code>
        </p>

        <p style="color: #e53935; font-weight: bold;">
  ⚠️ 注意：<strong>输出必须严格为 JSON 格式！</strong><br>
  <span style="color: #999; font-weight: normal;">
    （不再使用 <code>&lt;result&gt;</code> 标签格式）
  </span>
</p>

        <p>
          ✅ <strong>输出 JSON 数组</strong> 中的每个对象必须包含以下四个参数：
          <code>
{<br />
&nbsp;&nbsp;"role_name" ,<br />
&nbsp;&nbsp;"text_content" <br />
&nbsp;&nbsp;"emotion_name" <br />
&nbsp;&nbsp;"strength_name"<br />
}
      </code>
        </p>

        <p>
          ➕ 以下标签为 <strong>可选</strong>（根据需要添加，不需要可省略）：
        </p>

        <p>
          <code>
&lt;possible_characters&gt;<br />
{possible_characters}<br />
&lt;/possible_characters&gt;
      </code>
        </p>

        <p>
          <code>
&lt;possible_emotions&gt;<br />
{possible_emotions}<br />
&lt;/possible_emotions&gt;
      </code>
        </p>

        <p>
          <code>
&lt;possible_strengths&gt;<br />
{possible_strengths}<br />
&lt;/possible_strengths&gt;
      </code>
        </p>
      </div>

      <template #footer>
        <el-button type="primary" @click="noticeVisible = false">我已了解</el-button>
      </template>
    </el-dialog>

    <!-- 主要内容区域 -->
    <div class="content-area">
      <!-- 致谢卡片 -->
      <el-card shadow="hover" class="info-card">
        <template #header>
          <div class="card-header-custom">
            <el-icon size="24" color="#ff6b6b"><Star /></el-icon>
            <span class="card-title">🙏 特别致谢</span>
          </div>
        </template>
        <div class="card-content">
          <p class="thanks-text">
            本软件的前端界面基于开源项目 <strong style="color: #ff6b6b;">《音谷 - AI 多角色多情绪配音平台》</strong> 进行开发。
          </p>
          <p class="thanks-text">
            感谢原作者 <strong>xcLee001</strong> 的无私贡献，为 AI 配音领域提供了优秀的开源解决方案。
          </p>
          <div class="project-link">
            <el-button type="primary" plain @click="openGithub">
              <el-icon><Link /></el-icon>
              访问音谷项目地址
            </el-button>
          </div>
        </div>
      </el-card>

      <!-- 功能说明卡片 -->
      <el-card shadow="hover" class="info-card">
        <template #header>
          <div class="card-header-custom">
            <el-icon size="24" color="#ffa94d"><InfoFilled /></el-icon>
            <span class="card-title">📖 功能说明</span>
          </div>
        </template>
        <div class="card-content">
          <h3 class="section-title">🎯 核心功能</h3>
          <ul class="feature-list">
            <li>✅ 多角色、多情绪 AI 配音生成</li>
            <li>✅ 支持小说、剧本、视频等内容的自动配音</li>
            <li>✅ 角色库管理与情绪音色绑定</li>
            <li>✅ 批量任务管理与音频导出</li>
            <li>✅ 基于 IndexTTS-2.0 的多情绪 TTS 服务</li>
            <li>✅ 精准的音频编辑功能（删除/添加静音片段）</li>
          </ul>

          <h3 class="section-title">🛠 技术栈</h3>
          <ul class="tech-list">
            <li><strong>前端：</strong>Electron + Vue 3 + Element Plus</li>
            <li><strong>后端：</strong>FastAPI + Python</li>
            <li><strong>TTS：</strong>IndexTTS-2 本地部署</li>
          </ul>
        </div>
      </el-card>

      <!-- 重要提示卡片 -->
      <el-card shadow="hover" class="info-card warning-card">
        <template #header>
          <div class="card-header-custom">
            <el-icon size="24" color="#e53935"><WarningFilled /></el-icon>
            <span class="card-title">⚠️ 重要说明</span>
          </div>
        </template>
        <div class="card-content">
          <el-alert
            title="关于前端维护"
            type="warning"
            :closable="false"
            show-icon
          >
            <p style="margin: 10px 0;">
              瓦力魔音工坊专注于后端服务和 TTS 引擎优化，<strong>不负责前端界面的持续维护和功能更新</strong>。
            </p>
            <p style="margin: 10px 0;">
              如果您需要使用完整的前端功能、获取最新更新或进行二次开发，建议访问原项目：
            </p>
            <div style="margin-top: 15px;">
              <el-button type="warning" @click="openGithub">
                <el-icon><Link /></el-icon>
                前往音谷项目获取完整功能
              </el-button>
            </div>
          </el-alert>
        </div>
      </el-card>

      <!-- 联系方式卡片 -->
      <el-card shadow="hover" class="info-card">
        <template #header>
          <div class="card-header-custom">
            <el-icon size="24" color="#4a90e2"><ChatDotRound /></el-icon>
            <span class="card-title">📬 联系我们</span>
          </div>
        </template>
        <div class="card-content">
          <p class="contact-text">
            <strong>瓦力自习室官网：</strong>
            <a href="https://rrairr.cn" target="_blank" class="link">rrairr.cn</a>
          </p>
          <p class="contact-text">
            <strong>音谷项目地址：</strong>
            <a href="https://github.com/xcLee001/SonicVale" target="_blank" class="link">github.com/xcLee001/SonicVale</a>
          </p>
        </div>
      </el-card>
    </div>

  </div>
</template>

<script setup>
import { ref } from "vue"
import { Star, Link, InfoFilled, WarningFilled, ChatDotRound } from "@element-plus/icons-vue"

// 提示词说明弹窗
const noticeVisible = ref(false)

// 打开 GitHub 项目
function openGithub() {
  window.open('https://github.com/xcLee001/SonicVale', '_blank')
}
</script>

<style scoped>
.prompt-manager {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.header-bar {
  margin-bottom: 30px;
}

.page-title {
  font-size: 28px;
  font-weight: bold;
  color: #303133;
  margin: 0;
}

.content-area {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.info-card {
  border-radius: 12px;
  transition: all 0.3s ease;
}

.info-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
}

.card-header-custom {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 18px;
  font-weight: bold;
  color: #303133;
}

.card-title {
  font-size: 18px;
}

.card-content {
  padding: 10px 0;
  line-height: 1.8;
}

.thanks-text {
  font-size: 15px;
  color: #606266;
  margin: 10px 0;
}

.project-link {
  margin-top: 20px;
  text-align: center;
}

.section-title {
  font-size: 16px;
  font-weight: bold;
  color: #303133;
  margin: 20px 0 10px 0;
}

.feature-list,
.tech-list {
  list-style: none;
  padding: 0;
  margin: 10px 0;
}

.feature-list li,
.tech-list li {
  padding: 8px 0;
  font-size: 14px;
  color: #606266;
  border-bottom: 1px dashed #e4e7ed;
}

.feature-list li:last-child,
.tech-list li:last-child {
  border-bottom: none;
}

.warning-card {
  border: 2px solid #ffd43b;
  background: #fffbf0;
}

.contact-text {
  font-size: 14px;
  color: #606266;
  margin: 10px 0;
}

.link {
  color: #409eff;
  text-decoration: none;
  font-weight: bold;
}

.link:hover {
  text-decoration: underline;
}

/* 提示词说明弹窗样式 */
.notice-content {
  line-height: 1.8;
}

.notice-content p {
  margin: 15px 0;
  font-size: 14px;
  color: #606266;
}

.notice-content code {
  display: block;
  background: #f5f7fa;
  padding: 10px;
  border-radius: 4px;
  font-family: 'Courier New', monospace;
  font-size: 13px;
  color: #e53935;
  margin-top: 8px;
  line-height: 1.6;
}

.notice-content strong {
  color: #303133;
  font-weight: 600;
}

.toolbar {
  display: flex;
  align-items: center;
  gap: 10px;
}
</style>
