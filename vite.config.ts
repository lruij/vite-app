import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import { visualizer } from 'rollup-plugin-visualizer'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // https://www.npmjs.com/package/rollup-plugin-visualizer
    visualizer({ open: true }),
    // https://vite-pwa-org.netlify.app/
    VitePWA({
      workbox: {
        cacheId: 'lruij',// 缓存名称
        runtimeCaching: [
          {
            urlPattern: /.*\.js.*/, // 缓存文件
            handler: "StaleWhileRevalidate", // 重新验证时失败
            options: {
              cacheName: 'lruij.js', // 缓存 js 名称
              expiration: {
                maxEntries: 30, // 缓存文件数量 LRU 算法
                maxAgeSeconds: 30 * 24 * 60 * 60 // 缓存有效期
              }
            }
          }
        ]
      }
    })
  ],
  build: {
    chunkSizeWarningLimit: 2000,
    cssCodeSplit: true,
    sourcemap: true,
    minify: 'terser',
    assetsInlineLimit: 4000
  }
})
