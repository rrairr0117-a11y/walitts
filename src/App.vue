<template>
  <el-container class="layout-root">
    <!-- 侧边栏 -->
    <el-aside class="layout-sider" :class="{ 'is-collapsed': collapsed }" :width="collapsed ? '64px' : '220px'">
      <!-- Logo -->
      <div class="logo">
        <img src="./assets/logo.png" class="logo-image" alt="瓦力配音工坊" />
        <transition name="fade">
          <span v-if="!collapsed" class="logo-text">瓦力配音工坊</span>
        </transition>
      </div>

      <!-- 菜单 -->
      <el-menu :default-active="activeMenu" background-color="transparent" text-color="#5c3d2e" active-text-color="#ff6b6b"
        router class="sider-menu" :collapse="collapsed" collapse-transition>
        <el-menu-item index="/projects">
          <el-icon>
            <Folder />
          </el-icon><span>项目工坊</span>
        </el-menu-item>
        <el-menu-item index="/voices">
          <el-icon>
            <Microphone />
          </el-icon><span>声音库</span>
        </el-menu-item>
        <el-menu-item index="/config">
          <el-icon>
            <Setting />
          </el-icon><span>系统设置</span>
        </el-menu-item>
        <!-- 提示 -->
        <el-menu-item index="/prompts">
          <el-icon>
            <Document />
          </el-icon><span>提示词及功能说明</span>
        </el-menu-item>
      </el-menu>

      <!-- ✅ 新增底部信息 -->
      <!-- 底部信息 -->
      <div class="sider-info" v-if="!collapsed">
        <div class="info-brand">
          <div class="brand-name">瓦力自习室</div>
          <div class="brand-website">rrairr.cn</div>
        </div>
        
        <div class="info-qr-section">
          <div class="qr-item">
            <img src="./assets/qr-contact.png" class="qr-code" alt="联系群二维码" />
            <div class="qr-label">联系群</div>
          </div>
          <div class="qr-item">
            <img src="./assets/qr-wechat.jpg" class="qr-code" alt="公众号二维码" />
            <div class="qr-label">公众号</div>
          </div>
        </div>
      </div>



      <!-- 底部收缩/展开按钮 -->
      <div class="sider-footer">
        <el-tooltip :content="collapsed ? '展开菜单' : '收起菜单'" placement="right">
          <el-button class="collapse-btn" circle @click="toggleCollapse">
            <el-icon v-if="collapsed">
              <Expand />
            </el-icon>
            <el-icon v-else>
              <Fold />
            </el-icon>
          </el-button>
        </el-tooltip>

        <transition name="fade">
          <span v-if="!collapsed" class="collapse-label">收起侧边栏</span>
        </transition>
      </div>
    </el-aside>

    <!-- 右侧内容 -->
    <el-container class="layout-content">
      <el-main class="layout-main">
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { Folder, Setting, Microphone, Fold, Expand, Document } from '@element-plus/icons-vue'

const route = useRoute()
const activeMenu = ref(route.path)
watch(() => route.path, (p) => (activeMenu.value = p))

const collapsed = ref(false)
const toggleCollapse = () => { collapsed.value = !collapsed.value }
</script>

<style>
/* —— 基础布局 —— */
html,
body,
#app {
  height: 100%;
  margin: 0;
  overflow: hidden;
}

.layout-root {
  height: 100vh;
}

.layout-sider {
  background: linear-gradient(180deg, #fff5f0 0%, #ffe8e0 50%, #ffd4c8 100%);
  color: #4a2c2a;
  display: flex;
  flex-direction: column;
  min-height: 0;
  overflow: hidden;
  transition: width .2s ease;
  border-right: 1px solid rgba(255, 107, 107, 0.2);
  box-shadow: 2px 0 20px rgba(255, 154, 107, 0.15);
  position: relative;
}

.layout-sider::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: 
    radial-gradient(circle at 20% 30%, rgba(255, 107, 107, 0.08) 0%, transparent 50%),
    radial-gradient(circle at 80% 70%, rgba(255, 193, 7, 0.06) 0%, transparent 50%);
  pointer-events: none;
}

