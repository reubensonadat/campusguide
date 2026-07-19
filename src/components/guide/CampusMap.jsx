import React, { useState, useMemo, useCallback, useRef, useEffect } from 'react';
import { ExternalLink, Info, Navigation, Loader2 } from 'lucide-react';
import { toast } from 'react-hot-toast';
import CampusMapData from './content/ucc/CampusMap';
import { getKnowledgeForLocation } from './content/ucc/KnowledgeBase';
import { fetchCampusData, searchGuideCards } from '@/services/campusDataService';
import { useCampus } from '@/context/CampusContext';
import { Map, MapControls, MapMarker, MarkerPopup, MarkerContent, MapRoute, DefaultMarkerIcon, MarkerLabel } from '@/components/ui/map';
import { calculateDistance, truncateRouteByProximity } from '@/utils/navigation';
import LiveNavigationHUD from './LiveNavigationHUD';
import CampusSearchSidebar from './CampusSearchSidebar';
import WeatherOverlay from './WeatherOverlay';
import KnowledgeModal from './KnowledgeModal';
import { useMap } from '@/components/ui/map/context';
import CampusSelectorModal from '../common/CampusSelectorModal';

const CommunityHeatmap = ({ posts, visible }) => {
  const { map, isLoaded } = useMap();

  useEffect(() => {
    if (!map || !isLoaded) return;

    if (!map.getSource('community-heat-source')) {
      map.addSource('community-heat-source', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: posts.map(post => ({
            type: 'Feature',
            geometry: { type: 'Point', coordinates: [post.coords[1], post.coords[0]] },
            properties: { type: post.type }
          }))
        }
      });

      // Events Heatmap
      map.addLayer({
        id: 'community-heat-events',
        type: 'heatmap',
        source: 'community-heat-source',
        filter: ['==', ['get', 'type'], 'event'],
        maxzoom: 20,
        paint: {
          'heatmap-weight': 1,
          'heatmap-intensity': ['interpolate', ['linear'], ['zoom'], 13, 1, 20, 3],
          'heatmap-color': [
            'interpolate', ['linear'], ['heatmap-density'],
            0, 'rgba(251,113,133,0)',      // transparent rose-400
            0.5, 'rgba(251,113,133,0.5)',
            1, 'rgba(225,29,72,0.8)'       // rose-600
          ],
          'heatmap-radius': ['interpolate', ['linear'], ['zoom'], 13, 30, 20, 150],
          'heatmap-opacity': ['interpolate', ['linear'], ['zoom'], 13, 0.7, 20, 0]
        }
      });

      // Thrift Heatmap
      map.addLayer({
        id: 'community-heat-thrift',
        type: 'heatmap',
        source: 'community-heat-source',
        filter: ['==', ['get', 'type'], 'thrift'],
        maxzoom: 20,
        paint: {
          'heatmap-weight': 1,
          'heatmap-intensity': ['interpolate', ['linear'], ['zoom'], 13, 1, 20, 3],
          'heatmap-color': [
            'interpolate', ['linear'], ['heatmap-density'],
            0, 'rgba(96,165,250,0)',       // transparent blue-400
            0.5, 'rgba(96,165,250,0.5)',
            1, 'rgba(37,99,235,0.8)'       // blue-600
          ],
          'heatmap-radius': ['interpolate', ['linear'], ['zoom'], 13, 30, 20, 150],
          'heatmap-opacity': ['interpolate', ['linear'], ['zoom'], 13, 0.7, 20, 0]
        }
      });

      // Business Heatmap
      map.addLayer({
        id: 'community-heat-business',
        type: 'heatmap',
        source: 'community-heat-source',
        filter: ['==', ['get', 'type'], 'business'],
        maxzoom: 20,
        paint: {
          'heatmap-weight': 1,
          'heatmap-intensity': ['interpolate', ['linear'], ['zoom'], 13, 1, 20, 3],
          'heatmap-color': [
            'interpolate', ['linear'], ['heatmap-density'],
            0, 'rgba(251,191,36,0)',       // transparent amber-400
            0.5, 'rgba(251,191,36,0.5)',
            1, 'rgba(217,119,6,0.8)'       // amber-600
          ],
          'heatmap-radius': ['interpolate', ['linear'], ['zoom'], 13, 30, 20, 150],
          'heatmap-opacity': ['interpolate', ['linear'], ['zoom'], 13, 0.7, 20, 0]
        }
      });
    }

    if (map.getLayer('community-heat-events')) {
      map.setLayoutProperty('community-heat-events', 'visibility', visible ? 'visible' : 'none');
    }
    if (map.getLayer('community-heat-thrift')) {
      map.setLayoutProperty('community-heat-thrift', 'visibility', visible ? 'visible' : 'none');
    }
    if (map.getLayer('community-heat-business')) {
      map.setLayoutProperty('community-heat-business', 'visibility', visible ? 'visible' : 'none');
    }
  }, [map, isLoaded, posts, visible]);

  return null;
};

