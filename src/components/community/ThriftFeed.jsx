import React, { useState, useEffect } from 'react';
import { MessageCircle, Loader2 } from 'lucide-react';
import NewThriftModal from './NewThriftModal';
import { getThriftListings } from '../../services/communityService';

const ThriftFeed = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

    const loadListings = async () => {
        setLoading(true);
        const { success, data } = await getThriftListings();
        if (success) setItems(data);
        setLoading(false);
    };

    useEffect(() => {
        loadListings();
    }, []);

    const getTimeAgo = (dateString) => {
        const diff = new Date() - new Date(dateString);
        const mins = Math.floor(diff / 60000);
        if (mins < 60) return `${mins}m ago`;
        const hrs = Math.floor(mins / 60);
        if (hrs < 24) return `${hrs}h ago`;
        return `${Math.floor(hrs / 24)}d ago`;
    };

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-xl font-black text-gray-900">Student Thrift</h2>
                    <p className="text-sm text-gray-500 font-medium">Buy and sell used items on campus</p>
                </div>
                <button onClick={() => setIsModalOpen(true)} className="bg-primary-600 text-white px-4 py-2 rounded-xl font-bold text-sm shadow-md hover:bg-primary-700 transition-colors">
                    + Sell Item
                </button>
            </div>

            {loading ? (
                <div className="py-12 flex flex-col items-center justify-center text-gray-400">
                    <Loader2 className="animate-spin mb-2" size={24} />
                    <p className="text-sm font-medium">Loading items...</p>
                </div>
            ) : items.length === 0 ? (
                <div className="py-12 text-center text-gray-400 font-medium w-full col-span-full">
                    No items found. Be the first to sell!
                </div>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {items.map(item => {
                        // Extract condition and location from description
                        const parts = item.description.split('\nLocation: ');
                        const condition = parts[0].replace('Condition: ', '');
                        const location = parts[1] || 'Unknown';
                        
                        return (
                            <div key={item.id} className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow cursor-pointer group flex flex-col">
                                <div className="relative h-40 bg-gray-100 overflow-hidden flex-shrink-0">
                                    <img src={item.image_url} alt={item.item_name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                    <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg text-[10px] font-black text-gray-700">
                                        {condition}
                                    </div>
                                </div>
                                <div className="p-3 flex flex-col flex-1">
                                    <h3 className="font-bold text-gray-900 text-sm line-clamp-2 leading-tight mb-1">{item.item_name}</h3>
                                    <div className="text-lg font-black text-primary-600 mb-2">GH₵{item.price}</div>
                                    <div className="flex justify-between items-center text-[10px] text-gray-400 font-medium mb-3 mt-auto">
                                        <span className="truncate max-w-[80px]">📍 {location}</span>
                                        <span className="whitespace-nowrap">{getTimeAgo(item.created_at)}</span>
                                    </div>
                                    <button 
                                        onClick={(e) => { 
                                            e.stopPropagation(); 
                                            const waNumber = item.contact_info.startsWith('0') ? '233' + item.contact_info.slice(1) : item.contact_info;
                                            window.open(`https://wa.me/${waNumber}`, '_blank');
                                        }}
                                        className="w-full py-2 bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#25D366] font-bold text-xs rounded-lg transition-colors border border-[#25D366]/20 flex items-center justify-center gap-1.5"
                                    >
                                        <MessageCircle size={14} /> WhatsApp Seller
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            <NewThriftModal isOpen={isModalOpen} onClose={() => { setIsModalOpen(false); loadListings(); }} />
        </div>
    );
};

export default ThriftFeed;
