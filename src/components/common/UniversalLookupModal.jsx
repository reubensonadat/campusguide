import React, { useState, useMemo, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, BookOpen, Calendar, Globe, X, ExternalLink, Ruler, Package, Clock, CheckSquare, FileText, User, Tag, MessageCircle, Megaphone, Store } from 'lucide-react';
import { CAMPUS_COURSES } from '../../data/courses';
import { CAMPUSES } from '../../data/campuses';
import { academicCalendar } from '../../data/academicCalendar';
import { formulasData } from '../../data/formulas';
import { FRESHER_LIST } from '../../data/packingLists';

const CATEGORY_CONFIG = {
  courses: { icon: BookOpen, label: 'Courses', color: 'text-indigo-600', bg: 'bg-indigo-50' },
  campuses: { icon: MapPin, label: 'Campuses', color: 'text-emerald-600', bg: 'bg-emerald-50' },
  buildings: { icon: MapPin, label: 'Buildings', color: 'text-blue-600', bg: 'bg-blue-50' },
  calendar: { icon: Calendar, label: 'Academic Calendar', color: 'text-amber-600', bg: 'bg-amber-50' },
  formulas: { icon: Ruler, label: 'Formulas', color: 'text-purple-600', bg: 'bg-purple-50' },
  packing: { icon: Package, label: 'Packing Lists', color: 'text-pink-600', bg: 'bg-pink-50' },
  timetable: { icon: Clock, label: 'Timetable', color: 'text-cyan-600', bg: 'bg-cyan-50' },
  assignments: { icon: CheckSquare, label: 'Assignments', color: 'text-orange-600', bg: 'bg-orange-50' },
  tasks: { icon: FileText, label: 'Tasks', color: 'text-rose-600', bg: 'bg-rose-50' },
  users: { icon: User, label: 'Users', color: 'text-violet-600', bg: 'bg-violet-50' },
  thrift: { icon: Tag, label: 'Thrift Store', color: 'text-rose-600', bg: 'bg-rose-50' },
  whispers: { icon: MessageCircle, label: 'Whispers', color: 'text-pink-600', bg: 'bg-pink-50' },
  announcements: { icon: Megaphone, label: 'Announcements', color: 'text-orange-600', bg: 'bg-orange-50' },
  ads: { icon: Store, label: 'Businesses', color: 'text-teal-600', bg: 'bg-teal-50' },
};

const searchCourses = (q) => {
  const lower = q.toLowerCase();
  return CAMPUS_COURSES
    .filter(c => c.toLowerCase().includes(lower))
    .slice(0, 5)
    .map(c => ({ type: 'courses', label: c }));
};

const searchCampuses = (q) => {
  const lower = q.toLowerCase();
  return CAMPUSES
    .filter(c => c.name.toLowerCase().includes(lower) || c.shortName.toLowerCase().includes(lower))
    .slice(0, 3)
    .map(c => ({ type: 'campuses', label: `${c.name} (${c.shortName})`, meta: c.location, id: c.id }));
};

const searchCalendar = (q) => {
  const lower = q.toLowerCase();
  return academicCalendar
    .filter(e => e.title.toLowerCase().includes(lower))
    .slice(0, 5)
    .map(e => ({ type: 'calendar', label: e.title, meta: e.date }));
};

const searchFormulas = (q) => {
  const lower = q.toLowerCase();
  const results = [];
  for (const cat of formulasData) {
    for (const f of cat.formulas) {
      if (f.name.toLowerCase().includes(lower) || f.description?.toLowerCase().includes(lower)) {
        results.push({ type: 'formulas', label: f.name, meta: cat.category, id: f.id });
        if (results.length >= 3) break;
      }
    }
    if (results.length >= 3) break;
  }
  return results;
};

const searchPacking = (q) => {
  const lower = q.toLowerCase();
  const results = [];
  for (const [sectionName, items] of Object.entries(FRESHER_LIST)) {
    for (const item of items) {
      if (item.toLowerCase().includes(lower)) {
        results.push({ type: 'packing', label: item, meta: sectionName });
        if (results.length >= 3) break;
      }
    }
    if (results.length >= 3) break;
  }
  return results;
};

const searchLocalData = (q) => {
  if (!q?.trim()) return {};
  const results = {};
  for (const item of searchCourses(q)) { if (!results[item.type]) results[item.type] = []; results[item.type].push(item); }
  for (const item of searchCampuses(q)) { if (!results[item.type]) results[item.type] = []; results[item.type].push(item); }
  for (const item of searchCalendar(q)) { if (!results[item.type]) results[item.type] = []; results[item.type].push(item); }
  for (const item of searchFormulas(q)) { if (!results[item.type]) results[item.type] = []; results[item.type].push(item); }
  for (const item of searchPacking(q)) { if (!results[item.type]) results[item.type] = []; results[item.type].push(item); }
  return results;
};

