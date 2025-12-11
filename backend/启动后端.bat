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

:: 启动容器
echo 启动 Docker 容器...
docker-compose up -d

echo.
echo 后端启动完成！
echo.
echo 服务地址: http://localhost:8300
echo.
pause
