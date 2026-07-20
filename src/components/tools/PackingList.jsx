import React, { useState, useMemo, useCallback, useEffect, useRef } from 'react';
import { Search, ChevronDown, Check, RotateCcw, Package, Download, Loader2, Plus, X, Lightbulb, Edit3 } from 'lucide-react';
import { toBlob } from 'html-to-image';
import { toast } from 'react-hot-toast';
import ConfirmModal from '../common/ConfirmModal';
import { FRESHER_LIST, GOING_HOME_LIST, COMING_TO_SCHOOL_LIST } from '../../data/packingLists';

const SCENARIOS = [
  { id: 'fresher', label: 'Fresher', icon: '🎓', data: FRESHER_LIST },
  { id: 'going-home', label: 'Going Home', icon: '🏠', data: GOING_HOME_LIST },
  { id: 'coming-to-school', label: 'Coming to School', icon: '📚', data: COMING_TO_SCHOOL_LIST },
];

const LS_PREFIX = 'campus_packing_list_';
const LS_CUSTOM = 'campus_packing_custom_';

const getCustomItems = (scenarioId) => {
  try {
    const saved = localStorage.getItem(`${LS_CUSTOM}${scenarioId}`);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch {}
  return [];
};

const saveCustomItems = (scenarioId, items) => {
  localStorage.setItem(`${LS_CUSTOM}${scenarioId}`, JSON.stringify(items));
};

const getInitialChecked = (scenarioId) => {
  try {
    const saved = localStorage.getItem(`${LS_PREFIX}${scenarioId}`);
    if (saved) return JSON.parse(saved);
  } catch {}
  return {};
};

const flattenItems = (data) => {
  const items = [];
  for (const [category, itemList] of Object.entries(data)) {
    for (const item of itemList) {
      items.push({ category, item });
    }
  }
  return items;
};

const PackingList = () => {
  const [activeScenario, setActiveScenario] = useState('fresher');
  const [checked, setChecked] = useState(() => getInitialChecked('fresher'));
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedCategories, setExpandedCategories] = useState({});
  const [customItems, setCustomItems] = useState(() => getCustomItems('fresher'));
  const [myListInput, setMyListInput] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [exporting, setExporting] = useState(false);
  const searchRef = useRef(null);
  const contentRef = useRef(null);
  const myListRef = useRef(null);

  const scenarioData = useMemo(() => {
    return SCENARIOS.find(s => s.id === activeScenario)?.data || {};
  }, [activeScenario]);

  const allBuiltInItems = useMemo(() => {
    const items = new Set();
    for (const list of Object.values(scenarioData)) {
      for (const item of list) items.add(item);
    }
    return [...items];
  }, [scenarioData]);

  const flatItems = useMemo(() => flattenItems(scenarioData), [scenarioData]);

  const filteredCategories = useMemo(() => {
    const merged = Object.entries(scenarioData).map(([category, items]) => ({
      category,
      items: [...items],
    }));
    if (!searchQuery.trim()) return merged;
    const q = searchQuery.toLowerCase().trim();
    return merged
      .map(({ category, items }) => ({
        category,
        items: items.filter(item => item.toLowerCase().includes(q)),
      }))
      .filter(({ items }) => items.length > 0);
  }, [scenarioData, searchQuery]);

  const totalItems = useMemo(() => flatItems.length + customItems.length, [flatItems, customItems]);
  const checkedCount = useMemo(
    () => flatItems.filter(({ item }) => checked[item]).length + customItems.filter(i => checked[i]).length,
    [flatItems, checked, customItems]
  );

  useEffect(() => {
    setChecked(getInitialChecked(activeScenario));
    setCustomItems(getCustomItems(activeScenario));
    setExpandedCategories({});
    setSearchQuery('');
    setMyListInput('');
    setSuggestions([]);
    setShowSuggestions(false);
  }, [activeScenario]);

  useEffect(() => {
    localStorage.setItem(`${LS_PREFIX}${activeScenario}`, JSON.stringify(checked));
  }, [checked, activeScenario]);

  useEffect(() => {
    saveCustomItems(activeScenario, customItems);
  }, [customItems, activeScenario]);

  const toggleItem = useCallback((item) => {
    setChecked(prev => ({ ...prev, [item]: !prev[item] }));
  }, []);

  const toggleCategory = useCallback((category) => {
    setExpandedCategories(prev => ({ ...prev, [category]: !prev[category] }));
  }, []);

  const updateSuggestions = useCallback((value) => {
    if (!value.trim()) { setSuggestions([]); setShowSuggestions(false); return; }
    const q = value.toLowerCase();
    const matches = allBuiltInItems.filter(i => i.toLowerCase().includes(q) && !customItems.includes(i) && i.toLowerCase() !== q);
    setSuggestions(matches.slice(0, 8));
    setShowSuggestions(matches.length > 0);
  }, [allBuiltInItems, customItems]);

  const addToMyList = useCallback((item) => {
    const text = item || myListInput.trim();
    if (!text || customItems.includes(text)) return;
    setCustomItems(prev => [...prev, text]);
    setMyListInput('');
    setSuggestions([]);
    setShowSuggestions(false);
  }, [myListInput, customItems]);

  const removeFromMyList = useCallback((item) => {
    setCustomItems(prev => prev.filter(i => i !== item));
    setChecked(prev => {
      const next = { ...prev };
      delete next[item];
      return next;
    });
  }, []);

  const resetAll = useCallback(() => {
    setChecked({});
    setCustomItems([]);
  }, []);

  useEffect(() => {
    if (exporting) {
      const scenario = SCENARIOS.find(s => s.id === activeScenario);
      toast.loading('Preparing export...', { id: 'packing-export' });
      requestAnimationFrame(() => {
        setTimeout(async () => {
          await exportAsImage(contentRef.current, scenario?.label || 'packing-list');
          setExporting(false);
        }, 100);
      });
    }
  }, [exporting, activeScenario]);

  const getCategoryProgress = useCallback(
    (items) => {
      const checkedInCategory = items.filter(item => checked[item]).length;
      return { checked: checkedInCategory, total: items.length };
    },
    [checked]
  );

  return (
    <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-gray-100 overflow-hidden">
      <div className="p-6 md:p-8 border-b border-gray-100 bg-slate-50">
        <div className="flex items-center justify-between mb-4">
          <div className="min-w-0 flex-1">
            <h2 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2 truncate">
              <Package size={24} className="text-primary-500 flex-shrink-0" />
              <span className="truncate">Packing List</span>
            </h2>
            <p className="text-sm font-medium text-slate-500 mt-1 truncate">
              {checkedCount} / {totalItems} items checked
            </p>
          </div>
          <div className="flex items-center gap-1.5 flex-shrink-0">
            <button
              onClick={() => setExporting(true)}
              disabled={exporting}
              className="flex items-center gap-1.5 text-xs font-bold text-gray-600 bg-gray-100 px-3 py-2 rounded-xl hover:bg-gray-200 transition-colors active:scale-95 whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {exporting ? <Loader2 size={14} className="animate-spin" /> : <Download size={14} />}
              {exporting ? 'Exporting...' : 'Export'}
            </button>
            <button
              onClick={() => setShowResetConfirm(true)}
              className="flex items-center gap-1.5 text-xs font-bold text-red-500 bg-red-50 px-3 py-2 rounded-xl hover:bg-red-100 transition-colors active:scale-95 whitespace-nowrap"
            >
              <RotateCcw size={14} />
              Reset
            </button>
          </div>
        </div>

        <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {SCENARIOS.map(scenario => (
            <button
              key={scenario.id}
              onClick={() => setActiveScenario(scenario.id)}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                activeScenario === scenario.id
                  ? 'bg-gray-900 text-white shadow-sm'
                  : 'bg-white text-gray-500 border border-gray-200 hover:bg-gray-50'
              }`}
            >
              <span>{scenario.icon}</span>
              {scenario.label}
            </button>
          ))}
        </div>

        <div className="relative mt-4">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          <input
            ref={searchRef}
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search items across all categories..."
            className="w-full bg-white border border-gray-200 rounded-xl pl-10 pr-4 py-2.5 text-sm font-medium text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-900 transition-all"
          />
        </div>
      </div>

      <div ref={contentRef} className="p-6 md:p-8 space-y-3">
        {!searchQuery && (
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-5 shadow-sm border border-amber-200/50">
            <div className="flex items-center gap-2 mb-3">
              <Edit3 size={16} className="text-amber-600" />
              <h3 className="font-black text-amber-900 text-sm">My List</h3>
            </div>
            <div className="relative">
              <input
                ref={myListRef}
                type="text"
                value={myListInput}
                onChange={(e) => { setMyListInput(e.target.value); updateSuggestions(e.target.value); }}
                onKeyDown={(e) => { if (e.key === 'Enter') addToMyList(); }}
                placeholder="Type an item and press Enter..."
                className="w-full bg-white border border-amber-200 rounded-xl px-4 py-2.5 text-sm font-medium text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-400 transition-all"
              />
              {showSuggestions && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg z-10 overflow-hidden">
                  {suggestions.map((s) => (
                    <button
                      key={s}
                      onClick={() => { addToMyList(s); myListRef.current?.focus(); }}
                      className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-amber-50 hover:text-amber-900 transition-colors text-left"
                    >
                      <Lightbulb size={14} className="text-amber-400 flex-shrink-0" />
                      <span>{s}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
            {customItems.length > 0 && (
              <div className="mt-3 space-y-1">
                {customItems.map(item => (
                  <div key={item} className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/80 group">
                    <label
                      onClick={() => toggleItem(item)}
                      className="flex-1 flex items-center gap-2 cursor-pointer"
                    >
                      <div className={`w-4 h-4 rounded border-2 flex items-center justify-center flex-shrink-0 transition-all ${checked[item] ? 'bg-gray-900 border-gray-900 text-white' : 'border-gray-300 bg-white'}`}>
                        {checked[item] && <Check size={10} strokeWidth={3} />}
                      </div>
                      <span className={`text-sm font-medium ${checked[item] ? 'line-through text-gray-400' : 'text-gray-700'}`}>{item}</span>
                    </label>
                    <button
                      onClick={() => removeFromMyList(item)}
                      className="p-1 text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all flex-shrink-0"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {filteredCategories.map(({ category, items }) => {
          const { checked: catChecked, total: catTotal } = getCategoryProgress(items);
          const progress = catTotal > 0 ? Math.round((catChecked / catTotal) * 100) : 0;
          const isExpanded = expandedCategories[category];

          return (
            <div key={category} className="bg-gray-100 rounded-2xl p-5 shadow-sm">
              <button
                onClick={() => toggleCategory(category)}
                className="w-full flex items-center gap-3 text-left"
              >
                <div className="flex-1 min-w-0">
                  <h3 className="font-black text-gray-900 text-sm">{category}</h3>
                  <div className="flex items-center gap-2 mt-1.5">
                    <div className="flex-1 h-1.5 bg-white rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gray-900 rounded-full transition-all duration-300"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                    <span className="text-[11px] font-bold text-gray-500 whitespace-nowrap">
                      {catChecked}/{catTotal}
                    </span>
                  </div>
                </div>
                <ChevronDown
                  size={18}
                  className={`text-gray-400 transition-transform duration-200 flex-shrink-0 ${
                    isExpanded ? 'rotate-180' : ''
                  }`}
                />
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  isExpanded ? 'mt-4 opacity-100' : 'max-h-0 opacity-0 mt-0'
                }`}
              >
                <div className="space-y-1">
                  {items.map(item => {
                    const isChecked = !!checked[item];
                    return (
                      <label
                        key={item}
                        onClick={() => toggleItem(item)}
                        className={`flex items-center gap-3 px-3 py-2 rounded-xl cursor-pointer transition-all ${
                          isChecked
                            ? 'bg-white/70 text-gray-500 line-through'
                            : 'bg-white hover:bg-white/80 text-gray-900'
                        }`}
                      >
                        <div
                          className={`w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                            isChecked
                              ? 'bg-gray-900 border-gray-900 text-white'
                              : 'border-gray-300 bg-white'
                          }`}
                        >
                          {isChecked && <Check size={12} strokeWidth={3} />}
                        </div>
                        <span className={`text-sm font-medium ${isChecked ? 'line-through' : ''}`}>
                          {item}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}

        {filteredCategories.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4 text-gray-400">
              <Search size={32} />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">No items found</h3>
            <p className="text-sm text-gray-500 max-w-xs">
              Try a different search term or reset your filter.
            </p>
          </div>
        )}
      </div>
      <ConfirmModal
        open={showResetConfirm}
        title="Reset packing list?"
        message="This will uncheck all items in the current list. This cannot be undone."
        confirmLabel="Reset All"
        cancelLabel="Cancel"
        variant="danger"
        onConfirm={() => { resetAll(); setShowResetConfirm(false); }}
        onCancel={() => setShowResetConfirm(false)}
      />
    </div>
  );
};

const exportAsImage = async (el, scenarioLabel) => {
  if (!el) return;
  try {
    const blob = await toBlob(el, {
      backgroundColor: '#ffffff',
      pixelRatio: 1,
      cacheBust: true,
      filter: (node) => {
        if (node instanceof HTMLElement) {
          if (node.closest && node.closest('[data-export-hide]')) return false;
        }
        return true;
      }
    });
    if (!blob) throw new Error('Failed to generate image');
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download = `packing-list-${scenarioLabel.toLowerCase().replace(/\s+/g, '-')}.png`;
    link.href = url;
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 10000);
    toast.success('Export complete!', { id: 'packing-export' });
  } catch (err) {
    toast.error('Export failed. Try a shorter list.', { id: 'packing-export' });
  }
};

export default PackingList;
