const ORDERS_KEY = 'ucc_data_orders';
const HEALTH_KEY = 'ucc_network_health';
const WALLET_KEY = 'ucc_wallet';

const NETWORKS = [
  { id: 'mtn',       name: 'MTN',       color: '#FFCC00' },
  { id: 'telecel',    name: 'Telecel',   color: '#ED1C24' },
  { id: 'airteltigo', name: 'AirtelTigo', color: '#00A94F' },
];

const BUNDLES = {
  mtn: [
    { id: 'mtn-1gb',  size: '1 GB',  wholesale: 4.40, retail: 5.50,  validity: '30 days no expiry' },
    { id: 'mtn-2gb',  size: '2 GB',  wholesale: 9.00, retail: 11.00, validity: '30 days no expiry' },
    { id: 'mtn-5gb',  size: '5 GB',  wholesale: 22.50, retail: 27.00, validity: '30 days no expiry' },
    { id: 'mtn-10gb', size: '10 GB', wholesale: 42.00, retail: 49.00, validity: '30 days no expiry' },
    { id: 'mtn-25gb', size: '25 GB', wholesale: 100.00, retail: 115.00, validity: '30 days no expiry' },
  ],
  telecel: [
    { id: 'tel-1gb',  size: '1 GB',  wholesale: 5.30, retail: 6.50,  validity: '30 days' },
    { id: 'tel-5gb',  size: '5 GB',  wholesale: 24.00, retail: 29.00, validity: '30 days' },
    { id: 'tel-10gb', size: '10 GB', wholesale: 46.00, retail: 54.00, validity: '30 days' },
    { id: 'tel-20gb', size: '20 GB', wholesale: 88.00, retail: 99.00, validity: '30 days' },
  ],
  airteltigo: [
    { id: 'at-1gb',   size: '1 GB',  wholesale: 3.95, retail: 5.00,  validity: '30 days' },
    { id: 'at-2gb',   size: '2 GB',  wholesale: 8.35, retail: 10.00, validity: '30 days' },
    { id: 'at-5gb',   size: '5 GB',  wholesale: 21.00, retail: 25.00, validity: '30 days' },
    { id: 'at-10gb',  size: '10 GB', wholesale: 40.00, retail: 48.00, validity: '30 days' },
  ],
};

function loadHealth() {
  try { return JSON.parse(localStorage.getItem(HEALTH_KEY) || '{}'); } catch { return {}; }
}
function saveHealth(h) { localStorage.setItem(HEALTH_KEY, JSON.stringify(h)); }

export function getNetworkHealth(networkId) {
  const h = loadHealth();
  const n = h[networkId];
  if (!n) return { consecutiveFailures: 0, status: 'healthy' };
  return n;
}

export function recordDeliveryResult(networkId, success) {
  const h = loadHealth();
  if (!h[networkId]) h[networkId] = { consecutiveFailures: 0, status: 'healthy' };
  if (success) {
    h[networkId].consecutiveFailures = 0;
    h[networkId].status = 'healthy';
  } else {
    h[networkId].consecutiveFailures = (h[networkId].consecutiveFailures || 0) + 1;
    h[networkId].status = h[networkId].consecutiveFailures >= 3 ? 'degraded' : 'healthy';
  }
  saveHealth(h);
}

export function getWallet() {
  try { return JSON.parse(localStorage.getItem(WALLET_KEY) || '{"balance":0,"totalSpent":0,"totalRefunded":0}'); } catch { return { balance: 0, totalSpent: 0, totalRefunded: 0 }; }
}

export function creditWallet(amount) {
  const w = getWallet();
  w.balance = +(w.balance + amount).toFixed(2);
  w.totalRefunded = +(w.totalRefunded + amount).toFixed(2);
  localStorage.setItem(WALLET_KEY, JSON.stringify(w));
  window.dispatchEvent(new CustomEvent('wallet-updated', { detail: w }));
  return w;
}

export function debitWallet(amount) {
  const w = getWallet();
  if (w.balance < amount) return false;
  w.balance = +(w.balance - amount).toFixed(2);
  w.totalSpent = +(w.totalSpent + amount).toFixed(2);
  localStorage.setItem(WALLET_KEY, JSON.stringify(w));
  window.dispatchEvent(new CustomEvent('wallet-updated', { detail: w }));
  return true;
}

