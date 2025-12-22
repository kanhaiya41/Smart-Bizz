import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/auth': {
        target: 'http://13.60.211.165:9000', // Your backend IP and port
        changeOrigin: true,
        secure: false,
      },
    },
  },
})