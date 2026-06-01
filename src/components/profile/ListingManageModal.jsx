import React, { useState } from 'react';
import { X, Clock, Check, Trash2, Zap, AlertCircle, Calendar, Tag } from 'lucide-react';
import { PaymentButton } from '../payment/PaymentButton';
import { boostThriftListing, extendThriftListing, markThriftListingAsSold, deleteThriftListing } from '../../services/thriftService';
import { toast } from 'react-hot-toast';

// Same email derivation as authService.js uses for Supabase Auth
const getPaymentEmail = () => {
  const deviceId = localStorage.getItem('ucc_device_id');
  if (!deviceId) return 'anonymous@uccguide.com';
  const cleanId = deviceId.replace(/\s+/g, '').toLowerCase();
  return `${cleanId}@campusguide.app`;
};

// Get user's phone from profile for MoMo
const getPaymentPhone = () => {
  try {
    const profile = JSON.parse(localStorage.getItem('ucc_profile') || '{}');
    return profile.phone || '';
  } catch {
    return '';
  }
};

const isExpiringSoon = (expiresAt) => {
  if (!expiresAt) return false;
  const expiry = new Date(expiresAt);
  const inTwoDays = new Date();
  inTwoDays.setDate(inTwoDays.getDate() + 2);
  return expiry <= inTwoDays;
};

