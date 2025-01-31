import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    global: 'globalThis',
  },
  plugins: [react()],
  server: {
    host: '0.0.0.0',  // 모든 IP에서 접근 가능하도록 설정
    port: 5173,        // 포트 번호 (기본값 3000)
  }
});