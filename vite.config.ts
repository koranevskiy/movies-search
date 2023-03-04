import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import checker from 'vite-plugin-checker'
import svgr from 'vite-plugin-svgr'

export default defineConfig(({ mode }) => {
  loadEnv(mode, process.cwd())
  return {
    plugins: [react(), checker({ typescript: true }), svgr()],
  }
})
