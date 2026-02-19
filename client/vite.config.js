import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: process.env.NODE_ENV === 'production' 
    ? '/BudaLearn/'  // ⬅️ ЗАМЕНИ НА ИМЯ СВОЕГО РЕПО
    : '/',
      server: {
    host: true,
    port: 5173,      
    open: true       
  },

      resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
})