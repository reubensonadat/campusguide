import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './styles/globals.css'  // This line is important! 
import { registerSW } from 'virtual:pwa-register';

// Register the PWA service worker. With registerType: 'prompt' in vite.config.js, 
// it will wait for the browser to naturally update or ask the user, preventing refresh loops.
registerSW();

ReactDOM.createRoot(document.getElementById('root')).render(
  <App />
);