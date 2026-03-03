import React from 'react';
import { Megaphone, ChevronRight, Sparkles, Star } from 'lucide-react';
import CommunityCard from '../components/community/CommunityCard';
import { useNavigate } from 'react-router-dom';

// Dummy Mock Data
const MOCK_FEED = [
    {
        id: 1,
        type: 'announcement',
        tag: 'OCT 12',
        title: 'Freshers Orientation Gathering',
        description: 'Welcome to all incoming students! Join us for a comprehensive overview of campus life, academic expectations, and support services available to you.',
        image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=800&auto=format&fit=crop',
        location: 'Great Hall, Main Campus',
        date: '10:00 AM - 2:00 PM',
        actionText: 'Join Group'
    },
    {
        id: 2,
        type: 'ad',
        title: 'Bush Canteen Fresh Meals',
        description: 'Get 20% off your first meal at Bush Canteen when you show this ad! Serving hot Jollof packed with chicken and assorted meats. Our food is sourced organically and prepared in a highly hygienic premium setting. This text is long to demonstrate the read more button working effectively so it does not clutter the feed!',
        image: 'https://images.unsplash.com/photo-1604328698692-f76ea9498e76?q=80&w=800&auto=format&fit=crop',
        actionText: 'Message via WhatsApp',
        link: 'https://wa.me/1234567890' // Dummy WhatsApp link
    },
    {
        id: 3,
        type: 'announcement',
        tag: 'OCT 15',
        title: 'Matriculation Ceremony',
        description: 'The official induction of incoming students into the university community. Dress code is strictly formal.',
        image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=800&auto=format&fit=crop',
        location: 'Casely Hayford Forecourt',
        date: '9:00 AM Prompt',
        actionText: 'View Details'
    },
    {
        id: 4,
        type: 'ad',
        title: 'Excel Hostels - Room Available',
        description: 'One slot left in a 4-in-a-room setup. AC, WiFi, and dedicated study desks included. GH₵3500/yr.',
        image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?q=80&w=800&auto=format&fit=crop',
        actionText: 'Contact Manager',
        link: 'https://wa.me/1987654321'
    }
];

const Community = () => {
    const navigate = useNavigate();

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
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-xs font-bold uppercase tracking-widest text-indigo-50 mb-4 shadow-sm">
                                <Star size={14} className="text-amber-300 fill-amber-300" /> Premium reach
                            </div>
                            <h3 className="font-extrabold text-3xl sm:text-4xl lg:text-5xl leading-tight mb-3 lg:mb-4 tracking-tight">
                                Showcase to the World
                            </h3>
                            <p className="text-indigo-100/90 text-sm sm:text-base lg:text-lg font-medium max-w-xl leading-relaxed">
                                Reach thousands of students daily. Post your product, hostel, or service here and gain 100% student viewership monopoly on the most visited app pages.
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

                <div className="flex items-center gap-4 mb-8">
                    <div className="h-px bg-gray-200 flex-1"></div>
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-widest px-2">Community Feed</span>
                    <div className="h-px bg-gray-200 flex-1"></div>
                </div>

                {/* Render Feed using CSS Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-8">
                    {MOCK_FEED.map(post => (
                        <CommunityCard key={post.id} post={post} />
                    ))}
                </div>

                <div className="text-center mt-12 pb-12">
                    <p className="text-gray-400 font-medium text-sm">You've caught up with the latest listings</p>
                </div>
            </div>
        </div>
    );
};

export default Community;
