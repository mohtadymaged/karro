import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Karro marketplace — plain React SPA, no router (in-app state navigation).
export default defineConfig({
  plugins: [react()],
})
