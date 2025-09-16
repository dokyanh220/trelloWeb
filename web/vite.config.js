import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import svgr from 'vite-plugin-svgr'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  optimizeDeps: {
    include: ['@mui/material/Tooltip']
  },
  resolve: {
    alias: [{ find: '~', replacement: '/src' }]
  }
})
