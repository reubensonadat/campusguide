import React, { useState, useEffect } from 'react';
import { MessageCircle, Search, X, Sparkles } from 'lucide-react';
import { CustomMapPin } from '../common/CustomMapPin';
import NewThriftModal from './NewThriftModal';
import { getThriftListings } from '../../services/communityService';
import { DataLoader } from '../common/CustomLoaders';
import { useWishlist } from '../../hooks/useWishlist';

// Outline heart — not saved
const HeartOutline = ({ size = 16, className = '' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} width={size} height={size} className={className}>
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
    'Brand New':  { bg: 'bg-violet-500', text: 'text-white',        dot: 'bg-violet-400' },
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
                                                    const wa = item.contact_info?.startsWith('0')
                                                        ? '233' + item.contact_info.slice(1)
                                                        : item.contact_info;
                                                    window.open(`https://wa.me/${wa}`, '_blank');
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

/* ─── ThriftCard ─── */
const ThriftCard = ({ item, toggleWishlist, isWishlisted, getTimeAgo }) => {
    const parts = item.description?.split('\nLocation: ') || [];
    const condition = parts[0]?.replace('Condition: ', '') || 'Used';
    const location = parts[1] || 'Campus';
    const saved = isWishlisted(item.id);
    const cfg = getConditionCfg(condition);
    const isNew = condition === 'Brand New';

    const openWA = (e) => {
        e.stopPropagation();
        const wa = item.contact_info?.startsWith('0')
            ? '233' + item.contact_info.slice(1)
            : item.contact_info;
        window.open(`https://wa.me/${wa}`, '_blank');
    };

    return (
        <div className="flex flex-col group">
            {/* ── Full-bleed image ── */}
            <div className="relative rounded-2xl overflow-hidden bg-gray-100" style={{ aspectRatio: '4/5' }}>
                <img
                    src={item.image_url}
                    alt={item.item_name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Condition pill — top left */}
                <span className={`absolute top-2.5 left-2.5 text-[9px] font-black px-2 py-0.5 rounded-full flex items-center gap-1 ${cfg.bg} ${cfg.text}`}>
                    {isNew && <Sparkles size={8} />}
                    {condition}
                </span>

                {/* Heart — top right, no background bubble */}
                <button
                    onClick={(e) => { e.stopPropagation(); toggleWishlist(item); }}
                    className="absolute top-2.5 right-2.5 transition-all duration-200 hover:scale-110 active:scale-95 drop-shadow-md"
                    title={saved ? 'Remove from saved' : 'Save item'}
                >
                    {saved
                        ? <HeartFilled size={20} className="text-emerald-400" />
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

                    {/* Round WhatsApp button */}
                    <button
                        onClick={openWA}
                        className="w-9 h-9 rounded-full bg-[#25D366] flex items-center justify-center shadow-md shadow-[#25D366]/30 hover:bg-[#1ebe5d] hover:scale-110 active:scale-95 transition-all duration-200"
                        title="WhatsApp Seller"
                    >
                        <MessageCircle size={16} className="text-white" />
                    </button>
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

    const MOCK_ITEMS = [
        { id:1, item_name:'Oraimo Earbuds TWS', price:180, condition:'Used - Good', description:'Condition: Used - Good\nLocation: Casford Hall', contact_info:'0241234567', image_url:'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&q=80', created_at: new Date(Date.now()-10*60000).toISOString() },
        { id:2, item_name:'Hisense Mini Fridge 80L', price:850, condition:'Like New', description:'Condition: Like New\nLocation: Atlantic Hall', contact_info:'0501234567', image_url:'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=400&q=80', created_at: new Date(Date.now()-30*60000).toISOString() },
        { id:3, item_name:'Adidas Running Shoes Size 43', price:220, condition:'Used - Good', description:'Condition: Used - Good\nLocation: University Crescent', contact_info:'0261234567', image_url:'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80', created_at: new Date(Date.now()-2*3600000).toISOString() },
        { id:4, item_name:'iPhone 12 Pro 128GB', price:3200, condition:'Like New', description:'Condition: Like New\nLocation: Pemford Hall', contact_info:'0271234567', image_url:'https://images.unsplash.com/photo-1632661674596-df8be070a5c5?w=400&q=80', created_at: new Date(Date.now()-5*3600000).toISOString() },
        { id:5, item_name:'Laptop Bag Targus 15"', price:95, condition:'Brand New', description:'Condition: Brand New\nLocation: Off Campus', contact_info:'0281234567', image_url:'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&q=80', created_at: new Date(Date.now()-1*86400000).toISOString() },
        { id:6, item_name:'Chemistry TextBooks Bundle', price:130, condition:'Used - Fair', description:'Condition: Used - Fair\nLocation: Akuafo Hall', contact_info:'0291234567', image_url:'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&q=80', created_at: new Date(Date.now()-2*86400000).toISOString() },
        { id:7, item_name:'Electric Kettle 1.7L', price:75, condition:'Used - Good', description:'Condition: Used - Good\nLocation: Commonwealth Hall', contact_info:'0201234567', image_url:'https://images.unsplash.com/photo-1594576722512-582bcd4c5b5a?w=400&q=80', created_at: new Date(Date.now()-3*86400000).toISOString() },
        { id:8, item_name:'Samsung Galaxy Tab A8', price:1600, condition:'Like New', description:'Condition: Like New\nLocation: Legon Hall', contact_info:'0211234567', image_url:'https://images.unsplash.com/photo-1632410803-01b7c51e7826?w=400&q=80', created_at: new Date(Date.now()-4*86400000).toISOString() },
        { id:9, item_name:'Bicycle (Mountain Bike)', price:700, condition:'Used - Good', description:'Condition: Used - Good\nLocation: Sports Complex Area', contact_info:'0221234567', image_url:'https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=400&q=80', created_at: new Date(Date.now()-5*86400000).toISOString() },
        { id:10, item_name:'HP Laptop 8GB RAM 256SSD', price:2800, condition:'Used - Good', description:'Condition: Used - Good\nLocation: Mensah Sarbah Hall', contact_info:'0231234567', image_url:'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&q=80', created_at: new Date(Date.now()-6*86400000).toISOString() },
        { id:11, item_name:'Desk Lamp LED Adjustable', price:55, condition:'Brand New', description:'Condition: Brand New\nLocation: Volta Hall', contact_info:'0541234567', image_url:'https://images.unsplash.com/photo-1513506003901-1e6a35f41f93?w=400&q=80', created_at: new Date(Date.now()-7*86400000).toISOString() },
        { id:12, item_name:'Rice Cooker 1.8L National', price:120, condition:'Used - Good', description:'Condition: Used - Good\nLocation: Bani Hall', contact_info:'0551234567', image_url:'https://images.unsplash.com/photo-1585325701956-60dd9c8bc1a3?w=400&q=80', created_at: new Date(Date.now()-8*86400000).toISOString() },
        { id:13, item_name:'Nike Jordan 1 Mid Size 42', price:450, condition:'Like New', description:'Condition: Like New\nLocation: Casford Block A', contact_info:'0561234567', image_url:'https://images.unsplash.com/photo-1552346154-21d32810aba3?w=400&q=80', created_at: new Date(Date.now()-9*86400000).toISOString() },
        { id:14, item_name:'Study Desk + Chair Set', price:350, condition:'Used - Good', description:'Condition: Used - Good\nLocation: ISH Campus', contact_info:'0571234567', image_url:'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=400&q=80', created_at: new Date(Date.now()-10*86400000).toISOString() },
        { id:15, item_name:'Bluetooth Speaker JBL Clip 3', price:280, condition:'Used - Good', description:'Condition: Used - Good\nLocation: Pent Campus', contact_info:'0581234567', image_url:'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&q=80', created_at: new Date(Date.now()-11*86400000).toISOString() },
        { id:16, item_name:'Canon EOS Rebel Camera', price:2200, condition:'Like New', description:'Condition: Like New\nLocation: School of Engineering', contact_info:'0591234567', image_url:'https://images.unsplash.com/photo-1510127034890-ba27508e9f1c?w=400&q=80', created_at: new Date(Date.now()-12*86400000).toISOString() },
        { id:17, item_name:'Extension Board 4-Socket', price:35, condition:'Brand New', description:'Condition: Brand New\nLocation: TF Hall', contact_info:'0301234567', image_url:'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80', created_at: new Date(Date.now()-13*86400000).toISOString() },
        { id:18, item_name:'Portable Power Bank 20000mAh', price:160, condition:'Used - Good', description:'Condition: Used - Good\nLocation: Balme Library Area', contact_info:'0311234567', image_url:'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=400&q=80', created_at: new Date(Date.now()-14*86400000).toISOString() },
        { id:19, item_name:'Curtains 2-Panel Set (Brown)', price:80, condition:'Used - Fair', description:'Condition: Used - Fair\nLocation: Pentagon Hostel', contact_info:'0321234567', image_url:'https://images.unsplash.com/photo-1572883454114-1cf0031ede2a?w=400&q=80', created_at: new Date(Date.now()-15*86400000).toISOString() },
        { id:20, item_name:'Graphics Calculator TI-84', price:200, condition:'Like New', description:'Condition: Like New\nLocation: Mensah Sarbah Hall A', contact_info:'0331234567', image_url:'https://images.unsplash.com/photo-1564939558297-fc396f18e5c7?w=400&q=80', created_at: new Date(Date.now()-16*86400000).toISOString() },
    ].map(i => ({ ...i, description: `Condition: ${i.condition}\nLocation: ${i.description.split('\nLocation: ')[1]}`, contact_info: i.contact_info }));

    const loadListings = async () => {
        setLoading(true);
        // TODO: remove mock data — replace with real API
        // const { success, data } = await getThriftListings();
        // if (success) setItems(data);
        setTimeout(() => { setItems(MOCK_ITEMS); setLoading(false); }, 600);
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
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredItems.map(item => (
                    <ThriftCard key={item.id} item={item} toggleWishlist={toggleWishlist} isWishlisted={isWishlisted} getTimeAgo={getTimeAgo} />
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
                            ? 'bg-emerald-500 text-white border-emerald-500 shadow-md shadow-emerald-200'
                            : 'bg-white text-gray-400 border-gray-200 hover:text-emerald-500 hover:border-emerald-200'
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
