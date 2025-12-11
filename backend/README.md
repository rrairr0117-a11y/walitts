# 瓦力魔音工坊 - 后端部署

## 📦 Docker 部署方式

### 前置要求

1. **安装 Docker Desktop**
   - Windows: [下载 Docker Desktop](https://www.docker.com/products/docker-desktop/)
   - 需要启用 WSL2 支持
   - 需要 NVIDIA GPU 和 CUDA 支持

2. **准备数据目录**

   ⚠️ **重要**：首次启动需要准备模型文件
   
   ```
   backend/
   ├── docker-compose.yml    # Docker 配置文件
   ├── wali.db              # 数据库文件（启动时自动创建）
   ├── checkpoints/         # TTS 模型文件（4.5GB，必需！）
   ├── outputs/             # 项目音频输出（自动创建）
   ├── output/              # 时间轴音频输出（自动创建）
   ├── voices/              # 音色文件（自动创建）
   ├── prompts/             # 参考音频（自动创建）
   └── huggingface_cache/   # HuggingFace 缓存（自动创建）
   ```

   **必需文件**：
   - `checkpoints/`：TTS模型文件目录（约5GB），包含：
     - `config.yaml` - 模型配置文件（必需！）
     - `gpt.pth` - GPT模型（约3.4GB）
     - `s2mel.pth` - S2Mel模型（约1.2GB）
     - `bpe.model` - BPE分词模型
     - `pinyin.vocab` - 拼音词表
     - `qwen0.6bemo4-merge/` - Qwen情绪模型目录
     - 其他配置文件
   
   **获取方式**：
   - **夸克网盘**（推荐）：https://pan.quark.cn/s/d39c2e01d20c 提取码：`/~700439XDTO~:/`
   - 下载 `checkpoints.7z` 后解压到 `backend/checkpoints/` 目录
   - 或从完整分发包中复制 `checkpoints/` 目录
   - 或运行 `准备模型文件.bat` 自动复制

   **自动创建**：
   - `wali.db`：首次启动时自动创建空数据库
   - 其他目录：启动脚本自动创建

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

### 镜像获取方式

#### 方式1：在线拉取（需要网络）
```bash
docker pull crpi-gpb2zeuxu5n5h1lc.cn-chengdu.personal.cr.aliyuncs.com/rrairr/wali-indextts2:latest
```

#### 方式2：离线导入（推荐，无需网络）

**📥 下载离线镜像包**：
- 文件名：`wali-indextts2-v1.0.0.7z` (4.81 GB)
- 夸克网盘：https://pan.quark.cn/s/e9197d2246fa
- 提取码：`/~917639XJH5~:/`

**🔧 导入步骤**：

1. **解压7z文件**
   ```bash
   # 使用7-Zip解压（Windows右键 → 7-Zip → 解压到当前文件夹）
   # 或命令行：
   7z x wali-indextts2-v1.0.0.7z
   
   # 解压后得到：wali-indextts2-v1.0.0.tar (约4.85 GB)
   ```

2. **导入Docker镜像**
   ```bash
   # 进入tar文件所在目录
   cd D:\Downloads  # 替换为你的实际路径
   
   # 导入镜像
   docker load -i wali-indextts2-v1.0.0.tar
   
   # 等待导入完成，会显示：
   # Loaded image: crpi-gpb2zeuxu5n5h1lc.cn-chengdu.personal.cr.aliyuncs.com/rrairr/wali-indextts2:latest
   ```

3. **验证导入成功**
   ```bash
   docker images | findstr wali-indextts2
   
   # 应该看到：
   # crpi-gpb2zeuxu5n5h1lc.cn-chengdu.personal.cr.aliyuncs.com/rrairr/wali-indextts2   latest   15.9GB
   ```

4. **删除临时文件（可选）**
   ```bash
   # 导入成功后可以删除tar文件释放空间
   del wali-indextts2-v1.0.0.tar
   ```

**⚠️ 重要说明**：
- 导入后的镜像名称为：`crpi-gpb2zeuxu5n5h1lc.cn-chengdu.personal.cr.aliyuncs.com/rrairr/wali-indextts2:latest`
- 这个名称与 `docker-compose.yml` 中的配置完全一致，无需修改任何配置
- 如果镜像名称不匹配，docker-compose会尝试重新拉取镜像

**镜像信息**：
- **镜像大小**: 15.9GB（包含所有依赖）
- **GPU 要求**: NVIDIA GPU with CUDA support
- **包含内容**: Python环境、PyTorch、CUDA库、IndexTTS-2代码
- **不包含**: 模型文件（需单独下载）

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

#### 1. 数据库建表失败

**错误信息**：
```
ERROR: 数据库建表失败:
(sqlite3.OperationalError) unable to open database file
```

**原因**：Docker挂载时 `wali.db` 文件不存在

**解决方法**：
```bash
# 方法1：使用启动脚本（推荐，会自动创建）
启动后端.bat

# 方法2：手动创建空文件
cd backend
type nul > wali.db  # Windows
# 或 touch wali.db  # Linux/Mac

# 然后启动
docker-compose up -d
```

**说明**：启动脚本会自动检查并创建 `wali.db` 文件，推荐使用启动脚本

#### 2. 容器无法启动
- 检查 Docker Desktop 是否运行
- 检查 GPU 驱动是否安装
- 查看日志：`docker-compose logs`

#### 3. 模型加载失败

**错误信息**：
```
模型加载失败: [Errno 2] No such file or directory: '/app/IndexTTS-2/checkpoints/config.yaml'
```

**原因**：checkpoints 目录缺少必需的模型文件

**解决方法**：
```bash
# 方法1：运行准备脚本
准备模型文件.bat

# 方法2：手动复制
# 从完整分发包或源目录复制所有文件到 backend/checkpoints/
```

**必需文件清单**：
- ✅ `config.yaml` - 模型配置（必需！）
- ✅ `gpt.pth` - GPT模型（约3.4GB）
- ✅ `s2mel.pth` - S2Mel模型（约1.2GB）
- ✅ `bpe.model` - BPE分词模型
- ✅ `pinyin.vocab` - 拼音词表
- ✅ `qwen0.6bemo4-merge/` - Qwen情绪模型目录
- ✅ 其他 .pt 和 .json 配置文件

#### 4. 数据库连接失败
- 确保 `wali.db` 文件存在于 backend 目录
- 检查文件路径是否正确
- 确保文件没有被其他程序占用

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
