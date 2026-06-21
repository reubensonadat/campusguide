import React, { useMemo } from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// ── Term helpers ──────────────────────────────────────────────────────────────
const TERMS = [
    '100_1', '100_2', '200_1', '200_2', '300_1', '300_2',
    '400_1', '400_2', '500_1', '500_2', '600_1', '600_2'
];

const termLabel = (termKey) => {
    const [year, sem] = termKey.split('_');
    return `L${year}/S${sem}`;
};

// ── Compute GPA per semester from the full courses array ──────────────────────
const computeTrend = (courses) => {
    const map = {};
    courses.forEach(c => {
        if (c._deleted) return;
        const isUngraded = (c.score === '' || c.score == null) || 
                           ((c.score === 0 || c.score === '0') && (parseFloat(c.gradePoint) || 0) === 0);
        if (isUngraded) return;
        const key = `${c.academic_year}_${c.semester}`;
        if (!map[key]) map[key] = { credits: 0, points: 0 };
        const ch = parseFloat(c.creditHours) || 3;
        const gp = parseFloat(c.gradePoint) || 0;
        map[key].credits += ch;
        map[key].points += gp * ch;
    });

    // Only include semesters that have at least one graded course
    return TERMS
        .filter(t => map[t] && map[t].credits > 0)
        .map(t => ({
            term: t,
            label: termLabel(t),
            gpa: parseFloat((map[t].points / map[t].credits).toFixed(2)),
            credits: map[t].credits,
        }));
};

// Custom Tooltip for Recharts
const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-gray-900 text-white text-xs font-bold px-3 py-2.5 rounded-xl shadow-lg border border-gray-800">
                <p className="opacity-70 mb-1 text-[10px] uppercase tracking-widest">{label}</p>
                <p className="text-xl tabular-nums leading-none mb-1">{payload[0].value.toFixed(2)} <span className="text-[10px] opacity-70">GPA</span></p>
                <p className="opacity-70 font-medium text-[10px]">{payload[0].payload.credits} credits</p>
            </div>
        );
    }
    return null;
};

// ── Main export ───────────────────────────────────────────────────────────────
const GPATrendGraph = ({ courses }) => {
    const trendData = useMemo(() => computeTrend(courses), [courses]);

    if (trendData.length === 0) return null;

    const last = trendData[trendData.length - 1];
    const prev = trendData.length > 1 ? trendData[trendData.length - 2] : null;
    const delta = prev ? parseFloat((last.gpa - prev.gpa).toFixed(2)) : 0;

    const best = trendData.reduce((a, b) => a.gpa >= b.gpa ? a : b);
    const worst = trendData.reduce((a, b) => a.gpa <= b.gpa ? a : b);
    const avg = parseFloat((trendData.reduce((s, t) => s + t.gpa, 0) / trendData.length).toFixed(2));

    const TrendIcon = delta > 0 ? TrendingUp : delta < 0 ? TrendingDown : Minus;
    const trendColor = delta > 0 ? 'text-green-600' : delta < 0 ? 'text-red-500' : 'text-gray-400';

    return (
        <div className="mb-6 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">

            {/* Header */}
            <div className="px-5 pt-5 pb-3 border-b border-gray-50 bg-gray-900/[0.03]">
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="text-base font-black text-gray-900 flex items-center gap-2">
                            <TrendingUp size={17} className="text-gray-500" />
                            GPA Trend
                        </h3>
                        <p className="text-xs font-medium text-gray-400 mt-0.5">
                            Performance across {trendData.length} semester{trendData.length !== 1 ? 's' : ''}
                        </p>
                    </div>

                    {/* Latest GPA + delta */}
                    <div className="text-right">
                        <p className="text-3xl font-black text-gray-900 leading-none tabular-nums">{last.gpa.toFixed(2)}</p>
                        <div className={`flex items-center justify-end gap-0.5 mt-1 ${trendColor}`}>
                            <TrendIcon size={12} />
                            <span className="text-[11px] font-black">
                                {delta === 0 ? 'Stable' : `${delta > 0 ? '+' : ''}${delta} vs prev`}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Chart */}
            <div className="pt-6 pb-2 pr-5 pl-1 select-none">
                {trendData.length >= 2 ? (
                    <div className="h-48 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={trendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorGpa" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#111827" stopOpacity={0.2} />
                                        <stop offset="95%" stopColor="#111827" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                                <XAxis
                                    dataKey="label"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#9ca3af', fontSize: 10, fontWeight: 800 }}
                                    dy={10}
                                />
                                <YAxis
                                    domain={[0, 4]}
                                    ticks={[1, 2, 3, 4]}
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#9ca3af', fontSize: 10, fontWeight: 800 }}
                                />
                                <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#d1d5db', strokeWidth: 1, strokeDasharray: '4 4' }} />
                                <Area
                                    type="monotone"
                                    dataKey="gpa"
                                    stroke="#111827"
                                    strokeWidth={3}
                                    fillOpacity={1}
                                    fill="url(#colorGpa)"
                                    activeDot={{ r: 6, fill: '#111827', stroke: '#fff', strokeWidth: 2 }}
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                ) : (
                    <div className="h-24 flex items-center justify-center">
                        <p className="text-xs text-gray-400 font-medium">Add grades across 2+ semesters to see your trend line</p>
                    </div>
                )}
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-3 border-t border-gray-50">
                {[
                    { label: 'Best Semester', value: best.gpa.toFixed(2), sub: best.label },
                    { label: 'Average GPA', value: avg.toFixed(2), sub: 'all semesters' },
                    { label: 'Lowest', value: worst.gpa.toFixed(2), sub: worst.label },
                ].map((stat, i) => (
                    <div
                        key={stat.label}
                        className={`px-4 py-3 text-center ${i > 0 ? 'border-l border-gray-50' : ''}`}
                    >
                        <p className="text-base font-black text-gray-900 tabular-nums">{stat.value}</p>
                        <p className="text-[9px] font-black text-gray-400 uppercase tracking-wider leading-tight">{stat.label}</p>
                        <p className="text-[9px] font-semibold text-gray-300 leading-tight">{stat.sub}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default GPATrendGraph;
