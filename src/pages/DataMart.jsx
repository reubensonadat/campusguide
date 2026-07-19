import { useState, useEffect, useCallback } from 'react';
import { Wallet, ChevronLeft, Check, X, ShoppingCart, Package } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { Modal } from '../components/common/Modal';
import { getNetworks, getBundles, getNetworkById, createOrder, getOrders, getNetworkHealth, getWallet, simulateDelivery, getOrderById } from '../services/dataMartService';
import { useLocalStorage } from '../hooks/useLocalStorage';

const LOGOS = {
  mtn:       'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvFNqzc7K3ByvAYZyJljGHM2VZb2fY7DTFe4m4Qy0fhg&s=10',
  telecel:   'https://telecelgroup.com/wp-content/uploads/2025/12/TG-LOGOO-03_400.webp',
  airteltigo: 'https://play-lh.googleusercontent.com/j3VSwmoKigmWqKmfMh0Z8EDLVfc8g3YJDsa1U0xk1qic5XRehqR9dEJZg_SDkgVOs2HYSqyIRcxUyJA598j-BQ',
};

function FormulaSpinner({ className = 'w-5 h-5 text-primary-600' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
      <circle cx="4" cy="12" r="0"><animate begin="0;spinner_z0Or.end" attributeName="r" calcMode="spline" dur="0.5s" keySplines=".36,.6,.31,1" values="0;3" fill="freeze"/><animate begin="spinner_OLMs.end" attributeName="cx" calcMode="spline" dur="0.5s" keySplines=".36,.6,.31,1" values="4;12" fill="freeze"/><animate begin="spinner_UHR2.end" attributeName="cx" calcMode="spline" dur="0.5s" keySplines=".36,.6,.31,1" values="12;20" fill="freeze"/><animate id="spinner_lo66" begin="spinner_Aguh.end" attributeName="r" calcMode="spline" dur="0.5s" keySplines=".36,.6,.31,1" values="3;0" fill="freeze"/><animate id="spinner_z0Or" begin="spinner_lo66.end" attributeName="cx" dur="0.001s" values="20;4" fill="freeze"/></circle>
      <circle cx="4" cy="12" r="3"><animate begin="0;spinner_z0Or.end" attributeName="cx" calcMode="spline" dur="0.5s" keySplines=".36,.6,.31,1" values="4;12" fill="freeze"/><animate begin="spinner_OLMs.end" attributeName="cx" calcMode="spline" dur="0.5s" keySplines=".36,.6,.31,1" values="12;20" fill="freeze"/><animate id="spinner_JsnR" begin="spinner_UHR2.end" attributeName="r" calcMode="spline" dur="0.5s" keySplines=".36,.6,.31,1" values="3;0" fill="freeze"/><animate id="spinner_Aguh" begin="spinner_JsnR.end" attributeName="cx" dur="0.001s" values="20;4" fill="freeze"/><animate begin="spinner_Aguh.end" attributeName="r" calcMode="spline" dur="0.5s" keySplines=".36,.6,.31,1" values="0;3" fill="freeze"/></circle>
      <circle cx="12" cy="12" r="3"><animate begin="0;spinner_z0Or.end" attributeName="cx" calcMode="spline" dur="0.5s" keySplines=".36,.6,.31,1" values="12;20" fill="freeze"/><animate id="spinner_hSjk" begin="spinner_OLMs.end" attributeName="r" calcMode="spline" dur="0.5s" keySplines=".36,.6,.31,1" values="3;0" fill="freeze"/><animate id="spinner_UHR2" begin="spinner_hSjk.end" attributeName="cx" dur="0.001s" values="20;4" fill="freeze"/><animate begin="spinner_UHR2.end" attributeName="r" calcMode="spline" dur="0.5s" keySplines=".36,.6,.31,1" values="0;3" fill="freeze"/><animate begin="spinner_Aguh.end" attributeName="cx" calcMode="spline" dur="0.5s" keySplines=".36,.6,.31,1" values="4;12" fill="freeze"/></circle>
      <circle cx="20" cy="12" r="3"><animate id="spinner_4v5M" begin="0;spinner_z0Or.end" attributeName="r" calcMode="spline" dur="0.5s" keySplines=".36,.6,.31,1" values="3;0" fill="freeze"/><animate id="spinner_OLMs" begin="spinner_4v5M.end" attributeName="cx" dur="0.001s" values="20;4" fill="freeze"/><animate begin="spinner_OLMs.end" attributeName="r" calcMode="spline" dur="0.5s" keySplines=".36,.6,.31,1" values="0;3" fill="freeze"/><animate begin="spinner_UHR2.end" attributeName="cx" calcMode="spline" dur="0.5s" keySplines=".36,.6,.31,1" values="4;12" fill="freeze"/><animate begin="spinner_Aguh.end" attributeName="cx" calcMode="spline" dur="0.5s" keySplines=".36,.6,.31,1" values="12;20" fill="freeze"/></circle>
    </svg>
  );
}

