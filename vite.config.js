import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// BASE_PATH is set automatically by the GitHub Pages workflow
// ("/novista/" for username.github.io/novista, "/" for a custom domain).
export default defineConfig({
  plugins: [react()],
  base: process.env.BASE_PATH || '/',
})
