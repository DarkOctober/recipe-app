import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  // Use relative paths locally, but keep /recipe-app/ for production
  base: process.env.NODE_ENV === 'production' ? '/recipe-app/' : './',
  plugins: [vue()],
})
