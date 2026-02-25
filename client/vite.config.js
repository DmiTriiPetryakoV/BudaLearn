import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: '/',  // <<< ПРОСТО СЛЭШ
  server: {
    host: true,
    port: 5175,      
    open: true       
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
})