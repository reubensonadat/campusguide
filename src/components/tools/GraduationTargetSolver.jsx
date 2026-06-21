import React, { useMemo, useState } from 'react';
import { Target, GraduationCap, AlertTriangle, ShieldCheck, Lock, TrendingUp } from 'lucide-react';

// ── Term model (mirrors GPACalculator / GPATrendGraph) ─────────────────────────
const TERMS = [
    '100_1', '100_2', '200_1', '200_2', '300_1', '300_2',
    '400_1', '400_2', '500_1', '500_2', '600_1', '600_2'
];

// UCC degree classification (official Ghana undergraduate scheme)
const CLASS_PRESETS = [
    { label: 'First Class', gpa: 3.60 },
    { label: 'Second Class (Upper)', gpa: 3.00 },
    { label: 'Second Class (Lower)', gpa: 2.00 },
    { label: 'Third Class', gpa: 1.50 },
    { label: 'Pass', gpa: 1.00 },
];

// Map a required average GPA to its dominant grade band (advisory only)
const avgToGrade = (avg) => {
    if (avg >= 3.8) return { grade: 'A', color: 'text-green-700 bg-green-100' };
    if (avg >= 3.3) return { grade: 'B+', color: 'text-blue-700 bg-blue-100' };
    if (avg >= 2.8) return { grade: 'B', color: 'text-blue-700 bg-blue-100' };
    if (avg >= 2.3) return { grade: 'C+', color: 'text-yellow-700 bg-yellow-100' };
    if (avg >= 1.8) return { grade: 'C', color: 'text-yellow-700 bg-yellow-100' };
    if (avg >= 1.3) return { grade: 'D+', color: 'text-orange-700 bg-orange-100' };
    if (avg >= 0.8) return { grade: 'D', color: 'text-orange-700 bg-orange-100' };
    return { grade: 'E', color: 'text-red-700 bg-red-100' };
};

/**
 * GraduationTargetSolver
 *
 * Reverse-CGPA solver: "What average do I need in my remaining credits to
 * graduate with my target classification?"
 *
 * Sibling to GPATrendGraph — consumes the same `courses` prop, owns its OWN
 * state (never shares targetResult with the Active Semester Forecaster).
 *
 * 3-State Logic applied to the math:
 *   - COMPLETE   : no remaining credits → final CGPA is locked
 *   - IMPOSSIBLE : required avg > 4.0   → show the honest ceiling
 *   - SECURED    : required avg ≤ 0     → show the honest floor
 *   - ON_TRACK   : 0 < required ≤ 4.0   → show the required avg + grade band
 *
 * Never wipes user data; all states render honest numbers.
 */
