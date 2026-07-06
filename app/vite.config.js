import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Karro marketplace — plain React SPA, no router (in-app state navigation).
// Dev server proxies API + uploaded media to the backend on :4000.
// For iOS: Capacitor serves the app natively; API calls go directly to backend URL.
export default defineConfig({
  plugins: [react()],
  base: './',  // Capacitor requires relative paths
  server: {
    proxy: {
      '/api': 'http://localhost:4000',
      '/media': 'http://localhost:4000',
    },
  },
})