const searchUserData = (q) => {
  if (!q?.trim()) return {};
  const lower = q.toLowerCase();
  const results = {};

  try {
    const timetable = JSON.parse(localStorage.getItem('ucc_timetable') || '[]');
    const matches = timetable.filter(t => (t.name || '').toLowerCase().includes(lower) || (t.location || '').toLowerCase().includes(lower) || (t.lecturer || '').toLowerCase().includes(lower));
    if (matches.length > 0) results.timetable = matches.slice(0, 4).map(t => ({ type: 'timetable', label: t.name, meta: `${t.day} ${t.startTime || ''}${t.location ? ' · ' + t.location : ''}`, time: t.startTime, id: t.id }));
  } catch {}

  try {
    const assignments = JSON.parse(localStorage.getItem('ucc_assignments') || '[]');
    const matches = assignments.filter(a => (a.title || '').toLowerCase().includes(lower) || (a.course || '').toLowerCase().includes(lower));
    if (matches.length > 0) results.assignments = matches.slice(0, 4).map(a => ({ type: 'assignments', label: a.title, meta: `${a.course || ''}${a.dueDate ? ' · Due ' + a.dueDate : ''}`, id: a.id }));
  } catch {}

  try {
    const tasks = JSON.parse(localStorage.getItem('ucc_daily_tasks') || '[]');
    const matches = tasks.filter(t => (t.title || '').toLowerCase().includes(lower));
    if (matches.length > 0) results.tasks = matches.slice(0, 4).map(t => ({ type: 'tasks', label: t.title, meta: t.date || '', id: t.id }));
  } catch {}

  return results;
};

