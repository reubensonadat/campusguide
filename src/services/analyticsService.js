import { supabase } from '../lib/supabase';
import { withCache, SHORT_TTL } from './cacheService';

const BUFFER_FLUSH_INTERVAL = 60000; // flush every 60 seconds
const BUFFER_KEY = 'ucc_analytics_buffer';

let flushTimer = null;
let isFlushing = false;

function getBuffer() {
  try {
    const raw = localStorage.getItem(BUFFER_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveBuffer(events) {
  try {
    localStorage.setItem(BUFFER_KEY, JSON.stringify(events));
  } catch {
    // localStorage full — silently drop
  }
}

function addToBuffer(event) {
  const buffer = getBuffer();
  buffer.push({ ...event, client_ts: Date.now() });
  saveBuffer(buffer);
  scheduleFlush();
}

function scheduleFlush() {
  if (flushTimer) return;
  flushTimer = setTimeout(flushBuffer, BUFFER_FLUSH_INTERVAL);
}

export async function flushBuffer() {
  if (isFlushing) return;
  isFlushing = true;

  const buffer = getBuffer();
  if (buffer.length === 0) {
    isFlushing = false;
    return;
  }

  saveBuffer([]);

  try {
    const { error } = await supabase.from('thrift_events').insert(buffer);
    if (error) {
      console.warn('[analytics] batch insert failed, re-queuing:', error.message);
      const remaining = getBuffer();
      saveBuffer([...remaining, ...buffer]);
    } else {
      // console.log(`[analytics] flushed ${buffer.length} events`);
    }
  } catch (err) {
    console.warn('[analytics] flush error:', err.message);
  }

  isFlushing = false;
  flushTimer = null;

  if (getBuffer().length > 0) scheduleFlush();
}

export function trackThriftView(thriftId, viewerId, sessionId) {
  if (!thriftId) return;
  addToBuffer({
    thrift_id: thriftId,
    event_type: 'VIEW',
    viewer_id: viewerId || null,
    session_id: sessionId || null
  });
}

export function trackThriftWhatsAppClick(thriftId, viewerId, sessionId) {
  if (!thriftId) return;
  addToBuffer({
    thrift_id: thriftId,
    event_type: 'WHATSAPP_CLICK',
    viewer_id: viewerId || null,
    session_id: sessionId || null
  });
}

export async function fetchThriftItemStats(thriftIds) {
  if (!thriftIds || thriftIds.length === 0) return {};
  const uniqueIds = [...new Set(thriftIds)];
  const cacheKey = `thrift_stats_${uniqueIds.sort().join(',')}`;
  try {
    return await withCache(cacheKey, async () => {
      const { data, error } = await supabase
        .from('thrift_item_stats')
        .select('*')
        .in('thrift_id', uniqueIds);
      if (error) throw error;
      const map = {};
      (data || []).forEach(row => { map[row.thrift_id] = row; });
      return map;
    }, SHORT_TTL);
  } catch {
    return {};
  }
}

export async function updateWhisperViewCount(whisperId) {
  if (!whisperId) return;
  try {
    await supabase.rpc('increment_whisper_views', { p_whisper_id: whisperId });
  } catch (err) {
    console.warn('[analytics] failed to update whisper view count:', err.message);
  }
}

// Auto-flush on page unload
if (typeof window !== 'undefined') {
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') flushBuffer();
  });
  window.addEventListener('beforeunload', () => flushBuffer());
}
