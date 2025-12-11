# 瓦力魔音工坊 - 前端

> 基于 Electron + Vue 3 的 TTS 配音工具前端界面

## 📦 下载

从 [Releases](https://github.com/your-username/walitts-frontend/releases) 下载最新版本的签名 EXE 文件。

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

## 📝 后端配置

**重要：** 前端是纯界面应用，不包含后端逻辑。需要配合后端 API 使用。

### 方式 1：本地 Docker 后端（推荐）

1. 启动 Docker 后端：
```bash
docker-compose up -d
```

2. 前端会自动连接到 `http://localhost:8300`

3. 验证后端运行：
```bash
curl http://localhost:8300/
```

### 方式 2：远程 TTS 服务

- 使用云端 TTS 服务（如仙宫云）
- 在前端设置中切换 API 地址
- 需要配置相应的 API 密钥

### 切换后端

在应用设置页面可以切换本地/远程后端：
- 设置 → API 设置
- 选择后端类型
- 测试连接

## 📄 许可证

MIT License

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## ⚠️ 注意事项

- 前端代码开源
- 后端业务逻辑不开源（已加密）
- EXE 文件通过 GitHub Actions 自动签名
