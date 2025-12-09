@echo off
chcp 65001 >nul
echo ========================================
echo   推送到 GitHub
echo ========================================
echo.

echo 请确保已在 GitHub 创建仓库！
echo 仓库地址示例: https://github.com/your-username/walitts-frontend
echo.
set /p REPO_URL="请输入 GitHub 仓库地址: "

if "%REPO_URL%"=="" (
    echo 错误：仓库地址不能为空！
    pause
    exit /b 1
)

echo.
echo [1/5] 初始化 Git...
git init
if errorlevel 1 (
    echo Git 初始化失败！
    pause
    exit /b 1
)

echo [2/5] 添加文件...
git add .
if errorlevel 1 (
    echo 添加文件失败！
    pause
    exit /b 1
)

echo [3/5] 提交...
git commit -m "Initial commit: WaliTTS Frontend"
if errorlevel 1 (
    echo 提交失败！
    pause
    exit /b 1
)

echo [4/5] 添加远程仓库...
git remote add origin %REPO_URL%
if errorlevel 1 (
    echo 添加远程仓库失败！可能已存在，尝试更新...
    git remote set-url origin %REPO_URL%
)

echo [5/5] 推送到 GitHub...
git branch -M main
git push -u origin main
if errorlevel 1 (
    echo 推送失败！请检查网络和权限。
    pause
    exit /b 1
)

echo.
echo ========================================
echo   推送成功！
echo ========================================
echo.
echo 下一步：
echo 1. 访问 GitHub 仓库设置
echo 2. 配置 Azure Trusted Signing（参考 AZURE_SETUP.md）
echo 3. 添加 GitHub Secrets
echo 4. 推送 tag 触发构建: git tag v1.0.8 ^&^& git push origin v1.0.8
echo.
pause
