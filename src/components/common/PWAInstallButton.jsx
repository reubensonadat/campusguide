import React, { useState, useEffect } from 'react';
import { Download, X, CheckCircle } from 'lucide-react';

const PWAInstallButton = () => {
    const [deferredPrompt, setDeferredPrompt] = useState(null);
    const [showButton, setShowButton] = useState(false);
    const [installing, setInstalling] = useState(false);
    const [installed, setInstalled] = useState(false);

    useEffect(() => {
        // Check if app is already installed
        if (window.matchMedia('(display-mode: standalone)').matches) {
            setShowButton(false);
            return;
        }

        // Check if already dismissed
        const dismissed = localStorage.getItem('pwa_install_dismissed');
        if (dismissed) {
            setShowButton(false);
            return;
        }

        // Capture the PWA install prompt event
        const handleBeforeInstallPrompt = (e) => {
            e.preventDefault();
            setDeferredPrompt(e);
            setShowButton(true);
            console.log('PWA install prompt captured');
        };

        // Listen for successful installation
        const handleAppInstalled = () => {
            console.log('PWA was installed');
            setShowButton(false);
            setInstalled(true);
            setDeferredPrompt(null);
        };

        window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
        window.addEventListener('appinstalled', handleAppInstalled);

        return () => {
            window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
            window.removeEventListener('appinstalled', handleAppInstalled);
        };
    }, []);

    const handleInstallClick = async () => {
        if (!deferredPrompt) {
            return;
        }

        setInstalling(true);

        // Show the install prompt
        deferredPrompt.prompt();

        // Wait for the user to respond to the prompt
        const { outcome } = await deferredPrompt.userChoice;

        console.log(`User response to the install prompt: ${outcome}`);

        if (outcome === 'accepted') {
            setInstalled(true);
            setTimeout(() => {
                setShowButton(false);
            }, 2000);
        }

        setInstalling(false);
        setDeferredPrompt(null);
    };

    const handleDismiss = () => {
        setShowButton(false);
        localStorage.setItem('pwa_install_dismissed', 'true');
    };

    if (!showButton) {
        return null;
    }

    return (
        <div className="fixed bottom-20 right-4 md:bottom-6 md:right-6 z-[9999] animate-in slide-in-from-bottom duration-500">
            <div className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-2xl shadow-2xl p-4 pr-3 flex items-center gap-3 max-w-sm backdrop-blur-sm border border-indigo-400/20">
                {installed ? (
                    <>
                        <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center shrink-0">
                            <CheckCircle size={24} className="text-white" />
                        </div>
                        <div className="flex-1">
                            <h4 className="font-bold text-sm">Installed!</h4>
                            <p className="text-xs text-indigo-100">Thank you for installing</p>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center shrink-0">
                            <Download size={24} className="text-white" />
                        </div>
                        <div className="flex-1">
                            <h4 className="font-bold text-sm">Download App</h4>
                            <p className="text-xs text-indigo-100">Install for offline access</p>
                        </div>
                        <button
                            onClick={handleInstallClick}
                            disabled={installing}
                            className="bg-white text-indigo-600 px-4 py-2 rounded-xl font-bold text-sm hover:bg-indigo-50 transition-all active:scale-95 disabled:opacity-50 shrink-0"
                        >
                            {installing ? 'Installing...' : 'Install'}
                        </button>
                        <button
                            onClick={handleDismiss}
                            className="text-white/70 hover:text-white transition-colors p-1"
                            aria-label="Dismiss"
                        >
                            <X size={18} />
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default PWAInstallButton;
