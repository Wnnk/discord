import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  // server:{port:7001},
  base:'./',
  plugins: [vue()],
  server:{
    proxy:{

    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
    
  },
  css:{
    preprocessorOptions:{
      scss:{
        additionalData:'@import "src/assets/css/blogalCss.scss";',
        javascriptEnabled:true,
      }
    }
  }
  
})
