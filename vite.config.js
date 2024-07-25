import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  // base:'/MovieInfo/',
  plugins: [react()],
  server:{
    port:3000,
    proxy: {
      '/Naver':{
        target:'https://openapi.naver.com/v1/search/',
        changeOrigin:true,
        rewrite:(path)=>path.replace(/^\/Naver/, '')
      }
    }
  }
})
