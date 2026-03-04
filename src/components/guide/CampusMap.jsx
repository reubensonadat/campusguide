import React, { useState, useMemo, useEffect } from 'react';
import { Search, MapPin, Map as MapIcon, BookOpen, Navigation, ArrowLeft, ExternalLink, X } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import CampusMapData from './content/ucc/CampusMap';
import 'leaflet/dist/leaflet.css';

// Fix for Leaflet default marker icons in React
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

// Component to handle smooth zooming (FlyTo)
const FlyToLocation = ({ center, zoom }) => {
    const map = useMap();
    useEffect(() => {
        if (center) {
            map.flyTo(center, zoom, {
                animate: true,
                duration: 1.5 // Smooth animation duration
            });
        }
    }, [center, zoom, map]);
    return null;
};

const MapView = () => {
    // Initialize data from the Guide module
    const { buildings, sections, openGoogleMaps, getCoordinates, defaultCenter } = useMemo(() => CampusMapData(), []);

    // State
    const [searchTerm, setSearchTerm] = useState('');
    const [activeTab, setActiveTab] = useState('locations'); // 'locations' | 'guide'
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(true);
    const [selectedLocation, setSelectedLocation] = useState(null); // { id, title, coords, url }
    const [mapCenter, setMapCenter] = useState(defaultCenter);
    const [mapZoom, setMapZoom] = useState(15);

    // Initial load: Try to get user location or stick to default
    useEffect(() => {
        // Optional: Add geolocation logic here if needed
        setMapCenter(defaultCenter);
    }, []);

    // Filter buildings based on search
    const filteredLocations = useMemo(() => {
        // ... (lines 53-61 same)
        if (!searchTerm) return buildings;
        const lowerTerm = searchTerm.toLowerCase();
        return buildings.filter(b =>
            b.fullName.toLowerCase().includes(lowerTerm) ||
            (b.shortForm && b.shortForm.toLowerCase().includes(lowerTerm)) ||
            b.description.toLowerCase().includes(lowerTerm)
        );
    }, [buildings, searchTerm]);

    // Handle Location Selection
    const handleLocationSelect = (loc) => {
        const coords = getCoordinates(loc.url);

        if (coords) {
            // Valid coordinates found - Zoom to map
            setMapCenter(coords);
            setMapZoom(18); // Close zoom (Safe max for OSM)
            setSelectedLocation({ ...loc, coords });

            // On mobile/tablet, close the menu to show the map
            if (window.innerWidth < 1024) {
                setIsMobileMenuOpen(false);
            }
        } else {
            // No coordinates - Just open external map (fallback)
            openGoogleMaps(loc.url);
        }
    };

    const handleNavigate = () => {
        if (selectedLocation) {
            openGoogleMaps(selectedLocation.url);
        }
    };

    return (
        <div className="flex-1 h-full w-full relative bg-gray-100 flex flex-col min-h-[400px] animate-in fade-in overflow-hidden">

            {/* --- MAP CONTAINER (LEAFLET) --- */}
            <div className="absolute inset-0 z-0 h-full w-full">
                
                <MapContainer
                    maxBounds={[[5.0900, -4.3100], [5.1500, -1.2600]]}
                    maxBoundsViscosity={1.0}
                    minZoom={14}
                    maxZoom={19}
                    center={defaultCenter}
                    zoom={15}
                    style={{ height: '100%', width: '100%' }}
                    zoomControl={false}
                 // We can add custom controls if we want, or rely on touch
                >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />

                    {/* Animated Zoom Controller */}
                    <FlyToLocation center={mapCenter} zoom={mapZoom} />

                    {/* Markers for Search Results or Selected Location */}
                    {filteredLocations.map(loc => {
                        const coords = getCoordinates(loc.url);
                        if (!coords) return null;

                        // Check if this is the selected one to highlight/open popup
                        const isSelected = selectedLocation?.id === loc.id;

                        return (
                            <Marker
                                key={loc.id}
                                position={coords}
                                eventHandlers={{
                                    click: () => handleLocationSelect(loc) // Allow clicking markers directly
                                }}
                            >
                                <Popup>
                                    <div className="text-center">
                                        <h3 className="font-bold text-sm">{loc.fullName}</h3>
                                        <p className="text-xs text-gray-500 mb-2">{loc.description}</p>
                                        <button
                                            onClick={() => openGoogleMaps(loc.url)}
                                            className="text-xs bg-indigo-600 text-white px-3 py-1 rounded-full flex items-center gap-1 mx-auto"
                                        >
                                            <Navigation size={10} /> Navigate
                                        </button>
                                    </div>
                                </Popup>
                            </Marker>
                        );
                    })}
                </MapContainer>
            </div>


            {/* --- FLOATING SIDEBAR / SEARCH --- */}
            <div className={`
                absolute top-4 left-4 z-10 bg-white shadow-2xl border border-gray-100 rounded-2xl 
                max-w-[calc(100%-2rem)] lg:max-w-md w-full flex flex-col 
                transition-all duration-300 ease-in-out
                ${isMobileMenuOpen ? 'max-h-[calc(100%-2rem)]' : 'max-h-[70px] overflow-hidden'}
            `}>
                {/* Header */}
                <div className="p-4 border-b border-gray-100 bg-white rounded-t-2xl flex-shrink-0 relative">
                    {/* Mobile Back Button (When map is focused) */}
                    {!isMobileMenuOpen && (
                        <div className="absolute left-0 top-0 bottom-0 flex items-center pl-4 lg:hidden">
                            <button onClick={() => setIsMobileMenuOpen(true)} className="p-2 bg-indigo-50 text-indigo-700 rounded-full shadow-sm border border-indigo-100">
                                <ArrowLeft className="w-5 h-5" />
                            </button>
                        </div>
                    )}

                    <div className={`flex justify-between items-center ${!isMobileMenuOpen ? 'pl-12 lg:pl-0' : ''}`}> {/* Add padding if back button is there */}
                        <h3 className="font-bold text-gray-900 text-lg flex items-center gap-2">
                            {!isMobileMenuOpen ? selectedLocation?.shortForm || 'Map View' : (
                                <>
                                    <MapIcon className="w-5 h-5 text-indigo-600" />
                                    Campus Navigation
                                </>
                            )}
                        </h3>

                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="p-1 rounded-lg bg-gray-50 text-gray-400 hover:bg-indigo-50 hover:text-indigo-600 transition-colors lg:hidden"
                        >
                            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <div className="text-xs font-bold text-indigo-600">Show List</div>}
                        </button>
                    </div>

                    {/* Tabs */}
                    <div className={`flex p-1 bg-gray-100 rounded-xl mt-4 transition-all duration-200 ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0 h-0 mt-0 overflow-hidden'}`}>
                        <button
                            onClick={() => setActiveTab('locations')}
                            className={`flex-1 flex items-center justify-center gap-2 py-2 text-sm font-bold rounded-lg transition-all ${activeTab === 'locations' ? 'bg-white text-indigo-700 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                        >
                            <MapPin className="w-4 h-4" /> Locations
                        </button>
                        <button
                            onClick={() => setActiveTab('guide')}
                            className={`flex-1 flex items-center justify-center gap-2 py-2 text-sm font-bold rounded-lg transition-all ${activeTab === 'guide' ? 'bg-white text-indigo-700 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                        >
                            <BookOpen className="w-4 h-4" /> Guide
                        </button>
                    </div>
                </div>

                {/* Content Area */}
                {isMobileMenuOpen && (
                    <div className="overflow-y-auto custom-scrollbar bg-gray-50/50 flex-1 p-4">
                        {/* LOCATIONS LIST */}
                        {activeTab === 'locations' && (
                            <div className="space-y-4">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <input
                                        type="text"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        placeholder="Search halls, faculties..."
                                        className="w-full pl-9 pr-4 py-2.5 text-sm bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-medium"
                                    />
                                </div>

                                <div className="space-y-2">
                                    {filteredLocations.map(loc => {
                                        const hasCoords = !!getCoordinates(loc.url);
                                        return (
                                            <button
                                                key={loc.id}
                                                onClick={() => handleLocationSelect(loc)}
                                                className="w-full text-left bg-white p-3 hover:bg-slate-50 border border-gray-100 hover:border-indigo-100 rounded-xl group transition-all flex justify-between items-center"
                                            >
                                                <div>
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <span className="font-bold text-gray-900 group-hover:text-indigo-700">{loc.fullName}</span>
                                                        {loc.shortForm && <span className="text-[10px] bg-gray-100 px-1.5 py-0.5 rounded font-bold uppercase text-gray-600">{loc.shortForm}</span>}
                                                    </div>
                                                    <p className="text-xs text-gray-500 line-clamp-1">{loc.description}</p>
                                                </div>
                                                {/* Icon indicating if it zooms (Map) or opens new tab (External) */}
                                                <div className="text-gray-300 group-hover:text-indigo-400">
                                                    {hasCoords ? <MapIcon className="w-4 h-4" /> : <ExternalLink className="w-4 h-4" />}
                                                </div>
                                            </button>
                                        );
                                    })}
                                    {filteredLocations.length === 0 && <p className="text-center text-gray-400 text-sm py-8">No results found.</p>}
                                </div>
                            </div>
                        )}

                        {/* GUIDE TEXT */}
                        {activeTab === 'guide' && (
                            <div className="prose prose-sm max-w-none">
                                {sections[0].content}
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* --- MOBILE ACTION FAB (When selected) --- */}
            {!isMobileMenuOpen && selectedLocation && (
                <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-[400] flex flex-col gap-3 w-[90%] max-w-sm animate-in slide-in-from-bottom-6">
                    <div className="bg-white p-4 rounded-3xl shadow-2xl border border-gray-100 flex items-center justify-between">
                        <div>
                            <h3 className="font-bold text-gray-900 text-sm">{selectedLocation.fullName}</h3>
                            <p className="text-xs text-gray-500">Tap for details</p>
                        </div>
                        <button
                            onClick={handleNavigate}
                            className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold text-sm shadow-lg shadow-indigo-500/30 flex items-center gap-2 active:scale-95 transition-transform"
                        >
                            <Navigation className="w-4 h-4" /> Navigate
                        </button>
                    </div>
                    <button
                        onClick={() => setIsMobileMenuOpen(true)}
                        className="bg-white/90 backdrop-blur-md text-gray-700 py-3 rounded-2xl font-bold text-sm border border-gray-200 shadow-lg"
                    >
                        Back to List
                    </button>
                </div>
            )}

        </div>
    );
};

export default MapView;
