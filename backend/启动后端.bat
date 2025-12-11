@echo off
chcp 65001 >nul
title 瓦力魔音工坊 - Docker 后端
color 0A

echo ========================================
echo    瓦力魔音工坊 Docker 后端
echo ========================================
echo.

cd /d "%~dp0"

:: 检查 Docker
docker --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [错误] Docker 未安装！
    echo.
    echo 请先安装 Docker Desktop:
    echo https://www.docker.com/products/docker-desktop
    echo.
    pause
    exit /b 1
)

:: 检查并创建必要的文件和目录
echo 检查数据文件...

:: 如果 wali.db 不存在，创建空文件
if not exist "wali.db" (
    echo [提示] 数据库文件不存在，创建空数据库...
    type nul > wali.db
    echo ✓ 已创建空数据库文件
)

:: 创建必要的目录
if not exist "checkpoints" mkdir checkpoints
if not exist "outputs" mkdir outputs
if not exist "output" mkdir output
if not exist "voices" mkdir voices
if not exist "prompts" mkdir prompts
if not exist "huggingface_cache" mkdir huggingface_cache

echo ✓ 数据目录检查完成
echo.

:: 启动容器
echo 启动 Docker 容器...
docker-compose up -d

echo.
echo 后端启动完成！
echo.
echo 服务地址: http://localhost:8300
echo.
pause