const GraduationTargetSolver = ({ courses = [], currentLevel = '100', currentSemester = '1' }) => {
    const [targetCGPA, setTargetCGPA] = useState(3.6);
    const [targetLevel, setTargetLevel] = useState('400'); // 400 = standard, 600 = medical
    const [creditsPerSem, setCreditsPerSem] = useState(16);

    // ── Earned standing (matches cumulativeStats formula in GPACalculator) ──────
    const earned = useMemo(() => {
        let credits = 0;
        let points = 0;
        courses.forEach(c => {
            if (c._deleted) return;
            const isUngraded = (c.score === '' || c.score == null) || 
                               ((c.score === 0 || c.score === '0') && (parseFloat(c.gradePoint) || 0) === 0);
            if (isUngraded) return;
            const ch = parseFloat(c.creditHours) || 3;
            const gp = parseFloat(c.gradePoint) || 0;
            credits += ch;
            points += gp * ch;
        });
        return {
            credits,
            points,
            cgpa: credits > 0 ? points / credits : 0,
        };
    }, [courses]);

    // ── Auto-derive remaining semesters from the TERMS model ────────────────────
    // Counts terms strictly AFTER the student's current term, up to targetLevel_2.
    const remainingTerms = useMemo(() => {
        const currentKey = `${currentLevel}_${currentSemester}`;
        const endKey = `${targetLevel}_2`;
        const currentIdx = TERMS.indexOf(currentKey);
        const endIdx = TERMS.indexOf(endKey);

        // Guard: invalid term keys → fall back to a full-program estimate
        if (currentIdx < 0 || endIdx < 0) {
            const levelNum = parseInt(targetLevel, 10) || 400;
            return Math.max(0, (levelNum / 100) * 2);
        }
        return Math.max(0, endIdx - currentIdx);
    }, [currentLevel, currentSemester, targetLevel]);

    const remainingCredits = Math.max(0, remainingTerms * (parseInt(creditsPerSem, 10) || 0));

    // ── The reverse solve (proven math, 3-state honest) ─────────────────────────
    const projection = useMemo(() => {
        const target = parseFloat(targetCGPA);
        const tNum = isNaN(target) ? 0 : target;

        // State: COMPLETE — no remaining credits, CGPA is locked
        if (remainingCredits <= 0) {
            return {
                state: 'COMPLETE',
                finalCGPA: earned.cgpa,
                message: 'You have no remaining credits in your plan. Your projected final CGPA is locked at the value below.',
            };
        }

        const totalFutureCredits = earned.credits + remainingCredits;
        const neededPoints = tNum * totalFutureCredits - earned.points;
        const requiredAvg = neededPoints / remainingCredits;

        // State: IMPOSSIBLE — even straight A's (4.0) can't reach the target
        if (requiredAvg > 4.0) {
            const ceiling = (earned.points + 4.0 * remainingCredits) / totalFutureCredits;
            return {
                state: 'IMPOSSIBLE',
                requiredAvg,
                ceiling,
                message: `Even with straight A's (4.0) across all your remaining credits, the highest CGPA you can reach is ${ceiling.toFixed(2)} — short of your ${tNum.toFixed(2)} target. Consider lowering your target or adding more credits before graduation.`,
            };
        }

        // State: SECURED — target already mathematically locked in
        if (requiredAvg <= 0) {
            const floor = earned.points / totalFutureCredits; // worst case: 0.0 on remainder
            return {
                state: 'SECURED',
                floor,
                message: `You've already secured this target. Even if you averaged 0.0 in every remaining course, your CGPA would not drop below ${floor.toFixed(2)}. Aim higher!`,
            };
        }

        // State: ON_TRACK — the actionable path
        return {
            state: 'ON_TRACK',
            requiredAvg,
            perSemester: remainingTerms > 0 ? requiredAvg : requiredAvg,
            message: `To graduate with a ${tNum.toFixed(2)} CGPA, maintain an average of ${requiredAvg.toFixed(2)} across your remaining ${remainingCredits} credits.`,
        };
    }, [targetCGPA, remainingCredits, remainingTerms, earned]);

    const gradeBand = projection.state === 'ON_TRACK' ? avgToGrade(projection.requiredAvg) : null;

    return (
        <div className="mb-6 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            {/* Header */}
            <div className="px-5 pt-5 pb-3 border-b border-gray-50 bg-gray-900/[0.03]">
                <div className="flex items-center justify-between gap-3">
                    <div>
                        <h3 className="text-base font-black text-gray-900 flex items-center gap-2">
                            <GraduationCap size={17} className="text-gray-500" />
                            Graduation Target Solver
                        </h3>
                        <p className="text-xs font-medium text-gray-400 mt-0.5">
                            Reverse-engineer the exact average you need to hit your dream class.
                        </p>
                    </div>
                    <div className="text-right shrink-0">
                        <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Current CGPA</p>
                        <p className="text-2xl font-black text-gray-900 leading-none mt-0.5">
                            {earned.cgpa.toFixed(2)}
                        </p>
                        <p className="text-[9px] font-semibold text-gray-300">{earned.credits} credits earned</p>
                    </div>
                </div>
            </div>

            {/* Inputs */}
            <div className="px-5 py-4 space-y-4">
                {/* Target CGPA + presets */}
                <div>
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-wider block mb-2">
                        Target CGPA
                    </label>
                    <div className="flex flex-wrap gap-1.5 mb-2">
                        {CLASS_PRESETS.map(p => {
                            const active = parseFloat(targetCGPA) === p.gpa;
                            return (
                                <button
                                    key={p.label}
                                    type="button"
                                    onClick={() => setTargetCGPA(p.gpa)}
                                    className={`px-2.5 py-1 text-[10px] font-bold rounded-lg border transition-all ${active
                                        ? 'bg-gray-900 text-white border-gray-900'
                                        : 'bg-white text-gray-500 border-gray-200 hover:text-gray-900'
                                        }`}
                                >
                                    {p.label} · {p.gpa.toFixed(2)}
                                </button>
                            );
                        })}
                    </div>
                    <input
                        type="number"
                        step="0.01"
                        min="0"
                        max="4"
                        value={targetCGPA}
                        onChange={(e) => setTargetCGPA(e.target.value)}
                        className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-gray-900 focus:border-gray-900 outline-none transition-all font-medium text-sm"
                    />
                </div>

                {/* Target level + credits per sem (side by side) */}
                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <label className="text-[10px] font-black text-gray-500 uppercase tracking-wider block mb-2">
                            Graduate at Level
                        </label>
                        <div className="flex gap-1.5">
                            {['400', '600'].map(lvl => {
                                const active = targetLevel === lvl;
                                return (
                                    <button
                                        key={lvl}
                                        type="button"
                                        onClick={() => setTargetLevel(lvl)}
                                        className={`flex-1 py-2 text-xs font-bold rounded-xl border transition-all ${active
                                            ? 'bg-gray-900 text-white border-gray-900'
                                            : 'bg-white text-gray-500 border-gray-200 hover:text-gray-900'
                                            }`}
                                    >
                                        {lvl}
                                        <span className="block text-[8px] font-semibold opacity-60">
                                            {lvl === '400' ? '4-yr program' : 'Medical/6-yr'}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                    <div>
                        <label className="text-[10px] font-black text-gray-500 uppercase tracking-wider block mb-2">
                            Credits / Semester
                        </label>
                        <input
                            type="number"
                            min="1"
                            max="30"
                            value={creditsPerSem}
                            onChange={(e) => setCreditsPerSem(e.target.value)}
                            className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-gray-900 focus:border-gray-900 outline-none transition-all font-medium text-sm"
                        />
                    </div>
                </div>

                {/* Derived plan summary */}
                <div className="flex items-center justify-between text-[11px] font-bold text-gray-400 bg-gray-50 rounded-xl px-3 py-2">
                    <span>Remaining: <span className="text-gray-900">{remainingTerms} semesters</span></span>
                    <span>·</span>
                    <span><span className="text-gray-900">{remainingCredits}</span> credits left</span>
                </div>
            </div>

            {/* Result — 3-state honest rendering */}
            <div className="px-5 pb-5">
                {projection.state === 'ON_TRACK' && (
                    <div className="rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 p-5">
                        <div className="flex items-center gap-2 mb-3">
                            <Target size={16} className="text-blue-600" />
                            <p className="text-[10px] font-black text-blue-700 uppercase tracking-widest">Required Average</p>
                        </div>
                        <div className="flex items-end justify-between gap-3 mb-3">
                            <p className="text-5xl font-black text-blue-700 leading-none tabular-nums">
                                {projection.requiredAvg.toFixed(2)}
                            </p>
                            {gradeBand && (
                                <span className={`text-sm font-black px-3 py-1.5 rounded-xl ${gradeBand.color}`}>
                                    ≈ {gradeBand.grade} average
                                </span>
                            )}
                        </div>
                        <p className="text-xs font-medium text-blue-900/80 leading-relaxed">{projection.message}</p>
                        {remainingTerms > 0 && (
                            <p className="text-[11px] font-bold text-blue-600/70 mt-2 flex items-center gap-1">
                                <TrendingUp size={12} />
                                That's ≈ {projection.requiredAvg.toFixed(2)} per semester for your next {remainingTerms} semester{remainingTerms !== 1 ? 's' : ''}.
                            </p>
                        )}
                    </div>
                )}

                {projection.state === 'IMPOSSIBLE' && (
                    <div className="rounded-2xl bg-red-50 border border-red-100 p-5">
                        <div className="flex items-center gap-2 mb-3">
                            <AlertTriangle size={16} className="text-red-600" />
                            <p className="text-[10px] font-black text-red-700 uppercase tracking-widest">Target Out of Reach</p>
                        </div>
                        <div className="flex items-end gap-3 mb-3">
                            <p className="text-4xl font-black text-red-600 leading-none tabular-nums">
                                {projection.ceiling.toFixed(2)}
                            </p>
                            <p className="text-xs font-bold text-red-500 pb-1">your realistic ceiling</p>
                        </div>
                        <p className="text-xs font-medium text-red-900/80 leading-relaxed">{projection.message}</p>
                    </div>
                )}

                {projection.state === 'SECURED' && (
                    <div className="rounded-2xl bg-green-50 border border-green-100 p-5">
                        <div className="flex items-center gap-2 mb-3">
                            <ShieldCheck size={16} className="text-green-600" />
                            <p className="text-[10px] font-black text-green-700 uppercase tracking-widest">Target Secured</p>
                        </div>
                        <div className="flex items-end gap-3 mb-3">
                            <p className="text-4xl font-black text-green-600 leading-none tabular-nums">
                                {projection.floor.toFixed(2)}
                            </p>
                            <p className="text-xs font-bold text-green-500 pb-1">your worst-case floor</p>
                        </div>
                        <p className="text-xs font-medium text-green-900/80 leading-relaxed">{projection.message}</p>
                    </div>
                )}

                {projection.state === 'COMPLETE' && (
                    <div className="rounded-2xl bg-gray-50 border border-gray-100 p-5">
                        <div className="flex items-center gap-2 mb-3">
                            <Lock size={16} className="text-gray-500" />
                            <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Plan Complete</p>
                        </div>
                        <div className="flex items-end gap-3 mb-3">
                            <p className="text-4xl font-black text-gray-700 leading-none tabular-nums">
                                {projection.finalCGPA.toFixed(2)}
                            </p>
                            <p className="text-xs font-bold text-gray-400 pb-1">locked final CGPA</p>
                        </div>
                        <p className="text-xs font-medium text-gray-600 leading-relaxed">{projection.message}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default GraduationTargetSolver;