function formatTime(ts) {
  return new Date(ts).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function formatDateTime(ts) {
  const d = new Date(ts);
  return d.toLocaleDateString([], { month: 'short', day: 'numeric' }) + ' at ' +
    d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function StatusBadge({ status, order }) {
  if (status === 'pending') {
    const elapsed = order ? Math.floor((Date.now() - new Date(order.createdAt).getTime()) / 1000) : 0;
    const msg = elapsed < 120 ? 'Processing' : elapsed < 600 ? 'Taking longer' : 'Still working';
    return (
      <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-amber-700 bg-amber-50 rounded-full px-3 py-1.5 border border-amber-100/50">
        <FormulaSpinner className="w-2.5 h-2.5 text-amber-600" />
        {msg}
      </span>
    );
  }
  if (status === 'delivered') {
    return (
      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 rounded-full px-3 py-1.5 border border-emerald-100/50">
        <Check size={12} strokeWidth={3} />
        Delivered
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-red-700 bg-red-50 rounded-full px-3 py-1.5 border border-red-100/50">
      <X size={12} strokeWidth={3} />
      Failed
    </span>
  );
}

function ElapsedTimer({ createdAt, estimatedMs }) {
  const [elapsed, setElapsed] = useState(0);
  const created = new Date(createdAt).getTime();

  useEffect(() => {
    setElapsed(Math.floor((Date.now() - created) / 1000));
    const t = setInterval(() => setElapsed(p => p + 1), 1000);
    return () => clearInterval(t);
  }, [created]);

  const totalSec = Math.floor(estimatedMs / 1000);
  const remaining = Math.max(0, totalSec - elapsed);
  const rm = Math.floor(remaining / 60);
  const rs = remaining % 60;
  const em = Math.floor(elapsed / 60);
  const es = elapsed % 60;

  return (
    <span className="text-xs text-gray-400 font-medium">
      {em > 0 ? `${em}m ` : ''}{es}s &middot; ~{rm > 0 ? `${rm}m ` : ''}{rs}s left
    </span>
  );
}

function OrderTracker({ order, networkName }) {
  const stageKeys = ['placed', 'processing', 'connecting'];
  const terminalStage = order.status === 'failed' ? 'failed' : 'delivered';
  const displayStages = [...stageKeys, terminalStage];
  const completedKeys = order.stages.map(s => s.stage);
  const currentKey = completedKeys[completedKeys.length - 1];

  return (
    <div>
      {displayStages.map((key, i) => {
        const isCompleted = completedKeys.includes(key);
        const isCurrent = key === currentKey && order.status === 'pending';
        const isLast = i === displayStages.length - 1;
        const stage = order.stages.find(s => s.stage === key);

        let dot;
        if (key === 'failed') {
          dot = <div className="w-7 h-7 rounded-full bg-red-100 flex items-center justify-center shrink-0 ring-2 ring-red-200"><X size={13} className="text-red-600" strokeWidth={3} /></div>;
        } else if (isCompleted) {
          dot = <div className="w-7 h-7 rounded-full bg-emerald-100 flex items-center justify-center shrink-0 ring-2 ring-emerald-200"><Check size={13} className="text-emerald-600" strokeWidth={3} /></div>;
        } else if (isCurrent) {
          dot = <div className="w-7 h-7 rounded-full bg-primary-100 flex items-center justify-center shrink-0 ring-2 ring-primary-200"><FormulaSpinner className="w-3 h-3 text-primary-600" /></div>;
        } else {
          dot = <div className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center shrink-0"><div className="w-2 h-2 rounded-full bg-gray-300" /></div>;
        }

        let label = key === 'placed' ? 'Order Placed' : key === 'processing' ? 'Processing' : key === 'connecting' ? `Connecting to ${networkName}` : key === 'failed' ? 'Delivery Failed' : 'Delivered';

        return (
          <div key={key} className="flex gap-3">
            <div className="flex flex-col items-center">
              {dot}
              {!isLast && <div className={`w-px flex-1 min-h-[28px] ${isCompleted ? 'bg-emerald-200' : isCurrent ? 'bg-primary-200' : 'bg-gray-200'}`} />}
            </div>
            <div className={`${isLast ? 'pb-0' : 'pb-5'}`}>
              <p className={`text-sm font-bold ${isCompleted || isCurrent ? 'text-gray-900' : 'text-gray-400'}`}>{label}</p>
              {stage && <p className="text-xs text-gray-400 font-medium mt-0.5">{formatTime(stage.timestamp)}</p>}
              {isCurrent && key === 'connecting' && order.status === 'pending' && (
                <p className="text-xs text-primary-600 font-medium mt-0.5">Sending to network...</p>
              )}
              {key === 'failed' && order.walletRefunded && (
                <p className="text-xs text-emerald-600 font-bold mt-0.5">+GH₵{order.refundAmount.toFixed(2)} refunded</p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function OrdersView({ orders, onViewOrder, onBack }) {
  const [filter, setFilter] = useState('all');
  const filters = [
    { key: 'all', label: 'All' },
    { key: 'pending', label: 'Processing' },
    { key: 'delivered', label: 'Delivered' },
    { key: 'failed', label: 'Failed' },
  ];

  const filtered = filter === 'all' ? orders : orders.filter(o => o.status === filter);

  return (
    <div className="min-h-screen bg-[#f0f2f8] pb-28">
      <div className="max-w-3xl mx-auto px-5 pt-[calc(2.5rem_+_env(safe-area-inset-top,0px))] space-y-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button onClick={onBack}
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors">
              <ChevronLeft size={22} strokeWidth={1.5} />
            </button>
            <h1 className="text-[28px] font-black text-gray-900 tracking-tight">My Orders</h1>
          </div>
          <p className="text-sm text-gray-400 font-medium">{orders.length} total</p>
        </div>

        <div className="flex gap-1.5 overflow-x-auto pb-1">
          {filters.map(f => (
            <button key={f.key} onClick={() => setFilter(f.key)}
              className={`text-sm font-bold rounded-full px-4 py-2 transition-all whitespace-nowrap ${
                filter === f.key ? 'bg-gray-900 text-white shadow-sm' : 'bg-white text-gray-500 hover:text-gray-700 border border-gray-100'
              }`}>
              {f.label}
              {f.key !== 'all' && (
                <span className="ml-1.5 text-[11px] opacity-60">({orders.filter(o => o.status === f.key).length})</span>
              )}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-16 h-16 rounded-2xl bg-white border border-gray-100 shadow-sm flex items-center justify-center mx-auto mb-4">
              <Package size={24} className="text-gray-300" />
            </div>
            <p className="text-base font-bold text-gray-900 mb-1">
              {filter === 'all' ? 'No orders yet' : `No ${filter} orders`}
            </p>
            <p className="text-sm text-gray-400 font-medium">
              {filter === 'all' ? 'Buy data to see your orders here' : 'Orders in this status will appear here'}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map(o => {
              const net = getNetworkById(o.networkId);
              return (
                <button key={o.id} onClick={() => onViewOrder(o.id)}
                  className="w-full text-left bg-white rounded-2xl border border-gray-100 shadow-sm p-4 hover:shadow-md transition-all active:scale-[0.99]">
                  <div className="flex items-center gap-3.5">
                    <img src={LOGOS[o.networkId]} alt="" className="w-11 h-11 rounded-xl object-contain shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="text-sm font-bold text-gray-900">{o.size}</p>
                        <span className="text-xs text-gray-400 font-medium">&middot; {net?.name}</span>
                      </div>
                      <p className="text-xs text-gray-400 font-medium mt-0.5">{o.phone} &middot; GH₵{o.amountPaid.toFixed(2)}</p>
                      <p className="text-[11px] text-gray-300 font-medium mt-0.5">{formatDateTime(o.createdAt)}</p>
                    </div>
                    <StatusBadge status={o.status} order={o} />
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

function OrderDetailsView({ orderId, onBack }) {
  const [order, setOrder] = useState(() => getOrderById(orderId));
  const network = order ? getNetworkById(order.networkId) : null;

  useEffect(() => {
    const u = () => setOrder(getOrderById(orderId));
    window.addEventListener('order-updated', u);
    return () => window.removeEventListener('order-updated', u);
  }, [orderId]);

  if (!order) {
    return (
      <div className="min-h-screen bg-[#f0f2f8] flex items-center justify-center">
        <p className="text-sm text-gray-400 font-medium">Order not found</p>
      </div>
    );
  }

  const isPending = order.status === 'pending';
  const isDelivered = order.status === 'delivered';
  const isFailed = order.status === 'failed';

  const elapsed = Math.floor((Date.now() - new Date(order.createdAt).getTime()) / 1000);
  const statusMsg = isPending
    ? elapsed < 120
      ? 'Your order is being processed'
      : elapsed < 600
        ? `${network?.name || 'Network'} is taking longer than usual. Your money is completely safe.`
        : 'Still working on it. You will be notified once delivered.'
    : isDelivered
      ? 'Delivered successfully'
      : 'Delivery failed';

  return (
    <div className="min-h-screen bg-[#f0f2f8] pb-28">
      <div className="max-w-3xl mx-auto px-5 pt-[calc(2.5rem_+_env(safe-area-inset-top,0px))] space-y-5">
        <div className="flex items-center gap-2">
          <button onClick={onBack}
            className="flex items-center text-gray-600 hover:text-gray-900 transition-colors">
            <ChevronLeft size={22} strokeWidth={1.5} />
          </button>
          <h1 className="text-lg font-medium text-gray-900 tracking-tight">{order.id}</h1>
        </div>
        <p className="text-xs text-gray-400 font-medium -mt-3">Created {formatDateTime(order.createdAt)}</p>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-5 flex items-center gap-4">
            <img src={LOGOS[order.networkId]} alt="" className="w-14 h-14 rounded-xl object-contain shrink-0" />
            <div className="min-w-0 flex-1">
              <p className="text-sm text-gray-500 font-medium">{order.size} &middot; {network?.name}</p>
              <p className="text-xs text-gray-400 font-medium mt-0.5">{order.phone}</p>
            </div>
            <div className="text-right shrink-0">
              <p className="text-xl font-black text-gray-900">GH₵{order.amountPaid.toFixed(2)}</p>
              <StatusBadge status={order.status} order={order} />
            </div>
          </div>
          {order.deliveredAt && (
            <div className="border-t border-gray-50 px-5 py-3">
              <p className="text-[11px] text-gray-400 font-medium">
                {isFailed ? 'Failed' : 'Completed'} {formatDateTime(order.deliveredAt)}
              </p>
            </div>
          )}
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <div className={`mb-5 rounded-xl px-4 py-3 border ${
            isPending ? 'bg-primary-50 border-primary-100' :
            isDelivered ? 'bg-emerald-50 border-emerald-100' :
            'bg-red-50 border-red-100'
          }`}>
            <div className="flex items-center gap-3">
              {isPending ? <FormulaSpinner className="w-5 h-5 text-primary-600 shrink-0" /> :
               isDelivered ? <Check size={18} className="text-emerald-600 shrink-0" strokeWidth={2} /> :
               <X size={18} className="text-red-600 shrink-0" strokeWidth={2} />}
              <div>
                <p className={`text-sm font-bold ${
                  isPending ? 'text-primary-800' :
                  isDelivered ? 'text-emerald-800' :
                  'text-red-800'
                }`}>{statusMsg}</p>
                {isPending && <ElapsedTimer createdAt={order.createdAt} estimatedMs={order.estimatedMs} />}
                {isFailed && order.walletRefunded && (
                  <p className="text-xs text-emerald-700 font-bold mt-0.5">Refunded GH₵{order.refundAmount.toFixed(2)} to your wallet</p>
                )}
              </div>
            </div>
          </div>
          <OrderTracker order={order} networkName={network?.name || ''} />
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-50">
            <p className="text-[11px] font-black text-gray-400 uppercase tracking-widest">Order Details</p>
          </div>
          <div className="divide-y divide-gray-50">
            {[
              ['Reference', order.id, false],
              ['Network', network?.name || '—', false],
              ['Bundle', order.size, false],
              ['Validity', order.validity?.includes('no expiry') ? '30 days' : order.validity || '—', false],
              ['Phone', order.phone, false],
              ['Amount', `GH₵${order.amountPaid.toFixed(2)}`, false],
              ['Status', order.status.charAt(0).toUpperCase() + order.status.slice(1), isDelivered ? 'text-emerald-600 font-bold' : isFailed ? 'text-red-600 font-bold' : 'text-amber-600 font-bold'],
              ['Created', formatDateTime(order.createdAt), false],
              ...(order.deliveredAt ? [[isFailed ? 'Failed at' : 'Completed at', formatDateTime(order.deliveredAt), false]] : []),
            ].map(([label, value, highlight]) => (
              <div key={label} className="flex items-center justify-between px-5 py-3.5">
                <p className="text-xs font-bold text-gray-500">{label}</p>
                <p className={`text-xs font-bold text-right ${highlight || 'text-gray-900'}`}>{value}</p>
              </div>
            ))}
            {order.walletRefunded && (
              <div className="flex items-center justify-between px-5 py-3.5 bg-emerald-50/50">
                <p className="text-xs font-bold text-emerald-700">Refunded to Wallet</p>
                <p className="text-xs font-black text-emerald-700">+GH₵{order.refundAmount.toFixed(2)}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function DataMart() {
  const [profile] = useLocalStorage('ucc_profile', { name: '', phone: '' });
  const [loaded, setLoaded] = useState(false);
  const [networks, setNetworks] = useState([]);
  const [orders, setOrders] = useState([]);
  const [health, setHealth] = useState({});
  const [wallet, setWallet] = useState(getWallet());

  const [tab, setTab] = useState('buy');
  const [detailOrderId, setDetailOrderId] = useState(null);

  const [buyNetwork, setBuyNetwork] = useState(null);
  const [bundles, setBundles] = useState([]);
  const [selected, setSelected] = useState(null);
  const [phone, setPhone] = useState('');
  const [paying, setPaying] = useState(false);

  const refreshOrders = useCallback(() => {
    const o = getOrders();
    setOrders(o);
    return o;
  }, []);

  const pendingOrders = orders.filter(o => o.status === 'pending');

  useEffect(() => {
    setTimeout(() => {
      const n = getNetworks();
      if (n?.length) setNetworks(n);
      setLoaded(true);
    }, 400);
  }, []);

  useEffect(() => {
    if (!networks.length) return;
    const h = {};
    networks.forEach(n => { h[n.id] = getNetworkHealth(n.id); });
    setHealth(h);
  }, [networks]);

  useEffect(() => {
    refreshOrders();
    const u = () => { refreshOrders(); setWallet(getWallet()); };
    window.addEventListener('order-updated', u);
    window.addEventListener('wallet-updated', () => setWallet(getWallet()));
    return () => window.removeEventListener('order-updated', u);
  }, [refreshOrders]);

  useEffect(() => {
    if (pendingOrders.length === 0) return;
    const t = setInterval(() => {
      pendingOrders.forEach(o => simulateDelivery(o.id));
      refreshOrders();
      setWallet(getWallet());
    }, 3000);
    return () => clearInterval(t);
  }, [pendingOrders.length, refreshOrders]);

  useEffect(() => {
    if (detailOrderId) {
      const t = setInterval(() => setWallet(getWallet()), 3000);
      return () => clearInterval(t);
    }
  }, [detailOrderId]);

  const openBuy = (net) => {
    setBuyNetwork(net);
    setBundles(getBundles(net.id));
    setSelected(null);
    setPhone(profile?.phone || '');
  };

  const pay = async () => {
    if (!selected) return;
    const cleaned = phone.replace(/\s/g, '');
    if (!cleaned.match(/^0\d{9}$/)) { toast.error('Enter a valid 10-digit number'); return; }
    setPaying(true);
    await new Promise(r => setTimeout(r, 300));
    const o = createOrder({ bundleId: selected.id, networkId: buyNetwork.id, phone: cleaned, amountPaid: selected.retail });
    setPaying(false);
    setBuyNetwork(null);
    toast.success('Order placed');
    setDetailOrderId(o.id);
    setTab('orders');
  };

  if (!loaded) return (
    <div className="min-h-screen bg-[#f0f2f8] flex items-center justify-center">
      <FormulaSpinner className="w-6 h-6 text-gray-300" />
    </div>
  );

  if (detailOrderId && tab === 'order-detail') {
    return (
      <OrderDetailsView
        orderId={detailOrderId}
        onBack={() => { setTab('orders'); setDetailOrderId(null); }}
      />
    );
  }

  if (tab === 'orders') {
    return (
      <OrdersView
        orders={orders}
        onViewOrder={(id) => { setDetailOrderId(id); setTab('order-detail'); }}
        onBack={() => setTab('buy')}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#f0f2f8] pb-28">
      <div className="max-w-3xl mx-auto px-5 pt-[calc(2.5rem_+_env(safe-area-inset-top,0px))] space-y-5">

        <div className="flex items-center justify-between">
          <h1 className="text-[28px] font-black text-gray-900 tracking-tight">Buy Data Bundles</h1>
          <button onClick={() => setTab('orders')}
            className="w-10 h-10 rounded-xl bg-white border border-gray-100 shadow-sm flex items-center justify-center hover:shadow-md transition-all active:scale-[0.95]">
            <Package size={18} className="text-gray-600" strokeWidth={1.5} />
          </button>
        </div>

        <div className="bg-primary-600 text-white rounded-[2rem] px-5 pt-6 pb-7 relative overflow-hidden shadow-sm">
          <div className="absolute -right-10 -bottom-10 w-44 h-44 bg-white/10 rounded-full pointer-events-none"></div>
          <div className="absolute -left-6 top-10 w-20 h-20 bg-white/5 rounded-full pointer-events-none"></div>
          <div className="flex items-center justify-between mb-6">
            <p className="text-sm font-medium tracking-wider uppercase opacity-80">My Wallet</p>
            <Wallet size={18} className="opacity-80" strokeWidth={1.5} />
          </div>
          <div className="mb-2">
            <p className="text-sm opacity-80 mb-1">Total Balance</p>
            <h1 className="text-4xl font-bold tracking-tight">GH₵{wallet.balance.toFixed(2)}</h1>
          </div>
        </div>

        {networks.length > 0 && (
          <div>
            <p className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-3 px-1">Select Network</p>
            <div className="space-y-2">
              {networks.map(n => {
                const deg = health[n.id]?.status === 'degraded';
                return (
                  <button key={n.id} onClick={() => openBuy(n)}
                    className="w-full text-left bg-white rounded-xl border border-gray-100 shadow-sm p-4 hover:shadow-md transition-all active:scale-[0.99]">
                    <div className="flex items-center gap-3.5">
                      <img src={LOGOS[n.id]} alt="" className="w-10 h-10 rounded-xl object-contain shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-gray-900">{n.name}</p>
                        <p className="text-xs text-gray-400 font-medium mt-0.5">Tap to browse bundles</p>
                      </div>
                      {deg && <span className="text-[10px] font-bold text-amber-700 bg-amber-50 rounded-full px-2.5 py-1 shrink-0 border border-amber-100/50">Unstable</span>}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {networks.length === 0 && (
          <div className="text-center py-20">
            <div className="w-16 h-16 rounded-2xl bg-white border border-gray-100 shadow-sm flex items-center justify-center mx-auto mb-4">
              <ShoppingCart size={24} className="text-gray-300" />
            </div>
            <p className="text-base font-bold text-gray-900 mb-1">No networks available</p>
            <p className="text-sm text-gray-400 font-medium">Check back later</p>
          </div>
        )}
      </div>

      <Modal
        isOpen={buyNetwork !== null}
        onClose={() => setBuyNetwork(null)}
        size="xl"
        noPadding
        showCloseButton={false}
        className="!bg-white rounded-t-[28px] rounded-b-none sm:rounded-[28px] border-none shadow-[0_20px_60px_-15px_rgba(0,0,0,0.12)] p-0 overflow-hidden"
      >
        <div className="flex flex-col">
          <div className="w-full flex items-center justify-center py-3 cursor-grab active:cursor-grabbing">
            <div className="w-12 h-1.5 bg-gray-300 rounded-full" />
          </div>
          <div className="px-6 sm:px-8 pb-6">
            <img src={LOGOS[buyNetwork?.id]} alt="" className="w-14 h-14 rounded-xl object-contain mx-auto mb-5" />

            <div className="bg-gray-100 rounded-2xl p-5 shadow-sm">
              <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-4">Data Bundles</p>
              <div className="space-y-2">
                {bundles.map((b) => {
                  const sel = selected?.id === b.id;
                  return (
                    <button key={b.id} onClick={() => setSelected(b)}
                      className={`w-full flex items-center justify-between py-3 px-4 rounded-xl transition-all ${
                        sel ? 'bg-white shadow-sm border border-gray-200' : 'bg-gray-200/50 hover:bg-gray-200/80'
                      }`}>
                      <div>
                        <p className="text-sm font-bold text-gray-900">{b.size}</p>
                        <p className="text-xs text-gray-400 font-medium mt-0.5">{b.validity.includes('no expiry') ? '30 days' : b.validity}</p>
                      </div>
                      <span className={`text-sm font-bold ${sel ? 'text-gray-900' : 'text-gray-500'}`}>
                        ₵{b.retail.toFixed(2)}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mt-4">
              <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-3">Phone Number</p>
              <input
                type="tel"
                value={phone}
                onChange={e => setPhone(e.target.value.replace(/[^0-9\s]/g, ''))}
                placeholder="054 123 4567"
                className="w-full bg-white rounded-xl px-4 py-3 text-sm font-bold text-gray-900 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-900/10 transition-shadow"
                autoComplete="off"
              />
            </div>

            <div className="flex items-center justify-center gap-1.5 mt-4 mb-1">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3 h-3 text-gray-400">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              <span className="text-[10px] font-medium text-gray-400">Encrypted and secure</span>
            </div>

            <div className="flex gap-3 mt-4">
              <button onClick={() => setBuyNetwork(null)}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-bold rounded-xl py-3.5 transition-all active:scale-[0.99]">
                Cancel
              </button>
              <button onClick={pay} disabled={paying || !selected}
                className="flex-1 bg-gray-900 hover:bg-black disabled:bg-gray-300 disabled:text-gray-500 text-white text-sm font-bold rounded-xl py-3.5 transition-all active:scale-[0.99]">
                {paying ? 'Placing Order...' : selected ? `Pay ₵${selected.retail.toFixed(2)}` : 'Select a bundle'}
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
