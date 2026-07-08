import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { XIcon } from 'lucide-react';
import { Linkify } from '@/utils/linkify';

const SECTION_COLORS = [
  { border: 'border-l-blue-500', bg: 'bg-blue-50', header: 'text-blue-700', num: 'bg-blue-100 text-blue-700' },
  { border: 'border-l-emerald-500', bg: 'bg-emerald-50', header: 'text-emerald-700', num: 'bg-emerald-100 text-emerald-700' },
  { border: 'border-l-amber-500', bg: 'bg-amber-50', header: 'text-amber-700', num: 'bg-amber-100 text-amber-700' },
  { border: 'border-l-purple-500', bg: 'bg-purple-50', header: 'text-purple-700', num: 'bg-purple-100 text-purple-700' },
  { border: 'border-l-rose-500', bg: 'bg-rose-50', header: 'text-rose-700', num: 'bg-rose-100 text-rose-700' },
];

const KnowledgeModal = ({ data, onClose }) => {
  if (!data || typeof document === 'undefined') return null;

  return createPortal(
    <div className="fixed inset-0 z-[99999] flex items-end justify-center sm:items-center p-0 sm:p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="absolute inset-0" onClick={onClose}></div>
      <div className="relative bg-white rounded-t-3xl sm:rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl animate-in slide-in-from-bottom sm:zoom-in-95 duration-300 flex flex-col max-h-[66vh]">
        <div className="pt-3 pb-1 flex justify-center items-center w-full shrink-0 sm:hidden">
          <div className="w-12 h-1.5 bg-slate-200 rounded-full"></div>
        </div>
        <div className="flex items-start justify-between px-6 pt-2 sm:pt-6 pb-2 shrink-0">
          <h2 className="text-2xl font-black text-slate-900 leading-tight pr-4">{data.title}</h2>
          <button onClick={onClose} className="bg-slate-100 hover:bg-slate-200 text-slate-500 p-2 rounded-full transition-colors shrink-0"><XIcon size={20} /></button>
        </div>
        <div className="p-6 overflow-y-auto flex-1 overscroll-contain">
          {data.tags?.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {data.tags.map(tag => (<span key={tag} className="px-3 py-1 bg-primary-50 text-primary-700 text-[10px] font-bold uppercase tracking-wider rounded-full">{tag}</span>))}
            </div>
          )}

          {data._type === 'guide_card' && data.guideCardContent && (
            <div className="space-y-4">
              {data.subtitle && (
                <div className="bg-gradient-to-r from-primary-50 to-blue-50 border border-primary-100 rounded-xl p-3 mb-2">
                  <p className="text-sm text-primary-700 leading-relaxed font-medium">{data.subtitle}</p>
                </div>
              )}
              {data.guideCardContent.map((section, sIdx) => {
                const color = SECTION_COLORS[sIdx % SECTION_COLORS.length];
                return (
                  <div key={sIdx} className={`border-l-4 ${color.border} ${color.bg} rounded-r-xl p-4`}>
                    <h3 className={`text-xs font-black ${color.header} uppercase tracking-widest mb-3 flex items-center gap-2`}>
                      <span className={`w-5 h-5 rounded-full ${color.num} flex items-center justify-center text-[10px] font-black`}>{sIdx + 1}</span>
                      {section.title}
                    </h3>
                    {section.items?.length > 0 && (
                      <ul className="space-y-2.5">{section.items.map((item, iIdx) => (<li key={iIdx} className="flex items-start gap-2.5 text-sm text-slate-700 leading-relaxed"><span className={`mt-1.5 shrink-0 w-1.5 h-1.5 rounded-full ${color.num}`} /><Linkify text={item} /></li>))}</ul>
                    )}
                    {section.content && <Linkify text={section.content} className="text-sm text-slate-600 leading-relaxed" />}
                  </div>
                );
              })}
            </div>
          )}

          {data._type !== 'guide_card' && (
            <>
              {data.history && (
                <div className="mb-6">
                  <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Historical Context</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{data.history}</p>
                </div>
              )}
              {data.architecture && (
                <div className="mb-6">
                  <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Architecture & Function</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{data.architecture}</p>
                </div>
              )}
            </>
          )}

          {data.statistics && Object.keys(data.statistics).length > 0 && (
            <div className="mb-6">
              <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Verified Data Points</h3>
              <div className="grid grid-cols-2 gap-3">
                {Object.entries(data.statistics).map(([key, val]) => (
                  <div key={key} className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">{key}</div>
                    <div className="text-xs font-bold text-slate-800">{val}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {data.accessibility && (
            <div className="mb-6 bg-amber-50 border border-amber-200 rounded-xl p-4">
              <h3 className="text-xs font-black text-amber-700 uppercase tracking-widest mb-2">♿ Accessibility Alert</h3>
              <p className="text-sm text-amber-800 leading-relaxed">{data.accessibility}</p>
            </div>
          )}

          {data.hazards?.length > 0 && (
            <div className="mb-6 bg-red-50 border border-red-200 rounded-xl p-4">
              <h3 className="text-xs font-black text-red-700 uppercase tracking-widest mb-2">⚠️ Hazards & Warnings</h3>
              <ul className="space-y-2">{data.hazards.map((hazard, i) => (<li key={i} className="text-sm text-red-800 leading-relaxed">{hazard}</li>))}</ul>
            </div>
          )}

          {data.floors?.length > 0 && (
            <div className="mb-6">
              <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Floor-by-Floor Guide</h3>
              <div className="space-y-2">{data.floors.map((floor, i) => (<div key={i} className="bg-slate-50 p-3 rounded-xl border border-slate-100"><p className="text-sm text-slate-700 leading-relaxed">{floor}</p></div>))}</div>
            </div>
          )}

          {data.rules?.length > 0 && (
            <div className="mb-6">
              <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3">📋 Rules & Regulations</h3>
              <ul className="space-y-2">{data.rules.map((rule, i) => (<li key={i} className="flex items-start gap-2 text-sm text-slate-600 leading-relaxed"><span className="text-slate-400 mt-1 shrink-0">•</span><span>{rule}</span></li>))}</ul>
            </div>
          )}

          {data.residentialRules?.length > 0 && (
            <div className="mb-6">
              <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3">🏠 Residential Rules</h3>
              <ul className="space-y-2">{data.residentialRules.map((rule, i) => (<li key={i} className="flex items-start gap-2 text-sm text-slate-600 leading-relaxed"><span className="text-slate-400 mt-1 shrink-0">•</span><span>{rule}</span></li>))}</ul>
            </div>
          )}

          {data.grievanceChain?.length > 0 && (
            <div className="mb-6">
              <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3">🔗 Grievance Redressal Chain</h3>
              <div className="space-y-2">{data.grievanceChain.map((step, i) => (<div key={i} className="bg-blue-50 p-3 rounded-xl border border-blue-100"><p className="text-sm text-blue-800 leading-relaxed font-medium">{step}</p></div>))}</div>
            </div>
          )}

          {data.sculpture && (
            <div className="mb-6 bg-purple-50 border border-purple-200 rounded-xl p-4">
              <h3 className="text-xs font-black text-purple-700 uppercase tracking-widest mb-2">🎨 Point of Interest</h3>
              <p className="text-sm text-purple-800 leading-relaxed">{data.sculpture}</p>
            </div>
          )}

          {data.disclaimer && (
            <p className="text-[10px] text-slate-400 italic text-center mt-8 pb-4 border-t border-slate-100 pt-4">{data.disclaimer}</p>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default KnowledgeModal;
