import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './styles/globals.css'  // This line is important! 
import { registerSW } from 'virtual:pwa-register';

// Register the PWA service worker. With registerType: 'autoUpdate' in vite.config.js, 
// the service worker will update automatically without needing a forced manual reload.
registerSW({
  immediate: true
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <App />
);