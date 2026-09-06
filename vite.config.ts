import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => ({
  plugins: [react()],
  base: loadEnv(mode, '.', '').GITHUB_PAGES ? '/blcollection/' : '/',
  server: {
    host: '0.0.0.0',
    port: 5000,
    allowedHosts: true,
  },
}))