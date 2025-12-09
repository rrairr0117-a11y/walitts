# 推送代码到 GitHub

## 方式 1：使用脚本（推荐）

1. 双击运行 `deploy-to-github.bat`
2. 输入 GitHub 仓库地址（例如：https://github.com/your-username/walitts-frontend.git）
3. 等待推送完成

## 方式 2：手动命令

打开终端，执行：

```bash
cd g:\indextts2\waliTTS\wali\瓦力魔音工坊绿色版\frontend

# 初始化 Git
git init

# 添加所有文件
git add .

# 提交
git commit -m "Initial commit: WaliTTS Frontend"

# 添加远程仓库（替换成你的仓库地址）
git remote add origin https://github.com/your-username/walitts-frontend.git

# 推送
git branch -M main
git push -u origin main
```

## 如果遇到认证问题

### 方式 A：使用 GitHub Desktop（最简单）
1. 下载安装 GitHub Desktop: https://desktop.github.com/
2. 登录 GitHub 账号
3. File → Add Local Repository → 选择 frontend 文件夹
4. Publish repository

### 方式 B：使用 Personal Access Token

1. GitHub 设置 → Developer settings → Personal access tokens → Tokens (classic)
2. Generate new token (classic)
3. 勾选 `repo` 权限
4. 生成并复制 token
5. 推送时用 token 作为密码：
   ```
   Username: your-username
   Password: ghp_xxxxxxxxxxxx（你的 token）
   ```

### 方式 C：使用 SSH Key

1. 生成 SSH key:
   ```bash
   ssh-keygen -t ed25519 -C "your_email@example.com"
   ```
2. 复制公钥内容:
   ```bash
   cat ~/.ssh/id_ed25519.pub
   ```
3. GitHub 设置 → SSH and GPG keys → New SSH key
4. 粘贴公钥
5. 使用 SSH 地址推送:
   ```bash
   git remote set-url origin git@github.com:your-username/walitts-frontend.git
   git push -u origin main
   ```
