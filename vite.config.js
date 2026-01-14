// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/portfolio/', // 注意：前后都不要缺 `/`
  plugins: [react()],
  server: {
    host: true, // 允许外部设备访问
    port: 5173, // 可选，确保与你访问地址一致
  },
})
