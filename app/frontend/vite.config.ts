import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// Tailwind v4はPostCSSプラグインなしで直接使える！
// import tailwindcss from '@tailwindcss/vite' は不要

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()], // Tailwind v4は別途プラグインなしでも動作します
  server: {
    host: '0.0.0.0',
    port: 3000,
    watch: {
      usePolling: true,
    },
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
    },
  },
})