function loadOrders() {
  try { return JSON.parse(localStorage.getItem(ORDERS_KEY) || '[]'); } catch { return []; }
}
function saveOrders(orders) { localStorage.setItem(ORDERS_KEY, JSON.stringify(orders)); }

let orderCounter = parseInt(localStorage.getItem('ucc_data_order_counter') || '1000', 10);
function nextOrderId() {
  orderCounter++;
  localStorage.setItem('ucc_data_order_counter', String(orderCounter));
  return `CGDATA-${orderCounter}`;
}

export function getNetworks() { return NETWORKS; }
export function getBundles(networkId) { return BUNDLES[networkId] || []; }
export function getAllBundles() { return BUNDLES; }

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

function getEstimatedMs() {
  if (localStorage.getItem('ucc_mock_fast') === 'true') return 10000 + Math.random() * 20000;
  return 60000 + Math.random() * 540000;
}

const STAGE_ORDER = ['placed', 'processing', 'connecting', 'delivered', 'failed'];

function getCurrentStageFromTime(createdAt, estimatedMs) {
  const elapsed = Date.now() - createdAt;
  const ratio = Math.min(elapsed / estimatedMs, 1);
  if (ratio < 0.20) return 'processing';
  if (ratio < 0.55) return 'connecting';
  if (ratio < 1) return 'connecting';
  return null;
}

export function createOrder({ bundleId, networkId, phone, amountPaid }) {
  const bundle = getBundleById(bundleId);
  if (!bundle) return null;

  const now = Date.now();
  const estimatedMs = getEstimatedMs();

  const order = {
    id: nextOrderId(),
    bundleId,
    networkId,
    phone,
    size: bundle.size,
    validity: bundle.validity,
    amountPaid,
    wholesaleCost: bundle.wholesale,
    profit: +(amountPaid - bundle.wholesale).toFixed(2),
    status: 'pending',
    walletRefunded: false,
    refundAmount: 0,
    createdAt: new Date(now).toISOString(),
    estimatedMs,
    stages: [{ stage: 'placed', timestamp: now }],
    deliveredAt: null,
  };

  const orders = loadOrders();
  orders.unshift(order);
  saveOrders(orders);

  window.dispatchEvent(new CustomEvent('order-updated', { detail: order }));
  return order;
}

export function simulateDelivery(orderId) {
  const orders = loadOrders();
  const idx = orders.findIndex(o => o.id === orderId);
  if (idx === -1) return null;

  const order = orders[idx];
  if (order.status !== 'pending') return order;

  const createdAt = new Date(order.createdAt).getTime();
  const elapsed = Date.now() - createdAt;
  const ratio = Math.min(elapsed / order.estimatedMs, 1);

  const existingStages = order.stages.map(s => s.stage);

  if (ratio < 1) {
    const stage = ratio < 0.20 ? 'processing' : 'connecting';
    if (!existingStages.includes(stage)) {
      order.stages.push({ stage, timestamp: Date.now() });
      saveOrders(orders);
      window.dispatchEvent(new CustomEvent('order-updated', { detail: order }));
    }
    return order;
  }

  const success = Math.random() > 0.05;
  const finalStage = success ? 'delivered' : 'failed';
  order.status = finalStage;
  order.deliveredAt = new Date().toISOString();

  if (!existingStages.includes('connecting')) {
    order.stages.push({ stage: 'connecting', timestamp: Date.now() });
  }
  order.stages.push({ stage: finalStage, timestamp: Date.now() });

  if (!success) {
    order.walletRefunded = true;
    order.refundAmount = order.amountPaid;
    creditWallet(order.amountPaid);
    recordDeliveryResult(order.networkId, false);
  } else {
    recordDeliveryResult(order.networkId, true);
  }

  saveOrders(orders);
  window.dispatchEvent(new CustomEvent('order-updated', { detail: order }));
  return order;
}

export function getOrders() { return loadOrders(); }
export function getOrderById(orderId) { return loadOrders().find(o => o.id === orderId) || null; }

export function getStats() {
  const orders = loadOrders();
  const total = orders.length;
  const delivered = orders.filter(o => o.status === 'delivered').length;
  const totalProfit = orders.reduce((s, o) => s + (o.status === 'delivered' ? o.profit : 0), 0);
  const totalRevenue = orders.reduce((s, o) => s + (o.status === 'delivered' ? o.amountPaid : 0), 0);
  return { total, delivered, totalProfit, totalRevenue };
}
