import React, { useState, useMemo, useCallback, useRef, useEffect } from 'react';
import { ExternalLink, Info, Navigation, Loader2, Search } from 'lucide-react';
import CampusMapData from './content/ucc/CampusMap';
import { getKnowledgeForLocation } from './content/ucc/KnowledgeBase';
import { fetchCampusData, searchGuideCards } from '@/services/campusDataService';
import { Map, MapControls, MapMarker, MarkerPopup, MarkerContent, MapRoute, DefaultMarkerIcon } from '@/components/ui/map';
import { calculateDistance, truncateRouteByProximity } from '@/utils/navigation';
import LiveNavigationHUD from './LiveNavigationHUD';
import CampusSearchSidebar from './CampusSearchSidebar';
import KnowledgeModal from './KnowledgeModal';

const MapView = () => {
  const [knowledgeModalData, setKnowledgeModalData] = useState(null);
  const [dbBuildings, setDbBuildings] = useState(null);
  const [dbKnowledge, setDbKnowledge] = useState({});
  const [dbGuideCards, setDbGuideCards] = useState([]);
  const [isDataLoading, setIsDataLoading] = useState(true);

  const handleMapLocate = useCallback((coords) => {
    const userLngLat = [coords.longitude, coords.latitude];
    if (calculateDistance(userLngLat, [-1.290810, 5.115788]) > 10000) { alert('You are currently located off-campus! Your location cannot be mapped inside the university boundaries.'); return; }
    setUserLocation(userLngLat);
    setViewport(prev => ({ ...prev, center: userLngLat, zoom: 17 }));
  }, []);

  const handleLocationSelect = useCallback((loc) => {
    let coords = null;
    if (loc.url) { const m = /^(-?\d+(\.\d+)?),\s*(-?\d+(\.\d+)?)$/.exec(loc.url); if (m) coords = [parseFloat(m[3]), parseFloat(m[1])]; }
    if (coords) {
      setViewport(prev => ({ ...prev, center: coords, zoom: 17, pitch: 0, transitionDuration: 1200 }));
      setSelectedLocation({ ...loc, coords });
      if (window.innerWidth < 1024) setIsMobileMenuOpen(false);
    } else {
      const isCoord = /^-?\d+(\.\d+)?,\s*-?\d+(\.\d+)?$/.test(loc.url);
      let url = loc.url;
      if (!isCoord && url && !url.startsWith('http')) url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(url.includes('Cape Coast') ? url : `${url} University of Cape Coast`)}`;
      if (url) window.open(url, '_blank');
    }
  }, []);

  const { buildings, openGoogleMaps, getCoordinates, defaultCenter } = useMemo(() => CampusMapData({ onLocationSelect: handleLocationSelect }), [handleLocationSelect]);

  const [searchTerm, setSearchTerm] = useState('');
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
  const watchIdRef = useRef(null);

  useEffect(() => {
    let cancelled = false;
    const loadData = async () => {
      try {
        const data = await fetchCampusData('ucc');
        if (!cancelled) {
          if (data.buildings && data.source === 'db') setDbBuildings(data.buildings);
          if (data.knowledge && data.source === 'db') setDbKnowledge(data.knowledge);
          if (data.guideCards) setDbGuideCards(data.guideCards);
        }
      } catch (err) { console.warn('[CampusMap] Data fetch failed, using static fallback:', err); }
      finally { if (!cancelled) setIsDataLoading(false); }
    };
    loadData();
    return () => { cancelled = true; };
  }, []);

  const resolvedBuildings = dbBuildings || buildings;

  useEffect(() => {
    if (isLiveNavigating && fullRouteData && userLocation) {
      setActiveRouteData(truncateRouteByProximity(fullRouteData, userLocation));
      setDistanceRemaining(calculateDistance(userLocation, fullRouteData[fullRouteData.length - 1]));
    }
  }, [userLocation, fullRouteData, isLiveNavigating]);

  useEffect(() => { return () => { if (watchIdRef.current !== null) navigator.geolocation.clearWatch(watchIdRef.current); }; }, []);

  const defaultViewport = { center: [defaultCenter[1], defaultCenter[0]], zoom: 15 };
  const [viewport, setViewport] = useState(defaultViewport);

  const handleRouteToLocation = useCallback(async (targetCoords) => {
    if (!navigator.geolocation) { alert('Geolocation is not supported by your browser'); return; }
    setIsRouting(true);
    navigator.geolocation.getCurrentPosition(async (position) => {
      const startLng = position.coords.longitude, startLat = position.coords.latitude;
      const endLat = targetCoords[0], endLng = targetCoords[1];
      const startCoord = [startLng, startLat];
      setUserLocation(startCoord);
      try {
        const res = await fetch(`https://router.project-osrm.org/route/v1/foot/${startLng},${startLat};${endLng},${endLat}?geometries=geojson`);
        const data = await res.json();
        if (data.routes?.length > 0) {
          const originalRoute = data.routes[0].geometry.coordinates;
          setFullRouteData(originalRoute); setActiveRouteData(originalRoute); setIsLiveNavigating(true);
          if (watchIdRef.current !== null) navigator.geolocation.clearWatch(watchIdRef.current);
          watchIdRef.current = navigator.geolocation.watchPosition((pos) => { const nl = [pos.coords.longitude, pos.coords.latitude]; setUserLocation(nl); setViewport(prev => ({ ...prev, center: nl })); }, (err) => console.error('Live tracking error:', err), { enableHighAccuracy: true, maximumAge: 0, timeout: 5000 });
          setViewport(prev => ({ ...prev, center: startCoord, zoom: 17, pitch: 60 })); setSelectedLocation(null);
        } else alert('Could not find a valid walking route to this location.');
      } catch (error) { console.error('Error fetching route:', error); alert('Error calculating route. Please try again.'); }
      finally { setIsRouting(false); }
    }, (error) => { console.error('Error getting location:', error); alert('Could not get your current location. Please ensure location services are enabled.'); setIsRouting(false); }, { enableHighAccuracy: true });
  }, []);

  const endNavigation = useCallback(() => {
    if (watchIdRef.current !== null) { navigator.geolocation.clearWatch(watchIdRef.current); watchIdRef.current = null; }
    setIsLiveNavigating(false); setFullRouteData(null); setActiveRouteData(null); setUserLocation(null); setDistanceRemaining(null);
  }, []);

  const filteredLocations = useMemo(() => {
    if (!searchTerm) return resolvedBuildings;
    const lower = searchTerm.toLowerCase();
    return resolvedBuildings.filter(b => b.fullName.toLowerCase().includes(lower) || (b.shortForm && b.shortForm.toLowerCase().includes(lower)) || b.description.toLowerCase().includes(lower) || (b.category && b.category.toLowerCase().includes(lower)));
  }, [resolvedBuildings, searchTerm]);

  const filteredGuideCards = useMemo(() => {
    if (!searchTerm || searchTerm.length < 2) return [];
    return searchGuideCards(dbGuideCards, searchTerm);
  }, [dbGuideCards, searchTerm]);

  const maxBounds = [[-1.3100, 5.0900], [-1.2600, 5.1400]];

  const handleCardSelect = (card) => {
    setKnowledgeModalData({ title: card.title, subtitle: card.subtitle, tags: [card.category.charAt(0).toUpperCase() + card.category.slice(1)], guideCardContent: card.content, _type: 'guide_card' });
  };

  return (
    <div className="absolute inset-0 bg-slate-50 flex flex-col animate-in fade-in overflow-hidden">
      <div className="absolute inset-0 z-0 h-full w-full">
        <Map viewport={viewport} onViewportChange={setViewport} theme="light" className="w-full h-full" maxBounds={maxBounds} minZoom={13}>
          <MapControls position="top-right" showZoom showCompass showLocate onLocate={handleMapLocate} className="top-[calc(0.5rem_+_env(safe-area-inset-top,0px))]" />
          {activeRouteData && <MapRoute coordinates={activeRouteData} color="#3b82f6" width={6} opacity={0.9} />}
          {userLocation && (
            <MapMarker longitude={userLocation[0]} latitude={userLocation[1]} onClick={() => setViewport(prev => ({ ...prev, center: userLocation, zoom: 17, pitch: 60, transitionDuration: 1200 }))}>
              <MarkerContent><div className="relative flex items-center justify-center cursor-pointer"><div className="absolute w-8 h-8 bg-blue-500 rounded-full opacity-30 animate-ping" /><div className="relative w-4 h-4 bg-blue-600 rounded-full border-2 border-white shadow-lg" /></div></MarkerContent>
            </MapMarker>
          )}
          {filteredLocations.map(loc => {
            const coordsObj = getCoordinates(loc.url);
            if (!coordsObj) return null;
            const [lat, lng] = coordsObj;
            const isSelected = selectedLocation?.id === loc.id;
            return (
              <MapMarker key={loc.id} longitude={lng} latitude={lat} onClick={() => handleLocationSelect(loc)}>
                <MarkerContent>
                  {isSelected
                    ? <div className="h-5 w-5 rounded-full border-2 border-white bg-primary-600 shadow-lg" />
                    : <DefaultMarkerIcon />
                  }
                </MarkerContent>
                {isSelected && (
                  <MarkerPopup onClose={() => setSelectedLocation(null)}>
                    <div className="w-48 text-center pt-3 pb-2 px-2 bg-white rounded-2xl shadow-xl border border-slate-100">
                      <h3 className="font-bold text-[13px] text-slate-900 leading-tight mb-1">{loc.fullName}</h3>
                      <p className="text-[11px] text-slate-500 mb-3 leading-tight">{loc.description}</p>
                      <div className="flex flex-col gap-2 mt-2">
                        <button onClick={() => handleRouteToLocation([lat, lng])} disabled={isRouting} className="w-full text-[12px] font-bold bg-primary-600 hover:bg-primary-700 text-white px-2 py-2 rounded-xl flex items-center justify-center gap-1.5 transition-colors shadow-sm disabled:opacity-70 disabled:cursor-not-allowed">
                          {isRouting ? <Loader2 size={14} className="animate-spin" /> : <Navigation size={14} />}{isRouting ? 'Calculating...' : 'Route Here'}
                        </button>
                        <button onClick={() => {
                          const name = loc.fullName.toLowerCase();
                          let data = null;
                          for (const [key, entry] of Object.entries(dbKnowledge)) { if (name.includes(key)) { data = entry; break; } }
                          if (!data) data = getKnowledgeForLocation(loc.fullName);
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
        </Map>

        {isLiveNavigating && distanceRemaining !== null && (
          <LiveNavigationHUD distanceRemaining={distanceRemaining} showBetaWarning={showBetaWarning} onDismissBeta={() => setShowBetaWarning(false)} onEndRoute={endNavigation} />
        )}

        <CampusSearchSidebar isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} sidebarView={sidebarView} setSidebarView={setSidebarView}
          searchTerm={searchTerm} onSearchChange={setSearchTerm} filteredLocations={filteredLocations} getCoordinates={getCoordinates}
          onLocationSelect={handleLocationSelect} filteredGuideCards={filteredGuideCards} dbGuideCards={dbGuideCards} onCardSelect={handleCardSelect} />
      </div>

      <KnowledgeModal data={knowledgeModalData} onClose={() => setKnowledgeModalData(null)} />
    </div>
  );
};

export default MapView;

// force vite invalidate
