import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://api-matriculas.vercel.app',
        rewrite: (path) => path.replace(/^\/api/, ''),
        changeOrigin: true
      },
    },
  },
})