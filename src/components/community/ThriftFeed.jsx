import React, { useState, useEffect } from 'react';
import { MessageCircle, Search, X, Share2 } from 'lucide-react';
import { CustomSafetyCheck } from '../common/CustomIcons';
import { CustomMapPin } from '../common/CustomMapPin';
import NewThriftModal from './NewThriftModal';
import { getThriftListings } from '../../services/communityService';
import { DataLoader } from '../common/CustomLoaders';
import { useWishlist } from '../../hooks/useWishlist';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { toast } from 'react-hot-toast';

const handleShareThrift = (e, id) => {
    if (e) e.stopPropagation();
    const shareUrl = `${window.location.origin}/community?thriftId=${id}`;
    navigator.clipboard.writeText(shareUrl).then(() => {
        toast.success('Thrift item link copied to clipboard!');
    }).catch(() => {
        toast.error('Failed to copy link.');
    });
};

// Outline heart — not saved
const HeartOutline = ({ size = 16, className = '' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.2} width={size} height={size} className={className}>
        <path d="M12 8.81056L13.6352 6.48845C14.2721 5.58412 15.3179 5 16.5 5C18.433 5 20 6.567 20 8.5C20 11.3788 18.0407 14.1215 15.643 16.3358C14.4877 17.4027 13.3237 18.2603 12.4451 18.8521C12.2861 18.9592 12.1371 19.0571 11.9999 19.1456C11.8627 19.0571 11.7137 18.9592 11.5547 18.8521C10.6761 18.2604 9.51216 17.4028 8.35685 16.3358C5.95926 14.1216 4 11.3788 4 8.5C4 6.567 5.567 5 7.5 5C8.68209 5 9.72794 5.58412 10.3648 6.48845L12 8.81056ZM10.5557 3.92626C9.68172 3.3412 8.63071 3 7.5 3C4.46243 3 2 5.46243 2 8.5C2 16 11.9999 21.4852 11.9999 21.4852C11.9999 21.4852 22 16 22 8.5C22 5.46243 19.5376 3 16.5 3C15.3693 3 14.3183 3.3412 13.4443 3.92626C12.8805 4.3037 12.3903 4.78263 12 5.33692C11.6097 4.78263 11.1195 4.3037 10.5557 3.92626Z" />
    </svg>
);

