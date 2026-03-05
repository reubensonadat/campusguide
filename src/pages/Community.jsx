import React, { useState } from 'react';
import { Megaphone, ChevronRight, Sparkles, Star } from 'lucide-react';
import CommunityCard from '../components/community/CommunityCard';
import { useNavigate } from 'react-router-dom';

import { supabase } from '../lib/supabase';

// Categories matching Advertise.jsx options
const CATEGORIES = [
    { id: 'all', label: 'All Listings' },
    { id: 'update', label: 'School Updates' },
    { id: 'food', label: 'Food & Delivery' },
    { id: 'services', label: 'Student Services' },
    { id: 'event', label: 'School event' },
    { id: 'tech', label: 'Tech & Electronics' },
    { id: 'clothing', label: 'Clothing & Fashion' },


];

const Community = () => {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [feedData, setFeedData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    React.useEffect(() => {
        window.scrollTo(0, 0);

        const fetchCommunityData = async () => {
            setIsLoading(true);
            try {
                // 1. Fetch Active Advertisements
                const { data: adsData, error: adsError } = await supabase
                    .from('advertisements')
                    .select('*')
                    .ilike('status', 'active'); // Handle 'Active', 'ACTIVE', 'active'

                if (adsError) throw adsError;

                // 2. Fetch University Announcements
                const { data: announcementsData, error: annError } = await supabase
                    .from('announcements')
                    .select('*');

                if (annError) throw annError;

                // 3. Format Ads for CommunityCard
                const formattedAds = (adsData || []).map(ad => {
                    let actionText = 'Message via WhatsApp';
                    let link = '#';

                    const cleanPhone = ad.phone_number ? ad.phone_number.replace(/\D/g, '') : '';

                    if (ad.contact_method === 'link' && ad.contact_url) {
                        actionText = 'Visit Link';
                        link = ad.contact_url;
                    } else if (ad.contact_method === 'phone') {
                        actionText = 'Call Now';
                        link = cleanPhone ? `tel:+${cleanPhone}` : '#';
                    } else {
                        // Default to WhatsApp
                        actionText = 'Message via WhatsApp';
                        link = cleanPhone
                            ? `https://wa.me/${cleanPhone}?text=${encodeURIComponent(`Hello! I saw your advertisement for "${ad.title}" on the UCC Campus Guide app and I'm interested in finding out more.`)}`
                            : '#';
                    }

                    return {
                        id: `ad-${ad.id}`,
                        type: 'ad',
                        category: ad.category,
                        title: ad.title,
                        description: ad.description,
                        image: ad.image_url,
                        actionText: actionText,
                        link: link,
                        createdAt: new Date(ad.created_at).getTime(),
                    };
                });

                // 4. Format Announcements for CommunityCard
                const formattedAnnouncements = (announcementsData || []).map(ann => ({
                    id: `ann-${ann.id}`,
                    type: 'announcement',
                    category: 'update', // Map Announcements to School Updates
                    tag: 'OFFICIAL',
                    title: ann.title,
                    description: ann.description || ann.content, // Handling both naming conventions
                    image: ann.flyer_url,
                    actionText: ann.action_text || null,
                    link: ann.action_link || null,
                    createdAt: new Date(ann.created_at).getTime(),
                }));

                // 5. Combine and Sort (Newest First)
                const combinedFeed = [...formattedAnnouncements, ...formattedAds]
                    .sort((a, b) => b.createdAt - a.createdAt);

                setFeedData(combinedFeed);
            } catch (error) {
                console.error("Error fetching community feed:", error);
                // Optionally handle error UI here, but falling back to empty feed is okay for MVP
            } finally {
                setIsLoading(false);
            }
        };

        fetchCommunityData();
    }, []);

    const navigate = useNavigate();

    const filteredFeed = feedData.filter(post =>
        selectedCategory === 'all' || post.category === selectedCategory
    );

    return (
        <div className="pb-24 bg-gray-50/50 min-h-screen">

            {/* Sticky Top Nav (Just the title) */}
            <div className="bg-white px-5 py-4 sticky top-0 z-30 border-b border-gray-100 shadow-sm/50 backdrop-blur-md bg-white/90">
                <div className="flex justify-between items-center w-[90%] md:w-[95%] max-w-[1600px] mx-auto">
                    <div>
                        <h1 className="text-2xl font-black text-gray-900 tracking-tight">Community</h1>
                        <p className="text-sm font-medium text-gray-500">Events, updates & listings</p>
                    </div>

                    {/* Small button in upper right guiding to the newly separated premium Advertise page */}
                    <button
                        onClick={() => navigate('/advertise')}
                        className="flex flex-col items-center justify-center p-2 rounded-xl bg-amber-50 text-amber-600 hover:bg-amber-100 transition-colors border border-amber-100/50 active:scale-95 group"
                        aria-label="Showcase to the world"
                    >
                        <div className="relative">
                            <Megaphone size={20} className="group-hover:-rotate-12 transition-transform duration-300" />
                            <div className="absolute -top-1 -right-1 w-2 h-2 bg-pink-500 rounded-full animate-pulse"></div>
                        </div>
                        <span className="text-[10px] font-bold tracking-tight mt-1">Showcase</span>
                    </button>
                </div>
            </div>

            {/* Modified margins to user specs: w-[90%] or ~5% gaps left and right */}
            <div className="w-[90%] md:w-[95%] max-w-[1600px] mx-auto pt-6">

                {/* Scrollable 'Showcase to the World' Gentle Banner */}
                <div
                    onClick={() => navigate('/advertise')}
                    className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-indigo-700 via-indigo-600 to-violet-700 p-6 sm:p-8 lg:p-12 lg:h-[35vh] lg:min-h-[300px] flex flex-col justify-center text-white shadow-xl shadow-indigo-200/50 cursor-pointer hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group mb-10"
                >
                    {/* Background decorations */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full mix-blend-overlay filter blur-[80px] opacity-20 group-hover:opacity-30 transition-opacity duration-700"></div>
                    <div className="absolute -bottom-10 right-4 lg:right-20 text-white/10 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-700">
                        <Sparkles size={160} />
                    </div>

                    <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between h-full w-full">
                        <div className="max-w-2xl">

                            <h3 className="font-extrabold text-3xl sm:text-4xl lg:text-5xl leading-tight mb-3 lg:mb-4 tracking-tight">
                                Showcase to the World
                            </h3>
                            <p className="text-indigo-100/90 text-sm sm:text-base lg:text-lg font-medium max-w-xl leading-relaxed">
                                Reach thousands of students daily. Post your product or service here and gain 100% student viewership monopoly on the most visited app pages.
                            </p>
                        </div>

                        <div className="mt-6 lg:mt-0 flex items-center gap-4">
                            <span className="font-bold text-sm lg:text-base text-white/90 group-hover:text-white transition-colors">Start Advertising</span>
                            <div className="w-12 h-12 lg:w-16 lg:h-16 rounded-full bg-white flex items-center justify-center shrink-0 shadow-lg text-indigo-600 group-hover:scale-110 transition-transform duration-300">
                                <ChevronRight size={24} strokeWidth={3} />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-4 mb-4">
                    <div className="h-px bg-gray-200 flex-1"></div>
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-widest px-2">Community Feed</span>
                    <div className="h-px bg-gray-200 flex-1"></div>
                </div>

                {/* Filter Categories - Horizontally Scrollable */}
                <div className="flex overflow-x-auto hide-scrollbar gap-3 pb-6 mb-2 mx-5 px-5 md:mx-0 md:px-0 pt-2 lg:pl-2">
                    {CATEGORIES.map(category => (
                        <button
                            key={category.id}
                            onClick={() => setSelectedCategory(category.id)}
                            className={`whitespace-nowrap px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-200 shadow-sm ${selectedCategory === category.id
                                ? 'bg-primary-600 text-white shadow-md shadow-primary-200 scale-105'
                                : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                                }`}
                        >
                            {category.label}
                        </button>
                    ))}
                </div>

                {/* Render Feed using CSS Grid or Empty State */}
                {isLoading ? (
                    <div className="py-20 flex flex-col items-center justify-center text-center">
                        <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mb-4"></div>
                        <p className="text-gray-500 font-bold animate-pulse">Loading community feed...</p>
                    </div>
                ) : filteredFeed.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-8">
                        {filteredFeed.map(post => (
                            <CommunityCard key={post.id} post={post} />
                        ))}
                    </div>
                ) : (
                    <div className="py-20 flex flex-col items-center justify-center text-center bg-white rounded-3xl border border-gray-100 shadow-sm mb-8">
                        <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                            <Megaphone className="text-gray-400" size={28} />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">No listings found</h3>
                        <p className="text-gray-500 font-medium max-w-sm">
                            There are currently no items under this category. Be the first to advertise here!
                        </p>
                        <button
                            onClick={() => navigate('/advertise')}
                            className="mt-6 px-6 py-2.5 bg-primary-50 text-primary-700 font-bold rounded-xl hover:bg-primary-100 transition-colors"
                        >
                            Create Ad
                        </button>
                    </div>
                )}

                {filteredFeed.length > 0 && (
                    <div className="text-center mt-12 pb-12">
                        <p className="text-gray-400 font-medium text-sm">You've caught up with the latest listings</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Community;
