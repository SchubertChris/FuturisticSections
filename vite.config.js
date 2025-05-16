import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  // Basis-URL für GitHub Pages - ersetze 'dein-repo-name' mit dem Namen deines Repositories
  base: '/FuturisticSections/',
})