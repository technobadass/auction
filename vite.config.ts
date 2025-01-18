import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    host: '0.0.0.0', // Bind to all network interfaces
    port: process.env.PORT || 3000, // Use Render's PORT or fallback to 3000
  },
});