const UniversalLookupModal = ({ query, onClose }) => {
  const navigate = useNavigate();
  const [dbResults, setDbResults] = useState(null);
  const [dbLoading, setDbLoading] = useState(false);
  const [inputValue, setInputValue] = useState(query || '');
  const [activeQuery, setActiveQuery] = useState(query || '');

  useEffect(() => {
    if (query) {
      setInputValue(query);
      setActiveQuery(query);
    }
  }, [query]);

  const localResults = useMemo(() => {
    return { ...searchLocalData(activeQuery), ...searchUserData(activeQuery) };
  }, [activeQuery]);

  useEffect(() => {
    if (!activeQuery?.trim()) return;
    let cancelled = false;
    setDbLoading(true);

    (async () => {
      try {
        const { supabase } = await import('../../lib/supabase');
        const [buildingsRes, usersRes, thriftRes, whispersRes, annRes, adsRes] = await Promise.all([
          supabase.from('campus_buildings')
            .select('full_name, short_form, category, description')
            .or(`full_name.ilike.%${activeQuery}%,short_form.ilike.%${activeQuery}%`)
            .eq('is_active', true)
            .limit(5),
          supabase.from('users')
            .select('username, name, avatar_url')
            .ilike('username', `%${activeQuery}%`)
            .not('username', 'is', null)
            .limit(5),
          supabase.from('thrift_listings')
            .select('id, item_name, price, description, image_url, created_at')
            .eq('status', 'ACTIVE')
            .eq('is_sold', false)
            .or(`item_name.ilike.%${activeQuery}%,description.ilike.%${activeQuery}%`)
            .order('created_at', { ascending: false })
            .limit(5),
          supabase.from('campus_whispers')
            .select('id, text, created_at')
            .ilike('text', `%${activeQuery}%`)
            .order('created_at', { ascending: false })
            .limit(5),
          supabase.from('announcements')
            .select('id, title, description, created_at')
            .or(`title.ilike.%${activeQuery}%,description.ilike.%${activeQuery}%`)
            .order('created_at', { ascending: false })
            .limit(5),
          supabase.from('advertisements')
            .select('id, title, description, category, image_url, price')
            .ilike('status', 'active')
            .or(`title.ilike.%${activeQuery}%,description.ilike.%${activeQuery}%,category.ilike.%${activeQuery}%`)
            .order('created_at', { ascending: false })
            .limit(5)
        ]);
        const results = {};
        if (buildingsRes.data?.length > 0) {
          results.buildings = buildingsRes.data.map(b => ({
            type: 'buildings', label: b.full_name,
            meta: `${b.short_form || ''}${b.category ? ' · ' + b.category : ''}`,
          }));
        }
        if (usersRes.data?.length > 0) {
          results.users = usersRes.data.map(u => ({
            type: 'users', label: `@${u.username}`, meta: u.name || '',
          }));
        }
        if (thriftRes.data?.length > 0) {
          results.thrift = thriftRes.data.map(t => ({
            type: 'thrift', label: t.item_name,
            meta: `GH₵${t.price}${t.description ? ' · ' + t.description.slice(0, 60) : ''}`,
            id: t.id, image: t.image_url,
          }));
        }
        if (whispersRes.data?.length > 0) {
          results.whispers = whispersRes.data.map(w => ({
            type: 'whispers', label: w.text.slice(0, 80) + (w.text.length > 80 ? '...' : ''),
            meta: new Date(w.created_at).toLocaleDateString(),
            id: w.id,
          }));
        }
        if (annRes.data?.length > 0) {
          results.announcements = annRes.data.map(a => ({
            type: 'announcements', label: a.title,
            meta: a.description ? a.description.slice(0, 80) + (a.description.length > 80 ? '...' : '') : '',
            id: a.id,
          }));
        }
        if (adsRes.data?.length > 0) {
          results.ads = adsRes.data.map(a => ({
            type: 'ads', label: a.title,
            meta: `${a.category || ''}${a.price ? ' · GH₵' + a.price : ''}`,
            id: a.id, image: a.image_url,
          }));
        }
        if (!cancelled) setDbResults(Object.keys(results).length > 0 ? results : {});
      } catch {
        if (!cancelled) setDbResults({});
      }
      if (!cancelled) setDbLoading(false);
    })();

    return () => { cancelled = true; };
  }, [activeQuery]);

  const allCategories = useMemo(() => {
    const cats = [];
    for (const [key, items] of Object.entries(localResults)) {
      if (items.length > 0) cats.push({ key, items });
    }
    if (dbResults) {
      for (const [key, items] of Object.entries(dbResults)) {
        if (items.length > 0 && !cats.find(c => c.key === key)) cats.push({ key, items });
      }
    }
    return cats;
  }, [localResults, dbResults]);

  const totalResults = useMemo(() => {
    let count = 0;
    for (const [, items] of Object.entries(localResults)) count += items.length;
    if (dbResults) for (const [, items] of Object.entries(dbResults)) count += items.length;
    return count;
  }, [localResults, dbResults]);

  const handleResultClick = (item) => {
    onClose();
    switch (item.type) {
      case 'courses':
      case 'buildings':
        navigate(`/guide?q=${encodeURIComponent(item.label)}`);
        break;
      case 'campuses':
        navigate(`/guide`);
        break;
      case 'calendar':
        navigate(`/planner?date=${item.meta}`);
        break;
      case 'formulas':
        navigate(`/tools?formula=${item.id}`);
        break;
      case 'packing':
        navigate(`/tools?tab=packing`);
        break;
      case 'timetable':
        navigate(`/tools?tab=timetable&highlight=${item.id}`);
        break;
      case 'assignments':
        navigate(`/tools?tab=assignments`);
        break;
      case 'tasks':
        navigate(`/tools?tab=planner`);
        break;
      case 'users':
        navigate(`/profile`);
        break;
      case 'thrift':
        navigate(`/community?tab=thrift`);
        break;
      case 'whispers':
        navigate(`/community?tab=whispers`);
        break;
      case 'announcements':
        navigate(`/`);
        break;
      case 'ads':
        navigate(`/community?tab=ads`);
        break;
    }
  };

  const handleGoogleSearch = () => {
    onClose();
    window.open(`https://www.google.com/search?q=${encodeURIComponent(activeQuery)}`, '_blank', 'noopener');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const val = inputValue.trim();
    if (val) setActiveQuery(val);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    if (!e.target.value.trim()) {
      setActiveQuery('');
      setDbResults(null);
    }
  };

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = '' };
  }, []);

  return createPortal(
    <div className="fixed inset-0 z-[2147483647] flex items-end sm:items-center justify-center bg-black/40 backdrop-blur-sm p-0 sm:p-4 animate-in fade-in duration-200">
      <div className="w-full sm:w-[90vw] sm:max-w-lg max-h-[90vh] flex flex-col bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl animate-in slide-in-from-bottom-8 sm:slide-in-from-bottom-4 duration-300 overflow-hidden">
        {/* Header */}
        <div className="flex items-center gap-3 p-5 border-b border-gray-100 flex-shrink-0">
          <div className="w-10 h-10 rounded-2xl bg-indigo-50 flex items-center justify-center shrink-0">
            <Search size={18} className="text-indigo-600" />
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-lg font-black text-gray-900">Look Up</h2>
            {activeQuery ? (
              <p className="text-sm text-gray-500 font-medium mt-0.5 truncate">"{activeQuery}"</p>
            ) : (
              <p className="text-xs text-gray-400 font-medium mt-0.5">Search anything on Campus Guide</p>
            )}
          </div>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-900 bg-gray-50 hover:bg-gray-100 rounded-full transition-colors shrink-0">
            <X size={20} />
          </button>
        </div>

        {/* Search Input (shown when no query or when opened from nav) */}
        {!query && (
          <div className="px-4 pt-3 pb-1 flex-shrink-0">
            <form onSubmit={handleSearch} className="relative">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                placeholder="Search courses, buildings, people..."
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:bg-white transition-colors"
                autoFocus
              />
            </form>
          </div>
        )}

        {/* Results */}
        <div className="flex-1 overflow-y-auto p-4 pt-3 pb-6 space-y-5">
          {activeQuery && allCategories.length === 0 && !dbLoading && (
            <div className="text-center py-10">
              <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                <Search size={24} className="text-gray-300" />
              </div>
              <p className="text-sm font-bold text-gray-900 mb-1">No results found</p>
              <p className="text-xs text-gray-500 mb-5">Nothing in the app matches your selection.</p>
              <button
                onClick={handleGoogleSearch}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-900 text-white rounded-xl font-bold text-sm hover:bg-black transition-all active:scale-95 shadow-md"
              >
                <Globe size={16} />
                Search on Google
              </button>
            </div>
          )}

          {activeQuery && allCategories.length === 0 && dbLoading && (
            <div className="text-center py-10">
              <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4 animate-pulse">
                <Search size={24} className="text-gray-300" />
              </div>
              <p className="text-sm font-bold text-gray-400">Searching...</p>
            </div>
          )}

          {!activeQuery && (
            <div className="text-center py-14">
              <div className="w-16 h-16 rounded-full bg-indigo-50 flex items-center justify-center mx-auto mb-4">
                <Search size={28} className="text-indigo-400" />
              </div>
              <p className="text-sm font-bold text-gray-900 mb-1">What are you looking for?</p>
              <p className="text-xs text-gray-500">Type above to search across courses, campus buildings, your schedule, and more.</p>
            </div>
          )}

          {allCategories.map(({ key, items }) => {
            const config = CATEGORY_CONFIG[key] || { icon: Search, label: key, color: 'text-gray-600', bg: 'bg-gray-50' };
            const Icon = config.icon;
            return (
              <div key={key}>
                <div className="flex items-center gap-2 mb-2.5 px-1">
                  <div className={`w-6 h-6 rounded-lg ${config.bg} flex items-center justify-center`}>
                    <Icon size={12} className={config.color} />
                  </div>
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">{config.label}</span>
                  <span className="text-[10px] font-bold text-gray-300 ml-auto">{items.length}</span>
                </div>
                <div className="space-y-1.5">
                  {items.map((item, idx) => (
                    <button
                      key={`${key}-${idx}`}
                      onClick={() => handleResultClick(item)}
                      className="w-full flex items-center gap-3.5 p-3.5 rounded-2xl bg-gray-50 hover:bg-gray-100 hover:shadow-sm transition-all active:scale-[0.98] text-left border border-transparent hover:border-gray-200"
                    >
                      <div className={`w-9 h-9 rounded-xl ${config.bg} flex items-center justify-center shrink-0`}>
                        <Icon size={15} className={config.color} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="block text-sm font-bold text-gray-900 truncate">{item.label}</span>
                        {item.meta && <span className="block text-xs text-gray-400 truncate mt-0.5">{item.meta}</span>}
                      </div>
                      <ExternalLink size={14} className="text-gray-300 shrink-0" />
                    </button>
                  ))}
                </div>
              </div>
            );
          })}

          {activeQuery && totalResults > 0 && (
            <div className="pt-1">
              <button
                onClick={handleGoogleSearch}
                className="w-full flex items-center justify-center gap-2.5 py-3.5 rounded-2xl bg-gray-900 hover:bg-black text-white font-bold text-sm transition-all active:scale-[0.98] shadow-md"
              >
                <Globe size={16} />
                Search "{activeQuery}" on Google
              </button>
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default UniversalLookupModal;