/* 顶部 Logo */
.logo {
  display: flex;
  align-items: center;
  gap: 12px;
  height: 70px;
  padding: 0 16px;
  background: linear-gradient(135deg, rgba(255, 107, 107, 0.12) 0%, rgba(255, 193, 7, 0.08) 100%);
  border-bottom: 1px solid rgba(255, 107, 107, 0.25);
  backdrop-filter: blur(10px);
  position: relative;
  z-index: 1;
}

.logo::after {
  content: '';
  position: absolute;
  bottom: -1px;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, transparent, rgba(255, 107, 107, 0.5), rgba(255, 193, 7, 0.5), transparent);
}

.logo-image {
  width: 32px;
  height: 32px;
  object-fit: contain;
  filter: drop-shadow(0 0 8px rgba(255, 107, 107, 0.6));
  animation: pulse 3s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% {
    filter: drop-shadow(0 0 8px rgba(255, 107, 107, 0.6));
  }
  50% {
    filter: drop-shadow(0 0 16px rgba(255, 154, 107, 0.9));
  }
}

.logo-text {
  font-size: 18px;
  font-weight: 700;
  white-space: nowrap;
  overflow: hidden;
  background: linear-gradient(135deg, #ff6b6b 0%, #ffa94d 50%, #ffd43b 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: 0.5px;
}

/* 菜单区域：只纵向滚动，禁止横向滚动（修复折叠态横向滚动条） */
.sider-menu {
  flex: 1 1 auto;
  min-height: 0;
  overflow-y: auto;
  overflow-x: hidden;
}

/* 底部控制区 */
.sider-footer {
  flex: 0 0 56px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 10px;
  padding: 10px 8px 12px 8px;
  border-top: 1px solid rgba(255, 107, 107, 0.2);
}

.is-collapsed .sider-footer {
  justify-content: center;
}

/* 折叠按钮 */
.collapse-btn {
  background: linear-gradient(135deg, rgba(255, 107, 107, 0.12), rgba(255, 169, 77, 0.1));
  border: 1px solid rgba(255, 107, 107, 0.25);
  width: 36px;
  height: 36px;
  backdrop-filter: blur(2px);
  color: #5c3d2e;
  transition: all 0.3s ease;
}

.collapse-btn:hover {
  background: linear-gradient(135deg, rgba(255, 107, 107, 0.18), rgba(255, 169, 77, 0.15));
  border-color: rgba(255, 107, 107, 0.4);
  transform: scale(1.05);
  box-shadow: 0 4px 12px rgba(255, 107, 107, 0.25);
}

.collapse-label {
  font-size: 12px;
  color: #5c3d2e;
  font-weight: 500;
}

/* 右侧容器 */
.layout-content {
  display: flex;
  flex-direction: column;
  min-height: 0;
}

.layout-main {
  background: linear-gradient(135deg, #fff9f5 0%, #ffede5 100%);
  padding: 24px;
  flex: 1 1 auto;
  min-height: 0;
  overflow: auto;
  position: relative;
}

.layout-main::before {
  content: '';
  position: fixed;
  top: 0;
  left: 220px;
  right: 0;
  bottom: 0;
  background: 
    radial-gradient(circle at 80% 20%, rgba(255, 107, 107, 0.04) 0%, transparent 50%),
    radial-gradient(circle at 20% 80%, rgba(255, 193, 7, 0.03) 0%, transparent 50%);
  pointer-events: none;
  z-index: 0;
}

.is-collapsed + .layout-content .layout-main::before {
  left: 64px;
}

/* —— 菜单样式（展开态） —— */
.el-menu-item {
  border-radius: 10px;
  margin: 6px 12px;
  position: relative;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid transparent;
}

.el-menu-item::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 10px;
  background: linear-gradient(135deg, rgba(255, 107, 107, 0.1), rgba(255, 193, 7, 0.1));
  opacity: 0;
  transition: opacity 0.3s ease;
}

.el-menu-item:hover {
  background: linear-gradient(135deg, rgba(255, 107, 107, 0.12) 0%, rgba(255, 169, 77, 0.1) 100%) !important;
  border-color: rgba(255, 107, 107, 0.3);
  transform: translateX(4px);
  box-shadow: 0 4px 12px rgba(255, 107, 107, 0.2);
}

.el-menu-item:hover::before {
  opacity: 1;
}

.el-menu-item.is-active {
  background: linear-gradient(135deg, rgba(255, 107, 107, 0.18) 0%, rgba(255, 169, 77, 0.12) 100%) !important;
  color: #ff6b6b !important;
  border-color: rgba(255, 107, 107, 0.4);
  box-shadow: 
    0 0 20px rgba(255, 107, 107, 0.3),
    inset 0 0 20px rgba(255, 169, 77, 0.1);
  transform: translateX(6px);
}

.el-menu-item.is-active::after {
  content: '';
  position: absolute;
  left: -12px;
  top: 50%;
  transform: translateY(-50%);
  width: 4px;
  height: 60%;
  background: linear-gradient(180deg, #ff6b6b, #ffa94d, #ffd43b);
  border-radius: 0 2px 2px 0;
  box-shadow: 0 0 10px rgba(255, 107, 107, 0.8);
}

/* —— 折叠态定制（关键修复） —— */
.el-menu--collapse .el-menu-item {
  margin: 6px;
  /* 避免原 12px 横向外边距导致 64px 溢出 */
  padding: 0;
  width: auto;
  box-sizing: border-box;
  justify-content: center;
}

.el-menu--collapse .el-menu-item .el-icon {
  margin-right: 0;
}

.el-menu--collapse .el-menu-item.is-active {
  border-radius: 10px;
}

/* 如果后续加子菜单，折叠时隐藏箭头避免溢出 */
.el-menu--collapse .el-sub-menu__icon-arrow {
  display: none;
}

/* 过渡动画 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity .15s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}


/* 底部信息块 */
.sider-info {
  flex: 0 0 auto;
  padding: 16px;
  border-top: 1px solid rgba(255, 107, 107, 0.2);
  background: linear-gradient(180deg, rgba(255, 107, 107, 0.06) 0%, rgba(255, 193, 7, 0.04) 100%);
  backdrop-filter: blur(5px);
  position: relative;
  z-index: 1;
}

.sider-info::before {
  content: '';
  position: absolute;
  top: -1px;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, transparent, rgba(255, 107, 107, 0.5), rgba(255, 193, 7, 0.4), transparent);
}

/* 品牌信息 */
.info-brand {
  text-align: center;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid rgba(255, 107, 107, 0.15);
}

.brand-name {
  font-size: 16px;
  font-weight: 700;
  background: linear-gradient(135deg, #ff6b6b 0%, #ffa94d 50%, #ffd43b 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 4px;
  letter-spacing: 1px;
}

.brand-website {
  font-size: 12px;
  color: #6b4423;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.brand-website:hover {
  color: #ff6b6b;
  transform: scale(1.05);
}

/* 二维码区域 */
.info-qr-section {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.qr-item {
  text-align: center;
}

.qr-code {
  width: 100px;
  height: 100px;
  margin: 0 auto 6px;
  border-radius: 10px;
  border: 2px solid rgba(255, 107, 107, 0.2);
  background: white;
  padding: 4px;
  transition: all 0.3s ease;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(255, 107, 107, 0.15);
  object-fit: cover;
}

.qr-code:hover {
  border-color: rgba(255, 107, 107, 0.4);
  transform: scale(1.05);
  box-shadow: 0 4px 16px rgba(255, 107, 107, 0.25);
}

.qr-label {
  font-size: 12px;
  color: #6b4423;
  font-weight: 600;
  background: linear-gradient(135deg, #ff6b6b 0%, #ffa94d 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
</style>
