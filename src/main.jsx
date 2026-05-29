import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './styles/globals.css'  // This line is important! 
import { registerSW } from 'virtual:pwa-register';

// Register the PWA service worker and automatically refresh when new updates are found
registerSW({
  immediate: true,
  onNeedRefresh() {
    window.location.reload();
  }
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <App />
);