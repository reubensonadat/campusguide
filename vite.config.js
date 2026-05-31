// vite.config.js should look like this:
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['logo.png', 'Savings.png', 'Dicebear.png'],
      manifest: {
        name: 'UCC Campus Guide',
        short_name: 'UCC Guide',
        description: 'The ultimate guide for University of Cape Coast students.',
        theme_color: '#002F45',
        background_color: '#ffffff',
        display: 'standalone',
        icons: [
          {
            src: 'logo.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'logo.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: 'logo.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      },
      workbox: {
        maximumFileSizeToCacheInBytes: 5000000, // 5MB
        importScripts: ['https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.sw.js']
      }
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
    dedupe: ['react', 'react-dom', 'leaflet', 'react-leaflet'],
  },
  server: {
    port: 5173,
    open: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
});