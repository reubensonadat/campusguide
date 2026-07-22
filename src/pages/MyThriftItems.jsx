import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, MessageCircle, TrendingUp, Clock, Zap, Check, Trash2, RefreshCw, Tag, ArrowLeft, ChevronDown, ChevronUp, Plus, ShoppingBag } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { fetchUserThriftListingsWithStats, boostThriftListing, extendThriftListing, markThriftListingAsSold, deleteThriftListing, clearThriftCache } from '../services/thriftService';
import { PaymentButton } from '../components/payment/PaymentButton';
import ConfirmModal from '../components/common/ConfirmModal';

const getPaymentEmail = () => {
  const deviceId = localStorage.getItem('ucc_device_id');
  if (!deviceId) return 'anonymous@uccguide.com';
  return `${deviceId.replace(/\s+/g, '').toLowerCase()}@campusguide.app`;
};

const getPaymentPhone = () => {
  try {
    const profile = JSON.parse(localStorage.getItem('ucc_profile') || '{}');
    return profile.phone || '';
  } catch { return ''; }
};

const checkExpiryStatus = (expiresAt) => {
  if (!expiresAt) return { isExpired: false, isExpiringSoon: false };
  const expiry = new Date(expiresAt);
  const now = new Date();
  const inTwoDays = new Date();
  inTwoDays.setDate(inTwoDays.getDate() + 2);
  return { isExpired: expiry <= now, isExpiringSoon: !(expiry <= now) && expiry <= inTwoDays };
};

