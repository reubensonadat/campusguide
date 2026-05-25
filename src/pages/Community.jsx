import React, { useState } from 'react';
import { Megaphone, ChevronRight, Sparkles, Star, X } from 'lucide-react';
import CommunityCard from '../components/community/CommunityCard';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from '../hooks/useLocalStorage';
import LostFoundModal from '../components/community/LostFoundModal';

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
    { id: 'lost-and-found', label: 'Lost & Found' },
];

const Community = () => {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [feedData, setFeedData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isHomeBannerDismissed, setIsHomeBannerDismissed] = useLocalStorage('ucc_home_banner_dismissed', false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isLostFoundModalOpen, setIsLostFoundModalOpen] = useState(false);
    const [refreshTrigger, setRefreshTrigger] = useState(0);

    React.useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    React.useEffect(() => {
        window.scrollTo(0, 0);
        fetchCommunityData();
    }, [refreshTrigger]);

    const fetchCommunityData = async () => {
        setIsLoading(true);
        try {
            // 1. Fetch Active Advertisements that have not expired
            const { data: adsData, error: adsError } = await supabase
                .from('advertisements')
                .select('*')
                .ilike('status', 'active') // Handle 'Active', 'ACTIVE', 'active'
                .gte('expires_at', new Date().toISOString());

            if (adsError) throw adsError;

            // 2. Fetch University Announcements
            const { data: announcementsData, error: annError } = await supabase
                .from('announcements')
                .select('*');

            if (annError) throw annError;

            // 3. Fetch Lost and Found (Only items from the last 3 days)
            const threeDaysAgo = new Date();
            threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);

            const { data: lostFoundData, error: lfError } = await supabase
                .from('lost_and_found')
                .select('*')
                .gte('created_at', threeDaysAgo.toISOString())
                .order('created_at', { ascending: false });

            if (lfError) throw lfError;

            // 4. Format Ads for CommunityCard
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

            // 5. Format Announcements for CommunityCard
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

            // 6. Format Lost and Found
            const formattedLostFound = (lostFoundData || []).map(lf => {
                // Prepend location to description visually
                const desc = lf.location ? `📍 Location: ${lf.location}\n\n${lf.description}` : lf.description;
                const contact = lf.contact_info.replace(/\D/g, '');
                return {
                    id: `lf-${lf.id}`,
                    type: 'lost_and_found', // Distinct from 'ad' so it doesn't say SPONSORED
                    category: 'lost-and-found',
                    tag: lf.type === 'lost' ? 'LOST ITEM' : 'FOUND ITEM',
                    title: lf.item_name,
                    description: desc,
                    image: lf.image_url,
                    actionText: 'Contact Person',
                    link: contact ? `tel:+233${contact.startsWith('0') ? contact.substring(1) : contact}` : '#',
                    createdAt: new Date(lf.created_at).getTime(),
                }
            });

            // 7. Combine and Sort (Newest First)
            const combinedFeed = [...formattedAnnouncements, ...formattedAds, ...formattedLostFound]
                .sort((a, b) => b.createdAt - a.createdAt);

            setFeedData(combinedFeed);
        } catch (error) {
            console.error("Error fetching community feed:", JSON.stringify(error, null, 2));
            // Optionally handle error UI here, but falling back to empty feed is okay for MVP
        } finally {
            setIsLoading(false);
        }
    };


    const navigate = useNavigate();

    const filteredFeed = feedData.filter(post =>
        selectedCategory === 'all'
            ? post.category !== 'lost-and-found'
            : post.category === selectedCategory
    );

    return (
        <div className="pb-24 bg-gray-50/50 min-h-screen">

            {/* Sticky Top Nav (Just the title) */}
            <div className={`px-5 sticky top-0 z-30 border-b border-gray-100 shadow-sm/50 backdrop-blur-md bg-white/90 transition-all duration-300 ease-in-out ${isScrolled ? 'py-2 h-[50px]' : 'py-4 h-[76px]'}`}>
                <div className="flex justify-between items-center w-[90%] md:w-[95%] max-w-[1600px] mx-auto h-full">
                    <div className="flex flex-col justify-center">
                        <h1 className={`font-black text-gray-900 tracking-tight transition-all duration-300 ${isScrolled ? 'text-lg' : 'text-2xl'}`}>
                            Community
                        </h1>
                        <div className={`transition-all duration-300 overflow-hidden ${isScrolled ? 'max-h-0 opacity-0' : 'max-h-10 opacity-100'}`}>
                            <p className="text-sm font-medium text-gray-500">Events, updates & listings</p>
                        </div>
                    </div>

                    {/* Buttons in upper right */}
                    <div className={`flex items-center gap-2 transition-all duration-300 overflow-hidden ${isScrolled ? 'w-0 opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
                                                <button
                            onClick={() => setIsLostFoundModalOpen(true)}
                            className="flex items-center justify-center p-2 rounded-xl bg-primary-50 text-primary-600 hover:bg-primary-100 transition-colors border border-primary-100/50 active:scale-95 group"
                            aria-label="Report Lost/Found"
                        >
                            <Star size={20} className="group-hover:rotate-12 transition-transform duration-300" />
                        </button>
                        
                        <button
                            onClick={() => navigate('/advertise')}
                            className={`whitespace-nowrap px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 shadow-sm ${'bg-white text-amber-600 shadow-md scale-105 border border-gray-100'}`}
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
            </div>

            {/* Modified margins to user specs: w-[90%] or ~5% gaps left and right */}
            <div className="w-[90%] md:w-[95%] max-w-[1600px] mx-auto pt-6">

                {/* Scrollable 'Showcase to the World' Gentle Banner */}
                {!isHomeBannerDismissed && (
                    <div
                        onClick={() => navigate('/advertise')}
                        className="relative overflow-hidden rounded-xl bg-gradient-to-br from-primary-700 via-primary-600 to-primary-700 p-6 sm:p-8 lg:p-12 lg:h-[35vh] lg:min-h-[300px] flex flex-col justify-center text-white shadow-xl shadow-primary-200/50 cursor-pointer hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group mb-10"
                    >
                        {/* Close button */}
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                setIsHomeBannerDismissed(true);
                            }}
                            className="absolute top-4 right-4 z-20 text-white/50 hover:text-white bg-black/10 hover:bg-black/20 rounded-full p-2 transition-colors focus:outline-none"
                            aria-label="Dismiss banner"
                        >
                            <X size={20} />
                        </button>

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
                                <p className="text-primary-100/90 text-sm sm:text-base lg:text-lg font-medium max-w-xl leading-relaxed">
                                    Reach thousands of students daily. Post your product or service here and gain 100% student viewership monopoly on the most visited app pages.
                                </p>
                            </div>

                            <div className="mt-6 lg:mt-0 flex items-center gap-4">
                                <span className="font-bold text-sm lg:text-base text-white/90 group-hover:text-white transition-colors">Start Advertising</span>
                                <div className="w-12 h-12 lg:w-16 lg:h-16 rounded-full bg-white flex items-center justify-center shrink-0 shadow-lg text-primary-600 group-hover:scale-110 transition-transform duration-300">
                                    <ChevronRight size={24} strokeWidth={3} />
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Sticky Feed Header & Filters */}
                <div
                    className="sticky z-20 bg-gray-50/95 backdrop-blur-md pt-2 pb-4 -mx-4 px-4 md:mx-0 md:px-0 transition-all duration-300"
                    style={{ top: isScrolled ? '50px' : '76px' }}
                >
                    <div className={`flex items-center gap-4 transition-all duration-300 overflow-hidden ${isScrolled ? 'max-h-0 opacity-0 mb-0' : 'max-h-10 opacity-100 mb-4'}`}>
                        <div className="h-px bg-gray-200 flex-1"></div>
                        <span className="text-xs font-bold text-gray-500 uppercase tracking-widest px-2 whitespace-nowrap">Community Feed</span>
                        <div className="h-px bg-gray-200 flex-1"></div>
                    </div>

                    {/* Filter Categories - Horizontally Scrollable */}
                   <div className="flex overflow-x-auto hide-scrollbar gap-2 px-4 py-2 md:px-4 lg:pl-4">
                        {CATEGORIES.map(category => (
                            <button
                                key={category.id}
                                onClick={() => setSelectedCategory(category.id)}
                                className={`whitespace-nowrap px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 shadow-sm ${selectedCategory === category.id
                                    ? 'bg-white text-primary-600 shadow-md scale-105 border border-gray-100'
                                    : 'bg-transparent text-gray-500 hover:bg-gray-100 border border-transparent'
                                    }`}
                            >
                                {category.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Render Feed using CSS Grid or Empty State */}
                {isLoading ? (
                    <div className="py-20 flex flex-col items-center justify-center text-center">
                        <div className="w-12 h-12 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin mb-4"></div>
                        <p className="text-gray-500 font-bold animate-pulse">Loading community feed...</p>
                    </div>
                ) : filteredFeed.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-8">
                        {filteredFeed.map(post => (
                            <CommunityCard key={post.id} post={post} />
                        ))}
                    </div>
                ) : (
                    <div className="py-20 flex flex-col items-center justify-center text-center bg-white rounded-xl border border-gray-100 shadow-sm mb-8">
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

            <LostFoundModal
                isOpen={isLostFoundModalOpen}
                onClose={() => setIsLostFoundModalOpen(false)}
                onSuccess={() => setRefreshTrigger(prev => prev + 1)}
            />
        </div>
    );
};

export default Community;
