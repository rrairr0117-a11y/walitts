# Azure Trusted Signing 配置指南

## 📋 前置要求

- Azure 账号（新用户有免费额度）
- GitHub 仓库（公开）

## 🔧 配置步骤

### 1. 创建 Azure 账号

访问 https://azure.microsoft.com/ 注册账号

### 2. 创建 Trusted Signing 资源

1. 登录 Azure Portal
2. 搜索 "Trusted Signing"
3. 点击 "Create"
4. 填写信息：
   - **Resource group**: 新建或选择现有
   - **Account name**: 自定义名称（如 `walitts-signing`）
   - **Region**: 选择最近的区域
   - **SKU**: Basic（免费额度）

### 3. 创建 Certificate Profile

1. 进入创建的 Trusted Signing 资源
2. 点击 "Certificate profiles"
3. 点击 "+ Add"
4. 填写信息：
   - **Profile name**: 如 `walitts-cert`
   - **Identity validation**: Public Trust
   - **Certificate type**: Public Trust Test（测试）或 Public Trust（正式）

### 4. 创建 Service Principal

在 Azure Cloud Shell 或本地 Azure CLI 执行：

```bash
# 登录
az login

# 创建 Service Principal
az ad sp create-for-rbac --name "walitts-github-actions" \
  --role "Trusted Signing Certificate Profile Signer" \
  --scopes /subscriptions/{subscription-id}/resourceGroups/{resource-group}/providers/Microsoft.CodeSigning/codeSigningAccounts/{account-name}
```

记录输出的信息：
- `appId` → AZURE_CLIENT_ID
- `password` → AZURE_CLIENT_SECRET
- `tenant` → AZURE_TENANT_ID

### 5. 配置 GitHub Secrets

在 GitHub 仓库设置中添加以下 Secrets：

| Secret Name | Value | 说明 |
|------------|-------|------|
| `AZURE_TENANT_ID` | 租户 ID | 从上一步获取 |
| `AZURE_CLIENT_ID` | 客户端 ID | 从上一步获取 |
| `AZURE_CLIENT_SECRET` | 客户端密钥 | 从上一步获取 |
| `AZURE_ENDPOINT` | `https://eus.codesigning.azure.net/` | 签名端点 |
| `CODE_SIGNING_ACCOUNT` | `walitts-signing` | 账户名称 |
| `CERTIFICATE_PROFILE` | `walitts-cert` | 证书配置名称 |

### 6. 测试构建

推送一个 tag 触发构建：

```bash
git tag v1.0.8
git push origin v1.0.8
```

查看 GitHub Actions 运行状态。

## 💰 费用说明

- **Basic SKU**: 免费（有限额度）
- **Standard SKU**: 按使用量计费
- 开源项目通常免费额度足够

## 🔍 故障排查

### 签名失败

1. 检查 Service Principal 权限
2. 确认 Certificate Profile 状态为 Active
3. 查看 GitHub Actions 日志

### 证书不被信任

- 使用 Public Trust Test 证书仅用于测试
- 正式发布需要 Public Trust 证书
- 需要完成身份验证

## 📚 参考文档

- [Azure Trusted Signing 文档](https://learn.microsoft.com/azure/trusted-signing/)
- [GitHub Actions 集成](https://github.com/Azure/trusted-signing-action)
