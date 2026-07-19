import React, { useState, useMemo, useCallback, useEffect, useRef } from 'react';
import { Search, ChevronDown, Check, RotateCcw, Package } from 'lucide-react';
import { FRESHER_LIST, GOING_HOME_LIST, COMING_TO_SCHOOL_LIST } from '../../data/packingLists';

const SCENARIOS = [
  { id: 'fresher', label: 'Fresher', icon: '🎓', data: FRESHER_LIST },
  { id: 'going-home', label: 'Going Home', icon: '🏠', data: GOING_HOME_LIST },
  { id: 'coming-to-school', label: 'Coming to School', icon: '📚', data: COMING_TO_SCHOOL_LIST },
];

const LS_PREFIX = 'ucc_packing_list_';

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
  const searchRef = useRef(null);

  const scenarioData = useMemo(() => {
    return SCENARIOS.find(s => s.id === activeScenario)?.data || {};
  }, [activeScenario]);

  const flatItems = useMemo(() => flattenItems(scenarioData), [scenarioData]);

  const filteredCategories = useMemo(() => {
    if (!searchQuery.trim()) {
      return Object.entries(scenarioData).map(([category, items]) => ({ category, items }));
    }
    const q = searchQuery.toLowerCase().trim();
    return Object.entries(scenarioData)
      .map(([category, items]) => ({
        category,
        items: items.filter(item => item.toLowerCase().includes(q)),
      }))
      .filter(({ items }) => items.length > 0);
  }, [scenarioData, searchQuery]);

  const totalItems = useMemo(() => flatItems.length, [flatItems]);
  const checkedCount = useMemo(
    () => flatItems.filter(({ item }) => checked[item]).length,
    [flatItems, checked]
  );

  useEffect(() => {
    setChecked(getInitialChecked(activeScenario));
    setExpandedCategories({});
    setSearchQuery('');
  }, [activeScenario]);

  useEffect(() => {
    localStorage.setItem(`${LS_PREFIX}${activeScenario}`, JSON.stringify(checked));
  }, [checked, activeScenario]);

  const toggleItem = useCallback((item) => {
    setChecked(prev => ({ ...prev, [item]: !prev[item] }));
  }, []);

  const toggleCategory = useCallback((category) => {
    setExpandedCategories(prev => ({ ...prev, [category]: !prev[category] }));
  }, []);

  const resetAll = useCallback(() => {
    setChecked({});
  }, []);

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
          <div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
              <Package size={24} className="text-primary-500" />
              Packing List
            </h2>
            <p className="text-sm font-medium text-slate-500 mt-1">
              {checkedCount} / {totalItems} items checked
            </p>
          </div>
          <button
            onClick={resetAll}
            className="flex items-center gap-1.5 text-xs font-bold text-red-500 bg-red-50 px-3 py-2 rounded-xl hover:bg-red-100 transition-colors active:scale-95 whitespace-nowrap"
          >
            <RotateCcw size={14} />
            Reset
          </button>
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

      <div className="p-6 md:p-8 space-y-3">
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
    </div>
  );
};

export default PackingList;
