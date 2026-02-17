import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
<<<<<<< HEAD
  // Use relative paths locally, but keep /recipe-app/ for production
  base: process.env.NODE_ENV === 'production' ? '/recipe-app/' : './',
=======
  base: '/recipe-app/', // matches router base
>>>>>>> 3aa6d4c13026a9a6705cc9e88299c86ec5bd708c
  plugins: [vue()],
})