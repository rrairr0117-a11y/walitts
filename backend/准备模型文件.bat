@echo off
chcp 65001 >nul
title 准备模型文件
color 0A

echo ========================================
echo    准备 TTS 模型文件
echo ========================================
echo.

cd /d "%~dp0"

echo 正在检查模型文件...
echo.

:: 检查 checkpoints 目录
if not exist "checkpoints" (
    echo [提示] 创建 checkpoints 目录...
    mkdir checkpoints
)

:: 检查关键模型文件
set MISSING=0

if not exist "checkpoints\config.yaml" (
    echo [缺失] config.yaml
    set MISSING=1
)

if not exist "checkpoints\gpt.pth" (
    echo [缺失] gpt.pth
    set MISSING=1
)

if not exist "checkpoints\s2mel.pth" (
    echo [缺失] s2mel.pth
    set MISSING=1
)

if %MISSING%==0 (
    echo ✓ 所有模型文件已就绪！
    echo.
    pause
    exit /b 0
)

echo.
echo ========================================
echo    模型文件缺失！
echo ========================================
echo.
echo 请从以下位置复制模型文件到 checkpoints 目录：
echo.
echo 1. 从完整分发包复制
echo 2. 从 G:\indextts2\waliTTS\wali\models\ 复制
echo.
echo 需要的文件：
echo   - config.yaml
echo   - gpt.pth (约3.4GB)
echo   - s2mel.pth (约1.2GB)
echo   - bpe.model
echo   - pinyin.vocab
echo   - 其他配置文件
echo.
echo ========================================
echo.

set /p COPY_NOW="是否从 G:\indextts2\waliTTS\wali\models\ 自动复制？(Y/N): "

if /i "%COPY_NOW%"=="Y" (
    if exist "G:\indextts2\waliTTS\wali\models\" (
        echo.
        echo 正在复制模型文件...
        xcopy /E /I /Y "G:\indextts2\waliTTS\wali\models\*" "checkpoints\"
        echo.
        echo ✓ 模型文件复制完成！
    ) else (
        echo.
        echo [错误] 源目录不存在: G:\indextts2\waliTTS\wali\models\
        echo 请手动复制模型文件到 checkpoints 目录
    )
) else (
    echo.
    echo 请手动复制模型文件到 checkpoints 目录
)

echo.
pause
