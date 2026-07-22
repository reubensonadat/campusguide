import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { LeaderboardLoader } from '../common/CustomLoaders';
import { Trophy, Medal, Crown, Star, User as UserIcon } from 'lucide-react';
import { triggerHaptic } from '../../utils/haptics';
import { 
    CustomGuide, 
    CustomCoach, 
    CustomPlanner, 
    CustomNavigation, 
    CustomMegaphone, 
    CustomCommunity, 
    CustomEyes,
    CustomThriftStore,
    CustomCoolFinds,
    CustomSafetyCheck,
    CustomSparkles
} from '../common/CustomIcons';

const getCategoryIcon = (categoryId) => {
    const iconProps = { size: 24, className: "text-primary-600" };
    switch (categoryId) {
        case 'scholar': return <CustomGuide {...iconProps} />;
        case 'procrastinator': return <CustomSafetyCheck {...iconProps} />;
        case 'executor': return <CustomCoach {...iconProps} />;
        case 'planner': return <CustomPlanner {...iconProps} />;
        case 'busy_bee': return <CustomNavigation {...iconProps} />;
        case 'whisperer': return <CustomMegaphone {...iconProps} />;
        case 'yapper': return <CustomCommunity {...iconProps} />;
        case 'critic': return <CustomEyes {...iconProps} />;
        case 'entrepreneur': return <CustomThriftStore {...iconProps} />;
        case 'samaritan': return <CustomCoolFinds {...iconProps} />;
        default: return <CustomSparkles {...iconProps} />;
    }
};

const Leaderboards = () => {
    const [leaderboardData, setLeaderboardData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchLeaderboard = async () => {
        try {
            setLoading(true);
            setError(null);
            const { data, error } = await supabase.rpc('get_community_leaderboard');
            
            if (error) throw error;
            setLeaderboardData(data || []);
        } catch (err) {
            console.error('Error fetching leaderboard:', err);
            setError('Failed to load leaderboards. Make sure you ran the SQL setup script!');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLeaderboard();
    }, []);

    const getRankIcon = (index) => {
        if (index === 0) return <Crown className="text-primary-600 w-5 h-5 drop-shadow-sm" />;
        if (index === 1) return <Medal className="text-primary-400 w-5 h-5 drop-shadow-sm" />;
        if (index === 2) return <Medal className="text-primary-300 w-5 h-5 drop-shadow-sm" />;
        return <span className="text-gray-400 font-bold w-5 text-center">{index + 1}</span>;
    };

    if (loading) return <LeaderboardLoader />;

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center py-20 text-red-500 text-center">
                <p className="font-bold mb-2">Oops!</p>
                <p className="text-sm max-w-xs">{error}</p>
                <button 
                    onClick={fetchLeaderboard}
                    className="mt-4 px-4 py-2 bg-red-50 text-red-700 font-bold rounded-lg text-sm"
                >
                    Retry
                </button>
            </div>
        );
    }

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-3xl mx-auto pb-12">
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-black text-gray-900 flex items-center gap-2">
                        <Trophy className="text-primary-500" />
                        Hall of Fame
                    </h2>
                    <p className="text-sm font-medium text-gray-500 mt-1">100% Anonymous. Top 3 across campus.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {leaderboardData.map((category) => (
                    <div 
                        key={category.id} 
                        className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition-shadow hover:border-primary-100 group"
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-full bg-primary-50 flex items-center justify-center shrink-0">
                                {getCategoryIcon(category.id)}
                            </div>
                            <div>
                                <h3 className="font-black text-gray-900 text-lg group-hover:text-primary-600 transition-colors">{category.title}</h3>
                                <p className="text-xs text-gray-500 font-medium">{category.description}</p>
                            </div>
                        </div>

                        {category.top.length === 0 ? (
                            <div className="text-center py-4 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                                <p className="text-sm text-gray-400 font-medium">No one has claimed this yet!</p>
                            </div>
                        ) : (
                            <div className="space-y-3">
                                {category.top.map((user, idx) => (
                                    <div 
                                        key={user.name + idx} 
                                        className={`flex items-center justify-between p-3 rounded-xl transition-colors ${idx === 0 ? 'bg-gradient-to-r from-primary-50/50 to-white border border-primary-100/50' : 'bg-gray-50/50 border border-transparent hover:bg-gray-50'}`}
                                        onClick={() => triggerHaptic()}
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="relative">
                                                {user.avatar_url ? (
                                                    <img 
                                                        src={user.avatar_url}
                                                        alt="Avatar"
                                                        className="w-10 h-10 rounded-full border border-gray-200 bg-white object-cover"
                                                    />
                                                ) : (
                                                    <div className="w-10 h-10 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center">
                                                        <UserIcon size={20} className="text-gray-400" />
                                                    </div>
                                                )}
                                                <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5 shadow-sm">
                                                    {getRankIcon(idx)}
                                                </div>
                                            </div>
                                            <div>
                                              <span className="font-bold text-gray-800 text-sm">{user.username ? `@${user.username}` : user.name}</span>
                                            </div>
                                        </div>
                                        <div className="bg-white px-2.5 py-1 rounded-lg border border-gray-100 shadow-sm flex items-center gap-1.5">
                                            <Star size={12} className={idx === 0 ? "text-primary-500 fill-current" : "text-gray-400"} />
                                            <span className="font-black text-xs text-gray-700">{user.score}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Leaderboards;
