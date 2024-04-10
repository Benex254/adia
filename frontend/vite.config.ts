import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
    build: {
    outDir: './build',
    emptyOutDir: true, // Clean the output directory before each build
  },
})
