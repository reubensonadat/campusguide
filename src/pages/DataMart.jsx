import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Clock, CheckCircle, XCircle, RefreshCw, ShoppingBag, AlertCircle, Wallet, Smartphone, Zap } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { getNetworks, getBundles, getNetworkById, createOrder, getOrders } from '../services/dataMartService';
import useProfile from '../hooks/useProfile';

const LOGOS = {
  mtn: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvFNqzc7K3ByvAYZyJljGHM2VZb2fY7DTFe4m4Qy0fhg&s=10',
  telecel: 'https://telecelgroup.com/wp-content/uploads/2025/12/TG-LOGOO-03_400.webp',
  airteltigo: 'https://play-lh.googleusercontent.com/j3VSwmoKigmWqKmfMh0Z8EDLVfc8g3YJDsa1U0xk1qic5XRehqR9dEJZg_SDkgVOs2HYSqyIRcxUyJA598j-BQ',
};

const BRAND = {
  mtn:       { from: '#FFCC00', to: '#E5B800', bg: '#FFF8E0' },
  telecel:   { from: '#ED1C24', to: '#C4161D', bg: '#FFE8E9' },
  airteltigo: { from: '#00A94F', to: '#008F42', bg: '#E0F7EA' },
};

const SPRING = { type: 'spring', damping: 26, stiffness: 260 };
const NO_SCROLL = { scrollbarWidth: 'none' };

const STATUS = {
  pending:   { label: 'Processing', icon: RefreshCw,  cls: 'text-amber-500 bg-amber-50' },
  delivered: { label: 'Delivered',  icon: CheckCircle, cls: 'text-emerald-500 bg-emerald-50' },
  failed:    { label: 'Failed',     icon: XCircle,     cls: 'text-red-500 bg-red-50' },
};