const ListingManageModal = ({ isOpen, onClose, listing, onUpdate, onDelete }) => {
  const [activeTab, setActiveTab] = useState('details');
  const [selectedBoost, setSelectedBoost] = useState('3days');

  if (!isOpen || !listing) return null;

  const email = getPaymentEmail();
  const phone = getPaymentPhone();

  const boostOptions = [
    { id: '3days', days: 3, price: 5, label: '3 Days' },
    { id: '7days', days: 7, price: 10, label: '7 Days' }
  ];

  const selectedBoostOption = boostOptions.find(o => o.id === selectedBoost);

  const handleBoostSuccess = async (paymentResult) => {
    const { listing: updated, error } = await boostThriftListing(listing.id, selectedBoostOption.days);
    if (!error) {
      toast.success(`Listing boosted for ${selectedBoostOption.days} days!`);
      onUpdate(updated);
      onClose();
    } else {
      toast.error('Failed to boost listing');
    }
  };

    const handleExtendFree = async () => {
    const { listing: updated, error } = await extendThriftListing(listing.id, 7);
    if (error === 'Free extension limit reached. Boost your listing to keep it visible.') {
      toast.error('You already used your free extension. Boost instead!');
      return;
    }
    if (!error) {
      toast.success('Listing extended by 7 days — free!');
      onUpdate(updated);
    } else {
      toast.error('Failed to extend listing');
    }
  };

  const handleMarkAsSold = async () => {
    if (window.confirm('Mark this item as sold?')) {
      const { listing: updated, error } = await markThriftListingAsSold(listing.id);
      if (!error) {
        toast.success('Marked as sold!');
        onUpdate(updated);
      } else {
        toast.error('Failed to mark as sold');
      }
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Delete this listing permanently?')) {
      const { success, error } = await deleteThriftListing(listing.id);
      if (success) {
        toast.success('Listing deleted');
        onDelete(listing.id);
        onClose();
      } else {
        toast.error('Failed to delete listing');
      }
    }
  };

  const handlePaymentError = (error) => {
    if (error.message?.includes('cancelled')) {
      toast('Payment cancelled', { icon: '🙏' });
      return;
    }
    toast.error(error.message || 'Payment failed');
  };

  return (
    <div className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm flex items-end justify-center sm:items-center sm:p-4">
      <div className="bg-white w-full max-w-md rounded-t-2xl sm:rounded-2xl flex flex-col max-h-[85vh] shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-gray-100">
          <h2 className="text-lg font-black text-gray-900">Manage Listing</h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-900 bg-gray-50 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Pill Tabs */}
        <div className="flex gap-1 p-1.5 bg-gray-100 mx-5 mt-4 rounded-xl">
          <button
            onClick={() => setActiveTab('details')}
            className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-all ${
              activeTab === 'details'
                ? 'bg-gray-900 text-white shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Details
          </button>
          <button
            onClick={() => setActiveTab('visibility')}
            className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-all ${
              activeTab === 'visibility'
                ? 'bg-gray-900 text-white shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Visibility
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5">
          {activeTab === 'details' ? (
            <DetailsTab listing={listing} expiringSoon={isExpiringSoon(listing.expires_at)} />
          ) : (
            <VisibilityTab
              listing={listing}
              email={email}
              phone={phone}
              selectedBoost={selectedBoost}
              setSelectedBoost={setSelectedBoost}
              boostOptions={boostOptions}
              selectedBoostOption={selectedBoostOption}
              onBoostSuccess={handleBoostSuccess}
              onExtendFree={handleExtendFree}
              onMarkAsSold={handleMarkAsSold}
              onDelete={handleDelete}
              onPaymentError={handlePaymentError}
            />
          )}
        </div>
      </div>
    </div>
  );
};

/* ── Details Tab ──────────────────────────────────────────────────── */
const DetailsTab = ({ listing, expiringSoon }) => (
  <div className="space-y-4">
    {listing.image_url && (
      <div className="w-full h-40 rounded-xl overflow-hidden bg-gray-100">
        <img src={listing.image_url} alt={listing.item_name} className="w-full h-full object-cover" />
      </div>
    )}

    <div>
      <h3 className="font-black text-gray-900 text-lg">{listing.item_name}</h3>
      <p className="text-2xl font-black text-gray-900 mt-1">GH₵{listing.price}</p>
    </div>

    {listing.description && (
      <div className="bg-gray-50 rounded-xl p-4">
        <p className="text-sm text-gray-600 whitespace-pre-line">{listing.description}</p>
      </div>
    )}

    <div className="flex flex-wrap gap-2">
      {listing.is_sold && (
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-green-50 text-green-700 rounded-full text-xs font-bold">
          <Check size={12} /> Sold
        </span>
      )}
      {listing.is_featured && listing.featured_until && (
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 text-amber-700 rounded-full text-xs font-bold">
          <Zap size={12} /> Featured until {new Date(listing.featured_until).toLocaleDateString()}
        </span>
      )}
      {!listing.is_sold && expiringSoon && (
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-red-50 text-red-600 rounded-full text-xs font-bold">
          <AlertCircle size={12} /> Expiring Soon
        </span>
      )}
    </div>

    <div className="space-y-2.5 pt-3 border-t border-gray-100">
      <div className="flex items-center gap-3 text-sm text-gray-500">
        <Calendar size={14} className="text-gray-400" />
        <span>Posted {new Date(listing.created_at).toLocaleDateString()}</span>
      </div>
      {listing.expires_at && (
        <div className="flex items-center gap-3 text-sm text-gray-500">
          <Clock size={14} className="text-gray-400" />
          <span>Expires {new Date(listing.expires_at).toLocaleDateString()}</span>
        </div>
      )}
      {listing.contact_info && (
        <div className="flex items-center gap-3 text-sm text-gray-500">
          <Tag size={14} className="text-gray-400" />
          <span>Contact: {listing.contact_info}</span>
        </div>
      )}
    </div>
  </div>
);

/* ── Visibility Tab ───────────────────────────────────────────────── */
const VisibilityTab = ({
  listing, email, phone, selectedBoost, setSelectedBoost, boostOptions,
  selectedBoostOption, onBoostSuccess, onExtendFree, onMarkAsSold,
  onDelete, onPaymentError
}) => (
  <div className="space-y-5">
    {/* Boost Section */}
    {!listing.is_sold && (
      <div className="rounded-xl p-4 border border-gray-900/10 bg-gray-900/[0.03]">
        <div className="flex items-center gap-2 mb-1">
          
          <h4 className="font-bold text-gray-900">Boost Visibility</h4>
        </div>
        <p className="text-xs text-gray-500 mb-3">Featured listings appear at the top and get more views.</p>

        <div className="flex gap-2 mb-3">
          {boostOptions.map(option => (
            <button
              key={option.id}
              onClick={() => setSelectedBoost(option.id)}
              className={`flex-1 py-2.5 px-3 rounded-xl text-sm font-bold transition-all border ${
                selectedBoost === option.id
                  ? 'bg-gray-900 text-white border-gray-900'
                  : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300'
              }`}
            >
              <div>{option.label}</div>
              <div className={`text-xs font-medium mt-0.5 ${selectedBoost === option.id ? 'text-white/70' : 'text-gray-400'}`}>
                GH₵{option.price}
              </div>
            </button>
          ))}
        </div>

        <PaymentButton
          amount={selectedBoostOption.price}
          email={email}
          metadata={{
            type: 'thrift_boost',
            listing_id: listing.id,
            days: selectedBoostOption.days,
            customer_phone: phone
          }}
          onPaymentSuccess={onBoostSuccess}
          onPaymentError={onPaymentError}
          className="w-full py-3 rounded-xl font-bold text-sm bg-gray-900 text-white hover:bg-gray-900 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
        >
          Boost for GH₵{selectedBoostOption.price}
        </PaymentButton>
      </div>
    )}

        {/* Extend Section — Free, 1 time only */}
    {!listing.is_sold && listing.expires_at && (listing.extension_count || 0) < 1 && (
      <div className="rounded-xl p-4 border border-gray-200 bg-gray-50">
        <div className="flex items-center gap-2 mb-1">
          <Clock size={18} className="text-gray-700" />
          <h4 className="font-bold text-gray-900">Extend Duration</h4>
        </div>
        <p className="text-xs text-gray-500 mb-3">Add 7 more days. Free — one time only.</p>

        <button
          onClick={onExtendFree}
          className="w-full py-3 rounded-xl font-bold text-sm bg-gray-900 text-white hover:bg-gray-800 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
        >
          <Clock size={16} />
          Extend 7 days — Free
        </button>
      </div>
    )}

    {/* Already extended — show boost CTA instead */}
    {!listing.is_sold && (listing.extension_count || 0) >= 1 && (
      <div className="rounded-xl p-4 border border-amber-200 bg-amber-50">
        <div className="flex items-center gap-2 mb-1">
          <Zap size={18} className="text-amber-600" />
          <h4 className="font-bold text-amber-800">Extension used</h4>
        </div>
        <p className="text-xs text-amber-700 mb-3">You've used your free extension. Boost to stay visible!</p>
      </div>
    )}

    {/* Mark as Sold */}
    {!listing.is_sold ? (
      <button
        onClick={onMarkAsSold}
        className="w-full py-3 rounded-xl font-bold text-sm bg-green-50 text-green-700 border border-green-100 hover:bg-green-100 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
      >
        <Check size={16} />
        Mark as Sold
      </button>
    ) : (
      <div className="py-3 rounded-xl text-center font-bold text-sm bg-green-50 text-green-700 border border-green-100 flex items-center justify-center gap-2">
        <Check size={16} />
        This item has been sold
      </div>
    )}

    {/* Delete */}
    <button
      onClick={onDelete}
      className="w-full py-3 rounded-xl font-bold text-sm bg-white text-red-500 border border-red-100 hover:bg-red-50 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
    >
      <Trash2 size={16} />
      Delete Listing
    </button>
  </div>
);

export default ListingManageModal;