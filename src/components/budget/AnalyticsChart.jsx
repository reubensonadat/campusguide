import React from 'react';
import { Activity } from 'lucide-react';

const AnalyticsChart = ({ chartView, onViewChange, chartData }) => {
  return (
    <div className="bg-[#111827] rounded-3xl p-6 shadow-xl relative overflow-hidden h-full min-h-[240px] flex flex-col">
      <div className="flex justify-between items-center mb-8 relative z-10">
        <div className="flex gap-4 text-white/50 text-sm font-medium">
          <span onClick={() => onViewChange('weekly')} className={`px-3 py-1 rounded-full cursor-pointer transition-colors ${chartView === 'weekly' ? 'text-white bg-white/10' : 'hover:text-white'}`}>Weekly</span>
          <span onClick={() => onViewChange('monthly')} className={`px-3 py-1 rounded-full cursor-pointer transition-colors ${chartView === 'monthly' ? 'text-white bg-white/10' : 'hover:text-white'}`}>Monthly</span>
        </div>
        <Activity className="text-white/50" size={20} />
      </div>

      {chartData.type === 'bar' ? (
        Math.max(...chartData.data) > 0 ? (
          <div className="flex-1 flex flex-col relative z-10">
            <div className="flex-1 relative">
              <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-10">
                <div className="border-t border-white border-dashed w-full h-0"></div>
                <div className="border-t border-white border-dashed w-full h-0"></div>
                <div className="border-t border-white border-dashed w-full h-0"></div>
                <div className="border-t border-white border-dashed w-full h-0"></div>
              </div>
              <div className="absolute inset-0 flex justify-between gap-2">
                {chartData.data.map((height, i) => (
                  <div key={i} className="w-full relative group">
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-900 text-white text-[10px] py-1 px-2 rounded font-bold pointer-events-none whitespace-nowrap z-20">
                      GH₵ {chartData.rawData[i].toFixed(2)}
                    </div>
                    <div className={`absolute bottom-0 left-0 w-full rounded-t-md transition-all duration-500 ease-out ${i === chartData.data.length - 1 ? 'bg-white shadow-[0_0_15px_rgba(255,255,255,0.3)]' : 'bg-white/20 hover:bg-white/40'}`}
                      style={{ height: `${height}%`, minHeight: height > 0 ? '4px' : '0' }}></div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-between gap-2 mt-3 pt-2 border-t border-white/10">
              {chartData.labels.map((label, i) => (
                <div key={i} className={`w-full text-center text-[10px] font-bold tracking-wider ${i === chartData.labels.length - 1 ? 'text-white' : 'text-white/40'}`}>{label}</div>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center text-white/50 text-sm font-medium relative z-10">No expenses this week</div>
        )
      ) : (
        <div className="flex-1 flex flex-row items-center justify-between gap-4 relative z-10">
          {chartData.total > 0 ? (
            <>
              <div className="w-32 h-32 rounded-full relative shrink-0 shadow-[0_0_20px_rgba(0,0,0,0.5)]"
                style={{ background: `conic-gradient(${chartData.data.map(d => `${d.color} ${d.startPercent}% ${d.endPercent}%`).join(', ')})` }}>
                <div className="absolute inset-2 bg-[#111827] rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">GH₵{chartData.total.toFixed(0)}</span>
                </div>
              </div>
              <div className="flex-1 flex flex-col gap-1.5 justify-center overflow-y-auto max-h-32 pr-1 hide-scrollbar">
                {chartData.data.map((d, i) => (
                  <div key={i} className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2 overflow-hidden">
                      <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: d.color }}></div>
                      <span className="text-white/80 truncate font-medium">{d.category}</span>
                    </div>
                    <span className="text-white font-bold ml-2 shrink-0">{d.percent.toFixed(0)}%</span>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="w-full h-full flex items-center justify-center text-white/50 text-sm font-medium">No expenses this month</div>
          )}
        </div>
      )}
    </div>
  );
};

export default AnalyticsChart;
