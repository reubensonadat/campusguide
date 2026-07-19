// ─────────────────────────────────────────────────────────────────────────────
// dataMartService — mock data reselling service
//   - All data stored in localStorage (no Supabase needed to preview)
//   - Replace with real DataMart API calls when ready
// ─────────────────────────────────────────────────────────────────────────────

const STORAGE_KEY = 'ucc_data_orders';

const NETWORKS = [
  { id: 'mtn',    name: 'MTN',       color: '#FFCC00', bg: 'bg-yellow-400', text: 'text-yellow-900', icon: '📶' },
  { id: 'telecel', name: 'Telecel',   color: '#ED1C24', bg: 'bg-red-500',    text: 'text-red-900',   icon: '📱' },
  { id: 'airteltigo', name: 'AirtelTigo', color: '#00A94F', bg: 'bg-green-500',  text: 'text-green-900', icon: '🟢' },
];

const BUNDLES = {
  mtn: [
    { id: 'mtn-1gb',    size: '1 GB',  wholesale: 4.40, retail: 5.50,  validity: '30 days no expiry' },
    { id: 'mtn-2gb',    size: '2 GB',  wholesale: 9.00, retail: 11.00, validity: '30 days no expiry' },
    { id: 'mtn-5gb',    size: '5 GB',  wholesale: 22.50, retail: 27.00, validity: '30 days no expiry' },
    { id: 'mtn-10gb',   size: '10 GB', wholesale: 42.00, retail: 49.00, validity: '30 days no expiry' },
    { id: 'mtn-25gb',   size: '25 GB', wholesale: 100.00, retail: 115.00, validity: '30 days no expiry' },
  ],
  telecel: [
    { id: 'tel-1gb',    size: '1 GB',  wholesale: 5.30, retail: 6.50,  validity: '30 days' },
    { id: 'tel-5gb',    size: '5 GB',  wholesale: 24.00, retail: 29.00, validity: '30 days' },
    { id: 'tel-10gb',   size: '10 GB', wholesale: 46.00, retail: 54.00, validity: '30 days' },
    { id: 'tel-20gb',   size: '20 GB', wholesale: 88.00, retail: 99.00, validity: '30 days' },
  ],
  airteltigo: [
    { id: 'at-1gb',     size: '1 GB',  wholesale: 3.95, retail: 5.00,  validity: '30 days' },
    { id: 'at-2gb',     size: '2 GB',  wholesale: 8.35, retail: 10.00, validity: '30 days' },
    { id: 'at-5gb',     size: '5 GB',  wholesale: 21.00, retail: 25.00, validity: '30 days' },
    { id: 'at-10gb',    size: '10 GB', wholesale: 40.00, retail: 48.00, validity: '30 days' },
  ],
};

function loadOrders() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'); } catch { return []; }
}

function saveOrders(orders) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
}

let orderCounter = parseInt(localStorage.getItem('ucc_data_order_counter') || '1000', 10);

function nextOrderId() {
  orderCounter++;
  localStorage.setItem('ucc_data_order_counter', String(orderCounter));
  return `CGDATA-${orderCounter}`;
}

export function getNetworks() {
  return NETWORKS;
}

export function getBundles(networkId) {
  return BUNDLES[networkId] || [];
}

export function getAllBundles() {
  return BUNDLES;
}

export function getBundleById(bundleId) {
  for (const net of Object.keys(BUNDLES)) {
    const found = BUNDLES[net].find(b => b.id === bundleId);
    if (found) return { ...found, network: net };
  }
  return null;
}

export function getNetworkById(networkId) {
  return NETWORKS.find(n => n.id === networkId) || null;
}

export function createOrder({ bundleId, networkId, phone, amountPaid }) {
  const bundle = getBundleById(bundleId);
  if (!bundle) return null;

  const order = {
    id: nextOrderId(),
    bundleId,
    networkId,
    phone,
    size: bundle.size,
    amountPaid,
    wholesaleCost: bundle.wholesale,
    profit: +(amountPaid - bundle.wholesale).toFixed(2),
    status: 'pending', // pending → processing → delivered → failed
    createdAt: new Date().toISOString(),
    deliveredAt: null,
  };

  const orders = loadOrders();
  orders.unshift(order);
  saveOrders(orders);

  // Simulate delivery after 5-15 seconds
  const delay = 5000 + Math.random() * 10000;
  setTimeout(() => {
    const current = loadOrders();
    const idx = current.findIndex(o => o.id === order.id);
    if (idx !== -1) {
      current[idx].status = Math.random() > 0.05 ? 'delivered' : 'failed';
      current[idx].deliveredAt = new Date().toISOString();
      saveOrders(current);
      // Dispatch event so the UI can react
      window.dispatchEvent(new CustomEvent('order-updated', { detail: current[idx] }));
    }
  }, delay);

  return order;
}

export function getOrders() {
  return loadOrders();
}

export function getOrderById(orderId) {
  return loadOrders().find(o => o.id === orderId) || null;
}

export function getStats() {
  const orders = loadOrders();
  const total = orders.length;
  const delivered = orders.filter(o => o.status === 'delivered').length;
  const totalProfit = orders.reduce((s, o) => s + (o.status === 'delivered' ? o.profit : 0), 0);
  const totalRevenue = orders.reduce((s, o) => s + (o.status === 'delivered' ? o.amountPaid : 0), 0);
  return { total, delivered, totalProfit, totalRevenue };
}
