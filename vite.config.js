import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base:'/MovieInfo',
  plugins: [react()],
  server:{
    port:3000,
    proxy: {
      '/HerokuApi': {
        target: 'https://movie-api-server.herokuapp.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/HerokuApi/, ''),
        secure: false,
        ws: true
      }
    }
  }
})
