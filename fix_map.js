const fs = require('fs');
const content = fs.readFileSync('src/components/guide/CampusMap.jsx', 'utf8');

const newReturn = 
  return (
    <div className=\"absolute inset-0 bg-slate-50 flex flex-col animate-in fade-in overflow-hidden\">
      <div className=\"absolute inset-0 z-0 h-full w-full\">
        <Map viewport={viewport} onViewportChange={setViewport} theme=\"light\" className=\"w-full h-full\" maxBounds={maxBounds} minZoom={13}>
          <MapControls position=\"top-right\" showZoom showCompass show3D showLocate onLocate={handleMapLocate} className=\"top-[calc(0.5rem_+_env(safe-area-inset-top,0px))]\" />
          {activeRouteData && <MapRoute coordinates={activeRouteData} color=\"#3b82f6\" width={6} opacity={0.9} />}
          <CommunityHeatmap posts={MOCK_COMMUNITY_POSTS} visible={showCommunityLayer} />
          {userLocation && (
            <MapMarker longitude={userLocation[0]} latitude={userLocation[1]} onClick={() => setViewport(prev => ({ ...prev, center: userLocation, zoom: 17, pitch: 60, transitionDuration: 1200 }))}>
              <MarkerContent><div className=\"relative flex items-center justify-center cursor-pointer\"><div className=\"absolute w-8 h-8 bg-blue-500 rounded-full opacity-30 animate-ping\" /><div className=\"relative w-4 h-4 bg-blue-600 rounded-full border-2 border-white shadow-lg\" /></div></MarkerContent>
            </MapMarker>
          )}

          {/* Buildings Layer */}
          {filteredLocations.map(loc => {
            const coordsObj = getCoordinates(loc.url);
            if (!coordsObj) return null;
            const [lat, lng] = coordsObj;
            const isSelected = selectedLocation?.id === loc.id;
            return (
              <MapMarker key={loc.id} longitude={lng} latitude={lat} onClick={() => handleLocationSelect(loc)}>
                <MarkerContent>
                  {isSelected
                    ? <div className=\"h-5 w-5 rounded-full border-2 border-white bg-primary-600 shadow-lg relative z-40\" />
                    : <DefaultMarkerIcon />
                  }
                </MarkerContent>
                {isSelected && (
                  <MarkerPopup onClose={() => setSelectedLocation(null)}>
                    <div className=\"w-48 text-center pt-3 pb-2 px-2 bg-white rounded-2xl shadow-xl border border-slate-100 relative z-50\">
                      <h3 className=\"font-bold text-[13px] text-slate-900 leading-tight mb-1\">{loc.fullName}</h3>
                      <p className=\"text-[11px] text-slate-500 mb-2 line-clamp-2\">{loc.description || 'Campus location'}</p>
                      <div className=\"flex flex-col gap-1.5 px-2 mb-1\">
                        <button onClick={() => handleRouteToLocation([lat, lng])} disabled={isRouting} className=\"flex items-center justify-center gap-1.5 w-full bg-slate-700 hover:bg-slate-800 text-white py-1.5 rounded-xl text-xs font-bold transition-colors\">
                          {isRouting ? <Loader2 size={12} className=\"animate-spin\" /> : <Navigation size={12} />} Route Here
                        </button>
                        <button onClick={() => handleCardSelect(loc)} className=\"flex items-center justify-center gap-1.5 w-full bg-slate-100 hover:bg-slate-200 text-slate-700 py-1.5 rounded-xl text-xs font-bold transition-colors\">
                          <Info size={12} /> Read More
                        </button>
                      </div>
                      {loc.url && <a href={loc.url} target=\"_blank\" rel=\"noreferrer\" className=\"text-[9px] text-slate-400 hover:text-primary-600 font-medium inline-flex items-center gap-1 mt-1\"><ExternalLink size={9} /> Open in Google Maps</a>}
                    </div>
                  </MarkerPopup>
                )}
              </MapMarker>
            );
          })}

          {/* Community Layer - Rendered LAST so it sits ON TOP of buildings */}
          {showCommunityLayer && MOCK_COMMUNITY_POSTS.map(post => (
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
                <div className=\"relative flex items-center justify-center cursor-pointer group z-50\">
                  <div className={\elative flex items-center justify-center h-8 w-8 rounded-full border-2 shadow-lg transition-transform \ \\}>
                    {post.type === 'thrift' ? <ShoppingBag size={14} className=\"text-white\" /> : <MessageCircle size={14} className=\"text-white\" />}
                  </div>
                </div>
              </MarkerContent>
              {selectedCommunityPost?.id === post.id && (
                <MarkerPopup onClose={() => setSelectedCommunityPost(null)}>
                  {post.type === 'thrift' ? (
                    <div className=\"w-64 bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden relative z-50\">
                      <div className=\"h-32 w-full bg-slate-100 relative\">
                        <img src={post.image} alt={post.title} className=\"w-full h-full object-cover\" />
                        <div className=\"absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg text-xs font-black text-orange-600 shadow-sm\">
                          {post.price}
                        </div>
                      </div>
                      <div className=\"p-3\">
                        <h3 className=\"font-bold text-[13px] text-slate-900 leading-tight mb-1 line-clamp-2\">{post.title}</h3>
                        <p className=\"text-[11px] text-slate-500 mb-3 line-clamp-2\">{post.description}</p>
                        <a 
                          href={\https://wa.me/\?text=Hi, I saw your \ on Campus Guide.\} 
                          target=\"_blank\" 
                          rel=\"noreferrer\"
                          className=\"flex items-center justify-center gap-1.5 w-full bg-green-500 hover:bg-green-600 text-white py-1.5 rounded-xl text-xs font-bold transition-colors\"
                        >
                          <MessageCircle size={12} /> Contact Seller
                        </a>
                      </div>
                    </div>
                  ) : (
                    <div className=\"w-56 bg-white rounded-2xl shadow-xl border border-slate-100 p-3 relative z-50\">
                      <div className=\"flex items-center gap-2 mb-2\">
                        <div className=\"w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center\">
                          <span className=\"text-[10px] font-black text-purple-600\">{post.author.charAt(0)}</span>
                        </div>
                        <span className=\"text-[10px] font-bold text-slate-500\">@{post.author}</span>
                      </div>
                      <p className=\"text-xs text-slate-900 font-medium\">{post.content}</p>
                    </div>
                  )}
                </MarkerPopup>
              )}
            </MapMarker>
          ))}
        </Map>
      </div>
      <LiveNavigationHUD destination={selectedLocation} />
      {showBetaWarning && (
        <div className=\"absolute bottom-4 left-1/2 -translate-x-1/2 bg-slate-900/80 backdrop-blur text-white text-[10px] py-1 px-3 rounded-full flex items-center gap-2 shadow-lg\">
          <Info size={10} className=\"text-blue-400\" />
          Map is in beta. Report inaccuracies.
          <button onClick={() => setShowBetaWarning(false)} className=\"ml-1 p-0.5 hover:bg-white/20 rounded-full\"><X size={10} /></button>
        </div>
      )}
      {knowledgeModalData && <KnowledgeModal data={knowledgeModalData} onClose={() => setKnowledgeModalData(null)} />}
    </div>
  );
};

export default MapView;
\;

const startIdx = content.indexOf('  return (');
const finalStr = content.substring(0, startIdx) + newReturn;
fs.writeFileSync('src/components/guide/CampusMap.jsx', finalStr);

