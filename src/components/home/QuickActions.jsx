import React from 'react';

const QuickActions = ({ quickActions }) => (
  <div className="pt-2">
    <h3 className="text-gray-900 font-black text-xl mb-4 px-1 tracking-tight">Tools</h3>
    <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-2 px-1 -mx-1">
      {quickActions.map((action, i) => {
        const Icon = action.icon;
        return (
          <button key={i} onClick={action.action}
            className="bg-white border border-gray-200 rounded-2xl p-3 flex-none flex items-center gap-3 active:scale-95 transition-transform">
            <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center flex-shrink-0 border border-gray-100">
              <Icon size={18} className="text-gray-900" />
            </div>
            <span className="text-[13px] font-bold text-gray-900 leading-tight pr-2 whitespace-nowrap">{action.title}</span>
          </button>
        );
      })}
    </div>
  </div>
);

export default QuickActions;
