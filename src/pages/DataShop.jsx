import { useState } from 'react';
import { ChevronLeft, RefreshCw, ExternalLink, Loader2 } from 'lucide-react';

const DATA_SHOP_URL = 'https://www.cheapdata.shop/shop/anat-enterprise-1774112668074-swiftdata-mp8lcz98';

export default function DataShop() {
  const [loading, setLoading] = useState(true);
  const [iframeKey, setIframeKey] = useState(0);

  return (
    <div className="min-h-screen bg-[#f0f2f8] flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 px-4 py-3 flex items-center justify-between shrink-0"
           style={{ paddingTop: 'calc(0.75rem + env(safe-area-inset-top, 0px))' }}>
        <div className="flex items-center gap-2">
          <button onClick={() => window.history.back()}
            className="flex items-center justify-center w-9 h-9 rounded-xl hover:bg-gray-100 transition-colors active:scale-95">
            <ChevronLeft size={20} className="text-gray-600" />
          </button>
          <h1 className="text-lg font-black text-gray-900 tracking-tight">Buy Data</h1>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setIframeKey(k => k + 1)}
            className="flex items-center justify-center w-9 h-9 rounded-xl hover:bg-gray-100 transition-colors active:scale-95"
            title="Refresh">
            <RefreshCw size={16} className={`text-gray-500 ${loading ? 'animate-spin' : ''}`} />
          </button>
          <a href={DATA_SHOP_URL} target="_blank" rel="noopener noreferrer"
            className="flex items-center justify-center w-9 h-9 rounded-xl hover:bg-gray-100 transition-colors active:scale-95"
            title="Open in browser">
            <ExternalLink size={16} className="text-gray-500" />
          </a>
        </div>
      </div>

      {/* Loading indicator */}
      {loading && (
        <div className="flex items-center justify-center py-4 bg-white border-b border-gray-50 shrink-0">
          <Loader2 size={16} className="animate-spin text-primary-500 mr-2" />
          <span className="text-xs font-medium text-gray-400">Loading data shop...</span>
        </div>
      )}

      {/* Iframe */}
      <div className="flex-1 relative">
        <iframe
          key={iframeKey}
          src={DATA_SHOP_URL}
          title="Data Shop"
          className="w-full h-full border-0"
          style={{ minHeight: 'calc(100vh - 120px)' }}
          onLoad={() => setLoading(false)}
          allow="clipboard-write; payment"
          sandbox="allow-scripts allow-same-origin allow-popups allow-forms allow-modals"
        />
      </div>
    </div>
  );
}
