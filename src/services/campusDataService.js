import { supabase } from '../lib/supabase';
import CampusMapData from '../components/guide/content/ucc/CampusMap';
import { UCC_KNOWLEDGE_BASE, getKnowledgeForLocation } from '../components/guide/content/ucc/KnowledgeBase';

/**
 * Campus Data Service
 * 
 * Fetches buildings, knowledge, and guide cards from Supabase.
 * Falls back to static data if fetch fails (never wipes user data).
 * 
 * 3-State Logic: Loading → Success(data) | Error(fallback to static)
 */

// Static fallback data (always available, no network needed)
const getStaticBuildings = () => {
    const { buildings, openGoogleMaps, getCoordinates, defaultCenter } = CampusMapData({ onLocationSelect: () => { } });
    return { buildings, openGoogleMaps, getCoordinates, defaultCenter };
};

const getStaticKnowledge = () => UCC_KNOWLEDGE_BASE;

/**
 * Transform a Supabase building row to match the static buildings array format.
 * DB has latitude/longitude columns; static uses "lat, lng" url string.
 */
const transformBuildingRow = (row) => ({
    id: row.id,
    fullName: row.full_name,
    shortForm: row.short_form,
    description: row.description,
    url: `${row.latitude}, ${row.longitude}`,
    category: row.category,
    _source: 'db' // marker to distinguish from static
});

/**
 * Transform a Supabase knowledge row to match the static KnowledgeBase format.
 */
const transformKnowledgeRow = (row) => {
    const entry = {
        title: row.title,
        tags: row.tags || [],
        history: row.history,
        architecture: row.architecture,
        statistics: row.statistics || {},
        disclaimer: row.disclaimer,
        _source: 'db'
    };
    // Only add non-null fields
    if (row.rules && row.rules.length > 0) entry.rules = row.rules;
    if (row.residential_rules && row.residential_rules.length > 0) entry.residentialRules = row.residential_rules;
    if (row.floors && row.floors.length > 0) entry.floors = row.floors;
    if (row.accessibility) entry.accessibility = row.accessibility;
    if (row.hazards && row.hazards.length > 0) entry.hazards = row.hazards;
    if (row.sculpture) entry.sculpture = row.sculpture;
    if (row.grievance_chain && row.grievance_chain.length > 0) entry.grievanceChain = row.grievance_chain;
    return entry;
};

/**
 * Transform a Supabase guide card row to the format used by the search UI.
 */
const transformGuideCardRow = (row) => ({
    id: row.id,
    title: row.title,
    subtitle: row.subtitle,
    icon: row.icon,
    category: row.category,
    content: row.content || [],
    searchKeywords: row.search_keywords || [],
    _source: 'db',
    _type: 'guide_card' // marker to distinguish from buildings
});

/**
 * Fetch all campus data from Supabase with static fallback.
 * Returns { buildings, knowledge, guideCards, openGoogleMaps, getCoordinates, defaultCenter, isLoading, error }
 */
export const fetchCampusData = async (campusId = 'ucc') => {
    const staticData = getStaticBuildings();

    try {
        // Fetch all 3 tables in parallel
        const [buildingsRes, knowledgeRes, cardsRes] = await Promise.all([
            supabase
                .from('campus_buildings')
                .select('*')
                .eq('campus_id', campusId)
                .eq('is_active', true)
                .order('sort_order', { ascending: true }),
            supabase
                .from('campus_knowledge')
                .select('*')
                .eq('campus_id', campusId)
                .eq('is_active', true),
            supabase
                .from('campus_guide_cards')
                .select('*')
                .eq('campus_id', campusId)
                .eq('is_active', true)
                .order('sort_order', { ascending: true })
        ]);

        // Check for errors (but don't throw — fall back gracefully)
        const buildingsError = buildingsRes.error;
        const knowledgeError = knowledgeRes.error;
        const cardsError = cardsRes.error;

        if (buildingsError && knowledgeError && cardsError) {
            // All 3 failed — use static fallback
            console.warn('[CampusData] All fetches failed, using static fallback:', buildingsError.message);
            return {
                buildings: staticData.buildings,
                knowledge: getStaticKnowledge(),
                guideCards: [],
                openGoogleMaps: staticData.openGoogleMaps,
                getCoordinates: staticData.getCoordinates,
                defaultCenter: staticData.defaultCenter,
                isLoading: false,
                error: null,
                source: 'static'
            };
        }

        // Build buildings: prefer DB, fall back to static for any missing
        const dbBuildings = buildingsRes.data && !buildingsError
            ? buildingsRes.data.map(transformBuildingRow)
            : null;

        // Build knowledge: merge DB entries over static
        const dbKnowledge = {};
        if (knowledgeRes.data && !knowledgeError) {
            knowledgeRes.data.forEach(row => {
                dbKnowledge[row.id] = transformKnowledgeRow(row);
            });
        }

        // Build guide cards
        const dbGuideCards = cardsRes.data && !cardsError
            ? cardsRes.data.map(transformGuideCardRow)
            : [];

        return {
            buildings: dbBuildings || staticData.buildings,
            knowledge: Object.keys(dbKnowledge).length > 0 ? { ...getStaticKnowledge(), ...dbKnowledge } : getStaticKnowledge(),
            guideCards: dbGuideCards,
            openGoogleMaps: staticData.openGoogleMaps,
            getCoordinates: staticData.getCoordinates,
            defaultCenter: dbBuildings && dbBuildings.length > 0
                ? [dbBuildings[0]?.url?.split(',')[0]?.trim() || staticData.defaultCenter[0],
                dbBuildings[0]?.url?.split(',')[1]?.trim() || staticData.defaultCenter[1]]
                : staticData.defaultCenter,
            isLoading: false,
            error: null,
            source: dbBuildings ? 'db' : 'static'
        };
    } catch (err) {
        // Network error or other exception — fall back to static
        console.warn('[CampusData] Fetch failed, using static fallback:', err.message);
        return {
            buildings: staticData.buildings,
            knowledge: getStaticKnowledge(),
            guideCards: [],
            openGoogleMaps: staticData.openGoogleMaps,
            getCoordinates: staticData.getCoordinates,
            defaultCenter: staticData.defaultCenter,
            isLoading: false,
            error: err.message,
            source: 'static'
        };
    }
};

/**
 * Search guide cards by keywords. Returns matching cards.
 */
export const searchGuideCards = (cards, searchTerm) => {
    if (!searchTerm || !cards || cards.length === 0) return [];
    const lowerTerm = searchTerm.toLowerCase();
    const terms = lowerTerm.split(/\s+/).filter(t => t.length > 1);

    return cards.filter(card => {
        const titleMatch = card.title.toLowerCase().includes(lowerTerm);
        const subtitleMatch = card.subtitle?.toLowerCase().includes(lowerTerm);
        const keywordMatch = card.searchKeywords?.some(kw =>
            terms.some(term => kw.toLowerCase().includes(term))
        );
        const categoryMatch = card.category.toLowerCase().includes(lowerTerm);
        return titleMatch || subtitleMatch || keywordMatch || categoryMatch;
    });
};

/**
 * Get knowledge for a location name, checking DB knowledge first, then static.
 */
export const getKnowledge = (locationName, dbKnowledge = {}) => {
    // Try DB knowledge first
    const name = locationName?.toLowerCase() || '';
    for (const [key, entry] of Object.entries(dbKnowledge)) {
        if (name.includes(key)) return entry;
    }
    // Fall back to static matcher
    return getKnowledgeForLocation(locationName);
};
