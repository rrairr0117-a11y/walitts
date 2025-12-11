# 瓦力魔音工坊 v1.0.0

## 📦 下载

### 前端应用
- **WaliTTS-Frontend-v1.0.0.zip** - 前端完整包（开箱即用）
  - 包含：Electron应用 + Vue3前端 + 所有依赖
  - 大小：约 XXX MB
  - 使用方法：解压后运行 `npm start` 或 `启动前端.bat`

### 后端部署
后端需要Docker环境，请参考 [backend/README.md](./backend/README.md)

**注意**：模型文件（4.5GB）需要单独获取，请查看下方说明。

---

## ✨ 主要功能

- 🎙️ **智能配音**：基于IndexTTS-2的高质量语音合成
- 📝 **项目管理**：支持多项目、多角色、多音色管理
- 🎬 **时间轴配音**：自动生成视频配音和字幕
- 🤖 **LLM集成**：智能音色匹配和情绪推断
- 🎨 **现代UI**：基于Element Plus的美观界面

---

## 🚀 快速开始

### 前端部署

1. **下载并解压**
   ```bash
   # 下载 WaliTTS-Frontend-v1.0.0.zip
   # 解压到任意目录
   ```

2. **安装依赖**（首次使用）
   ```bash
   npm install
   ```

3. **启动应用**
   ```bash
   npm start
   # 或双击 启动前端.bat
   ```

### 后端部署（Docker）

1. **准备环境**
   - 安装 Docker Desktop
   - 需要 NVIDIA GPU + CUDA

2. **获取模型文件**（约4.5GB）
   
   **方式1：百度网盘**
   ```
   链接：https://pan.baidu.com/xxx
   提取码：xxxx
   ```
   
   **方式2：联系作者**
   ```
   获取完整分发包（包含模型）
   ```

3. **部署后端**
   ```bash
   cd backend
   # 将模型文件复制到 checkpoints/ 目录
   # 运行启动脚本
   启动后端.bat
   ```

---

## 📋 系统要求

### 前端
- Windows 10/11
- Node.js 16+ （可选，打包版已包含）
- 内存：4GB+

### 后端
- Windows 10/11 with WSL2
- Docker Desktop
- NVIDIA GPU（推荐 8GB+ 显存）
- CUDA 11.8+
- 磁盘空间：20GB+

---

## 🔧 配置说明

### API配置
前端默认连接本地后端：`http://127.0.0.1:8300`

可在设置页面切换：
- 本地Docker后端
- 远程TTS服务

### 项目路径
- Docker环境：`/app/IndexTTS-2/outputs`
- 本地环境：自定义选择

---

## 📚 文档

- [后端部署文档](./backend/README.md)
- [智能配音API](./docs/API-智能配音接口.md)
- [获取配音库API](./docs/API-获取配音库.md)
- [N8N Agent使用说明](./n8n-prompts/README.md)

---

## 🐛 已知问题

- Windows环境下可能遇到IPv6/IPv4兼容性问题（已在v1.0.0修复）
- 首次启动后端需要下载HuggingFace模型（已配置国内镜像加速）

---

## 🔄 更新日志

### v1.0.0 (2025-12-11)

**新增功能**
- ✨ 完整的项目管理系统
- ✨ 时间轴智能配音功能
- ✨ N8N Agent集成支持
- ✨ 多情绪音色支持

**优化改进**
- 🔧 修复IPv6/IPv4兼容性问题
- 🔧 优化项目路径配置（支持手动输入）
- 🔧 添加HuggingFace国内镜像加速
- 🔧 完善Docker部署文档

**技术栈**
- 前端：Electron + Vue 3 + Element Plus
- 后端：FastAPI + IndexTTS-2 + Docker
- AI：DeepSeek/Qwen LLM + 情绪识别

---

## 📞 支持

- GitHub Issues: https://github.com/rrairr0117-a11y/walitts/issues
- 文档：查看仓库中的 README 和 docs 目录

---

## 📄 许可证

本项目遵循 [LICENSE](./LICENSE) 协议。

---

## 🙏 致谢

- IndexTTS-2 团队
- 所有贡献者和用户
