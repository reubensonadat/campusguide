import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { VitePWA } from 'vite-plugin-pwa';

const isProd = process.env.NODE_ENV === 'production';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'prompt',
      includeAssets: ['logo.png', 'Savings.png'],
      manifest: {
        name: 'UCC Campus Guide',
        short_name: 'UCC Guide',
        description: 'The ultimate guide for University of Cape Coast students.',
        theme_color: '#002F45',
        background_color: '#ffffff',
        display: 'standalone',
        icons: [
          { src: 'logo.png', sizes: '192x192', type: 'image/png' },
          { src: 'logo.png', sizes: '512x512', type: 'image/png' },
          { src: 'logo.png', sizes: '512x512', type: 'image/png', purpose: 'any maskable' }
        ]
      },
      workbox: {
        maximumFileSizeToCacheInBytes: 5000000,
        importScripts: ['https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.sw.js'],
        navigateFallback: '/index.html',
        navigateFallbackAllowlist: [/^\/[a-zA-Z0-9\-_\/]+$/],
        navigationPreload: true,
        globPatterns: ['**/*.{js,css,html,svg,png,ico,ttf,woff,woff2,eot}'],
        runtimeCaching: [
          {
            urlPattern: /^https?:\/\/.*\.supabase\.co\/.*/i,
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'supabase-api',
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 24 * 60 * 60
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          },
          {
            urlPattern: /\.(?:png|jpg|jpeg|gif|webp|svg|ico)$/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'images',
              expiration: {
                maxEntries: 200,
                maxAgeSeconds: 60 * 24 * 60 * 60
              }
            }
          },
          {
            urlPattern: /\.(?:woff|woff2|ttf|eot)$/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'fonts',
              expiration: {
                maxEntries: 20,
                maxAgeSeconds: 365 * 24 * 60 * 60
              }
            }
          },
          {
            urlPattern: /\/api\//i,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'api-cache',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60
              }
            }
          }
        ]
      }
    })
  ],
  resolve: {
    alias: { '@': path.resolve(__dirname, './src') },
    dedupe: ['react', 'react-dom', 'leaflet', 'react-leaflet'],
  },
  server: {
    port: 5173,
    open: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: !isProd,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/leaflet') || id.includes('node_modules/maplibre')) {
            return 'map-vendor';
          }
          if (id.includes('node_modules/@supabase')) {
            return 'supabase';
          }
          if (id.includes('node_modules/lucide-react')) {
            return 'icons';
          }
        }
      }
    }
  },
});
