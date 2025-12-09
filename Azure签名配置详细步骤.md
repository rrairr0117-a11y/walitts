# Azure Trusted Signing 配置详细步骤

## 📋 前置要求

- ✅ GitHub 账号
- ✅ Azure 账号（免费注册）
- ✅ 代码已推送到 GitHub 公开仓库

---

## 第一步：注册 Azure 账号（免费）

1. 访问 https://azure.microsoft.com/free/
2. 点击 "Start free"
3. 使用 Microsoft 账号登录（或创建新账号）
4. 填写信息（需要信用卡验证，但不会扣费）
5. 获得 $200 免费额度（12个月）

**注意：** Trusted Signing 服务在免费额度内！

---

## 第二步：创建 Trusted Signing 资源

### 1. 登录 Azure Portal
访问 https://portal.azure.com

### 2. 搜索并创建服务
1. 在顶部搜索框输入 "Trusted Signing"
2. 点击 "Trusted Signing accounts"
3. 点击 "+ Create"

### 3. 填写基本信息
- **Subscription**: 选择您的订阅
- **Resource group**: 点击 "Create new" → 输入 `walitts-rg`
- **Account name**: `walitts-signing`（全局唯一，如果被占用换个名字）
- **Region**: 选择 `East US` 或离您最近的区域
- **Pricing tier**: `Basic`（免费）

### 4. 点击 "Review + create" → "Create"

等待部署完成（约1-2分钟）

---

## 第三步：创建 Certificate Profile

### 1. 进入资源
部署完成后，点击 "Go to resource"

### 2. 创建证书配置
1. 左侧菜单 → "Certificate profiles"
2. 点击 "+ Add"
3. 填写信息：
   - **Profile name**: `walitts-cert`
   - **Identity validation**: `Public Trust Test`（测试用）
   - **Certificate type**: `Public Trust`

**重要：** 
- `Public Trust Test` 用于测试，Windows 可能仍有警告
- 正式发布需要 `Public Trust`（需要身份验证）

### 3. 点击 "Add"

---

## 第四步：创建 Service Principal（密钥）

这一步会生成**密钥**，用于 GitHub Actions 访问 Azure。

### 方式 A：使用 Azure Cloud Shell（推荐）

1. 点击 Azure Portal 右上角的 Cloud Shell 图标（>_）
2. 选择 "Bash"
3. 执行以下命令：

```bash
# 获取订阅 ID
az account show --query id -o tsv

# 记录输出的订阅 ID，例如：12345678-1234-1234-1234-123456789abc

# 创建 Service Principal（替换下面的值）
az ad sp create-for-rbac \
  --name "walitts-github-actions" \
  --role "Trusted Signing Certificate Profile Signer" \
  --scopes /subscriptions/{你的订阅ID}/resourceGroups/walitts-rg/providers/Microsoft.CodeSigning/codeSigningAccounts/walitts-signing
```

### 4. 记录输出信息

命令会输出类似内容：
```json
{
  "appId": "12345678-abcd-1234-abcd-123456789abc",
  "displayName": "walitts-github-actions",
  "password": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  "tenant": "87654321-dcba-4321-dcba-987654321abc"
}
```

**重要！记录这些值：**
- `appId` → 这是 **AZURE_CLIENT_ID**
- `password` → 这是 **AZURE_CLIENT_SECRET**
- `tenant` → 这是 **AZURE_TENANT_ID**

---

## 第五步：配置 GitHub Secrets

### 1. 进入 GitHub 仓库设置
1. 打开您的 GitHub 仓库
2. 点击 "Settings"
3. 左侧菜单 → "Secrets and variables" → "Actions"
4. 点击 "New repository secret"

### 2. 添加以下 Secrets

| Secret Name | Value | 说明 |
|------------|-------|------|
| `AZURE_TENANT_ID` | 上一步的 `tenant` | 租户 ID |
| `AZURE_CLIENT_ID` | 上一步的 `appId` | 客户端 ID |
| `AZURE_CLIENT_SECRET` | 上一步的 `password` | 客户端密钥 |
| `AZURE_ENDPOINT` | `https://eus.codesigning.azure.net/` | 签名端点 |
| `CODE_SIGNING_ACCOUNT` | `walitts-signing` | 账户名称 |
| `CERTIFICATE_PROFILE` | `walitts-cert` | 证书配置名称 |

**每个 Secret 添加步骤：**
1. 点击 "New repository secret"
2. Name: 输入 Secret 名称（如 `AZURE_TENANT_ID`）
3. Secret: 粘贴对应的值
4. 点击 "Add secret"
5. 重复以上步骤添加所有 6 个 Secrets

---

## 第六步：触发自动构建

### 1. 推送 Tag 触发构建

```bash
cd g:\indextts2\waliTTS\wali\瓦力魔音工坊绿色版\frontend

# 创建 tag
git tag v1.0.8

# 推送 tag
git push origin v1.0.8
```

### 2. 查看构建进度

1. GitHub 仓库 → "Actions" 标签
2. 查看 "Build and Sign Electron App" 工作流
3. 等待构建完成（约 10-15 分钟）

### 3. 下载签名的 EXE

构建完成后：
1. GitHub 仓库 → "Releases"
2. 找到 `v1.0.8` 发布
3. 下载 `.exe` 文件

---

## 💰 费用说明

- **GitHub Actions**: 公开仓库免费
- **Azure Trusted Signing**: 
  - Basic tier: 免费（有限额度）
  - 开源项目通常免费额度足够
  - 超出后按使用量计费（很便宜）

---

## 🔍 故障排查

### 问题 1：Service Principal 创建失败

**原因：** 权限不足

**解决：**
1. 确保您是 Azure 订阅的所有者
2. 或者让管理员帮您创建

### 问题 2：GitHub Actions 构建失败

**检查：**
1. 所有 6 个 Secrets 是否都已添加
2. Secret 值是否正确（注意不要有多余空格）
3. Azure 资源是否创建成功

### 问题 3：签名后仍有 Windows 警告

**原因：** 使用的是 `Public Trust Test` 证书

**解决：**
- 测试阶段可以忽略
- 正式发布需要升级到 `Public Trust` 证书（需要身份验证）

---

## 📚 参考文档

- [Azure Trusted Signing 文档](https://learn.microsoft.com/azure/trusted-signing/)
- [GitHub Actions 文档](https://docs.github.com/actions)
- [Electron Builder 文档](https://www.electron.build/)