/* ── Order Row ── */
function OrderRow({ o }) {
  const net = getNetworkById(o.networkId);
  const st = STATUS[o.status] || STATUS.pending;
  const Icon = st.icon;
  const b = BRAND[o.networkId];

  return (
    <div className="bg-white rounded-xl px-4 py-3.5 flex items-center gap-3 border border-gray-100 active:scale-[0.99] transition-all">
      <img src={LOGOS[o.networkId]} alt=""
        className="w-9 h-9 rounded-md object-contain shrink-0" />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-bold text-gray-900 truncate -mb-px">{o.size} {net?.name}</p>
        <p className="text-[10px] text-gray-400 font-mono tracking-tight">{o.id}</p>
      </div>
      <div className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-semibold ${st.cls} shrink-0`}>
        <Icon size={10} />{st.label}
      </div>
    </div>
  );
}

/* ── Unavailable ── */
function Unavailable({ retry }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-8 text-center bg-white">
      <div className="w-24 h-24 rounded-2xl bg-amber-50 flex items-center justify-center mb-6">
        <AlertCircle size={44} className="text-amber-400" />
      </div>
      <h2 className="text-2xl font-black text-gray-900 -tracking-[0.3px] mb-2">Be Right Back</h2>
      <p className="text-sm text-gray-400 font-medium mb-8 max-w-[260px] leading-relaxed">Taking a short break — the best deals will be waiting.</p>
      <button onClick={retry} className="px-8 py-3.5 bg-gray-900 text-white text-sm font-bold rounded-xl active:scale-[0.97] transition-all shadow-lg shadow-gray-900/25">Try Again</button>
    </div>
  );
}

/* ── Checkout ── */
function Checkout({ bundle, network, pay, step, paying, close, lastOrder, phone, onPhoneChange }) {
  const b = BRAND[network?.id];
  const img = <img src={LOGOS[network?.id]} alt="" className="w-16 h-16 rounded-md object-contain shrink-0" />;

  if (step === 'paying') {
    return (
      <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50" onClick={close}>
        <div className="bg-white rounded-2xl p-10 mx-5 max-w-xs w-full text-center shadow-2xl" onClick={e => e.stopPropagation()}>
          <RefreshCw size={28} className="text-gray-500 mx-auto mb-4 animate-spin" />
          <p className="text-[15px] font-semibold text-gray-800">Processing Payment</p>
        </div>
      </div>
    );
  }

  if (step === 'success') {
    return (
      <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50" onClick={close}>
        <div className="bg-white rounded-2xl p-8 mx-5 max-w-xs w-full text-center shadow-2xl" onClick={e => e.stopPropagation()}>
          <div className="w-16 h-16 rounded-2xl bg-emerald-50 flex items-center justify-center mx-auto mb-4">
            <CheckCircle size={36} className="text-emerald-500" />
          </div>
          <h3 className="text-xl font-black text-gray-900 -tracking-[0.3px] mb-1">All done!</h3>
          <p className="text-sm text-gray-400 font-medium mb-3">{bundle?.size} {network?.name}</p>
          <p className="text-[10px] text-gray-400 font-mono bg-gray-50 rounded-lg px-3 py-1.5 inline-block mb-5">{lastOrder?.id}</p>
          <div className="bg-amber-50 rounded-xl px-4 py-3 text-left mb-5">
            <p className="text-xs font-semibold text-amber-700 flex items-center gap-1.5 mb-1"><Zap size={13} /> Delivering your data</p>
            <p className="text-[11px] text-amber-600/80">Arriving within seconds — check My Orders.</p>
          </div>
          <button onClick={close} className="w-full py-3.5 bg-gray-900 text-white text-sm font-bold rounded-xl active:scale-[0.97] transition-all shadow-lg shadow-gray-900/20">Done</button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center" onClick={close}>
      <div className="absolute inset-0 bg-black/50" />
      <motion.div
        initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 26, stiffness: 300 }}
        className="relative bg-white w-full sm:max-w-sm rounded-t-2xl sm:rounded-2xl px-6 pt-7 pb-9 shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center gap-3.5 mb-6">
          {img}
          <div>
            <p className="font-black text-gray-900 text-lg -tracking-[0.2px] -mb-px">{bundle?.size}</p>
            <p className="text-[12px] text-gray-400 font-medium">{bundle?.validity}</p>
          </div>
        </div>
        <div className="flex items-center justify-between py-4 px-4 rounded-xl mb-5" style={{ background: b?.bg }}>
          <span className="text-sm font-medium text-gray-500">Amount</span>
          <span className="text-2xl font-black text-gray-900 -tracking-[0.3px]">GH₵{bundle?.retail.toFixed(2)}</span>
        </div>
        <div className="flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-2.5 mb-6">
          <Smartphone size={16} className="text-gray-400 shrink-0" />
          <input
            type="tel"
            value={phone}
            onChange={e => onPhoneChange(e.target.value.replace(/[^0-9\s]/g, ''))}
            placeholder="054 123 4567"
            className="flex-1 bg-transparent text-sm font-semibold text-gray-900 placeholder:text-gray-300 focus:outline-none"
          />
        </div>
        <button onClick={pay} disabled={paying}
          className="w-full py-3.5 bg-gray-900 text-white text-sm font-bold rounded-xl active:scale-[0.97] transition-all shadow-lg shadow-gray-900/20 flex items-center justify-center gap-2 disabled:opacity-50 mb-2">
          <Wallet size={16} /> Pay GH₵{bundle?.retail.toFixed(2)}
        </button>
        <button onClick={close} className="w-full py-3 text-sm font-bold text-gray-400 active:text-gray-600 transition-colors">Cancel</button>
      </motion.div>
    </div>
  );
}

function Loading() {
  return <div className="min-h-screen flex flex-col items-center justify-center bg-white"><RefreshCw size={24} className="text-gray-400 animate-spin mb-3" /><p className="text-sm font-medium text-gray-400">Loading</p></div>;
}

/* ── MAIN ── */
export default function DataMart() {
  const [profile] = useProfile();
  const [tab, setTab] = useState('loading');
  const [networks, setNetworks] = useState([]);
  const [activeId, setActiveId] = useState(null);
  const [bundles, setBundles] = useState([]);
  const [pick, setPick] = useState(null);
  const [orders, setOrders] = useState([]);
  const [step, setStep] = useState('form');
  const [paying, setPaying] = useState(false);
  const [last, setLast] = useState(null);
  const [phone, setPhone] = useState('');

  const refresh = useCallback(() => setOrders(getOrders()), []);

  useEffect(() => {
    setTimeout(() => {
      try {
        const n = getNetworks();
        if (n?.length) { setNetworks(n); setActiveId(n[0].id); setBundles(getBundles(n[0].id)); setTab('live'); }
        else setTab('unavailable');
      } catch { setTab('unavailable'); }
    }, 400);
  }, []);

  useEffect(() => { refresh(); const h = () => refresh(); window.addEventListener('order-updated', h); return () => window.removeEventListener('order-updated', h); }, [refresh]);

  /* ── LIVE ── */
  if (tab === 'live') {
    const activeNet = networks.find(n => n.id === activeId);
    const brand = BRAND[activeId];
    const d = orders.filter(o => o.status === 'delivered').length;
    const p = orders.filter(o => o.status === 'pending').length;
    const hasOrders = d > 0 || p > 0;

    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-lg mx-auto px-5 pt-[calc(2rem_+_env(safe-area-inset-top,0px))]">

          {/* ── header ── */}
          <div className="flex items-center justify-between mb-2">
            <div>
              <p className="text-xs text-gray-400 font-medium -mb-px">
                {profile?.name ? `Hey, ${profile.name.split(' ')[0]}` : 'Welcome'}
              </p>
              <h1 className="text-[28px] font-black text-gray-900 -tracking-[0.6px] leading-tight">Data Bundles</h1>
            </div>
            <button onClick={() => { refresh(); setTab('orders'); }}
              className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-500 active:scale-90 transition-all">
              <Clock size={18} />
            </button>
          </div>

          {/* ── network chips ── */}
          <div className="flex gap-2 mt-5 mb-6 overflow-x-auto -mx-5 px-5" style={NO_SCROLL}>
            {networks.map(n => {
              const active = activeId === n.id;
              const c = BRAND[n.id];
              return (
                <button key={n.id} onClick={() => { setActiveId(n.id); setBundles(getBundles(n.id)); }}
                  className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-sm font-semibold whitespace-nowrap shrink-0 transition-all active:scale-95 ${
                    active ? 'text-white shadow-md' : 'bg-gray-50 text-gray-600 border border-gray-100'
                  }`}
                  style={active ? { background: `linear-gradient(135deg, ${c.from}, ${c.to})` } : {}}>
                  <img src={LOGOS[n.id]} alt="" className="w-5 h-5 rounded-md object-contain" />
                  {n.name}
                </button>
              );
            })}
          </div>

          {/* ── bundles ── */}
          <div className="space-y-3 pb-6">
            {bundles.map((b, i) => (
              <motion.div key={b.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04, ...SPRING }}>
                <button onClick={() => { setPick(b); setStep('form'); setPaying(false); setPhone(profile?.phone || ''); }}
                  className="w-full text-left bg-white rounded-xl px-4 py-4 border border-gray-100 hover:border-gray-200 hover:shadow-sm transition-all active:scale-[0.99] flex items-center gap-4">
                  <img src={LOGOS[activeId]} alt=""
                    className="w-10 h-10 rounded-md object-contain shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="font-black text-gray-900 text-[16px] -tracking-[0.2px] -mb-px">{b.size}</p>
                    <p className="text-[12px] text-gray-400 font-medium truncate">{b.validity}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="font-black text-gray-900 text-xl -tracking-[0.3px]">GH₵{b.retail.toFixed(2)}</p>
                    <p className="text-[11px] font-semibold text-gray-400 flex items-center gap-0.5 justify-end mt-px">
                      Buy <ChevronRight size={11} />
                    </p>
                  </div>
                </button>
              </motion.div>
            ))}
          </div>

          {/* ── orders summary ── */}
          {hasOrders && (
            <button onClick={() => { refresh(); setTab('orders'); }}
              className="w-full flex items-center justify-between bg-gray-50 rounded-xl px-4 py-3.5 mb-6 active:scale-[0.99] transition-all">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-white flex items-center justify-center shadow-sm">
                  <ShoppingBag size={16} className="text-gray-600" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-semibold text-gray-900 -mb-px">My Orders</p>
                  <p className="text-[11px] text-gray-400 font-medium">{d} delivered{p > 0 ? ` · ${p} pending` : ''}</p>
                </div>
              </div>
              <ChevronRight size={16} className="text-gray-400" />
            </button>
          )}

        </div>

        <AnimatePresence>
          {pick && (
            <Checkout bundle={pick} network={activeNet}
               pay={async () => {
                const cleaned = phone.replace(/\s/g, '');
                setPaying(true); setStep('paying');
                await new Promise(r => setTimeout(r, 1500));
                const o = createOrder({ bundleId: pick.id, networkId: activeId, phone: cleaned || 'self', amountPaid: pick.retail });
                setLast(o); setPaying(false); setStep('success');
                toast.success('Done!'); refresh();
              }}
              step={step} paying={paying} close={() => { setPick(null); setStep('form'); setPaying(false); }} lastOrder={last}
              phone={phone} onPhoneChange={setPhone} />
          )}
        </AnimatePresence>
      </div>
    );
  }

  /* ── ORDERS ── */
  if (tab === 'orders') {
    return (
      <div className="min-h-screen bg-gray-50/50">
        <div className="bg-white border-b border-gray-100 px-5 pt-[calc(2rem_+_env(safe-area-inset-top,0px))] pb-4">
          <div className="max-w-lg mx-auto flex items-center gap-3">
            <button onClick={() => setTab('live')} className="w-9 h-9 rounded-lg bg-gray-50 flex items-center justify-center text-gray-500 active:scale-90 transition-all">
              <ChevronLeft size={18} />
            </button>
            <div>
              <p className="font-black text-gray-900 text-[18px] -tracking-[0.3px] -mb-px">My Orders</p>
              <p className="text-[11px] text-gray-400 font-medium">
                {orders.filter(o => o.status === 'delivered').length} delivered · {orders.filter(o => o.status === 'pending').length} pending · {orders.filter(o => o.status === 'failed').length} failed
              </p>
            </div>
          </div>
        </div>
        <div className="max-w-lg mx-auto px-5 pt-5 pb-8 space-y-2.5">
          {orders.length === 0 ? (
            <div className="text-center py-24">
              <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center mx-auto mb-4 shadow-sm border border-gray-100">
                <ShoppingBag size={28} className="text-gray-300" />
              </div>
              <p className="font-black text-gray-900 text-[17px] -tracking-[0.2px] mb-1">No orders yet</p>
              <p className="text-sm text-gray-400 font-medium">Buy a bundle to see it here</p>
            </div>
          ) : (
            orders.map((o, i) => (
              <motion.div key={o.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04, ...SPRING }}>
                <OrderRow o={o} />
              </motion.div>
            ))
          )}
        </div>
      </div>
    );
  }

  if (tab === 'unavailable') {
    return <Unavailable retry={() => { setTab('loading'); setTimeout(() => { try { const n = getNetworks(); if (n?.length) { setNetworks(n); setActiveId(n[0].id); setBundles(getBundles(n[0].id)); setTab('live'); } else setTab('unavailable'); } catch { setTab('unavailable'); } }, 1200); }} />;
  }

  return <Loading />;
}
