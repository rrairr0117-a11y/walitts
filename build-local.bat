@echo off
chcp 65001 >nul
echo ========================================
echo   瓦力魔音工坊 - 本地打包
echo ========================================
echo.

echo [1/3] 清理旧的构建文件...
if exist "release" rd /s /q "release"
if exist "dist" rd /s /q "dist"

echo [2/3] 构建前端...
call npm run build
if errorlevel 1 (
    echo 前端构建失败！
    pause
    exit /b 1
)

echo [3/3] 打包 Electron...
call npm run build:win
if errorlevel 1 (
    echo Electron 打包失败！
    pause
    exit /b 1
)

echo.
echo ========================================
echo   打包完成！
echo ========================================
echo.
echo 输出目录: release\
dir /b release\*.exe
echo.
pause
