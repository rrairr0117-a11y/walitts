# 瓦力魔音工坊 (WaliTTS)

> 基于 Electron + Vue 3 + Docker 的智能 TTS 配音工具

## 📦 快速开始

### 完整部署（前端 + 后端）

1. **克隆仓库**
```bash
git clone https://github.com/rrairr0117-a11y/walitts.git
cd walitts
```

2. **启动后端**（需要 Docker）
```bash
cd backend
docker-compose up -d
```

3. **启动前端**
```bash
npm install
npm start
```

### 仅下载前端

从 [Releases](https://github.com/rrairr0117-a11y/walitts/releases) 下载最新版本的签名 EXE 文件。

**所有发布的 EXE 文件都已通过 Microsoft 签名，可安全运行。**

## 🚀 功能特性

- 🎙️ 多音色 TTS 合成
- 📝 剧本编辑与管理
- 🎭 角色与情绪控制
- 📊 项目管理
- 🔄 实时预览

## 🛠️ 开发

### 环境要求

- Node.js 18+
- npm 或 yarn

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run start
```

### 构建

```bash
# 构建 Windows 版本
npm run build:win

# 构建所有平台
npm run electron-build
```

## 🔐 代码签名

本项目使用 GitHub Actions + Azure Trusted Signing 自动构建和签名。

每次发布新版本时：
1. 推送 tag（如 `v1.0.8`）
2. GitHub Actions 自动构建
3. Azure 自动签名 EXE
4. 发布到 Releases

## 🐳 后端部署

### Docker 部署（推荐）

详细说明请查看 [backend/README.md](./backend/README.md)

**快速启动：**
```bash
cd backend
docker-compose up -d
```

**镜像信息：**
- 镜像：`crpi-gpb2zeuxu5n5h1lc.cn-chengdu.personal.cr.aliyuncs.com/rrairr/wali-indextts2:latest`
- 大小：约 15.9GB
- GPU：需要 NVIDIA GPU + CUDA

**数据目录：**
```
backend/
├── docker-compose.yml    # Docker 配置
├── wali.db              # 数据库
├── checkpoints/         # TTS 模型（4.5GB）
├── outputs/             # 音频输出
├── voices/              # 音色文件
└── prompts/             # 参考音频
```

### 验证后端

```bash
# 检查服务状态
docker ps

# 查看日志
docker-compose logs -f

# 测试 API
curl http://localhost:8300/
```

### 切换后端

在应用设置页面可以切换本地/远程后端：
- 设置 → API 设置
- 选择后端类型（本地 Docker / 远程服务）
- 测试连接

## 📄 许可证

MIT License

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## ⚠️ 注意事项

- 前端代码开源
- 后端业务逻辑不开源（已加密）
- EXE 文件通过 GitHub Actions 自动签名
