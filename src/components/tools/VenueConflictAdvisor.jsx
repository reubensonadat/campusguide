import React, { useMemo, useState } from 'react';
import { AlertTriangle, X, MapPin } from 'lucide-react';
import CampusMapData from '../guide/content/ucc/CampusMap';
import { calculateDistance } from '../../utils/navigation';

/**
 * VenueConflictAdvisor
 *
 * Subtle, dismissible advisory that flags back-to-back classes whose venues
 * are far apart (e.g. Old Site → New Site, ~1 km). Per product note, cross-site
 * back-to-backs are rare at UCC, so this is AMBER advisory — never a red alarm,
 * never blocks saving, and renders NOTHING when there's no problem (no "all clear"
 * noise).
 *
 * Pure local computation (no network), so there is no error/loading state — only
 * "conflicts found" vs "silent". Existing timetable data is never mutated.
 *
 * Location is free-text, so venues are fuzzy-matched against the campus buildings
 * list (which carries lat/lng). Unmatched venues are skipped silently to avoid
 * false positives.
 */

const BACK_TO_BACK_GAP_MIN = 30;   // classes within 30 min count as back-to-back
const DISTANCE_THRESHOLD_M = 700;  // > 700 m ≈ cross-site (Old ↔ New ≈ 1 km)

const toMinutes = (t) => {
    if (!t) return null;
    const parts = t.split(':').map(Number);
    if (parts.length < 2 || parts.some(isNaN)) return null;
    return parts[0] * 60 + parts[1];
};

const VenueConflictAdvisor = ({ courses = [] }) => {
    const [dismissed, setDismissed] = useState(false);

    // Buildings + coordinate parser (stable for the component's life)
    const { buildings, getCoordinates } = useMemo(() => CampusMapData(), []);

    const conflicts = useMemo(() => {
        if (!courses || courses.length === 0) return [];

        // Resolve free-text location → [lng, lat] for calculateDistance, or null.
        // Defined inside the memo so it always sees the current buildings.
        const resolveCoords = (locationText) => {
            if (!locationText) return null;
            const text = locationText.toLowerCase().trim();
            for (const b of buildings) {
                const candidates = [b.shortForm, b.fullName]
                    .filter(Boolean)
                    .map(s => s.toLowerCase());
                const match = candidates.some(c =>
                    c.length > 2 && (text.includes(c) || c.includes(text))
                );
                if (match) {
                    const coords = getCoordinates(b.url); // [lat, lng]
                    if (coords) return [coords[1], coords[0]]; // → [lng, lat]
                }
            }
            return null;
        };

        // Group by day
        const byDay = {};
        courses.forEach(c => {
            if (!c.day) return;
            (byDay[c.day] = byDay[c.day] || []).push(c);
        });

        const found = [];
        Object.entries(byDay).forEach(([day, dayCourses]) => {
            const sorted = [...dayCourses].sort(
                (a, b) => (toMinutes(a.startTime) ?? 0) - (toMinutes(b.startTime) ?? 0)
            );
            for (let i = 0; i < sorted.length - 1; i++) {
                const a = sorted[i];
                const b = sorted[i + 1];
                const endA = toMinutes(a.endTime);
                const startB = toMinutes(b.startTime);
                if (endA == null || startB == null) continue;

                const gap = startB - endA;
                // Only flag genuine back-to-back (gap 0..30 min). Negative gap = a
                // time clash, which is a separate concern not handled here.
                if (gap >= 0 && gap <= BACK_TO_BACK_GAP_MIN) {
                    const coordA = resolveCoords(a.location);
                    const coordB = resolveCoords(b.location);
                    if (coordA && coordB) {
                        const dist = calculateDistance(coordA, coordB);
                        if (dist > DISTANCE_THRESHOLD_M) {
                            found.push({ day, from: a, to: b, dist: Math.round(dist) });
                        }
                    }
                }
            }
        });
        return found;
    }, [courses, buildings, getCoordinates]);

    // Silent when dismissed or when there's nothing to flag
    if (dismissed || conflicts.length === 0) return null;

    return (
        <div className="mb-6 mt-6 p-4 bg-amber-50 border border-amber-200 rounded-2xl shadow-sm animate-in fade-in slide-in-from-top-2 duration-300">
            <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex items-center gap-2">
                    <AlertTriangle size={18} className="text-amber-600 shrink-0" />
                    <h3 className="font-bold text-amber-900 text-sm">Venue distance advisory</h3>
                </div>
                <button
                    onClick={() => setDismissed(true)}
                    className="p-1 text-amber-400 hover:text-amber-600 shrink-0"
                    aria-label="Dismiss advisory"
                >
                    <X size={16} />
                </button>
            </div>
            <p className="text-xs text-amber-800 font-medium mb-3 leading-relaxed">
                Some back-to-back classes are far apart — you may be late moving between venues.
            </p>
            <div className="space-y-2">
                {conflicts.map((cf, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs bg-white/70 rounded-xl px-3 py-2 border border-amber-100">
                        <MapPin size={12} className="text-amber-500 shrink-0" />
                        <span className="font-bold text-amber-900 shrink-0">{cf.day}:</span>
                        <span className="text-amber-800 min-w-0">
                            <strong>{cf.from.name}</strong> ({cf.from.location || '?'})
                            <span className="mx-1 text-amber-400">→</span>
                            <strong>{cf.to.name}</strong> ({cf.to.location || '?'})
                        </span>
                        <span className="ml-auto font-black text-amber-700 shrink-0 whitespace-nowrap">
                            ~{(cf.dist / 1000).toFixed(1)} km
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default VenueConflictAdvisor;
