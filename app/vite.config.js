import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Karro marketplace — plain React SPA, no router (in-app state navigation).
// Dev server proxies API + uploaded media to the backend on :4000.
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'http://localhost:4000',
      '/media': 'http://localhost:4000',
    },
  },
})