const CustomWhisperRefreshIcon = ({ className = "w-4 h-4" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M5.46257 4.43262C7.21556 2.91688 9.5007 2 12 2C17.5228 2 22 6.47715 22 12C22 14.1361 21.3302 16.1158 20.1892 17.7406L17 12H20C20 7.58172 16.4183 4 12 4C9.84982 4 7.89777 4.84827 6.46023 6.22842L5.46257 4.43262ZM18.5374 19.5674C16.7844 21.0831 14.4993 22 12 22C6.47715 22 2 17.5228 2 12C2 9.86386 2.66979 7.88416 3.8108 6.25944L7 12H4C4 16.4183 7.58172 20 12 20C14.1502 20 16.1022 19.1517 17.5398 17.7716L18.5374 19.5674Z"></path>
  </svg>
);

const MyThriftItems = () => {
  const navigate = useNavigate();
  const [listings, setListings] = useState([]);
  const [statsMap, setStatsMap] = useState({});
  const [loading, setLoading] = useState(true);
  const [confirmAction, setConfirmAction] = useState(null);
  const [expandedId, setExpandedId] = useState(null);

  const userId = localStorage.getItem('ucc_user_id');

  useEffect(() => {
    if (!userId) {
      toast.error('Please log in');
      navigate('/');
      return;
    }
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    const { listings: items, stats } = await fetchUserThriftListingsWithStats(userId);
    setListings(items);
    setStatsMap(stats);
    setLoading(false);
  };

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handleBoostSuccess = async (listingId, days) => {
    const { listing: updated, error } = await boostThriftListing(listingId, days);
    if (!error) {
      toast.success(`Boosted for ${days} days!`);
      setListings(prev => prev.map(l => l.id === updated.id ? updated : l));
    } else {
      toast.error('Failed to boost');
    }
  };

  const handleExtend = async (listingId) => {
    const { listing: updated, error } = await extendThriftListing(listingId, 7);
    if (error) { toast.error(error); return; }
    toast.success('Extended 7 days!');
    setListings(prev => prev.map(l => l.id === updated.id ? updated : l));
  };

  const handleMarkSold = async (id) => {
    if (!id) return;
    setConfirmAction(null);
    const { listing: updated } = await markThriftListingAsSold(id);
    if (updated) setListings(prev => prev.map(l => l.id === id ? updated : l));
    toast.success('Marked as sold!');
  };

  const handleDelete = async (id) => {
    if (!id) return;
    setConfirmAction(null);
    const { success } = await deleteThriftListing(id);
    if (success) {
      setListings(prev => prev.filter(l => l.id !== id));
      if (expandedId === id) setExpandedId(null);
    }
    toast.success('Listing deleted');
  };

  const totalViews = Object.values(statsMap).reduce((sum, s) => sum + (s.total_views || 0), 0);
  const totalClicks = Object.values(statsMap).reduce((sum, s) => sum + (s.whatsapp_clicks || 0), 0);
  const activeCount = listings.filter(l => !l.is_sold && !checkExpiryStatus(l.expires_at).isExpired).length;
  const featuredCount = listings.filter(l => l.is_featured).length;

  const StatBox = ({ icon: Icon, label, value, colorStyle }) => (
    <div className="bg-white p-3.5 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-3 transition-all hover:shadow-md">
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${colorStyle.iconBg}`}>
        <Icon size={18} className={colorStyle.iconColor} />
      </div>
      <div className="min-w-0">
        <p className="text-xl font-extrabold text-gray-900 leading-tight">{value}</p>
        <p className="text-xs text-gray-500 font-medium truncate">{label}</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50/50 pb-28 font-sans animate-in fade-in duration-300">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 pt-4 sm:pt-6 space-y-5">

        {/* Header */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => navigate('/community?tab=thrift')} 
              className="w-9 h-9 rounded-xl bg-white shadow-sm border border-gray-200/80 flex items-center justify-center text-gray-700 hover:bg-gray-100 transition-colors"
            >
              <ArrowLeft size={18} />
            </button>
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">My Thrift Listings</h1>
              <p className="text-xs text-gray-500 font-medium">{listings.length} total listing{listings.length !== 1 ? 's' : ''}</p>
            </div>
          </div>

          <button 
            onClick={() => {
              clearThriftCache();
              loadData();
            }} 
            disabled={loading} 
            className="h-10 px-3.5 rounded-xl bg-primary-50 hover:bg-primary-100 text-primary-700 border border-primary-100/80 shadow-sm transition-all flex items-center gap-2 font-bold text-xs active:scale-95 disabled:opacity-50"
            title="Refresh thrift listings"
          >
            <CustomWhisperRefreshIcon className={`w-4 h-4 text-primary-600 ${loading ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline">Refresh</span>
          </button>
        </div>

        {/* Stats Dashboard Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
          <StatBox 
            icon={Tag} 
            label="Active" 
            value={activeCount} 
            colorStyle={{ iconBg: 'bg-primary-50', iconColor: 'text-primary-600' }} 
          />
          <StatBox 
            icon={Zap} 
            label="Featured" 
            value={featuredCount} 
            colorStyle={{ iconBg: 'bg-amber-50', iconColor: 'text-amber-600' }} 
          />
          <StatBox 
            icon={Eye} 
            label="Views" 
            value={totalViews} 
            colorStyle={{ iconBg: 'bg-blue-50', iconColor: 'text-blue-600' }} 
          />
          <StatBox 
            icon={MessageCircle} 
            label="Clicks" 
            value={totalClicks} 
            colorStyle={{ iconBg: 'bg-emerald-50', iconColor: 'text-emerald-600' }} 
          />
        </div>

        {/* Listings List */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <RefreshCw size={24} className="animate-spin text-primary-600" />
            <p className="text-xs font-semibold text-gray-400">Loading your items...</p>
          </div>
        ) : listings.length === 0 ? (
          <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm text-center flex flex-col items-center gap-3">
            <div className="w-16 h-16 rounded-2xl bg-primary-50 text-primary-600 flex items-center justify-center mb-1">
              <ShoppingBag size={28} />
            </div>
            <h3 className="text-lg font-extrabold text-gray-900">No thrift listings yet</h3>
            <p className="text-xs text-gray-500 max-w-sm leading-relaxed">
              Have unused textbooks, gadgets, or clothes? Post them on campus thrift to connect directly with student buyers on WhatsApp.
            </p>
            <button 
              onClick={() => navigate('/community?tab=thrift')} 
              className="mt-2 px-5 py-2.5 bg-primary-600 hover:bg-primary-700 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md shadow-primary-600/20 transition-all flex items-center gap-1.5"
            >
              <Plus size={16} /> Post Your First Item
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {listings.map(listing => {
              const stats = statsMap[listing.id] || {};
              const expiry = checkExpiryStatus(listing.expires_at);
              const isExpanded = expandedId === listing.id;

              return (
                <div key={listing.id} className="rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden transition-all hover:shadow-md">
                  <button onClick={() => toggleExpand(listing.id)} className="w-full text-left p-3.5 sm:p-4 hover:bg-gray-50/50 transition-colors">
                    <div className="flex gap-3.5 items-center">
                      {listing.image_url && (
                        <div className="w-14 h-14 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0 border border-gray-100">
                          <img 
                            src={listing.image_url} 
                            alt={listing.item_name} 
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=400&q=80';
                            }}
                          />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-1.5">
                          <div className="min-w-0 flex-1">
                            <h3 className="font-bold text-gray-900 text-sm sm:text-base truncate">{listing.item_name}</h3>
                            <p className="text-base sm:text-lg font-black text-gray-900 mt-0.5">GH₵{listing.price}</p>
                          </div>
                          <div className="flex items-center gap-1 flex-shrink-0">
                            <StatusBadge listing={listing} expiry={expiry} />
                            {isExpanded ? <ChevronUp size={16} className="text-gray-400 shrink-0" /> : <ChevronDown size={16} className="text-gray-400 shrink-0" />}
                          </div>
                        </div>
                        <div className="flex items-center gap-3 mt-1 text-[11px] text-gray-400 font-medium">
                          <span>{new Date(listing.created_at).toLocaleDateString()}</span>
                          {stats.total_views > 0 && <span>• {stats.total_views} views</span>}
                          {stats.whatsapp_clicks > 0 && <span>• {stats.whatsapp_clicks} clicks</span>}
                        </div>
                      </div>
                    </div>
                  </button>

                  {isExpanded && (
                    <div className="px-4 pb-4 space-y-4 border-t border-gray-100 pt-4 animate-in slide-in-from-top-2 duration-200 bg-gray-50/30">
                      {/* Mini stats */}
                      <div className="flex gap-2">
                        <MiniStat icon={Eye} value={stats.total_views || 0} label="Views" />
                        <MiniStat icon={MessageCircle} value={stats.whatsapp_clicks || 0} label="Clicks" />
                      </div>

                      {/* Boost */}
                      {!listing.is_sold && !listing.is_featured && (
                        <BoostSection listing={listing} onBoost={(days) => handleBoostSuccess(listing.id, days)} />
                      )}

                      {listing.is_featured && !listing.is_sold && (
                        <div className="py-2.5 px-4 rounded-xl bg-amber-50 text-amber-700 text-xs font-bold text-center flex items-center justify-center gap-2 border border-amber-100">
                          <Zap size={14} /> Featured until {listing.featured_until ? new Date(listing.featured_until).toLocaleDateString() : 'N/A'}
                        </div>
                      )}

                      {/* Extend */}
                      {!listing.is_sold && listing.expires_at && (listing.extension_count || 0) < 1 && (
                        <button onClick={() => handleExtend(listing.id)} className="w-full py-2.5 rounded-xl font-bold text-xs bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 transition-all flex items-center justify-center gap-2 shadow-sm">
                          <Clock size={14} /> Extend 7 days — Free
                        </button>
                      )}

                      {!listing.is_sold && (listing.extension_count || 0) >= 1 && (
                        <div className="py-2.5 rounded-xl text-center text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200 flex items-center justify-center gap-2">
                          <Zap size={14} /> Free extension used — boost instead
                        </div>
                      )}

                      {/* Actions */}
                      <div className="flex gap-2">
                        {!listing.is_sold && (
                          <button onClick={() => setConfirmAction({ title: 'Mark as Sold', message: 'Mark this item as sold?', label: 'Mark as Sold', handler: () => handleMarkSold(listing.id) })} className="flex-1 py-2.5 rounded-xl font-bold text-xs bg-emerald-50 text-emerald-700 border border-emerald-100 hover:bg-emerald-100 transition-all flex items-center justify-center gap-1.5">
                            <Check size={14} /> Sold
                          </button>
                        )}
                        <button onClick={() => setConfirmAction({ title: 'Delete Listing', message: 'Delete this listing permanently?', label: 'Delete', variant: 'danger', handler: () => handleDelete(listing.id) })} className="flex-1 py-2.5 rounded-xl font-bold text-xs bg-white text-rose-600 border border-rose-100 hover:bg-rose-50 transition-all flex items-center justify-center gap-1.5">
                          <Trash2 size={14} /> Delete
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      <ConfirmModal
        open={!!confirmAction}
        title={confirmAction?.title || ''}
        message={confirmAction?.message || ''}
        confirmLabel={confirmAction?.label || 'Confirm'}
        variant={confirmAction?.variant || 'primary'}
        onConfirm={confirmAction?.handler || (() => {})}
        onCancel={() => setConfirmAction(null)}
      />
    </div>
  );
};

const StatusBadge = ({ listing, expiry }) => {
  if (listing.is_sold) return <span className="px-2 py-0.5 bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-full text-[10px] font-bold whitespace-nowrap flex-shrink-0">Sold</span>;
  if (listing.is_featured) return <span className="px-2 py-0.5 bg-amber-50 text-amber-600 border border-amber-100 rounded-full text-[10px] font-bold whitespace-nowrap flex-shrink-0 flex items-center gap-1"><Zap size={10} /> Featured</span>;
  if (expiry.isExpired) return <span className="px-2 py-0.5 bg-gray-100 text-gray-500 rounded-full text-[10px] font-bold whitespace-nowrap flex-shrink-0">Expired</span>;
  if (expiry.isExpiringSoon) return <span className="px-2 py-0.5 bg-rose-50 text-rose-500 border border-rose-100 rounded-full text-[10px] font-bold whitespace-nowrap flex-shrink-0">Expiring</span>;
  return <span className="px-2 py-0.5 bg-primary-50 text-primary-600 border border-primary-100 rounded-full text-[10px] font-bold whitespace-nowrap flex-shrink-0">Active</span>;
};

const MiniStat = ({ icon: Icon, value, label }) => (
  <div className="flex-1 bg-white rounded-xl p-3 text-center border border-gray-100 shadow-sm">
    <Icon size={15} className="mx-auto mb-1 text-gray-400" />
    <p className="text-base font-extrabold text-gray-900">{value}</p>
    <p className="text-[10px] text-gray-400 font-medium">{label}</p>
  </div>
);

const BoostSection = ({ listing, onBoost }) => {
  const [boostOption, setBoostOption] = useState('3days');
  const email = getPaymentEmail();
  const phone = getPaymentPhone();

  const options = [
    { id: '3days', days: 3, price: 5, label: '3 Days' },
    { id: '7days', days: 7, price: 10, label: '7 Days' }
  ];

  const selected = options.find(o => o.id === boostOption);

  return (
    <div className="rounded-2xl p-4 border border-amber-100 bg-amber-50/30">
      <h4 className="font-extrabold text-gray-900 text-xs sm:text-sm mb-0.5 flex items-center gap-1.5 text-amber-900">
        <Zap size={14} className="text-amber-500 fill-amber-500" /> Boost Visibility
      </h4>
      <p className="text-[11px] text-gray-500 mb-3">Featured listings appear at the very top of the student thrift feed.</p>
      <div className="flex gap-2 mb-3">
        {options.map(o => (
          <button key={o.id} onClick={() => setBoostOption(o.id)}
            className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all border ${boostOption === o.id ? 'bg-amber-500 text-white border-amber-500 shadow-sm' : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300'}`}>
            <div>{o.label}</div>
            <div className={`text-[10px] font-medium mt-0.5 ${boostOption === o.id ? 'text-white/80' : 'text-gray-400'}`}>GH₵{o.price}</div>
          </button>
        ))}
      </div>
      <PaymentButton
        amount={selected.price} email={email}
        metadata={{ type: 'thrift_boost', listing_id: listing.id, days: selected.days, customer_phone: phone }}
        onPaymentSuccess={() => onBoost(selected.days)}
        className="w-full py-2.5 rounded-xl font-bold text-xs bg-amber-500 hover:bg-amber-600 text-white transition-all flex items-center justify-center gap-2 shadow-md shadow-amber-500/20"
      >Boost for GH₵{selected.price}</PaymentButton>
    </div>
  );
};

export default MyThriftItems;
