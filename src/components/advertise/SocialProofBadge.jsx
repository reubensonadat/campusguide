const SocialProofBadge = ({ userCount, variant = 'students', className = '' }) => {
    if (variant === 'checkout') {
        return (
            <div className={`flex items-center gap-3 mb-8 bg-primary-50/50 border border-primary-100 px-5 py-3 rounded-xl shadow-sm w-fit transition-all duration-300 pointer-events-none ${className}`}>
                <div className="relative flex h-3 w-3 shrink-0">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-primary-500"></span>
                </div>
                <span className="font-extrabold text-[13px] sm:text-sm text-gray-900 tracking-tight">
                    Highlight your business on the most visited app pages
                </span>
            </div>
        );
    }

    return (
        <div className={`flex items-center gap-3 mb-8 bg-white border border-rose-100 px-5 py-3 rounded-xl shadow-sm transition-all duration-300 pointer-events-none ${className}`}>
            <div className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500"></span>
            </div>
            <span className="font-extrabold text-sm text-gray-900 tracking-tight">
                Reach <span className="text-rose-600">{userCount || 'active'} Students</span> across campus
            </span>
        </div>
    );
};

export default SocialProofBadge;
