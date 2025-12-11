# 更新日志 (Changelog)

## [未发布] - 2024-12-11

### 优化 (Improvements)

#### 1. 播放模式开关UI优化

**改进内容：**
- 将"顺序播放"和"单条播放"开关改为内嵌文字样式（inline-prompt）
- 文字水平显示在开关按钮内部，提升视觉一致性
- 优化开关尺寸：宽度120px，高度32px，与其他按钮保持一致
- 调整颜色方案：
  - 顺序播放（激活状态）：绿色 (#67c23a)
  - 单条播放（未激活状态）：蓝色 (#409eff)

**影响文件：** `src/pages/ProjectDubbingDetail.vue`

**技术实现：**
```vue
<el-switch 
    v-model="playMode" 
    active-text="顺序播放" 
    inactive-text="单条播放"
    active-value="sequential" 
    inactive-value="single"
    inline-prompt
    class="play-mode-switch" />
```

```css
.play-mode-switch {
    --el-switch-on-color: #67c23a;
    --el-switch-off-color: #409eff;
}

:deep(.play-mode-switch .el-switch__core) {
    min-width: 120px;
    height: 32px;
}

:deep(.play-mode-switch .el-switch__inner) {
    font-size: 13px;
    font-weight: 500;
}
```

---

#### 2. 新建项目路径配置优化

**改进内容：**
- 优化项目根路径配置，解决硬编码问题
- 新增"📁 选择路径"按钮，支持自定义文件夹选择
- 新增"🚀 使用默认"按钮，自动配置 Docker 容器挂载的 outputs 目录
- 添加友好提示，引导用户正确配置路径
- 提升 Docker 环境下的使用体验

**影响文件：** `src/pages/ProjectList.vue`

**技术实现：**
```vue
<el-form-item label="项目根路径" prop="project_root_path">
    <el-input v-model="form.project_root_path"
        placeholder="请选择项目根路径或使用默认">
    </el-input>
    <div style="display: flex; gap: 8px; margin-top: 8px;">
        <el-button @click="pickRootDir" size="small">📁 选择路径</el-button>
        <el-button @click="useDefaultOutputs" size="small" type="primary">🚀 使用默认</el-button>
    </div>
    <div style="color: #909399; font-size: 12px; margin-top: 8px;">
        💡 提示：使用 Docker 后端时，请选择 outputs 目录（已挂载到容器）
    </div>
</el-form-item>
```

```javascript
// 选择自定义路径
const pickRootDir = async () => {
    try {
        const dir = await native?.selectDir()
        if (dir) {
            form.value.project_root_path = dir
        }
    } catch (e) {
        ElMessage.error(`选择失败：${e?.message || '未知错误'}`)
    }
}

// 使用默认 outputs 目录（Docker 挂载目录）
const useDefaultOutputs = () => {
    form.value.project_root_path = 'F:\\n8n\\n8n-Wali\\WaLi-Voice-Wrokshop\\outputs'
    ElMessage.success('已设置为 Docker 挂载的 outputs 目录')
}
```

---

## 📦 影响范围

- **修改文件数量：** 2个
- **新增文件数量：** 1个（本文档）
- **向后兼容性：** 是
- **破坏性变更：** 否

## ✅ 测试情况

### 播放模式开关
- [x] 开关可以正常切换状态
- [x] 文字在开关内部正确显示
- [x] 颜色在激活/未激活状态下正确切换
- [x] 开关尺寸与其他按钮协调
- [x] 无控制台错误或警告

### 项目路径配置
- [x] "选择路径"按钮正常工作
- [x] "使用默认"按钮正确设置路径
- [x] 路径验证正常
- [x] 提示信息正确显示
- [x] Docker 环境下路径配置正确

---

## 如何贡献 (How to Contribute)

如果你想为本项目做出贡献，请遵循以下步骤：

1. Fork 本仓库
2. 创建你的特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交你的修改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启一个 Pull Request