const MOCK_COMMUNITY_POSTS = [
  {
    id: 'event-1',
    type: 'event',
    title: 'SRC Week Mega Concert',
    price: 'GHS 50',
    seller: 'UCC_SRC',
    coords: [5.115400, -1.294200],
    image: 'https://images.unsplash.com/photo-1540511546273-6c841c7b1bc0?w=400&q=80',
    description: 'Get ready for the biggest concert on campus! Featuring top artists.',
    keywords: ['party', 'music', 'dance', 'fun', 'show'],
    phone: '+233201234567'
  },
  {
    id: 'thrift-1',
    type: 'thrift',
    title: 'Selling my customized lab coat (Size M)',
    price: 'GHS 85',
    seller: 'Kobby_Science',
    coords: [5.116900, -1.290600],
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&q=80',
    description: 'Used for only one semester. Very clean.',
    keywords: ['clothes', 'labcoat', 'science', 'apparel'],
    phone: '+233201234567'
  },
  {
    id: 'thrift-2',
    type: 'thrift',
    title: 'Almost new iPhone 13 Pro Max case',
    price: 'GHS 40',
    seller: 'Ama_Levels',
    coords: [5.116795, -1.284218],
    image: 'https://images.unsplash.com/photo-1603313011101-320f666f5787?w=400&q=80',
    description: 'Black silicone case, MagSafe compatible.',
    keywords: ['phone', 'case', 'apple', 'accessories'],
    phone: '+233551234567'
  },
  {
    id: 'business-1',
    type: 'business',
    title: 'Ali\'s Shawarma & Grill',
    price: 'GHS 35+',
    seller: 'Ali_Shawarma',
    coords: [5.118900, -1.293200], // Diaspora / Amamoma area
    image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400&q=80',
    description: 'Best shawarma on campus! Beef, Chicken, and Mixed available. Delivery available.',
    keywords: ['food', 'shawama', 'shawarma', 'eat', 'hungry', 'dinner', 'grill', 'meat'],
    phone: '+233241234567'
  }
];

const POST_COLORS = {
  'business': '#f59e0b',
  'event': '#f43f5e',
  'thrift': '#3b82f6',
};

