@echo off
chcp 65001 >nul
title 瓦力魔音工坊 - 前端
color 0A

echo ========================================
echo    瓦力魔音工坊 前端
echo ========================================
echo.

cd /d "%~dp0"

:: 检查后端服务
echo 检查后端服务...
curl -s http://localhost:8300 >nul 2>&1
if %errorlevel% neq 0 (
    echo.
    echo [警告] 后端服务未运行！
    echo.
    echo 请先到"后端"文件夹运行：
    echo   docker-compose up -d
    echo.
    pause
)

:: 启动前端
echo 启动前端应用...
npm start

pause
