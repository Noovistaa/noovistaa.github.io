import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// BASE_PATH is set automatically by the GitHub Pages workflow
// ("/noovistaa/" for username.github.io/noovistaa, "/" for a custom domain).
export default defineConfig({
  plugins: [react()],
  base: process.env.BASE_PATH || '/',
  // The site bundles its animation library, so allow a slightly bigger main file before warning.
  build: { chunkSizeWarningLimit: 700 },
})