const MapView = () => {
  const { selectedCampus } = useCampus();
  const campusId = selectedCampus?.id || '';
  const [knowledgeModalData, setKnowledgeModalData] = useState(null);
  const [dbBuildings, setDbBuildings] = useState(null);
  const [dbKnowledge, setDbKnowledge] = useState({});
  const [dbGuideCards, setDbGuideCards] = useState([]);
  const [isDataLoading, setIsDataLoading] = useState(true);
  const [dataError, setDataError] = useState(null);

  const handleMapLocate = useCallback((coords) => {
    const userLngLat = [coords.longitude, coords.latitude];
    const campusCoords = selectedCampus?.coordinates;
    if (campusCoords && calculateDistance(userLngLat, [campusCoords.lng, campusCoords.lat]) > 10000) { toast.error('You are currently located off-campus! Your location cannot be mapped inside the university boundaries.'); return; }
    setUserLocation(userLngLat);
    setViewport(prev => ({ ...prev, center: userLngLat, zoom: 17 }));
  }, [selectedCampus]);

  const handleLocationSelect = useCallback((loc) => {
    let coords = null;
    if (loc.url) { const m = /^(-?\d+(\.\d+)?),\s*(-?\d+(\.\d+)?)$/.exec(loc.url); if (m) coords = [parseFloat(m[3]), parseFloat(m[1])]; }
    if (coords) {
      setViewport(prev => ({ ...prev, center: coords, zoom: 17, pitch: 45, transitionDuration: 1200 }));
      setSelectedLocation({ ...loc, coords });
      if (window.innerWidth < 1024) setIsMobileMenuOpen(false);
    } else {
      const isCoord = /^-?\d+(\.\d+)?,\s*-?\d+(\.\d+)?$/.test(loc.url);
      let url = loc.url;
      if (!isCoord && url && !url.startsWith('http')) url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(url)}`;
      if (url) window.open(url, '_blank');
    }
  }, []);

  const { buildings } = useMemo(() => CampusMapData({ onLocationSelect: handleLocationSelect }), [handleLocationSelect]);

  const getCoordinates = useCallback((url) => {
    if (!url) return null;
    const coordMatch = /^(-?\d+(\.\d+)?),\s*(-?\d+(\.\d+)?)$/.exec(url);
    if (coordMatch) {
      return [parseFloat(coordMatch[1]), parseFloat(coordMatch[3])];
    }
    return null;
  }, []);

  const openGoogleMaps = useCallback((term) => {
    const isCoordinates = /^-?\d+(\.\d+)?,\s*-?\d+(\.\d+)?$/.test(term);
    let url;
    if (isCoordinates) {
      url = `https://www.google.com/maps/search/?api=1&query=${term}`;
    } else {
      const campusName = selectedCampus?.name || 'University of Cape Coast';
      const query = term.includes(campusName) ? term : `${term} ${campusName}`;
      url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
    }
    window.open(url, '_blank');
  }, [selectedCampus]);

  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearchTerm(searchTerm), 250);
    return () => clearTimeout(t);
  }, [searchTerm]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [fullRouteData, setFullRouteData] = useState(null);
  const [activeRouteData, setActiveRouteData] = useState(null);
  const [isRouting, setIsRouting] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const [distanceRemaining, setDistanceRemaining] = useState(null);
  const [isLiveNavigating, setIsLiveNavigating] = useState(false);
  const [showBetaWarning, setShowBetaWarning] = useState(true);
  const [sidebarView, setSidebarView] = useState('locations');
  const [showCommunityLayer, setShowCommunityLayer] = useState(true);
  const [selectedCommunityPost, setSelectedCommunityPost] = useState(null);
  const [campusSwitcherOpen, setCampusSwitcherOpen] = useState(false);
  const watchIdRef = useRef(null);

  useEffect(() => {
    let cancelled = false;
    const loadData = async () => {
      try {
        const data = await fetchCampusData(campusId);
        if (!cancelled) {
          if (data.buildings && (data.source === 'db' || data.source === 'static')) setDbBuildings(data.buildings);
          if (data.knowledge && (data.source === 'db' || data.source === 'static')) setDbKnowledge(data.knowledge);
          if (data.guideCards) setDbGuideCards(data.guideCards);
        }
      } catch (err) { console.warn('[CampusMap] Data fetch failed:', err); if (!cancelled) setDataError('Could not load live campus data.'); }
      finally { if (!cancelled) setIsDataLoading(false); }
    };
    loadData();
    return () => { cancelled = true; };
  }, [campusId]);

  const resolvedBuildings = dbBuildings || (selectedCampus?.id === 'ucc' ? buildings : []);

  useEffect(() => {
    if (isLiveNavigating && fullRouteData && userLocation) {
      setActiveRouteData(truncateRouteByProximity(fullRouteData, userLocation));
      setDistanceRemaining(calculateDistance(userLocation, fullRouteData[fullRouteData.length - 1]));
    }
  }, [userLocation, fullRouteData, isLiveNavigating]);

  useEffect(() => { return () => { if (watchIdRef.current !== null) navigator.geolocation.clearWatch(watchIdRef.current); }; }, []);

  const campusCoords = selectedCampus?.coordinates || { lat: 5.116774, lng: -1.290948 };
  const defaultViewport = { center: [campusCoords.lng, campusCoords.lat], zoom: 15 };
  const [viewport, setViewport] = useState(defaultViewport);

  useEffect(() => {
    if (selectedCampus?.coordinates) {
      setViewport({
        center: [selectedCampus.coordinates.lng, selectedCampus.coordinates.lat],
        zoom: 15,
        transitionDuration: 7000
      });
    }
  }, [selectedCampus]);

  // Viewport culling: only render markers within the visible area
  const viewportBounds = useMemo(() => {
    if (!viewport?.center) return null;
    const [lng, lat] = viewport.center;
    const zoom = viewport.zoom ?? 15;
    const deg = 0.05 / Math.pow(2, 15 - zoom);
    return { minLng: lng - deg, maxLng: lng + deg, minLat: lat - deg, maxLat: lat + deg };
  }, [viewport?.center?.[0], viewport?.center?.[1], viewport?.zoom]);

  const isInViewport = useCallback((coords) => {
    if (!viewportBounds || !coords) return true;
    const [lat, lng] = coords;
    return lng >= viewportBounds.minLng && lng <= viewportBounds.maxLng &&
           lat >= viewportBounds.minLat && lat <= viewportBounds.maxLat;
  }, [viewportBounds]);

  const routeCache = useRef({});
  const startLiveTracking = useCallback((startCoord) => {
    if (watchIdRef.current !== null) navigator.geolocation.clearWatch(watchIdRef.current);
    watchIdRef.current = navigator.geolocation.watchPosition(
      (pos) => { const nl = [pos.coords.longitude, pos.coords.latitude]; setUserLocation(nl); setViewport(prev => ({ ...prev, center: nl })); },
      (err) => console.error('Live tracking error:', err),
      { enableHighAccuracy: true, maximumAge: 0, timeout: 5000 }
    );
    setViewport(prev => ({ ...prev, center: startCoord, zoom: 17, pitch: 60 })); setSelectedLocation(null);
  }, []);

  const handleRouteToLocation = useCallback(async (targetCoords) => {
    if (!navigator.geolocation) { toast.error('Geolocation is not supported by your browser'); return; }
    setIsRouting(true);
    navigator.geolocation.getCurrentPosition(async (position) => {
      const startLng = position.coords.longitude, startLat = position.coords.latitude;
      const endLat = targetCoords[0], endLng = targetCoords[1];
      const startCoord = [startLng, startLat];
      setUserLocation(startCoord);
      const cacheKey = `${startLat.toFixed(4)},${startLng.toFixed(4)}-${endLat.toFixed(4)},${endLng.toFixed(4)}`;
      const cached = routeCache.current[cacheKey];
      if (cached) {
        setFullRouteData(cached); setActiveRouteData(cached); setIsLiveNavigating(true);
        startLiveTracking(startCoord);
        setIsRouting(false);
        return;
      }
      try {
        const res = await fetch(`https://router.project-osrm.org/route/v1/foot/${startLng},${startLat};${endLng},${endLat}?geometries=geojson`);
        const data = await res.json();
        if (data.routes?.length > 0) {
          const originalRoute = data.routes[0].geometry.coordinates;
          routeCache.current[cacheKey] = originalRoute;
          setFullRouteData(originalRoute); setActiveRouteData(originalRoute); setIsLiveNavigating(true);
          startLiveTracking(startCoord);
        } else toast.error('Could not find a valid walking route to this location.');
      } catch (error) { console.error('Error fetching route:', error); toast.error('Error calculating route. Please try again.'); }
      finally { setIsRouting(false); }
    }, (error) => { console.error('Error getting location:', error); toast.error('Could not get your current location. Please ensure location services are enabled.'); setIsRouting(false); }, { enableHighAccuracy: true });
  }, [startLiveTracking]);

  const endNavigation = useCallback(() => {
    if (watchIdRef.current !== null) { navigator.geolocation.clearWatch(watchIdRef.current); watchIdRef.current = null; }
    setIsLiveNavigating(false); setFullRouteData(null); setActiveRouteData(null); setUserLocation(null); setDistanceRemaining(null);
  }, []);

  const filteredLocations = useMemo(() => {
    if (!debouncedSearchTerm) return resolvedBuildings;
    const lower = debouncedSearchTerm.toLowerCase();
    return resolvedBuildings.filter(b => b.fullName.toLowerCase().includes(lower) || (b.shortForm && b.shortForm.toLowerCase().includes(lower)) || b.description.toLowerCase().includes(lower) || (b.category && b.category.toLowerCase().includes(lower)));
  }, [resolvedBuildings, debouncedSearchTerm]);

  const filteredGuideCards = useMemo(() => {
    if (!debouncedSearchTerm || debouncedSearchTerm.length < 2) return [];
    return searchGuideCards(dbGuideCards, debouncedSearchTerm);
  }, [dbGuideCards, debouncedSearchTerm]);

  const filteredCommunityPosts = useMemo(() => {
    if (!debouncedSearchTerm) return MOCK_COMMUNITY_POSTS;
    const lower = debouncedSearchTerm.toLowerCase();
    return MOCK_COMMUNITY_POSTS.filter(post => 
      post.title?.toLowerCase().includes(lower) || 
      post.description?.toLowerCase().includes(lower) ||
      post.type?.toLowerCase().includes(lower) ||
      post.seller?.toLowerCase().includes(lower) ||
      (post.keywords && post.keywords.some(k => k.toLowerCase().includes(lower)))
    );
  }, [debouncedSearchTerm]);

  const handleCardSelect = (card) => {
    setKnowledgeModalData({ 
      title: card.fullName || card.title, 
      subtitle: card.category, 
      tags: [card.category?.charAt(0).toUpperCase() + card.category?.slice(1)], 
      guideCardContent: card.content || [{ title: 'Overview', content: card.description }], 
      _type: 'guide_card' 
    });
  };

  return (
    <div className="absolute inset-0 bg-slate-50 flex flex-col animate-in fade-in overflow-hidden">
      {isDataLoading && (
        <div className="absolute top-2 left-1/2 -translate-x-1/2 z-50 bg-white/90 backdrop-blur-sm rounded-full px-4 py-1.5 shadow-md border border-slate-200 text-xs font-medium text-slate-500 flex items-center gap-2">
          <Loader2 size={12} className="animate-spin" /> Loading campus data…
        </div>
      )}
      {dataError && !isDataLoading && (
        <div className="absolute top-2 left-1/2 -translate-x-1/2 z-50 bg-amber-50 rounded-full px-4 py-1.5 shadow-md border border-amber-200 text-xs font-medium text-amber-700 flex items-center gap-2">
          <Info size={12} /> {dataError}
        </div>
      )}
      <div className="absolute inset-0 z-0 h-full w-full">
        <Map viewport={viewport} onViewportChange={setViewport} theme="light" className="w-full h-full" minZoom={5} dragRotate={false} touchPitch={false} touchZoomRotate={true} doubleClickZoom={true}>
          <MapControls position="top-right" showZoom showCompass show3D showLocate showFullscreen onLocate={handleMapLocate} className="top-[calc(0.5rem_+_env(safe-area-inset-top,0px))] flex-row lg:flex-col" />
          {activeRouteData && <MapRoute coordinates={activeRouteData} color="#3b82f6" width={6} opacity={0.9} />}
          <CommunityHeatmap posts={filteredCommunityPosts} visible={showCommunityLayer} />
          {userLocation && (
            <MapMarker longitude={userLocation[0]} latitude={userLocation[1]} onClick={() => setViewport(prev => ({ ...prev, center: userLocation, zoom: 17, pitch: 60, transitionDuration: 1200 }))}>
              <MarkerContent><div className="relative flex items-center justify-center cursor-pointer"><div className="absolute w-8 h-8 bg-blue-500 rounded-full opacity-30 animate-ping" /><div className="relative w-4 h-4 bg-blue-600 rounded-full border-2 border-white shadow-lg" /></div></MarkerContent>
            </MapMarker>
          )}
          {filteredLocations.map(loc => {
            const coordsObj = getCoordinates(loc.url);
            if (!coordsObj) return null;
            if (!isInViewport(coordsObj)) return null;
            const [lat, lng] = coordsObj;
            const isSelected = selectedLocation?.id === loc.id;
            return (
              <MapMarker key={loc.id} longitude={lng} latitude={lat} onClick={() => handleLocationSelect(loc)}>
                <MarkerContent>
                  {isSelected
                    ? <div className="h-5 w-5 rounded-full border-2 border-white bg-primary-600 shadow-lg relative z-40" />
                    : <DefaultMarkerIcon />
                  }
                </MarkerContent>
                {viewport.zoom >= 16 && !isSelected && (
                  <MarkerLabel position="bottom" className="pointer-events-none">
                    <span className="bg-white/80 backdrop-blur-sm text-[10px] font-semibold text-slate-700 px-1.5 py-0.5 rounded shadow-sm border border-slate-200/60 whitespace-nowrap">
                      {loc.shortForm || loc.fullName}
                    </span>
                  </MarkerLabel>
                )}
                {isSelected && (
                  <MarkerPopup onClose={() => setSelectedLocation(null)}>
                    <div
                      className="w-48 text-center pt-3 pb-2 px-2 bg-white rounded-2xl shadow-xl border border-slate-100 relative z-50"
                      style={{ transformStyle: 'preserve-3d', willChange: 'transform' }}
                      onMouseMove={(e) => {
                        const rect = e.currentTarget.getBoundingClientRect()
                        const cx = rect.left + rect.width / 2
                        const cy = rect.top + rect.height / 2
                        const dx = (e.clientX - cx) / (rect.width / 2)
                        const dy = (e.clientY - cy) / (rect.height / 2)
                        e.currentTarget.style.transform = `perspective(600px) rotateX(${-dy * 12}deg) rotateY(${dx * 12}deg) scale3d(1.03, 1.03, 1.03)`
                        e.currentTarget.style.boxShadow = `${-dx * 6}px ${-dy * 6}px 15px rgba(0,0,0,0.15)`
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transition = 'transform 0.4s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.4s ease-out'
                        e.currentTarget.style.transform = ''
                        e.currentTarget.style.boxShadow = ''
                      }}
                    >
                      <h3 className="font-bold text-[13px] text-slate-900 leading-tight mb-1">{loc.fullName}</h3>
                      <p className="text-[11px] text-slate-500 mb-2 line-clamp-2">{loc.description || 'Campus location'}</p>
                      <div className="flex flex-col gap-1.5 px-2 mb-1">
                        <button onClick={() => handleRouteToLocation([lat, lng])} disabled={isRouting} className="flex items-center justify-center gap-1.5 w-full bg-slate-700 hover:bg-slate-800 text-white py-1.5 rounded-xl text-xs font-bold transition-colors">
                          {isRouting ? <Loader2 size={12} className="animate-spin" /> : <Navigation size={12} />} Route Here
                        </button>
                        <button onClick={() => {
                          const name = loc.fullName.toLowerCase();
                          let data = null;
                          for (const [key, entry] of Object.entries(dbKnowledge)) { if (name.includes(key)) { data = entry; break; } }
                          if (!data && selectedCampus?.id === 'ucc') data = getKnowledgeForLocation(loc.fullName);
                          setKnowledgeModalData(data || { title: loc.fullName, history: loc.description, architecture: 'No detailed architectural data available for this location yet.', tags: ['Info'], statistics: {} });
                        }} className="w-full text-[12px] font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 px-2 py-2 rounded-xl flex items-center justify-center gap-1.5 transition-colors shadow-sm">
                          <Info size={14} /> Read More
                        </button>
                        <button onClick={() => openGoogleMaps(loc.url)} className="w-full text-[11px] font-medium text-slate-500 hover:text-slate-700 flex items-center justify-center gap-1 transition-colors">
                          <ExternalLink size={12} /> Open in Google Maps
                        </button>
                      </div>
                    </div>
                  </MarkerPopup>
                )}
              </MapMarker>
            );
          })}

          {/* Community Layer - Rendered LAST so it sits ON TOP of buildings */}
          {showCommunityLayer && filteredCommunityPosts.filter(post => isInViewport(post.coords)).map(post => (
            <MapMarker 
              key={post.id} 
              longitude={post.coords[1]} 
              latitude={post.coords[0]} 
              onClick={(e) => {
                if (e && e.stopPropagation) e.stopPropagation();
                setSelectedCommunityPost(post);
                setSelectedLocation(null);
                setViewport(prev => ({ ...prev, center: [post.coords[1], post.coords[0]], zoom: 17.5, pitch: 45, transitionDuration: 1000 }));
              }}
            >
              <MarkerContent>
                <div 
                  className="relative flex items-center justify-center cursor-pointer group z-50"
                  onClick={(e) => {
                    if (e && e.stopPropagation) e.stopPropagation();
                    if (selectedCommunityPost?.id !== post.id) {
                      setSelectedCommunityPost(post);
                      setSelectedLocation(null);
                      setViewport(prev => ({ ...prev, center: [post.coords[1], post.coords[0]], zoom: 17.5, pitch: 45, transitionDuration: 1000 }));
                    }
                  }}
                >
                  {/* Custom SVGs for community types - Small white icons with colored square background */}
                  <div className={`relative flex items-center justify-center w-10 h-10 rounded-full cursor-pointer transition-transform ${selectedCommunityPost?.id === post.id ? 'scale-125' : 'scale-100 group-hover:scale-110'}`}>
                    <div className="absolute inset-0 bg-transparent rounded-full" />
                    <div className="relative z-10 pointer-events-none flex items-center justify-center">
                      <div className="absolute w-5 h-5 rounded-sm" style={{ backgroundColor: (POST_COLORS[post.type] || '#3b82f6') + '70' }} />
                      {post.type === 'business' ? (
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-white drop-shadow-md relative z-10">
                          <path d="M8 1.5C8 0.947715 7.55228 0.5 7 0.5C6.44772 0.5 6 0.947715 6 1.5V2.5C6 2.50686 6.00042 2.51285 6.00081 2.51843C6.00385 2.56193 6.00516 2.58063 5.79289 2.79289L5.77277 2.81298C5.50599 3.07912 5 3.58391 5 4.5V5.5C5 6.05228 5.44772 6.5 6 6.5C6.55228 6.5 7 6.05228 7 5.5V4.5C7 4.49314 6.99958 4.48715 6.99919 4.48157C6.99615 4.43807 6.99484 4.41937 7.20711 4.20711L7.22723 4.18702C7.49401 3.92088 8 3.41609 8 2.5V1.5ZM2 9C2 8.44771 2.44772 8 3 8H21C21.5523 8 22 8.44772 22 9V10C22 14.1006 19.5318 17.6248 16 19.1679V20C16 20.5523 15.5523 21 15 21H9C8.44772 21 8 20.5523 8 20V19.1679C4.46819 17.6248 2 14.1006 2 10V9ZM18 0.5C18.5523 0.5 19 0.947715 19 1.5V2.5C19 3.41609 18.494 3.92088 18.2272 4.18702L18.2071 4.20711C17.9948 4.41937 17.9962 4.43807 17.9992 4.48157C17.9996 4.48715 18 4.49314 18 4.5V5.5C18 6.05228 17.5523 6.5 17 6.5C16.4477 6.5 16 6.05228 16 5.5V4.5C16 3.58391 16.506 3.07912 16.7728 2.81298L16.7929 2.79289C17.0052 2.58063 17.0038 2.56193 17.0008 2.51843C17.0004 2.51285 17 2.50686 17 2.5V1.5C17 0.947715 17.4477 0.5 18 0.5ZM13.5 1.5C13.5 0.947715 13.0523 0.5 12.5 0.5C11.9477 0.5 11.5 0.947715 11.5 1.5V2.5C11.5 2.50686 11.5004 2.51285 11.5008 2.51843C11.5038 2.56193 11.5052 2.58063 11.2929 2.79289L11.2728 2.81298C11.006 3.07912 10.5 3.58391 10.5 4.5V5.5C10.5 6.05228 10.9477 6.5 11.5 6.5C12.0523 6.5 12.5 6.05228 12.5 5.5V4.5C12.5 4.49314 12.4996 4.48715 12.4992 4.48157C12.4962 4.43807 12.4948 4.41937 12.7071 4.20711L12.7272 4.18702C12.994 3.92088 13.5 3.41609 13.5 2.5V1.5Z"></path>
                        </svg>
                      ) : post.type === 'event' ? (
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-white drop-shadow-md relative z-10">
                          <path d="M9 1V3H15V1H17V3H21C21.5523 3 22 3.44772 22 4V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3H7V1H9ZM20 11H4V19H20V11ZM11 13V17H6V13H11ZM7 5H4V9H20V5H17V7H15V5H9V7H7V5Z"></path>
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-white drop-shadow-md relative z-10">
                          <path d="M21 13V20C21 20.5523 20.5523 21 20 21H4C3.44772 21 3 20.5523 3 20V13H2V11L3 6H21L22 11V13H21ZM5 13V19H19V13H5ZM6 14H14V17H6V14ZM3 3H21V5H3V3Z"></path>
                        </svg>
                      )}
                    </div>
                  </div>
                </div>
              </MarkerContent>
              {selectedCommunityPost?.id === post.id && (
                <MarkerPopup onClose={() => setSelectedCommunityPost(null)}>
                  <div
                    className="w-48 text-center pt-3 pb-2 px-2 bg-white rounded-2xl shadow-xl border border-slate-100 relative z-50"
                    style={{ transformStyle: 'preserve-3d', willChange: 'transform' }}
                    onMouseMove={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect()
                      const cx = rect.left + rect.width / 2
                      const cy = rect.top + rect.height / 2
                      const dx = (e.clientX - cx) / (rect.width / 2)
                      const dy = (e.clientY - cy) / (rect.height / 2)
                      e.currentTarget.style.transform = `perspective(600px) rotateX(${-dy * 12}deg) rotateY(${dx * 12}deg) scale3d(1.03, 1.03, 1.03)`
                      e.currentTarget.style.boxShadow = `${-dx * 6}px ${-dy * 6}px 15px rgba(0,0,0,0.15)`
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transition = 'transform 0.4s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.4s ease-out'
                      e.currentTarget.style.transform = ''
                      e.currentTarget.style.boxShadow = ''
                    }}
                  >
                    <h3 className="font-bold text-[13px] text-slate-900 leading-tight mb-1">{post.title}</h3>
                    <div className="flex items-center justify-center gap-2 mb-1.5">
                      {post.price && (
                        <span className="text-[11px] font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded-full">{post.price}</span>
                      )}
                      {post.seller && (
                        <span className="text-[10px] text-slate-400">by {post.seller}</span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-500 mb-2 line-clamp-2">{post.description}</p>
                    <div className="flex flex-col gap-1.5 px-2 mb-1">
                      <button onClick={() => handleRouteToLocation(post.coords)} disabled={isRouting} className="flex items-center justify-center gap-1.5 w-full bg-slate-700 hover:bg-slate-800 text-white py-1.5 rounded-xl text-xs font-bold transition-colors">
                        {isRouting ? <Loader2 size={12} className="animate-spin" /> : <Navigation size={12} />} Route Here
                      </button>
                      <button onClick={() => {
                        setKnowledgeModalData({ 
                          title: post.title, 
                          subtitle: post.seller || post.author || 'Community Post', 
                          tags: [post.type.charAt(0).toUpperCase() + post.type.slice(1)], 
                          guideCardContent: [
                            {
                              title: "Description",
                              content: post.description || post.content || 'No details available'
                            }
                          ],
                          _type: 'guide_card' 
                        });
                      }} className="w-full text-[12px] font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 px-2 py-1.5 rounded-xl flex items-center justify-center gap-1.5 transition-colors shadow-sm">
                        <Info size={14} /> Read More
                      </button>
                      <a 
                        href={`https://wa.me/${post.phone}?text=Hi, I saw your ${post.title} on Campus Guide. ${post.type === 'business' ? 'I would like to place an order.' : post.type === 'event' ? 'I would like to get a ticket.' : 'Is it still available?'}`} 
                        target="_blank" 
                        rel="noreferrer"
                        className={`w-full text-[11px] font-bold text-white py-1.5 flex items-center justify-center gap-1 rounded-xl transition-colors ${
                          post.type === 'business' ? 'bg-amber-500 hover:bg-amber-600' :
                          post.type === 'event' ? 'bg-rose-500 hover:bg-rose-600' :
                          'bg-blue-500 hover:bg-blue-600'
                        }`}
                      >
                        {post.type === 'business' ? 'Order Now →' : post.type === 'event' ? 'Get Tickets →' : 'Contact Seller →'}
                      </a>
                    </div>
                  </div>
                </MarkerPopup>
              )}
            </MapMarker>
          ))}
        </Map>

        {isLiveNavigating && distanceRemaining !== null && (
          <LiveNavigationHUD distanceRemaining={distanceRemaining} showBetaWarning={showBetaWarning} onDismissBeta={() => setShowBetaWarning(false)} onEndRoute={endNavigation} />
        )}

        <WeatherOverlay
          className="absolute top-4 left-4 lg:bottom-4 lg:right-4 lg:top-auto lg:left-auto z-30"
          showLegend={showCommunityLayer}
          legendColors={POST_COLORS}
        />

        {!isDataLoading && !dataError && resolvedBuildings.length === 0 && selectedCampus?.id !== 'ucc' && (
          <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl px-6 py-5 shadow-lg border border-slate-200 text-center max-w-xs pointer-events-auto">
              <div className="text-3xl mb-2">🗺️</div>
              <p className="text-sm font-bold text-slate-700">{selectedCampus?.name}</p>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">Campus map data not available yet. Building coordinates need to be added for this campus.</p>
            </div>
          </div>
        )}

        <CampusSearchSidebar isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} sidebarView={sidebarView} setSidebarView={setSidebarView}
          searchTerm={searchTerm} onSearchChange={setSearchTerm} filteredLocations={filteredLocations} getCoordinates={getCoordinates}
          onLocationSelect={handleLocationSelect} filteredGuideCards={filteredGuideCards} dbGuideCards={dbGuideCards} onCardSelect={handleCardSelect} 
          onCampusSwitchClick={() => setCampusSwitcherOpen(true)}
          selectedCampus={selectedCampus}
          filteredCommunityPosts={filteredCommunityPosts} onCommunityPostSelect={(post) => {
            setSelectedCommunityPost(post);
            setSelectedLocation(null);
            setViewport(prev => ({ ...prev, center: [post.coords[1], post.coords[0]], zoom: 17.5, pitch: 45, transitionDuration: 1000 }));
            if (window.innerWidth < 1024) setIsMobileMenuOpen(false);
          }}
        />
        <CampusSelectorModal isOpen={campusSwitcherOpen} onClose={() => setCampusSwitcherOpen(false)} />
      </div>

      <KnowledgeModal data={knowledgeModalData} onClose={() => setKnowledgeModalData(null)} />
    </div>
  );
};

export default MapView;

// force vite invalidate

// style refresh
