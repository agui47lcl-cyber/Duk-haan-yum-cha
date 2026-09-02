import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

/**
 * Vite 配置（兼顾浏览器预览与小红书小工具离线包）：
 * - publicDir 指向 dimsums-web（由 scripts/optimize_dimsums.py 从 dimsums 压缩生成），
 *   茶点图片以 /xxx.webp 访问；
 * - base './'：zip 内以相对路径加载资源，符合小工具容器规范；
 * - target es2017/chrome61：容器最低内核是 Android 8.1 出场 WebView 61；
 * - 输出 IIFE 经典脚本：容器 CSP 禁止 type="module"。
 */
export default defineConfig({
  plugins: [react()],
  publicDir: 'dimsums-web',
  base: './',
  build: {
    // 旧 build 目录被外置硬盘沙箱锁死无法清空，改用全新 dist 目录输出
    outDir: 'dist',
    emptyOutDir: false,
    target: ['es2017', 'chrome61'],
    modulePreload: false,
    rollupOptions: {
      output: {
        // 经典脚本格式：打包产物不含 type="module"，可直接在容器 CSP 下运行
        format: 'iife',
      },
    },
  },
});
