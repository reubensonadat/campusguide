import React, { useState, useMemo, useCallback, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { ExternalLink, ChevronUp, ChevronDown, X as XIcon, Info, Search, Navigation, Loader2 } from 'lucide-react';
import CampusMapData from './content/ucc/CampusMap';
import { getKnowledgeForLocation } from './content/ucc/KnowledgeBase';
import { Map, MapControls, MapMarker, MarkerPopup, MarkerContent, MapRoute } from '@/components/ui/map';
import { calculateDistance, truncateRouteByProximity } from '@/utils/navigation';

const CustomMapPin = ({ className = "w-4 h-4" }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 256 256"
    className={className}
    fill="currentColor"
  >
    <path d="M184,72a56,56,0,1,0-64,55.42V232a8,8,0,0,0,16,0V127.42A56.09,56.09,0,0,0,184,72Zm-56,40a40,40,0,1,1,40-40A40,40,0,0,1,128,112Z"></path>
  </svg>
);

const MapView = () => {
    const [knowledgeModalData, setKnowledgeModalData] = useState(null);

    // Handle Map Locate
    const handleMapLocate = useCallback((coords) => {
        const userLngLat = [coords.longitude, coords.latitude];
        const uccCentroid = [-1.290810, 5.115788];
        const distToCampus = calculateDistance(userLngLat, uccCentroid);

        if (distToCampus > 10000) { // 10km away
            alert("You are currently located off-campus! Your location cannot be mapped inside the university boundaries.");
            return;
        }

        setViewport(prev => ({
            ...prev,
            center: userLngLat,
            zoom: 16
        }));
    }, []);

    // Handle Location Selection
    const handleLocationSelect = useCallback((loc) => {
        // Simple coordinate extraction
        let coords = null;
        if (loc.url) {
            const coordMatch = /^(-?\d+(\.\d+)?),\s*(-?\d+(\.\d+)?)$/.exec(loc.url);
            if (coordMatch) coords = [parseFloat(coordMatch[1]), parseFloat(coordMatch[3])];
        }

        if (coords) {
            // Valid coordinates found - Zoom to map
            const mapCoords = [coords[1], coords[0]];
            setViewport(prev => ({
                ...prev,
                center: mapCoords,
                zoom: 17,
                pitch: 45 // Add some pitch for a modern look if supported
            }));
            setSelectedLocation({ ...loc, coords: mapCoords });

            // On mobile/tablet, close the menu to show the map and popup
            if (window.innerWidth < 1024) {
                setIsMobileMenuOpen(false);
            }
        } else {
            // No coordinates - open external map (fallback)
            const isCoordinates = /^-?\d+(\.\d+)?,\s*-?\d+(\.\d+)?$/.test(loc.url);
            let url = loc.url;
            if (!isCoordinates && url && !url.startsWith('http')) {
                const query = url.includes("Cape Coast") ? url : `${url} University of Cape Coast`;
                url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
            }
            if (url) window.open(url, '_blank');
        }
    }, []);

    // Initialize data from the Guide module
    const { buildings, openGoogleMaps, getCoordinates, defaultCenter, sections } = useMemo(() => CampusMapData({ onLocationSelect: handleLocationSelect }), [handleLocationSelect]);

    // State
    const [searchTerm, setSearchTerm] = useState('');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [selectedLocation, setSelectedLocation] = useState(null); 
    const [fullRouteData, setFullRouteData] = useState(null);
    const [activeRouteData, setActiveRouteData] = useState(null);
    const [isRouting, setIsRouting] = useState(false); 
    const [userLocation, setUserLocation] = useState(null);
    const [distanceRemaining, setDistanceRemaining] = useState(null);
    const [isLiveNavigating, setIsLiveNavigating] = useState(false);
    const watchIdRef = useRef(null);

    // Dynamic Route Truncation & Distance Math
    useEffect(() => {
        if (isLiveNavigating && fullRouteData && userLocation) {
            const truncated = truncateRouteByProximity(fullRouteData, userLocation);
            setActiveRouteData(truncated);
            
            const dest = fullRouteData[fullRouteData.length - 1];
            const dist = calculateDistance(userLocation, dest);
            setDistanceRemaining(dist);
        }
    }, [userLocation, fullRouteData, isLiveNavigating]);

    // Hardware Cleanup
    useEffect(() => {
        return () => {
            if (watchIdRef.current !== null) {
                navigator.geolocation.clearWatch(watchIdRef.current);
            }
        };
    }, []);
    
    const defaultViewport = {
        center: [defaultCenter[1], defaultCenter[0]],
        zoom: 15
    };
    const [viewport, setViewport] = useState(defaultViewport);

    // Routing Logic
    const handleRouteToLocation = useCallback(async (targetCoords) => {
        if (!navigator.geolocation) {
            alert('Geolocation is not supported by your browser');
            return;
        }

        setIsRouting(true);
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const startLng = position.coords.longitude;
                const startLat = position.coords.latitude;
                const [endLat, endLng] = targetCoords;
                const startCoord = [startLng, startLat];
                setUserLocation(startCoord);

                try {
                    const response = await fetch(`https://router.project-osrm.org/route/v1/foot/${startLng},${startLat};${endLng},${endLat}?geometries=geojson`);
                    const data = await response.json();
                    
                    if (data.routes && data.routes.length > 0) {
                        const originalRoute = data.routes[0].geometry.coordinates;
                        setFullRouteData(originalRoute);
                        setActiveRouteData(originalRoute);
                        setIsLiveNavigating(true);
                        
                        // Hardware Layer: Start Live Tracking
                        if (watchIdRef.current !== null) {
                            navigator.geolocation.clearWatch(watchIdRef.current);
                        }
                        watchIdRef.current = navigator.geolocation.watchPosition(
                            (pos) => {
                                const newLoc = [pos.coords.longitude, pos.coords.latitude];
                                setUserLocation(newLoc);
                                setViewport(prev => ({
                                    ...prev,
                                    center: newLoc
                                }));
                            },
                            (err) => console.error("Live tracking error:", err),
                            { enableHighAccuracy: true, maximumAge: 0, timeout: 5000 }
                        );

                        // Center Map on User
                        setViewport(prev => ({
                            ...prev,
                            center: startCoord,
                            zoom: 17,
                            pitch: 60
                        }));
                        setSelectedLocation(null); // Close popup
                    } else {
                        alert('Could not find a valid walking route to this location.');
                    }
                } catch (error) {
                    console.error('Error fetching route:', error);
                    alert('Error calculating route. Please try again.');
                } finally {
                    setIsRouting(false);
                }
            },
            (error) => {
                console.error('Error getting location:', error);
                alert('Could not get your current location. Please ensure location services are enabled.');
                setIsRouting(false);
            },
            { enableHighAccuracy: true }
        );
    }, []);

    const endNavigation = useCallback(() => {
        if (watchIdRef.current !== null) {
            navigator.geolocation.clearWatch(watchIdRef.current);
            watchIdRef.current = null;
        }
        setIsLiveNavigating(false);
        setFullRouteData(null);
        setActiveRouteData(null);
        setUserLocation(null);
        setDistanceRemaining(null);
    }, []);

    // Filter buildings based on search
    const filteredLocations = useMemo(() => {
        if (!searchTerm) return buildings;
        const lowerTerm = searchTerm.toLowerCase();
        return buildings.filter(b =>
            b.fullName.toLowerCase().includes(lowerTerm) ||
            (b.shortForm && b.shortForm.toLowerCase().includes(lowerTerm)) ||
            b.description.toLowerCase().includes(lowerTerm)
        );
    }, [buildings, searchTerm]);

    // Boundary for UCC to restrict infinite scrolling
    const maxBounds = [
        [-1.3100, 5.0900], // Southwest coordinates (lng, lat)
        [-1.2600, 5.1400]  // Northeast coordinates (lng, lat)
    ];

    return (
        <div className="flex-1 h-full w-full relative bg-slate-50 flex flex-col animate-in fade-in overflow-hidden">
            {/* --- MAP CONTAINER --- */}
            <div className="absolute inset-0 z-0 h-full w-full">
                <Map 
                    viewport={viewport}
                    onViewportChange={setViewport}
                    theme="light"
                    className="w-full h-full"
                    maxBounds={maxBounds}
                    minZoom={13}
                >
                    <MapControls position="top-right" showZoom showCompass showLocate onLocate={handleMapLocate} />

                    {/* Active Route */}
                    {activeRouteData && (
                        <MapRoute coordinates={activeRouteData} color="#3b82f6" width={6} opacity={0.9} />
                    )}

                    {/* Live User Marker */}
                    {isLiveNavigating && userLocation && (
                        <MapMarker longitude={userLocation[0]} latitude={userLocation[1]}>
                            <MarkerContent>
                                <div className="relative flex items-center justify-center">
                                    <div className="absolute w-8 h-8 bg-blue-500 rounded-full opacity-30 animate-ping" />
                                    <div className="relative w-4 h-4 bg-blue-600 rounded-full border-2 border-white shadow-lg" />
                                </div>
                            </MarkerContent>
                        </MapMarker>
                    )}

                    {/* Markers for Search Results or Selected Location */}
                    {filteredLocations.map(loc => {
                        const coords = getCoordinates(loc.url);
                        if (!coords) return null;

                        const [lat, lng] = coords;
                        const isSelected = selectedLocation?.id === loc.id;

                        return (
                            <MapMarker
                                key={loc.id}
                                longitude={lng}
                                latitude={lat}
                                onClick={() => handleLocationSelect(loc)}
                            >
                                <MarkerContent>
                                    <div className={`relative h-4 w-4 rounded-full border-2 border-white shadow-lg transition-transform ${isSelected ? 'bg-primary-600 scale-125 z-10' : 'bg-slate-500 scale-100'}`} />
                                </MarkerContent>
                                {isSelected && (
                                    <MarkerPopup onClose={() => setSelectedLocation(null)}>
                                        <div className="w-48 text-center pt-3 pb-2 px-2 bg-white rounded-2xl shadow-xl border border-slate-100">
                                            <h3 className="font-bold text-[13px] text-slate-900 leading-tight mb-1">{loc.fullName}</h3>
                                            <p className="text-[11px] text-slate-500 mb-3 leading-tight">{loc.description}</p>
                                            <div className="flex flex-col gap-2 mt-2">
                                                <button
                                                    onClick={() => handleRouteToLocation([lat, lng])}
                                                    disabled={isRouting}
                                                    className="w-full text-[12px] font-bold bg-primary-600 hover:bg-primary-700 text-white px-2 py-2 rounded-xl flex items-center justify-center gap-1.5 transition-colors shadow-sm disabled:opacity-70 disabled:cursor-not-allowed"
                                                >
                                                    {isRouting ? <Loader2 size={14} className="animate-spin" /> : <Navigation size={14} />} 
                                                    {isRouting ? 'Calculating...' : 'Route Here'}
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        const data = getKnowledgeForLocation(loc.fullName);
                                                        setKnowledgeModalData(data || { 
                                                            title: loc.fullName, 
                                                            history: loc.description,
                                                            architecture: "No detailed architectural data available for this location yet.",
                                                            tags: ["Info"],
                                                            statistics: {}
                                                        });
                                                    }}
                                                    className="w-full text-[12px] font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 px-2 py-2 rounded-xl flex items-center justify-center gap-1.5 transition-colors shadow-sm"
                                                >
                                                    <Info size={14} /> Read More
                                                </button>

                                                <button
                                                    onClick={() => openGoogleMaps(loc.url)}
                                                    className="w-full text-[11px] font-medium text-slate-500 hover:text-slate-700 flex items-center justify-center gap-1 transition-colors"
                                                >
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

                {/* Live Navigation HUD */}
                {isLiveNavigating && distanceRemaining !== null && (
                    <div className="absolute top-6 left-1/2 -translate-x-1/2 z-30 bg-white/95 backdrop-blur-md shadow-2xl border border-slate-200/60 rounded-2xl px-8 py-4 flex flex-col items-center animate-in slide-in-from-top-4">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Remaining Distance</span>
                        <span className="text-4xl font-black text-slate-800 tracking-tight">
                            {distanceRemaining > 1000 
                                ? `${(distanceRemaining / 1000).toFixed(1)} km` 
                                : `${Math.round(distanceRemaining)} m`}
                        </span>
                        <button
                            onClick={endNavigation}
                            className="mt-3 bg-red-50 hover:bg-red-100 text-red-600 text-[11px] font-bold px-4 py-2 rounded-full flex items-center gap-1.5 transition-colors uppercase tracking-wide"
                        >
                            <XIcon size={12} /> End Route
                        </button>
                    </div>
                )}
            </div>

            {/* --- FLOATING DESKTOP SIDEBAR / MOBILE BOTTOM SHEET --- */}
            <div className={`
                absolute z-20 bg-white shadow-xl border border-slate-200/60 transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] flex flex-col overflow-hidden
                
                /* Desktop positioning (left sidebar) */
                lg:top-4 lg:left-4 lg:bottom-auto lg:rounded-2xl lg:w-96 lg:max-h-[calc(100vh-8rem)]
                
                /* Mobile positioning (floating above tab bar) */
                bottom-[84px] left-3 right-3 rounded-2xl
                ${isMobileMenuOpen ? 'top-20 lg:top-4' : 'h-auto lg:top-4 lg:h-auto'}
            `}>
                {/* Header / Search Bar */}
                <div className="px-3 py-3 bg-white flex-shrink-0 relative border-b border-slate-100 flex items-center gap-3">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onFocus={() => window.innerWidth < 1024 && setIsMobileMenuOpen(true)}
                            placeholder="Search locations..."
                            className="w-full pl-9 pr-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all font-medium"
                        />
                    </div>

                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="p-2 rounded-xl text-slate-500 hover:bg-slate-100 hover:text-primary-600 transition-colors lg:hidden bg-slate-50 border border-slate-200 shadow-sm"
                    >
                        {isMobileMenuOpen ? <ChevronDown className="w-5 h-5" /> : <ChevronUp className="w-5 h-5" />}
                    </button>
                </div>

                {/* Content Area (Locations List) */}
                <div className={`overflow-y-auto custom-scrollbar bg-slate-50/50 flex-1 p-2 transition-all duration-300 ${!isMobileMenuOpen && (typeof window !== 'undefined' && window.innerWidth < 1024) ? 'opacity-0 h-0 hidden lg:block lg:h-auto lg:opacity-100' : 'opacity-100 block'}`}>
                    <div className="space-y-1.5">
                        {filteredLocations.map(loc => {
                            const hasCoords = !!getCoordinates(loc.url);
                            return (
                                <button
                                    key={loc.id}
                                    onClick={() => handleLocationSelect(loc)}
                                    className="w-full text-left bg-white p-3 hover:bg-primary-50/50 border border-slate-100 hover:border-primary-100 rounded-xl group transition-all flex justify-between items-center shadow-sm"
                                >
                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="font-bold text-slate-900 group-hover:text-primary-700 text-sm">{loc.fullName}</span>
                                            {loc.shortForm && <span className="text-[10px] bg-slate-100 px-1.5 py-0.5 rounded font-black uppercase text-slate-600">{loc.shortForm}</span>}
                                        </div>
                                        <p className="text-[11px] text-slate-500 line-clamp-1">{loc.description}</p>
                                    </div>
                                    <div className="text-slate-300 group-hover:text-primary-400 flex-shrink-0 ml-2 bg-slate-50 p-1.5 rounded-lg">
                                        {hasCoords ? <CustomMapPin className="w-4 h-4" /> : <ExternalLink className="w-3.5 h-3.5" />}
                                    </div>
                                </button>
                            );
                        })}
                        {filteredLocations.length === 0 && <p className="text-center text-slate-400 text-sm py-8 font-medium">No results found.</p>}
                    </div>
                </div>
            </div>

            {/* RICH KNOWLEDGE MODAL (BOTTOM SHEET) */}
            {knowledgeModalData && typeof document !== 'undefined' && createPortal(
                <div className="fixed inset-0 z-[99999] flex items-end justify-center sm:items-center p-0 sm:p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
                    {/* Background click to close */}
                    <div className="absolute inset-0" onClick={() => setKnowledgeModalData(null)}></div>
                    
                    <div className="relative bg-white rounded-t-3xl sm:rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl animate-in slide-in-from-bottom sm:zoom-in-95 duration-300 flex flex-col max-h-[66vh]">
                        {/* Drag Handle for mobile */}
                        <div className="pt-3 pb-1 flex justify-center items-center w-full shrink-0 sm:hidden">
                            <div className="w-12 h-1.5 bg-slate-200 rounded-full"></div>
                        </div>

                        {/* Header (No Image) */}
                        <div className="flex items-start justify-between px-6 pt-2 sm:pt-6 pb-2 shrink-0">
                            <h2 className="text-2xl font-black text-slate-900 leading-tight pr-4">
                                {knowledgeModalData.title}
                            </h2>
                            <button 
                                onClick={() => setKnowledgeModalData(null)}
                                className="bg-slate-100 hover:bg-slate-200 text-slate-500 p-2 rounded-full transition-colors shrink-0"
                            >
                                <XIcon size={20} />
                            </button>
                        </div>
                        
                        {/* Scrollable Content */}
                        <div className="p-6 overflow-y-auto flex-1 overscroll-contain">
                            {/* Tags */}
                            {knowledgeModalData.tags && knowledgeModalData.tags.length > 0 && (
                                <div className="flex flex-wrap gap-2 mb-6">
                                    {knowledgeModalData.tags.map(tag => (
                                        <span key={tag} className="px-3 py-1 bg-primary-50 text-primary-700 text-[10px] font-bold uppercase tracking-wider rounded-full">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            )}

                            {/* History */}
                            <div className="mb-6">
                                <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Historical Context</h3>
                                <p className="text-sm text-slate-600 leading-relaxed">{knowledgeModalData.history}</p>
                            </div>

                            {/* Architecture */}
                            <div className="mb-6">
                                <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Architecture & Function</h3>
                                <p className="text-sm text-slate-600 leading-relaxed">{knowledgeModalData.architecture}</p>
                            </div>

                            {/* Statistics Grid */}
                            {knowledgeModalData.statistics && Object.keys(knowledgeModalData.statistics).length > 0 && (
                                <div className="mb-6">
                                    <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Verified Data Points</h3>
                                    <div className="grid grid-cols-2 gap-3">
                                        {Object.entries(knowledgeModalData.statistics).map(([key, val]) => (
                                            <div key={key} className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                                                <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">{key}</div>
                                                <div className="text-xs font-bold text-slate-800">{val}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Disclaimer */}
                            {knowledgeModalData.disclaimer && (
                                <p className="text-[10px] text-slate-400 italic text-center mt-8 pb-4 border-t border-slate-100 pt-4">
                                    {knowledgeModalData.disclaimer}
                                </p>
                            )}
                        </div>
                    </div>
                </div>,
                document.body
            )}
        </div>
    );
};

export default MapView;
