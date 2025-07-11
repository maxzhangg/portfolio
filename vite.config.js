// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/portfolio/', // 注意：前后都不要缺 `/`
  plugins: [react()],
})
