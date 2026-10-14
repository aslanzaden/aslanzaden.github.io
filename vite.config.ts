import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// `base` is relative so the build works on GitHub Pages (any repo name) and any static host.
export default defineConfig({
  base: './',
  plugins: [vue()],
})
