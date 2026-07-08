import React from 'react';
import { CheckCircle, XCircle, Trash2 } from 'lucide-react';

const AdModerationPanel = ({ ads, onApprove, onReject, onDelete }) => (
  <div className="space-y-4 max-w-5xl mx-auto">
    <h2 className="text-2xl font-black mb-6">Manage Advertisements</h2>
    <div className="grid gap-4">
      {ads.map(ad => (
        <div key={ad.id} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-200 flex flex-col md:flex-row gap-4 items-start md:items-center">
          {ad.image_url && <img src={ad.image_url} alt="Ad" className="w-full md:w-32 h-32 object-cover rounded-xl bg-gray-100" />}
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className={`px-2 py-0.5 text-[10px] font-black rounded-lg uppercase ${new Date(ad.expires_at) < new Date() ? 'bg-gray-200 text-gray-700' : ad.status?.toLowerCase() === 'active' ? 'bg-green-100 text-green-700' : ad.status?.toLowerCase() === 'rejected' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'}`}>
                {new Date(ad.expires_at) < new Date() ? 'EXPIRED' : ad.status || 'UNKNOWN'}
              </span>
              <span className="text-xs text-gray-500 font-bold">{ad.package_id}</span>
            </div>
            <h3 className="text-lg font-bold text-gray-900">{ad.title}</h3>
            <p className="text-sm text-gray-500 line-clamp-2 mt-1">{ad.description}</p>
            <div className="text-xs text-gray-400 mt-2 font-mono break-all">Ref: {ad.paystack_reference}</div>
          </div>
          <div className="flex flex-row md:flex-col gap-2 w-full md:w-auto">
            {ad.status?.toLowerCase() !== 'active' && (
              <button onClick={() => onApprove(ad.id)} className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-green-50 hover:bg-green-100 text-green-600 font-bold py-2 px-4 rounded-xl transition-colors">
                <CheckCircle size={18} /> Approve
              </button>
            )}
            {ad.status?.toLowerCase() !== 'rejected' && (
              <button onClick={() => onReject(ad.id)} className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-amber-50 hover:bg-amber-100 text-amber-600 font-bold py-2 px-4 rounded-xl transition-colors">
                <XCircle size={18} /> Reject
              </button>
            )}
            <button onClick={() => onDelete(ad.id)} className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-red-50 hover:bg-red-100 text-red-600 font-bold py-2 px-4 rounded-xl transition-colors">
              <Trash2 size={18} /> Delete
            </button>
          </div>
        </div>
      ))}
      {ads.length === 0 && <p className="text-gray-500 text-center py-10">No advertisements found.</p>}
    </div>
  </div>
);

export default AdModerationPanel;