// Filled heart — saved (green)
const HeartFilled = ({ size = 16, className = '' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width={size} height={size} className={className}>
        <path d="M2 8.5C2 5.46243 4.46243 3 7.5 3C9.36016 3 11.0046 3.92345 12 5.33692C12.9954 3.92345 14.6398 3 16.5 3C19.5376 3 22 5.46243 22 8.5C22 16 11.9999 21.4852 11.9999 21.4852C11.9999 21.4852 2 16 2 8.5Z" />
    </svg>
);

const HeartIcon = ({ size = 16, filled = false, className = '' }) =>
    filled
        ? <HeartFilled size={size} className={className} />
        : <HeartOutline size={size} className={className} />;

/* ─── condition config ─── */
const CONDITION_CONFIG = {
    'Brand New':  { bg: 'bg-primary-600', text: 'text-white',       dot: 'bg-primary-500' },
    'Like New':   { bg: 'bg-emerald-500', text: 'text-white',       dot: 'bg-emerald-400' },
    'Used - Good':{ bg: 'bg-sky-500',    text: 'text-white',        dot: 'bg-sky-400' },
    'Used - Fair':{ bg: 'bg-amber-400',  text: 'text-amber-900',    dot: 'bg-amber-300' },
};

const getConditionCfg = (c) => CONDITION_CONFIG[c] || { bg: 'bg-gray-400', text: 'text-white', dot: 'bg-gray-300' };

/* ─── Wishlist Overlay ─── */
const WishlistOverlay = ({ wishlistItems, items, toggleWishlist, onClose }) => (
    <div className="fixed inset-0 z-[70] flex flex-col" onClick={onClose}>
        {/* Dim backdrop */}
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

        {/* Sheet — slides up from bottom */}
        <div
            className="relative mt-auto bg-white rounded-t-3xl shadow-2xl max-h-[80vh] flex flex-col animate-in slide-in-from-bottom-8 duration-300"
            onClick={e => e.stopPropagation()}
        >
            {/* Handle bar */}
            <div className="flex justify-center pt-3 pb-1">
                <div className="w-10 h-1 rounded-full bg-gray-200" />
            </div>

            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
                <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-rose-100 flex items-center justify-center">
                        <HeartIcon size={15} filled className="text-rose-500" />
                    </div>
                    <div>
                        <h3 className="font-black text-gray-900 text-base leading-none">Saved Items</h3>
                        <p className="text-xs text-gray-400 font-medium mt-0.5">{wishlistItems.length} item{wishlistItems.length !== 1 ? 's' : ''} saved</p>
                    </div>
                </div>
                <button onClick={onClose} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-colors">
                    <X size={15} />
                </button>
            </div>

            {/* Content */}
            <div className="overflow-y-auto flex-1 custom-scrollbar">
                {wishlistItems.length === 0 ? (
                    <div className="py-16 flex flex-col items-center justify-center text-center gap-3 px-6">
                        <div className="w-20 h-20 rounded-3xl bg-rose-50 flex items-center justify-center mb-2">
                            <HeartIcon size={32} className="text-rose-200" />
                        </div>
                        <p className="text-gray-800 font-black text-lg">Nothing saved yet</p>
                        <p className="text-gray-400 text-sm font-medium leading-relaxed">
                            Tap the ♡ heart on any listing to save it here — even if it expires later
                        </p>
                    </div>
                ) : (
                    <div className="p-4 space-y-3">
                        {wishlistItems.map(item => {
                            const parts = item.description?.split('\nLocation: ') || [];
                            const condition = parts[0]?.replace('Condition: ', '') || 'Used';
                            const location = parts[1] || 'Campus';
                            const stillLive = items.some(i => i.id === item.id);
                            const cfg = getConditionCfg(condition);

                            return (
                                <div key={item.id} className="flex gap-3.5 bg-gray-50 rounded-2xl p-3 border border-gray-100">
                                    {/* Image */}
                                    <div className="relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-gray-200">
                                        <img src={item.image_url} alt={item.item_name} className="w-full h-full object-cover" />
                                        <span className={`absolute bottom-1 left-1 text-[8px] font-black px-1.5 py-0.5 rounded-full ${cfg.bg} ${cfg.text}`}>
                                            {condition}
                                        </span>
                                    </div>

                                    {/* Details */}
                                    <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
                                        <div>
                                            <div className="flex items-start justify-between gap-1">
                                                <p className="text-sm font-bold text-gray-900 leading-snug line-clamp-2">{item.item_name}</p>
                                                <button
                                                    onClick={() => toggleWishlist(item)}
                                                    className="flex-shrink-0 p-1 text-rose-400 hover:text-rose-600 transition-colors"
                                                    title="Remove"
                                                >
                                                    <HeartIcon size={14} filled className="text-rose-400" />
                                                </button>
                                            </div>
                                            <p className="text-lg font-black text-primary-600 mt-0.5">GH₵{item.price}</p>
                                        </div>

                                        <div className="flex items-center justify-between mt-1">
                                            <div className="flex items-center gap-1 text-[10px] text-gray-400 font-medium">
                                                <CustomMapPin size={9} />
                                                <span className="truncate max-w-[90px]">{location}</span>
                                                {!stillLive && (
                                                    <span className="ml-1 text-amber-500 font-bold">• Expired</span>
                                                )}
                                            </div>
                                            <button
                                                onClick={() => {
                                                    let wa = item.contact_info ? item.contact_info.toString().replace(/\D/g, '') : '';
                                                    if (wa.startsWith('0')) {
                                                        wa = '233' + wa.slice(1);
                                                    } else if (!wa.startsWith('233') && wa.length === 9) {
                                                        wa = '233' + wa;
                                                    }
                                                    window.open(`https://wa.me/${wa}?text=${encodeURIComponent(`Hello! I saw your "${item.item_name}" on UCC Campus Guide thrift store. Is it still available?`)}`, '_blank');
                                                }}
                                                className="flex items-center gap-1 text-[10px] font-black text-[#25D366] bg-[#25D366]/10 hover:bg-[#25D366] hover:text-white px-2.5 py-1.5 rounded-lg transition-all"
                                            >
                                                <MessageCircle size={10} /> Chat
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    </div>
);

/* ─── Animated Thrift Card Wrapper ─── */
const RevealThriftCard = ({ item, index, toggleWishlist, isWishlisted, getTimeAgo }) => {
    const { ref, isVisible } = useScrollReveal({ threshold: 0.05, rootMargin: '0px 0px -20px 0px' });
    // Stagger delay: 0ms, 60ms, 120ms, 180ms ... capped at 300ms
    const delay = Math.min(index * 60, 300);

    return (
        <div
            ref={ref}
            className="break-inside-avoid"
            style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(24px) scale(0.97)',
                transition: `opacity 0.5s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.5s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
            }}
        >
            <ThriftCard item={item} toggleWishlist={toggleWishlist} isWishlisted={isWishlisted} getTimeAgo={getTimeAgo} />
        </div>
    );
};

/* ─── ThriftCard ─── */
const ThriftCard = ({ item, toggleWishlist, isWishlisted, getTimeAgo }) => {
    const parts = item.description?.split('\nLocation: ') || [];
    const condition = parts[0]?.replace('Condition: ', '') || 'Used';
    const location = parts[1] || 'Campus';
    const saved = isWishlisted(item.id);
    const cfg = getConditionCfg(condition);
    const isNew = condition === 'Brand New';

    const pressTimer = React.useRef(null);
    const sharedId = new URLSearchParams(window.location.search).get('thriftId');
    const isShared = item.id.toString() === sharedId;

    const startPress = (e) => {
        pressTimer.current = setTimeout(() => {
            handleShareThrift(null, item.id);
        }, 2000);
    };

    const endPress = () => {
        if (pressTimer.current) {
            clearTimeout(pressTimer.current);
            pressTimer.current = null;
        }
    };

    const openWA = (e) => {
        e.stopPropagation();
        let wa = item.contact_info ? item.contact_info.toString().replace(/\D/g, '') : '';
        if (wa.startsWith('0')) {
            wa = '233' + wa.slice(1);
        } else if (!wa.startsWith('233') && wa.length === 9) {
            wa = '233' + wa;
        }
        window.open(`https://wa.me/${wa}?text=${encodeURIComponent(`Hello! I saw your "${item.item_name}" on UCC Campus Guide thrift store. Is it still available?`)}`, '_blank');
    };

    return (
        <div 
            className={`flex flex-col group p-2.5 rounded-3xl transition-all duration-300 ${isShared ? 'ring-2 ring-primary-500 bg-primary-50/20 border border-primary-200' : 'border border-transparent'}`}
            onMouseDown={startPress}
            onMouseUp={endPress}
            onMouseLeave={endPress}
            onTouchStart={startPress}
            onTouchEnd={endPress}
            onTouchMove={endPress}
        >
            {/* ── Full-bleed image ── */}
            <div className="relative rounded-2xl overflow-hidden bg-gray-100">
                <img
                    src={item.image_url}
                    alt={item.item_name}
                    className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Condition pill — top left */}
                <span className={`absolute top-2.5 left-2.5 text-[9px] font-black px-2 py-0.5 rounded-full flex items-center gap-1 shadow-sm ${cfg.bg} ${cfg.text}`}>
                    {condition}
                </span>

                {/* Heart — top right, no background bubble */}
                <button
                    onClick={(e) => { e.stopPropagation(); toggleWishlist(item); }}
                    className="absolute top-2.5 right-2.5 transition-all duration-200 hover:scale-110 active:scale-95 drop-shadow-md"
                    title={saved ? 'Remove from saved' : 'Save item'}
                >
                    {saved
                        ? <HeartFilled size={20} className="text-primary-500" />
                        : <HeartOutline size={20} className="text-white" />
                    }
                </button>
            </div>

            {/* ── Below image info ── */}
            <div className="pt-2.5 px-0.5">
                {/* Location row */}
                <div className="flex items-center gap-1 text-[11px] text-gray-400 font-medium mb-1">
                    <CustomMapPin size={9} className="w-3 h-3 flex-shrink-0" />
                    <span className="truncate">{location}</span>
                </div>

                {/* Product name */}
                <h3 className="font-bold text-gray-900 text-sm line-clamp-2 leading-snug mb-2.5">{item.item_name}</h3>

                {/* Price + WhatsApp button row */}
                <div className="flex items-center justify-between">
                    <span className="text-lg font-black text-gray-900">GH₵{item.price}</span>

                    <div className="flex items-center gap-2">
                        {/* Round Share button */}
                        <button
                            onClick={(e) => handleShareThrift(e, item.id)}
                            className="w-9 h-9 rounded-full bg-gray-50 flex items-center justify-center text-gray-500 hover:bg-gray-100 hover:scale-110 active:scale-95 transition-all duration-200"
                            title="Share Item"
                        >
                            <Share2 size={16} />
                        </button>

                        {/* Round WhatsApp button */}
                        <button
                            onClick={openWA}
                            className="w-9 h-9 rounded-full bg-[#25D366] flex items-center justify-center shadow-md shadow-emerald-100 hover:bg-emerald-600 hover:scale-110 active:scale-95 transition-all duration-200"
                            title="WhatsApp Seller"
                        >
                            <MessageCircle size={16} className="text-white" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

/* ─── Main Component ─── */
const ThriftFeed = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showWishlist, setShowWishlist] = useState(false);
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const { wishlistItems, toggleWishlist, isWishlisted } = useWishlist();

    const loadListings = async () => {
        setLoading(true);
        const { success, data } = await getThriftListings();
        if (success) {
            const thriftId = new URLSearchParams(window.location.search).get('thriftId');
            if (thriftId) {
                const sorted = [...data].sort((a, b) => {
                    if (a.id.toString() === thriftId) return -1;
                    if (b.id.toString() === thriftId) return 1;
                    return 0;
                });
                setItems(sorted);
            } else {
                setItems(data);
            }
        }
        setLoading(false);
    };

    useEffect(() => { loadListings(); }, []);

    const getTimeAgo = (d) => {
        const mins = Math.floor((new Date() - new Date(d)) / 60000);
        if (mins < 60) return `${mins}m ago`;
        const hrs = Math.floor(mins / 60);
        if (hrs < 24) return `${hrs}h ago`;
        return `${Math.floor(hrs / 24)}d ago`;
    };

    const filteredItems = items.filter(item => {
        if (!searchQuery.trim()) return true;
        const q = searchQuery.toLowerCase();
        return item.item_name.toLowerCase().includes(q) || item.description?.toLowerCase().includes(q);
    });

    const renderContent = () => {
        if (loading) return (
            <div className="py-12 flex flex-col items-center justify-center text-gray-400">
                <DataLoader className="w-8 h-8 text-[#002F45] mb-3" />
                <p className="text-sm font-medium">Loading listings...</p>
            </div>
        );

        if (items.length === 0) return (
            <div className="py-16 flex flex-col items-center text-center gap-3">
                <div className="text-5xl">🛍️</div>
                <p className="text-gray-800 font-black text-lg">No listings yet</p>
                <p className="text-gray-400 text-sm">Be the first to sell something on campus!</p>
                <button onClick={() => setIsModalOpen(true)} className="mt-1 bg-primary-600 text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-primary-700 transition-colors shadow-md">
                    + Post an Item
                </button>
            </div>
        );

        if (filteredItems.length === 0) return (
            <div className="py-16 flex flex-col items-center text-center gap-3">
                <div className="text-5xl">🔍</div>
                <p className="text-gray-800 font-black text-lg">Nothing found for &ldquo;{searchQuery}&rdquo;</p>
                <p className="text-gray-400 text-sm">Not listed yet — be the first to sell it!</p>
                <div className="flex gap-2 mt-1">
                    <button onClick={() => setSearchQuery('')} className="px-4 py-2 bg-gray-100 text-gray-700 rounded-xl font-bold text-sm hover:bg-gray-200 transition-colors">Clear</button>
                    <button onClick={() => setIsModalOpen(true)} className="px-4 py-2 bg-primary-600 text-white rounded-xl font-bold text-sm hover:bg-primary-700 transition-colors shadow-md">+ Post an Item</button>
                </div>
            </div>
        );

        return (
            <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
                {filteredItems.map((item, index) => (
                    <RevealThriftCard key={item.id} item={item} index={index} toggleWishlist={toggleWishlist} isWishlisted={isWishlisted} getTimeAgo={getTimeAgo} />
                ))}
            </div>
        );
    };

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Header */}
            <div className="flex justify-between items-center mb-3">
                <div>
                    <h2 className="text-xl font-black text-gray-900">Student Thrift</h2>
                    <p className="text-sm text-gray-500 font-medium">Buy &amp; sell used items on campus</p>
                </div>
                <button onClick={() => setIsModalOpen(true)} className="bg-primary-600 text-white px-4 py-2 rounded-xl font-bold text-sm shadow-md hover:bg-primary-700 transition-colors whitespace-nowrap">
                    + Sell Item
                </button>
            </div>

            {/* Disclaimer */}
            <div className="bg-blue-50 border border-blue-100 rounded-lg p-2.5 mb-4 flex gap-2.5 items-start">
                <CustomSafetyCheck size={18} className="text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                    <h4 className="font-black text-blue-900 text-[11px] mb-0.5 uppercase tracking-wide">Buyer Safety</h4>
                    <p className="text-[10px] text-blue-800 font-medium leading-snug">
                        Verify the product or service before making payments.
                    </p>
                </div>
            </div>

            {/* Search + Wishlist button */}
            <div className="flex items-center gap-2 mb-5">
                <div className="relative flex-1">
                    <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                        placeholder="Search items or location..."
                        className="w-full pl-9 pr-9 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary-400 focus:bg-white transition-colors"
                    />
                    {searchQuery && (
                        <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                            <X size={14} />
                        </button>
                    )}
                </div>

                {/* Saved Items pill */}
                <button
                    onClick={() => setShowWishlist(true)}
                    className={`relative flex-shrink-0 h-10 px-3 rounded-xl flex items-center gap-1.5 font-bold text-xs transition-all duration-200 border
                        ${wishlistItems.length > 0
                            ? 'bg-primary-600 text-white border-primary-600 shadow-md shadow-primary-200'
                            : 'bg-white text-gray-400 border-gray-200 hover:text-primary-600 hover:border-primary-200'
                        }`}
                >
                    {wishlistItems.length > 0
                        ? <HeartFilled size={14} className="text-white" />
                        : <HeartOutline size={14} />
                    }
                    {wishlistItems.length > 0
                        ? <span>{wishlistItems.length} Saved</span>
                        : <span>Saved</span>
                    }
                </button>
            </div>

            {renderContent()}

            {/* Wishlist Bottom Sheet */}
            {showWishlist && (
                <WishlistOverlay
                    wishlistItems={wishlistItems}
                    items={items}
                    toggleWishlist={toggleWishlist}
                    onClose={() => setShowWishlist(false)}
                />
            )}

            <NewThriftModal isOpen={isModalOpen} onClose={() => { setIsModalOpen(false); loadListings(); }} />
        </div>
    );
};

export default ThriftFeed;
