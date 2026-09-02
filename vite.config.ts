import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Vite 配置：publicDir 指向 dimsums，茶点图片直接以 /xxx.png 访问
export default defineConfig({
  plugins: [react()],
  publicDir: 'dimsums',
  build: {
    // 外置硬盘上的系统文件（.DS_Store）会导致清空目录失败，改为直接覆盖输出
    outDir: 'build',
    emptyOutDir: false,
  },
});
