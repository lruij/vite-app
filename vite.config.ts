import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { visualizer } from 'rollup-plugin-visualizer'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // https://www.npmjs.com/package/rollup-plugin-visualizer
    visualizer({ open: true }),
  ],
  build: {
    chunkSizeWarningLimit: 2000,
    cssCodeSplit: true,
    sourcemap: true,
    minify: 'terser',
    assetsInlineLimit: 4000
  }
})
