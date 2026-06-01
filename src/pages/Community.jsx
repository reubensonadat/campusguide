import React, { useState } from 'react';
import { Sparkles, Star, X, Megaphone } from 'lucide-react';
import { CustomCommunity, CustomThriftStore, CustomEyes } from '../components/common/CustomIcons';
import CommunityCard from '../components/community/CommunityCard';
import { useNavigate, useLocation } from 'react-router-dom';
import { useLocalStorage } from '../hooks/useLocalStorage';
import LostFoundModal from '../components/community/LostFoundModal';
import ThriftFeed from '../components/community/ThriftFeed';
import WhispersFeed from '../components/community/WhispersFeed';
import PageHeader from '../components/common/PageHeader';
import { CoachMarksOverlay } from '../components/common/CoachMarksOverlay';

import { supabase } from '../lib/supabase';
import { DataLoader } from '../components/common/CustomLoaders';

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

const mainTabs = [
    { id: 'general', label: 'General Feed' },
    { id: 'thrift', label: 'Student Thrift' },
    { id: 'whispers', label: 'Campus Whispers' }
];

const Community = () => {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [feedData, setFeedData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isLostFoundModalOpen, setIsLostFoundModalOpen] = useState(false);
    const [refreshTrigger, setRefreshTrigger] = useState(0);
    const [activeMainTab, setActiveMainTab] = useLocalStorage('ucc_community_tab', 'general');

    const [pillStyle, setPillStyle] = useState({ left: 0, width: 0, opacity: 0 });
    const tabsRef = React.useRef([]);

    const location = useLocation();

    React.useEffect(() => {
        const params = new URLSearchParams(location.search);
        if (params.has('tab')) {
            const tab = params.get('tab');
            if (['general', 'thrift', 'whispers'].includes(tab)) setActiveMainTab(tab);
        } else if (params.has('postId')) {
            setActiveMainTab('general');
        } else if (params.has('thriftId')) {
            setActiveMainTab('thrift');
        } else if (params.has('whisperId')) {
            setActiveMainTab('whispers');
        }
    }, [location.search]);

    React.useEffect(() => {
        const timeoutId = setTimeout(() => {
            const activeIndex = mainTabs.findIndex(tab => activeMainTab === tab.id);
            if (activeIndex !== -1 && tabsRef.current[activeIndex]) {
                const el = tabsRef.current[activeIndex];
                setPillStyle({
                    left: el.offsetLeft,
                    width: el.offsetWidth,
                    opacity: 1
                });
            }
        }, 15);
        return () => clearTimeout(timeoutId);
    }, [activeMainTab]);

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
            const { data: adsData, error: adsError } = await supabase
                .from('advertisements')
                .select('*')
                .ilike('status', 'active')
                .gte('expires_at', new Date().toISOString());

            if (adsError) throw adsError;

            const { data: announcementsData, error: annError } = await supabase
                .from('announcements')
                .select('*');

            if (annError) throw annError;

            const threeDaysAgo = new Date();
            threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);

            const { data: lostFoundData, error: lfError } = await supabase
                .from('lost_and_found')
                .select('*')
                .gte('created_at', threeDaysAgo.toISOString())
                .order('created_at', { ascending: false });

            if (lfError) throw lfError;

            const formattedAds = (adsData || []).map(ad => {
                let actionText = 'Message via WhatsApp';
                let link = '#';

                let cleanPhone = ad.phone_number ? ad.phone_number.toString().replace(/\D/g, '') : '';
                if (cleanPhone.startsWith('0')) {
                    cleanPhone = '233' + cleanPhone.slice(1);
                } else if (!cleanPhone.startsWith('233') && cleanPhone.length === 9) {
                    cleanPhone = '233' + cleanPhone;
                }

                if (ad.contact_method === 'link' && ad.contact_url) {
                    actionText = 'Visit Link';
                    link = ad.contact_url;
                } else if (ad.contact_method === 'phone') {
                    actionText = 'Call Now';
                    link = cleanPhone ? `tel:+${cleanPhone}` : '#';
                } else {
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

            const formattedAnnouncements = (announcementsData || []).map(ann => ({
                id: `ann-${ann.id}`,
                type: 'announcement',
                category: 'update',
                tag: 'OFFICIAL',
                title: ann.title,
                description: ann.description || ann.content,
                image: ann.flyer_url,
                actionText: ann.action_text || null,
                link: ann.action_link || null,
                createdAt: new Date(ann.created_at).getTime(),
            }));

            const formattedLostFound = (lostFoundData || []).map(lf => {
                const desc = lf.location ? `📍 Location: ${lf.location}\n\n${lf.description}` : lf.description;
                const contact = lf.contact_info.replace(/\D/g, '');
                return {
                    id: `lf-${lf.id}`,
                    type: 'lost_and_found',
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

            const postIdParam = new URLSearchParams(window.location.search).get('postId');
            const combinedFeed = [...formattedAnnouncements, ...formattedAds, ...formattedLostFound]
                .sort((a, b) => {
                    if (postIdParam) {
                        if (a.id === postIdParam) return -1;
                        if (b.id === postIdParam) return 1;
                    }
                    return b.createdAt - a.createdAt;
                });

            setFeedData(combinedFeed);
        } catch (error) {
            console.error("Error fetching community feed:", JSON.stringify(error, null, 2));
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

            {/* Sticky Header */}
            <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 pt-[env(safe-area-inset-top,0px)] h-[calc(4rem_+_env(safe-area-inset-top,0px))]">
                <div className="w-[90%] md:w-[95%] max-w-[1600px] mx-auto h-full flex items-center justify-between">
                    <span className="font-bold text-lg text-gray-900">Community</span>
                    
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setIsLostFoundModalOpen(true)}
                            className="flex items-center justify-center p-2 rounded-xl bg-primary-50 text-primary-600 hover:bg-primary-100 transition-colors border border-primary-100/50 active:scale-95 group animate-in fade-in"
                            aria-label="Report Lost/Found"
                        >
                            <Star size={16} className="group-hover:rotate-12 transition-transform duration-300" />
                        </button>
                        
                        <button
                            onClick={() => navigate('/advertise')}
                            className="whitespace-nowrap px-3.5 py-1.5 bg-[#002F45] text-white text-[11px] font-black uppercase tracking-wider rounded-xl transition-all shadow-md active:scale-95 flex items-center gap-1.5"
                            aria-label="Showcase to the world"
                        >
                            <Megaphone size={12} />
                            <span>Showcase</span>
                        </button>
                    </div>
                </div>
            </div>

            <div className="w-[90%] md:w-[95%] max-w-[1600px] mx-auto pt-4">

                {/* Main Tabs */}
                <div className="w-full mb-4 relative">
                    <div className="relative flex items-center gap-1 bg-white p-1 rounded-xl border border-gray-100/80 w-full z-0 shadow-sm">
                        <div 
                            className="absolute h-[calc(100%-8px)] bg-[#002F45] rounded-lg z-0"
                            style={{ 
                                left: `${pillStyle.left}px`, 
                                width: `${pillStyle.width}px`,
                                opacity: pillStyle.opacity,
                                transition: 'left 0.28s cubic-bezier(0.34, 1.56, 0.64, 1), width 0.28s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.2s ease-in'
                            }}
                        />
                        {mainTabs.map((tab, index) => {
                            const isActive = activeMainTab === tab.id;
                            return (
                                <button
                                    key={tab.id}
                                    ref={el => tabsRef.current[index] = el}
                                    onClick={() => setActiveMainTab(tab.id)}
                                    className={`relative z-10 py-2 rounded-lg text-xs font-bold text-center flex-1 transition-colors duration-200 ${
                                        isActive ? 'text-white' : 'text-gray-500 hover:text-gray-900'
                                    }`}
                                >
                                    {tab.label}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Conditional Rendering based on Main Tab */}
                {activeMainTab === 'general' && (
                    <>
                        {/* Sticky Feed Header & Filters */}
                        <div
                            className="sticky z-20 bg-gray-50/95 backdrop-blur-md -mx-4 px-4 md:mx-0 md:px-0 pt-2 pb-3"
                            style={{ top: 'calc(4rem + env(safe-area-inset-top, 0px))' }}
                        >
                            <div className="flex overflow-x-auto hide-scrollbar gap-1.5 px-4 md:px-4 lg:pl-4 py-2">
                                {CATEGORIES.map(category => (
                                    <button
                                        key={category.id}
                                        onClick={() => setSelectedCategory(category.id)}
                                        className={`whitespace-nowrap rounded-lg font-bold transition-all duration-200 px-3.5 py-2 text-xs ${selectedCategory === category.id
                                            ? 'bg-white text-primary-600 shadow-md scale-105 border border-gray-100'
                                            : 'bg-transparent text-gray-500 hover:bg-gray-100 border border-transparent'
                                            }`}
                                    >
                                        {category.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {isLoading ? (
                            <div className="py-20 flex flex-col items-center justify-center text-center gap-4">
                                <DataLoader />
                                <p className="text-gray-400 font-semibold text-sm">Loading community feed...</p>
                            </div>
                        ) : filteredFeed.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pt-6 pb-8">
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
                    </>
                )}

                {activeMainTab === 'thrift' && <ThriftFeed />}
                {activeMainTab === 'whispers' && <WhispersFeed />}
            </div>

            <LostFoundModal
                isOpen={isLostFoundModalOpen}
                onClose={() => setIsLostFoundModalOpen(false)}
                onSuccess={() => setRefreshTrigger(prev => prev + 1)}
            />

            {/* 🧭 Coach Marks Walkthrough */}
            <CoachMarksOverlay 
              storageKey="ucc_coach_community"
              steps={COMMUNITY_COACH_STEPS}
            />
        </div>
    );
};

const COMMUNITY_COACH_STEPS = [
  {
    icon: <CustomCommunity size={24} />,
    title: 'Community Hub',
    description: 'Engage with fellow students across the three major community channels: Feed, Thrift, and Whispers.'
  },
  {
    icon: <CustomThriftStore size={24} />,
    title: 'Thrift Market',
    description: 'Post used items you want to sell or browse budget deals. You can share items directly using a long press.'
  },
  {
    icon: <CustomEyes size={24} />,
    title: 'Campus Whispers',
    description: 'Post and reply to anonymous thoughts and campus buzz completely privately.'
  }
];

export default Community;
