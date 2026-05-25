import React, { useState, useMemo } from 'react';
import { formulasData } from '../../data/formulas';
import { Modal } from '../common/Modal';
import {
  Play, RotateCcw, Lightbulb, BookOpen,
  Cog, Zap, Thermometer, Waves, Atom, Calculator,
  Search, X, ArrowRight, AlertTriangle, CheckCircle2,
  ChevronDown, Sparkles
} from 'lucide-react';

const iconMap = { Cog, Zap, Thermometer, Waves, Atom, Calculator };

// Variables that accept comma-separated text input instead of numbers
const isTextVariable = (variable) => ['data', 'xdata', 'ydata'].includes(variable?.id);

const FormulaCalculator = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [modalFormula, setModalFormula] = useState(null);
  const [inputValues, setInputValues] = useState({});
  const [result, setResult] = useState(null);
  const [solveFor, setSolveFor] = useState(null); // which variable to solve for
  const [mode, setMode] = useState('auto'); // 'auto' = leave-blank, 'target' = solve-for

  // Get all categories
  const categories = ['All', ...formulasData.map(c => c.category)];

  // Filter formulas
  const filteredFormulas = useMemo(() => {
    let data = formulasData;
    if (activeCategory !== 'All') {
      data = data.filter(c => c.category === activeCategory);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      data = data.map(cat => ({
        ...cat,
        formulas: cat.formulas.filter(f =>
          f.name.toLowerCase().includes(q) ||
          f.description.toLowerCase().includes(q) ||
          f.equation.toLowerCase().includes(q)
        )
      })).filter(cat => cat.formulas.length > 0);
    }
    return data;
  }, [activeCategory, searchQuery]);

  const handleOpenFormula = (formula) => {
    setModalFormula(formula);
    setInputValues({});
    setResult(null);
    setSolveFor(null);
    setMode('auto');
  };

  const handleCloseModal = () => {
    setModalFormula(null);
    setInputValues({});
    setResult(null);
    setSolveFor(null);
  };

  // When user selects "Solve For" a target, clear inputs and set mode
  const handleSolveForChange = (targetId) => {
    setSolveFor(targetId);
    setMode(targetId ? 'target' : 'auto');
    setInputValues({});
    setResult(null);
  };

  const handleInputChange = (id, value) => {
    setInputValues(prev => {
      const next = { ...prev };
      if (value === '' || value === undefined) {
        delete next[id];
      } else {
        const variable = modalFormula?.variables.find(v => v.id === id);
        next[id] = isTextVariable(variable) ? value : parseFloat(value);
      }
      return next;
    });
    setResult(null);
  };

  const handleClear = () => {
    setInputValues({});
    setResult(null);
  };

  const handleCalculate = () => {
    if (!modalFormula) return;
    const cleanVals = {};
    for (const [k, v] of Object.entries(inputValues)) {
      const variable = modalFormula.variables.find(vr => vr.id === k);
      if (isTextVariable(variable)) {
        if (typeof v === 'string' && v.trim()) cleanVals[k] = v;
      } else {
        if (!isNaN(v)) cleanVals[k] = v;
      }
    }
    const res = modalFormula.calculate(cleanVals);
    setResult(res);
  };

  const handleFillExample = () => {
    if (!modalFormula) return;
    const exampleVals = {};
    const textExamples = {
      'data': '10, 20, 30, 40, 50',
      'xdata': '1, 2, 3, 4, 5',
      'ydata': '2.1, 4.0, 5.9, 8.1, 10.0'
    };
    const examples = {
      'N': 10, 'kg': 5, 'm/s²': 9.81, 'J': 100, 'm/s': 10, 'm': 5, 's': 2,
      '°': 45, 'Ω': 100, 'A': 2, 'V': 12, 'F': 0.001, 'H': 0.01, 'Hz': 50,
      'Pa': 101325, 'mol': 1, 'K': 300, 'C': 0.001, 'T': 0.01, 'kg·m/s': 10,
      'kg·m²': 2, 'rad/s': 3.14, 'rad/s²': 2, 'N·m': 10, 'W': 100,
      'kg/m³': 1.225, 'm²': 0.5, 'J/(kg·K)': 4186, 'nm': 500, 'eV': 2,
      '$': 1000, '%': 5, 'years': 10, 'kg·m²/s': 10, 'N·s': 5
    };
    modalFormula.variables.forEach((v) => {
      if (mode === 'target' && solveFor === v.id) return;
      if (mode === 'auto' && Object.keys(exampleVals).length >= modalFormula.variables.length - 1) return;
      exampleVals[v.id] = textExamples[v.id] || examples[v.unit] || 10;
    });
    setInputValues(exampleVals);
    setResult(null);
  };

  const filledCount = modalFormula
    ? modalFormula.variables.filter(v => {
        const val = inputValues[v.id];
        if (isTextVariable(v)) return typeof val === 'string' && val.trim() !== '';
        return val !== undefined && !isNaN(val);
      }).length
    : 0;

  const isResultError = result && result.result && result.result.startsWith('Error');

  // Get icon/color for category
  const getCategoryStyle = (cat) => {
    const styles = {
      'Mechanics': { color: 'from-blue-500 to-blue-600', bg: 'bg-blue-50', text: 'text-blue-700', icon: 'Cog' },
      'Electricity & Magnetism': { color: 'from-amber-500 to-yellow-500', bg: 'bg-amber-50', text: 'text-amber-700', icon: 'Zap' },
      'Thermodynamics': { color: 'from-red-500 to-orange-500', bg: 'bg-red-50', text: 'text-red-700', icon: 'Thermometer' },
      'Waves & Optics': { color: 'from-purple-500 to-indigo-500', bg: 'bg-purple-50', text: 'text-purple-700', icon: 'Waves' },
      'Modern Physics': { color: 'from-emerald-500 to-teal-500', bg: 'bg-emerald-50', text: 'text-emerald-700', icon: 'Atom' },
      'Mathematics': { color: 'from-pink-500 to-rose-500', bg: 'bg-pink-50', text: 'text-pink-700', icon: 'Calculator' }
    };
    return styles[cat] || { color: 'from-gray-500 to-gray-600', bg: 'bg-gray-50', text: 'text-gray-700', icon: 'BookOpen' };
  };

  return (
    <div>
      {/* ── Search & Filter Bar ── */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search formulas... (e.g. 'projectile', 'ohm', 'energy')"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-10 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all"
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2">
              <X className="w-4 h-4 text-gray-400 hover:text-gray-600" />
            </button>
          )}
        </div>
      </div>

      {/* ── Category Pills ── */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2 scrollbar-thin">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              activeCategory === cat
                ? 'bg-primary-600 text-white shadow-lg shadow-primary-500/20'
                : 'bg-white text-gray-500 border border-gray-200 hover:border-primary-200 hover:text-primary-600'
            }`}
          >
            {cat === 'All' ? `All (${formulasData.reduce((s, c) => s + c.formulas.length, 0)})` : cat}
          </button>
        ))}
      </div>

      {/* ── Formula Cards Grid ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredFormulas.map(category => {
          const style = getCategoryStyle(category.category);
          const IconComp = iconMap[style.icon] || BookOpen;
          return category.formulas.map(formula => (
            <button
              key={formula.id}
              onClick={() => handleOpenFormula(formula)}
              className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-primary-200/50 p-5 text-left transition-all duration-200 hover:scale-[1.01] active:scale-[0.99]"
            >
              {/* Category badge */}
              <div className="flex items-center justify-between mb-3">
                <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-bold ${style.bg} ${style.text}`}>
                  <IconComp className="w-3 h-3" />
                  {category.category}
                </span>
                <Sparkles className="w-4 h-4 text-gray-200 group-hover:text-primary-400 transition-colors" />
              </div>

              {/* Formula name */}
              <h3 className="text-sm font-bold text-gray-800 mb-1 group-hover:text-primary-700 transition-colors">
                {formula.name}
              </h3>
              <p className="text-xs text-gray-400 mb-3 line-clamp-2">{formula.description}</p>

              {/* Equation preview */}
              <div className="px-3 py-2 bg-gray-50 rounded-lg">
                <code className="text-[11px] font-mono text-gray-500 line-clamp-1">{formula.equation}</code>
              </div>

              {/* Variable count */}
              <div className="mt-3 flex items-center gap-1.5 text-[10px] text-gray-300">
                <span>{formula.variables.length} variables</span>
                <span>•</span>
                <span>Multi-way solver</span>
              </div>
            </button>
          ));
        })}
      </div>

      {/* Empty state */}
      {filteredFormulas.length === 0 && (
        <div className="text-center py-16">
          <Search className="w-10 h-10 text-gray-200 mx-auto mb-3" />
          <p className="text-sm text-gray-400">No formulas found for "{searchQuery}"</p>
        </div>
      )}

      {/* ── FORMULA SOLVER MODAL ── */}
      <Modal
        isOpen={!!modalFormula}
        onClose={handleCloseModal}
        title={modalFormula?.name || 'Formula Solver'}
        className="max-w-2xl"
      >
        {modalFormula && (
          <div className="space-y-5">
            {/* Description */}
            <p className="text-sm text-gray-500">{modalFormula.description}</p>

            {/* Equation Display */}
            <div className="px-5 py-4 bg-gradient-to-r from-primary-50/60 to-accent-50/40 rounded-xl border border-primary-100/50">
              <div className="text-[10px] font-bold text-primary-400 uppercase tracking-wider mb-1">Equation</div>
              <code className="text-base font-mono text-primary-800 font-bold tracking-wide">
                {modalFormula.equation}
              </code>
            </div>

            {/* Solve For Selector */}
            <div>
              <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">
                What do you want to calculate?
              </div>
              <div className="flex flex-wrap gap-1.5">
                <button
                  onClick={() => handleSolveForChange(null)}
                  className={`px-3 py-1.5 rounded-lg text-[11px] font-bold transition-all ${
                    !solveFor
                      ? 'bg-gray-800 text-white shadow-md'
                      : 'bg-gray-50 text-gray-400 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  Auto (leave blank)
                </button>
                {modalFormula.variables.map((v) => (
                  <button
                    key={v.id}
                    onClick={() => handleSolveForChange(v.id)}
                    className={`px-3 py-1.5 rounded-lg text-[11px] font-bold transition-all ${
                      solveFor === v.id
                        ? 'bg-primary-600 text-white shadow-md shadow-primary-500/20'
                        : 'bg-primary-50 text-primary-600 hover:bg-primary-100 border border-primary-200'
                    }`}
                  >
                    {v.label.split('(')[0].trim()}
                    {v.unit && <span className="ml-1 opacity-60">({v.unit})</span>}
                  </button>
                ))}
              </div>
            </div>

            {/* Input Fields */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-2">
                  {solveFor ? 'Provide these values' : 'Variables'}
                  <span className="text-[10px] font-normal normal-case tracking-normal text-gray-300">
                    {solveFor
                      ? `Solving for ${modalFormula.variables.find(v=>v.id===solveFor)?.label}`
                      : `(${filledCount}/${modalFormula.variables.length} filled — leave blank to solve)`
                    }
                  </span>
                </h3>
                <div className="flex gap-2">
                  <button
                    onClick={handleFillExample}
                    className="text-[10px] px-2.5 py-1 rounded-lg bg-accent-50 text-accent-700 hover:bg-accent-100 transition-colors font-bold"
                  >
                    <Lightbulb className="w-3 h-3 inline mr-0.5" />
                    Example
                  </button>
                  <button
                    onClick={handleClear}
                    className="text-[10px] px-2.5 py-1 rounded-lg bg-gray-50 text-gray-400 hover:bg-gray-100 transition-colors font-bold"
                  >
                    <RotateCcw className="w-3 h-3 inline mr-0.5" />
                    Clear
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {modalFormula.variables.map((variable) => {
                  // In target mode, the solve-target is shown as output (disabled)
                  const isTarget = mode === 'target' && solveFor === variable.id;
                  const isText = isTextVariable(variable);
                  const getHint = (unit, vId) => {
                    // Text input hints
                    if (vId === 'data') return 'e.g. 10, 20, 30, 40, 50';
                    if (vId === 'xdata') return 'e.g. 1, 2, 3, 4, 5';
                    if (vId === 'ydata') return 'e.g. 2.1, 4.0, 5.9, 8.1';
                    // Number input hints
                    if (unit === '°') return 'Degrees (e.g. 45)';
                    if (unit === 'rad/s' || unit === 'rad/s²') return 'Radians (e.g. 3.14)';
                    if (unit === 'K') return 'Kelvin (e.g. 300)';
                    if (unit === 'Pa') return 'Pascals (e.g. 101325)';
                    if (unit === 'kg') return 'kg (positive)';
                    if (unit === 'm/s') return 'm/s (use − for negative)';
                    if (unit === 'm/s²') return 'm/s² (e.g. 9.81)';
                    if (unit === '%') return 'Percent (e.g. 5)';
                    if (unit === 'nm') return 'Nanometers (e.g. 500)';
                    if (unit === 'eV') return 'Electron-volts';
                    if (unit === '') return 'Dimensionless number';
                    if (unit) return `Enter in ${unit}`;
                    return 'Leave blank to solve';
                  };
                  const isFilled = inputValues[variable.id] !== undefined;

                  // Target variable: show as output slot
                  if (isTarget) {
                    return (
                      <div key={variable.id} className={`relative ${isText ? 'col-span-2' : ''}`}>
                        <label className="block text-[10px] font-bold text-primary-400 mb-1 uppercase tracking-wider">
                          🎯 {variable.label}
                          {variable.unit && <span className="ml-1 normal-case font-semibold">[{variable.unit}]</span>}
                        </label>
                        <div className="w-full px-3 py-2.5 rounded-xl border-2 border-dashed border-primary-200 bg-primary-50/20 text-sm text-primary-300 text-center font-semibold italic">
                          Solving for this...
                        </div>
                      </div>
                    );
                  }

                  return (
                    <div key={variable.id} className={isText ? 'col-span-2' : ''}>
                      <label className="block text-[10px] font-bold text-gray-400 mb-1 uppercase tracking-wider">
                        {variable.label}
                        {variable.unit && <span className="text-primary-300 ml-1 normal-case font-semibold">[{variable.unit}]</span>}
                      </label>
                      <input
                        type={isText ? 'text' : 'number'}
                        {...(!isText && { step: 'any' })}
                        placeholder={isFilled ? '' : getHint(variable.unit, variable.id)}
                        value={isFilled ? inputValues[variable.id] : ''}
                        onChange={(e) => handleInputChange(variable.id, e.target.value)}
                        className={`w-full px-3 py-2.5 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 focus:ring-primary-500/20 ${
                          isFilled
                            ? 'border-primary-200 bg-primary-50/30 text-primary-800 font-semibold'
                            : 'border-gray-200 bg-gray-50/50 text-gray-400 placeholder:text-gray-300 placeholder:text-[10px] placeholder:normal-case'
                        } focus:border-primary-500`}
                      />
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Calculate Button */}
            <button
              onClick={handleCalculate}
              disabled={filledCount < Math.min(2, modalFormula.variables.length)}
              className={`w-full py-3 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2 ${
                filledCount >= Math.min(2, modalFormula.variables.length)
                  ? 'bg-primary-600 text-white hover:bg-primary-700 shadow-lg shadow-primary-500/20 active:scale-[0.98]'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
            >
              <Play className="w-4 h-4" />
              {filledCount < Math.min(2, modalFormula.variables.length)
                ? `Fill in the variables to solve`
                : `Solve — ${modalFormula.variables.length - filledCount} unknown${modalFormula.variables.length - filledCount !== 1 ? 's' : ''}`
              }
            </button>

            {/* Result Display */}
            {result && (
              <div className={`rounded-xl border p-5 transition-all animate-in fade-in slide-in-from-bottom-3 duration-300 ${
                isResultError
                  ? 'bg-red-50/50 border-red-200/50'
                  : 'bg-gradient-to-br from-emerald-50/80 to-teal-50/50 border-emerald-200/50'
              }`}>
                <div className="flex items-start gap-3">
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    isResultError ? 'bg-red-100' : 'bg-emerald-100'
                  }`}>
                    {isResultError
                      ? <AlertTriangle className="w-3.5 h-3.5 text-red-600" />
                      : <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    }
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className={`text-xs font-bold mb-1 ${isResultError ? 'text-red-800' : 'text-emerald-800'}`}>
                      {isResultError ? 'Error' : 'Result'}
                    </h4>
                    <div className={`text-sm font-mono whitespace-pre-wrap leading-relaxed ${
                      isResultError ? 'text-red-700' : 'text-emerald-900'
                    }`}>
                      {result.result}
                    </div>
                  </div>
                </div>

                {result.steps && (
                  <div className="mt-4 pt-4 border-t border-emerald-200/30">
                    <h4 className="text-[10px] font-bold text-gray-400 mb-2 uppercase tracking-wider flex items-center gap-1">
                      <ArrowRight className="w-3 h-3" />
                      Solution Steps
                    </h4>
                    <pre className="text-xs text-gray-600 whitespace-pre-wrap font-mono leading-relaxed bg-white/60 rounded-lg p-3 border border-gray-100 max-h-60 overflow-y-auto">
                      {result.steps}
                    </pre>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default FormulaCalculator;
