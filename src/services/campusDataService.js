import { supabase } from '../lib/supabase';
import CampusMapData from '../components/guide/content/ucc/CampusMap';
import { UCC_KNOWLEDGE_BASE, getKnowledgeForLocation } from '../components/guide/content/ucc/KnowledgeBase';

const CACHE_KEY = 'ucc_campus_data_v2';
const CACHE_META_KEY = 'ucc_campus_data_meta_v2';
const CACHE_TTL = 7 * 24 * 60 * 60 * 1000; // 7 days

const readCache = () => {
  try {
    const meta = JSON.parse(localStorage.getItem(CACHE_META_KEY));
    if (!meta || Date.now() - meta.timestamp > CACHE_TTL) return null;
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw);
    if (meta.buildingsHash !== hashData(data?.buildings)) return null;
    return { data, meta };
  } catch { return null; }
};

const writeCache = (data) => {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(data));
    localStorage.setItem(CACHE_META_KEY, JSON.stringify({
      timestamp: Date.now(),
      buildingsHash: hashData(data?.buildings),
    }));
  } catch (e) {
    if (e.name === 'QuotaExceededError') {
      try {
        localStorage.removeItem(CACHE_KEY);
        localStorage.removeItem(CACHE_META_KEY);
      } catch {}
    }
  }
};

const clearCache = () => {
  try { localStorage.removeItem(CACHE_KEY); localStorage.removeItem(CACHE_META_KEY); } catch {}
};

const hashData = (obj) => {
  if (!obj) return '';
  let h = 0;
  const s = typeof obj === 'string' ? obj : JSON.stringify(obj);
  for (let i = 0; i < s.length; i++) { h = ((h << 5) - h + s.charCodeAt(i)) | 0; }
  return h.toString();
};

const getStaticBuildings = () => {
  const { buildings, openGoogleMaps, getCoordinates, defaultCenter } = CampusMapData({ onLocationSelect: () => {} });
  return { buildings, openGoogleMaps, getCoordinates, defaultCenter };
};

const getStaticKnowledge = () => UCC_KNOWLEDGE_BASE;

const transformBuildingRow = (row) => ({
  id: row.id, fullName: row.full_name, shortForm: row.short_form, description: row.description,
  url: `${row.latitude}, ${row.longitude}`, category: row.category, _source: 'db'
});

const transformKnowledgeRow = (row) => {
  const entry = { title: row.title, tags: row.tags || [], history: row.history, architecture: row.architecture, statistics: row.statistics || {}, disclaimer: row.disclaimer, _source: 'db' };
  if (row.rules?.length > 0) entry.rules = row.rules;
  if (row.residential_rules?.length > 0) entry.residentialRules = row.residential_rules;
  if (row.floors?.length > 0) entry.floors = row.floors;
  if (row.accessibility) entry.accessibility = row.accessibility;
  if (row.hazards?.length > 0) entry.hazards = row.hazards;
  if (row.sculpture) entry.sculpture = row.sculpture;
  if (row.grievance_chain?.length > 0) entry.grievanceChain = row.grievance_chain;
  return entry;
};

const transformGuideCardRow = (row) => ({
  id: row.id, title: row.title, subtitle: row.subtitle, icon: row.icon, category: row.category,
  content: row.content || [], searchKeywords: row.search_keywords || [], _source: 'db', _type: 'guide_card'
});

export const fetchCampusData = async (campusId = 'ucc') => {
  const staticData = getStaticBuildings();
  const cached = readCache();
  if (cached) return { ...cached.data, isLoading: false, error: null, source: 'cache', isCached: true };

  try {
    const [buildingsRes, knowledgeRes, cardsRes] = await Promise.all([
      supabase.from('campus_buildings').select('*').eq('campus_id', campusId).eq('is_active', true).order('sort_order', { ascending: true }),
      supabase.from('campus_knowledge').select('*').eq('campus_id', campusId).eq('is_active', true),
      supabase.from('campus_guide_cards').select('*').eq('campus_id', campusId).eq('is_active', true).order('sort_order', { ascending: true })
    ]);

    const bErr = buildingsRes.error, kErr = knowledgeRes.error, cErr = cardsRes.error;

    if (bErr && kErr && cErr) {
      console.warn('[CampusData] All fetches failed, using static fallback:', bErr.message);
      return { buildings: staticData.buildings, knowledge: getStaticKnowledge(), guideCards: [], openGoogleMaps: staticData.openGoogleMaps, getCoordinates: staticData.getCoordinates, defaultCenter: staticData.defaultCenter, isLoading: false, error: null, source: 'static' };
    }

    const dbBuildings = buildingsRes.data && !bErr ? buildingsRes.data.map(transformBuildingRow) : null;
    const dbKnowledge = {};
    if (knowledgeRes.data && !kErr) knowledgeRes.data.forEach(row => { dbKnowledge[row.id] = transformKnowledgeRow(row); });
    const dbGuideCards = cardsRes.data && !cErr ? cardsRes.data.map(transformGuideCardRow) : [];

    const result = {
      buildings: (dbBuildings && dbBuildings.length > 0) ? dbBuildings : staticData.buildings,
      knowledge: Object.keys(dbKnowledge).length > 0 ? { ...getStaticKnowledge(), ...dbKnowledge } : getStaticKnowledge(),
      guideCards: dbGuideCards,
      openGoogleMaps: staticData.openGoogleMaps,
      getCoordinates: staticData.getCoordinates,
      defaultCenter: dbBuildings?.length > 0 ? [dbBuildings[0]?.url?.split(',')[0]?.trim() || staticData.defaultCenter[0], dbBuildings[0]?.url?.split(',')[1]?.trim() || staticData.defaultCenter[1]] : staticData.defaultCenter,
      isLoading: false, error: null, source: dbBuildings ? 'db' : 'static'
    };

    writeCache(result);
    return { ...result, isCached: true };
  } catch (err) {
    console.warn('[CampusData] Fetch failed, using static fallback:', err.message);
    return { buildings: staticData.buildings, knowledge: getStaticKnowledge(), guideCards: [], openGoogleMaps: staticData.openGoogleMaps, getCoordinates: staticData.getCoordinates, defaultCenter: staticData.defaultCenter, isLoading: false, error: err.message, source: 'static' };
  }
};

export const refreshCampusData = async (campusId = 'ucc') => {
  clearCache();
  return fetchCampusData(campusId);
};

export const searchGuideCards = (cards, searchTerm) => {
  if (!searchTerm || !cards || cards.length === 0) return [];
  const lowerTerm = searchTerm.toLowerCase();
  const terms = lowerTerm.split(/\s+/).filter(t => t.length > 1);
  return cards.filter(card => {
    const titleMatch = card.title?.toLowerCase().includes(lowerTerm);
    const subtitleMatch = card.subtitle?.toLowerCase().includes(lowerTerm);
    const keywordMatch = card.searchKeywords?.some(kw => terms.some(term => kw.toLowerCase().includes(term)));
    const categoryMatch = card.category?.toLowerCase().includes(lowerTerm);
    return titleMatch || subtitleMatch || keywordMatch || categoryMatch;
  });
};

export const getKnowledge = (locationName, dbKnowledge = {}) => {
  const name = locationName?.toLowerCase() || '';
  for (const [key, entry] of Object.entries(dbKnowledge)) { if (name.includes(key)) return entry; }
  return getKnowledgeForLocation(locationName);
};

// force reload
