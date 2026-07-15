import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Heart, User as UserIcon, Crown, Star, Sparkles, Trophy } from 'lucide-react';

const VerifiedBadge = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-amber-400">
    <path d="M10.007 2.10377C8.60544 1.65006 7.08181 2.28116 6.41156 3.59306L5.60578 5.17023C5.51004 5.35763 5.35763 5.51004 5.17023 5.60578L3.59306 6.41156C2.28116 7.08181 1.65006 8.60544 2.10377 10.007L2.64923 11.692C2.71404 11.8922 2.71404 12.1078 2.64923 12.308L2.10377 13.993C1.65006 15.3946 2.28116 16.9182 3.59306 17.5885L5.17023 18.3942C5.35763 18.49 5.51004 18.6424 5.60578 18.8298L6.41156 20.407C7.08181 21.7189 8.60544 22.35 10.007 21.8963L11.692 21.3508C11.8922 21.286 12.1078 21.286 12.308 21.3508L13.993 21.8963C15.3946 22.35 16.9182 21.7189 17.5885 20.407L18.3942 18.8298C18.49 18.6424 18.6424 18.49 18.8298 18.3942L20.407 17.5885C21.7189 16.9182 22.35 15.3946 21.8963 13.993L21.3508 12.308C21.286 12.1078 21.286 11.8922 21.3508 11.692L21.8963 10.007C22.35 8.60544 21.7189 7.08181 20.407 6.41156L18.8298 5.60578C18.49 5.51004 18.49 5.35763 18.3942 5.17023L17.5885 3.59306C16.9182 2.28116 15.3946 1.65006 13.993 2.10377L12.308 2.64923C12.1078 2.71403 11.8922 2.71404 11.692 2.64923L10.007 2.10377ZM6.75977 11.7573L8.17399 10.343L11.0024 13.1715L16.6593 7.51465L18.0735 8.92886L11.0024 15.9999L6.75977 11.7573Z"></path>
  </svg>
);

const StarBadge = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-amber-400">
    <path d="M12.0001 8.5L14.1161 13.5875L19.6085 14.0279L15.4239 17.6125L16.7023 22.9721L12.0001 20.1L7.29777 22.9721L8.57625 17.6125L4.3916 14.0279L9.88403 13.5875L12.0001 8.5ZM8.00005 2V11H6.00005V2H8.00005ZM18.0001 2V11H16.0001V2H18.0001ZM13.0001 2V7H11.0001V2H13.0001Z"></path>
  </svg>
);

const getSupporterBadge = (amount) => {
  if (amount >= 20) return { icon: <VerifiedBadge />, bg: 'bg-amber-50 border-amber-200', text: 'text-amber-700', label: 'Gold' };
  if (amount >= 10) return { icon: <StarBadge />, bg: 'bg-blue-50 border-blue-200', text: 'text-blue-700', label: 'Silver' };
  return { icon: <Star size={12} />, bg: 'bg-gray-50 border-gray-200', text: 'text-gray-600', label: 'Bronze' };
};

const SupportersWall = () => {
  const [supporters, setSupporters] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await supabase
          .from('payments')
          .select('*, users(avatar_url)')
          .eq('item_type', 'drink')
          .eq('status', 'completed');

        if (data && data.length > 0) {
          const grouped = data.reduce((acc, curr) => {
            const key = curr.user_id || curr.user_name || curr.reference;
            if (!acc[key]) {
              acc[key] = {
                user_id: curr.user_id,
                user_name: curr.user_name || 'Anonymous Supporter',
                amount: 0,
                reference: curr.reference,
                avatar_url: curr.users?.avatar_url
              };
            }
            acc[key].amount += Number(curr.amount);
            return acc;
          }, {});

          const sorted = Object.values(grouped).sort((a, b) => b.amount - a.amount);
          setSupporters(sorted);
        } else {
          setSupporters([]);
        }
      } catch {
        setSupporters([]);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const localSupporter = (() => {
    try {
      const raw = localStorage.getItem('ucc_supporter_status');
      if (!raw) return null;
      const s = JSON.parse(raw);
      if (s.isSupporter) return s;
      return null;
    } catch { return null; }
  })();

  const localProfile = (() => {
    try {
      const raw = localStorage.getItem('ucc_profile');
      if (!raw) return null;
      return JSON.parse(raw);
    } catch { return null; }
  })();

  const displaySupporters = [...supporters];
  if (localSupporter) {
    const existingIndex = displaySupporters.findIndex(s => s.user_name === localSupporter.name);
    if (existingIndex === -1) {
      displaySupporters.push({
        user_name: localSupporter.name || 'You',
        amount: Number(localSupporter.amount),
        reference: localSupporter.reference,
        avatar_url: localProfile?.avatarUrl
      });
    } else {
      if (Number(localSupporter.amount) > displaySupporters[existingIndex].amount) {
        displaySupporters[existingIndex].amount = Number(localSupporter.amount);
      }
    }
  }

  displaySupporters.sort((a, b) => b.amount - a.amount);

  if (loading) {
    return (
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-3xl mx-auto pb-12">
        <div className="flex items-center gap-2 mb-6">
          <Heart className="text-amber-500" size={20} />
          <h2 className="text-2xl font-black text-gray-900">Supporters</h2>
        </div>
        <div className="flex items-center justify-center py-20">
          <div className="w-6 h-6 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-3xl mx-auto pb-12">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-gray-900 flex items-center gap-2">
            <Heart className="text-amber-500" />
            Supporters Wall
          </h2>
          <p className="text-sm font-medium text-gray-500 mt-1">Our top contributors.</p>
        </div>
      </div>

      {displaySupporters.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-gray-200 shadow-sm">
          <Heart size={40} className="text-gray-200 mx-auto mb-3" />
          <p className="text-sm text-gray-400 font-medium">No supporters yet. Be the first!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {displaySupporters.map((s, idx) => {
            const badge = getSupporterBadge(s.amount);
            const isTop = idx === 0;

            return (
              <div
                key={s.reference || s.user_name || idx}
                className={`flex items-center justify-between p-4 rounded-2xl transition-colors ${
                  isTop
                    ? 'bg-gradient-to-r from-amber-50 to-white border border-amber-200 shadow-sm'
                    : 'bg-white border border-gray-100 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <img 
                      src={s.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(s.user_name || s.reference || 'anonymous')}&backgroundColor=b6e3f4,c0aede,d1d4f9,ffdfbf,ffd5dc`}
                      alt={s.user_name || 'Supporter'}
                      className="w-10 h-10 rounded-full bg-gray-50 border border-gray-200 flex-shrink-0"
                    />
                  </div>
                  <div>
                    <span className="font-bold text-gray-900 text-sm flex items-center gap-1.5">
                      {s.user_name || 'Anonymous Supporter'}
                      {isTop && <VerifiedBadge />}
                    </span>
                    <span className="text-xs text-gray-400">{badge.label}</span>
                  </div>
                </div>
                <div className={`px-3 py-1 rounded-full text-xs font-bold border flex items-center gap-1 shadow-sm ${badge.bg} ${badge.text}`}>
                  {badge.icon}
                  <span>GH₵{s.amount.toLocaleString()}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <div className="mt-8 text-center bg-blue-50/50 p-4 rounded-2xl border border-blue-100">
        <p className="text-sm text-blue-600 font-bold">
          Support the app to get your name on this wall!
        </p>
      </div>
    </div>
  );
};

export default SupportersWall;
