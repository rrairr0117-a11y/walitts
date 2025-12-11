# 瓦力魔音工坊 - 后端部署

## 📦 Docker 部署方式

### 前置要求

1. **安装 Docker Desktop**
   - Windows: [下载 Docker Desktop](https://www.docker.com/products/docker-desktop/)
   - 需要启用 WSL2 支持
   - 需要 NVIDIA GPU 和 CUDA 支持

2. **准备数据目录**
   ```
   backend/
   ├── docker-compose.yml    # Docker 配置文件
   ├── wali.db              # 数据库文件
   ├── checkpoints/         # TTS 模型文件（4.5GB）
   ├── outputs/             # 项目音频输出
   ├── output/              # 时间轴音频输出
   ├── voices/              # 音色文件
   ├── prompts/             # 参考音频
   └── huggingface_cache/   # HuggingFace 缓存
   ```

### 快速启动

#### 方式1：使用启动脚本（推荐）
```bash
# Windows
启动后端.bat
```

#### 方式2：使用 Docker Compose
```bash
cd backend
docker-compose up -d
```

### 镜像说明

- **镜像地址**: `crpi-gpb2zeuxu5n5h1lc.cn-chengdu.personal.cr.aliyuncs.com/rrairr/wali-indextts2:latest`
- **镜像大小**: 约 15.9GB（包含所有依赖）
- **GPU 要求**: NVIDIA GPU with CUDA support

### 数据持久化

所有数据通过 Docker 卷挂载，存储在宿主机：
- 数据库：`./wali.db`
- 模型文件：`./checkpoints/`
- 音频输出：`./outputs/` 和 `./output/`
- 音色文件：`./voices/`

### 环境变量

```yaml
environment:
  - PYTHONUNBUFFERED=1
  - HF_HOME=/app/IndexTTS-2/huggingface_cache
  - TRANSFORMERS_CACHE=/app/IndexTTS-2/huggingface_cache
```

### 端口说明

- **8300**: FastAPI 主服务端口
- **8301**: IndexTTS-2 TTS 服务端口（内部）

### 健康检查

容器启动后会自动进行健康检查：
- 检查间隔：30秒
- 超时时间：10秒
- 重试次数：3次
- 启动等待：60秒

### 常用命令

```bash
# 启动服务
docker-compose up -d

# 查看日志
docker-compose logs -f

# 停止服务
docker-compose down

# 重启服务
docker-compose restart

# 查看容器状态
docker ps
```

### 故障排查

#### 1. 容器无法启动
- 检查 Docker Desktop 是否运行
- 检查 GPU 驱动是否安装
- 查看日志：`docker-compose logs`

#### 2. 模型加载失败
- 确保 `checkpoints/` 目录包含所有模型文件
- 检查文件权限

#### 3. 数据库连接失败
- 确保 `wali.db` 文件存在
- 检查文件路径是否正确

### 网络配置

如果需要配置代理访问 HuggingFace：

```yaml
environment:
  - HTTP_PROXY=http://宿主机IP:代理端口
  - HTTPS_PROXY=http://宿主机IP:代理端口
  - HF_ENDPOINT=https://hf-mirror.com  # 使用国内镜像
```

## 📝 注意事项

1. **首次启动**：首次启动可能需要下载模型，请耐心等待
2. **GPU 内存**：建议至少 8GB 显存
3. **磁盘空间**：至少预留 20GB 空间
4. **数据备份**：定期备份 `wali.db` 和 `voices/` 目录

## 🔗 相关链接

- [前端仓库](https://github.com/rrairr0117-a11y/walitts)
- [Docker 官方文档](https://docs.docker.com/)
- [阿里云容器镜像服务](https://cr.console.aliyun.com/)
