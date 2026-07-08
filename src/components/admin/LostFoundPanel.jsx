import React from 'react';
import { Trash2 } from 'lucide-react';

const LostFoundPanel = ({ lostFoundItems, onDelete }) => (
  <div className="space-y-4 max-w-5xl mx-auto">
    <h2 className="text-2xl font-black mb-6">Manage Lost & Found</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {lostFoundItems.map(item => (
        <div key={item.id} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-200 flex flex-col">
          <span className={`self-start px-2 py-0.5 text-[10px] font-black rounded-lg uppercase mb-2 ${item.type === 'lost' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
            {item.type}
          </span>
          <h3 className="text-lg font-bold text-gray-900">{item.item_name}</h3>
          <p className="text-sm text-gray-500 flex-1 mt-2 mb-4 line-clamp-3">{item.description}</p>
          {item.image_url && <img src={item.image_url} className="w-full h-32 object-cover rounded-xl mb-4" alt="Item" />}
          <div className="text-xs font-bold text-gray-400 mb-4">{new Date(item.created_at).toLocaleString()}</div>
          <button onClick={() => onDelete(item.id)} className="w-full flex items-center justify-center gap-2 bg-red-50 hover:bg-red-100 text-red-600 font-bold py-2 px-4 rounded-xl transition-colors mt-auto">
            <Trash2 size={18} /> Remove
          </button>
        </div>
      ))}
      {lostFoundItems.length === 0 && <p className="text-gray-500 text-center py-10 md:col-span-2 lg:col-span-3">No items found.</p>}
    </div>
  </div>
);

export default LostFoundPanel;
